import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/auth-helpers'

/**
 * POST /api/migrate-v288
 *
 * v2.88 — Backfill de etiqueta real del inventario para ActionItems existentes.
 *
 * PROBLEMA:
 * Los ActionItems creados antes de v2.88 desde el inventario (paso 3, S1)
 * tienen:
 *   - extra.etiquetas = 'No aplica' (texto legacy)
 *   - extra.etiquetaGenerada = ausente
 *   - extra.decision = 'Retirar' o 'Eliminar'
 *
 * Como resultado, el Plan de Acción muestra siempre "No aplica" en la columna
 * Etiqueta, aunque la etiqueta SÍ esté impresa en el inventario.
 *
 * SOLUCIÓN:
 * Para cada ActionItem con source='inventario' y sStep=1:
 *   1. Leer el InventoryItem original (via sourceId o extra.inventoryItemId).
 *   2. Recuperar extra.etiquetaGenerada del inventario.
 *   3. Reconstruir extra.etiquetas según el estado real:
 *        - decision=Eliminar → '—'
 *        - etiquetaGenerada=true → 'Impresa'
 *        - decision=Retirar sin generar → 'Pendiente'
 *   4. Añadir extra.etiquetaGenerada y extra.etiquetaFecha al snapshot.
 *
 * Idempotente: se puede ejecutar múltiples veces.
 *
 * Requiere permisos de admin/gestor/gerente.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user || !['admin', 'gestor', 'gerente'].includes(user.role)) {
      return NextResponse.json(
        { success: false, error: 'No autorizado. Se requiere rol admin/gestor/gerente.' },
        { status: 403 }
      )
    }

    const stats = {
      total: 0,
      backfilled: 0,
      skipped_no_inventory_item: 0,
      skipped_s2_s5: 0,
      errors: 0,
    }

    // ── 1. Buscar todos los ActionItems del inventario S1 ──
    const invActions = await db.actionItem.findMany({
      where: {
        source: 'inventario',
        sStep: 1,
        extra: { not: null },
      },
      select: { id: true, extra: true, sourceId: true },
    })
    stats.total = invActions.length

    for (const action of invActions) {
      if (!action.extra) continue

      try {
        const extra = JSON.parse(action.extra)
        // Buscar el InventoryItem original — usar sourceId o extra.inventoryItemId.
        // El extra.inventoryItemId puede tener el prefijo 'inv_' (es el itemId del
        // ActionItem, no el id real del InventoryItem). Hacemos strip del prefijo.
        let inventoryItemId = action.sourceId || extra?.inventoryItemId || ''
        if (inventoryItemId.startsWith('inv_')) {
          inventoryItemId = inventoryItemId.substring(4)
        }
        if (!inventoryItemId) {
          stats.skipped_no_inventory_item++
          continue
        }

        const invItem = await db.inventoryItem.findUnique({
          where: { id: inventoryItemId },
          select: { extra: true, zonaDestino: true },
        })
        if (!invItem) {
          stats.skipped_no_inventory_item++
          continue
        }

        const invExtra = invItem.extra ? JSON.parse(invItem.extra) : {}
        const decision = extra.decision || invExtra.decision || ''
        const etiquetaGenerada = !!invExtra.etiquetaGenerada

        // Reconstruir etiquetaSnapshot según el estado real del inventario
        const etiquetaSnapshot =
          decision === 'Eliminar' ? '—'
          : etiquetaGenerada ? 'Impresa'
          : decision === 'Retirar' ? 'Pendiente'
          : '—'

        // Actualizar snapshot
        const newExtra = {
          ...extra,
          etiquetas: etiquetaSnapshot,
          etiquetaGenerada,
          etiquetaFecha: invExtra.etiquetaFecha || null,
          decision,
          zonaDestino: invItem.zonaDestino || extra.zonaDestino || '',
        }

        await db.actionItem.update({
          where: { id: action.id },
          data: { extra: JSON.stringify(newExtra) },
        })
        stats.backfilled++
      } catch (e) {
        console.error(`[migrate-v288] Error en ActionItem ${action.id}:`, e)
        stats.errors++
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Migración v2.88 completada',
      stats,
    })
  } catch (error) {
    console.error('[migrate-v288] Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    )
  }
}
