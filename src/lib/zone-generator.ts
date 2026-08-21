/**
 * Algoritmo de zonificación (v2.108 — ZONAS-VIRTUALES-2).
 *
 * Enfoque bottom-up (sin turnos):
 *   1. El admin nombra las zonas iniciales y para cada una da m² + nº de
 *      empleados que tiene.
 *   2. Regla del gestor (configurable): maxM2PorZona — si una zona supera
 *      este m², se divide en sub-zonas.
 *   3. Regla 1:1 empleado↔zona (objetivo, no límite duro): si sobran
 *      empleados, se reparten; si faltan, un mismo empleado cubre varias
 *      sub-zonas (warn al admin).
 *
 * Ejemplo:
 *   Zona inicial A: 1200 m², 2 empleados, maxM2=800
 *     → subdiv = ceil(1200/800) = 2
 *     → sub-zona A-1 (600 m², empleado 1)
 *     → sub-zona A-2 (600 m², empleado 2)
 *
 *   Zona inicial B: 1500 m², 1 empleado, maxM2=800
 *     → subdiv = ceil(1500/800) = 2
 *     → sub-zona B-1 (750 m², empleado 3)
 *     → sub-zona B-2 (750 m², empleado 3)  ← MISMO empleado (regla P2.A)
 *
 * El admin puede renombrar las sub-zonas manualmente antes de generarlas
 * (regla P1.B). El prefijo default ('Z', configurable por gestor) solo
 * propone nombres placeholder.
 */

export interface InitialZone {
  /** ID temporal para tracking UI (no se persiste) */
  tempId: string
  nombre: string
  m2: number
  empleados: number
}

export interface SubZone {
  /** ID temporal para tracking UI */
  tempId: string
  /** tempId de la zona inicial de la que proviene */
  parentTempId: string
  /** Nombre propuesto (Z1, Z2...) — generado por el cálculo, no editable */
  nombre: string
  /** v2.108.15 — Etiqueta opcional que el usuario puede añadir en el UI
   *  para identificar la zona con un nombre más descriptivo.
   *  No reemplaza a `nombre`, lo acompaña. Ej: Z1 · Línea de ensamblaje. */
  customLabel?: string
  m2: number
  /** Índice del empleado (0-based) en el array de empleados disponibles */
  empleadoIndex: number
  /** Indica si este empleado está repetido en otra sub-zona (warn) */
  empleadoRepetido: boolean
}

export interface SplitResult {
  subZonas: SubZone[]
  totalEmpleadosUsados: number
  empleadosUnicos: number
  empleadosRepetidos: number
  warnings: string[]
}

/**
 * Algoritmo principal. Reparte las zonas iniciales en sub-zonas según
 * maxM2PorZona, y asigna empleados (1 por sub-zona, sin repetir salvo
 * cuando no hay más disponibles).
 *
 * @param zonasIniciales Array de { nombre, m2, empleados }
 * @param maxM2PorZona  Límite de m² antes de dividir (del gestor)
 * @param prefix        Prefijo propuesto para sub-zonas (del gestor)
 */
