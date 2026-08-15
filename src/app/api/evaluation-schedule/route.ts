import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/evaluation-schedule?sStep=1&miniStep=4&projectId=xxx&zoneId=yyy
// Returns the scheduled date/time for an evaluation step
// OR /api/evaluation-schedule?userId=xxx&projectId=yyy  → list all schedules for a user (responsable OR empleado)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sStep = searchParams.get('sStep')
    const miniStep = searchParams.get('miniStep')
    const projectId = searchParams.get('projectId')
    const zoneId = searchParams.get('zoneId')
    const userId = searchParams.get('userId')

    // v2.68: list mode — return all schedules where user is responsable OR empleado
    if (userId && projectId) {
      const schedules = await db.evaluationSchedule.findMany({
        where: {
          projectId,
          OR: [
            { responsableId: userId },
            { empleadoId: userId },
          ],
          estado: { notIn: ['cancelada'] },
        },
        include: {
          zone: { select: { id: true, name: true, color: true } },
          project: { select: { id: true, name: true } },
        },
        orderBy: { fechaProgramada: 'asc' },
      })
      return NextResponse.json({ success: true, data: schedules })
    }

    if (!sStep || !miniStep || !projectId) {
      return NextResponse.json({ success: false, error: 'sStep, miniStep, and projectId are required' }, { status: 400 })
    }

    const where: any = {
      sStep: parseInt(sStep),
      miniStep: parseInt(miniStep),
      projectId,
    }
    if (zoneId) where.zoneId = zoneId
    else where.zoneId = null

    const schedule = await db.evaluationSchedule.findFirst({ where })

    return NextResponse.json({ success: true, data: schedule })
  } catch (error) {
    console.error('Error fetching evaluation schedule:', error)
    return NextResponse.json({ success: false, error: 'Error fetching evaluation schedule' }, { status: 500 })
  }
}

// POST /api/evaluation-schedule — Create or update a scheduled date/time
// v2.68: ahora también notifica al empleado y guarda responsableId/empleadoId/createdBy/estado
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      sStep, miniStep, projectId, zoneId,
      fechaProgramada, horaProgramada,
      responsableId, empleadoId, createdBy,
      notas, estado,
      notifyUser = true, // si true, envía notificación al empleado
      notifyMessage,
      rolEjecutor, // v2.75: 'responsable' | 'auditor'
    } = body

    if (!sStep || !miniStep || !projectId) {
      return NextResponse.json({ success: false, error: 'sStep, miniStep, and projectId are required' }, { status: 400 })
    }

    // v2.71: Reemplazamos el upsert (que fallaba con zoneId=null por la
    // clave única compuesta) por findFirst + create/update. Esto evita el
    // error "Argument where needs sStep_miniStep_projectId_zoneId" cuando
    // zoneId es null.
    const existingSchedule = await db.evaluationSchedule.findFirst({
      where: {
        sStep,
        miniStep,
        projectId,
        zoneId: zoneId || null,
      },
    })

    let schedule: any
    if (existingSchedule) {
      schedule = await db.evaluationSchedule.update({
        where: { id: existingSchedule.id },
        data: {
          fechaProgramada: fechaProgramada || null,
          horaProgramada: horaProgramada || null,
          responsableId: responsableId || null,
          empleadoId: empleadoId || null,
          createdBy: createdBy || null,
          notas: notas || null,
          estado: estado || 'programada',
          ...(rolEjecutor ? { rolEjecutor } : {}),
        },
        include: {
          zone: { select: { id: true, name: true, color: true } },
          project: { select: { id: true, name: true } },
        },
      })
    } else {
      schedule = await db.evaluationSchedule.create({
        data: {
          sStep,
          miniStep,
          projectId,
          zoneId: zoneId || null,
          fechaProgramada: fechaProgramada || null,
          horaProgramada: horaProgramada || null,
          responsableId: responsableId || null,
          empleadoId: empleadoId || null,
          createdBy: createdBy || null,
          notas: notas || null,
          estado: estado || 'programada',
          rolEjecutor: rolEjecutor || (miniStep === 5 ? 'auditor' : 'responsable'),
        },
        include: {
          zone: { select: { id: true, name: true, color: true } },
          project: { select: { id: true, name: true } },
        },
      })
    }

    // v2.68/v2.75: notificar al asistente (empleadoId en autoeval,
    // responsable de zona en auditoría) para que sepa que tiene cita.
    // La notif al ejecutor NO se envía porque él mismo la programa.
    if (notifyUser) {
      const miniStepLabel = miniStep === 4 ? 'Autoevaluación' : miniStep === 5 ? 'Auditoría' : `Paso ${miniStep}`
      const fechaStr = fechaProgramada
        ? `${fechaProgramada.split('-').reverse().join('/')}${horaProgramada ? ' a las ' + horaProgramada : ''}`
        : 'fecha por confirmar'
      const zoneName = schedule.zone?.name || 'sin zona'

      // v2.75/v2.76: en el modelo de datos, responsableId SIEMPRE es el
      // ejecutor (quien programa) y empleadoId SIEMPRE es el asistente
      // (quien recibe la notif de cita). Lo que cambia según rolEjecutor
      // es el SIGNIFICADO semántico de cada campo:
      //
      //   • miniStep=4 (autoeval):  ejecutor = responsable de zona
      //                             asistente = empleado de la zona
      //   • miniStep=5 (auditoría): ejecutor = auditor
      //                             asistente = responsable de zona
      //
      // El frontend (AutoevaluacionModal / AuditoriaModal) mapea los IDs
      // correctos a cada campo antes de enviarlos. Aquí solo decidimos a
      // quién notificar: al asistente, siempre que no coincida con el
      // ejecutor (caso de auto-auditoría sin delegar).
      const ejecutorId = responsableId || null
      const asistenteId = empleadoId || null
      const notifyTargetId = asistenteId && asistenteId !== ejecutorId ? asistenteId : null

      if (notifyTargetId) {
        const rolEjecutorLabel = rolEjecutor === 'auditor' ? 'El auditor' : 'El responsable'
        try {
          await db.notification.create({
            data: {
              userId: notifyTargetId,
              type: 'evaluation_scheduled',
              title: `${miniStepLabel} programada: S${sStep} — ${fechaStr}`,
              message: notifyMessage || `${rolEjecutorLabel} ha programado tu ${miniStepLabel.toLowerCase()} para S${sStep} el ${fechaStr}. Zona: ${zoneName}. Tienes una ventana de 2 horas desde la hora programada. Entra a la app en ese momento para participar.`,
              sStep,
              zoneId: zoneId || null,
              projectId,
              read: false,
              metadata: JSON.stringify({
                scheduleId: schedule.id,
                miniStep,
                sStep,
                fecha: fechaProgramada,
                hora: horaProgramada,
                ejecutorId,
                asistenteId: notifyTargetId,
                rolEjecutor: rolEjecutor || (miniStep === 5 ? 'auditor' : 'responsable'),
                zoneName,
              }),
            },
          })
          console.log(`[evaluation-schedule] Notif enviada a ${notifyTargetId} (${miniStepLabel} S${sStep} ${fechaStr})`)
        } catch (e) {
          console.error('Error notifying asistente:', e)
        }
      } else {
        console.warn(`[evaluation-schedule] No se envió notif: asistenteId=${asistenteId} ejecutorId=${ejecutorId}`)
      }
    }

    return NextResponse.json({ success: true, data: schedule })
  } catch (error: any) {
    console.error('Error saving evaluation schedule:', error)
    // v2.71: devolver el mensaje real del error para que el frontend pueda mostrarlo
    const errorMsg = error?.message || 'Error saving evaluation schedule'
    return NextResponse.json(
      { success: false, error: errorMsg, code: error?.code || 'UNKNOWN' },
      { status: 500 }
    )
  }
}

