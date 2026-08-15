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
        },
        include: {
          zone: { select: { id: true, name: true, color: true } },
          project: { select: { id: true, name: true } },
        },
      })
    }

    // v2.68: notificar al empleado (y al responsable si lo programa el empleado)
    if (notifyUser) {
      const miniStepLabel = miniStep === 4 ? 'Autoevaluación' : miniStep === 5 ? 'Auditoría' : `Paso ${miniStep}`
      const fechaStr = fechaProgramada
        ? `${fechaProgramada.split('-').reverse().join('/')}${horaProgramada ? ' a las ' + horaProgramada : ''}`
        : 'fecha por confirmar'

      // Notificar al empleado si lo programa el responsable
      if (empleadoId && createdBy && empleadoId !== createdBy) {
        try {
          await db.notification.create({
            data: {
              userId: empleadoId,
              type: 'evaluation_scheduled',
              title: `${miniStepLabel} programada: S${sStep} — ${fechaStr}`,
              message: notifyMessage || `Tu ${miniStepLabel.toLowerCase()} para S${sStep} ha sido programada para el ${fechaStr}. Zona: ${schedule.zone?.name || 'sin zona'}.`,
              sStep,
              zoneId: zoneId || null,
              projectId,
              read: false,
            },
          })
        } catch (e) {
          console.error('Error notifying empleado:', e)
        }
      }

      // Notificar al responsable si lo programa el empleado (caso: empleado solicita)
      if (responsableId && createdBy && responsableId !== createdBy) {
        try {
          await db.notification.create({
            data: {
              userId: responsableId,
              type: 'evaluation_scheduled',
              title: `${miniStepLabel} programada: S${sStep} — ${fechaStr}`,
              message: notifyMessage || `El empleado ha propuesto ${fechaStr} para la ${miniStepLabel.toLowerCase()} de S${sStep}. Zona: ${schedule.zone?.name || 'sin zona'}.`,
              sStep,
              zoneId: zoneId || null,
              projectId,
              read: false,
            },
          })
        } catch (e) {
          console.error('Error notifying responsable:', e)
        }
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

    // v2.74: notificar al responsable cuando el empleado acepta
    if (estado === 'aceptada' && before.responsableId) {
      const miniStepLabel = before.miniStep === 4 ? 'Autoevaluación' : 'Auditoría'
      const fechaStr = before.fechaProgramada
        ? `${before.fechaProgramada.split('-').reverse().join('/')}${before.horaProgramada ? ' a las ' + before.horaProgramada : ''}`
        : 'fecha por confirmar'
      try {
        await db.notification.create({
          data: {
            userId: before.responsableId,
            type: 'evaluation_accepted',
            title: `✓ ${miniStepLabel} aceptada: S${before.sStep} — ${fechaStr}`,
            message: `El empleado ha aceptado la cita de ${miniStepLabel.toLowerCase()} para S${before.sStep} programada para el ${fechaStr}. La ventana se abrirá automáticamente a la hora programada.`,
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

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Error updating evaluation schedule:', error)
    return NextResponse.json({ success: false, error: 'Error updating evaluation schedule' }, { status: 500 })
  }
}
