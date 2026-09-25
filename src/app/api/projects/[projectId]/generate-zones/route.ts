import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../../lib/db'
import { ensureJaulaZone } from '../../../../../lib/jaula-zone'
import { splitZones, type InitialZone } from '../../../../../lib/zone-generator'

// v3.0.59: Función para asegurar que los 25 slots existan antes de asignar plantillas
async function ensureBoardSlotsExist(boardConfigId: string, tx: any) {
  console.log(`[ensureBoardSlots] Creando/verificando slots para boardConfig: ${boardConfigId}`)
  
  let createdCount = 0
  
  for (let sStep = 1; sStep <= 5; sStep++) {
    for (let miniStep = 1; miniStep <= 5; miniStep++) {
      try {
        const existingSlot = await tx.boardSlot.findUnique({
          where: {
            boardConfigId_sStep_miniStep: { boardConfigId, sStep, miniStep },
          },
        })
        
        if (!existingSlot) {
          await tx.boardSlot.create({
            data: { boardConfigId, sStep, miniStep },
          })
          createdCount++
          console.log(`[ensureBoardSlots] ✓ Creado slot S${sStep}P${miniStep}`)
        }
      } catch (e) {
        console.error(`[ensureBoardSlots] Error creando slot S${sStep}P${miniStep}:`, e)
      }
    }
  }
  
  console.log(`[ensureBoardSlots] Completado: ${createdCount} slots creados`)
  return createdCount
}

// v3.0.59: Función para auto-asignar plantillas a los slots de un board config
async function assignTemplatesToBoardConfig(boardConfigId: string, tx: any) {
  // Mapeo de tipo de plantilla -> sStep, miniStep
  const typeToSlot: Record<string, { sStep: number; miniStep: number }> = {
    'formacion': { sStep: 1, miniStep: 1 },
    'examen': { sStep: 1, miniStep: 1 },
    'fotos': { sStep: 1, miniStep: 2 },
    'inventario': { sStep: 1, miniStep: 3 },
    'autoevaluacion': { sStep: 1, miniStep: 4 },
    'auditoria': { sStep: 1, miniStep: 5 },
  }

  console.log(`[assignTemplates] Iniciando asignación para boardConfig: ${boardConfigId}`)
  
  // v3.0.59 FIX: Primero asegurar que los slots existan
  const slotsCreated = await ensureBoardSlotsExist(boardConfigId, tx)
  console.log(`[assignTemplates] Slots creados: ${slotsCreated}`)

  // Obtener todas las plantillas activas (públicas del sistema + de la empresa si aplica)
  const allTemplates = await tx.template.findMany({
    where: { active: true },
    select: { id: true, type: true, title: true, companyId: true }
  })

  console.log(`[assignTemplates] Plantillas encontradas: ${allTemplates.length}`, 
    allTemplates.map(t => ({ id: t.id, type: t.type, title: t.title, companyId: t.companyId })))

  // Obtener los slots del board config (ahora deberían existir todos)
  const slots = await tx.boardSlot.findMany({
    where: { boardConfigId },
    select: { id: true, sStep: true, miniStep: true }
  })

  console.log(`[assignTemplates] Slots encontrados: ${slots.length}`, 
    slots.map(s => ({ id: s.id, sStep: s.sStep, miniStep: s.miniStep })))

  if (slots.length === 0) {
    console.warn(`[assignTemplates] WARNING: No hay slots para el boardConfig ${boardConfigId}`)
  }

  if (allTemplates.length === 0) {
    console.warn(`[assignTemplates] WARNING: No hay plantillas activas en la base de datos`)
  }

  let assignedCount = 0
  let skippedCount = 0

  // Asignar plantillas a cada slot
  for (const slot of slots) {
    const templatesForSlot = allTemplates.filter(t => {
      const slotInfo = typeToSlot[t.type]
      return slotInfo && slotInfo.sStep === slot.sStep && slotInfo.miniStep === slot.miniStep
    })

    console.log(`[assignTemplates] Slot ${slot.id} (S${slot.sStep}P${slot.miniStep}): ${templatesForSlot.length} plantillas`)

    for (const template of templatesForSlot) {
      try {
        // Verificar si ya existe
        const existing = await tx.boardSlotTemplate.findUnique({
          where: {
            slotId_templateId: {
              slotId: slot.id,
              templateId: template.id
            }
          }
        })

        if (existing) {
          skippedCount++
          continue
        }

        // Usar upsert para evitar duplicados
        await tx.boardSlotTemplate.upsert({
          where: {
            slotId_templateId: {
              slotId: slot.id,
              templateId: template.id
            }
          },
          create: {
            slotId: slot.id,
            templateId: template.id,
          },
          update: {}
        })
        assignedCount++
        console.log(`[assignTemplates] ✓ Asignada plantilla "${template.title}" (${template.type}) al slot S${slot.sStep}P${slot.miniStep}`)
      } catch (e) {
        console.error(`[assignTemplates] Error asignando plantilla ${template.id} al slot ${slot.id}:`, e)
      }
    }
  }

  console.log(`[assignTemplates] Completado: ${assignedCount} asignadas, ${skippedCount} ya existían`)
  return { assignedCount, skippedCount, totalTemplates: allTemplates.length, totalSlots: slots.length, slotsCreated }
}

