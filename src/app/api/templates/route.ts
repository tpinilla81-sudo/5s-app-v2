import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { resolveAuthContext, canEditCompanyTemplates, canEditSystemTemplates } from '../../../lib/company-resolver'

// GET /api/templates?type=xxx&sStep=1&miniStep=3&includeInactive=true&scope=company|library|all
//
// scope:
//   - "company"  → solo plantillas de la empresa del usuario (para gestionarlas)
//   - "library"  → solo Biblioteca del Sistema (companyId = null)
//   - "all"      (default) → company + library (lo que usan los modales para fallback)
//
// Permisos:
//   - gestor → ve todas (company de cualquier empresa + library)
//   - resto  → ve solo las de su empresa + library (read-only para no-gestores)
//
// RESILIENCIA: si la columna companyId no existe en la BD (migración SQL
// pendiente), se devuelve todo sin filtro de companyId (comportamiento
// pre-v2.30) para no romper la app.
export async function GET(request: NextRequest) {
  try {
    const ctx = await resolveAuthContext(request)
    if (!ctx) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const sStep = searchParams.get('sStep')
    const miniStep = searchParams.get('miniStep')
    const includeInactive = searchParams.get('includeInactive') === 'true'
    const scope = searchParams.get('scope') || 'all'

    // Construir el filtro de companyId según scope + rol
    let companyIdFilter: unknown
    if (ctx.user.role === 'gestor') {
      if (scope === 'library') companyIdFilter = null
      else if (scope === 'company') companyIdFilter = { not: null }
      else companyIdFilter = undefined // all
    } else {
      if (scope === 'company') {
        if (!ctx.companyId) {
          return NextResponse.json({ success: true, data: [] })
        }
        companyIdFilter = ctx.companyId
      } else if (scope === 'library') {
        companyIdFilter = null
      } else {
        companyIdFilter = ctx.companyId ? { in: [ctx.companyId, null] } : null
      }
    }

    const where: Record<string, unknown> = {}
    if (!includeInactive) where.active = true
    if (type) where.type = type
    if (sStep) where.sStep = parseInt(sStep)
    if (miniStep) where.miniStep = parseInt(miniStep)
    if (companyIdFilter !== undefined) where.companyId = companyIdFilter

    let templates
    try {
      templates = await db.template.findMany({
        where,
        orderBy: [
          { companyId: 'asc' },
          { sStep: 'asc' },
          { miniStep: 'asc' },
          { createdAt: 'desc' },
        ],
      })
    } catch (dbErr) {
      // La columna companyId podría no existir si la migración SQL no se aplicó.
      // Caer a query sin filtro de companyId.
      console.warn('[templates] companyId column missing, falling back:', dbErr instanceof Error ? dbErr.message : dbErr)
      const { companyId: _omit, ...whereNoCompany } = where
      templates = await db.template.findMany({
        where: whereNoCompany,
        orderBy: [
          { sStep: 'asc' },
          { miniStep: 'asc' },
          { createdAt: 'desc' },
        ],
      })
    }
    return NextResponse.json({ success: true, data: templates })
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json({ success: false, error: 'Error fetching templates' }, { status: 500 })
  }
}

// POST /api/templates - Create template
// Body: { type, sStep, miniStep, title, description, content, notaMinima, companyId?, active }
//
// - Si companyId viene vacío/null → crear como Biblioteca del Sistema (solo gestor)
// - Si companyId viene relleno → crear como plantilla de esa empresa
//   (solo gestor o admin de ESA empresa)
export async function POST(request: NextRequest) {
  try {
    const ctx = await resolveAuthContext(request)
    if (!ctx) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const { type, sStep, miniStep, title, description, content, notaMinima, companyId, active, minPhotos } = body

    if (!type || sStep == null || !title || !content) {
      return NextResponse.json({ success: false, error: 'Faltan campos obligatorios: type, sStep, title, content' }, { status: 400 })
    }

    // ¿Es plantilla de sistema o de empresa?
    const isSystem = !companyId || companyId === 'system' || companyId === 'library'
    const targetCompanyId = isSystem ? null : String(companyId)

    // Permiso (pasamos el tipo para que el responsable se valide contra su lista)
    if (isSystem) {
      if (!canEditSystemTemplates(ctx)) {
        return NextResponse.json({ success: false, error: 'Solo el gestor puede crear plantillas del Sistema' }, { status: 403 })
      }
    } else {
      if (!canEditCompanyTemplates(ctx, targetCompanyId, type)) {
        return NextResponse.json(
          { success: false, error: 'Sin permisos para crear este tipo de plantilla en esta empresa' },
          { status: 403 },
        )
      }
    }

    const data: Record<string, unknown> = {
      type,
      sStep: Number(sStep),
      miniStep: miniStep != null ? Number(miniStep) : 3,
      title,
      description: description || null,
      content: typeof content === 'string' ? content : JSON.stringify(content),
      notaMinima: notaMinima != null ? Number(notaMinima) : null,
      companyId: targetCompanyId,
      active: active !== undefined ? Boolean(active) : true,
    }
    // v2.35: minPhotos solo aplica a type='fotos' (default 10 si no se especifica)
    if (type === 'fotos') {
      data.minPhotos = minPhotos != null ? Number(minPhotos) : 10
    }

    const template = await db.template.create({ data: data as any })
    return NextResponse.json({ success: true, data: template })
  } catch (error) {
    console.error('Error creating template:', error)
    return NextResponse.json({ success: false, error: 'Error creating template' }, { status: 500 })
  }
}

