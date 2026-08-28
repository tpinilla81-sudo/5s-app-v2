import { PrismaClient } from '@prisma/client'

// Set DATABASE_URL for local scripts
process.env.DATABASE_URL = 'postgresql://neondb_owner:npg_VeJs3ZAjUwp4@ep-round-glitter-as6ryhe3.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const db = new PrismaClient()

async function seedTemplates() {
  console.log('=== SEED: Creating default templates ===\n')
  
  // Check existing templates
  const existingCount = await db.template.count()
  console.log(`Existing templates: ${existingCount}`)
  
  if (existingCount > 0) {
    console.log('\nTemplates already exist. Showing first 5:')
    const samples = await db.template.findMany({ take: 5, select: { id: true, type: true, sStep: true, title: true, companyId: true } })
    samples.forEach(t => console.log(`  - [${t.type}] S${t.sStep}: ${t.title} (company: ${t.companyId || 'SYSTEM'})`))
    return
  }
  
  // Create basic templates for each S-step
  const templateTypes = ['formacion', 'fotos', 'inventario', 'autoevaluacion', 'auditoria']
  const sSteps = [1, 2, 3, 4, 5]
  
  let created = 0
  
  for (const sStep of sSteps) {
    for (const type of templateTypes) {
      const title = `Plantilla ${type.toUpperCase()} - S${sStep}`
      const content = getDefaultContent(type, sStep)
      
      try {
        await db.template.create({
          data: {
            id: `tpl_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
            type,
            sStep,
            miniStep: 1,
            title,
            description: `Plantilla por defecto para ${type} en el paso S${sStep}`,
            content: JSON.stringify(content),
            active: true,
            companyId: null, // System library
            updatedAt: new Date(), // Required field
          }
        })
        console.log(`✅ Created: ${title}`)
        created++
      } catch (error: any) {
        console.log(`❌ Error creating ${title}: ${error.message}`)
      }
    }
  }
  
  console.log(`\n=== Created ${created} templates ===`)
}

function getDefaultContent(type: string, sStep: number): object {
  const baseContent = {
    sections: [
      {
        title: `Contenido para ${type} - S${sStep}`,
        content: `Este es el contenido por defecto para la plantilla de tipo ${type} en el paso S${sStep}. Puedes editar este contenido según las necesidades específicas de tu empresa.`
      }
    ]
  }
  
  return baseContent
}

seedTemplates()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err)
    process.exit(1)
  })
