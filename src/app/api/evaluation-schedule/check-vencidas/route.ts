import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/evaluation-schedule/check-vencidas
// v2.74: Detecta schedules con estado 'programada' o 'aceptada' cuya ventana
// [fechaHora, +2h] ya expiró sin haber sido completados. Para cada uno:
//   - Actualiza estado='vencida'
//   - Crea notificación al responsable y al empleado avisando que hay que reprogramar
// Devuelve el número de schedules vencidos en esta pasada.
//
// Llamado por el frontend al montar el board y cada 5 minutos (polling).
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

      // Construir mensaje
      const miniStepLabel = sched.miniStep === 4 ? 'Autoevaluación' : 'Auditoría'
      const fechaStr = `${sched.fechaProgramada.split('-').reverse().join('/')}${sched.horaProgramada ? ' a las ' + sched.horaProgramada : ''}`
      const titulo = `⏰ ${miniStepLabel} vencida: S${sched.sStep} — reprogramar`
      const mensaje = `La ventana de 2h para la ${miniStepLabel.toLowerCase()} de S${sched.sStep} programada para el ${fechaStr} ha expirado sin completarse. Por favor, programa una nueva fecha.`

      // Notificar al responsable
      if (sched.responsableId) {
        try {
          await db.notification.create({
            data: {
              userId: sched.responsableId,
              type: 'evaluation_expired',
              title: titulo,
              message: mensaje,
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

      // Notificar al empleado
      if (sched.empleadoId) {
        try {
          await db.notification.create({
            data: {
              userId: sched.empleadoId,
              type: 'evaluation_expired',
              title: titulo,
              message: mensaje,
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
