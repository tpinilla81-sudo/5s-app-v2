import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

// Endpoint de diagnóstico para probar MemberZone
export async function GET() {
  const results: any = {
    timestamp: new Date().toISOString(),
    tests: []
  }

  try {
    // Test 1: Verificar si hay proyectos
    const projects = await db.project.findMany({ take: 1, select: { id: true, name: true } })
    results.tests.push({ name: 'Proyectos encontrados', success: true, count: projects.length })
    
    if (projects.length === 0) {
      return NextResponse.json({ ...results, error: 'No hay proyectos' })
    }

    const projectId = projects[0].id

    // Test 2: Verificar usuarios
    const users = await db.user.findMany({ take: 1, select: { id: true, email: true, name: true } })
    results.tests.push({ name: 'Usuarios encontrados', success: true, count: users.length })

    if (users.length === 0) {
      return NextResponse.json({ ...results, error: 'No hay usuarios' })
    }

    const userId = users[0].id

    // Test 3: Intentar crear ProjectMember SIN zonas primero
    try {
      // Verificar si ya existe
      const existing = await db.projectMember.findUnique({
        where: { userId_projectId: { userId, projectId } }
      })

      if (existing) {
        results.tests.push({ name: 'ProjectMember ya existe', success: true, memberId: existing.id })
      } else {
        const member = await db.projectMember.create({
          data: {
            userId,
            projectId,
            role: 'empleado'
          }
        })
        results.tests.push({ name: 'ProjectMember creado (sin zonas)', success: true, memberId: member.id })
        
        // Borrarlo para no dejar datos basura
        await db.projectMember.delete({ where: { id: member.id } })
      }
    } catch (e: any) {
      results.tests.push({ name: 'ProjectMember crear (sin zonas)', success: false, error: e.message })
    }

    // Test 4: Obtener zonas del proyecto
    const zones = await db.zone.findMany({
      where: { projectId },
      select: { id: true, name: true },
      take: 1
    })
    results.tests.push({ name: 'Zonas del proyecto', success: true, count: zones.length })

    if (zones.length > 0) {
      const zoneId = zones[0].id

      // Test 5: Crear ProjectMember CON MemberZone
      try {
        // Primero verificar si existe y borrar si es necesario
        const existing = await db.projectMember.findUnique({
          where: { userId_projectId: { userId, projectId } }
        })
        if (existing) {
          await db.projectMember.delete({ where: { id: existing.id } })
        }

        const memberWithZones = await db.projectMember.create({
          data: {
            userId,
            projectId,
            role: 'empleado',
            MemberZone: {
              create: [{ zoneId }]
            }
          },
          include: {
            MemberZone: {
              include: { Zone: true }
            }
          }
        })
        results.tests.push({ 
          name: 'ProjectMember creado CON MemberZone', 
          success: true, 
          memberId: memberWithZones.id,
          zoneCount: memberWithZones.MemberZone?.length || 0
        })

        // Limpiar - borrar el miembro creado
        await db.projectMember.delete({ where: { id: memberWithZones.id } })

      } catch (e: any) {
        results.tests.push({ 
          name: 'ProjectMember crear CON MemberZone', 
          success: false, 
          error: e.message,
          stack: e.stack?.substring(0, 500)
        })
      }
    }

    return NextResponse.json(results)

  } catch (error: any) {
    return NextResponse.json({
      ...results,
      error: error.message,
      stack: error.stack?.substring(0, 1000)
    }, { status: 500 })
  }
}
