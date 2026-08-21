import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

/**
 * POST /api/avisos/generate
 *
 * v2.75: Endpoint unificado que sustituye a:
 *   - /api/notifications/auto (pasos 1-3 / 1-4 completos)
 *   - /api/avisos/auto (ActionItems: new_action_item, action_due_today, action_overdue)
 *
 * Body:
 *   {
 *     projectId: string,
 *     userId?: string,        // si se pasa, genera avisos personales de ActionItems
 *     source: 'step_completed' | 'action_items' | 'schedule' | 'all'
 *   }
 *
 * Tipos de aviso que puede generar:
 *
 *  source='step_completed':
 *    - autoeval_ready (pasos 1-3 completos, paso 4 no) → al RESPONSABLE de zona
 *    - audit_ready    (pasos 1-4 completos, paso 5 no) → a AUDITORES + RESPONSABLE
 *
 *  source='action_items':
 *    - new_action_item    (fechaEntrada == hoy)        → a personaDemandadaId + admins
 *    - action_due_today   (fechaLimite == hoy)         → a personaDemandadaId
 *    - action_overdue     (fechaLimite < hoy)          → a personaDemandadaId + gerentes
 *
 *  source='schedule':
 *    - evaluation_expired (ventana 2h expirada sin completar)
 *      NOTA: la lógica principal está en /api/evaluation-schedule/check-vencidas,
 *      este source solo re-ejecuta el mismo chequeo para usuarios que acaban de
 *      entrar al board. No genera duplicados (dedupe por día).
 *
 *  source='all' (default): ejecuta los 3 en paralelo.
 *
 * Dedupe: 1 aviso por (userId, type, sStep, zoneId, day) salvo para ActionItems
 * que se dedup por (userId, type, sStep, zoneId, day, itemId).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, userId, source = 'all' } = body

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'projectId es requerido' },
        { status: 400 }
      )
    }

    const stats = {
      autoeval_ready: 0,
      audit_ready: 0,
      new_action_item: 0,
      action_due_today: 0,
      action_overdue: 0,
      evaluation_expired: 0,
      skipped: 0,
    }

    const runStepCompleted = source === 'step_completed' || source === 'all'
    const runActionItems = source === 'action_items' || source === 'all'
    const runSchedule = source === 'schedule' || source === 'all'

    // ─────────────────────────────────────────────────────────────────
    // BLOQUE 1: step_completed → autoeval_ready + audit_ready
    // ─────────────────────────────────────────────────────────────────
    if (runStepCompleted) {
      const zones = await db.zone.findMany({ where: { projectId } })
      const members = await db.projectMember.findMany({
        where: { projectId },
        include: { user: { select: { id: true, name: true, role: true } } },
      })
      const auditors = members.filter(m => m.role === 'auditor')
      const responsables = members.filter(m => m.role === 'responsable')
      const gerentes = members.filter(m => m.role === 'gerente')

      const S_NAMES: Record<number, string> = {
        1: 'Seiri', 2: 'Seiton', 3: 'Seiso', 4: 'Seiketsu', 5: 'Shitsuke',
      }

      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

      for (const zone of zones) {
        for (let s = 1; s <= 5; s++) {
          // Check 1-3 completos
          let steps1to3Done = true
          for (let ms = 1; ms <= 3; ms++) {
            const z = await db.progress.findFirst({
              where: { sStep: s, miniStep: ms, zoneId: zone.id, completed: true },
            })
            if (z) continue
            const e = await db.employeeProgress.findFirst({
              where: { sStep: s, miniStep: ms, zoneId: zone.id, completed: true },
            })
            if (e) continue
            steps1to3Done = false
            break
          }

          if (steps1to3Done) {
            // step 4 NO completado
            const step4Zone = await db.progress.findFirst({
              where: { sStep: s, miniStep: 4, zoneId: zone.id, completed: true },
            })
            const step4Emp = await db.employeeProgress.findFirst({
              where: { sStep: s, miniStep: 4, zoneId: zone.id, completed: true },
            })

            if (!step4Zone && !step4Emp) {
              // Dedupe: existe aviso autoeval_ready para esta zona+S en 24h?
              const existing = await db.notification.findFirst({
                where: {
                  type: 'autoeval_ready',
                  sStep: s,
                  zoneId: zone.id,
                  projectId,
                  createdAt: { gte: oneDayAgo },
                },
              })
              if (!existing) {
                const title = `Autoevaluación lista: S${s} — ${S_NAMES[s] || ''}`
                const message = `Los pasos 1-3 de S${s} (${S_NAMES[s] || ''}) en la zona "${zone.name}" han sido completados. La autoevaluación (Paso 4) está lista para que el responsable la realice.`
                const metadata = JSON.stringify({
                  sStep: s, zoneId: zone.id, zoneName: zone.name,
                  miniStep: 4,
                })
                for (const resp of responsables) {
                  await db.notification.create({
                    data: {
                      userId: resp.userId,
                      type: 'autoeval_ready',
                      title, message, metadata,
                      sStep: s, zoneId: zone.id, projectId,
                    },
                  })
                  stats.autoeval_ready++
                }
              } else {
                stats.skipped++
              }
            }
          }

          // Check 1-4 completos
          let steps1to4Done = true
          for (let ms = 1; ms <= 4; ms++) {
            const z = await db.progress.findFirst({
              where: { sStep: s, miniStep: ms, zoneId: zone.id, completed: true },
            })
            if (z) continue
            const e = await db.employeeProgress.findFirst({
              where: { sStep: s, miniStep: ms, zoneId: zone.id, completed: true },
            })
            if (e) continue
            steps1to4Done = false
            break
          }

          if (!steps1to4Done) continue

          // step 5 NO completado
          const step5 = await db.progress.findFirst({
            where: { sStep: s, miniStep: 5, zoneId: zone.id, completed: true },
          })
          if (step5) continue

          // Dedupe
          const existing = await db.notification.findFirst({
            where: {
              type: 'audit_ready',
              sStep: s, zoneId: zone.id, projectId,
              createdAt: { gte: oneDayAgo },
            },
          })
          if (existing) {
            stats.skipped++
            continue
          }

          const title = `Auditoría lista: S${s} — ${S_NAMES[s] || ''}`
          const message = `Los pasos 1-4 de S${s} (${S_NAMES[s] || ''}) en la zona "${zone.name}" han sido completados. La auditoría (Paso 5) está lista para realizarse.`
          const metadata = JSON.stringify({
            sStep: s, zoneId: zone.id, zoneName: zone.name, miniStep: 5,
          })
          // Auditores
          for (const aud of auditors) {
            await db.notification.create({
              data: {
                userId: aud.userId,
                type: 'audit_ready', title, message, metadata,
                sStep: s, zoneId: zone.id, projectId,
              },
            })
            stats.audit_ready++
          }
          // Responsables (informativo)
          for (const resp of responsables) {
            await db.notification.create({
              data: {
                userId: resp.userId,
                type: 'audit_ready', title, message, metadata,
                sStep: s, zoneId: zone.id, projectId,
              },
            })
            stats.audit_ready++
          }
          // Gerentes (informativo, opcional)
          for (const ger of gerentes) {
            await db.notification.create({
              data: {
                userId: ger.userId,
                type: 'audit_ready', title, message, metadata,
                sStep: s, zoneId: zone.id, projectId,
              },
            })
            stats.audit_ready++
          }
        }
      }
    }

    // ─────────────────────────────────────────────────────────────────
    // BLOQUE 2: action_items → new_action_item + action_due_today + action_overdue
    // ─────────────────────────────────────────────────────────────────
    if (runActionItems && userId) {
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

      // Construir filtro OR para ActionItems asignados al usuario
      const orConditions: any[] = [
        { personaDemandadaId: user.id },
      ]
      // Legacy: matching por nombre/email (hasta migrar todo a FKs)
      if (user.name) {
        orConditions.push(
          { responsable: { contains: user.name, mode: 'insensitive' } },
          { personaDemandada: { contains: user.name, mode: 'insensitive' } },
        )
      }
      if (user.email) {
        orConditions.push(
          { responsable: { contains: user.email, mode: 'insensitive' } },
          { personaDemandada: { contains: user.email, mode: 'insensitive' } },
        )
      }
      // Zonas donde es responsable
      const respZones = await db.zone.findMany({
        where: { responsableId: user.id },
        select: { id: true },
      })
      if (respZones.length > 0) {
        orConditions.push({ zoneId: { in: respZones.map(z => z.id) } })
      }

      const where: any = { OR: orConditions, projectId }
      // Gerente ve todo en su proyecto
      if (user.role === 'gerente') {
        delete where.OR
        where.projectId = projectId
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
      const dayStart = new Date(today)

      for (const item of actionItems) {
        if (['resuelta', 'cerrada'].includes(item.estado)) continue

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

        // Dedupe por (userId, type, sStep, zoneId, day, itemId)
        const existing = await db.notification.findFirst({
          where: {
            userId, type,
            sStep: item.sStep,
            zoneId: item.zoneId || null,
            projectId: item.projectId,
            createdAt: { gte: dayStart },
            message: { contains: item.id },
          },
        })
        if (existing) {
          stats.skipped++
          continue
        }

        const metadata = JSON.stringify({
          actionItemId: item.id,
          source: item.source,
          tipo: item.tipo,
          zoneName: item.zone?.name,
        })

        await db.notification.create({
          data: {
            userId, type, title,
            message: `${message}\n\n[ref:${item.id}]`,
            metadata,
            sStep: item.sStep,
            zoneId: item.zoneId || null,
            projectId: item.projectId,
          },
        })
        if (type === 'new_action_item') stats.new_action_item++
        else if (type === 'action_due_today') stats.action_due_today++
        else if (type === 'action_overdue') stats.action_overdue++
      }
    }

    // ─────────────────────────────────────────────────────────────────
    // BLOQUE 3: schedule → evaluation_expired
    // (delegamos en check-vencidas para no duplicar lógica)
    // ─────────────────────────────────────────────────────────────────
    if (runSchedule) {
      try {
        await fetch(`${request.nextUrl.origin}/api/evaluation-schedule/check-vencidas`, {
          method: 'POST',
        })
      } catch (e) {
        // Silencioso — check-vencidas tiene su propio polling
        console.error('[avisos/generate] Error delegando a check-vencidas:', e)
      }
    }

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error: any) {
    console.error('[/api/avisos/generate] Error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Error generando avisos' },
      { status: 500 }
    )
  }
}
