import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/auth-helpers'

/**
 * POST /api/migrate-v2107
 *
 * v2.107 — Añade las columnas nuevas de ZONAS-VIRTUALES a las tablas
 * Project y Zone (si no existen ya) para no romper producción tras el
 * deploy, hasta que se ejecute `prisma migrate deploy` oficial.
 *
 * Columnas nuevas:
 *   - Project.surfaceM2       Float?    NULL ok
 *   - Project.complexityType  String?   NULL ok
 *   - Project.criticality     String?   DEFAULT 'media'
 *   - Project.layoutGenerated Boolean   DEFAULT false
 *   - Zone.surfaceM2           Float?   NULL ok
 *   - Zone.complexityType      String?  NULL ok
 *   - Zone.criticality         String?  DEFAULT 'media'
 *
 * Idempotente: usa INFORMATION_SCHEMA / PRAGMA table_info según el
 * dialecto. Requiere admin/gestor/gerente.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user || !['admin', 'gestor', 'gerente'].includes(user.role)) {
      return NextResponse.json(
        { success: false, error: 'No autorizado. Se requiere rol admin/gestor/gerente.' },
        { status: 403 }
      )
    }

    const results: { table: string; column: string; status: string }[] = []

    // PostgreSQL — usa ALTER TABLE ADD COLUMN IF NOT EXISTS
    const statements = [
      // v2.107 — columnas en Project y Zone
      { table: 'Project', column: 'surfaceM2',       sql: `ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "surfaceM2" DOUBLE PRECISION` },
      { table: 'Project', column: 'complexityType',  sql: `ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "complexityType" TEXT` },
      { table: 'Project', column: 'criticality',     sql: `ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "criticality" TEXT DEFAULT 'media'` },
      { table: 'Project', column: 'layoutGenerated', sql: `ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "layoutGenerated" BOOLEAN NOT NULL DEFAULT false` },
      { table: 'Zone',    column: 'surfaceM2',       sql: `ALTER TABLE "Zone" ADD COLUMN IF NOT EXISTS "surfaceM2" DOUBLE PRECISION` },
      { table: 'Zone',    column: 'complexityType',  sql: `ALTER TABLE "Zone" ADD COLUMN IF NOT EXISTS "complexityType" TEXT` },
      { table: 'Zone',    column: 'criticality',     sql: `ALTER TABLE "Zone" ADD COLUMN IF NOT EXISTS "criticality" TEXT DEFAULT 'media'` },
    ]

    for (const { table, column, sql } of statements) {
      try {
        await db.$executeRawUnsafe(sql)
        results.push({ table, column, status: 'added-or-already-exists' })
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        if (msg.includes('already exists') || msg.toLowerCase().includes('duplicate')) {
          results.push({ table, column, status: 'already-exists' })
        } else {
          results.push({ table, column, status: `error: ${msg}` })
        }
      }
    }

    // v2.108 — tabla ZoneAlgorithmConfig (CREATE TABLE IF NOT EXISTS)
    try {
      await db.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "ZoneAlgorithmConfig" (
          "id" TEXT NOT NULL,
          "maxM2PorZona" DOUBLE PRECISION NOT NULL DEFAULT 800,
          "questionLabels" TEXT NOT NULL DEFAULT '{}',
          "defaultPrefix" TEXT NOT NULL DEFAULT 'Z',
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL,
          CONSTRAINT "ZoneAlgorithmConfig_pkey" PRIMARY KEY ("id")
        )
      `)
      results.push({ table: 'ZoneAlgorithmConfig', column: '(table)', status: 'created-or-exists' })
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      if (msg.includes('already exists')) {
        results.push({ table: 'ZoneAlgorithmConfig', column: '(table)', status: 'already-exists' })
      } else {
        results.push({ table: 'ZoneAlgorithmConfig', column: '(table)', status: `error: ${msg}` })
      }
    }

    // v2.108.10 — Backfill: Template.minPhotos era NULL en plantillas 'fotos'
    // creadas por el seed (/api/seed/templates no lo seteaba). El UI mostraba
    // "10 fotos mín" como fallback, así que el usuario pensaba que guardaba
    // un número pero seguía viendo 10. Materializar el default 10 en la BD
    // para que el listado refleje el valor real y los PUT posteriores se
    // vean correctamente.
    try {
      const result = await db.$executeRawUnsafe(`
        UPDATE "Template"
        SET "minPhotos" = 10
        WHERE "type" = 'fotos' AND "minPhotos" IS NULL
      `)
      results.push({
        table: 'Template',
        column: 'minPhotos',
        status: `backfilled ${typeof result === 'number' ? result : '?'} filas de NULL a 10`,
      })
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      results.push({ table: 'Template', column: 'minPhotos', status: `backfill skipped: ${msg}` })
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error('migrate-v2107 error:', error)
    return NextResponse.json(
      { success: false, error: 'Error en migración v2.107' },
      { status: 500 }
    )
  }
}
