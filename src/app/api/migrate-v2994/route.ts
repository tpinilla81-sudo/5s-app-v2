import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/auth-helpers'

/**
 * POST /api/migrate-v2994
 *
 * v2.99.4 — Backfill de `comunicadoPorId` para ActionItems legacy cuyo
 * `comunicadoPor` (texto) era un placeholder genérico del sistema
 * ('Sistema (auto desde Inventario S1)', 'Sistema', '—', '-', '').
 *
 * Antes de v2.84, los ActionItems creados automáticamente desde el
 * inventario (source='inventario') tenían:
 *   - comunicadoPorId = null
 *   - comunicadoPor    = 'Sistema (auto desde Inventario S1)'
 *
 * Eso hacía que la columna "Detectado por" del Plan de Acción mostrara
 * el texto "Sistema (auto desde Inventario S1)" en lugar del nombre del
 * usuario que realmente registró el item en el inventario (el empleado
 * que hizo el Paso 3).
 *
 * Qué hace esta migración:
 *   1. Para cada ActionItem con source='inventario' y comunicadoPorId=null
 *      (o con comunicadoPor='Sistema (auto desde Inventario S1)' que ya
 *      tenga comunicadoPorId pero apuntando al responsable de zona — un
 *      fallback incorrecto que hacía migrate-v278):
 *      a. Lee extra.inventoryItemId
 *      b. Busca el InventoryItem y su createdById
 *      c. Si hay createdById, setea comunicadoPorId = createdById
 *
 * Idempotente: se puede ejecutar múltiples veces.
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
      scanned: 0,
      fixed: 0,
      alreadyCorrect: 0,
      noInventoryItemId: 0,
      noCreatedBy: 0,
      notInventario: 0,
    }

    // Textos genéricos que indican "lo seteó el sistema, no un usuario real"
    const GENERICOS = [
      'Sistema (auto desde Inventario S1)',
      'Sistema',
      '—',
      '-',
      '',
    ]

    // 1. Buscar todos los ActionItems de source='inventario' que tengan
    //    comunicadoPor genérico o comunicadoPorId=null.
    const candidates = await db.actionItem.findMany({
      where: {
        source: 'inventario',
        OR: [
          { comunicadoPorId: null },
          {
            NOT: { comunicadoPor: null },
            comunicadoPor: { in: GENERICOS.filter(g => g !== '') },
          },
        ],
      },
      select: {
        id: true,
        comunicadoPor: true,
        comunicadoPorId: true,
        extra: true,
      },
    })

    stats.scanned = candidates.length

    for (const item of candidates) {
      // Saltar si ya tiene un usuario real (no genérico) asignado
      const texto = (item.comunicadoPor || '').trim()
      const isGeneric = GENERICOS.includes(texto)

      // Si ya tiene comunicadoPorId y el texto NO es genérico, asumimos
      // que ya está bien asignado a un usuario real identificado por nombre.
      if (item.comunicadoPorId && !isGeneric) {
        stats.alreadyCorrect++
        continue
      }

      // Si no hay extra, no podemos inferir el inventoryItemId
      if (!item.extra) {
        stats.noInventoryItemId++
        continue
      }

      let inventoryItemId: string | null = null
      try {
        const extra = JSON.parse(item.extra)
        inventoryItemId = extra?.inventoryItemId || null
      } catch {
        stats.noInventoryItemId++
        continue
      }

      if (!inventoryItemId) {
        stats.noInventoryItemId++
        continue
      }

      // Buscar el InventoryItem y su createdById
      const inv = await db.inventoryItem.findUnique({
        where: { id: inventoryItemId },
        select: {
          createdById: true,
          createdBy: { select: { id: true, name: true } },
        },
      })

      if (!inv) {
        stats.noInventoryItemId++
        continue
      }

      if (!inv.createdById || !inv.createdBy) {
        stats.noCreatedBy++
        continue
      }

      // Setear comunicadoPorId = createdById (el empleado que registró el
      // item en el inventario — el que hizo el Paso 3).
      await db.actionItem.update({
        where: { id: item.id },
        data: { comunicadoPorId: inv.createdById },
      })
      stats.fixed++
    }

    // Reporte final
    const finalCounts = await db.actionItem.groupBy({
      by: ['source'],
      _count: {
        comunicadoPorId: true,
        id: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: `Migración v2.99.4 completada: ${stats.fixed} ActionItem(s) actualizados con el usuario real que hizo el Paso 3 (empleado que registró el inventario).`,
      stats,
      finalCounts,
    })
  } catch (error) {
    console.error('[migrate-v2994] Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    )
  }
}
