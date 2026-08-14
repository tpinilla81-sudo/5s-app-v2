import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * POST /api/inventory/sync-actions
 *
 * v2.60: Sincroniza los items del inventario S1 con decisión (Retirar/Eliminar)
 * hacia el Plan de Acción (ActionItem) y el Diario del Responsable.
 *
 * Para cada item S1 con decision='Retirar' o 'Eliminar':
 * 1. Verifica si ya existe un ActionItem con itemId=`inv_${inventoryItemId}`.
 * 2. Si no existe, lo crea con:
 *    - hallazgo: descripción del elemento + ubicación
 *    - accionCorrectiva: "Retirar a Jaula" o "Eliminar a Residuo"
 *    - clienteZona: zonaOrigen del item
 *    - personaDemandada: responsable de la zona (si existe)
 *    - source: 'inventario'
 *    - estado: 'abierta'
 *    - prioridad: 'media'
 *
 * Body: { projectId: string, zoneId?: string }
 * Returns: { success: boolean, created: number, skipped: number, errors: string[] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, zoneId } = body

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'projectId es requerido' },
        { status: 400 }
      )
    }

    // 1. Buscar todos los items con decisión (Retirar o Eliminar) en este proyecto/zona
    // v2.69: ya no limitamos a sStep=1 — cualquier S-step puede tener inventario con decisiones
    const where: any = {
      projectId,
    }
    if (zoneId) where.zoneId = zoneId

    const inventoryItems = await db.inventoryItem.findMany({
      where,
      include: {
        zone: { select: { id: true, name: true, responsableId: true } },
        photos: true,
      },
    })

    // Filtrar solo los que tienen decision='Retirar' o 'Eliminar'
    const itemsWithDecision = inventoryItems.filter(item => {
      if (!item.extra) return false
      try {
        const extra = JSON.parse(item.extra)
        const dec = extra?.decision
        return dec === 'Retirar' || dec === 'Eliminar' || dec === 'Jaula' || dec === 'Tirar'
      } catch {
        return false
      }
    })

    if (itemsWithDecision.length === 0) {
      return NextResponse.json({
        success: true,
        created: 0,
        skipped: 0,
        errors: [],
        message: 'No hay items con decisión Retirar/Eliminar para sincronizar.',
      })
    }

    // 2. Para cada item, verificar si ya existe un ActionItem y crearlo si no
    let created = 0
    let skipped = 0
    const errors: string[] = []

    // Obtener el último numeroEntrada para este proyecto
    const lastAction = await db.actionItem.findFirst({
      where: { projectId },
      orderBy: { numeroEntrada: 'desc' },
    })
    let nextNumero = (lastAction?.numeroEntrada || 0) + 1

    for (const item of itemsWithDecision) {
      try {
        const extra = JSON.parse(item.extra || '{}')
        const decision = extra.decision === 'Jaula' ? 'Retirar' :
                         extra.decision === 'Tirar' ? 'Eliminar' : extra.decision
        const itemIdRef = `inv_${item.id}`

        // Verificar si ya existe un ActionItem para este item de inventario
        const existing = await db.actionItem.findFirst({
          where: {
            projectId,
            itemId: itemIdRef,
          },
        })

        if (existing) {
          skipped++
          continue
        }

        // Obtener el responsable de la zona si existe
        let responsableName: string | null = null
        if (item.zone?.responsableId) {
          const responsable = await db.user.findUnique({
            where: { id: item.zone.responsableId },
            select: { name: true },
          })
          if (responsable) {
            responsableName = responsable.name
          }
        }

        const zoneName = item.zone?.name || item.zonaOrigen || 'Sin zona'
        const itemDescription = `${item.name} (${item.quantity} und.)`
        const hallazgo = `Elemento innecesario detectado en ${zoneName}: ${itemDescription}` +
          (item.location ? ` — Ubicación: ${item.location}` : '')
        const accionCorrectiva = decision === 'Retirar'
          ? `Retirar a Jaula de cuarentena${extra.diasCuarentena ? ` (${extra.diasCuarentena} días)` : ''}`
          : 'Eliminar y enviar a Residuo'

        // Calcular fecha límite para items en jaula (fecha entrada + días cuarentena)
        let fechaLimite: Date | null = null
        if (decision === 'Retirar' && item.jaulaFechaEntrada) {
          const dias = extra.diasCuarentena || 40
          fechaLimite = new Date(
            new Date(item.jaulaFechaEntrada).getTime() + dias * 24 * 60 * 60 * 1000
          )
        }

        // Determinar prioridad basada en el estado temporal del jaula
        let prioridad = 'media'
        if (decision === 'Eliminar') {
          prioridad = 'alta'
        } else if (fechaLimite) {
          const diasRestantes = Math.ceil(
            (fechaLimite.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          )
          if (diasRestantes < 0) prioridad = 'alta'
          else if (diasRestantes <= 15) prioridad = 'alta'
          else prioridad = 'media'
        }

        const newAction = await db.actionItem.create({
          data: {
            sStep: item.sStep, // v2.69: usar el sStep del item (antes hardcoded a 1)
            miniStep: 3,
            itemId: itemIdRef,
            itemDescription,
            hallazgo,
            mejora: null,
            responsable: responsableName || undefined,
            prioridad,
            estado: 'abierta',
            fechaCompromiso: null,
            fechaLimite,
            fechaReal: null,
            source: 'inventario',
            auditor: null,
            zoneId: item.zoneId || null,
            verificadoPor: null,
            projectId,
            numeroEntrada: nextNumero++,
            fechaEntrada: new Date(),
            comunicadoPor: 'Sistema (auto desde Inventario S1)',
            semana: `W${getWeekNumber(new Date())}`,
            seccionDemandante: zoneName,
            clienteZona: zoneName,
            personaDemandada: responsableName || undefined,
            seccionDemandada: null,
            impactoObjetivo: decision === 'Retirar'
              ? 'Liberar espacio en zona de origen; cuarentena en jaula'
              : 'Eliminar residuo y liberar espacio',
            enviado: 'Sí',
            accionCorrectiva,
            accionesPreventivas: null,
            semanaPrevista: `W${getWeekNumber(fechaLimite || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))}`,
            porcentaje: 0,
            semanaReal: null,
          },
        })

        // v2.61: Crear Aviso inmediato (Notification) para el responsable
        // indicando que entra un nuevo hallazgo al Plan de Acción.
        try {
          // Notificar al responsable de la zona si existe
          if (item.zone?.responsableId) {
            await db.notification.create({
              data: {
                userId: item.zone.responsableId,
                type: 'new_action_item',
                title: `Nuevo hallazgo: ${hallazgo.slice(0, 60)}${hallazgo.length > 60 ? '…' : ''}`,
                message: `Entra al Plan de Acción un nuevo hallazgo en ${zoneName}.\n` +
                  `Acción: ${accionCorrectiva}\n` +
                  (fechaLimite ? `Vence: ${fechaLimite.toLocaleDateString('es-ES')}\n` : '') +
                  `\n[ref:${newAction.id}]`,
                sStep: 1,
                zoneId: item.zoneId || null,
                projectId,
              },
            })
          }
          // También notificar a gerentes/admins del proyecto
          const projectAdmins = await db.projectMember.findMany({
            where: {
              projectId,
              role: { in: ['gerente', 'admin'] },
            },
            select: { userId: true },
          })
          for (const admin of projectAdmins) {
            if (admin.userId === item.zone?.responsableId) continue // evitar duplicado
            await db.notification.create({
              data: {
                userId: admin.userId,
                type: 'new_action_item',
                title: `Nuevo hallazgo: ${hallazgo.slice(0, 60)}${hallazgo.length > 60 ? '…' : ''}`,
                message: `Entra al Plan de Acción un nuevo hallazgo en ${zoneName}.\n` +
                  `Acción: ${accionCorrectiva}\n` +
                  (fechaLimite ? `Vence: ${fechaLimite.toLocaleDateString('es-ES')}\n` : '') +
                  `Responsable: ${responsableName || '—'}\n` +
                  `\n[ref:${newAction.id}]`,
                sStep: 1,
                zoneId: item.zoneId || null,
                projectId,
              },
            })
          }
        } catch (notifErr) {
          console.error('[sync-actions] Notification creation error:', notifErr)
          // No bloquear el flujo si falla la notificación
        }
        created++
      } catch (itemErr: any) {
        console.error(`[sync-actions] Error processing item ${item.id}:`, itemErr)
        errors.push(`Item ${item.name}: ${itemErr?.message || 'Error desconocido'}`)
      }
    }

    return NextResponse.json({
      success: true,
      created,
      skipped,
      errors,
      message: `Sincronización completada: ${created} acción(es) creada(s), ${skipped} ya existían.`,
    })
  } catch (error) {
    console.error('Error syncing inventory to actions:', error)
    return NextResponse.json(
      { success: false, error: 'Error al sincronizar inventario con plan de acción' },
      { status: 500 }
    )
  }
}

// Helper: obtener número de semana ISO
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}