export function splitZones(
  zonasIniciales: InitialZone[],
  maxM2PorZona: number,
  prefix: string = 'Z'
): SplitResult {
  const warnings: string[] = []
  const subZonas: SubZone[] = []
  let empleadoCounter = 0

  for (const inicial of zonasIniciales) {
    if (inicial.m2 <= 0 || inicial.empleados < 0) continue

    const subdiv = Math.max(1, Math.ceil(inicial.m2 / maxM2PorZona))
    const m2PorSub = inicial.m2 / subdiv

    // Reparto de empleados en las sub-zonas de esta zona inicial
    const empleadosZona = Math.max(0, inicial.empleados)

    for (let i = 0; i < subdiv; i++) {
      // Si hay empleados para esta sub-zona, usar uno nuevo
      // Si no hay más, reusar el último empleado de esta zona inicial
      //   (regla P2.A: el empleado único se asigna a cada zona)
      let empleadoIndex: number
      let empleadoRepetido = false

      if (i < empleadosZona) {
        // Primer empleado disponible de esta zona inicial
        empleadoIndex = empleadoCounter
        empleadoCounter++
      } else if (empleadosZona > 0) {
        // Reusar el último empleado (no hay más)
        empleadoIndex = empleadoCounter - 1
        empleadoRepetido = true
      } else {
        // No hay empleados en esta zona inicial → warn
        empleadoIndex = -1
        warnings.push(
          `La zona "${inicial.nombre}" no tiene empleados asignados.`
        )
      }

      const sufijo = subdiv > 1 ? `-${i + 1}` : ''
      const nombrePropuesto = `${inicial.nombre}${sufijo}` || `${prefix}-${subZonas.length + 1}`

      subZonas.push({
        tempId: `sz-${inicial.tempId}-${i}`,
        parentTempId: inicial.tempId,
        nombre: nombrePropuesto,
        m2: Math.round(m2PorSub * 100) / 100,
        empleadoIndex,
        empleadoRepetido,
      })
    }
  }

  // Calcular estadísticas de reutilización
  const empleadosUnicos = new Set(
    subZonas.filter(s => s.empleadoIndex >= 0).map(s => s.empleadoIndex)
  ).size
  const empleadosRepetidos = subZonas.filter(s => s.empleadoRepetido).length

  if (empleadosRepetidos > 0) {
    warnings.push(
      `${empleadosRepetidos} sub-zona(s) comparten empleado con otra sub-zona (falta personal).`
    )
  }

  return {
    subZonas,
    totalEmpleadosUsados: empleadoCounter,
    empleadosUnicos,
    empleadosRepetidos,
    warnings,
  }
}

/**
 * v2.108.13 — Cálculo de zonas ajustado con rango objetivo m² por zona.
 *
 * Objetivos del usuario:
 *   1. Cada zona debe quedar entre MIN_M2_ZONA (80) y MAX_M2_ZONA (150).
 *   2. "Sin picos": la distribución de m² por zona debe ser lo más
 *      uniforme posible. La diferencia entre la zona más grande y la
 *      más pequeña debe ser ≤ 1 m² (cuando sea posible).
 *   3. "Siempre sale exacto": la suma de m² de todas las zonas debe
 *      ser EXACTAMENTE igual a totalM2 (sin pérdidas por redondeo).
 *   4. Si faltan empleados (más zonas que empleados), se reutilizan.
 *      NUNCA se reparten m² fuera de rango para "cuadrar" empleados.
 *      El m² manda — el empleado se repite si hace falta.
 *   5. El cálculo es OPCIONAL — el usuario puede elegir modo Manual.
 *
 * Constantes del rango objetivo son parámetros (con defaults) para que el
 * gestor pueda ajustarlos en el futuro desde /api/zone-config si hace falta.
 *
 * Algoritmo:
 *   1. nZonasIdeal = round(totalM2 / ((MIN+MAX)/2))  // objetivo centrado
 *   2. Clamp nZonas para que m2PorZona caiga en [MIN, MAX]:
 *        - nMin = ceil(totalM2 / MAX)   (si menos, alguna zona > MAX)
 *        - nMax = floor(totalM2 / MIN)  (si más, alguna zona < MIN)
 *        - Si nMin > nMax (proyecto muy pequeño o muy grande), se
 *          afloja el rango y se notifica con warning.
 *   3. nZonasFinal = clamp(nZonasIdeal, nMin, nMax)
 *   4. m2Base = floor(totalM2 / nZonasFinal)   // parte entera
 *      resto  = totalM2 - m2Base * nZonasFinal // m² que sobran
 *   5. Repartir el resto: las primeras `resto` zonas reciben +1 m².
 *      Resultado: zonas de m2Base y m2Base+1 (diferencia ≤ 1 = sin picos).
 *   6. Asignar empleados 1:1; si hay más zonas que empleados, los
 *      últimos se reutilizan (empleadoRepetido=true, warning).
 *
 * Devuelve SplitResult para reutilizar la UI existente.
 */
