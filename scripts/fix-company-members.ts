import { PrismaClient } from '@prisma/client'

// Set DATABASE_URL for local scripts
process.env.DATABASE_URL = 'postgresql://neondb_owner:npg_VeJs3ZAjUwp4@ep-round-glitter-as6ryhe3.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const db = new PrismaClient()

async function fixMissingCompanyMembers() {
  console.log('=== FIX: Asignar usuarios faltantes a la empresa ===\n')
  
  const companyId = 'cmspt3byi000zky04x6srpvjv' // REPARACIONES CLÁSICOS RONCAL
  
  // Users that are project members but missing from company
  const usersToFix = [
    { email: 'jesus@roncal.com', name: 'Jesus', role: 'empleado' },
    { email: 'jose@roncal.com', name: 'Jose', role: 'empleado' },
    { email: 'laura@roncal.com', name: 'Laura', role: 'auditor' },
    { email: 'ana@roncal.com', name: 'Ana', role: 'gerente' },
  ]
  
  console.log('Asignando usuarios a la empresa "REPARACIONES CLÁSICOS RONCAL":\n')
  
  for (const userData of usersToFix) {
    try {
      // Find user
      const user = await db.user.findUnique({
        where: { email: userData.email }
      })
      
      if (!user) {
        console.log(`❌ ${userData.name} (${userData.email}) - Usuario no encontrado`)
        continue
      }
      
      // Check if already has CompanyMember
      const existingMember = await db.companyMember.findUnique({
        where: {
          userId_companyId: {
            userId: user.id,
            companyId: companyId
          }
        }
      })
      
      if (existingMember) {
        console.log(`✅ ${userData.name} - Ya era miembro de la empresa`)
        continue
      }
      
      // Create CompanyMember with generated ID
      const id = `cm_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
      await db.companyMember.create({
        data: {
          id,
          userId: user.id,
          companyId: companyId,
          role: userData.role
        }
      })
      
      console.log(`✅ ${userData.name} (${userData.email}) → Añadido como ${userData.role}`)
      
    } catch (error: any) {
      console.log(`❌ Error con ${userData.name}: ${error.message}`)
    }
  }
  
  // Verify the fix
  console.log('\n\n=== Verificación final ===')
  const allMembers = await db.companyMember.findMany({
    where: { companyId },
    include: {
      User: { select: { name: true, email: true } }
    },
    orderBy: { User: { name: 'asc' } }
  })
  
  console.log(`\nMiembros totales de la empresa: ${allMembers.length}\n`)
  allMembers.forEach(cm => {
    console.log(`  👤 ${cm.User.name} (${cm.User.email}) [${cm.role}]`)
  })
}

fixMissingCompanyMembers()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err)
    process.exit(1)
  })
