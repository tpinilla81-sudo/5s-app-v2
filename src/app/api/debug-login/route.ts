import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { db, verifyDatabaseConfig } from '../../../lib/db'
import { getSessionExpiry } from '../../../lib/auth-helpers'
import { verifyAndMigratePassword, isLegacyHash } from '../../../lib/password'

export async function POST(request: NextRequest) {
  const result: any = {
    step: 'start',
    timestamp: new Date().toISOString()
  }

  try {
    // Step 1: Check DB config
    result.step = 'check-db-config'
    const dbError = verifyDatabaseConfig()
    if (dbError) {
      result.error = 'DB Config Error: ' + dbError
      return NextResponse.json(result, { status: 500 })
    }
    result.dbConfig = 'OK'

    // Step 2: Parse body
    result.step = 'parse-body'
    const body = await request.json()
    const { email, password } = body
    result.email = email

    if (!email || !password) {
      result.error = 'Missing credentials'
      return NextResponse.json(result, { status: 400 })
    }

    // Step 3: Find user
    result.step = 'find-user'
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    })

    if (!user) {
      result.error = 'User not found'
      return NextResponse.json(result, { status: 401 })
    }
    result.userFound = { id: user.id, email: user.email, name: user.name, role: user.role, active: user.active }
    result.passwordType = isLegacyHash(user.password) ? 'legacy-sha256' : 'bcrypt'

    // Step 4: Verify password
    result.step = 'verify-password'
    const { valid, migrated } = await verifyAndMigratePassword(user.id, password, user.password)
    result.passwordValid = valid
    result.migrated = migrated

    if (!valid) {
      result.error = 'Invalid password'
      return NextResponse.json(result, { status: 401 })
    }

    // Step 5: Check active
    result.step = 'check-active'
    if (!user.active) {
      result.error = 'User inactive'
      return NextResponse.json(result, { status: 403 })
    }

    // Step 6: Create session
    result.step = 'create-session'
    const token = randomBytes(32).toString('hex')
    const expiresAt = getSessionExpiry()

    try {
      const session = await db.session.create({
        data: {
          token,
          userId: user.id,
          expiresAt,
        },
      })
      result.sessionCreated = { id: session.id }
    } catch (sessionErr: any) {
      result.sessionError = sessionErr.message
      result.sessionStack = sessionErr.stack
      return NextResponse.json(result, { status: 500 })
    }

    // Step 7: Success
    result.step = 'success'
    result.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      active: user.active,
    }

    const response = NextResponse.json(result, { status: 200 })
    response.cookies.set('5s_session', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
      secure: true,
    })

    return response
  } catch (error: any) {
    result.step = 'error'
    result.error = error.message
    result.stack = error.stack
    return NextResponse.json(result, { status: 500 })
  }
}
