import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/auth-helpers'

/**
 * POST /api/migrate-v285
 *
 * v2.85 — Backfill de Acción Preventiva y Etiqueta para ActionItems
 * legacy del inventario (paso 3).
 *
 * PROBLEMA:
 * Los ActionItems creados antes de v2.85 desde el inventario (paso 3,
 * S1-S5) tienen:
 *   - accionesPreventivas = null  (debería ser 'N/A' automático)
 *   - extra.etiquetas = '' o null  (para S2-S5 debería ser 'No aplica')
 *
 * SOLUCIÓN:
 * 1. Para cada ActionItem con source='inventario':
 *    - Si accionesPreventivas es null → setear a 'N/A' (auto).
 *    - Si extra.etiquetas está vacío y sStep !== 1 → setear a 'No aplica'.
 *    - Si extra.etiquetas está vacío y sStep === 1 → setear a 'No aplica'.
 *
 * Idempotente: se puede ejecutar múltiples veces sin duplicar trabajo.
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
      preventiva_backfilled: 0,
      etiqueta_backfilled: 0,
      total: 0,
    }

    // ── 1. Backfill accionesPreventivas = 'N/A' para items del inventario ──
    const invActions = await db.actionItem.findMany({
      where: {
        source: 'inventario',
        OR: [
          { accionesPreventivas: null },
          { accionesPreventivas: '' },
        ],
      },
      select: { id: true },
    })
    stats.total = invActions.length

    for (const action of invActions) {
      await db.actionItem.update({
        where: { id: action.id },
        data: { accionesPreventivas: 'N/A' },
      })
      stats.preventiva_backfilled++
    }

    // ── 2. Backfill extra.etiquetas = 'No aplica' para items del inventario ──
    const invActionsWithExtra = await db.actionItem.findMany({
      where: {
        source: 'inventario',
        extra: { not: null },
      },
      select: { id: true, extra: true, sStep: true },
    })

    for (const action of invActionsWithExtra) {
      if (!action.extra) continue

      try {
        const extra = JSON.parse(action.extra)
        const etiquetaActual = extra?.etiquetas || ''

        // Si la etiqueta está vacía, setear a 'No aplica' (auto)
        if (!etiquetaActual || !etiquetaActual.trim()) {
          extra.etiquetas = 'No aplica'
          await db.actionItem.update({
            where: { id: action.id },
            data: { extra: JSON.stringify(extra) },
          })
          stats.etiqueta_backfilled++
        }
      } catch {
        // extra no es JSON válido — skip
      }
    }

    // ── 3. Reporte final ──
    const finalCounts = await db.actionItem.groupBy({
      by: ['source'],
      _count: {
        accionesPreventivas: true,
        id: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Migración v2.85 completada',
      stats,
      finalCounts,
    })
  } catch (error) {
    console.error('[migrate-v285] Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    )
  }
}
