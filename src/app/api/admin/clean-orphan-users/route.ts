import { NextResponse } from 'next/server'
import { db from '../../../../lib/db'
import { getAuthUser } from '../../../../lib/auth-helpers'

// POST /api/admin/clean-orphan-users - Eliminar usuarios huérfanos (sin empresa)
// v3.0.65: Limpieza de usuarios que quedaron de versiones anteriores
//
// Un usuario huérfano es aquel que:
// - NO es gestor (el gestor del sistema siempre se conserva)
// - NO tiene ningún CompanyMember (no pertenece a ninguna empresa)
export async function POST(request: Request) {
  try {
    const user = await getAuthUser(request as any)
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }
    
    if (user.role !== 'gestor') {
      return NextResponse.json({ 
        success: false, 
        error: 'Solo el gestor puede limpiar usuarios huérfanos' 
      }, { status: 403 })
    }

    console.log(`[clean-orphan-users v3.0.65] Iniciando limpieza de usuarios huérfanos...`)
    
    // ── 1. Encontrar todos los usuarios NO gestores sin CompanyMember ──
    const orphanUsers = await db.user.findMany({
      where: {
        role: { not: 'gestor' },
        CompanyMember: { none: {} }  // Sin ninguna relación CompanyMember
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    })
    
    console.log(`[clean-orphan-users] Usuarios huérfanos identificados: ${orphanUsers.length}`)
    if (orphanUsers.length > 0) {
      console.log(`[clean-orphan-users] Lista:`, orphanUsers.map(u => ({ id: u.id, email: u.email })))
    } else {
      console.log(`[clean-orphan-users] ✅ No hay usuarios huérfanos!`)
    }
    
    // ── 2. Borrar cada usuario huérfano y todos sus datos ──
    let deletedCount = 0
    const errors: Array<{email: string, error: string}> = []
    
    for (const orphan of orphanUsers) {
      try {
        console.log(`[clean-orphan-users] Procesando usuario huérfano: ${orphan.email} (${orphan.role})`)
        const uid = orphan.id
        
        // 2a. Sessions
        await db.session.deleteMany({ where: { userId: uid } }).catch(() => {})
        
        // 2b. Notifications (¡sin cascade!)
        await db.notification.deleteMany({ where: { userId: uid } }).catch(() => {})
        
        // 2c. EmployeeProgress
        await db.employeeProgress.deleteMany({ where: { userId: uid } }).catch(() => {})
        
        // 2d. InventoryItems creados por este usuario
        await db.inventoryItem.deleteMany({ where: { createdById: uid } }).catch(() => {})
        
        // 2e. ProjectMembers y sus MemberZones
        const projectMembers = await db.projectMember.findMany({
          where: { userId: uid },
          select: { id: true }
        })
        if (projectMembers.length > 0) {
          const pmIds = projectMembers.map(pm => pm.id)
          await db.memberZone.deleteMany({ where: { memberId: { in: pmIds } } }).catch(() => {})
          await db.projectMember.deleteMany({ where: { id: { in: pmIds } } }).catch(() => {})
        }
        
        // 2f. Zonas donde es responsable → poner a null
        await db.zone.updateMany({
          where: { responsableId: uid },
          data: { responsableId: null }
        }).catch(() => {})
        
        // 2g. Proyectos donde es verificador → poner a null
        await db.project.updateMany({
          where: { jaulaVerifiedById: uid },
          data: { jaulaVerifiedById: null }
        }).catch(() => {})
        
        // 2h. Cualquier CompanyMember restante
        await db.companyMember.deleteMany({ where: { userId: uid } }).catch(() => {})
        
        // 2i. Finalmente borrar el usuario
        await db.user.delete({ where: { id: uid } })
        
        deletedCount++
        console.log(`[clean-orphan-users] ✅ Usuario eliminado: ${orphan.email}`)
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err)
        console.error(`[clean-orphan-users] ❌ Error borrando ${orphan.email}:`, errMsg)
        errors.push({ email: orphan.email, error: errMsg })
      }
    }
    
    // ── 3. Obtener estadísticas finales ──
    const finalUserCount = await db.user.count({
      where: { role: { not: 'gestor' } }
    })
    const finalTotalUsers = await db.user.count()
    
    console.log(`[clean-orphan-users] 🎉 LIMPIEZA COMPLETADA:`)
    console.log(`  • Usuarios huérfanos eliminados: ${deletedCount}`)
    console.log(`  • Errores: ${errors.length}`)
    console.log(`  • Usuarios restantes (no-gestor): ${finalUserCount}`)
    
    return NextResponse.json({
      success: true,
      message: `Limpieza completada: ${deletedCount} usuario(s) huérfano(s) eliminado(s)`,
      stats: {
        orphansFound: orphanUsers.length,
        orphansDeleted: deletedCount,
        errors: errors.length,
        finalUserCount,
        finalTotalUsers
      },
      deletedUsers: orphanUsers.map(u => ({
        email: u.email,
        name: u.name,
        role: u.role,
        createdAt: u.createdAt
      })),
      errors: errors.length > 0 ? errors : undefined,
      version: 'v3.0.65'
    })
    
  } catch (error) {
    console.error('[clean-orphan-users] Error general:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error al limpiar usuarios huérfanos',
      version: 'v3.0.65'
    }, { status: 500 })
  }
}

// GET /api/admin/clean-orphan-users - Solo listar usuarios huérfanos sin borrar
export async function GET(request: Request) {
  try {
    const user = await getAuthUser(request as any)
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }
    
    if (user.role !== 'gestor') {
      return NextResponse.json({ 
        success: false, 
        error: 'Solo el gestor puede ver usuarios huérfanos' 
      }, { status: 403 })
    }

    // Encontrar usuarios sin CompanyMember (huérfanos)
    const orphanUsers = await db.user.findMany({
      where: {
        role: { not: 'gestor' },
        CompanyMember: { none: {} }  // Sin ninguna relación CompanyMember
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            Session: true,
            Notification: true,
            EmployeeProgress: true,
            InventoryItem: true,
            ProjectMember: true,
            projects: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: {
        orphanCount: orphanUsers.length,
        orphans: orphanUsers.map(u => ({
          ...u,
          hasSessions: u._count.Session > 0,
          hasNotifications: u._count.Notification > 0,
          hasProgress: u._count.EmployeeProgress > 0,
          hasInventory: u._count.InventoryItem > 0,
          hasProjects: u._count.ProjectMember > 0 || u._count.projects > 0
        }))
      },
      version: 'v3.0.65'
    })
    
  } catch (error) {
    console.error('[clean-orphan-users GET] Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error'
    }, { status: 500 })
  }
}
