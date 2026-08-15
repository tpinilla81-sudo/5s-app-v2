/**
 * Script de migración v2.76 — Unificación de tablas Inventario + Plan de Acción + Hallazgos 4/5
 *
 * Para cada ActionItem existente:
 *   1. Determina el `tipo` correcto según el `source` (legacy):
 *        source='actionplan'    → tipo='accion'
 *        source='inventario'    → tipo='inventario'
 *        source='autoevaluacion'→ tipo='hallazgo'
 *        source='auditoria'     → tipo='hallazgo'
 *   2. Si tipo='hallazgo' y los campos de Demanda están vacíos, los
 *      rellena con valores por defecto para que la fila aparezca
 *      completa en el Plan de Acción unificado:
 *        - fechaEntrada = createdAt (si no tiene)
 *        - semana = semana de createdAt
 *        - seccionDemandante = 'Autoevaluación' o 'Auditoría' según miniStep
 *        - clienteZona = nombre de la zona (si tenemos zoneId, buscar)
 *        - personaDemandada = responsable (campo legacy)
 *        - enviado = 'Pendiente'
 *        - porcentaje = 0
 *   3. Si tipo='inventario', asegurar que status='nok' y enviado='Sí'
 *
 * Uso:
 *   npx tsx scripts/migrate-v276-unify-tables.ts
 *
 * Es IDEMPOTENTE: se puede ejecutar múltiples veces sin efectos secundarios.
 * Solo actualiza filas que necesitan cambios (WHERE campo IS NULL OR campo = '').
 */
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

function getWeekFromDate(date: Date): string {
  const start = new Date(date.getFullYear(), 0, 1)
  const diff = date.getTime() - start.getTime()
  const oneWeek = 1000 * 60 * 60 * 24 * 7
  return `W${Math.ceil((diff / oneWeek) + start.getDay() / 7)}`
}

async function main() {
  console.log('══════════════════════════════════════════════════════════')
  console.log('  Migración v2.76 — Unificación de tablas ActionItem')
  console.log('══════════════════════════════════════════════════════════\n')

  const allActions = await db.actionItem.findMany({
    include: { zone: { select: { name: true } } },
  })
  console.log(`Total ActionItems: ${allActions.length}`)

  let updatedCount = 0
  let skippedCount = 0

  for (const action of allActions) {
    const updateData: any = {}
    const source = action.source || 'actionplan'

    // 1. Determinar tipo
    let tipo: 'accion' | 'inventario' | 'hallazgo'
    if (source === 'inventario') tipo = 'inventario'
    else if (source === 'autoevaluacion' || source === 'auditoria') tipo = 'hallazgo'
    else tipo = 'accion'

    if (action.tipo !== tipo) {
      updateData.tipo = tipo
    }

    // 2. Para hallazgos, rellenar Demanda si está vacía
    if (tipo === 'hallazgo') {
      const seccionDemandante = action.miniStep === 5 ? 'Auditoría' : 'Autoevaluación'

      if (!action.fechaEntrada) {
        updateData.fechaEntrada = action.createdAt
      }
      if (!action.semana) {
        updateData.semana = getWeekFromDate(action.fechaEntrada ? new Date(action.fechaEntrada) : action.createdAt)
      }
      if (!action.seccionDemandante) {
        updateData.seccionDemandante = seccionDemandante
      }
      if (!action.clienteZona && action.zone?.name) {
        updateData.clienteZona = action.zone.name
      }
      if (!action.personaDemandada && action.responsable) {
        updateData.personaDemandada = action.responsable
      }
      if (!action.seccionDemandada && action.zone?.name) {
        updateData.seccionDemandada = action.zone.name
      }
      if (!action.enviado) {
        updateData.enviado = 'Pendiente'
      }
      if (action.porcentaje === null || action.porcentaje === undefined) {
        updateData.porcentaje = 0
      }
      if (!action.status) {
        updateData.status = 'nok'
      }
    }

    // 3. Para inventario, asegurar status y enviado
    if (tipo === 'inventario') {
      if (!action.status) updateData.status = 'nok'
      if (!action.enviado) updateData.enviado = 'Sí'
    }

    // 4. Para manual, asegurar tipo='accion' y estado por defecto
    if (tipo === 'accion') {
      if (!action.enviado) updateData.enviado = 'Pendiente'
      if (action.porcentaje === null || action.porcentaje === undefined) updateData.porcentaje = 0
    }

    if (Object.keys(updateData).length > 0) {
      try {
        await db.actionItem.update({
          where: { id: action.id },
          data: updateData,
        })
        updatedCount++
      } catch (e) {
        console.error(`Error actualizando ActionItem ${action.id}:`, e)
      }
    } else {
      skippedCount++
    }
  }

  console.log(`\n✓ Actualizados: ${updatedCount}`)
  console.log(`✓ Sin cambios (ya estaban OK): ${skippedCount}`)
  console.log('\nMigración completada.')
}

main()
  .catch((e) => {
    console.error('Error en migración:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
