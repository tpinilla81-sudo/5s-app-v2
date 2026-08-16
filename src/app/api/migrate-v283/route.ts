import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/auth-helpers'
import { classifyImpacto } from '@/lib/action-item-helpers'

/**
 * POST /api/migrate-v283
 *
 * v2.83 — Backfill del snapshot `extra` + recalculo de `impactoObjetivo` +
 * corrección del `tipo` para ActionItems legacy del inventario (paso 3).
 *
 * PROBLEMA:
 * Los ActionItems creados antes de v2.72 desde el inventario (paso 3,
 * S1-S4) tienen:
 *   - tipo='accion'    (debería ser 'inventario')
 *   - source='inventario'
 *   - extra=null       (no hay snapshot, Categoría/Elemento/Cantidad vacíos)
 *   - impactoObjetivo='Liberar espacio...' (texto libre, no clasificado)
 *
 * Por eso en la tabla del Plan de Acción las columnas Categoría, Elemento y
 * Cantidad aparecen como "—" para esos items.
 *
 * SOLUCIÓN:
 * Para cada ActionItem legacy del inventario:
 *   1. Busca el InventoryItem original por `sourceId` o por `itemId`
 *      (si itemId empieza con "inv_", es el ID del InventoryItem).
 *   2. Reconstruye el snapshot `extra` con:
 *        categoria = InventoryItem.category
 *        elemento  = InventoryItem.name
 *        cantidad  = InventoryItem.quantity
 *        decision  = inferida del campo `impactoObjetivo` legacy
 *                    ('Liberar espacio...' → 'Retirar',
 *                     'Eliminar residuo...' → 'Eliminar')
 *        etiquetas = ''
 *        zonaOrigen / zonaDestino = del ActionItem (clienteZona) o del InventoryItem
 *        sStep, itemId, capturedAt
 *   3. Recalcula `impactoObjetivo` con classifyImpacto({ categoria, decision }).
 *   4. Corrige `tipo` de 'accion' a 'inventario'.
 *
 * Idempotente: si `extra` ya tiene `categoria`, se salta.
 * Requiere permisos de admin/gestor.
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req)
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    if (!['admin', 'gestor'].includes(user.role)) {
      return NextResponse.json({ error: 'Permisos insuficientes' }, { status: 403 })
    }

    // Buscar todos los ActionItem legacy del inventario:
    // source='inventario' Y (extra IS NULL OR extra sin categoria)
    const candidates = await db.actionItem.findMany({
      where: { source: 'inventario' },
      select: {
        id: true,
        sStep: true,
        miniStep: true,
        itemId: true,
        sourceId: true,
        itemDescription: true,
        hallazgo: true,
        clienteZona: true,
        impactoObjetivo: true,
        tipo: true,
        extra: true,
        projectId: true,
        zoneId: true,
      },
    })

    let updated = 0
    let skipped = 0
    let notFound = 0
    const errors: string[] = []

    for (const a of candidates) {
      // Saltar si ya tiene extra con categoria
      let existingExtra: any = null
      try {
        existingExtra = a.extra ? JSON.parse(a.extra) : null
      } catch { /* ignore */ }
      if (existingExtra?.categoria) {
        skipped++
        continue
      }

      // Resolver el InventoryItem original
      // 1) Por sourceId (FK lógica)
      // 2) Por itemId si empieza con "inv_"
      let inventoryItemId = a.sourceId || (a.itemId?.startsWith('inv_') ? a.itemId : null)
      let inv: any = null
      if (inventoryItemId) {
        inv = await db.inventoryItem.findUnique({
          where: { id: inventoryItemId },
          select: {
            id: true, name: true, location: true, category: true,
            quantity: true, price: true, action: true, extra: true,
            zonaOrigen: true, zonaDestino: true, sStep: true, zoneId: true,
          },
        }).catch(() => null)
      }

      // Si no hay InventoryItem, no podemos reconstruir el snapshot
      if (!inv) {
        notFound++
        continue
      }

      // Inferir la decisión del texto legacy del impactoObjetivo o del campo action del inventario
      const legacyImpacto = (a.impactoObjetivo || '').toLowerCase()
      let decision = inv.action || ''
      if (!decision) {
        if (legacyImpacto.includes('eliminar') || legacyImpacto.includes('residuo')) {
          decision = 'Eliminar'
        } else if (legacyImpacto.includes('liberar') || legacyImpacto.includes('cuarentena') || legacyImpacto.includes('jaula')) {
          decision = 'Retirar'
        } else {
          decision = 'Recolocar'
        }
      }

      // Reconstruir extra snapshot (misma estructura que sync-actions)
      let invExtraParsed: any = {}
      try { invExtraParsed = inv.extra ? JSON.parse(inv.extra) : {} } catch { /* ignore */ }
      const newExtra = JSON.stringify({
        inventoryItemId: inv.id,
        elemento: inv.name,
        ubicacion: inv.location || '',
        categoria: inv.category || '',
        cantidad: inv.quantity || 1,
        precio: inv.price ?? null,
        estado: invExtraParsed.estado || '',
        frecuenciaUso: invExtraParsed.frecuenciaUso || '',
        decision,
        diasCuarentena: invExtraParsed.diasCuarentena || null,
        etiquetas: invExtraParsed.etiquetas || '',
        zonaOrigen: inv.zonaOrigen || a.clienteZona || '',
        zonaDestino: inv.zonaDestino || '',
        sStep: a.sStep || inv.sStep,
        itemId: a.itemId,
        capturedAt: new Date().toISOString(),
      })

      // Recalcular impactoObjetivo
      const impacto = classifyImpacto({
        categoria: inv.category || '',
        decision,
      }) || (decision === 'Retirar' ? 'RIESGOS DE ACCIDENTES' : 'MEJORA TIEMPOS')

      try {
        await db.actionItem.update({
          where: { id: a.id },
          data: {
            extra: newExtra,
            impactoObjetivo: impacto,
            // Corregir tipo legacy 'accion' → 'inventario'
            tipo: a.tipo === 'accion' ? 'inventario' : a.tipo,
          },
        })
        updated++
      } catch (e: any) {
        errors.push(`ActionItem ${a.id}: ${e?.message || 'error desconocido'}`)
      }
    }

    return NextResponse.json({
      success: true,
      total: candidates.length,
      updated,
      skipped,
      notFound,
      errors: errors.slice(0, 20),
    })
  } catch (error: any) {
    console.error('[migrate-v283]', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Error interno' },
      { status: 500 }
    )
  }
}
