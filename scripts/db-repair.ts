/**
 * Database Repair Script - Fixes missing project members and zone assignments
 * Run: npx tsx scripts/db-repair.ts
 */

import { PrismaClient } from '@prisma/client'

process.env.DATABASE_URL = 'postgresql://neondb_owner:npg_VeJs3ZAjUwp4@ep-round-glitter-as6ryhe3.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const db = new PrismaClient()

async function repairDatabase() {
  console.log('╔══════════════════════════════════════════════════════════════╗')
  console.log('║          BASE DE DATOS - REPARACIÓN AUTOMÁTICA               ║')
  console.log('╚══════════════════════════════════════════════════════════════╝\n')

  // ─── Get current data ────────────────────────────────────────────────
  const project = await db.project.findFirst()
  if (!project) {
    console.error('❌ No hay proyectos en la base de datos')
    return
  }
  
  const zones = await db.zone.findMany({ where: { projectId: project.id } })
  const allUsers = await db.user.findMany({ orderBy: { role: 'asc' } })
  const companyMembers = await db.companyMember.findMany()
  
  console.log(`📋 Proyecto: ${project.name} (${project.id})`)
  console.log(`📋 Zonas encontradas: ${zones.length}`)
  console.log(`📋 Usuarios totales: ${allUsers.length}`)
  console.log(`📋 CompanyMembers: ${companyMembers.length}\n`)

  let addedProjectMembers = 0
  let addedMemberZones = 0
  let updatedZones = 0

  // ─── 1. ADD MISSING PROJECT MEMBERS ─────────────────────────────────
  console.log('━━━ 1. AGREGANDO MIEMBROS AL PROYECTO ━━━')
  
  for (const user of allUsers) {
    // Skip gestor (platform owner, not in companies)
    if (user.role === 'gestor') {
      console.log(`   ⏭️  ${user.name} (gestor) - omitido, es dueño de plataforma`)
      continue
    }

    // Check if already in project
    const existing = await db.projectMember.findFirst({
      where: { userId: user.id, projectId: project.id }
    })

    if (!existing) {
      // Get their company role to determine project role
      const companyMember = companyMembers.find(cm => cm.userId === user.id)
      const projectRole = mapCompanyRoleToProjectRole(user.role, companyMember?.role)
      
      try {
        await db.projectMember.create({
          data: {
            userId: user.id,
            projectId: project.id,
            role: projectRole,
          }
        })
        console.log(`   ✅ ${user.name} → agregado como [${projectRole}]`)
        addedProjectMembers++
      } catch (e: any) {
        console.log(`   ❌ Error agregando ${user.name}: ${e.message.substring(0, 50)}`)
      }
    } else {
      console.log(`   ✅ ${user.name} → ya existe como [${existing.role}]`)
    }
  }

  // ─── 2. ASSIGN ZONES TO MEMBERS ────────────────────────────────────
  console.log('\n━━━ 2. ASIGNANDO ZONAS A MIEMBROS ━━━')
  
  const allProjectMembers = await db.projectMember.findMany({
    where: { projectId: project.id },
    include: { user: { select: { name: true, role: true } } }
  })

  for (const pm of allProjectMembers) {
    // Check if member already has zones
    const existingZones = await db.memberZone.findMany({
      where: { memberId: pm.id }
    })

    if (existingZones.length === 0 && zones.length > 0) {
      // Assign zones based on role
      const zonesToAssign = getZonesForRole(pm.user.role, zones)
      
      for (const zone of zonesToAssign) {
        try {
          await db.memberZone.create({
            data: {
              memberId: pm.id,
              zoneId: zone.id,
            }
          })
          console.log(`   ✅ ${pm.user.name} → zona "${zone.name}"`)
          addedMemberZones++
        } catch (e: any) {
          if (!e.message.includes('Unique constraint')) {
            console.log(`   ❌ Error asignando zona a ${pm.user.name}: ${e.message.substring(0, 50)}`)
          }
        }
      }
      
      if (zonesToAssign.length === 0) {
        console.log(`   ⏭️  ${pm.user.name} (${pm.user.role}) - sin zonas asignadas por rol`)
      }
    } else {
      console.log(`   ✅ ${pm.user.name} → ya tiene ${existingZones.length} zona(s)`)
    }
  }

  // ─── 3. ASSIGN ZONE RESPONSABLES ───────────────────────────────────
  console.log('\n━━━ 3. ASIGNANDO RESPONSABLES DE ZONA ━━━')
  
  // Find users with appropriate roles for zone responsibility
  const gerente = allProjectMembers.find(pm => pm.user.role === 'gerente')
  const responsable = allProjectMembers.find(pm => pm.user.role === 'responsable')
  
  for (let i = 0; i < zones.length; i++) {
    const zone = zones[i]
    
    if (!zone.responsableId) {
      // Assign first zone to gerente or responsable, others rotate
      let assignedUser = i === 0 ? (responsable || gerente) : allProjectMembers[i % allProjectMembers.length]
      
      if (assignedUser) {
        try {
          await db.zone.update({
            where: { id: zone.id },
            data: { responsableId: assignedUser.userId }
          })
          console.log(`   ✅ Zona "${zone.name}" → responsable: ${assignedUser.user.name}`)
          updatedZones++
        } catch (e: any) {
          console.log(`   ❌ Error actualizando zona ${zone.name}: ${e.message.substring(0, 50)}`)
        }
      }
    } else {
      const respUser = await db.user.findUnique({ where: { id: zone.responsableId }, select: { name: true } })
      console.log(`   ✅ Zona "${zone.name}" → ya tiene responsable: ${respUser?.name}`)
    }
  }

  // ─── SUMMARY ───────────────────────────────────────────────────────
  console.log('\n╔══════════════════════════════════════════════════════════════╗')
  console.log('║                    RESUMEN DE REPARACIONES                  ║')
  console.log('╠══════════════════════════════════════════════════════════════╣')
  console.log(`║  Miembros de proyecto agregados:  ${addedProjectMembers.toString().padStart(3)}                         ║`)
  console.log(`║  Asignaciones de zona creadas:     ${addedMemberZones.toString().padStart(3)}                         ║`)
  console.log(`║  Responsables de zona asignados:  ${updatedZones.toString().padStart(3)}                         ║`)
  console.log('╚══════════════════════════════════════════════════════════════╝')

  // Verify final state
  console.log('\n📊 ESTADO FINAL:')
  const finalProjectMembers = await db.projectMember.count({ where: { projectId: project.id } })
  const finalMemberZones = await db.memberZone.count()
  const zonesWithResponsable = await db.zone.count({
    where: { projectId: project.id, responsableId: { not: null } }
  })
  
  console.log(`   ProjectMembers: ${finalProjectMembers}`)
  console.log(`   MemberZones: ${finalMemberZones}`)
  console.log(`   Zonas con responsable: ${zonesWithResponsable}/${zones.length}`)

  if (addedProjectMembers > 0 || addedMemberZones > 0 || updatedZones > 0) {
    console.log('\n✅ Base de datos reparada exitosamente!')
  } else {
    console.log('\n⚠️  No se realizaron cambios (datos ya correctos)')
  }
}

// Helper: Map company role to project role
function mapCompanyRoleToProjectRole(userRole: string, companyRole?: string): string {
  switch (userRole) {
    case 'admin': return 'admin'
    case 'gerente': return 'gerente'
    case 'responsable': return 'responsable'
    case 'empleado': return 'empleado'
    case 'auditor': return 'auditor'
    default: return companyRole || 'empleado'
  }
}

// Helper: Get which zones a role should have access to
function getZonesForRole(role: string, zones: Array<{ id: string; name: string }>): Array<{ id: string; name: string }> {
  switch (role) {
    case 'admin':
    case 'gerente':
      return zones // All zones
    case 'responsable':
      return zones.slice(0, Math.ceil(zones.length / 2)) // First half
    case 'empleado':
      return [zones[0]] // Just first zone
    case 'auditor':
      return zones // All zones for auditing
    default:
      return []
  }
}

repairDatabase()
  .then(() => process.exit(0))
  .catch(e => {
    console.error('Error fatal:', e)
    process.exit(1)
  })
