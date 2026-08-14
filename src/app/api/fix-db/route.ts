import { NextResponse } from 'next/server'
import { db, verifyDatabaseConfig } from '@/lib/db'

/**
 * POST /api/fix-db
 *
 * Public endpoint that ensures the Neon database has all required tables.
 * Safe to call multiple times — uses CREATE TABLE IF NOT EXISTS.
 *
 * This is needed because Prisma migrations may not have been applied
 * to the Neon database, and the login flow requires the Session table.
 */
export async function POST() {
  const results: string[] = []
  const errors: string[] = []

  // 1. Verify DATABASE_URL is configured
  const dbError = verifyDatabaseConfig()
  if (dbError) {
    return NextResponse.json(
      { success: false, error: 'DATABASE_URL mal configurada', details: dbError },
      { status: 500 }
    )
  }

  // 2. Create Session table if it doesn't exist
  try {
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Session" (
        "id" TEXT PRIMARY KEY,
        "token" TEXT NOT NULL UNIQUE,
        "userId" TEXT NOT NULL,
        "expiresAt" TIMESTAMP(3) NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)
    results.push('Session table OK (created or already exists)')

    await db.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Session_token_key" ON "Session"("token");
    `)
    await db.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");
    `)
    await db.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Session_expiresAt_idx" ON "Session"("expiresAt");
    `)
    results.push('Session indexes OK')
  } catch (e: any) {
    errors.push(`Session table error: ${e.message || String(e)}`)
  }

  // 3. Create SystemConfig table if it doesn't exist
  try {
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "SystemConfig" (
        "id" TEXT PRIMARY KEY,
        "key" TEXT NOT NULL UNIQUE,
        "value" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)
    await db.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "SystemConfig_key_key" ON "SystemConfig"("key");
    `)
    results.push('SystemConfig table OK')
  } catch (e: any) {
    errors.push(`SystemConfig table error: ${e.message || String(e)}`)
  }

  // 4. Add missing columns to User table (idempotent)
  const addUserColumn = async (column: string, type: string) => {
    try {
      await db.$queryRawUnsafe(`SELECT "${column}" FROM "User" LIMIT 1`)
      results.push(`User.${column} already exists`)
    } catch {
      try {
        await db.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN "${column}" ${type}`)
        results.push(`User.${column} added`)
      } catch (alterErr: any) {
        errors.push(`User.${column} error: ${alterErr.message || String(alterErr)}`)
      }
    }
  }

  await addUserColumn('plainPassword', 'TEXT')
  await addUserColumn('phone', 'TEXT')
  await addUserColumn('address', 'TEXT')
  await addUserColumn('city', 'TEXT')
  await addUserColumn('province', 'TEXT')
  await addUserColumn('postalCode', 'TEXT')
  await addUserColumn('country', 'TEXT')
  await addUserColumn('notes', 'TEXT')
  await addUserColumn('department', 'TEXT')
  await addUserColumn('position', 'TEXT')
  await addUserColumn('employeeId', 'TEXT')

  // 5. Test login query (findUnique) — verify the User table is queryable
  try {
    const testUser = await db.user.findFirst({
      select: { id: true, email: true, role: true },
    })
    results.push(`User table queryable (found ${testUser ? 'at least 1 user' : '0 users'})`)
  } catch (e: any) {
    errors.push(`User query error: ${e.message || String(e)}`)
  }

  // 6. Test Session query (count)
  try {
    const sessionCount = await db.session.count()
    results.push(`Session table queryable (count: ${sessionCount})`)
  } catch (e: any) {
    errors.push(`Session query error: ${e.message || String(e)}`)
  }

  return NextResponse.json({
    success: errors.length === 0,
    results,
    errors,
    timestamp: new Date().toISOString(),
  })
}
