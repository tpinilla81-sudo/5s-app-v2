import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * GET /api/photo-limits?projectId=X&zoneId=Y&sStep=N
 *
 * Resuelve el límite mínimo de fotos para el paso 2 (miniStep=2) de una S
 * concreta en una zona concreta. Prioridad de resolución:
 *
 *   1. BoardSlotTemplate.minPhotosOverride (override del slot de la zona)
 *   2. Template.minPhotos de la plantilla asignada al slot
 *   3. 5 (constante fallback, equivale a MIN_PHOTOS en 5s-constants.ts)
 *
 * Response:
 *   {
 *     success: true,
 *     data: {
 *       minPhotos: number,            // valor resuelto final
 *       source: 'override' | 'template' | 'default',
 *       templateId: string | null,   // plantilla fotos asignada al slot (si hay)
 *       templateTitle: string | null,
 *       boardSlotTemplateId: string | null,  // para PUT override
 *       baseMinPhotos: number | null,        // valor de la plantilla (para mostrar "hereda: X")
 *       overrideMinPhotos: number | null     // valor del override (null si no hay)
 *     }
 *   }
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    const zoneId = searchParams.get('zoneId')
    const sStepRaw = searchParams.get('sStep')
    const miniStepRaw = searchParams.get('miniStep')
    // v2.36: ser robusto ante 'undefined' o NaN en miniStep (default 2).
    // Antes `Number('undefined')` producía NaN y rompía la query del slot.
    const miniStepParsed = miniStepRaw ? Number(miniStepRaw) : 2
    const miniStep = Number.isFinite(miniStepParsed) ? miniStepParsed : 2

    if (!projectId || !zoneId || !sStepRaw) {
      return NextResponse.json(
        { success: false, error: 'Faltan parámetros: projectId, zoneId, sStep' },
        { status: 400 }
      )
    }

    const sStep = Number(sStepRaw)
    const DEFAULT_MIN_PHOTOS = 5

    // 1. Buscar la zona para obtener su boardConfigId
    const zone = await db.zone.findUnique({
      where: { id: zoneId },
      select: { id: true, boardConfigId: true, projectId: true },
    })

    if (!zone) {
      return NextResponse.json(
        { success: false, error: 'Zona no encontrada' },
        { status: 404 }
      )
    }

    // v2.36: Si la zona no tiene tablero asignado, caer al tablero
    // predeterminado del sistema (mismo comportamiento que /api/board-slots).
    // Antes devolvíamos 10 directamente, lo que hacía que el admin editara
    // el override en el tablero predeterminado (vía ZoneTemplatesSection)
    // pero el empleado viera siempre 10 porque su zona no tenía boardConfigId.
    let effectiveBoardConfigId = zone.boardConfigId
    if (!effectiveBoardConfigId) {
      let defaultConfig = await db.boardConfiguration.findFirst({
        where: { isDefault: true },
      })
      if (!defaultConfig) {
        defaultConfig = await db.boardConfiguration.create({
          data: {
            name: 'Tablero 5S',
            description: 'Tablero predeterminado del sistema',
            isDefault: true,
          },
        })
      }
      effectiveBoardConfigId = defaultConfig.id
    }

    // 2. Buscar el slot (S×Paso 2) del tablero efectivo de la zona
    const slot = await db.boardSlot.findFirst({
      where: {
        boardConfigId: effectiveBoardConfigId,
        sStep,
        miniStep,
      },
      include: {
        templates: {
          include: {
            template: true,
          },
          orderBy: { sortOrder: 'asc' },
        },
      },
    })

    console.log(
      `[photo-limits] GET projectId=${projectId} zoneId=${zoneId} ` +
        `zone.boardConfigId=${zone.boardConfigId ?? 'null'} ` +
        `effectiveBoardConfigId=${effectiveBoardConfigId} ` +
        `sStep=${sStep} miniStep=${miniStep} ` +
        `slotFound=${!!slot} ` +
        `fotosEntry=${slot?.templates.find(t => t.template?.type === 'fotos') ? 'yes' : 'no'}`
    )

    if (!slot) {
      return NextResponse.json({
        success: true,
        data: {
          minPhotos: DEFAULT_MIN_PHOTOS,
          source: 'default',
          templateId: null,
          templateTitle: null,
          boardSlotTemplateId: null,
          baseMinPhotos: null,
          overrideMinPhotos: null,
        },
      })
    }

    // 3. Buscar la plantilla type='fotos' asignada a este slot
    const fotosEntry = slot.templates.find(t => t.template?.type === 'fotos')

    if (!fotosEntry) {
      return NextResponse.json({
        success: true,
        data: {
          minPhotos: DEFAULT_MIN_PHOTOS,
          source: 'default',
          templateId: null,
          templateTitle: null,
          boardSlotTemplateId: null,
          baseMinPhotos: null,
          overrideMinPhotos: null,
        },
      })
    }

    const baseMinPhotos = fotosEntry.template.minPhotos ?? DEFAULT_MIN_PHOTOS
    const overrideMinPhotos = fotosEntry.minPhotosOverride

    // 4. Resolver: override > template > default
    if (overrideMinPhotos !== null && overrideMinPhotos !== undefined) {
      return NextResponse.json({
        success: true,
        data: {
          minPhotos: overrideMinPhotos,
          source: 'override',
          templateId: fotosEntry.templateId,
          templateTitle: fotosEntry.template.title,
          boardSlotTemplateId: fotosEntry.id,
          baseMinPhotos,
          overrideMinPhotos,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        minPhotos: baseMinPhotos,
        source: 'template',
        templateId: fotosEntry.templateId,
        templateTitle: fotosEntry.template.title,
        boardSlotTemplateId: fotosEntry.id,
        baseMinPhotos,
        overrideMinPhotos: null,
      },
    })
  } catch (error) {
    console.error('[photo-limits] GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al resolver límite de fotos' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/photo-limits
 *
 * Body:
 *   { boardSlotTemplateId: string, minPhotosOverride: number | null }
 *     → Actualiza el override a nivel slot/zona (admin de proyecto).
 *       Si minPhotosOverride es null, elimina el override (vuelve a heredar de la plantilla).
 *
 *   { templateId: string, minPhotos: number }
 *     → Actualiza Template.minPhotos (gestor en plantilla global, o admin en plantilla de empresa).
 *
 * Response:
 *   { success: boolean, data?: {...resolución actualizada}, error?: string }
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    // Caso A: override a nivel slot
    if (body.boardSlotTemplateId !== undefined) {
      const { boardSlotTemplateId, minPhotosOverride } = body
      if (!boardSlotTemplateId) {
        return NextResponse.json(
          { success: false, error: 'Falta boardSlotTemplateId' },
          { status: 400 }
        )
      }

      // Validar: si viene un número, debe ser >= 0; si viene null, eliminar override
      let valueToSave: number | null = null
      if (minPhotosOverride !== null && minPhotosOverride !== undefined) {
        const n = Number(minPhotosOverride)
        if (isNaN(n) || n < 0 || n > 1000) {
          return NextResponse.json(
            { success: false, error: 'minPhotosOverride debe ser un número entre 0 y 1000 (o null para eliminar)' },
            { status: 400 }
          )
        }
        valueToSave = n
      }

      await db.boardSlotTemplate.update({
        where: { id: boardSlotTemplateId },
        data: { minPhotosOverride: valueToSave },
      })

      return NextResponse.json({
        success: true,
        data: { boardSlotTemplateId, minPhotosOverride: valueToSave },
      })
    }

    // Caso B: actualizar minPhotos de la plantilla
    if (body.templateId !== undefined) {
      const { templateId, minPhotos } = body
      if (!templateId) {
        return NextResponse.json(
          { success: false, error: 'Falta templateId' },
          { status: 400 }
        )
      }
      const n = Number(minPhotos)
      if (isNaN(n) || n < 0 || n > 1000) {
        return NextResponse.json(
          { success: false, error: 'minPhotos debe ser un número entre 0 y 1000' },
          { status: 400 }
        )
      }

      await db.template.update({
        where: { id: templateId },
        data: { minPhotos: n },
      })

      return NextResponse.json({
        success: true,
        data: { templateId, minPhotos: n },
      })
    }

    return NextResponse.json(
      { success: false, error: 'Body inválido: requiere boardSlotTemplateId o templateId' },
      { status: 400 }
    )
  } catch (error) {
    console.error('[photo-limits] PUT error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al guardar límite de fotos' },
      { status: 500 }
    )
  }
}
