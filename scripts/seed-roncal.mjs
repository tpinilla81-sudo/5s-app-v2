/**
 * Seed script for Roncal company - creates all demo data directly via Prisma
 * Run: node scripts/seed-roncal.mjs
 */
import { createHash } from 'crypto'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient({
  datasources: { db: { url: 'file:/home/z/my-project/db/custom.db' } }
})

function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex')
}

async function seed() {
  console.log('=== Seeding Roncal Company Data ===')

  // 1. Create gestor user (platform admin)
  const gestorPassword = hashPassword('gestor123')
  const gestor = await db.user.upsert({
    where: { email: 't_pinilla@outlook.com' },
    update: {},
    create: {
      email: 't_pinilla@outlook.com',
      name: 'Gestor',
      password: gestorPassword,
      role: 'gestor',
      active: true,
    }
  })
  console.log('Gestor user created:', gestor.email)

  // 2. Create Roncal company
  const roncal = await db.company.upsert({
    where: { name: 'Roncal' },
    update: {},
    create: {
      name: 'Roncal',
      description: 'Empresa demo para metodología 5S',
      active: true,
      nif: 'B12345678',
      sector: 'Manufactura',
      address: 'Polígono Industrial Roncal',
      city: 'Pamplona',
      province: 'Navarra',
      postalCode: '31001',
      country: 'España',
    }
  })
  console.log('Roncal company created:', roncal.name, roncal.id)

  // 3. Create Project
  const project = await db.project.upsert({
    where: { id: 'roncal-project-1' },
    update: {},
    create: {
      id: 'roncal-project-1',
      name: 'Proyecto 5S Roncal',
      description: 'Implementación de metodología 5S en empresa Roncal',
      company: 'Roncal',
      companyId: roncal.id,
      active: true,
    }
  })
  console.log('Project created:', project.name, project.id)

  // 4. Create Zones
  const zones = []
  const zoneData = [
    { name: 'Almacén', color: '#3B82F6', description: 'Zona de almacenamiento general' },
    { name: 'Producción', color: '#10B981', description: 'Zona de producción y fabricación' },
    { name: 'Mantenimiento', color: '#F59E0B', description: 'Zona de mantenimiento de equipos' },
    { name: 'Oficinas', color: '#8B5CF6', description: 'Zona de oficinas administrativas' },
  ]

  for (const zd of zoneData) {
    // Check if zone already exists for this project
    const existing = await db.zone.findFirst({
      where: { name: zd.name, projectId: project.id }
    })
    if (existing) {
      zones.push(existing)
      console.log('Zone already exists:', existing.name)
    } else {
      const zone = await db.zone.create({
        data: {
          name: zd.name,
          color: zd.color,
          description: zd.description,
          projectId: project.id,
        }
      })
      zones.push(zone)
      console.log('Zone created:', zone.name, zone.id)
    }
  }

  // 5. Create employee users (including "Tablero" as requested)
  const employeeData = [
    { email: 'juan@roncal.com', name: 'Juan Pérez', password: 'juan123' },
    { email: 'maria@roncal.com', name: 'María García', password: 'maria123' },
    { email: 'carlos@roncal.com', name: 'Carlos López', password: 'carlos123' },
    { email: 'ana@roncal.com', name: 'Ana Martínez', password: 'ana123' },
    { email: 'luis@roncal.com', name: 'Luis Rodríguez', password: 'luis123' },
    { email: 'tablero@roncal.com', name: 'Tablero', password: 'tablero123', plainPassword: 'tablero123' },
  ]

  const employees = []
  for (const ed of employeeData) {
    const emp = await db.user.upsert({
      where: { email: ed.email },
      update: {},
      create: {
        email: ed.email,
        name: ed.name,
        password: hashPassword(ed.password),
        plainPassword: ed.plainPassword || ed.password,
        role: 'empleado',
        active: true,
      }
    })
    employees.push(emp)
    console.log('Employee created:', emp.name, emp.email)
  }

  // 6. Create auditor user
  const auditor = await db.user.upsert({
    where: { email: 'pedro@roncal.com' },
    update: {},
    create: {
      email: 'pedro@roncal.com',
      name: 'Pedro Auditor',
      password: hashPassword('pedro123'),
      plainPassword: 'pedro123',
      role: 'auditor',
      active: true,
    }
  })
  console.log('Auditor created:', auditor.name)

  // 7. Create responsable user
  const responsable = await db.user.upsert({
    where: { email: 'elena@roncal.com' },
    update: {},
    create: {
      email: 'elena@roncal.com',
      name: 'Elena Responsable',
      password: hashPassword('elena123'),
      plainPassword: 'elena123',
      role: 'responsable',
      active: true,
    }
  })
  console.log('Responsable created:', responsable.name)

  // 8. Create admin_empresa user
  const adminEmpresa = await db.user.upsert({
    where: { email: 'admin_roncal@roncal.com' },
    update: {},
    create: {
      email: 'admin_roncal@roncal.com',
      name: 'Admin Roncal',
      password: hashPassword('admin123'),
      plainPassword: 'admin123',
      role: 'admin_empresa',
      active: true,
    }
  })
  console.log('Admin empresa created:', adminEmpresa.name)

  // 9. Create CompanyMember associations
  const companyMembers = [gestor, adminEmpresa, auditor, responsable, ...employees]
  for (const cm of companyMembers) {
    try {
      await db.companyMember.create({
        data: {
          userId: cm.id,
          companyId: roncal.id,
          role: cm.role === 'gestor' ? 'admin_empresa' : cm.role === 'empleado' ? 'gerente' : cm.role === 'responsable' ? 'gerente' : 'gerente',
        }
      })
    } catch (e) {
      // May already exist, skip
    }
  }
  console.log('Company members linked')

  // 10. Create ProjectMember associations
  const allMembers = [gestor, adminEmpresa, auditor, responsable, ...employees]
  for (const member of allMembers) {
    try {
      await db.projectMember.create({
        data: {
          userId: member.id,
          projectId: project.id,
          role: member.role,
        }
      })
    } catch (e) {
      // May already exist, skip
    }
  }
  console.log('Project members linked')

  // 11. Assign employees to zones via MemberZone
  for (let i = 0; i < employees.length; i++) {
    const emp = employees[i]
    const zone1 = zones[i % zones.length]
    const zone2 = zones[(i + 1) % zones.length]
    
    const pm = await db.projectMember.findFirst({
      where: { userId: emp.id, projectId: project.id }
    })
    if (pm) {
      try {
        await db.memberZone.create({ data: { memberId: pm.id, zoneId: zone1.id } })
      } catch (e) { /* skip */ }
      try {
        await db.memberZone.create({ data: { memberId: pm.id, zoneId: zone2.id } })
      } catch (e) { /* skip */ }
    }
  }
  console.log('Employee-zone assignments created')

  // 12. Assign responsable to all zones
  const pmResp = await db.projectMember.findFirst({
    where: { userId: responsable.id, projectId: project.id }
  })
  if (pmResp) {
    for (const zone of zones) {
      try {
        await db.memberZone.create({ data: { memberId: pmResp.id, zoneId: zone.id } })
      } catch (e) { /* skip */ }
      await db.zone.update({
        where: { id: zone.id },
        data: { responsableId: responsable.id }
      })
    }
  }
  console.log('Responsable assigned to all zones')

  // 13. Create RolePermissionConfig defaults
  const permMap = [
    { role: 'empleado', perms: ['view_board', 'notify_audit', 'notify_autoeval', 's1_step1_a1', 's1_step2_a0', 's1_step3_a0', 's2_step1_a1', 's2_step2_a0', 's2_step3_a0', 's3_step1_a1', 's3_step2_a0', 's3_step3_a0', 's4_step1_a1', 's4_step2_a0', 's4_step3_a0', 's5_step1_a1', 's5_step2_a0', 's5_step3_a0', 's5_step4_a0', 's5_step5_a0'] },
    { role: 'responsable', perms: ['view_board', 's1_step1_a1', 's1_step2_a1', 's1_step3_a1', 's1_step4_a1', 's2_step1_a1', 's2_step2_a1', 's2_step3_a1', 's2_step4_a1', 's3_step1_a1', 's3_step2_a1', 's3_step3_a1', 's3_step4_a1', 's4_step1_a1', 's4_step2_a1', 's4_step3_a1', 's4_step4_a1', 's5_step1_a1', 's5_step4_a1'] },
    { role: 'auditor', perms: ['view_board', 'accept_audit_meeting', 's1_step5_a1', 's2_step5_a1', 's3_step5_a1', 's4_step5_a1', 's5_step5_a1', 's1_step1_a0', 's1_step2_a0', 's1_step3_a0', 's1_step4_a0', 's2_step1_a0', 's2_step2_a0', 's2_step3_a0', 's2_step4_a0', 's3_step1_a0', 's3_step2_a0', 's3_step3_a0', 's3_step4_a0', 's4_step1_a0', 's4_step2_a0', 's4_step3_a0', 's4_step4_a0', 's5_step1_a0', 's5_step4_a0'] },
    { role: 'admin_empresa', perms: ['view_board', 'skip_steps', 'reset_data', 'manage_users', 'manage_projects', 'manage_permissions', 's1_step1_a1', 's1_step2_a1', 's1_step3_a1', 's1_step4_a1', 's1_step5_a1', 's2_step1_a1', 's2_step2_a1', 's2_step3_a1', 's2_step4_a1', 's2_step5_a1', 's3_step1_a1', 's3_step2_a1', 's3_step3_a1', 's3_step4_a1', 's3_step5_a1', 's4_step1_a1', 's4_step2_a1', 's4_step3_a1', 's4_step4_a1', 's4_step5_a1', 's5_step1_a1', 's5_step2_a1', 's5_step3_a1', 's5_step4_a1', 's5_step5_a1'] },
    { role: 'gestor', perms: ['skip_steps', 'reset_data', 'manage_users', 'manage_projects', 'manage_companies', 'manage_permissions', 's1_step1_a1', 's1_step2_a1', 's1_step3_a1', 's1_step4_a1', 's1_step5_a1', 's2_step1_a1', 's2_step2_a1', 's2_step3_a1', 's2_step4_a1', 's2_step5_a1', 's3_step1_a1', 's3_step2_a1', 's3_step3_a1', 's3_step4_a1', 's3_step5_a1', 's4_step1_a1', 's4_step2_a1', 's4_step3_a1', 's4_step4_a1', 's4_step5_a1', 's5_step1_a1', 's5_step2_a1', 's5_step3_a1', 's5_step4_a1', 's5_step5_a1'] },
  ]

  for (const pm of permMap) {
    for (const perm of pm.perms) {
      try {
        await db.rolePermissionConfig.create({
          data: { role: pm.role, permission: perm, allowed: true }
        })
      } catch (e) {
        // May already exist, skip
      }
    }
  }
  console.log('Role permissions created')

  // 14. Create AuditTarget defaults
  for (let s = 1; s <= 5; s++) {
    for (const zone of zones) {
      try {
        await db.auditTarget.create({
          data: {
            projectId: project.id,
            sStep: s,
            miniStep: 4,
            zoneId: zone.id,
            notaMinima: 70,
            objetivo: 80,
          }
        })
      } catch (e) { /* skip */ }
      try {
        await db.auditTarget.create({
          data: {
            projectId: project.id,
            sStep: s,
            miniStep: 5,
            zoneId: zone.id,
            notaMinima: 70,
            objetivo: 80,
          }
        })
      } catch (e) { /* skip */ }
    }
  }
  console.log('Audit targets created')

  console.log('\n=== Seed Complete ===')
  console.log('Login credentials:')
  console.log('  Gestor:  t_pinilla@outlook.com / gestor123')
  console.log('  Tablero: tablero@roncal.com / tablero123')
  console.log('  Auditor: pedro@roncal.com / pedro123')
  console.log('  Responsable: elena@roncal.com / elena123')
  console.log('  Admin Roncal: admin_roncal@roncal.com / admin123')

  await db.$disconnect()
}

seed().catch(async (e) => {
  console.error('Seed error:', e)
  await db.$disconnect()
  process.exit(1)
})
