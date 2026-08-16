-- v2.84: Añade columna createdById a InventoryItem para trackear qué
-- empleado registró cada item del inventario. Se usa para setear
-- automáticamente `comunicadoPorId` en el ActionItem cuando el item
-- se sincroniza al Plan de Acción (Paso 3 = Inventario).

ALTER TABLE "InventoryItem" ADD COLUMN "createdById" TEXT;

-- FK a User (onDelete: SET NULL para no romper si el usuario se borra)
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_createdById_fkey"
  FOREIGN KEY ("createdById") REFERENCES "User"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

-- Índice para queries inversas (qué inventario hizo este usuario)
CREATE INDEX "InventoryItem_createdById_idx" ON "InventoryItem"("createdById");
