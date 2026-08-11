import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  systemConfigMigrated: boolean | undefined
}

// Ensure DATABASE_URL points to Neon PostgreSQL (not SQLite from parent env)
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:')) {
  try {
    const envPath = path.join(process.cwd(), '.env')
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')
      const match = envContent.match(/^DATABASE_URL="(.+)"$/m)
      if (match && match[1].startsWith('postgresql://')) {
        process.env.DATABASE_URL = match[1]
      }
    }
  } catch (e) {
    // Ignore
  }
}

// Also load DATABASE_URL_UNPOOLED for Prisma migrations
if (!process.env.DATABASE_URL_UNPOOLED) {
  try {
    const envPath = path.join(process.cwd(), '.env')
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')
      const match = envContent.match(/^DATABASE_URL_UNPOOLED="(.+)"$/m)
      if (match) {
        process.env.DATABASE_URL_UNPOOLED = match[1]
      }
    }
  } catch (e) {
    // Ignore
  }
}

/**
 * Verify that DATABASE_URL is correctly configured for PostgreSQL (Neon).
 * Returns an error message string if misconfigured, or null if OK.
 */
export function verifyDatabaseConfig(): string | null {
  const url = process.env.DATABASE_URL
  if (!url) {
    return 'DATABASE_URL no está configurada. Configúrala en Vercel: Settings → Environment Variables → DATABASE_URL = postgresql://...neon.tech/...?sslmode=require'
  }
  if (url.startsWith('file:')) {
    return 'DATABASE_URL apunta a SQLite local (file:...). En Vercel debe apuntar a PostgreSQL de Neon. Configúrala en: Vercel → Settings → Environment Variables.'
  }
  if (!url.startsWith('postgresql://') && !url.startsWith('postgres://')) {
    return `DATABASE_URL tiene formato inválido. Debe ser postgresql://... (Neon). Valor actual: ${url.substring(0, 30)}...`
  }
  return null
}

function createPrismaClient() {
  const url = process.env.DATABASE_URL
  if (!url || url.startsWith('file:') || (!url.startsWith('postgresql://') && !url.startsWith('postgres://'))) {
    console.error('[db.ts] DATABASE_URL misconfigured:', url ? url.substring(0, 50) + '...' : 'undefined')
  }
  return new PrismaClient({
    log: ['error'],
    datasources: {
      db: {
        url,
      },
    },
  })
}

// Always reuse the global instance to prevent connection pool exhaustion with Neon
// In dev, hot-reload can create many instances; in prod, serverless can too
const db = globalForPrisma.prisma ?? createPrismaClient()

// Store globally regardless of environment
globalForPrisma.prisma = db

/**
 * Auto-migrate: ensure SystemConfig table exists.
 * Runs once per process lifetime (uses global flag).
 * This replaces the need for a manual /api/migrate call.
 */
export async function ensureSystemConfigTable() {
  if (globalForPrisma.systemConfigMigrated) return

  try {
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "SystemConfig" (
        "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        "key" TEXT NOT NULL UNIQUE,
        "value" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)
    await db.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "SystemConfig_key_key" ON "SystemConfig"("key");
    `)
    globalForPrisma.systemConfigMigrated = true
  } catch (e) {
    // Table might already exist, or we might not have permissions — that's OK
    globalForPrisma.systemConfigMigrated = true
  }
}

export { db }