export function calculateZonesFromTotals(
  totalM2: number,
  totalEmpleados: number,
  maxM2PorZona: number, // legacy — no se usa en este cálculo
  prefix: string = 'Z',
  minM2Zona: number = 80,
  maxM2Zona: number = 150
): SplitResult {
  const warnings: string[] = []
  const subZonas: SubZone[] = []

  // Validaciones básicas
  if (!Number.isFinite(totalM2) || totalM2 <= 0) {
    return {
      subZonas: [],
      totalEmpleadosUsados: 0,
      empleadosUnicos: 0,
      empleadosRepetidos: 0,
      warnings: ['El total de m² debe ser mayor que 0.'],
    }
  }
  if (!Number.isFinite(totalEmpleados) || totalEmpleados < 0) {
    totalEmpleados = 0
  }
  if (!Number.isFinite(minM2Zona) || minM2Zona <= 0) minM2Zona = 80
  if (!Number.isFinite(maxM2Zona) || maxM2Zona <= minM2Zona) maxM2Zona = 150

  // 1. Calcular nº ideal de zonas (centrado en el rango objetivo)
  const objetivoPorZona = (minM2Zona + maxM2Zona) / 2
  const nZonasIdeal = Math.max(1, Math.round(totalM2 / objetivoPorZona))

  // 2. Calcular nMin y nMax para que TODAS las zonas caigan en [MIN, MAX]
  let nMin = Math.max(1, Math.ceil(totalM2 / maxM2Zona))
  let nMax = Math.max(1, Math.floor(totalM2 / minM2Zona))
  let rangoAjustado = false

  // Si nMin > nMax: el proyecto es más pequeño que MIN o más grande que
  // cualquier reparto válido. Ej: totalM2=50 (< MIN=80) → nMax=0,
  // o totalM2=10000 con MIN=80 → nMax=125 pero nMin podría exigir más.
  // En ese caso aflojamos el rango y avisamos.
  if (nMin > nMax) {
    rangoAjustado = true
    // Si el proyecto es muy pequeño, creamos 1 zona con todo el m²
    if (totalM2 < minM2Zona) {
      nMin = 1
      nMax = 1
      warnings.push(
        `El proyecto tiene ${totalM2} m², menor que el mínimo por zona (${minM2Zona} m²). ` +
        `Se creará una única zona con todo el m².`
      )
    } else {
      // El proyecto es muy grande: no hay nº de zonas que mantenga todo en rango.
      // Elegimos nMin (todas las zonas tendrán como máximo MAX_M2_ZONA).
      nMax = nMin
      warnings.push(
        `Con ${totalM2} m² no es posible mantener todas las zonas entre ${minM2Zona} y ${maxM2Zona} m². ` +
        `Se crean ${nMin} zonas de ~${Math.round(totalM2 / nMin)} m² cada una ` +
        `(algunas pueden superar los ${maxM2Zona} m²).`
      )
    }
  }

  // 3. nº final de zonas = ideal clampeado a [nMin, nMax]
  let nZonasFinal: number
  if (nZonasIdeal < nMin) nZonasFinal = nMin
  else if (nZonasIdeal > nMax) nZonasFinal = nMax
  else nZonasFinal = nZonasIdeal

  // 4. Reparto exacto sin picos:
  //    m2Base = floor(totalM2 / nZonasFinal)
  //    resto  = totalM2 - m2Base * nZonasFinal
  //    Las primeras `resto` zonas reciben m2Base + 1
  //    Así la suma es exacta y la diferencia entre zonas es ≤ 1 m².
  const m2Base = Math.floor(totalM2 / nZonasFinal)
  const resto = totalM2 - m2Base * nZonasFinal

  // 5. Asignar empleados 1:1 con reutilización inteligente si faltan.
  // v2.108.14 — Si faltan empleados (más zonas que empleados), el o los
  // empleados repetidos se asignan a las zonas MÁS PEQUEÑAS, no a las
  // últimas. Lógica: el empleado que tiene que cubrir varias zonas
  // debería tener las más ligeras para que el reparto sea justo.
  let empleadoCounter = 0
  let empleadosRepetidos = 0

  // Construir el array de m² por zona (orden: las primeras `resto` son +1)
  const m2PorZona: number[] = []
  for (let i = 0; i < nZonasFinal; i++) {
    m2PorZona.push(i < resto ? m2Base + 1 : m2Base)
  }

  // 1ª pasada: asignar empleados únicos a las primeras `totalEmpleados` zonas
  const empleadoAsignado: number[] = new Array(nZonasFinal).fill(-1)
  const esRepetido: boolean[] = new Array(nZonasFinal).fill(false)

  if (totalEmpleados > 0) {
    // Ordenar zonas por m² descendente: las grandes reciben empleado único primero
    const indicesOrdenadosDesc = m2PorZona
      .map((m2, idx) => ({ m2, idx }))
      .sort((a, b) => b.m2 - a.m2)
      .map(x => x.idx)

    // Asignar empleados únicos a las zonas más grandes
    const empleadosAAsignar = Math.min(totalEmpleados, nZonasFinal)
    for (let i = 0; i < empleadosAAsignar; i++) {
      const zonaIdx = indicesOrdenadosDesc[i]
      empleadoAsignado[zonaIdx] = empleadoCounter
      empleadoCounter++
    }

    // 2ª pasada: las zonas sin empleado (las más pequeñas) reciben
    // el ÚLTIMO empleado disponible (regla P2.A).
    // Si hay solo 1 empleado, todas las zonas tienen ese mismo.
    if (nZonasFinal > totalEmpleados) {
      // El empleado a reutilizar es el último asignado (mayor índice)
      const empleadoRepetidoIdx = empleadoCounter - 1
      for (let i = 0; i < nZonasFinal; i++) {
        if (empleadoAsignado[i] === -1) {
          empleadoAsignado[i] = empleadoRepetidoIdx
          esRepetido[i] = true
          empleadosRepetidos++
        }
      }
    }
  }

  // Construir subZonas con el orden natural (Z1, Z2, ...)
  for (let i = 0; i < nZonasFinal; i++) {
    subZonas.push({
      tempId: `sz-${i}`,
      parentTempId: 'totals',
      nombre: `${prefix}${i + 1}`,
      m2: m2PorZona[i],
      empleadoIndex: empleadoAsignado[i],
      empleadoRepetido: esRepetido[i],
    })
  }

  // 6. Warnings informativos
  if (totalEmpleados === 0) {
    warnings.push(
      'No has indicado empleados. Las zonas se crearán sin responsable asignado.'
    )
  } else if (empleadosRepetidos > 0) {
    warnings.push(
      `${empleadosRepetidos} zona(s) comparten empleado con otra ` +
      `(faltan ${empleadosRepetidos} empleados para cubrir todas las zonas 1:1). ` +
      `El empleado repetido se asigna a las zonas más pequeñas para reparto justo.`
    )
  }

  // Validar que el reparto cumpla el rango (si no se ajustó)
  if (!rangoAjustado) {
    const m2Min = Math.min(...subZonas.map(s => s.m2))
    const m2Max = Math.max(...subZonas.map(s => s.m2))
    if (m2Min < minM2Zona || m2Max > maxM2Zona) {
      warnings.push(
        `Aviso: alguna zona queda fuera del rango objetivo ` +
        `[${minM2Zona}-${maxM2Zona}] m². ` +
        `Rango actual: ${m2Min}-${m2Max} m².`
      )
    }
  }

  return {
    subZonas,
    totalEmpleadosUsados: empleadoCounter,
    empleadosUnicos: empleadoCounter,
    empleadosRepetidos,
    warnings,
  }
}