// PUT /api/templates - Update template
// Body: { id, type, sStep, miniStep, title, description, content, active, notaMinima }
//
// El companyId NO se puede cambiar por esta vía (usar duplicate para copiar).
// El permiso se evalúa en base al companyId ACTUAL de la plantilla.
export async function PUT(request: NextRequest) {
  try {
    const ctx = await resolveAuthContext(request)
    if (!ctx) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const { id, type, sStep, miniStep, title, description, content, active, notaMinima, minPhotos } = body

    if (!id) {
      return NextResponse.json({ success: false, error: 'Se requiere el id de la plantilla' }, { status: 400 })
    }

    // Cargar la plantilla existente para verificar permisos
    const existing = await db.template.findUnique({ where: { id }, select: { companyId: true, type: true } })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Plantilla no encontrada' }, { status: 404 })
    }

    // ¿Es del sistema o de empresa?
    if (existing.companyId == null) {
      if (!canEditSystemTemplates(ctx)) {
        return NextResponse.json({ success: false, error: 'Solo el gestor puede editar plantillas del Sistema' }, { status: 403 })
      }
    } else {
      // Validamos contra el tipo EXISTENTE (no contra el nuevo, para que un
      // responsable no pueda cambiar una autoevaluacion a formacion yeditarla)
      if (!canEditCompanyTemplates(ctx, existing.companyId, existing.type)) {
        return NextResponse.json({ success: false, error: 'No tienes permisos para editar esta plantilla' }, { status: 403 })
      }
      // Si está intentando CAMBIAR el tipo, el responsable no puede
      if (ctx.user.role === 'responsable' && type !== undefined && type !== existing.type) {
        return NextResponse.json(
          { success: false, error: 'El coordinador no puede cambiar el tipo de una plantilla' },
          { status: 403 },
        )
      }
    }

    const data: Record<string, unknown> = {}
    if (type !== undefined) data.type = type
    if (sStep !== undefined) data.sStep = Number(sStep)
    if (miniStep !== undefined) data.miniStep = Number(miniStep)
    if (title !== undefined) data.title = title
    if (description !== undefined) data.description = description
    if (content !== undefined) data.content = typeof content === 'string' ? content : JSON.stringify(content)
    if (active !== undefined) data.active = Boolean(active)
    if (notaMinima !== undefined) data.notaMinima = notaMinima != null ? Number(notaMinima) : null
    // v2.35: minPhotos (solo type='fotos'). Si llega undefined, no se toca;
    // si llega null o número, se actualiza.
    if (minPhotos !== undefined) {
      data.minPhotos = minPhotos != null ? Number(minPhotos) : null
    }

    const template = await db.template.update({ where: { id }, data })
    return NextResponse.json({ success: true, data: template })
  } catch (error) {
    console.error('Error updating template:', error)
    return NextResponse.json({ success: false, error: 'Error updating template' }, { status: 500 })
  }
}

// DELETE /api/templates?id=xxx
export async function DELETE(request: NextRequest) {
  try {
    const ctx = await resolveAuthContext(request)
    if (!ctx) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'Se requiere el id' }, { status: 400 })
    }

    // Cargar para verificar permisos
    const existing = await db.template.findUnique({ where: { id }, select: { companyId: true, type: true } })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Plantilla no encontrada' }, { status: 404 })
    }

    if (existing.companyId == null) {
      if (!canEditSystemTemplates(ctx)) {
        return NextResponse.json({ success: false, error: 'Solo el gestor puede eliminar plantillas del Sistema' }, { status: 403 })
      }
    } else {
      if (!canEditCompanyTemplates(ctx, existing.companyId, existing.type)) {
        return NextResponse.json({ success: false, error: 'No tienes permisos para eliminar esta plantilla' }, { status: 403 })
      }
    }

    await db.template.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting template:', error)
    return NextResponse.json({ success: false, error: 'Error deleting template' }, { status: 500 })
  }
}
