/**
 * Helpers compartidos para la unificación de tablas
 * Inventario (paso 3, S1-S4) + Plan de Acción (paso 3, S5) +
 * Autoevaluación (paso 4) + Auditoría (paso 5).
 *
 * Todas estas fuentes generan ActionItems que se muestran en una
 * tabla unificada con las mismas columnas Demanda/Acción/Seguimiento.
 *
 * El campo `tipo` distingue el origen:
 *   - 'accion'     → entrada manual del Plan de Acción (S5 paso 3)
 *   - 'inventario' → item del inventario (S1-S4 paso 3) con decisión
 *   - 'hallazgo'   → NOK detectado en autoeval (paso 4) o auditoría (paso 5)
 *
 * El campo `source` (legacy) se mantiene para no romper consultas antiguas:
 *   - 'actionplan'    → tipo='accion'
 *   - 'inventario'    → tipo='inventario'
 *   - 'autoevaluacion' → tipo='hallazgo' (miniStep=4)
 *   - 'auditoria'     → tipo='hallazgo' (miniStep=5)
 */

export type ActionTipo = 'accion' | 'inventario' | 'hallazgo';
export type ActionSource = 'actionplan' | 'inventario' | 'autoevaluacion' | 'auditoria';

/** Calcula la semana ISO-8601 aproximada (W1..W53) para una fecha dada. */
export function getWeekFromDate(date: Date = new Date()): string {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return `W${Math.ceil((diff / oneWeek) + start.getDay() / 7)}`;
}

/** Lista de semanas para selects (W1..W53). */
export const WEEK_OPTIONS = Array.from({ length: 53 }, (_, i) => `W${i + 1}`);

/** Opciones del campo `enviado`. */
export const ENVIADO_OPTIONS = ['Sí', 'No', 'Pendiente'] as const;

/** Opciones del campo `estado`. */
export const ESTADO_OPTIONS = [
  { value: 'abierta', label: 'Abierta' },
  { value: 'en_proceso', label: 'En proceso' },
  { value: 'resuelta', label: 'Resuelta' },
  { value: 'cerrada', label: 'Cerrada' },
] as const;

/** Colores de sección para las 3 zonas de la tabla unificada. */
export const SECTION_COLORS = {
  demandante: 'bg-amber-50 border-amber-300',
  accion: 'bg-sky-50 border-sky-300',
  seguimiento: 'bg-orange-50 border-orange-300',
} as const;

export const HEADER_COLORS = {
  demandante: 'bg-amber-400 text-white',
  accion: 'bg-sky-400 text-white',
  seguimiento: 'bg-orange-400 text-white',
} as const;

/**
 * Construye el payload de "Demanda" para un ActionItem generado
 * automáticamente desde una autoevaluación (paso 4) o auditoría (paso 5).
 *
 * Autocompleta:
 *   - fechaEntrada: hoy
 *   - semana: semana actual
 *   - comunicadoPor: nombre del revisor (currentUser)
 *   - seccionDemandante: 'Autoevaluación' | 'Auditoría'
 *   - clienteZona: nombre de la zona revisada
 *   - personaDemandada: nombre del responsable de la zona
 *   - seccionDemandada: nombre de la zona (fallback si no hay sección)
 *   - enviado: 'Pendiente'
 *   - tipo: 'hallazgo'
 *   - status: 'nok'
 *
 * Quedan para rellenar manualmente (no se tocan aquí):
 *   - impactoObjetivo, accionCorrectiva, accionesPreventivas,
 *     semanaPrevista, porcentaje, semanaReal, estado.
 */
export function buildDemandaFromHallazgo(params: {
  miniStep: 4 | 5;
  revisorName: string;
  zonaName?: string;
  responsableZonaName?: string;
}): Record<string, any> {
  const { miniStep, revisorName, zonaName, responsableZonaName } = params;
  const seccionDemandante = miniStep === 5 ? 'Auditoría' : 'Autoevaluación';
  return {
    fechaEntrada: new Date().toISOString().split('T')[0],
    semana: getWeekFromDate(),
    comunicadoPor: revisorName || null,
    seccionDemandante,
    clienteZona: zonaName || null,
    personaDemandada: responsableZonaName || null,
    seccionDemandada: zonaName || null,
    enviado: 'Pendiente',
    tipo: 'hallazgo' as ActionTipo,
    status: 'nok',
    porcentaje: 0,
  };
}

/**
 * Construye el payload de "Demanda" para un ActionItem generado
 * desde un item del Inventario (paso 3, S1-S4) marcado con una decisión
 * (retirar / eliminar / jaula / recolocar / etc.).
 *
 * Mapeo:
 *   Elemento + Ubicación → hallazgo (descripción)
 *   Ubicación            → clienteZona
 *   Categoría            → seccionDemandante (innecesario/dudoso/util/...)
 *   Responsable de zona  → personaDemandada
 *   Decisión             → seccionDemandada (acción demandada)
 *
 * El snapshot original del inventario se guarda en `extra` para que
 * el cierre de la acción pueda disparar la entrada en la jaula con
 * todos los datos (diasCuarentena, zonaOrigen, zonaDestino, etc.).
 */
export function buildDemandaFromInventario(params: {
  elemento: string;
  ubicacion?: string;
  categoria?: string;
  zonaName?: string;
  responsableZonaName?: string;
  decision?: string;
}): Record<string, any> {
  const { elemento, ubicacion, categoria, zonaName, responsableZonaName, decision } = params;
  const descripcion = [elemento, ubicacion && `(${ubicacion})`]
    .filter(Boolean)
    .join(' ');
  return {
    hallazgo: `${descripcion} — marcado para ${decision || 'acción'}`,
    fechaEntrada: new Date().toISOString().split('T')[0],
    semana: getWeekFromDate(),
    comunicadoPor: responsableZonaName || null,
    seccionDemandante: categoria || 'Inventario',
    clienteZona: zonaName || ubicacion || null,
    personaDemandada: responsableZonaName || null,
    seccionDemandada: decision || null,
    enviado: 'Pendiente',
    tipo: 'inventario' as ActionTipo,
  };
}

/**
 * Traduce el `source` legacy al nuevo `tipo` unificado.
 * Útil para migraciones de registros antiguos.
 */
export function sourceToTipo(source?: string | null): ActionTipo {
  if (source === 'inventario') return 'inventario';
  if (source === 'autoevaluacion' || source === 'auditoria') return 'hallazgo';
  return 'accion'; // 'actionplan' o null
}
