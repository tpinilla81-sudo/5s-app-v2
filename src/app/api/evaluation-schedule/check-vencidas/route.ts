import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

// POST /api/evaluation-schedule/check-vencidas
// v2.74: Detecta schedules con estado 'programada' o 'aceptada' cuya ventana
// [fechaHora, +2h] ya expiró sin haber sido completados. Para cada uno:
//   - Actualiza estado='vencida'
//   - Crea notificación al responsable y al empleado avisando que hay que reprogramar
// Devuelve el número de schedules vencidos en esta pasada.
//
// Llamado por el frontend al montar el board y cada 5 minutos (polling).
//
// v2.86: REFUERZO —
//   • La notificación ahora incluye metadata con scheduleId, miniStep, sStep,
//     zoneId, projectId y un flag action='reprogramar' para que el frontend
//     pueda mostrar un botón "Reprogramar ahora" que abra directamente el
//     diálogo de programación.
//   • Mensaje más enfático: "⚠️ EXPIRADA — Debes programar una nueva fecha
//     manualmente. El sistema NO reprograma automáticamente."
//   • Dedupe: si ya existe una notif 'evaluation_expired' para este scheduleId
//     en las últimas 24h, NO se crea otra (evita spam cada 5 min de polling).
export async function POST() {
  try {
    const VENTANA_MS = 2 * 60 * 60 * 1000 // 2 horas
    const nowMs = Date.now()

    // Buscar schedules activos (no realizada/cancelada/vencida) con fecha programada
    const candidates = await db.evaluationSchedule.findMany({
      where: {
        estado: { in: ['programada', 'aceptada'] },
        fechaProgramada: { not: null },
      },
    })

    const vencidas: any[] = []
    for (const sched of candidates) {
      if (!sched.fechaProgramada) continue
      const hora = sched.horaProgramada || '10:00'
      const startMs = new Date(`${sched.fechaProgramada}T${hora}:00`).getTime()
      if (isNaN(startMs)) continue
      if (nowMs <= startMs + VENTANA_MS) continue // aún no vencida

      // Vencida → actualizar estado
      const updated = await db.evaluationSchedule.update({
        where: { id: sched.id },
        data: { estado: 'vencida' },
      })
      vencidas.push(updated)

      // Construir mensaje v2.86 (más enfático + orientado a acción)
      const miniStepLabel = sched.miniStep === 4 ? 'Autoevaluación' : 'Auditoría'
      const fechaStr = `${sched.fechaProgramada.split('-').reverse().join('/')}${sched.horaProgramada ? ' a las ' + sched.horaProgramada : ''}`
      const titulo = `⚠️ ${miniStepLabel} EXPIRADA: S${sched.sStep} — reprogramar`
      const mensaje = `La ventana de 2 horas para la ${miniStepLabel.toLowerCase()} de S${sched.sStep} programada para el ${fechaStr} ha expirado sin completarse.\n\n` +
        `DEBES programar una nueva fecha manualmente. El sistema NO reprograma automáticamente.\n\n` +
        `Pulsa "Reprogramar ahora" para elegir una nueva fecha y hora.`

      // Metadata para que el frontend muestre botón "Reprogramar ahora"
      const metadata = JSON.stringify({
        scheduleId: sched.id,
        miniStep: sched.miniStep,
        sStep: sched.sStep,
        zoneId: sched.zoneId || null,
        projectId: sched.projectId,
        fechaExpirada: sched.fechaProgramada,
        horaExpirada: sched.horaProgramada || null,
        action: 'reprogramar',
      })

      // v2.86: Dedupe por scheduleId en 24h — evita notificar cada 5 min
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
      const existingNotif = await db.notification.findFirst({
        where: {
          type: 'evaluation_expired',
          sStep: sched.sStep,
          zoneId: sched.zoneId || null,
          projectId: sched.projectId,
          createdAt: { gte: oneDayAgo },
          // Match por scheduleId en metadata (JSON string)
          message: { contains: sched.id },
        },
      })
      if (existingNotif) {
        // Ya notificado en las últimas 24h — saltar
        continue
      }

      // Notificar al responsable (ejecutor)
      if (sched.responsableId) {
        try {
          await db.notification.create({
            data: {
              userId: sched.responsableId,
              type: 'evaluation_expired',
              title: titulo,
              message: `${mensaje}\n\n[ref:${sched.id}]`,
              metadata,
              sStep: sched.sStep,
              zoneId: sched.zoneId || null,
              projectId: sched.projectId,
              read: false,
            },
          })
        } catch (e) {
          console.error('[check-vencidas] Error notifying responsable:', e)
        }
      }

      // Notificar al empleado (asistente)
      if (sched.empleadoId) {
        try {
          await db.notification.create({
            data: {
              userId: sched.empleadoId,
              type: 'evaluation_expired',
              title: titulo,
              message: `${mensaje}\n\n[ref:${sched.id}]`,
              metadata,
              sStep: sched.sStep,
              zoneId: sched.zoneId || null,
              projectId: sched.projectId,
              read: false,
            },
          })
        } catch (e) {
          console.error('[check-vencidas] Error notifying empleado:', e)
        }
      }

      // v2.86: Log de auditoría — Registrar en consola para detectar futuros
      // casos de "auto-reprogramación misteriosa"
      console.log(`[check-vencidas][v2.86] Schedule ${sched.id} marcado como vencido`, {
        scheduleId: sched.id,
        sStep: sched.sStep,
        miniStep: sched.miniStep,
        projectId: sched.projectId,
        zoneId: sched.zoneId,
        fechaProgramada: sched.fechaProgramada,
        horaProgramada: sched.horaProgramada,
        responsableId: sched.responsableId,
        empleadoId: sched.empleadoId,
        markedAt: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      vencidasCount: vencidas.length,
      vencidas: vencidas.map((v: any) => ({
        id: v.id,
        sStep: v.sStep,
        miniStep: v.miniStep,
        fechaProgramada: v.fechaProgramada,
        horaProgramada: v.horaProgramada,
        projectId: v.projectId,
        zoneId: v.zoneId,
      })),
    })
  } catch (error: any) {
    console.error('Error in check-vencidas:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Error checking vencidas' },
      { status: 500 }
    )
  }
}
