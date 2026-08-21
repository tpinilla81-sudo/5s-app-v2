import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '../../../lib/auth-helpers'
import { migrateAllLegacyPasswords, isLegacyHash } from '../../../lib/password'
import { db } from '../../../lib/db'

/**
 * POST /api/migrate-passwords
 *
 * Bulk-migrates all legacy SHA256 password hashes to bcrypt.
 * Only accessible by gestor (platform owner).
 *
 * Safe to call multiple times — only legacy hashes are migrated.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }
    if (user.role !== 'gestor') {
      return NextResponse.json({ success: false, error: 'Solo el gestor puede ejecutar migraciones' }, { status: 403 })
    }

    // Get stats before migration
    const allUsers = await db.user.findMany({
      select: { id: true, email: true, password: true },
    })
    const legacyUsers = allUsers.filter(u => isLegacyHash(u.password))
    const bcryptUsers = allUsers.filter(u => !isLegacyHash(u.password))

    // Run migration
    const result = await migrateAllLegacyPasswords()

    return NextResponse.json({
      success: true,
      message: 'Migración completada',
      stats: {
        totalUsers: allUsers.length,
        alreadyBcrypt: bcryptUsers.length,
        legacyBefore: legacyUsers.length,
        migrated: result.migrated,
        failed: result.failed,
        remainingLegacy: legacyUsers.length - result.migrated,
      },
      errors: result.errors,
    })
  } catch (error: any) {
    console.error('[migrate-passwords] Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Error en migración',
      details: error.message || String(error),
    }, { status: 500 })
  }
}

/**
 * GET /api/migrate-passwords
 * Returns stats about password hashes (without exposing them).
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user || user.role !== 'gestor') {
      return NextResponse.json({ success: false, error: 'Solo el gestor' }, { status: 403 })
    }

    const allUsers = await db.user.findMany({
      select: { id: true, email: true, password: true },
    })
    const legacyUsers = allUsers.filter(u => isLegacyHash(u.password))

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers: allUsers.length,
        bcrypt: allUsers.length - legacyUsers.length,
        legacySha256: legacyUsers.length,
        legacyEmails: legacyUsers.map(u => u.email),
      },
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || String(error),
    }, { status: 500 })
  }
}
