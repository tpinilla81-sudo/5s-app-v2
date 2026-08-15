import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * POST /api/migrate-v275
 *
 * Endpoint temporal (one-shot) para añadir a la DB de producción todas las
 * columnas nuevas introducidas en v2.75:
 *
 *   - EvaluationSchedule.rolEjecutor
 *   - ActionItem.sourceId, comunicadoPorId, personaDemandadaId,
 *     verificadoPorId, tipo, status
 *   - AuditResult.miniStep, zoneId, ejecutorId, asistenteId,
 *     actionItemsGenerados, scheduleId
 *   - Notification.metadata
 *
 * En local ya están aplicadas vía `prisma db push`. En producción (Neon)
 * falta el `prisma migrate deploy` que no podemos ejecutar desde Vercel,
 * así que este endpoint hace los ALTER TABLE IF NOT EXISTS manualmente.
 *
 * Idempotente: se puede llamar las veces que haga falta.
 *
 * Tras verificar que todo funciona, se elimina este endpoint en el
 * siguiente commit (igual que hicimos con /api/migrate-evaluation-schedule
 * en v2.74.1).
 */
export async function POST(_request: NextRequest) {
  const results: { column: string; status: string }[] = []
  const errors: { column: string; error: string }[] = []

  // Helper: ALTER TABLE ADD COLUMN IF NOT EXISTS
  // En Postgres moderno (>=9.6) se puede usar `ADD COLUMN IF NOT EXISTS`.
  const addColumnIfNotExists = async (
    table: string,
    column: string,
    definition: string,
  ) => {
    try {
      await db.$executeRawUnsafe(
        `ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "${column}" ${definition};`,
      )
      results.push({ column: `${table}.${column}`, status: 'OK' })
    } catch (e: any) {
      errors.push({ column: `${table}.${column}`, error: e?.message || String(e) })
    }
  }

  // ── EvaluationSchedule ──────────────────────────────────────────────
  await addColumnIfNotExists('EvaluationSchedule', 'rolEjecutor', 'TEXT')

  // ── ActionItem ──────────────────────────────────────────────────────
  await addColumnIfNotExists('ActionItem', 'sourceId', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'comunicadoPorId', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'personaDemandadaId', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'verificadoPorId', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'tipo', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'status', 'TEXT')

  // ── AuditResult ─────────────────────────────────────────────────────
  await addColumnIfNotExists('AuditResult', 'miniStep', 'INTEGER')
  await addColumnIfNotExists('AuditResult', 'zoneId', 'TEXT')
  await addColumnIfNotExists('AuditResult', 'ejecutorId', 'TEXT')
  await addColumnIfNotExists('AuditResult', 'asistenteId', 'TEXT')
  await addColumnIfNotExists('AuditResult', 'actionItemsGenerados', 'INTEGER')
  await addColumnIfNotExists('AuditResult', 'scheduleId', 'TEXT')

  // ── Notification ────────────────────────────────────────────────────
  await addColumnIfNotExists('Notification', 'metadata', 'TEXT')

  // Set defaults for new non-null columns where the column allows it
  try {
    await db.$executeRawUnsafe(
      `UPDATE "ActionItem" SET "tipo" = 'accion' WHERE "tipo" IS NULL;`,
    )
    results.push({ column: 'ActionItem.tipo backfill', status: 'OK' })
  } catch (e: any) {
    errors.push({ column: 'ActionItem.tipo backfill', error: e?.message || String(e) })
  }

  try {
    await db.$executeRawUnsafe(
      `UPDATE "AuditResult" SET "miniStep" = 5 WHERE "miniStep" IS NULL;`,
    )
    results.push({ column: 'AuditResult.miniStep backfill', status: 'OK' })
  } catch (e: any) {
    errors.push({ column: 'AuditResult.miniStep backfill', error: e?.message || String(e) })
  }

  try {
    await db.$executeRawUnsafe(
      `UPDATE "AuditResult" SET "actionItemsGenerados" = 0 WHERE "actionItemsGenerados" IS NULL;`,
    )
    results.push({ column: 'AuditResult.actionItemsGenerados backfill', status: 'OK' })
  } catch (e: any) {
    errors.push({ column: 'AuditResult.actionItemsGenerados backfill', error: e?.message || String(e) })
  }

  // Verificar columnas presentes
  const verify: Record<string, any> = {}
  try {
    const es = await db.$queryRawUnsafe(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'EvaluationSchedule' AND column_name = 'rolEjecutor';
    `) as any[]
    verify.EvaluationSchedule_rolEjecutor = es.length > 0
  } catch (e: any) {
    verify.EvaluationSchedule_rolEjecutor = `error: ${e?.message}`
  }

  try {
    const ai = await db.$queryRawUnsafe(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'ActionItem' AND column_name IN
      ('sourceId','comunicadoPorId','personaDemandadaId','verificadoPorId','tipo','status');
    `) as any[]
    verify.ActionItem_new_columns = ai.length
  } catch (e: any) {
    verify.ActionItem_new_columns = `error: ${e?.message}`
  }

  try {
    const ar = await db.$queryRawUnsafe(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'AuditResult' AND column_name IN
      ('miniStep','zoneId','ejecutorId','asistenteId','actionItemsGenerados','scheduleId');
    `) as any[]
    verify.AuditResult_new_columns = ar.length
  } catch (e: any) {
    verify.AuditResult_new_columns = `error: ${e?.message}`
  }

  try {
    const n = await db.$queryRawUnsafe(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'Notification' AND column_name = 'metadata';
    `) as any[]
    verify.Notification_metadata = n.length > 0
  } catch (e: any) {
    verify.Notification_metadata = `error: ${e?.message}`
  }

  return NextResponse.json({
    success: true,
    results,
    errors,
    verify,
  })
}
