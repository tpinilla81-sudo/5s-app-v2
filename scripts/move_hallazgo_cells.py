#!/usr/bin/env python3
"""
v2.80: en PlanDeAccionView.tsx, mover las celdas Categoría/Elemento/Cantidad
de la sección ACCIÓN a la sección HALLAZGO (justo después de 'Detectado por').

Estrategia: el bloque ACCIÓN actual tiene 6 <td> consecutivos (Categoría,
Elemento, Cantidad, Decisión, Etiqueta, Destino). Necesitamos:
  - Mover los 3 primeros (Categoría/Elemento/Cantidad) a HALLAZGO, después del </td>
    que cierra el <td> de "Detectado por"
  - Dejar los 3 últimos (Decisión/Etiqueta/Destino) en ACCIÓN
"""

import re
from pathlib import Path

FILE = Path("/home/z/my-project/src/components/5s/PlanDeAccionView.tsx")
src = FILE.read_text(encoding="utf-8")

# 1. Encontrar el bloque ACCIÓN de 6 celdas (líneas ~1005-1035)
#    y separarlo en dos partes: 3 primeras (Categoría/Elemento/Cantidad)
#    y 3 últimas (Decisión/Etiqueta/Destino).
#    Marcamos con el comentario "── ACCIÓN — v2.79: 6 columnas"

OLD_ACCION_BLOCK = """                        {/* ── ACCIÓN — v2.79: 6 columnas autorellenadas desde inventario (extra) ── */}
                        <td className={`px-1 py-1 border ${SECTION_COLORS.accion}`}>
                          <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.accionCategoria || '—'}>
                            {action.accionCategoria || '—'}
                          </div>
                        </td>
                        <td className={`px-1 py-1 border ${SECTION_COLORS.accion}`}>
                          <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.accionElemento || '—'}>
                            {action.accionElemento || '—'}
                          </div>
                        </td>
                        <td className={`px-1 py-1 border ${SECTION_COLORS.accion} text-center`}>
                          <div className="h-6 text-[10px] px-1 flex items-center justify-center text-gray-700 truncate">
                            {action.accionCantidad || '—'}
                          </div>
                        </td>
                        <td className={`px-1 py-1 border ${SECTION_COLORS.accion}`}>
                          <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.accionDecision || '—'}>
                            {action.accionDecision || '—'}
                          </div>
                        </td>
                        <td className={`px-1 py-1 border ${SECTION_COLORS.accion}`}>
                          <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.accionEtiqueta || '—'}>
                            {action.accionEtiqueta || '—'}
                          </div>
                        </td>
                        <td className={`px-1 py-1 border ${SECTION_COLORS.accion}`}>
                          <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.accionDestino || '—'}>
                            {action.accionDestino || '—'}
                          </div>
                        </td>"""

NEW_ACCION_BLOCK = """                        {/* ── ACCIÓN — v2.80: 3 columnas (decisión / etiqueta / destino) ── */}
                        <td className={`px-1 py-1 border ${SECTION_COLORS.accion}`}>
                          <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.accionDecision || '—'}>
                            {action.accionDecision || '—'}
                          </div>
                        </td>
                        <td className={`px-1 py-1 border ${SECTION_COLORS.accion}`}>
                          <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.accionEtiqueta || '—'}>
                            {action.accionEtiqueta || '—'}
                          </div>
                        </td>
                        <td className={`px-1 py-1 border ${SECTION_COLORS.accion}`}>
                          <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.accionDestino || '—'}>
                            {action.accionDestino || '—'}
                          </div>
                        </td>"""

# 2. Insertar Categoría/Elemento/Cantidad en HALLAZGO, justo después del </td>
#    que cierra la celda "Detectado por". Marcamos con el comentario existente.

OLD_DETECTADO_BLOCK = """                        {/* v2.79: Detectado por — read-only, con paso debajo */}
                        <td className={`px-1 py-1 border ${SECTION_COLORS.demandante}`}>
                          <div className="min-h-[24px] text-[10px] px-1 flex flex-col justify-center text-gray-700">
                            <div className="truncate font-medium" title={action.comunicadoPorName || '—'}>
                              {action.comunicadoPorName || '—'}
                            </div>
                            <div className="text-[9px] text-amber-700/80 truncate">
                              {(() => {
                                if (action.miniStep === 5) return 'Paso 5 · Auditoría';
                                if (action.miniStep === 4) return 'Paso 4 · Autoeval';
                                if (action.source === 'inventario') return 'Paso 3 · Inventario';
                                return 'Paso 3 · Plan S5';
                              })()}
                            </div>
                          </div>
                        </td>"""

NEW_DETECTADO_BLOCK = """                        {/* v2.80: Detectado por — read-only, con paso debajo */}
                        <td className={`px-1 py-1 border ${SECTION_COLORS.demandante}`}>
                          <div className="min-h-[24px] text-[10px] px-1 flex flex-col justify-center text-gray-700">
                            <div className="truncate font-medium" title={action.comunicadoPorName || '—'}>
                              {action.comunicadoPorName || '—'}
                            </div>
                            <div className="text-[9px] text-amber-700/80 truncate">
                              {(() => {
                                if (action.miniStep === 5) return 'Paso 5 · Auditoría';
                                if (action.miniStep === 4) return 'Paso 4 · Autoeval';
                                if (action.source === 'inventario') return 'Paso 3 · Inventario';
                                return 'Paso 3 · Plan S5';
                              })()}
                            </div>
                          </div>
                        </td>
                        {/* v2.80: Categoría / Elemento / Cantidad — autorellenados desde `extra` snapshot del ActionItem */}
                        <td className={`px-1 py-1 border ${SECTION_COLORS.demandante}`}>
                          <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.accionCategoria || '—'}>
                            {action.accionCategoria || '—'}
                          </div>
                        </td>
                        <td className={`px-1 py-1 border ${SECTION_COLORS.demandante}`}>
                          <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.accionElemento || '—'}>
                            {action.accionElemento || '—'}
                          </div>
                        </td>
                        <td className={`px-1 py-1 border ${SECTION_COLORS.demandante} text-center`}>
                          <div className="h-6 text-[10px] px-1 flex items-center justify-center text-gray-700 truncate">
                            {action.accionCantidad || '—'}
                          </div>
                        </td>"""

# Apply
assert OLD_DETECTADO_BLOCK in src, "No encontré el bloque Detectado por"
assert OLD_ACCION_BLOCK in src, "No encontré el bloque ACCIÓN de 6 celdas"

src = src.replace(OLD_DETECTADO_BLOCK, NEW_DETECTADO_BLOCK, 1)
src = src.replace(OLD_ACCION_BLOCK, NEW_ACCION_BLOCK, 1)

FILE.write_text(src, encoding="utf-8")
print("OK: celdas movidas Categoría/Elemento/Cantidad de ACCIÓN → HALLAZGO")
