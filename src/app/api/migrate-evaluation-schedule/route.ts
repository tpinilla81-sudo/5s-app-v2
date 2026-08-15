import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/migrate-evaluation-schedule
// v2.74: Añade las columnas faltantes en la tabla EvaluationSchedule de Neon
// (responsableId, empleadoId, createdBy, estado, notas) y la columna 'extra'
// en ActionItem para v2.72. Idempotente: usa ADD COLUMN IF NOT EXISTS.
// También crea los índices.
export async function POST() {
  const results: string[] = []
  const errors: string[] = []

  // 1. EvaluationSchedule — columnas nuevas
  const evalCols = [
    { name: 'responsableId', type: 'TEXT' },
    { name: 'empleadoId', type: 'TEXT' },
    { name: 'createdBy', type: 'TEXT' },
    { name: 'estado', type: 'TEXT NOT NULL DEFAULT \'programada\'' },
    { name: 'notas', type: 'TEXT' },
  ]
  for (const col of evalCols) {
    try {
      await db.$executeRawUnsafe(`ALTER TABLE "EvaluationSchedule" ADD COLUMN IF NOT EXISTS "${col.name}" ${col.type};`)
      results.push(`EvaluationSchedule.${col.name} OK`)
    } catch (e: any) {
      errors.push(`EvaluationSchedule.${col.name} error: ${e?.message || e}`)
    }
  }

  // 2. EvaluationSchedule — índices
  const evalIdx = ['responsableId', 'empleadoId']
  for (const col of evalIdx) {
    try {
      await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "EvaluationSchedule_${col}_idx" ON "EvaluationSchedule"("${col}");`)
      results.push(`Index EvaluationSchedule.${col} OK`)
    } catch (e: any) {
      errors.push(`Index EvaluationSchedule.${col} error: ${e?.message || e}`)
    }
  }

  // 3. ActionItem — columna 'extra' (v2.72)
  try {
    await db.$executeRawUnsafe(`ALTER TABLE "ActionItem" ADD COLUMN IF NOT EXISTS "extra" TEXT;`)
    results.push('ActionItem.extra OK')
  } catch (e: any) {
    errors.push(`ActionItem.extra error: ${e?.message || e}`)
  }

  // 4. Verificación: leer columnas reales de EvaluationSchedule
  let verify: any = null
  try {
    verify = await db.$queryRawUnsafe(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'EvaluationSchedule'
      ORDER BY ordinal_position;
    `)
  } catch (e: any) {
    errors.push(`Verify error: ${e?.message || e}`)
  }

  return NextResponse.json({
    success: errors.length === 0,
    results,
    errors,
    verify,
    timestamp: new Date().toISOString(),
  })
}
