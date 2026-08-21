import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * POST /api/avisos/auto
 *
 * v2.61: Genera automáticamente Avisos (Notifications) para el responsable
 * en función de las ActionItems que tiene asignadas.
 *
 * Tipos de avisos generados:
 *   1. 'new_action_item'  → Hallazgo nuevo entrado al Plan de Acción HOY
 *      (fechaEntrada es hoy, estado != resuelta/cerrada)
 *   2. 'action_due_today' → Tarea con fechaLimite == hoy y estado != resuelta
 *   3. 'action_overdue'   → Tarea con fechaLimite < hoy y estado != resuelta
 *
 * Dedupe: por (userId, type,itemId+fechaStr). Se evita generar duplicados
 * para el mismo día.
 *
 * Body: { userId: string, projectId?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, projectId } = body

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId es requerido' },
        { status: 400 }
      )
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true },
    })
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    // Construir filtro OR: ActionItems donde el responsable coincide con el usuario
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
    // Zonas donde es responsable
    const respZones = await db.zone.findMany({
      where: { responsableId: user.id },
      select: { id: true },
    })
    if (respZones.length > 0) {
      orConditions.push({ zoneId: { in: respZones.map((z) => z.id) } })
    }

    const where: any = { OR: orConditions }
    if (projectId) where.projectId = projectId

    // Gerente ve todo en su proyecto
    if (user.role === 'gerente') {
      delete where.OR
      if (projectId) where.projectId = projectId
    }

    const actionItems = await db.actionItem.findMany({
      where,
      include: {
        zone: { select: { id: true, name: true } },
        project: { select: { id: true, name: true } },
      },
      take: 500,
    })

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString().slice(0, 10)

    let created = 0
    let skipped = 0

    for (const item of actionItems) {
      if (['resuelta', 'cerrada'].includes(item.estado)) continue

      // Determinar tipo de aviso
      let type: 'new_action_item' | 'action_due_today' | 'action_overdue' | null = null
      let title = ''
      let message = ''

      // 1. Hallazgo nuevo (fechaEntrada == hoy)
      if (item.fechaEntrada) {
        const entrada = new Date(item.fechaEntrada)
        entrada.setHours(0, 0, 0, 0)
        const entradaStr = entrada.toISOString().slice(0, 10)
        if (entradaStr === todayStr) {
          type = 'new_action_item'
          title = `Nuevo hallazgo: ${item.hallazgo.slice(0, 60)}${item.hallazgo.length > 60 ? '…' : ''}`
          message = `Entra al Plan de Acción un nuevo hallazgo${
            item.zone?.name ? ` en ${item.zone.name}` : ''
          }. Responsable: ${item.responsable || '—'}${
            item.fechaLimite
              ? ` · Vence: ${new Date(item.fechaLimite).toLocaleDateString('es-ES')}`
              : ''
          }`
        }
      }

      // 2. Vence hoy
      if (!type && item.fechaLimite) {
        const limite = new Date(item.fechaLimite)
        limite.setHours(0, 0, 0, 0)
        const limiteStr = limite.toISOString().slice(0, 10)
        if (limiteStr === todayStr) {
          type = 'action_due_today'
          title = `Tarea para hoy: ${item.hallazgo.slice(0, 60)}${item.hallazgo.length > 60 ? '…' : ''}`
          message = `Hoy vence el plazo de una tarea del Plan de Acción${
            item.zone?.name ? ` en ${item.zone.name}` : ''
          }. Responsable: ${item.responsable || '—'}`
        } else if (limiteStr < todayStr) {
          // 3. Vencida
          type = 'action_overdue'
          const diasVencida = Math.floor(
            (today.getTime() - limite.getTime()) / (1000 * 60 * 60 * 24)
          )
          title = `Tarea vencida: ${item.hallazgo.slice(0, 60)}${item.hallazgo.length > 60 ? '…' : ''}`
          message = `Lleva ${diasVencida} día(s) vencida${
            item.zone?.name ? ` en ${item.zone.name}` : ''
          }. Responsable: ${item.responsable || '—'}. Requiere acción inmediata.`
        }
      }

      if (!type) continue

      // Dedupe: mismo tipo + mismo itemId + mismo día
      const dayStart = new Date(today)
      const existing = await db.notification.findFirst({
        where: {
          userId,
          type,
          sStep: item.sStep,
          zoneId: item.zoneId || null,
          projectId: item.projectId,
          createdAt: { gte: dayStart },
          message: { contains: item.id },
        },
      })
      if (existing) {
        skipped++
        continue
      }

      await db.notification.create({
        data: {
          userId,
          type,
          title,
          message: `${message}\n\n[ref:${item.id}]`,
          sStep: item.sStep,
          zoneId: item.zoneId || null,
          projectId: item.projectId,
        },
      })
      created++
    }

    return NextResponse.json({
      success: true,
      created,
      skipped,
      totalScanned: actionItems.length,
    })
  } catch (error) {
    console.error('[/api/avisos/auto] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error generando avisos' },
      { status: 500 }
    )
  }
}
