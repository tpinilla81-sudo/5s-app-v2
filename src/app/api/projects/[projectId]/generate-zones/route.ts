import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ensureJaulaZone } from '@/lib/jaula-zone'
import { splitZones, type InitialZone } from '@/lib/zone-generator'

// POST /api/projects/[projectId]/generate-zones
//
// v2.108 — Acepta zonas iniciales (nombre + m² + empleados) nombradas
// por el admin, las divide según maxM2PorZona del gestor, crea las
// sub-zonas resultantes + asigna empleados + crea la jaula física.
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

      return { zones: created, jaulaZone }
    })

    return NextResponse.json(
      {
        zonasCreadas: result.zones.map((z) => ({
          id: z.id, name: z.name, color: z.color, surfaceM2: z.surfaceM2,
        })),
        jaulaZone: result.jaulaZone
          ? { id: result.jaulaZone.id, name: result.jaulaZone.name }
          : null,
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
