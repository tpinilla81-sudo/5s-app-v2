/**
 * Helpers compartidos para la unificación de tablas
 * Inventario (paso 3, S1-S4) + Plan de Acción (paso 3, S5) +
 * Autoevaluación (paso 4) + Auditoría (paso 5).
 *
 * Todas estas fuentes generan ActionItems que se muestran en una
 * tabla unificada con las mismas columnas Hallazgo / Acción / Seguimiento.
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
 *
 * v2.78 — Renombrado de concepto "Demanda" → "Hallazgo":
 *   - helper buildDemandaFromHallazgo → buildHallazgoFromNok
 *   - helper buildDemandaFromInventario → buildHallazgoFromInventario
 *   - El payload ya NO incluye los campos legacy de texto (comunicadoPor,
 *     personaDemandada, responsable) — el backend los resuelve por sesión
 *     y por FK (comunicadoPorId, personaDemandadaId).
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

// ─── v2.82: Auto-clasificación del campo Impacto ───────────────────────────
//
// El campo `impactoObjetivo` (mostrado como "Impacto" en la tabla HALLAZGO)
// ahora se autorellena con uno de tres indicadores:
//
//   • CALIDAD DE PRODUCTO        — hallazgos que afectan a materiales,
//                                   productos, identificación de stock,
//                                   anomalías de calidad.
//   • MEJORA TIEMPOS             — hallazgos que afectan a estandarización,
//                                   organización del flujo, indicadores,
//                                   documentación, eficiencia del puesto.
//   • RIESGOS DE ACCIDENTES      — hallazgos que afectan a máquinas, equipos
//                                   de elevación, EPIs, señalización de
//                                   seguridad, inspecciones de mantenimiento,
//                                   emergencias, suelos/pasillos.
//
// La lógica se basa en el sStep + itemId (NOKs de paso 4/5) y en la
// categoría + decisión (items del inventario, paso 3). Se elige la
// categoría más relevante; cuando un hallazgo podría encajar en varias
// (p. ej. una máquina mal señalizada), se prioriza RIESGOS DE ACCIDENTES
// porque la seguridad prevalece sobre calidad y eficiencia.
//
// Para items manuales del Plan de Acción (tipo='accion', sin sStep/itemId
// ni categoría), el Impacto se deja vacío — el usuario podrá rellenarlo
// manualmente.

export type ImpactoClasificacion =
  | 'CALIDAD'
  | 'MEJORA TIEMPOS'
  | 'RIESGOS DE ACCIDENTES';

/** Section IDs del checklist de auditoría que se consideran RIESGO. */
const RIESGO_SECTION_IDS = new Set([
  '1.2', // MÁQUINAS Y EQUIPOS (incluye elevación, transporte, ensayo)
  '1.4', // MOBILIARIO (bancos, paneles, sillas — obstáculos)
  '2.3', // SEÑALIZACIÓN (mandos, peligro, evacuación)
  '3.1', // MÁQUINAS O PUESTOS DE TRABAJO (físicos)
  '3.4', // MANTENER LIMPIO (EPIs, resbaladicidad, rutina)
  '3.5', // KIT DE LIMPIEZA (residuos peligrosos, contenedores)
  '4.3', // INSPECCIÓN Y MANTENIMIENTO (planes de inspección)
]);

/** Section IDs del checklist de auditoría que se consideran CALIDAD. */
const CALIDAD_SECTION_IDS = new Set([
  '1.1', // MATERIALES (consumibles, MP, producto acabado/en proceso)
  '1.3', // TRANSPORTE Y ALMACENAJE (contenedores, pallets, embalaje)
  '2.4', // STOCKS DE MATERIAL (identificación, etiquetas, referencias)
  '2.5', // LAYOUT (flujo de materiales, actualización)
  '5.2', // GESTIÓN DE ANOMALÍAS (declaración de anomalías = calidad)
]);

/** Items específicos de riesgo/seguridad dentro de secciones de calidad/mejora. */
const RIESGO_ITEM_IDS = new Set([
  '4.4.4', // Instrucciones visuales de emergencia (incendio, evacuación, derrame)
]);

/** Items específicos de calidad dentro de secciones de mejora. */
const CALIDAD_ITEM_IDS = new Set([
  '4.4.2', // Productos químicos identificados + ficha de seguridad
]);

/** Categorías del inventario (S1-S4) que implican RIESGO. */
const RIESGO_CATEGORIAS = /^(innecesario|dudoso|elevacion|epi|transporte|maquina|equipo)/i;

/** Decisiones del inventario que implican RIESGO (retirar = peligro inmediato). */
const RIESGO_DECISIONES = /^(retirar|eliminar|rebutir|deshechar|desechar)/i;

/** Categorías del inventario que implican CALIDAD (producto/material). */
const CALIDAD_CATEGORIAS = /^(producto|materia|consumible|stock|material|almacen)/i;

