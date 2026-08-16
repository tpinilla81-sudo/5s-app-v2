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

    // ──────────────────────────────────────────────────────────────────
    // v2.86: VALIDACIÓN DE FECHA PASADA
    // ──────────────────────────────────────────────────────────────────
    // Si se envía fechaProgramada, comprobar que NO sea una fecha pasada.
    // Esto previene reprogramaciones accidentales con fechas antiguas (p.ej.
    // cuando el modal carga la fecha de un schedule vencido y el usuario
    // guarda sin cambiarla). El sistema NUNCA debe aceptar fechas pasadas.
    //
    // Excepción: allowPastDate=true solo para tests manuales.
    if (fechaProgramada && !body.allowPastDate) {
      const now = new Date()
      const todayStr = now.toISOString().slice(0, 10) // YYYY-MM-DD en UTC
      if (fechaProgramada < todayStr) {
        return NextResponse.json({
          success: false,
          error: `No se puede programar una cita en una fecha pasada (${fechaProgramada}). Selecciona una fecha de hoy en adelante.`,
          code: 'PAST_DATE_REJECTED',
        }, { status: 400 })
      }
      // Si la fecha es hoy, comprobar la hora también
      if (fechaProgramada === todayStr && horaProgramada) {
        const nowHours = String(now.getHours()).padStart(2, '0')
        const nowMinutes = String(now.getMinutes()).padStart(2, '0')
        const nowTime = `${nowHours}:${nowMinutes}`
        if (horaProgramada < nowTime) {
          return NextResponse.json({
            success: false,
            error: `No se puede programar una cita a una hora pasada (${horaProgramada}). La hora actual es ${nowTime}.`,
            code: 'PAST_TIME_REJECTED',
          }, { status: 400 })
        }
      }
    }

    // ──────────────────────────────────────────────────────────────────
    // v2.86: LOG DE AUDITORÍA — Registrar quién programa/reprograma
    // ──────────────────────────────────────────────────────────────────
    // Para detectar auto-reprogramaciones misteriosas, dejamos un rastro
    // en consola con todos los datos de quién llama al POST.
    console.log(`[evaluation-schedule POST][v2.86]`, {
      sStep, miniStep, projectId, zoneId: zoneId || null,
      fechaProgramada, horaProgramada,
      responsableId: responsableId || null,
      empleadoId: empleadoId || null,
      createdBy: createdBy || null,
      estado: estado || 'programada',
      rolEjecutor: rolEjecutor || null,
      notifyUser,
      timestamp: new Date().toISOString(),
    })

    // ──────────────────────────────────────────────────────────────────
    // v2.77: VALIDACIÓN DE HALLAZGOS PENDIENTES
    // ──────────────────────────────────────────────────────────────────
    // Antes de programar una autoeval (miniStep=4) o auditoría (miniStep=5),
    // comprobar que no haya ActionItems ABIERTOS de los pasos previos en la
    // misma zona. Si los hay, devolver 409 con el detalle para que el
    // frontend lo muestre y el responsable/auditor sepa qué falta por cerrar.
    //
    // Reglas:
    //   • miniStep=4 (autoeval):  bloquear si hay ActionItems con
    //     miniStep<=3, estado in ['abierta','en_proceso'] para este
    //     projectId+zoneId (inventario S1-S4 + plan S5 del paso 3).
    //   • miniStep=5 (auditoría): bloquear si hay ActionItems con
    //     miniStep<=4, estado in ['abierta','en_proceso'] (paso 3 + autoeval).
    //
    // Excepción: si `force=true` viene en el body, se omite la validación
    // (solo para casos excepcionales — p.ej. reprogramar una auditoría
    // cuyo hallazgo se decide posponer).
    const allowForce = body.force === true
    if (!allowForce && (miniStep === 4 || miniStep === 5)) {
      const maxMiniStepPrevio = miniStep - 1 // 3 para autoeval, 4 para auditoría
      const wherePending: any = {
        projectId,
        miniStep: { lte: maxMiniStepPrevio },
        estado: { in: ['abierta', 'en_proceso'] },
      }
      if (zoneId) wherePending.zoneId = zoneId
      else wherePending.zoneId = null

      const pendingActions = await db.actionItem.findMany({
        where: wherePending,
        select: {
          id: true,
          hallazgo: true,
          estado: true,
          miniStep: true,
          source: true,
          itemId: true,
          zoneId: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 50, // limit para no saturar la respuesta
      })

      if (pendingActions.length > 0) {
        const label = miniStep === 4 ? 'la autoevaluación' : 'la auditoría'
        const prevLabel = miniStep === 4
          ? 'el paso 3 (inventario + plan)'
          : 'los pasos 3-4 (inventario + plan + autoevaluación)'
        const mensaje = `No se puede programar ${label} porque hay ${pendingActions.length} hallazgo(s) pendiente(s) de ${prevLabel} en esta zona. Resuélvelos primero en el Plan de Acción.`
        return NextResponse.json({
          success: false,
          error: mensaje,
          code: 'PENDING_HALLAZGOS',
          pendingCount: pendingActions.length,
          pending: pendingActions.map(a => ({
            id: a.id,
            hallazgo: (a.hallazgo || '').slice(0, 100),
            estado: a.estado,
            source: a.source,
            miniStep: a.miniStep,
            itemId: a.itemId,
          })),
        }, { status: 409 })
      }
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

// DELETE /api/evaluation-schedule?id=xxx
// v2.86: Elimina una cita programada (cualquier estado). Útil cuando se
// programó mal y se quiere empezar de cero. Notifica al otro usuario
// (asistente o ejecutor, según quién borra) que la cita se ha cancelado.
// v2.87: si reprogramar=false, NO se elimina el schedule — se resetea a
// estado='solicitado' con fechaProgramada=null y horaProgramada=null.
// Así el proceso vuelve a estar "pendiente de programar" desde el inicio,
// y el aviso sigue apareciendo en el panel para que se pueda volver a
// programar. Solo si reprogramar=true se elimina completamente (para
// forzar una nueva creación limpia desde el diálogo de programación).
//
// Body opcional: { motivo?: string, reprogramar?: boolean }
//   • motivo: texto libre que se incluye en la notificación
//   • reprogramar: si true → elimina el schedule (se creará uno nuevo al programar).
//                  si false (default) → resetea a estado='solicitado' manteniendo el registro.
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'id es requerido' },
        { status: 400 }
      )
    }

    let body: any = {}
    try {
      body = await request.json()
    } catch {
      // body opcional
    }
    const motivo = body.motivo || null
    const reprogramar = body.reprogramar === true
    // v2.87: ID del usuario que borra (para no notificarse a sí mismo)
    const borradoPor = body.borradoPor || null

    // Cargar el schedule antes de borrar para tener los datos de notif
    const sched = await db.evaluationSchedule.findUnique({ where: { id } })
    if (!sched) {
      return NextResponse.json(
        { success: false, error: 'Schedule no encontrado' },
        { status: 404 }
      )
    }

    // v2.87: Si reprogramar=false → NO borrar, solo resetear a 'solicitado'.
    // El schedule sigue existiendo (mantiene su id, responsableId, empleadoId,
    // projectId, zoneId, miniStep, sStep) pero sin fecha/hora. La UI mostrará
    // el aviso como "solicitud pendiente de programar".
    if (!reprogramar) {
      await db.evaluationSchedule.update({
        where: { id },
        data: {
          estado: 'solicitado',
          fechaProgramada: null,
          horaProgramada: null,
          notas: `Cancelada sin reprogramar — vuelve a estar solicitada. ${motivo ? `Motivo: ${motivo}` : ''}`.trim(),
        },
      })
    } else {
      // Borrar el schedule completamente (se creará uno nuevo al programar)
      await db.evaluationSchedule.delete({ where: { id } })
    }

    // ──────────────────────────────────────────────────────────────────
    // v2.87: Notificaciones diferenciadas por rol
    // ──────────────────────────────────────────────────────────────────
    // El modelo de datos:
    //   • responsableId = EJECUTOR (responsable en autoeval=4, auditor en auditoría=5)
    //   • empleadoId    = ASISTENTE (empleado en autoeval, responsable de zona en auditoría)
    //
    // Cuando se borra sin reprogramar, el proceso vuelve a "solicitado".
    // El EJECUTOR (responsable/auditor) es quien tiene que volver a programar.
    // Le enviamos un aviso accionable:
    //   • miniStep=4 → type='autoeval_requested' (dispara botón "Programar fecha" en la UI)
    //   • miniStep=5 → type='audit_requested'    (dispara botón "Programar fecha" en la UI)
    //
    // Al ASISTENTE (empleadoId) le enviamos un aviso informativo de cancelación.
    //
    // Si el borrador es el propio ejecutor (caso normal: responsable/auditor
    // borra su propia cita), NO se notifica a sí mismo — solo al asistente.
    // Si el borrador es el asistente (caso raro), se notifica al ejecutor.
    const miniStepLabel = sched.miniStep === 4 ? 'Autoevaluación' : 'Auditoría'
    const fechaStr = sched.fechaProgramada
      ? `${sched.fechaProgramada.split('-').reverse().join('/')}${sched.horaProgramada ? ' a las ' + sched.horaProgramada : ''}`
      : 'fecha por confirmar'

    const ejecutorId = sched.responsableId || null
    const asistenteId = sched.empleadoId || null

    // Notificación al EJECUTOR (responsable/auditor) — solo si no es el propio borrador
    let notifiedCount = 0
    if (ejecutorId && ejecutorId !== borradoPor) {
      // v2.87: type accionable según miniStep — dispara botón "Programar fecha" en la UI
      const typeEjecutor = sched.miniStep === 4 ? 'autoeval_requested' : 'audit_requested'
      const tituloEjecutor = reprogramar
        ? `🔄 ${miniStepLabel} S${sched.sStep} cancelada — debes reprogramar`
        : `↩ ${miniStepLabel} S${sched.sStep} cancelada — debes volver a programarla`
      const mensajeEjecutor = reprogramar
        ? `La cita de ${miniStepLabel.toLowerCase()} para S${sched.sStep} programada para el ${fechaStr} ha sido cancelada por ${borradoPor ? 'el asistente' : 'el sistema'}.${motivo ? ` Motivo: ${motivo}.` : ''} DEBES programar una nueva fecha lo antes posible. Usa el botón "Programar fecha" en este aviso.`
        : `La cita de ${miniStepLabel.toLowerCase()} para S${sched.sStep} programada para el ${fechaStr} ha sido cancelada por ${borradoPor ? 'el asistente' : 'el sistema'}.${motivo ? ` Motivo: ${motivo}.` : ''} El proceso vuelve a estar SOLICITADO — pendiente de que programes una nueva fecha. Usa el botón "Programar fecha" en este aviso.`
      try {
        await db.notification.create({
          data: {
            userId: ejecutorId,
            type: typeEjecutor,
            title: tituloEjecutor,
            message: mensajeEjecutor,
            metadata: JSON.stringify({
              scheduleId: id,
              miniStep: sched.miniStep,
              sStep: sched.sStep,
              zoneId: sched.zoneId || null,
              projectId: sched.projectId,
              motivo,
              reprogramar,
              resetToSolicitado: !reprogramar,
              borradoPor,
              rolDestinatario: 'ejecutor',
            }),
            sStep: sched.sStep,
            zoneId: sched.zoneId || null,
            projectId: sched.projectId,
            read: false,
          },
        })
        notifiedCount++
      } catch (e) {
        console.error('[DELETE schedule] Error notificando al ejecutor:', ejecutorId, e)
      }
    }

    // Notificación al ASISTENTE (empleadoId) — solo si no es el propio borrador
    if (asistenteId && asistenteId !== borradoPor) {
      const tituloAsistente = reprogramar
        ? `🔄 ${miniStepLabel} S${sched.sStep} cancelada — se reprogramará`
        : `ℹ ${miniStepLabel} S${sched.sStep} cancelada — pendiente de nueva fecha`
      const mensajeAsistente = `La cita de ${miniStepLabel.toLowerCase()} para S${sched.sStep} programada para el ${fechaStr} ha sido cancelada.${motivo ? ` Motivo: ${motivo}.` : ''}${reprogramar ? ' Se programará una nueva fecha próximamente.' : ' El responsable debe programar una nueva fecha — te avisará cuando lo haga.'}`
      try {
        await db.notification.create({
          data: {
            userId: asistenteId,
            type: 'evaluation_cancelled',
            title: tituloAsistente,
            message: mensajeAsistente,
            metadata: JSON.stringify({
              scheduleId: id,
              miniStep: sched.miniStep,
              sStep: sched.sStep,
              zoneId: sched.zoneId || null,
              projectId: sched.projectId,
              motivo,
              reprogramar,
              resetToSolicitado: !reprogramar,
              borradoPor,
              rolDestinatario: 'asistente',
            }),
            sStep: sched.sStep,
            zoneId: sched.zoneId || null,
            projectId: sched.projectId,
            read: false,
          },
        })
        notifiedCount++
      } catch (e) {
        console.error('[DELETE schedule] Error notificando al asistente:', asistenteId, e)
      }
    }

    console.log(`[evaluation-schedule DELETE][v2.87] Schedule ${id} ${reprogramar ? 'eliminado' : 'reseteado a solicitado'}`, {
      sStep: sched.sStep,
      miniStep: sched.miniStep,
      projectId: sched.projectId,
      zoneId: sched.zoneId,
      motivo,
      reprogramar,
      borradoPor,
      ejecutorId,
      asistenteId,
      notifiedCount,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      deleted: reprogramar ? id : null,
      resetToSolicitado: !reprogramar,
      scheduleId: reprogramar ? null : id,
      notified: notifiedCount,
    })
  } catch (error: any) {
    console.error('Error deleting evaluation schedule:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Error deleting evaluation schedule' },
      { status: 500 }
    )
  }
}
