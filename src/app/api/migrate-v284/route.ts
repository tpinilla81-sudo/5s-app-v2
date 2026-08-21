import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { getAuthUser } from '../../../lib/auth-helpers'

/**
 * POST /api/migrate-v284
 *
 * v2.84 — Backfill de `comunicadoPorId` para ActionItems legacy del
 * inventario (paso 3) usando el nuevo campo `InventoryItem.createdById`.
 *
 * PROBLEMA:
 * Los ActionItems creados antes de v2.84 desde el inventario (paso 3,
 * S1-S4) tienen `comunicadoPorId` apuntando al responsable de la zona
 * (fallback usado por migrate-v278 y por sync-actions pre-v2.84).
 * Pero el "Detectado por" del Plan de Acción debería mostrar al EMPLEADO
 * que registró el item en el inventario, no al responsable de la zona.
 *
 * SOLUCIÓN:
 * Para cada ActionItem con source='inventario' y sourceId no nulo:
 *   1. Buscar el InventoryItem original (por sourceId).
 *   2. Si tiene `createdById` no nulo → setear comunicadoPorId = createdById.
 *   3. Si createdById es null → dejarlo como está (mantén fallback a
 *      responsable de zona).
 *
 * Para ActionItems de source='autoevaluacion' o 'auditoria' que NO
 * tengan comunicadoPorId pero sí tengan `auditor` (texto), intentar
 * match por nombre en User (igual que migrate-v278 pero cubre los
 * items que se crearon después de v2.78 sin sesión).
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
      inventario_backfilled: 0,
      inventario_no_createdBy: 0,
      auditoria_backfilled: 0,
      total: 0,
    }

    // ── 1. Backfill ActionItems de inventario desde InventoryItem.createdById ──
    const invActions = await db.actionItem.findMany({
      where: {
        source: 'inventario',
        sourceId: { not: null },
      },
      select: {
        id: true,
        comunicadoPorId: true,
        sourceId: true,
        zoneId: true,
      },
    })
    stats.total = invActions.length

    for (const action of invActions) {
      if (!action.sourceId) continue

      // Buscar el InventoryItem original
      const invItem = await db.inventoryItem.findUnique({
        where: { id: action.sourceId },
        select: { createdById: true },
      })

      if (!invItem) {
        // InventoryItem ya no existe — no podemos inferir nada
        stats.inventario_no_createdBy++
        continue
      }

      if (!invItem.createdById) {
        // No tenemos createdById para este item (legacy anterior a v2.84)
        stats.inventario_no_createdBy++
        continue
      }

      // Solo actualizar si el comunicadoPorId actual difiere
      if (action.comunicadoPorId !== invItem.createdById) {
        await db.actionItem.update({
          where: { id: action.id },
          data: { comunicadoPorId: invItem.createdById },
        })
        stats.inventario_backfilled++
      }
    }

    // ── 2. Backfill ActionItems de auditoría/autoeval sin comunicadoPorId ──
    // (cubrir los que se crearon entre v2.78 y v2.84 sin pasar por la sesión)
    const auditActions = await db.actionItem.findMany({
      where: {
        comunicadoPorId: null,
        source: { in: ['auditoria', 'autoevaluacion'] },
        NOT: { auditor: null },
      },
      select: { id: true, auditor: true },
    })

    for (const action of auditActions) {
      const auditorText = (action.auditor || '').trim()
      if (!auditorText) continue

      const matchedUser = await db.user.findFirst({
        where: { name: { equals: auditorText, mode: 'insensitive' } },
        select: { id: true },
      })

      if (matchedUser) {
        await db.actionItem.update({
          where: { id: action.id },
          data: { comunicadoPorId: matchedUser.id },
        })
        stats.auditoria_backfilled++
      }
    }

    // ── 3. Reporte final ──
    const finalCounts = await db.actionItem.groupBy({
      by: ['source'],
      _count: {
        comunicadoPorId: true,
        id: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Migración v2.84 completada',
      stats,
      finalCounts,
    })
  } catch (error) {
    console.error('[migrate-v284] Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    )
  }
}
