import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/projects/[projectId]/zones/[zoneId]/members
// Asigna un usuario EXISTENTE a una zona concreta.
//   - Si el usuario ya es ProjectMember del proyecto: crea solo el MemberZone
//   - Si no es ProjectMember: lo crea con rol 'empleado' y le asigna esta zona
//   - Si ya está asignado a esta zona: devuelve 409
// Body: { userId: string, role?: string }
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; zoneId: string }> }
) {
  try {
    const { projectId, zoneId } = await params
    const body = await request.json()
    const { userId, role } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'userId es requerido' },
        { status: 400 }
      )
    }

    // Verify zone belongs to project
    const zone = await db.zone.findUnique({ where: { id: zoneId } })
    if (!zone || zone.projectId !== projectId) {
      return NextResponse.json(
        { error: 'Zona no encontrada en este proyecto' },
        { status: 404 }
      )
    }

    // Verify user exists and is active
    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Find or create ProjectMember
    let member = await db.projectMember.findUnique({
      where: { userId_projectId: { userId, projectId } },
    })

    if (!member) {
      const validRoles = ['admin', 'gerente', 'responsable', 'empleado', 'auditor']
      const memberRole = validRoles.includes(role) ? role : 'empleado'
      member = await db.projectMember.create({
        data: {
          userId,
          projectId,
          role: memberRole,
        },
      })
    }

    // NOTE: No se toca CompanyMember aquí. La empresa del usuario se gestiona
    // exclusivamente desde "Datos Empresa → Usuarios". Adjudicar a una zona
    // solo crea/actualiza ProjectMember + MemberZone.

    // Check if MemberZone already exists
    const existing = await db.memberZone.findUnique({
      where: { memberId_zoneId: { memberId: member.id, zoneId } },
    })
    if (existing) {
      return NextResponse.json(
        { error: 'Este usuario ya está asignado a esta zona' },
        { status: 409 }
      )
    }

    // Create the MemberZone link
    await db.memberZone.create({
      data: { memberId: member.id, zoneId },
    })

    // Return the enriched member (mirrors /api/projects/[projectId]/members shape)
    const fresh = await db.projectMember.findUnique({
      where: { id: member.id },
      include: {
        user: {
          select: {
            id: true, email: true, name: true, role: true,
            avatar: true, active: true, plainPassword: true,
          },
        },
        zones: {
          include: {
            zone: { select: { id: true, name: true, color: true } },
          },
        },
      },
    })

    const transformed = {
      id: fresh!.id,
      role: fresh!.role,
      joinedAt: fresh!.joinedAt,
      user: fresh!.user,
      zones: fresh!.zones.map((mz) => ({
        id: mz.zone.id,
        name: mz.zone.name,
        color: mz.zone.color,
      })),
    }

    return NextResponse.json({ member: transformed }, { status: 201 })
  } catch (error) {
    console.error('Add zone member error:', error)
    return NextResponse.json(
      { error: 'Error al asignar miembro a la zona' },
      { status: 500 }
    )
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/projects/[projectId]/zones/[zoneId]/members?memberId=xxx
// Elimina SOLO la asignación a esta zona (no el ProjectMember ni el User).
// Si el miembro no tiene más zonas, sigue siendo ProjectMember (puede reasignarse).
// ─────────────────────────────────────────────────────────────────────────────
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; zoneId: string }> }
) {
  try {
    const { projectId, zoneId } = await params
    const { searchParams } = new URL(request.url)
    const memberId = searchParams.get('memberId')

    if (!memberId) {
      return NextResponse.json(
        { error: 'memberId es requerido (query param)' },
        { status: 400 }
      )
    }

    // Verify the MemberZone exists and belongs to this project
    const mz = await db.memberZone.findUnique({
      where: { memberId_zoneId: { memberId, zoneId } },
      include: { member: { select: { projectId: true } } },
    })

    if (!mz || mz.member.projectId !== projectId) {
      return NextResponse.json(
        { error: 'Asignación no encontrada en esta zona' },
        { status: 404 }
      )
    }

    await db.memberZone.delete({
      where: { memberId_zoneId: { memberId, zoneId } },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Remove zone member error:', error)
    return NextResponse.json(
      { error: 'Error al retirar miembro de la zona' },
      { status: 500 }
    )
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/projects/[projectId]/zones/[zoneId]/members
// Cambia el rol de un miembro dentro de ESTA zona (actualiza ProjectMember.role
// porque en este esquema el rol es por proyecto, no por zona).
// Body: { memberId: string, role: string }
// ─────────────────────────────────────────────────────────────────────────────
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; zoneId: string }> }
) {
  try {
    const { projectId, zoneId } = await params
    const body = await request.json()
    const { memberId, role } = body

    if (!memberId || !role) {
      return NextResponse.json(
        { error: 'memberId y role son requeridos' },
        { status: 400 }
      )
    }

    const validRoles = ['admin', 'gerente', 'responsable', 'empleado', 'auditor']
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: 'Rol no válido' }, { status: 400 })
    }

    const member = await db.projectMember.findUnique({
      where: { id: memberId },
    })
    if (!member || member.projectId !== projectId) {
      return NextResponse.json(
        { error: 'Miembro no encontrado en este proyecto' },
        { status: 404 }
      )
    }

    await db.projectMember.update({
      where: { id: memberId },
      data: { role },
    })
    await db.user.update({
      where: { id: member.userId },
      data: { role },
    })

    return NextResponse.json({ success: true, role })
  } catch (error) {
    console.error('Update zone member error:', error)
    return NextResponse.json(
      { error: 'Error al actualizar miembro' },
      { status: 500 }
    )
  }
}