/**
 * Clasifica el impacto de un ActionItem en una de las tres categorías.
 *
 * @returns la clasificación, o `null` si no hay datos suficientes (entrada
 *          manual del Plan de Acción sin sStep/itemId/categoría).
 */
export function classifyImpacto(params: {
  sStep?: number | null;
  itemId?: string | null;
  categoria?: string | null;
  decision?: string | null;
}): ImpactoClasificacion | null {
  const { sStep, itemId, categoria, decision } = params;

  // 1) NOK de paso 4/5 — clasificar por sectionId del checklist
  if (sStep && itemId) {
    const sectionId = itemId.split('.').slice(0, 2).join('.');

    // Prioridad 1: RIESGOS DE ACCIDENTES (seguridad prevalece)
    if (RIESGO_ITEM_IDS.has(itemId) || RIESGO_SECTION_IDS.has(sectionId)) {
      return 'RIESGOS DE ACCIDENTES';
    }
    // Prioridad 2: CALIDAD DE PRODUCTO
    if (CALIDAD_ITEM_IDS.has(itemId) || CALIDAD_SECTION_IDS.has(sectionId)) {
      return 'CALIDAD';
    }
    // Resto de secciones (1.5, 2.1, 2.2, 2.6, 3.2, 3.3, 4.1, 4.2, 4.4 resto,
    // 4.5, 5.1, 5.3) → MEJORA TIEMPOS (estandarización, flujo, indicadores)
    return 'MEJORA TIEMPOS';
  }

  // 2) Inventario (paso 3) — clasificar por categoría + decisión
  if (categoria || decision) {
    const cat = categoria || '';
    const dec = decision || '';

    // Si la decisión es Retirar/Eliminar → es un peligro físico inmediato
    if (RIESGO_DECISIONES.test(dec)) {
      return 'RIESGOS DE ACCIDENTES';
    }
    // Categoría de máquina/equipo/EPI/elevación → riesgo
    if (RIESGO_CATEGORIAS.test(cat)) {
      return 'RIESGOS DE ACCIDENTES';
    }
    // Categoría de material/producto/stock → calidad
    if (CALIDAD_CATEGORIAS.test(cat)) {
      return 'CALIDAD';
    }
    // Resto (util, herramienta, mobiliario, información, limpieza, etc.)
    // → mejora de tiempos / eficiencia
    return 'MEJORA TIEMPOS';
  }

  // 3) Entrada manual del Plan de Acción — sin datos para clasificar
  return null;
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
 * Construye el payload de "Hallazgo" para un ActionItem generado
 * automáticamente desde una autoevaluación (paso 4) o auditoría (paso 5).
 *
 * Autocompleta:
 *   - fechaEntrada: hoy
 *   - semana: semana actual
 *   - seccionDemandante: 'Autoevaluación' | 'Auditoría'
 *   - clienteZona: nombre de la zona revisada
 *   - seccionDemandada: nombre de la zona (fallback si no hay sección)
 *   - enviado: 'Pendiente'
 *   - tipo: 'hallazgo'
 *   - status: 'nok'
 *
 * v2.78 — Ya NO incluye:
 *   - comunicadoPor (texto) → el backend lo ignora y usa comunicadoPorId=session.user.id
 *   - personaDemandada (texto) → se resuelve vía personaDemandadaId (FK)
 *   - responsable (texto) → campo legacy eliminado, usar personaDemandadaId
 *
 * El caller debe pasar aparte comunicadoPorId=currentUser.id y
 * personaDemandadaId=zone.responsableId (si existe) al hacer POST /api/actions.
 */
export function buildHallazgoFromNok(params: {
  miniStep: 4 | 5;
  zonaName?: string;
  sStep?: number;
  itemId?: string;
  hallazgo?: string;
}): Record<string, any> {
  const { miniStep, zonaName, sStep, itemId, hallazgo } = params;
  const seccionDemandante = miniStep === 5 ? 'Auditoría' : 'Autoevaluación';

  // v2.81: resolver categoría/elemento desde el checklist de auditoría
  // (AUDIT_CHECKLISTS). El itemId tipo "1.1.3" se descompone en:
  //   - sectionId = "1.1" → buscar el title de la sección (categoría)
  //   - item.id = "1.1.3" → buscar la description del ítem (elemento)
  // La cantidad para NOKs de autoeval/auditoría siempre es 1 (un hallazgo).
  let categoria = '';
  let elemento = '';
  let cantidad = '';
  if (sStep && itemId) {
    try {
      // Import dinámico para evitar dependencia circular
      const { AUDIT_CHECKLISTS } = require('./5s-constants');
      const sections = AUDIT_CHECKLISTS[sStep] || [];
      const sectionId = itemId.split('.').slice(0, 2).join('.');
      const section = sections.find((s: any) => s.id === sectionId);
      const item = section?.items.find((i: any) => i.id === itemId);
      categoria = section?.title || '';
      elemento = item?.description || itemId;
      cantidad = '1';
    } catch { /* fallback: dejar vacío */ }
  }

  // v2.81: snapshot `extra` para NOKs de autoeval/auditoría con la misma
  // estructura que los items del inventario. Permite que el Plan de Acción
  // muestre Categoría/Elemento/Cantidad en la sección HALLAZGO.
  const extraSnapshot = (sStep && itemId) ? JSON.stringify({
    categoria,
    elemento,
    cantidad,
    decision: miniStep === 5 ? 'Auditar' : 'Autoevaluar',
    etiquetas: `S${sStep}`,
    zonaOrigen: zonaName || '',
    zonaDestino: '',
    sStep,
    itemId,
    capturedAt: new Date().toISOString(),
  }) : undefined;

  // v2.82: auto-clasificar el Impacto (CALIDAD / MEJORA TIEMPOS / RIESGOS)
  const impacto = classifyImpacto({ sStep, itemId, categoria, decision: miniStep === 5 ? 'Auditar' : 'Autoevaluar' });

  return {
    fechaEntrada: new Date().toISOString().split('T')[0],
    semana: getWeekFromDate(),
    seccionDemandante,
    clienteZona: zonaName || null,
    seccionDemandada: zonaName || null,
    enviado: 'Pendiente',
    tipo: 'hallazgo' as ActionTipo,
    status: 'nok',
    porcentaje: 0,
    // v2.82: impacto auto-clasificado
    ...(impacto ? { impactoObjetivo: impacto } : {}),
    // v2.81: snapshot `extra` para Categoría/Elemento/Cantidad en el Plan
    ...(extraSnapshot ? { extra: extraSnapshot } : {}),
  };
}

/**
 * Alias retrocompatible con v2.76 — mantener temporalmente para no romper
 * imports antiguos. Redirige a buildHallazgoFromNok ignorando revisorName
 * (que ya no se usa: el backend resuelve comunicadoPorId por sesión).
 *
 * @deprecated usar buildHallazgoFromNok
 */
export function buildDemandaFromHallazgo(params: {
  miniStep: 4 | 5;
  revisorName?: string;
  zonaName?: string;
  responsableZonaName?: string;
}): Record<string, any> {
  return buildHallazgoFromNok({
    miniStep: params.miniStep,
    zonaName: params.zonaName,
  });
}

/**
 * Construye el payload de "Hallazgo" para un ActionItem generado
 * desde un item del Inventario (paso 3, S1-S4) marcado con una decisión
 * (retirar / eliminar / jaula / recolocar / etc.).
 *
 * Mapeo:
 *   Elemento + Ubicación → hallazgo (descripción)
 *   Ubicación            → clienteZona
 *   Categoría            → seccionDemandante (innecesario/dudoso/util/...)
 *   Decisión             → seccionDemandada (acción demandada)
 *
 * v2.78 — Ya NO incluye responsable/comunicadoPor/personaDemandada (texto).
 * El caller debe pasar comunicadoPorId (quien marca la decisión en el
 * inventario) y personaDemandadaId (responsable de zona) al hacer POST.
 *
 * El snapshot original del inventario se guarda en `extra` para que
 * el cierre de la acción pueda disparar la entrada en la jaula con
 * todos los datos (diasCuarentena, zonaOrigen, zonaDestino, etc.).
 */
export function buildHallazgoFromInventario(params: {
  elemento: string;
  ubicacion?: string;
  categoria?: string;
  zonaName?: string;
  decision?: string;
}): Record<string, any> {
  const { elemento, ubicacion, categoria, zonaName, decision } = params;
  const descripcion = [elemento, ubicacion && `(${ubicacion})`]
    .filter(Boolean)
    .join(' ');
  // v2.82: auto-clasificar el Impacto según la categoría y la decisión
  // del inventario (Retirar/Eliminar → RIESGOS; Producto/Material → CALIDAD;
  // resto → MEJORA TIEMPOS).
  const impacto = classifyImpacto({ categoria, decision });
  return {
    hallazgo: `${descripcion} — marcado para ${decision || 'acción'}`,
    fechaEntrada: new Date().toISOString().split('T')[0],
    semana: getWeekFromDate(),
    seccionDemandante: categoria || 'Inventario',
    clienteZona: zonaName || ubicacion || null,
    seccionDemandada: decision || null,
    enviado: 'Pendiente',
    tipo: 'inventario' as ActionTipo,
    // v2.82: impacto auto-clasificado
    ...(impacto ? { impactoObjetivo: impacto } : {}),
  };
}

/** @deprecated usar buildHallazgoFromInventario */
export function buildDemandaFromInventario(params: {
  elemento: string;
  ubicacion?: string;
  categoria?: string;
  zonaName?: string;
  responsableZonaName?: string;
  decision?: string;
}): Record<string, any> {
  return buildHallazgoFromInventario(params);
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
