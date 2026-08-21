import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { getAuthUser } from '../../../../lib/auth-helpers'

// GET /api/users/lookup-by-email?email=foo@bar.com
// Devuelve un usuario por email EXACTO (sin importar empresa/activo).
// Solo accesible por gestor/admin — usado para resolver conflictos
// de "email ya existe" al crear nuevos usuarios desde una zona.
export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request)
    if (!authUser) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }
    // Solo gestor o admin pueden hacer lookup global
    if (authUser.role !== 'gestor' && authUser.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Sin permisos' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')?.trim().toLowerCase()
    if (!email) {
      return NextResponse.json({ success: false, error: 'email requerido' }, { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ success: false, found: false }, { status: 404 })
    }

    return NextResponse.json({ success: true, found: true, user })
  } catch (error) {
    console.error('Error in lookup-by-email:', error)
    return NextResponse.json({ success: false, error: 'Error interno' }, { status: 500 })
  }
}
