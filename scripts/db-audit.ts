/**
 * Database Audit Script - Verifies ALL tables have expected data
 * Run: npx tsx scripts/db-audit.ts
 */

import { PrismaClient } from '@prisma/client'

// Set DATABASE_URL for local scripts
process.env.DATABASE_URL = 'postgresql://neondb_owner:npg_VeJs3ZAjUwp4@ep-round-glitter-as6ryhe3.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const db = new PrismaClient()

interface TableStatus {
  table: string
  count: number
  status: 'OK' | 'WARNING' | 'EMPTY' | 'ERROR'
  details: string
}

async function auditDatabase() {
  console.log('╔══════════════════════════════════════════════════════════════╗')
  console.log('║          BASE DE DATOS - AUDIT COMPLETO                     ║')
  console.log('╚══════════════════════════════════════════════════════════════╝\n')

  const results: TableStatus[] = []

  // ─── 1. USERS ─────────────────────────────────────────────────────────────
  try {
    const users = await db.user.findMany({
      include: { _count: { select: { companies: true, projects: true } } }
    })
    const activeUsers = users.filter(u => u.active).length
    results.push({
      table: 'User',
      count: users.length,
      status: users.length >= 7 ? 'OK' : 'WARNING',
      details: `${activeUsers} activos, ${users.length - activeUsers} inactivos | Roles: ${[...new Set(users.map(u => u.role))].join(', ')}`
    })
    console.log(`📊 Users: ${users.length} (${activeUsers} activos)`)
    users.forEach(u => {
      console.log(`   - ${u.name} (${u.role}) | ${u.email} | companies: ${u._count.companies} | projects: ${u._count.projects}`)
    })
  } catch (e: any) {
    results.push({ table: 'User', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ Users ERROR: ${e.message}`)
  }

  // ─── 2. COMPANIES ─────────────────────────────────────────────────────────
  try {
    const companies = await db.company.findMany({
      include: { 
        _count: { select: { members: true, projects: true, templates: true } }
      }
    })
    results.push({
      table: 'Company',
      count: companies.length,
      status: companies.length >= 1 ? 'OK' : 'WARNING',
      details: `${companies.length} empresa(s)`
    })
    console.log(`\n📊 Companies: ${companies.length}`)
    companies.forEach(c => {
      console.log(`   - ${c.name} | members: ${c._count.members} | projects: ${c._count.projects} | templates: ${c._count.templates}`)
    })
  } catch (e: any) {
    results.push({ table: 'Company', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ Companies ERROR: ${e.message}`)
  }

  // ─── 3. COMPANY MEMBERS ────────────────────────────────────────────────────
  try {
    const companyMembers = await db.companyMember.findMany({
      include: { user: { select: { name: true, email: true, role: true } }, company: { select: { name: true } } }
    })
    results.push({
      table: 'CompanyMember',
      count: companyMembers.length,
      status: companyMembers.length >= 6 ? 'OK' : 'WARNING',
      details: `${companyMembers.length} miembros en empresas`
    })
    console.log(`\n📊 CompanyMembers: ${companyMembers.length}`)
    companyMembers.forEach(cm => {
      console.log(`   - ${cm.user.name} → ${cm.company.name} (rol: ${cm.role})`)
    })
  } catch (e: any) {
    results.push({ table: 'CompanyMember', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ CompanyMembers ERROR: ${e.message}`)
  }

  // ─── 4. PROJECTS ──────────────────────────────────────────────────────────
  try {
    const projects = await db.project.findMany({
      include: { 
        _count: { select: { zones: true, members: true, inventoryItems: true, photos: true } },
        company: { select: { name: true } }
      }
    })
    results.push({
      table: 'Project',
      count: projects.length,
      status: projects.length >= 1 ? 'OK' : 'WARNING',
      details: `${projects.length} proyecto(s)`
    })
    console.log(`\n📊 Projects: ${projects.length}`)
    projects.forEach(p => {
      console.log(`   - ${p.name} | empresa: p.company?.name || 'Sin empresa'} | zones: ${p._count.zones} | members: ${p._count.members}`)
    })
  } catch (e: any) {
    results.push({ table: 'Project', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ Projects ERROR: ${e.message}`)
  }

  // ─── 5. ZONES ────────────────────────────────────────────────────────────
  try {
    const zones = await db.zone.findMany({
      include: { 
        project: { select: { name: true } },
        boardConfig: { select: { name: true } },
        responsable: { select: { name: true } }
      }
    })
    results.push({
      table: 'Zone',
      count: zones.length,
      status: zones.length >= 3 ? 'OK' : 'WARNING',
      details: `${zones.length} zona(s)`
    })
    console.log(`\n📊 Zones: ${zones.length}`)
    zones.forEach(z => {
      console.log(`   - ${z.name} | proyecto: ${z.project.name} | boardConfig: ${z.boardConfig?.name || 'SIN CONFIG'} | responsable: ${z.responsable?.name || 'NINGUNO'}`)
    })
  } catch (e: any) {
    results.push({ table: 'Zone', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ Zones ERROR: ${e.message}`)
  }

  // ─── 6. PROJECT MEMBERS ───────────────────────────────────────────────────
  try {
    const projectMembers = await db.projectMember.findMany({
      include: {
        user: { select: { name: true, email: true, role: true } },
        project: { select: { name: true } },
        zones: { include: { zone: { select: { name: true } } } }
      }
    })
    results.push({
      table: 'ProjectMember',
      count: projectMembers.length,
      status: projectMembers.length >= 1 ? 'OK' : 'WARNING',
      details: `${projectMembers.length} miembro(s) en proyecto(s)`
    })
    console.log(`\n📊 ProjectMembers: ${projectMembers.length}`)
    projectMembers.forEach(pm => {
      const zoneNames = pm.zones.map(mz => mz.zone.name).join(', ') || 'SIN ZONAS'
      console.log(`   - ${pm.user.name} → ${pm.project.name} (rol: ${pm.role}) | zonas: [${zoneNames}]`)
    })
  } catch (e: any) {
    results.push({ table: 'ProjectMember', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ ProjectMembers ERROR: ${e.message}`)
  }

  // ─── 7. TEMPLATES ────────────────────────────────────────────────────────
  try {
    const templates = await db.template.groupBy({
      by: ['type'],
      _count: { id: true },
      where: { active: true }
    })
    const totalTemplates = templates.reduce((sum, t) => sum + t._count.id, 0)
    const templateDetails = templates.map(t => `${t.type}: ${t._count.id}`).join(', ')
    results.push({
      table: 'Template',
      count: totalTemplates,
      status: totalTemplates >= 30 ? 'OK' : 'WARNING',
      details: templateDetails
    })
    console.log(`\n📊 Templates: ${totalTemplates} (activos)`)
    templates.forEach(t => {
      console.log(`   - ${t.type}: ${t._count.id}`)
    })
  } catch (e: any) {
    results.push({ table: 'Template', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ Templates ERROR: ${e.message}`)
  }

  // ─── 8. BOARD CONFIGURATIONS ─────────────────────────────────────────────
  try {
    const boardConfigs = await db.boardConfiguration.findMany({
      include: { _count: { select: { slots: true, zones: true } } }
    })
    results.push({
      table: 'BoardConfiguration',
      count: boardConfigs.length,
      status: boardConfigs.length >= 1 ? 'OK' : 'WARNING',
      details: `${boardConfigs.length} configuración(es)`
    })
    console.log(`\n📊 BoardConfigurations: ${boardConfigs.length}`)
    boardConfigs.forEach(bc => {
      console.log(`   - ${bc.name} (default: ${bc.isDefault}) | slots: ${bc._count.slots} | zones usándola: ${bc._count.zones}`)
    })
  } catch (e: any) {
    results.push({ table: 'BoardConfiguration', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ BoardConfigurations ERROR: ${e.message}`)
  }

  // ─── 9. BOARD SLOTS ──────────────────────────────────────────────────────
  try {
    const boardSlots = await db.boardSlot.findMany({
      include: { 
        boardConfig: { select: { name: true } },
        _count: { select: { standards: true, templates: true } }
      }
    })
    results.push({
      table: 'BoardSlot',
      count: boardSlots.length,
      status: boardSlots.length >= 15 ? 'OK' : 'WARNING',
      details: `${boardSlots.length} slot(s)`
    })
    console.log(`\n📊 BoardSlots: ${boardSlots.length}`)
    boardSlots.forEach(bs => {
      console.log(`   - ${bs.boardConfig.name} | S${bs.sStep}.${bs.miniStep} | standards: ${bs._count.standards} | templates: ${bs._count.templates}`)
    })
  } catch (e: any) {
    results.push({ table: 'BoardSlot', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ BoardSlots ERROR: ${e.message}`)
  }

  // ─── 10. SUBSCRIPTIONS ───────────────────────────────────────────────────
  try {
    const subscriptions = await db.subscription.findMany({
      include: { company: { select: { name: true } } }
    })
    results.push({
      table: 'Subscription',
      count: subscriptions.length,
      status: subscriptions.length >= 1 ? 'OK' : 'WARNING',
      details: `${subscriptions.length} suscripción(es)`
    })
    console.log(`\n📊 Subscriptions: ${subscriptions.length}`)
    subscriptions.forEach(s => {
      console.log(`   - ${s.company.name} | plan: ${s.plan} | status: ${s.status} | maxUsers: ${s.maxUsers} | maxProjects: ${s.maxProjects}`)
    })
  } catch (e: any) {
    results.push({ table: 'Subscription', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ Subscriptions ERROR: ${e.message}`)
  }

  // ─── 11. SYSTEM CONFIG ───────────────────────────────────────────────────
  try {
    const systemConfigs = await db.systemConfig.findMany()
    results.push({
      table: 'SystemConfig',
      count: systemConfigs.length,
      status: 'OK', // Can be empty
      details: `${systemConfigs.length} configuración(es)`
    })
    console.log(`\n📊 SystemConfigs: ${systemConfigs.length}`)
    systemConfigs.forEach(sc => {
      console.log(`   - ${sc.key}: ${sc.value.substring(0, 50)}...`)
    })
  } catch (e: any) {
    results.push({ table: 'SystemConfig', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ SystemConfigs ERROR: ${e.message}`)
  }

  // ─── 12. ZONE ALGORITHM CONFIG ──────────────────────────────────────────
  try {
    const zoneAlgoConfig = await db.zoneAlgorithmConfig.findFirst()
    results.push({
      table: 'ZoneAlgorithmConfig',
      count: zoneAlgoConfig ? 1 : 0,
      status: zoneAlgoConfig ? 'OK' : 'WARNING',
      details: zoneAlgoConfig ? `maxM2PorZona: ${zoneAlgoConfig.maxM2PorZona}` : 'No configurado'
    })
    console.log(`\n📊 ZoneAlgorithmConfig: ${zoneAlgoConfig ? 'CONFIGURADO' : 'SIN CONFIGURAR'}`)
    if (zoneAlgoConfig) {
      console.log(`   - maxM2PorZona: ${zoneAlgoConfig.maxM2PorZona} | defaultPrefix: ${zoneAlgoConfig.defaultPrefix}`)
    }
  } catch (e: any) {
    results.push({ table: 'ZoneAlgorithmConfig', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ ZoneAlgorithmConfig ERROR: ${e.message}`)
  }

  // ─── 13. INVENTORY ITEMS ────────────────────────────────────────────────
  try {
    const inventoryItems = await db.inventoryItem.findMany({
      include: { 
        project: { select: { name: true } },
        zone: { select: { name: true } }
      }
    })
    results.push({
      table: 'InventoryItem',
      count: inventoryItems.length,
      status: 'OK', // Can be empty initially
      details: `${inventoryItems.length} ítem(s)`
    })
    console.log(`\n📊 InventoryItems: ${inventoryItems.length}`)
    if (inventoryItems.length > 0 && inventoryItems.length <= 20) {
      inventoryItems.forEach(item => {
        console.log(`   - ${item.name} | S${item.sStep} | ${item.category} | qty: ${item.quantity}`)
      })
    } else if (inventoryItems.length > 20) {
      console.log(`   ... (demasiados para mostrar todos)`)
    }
  } catch (e: any) {
    results.push({ table: 'InventoryItem', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ InventoryItems ERROR: ${e.message}`)
  }

  // ─── 14. PHOTO LIBRARY ──────────────────────────────────────────────────
  try {
    const photoCount = await db.photoLibrary.count()
    results.push({
      table: 'PhotoLibrary',
      count: photoCount,
      status: 'OK', // Can be empty initially
      details: `${photoCount} foto(s)`
    })
    console.log(`\n📊 PhotoLibrary: ${photoCount} fotos`)
  } catch (e: any) {
    results.push({ table: 'PhotoLibrary', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ PhotoLibrary ERROR: ${e.message}`)
  }

  // ─── 15. PROGRESS ───────────────────────────────────────────────────────
  try {
    const progressRecords = await db.progress.findMany({
      include: { project: { select: { name: true } }, zone: { select: { name: true } } }
    })
    results.push({
      table: 'Progress',
      count: progressRecords.length,
      status: 'OK', // Can be empty initially
      details: `${progressRecords.length} registro(s)`
    })
    console.log(`\n📊 Progress: ${progressRecords.length} registros`)
    if (progressRecords.length <= 15) {
      progressRecords.forEach(p => {
        console.log(`   - S${p.sStep}.${p.miniStep} | ${p.project.name} | ${p.zone?.name || 'global'} | completed: ${p.completed}`)
      })
    }
  } catch (e: any) {
    results.push({ table: 'Progress', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ Progress ERROR: ${e.message}`)
  }

  // ─── 16. AUDIT RESULTS ──────────────────────────────────────────────────
  try {
    const auditResults = await db.auditResult.count()
    results.push({
      table: 'AuditResult',
      count: auditResults,
      status: 'OK',
      details: `${auditResults} auditoría(s)`
    })
    console.log(`\n📊 AuditResult: ${auditResults}`)
  } catch (e: any) {
    results.push({ table: 'AuditResult', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ AuditResult ERROR: ${e.message}`)
  }

  // ─── 17. ACTION ITEMS ───────────────────────────────────────────────────
  try {
    const actionItems = await db.actionItem.count()
    results.push({
      table: 'ActionItem',
      count: actionItems,
      status: 'OK',
      details: `${actionItems} acción(es)`
    })
    console.log(`\n📊 ActionItem: ${actionItems}`)
  } catch (e: any) {
    results.push({ table: 'ActionItem', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ ActionItem ERROR: ${e.message}`)
  }

  // ─── 18. SESSIONS ───────────────────────────────────────────────────────
  try {
    const sessions = await db.session.count()
    results.push({
      table: 'Session',
      count: sessions,
      status: 'OK',
      details: `${sessions} sesión(es) activa(s)`
    })
    console.log(`\n📊 Session: ${sessions} sesiones activas`)
  } catch (e: any) {
    results.push({ table: 'Session', count: 0, status: 'ERROR', details: e.message })
    console.error(`❌ Session ERROR: ${e.message}`)
  }

  // ════════════════════════════════════════════════════════════════════════
  // SUMMARY
  // ════════════════════════════════════════════════════════════════════════
  console.log('\n╔══════════════════════════════════════════════════════════════╗')
  console.log('║                      RESUMEN AUDIT                         ║')
  console.log('╠══════════════════════════════════════════════════════════════╣')
  
  let okCount = 0, warningCount = 0, errorCount = 0
  
  results.forEach(r => {
    const icon = r.status === 'OK' ? '✅' : r.status === 'WARNING' ? '⚠️' : '❌'
    console.log(`║ ${icon} ${r.table.padEnd(25)} ${r.count.toString().padStart(5)}  ${r.status.padEnd(7)} ║`)
    if (r.status === 'OK') okCount++
    else if (r.status === 'WARNING') warningCount++
    else errorCount++
  })
  
  console.log('╠══════════════════════════════════════════════════════════════╣')
  console.log(`║  Total: ${results.length} tablas | ✅ ${okCount} OK | ⚠️ ${warningCount} WARNING | ❌ ${errorCount} ERRORS`.padEnd(59) + ' ║')
  console.log('╚══════════════════════════════════════════════════════════════╝')

  // Return issues
  const issues = results.filter(r => r.status !== 'OK')
  if (issues.length > 0) {
    console.log('\n⚠️  ISSUES REQUIRING ATTENTION:')
    issues.forEach(i => {
      console.log(`   - ${i.table}: ${i.details}`)
    })
  }

  return results
}

auditDatabase()
  .then(results => {
    const hasErrors = results.some(r => r.status === 'ERROR')
    process.exit(hasErrors ? 1 : 0)
  })
  .catch(err => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
