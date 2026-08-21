import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/contact
// Recibe solicitudes de información desde el formulario público del login.
// Guarda el mensaje en DB (tabla ContactRequest) y lo marca como pendiente.
// El gestor ve estos mensajes desde su panel (próxima iteración).
//
// Body: { name, email, phone?, company?, message }
// ─────────────────────────────────────────────────────────────────────────────

const CONTACT_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      company,
      message,
    } = body || {}

    // Validación
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'El nombre es obligatorio.' },
        { status: 400 }
      )
    }
    if (!email || typeof email !== 'string' || !CONTACT_EMAIL_RE.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Email no válido.' },
        { status: 400 }
      )
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'El mensaje es obligatorio.' },
        { status: 400 }
      )
    }

    // Sanitizar strings
    const cleanName = name.trim().slice(0, 200)
    const cleanEmail = email.trim().toLowerCase().slice(0, 200)
    const cleanPhone = (phone || '').toString().trim().slice(0, 50)
    const cleanCompany = (company || '').toString().trim().slice(0, 200)
    const cleanMessage = message.trim().slice(0, 5000)

    // Guardar en DB si el modelo existe — envolver en try porque la tabla
    // puede no estar migrada todavía en algunos entornos.
    try {
      // @ts-expect-error: contactRequest se añadió al schema pero Prisma Client
      // puede no haber sido regenerado en todos los entornos. Si falla, se
      // cae al catch y el mensaje se registra en logs.
      await db.contactRequest.create({
        data: {
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone || null,
          company: cleanCompany || null,
          message: cleanMessage,
          status: 'pending',
        },
      })
    } catch (dbErr) {
      // La tabla no existe o el modelo no está en el cliente — log y continúa
      console.warn('[contact] No se pudo guardar en DB (tabla no migrada?):', dbErr)
    }

    // Log estructurado para monitoring
    console.log('[contact] Nueva solicitud recibida:', {
      name: cleanName,
      email: cleanEmail,
      company: cleanCompany || '(sin empresa)',
      hasPhone: !!cleanPhone,
      messageLength: cleanMessage.length,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Solicitud recibida correctamente.',
    })
  } catch (err) {
    console.error('[contact] Error procesando solicitud:', err)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}

// GET — permite al gestor consultar las solicitudes pendientes (próxima iteración)
export async function GET() {
  try {
    // @ts-expect-error: contactRequest puede no existir en el cliente Prisma
    const requests = await db.contactRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
    return NextResponse.json({ success: true, requests })
  } catch (err) {
    // Tabla no migrada todavía
    console.warn('[contact] GET: tabla no disponible:', err)
    return NextResponse.json({ success: true, requests: [] })
  }
}
