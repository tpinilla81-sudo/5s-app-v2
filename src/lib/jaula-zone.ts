import { db } from './db'

/**
 * v2.101 — PENDIENTE-S1 (Opción A)
 * --------------------------------
 * Garantiza que el proyecto tenga una zona física marcada como JAULA.
 *
 * v2.108.19 (JAULA-FISICA) — DEPRECATED:
 * La Jaula ya NO se crea automáticamente como Zone regular. Ahora es
 * un lugar físico que el Responsable debe crear y verificar con foto
 * (campos jaulaStatus / jaulaPhotoUrl en Project).
 *
 * Esta función se mantiene por retrocompatibilidad con código legacy
 * (algunas APIs todavía la llaman) pero es no-op para proyectos nuevos.
 * Solo se asegura de que exista una Zone isJaula=true para proyectos
 * viejos que ya la tenían (migración retroactiva). NO crea nuevas.
 */
export async function ensureJaulaZone(projectId: string) {
  // v2.108.19 — NO crear automáticamente la Zone con isJaula=true.
  // La Jaula ahora es un estado del Project, no una Zone.
  // Solo devolvemos una Zone existente si ya estaba marcada como isJaula.
  const existing = await db.zone.findFirst({
    where: { projectId, isJaula: true },
  })
  return existing
}
