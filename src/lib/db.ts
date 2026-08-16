import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  systemConfigMigrated: boolean | undefined
  dbSchemaVerified: boolean | undefined
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
const db = globalForPrisma.prisma ?? createPrismaClient()
globalForPrisma.prisma = db

/**
 * Auto-ensure critical tables exist (idempotent).
 * Runs once per cold start — uses CREATE TABLE IF NOT EXISTS.
 *
 * This is the runtime equivalent of prisma migrate deploy.
 * Vercel serverless can't run migrations at build time without DATABASE_URL
 * available to the build process, so we ensure schema at runtime instead.
 */
export async function ensureDbSchema() {
  if (globalForPrisma.dbSchemaVerified) return

  try {
    // Session table (required for login)
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Session" (
        "id" TEXT PRIMARY KEY,
        "token" TEXT NOT NULL UNIQUE,
        "userId" TEXT NOT NULL,
        "expiresAt" TIMESTAMP(3) NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)
    await db.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Session_token_key" ON "Session"("token");
    `)
    await db.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");
    `)
    await db.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Session_expiresAt_idx" ON "Session"("expiresAt");
    `)

    // SystemConfig table
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

    // v2.35: añadir minPhotos a Template y minPhotosOverride + updatedAt a BoardSlotTemplate
    // Idempotente: ADD COLUMN IF NOT EXISTS (Postgres 9.6+)
    try {
      await db.$executeRawUnsafe(`ALTER TABLE "Template" ADD COLUMN IF NOT EXISTS "minPhotos" INTEGER;`)
      // Seed default 10 for existing fotos templates without a value
      await db.$executeRawUnsafe(`UPDATE "Template" SET "minPhotos" = 10 WHERE "type" = 'fotos' AND "minPhotos" IS NULL;`)
    } catch (e) {
      console.error('[db.ts] minPhotos column add failed (non-fatal):', e instanceof Error ? e.message : e)
    }
    try {
      await db.$executeRawUnsafe(`ALTER TABLE "BoardSlotTemplate" ADD COLUMN IF NOT EXISTS "minPhotosOverride" INTEGER;`)
      await db.$executeRawUnsafe(`ALTER TABLE "BoardSlotTemplate" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;`)
    } catch (e) {
      console.error('[db.ts] BoardSlotTemplate columns add failed (non-fatal):', e instanceof Error ? e.message : e)
    }

    // v2.84: Añadir createdById a InventoryItem para trackear el empleado
    // que registró cada item. Esto permite que el "Detectado por" del
    // Plan de Acción muestre automáticamente el nombre del empleado
    // cuando el hallazgo viene del Paso 3 (Inventario).
    try {
      await db.$executeRawUnsafe(`ALTER TABLE "InventoryItem" ADD COLUMN IF NOT EXISTS "createdById" TEXT;`)
      // FK es opcional — la creamos como constraint solo si no existe ya
      try {
        await db.$executeRawUnsafe(`ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;`)
      } catch (_fkErr) {
        // Constraint ya existe o la BD no soporta ADD CONSTRAINT (SQLite)
        // — no es fatal, la columna ya está creada.
      }
      try {
        await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "InventoryItem_createdById_idx" ON "InventoryItem"("createdById");`)
      } catch (_idxErr) { /* non-fatal */ }
    } catch (e) {
      console.error('[db.ts] InventoryItem.createdById column add failed (non-fatal):', e instanceof Error ? e.message : e)
    }

    globalForPrisma.dbSchemaVerified = true
  } catch (e) {
    // Don't crash on schema errors — log and continue
    console.error('[db.ts] Schema verification failed:', e instanceof Error ? e.message : e)
    globalForPrisma.dbSchemaVerified = true // Don't retry on every request
  }
}

/**
 * @deprecated Use ensureDbSchema instead — kept for backwards compatibility.
 */
export async function ensureSystemConfigTable() {
  return ensureDbSchema()
}

// Kick off schema verification on module load (non-blocking)
// This ensures tables exist on every cold start without blocking the request
if (!globalForPrisma.dbSchemaVerified) {
  ensureDbSchema().catch(() => {})
}

export { db }
