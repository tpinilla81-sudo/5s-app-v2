import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// ─────────────────────────────────────────────────────────────────────────────
// Auto-poblar los 25 slots (5 S × 5 mini-steps) de una BoardConfiguration
// con las plantillas globales correspondientes por (sStep, miniStep, type).
//
// Esto soluciona el bug por el que una zona con boardConfigId asignado PERO
// sin slots configurados veía "Sin formación configurada" en el FormacionModal.
//
// Es idempotente: solo crea slots/templates que NO existan; no toca los que el
// admin ya haya configurado manualmente.
//
// Mapeo de mini-step → tipo de plantilla a enlazar:
//   miniStep=1 → 'formacion' + 'examen'
//   miniStep=2 → 'fotos'
//   miniStep=3 → 'inventario' + 'estandar' (estándares se enlazan aparte)
//   miniStep=4 → 'autoevaluacion' (checklist) + 'planaccion'
//   miniStep=5 → 'auditoria'
// ─────────────────────────────────────────────────────────────────────────────
async function ensureDefaultSlotsPopulated(boardConfigId: string) {
  // Mapeo: (miniStep) → array de tipos de plantilla a enlazar
  const MINI_STEP_TEMPLATE_TYPES: Record<number, string[]> = {
    1: ['formacion', 'examen'],
    2: ['fotos'],
    3: ['inventario'],
    4: ['autoevaluacion', 'planaccion'],
    5: ['auditoria'],
  }

  let created = 0

  for (let sStep = 1; sStep <= 5; sStep++) {
    for (let miniStep = 1; miniStep <= 5; miniStep++) {
      // ¿Existe ya el slot?
      const existingSlot = await db.boardSlot.findUnique({
        where: {
          boardConfigId_sStep_miniStep: { boardConfigId, sStep, miniStep },
        },
        include: { _count: { select: { templates: true } } },
      })

      // Si el slot ya existe y tiene plantillas enlazadas, respetar la config manual
      if (existingSlot && existingSlot._count.templates > 0) continue

      // Si no existe el slot, crearlo
      let slotId: string
      if (existingSlot) {
        slotId = existingSlot.id
      } else {
        const newSlot = await db.boardSlot.create({
          data: { boardConfigId, sStep, miniStep },
        })
        slotId = newSlot.id
      }

      // Enlazar plantillas para los tipos de este miniStep.
      // v2.30: priorizar plantillas del Sistema (companyId = null) para el
      // auto-poblar — son las "compartidas" por defecto. Si una empresa
      // quiere las suyas, el admin puede editar el tablero manualmente.
      //
      // RESILIENCIA: si la columna companyId no existe todavía en la BD
      // (migración SQL pendiente), caer a la query sin filtro de companyId.
      const types = MINI_STEP_TEMPLATE_TYPES[miniStep] || []
      for (const type of types) {
        let tpl: Awaited<ReturnType<typeof db.template.findFirst>> = null
        try {
          // Intentar con filtro companyId = null (post-migración v2.30)
          tpl = await db.template.findFirst({
            where: { type, sStep, miniStep, active: true, companyId: null },
            orderBy: { createdAt: 'asc' },
          })
        } catch {
          // Pre-migración: la columna companyId no existe — buscar sin filtro
          tpl = await db.template.findFirst({
            where: { type, sStep, miniStep, active: true },
            orderBy: { createdAt: 'asc' },
          })
        }
        if (!tpl) continue

        // ¿Ya está enlazada?
        const existingLink = await db.boardSlotTemplate.findUnique({
          where: { slotId_templateId: { slotId, templateId: tpl.id } },
        })
        if (existingLink) continue

        await db.boardSlotTemplate.create({
          data: { slotId, templateId: tpl.id, sortOrder: 0 },
        })
        created++
      }
    }
  }

  return created
}

// GET /api/board-configs — List all board configurations with slot counts
// Auto-creates a default config named "Tablero 5S" if none exists.
// También auto-puebla los 25 slots del default si están vacíos.
export async function GET() {
  try {
    let configs = await db.boardConfiguration.findMany({
      include: {
        _count: { select: { slots: true, zones: true } },
      },
      orderBy: { isDefault: 'desc' },
    })

    // Auto-create default if none exists — the board config is the "soul" of the app
    // and should always be present.
    let defaultConfig = configs.find(c => c.isDefault)
    if (configs.length === 0) {
      const created = await db.boardConfiguration.create({
        data: {
          name: 'Tablero 5S',
          description: 'Tablero predeterminado del sistema',
          isDefault: true,
        },
        include: { _count: { select: { slots: true, zones: true } } },
      })
      configs = [created]
      defaultConfig = created
    }

    // Auto-poblar slots del default si están vacíos (Fix B)
    if (defaultConfig) {
      try {
        const populated = await ensureDefaultSlotsPopulated(defaultConfig.id)
        if (populated > 0) {
          // Refrescar configs para reflejar los nuevos _count.slots
          configs = await db.boardConfiguration.findMany({
            include: { _count: { select: { slots: true, zones: true } } },
            orderBy: { isDefault: 'desc' },
          })
        }
      } catch (populateErr) {
        // Non-fatal: si falla el populate, devolver configs igualmente
        console.error('[board-configs] Auto-populate failed:', populateErr)
      }
    }

    return NextResponse.json({ success: true, data: configs })
  } catch (error) {
    console.error('Error fetching board configs:', error)
    return NextResponse.json({ success: false, error: 'Error fetching board configs' }, { status: 500 })
  }
}

// POST /api/board-configs — Create a new board configuration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, isDefault } = body

    if (!name) {
      return NextResponse.json({ success: false, error: 'El nombre es obligatorio' }, { status: 400 })
    }

    // If this is set as default, unset any existing default
    if (isDefault) {
      await db.boardConfiguration.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      })
    }

    const config = await db.boardConfiguration.create({
      data: {
        name,
        description: description || null,
        isDefault: isDefault || false,
      },
    })

    return NextResponse.json({ success: true, data: config })
  } catch (error) {
    console.error('Error creating board config:', error)
    return NextResponse.json({ success: false, error: 'Error creating board config' }, { status: 500 })
  }
}

// PUT /api/board-configs — Update a board configuration
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, description, isDefault } = body

    if (!id) {
      return NextResponse.json({ success: false, error: 'Se requiere el id' }, { status: 400 })
    }

    // If setting as default, unset any existing default
    if (isDefault) {
      await db.boardConfiguration.updateMany({
        where: { isDefault: true, id: { not: id } },
        data: { isDefault: false },
      })
    }

    const config = await db.boardConfiguration.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(isDefault !== undefined && { isDefault }),
      },
    })

    return NextResponse.json({ success: true, data: config })
  } catch (error) {
    console.error('Error updating board config:', error)
    return NextResponse.json({ success: false, error: 'Error updating board config' }, { status: 500 })
  }
}

// DELETE /api/board-configs?id=xxx
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'Se requiere el id' }, { status: 400 })
    }

    // Unlink zones from this config
    await db.zone.updateMany({
      where: { boardConfigId: id },
      data: { boardConfigId: null },
    })

    await db.boardConfiguration.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting board config:', error)
    return NextResponse.json({ success: false, error: 'Error deleting board config' }, { status: 500 })
  }
}
