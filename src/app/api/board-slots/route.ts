import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'

// GET /api/board-slots?boardConfigId=xxx[&sStep=1][&miniStep=1]
// Si no se pasa boardConfigId, se usa automáticamente la configuración por defecto.
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    let boardConfigId = searchParams.get('boardConfigId')
    const sStepParam = searchParams.get('sStep')
    const miniStepParam = searchParams.get('miniStep')

    // Si no se pasa boardConfigId, usar la configuración por defecto (auto-creada si hace falta)
    if (!boardConfigId) {
      let defaultConfig = await db.boardConfiguration.findFirst({
        where: { isDefault: true },
      })
      if (!defaultConfig) {
        // Último recurso: crear el predeterminado
        defaultConfig = await db.boardConfiguration.create({
          data: { name: 'Tablero 5S', description: 'Tablero predeterminado del sistema', isDefault: true },
        })
      }
      boardConfigId = defaultConfig.id
    }

    const where: any = { boardConfigId }
    if (sStepParam != null) where.sStep = Number(sStepParam)
    if (miniStepParam != null) where.miniStep = Number(miniStepParam)

    // v2.30: si la columna companyId no existe en Template (migración SQL
    // pendiente), el include de template fallará. Caer a un include sin
    // template (solo slot + standards) para no romper la app.
    let slots
    try {
      slots = await db.boardSlot.findMany({
        where,
        include: {
          templates: {
            include: {
              template: { select: { id: true, type: true, title: true, sStep: true, miniStep: true, content: true, notaMinima: true, minPhotos: true } },
            },
            orderBy: { sortOrder: 'asc' },
          },
          standards: {
            include: {
              standard: { select: { id: true, title: true, sStep: true, category: true, content: true } },
            },
            orderBy: { sortOrder: 'asc' },
          },
        },
        orderBy: [{ sStep: 'asc' }, { miniStep: 'asc' }],
      })
    } catch (dbErr) {
      console.warn('[board-slots] Template.companyId no existe, fallback sin include de template:', dbErr instanceof Error ? dbErr.message : dbErr)
      slots = await db.boardSlot.findMany({
        where,
        include: {
          templates: false as any,
          standards: {
            include: {
              standard: { select: { id: true, title: true, sStep: true, category: true, content: true } },
            },
            orderBy: { sortOrder: 'asc' },
          },
        },
        orderBy: [{ sStep: 'asc' }, { miniStep: 'asc' }],
      })
      // Añadir templates: [] a cada slot para que el cliente no rompa
      slots = (slots as any[]).map(s => ({ ...s, templates: [] }))
    }

    return NextResponse.json({ success: true, data: slots })
  } catch (error) {
    console.error('Error fetching board slots:', error)
    return NextResponse.json({ success: false, error: 'Error fetching board slots' }, { status: 500 })
  }
}

// POST /api/board-slots - Set templates and/or standards for a slot
// Body: { boardConfigId, sStep, miniStep, templateIds?: string[], standardIds?: string[] }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { boardConfigId, sStep, miniStep, templateIds, standardIds } = body

    if (!boardConfigId || sStep == null || miniStep == null) {
      return NextResponse.json({ success: false, error: 'Faltan campos obligatorios: boardConfigId, sStep, miniStep' }, { status: 400 })
    }

    const slotWhere = {
      boardConfigId_sStep_miniStep: {
        boardConfigId,
        sStep: Number(sStep),
        miniStep: Number(miniStep),
      },
    }

    // Upsert the slot first
    const existingSlot = await db.boardSlot.findUnique({ where: slotWhere })

    let slotId: string
    if (existingSlot) {
      slotId = existingSlot.id
    } else {
      const newSlot = await db.boardSlot.create({
        data: {
          boardConfigId,
          sStep: Number(sStep),
          miniStep: Number(miniStep),
        },
      })
      slotId = newSlot.id
    }

    // Update templates if provided
    if (templateIds !== undefined) {
      await db.boardSlotTemplate.deleteMany({ where: { slotId } })
      if (Array.isArray(templateIds) && templateIds.length > 0) {
        await db.boardSlotTemplate.createMany({
          data: templateIds.map((templateId: string, index: number) => ({
            slotId,
            templateId,
            sortOrder: index,
          })),
        })
      }
    }

    // Update standards if provided
    if (standardIds !== undefined) {
      await db.boardSlotStandard.deleteMany({ where: { slotId } })
      if (Array.isArray(standardIds) && standardIds.length > 0) {
        await db.boardSlotStandard.createMany({
          data: standardIds.map((standardId: string, index: number) => ({
            slotId,
            standardId,
            sortOrder: index,
          })),
        })
      }
    }

    // Return the updated slot with relations
    const updatedSlot = await db.boardSlot.findUnique({
      where: { id: slotId },
      include: {
        templates: {
          include: {
            template: { select: { id: true, type: true, title: true, sStep: true, miniStep: true } },
          },
          orderBy: { sortOrder: 'asc' },
        },
        standards: {
          include: {
            standard: { select: { id: true, title: true, sStep: true, category: true } },
          },
          orderBy: { sortOrder: 'asc' },
        },
      },
    })

    return NextResponse.json({ success: true, data: updatedSlot })
  } catch (error) {
    console.error('Error upserting board slot:', error)
    return NextResponse.json({ success: false, error: 'Error upserting board slot' }, { status: 500 })
  }
}

// DELETE /api/board-slots?id=xxx
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'Se requiere el id' }, { status: 400 })
    }

    await db.boardSlotTemplate.deleteMany({ where: { slotId: id } })
    await db.boardSlotStandard.deleteMany({ where: { slotId: id } })
    await db.boardSlot.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting board slot:', error)
    return NextResponse.json({ success: false, error: 'Error deleting board slot' }, { status: 500 })
  }
}
