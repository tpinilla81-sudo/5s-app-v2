import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/auth-helpers'
import { AUDIT_CHECKLISTS } from '@/lib/5s-constants'
import { classifyImpacto } from '@/lib/action-item-helpers'

/**
 * POST /api/migrate-v282
 *
 * v2.82 — Backfill del campo `impactoObjetivo` (columna "Impacto" en el Plan
 * de Acción) para ActionItems creados antes de v2.82 que no tengan todavía
 * la clasificación automática.
 *
 * La clasificación toma uno de tres valores:
 *   • CALIDAD
 *   • MEJORA TIEMPOS
 *   • RIESGOS DE ACCIDENTES
 *
 * Para resolver la clasificación, este endpoint mira el origen del ActionItem:
 *
 *   1. source='inventario' (Paso 3, S1-S4):
 *      - Lee el snapshot `extra` (categoria, decision).
 *      - Llama a classifyImpacto({ categoria, decision }).
 *
 *   2. source='autoevaluacion' | 'auditoria' (Paso 4/5, NOKs):
 *      - Lee sStep + itemId.
 *      - Resuelve sectionId desde itemId ("1.1.3" → "1.1").
 *      - Llama a classifyImpacto({ sStep, itemId }).
 *
 *   3. source='actionplan' (entrada manual):
 *      - Sin datos para clasificar → se deja null (usuario podrá rellenar).
 *
 * Idempotente: si `impactoObjetivo` ya tiene uno de los 3 valores válidos,
 * se salta el registro.
 *
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

    // Traer todos los ActionItems que no tengan un impacto válido ya puesto.
    // Los 3 valores válidos de v2.82 son exactamente estos strings; cualquier
    // otra cosa (null, '', texto libre legacy) se considera pendiente.
    const VALID_IMPACTOS = new Set(['CALIDAD', 'MEJORA TIEMPOS', 'RIESGOS DE ACCIDENTES'])

    const items = await db.actionItem.findMany({
      where: {
        // Solo items de tipo hallazgo o inventario — las entradas manuales
        // del Plan de Acción (tipo='accion') se dejan para el usuario.
        tipo: { in: ['hallazgo', 'inventario'] },
      },
      select: {
        id: true,
        sStep: true,
        itemId: true,
        source: true,
        tipo: true,
        impactoObjetivo: true,
        extra: true,
      },
    })

    let updated = 0
    let skipped = 0
    let notFound = 0
    const errors: string[] = []

    for (const it of items) {
      // Saltar si ya tiene un impacto válido
      if (it.impactoObjetivo && VALID_IMPACTOS.has(it.impactoObjetivo)) {
        skipped++
        continue
      }

      let categoria: string | null = null
      let decision: string | null = null
      let sStep: number | null = it.sStep
      let itemId: string | null = it.itemId

      // Resolver categoria/decision desde el snapshot `extra` si existe
      if (it.extra) {
        try {
          const extra = JSON.parse(it.extra)
          categoria = extra?.categoria || null
          decision = extra?.decision || null
          // Si el extra trae sStep/itemId (NOKs de paso 4/5), usarlos
          if (!sStep && extra?.sStep) sStep = extra.sStep
          if (!itemId && extra?.itemId) itemId = extra.itemId
        } catch { /* ignore */ }
      }

      // Si es NOK (source=autoeval/auditoria), asegurarse de que tenemos
      // sStep + itemId. Si no, no se puede clasificar.
      if (it.source === 'autoevaluacion' || it.source === 'auditoria') {
        if (!sStep || !itemId) {
          notFound++
          continue
        }
      }

      const impacto = classifyImpacto({ sStep, itemId, categoria, decision })
      if (!impacto) {
        notFound++
        continue
      }

      try {
        await db.actionItem.update({
          where: { id: it.id },
          data: { impactoObjetivo: impacto },
        })
        updated++
      } catch (e: any) {
        errors.push(`ActionItem ${it.id}: ${e?.message || 'error desconocido'}`)
      }
    }

    return NextResponse.json({
      success: true,
      total: items.length,
      updated,
      skipped,
      notFound,
      errors: errors.slice(0, 20),
    })
  } catch (error: any) {
    console.error('[migrate-v282]', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Error interno' },
      { status: 500 }
    )
  }
}
