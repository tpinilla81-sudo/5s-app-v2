import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { resolveAuthContext, canEditCompanyTemplates, canEditSystemTemplates } from '../../../../lib/company-resolver'

// POST /api/templates/duplicate
// Body: { sourceId: string, targetCompanyId?: string }
//
// Copia una plantilla existente en la empresa del usuario (o en targetCompanyId
// si el gestor lo pide expresamente). Útil para "importar" una plantilla del
// Sistema a tu empresa y poder editarla sin tocar el original.
//
// Reglas:
// - No gestor: siempre se copia a SU empresa (targetCompanyId se ignora)
// - Gestor: puede indicar targetCompanyId o dejarlo en null (copia a sistema)
//
// La copia siempre se crea con el mismo (type, sStep, miniStep) que el original.
export async function POST(request: NextRequest) {
  try {
    const ctx = await resolveAuthContext(request)
    if (!ctx) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const { sourceId, targetCompanyId } = body

    if (!sourceId) {
      return NextResponse.json({ success: false, error: 'Falta sourceId' }, { status: 400 })
    }

    const source = await db.template.findUnique({ where: { id: sourceId } })
    if (!source) {
      return NextResponse.json({ success: false, error: 'Plantilla origen no encontrada' }, { status: 404 })
    }

    // Determinar empresa destino
    let destCompanyId: string | null
    if (ctx.user.role === 'gestor') {
      destCompanyId = targetCompanyId || null // gestor puede duplicar a sistema
    } else {
      destCompanyId = ctx.companyId
      if (!destCompanyId) {
        return NextResponse.json({ success: false, error: 'No tienes empresa asignada' }, { status: 403 })
      }
    }

    // Permiso sobre empresa destino (incluye check de tipo — responsable solo
    // puede duplicar autoevaluacion/auditoria a su empresa)
    if (destCompanyId == null) {
      // Copiar a Sistema → solo gestor
      if (!canEditSystemTemplates(ctx)) {
        return NextResponse.json({ success: false, error: 'Solo el gestor puede crear plantillas del Sistema' }, { status: 403 })
      }
    } else {
      if (!canEditCompanyTemplates(ctx, destCompanyId, source.type)) {
        return NextResponse.json({ success: false, error: 'Sin permisos sobre esa empresa o tipo' }, { status: 403 })
      }
    }

    // No tiene sentido duplicar dentro del mismo scope
    if (source.companyId === destCompanyId) {
      return NextResponse.json({
        success: false,
        error: 'La plantilla ya pertenece al destino. Edita directamente o elimínala antes de duplicar.',
      }, { status: 409 })
    }

    const copy = await db.template.create({
      data: {
        type: source.type,
        sStep: source.sStep,
        miniStep: source.miniStep,
        title: source.title,
        description: source.description,
        content: source.content,
        notaMinima: source.notaMinima,
        active: source.active,
        companyId: destCompanyId,
      },
    })

    return NextResponse.json({ success: true, data: copy })
  } catch (error) {
    console.error('Error duplicating template:', error)
    return NextResponse.json({ success: false, error: 'Error al duplicar plantilla' }, { status: 500 })
  }
}
