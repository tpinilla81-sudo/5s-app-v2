import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/auth-helpers'

/**
 * POST /api/migrate-v278
 *
 * v2.78 — Backfill de FKs de User (comunicadoPorId, personaDemandadaId,
 * verificadoPorId) a partir de los campos legacy de texto
 * (comunicadoPor, personaDemandada, verificadoPor, responsable) usando
 * matching por nombre exacto contra la tabla User.
 *
 * Pasos:
 *  1. Para cada ActionItem con comunicadoPorId=null y comunicadoPor (texto)
 *     no vacío, buscar User por name exacto y setear comunicadoPorId.
 *  2. Igual para personaDemandadaId desde personaDemandada o responsable.
 *  3. Igual para verificadoPorId desde verificadoPor.
 *  4. Para ActionItems de source='inventario' que aún no tengan
 *     comunicadoPorId, intentar inferirlo desde el InventoryItem.original
 *     (vía extra.inventoryItemId → zone.responsableId).
 *  5. Para ActionItems de source='autoevaluacion' o 'auditoria' sin
 *     comunicadoPorId, inferirlo desde el campo `auditor` (texto) matcheando
 *     por name en User.
 *
 * Idempotente: se puede ejecutar múltiples veces sin duplicar trabajo.
 * No hace DROP de columnas legacy (eso se hará en v2.79 tras verificar
 * que todo funciona en producción).
 *
 * Requiere permisos de admin/gestor.
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
      comunicadoPorId_backfilled: 0,
      personaDemandadaId_backfilled: 0,
      verificadoPorId_backfilled: 0,
      fromInventario: 0,
      fromAuditor: 0,
      noMatch: 0,
      total: 0,
    }

    // ── 1. Backfill comunicadoPorId desde comunicadoPor (texto) ──
    const itemsNeedingComunicado = await db.actionItem.findMany({
      where: {
        comunicadoPorId: null,
        NOT: { comunicadoPor: null },
      },
      select: { id: true, comunicadoPor: true, auditor: true, source: true, extra: true },
    })
    stats.total = itemsNeedingComunicado.length

    for (const item of itemsNeedingComunicado) {
      let matchedUserId: string | null = null

      // Intentar match por comunicadoPor (texto) → User.name
      if (item.comunicadoPor) {
        const text = item.comunicadoPor.trim()
        // Excluir textos genéricos del sistema
        const GENERICOS = ['Sistema (auto desde Inventario S1)', 'Sistema', '—', '-', '']
        if (!GENERICOS.includes(text)) {
          const u = await db.user.findFirst({
            where: { name: { equals: text, mode: 'insensitive' } },
            select: { id: true },
          })
          if (u) matchedUserId = u.id
        }
      }

      // Si no match por comunicadoPor y es de auditoría, intentar por `auditor` (texto)
      if (!matchedUserId && item.auditor && (item.source === 'auditoria' || item.source === 'autoevaluacion')) {
        const auditorText = item.auditor.trim()
        if (auditorText) {
          const u = await db.user.findFirst({
            where: { name: { equals: auditorText, mode: 'insensitive' } },
            select: { id: true },
          })
          if (u) {
            matchedUserId = u.id
            stats.fromAuditor++
          }
        }
      }

      // Si todavía no hay match y es de inventario, intentar por zone.responsableId
      if (!matchedUserId && item.source === 'inventario' && item.extra) {
        try {
          const extra = JSON.parse(item.extra)
          if (extra.inventoryItemId) {
            const inv = await db.inventoryItem.findUnique({
              where: { id: extra.inventoryItemId },
              select: { zone: { select: { responsableId: true } } },
            })
            if (inv?.zone?.responsableId) {
              matchedUserId = inv.zone.responsableId
              stats.fromInventario++
            }
          }
        } catch { /* ignore parse errors */ }
      }

      if (matchedUserId) {
        await db.actionItem.update({
          where: { id: item.id },
          data: { comunicadoPorId: matchedUserId },
        })
        stats.comunicadoPorId_backfilled++
      } else {
        stats.noMatch++
      }
    }

    // ── 2. Backfill personaDemandadaId desde personaDemandada o responsable ──
    const itemsNeedingDemandada = await db.actionItem.findMany({
      where: {
        personaDemandadaId: null,
        OR: [
          { NOT: { personaDemandada: null } },
          { NOT: { responsable: null } },
        ],
      },
      select: { id: true, personaDemandada: true, responsable: true, zoneId: true, source: true, extra: true },
    })

    for (const item of itemsNeedingDemandada) {
      let matchedUserId: string | null = null

      // Intentar por personaDemandada (texto)
      const text = (item.personaDemandada || item.responsable || '').trim()
      if (text) {
        const GENERICOS = ['—', '-', '']
        if (!GENERICOS.includes(text)) {
          const u = await db.user.findFirst({
            where: { name: { equals: text, mode: 'insensitive' } },
            select: { id: true },
          })
          if (u) matchedUserId = u.id
        }
      }

      // Si no hay match por texto, intentar por zone.responsableId
      if (!matchedUserId && item.zoneId) {
        const z = await db.zone.findUnique({
          where: { id: item.zoneId },
          select: { responsableId: true },
        })
        if (z?.responsableId) matchedUserId = z.responsableId
      }

      // Si todavía no hay match y es de inventario, intentar por extra.inventoryItemId
      if (!matchedUserId && item.source === 'inventario' && item.extra) {
        try {
          const extra = JSON.parse(item.extra)
          if (extra.inventoryItemId) {
            const inv = await db.inventoryItem.findUnique({
              where: { id: extra.inventoryItemId },
              select: { zone: { select: { responsableId: true } } },
            })
            if (inv?.zone?.responsableId) matchedUserId = inv.zone.responsableId
          }
        } catch { /* ignore */ }
      }

      if (matchedUserId) {
        await db.actionItem.update({
          where: { id: item.id },
          data: { personaDemandadaId: matchedUserId },
        })
        stats.personaDemandadaId_backfilled++
      }
    }

    // ── 3. Backfill verificadoPorId desde verificadoPor (texto) ──
    const itemsNeedingVerificado = await db.actionItem.findMany({
      where: {
        verificadoPorId: null,
        NOT: { verificadoPor: null },
      },
      select: { id: true, verificadoPor: true },
    })

    for (const item of itemsNeedingVerificado) {
      const text = (item.verificadoPor || '').trim()
      if (!text) continue
      const GENERICOS = ['—', '-', '']
      if (GENERICOS.includes(text)) continue

      const u = await db.user.findFirst({
        where: { name: { equals: text, mode: 'insensitive' } },
        select: { id: true },
      })
      if (u) {
        await db.actionItem.update({
          where: { id: item.id },
          data: { verificadoPorId: u.id },
        })
        stats.verificadoPorId_backfilled++
      }
    }

    // ── 4. Reporte final ──
    const finalCounts = await db.actionItem.groupBy({
      by: ['source'],
      _count: {
        comunicadoPorId: true,
        personaDemandadaId: true,
        verificadoPorId: true,
        id: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Migración v2.78 completada',
      stats,
      finalCounts,
    })
  } catch (error) {
    console.error('[migrate-v278] Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    )
  }
}
