import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'

/**
 * GET /api/debug-formacion?sStep=1&miniStep=1&zoneId=xxx
 * Diagnóstico completo del flujo de carga de formación
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sStep = parseInt(searchParams.get('sStep') || '1')
    const miniStep = parseInt(searchParams.get('miniStep') || '1')
    const zoneId = searchParams.get('zoneId')
    
    const result: Record<string, any> = {
      sStep,
      miniStep,
      zoneId,
      steps: []
    }
    
    // PASO 1: Verificar zona y su boardConfigId
    if (zoneId) {
      const zone = await db.zone.findUnique({
        where: { id: zoneId },
        select: { id: true, name: true, boardConfigId: true }
      })
      result.zone = zone
      result.steps.push({ step: 1, name: 'Zona encontrada', ok: !!zone, data: zone })
      
      if (!zone?.boardConfigId) {
        result.error = 'La ZONA NO TIENE boardConfigId - este es el problema'
        return NextResponse.json(result)
      }
    }
    
    // PASO 2: Buscar board slots
    let boardConfigId = result.zone?.boardConfigId || searchParams.get('boardConfigId')
    if (!boardConfigId) {
      // Usar el default
      const defaultConfig = await db.boardConfiguration.findFirst({ where: { isDefault: true } })
      if (defaultConfig) {
        result.usedDefaultConfig = defaultConfig.id
        boardConfigId = defaultConfig.id as any
      }
    }
    
    let slots = []
    try {
      slots = await db.boardSlot.findMany({
        where: { 
          boardConfigId,
          sStep,
          miniStep 
        },
        include: {
          BoardSlotTemplate: {
            include: { Template: true }
          }
        }
      })
      result.steps.push({ step: 2, name: 'Board slots encontrados', ok: slots.length > 0, count: slots.length })
    } catch (e: any) {
      result.steps.push({ step: 2, name: 'Board slots ERROR', ok: false, error: e.message })
      return NextResponse.json(result)
    }
    
    // PASO 3: Verificar si hay plantillas en los slots
    if (slots.length > 0) {
      const slot = slots[0]
      const templates = (slot.BoardSlotTemplate || []).map((bst: any) => ({
        id: bst.Template?.id,
        type: bst.Template?.type,
        title: bst.Template?.title,
        contentPreview: bst.Template?.content?.substring(0, 100)
      }))
      
      const formacionTemplates = templates.filter(t => t.type === 'formacion')
      
      result.slotData = {
        slotId: slot.id,
        totalTemplates: templates.length,
        formacionTemplates,
        allTemplates: templates
      }
      result.steps.push({ 
        step: 3, 
        name: 'Plantillas en slot', 
        ok: formacionTemplates.length > 0, 
        formacionCount: formacionTemplates.length 
      })
      
      if (formacionTemplates.length > 0) {
        result.finalResult = '✅ DEBERÍA FUNCIONAR - Hay plantillas de formación'
      } else {
        result.finalResult = '❌ No hay plantillas de tipo FORMACION en este slot'
      }
    } else {
      result.steps.push({ step: 3, name: 'No hay slots para esta posición', ok: false })
      
      // PASO 4: Fallback - buscar plantillas globales
      const globalTemplates = await db.template.findMany({
        where: { type: 'formacion', sStep, active: true },
        select: { id: true, title: true, content: true }
      })
      
      result.globalTemplates = globalTemplates.map(t => ({
        id: t.id,
        title: t.title,
        hasContent: !!t.content,
        contentLength: t.content?.length
      }))
      result.steps.push({ 
        step: 4, 
        name: 'Plantillas globales (fallback)', 
        ok: globalTemplates.length > 0, 
        count: globalTemplates.length 
      })
      
      if (globalTemplates.length > 0) {
        result.finalResult = '⚠️ Sin slot pero HAY plantillas globales - debería usar fallback'
      } else {
        result.finalResult = '❌ NO HAY plantillas de ningún tipo'
      }
    }
    
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
