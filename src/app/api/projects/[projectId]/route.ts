import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

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
// v2.108.6 — Hard delete con limpieza exhaustiva.
// El cascade de Prisma/Postgres YA borra la mayoría de tablas con FK a Project,
// pero hay tablas que NO tienen cascade (p.ej. Notification tiene solo
// projectId String sin FK formal) y hay que borrarlas manualmente.
// También borramos en orden para evitar deadlocks: primero hijos, después nietos,
// al final Project.
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params

    const existing = await db.project.findUnique({ where: { id: projectId } })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Proyecto no encontrado' }, { status: 404 })
    }

    // Ejecutar todo en transacción para que sea atómico.
    // Si cualquier paso falla, se hace rollback y el proyecto queda intacto.
    const result = await db.$transaction(async (tx) => {
      // ─── 1. Borrar registros que NO tienen cascade desde Project ──────
      // Notification tiene projectId como String suelto (sin FK formal).
      const notifDeleted = await tx.notification.deleteMany({
        where: { projectId },
      }).catch(() => ({ count: 0 })) // por si la tabla no existe

      // ─── 2. Antes de borrar Zone, borrar MemberZone (FK a Zone) ──────
      // MemberZone → ProjectMember → projectId. Pero MemberZone también
      // tiene FK a Zone, así que si Zone se borra primero, MemberZone se
      // va por cascade. Lo borramos explícito para garantizar.
      const zoneIds = (await tx.zone.findMany({
        where: { projectId },
        select: { id: true },
      })).map(z => z.id)

      if (zoneIds.length > 0) {
        await tx.memberZone.deleteMany({
          where: { zoneId: { in: zoneIds } },
        }).catch(() => ({ count: 0 }))
      }

      // ─── 3. Borrar el Project ─────────────────────────────────────────
      // Esto dispara cascade: Zone, ProjectMember, Progress, EmployeeProgress,
      // ExamAnswer, AuditResult, AuditTarget, Standard, PhotoLibrary,
      // PDCAItem, InventoryItem, ActionItem, ChecklistResponse, EvaluationSchedule
      // (todas tienen onDelete: Cascade en el schema).
      await tx.project.delete({ where: { id: projectId } })

      return {
        notificationsDeleted: notifDeleted.count,
        zonesCount: zoneIds.length,
      }
    })

    console.log(`[DELETE /api/projects/${projectId}] OK`, result)

    return NextResponse.json({
      success: true,
      deleted: result,
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
