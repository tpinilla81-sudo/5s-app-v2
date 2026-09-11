import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'

/**
 * GET /api/debug-templates - Diagnóstico de plantillas SIN autenticación
 * Para identificar por qué no se ven las plantillas en los tableros
 */
export async function GET() {
  try {
    const result: Record<string, any> = {}
    
    // 1. Contar todas las plantillas
    const allTemplates = await db.template.findMany({
      select: { id: true, type: true, sStep: true, miniStep: true, title: true, active: true }
    })
    result.totalTemplates = allTemplates.length
    result.templatesByType = {}
    for (const t of allTemplates) {
      if (!result.templatesByType[t.type]) result.templatesByType[t.type] = []
      result.templatesByType[t.type].push(`S${t.sStep}P${t.miniStep}: ${t.title}`)
    }
    
    // Plantillas de formación específicamente
    result.formacionTemplates = allTemplates.filter(t => t.type === 'formacion')
    
    // 2. Ver board configurations
    const boardConfigs = await db.boardConfiguration.findMany({
      select: { id: true, name: true, isDefault: true }
    })
    result.boardConfigs = boardConfigs
    result.totalBoardConfigs = boardConfigs.length
    
    // 3. Ver board slots y sus plantillas asociadas (usar nombres CORRECTOS del schema)
    const boardSlots = await db.boardSlot.findMany({
      include: {
        BoardSlotTemplate: {
          include: {
            Template: { select: { id: true, type: true, title: true, sStep: true } }
          }
        },
        BoardSlotStandard: {
          include: {
            Standard: { select: { id: true, title: true, sStep: true } }
          }
        }
      }
    })
    result.totalBoardSlots = boardSlots.length
    result.boardSlotsWithTemplates = boardSlots.filter(s => s.BoardSlotTemplate && s.BoardSlotTemplate.length > 0).length
    result.boardSlotsDetail = boardSlots.map(slot => ({
      id: slot.id,
      sStep: slot.sStep,
      miniStep: slot.miniStep,
      boardConfigId: slot.boardConfigId,
      templateCount: slot.BoardSlotTemplate?.length || 0,
      templates: (slot.BoardSlotTemplate || []).map(t => ({
        type: t.Template?.type,
        title: t.Template?.title,
        sStep: t.Template?.sStep
      }))
    }))
    
    // 4. Ver zonas y si tienen boardConfigId
    const zones = await db.zone.findMany({
      select: { id: true, name: true, boardConfigId: true, projectId: true }
    })
    result.totalZones = zones.length
    result.zonesWithBoardConfig = zones.filter(z => z.boardConfigId).length
    result.zonesWithoutBoardConfig = zones.filter(z => !z.boardConfigId).map(z => ({
      id: z.id,
      name: z.name,
      projectId: z.projectId
    }))
    
    // 5. Ver si hay BoardSlotTemplate (la tabla intermedia)
    const slotTemplates = await db.boardSlotTemplate.findMany()
    result.totalSlotTemplateRelations = slotTemplates.length
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: result
    })
  } catch (error: any) {
    console.error('Debug templates error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    }, { status: 500 })
  }
}
