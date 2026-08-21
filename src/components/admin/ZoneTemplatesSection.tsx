'use client'

/**
 * ZoneTemplatesSection
 * ────────────────────
 * Sección que se muestra DENTRO de cada zona (en la pestaña Proyectos del
 * AdminPanel), ANTES de la lista de miembros.
 *
 * Muestra las plantillas asignadas a cada una de las 25 celdas (5S × 5 Pasos)
 * del tablero de la zona, y permite:
 *   1. Editar una plantilla → abre un Sheet con <TemplateManager embedded />
 *      filtrado por la empresa del proyecto (o Biblioteca del Sistema si gestor).
 *   2. Cambiar la plantilla asignada a una celda → abre un dropdown con todas
 *      las plantillas disponibles para ese (sStep, miniStep, type) de la empresa
 *      + biblioteca del sistema.
 *
 * El objetivo (v2.31) es que el flujo sea: crear zona → elegir plantillas →
 * adjudicar usuarios. Las plantillas ya no se gestionan en una pestaña
 * independiente del AdminPanel; el gestor las edita desde su propio panel
 * (pestaña "Plantillas Genéricas").
 */

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { use5SStore } from '../../lib/store'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '../ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import {
  BookOpen,
  LayoutGrid,
  Edit3,
  RefreshCw,
  Loader2,
  ChevronDown,
  ChevronRight,
  Library,
  AlertTriangle,
  Camera,
} from 'lucide-react'
import { S_STEPS } from '../../lib/5s-constants'
import TemplateManager from './TemplateManager'

// Paleta de colores por S step (debe coincidir con TemplateManager.tsx)
const S_COLORS: Record<number, string> = {
  1: '#8B5CF6',
  2: '#EAB308',
  3: '#3B82F6',
  4: '#F43F5E',
  5: '#F97316',
}

// ─── Tipos ─────────────────────────────────────────────────────────────────

interface SlotTemplate {
  id: string
  templateId: string
  sortOrder: number
  minPhotosOverride: number | null  // v2.35: override del límite de fotos
  template: {
    id: string
    type: string
    title: string
    sStep: number
    miniStep: number
    minPhotos: number | null  // v2.35: límite base definido en la plantilla
  }
}

interface BoardSlot {
  id: string
  boardConfigId: string
  sStep: number
  miniStep: number
  templates: SlotTemplate[]
}

interface AvailableTemplate {
  id: string
  title: string
  type: string
  companyId: string | null
  active: boolean
}

// ─── Mapeo de mini-step → tipos de plantilla ───────────────────────────────
// (Debe coincidir con MINI_STEP_TEMPLATE_TYPES en /api/board-configs/route.ts)
const MINI_STEP_TYPES: Record<number, { type: string; label: string }[]> = {
  1: [{ type: 'formacion', label: 'Formación' }, { type: 'examen', label: 'Examen' }],
  2: [{ type: 'fotos', label: 'Fotos' }],
  3: [{ type: 'inventario', label: 'Inventario' }],
  4: [{ type: 'autoevaluacion', label: 'Autoeval' }, { type: 'planaccion', label: 'Plan Acción' }],
  5: [{ type: 'auditoria', label: 'Auditoría' }],
}

const PASO_LABELS: Record<number, string> = {
  1: 'Formación y Exámenes',
  2: 'Fotografías',
  3: 'Inventario / Estándar',
  4: 'Autoevaluación / Plan',
  5: 'Auditoría',
}

// ─── Componente ────────────────────────────────────────────────────────────

interface ZoneTemplatesSectionProps {
  zoneId: string
  zoneName: string
  boardConfigId: string | null
  boardConfigName?: string | null
  boardConfigIsDefault?: boolean
  companyId: string | null
  companyName: string
}

