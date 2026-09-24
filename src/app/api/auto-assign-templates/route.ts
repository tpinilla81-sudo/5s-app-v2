import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'

// Endpoint de emergencia: asigna TODAS las plantillas a sus slots correctos
// basándose en el tipo de plantilla y sStep/miniStep
export async function POST(request: NextRequest) {
  try {
    const results: any = { 
      message: 'Asignación de plantillas a slots',
      timestamp: new Date().toISOString(),
      steps: []
    }

    // Step 1: Obtener todas las plantillas
    results.steps.push('Obteniendo todas las plantillas...')
    const allTemplates = await db.template.findMany({
      where: { active: true },
      select: { id: true, type: true, title: true, sStep: true, miniStep: true }
    })
    results.totalTemplates = allTemplates.length
    results.templatesByType = {}

    allTemplates.forEach(t => {
      if (!results.templatesByType[t.type]) results.templatesByType[t.type] = []
      results.templatesByType[t.type].push({ id: t.id, title: t.title, sStep: t.sStep, miniStep: t.miniStep })
    })

    // Step 2: Obtener todos los board configs y sus slots
    results.steps.push('Obteniendo board configs y slots...')
    const boardConfigs = await db.boardConfiguration.findMany({
      include: {
        BoardSlot: {
          select: { id: true, sStep: true, miniStep: true }
        }
      }
    })
    results.totalBoardConfigs = boardConfigs.length
    results.totalSlots = boardConfigs.reduce((acc, bc) => acc + bc.BoardSlot.length, 0)

    // Step 3: Mapeo de tipo de plantilla -> sStep, miniStep
    // Basado en la lógica de la aplicación:
    // Paso 1 (sStep=1, miniStep=1): formacion + examen
    // Paso 2 (sStep=1, miniStep=2): fotos  
    // Paso 3 (sStep=1, miniStep=3): inventario
    // Paso 4 (sStep=1, miniStep=4): autoevaluacion
    // Paso 5 (sStep=1, miniStep=5): auditoria
    const typeToSlot: Record<string, { sStep: number; miniStep: number }> = {
      'formacion': { sStep: 1, miniStep: 1 },
      'examen': { sStep: 1, miniStep: 1 },
      'fotos': { sStep: 1, miniStep: 2 },
      'inventario': { sStep: 1, miniStep: 3 },
      'autoevaluacion': { sStep: 1, miniStep: 4 },
      'auditoria': { sStep: 1, miniStep: 5 },
    }

    // Step 4: Para cada board config, asignar plantillas a sus slots
    let totalCreated = 0
    let totalSkipped = 0
    const assignmentDetails: any[] = []

    for (const bc of boardConfigs) {
      for (const slot of bc.BoardSlot) {
        // Encontrar plantillas que corresponden a este slot
        const templatesForSlot = allTemplates.filter(t => {
          const slotInfo = typeToSlot[t.type]
          return slotInfo && slotInfo.sStep === slot.sStep && slotInfo.miniStep === slot.miniStep
        })

        for (const template of templatesForSlot) {
          // Verificar si ya existe la relación
          const existing = await db.boardSlotTemplate.findUnique({
            where: {
              slotId_templateId: {
                slotId: slot.id,
                templateId: template.id
              }
            }
          })

          if (existing) {
            totalSkipped++
            continue
          }

          // Crear la relación
          try {
            await db.boardSlotTemplate.create({
              data: {
                slotId: slot.id,
                templateId: template.id,
              }
            })
            totalCreated++
            assignmentDetails.push({
              boardConfig: bc.name || bc.id,
              slot: `S${slot.sStep}P${slot.miniStep}`,
              templateType: template.type,
              templateTitle: template.title
            })
          } catch (e: any) {
            assignmentDetails.push({
              error: e.message,
              templateType: template.type,
              templateTitle: template.title
            })
          }
        }
      }
    }

    results.totalCreated = totalCreated
    results.totalSkipped = totalSkipped
    results.assignments = assignmentDetails

    // Step 5: Verificar resultado - obtener slots con plantillas
    results.steps.push('Verificando resultado...')
    const sampleSlot = await db.boardSlot.findFirst({
      where: { 
        sStep: 1, 
        miniStep: 1,
        boardConfigId: boardConfigs[0]?.id 
      },
      include: {
        BoardSlotTemplate: {
          include: {
            Template: {
              select: { id: true, type: true, title: true }
            }
          }
        }
      }
    })

    results.sampleSlot = sampleSlot ? {
      id: sampleSlot.id,
      sStep: sampleSlot.sStep,
      miniStep: sampleSlot.miniStep,
      templateCount: sampleSlot.BoardSlotTemplate.length,
      templates: sampleSlot.BoardSlotTemplate.map(bst => ({
        id: bst.Template.id,
        type: bst.Template.type,
        title: bst.Template.title
      }))
    } : null

    return NextResponse.json({ success: true, ...results })

  } catch (error: any) {
    console.error('Error in auto-assign templates:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    }, { status: 500 })
  }
}

// GET para ver estado actual sin modificar nada
export async function GET() {
  try {
    const stats: any = {}

    // Contar plantillas por tipo
    const templatesByType = await db.template.groupBy({
      by: ['type'],
      _count: { id: true }
    })
    stats.templatesByType = templatesByType.reduce((acc, t) => ({ ...acc, [t.type]: t._count.id }), {})

    // Contar board slots
    stats.totalBoardSlots = await db.boardSlot.count()
    
    // Contar relaciones slot-template
    stats.totalSlotTemplateRelations = await db.boardSlotTemplate.count()

    // Ver slots con plantillas
    var slotsWithTemplates = await db.boardSlot.findMany({
      where: {
        BoardSlotTemplate: { some: {} }
      },
      select: { id: true, sStep: true, miniStep: true, boardConfigId: true },
      take: 10
    })
    stats.sampleSlotsWithTemplates = slotsWithTemplates

    // Ver slots SIN plantillas
    var slotsWithoutTemplates = await db.boardSlot.findMany({
      where: {
        BoardSlotTemplate: { none: {} }
      },
      select: { id: true, sStep: true, miniStep: true, boardConfigId: true },
      take: 10
    })
    stats.sampleSlotsWithoutTemplates = slotsWithoutTemplates

    return NextResponse.json({ success: true, stats })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
