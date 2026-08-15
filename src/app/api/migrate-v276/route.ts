import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * POST /api/migrate-v276
 *
 * Endpoint temporal (one-shot) para la v2.76 — UNIFICACIÓN DE TABLAS:
 *   Inventario (S1-S4, paso 3) + Plan de Acción (S5, paso 3) +
 *   Autoevaluación (paso 4) + Auditoría (paso 5) comparten la misma
 *   estructura Demanda / Acción / Seguimiento.
 *
 * Tareas que realiza (IDEMPOTENTE — se puede llamar las veces que haga falta):
 *
 *  1. ALTER TABLE IF NOT EXISTS para las columnas nuevas que el schema
 *     local ya tiene vía `prisma db push` pero que pueden faltar en
 *     producción (Neon). Esencialmente las mismas columnas que ya migró
 *     /api/migrate-v275 más los campos del Plan de Acción clásico
 *     (numeroEntrada, fechaEntrada, comunicadoPor, semana, seccionDemandante,
 *      clienteZona, personaDemandada, seccionDemandada, impactoObjetivo,
 *      enviado, accionCorrectiva, accionesPreventivas, semanaPrevista,
 *      porcentaje, semanaReal). Estos campos se introdujeron en v2.60-v2.72
 *     pero si la BD de producción es muy vieja, faltarán.
 *
 *  2. BACKFILL del campo `tipo` según el `source` legacy:
 *        source='actionplan'     → tipo='accion'
 *        source='inventario'     → tipo='inventario'
 *        source='autoevaluacion' → tipo='hallazgo'
 *        source='auditoria'      → tipo='hallazgo'
 *
 *  3. BACKFILL de los campos de "Demanda" en los ActionItem tipo='hallazgo'
 *     que tengan esos campos vacíos. Esto hace que las filas generadas
 *     históricamente por autoeval/auditoría aparezcan con la misma
 *     estructura que las entradas manuales del Plan de Acción:
 *        - fechaEntrada = createdAt
 *        - semana       = W{ISO week de createdAt}
 *        - seccionDemandante = 'Autoevaluación' | 'Auditoría' (según miniStep)
 *        - clienteZona       = zone.name
 *        - seccionDemandada  = zone.name
 *        - personaDemandada  = responsable (legacy) si existe
 *        - enviado           = 'Pendiente'
 *        - porcentaje        = 0
 *        - status            = 'nok'
 *
 *  4. BACKFILL de `tipo='inventario'` y `status='nok'`, `enviado='Sí'`
 *     en ActionItems source='inventario'.
 *
 * Tras verificar que todo funciona, este endpoint se elimina en el
 * siguiente commit (igual que /api/migrate-v275 y /api/migrate-evaluation-schedule).
 */
