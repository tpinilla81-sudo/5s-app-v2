import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/auth-helpers'
import { AUDIT_CHECKLISTS } from '@/lib/5s-constants'

/**
 * POST /api/migrate-v281
 *
 * v2.81 — Backfill del snapshot `extra` para ActionItems de hallazgos
 * (source='autoevaluacion' o 'auditoria') que se crearon antes de v2.81
 * sin el snapshot de Categoría/Elemento/Cantidad.
 *
 * Para cada ActionItem de tipo hallazgo sin `extra` (o con extra sin `categoria`):
 *   1. Lee su `sStep` y `itemId`.
 *   2. Busca el itemId en AUDIT_CHECKLISTS[sStep] para resolver:
 *      - categoria = title de la sección (e.g. "MATERIALES")
 *      - elemento = description del item (e.g. "Producto acabado o en proceso")
 *      - cantidad = "1"
 *   3. Guarda el snapshot `extra` con la misma estructura que
 *      buildHallazgoFromNok().
 *
 * Idempotente: si el `extra` ya tiene `categoria`, se salta.
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

    const hallazgos = await db.actionItem.findMany({
      where: {
        tipo: 'hallazgo',
        OR: [
          { source: 'autoevaluacion' },
          { source: 'auditoria' },
        ],
      },
      select: {
        id: true,
        sStep: true,
        itemId: true,
        extra: true,
      },
    })

    let updated = 0
    let skipped = 0
    let notFound = 0
    const errors: string[] = []

    for (const h of hallazgos) {
      let existingExtra: any = null
      try {
        existingExtra = h.extra ? JSON.parse(h.extra) : null
      } catch { /* ignore */ }
      if (existingExtra?.categoria) {
        skipped++
        continue
      }

      if (!h.sStep || !h.itemId) {
        notFound++
        continue
      }

      const sections = AUDIT_CHECKLISTS[h.sStep] || []
      const sectionId = h.itemId.split('.').slice(0, 2).join('.')
      const section = sections.find(s => s.id === sectionId)
      const item = section?.items.find(i => i.id === h.itemId)
      if (!section || !item) {
        notFound++
        continue
      }

      const newExtra = JSON.stringify({
        ...(existingExtra || {}),
        categoria: section.title,
        elemento: item.description,
        cantidad: '1',
        decision: h.source === 'auditoria' ? 'Auditar' : 'Autoevaluar',
        etiquetas: `S${h.sStep}`,
        zonaOrigen: existingExtra?.zonaOrigen || '',
        zonaDestino: existingExtra?.zonaDestino || '',
        sStep: h.sStep,
        itemId: h.itemId,
        capturedAt: existingExtra?.capturedAt || new Date().toISOString(),
      })

      try {
        await db.actionItem.update({
          where: { id: h.id },
          data: { extra: newExtra },
        })
        updated++
      } catch (e: any) {
        errors.push(`ActionItem ${h.id}: ${e?.message || 'error desconocido'}`)
      }
    }

    return NextResponse.json({
      success: true,
      total: hallazgos.length,
      updated,
      skipped,
      notFound,
      errors: errors.slice(0, 20),
    })
  } catch (error: any) {
    console.error('[migrate-v281]', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Error interno' },
      { status: 500 }
    )
  }
}
