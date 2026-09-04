import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { getAuthUser } from '../../../../lib/auth-helpers'

// PUT /api/projects/[projectId] - Update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const body = await request.json()
    const { name, description, company, active } = body

    const existing = await db.project.findUnique({ where: { id: projectId } })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Proyecto no encontrado' }, { status: 404 })
    }

    const updateData: any = {}
    if (name !== undefined) updateData.name = name.trim()
    if (description !== undefined) updateData.description = description?.trim() || null
    if (company !== undefined) updateData.company = company.trim()
    if (active !== undefined) updateData.active = active

    const project = await db.project.update({
      where: { id: projectId },
      data: updateData,
      include: {
        zones: { orderBy: { createdAt: 'asc' } },
        _count: { select: { members: true } },
      },
    })

    return NextResponse.json({
      success: true,
      project: {
        id: project.id,
        name: project.name,
        description: project.description,
        company: project.company,
        startDate: project.startDate,
        active: project.active,
        zones: project.zones,
        memberCount: project._count.members,
      },
    })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ success: false, error: 'Error al actualizar proyecto' }, { status: 500 })
  }
}

// DELETE /api/projects/[projectId] - Delete project y TODOS los datos asociados
//
// ORDEN DE BORRADO (v3.0.7 - CORREGIDO):
// 1. Datos que NO tienen FK o no tienen cascade: Notification
// 2. MemberZone (asignaciones de miembros a zonas del proyecto)
// 3. Zone (zonas del proyecto - cascade borra sus datos hijos)
// 4. ProjectMember (miembros del proyecto)
// 5. Project (el proyecto en sí)
//
// LO QUE NO SE BORRA:
// - User: los usuarios siguen existiendo, solo se desasignan del proyecto
// - CompanyMember: la relación empresa-usuario se mantiene
// - Company: la empresa no se afecta
// - Templates: son globales o de empresa, no de proyecto
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    
    // ─── VERIFICAR PERMISOS ───
    // v3.0.32: SOLO Admin puede borrar proyectos y zonas
    //          Gestor solo puede borrar empresas (no proyectos)
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }

    const existing = await db.project.findUnique({ 
      where: { id: projectId },
      include: {
        _count: {
          select: {
            zones: true,
            members: true,
          }
        }
      }
    })
    
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Proyecto no encontrado' }, { status: 404 })
    }

    // v3.0.32: SOLO admin puede borrar proyectos
    if (user.role !== 'admin') {
      return NextResponse.json({ 
        success: false, 
        error: 'Solo el administrador puede borrar proyectos' 
      }, { status: 403 })
    }

    // Verificar que el admin pertenece a la empresa del proyecto
    const membership = await db.companyMember.findFirst({
      where: {
        userId: user.id,
        companyId: existing.companyId
      }
    })
    if (!membership) {
      return NextResponse.json({ 
        success: false, 
        error: 'Solo puedes borrar proyectos de tu empresa' 
      }, { status: 403 })
    }

    console.log(`[DELETE /api/projects/${projectId}] User: ${user.email} (${user.role}) deleting project: ${existing.name}`)

    // Ejecutar todo en transacción para que sea atómico.
    // Si cualquier paso falla, se hace rollback y el proyecto queda intacto.
    const result = await db.$transaction(async (tx) => {
      let deletedZones = 0
      let deletedMembers = 0
      let deletedNotifications = 0

      // ─── 1. Borrar registros que NO tienen cascade desde Project ──────
      // Notification tiene projectId como String suelto (sin FK formal).
      const notifDelete = await tx.notification.deleteMany({
        where: { projectId },
      }).catch(() => ({ count: 0 })) // por si la tabla no existe
      deletedNotifications = notifDelete.count

      // ─── 2. Obtener IDs de zonas y miembros para borrado ordenado ──
      const zoneIds = (await tx.zone.findMany({
        where: { projectId },
        select: { id: true },
      })).map(z => z.id)

      const memberIds = (await tx.projectMember.findMany({
        where: { projectId },
        select: { id: true },
      })).map(m => m.id)

      // ─── 3. Borrar MemberZone para todas las zonas del proyecto ─────
      // Esto DESASIGNA usuarios de zonas, NO borra los usuarios
      if (zoneIds.length > 0) {
        await tx.memberZone.deleteMany({
          where: { zoneId: { in: zoneIds } },
        }).catch(() => ({ count: 0 }))
      }

      // ─── 4. Borrar MemberZone por ProjectMember ────────────────────
      if (memberIds.length > 0) {
        await tx.memberZone.deleteMany({
          where: { memberId: { in: memberIds } },
        }).catch(() => ({ count: 0 }))
      }

      // ─── 5. Borrar ZONAS (cascade borra: inventoryItems, progress, etc.) ─
      if (zoneIds.length > 0) {
        await tx.zone.deleteMany({
          where: { id: { in: zoneIds } },
        })
        deletedZones = zoneIds.length
      }

      // ─── 6. Borrar PROJECT MEMBERS (desasigna usuarios del proyecto) ─
      // Los User NO se borran, solo pierden acceso a este proyecto
      if (memberIds.length > 0) {
        await tx.projectMember.deleteMany({
          where: { id: { in: memberIds } },
        })
        deletedMembers = memberIds.length
      }

      // ─── 7. Borrar el PROYECTO (finalmente) ─────────────────────────
      // Esto dispara cascade para datos restantes con FK directa a Project:
      // ExamAnswer, AuditResult, AuditTarget, ChecklistResponse,
      // EmployeeProgress, EvaluationSchedule, PDCAItem, PhotoLibrary, Standard
      await tx.project.delete({ where: { id: projectId } })

      return {
        projectName: existing.name,
        zonesDeleted: deletedZones,
        membersRemoved: deletedMembers,
        notificationsDeleted: deletedNotifications,
      }
    })

    console.log(`[DELETE /api/projects/${projectId}] OK`, result)

    return NextResponse.json({
      success: true,
      message: `Proyecto "${result.projectName}" eliminado correctamente`,
      details: result,
    })
  } catch (error) {
    console.error('Error deleting project:', error)
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { success: false, error: `Error al eliminar proyecto: ${msg}` },
      { status: 500 }
    )
  }
}
