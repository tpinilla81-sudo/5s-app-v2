/**
 * Simple Database Count Script - Counts ALL tables
 * Run: npx tsx scripts/db-count.ts
 */

import { PrismaClient } from '@prisma/client'

process.env.DATABASE_URL = 'postgresql://neondb_owner:npg_VeJs3ZAjUwp4@ep-round-glitter-as6ryhe3.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const db = new PrismaClient()

async function countAll() {
  console.log('╔══════════════════════════════════════════════════════════════╗')
  console.log('║          BASE DE DATOS - CONTEO DE REGISTROS               ║')
  console.log('╚══════════════════════════════════════════════════════════════╝\n')

  const counts: { table: string; count: number; status: string }[] = []

  // Simple counts without complex includes
  const tables = [
    { name: 'Users', fn: () => db.user.count() },
    { name: 'Companies', fn: () => db.company.count() },
    { name: 'CompanyMembers', fn: () => db.companyMember.count() },
    { name: 'Projects', fn: () => db.project.count() },
    { name: 'Zones', fn: () => db.zone.count() },
    { name: 'ProjectMembers', fn: () => db.projectMember.count() },
    { name: 'MemberZones', fn: () => db.memberZone.count() },
    { name: 'Templates', fn: () => db.template.count({ where: { active: true } }) },
    { name: 'BoardConfigurations', fn: () => db.boardConfiguration.count() },
    { name: 'BoardSlots', fn: () => db.boardSlot.count() },
    { name: 'BoardSlotStandards', fn: () => db.boardSlotStandard.count() },
    { name: 'BoardSlotTemplates', fn: () => db.boardSlotTemplate.count() },
    { name: 'Subscriptions', fn: () => db.subscription.count() },
    { name: 'SystemConfigs', fn: () => db.systemConfig.count() },
    { name: 'ZoneAlgorithmConfigs', fn: () => db.zoneAlgorithmConfig.count() },
    { name: 'InventoryItems', fn: () => db.inventoryItem.count() },
    { name: 'PhotoLibrary', fn: () => db.photoLibrary.count() },
    { name: 'Progress', fn: () => db.progress.count() },
    { name: 'EmployeeProgress', fn: () => db.employeeProgress.count() },
    { name: 'AuditResults', fn: () => db.auditResult.count() },
    { name: 'AuditTargets', fn: () => db.auditTarget.count() },
    { name: 'ActionItems', fn: () => db.actionItem.count() },
    { name: 'ChecklistResponses', fn: () => db.checklistResponse.count() },
    { name: 'ExamAnswers', fn: () => db.examAnswer.count() },
    { name: 'Standards', fn: () => db.standard.count() },
    { name: 'PDCAItems', fn: () => db.pDCAItem.count() },
    { name: 'EvaluationSchedules', fn: () => db.evaluationSchedule.count() },
    { name: 'Notifications', fn: () => db.notification.count() },
    { name: 'Sessions', fn: () => db.session.count() },
    { name: 'RolePermissionConfigs', fn: () => db.rolePermissionConfig.count() },
  ]

  for (const table of tables) {
    try {
      const count = await table.fn()
      let status = '✅'
      if (count === 0) status = '⚠️  EMPTY'
      
      // Specific expectations
      if (table.name === 'Users' && count < 7) status = '❌ LOW'
      if (table.name === 'Companies' && count < 1) status = '❌ MISSING'
      if (table.name === 'Templates' && count < 30) status = '❌ LOW'
      if (table.name === 'CompanyMembers' && count < 6) status = '❌ LOW'
      if (table.name === 'Zones' && count < 3) status = '❌ LOW'
      if (table.name === 'BoardConfigurations' && count < 1) status = '❌ MISSING'
      
      counts.push({ table: table.name, count, status })
      console.log(`${status} ${table.name.padEnd(25)} : ${count.toString().padStart(5)}`)
    } catch (e: any) {
      counts.push({ table: table.name, count: 0, status: '❌ ERROR' })
      console.log(`❌ ${table.name.padEnd(25)} : ERROR - ${e.message.substring(0, 50)}`)
    }
  }

  // Summary
  console.log('\n╔══════════════════════════════════════════════════════════════╗')
  console.log('║                        RESUMEN                              ║')
  console.log('╠══════════════════════════════════════════════════════════════╣')
  
  const ok = counts.filter(c => c.status === '✅').length
  const empty = counts.filter(c => c.status.includes('EMPTY')).length
  const errors = counts.filter(c => c.status.includes('❌') && !c.status.includes('EMPTY')).length
  
  console.log(`║  Total tablas: ${counts.length.toString().padStart(2)} | ✅ OK: ${ok.toString().padStart(2)} | ⚠️  Vacías: ${empty.toString().padStart(2)} | ❌ Problemas: ${errors.toString().padStart(2)}`.padEnd(59) + ' ║')
  console.log('╚══════════════════════════════════════════════════════════════╝')

  // Detail on issues
  const issues = counts.filter(c => c.status.includes('❌'))
  if (issues.length > 0) {
    console.log('\n⚠️  TABLAS CON PROBLEMAS:')
    issues.forEach(i => {
      console.log(`   - ${i.table}: ${i.count} registros [${i.status}]`)
    })
  }

  return counts
}

countAll()
  .then(counts => {
    const hasErrors = counts.some(c => c.status === '❌ ERROR' || c.status === '❌ MISSING' || c.status === '❌ LOW')
    process.exit(hasErrors ? 1 : 0)
  })
  .catch(err => {
    console.error('Fatal:', err)
    process.exit(1)
  })
