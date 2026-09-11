import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'

/**
 * POST /api/fix-template-assignments - Corrige todas las asignaciones de plantillas
 * 1. Borra todas las relaciones existentes
 * 2. Reasigna correctamente basándose en el TIPO de plantilla, no en miniStep
 */
export async function POST() {
  try {
    // 1. Borrar TODAS las relaciones existentes
    const deleted = await db.boardSlotTemplate.deleteMany({})
    
    // 2. Obtener slots y plantillas
    const boardSlots = await db.boardSlot.findMany()
    const templates = await db.template.findMany({ where: { active: true } })
    
    let assigned = 0
    
    // 3. Mapeo: qué tipo de plantilla va en cada miniStep
    // IMPORTANTE: Usar el TIPO de plantilla, no confiar en miniStep de la plantilla
    const typeForMiniStep: Record<number, string[]> = {
      1: ['formacion', 'examen'],  // Paso 1: Formación + Examen
      2: ['fotos'],                // Paso 2: Fotos  
      3: ['inventario', 'estandar', 'layout', 'plan_limpieza'], // Paso 3: Inventario/Estándares
      4: ['autoevaluacion', 'plan_accion'], // Paso 4: Autoevaluación + Plan
      5: ['auditoria', 'pdca']    // Paso 5: Auditoría + PDCA
    }
    
    for (const slot of boardSlots) {
      const validTypes = typeForMiniStep[slot.miniStep]
      if (!validTypes) continue
      
      // Encontrar plantillas por sStep Y tipo (ignorar el miniStep de la plantilla)
      let sortOrder = 0
      for (const targetType of validTypes) {
        const matchingTemplates = templates.filter(t => 
          t.sStep === slot.sStep && t.type === targetType
        )
        
        for (const template of matchingTemplates) {
          await db.boardSlotTemplate.create({
            data: {
              id: `bst_${slot.id}_${template.id}`,
              slotId: slot.id,
              templateId: template.id,
              sortOrder: sortOrder++
            }
          })
          assigned++
        }
      }
    }
    
    const totalRelations = await db.boardSlotTemplate.count()
    
    return NextResponse.json({
      success: true,
      message: `Asignaciones corregidas`,
      deletedOld: deleted.count,
      newAssignments: assigned,
      totalRelationsNow: totalRelations
    })
  } catch (error: any) {
    console.error('Error fixing assignments:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
