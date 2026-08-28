import { PrismaClient } from '@prisma/client'

// Set DATABASE_URL for local scripts
process.env.DATABASE_URL = 'postgresql://neondb_owner:npg_VeJs3ZAjUwp4@ep-round-glitter-as6ryhe3.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const db = new PrismaClient()

async function debugCompanyGestor() {
  console.log('=== DEBUG: Company & Gestor ===\n')
  
  // 1. Get all companies
  const companies = await db.company.findMany({
    include: {
      CompanyMember: {
        include: {
          User: {
            select: { id: true, name: true, email: true, role: true }
          }
        }
      },
      _count: { select: { projects: true } }
    }
  })
  
  console.log(`Found ${companies.length} companies:`)
  companies.forEach(c => {
    console.log(`\n📦 Empresa: ${c.name} (id: ${c.id})`)
    console.log(`   Activa: ${c.active}`)
    console.log(`   Proyectos: ${c._count.projects}`)
    console.log(`   Miembros (${c.CompanyMember.length}):`)
    c.CompanyMember.forEach(cm => {
      console.log(`      - ${cm.User.name} (${cm.User.email}) [rol: ${cm.role}]${cm.role === 'admin_empresa' ? ' ⭐ ADMIN EMPRESA' : ''}`)
    })
  })
  
  // 2. Get all users with their roles and company memberships
  console.log('\n\n=== All Users ===')
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
      CompanyMember: {
        include: {
          Company: { select: { id: true, name: true } }
        }
      }
    }
  })
  
  users.forEach(u => {
    const companies = u.CompanyMember?.map(cm => `${cm.Company.name}(${cm.role})`) || []
    console.log(`👤 ${u.name} (${u.email}) [role: ${u.role}, active: ${u.active}]`)
    if (companies.length > 0) {
      console.log(`   Empresas: ${companies.join(', ')}`)
    } else {
      console.log('   ❌ SIN EMPRESA ASIGNADA')
    }
  })
  
  // 3. Check who is admin_empresa
  console.log('\n\n=== Admins de Empresa ===')
  const adminEmpresa = await db.companyMember.findMany({
    where: { role: 'admin_empresa' },
    include: {
      User: { select: { name: true, email: true } },
      Company: { select: { name: true } }
    }
  })
  
  if (adminEmpresa.length === 0) {
    console.log('❌ NADIE tiene rol admin_empresa')
  } else {
    adminEmpresa.forEach(ae => {
      console.log(`${ae.User.name} (${ae.User.email}) → admin_empresa de "${ae.Company.name}"`)
    })
  }
  
  // 4. Check the project and its company relationship
  console.log('\n\n=== Projects & Companies ===')
  const projects = await db.project.findMany({
    include: {
      Company: { select: { id: true, name: true } },
      _count: { 
        select: { 
          members: true,
          zones: true
        } 
      }
    }
  })
  
  projects.forEach(p => {
    console.log(`🏗️ ${p.name} (id: ${p.id})`)
    console.log(`   Empresa: ${p.Company?.name || '❌ SIN EMPRESA'} (${p.companyId || 'null'})`)
    console.log(`   Miembros: ${p._count.members}, Zonas: ${p._count.zones}`)
  })
}

debugCompanyGestor()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err)
    process.exit(1)
  })
