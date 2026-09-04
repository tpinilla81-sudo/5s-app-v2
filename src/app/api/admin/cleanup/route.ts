import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

// POST /api/admin/cleanup - Limpia datos residuos/inconsistentes
// Elimina: usuarios huérfanos, MemberZone sin referencia, datos inconsistentes

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
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

    const results: any = {
      timestamp: new Date().toISOString(),
      executedBy: currentUser.email,
      cleanup: {}
    }

    console.log(`[cleanup] Iniciado por: ${currentUser.email}`)

    // ─── 1. Encontrar MemberZone huérfanos (sin ProjectMember válido) ───
    try {
      const allMemberZones = await db.memberZone.findMany({
        select: { id: true, memberId: true, zoneId: true }
      })

      let orphanMemberZones = 0
      for (const mz of allMemberZones) {
        const memberExists = await db.projectMember.findUnique({
          where: { id: mz.memberId },
          select: { id: true }
        })
        
        if (!memberExists) {
          await db.memberZone.delete({ where: { id: mz.id } })
          orphanMemberZones++
        }
      }
      results.cleanup.orphanMemberZonesRemoved = orphanMemberZones
      console.log(`[cleanup] MemberZone huérfanos eliminados: ${orphanMemberZones}`)
    } catch (e: any) {
      results.cleanup.orphanMemberZonesError = e.message
    }

    // ─── 2. Encontrar MemberZone con Zone inválida ───
    try {
      const remainingMemberZones = await db.memberZone.findMany({
        select: { id: true, zoneId: true }
      })

      let invalidZoneMemberZones = 0
      for (const mz of remainingMemberZones) {
        const zoneExists = await db.zone.findUnique({
          where: { id: mz.zoneId },
          select: { id: true }
        })
        
        if (!zoneExists) {
          await db.memberZone.delete({ where: { id: mz.id } })
          invalidZoneMemberZones++
        }
      }
      results.cleanup.invalidZoneMemberZonesRemoved = invalidZoneMemberZones
      console.log(`[cleanup] MemberZone con zona inválida eliminados: ${invalidZoneMemberZones}`)
    } catch (e: any) {
      results.cleanup.invalidZoneError = e.message
    }

    // ─── 3. Encontrar ProjectMember sin User válido ───
    try {
      const allProjectMembers = await db.projectMember.findMany({
        select: { id: true, userId: true }
      })

      let invalidUserMembers = 0
      for (const pm of allProjectMembers) {
        const userExists = await db.user.findUnique({
          where: { id: pm.userId },
          select: { id: true }
        })
        
        if (!userExists) {
          // Primero eliminar MemberZone asociados
          await db.memberZone.deleteMany({ where: { memberId: pm.id } })
          // Luego eliminar el ProjectMember
          await db.projectMember.delete({ where: { id: pm.id } })
          invalidUserMembers++
        }
      }
      results.cleanup.invalidUserMembersRemoved = invalidUserMembers
      console.log(`[cleanup] ProjectMember con usuario inválido eliminados: ${invalidUserMembers}`)
    } catch (e: any) {
      results.cleanup.invalidUserMembersError = e.message
    }

    // ─── 4. Encontrar ProjectMember sin Project válido ───
    try {
      const remainingProjectMembers = await db.projectMember.findMany({
        select: { id: true, projectId: true }
      })

      let invalidProjectMembers = 0
      for (const pm of remainingProjectMembers) {
        const projectExists = await db.project.findUnique({
          where: { id: pm.projectId },
          select: { id: true }
        })
        
        if (!projectExists) {
          await db.memberZone.deleteMany({ where: { memberId: pm.id } })
          await db.projectMember.delete({ where: { id: pm.id } })
          invalidProjectMembers++
        }
      }
      results.cleanup.invalidProjectMembersRemoved = invalidProjectMembers
      console.log(`[cleanup] ProjectMember con proyecto inválido eliminados: ${invalidProjectMembers}`)
    } catch (e: any) {
      results.cleanup.invalidProjectError = e.message
    }

    // ─── 5. Encontrar CompanyMember sin User válido ───
    try {
      const allCompanyMembers = await db.companyMember.findMany({
        select: { id: true, userId: true }
      })

      let invalidCompanyMembers = 0
      for (const cm of allCompanyMembers) {
        const userExists = await db.user.findUnique({
          where: { id: cm.userId },
          select: { id: true }
        })
        
        if (!userExists) {
          await db.companyMember.delete({ where: { id: cm.id } })
          invalidCompanyMembers++
        }
      }
      results.cleanup.invalidCompanyMembersRemoved = invalidCompanyMembers
      console.log(`[cleanup] CompanyMember con usuario inválido eliminados: ${invalidCompanyMembers}`)
    } catch (e: any) {
      results.cleanup.invalidCompanyMembersError = e.message
    }

    // ─── 6. Encontrar CompanyMember sin Company válido ───
    try {
      const remainingCompanyMembers = await db.companyMember.findMany({
        select: { id: true, companyId: true }
      })

      let invalidCompanyRefs = 0
      for (const cm of remainingCompanyMembers) {
        const companyExists = await db.company.findUnique({
          where: { id: cm.companyId },
          select: { id: true }
        })
        
        if (!companyExists) {
          await db.companyMember.delete({ where: { id: cm.id } })
          invalidCompanyRefs++
        }
      }
      results.cleanup.invalidCompanyRefsRemoved = invalidCompanyRefs
      console.log(`[cleanup] CompanyMember con empresa inválida eliminados: ${invalidCompanyRefs}`)
    } catch (e: any) {
      results.cleanup.invalidCompanyRefError = e.message
    }

    // ─── 7. Contar usuarios activos vs totales ───
    try {
      const totalUsers = await db.user.count()
      const activeUsers = await db.user.count({ where: { active: true } })
      const usersWithCompany = await db.companyMember.groupBy({
        by: ['userId'],
        _count: true
      })
      const usersWithProject = await db.projectMember.groupBy({
        by: ['userId'],
        _count: true
      })

      results.summary = {
        totalUsers,
        activeUsers,
        usersWithCompanyMembership: usersWithCompany.length,
        usersWithProjectMembership: usersWithProject.length,
        orphanedUsers: activeUsers - new Set(usersWithProject.map(u => u.userId)).size
      }
    } catch (e: any) {
      results.summaryError = e.message
    }

    console.log('[cleanup] Completado:', results)

    return NextResponse.json({
      success: true,
      message: 'Limpieza completada',
      ...results
    })

  } catch (error) {
    console.error('[cleanup] Error:', error)
    return NextResponse.json(
      { error: 'Error en limpieza: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    )
  }
}