// POST /api/projects/[projectId]/generate-zones
//
// v2.108 — Acepta zonas iniciales (nombre + m² + empleados) nombradas
// por el admin, las divide según maxM2PorZona del gestor, crea las
// sub-zonas resultantes + asigna empleados + crea la jaula física.
// v3.0.59 — También auto-asigna plantillas a los slots del tablero (con creación de slots).
//
// Body:
//   {
//     zonasIniciales: [{ nombre, m2, empleados }],
//     subZonas: [{ nombre, m2, empleadoIndex }],  // renombradas por el admin
//     empleados: [{ userId, role }]               // lista de usuarios a asignar
//   }
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const body = await request.json()
    const { subZonas, empleados } = body as {
      subZonas: {
        nombre: string
        m2: number
        empleadoIndex: number
      }[]
      empleados: { userId: string; role: string }[]
    }

    // ─── Validación ────────────────────────────────────────────────────
    if (!Array.isArray(subZonas) || subZonas.length === 0) {
      return NextResponse.json(
        { error: 'Se requiere al menos una sub-zona' },
        { status: 400 }
      )
    }
    // v2.108.5 — Permitir generar zonas sin empleados (aviso, no error).
    // El admin puede asignar usuarios después desde el panel del proyecto.
    const empleadosList = Array.isArray(empleados) ? empleados : []

    const project = await db.project.findUnique({ where: { id: projectId } })
    if (!project) {
      return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })
    }

    // Pre-check: si ya hay zonas generadas, no machacar
    if (project.layoutGenerated) {
      const existingGenerated = await db.zone.count({
        where: { projectId, isJaula: false },
      })
      if (existingGenerated > 0) {
        return NextResponse.json(
          {
            error: 'Este proyecto ya tiene zonas generadas por el wizard. Elimínalas primero si quieres regenerar.',
            code: 'LAYOUT_ALREADY_GENERATED',
          },
          { status: 409 }
        )
      }
    }

    // ─── Crear zonas + asignar empleados en transacción ───────────────
    const PRESET_COLORS = [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
      '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16',
    ]

    const defaultConfig = await db.boardConfiguration.findFirst({
      where: { isDefault: true },
    })

    const result = await db.$transaction(async (tx) => {
      // 1. Marcar proyecto como layoutGenerated
      await tx.project.update({
        where: { id: projectId },
        data: { layoutGenerated: true },
      })

      // 2. Crear las N sub-zonas
      const created = await Promise.all(
        subZonas.map(async (sz, idx) => {
          const zone = await tx.zone.create({
            data: {
              name: sz.nombre.trim(),
              description: `Generada por wizard v2.108 — ${sz.m2} m²`,
              color: PRESET_COLORS[idx % PRESET_COLORS.length],
              projectId,
              surfaceM2: sz.m2,
              complexityType: project.complexityType || null,
              criticality: project.criticality || 'media',
              ...(defaultConfig ? { boardConfigId: defaultConfig.id } : {}),
            },
          })

          // 3. Asignar empleado a esta zona
          // empleadoIndex es 0-based en el array `empleados`. Si el
          // mismo empleadoIndex se repite (P2.A), se le añade a otra zona.
          const empleado = empleadosList[sz.empleadoIndex]
          if (empleado) {
            // ProjectMember (crear si no existe)
            let member = await tx.projectMember.findUnique({
              where: {
                userId_projectId: {
                  userId: empleado.userId,
                  projectId,
                },
              },
            })
            if (!member) {
              member = await tx.projectMember.create({
                data: {
                  userId: empleado.userId,
                  projectId,
                  role: empleado.role || 'empleado',
                },
              })
            }
            // MemberZone (crear si no existe)
            await tx.memberZone.upsert({
              where: { memberId_zoneId: { memberId: member.id, zoneId: zone.id } },
              create: { memberId: member.id, zoneId: zone.id },
              update: {},
            })
          }

          return zone
        })
      )

      // 4. Jaula física (idempotente)
      let jaulaZone: Awaited<ReturnType<typeof ensureJaulaZone>> | null = null
      try {
        jaulaZone = await ensureJaulaZone(projectId)
      } catch (e) {
        console.error('[generate-zones] ensureJaulaZone failed (non-fatal):',
          e instanceof Error ? e.message : e)
      }

      // 5. v3.0.58: Auto-asignar plantillas a los slots del board config
      let templateAssignmentResult = null
      if (defaultConfig) {
        try {
          templateAssignmentResult = await assignTemplatesToBoardConfig(defaultConfig.id, tx)
          console.log(`[generate-zones] Plantillas auto-asignadas al board config ${defaultConfig.id}:`, templateAssignmentResult)
        } catch (e) {
          console.error('[generate-zones] Error auto-asignando plantillas (non-fatal):',
            e instanceof Error ? e.message : e)
        }
      }

      return { zones: created, jaulaZone, templateAssignmentResult }
    })

    return NextResponse.json(
      {
        zonasCreadas: result.zones.map((z) => ({
          id: z.id, name: z.name, color: z.color, surfaceM2: z.surfaceM2,
        })),
        jaulaZone: result.jaulaZone
          ? { id: result.jaulaZone.id, name: result.jaulaZone.name }
          : null,
        // v3.0.58: Incluir resultado de asignación de plantillas
        plantillasAsignadas: result.templateAssignmentResult,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error generating zones:', error)
    return NextResponse.json(
      { error: 'Error al generar zonas' },
      { status: 500 }
    )
  }
}