export default function ZoneTemplatesSection({
  zoneId,
  zoneName,
  boardConfigId,
  boardConfigName,
  boardConfigIsDefault,
  companyId,
  companyName,
}: ZoneTemplatesSectionProps) {
  const { currentUser } = use5SStore()
  const [slots, setSlots] = useState<BoardSlot[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [expandedS, setExpandedS] = useState<number | null>(1) // S1 abierto por defecto
  const [sheetOpen, setSheetOpen] = useState(false)
  // Cambiar-plantilla picker state, por celda (sStep|miniStep|type)
  const [pickerCell, setPickerCell] = useState<string | null>(null)
  const [availableForCell, setAvailableForCell] = useState<AvailableTemplate[]>([])
  const [isLoadingAvail, setIsLoadingAvail] = useState(false)
  const [isSavingCell, setIsSavingCell] = useState<string | null>(null)

  // ¿Puede el usuario editar las plantillas (crear/cambiar contenido)?
  // - gestor → siempre (Biblioteca del Sistema + cualquier empresa)
  // - admin → plantillas de SU empresa
  // - responsable → solo autoevaluacion/auditoria de su empresa
  const isGestor = currentUser?.role === 'gestor'
  const isAdmin = currentUser?.role === 'admin'
  const isResponsable = currentUser?.role === 'responsable'
  const canManage = isGestor || isAdmin || isResponsable

  // v2.35: estado para edición del override de minPhotos por celda fotos
  const [photoLimitEditing, setPhotoLimitEditing] = useState<string | null>(null) // cellKey
  const [photoLimitValue, setPhotoLimitValue] = useState<string>('') // string para input controlado
  const [photoLimitSaving, setPhotoLimitSaving] = useState<string | null>(null) // cellKey

  // ─── Fetch slots ────────────────────────────────────────────────────────
  const fetchSlots = useCallback(async () => {
    if (!boardConfigId && !zoneId) return
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (boardConfigId) params.set('boardConfigId', boardConfigId)
      if (zoneId) params.set('zoneId', zoneId)
      const res = await fetch(`/api/board-slots?${params.toString()}`)
      const data = await res.json()
      if (data.success && Array.isArray(data.data)) {
        setSlots(data.data)
      } else {
        setSlots([])
      }
    } catch (e) {
      console.error('Error fetching board slots:', e)
      setSlots([])
    } finally {
      setIsLoading(false)
    }
  }, [boardConfigId, zoneId])

  useEffect(() => {
    fetchSlots()
  }, [fetchSlots])

  // ─── Helpers ────────────────────────────────────────────────────────────
  const getSlotForCell = (sStep: number, miniStep: number): BoardSlot | undefined =>
    slots.find(s => s.sStep === sStep && s.miniStep === miniStep)

  const getTemplateForCell = (sStep: number, miniStep: number, type: string): SlotTemplate | undefined => {
    const slot = getSlotForCell(sStep, miniStep)
    if (!slot) return undefined
    return slot.templates.find(t => t.template.type === type) || slot.templates[0]
  }

  const countAssigned = (): number => {
    let n = 0
    for (const sStep of [1, 2, 3, 4, 5]) {
      for (const miniStep of [1, 2, 3, 4, 5]) {
        const types = MINI_STEP_TYPES[miniStep] || []
        for (const { type } of types) {
          if (getTemplateForCell(sStep, miniStep, type)) n++
        }
      }
    }
    return n
  }

  // ─── Abrir picker de "Cambiar plantilla" ────────────────────────────────
  const openPicker = async (sStep: number, miniStep: number, type: string) => {
    const key = `${sStep}|${miniStep}|${type}`
    if (pickerCell === key) {
      setPickerCell(null)
      return
    }
    setPickerCell(key)
    setIsLoadingAvail(true)
    setAvailableForCell([])
    try {
      const res = await fetch(
        `/api/templates?type=${type}&sStep=${sStep}&miniStep=${miniStep}&includeInactive=true`
      )
      const data = await res.json()
      if (data.success && Array.isArray(data.data)) {
        setAvailableForCell(data.data)
      }
    } catch (e) {
      console.error('Error fetching available templates:', e)
    } finally {
      setIsLoadingAvail(false)
    }
  }

  // ─── Guardar nueva asignación ───────────────────────────────────────────
  const saveCellAssignment = async (
    sStep: number,
    miniStep: number,
    type: string,
    templateId: string | null
  ) => {
    if (!boardConfigId) {
      alert('Esta zona no tiene tablero asignado. Asigna un tablero a la zona primero.')
      return
    }
    const cellKey = `${sStep}|${miniStep}|${type}`
    setIsSavingCell(cellKey)
    try {
      // Mantener las demás plantillas del slot (otras type) y reemplazar solo la type seleccionada
      const slot = getSlotForCell(sStep, miniStep)
      const otherTemplateIds = (slot?.templates || [])
        .filter(t => t.template.type !== type)
        .map(t => t.templateId)
      const newTemplateIds = templateId
        ? [...otherTemplateIds, templateId]
        : otherTemplateIds

      const res = await fetch('/api/board-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          boardConfigId,
          sStep,
          miniStep,
          templateIds: newTemplateIds,
        }),
      })
      const data = await res.json()
      if (data.success) {
        // Refrescar slots
        await fetchSlots()
        setPickerCell(null)
      } else {
        alert('Error al guardar: ' + (data.error || 'desconocido'))
      }
    } catch (e) {
      console.error('Error saving cell:', e)
      alert('Error al guardar la asignación')
    } finally {
      setIsSavingCell(null)
    }
  }

  // v2.35: guardar override de minPhotos para una celda type='fotos'
  const savePhotoLimitOverride = async (slotTemplateId: string, value: string, cellKey: string) => {
    setPhotoLimitSaving(cellKey)
    try {
      const trimmed = value.trim()
      // Si vacío → eliminar override (null). Si número → validar y guardar.
      const override = trimmed === '' ? null : Number(trimmed)
      if (override !== null && (isNaN(override) || override < 0 || override > 1000)) {
        alert('El mínimo de fotos debe ser un número entre 0 y 1000, o vacío para heredar.')
        return
      }
      const res = await fetch('/api/photo-limits', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ boardSlotTemplateId: slotTemplateId, minPhotosOverride: override }),
      })
      const data = await res.json()
      if (data.success) {
        await fetchSlots() // refresca para reflejar el nuevo valor
        setPhotoLimitEditing(null)
      } else {
        alert('Error al guardar: ' + (data.error || 'desconocido'))
      }
    } catch (e) {
      console.error('Error saving photo limit override:', e)
      alert('Error al guardar el límite de fotos')
    } finally {
      setPhotoLimitSaving(null)
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────
  if (!canManage) {
    // Solo lectura (empleado/auditor/gerente no deberían ver esto normalmente,
    // pero por si acceden al AdminPanel por permisos, mostramos resumen)
    return null
  }

  const assignedCount = countAssigned()
  const totalCells = 25 // 5S × 5Pasos, aunque algunas celdas pueden tener 0 o 2 types

  return (
    <div className="rounded-md border border-emerald-200 bg-emerald-50/30 p-2.5 space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <BookOpen className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="text-xs font-semibold text-emerald-700">
            Plantillas de esta zona
          </span>
          <Badge className="text-[9px] px-1 py-0 bg-emerald-100 text-emerald-700 border-0">
            {assignedCount} asignada{assignedCount !== 1 ? 's' : ''}
          </Badge>
          {boardConfigName && (
            <Badge
              className={`text-[9px] px-1 py-0 border-0 ${
                boardConfigIsDefault
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-violet-100 text-violet-700'
              }`}
              title={
                boardConfigIsDefault
                  ? 'Esta zona usa el tablero predeterminado del sistema (compartido). Los cambios afectan a todas las zonas que lo usen.'
                  : `Tablero: ${boardConfigName}`
              }
            >
              <LayoutGrid className="h-2.5 w-2.5 mr-0.5 inline" />
              {boardConfigName}
              {boardConfigIsDefault && ' · predeterminado'}
            </Badge>
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-[11px] border-emerald-300 text-emerald-700 hover:bg-emerald-100"
          onClick={() => setSheetOpen(true)}
        >
          <Edit3 className="h-3 w-3 mr-1" />
          Editar plantillas
        </Button>
      </div>

      {boardConfigIsDefault && (
        <div className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1 flex items-start gap-1">
          <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
          <span>
            Esta zona usa el <strong>tablero predeterminado</strong> (compartido
            por todas las zonas sin tablero propio). Si cambias una plantilla
            aquí, el cambio se aplica a todas las zonas que compartan este
            tablero. Para personalizar solo esta zona, crea un tablero propio
            desde la sección de Tableros.
          </span>
        </div>
      )}

      {/* Grid 5S × 5Pasos */}
      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-5 w-5 text-emerald-500 animate-spin" />
          <span className="text-xs text-muted-foreground ml-2">Cargando plantillas…</span>
        </div>
      ) : (
        <div className="space-y-1.5">
          {S_STEPS.map(s => {
            const isExpanded = expandedS === s.id
            const sAssigned = [1, 2, 3, 4, 5].filter(miniStep => {
              const types = MINI_STEP_TYPES[miniStep] || []
              return types.some(({ type }) => getTemplateForCell(s.id, miniStep, type))
            }).length
            return (
              <div
                key={s.id}
                className="rounded-md border overflow-hidden"
                style={{ borderColor: S_COLORS[s.id] + '30' }}
              >
                {/* S header */}
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 cursor-pointer"
                  style={{ backgroundColor: S_COLORS[s.id] + '10' }}
                  onClick={() => setExpandedS(isExpanded ? null : s.id)}
                >
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-[10px] shrink-0"
                    style={{ backgroundColor: S_COLORS[s.id] }}
                  >
                    S{s.id}
                  </div>
                  <span className="text-xs font-semibold flex-1 text-left" style={{ color: S_COLORS[s.id] }}>
                    {s.japaneseName} <span className="text-muted-foreground font-normal">({s.spanishName})</span>
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[9px] px-1 py-0"
                    style={{ color: S_COLORS[s.id], borderColor: S_COLORS[s.id] + '40' }}
                  >
                    {sAssigned}/5
                  </Badge>
                  {isExpanded
                    ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                </button>

                {/* Cells */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-2 space-y-1.5 bg-white">
                        {[1, 2, 3, 4, 5].map(miniStep => {
                          const types = MINI_STEP_TYPES[miniStep] || []
                          return (
                            <div key={miniStep} className="space-y-1">
                              <div className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                                Paso {miniStep}: {PASO_LABELS[miniStep]}
                              </div>
                              {types.map(({ type, label }) => {
                                const assigned = getTemplateForCell(s.id, miniStep, type)
                                const cellKey = `${s.id}|${miniStep}|${type}`
                                const isPicking = pickerCell === cellKey
                                const isSaving = isSavingCell === cellKey
                                return (
                                  <>
                                  <div
                                    key={type}
                                    className="flex items-center gap-1.5 px-2 py-1 rounded border border-gray-100 bg-gray-50/50"
                                  >
                                    <span className="text-[10px] text-muted-foreground w-20 shrink-0">
                                      {label}
                                    </span>
                                    {assigned ? (
                                      <span
                                        className="text-xs flex-1 truncate text-gray-900"
                                        title={assigned.template.title}
                                      >
                                        {assigned.template.title}
                                      </span>
                                    ) : (
                                      <span className="text-xs flex-1 italic text-muted-foreground">
                                        Sin asignar
                                      </span>
                                    )}
                                    {isSaving ? (
                                      <Loader2 className="h-3 w-3 animate-spin text-emerald-500" />
                                    ) : isPicking ? (
                                      <Select
                                        value={assigned?.templateId || '__none__'}
                                        onValueChange={(val) => {
                                          const newId = val === '__none__' ? null : val
                                          saveCellAssignment(s.id, miniStep, type, newId)
                                        }}
                                      >
                                        <SelectTrigger className="h-6 text-[11px] flex-1 min-w-[140px]">
                                          <SelectValue placeholder="Elegir plantilla…" />
                                        </SelectTrigger>
                                        <SelectContent position="popper" side="top" className="max-h-72">
                                          <SelectItem value="__none__">
                                            <span className="text-muted-foreground italic">— Sin asignar —</span>
                                          </SelectItem>
                                          {isLoadingAvail ? (
                                            <SelectItem value="__loading__" disabled>
                                              Cargando…
                                            </SelectItem>
                                          ) : availableForCell.length === 0 ? (
                                            <SelectItem value="__empty__" disabled>
                                              No hay plantillas disponibles
                                            </SelectItem>
                                          ) : (
                                            availableForCell.map(tpl => (
                                              <SelectItem key={tpl.id} value={tpl.id}>
                                                <span className="flex items-center gap-1.5">
                                                  {tpl.companyId == null && (
                                                    <Library className="h-3 w-3 text-violet-500" />
                                                  )}
                                                  <span className="truncate">{tpl.title}</span>
                                                  {!tpl.active && (
                                                    <span className="text-[9px] text-amber-600">(inactiva)</span>
                                                  )}
                                                </span>
                                              </SelectItem>
                                            ))
                                          )}
                                        </SelectContent>
                                      </Select>
                                    ) : (
                                      <>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-6 px-1.5 text-[10px] text-blue-600 hover:text-blue-800"
                                          onClick={() => setSheetOpen(true)}
                                          title="Editar contenido de la plantilla (abre el editor)"
                                        >
                                          <Edit3 className="h-3 w-3" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-6 px-1.5 text-[10px] text-emerald-600 hover:text-emerald-800"
                                          onClick={() => openPicker(s.id, miniStep, type)}
                                          title="Cambiar la plantilla asignada a esta celda"
                                        >
                                          <RefreshCw className="h-3 w-3" />
                                        </Button>
                                      </>
                                    )}
                                  </div>

                                  {/* v2.35: override del límite de fotos (solo type='fotos' y con plantilla asignada) */}
                                  {type === 'fotos' && assigned && (
                                    <div className="ml-6 mb-1 flex items-center gap-1.5 px-2 py-1 rounded border border-amber-100 bg-amber-50/40">
                                      <Camera className="h-3 w-3 text-amber-600 shrink-0" />
                                      <span className="text-[10px] text-amber-700 font-medium shrink-0">Mín. fotos:</span>
                                      {photoLimitEditing === cellKey ? (
                                        <>
                                          <input
                                            type="number"
                                            min={0}
                                            max={1000}
                                            value={photoLimitValue}
                                            onChange={(e) => setPhotoLimitValue(e.target.value)}
                                            placeholder={String(assigned.template.minPhotos ?? 10)}
                                            className="h-5 w-16 text-[11px] px-1 border border-amber-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-400"
                                            autoFocus
                                            onKeyDown={(e) => {
                                              if (e.key === 'Enter') savePhotoLimitOverride(assigned.id, photoLimitValue, cellKey)
                                              if (e.key === 'Escape') setPhotoLimitEditing(null)
                                            }}
                                          />
                                          {photoLimitSaving === cellKey ? (
                                            <Loader2 className="h-3 w-3 animate-spin text-amber-600" />
                                          ) : (
                                            <>
                                              <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-5 px-1 text-[9px] text-emerald-700 hover:bg-emerald-100"
                                                onClick={() => savePhotoLimitOverride(assigned.id, photoLimitValue, cellKey)}
                                                title="Guardar"
                                              >
                                                Guardar
                                              </Button>
                                              <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-5 px-1 text-[9px] text-gray-500 hover:bg-gray-100"
                                                onClick={() => setPhotoLimitEditing(null)}
                                                title="Cancelar"
                                              >
                                                Cancelar
                                              </Button>
                                            </>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          <span className="text-[11px] font-semibold text-amber-800">
                                            {assigned.minPhotosOverride != null
                                              ? assigned.minPhotosOverride
                                              : (assigned.template.minPhotos ?? 10)}
                                          </span>
                                          {assigned.minPhotosOverride != null ? (
                                            <Badge className="text-[8px] px-1 py-0 bg-amber-200 text-amber-800 border-0">
                                              override zona
                                            </Badge>
                                          ) : (
                                            <span className="text-[9px] text-amber-600 italic">
                                              (hereda de plantilla: {assigned.template.minPhotos ?? 10})
                                            </span>
                                          )}
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-5 px-1 ml-auto text-[9px] text-amber-700 hover:bg-amber-100"
                                            onClick={() => {
                                              setPhotoLimitEditing(cellKey)
                                              setPhotoLimitValue(
                                                assigned.minPhotosOverride != null
                                                  ? String(assigned.minPhotosOverride)
                                                  : ''
                                              )
                                            }}
                                            title="Sobreescribir el mínimo para esta zona"
                                          >
                                            Cambiar
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  )}
                                  </>
                                )
                              })}
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      )}

      {/* Sheet con el editor completo de plantillas */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-3xl overflow-y-auto bg-white"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              Plantillas — {zoneName}
            </SheetTitle>
            <SheetDescription>
              Edita el contenido de las plantillas. Los cambios se aplican a
              todas las zonas que usen la misma plantilla.
              {isGestor
                ? ' Como gestor, editas la Biblioteca del Sistema (plantillas genéricas compartidas).'
                : ` Estás editando las plantillas de ${companyName} + la Biblioteca del Sistema (solo lectura).`}
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-6 -mt-2">
            <TemplateManager
              embedded
              overrideCompanyId={companyId}
              overrideCompanyName={companyName}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
