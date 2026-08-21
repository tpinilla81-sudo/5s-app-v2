import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/my-tasks?userId=xxx&projectId=xxx&showCompleted=true
// Returns ActionItems assigned to a given user, enriched with status:
//   - "vencida"     : fechaLimite < today and estado != resuelta/cerrada
//   - "hoy"         : fechaLimite == today
//   - "proxima"     : fechaLimite > today (next 30 days)
//   - "sin_fecha"   : fechaLimite is null
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const projectId = searchParams.get('projectId')
    const showCompleted = searchParams.get('showCompleted') === 'true'

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      )
    }

    // 1. Get the user (to know name + role)
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // 2. Build OR conditions for tasks assigned to this user
    //    ActionItem has plain-text fields (responsable, personaDemandada)
    //    so we match by name OR email. Gerente sees everything in the project.
    const orConditions: any[] = [
      { responsable: { contains: user.name, mode: 'insensitive' } },
      { personaDemandada: { contains: user.name, mode: 'insensitive' } },
    ]
    if (user.email) {
      orConditions.push(
        { responsable: { contains: user.email, mode: 'insensitive' } },
        { personaDemandada: { contains: user.email, mode: 'insensitive' } }
      )
    }

    // 3. Get zones where user is responsable
    const responsableZones = await db.zone.findMany({
      where: { responsableId: user.id },
      select: { id: true },
    })
    if (responsableZones.length > 0) {
      orConditions.push({
        zoneId: { in: responsableZones.map((z) => z.id) },
      })
    }

    // 4. Get project memberships
    const memberships = await db.projectMember.findMany({
      where: { userId: user.id },
      select: { projectId: true },
    })
    if (memberships.length > 0 && !projectId) {
      orConditions.push({
        projectId: { in: memberships.map((m) => m.projectId) },
      })
    }

    // 5. Build the where clause
    const where: any = { OR: orConditions }

    // Scope by project if provided
    if (projectId) {
      where.projectId = projectId
    }

    // Gerente sees all items in their project(s) — override OR filter
    if (user.role === 'gerente') {
      delete where.OR
      if (projectId) {
        where.projectId = projectId
      } else if (memberships.length > 0) {
        where.projectId = { in: memberships.map((m) => m.projectId) }
      }
    }

    // Filter out resolved unless showCompleted
    if (!showCompleted) {
      where.estado = { notIn: ['resuelta', 'cerrada'] }
    }

    // 6. Query
    const items = await db.actionItem.findMany({
      where,
      orderBy: [{ fechaLimite: 'asc' }, { createdAt: 'desc' }],
      take: 200,
      include: {
        project: { select: { id: true, name: true, company: true } },
        zone: { select: { id: true, name: true } },
      },
    })

    // 7. Compute status + stats
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString().slice(0, 10)

    const enriched = items.map((it) => {
      let status: 'vencida' | 'hoy' | 'proxima' | 'sin_fecha' = 'sin_fecha'
      if (it.fechaLimite) {
        const d = new Date(it.fechaLimite)
        d.setHours(0, 0, 0, 0)
        const dStr = d.toISOString().slice(0, 10)
        if (dStr < todayStr && !['resuelta', 'cerrada'].includes(it.estado)) {
          status = 'vencida'
        } else if (dStr === todayStr) {
          status = 'hoy'
        } else if (d > today) {
          status = 'proxima'
        } else if (dStr < todayStr && ['resuelta', 'cerrada'].includes(it.estado)) {
          // Resolved past items don't count as vencida
          status = 'proxima'
        }
      }
      return { ...it, _status: status }
    })

    const stats = {
      total: enriched.length,
      vencidas: enriched.filter((i) => i._status === 'vencida').length,
      hoy: enriched.filter((i) => i._status === 'hoy').length,
      proximas: enriched.filter((i) => i._status === 'proxima').length,
      sinFecha: enriched.filter((i) => i._status === 'sin_fecha').length,
    }

    // v2.68: incluir evaluaciones programadas (autoeval/auditoría) donde el usuario
    // es responsable OR empleado. Aparecen como entradas adicionales en el calendario.
    const evalSchedules = await db.evaluationSchedule.findMany({
      where: {
        OR: [
          { responsableId: user.id },
          { empleadoId: user.id },
        ],
        estado: { notIn: ['cancelada', 'realizada'] },
        ...(projectId ? { projectId } : {}),
      },
      include: {
        zone: { select: { id: true, name: true, color: true } },
        project: { select: { id: true, name: true, company: true } },
      },
    })

    const evalItems = evalSchedules.map((es) => {
      const miniStepLabel = es.miniStep === 4 ? 'Autoevaluación' : es.miniStep === 5 ? 'Auditoría' : `Paso ${es.miniStep}`
      const isEmpleado = es.empleadoId === user.id
      const roleLabel = isEmpleado ? '(asistes)' : '(realizas)'
      return {
        id: `eval-${es.id}`,
        itemId: `eval-${es.id}`,
        itemDescription: `${miniStepLabel} S${es.sStep} ${roleLabel}`,
        hallazgo: `${miniStepLabel} programada para S${es.sStep}`,
        mejora: es.notas || null,
        responsable: null,
        personaDemandada: null,
        prioridad: 'alta' as const,
        estado: 'abierta' as const,
        fechaLimite: es.fechaProgramada || null,
        fechaCompromiso: es.fechaProgramada || null,
        fechaResolucion: null,
        fechaReal: null,
        fechaEntrada: es.createdAt ? new Date(es.createdAt).toISOString() : null,
        porcentaje: 0,
        source: 'evaluation_schedule',
        sStep: es.sStep,
        miniStep: es.miniStep,
        notas: es.horaProgramada ? `Hora: ${es.horaProgramada}` : null,
        project: es.project,
        zone: es.zone,
        _status: (() => {
          if (!es.fechaProgramada) return 'sin_fecha' as const
          const d = new Date(es.fechaProgramada)
          d.setHours(0, 0, 0, 0)
          const dStr = d.toISOString().slice(0, 10)
          if (dStr < todayStr) return 'vencida' as const
          if (dStr === todayStr) return 'hoy' as const
          return 'proxima' as const
        })(),
      }
    })

    const allItems = [...enriched, ...evalItems]

    const finalStats = {
      total: allItems.length,
      vencidas: allItems.filter((i) => i._status === 'vencida').length,
      hoy: allItems.filter((i) => i._status === 'hoy').length,
      proximas: allItems.filter((i) => i._status === 'proxima').length,
      sinFecha: allItems.filter((i) => i._status === 'sin_fecha').length,
    }

    return NextResponse.json({
      success: true,
      data: allItems,
      stats: finalStats,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
  } catch (error) {
    console.error('[/api/my-tasks] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error fetching tasks' },
      { status: 500 }
    )
  }
}

// PATCH /api/my-tasks — Update task status (quick action from the calendar)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, estado, notas, porcentaje } = body

    if (!id || !estado) {
      return NextResponse.json(
        { success: false, error: 'id and estado are required' },
        { status: 400 }
      )
    }

    const data: any = { estado }
    if (typeof notas === 'string') data.notas = notas
    if (typeof porcentaje === 'number') data.porcentaje = porcentaje
    if (estado === 'resuelta' || estado === 'cerrada') {
      data.fechaResolucion = new Date()
      data.fechaReal = new Date()
      if (typeof porcentaje !== 'number') data.porcentaje = 100
    }

    const updated = await db.actionItem.update({
      where: { id },
      data,
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('[/api/my-tasks PATCH] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error updating task' },
      { status: 500 }
    )
  }
}
