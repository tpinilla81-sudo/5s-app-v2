import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'

// GET /api/templates-public - Endpoint PÚBLICO para plantillas del sistema
// Sin autenticación - solo para plantillas activas de la biblioteca (companyId = null)
// Usado como fallback por FormacionModal, InventarioModal, etc.
//
// Seguridad: Solo expone plantillas públicas del sistema (biblioteca)
// No expone plantillas específicas de empresas ni datos sensibles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const sStep = searchParams.get('sStep')
    const miniStep = searchParams.get('miniStep')

    // SOLO plantillas del sistema (biblioteca) activas
    const where: Record<string, unknown> = {
      active: true,
      companyId: null, // Solo biblioteca del sistema
    }
    
    if (type) where.type = type
    if (sStep) where.sStep = parseInt(sStep)
    if (miniStep) where.miniStep = parseInt(miniStep)

    const templates = await db.template.findMany({
      where,
      orderBy: [
        { sStep: 'asc' },
        { miniStep: 'asc' },
        { createdAt: 'desc' },
      ],
      select: {
        id: true,
        type: true,
        title: true,
        description: true,
        content: true,
        sStep: true,
        miniStep: true,
        notaMinima: true,
        minPhotos: true,
        // No incluir campos sensibles
      },
    })

    return NextResponse.json({ success: true, data: templates })
  } catch (error) {
    console.error('[templates-public] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error fetching public templates' }, 
      { status: 500 }
    )
  }
}
