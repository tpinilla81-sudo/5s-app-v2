import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { db, verifyDatabaseConfig } from '@/lib/db'
import { getAuthUser, SESSION_COOKIE, getSessionExpiry } from '@/lib/auth-helpers'
import { hashPassword, verifyAndMigratePassword, isLegacyHash } from '@/lib/password'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

// Simple in-memory rate limiter (per Vercel serverless instance)
// Note: Across instances this is not perfect, but it stops brute force on a single instance
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()
const MAX_ATTEMPTS = 10
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now()
  const entry = loginAttempts.get(ip)

  if (!entry || now - entry.lastAttempt > WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now })
    return { allowed: true }
  }

  entry.count++
  entry.lastAttempt = now

  if (entry.count > MAX_ATTEMPTS) {
    const retryAfterSec = Math.ceil((WINDOW_MS - (now - entry.lastAttempt)) / 1000)
    return { allowed: false, retryAfterSec }
  }

  return { allowed: true }
}

function recordFailedAttempt(ip: string) {
  const now = Date.now()
  const entry = loginAttempts.get(ip) || { count: 0, lastAttempt: now }
  entry.count++
  entry.lastAttempt = now
  loginAttempts.set(ip, entry)
}

function clearAttempts(ip: string) {
  loginAttempts.delete(ip)
}

// GET /api/auth - Get current session user
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      const response = NextResponse.json({ user: null }, { status: 200 })
      response.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 })
      return response
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ user: null }, { status: 200 })
  }
}

// POST /api/auth - Login
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
             request.headers.get('x-real-ip') ||
             'unknown'

  // Rate limit check
  const rateLimit = checkRateLimit(ip)
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: `Demasiados intentos. Intenta de nuevo en ${rateLimit.retryAfterSec}s.` },
      { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSec) } }
    )
  }

  try {
    // Verify database configuration before any DB operation
    const dbError = verifyDatabaseConfig()
    if (dbError) {
      console.error('[auth] Database config error:', dbError)
      return NextResponse.json(
        { error: 'Configuración de base de datos incorrecta. Revisa DATABASE_URL en Vercel.' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    const user = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    })

    if (!user) {
      recordFailedAttempt(ip)
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Verify password AND auto-migrate from SHA256 to bcrypt if needed
    const { valid, migrated } = await verifyAndMigratePassword(user.id, password, user.password)

    if (!valid) {
      recordFailedAttempt(ip)
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    if (!user.active) {
      return NextResponse.json(
        { error: 'Cuenta desactivada. Contacte al administrador.' },
        { status: 403 }
      )
    }

    // Create a secure session token
    const token = randomBytes(32).toString('hex')
    const expiresAt = getSessionExpiry()

    await db.session.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    })

    // Clean up old expired sessions for this user
    await db.session.deleteMany({
      where: {
        userId: user.id,
        expiresAt: { lt: new Date() },
      },
    }).catch(() => {})

    // Clear rate limit on successful login
    clearAttempts(ip)

    if (migrated) {
      console.log(`[auth] User ${user.email} password migrated from SHA256 to bcrypt`)
    }

    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
          active: user.active,
        },
      },
      { status: 200 }
    )

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      path: '/',
      maxAge: COOKIE_MAX_AGE,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT /api/auth - Register
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Nombre, email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      )
    }

    // Self-registration is always 'empleado' role
    const userRole = 'empleado'

    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Ya existe un usuario con este email' },
        { status: 409 }
      )
    }

    // Use bcrypt for new users
    const hashedPassword = await hashPassword(password)

    const user = await db.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: userRole,
      },
    })

    const token = randomBytes(32).toString('hex')
    const expiresAt = getSessionExpiry()

    await db.session.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    })

    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
          active: user.active,
        },
      },
      { status: 201 }
    )

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      path: '/',
      maxAge: COOKIE_MAX_AGE,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE /api/auth - Logout
export async function DELETE(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get(SESSION_COOKIE)?.value

    if (sessionToken) {
      await db.session.deleteMany({
        where: { token: sessionToken },
      }).catch(() => {})
    }
  } catch (error) {
    console.error('Logout cleanup error:', error)
  }

  const response = NextResponse.json(
    { message: 'Sesión cerrada' },
    { status: 200 }
  )

  response.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  })

  return response
}
