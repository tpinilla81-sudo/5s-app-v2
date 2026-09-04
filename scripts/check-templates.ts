import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  console.log('=== PLANTILLAS EN EL SISTEMA ===\n')
  
  const templates = await db.template.findMany({
    select: {
      id: true,
      title: true,
      type: true,
      sStep: true,
      companyId: true,
      active: true,
      createdAt: true
    },
    orderBy: [
      { companyId: 'asc' },
      { type: 'asc' },
      { sStep: 'asc' }
    ],
    take: 30
  })
  
  if (templates.length === 0) {
    console.log('❌ NO HAY PLANTILLAS EN LA BASE DE DATOS')
    return
  }
  
  console.log(`Total plantillas encontradas: ${templates.length}\n`)
  
  let systemCount = 0
  let companyCount = 0
  
  for (const t of templates) {
    const isSystem = t.companyId === null
    const source = isSystem ? '📚 SISTEMA' : `🏢 EMPRESA (${t.companyId})`
    
    if (isSystem) systemCount++
    else companyCount++
    
    console.log(`[${source}] ${t.type.toUpperCase()} | S${t.sStep} | ${t.title} | ${t.active ? '✅' : '❌'} | ${t.createdAt.toISOString().split('T')[0]}`)
  }
  
  console.log('\n=== RESUMEN ===')
  console.log(`Plantillas del Sistema (Gestor): ${systemCount}`)
  console.log(`Plantillas de Empresas: ${companyCount}`)
}

main()
  .catch(e => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
