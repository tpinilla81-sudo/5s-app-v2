import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { verifyPassword } from '../../../../lib/password'

/**
 * POST /api/users/verify-password
 * Verifies a user's current password without creating a session.
 * Used by the gestor profile dialog to confirm the current password
 * before allowing a password change.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, password } = body

    if (!userId || !password) {
      return NextResponse.json({ valid: false, error: 'userId y password son requeridos' }, { status: 400 })
    }

    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json({ valid: false, error: 'Usuario no encontrado' }, { status: 404 })
    }

    const valid = await verifyPassword(password, user.password)

    return NextResponse.json({ valid })
  } catch (error) {
    console.error('Password verification error:', error)
    return NextResponse.json({ valid: false, error: 'Error interno' }, { status: 500 })
  }
}