// PATCH /api/evaluation-schedule — Update estado (realizada, cancelada, reprogramada, aceptada, vencida)
// v2.74: cuando estado='aceptada', notifica al responsable que el empleado aceptó la cita.
// v2.75: cuando estado='reprogramada', notifica al ejecutor (responsableId) con type='evaluation_rejected'.
//        El ejecutor es: responsable (autoeval, miniStep=4) | auditor (auditoría, miniStep=5).
//        El asistente (empleadoId) es quien rechaza.
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, estado, notas } = body

    if (!id || !estado) {
      return NextResponse.json({ success: false, error: 'id and estado are required' }, { status: 400 })
    }

    // Traer el schedule antes de actualizar para tener responsableId/empleadoId/etc.
    const before = await db.evaluationSchedule.findUnique({ where: { id } })
    if (!before) {
      return NextResponse.json({ success: false, error: 'Schedule not found' }, { status: 404 })
    }

    const updated = await db.evaluationSchedule.update({
      where: { id },
      data: {
        estado,
        ...(notas !== undefined ? { notas } : {}),
      },
    })

    const miniStepLabel = before.miniStep === 4 ? 'Autoevaluación' : 'Auditoría'
    const fechaStr = before.fechaProgramada
      ? `${before.fechaProgramada.split('-').reverse().join('/')}${before.horaProgramada ? ' a las ' + before.horaProgramada : ''}`
      : 'fecha por confirmar'

    // v2.74: notificar al ejecutor (responsableId) cuando el asistente (empleadoId) acepta
    if (estado === 'aceptada' && before.responsableId) {
      try {
        await db.notification.create({
          data: {
            userId: before.responsableId,
            type: 'evaluation_accepted',
            title: `✓ ${miniStepLabel} aceptada: S${before.sStep} — ${fechaStr}`,
            message: `El asistente ha aceptado la cita de ${miniStepLabel.toLowerCase()} para S${before.sStep} programada para el ${fechaStr}. La ventana se abrirá automáticamente a la hora programada.`,
            metadata: JSON.stringify({
              scheduleId: id,
              miniStep: before.miniStep,
              sStep: before.sStep,
              fecha: before.fechaProgramada,
              hora: before.horaProgramada,
            }),
            sStep: before.sStep,
            zoneId: before.zoneId || null,
            projectId: before.projectId,
            read: false,
          },
        })
      } catch (e) {
        console.error('Error notifying responsable of acceptance:', e)
      }
    }

    // v2.75: notificar al ejecutor cuando el asistente rechaza (reprogramada)
    if (estado === 'reprogramada' && before.responsableId) {
      try {
        await db.notification.create({
          data: {
            userId: before.responsableId,
            type: 'evaluation_rejected',
            title: `✗ ${miniStepLabel} rechazada: S${before.sStep} — reprogramar`,
            message: `El asistente no puede asistir a la cita de ${miniStepLabel.toLowerCase()} para S${before.sStep} programada para el ${fechaStr}.${notas ? ` Motivo: ${notas}` : ''} Por favor, propone una nueva fecha.`,
            metadata: JSON.stringify({
              scheduleId: id,
              miniStep: before.miniStep,
              sStep: before.sStep,
              fecha: before.fechaProgramada,
              hora: before.horaProgramada,
              motivo: notas || null,
            }),
            sStep: before.sStep,
            zoneId: before.zoneId || null,
            projectId: before.projectId,
            read: false,
          },
        })
      } catch (e) {
        console.error('Error notifying responsable of rejection:', e)
      }
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Error updating evaluation schedule:', error)
    return NextResponse.json({ success: false, error: 'Error updating evaluation schedule' }, { status: 500 })
  }
}
