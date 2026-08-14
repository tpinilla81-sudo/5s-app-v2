-- v2.35: límite mínimo de fotos configurable por plantilla y override por slot
-- Template.minPhotos: valor base definido por el gestor en plantillas globales (default 10)
-- BoardSlotTemplate.minPhotosOverride: override por zona/slot (admin de proyecto)

-- Add minPhotos column to Template (nullable; fallback to 10 in app code)
ALTER TABLE "Template" ADD COLUMN "minPhotos" INTEGER;

-- Seed default value (10) for existing templates of type='fotos'
UPDATE "Template" SET "minPhotos" = 10 WHERE "type" = 'fotos' AND "minPhotos" IS NULL;

-- Add minPhotosOverride column to BoardSlotTemplate (nullable)
ALTER TABLE "BoardSlotTemplate" ADD COLUMN "minPhotosOverride" INTEGER;

-- Add updatedAt to BoardSlotTemplate (didn't have one before)
ALTER TABLE "BoardSlotTemplate" ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