export async function POST(_request: NextRequest) {
  const results: { step: string; status: string; detail?: any }[] = []
  const errors: { step: string; error: string }[] = []

  // ── Helper: ALTER TABLE ADD COLUMN IF NOT EXISTS ──────────────────────
  const addColumnIfNotExists = async (
    table: string,
    column: string,
    definition: string,
  ) => {
    try {
      await db.$executeRawUnsafe(
        `ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "${column}" ${definition};`,
      )
      results.push({ step: `addColumn ${table}.${column}`, status: 'OK' })
    } catch (e: any) {
      errors.push({
        step: `addColumn ${table}.${column}`,
        error: e?.message || String(e),
      })
    }
  }

  // ── 1. ALTER TABLE para columnas del Plan de Acción clásico (v2.60-v2.72) ──
  // Estas columnas ya deberían existir en producción, pero las creamos
  // idempotentemente por si la BD es muy vieja.
  await addColumnIfNotExists('ActionItem', 'numeroEntrada', 'INTEGER')
  await addColumnIfNotExists('ActionItem', 'fechaEntrada', 'TIMESTAMP(3)')
  await addColumnIfNotExists('ActionItem', 'comunicadoPor', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'semana', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'seccionDemandante', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'clienteZona', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'personaDemandada', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'seccionDemandada', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'impactoObjetivo', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'enviado', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'accionCorrectiva', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'accionesPreventivas', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'semanaPrevista', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'porcentaje', 'DOUBLE PRECISION DEFAULT 0')
  await addColumnIfNotExists('ActionItem', 'semanaReal', 'TEXT')

  // Columnas introducidas en v2.72/v2.75/v2.76 (por si acaso faltan)
  await addColumnIfNotExists('ActionItem', 'extra', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'sourceId', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'comunicadoPorId', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'personaDemandadaId', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'verificadoPorId', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'tipo', 'TEXT')
  await addColumnIfNotExists('ActionItem', 'status', 'TEXT')

  // ── 2. BACKFILL tipo según source ─────────────────────────────────────
  try {
    const r1 = await db.$executeRawUnsafe(
      `UPDATE "ActionItem" SET "tipo" = 'accion'
       WHERE ("tipo" IS NULL OR "tipo" = '')
         AND ("source" = 'actionplan' OR "source" IS NULL);`,
    )
    results.push({ step: 'backfill tipo=accion (actionplan)', status: 'OK', detail: `${r1} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill tipo=accion', error: e?.message || String(e) })
  }

  try {
    const r2 = await db.$executeRawUnsafe(
      `UPDATE "ActionItem" SET "tipo" = 'inventario'
       WHERE ("tipo" IS NULL OR "tipo" = '')
         AND "source" = 'inventario';`,
    )
    results.push({ step: 'backfill tipo=inventario', status: 'OK', detail: `${r2} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill tipo=inventario', error: e?.message || String(e) })
  }

  try {
    const r3 = await db.$executeRawUnsafe(
      `UPDATE "ActionItem" SET "tipo" = 'hallazgo'
       WHERE ("tipo" IS NULL OR "tipo" = '')
         AND "source" IN ('autoevaluacion', 'auditoria');`,
    )
    results.push({ step: 'backfill tipo=hallazgo (autoeval/auditoria)', status: 'OK', detail: `${r3} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill tipo=hallazgo', error: e?.message || String(e) })
  }

  // ── 3. BACKFILL Demanda en hallazgos ──────────────────────────────────
  // Solo para ActionItems tipo='hallazgo' cuyos campos de Demanda estén vacíos.

  // 3a. fechaEntrada = createdAt
  try {
    const r4 = await db.$executeRawUnsafe(
      `UPDATE "ActionItem" SET "fechaEntrada" = "createdAt"
       WHERE "tipo" = 'hallazgo' AND "fechaEntrada" IS NULL;`,
    )
    results.push({ step: 'backfill hallazgo.fechaEntrada=createdAt', status: 'OK', detail: `${r4} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill hallazgo.fechaEntrada', error: e?.message || String(e) })
  }

  // 3b. semana = W{ISO week} calculada a partir de createdAt
  // Postgres no tiene una función simple para ISO week como string 'Wnn',
  // así que usamos DATE_TRUNC + EXTRACT para construir 'W01'..'W53'.
  try {
    const r5 = await db.$executeRawUnsafe(
      `UPDATE "ActionItem"
       SET "semana" = CONCAT('W', LPAD(EXTRACT(WEEK FROM "createdAt")::TEXT, 2, '0'))
       WHERE "tipo" = 'hallazgo' AND ("semana" IS NULL OR "semana" = '');`,
    )
    results.push({ step: 'backfill hallazgo.semana=W{ISO week}', status: 'OK', detail: `${r5} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill hallazgo.semana', error: e?.message || String(e) })
  }

  // 3c. seccionDemandante según miniStep
  try {
    const r6a = await db.$executeRawUnsafe(
      `UPDATE "ActionItem" SET "seccionDemandante" = 'Auditoría'
       WHERE "tipo" = 'hallazgo' AND "miniStep" = 5
         AND ("seccionDemandante" IS NULL OR "seccionDemandante" = '');`,
    )
    results.push({ step: 'backfill hallazgo.seccionDemandante=Auditoría (miniStep=5)', status: 'OK', detail: `${r6a} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill seccionDemandante auditoría', error: e?.message || String(e) })
  }

  try {
    const r6b = await db.$executeRawUnsafe(
      `UPDATE "ActionItem" SET "seccionDemandante" = 'Autoevaluación'
       WHERE "tipo" = 'hallazgo' AND ("miniStep" = 4 OR "miniStep" IS NULL)
         AND ("seccionDemandante" IS NULL OR "seccionDemandante" = '');`,
    )
    results.push({ step: 'backfill hallazgo.seccionDemandante=Autoevaluación (miniStep=4)', status: 'OK', detail: `${r6b} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill seccionDemandante autoeval', error: e?.message || String(e) })
  }

  // 3d. clienteZona = zone.name (requiere JOIN)
  try {
    const r7 = await db.$executeRawUnsafe(
      `UPDATE "ActionItem" AS a
       SET "clienteZona" = z."name"
       FROM "Zone" AS z
       WHERE a."tipo" = 'hallazgo'
         AND a."zoneId" = z."id"
         AND (a."clienteZona" IS NULL OR a."clienteZona" = '');`,
    )
    results.push({ step: 'backfill hallazgo.clienteZona=zone.name', status: 'OK', detail: `${r7} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill hallazgo.clienteZona', error: e?.message || String(e) })
  }

  // 3e. seccionDemandada = zone.name (mismo valor que clienteZona en hallazgos)
  try {
    const r8 = await db.$executeRawUnsafe(
      `UPDATE "ActionItem" AS a
       SET "seccionDemandada" = z."name"
       FROM "Zone" AS z
       WHERE a."tipo" = 'hallazgo'
         AND a."zoneId" = z."id"
         AND (a."seccionDemandada" IS NULL OR a."seccionDemandada" = '');`,
    )
    results.push({ step: 'backfill hallazgo.seccionDemandada=zone.name', status: 'OK', detail: `${r8} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill hallazgo.seccionDemandada', error: e?.message || String(e) })
  }

  // 3f. personaDemandada = responsable (campo legacy de texto libre)
  try {
    const r9 = await db.$executeRawUnsafe(
      `UPDATE "ActionItem"
       SET "personaDemandada" = "responsable"
       WHERE "tipo" = 'hallazgo'
         AND ("personaDemandada" IS NULL OR "personaDemandada" = '')
         AND "responsable" IS NOT NULL AND "responsable" <> '';`,
    )
    results.push({ step: 'backfill hallazgo.personaDemandada=responsable(legacy)', status: 'OK', detail: `${r9} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill hallazgo.personaDemandada', error: e?.message || String(e) })
  }

  // 3g. enviado = 'Pendiente'
  try {
    const r10 = await db.$executeRawUnsafe(
      `UPDATE "ActionItem" SET "enviado" = 'Pendiente'
       WHERE "tipo" = 'hallazgo' AND ("enviado" IS NULL OR "enviado" = '');`,
    )
    results.push({ step: 'backfill hallazgo.enviado=Pendiente', status: 'OK', detail: `${r10} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill hallazgo.enviado', error: e?.message || String(e) })
  }

  // 3h. porcentaje = 0
  try {
    const r11 = await db.$executeRawUnsafe(
      `UPDATE "ActionItem" SET "porcentaje" = 0
       WHERE "tipo" = 'hallazgo' AND ("porcentaje" IS NULL);`,
    )
    results.push({ step: 'backfill hallazgo.porcentaje=0', status: 'OK', detail: `${r11} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill hallazgo.porcentaje', error: e?.message || String(e) })
  }

  // 3i. status = 'nok' (ya viene de v2.75, pero reaseguramos)
  try {
    const r12 = await db.$executeRawUnsafe(
      `UPDATE "ActionItem" SET "status" = 'nok'
       WHERE "tipo" = 'hallazgo' AND ("status" IS NULL OR "status" = '');`,
    )
    results.push({ step: 'backfill hallazgo.status=nok', status: 'OK', detail: `${r12} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill hallazgo.status', error: e?.message || String(e) })
  }

  // ── 4. BACKFILL inventario: status='nok', enviado='Sí' ────────────────
  try {
    const r13 = await db.$executeRawUnsafe(
      `UPDATE "ActionItem" SET "status" = 'nok'
       WHERE "tipo" = 'inventario' AND ("status" IS NULL OR "status" = '');`,
    )
    results.push({ step: 'backfill inventario.status=nok', status: 'OK', detail: `${r13} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill inventario.status', error: e?.message || String(e) })
  }

  try {
    const r14 = await db.$executeRawUnsafe(
      `UPDATE "ActionItem" SET "enviado" = 'Sí'
       WHERE "tipo" = 'inventario' AND ("enviado" IS NULL OR "enviado" = '');`,
    )
    results.push({ step: 'backfill inventario.enviado=Sí', status: 'OK', detail: `${r14} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill inventario.enviado', error: e?.message || String(e) })
  }

  // ── 5. BACKFILL accion (entradas manuales): enviado='Pendiente', porcentaje=0 ─
  try {
    const r15 = await db.$executeRawUnsafe(
      `UPDATE "ActionItem" SET "enviado" = 'Pendiente'
       WHERE "tipo" = 'accion' AND ("enviado" IS NULL OR "enviado" = '');`,
    )
    results.push({ step: 'backfill accion.enviado=Pendiente', status: 'OK', detail: `${r15} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill accion.enviado', error: e?.message || String(e) })
  }

  try {
    const r16 = await db.$executeRawUnsafe(
      `UPDATE "ActionItem" SET "porcentaje" = 0
       WHERE "tipo" = 'accion' AND ("porcentaje" IS NULL);`,
    )
    results.push({ step: 'backfill accion.porcentaje=0', status: 'OK', detail: `${r16} filas` })
  } catch (e: any) {
    errors.push({ step: 'backfill accion.porcentaje', error: e?.message || String(e) })
  }

  // ── 6. VERIFICACIÓN final ─────────────────────────────────────────────
  const verify: Record<string, any> = {}
  try {
    const v1 = await db.$queryRawUnsafe(`
      SELECT "tipo", COUNT(*)::INT AS n
      FROM "ActionItem"
      GROUP BY "tipo"
      ORDER BY "tipo";`,
    ) as any[]
    verify.countsByTipo = v1
  } catch (e: any) {
    verify.countsByTipo = `error: ${e?.message}`
  }

  try {
    const v2 = await db.$queryRawUnsafe(`
      SELECT
        COUNT(*) FILTER (WHERE "tipo" = 'hallazgo' AND "fechaEntrada" IS NOT NULL)::INT AS hallazgos_con_fecha,
        COUNT(*) FILTER (WHERE "tipo" = 'hallazgo' AND "seccionDemandante" IS NOT NULL AND "seccionDemandante" <> '')::INT AS hallazgos_con_seccion,
        COUNT(*) FILTER (WHERE "tipo" = 'hallazgo' AND "clienteZona" IS NOT NULL AND "clienteZona" <> '')::INT AS hallazgos_con_zona,
        COUNT(*) FILTER (WHERE "tipo" = 'hallazgo' AND "enviado" IS NOT NULL AND "enviado" <> '')::INT AS hallazgos_con_enviado,
        COUNT(*) FILTER (WHERE "tipo" = 'hallazgo')::INT AS hallazgos_total,
        COUNT(*) FILTER (WHERE "tipo" = 'inventario')::INT AS inventario_total,
        COUNT(*) FILTER (WHERE "tipo" = 'accion')::INT AS accion_total
      FROM "ActionItem";`,
    ) as any[]
    verify.hallazgoBackfillStatus = v2[0]
  } catch (e: any) {
    verify.hallazgoBackfillStatus = `error: ${e?.message}`
  }

  return NextResponse.json({
    success: true,
    version: 'v2.76 — unificación de tablas',
    results,
    errors,
    verify,
  })
}
