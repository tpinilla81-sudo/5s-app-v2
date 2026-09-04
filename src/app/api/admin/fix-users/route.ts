import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

// POST /api/admin/fix-users - Asigna todos los usuarios sin proyecto
// Este endpoint corrige el bug donde usuarios creados desde "Datos Empresa → Usuarios"
// no tenían registro ProjectMember aunque sí tenían zona asignada.
//
// USO TEMPORAL: Ejecutar una vez para corregir datos existentes.
// Después se puede eliminar este endpoint.

export async function POST(request: NextRequest) {
  try {
    // Verificar que es admin o gestor
    const userHeader = request.headers.get('x-user')
    if (!userHeader) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }
    
    let currentUser
    try {
      currentUser = JSON.parse(userHeader)
    } catch {
      return NextResponse.json({ error: 'Usuario inválido' }, { status: 401 })
    }

    if (currentUser.role !== 'admin' && currentUser.role !== 'gestor') {
      return NextResponse.json({ error: 'Solo admin/gestor puede ejecutar esta acción' }, { status: 403 })
    }

    console.log(`[fix-users] Ejecutado por: ${currentUser.email} (${currentUser.role})`)

    // 1. Buscar todos los usuarios activos
    const allUsers = await db.user.findMany({
      where: { active: true },
      select: { id: true, email: true, name: true, role: true }
    })

    // 2. Buscar todos los proyectos activos con sus zonas
    const projects = await db.project.findMany({
      where: { active: true },
      include: {
        zones: { select: { id: true, name: true } },
        company: { select: { id: true, name: true } }
      }
    })

    if (projects.length === 0) {
      return NextResponse.json({ error: 'No hay proyectos activos' }, { status: 400 })
    }

    // 3. Para cada usuario, verificar si tiene ProjectMember
    const results = []
    let fixedCount = 0

    for (const user of allUsers) {
      const existingMembership = await db.projectMember.findFirst({
        where: { userId: user.id }
      })

      if (existingMembership) {
        results.push({
          user: user.email,
          name: user.name,
          status: 'already_assigned',
          project: existingMembership.projectId
        })
        continue
      }

      // Usuario SIN proyecto - buscar su empresa
      // FIX v3.0.35: Usar 'Company' (nombre correcto en Prisma, no 'company')
      const companyMember = await db.companyMember.findFirst({
        where: { userId: user.id },
        include: { 
          Company: { 
            include: { 
              projects: { 
                where: { active: true },
                select: { id: true, name: true }
              } 
            } 
          } 
        }
      })

      // Determinar proyecto objetivo
      let targetProject = null
      
      if (companyMember?.Company?.projects.length > 0) {
        targetProject = companyMember.Company.projects[0]
      } else if (projects.length > 0) {
        targetProject = projects[0]
      }

      if (!targetProject) {
        results.push({
          user: user.email,
          name: user.name,
          status: 'no_project_found'
        })
        continue
      }

      // Obtener zonas del proyecto
      const projectZones = projects.find(p => p.id === targetProject!.id)?.zones || []
      
      // Crear ProjectMember con zonas - FIX: Usar 'MemberZone' (nombre correcto en Prisma)
      const member = await db.projectMember.create({
        data: {
          userId: user.id,
          projectId: targetProject.id,
          role: user.role || 'empleado',
          MemberZone: {
            create: projectZones.map(zone => ({ zoneId: zone.id }))
          }
        }
      })

      results.push({
        user: user.email,
        name: user.name,
        status: 'fixed',
        projectId: targetProject.id,
        projectName: targetProject.name,
        zonesAssigned: projectZones.length,
        memberId: member.id
      })
      fixedCount++
    }

    console.log(`[fix-users] Completado: ${fixedCount}/${allUsers.length} usuarios corregidos`)

    return NextResponse.json({
      success: true,
      message: `Proceso completado. ${fixedCount} usuario(s) asignado(s) a proyecto(s).`,
      totalUsers: allUsers.length,
      fixedCount,
      results
    })

  } catch (error) {
    console.error('[fix-users] Error:', error)
    return NextResponse.json(
      { error: 'Error al procesar: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    )
  }
}
