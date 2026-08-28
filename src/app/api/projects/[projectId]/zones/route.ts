import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../../lib/db'
import { ensureJaulaZone } from '../../../../../lib/jaula-zone'

// GET /api/projects/[projectId]/zones - List zones of a project
// v3.0.1: DEBUG - Deshabilitado ensureJaulaZone temporalmente por errores de constraints
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params

    // v3.0.1 TEMPORAL: Deshabilitado ensureJaulaZone - causa errores de constraint duplicada
    // try {
    //   await ensureJaulaZone(projectId)
    // } catch (e) {
    //   console.error('[zones GET] ensureJaulaZone failed (non-fatal):', e instanceof Error ? e.message : e)
    // }

    console.log('[DEBUG v3.0.1 /zones] Fetching zones for project:', projectId)

    const zones = await db.zone.findMany({
      where: { projectId },
      include: {
        _count: {
          select: { MemberZone: true },  // v3.0.1 FIX
        },
        BoardConfiguration: { select: { id: true, name: true } },  // v3.0.1 FIX: BoardConfiguration no boardConfig
        User: { select: { id: true, name: true, email: true } },  // v3.0.1 FIX: User no responsable
      },
      orderBy: { createdAt: 'asc' },
    })

    console.log('[DEBUG v3.0.1 /zones] Found zones:', zones.length)

    const result = zones.map((zone) => ({
      id: zone.id,
      name: zone.name,
      description: zone.description,
      color: zone.color,
      projectId: zone.projectId,
      boardConfigId: zone.boardConfigId,
      boardConfig: zone.BoardConfiguration,  // v3.0.1 FIX: BoardConfiguration no boardConfig
      responsableId: zone.responsableId,
      responsable: zone.User,  // v3.0.1 FIX: User no responsable
      memberCount: zone._count?.MemberZone || 0,  // v3.0.1 FIX
      isJaula: zone.isJaula,
    }))

    return NextResponse.json({ zones: result }, { status: 200 })
  } catch (error) {
    console.error('Fetch zones error:', error)
    return NextResponse.json(
      { error: 'Error al obtener zonas' },
      { status: 500 }
    )
  }
}

// POST /api/projects/[projectId]/zones - Add a zone to a project
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const body = await request.json()
    const { name, description, color } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Nombre de zona es requerido' },
        { status: 400 }
      )
    }

    // Check if project exists
    const project = await db.project.findUnique({
      where: { id: projectId },
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Proyecto no encontrado' },
        { status: 404 }
      )
    }

    // Check for duplicate zone name in project
    const existingZone = await db.zone.findUnique({
      where: {
        name_projectId: {
          name: name.trim(),
          projectId,
        },
      },
    })

    if (existingZone) {
      return NextResponse.json(
        { error: 'Ya existe una zona con este nombre en el proyecto' },
        { status: 409 }
      )
    }

    const zone = await db.zone.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        color: color || '#3B82F6',
        projectId,
      },
    })

    // Auto-assign default board config if one exists
    const defaultConfig = await db.boardConfiguration.findFirst({
      where: { isDefault: true },
    })
    if (defaultConfig) {
      await db.zone.update({
        where: { id: zone.id },
        data: { boardConfigId: defaultConfig.id },
      })
      zone.boardConfigId = defaultConfig.id
    }

    // v2.101 (PENDIENTE-S1, Opción A): cuando el admin crea una zona
    // nueva, garantizamos que la zona JAULA física también exista en
    // el proyecto. La función es idempotente — si ya existe, no hace
    // nada. No propagamos errores: la creación de la zona del usuario
    // ya tuvo éxito y eso es lo que el cliente espera.
    let jaulaZone: Awaited<ReturnType<typeof ensureJaulaZone>> | null = null
    try {
      jaulaZone = await ensureJaulaZone(projectId)
    } catch (e) {
      console.error('[zones POST] ensureJaulaZone failed (non-fatal):', e instanceof Error ? e.message : e)
    }

    return NextResponse.json({ zone, jaulaZone }, { status: 201 })
  } catch (error) {
    console.error('Add zone error:', error)
    return NextResponse.json(
      { error: 'Error al agregar zona' },
      { status: 500 }
    )
  }
}

// PATCH /api/projects/[projectId]/zones - Update a zone (board config, responsable, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const body = await request.json()
    const { zoneId, boardConfigId, responsableId, name, description, color } = body

    if (!zoneId) {
      return NextResponse.json(
        { error: 'ID de zona es requerido' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (boardConfigId !== undefined) updateData.boardConfigId = boardConfigId || null
    if (responsableId !== undefined) updateData.responsableId = responsableId || null
    if (name !== undefined) updateData.name = name.trim()
    if (description !== undefined) updateData.description = description?.trim() || null
    if (color !== undefined) updateData.color = color

    const zone = await db.zone.update({
      where: { id: zoneId },
      data: updateData,
      include: {
        boardConfig: { select: { id: true, name: true } },
        responsable: { select: { id: true, name: true, email: true } },
      },
    })

    return NextResponse.json({ zone }, { status: 200 })
  } catch (error) {
    console.error('Update zone error:', error)
    return NextResponse.json(
      { error: 'Error al actualizar zona' },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/[projectId]/zones - Remove a zone
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const body = await request.json()
    const { zoneId } = body

    if (!zoneId) {
      return NextResponse.json(
        { error: 'ID de zona es requerido' },
        { status: 400 }
      )
    }

    // Verify zone belongs to project
    const zone = await db.zone.findUnique({
      where: { id: zoneId },
    })

    if (!zone || zone.projectId !== projectId) {
      return NextResponse.json(
        { error: 'Zona no encontrada en este proyecto' },
        { status: 404 }
      )
    }

    // Delete zone (cascade will handle member zone references)
    await db.zone.delete({
      where: { id: zoneId },
    })

    return NextResponse.json(
      { message: 'Zona eliminada correctamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete zone error:', error)
    return NextResponse.json(
      { error: 'Error al eliminar zona' },
      { status: 500 }
    )
  }
}
