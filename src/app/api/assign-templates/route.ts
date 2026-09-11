import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'

/**
 * POST /api/assign-templates - Asigna plantillas a board slots automáticamente
 * Crea las relaciones faltantes en BoardSlotTemplate
 */
export async function POST() {
  try {
    // 1. Obtener todos los board slots
    const boardSlots = await db.boardSlot.findMany()
    
    // 2. Obtener todas las plantillas
    const templates = await db.template.findMany({
      where: { active: true }
    })
    
    let assigned = 0
    let alreadyExists = 0
    
    for (const slot of boardSlots) {
      // Para cada slot, encontrar las plantillas que corresponden
      // Basándonos en sStep y el tipo de plantilla según miniStep
      const typeForMiniStep: Record<number, string> = {
        1: 'formacion',  // Paso 1: Formación + Examen (usamos formacion como principal)
        2: 'fotos',     // Paso 2: Fotos
        3: 'inventario', // Paso 3: Inventario/Estándar/Layout
        4: 'autoevaluacion', // Paso 4: Autoevaluación
        5: 'auditoria'   // Paso 5: Auditoría
      }
      
      const targetType = typeForMiniStep[slot.miniStep]
      if (!targetType) continue
      
      // Encontrar plantillas que coincidan con este sStep y tipo
      const matchingTemplates = templates.filter(t => 
        t.sStep === slot.sStep && t.type === targetType
      )
      
      for (const template of matchingTemplates) {
        // Verificar si ya existe la relación
        const existing = await db.boardSlotTemplate.findUnique({
          where: {
            slotId_templateId: {
              slotId: slot.id,
              templateId: template.id
            }
          }
        })
        
        if (!existing) {
          // Crear la relación
          await db.boardSlotTemplate.create({
            data: {
              slotId: slot.id,
              templateId: template.id,
              sortOrder: 0
            }
          })
          assigned++
        } else {
          alreadyExists++
        }
      }
      
      // También asignar examen al mismo slot que formacion (miniStep 1)
      if (slot.miniStep === 1) {
        const examTemplates = templates.filter(t => 
          t.sStep === slot.sStep && t.type === 'examen'
        )
        for (const template of examTemplates) {
          const existing = await db.boardSlotTemplate.findUnique({
            where: {
              slotId_templateId: {
                slotId: slot.id,
                templateId: template.id
              }
            }
          })
          
          if (!existing) {
            await db.boardSlotTemplate.create({
              data: {
                slotId: slot.id,
                templateId: template.id,
                sortOrder: 1
              }
            })
            assigned++
          } else {
            alreadyExists++
          }
        }
      }
    }
    
    // Verificar resultado final
    const totalRelations = await db.boardSlotTemplate.count()
    
    return NextResponse.json({
      success: true,
      message: `Asignación completada`,
      newAssignments: assigned,
      alreadyExisted: alreadyExists,
      totalRelationsNow: totalRelations,
      totalSlots: boardSlots.length,
      totalTemplates: templates.length
    })
  } catch (error: any) {
    console.error('Error assigning templates:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
