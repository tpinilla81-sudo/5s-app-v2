/**
 * Detailed Investigation Script - Check relationships in detail
 */

import { PrismaClient } from '@prisma/client'

process.env.DATABASE_URL = 'postgresql://neondb_owner:npg_VeJs3ZAjUwp4@ep-round-glitter-as6ryhe3.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const db = new PrismaClient()

async function investigate() {
  console.log('═══════════════════════════════════════════════════════════')
  console.log('INVESTIGACIÓN DETALLADA DE PROBLEMAS')
  console.log('═══════════════════════════════════════════════════════════\n')

  // ─── 1. COMPANY MEMBERS DETAIL ──────────────────────────────────────
  console.log('📋 1. COMPANY MEMBERS (Usuarios en empresa):')
  const companyMembers = await db.companyMember.findMany({
    select: {
      id: true,
      userId: true,
      companyId: true,
      role: true,
    }
  })
  
  for (const cm of companyMembers) {
    const user = await db.user.findUnique({ where: { id: cm.userId }, select: { name: true, email: true, role: true } })
    const company = await db.company.findUnique({ where: { id: cm.companyId }, select: { name: true } })
    console.log(`   ✅ ${user?.name} (${user?.email}) → ${company?.name} [rol empresa: ${cm.role}]`)
  }
  console.log(`   Total: ${companyMembers.length}\n`)

  // ─── 2. PROJECT MEMBERS DETAIL ─────────────────────────────────────
  console.log('📋 2. PROJECT MEMBERS (Miembros en proyecto):')
  const projectMembers = await db.projectMember.findMany({
    select: {
      id: true,
      userId: true,
      projectId: true,
      role: true,
      joinedAt: true,
    }
  })

  for (const pm of projectMembers) {
    const user = await db.user.findUnique({ where: { id: pm.userId }, select: { name: true, email: true, role: true } })
    const project = await db.project.findUnique({ where: { id: pm.projectId }, select: { name: true } })
    console.log(`   ✅ ${user?.name} (${user?.email}) → ${project?.name} [rol proyecto: ${pm.role}]`)
  }
  console.log(`   Total: ${projectMembers.length}`)
  
  if (projectMembers.length < 6) {
    console.log('   ⚠️  ¡FALTAN USUARIOS EN EL PROYECTO!')
    
    // Show users NOT in project
    const allUsers = await db.user.findMany({ select: { id: true, name: true, email: true, role: true } })
    const projectUserIds = projectMembers.map(pm => pm.userId)
    const missingUsers = allUsers.filter(u => !projectUserIds.includes(u.id))
    
    console.log('   Usuarios que NO están en el proyecto:')
    missingUsers.forEach(u => {
      console.log(`      ❌ ${u.name} (${u.email}) - rol: ${u.role}`)
    })
  }
  console.log('')

  // ─── 3. ZONES AND THEIR CONFIG ──────────────────────────────────────
  console.log('📋 3. ZONAS Y CONFIGURACIÓN:')
  const zones = await db.zone.findMany({
    select: {
      id: true,
      name: true,
      projectId: true,
      boardConfigId: true,
      responsableId: true,
    }
  })

  for (const zone of zones) {
    const boardConfig = zone.boardConfigId 
      ? await db.boardConfiguration.findUnique({ where: { id: zone.boardConfigId }, select: { name: true, isDefault: true } })
      : null
    const responsable = zone.responsableId
      ? await db.user.findUnique({ where: { id: zone.responsableId }, select: { name: true } })
      : null
    
    console.log(`   📍 ${zone.name}`)
    console.log(`      ID: ${zone.id}`)
    console.log(`      BoardConfig: ${boardConfig?.name || '❌ SIN CONFIGURAR'} ${boardConfig?.isDefault ? '(default)' : ''}`)
    console.log(`      Responsable: ${responsable?.name || '❌ SIN ASIGNAR'}`)
  }
  console.log('')

  // ─── 4. BOARD CONFIGURATION DETAIL ─────────────────────────────────
  console.log('📋 4. BOARD CONFIGURATIONS:')
  const boardConfigs = await db.boardConfiguration.findMany({
    include: {
      slots: {
        orderBy: { sStep: 'asc' },
        select: { id: true, sStep: true, miniStep: true }
      }
    }
  })

  for (const bc of boardConfigs) {
    console.log(`   🔲 ${bc.name} (default: ${bc.isDefault})`)
    console.log(`      Slots: ${bc.slots.length}`)
    bc.slots.forEach(slot => {
      console.log(`         - S${slot.sStep}.${slot.miniStep}`)
    })
  }
  console.log('')

  // ─── 5. USERS WITHOUT PROJECT ──────────────────────────────────────
  console.log('📋 5. ANÁLISIS DE ASIGNACIONES:')
  const allUsers = await db.user.findMany({ 
    select: { id: true, name: true, email: true, role: true },
    orderBy: { role: 'asc' }
  })
  
  const projectId = (await db.project.findFirst())?.id
  
  for (const user of allUsers) {
    const inCompany = await db.companyMember.findFirst({ where: { userId: user.id } })
    const inProject = await db.projectMember.findFirst({ where: { userId: user.id, projectId: projectId! } })
    const hasZones = inProject ? await db.memberZone.findFirst({ where: { memberId: inProject.id } }) : null
    
    const statusCompany = inCompany ? '✅' : '❌'
    const statusProject = inProject ? '✅' : '❌'
    const statusZones = hasZones ? '✅' : '⚠️'
    
    console.log(`   ${statusCompany}Empresa ${statusProject}Proyecto ${statusZones}Zonas | ${user.name.padEnd(25)} | ${user.email.padEnd(25)} | ${user.role}`)
  }

  console.log('\n═══════════════════════════════════════════════════════════')
  console.log('FIN DE INVESTIGACIÓN')
  console.log('═══════════════════════════════════════════════════════════')
}

investigate()
  .then(() => process.exit(0))
  .catch(e => {
    console.error('Error:', e)
    process.exit(1)
  })
