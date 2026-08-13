-- ════════════════════════════════════════════════════════════════════════════
-- v2.30 MIGRACIÓN — Plantillas por empresa (idempotente)
-- Ejecutar en Neon Console: https://console.neon.tech
-- ════════════════════════════════════════════════════════════════════════════

-- 1) Añadir columna companyId a Template (si no existe ya)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Template' AND column_name = 'companyId'
  ) THEN
    ALTER TABLE "Template" ADD COLUMN "companyId" TEXT;
    RAISE NOTICE '✓ Columna companyId añadida a Template';
  ELSE
    RAISE NOTICE '✓ La columna companyId ya existe en Template (skip)';
  END IF;
END $$;

-- 2) Índice sobre companyId (si no existe)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'Template_companyId_idx'
  ) THEN
    CREATE INDEX "Template_companyId_idx" ON "Template"("companyId");
    RAISE NOTICE '✓ Índice Template_companyId_idx creado';
  ELSE
    RAISE NOTICE '✓ Índice Template_companyId_idx ya existe (skip)';
  END IF;
END $$;

-- 3) Índice compuesto (type, sStep, miniStep, active) — si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'Template_type_sStep_miniStep_active_idx'
  ) THEN
    CREATE INDEX "Template_type_sStep_miniStep_active_idx" ON "Template"("type", "sStep", "miniStep", "active");
    RAISE NOTICE '✓ Índice compuesto Template_type_sStep_miniStep_active_idx creado';
  ELSE
    RAISE NOTICE '✓ Índice compuesto ya existe (skip)';
  END IF;
END $$;

-- 4) Foreign key Template.companyId → Company.id (si no existe)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Template_companyId_fkey'
  ) THEN
    ALTER TABLE "Template" ADD CONSTRAINT "Template_companyId_fkey"
      FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    RAISE NOTICE '✓ FK Template_companyId_fkey creada';
  ELSE
    RAISE NOTICE '✓ FK Template_companyId_fkey ya existe (skip)';
  END IF;
END $$;

-- 5) Verificación final: la columna debe existir
SELECT
  '✅ Migración OK — companyId existe en Template' AS status,
  COUNT(*) AS total_templates,
  COUNT(*) FILTER (WHERE "companyId" IS NULL) AS system_templates,
  COUNT(*) FILTER (WHERE "companyId" IS NOT NULL) AS company_templates
FROM "Template";
