import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { classifyImpacto } from '../../../../lib/action-item-helpers'

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
        // v2.84: incluir el createdBy para setear comunicadoPorId = empleado
        // que registró el item (en lugar del responsable de zona).
        createdBy: { select: { id: true, name: true } },
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
    // v2.94: contador de ActionItems actualizados (no creados nuevos)
    let updated = 0
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

        // Obtener el responsable de la zona si existe
        let responsableName: string | null = null
        let responsableId: string | null = item.zone?.responsableId || null
        if (responsableId) {
          const responsable = await db.user.findUnique({
            where: { id: responsableId },
            select: { name: true },
          })
          if (responsable) {
            responsableName = responsable.name
          }
        }

        // v2.84: "Detectado por" = empleado que registró el item en el
        // inventario (Paso 3). Si por legacy no tenemos el createdById
        // (items anteriores a v2.84), hacemos fallback al responsable
        // de la zona, que era el comportamiento anterior.
        const empleadoId = item.createdBy?.id || responsableId
        const empleadoName = item.createdBy?.name || responsableName

        const zoneName = item.zone?.name || item.zonaOrigen || 'Sin zona'
        const itemDescription = `${item.name} (${item.quantity} und.)`
        // v2.72: hallazgo más limpio — antes era un texto mezclado con todo.
        // Ahora solo lleva el resumen; los detalles van en `extra`.
        const hallazgo = `Innecesario S${item.sStep}: ${item.name}` +
          (item.category ? ` (${item.category})` : '') +
          (item.location ? ` — ${item.location}` : '')
        const accionCorrectiva = decision === 'Retirar'
          ? `Retirar a Jaula de cuarentena${extra.diasCuarentena ? ` (${extra.diasCuarentena} días)` : ''}`
          : 'Eliminar y enviar a Residuo'

        // v2.85: Acción Preventiva automática para items del inventario.
        // Los items del inventario (S1 innecesarios o S2 necesarios que
        // pasan a Retirar/Eliminar) NO llevan acción preventiva — el
        // sistema la setea automáticamente a "N/A" para que el usuario
        // no tenga que elegirla manualmente.
        const accionesPreventivasAuto = 'N/A'

        // v2.88: Etiqueta automática según S-step del inventario.
        //   S1 (innecesarios): refleja la columna "Etiquetas" del inventario:
        //     - Si extra.etiquetaGenerada=true → "Impresa"
        //     - Si decisión=Retirar pero no generada → "Pendiente"
        //     - Si decisión=Eliminar → "—" (no aplica)
        //     - Sin decisión → "—"
        //   S2-S5: "No aplica" (los necesarios no se etiquetan para impresión)
        const etiquetaSnapshot = item.sStep === 1
          ? (extra.decision === 'Eliminar'
              ? '—'
              : extra.etiquetaGenerada
                ? 'Impresa'
                : extra.decision === 'Retirar'
                  ? 'Pendiente'
                  : '—')
          : 'No aplica'

        // v2.72: Snapshot completo del inventario para el grupo
        // "ORIGEN (INVENTARIO)" en el Plan de Acción. Reproduce las
        // columnas del InventarioModal S1 (y compatibilidad S2-S5).
        const photoUrls: string[] = []
        if (item.photoUrls) {
          try {
            const parsed = JSON.parse(item.photoUrls)
            if (Array.isArray(parsed)) {
              for (const p of parsed) {
                if (typeof p === 'string') photoUrls.push(p)
                else if (p?.url) photoUrls.push(p.url)
              }
            }
          } catch { /* ignore */ }
        } else if (item.photoUrl) {
          photoUrls.push(item.photoUrl)
        }

        const extraSnapshot = JSON.stringify({
          inventoryItemId: item.id,
          elemento: item.name,
          ubicacion: item.location || '',
          categoria: item.category || '',
          cantidad: item.quantity || 1,
          precio: item.price ?? null,
          estado: extra.estado || '',
          frecuenciaUso: extra.frecuenciaUso || '',
          decision: decision,
          diasCuarentena: extra.diasCuarentena || null,
          // v2.85: etiqueta auto según S-step (S1 = etiqueta del inventario,
          // S2-S5 = "No aplica" porque los necesarios no se etiquetan para
          // impresión).
          etiquetas: etiquetaSnapshot,
          // v2.88: incluir etiquetaGenerada para que el Plan de Acción pueda
          // mostrar "Impresa" en lugar de "Pendiente" si ya se generó.
          etiquetaGenerada: !!extra.etiquetaGenerada,
          etiquetaFecha: extra.etiquetaFecha || null,
          zonaOrigen: item.zonaOrigen || zoneName,
          zonaDestino: item.zonaDestino || '',
          photoUrls,
          sStep: item.sStep,
          capturedAt: new Date().toISOString(),
        })

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

        // v2.94: Si ya existe el ActionItem, ACTUALIZARLO con los datos
        // actuales del inventario en lugar de saltarlo. Antes se hacía
        // `continue` silencioso y el snapshot se quedaba con los valores
        // antiguos de la decisión — eso producía filas inconsistentes en
        // el Plan de Acción: "Correctiva=Retirar a Jaula" pero
        // "Destino=Residuo" (porque extra.zonaDestino no se había refrescado).
        // Ahora se recalculan: accionCorrectiva, impactoObjetivo, fechaLimite,
        // prioridad, extra (snapshot completo) y personaDemandadaId.
        if (existing) {
          try {
            await db.actionItem.update({
              where: { id: existing.id },
              data: {
                accionCorrectiva,
                impactoObjetivo: classifyImpacto({
                  categoria: item.category || '',
                  decision,
                }) || (decision === 'Retirar'
                  ? 'RIESGOS DE ACCIDENTES'
                  : 'MEJORA TIEMPOS'),
                fechaLimite,
                prioridad,
                extra: extraSnapshot,
                personaDemandadaId: responsableId,
              },
            })
            updated++
          } catch (updErr) {
            console.error(`[sync-actions] Error updating existing ActionItem ${existing.id}:`, updErr)
            errors.push(`Item ${item.name}: error actualizando ActionItem — ${updErr instanceof Error ? updErr.message : 'unknown'}`)
          }
          skipped++
          continue
        }

        const newAction = await db.actionItem.create({
          data: {
            sStep: item.sStep, // v2.69: usar el sStep del item (antes hardcoded a 1)
            miniStep: 3,
            itemId: itemIdRef,
            itemDescription,
            hallazgo,
            mejora: null,
            prioridad,
            estado: 'abierta',
            fechaCompromiso: null,
            fechaLimite,
            fechaReal: null,
            source: 'inventario',
            auditor: null,
            zoneId: item.zoneId || null,
            projectId,
            numeroEntrada: nextNumero++,
            fechaEntrada: new Date(),
            semana: `W${getWeekNumber(new Date())}`,
            seccionDemandante: zoneName,
            clienteZona: zoneName,
            seccionDemandada: null,
            // v2.82: impacto auto-clasificado (CALIDAD / MEJORA TIEMPOS /
            // RIESGOS DE ACCIDENTES) según la categoría del inventario y
            // la decisión tomada. Sustituye al texto libre anterior.
            impactoObjetivo: classifyImpacto({
              categoria: item.category || '',
              decision,
            }) || (decision === 'Retirar'
              ? 'RIESGOS DE ACCIDENTES'
              : 'MEJORA TIEMPOS'),
            enviado: 'Sí',
            accionCorrectiva,
            // v2.85: Acción Preventiva automática = "N/A" para items del
            // inventario (S1/S2). El usuario no la elige manualmente.
            accionesPreventivas: accionesPreventivasAuto,
            semanaPrevista: `W${getWeekNumber(fechaLimite || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))}`,
            porcentaje: 0,
            semanaReal: null,
            extra: extraSnapshot, // v2.72: snapshot del inventario
            // v2.76: unificación de tablas — marcar el tipo y status para
            // que el Plan de Acción pueda filtrar/agrupar por origen.
            tipo: 'inventario',
            status: 'nok',
            // v2.78/v2.84: FKs en lugar de texto legacy.
            // comunicadoPorId = empleado que registró el item en el
            //   inventario (Paso 3 = Inventario). Fallback al
            //   responsable de la zona si no hay createdBy (legacy).
            // personaDemandadaId = responsable de zona (a quien se demanda
            //   la acción de retirar/eliminar el item de la jaula).
            // sourceId = id del InventoryItem (para trazabilidad inversa y
            //   para que la deduplicación del POST /api/actions funcione).
            comunicadoPorId: empleadoId,
            personaDemandadaId: responsableId,
            sourceId: item.id,
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
      updated,
      skipped,
      errors,
      message: `Sincronización completada: ${created} acción(es) creada(s), ${updated} actualizada(s), ${skipped} ya existían.`,
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
