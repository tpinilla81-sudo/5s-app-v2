'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, X, Plus, Trash2, AlertTriangle,
  CheckCircle2, Loader2, Wand2, Users,
} from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { splitZones, type InitialZone, type SubZone } from '../../lib/zone-generator'

export interface ZoneGeneratorWizardProps {
  projectId: string
  onClose: () => void
  onGenerated: () => void
}

interface CompanyUser {
  id: string
  name: string
  email: string
  role: string
}

interface ZoneConfig {
  maxM2PorZona: number
  questionLabels: { zonas: string; prefijo: string }
  defaultPrefix: string
}

let _tempIdCounter = 0
const nextTempId = () => `tmp-${Date.now()}-${_tempIdCounter++}`

export function ZoneGeneratorWizard({
  projectId, onClose, onGenerated,
}: ZoneGeneratorWizardProps) {
  // ─── Estado ───────────────────────────────────────────────────────
  const [zonasIniciales, setZonasIniciales] = useState<InitialZone[]>([
    { tempId: nextTempId(), nombre: 'Z1', m2: 0, empleados: 1 },
  ])
  const [empleados, setEmpleados] = useState<CompanyUser[]>([])
  const [zoneConfig, setZoneConfig] = useState<ZoneConfig | null>(null)
  const [loadingConfig, setLoadingConfig] = useState(true)
  const [subZonasRenombradas, setSubZonasRenombradas] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ─── Cargar config del gestor + usuarios de la empresa ────────────
  useEffect(() => {
    (async () => {
      try {
        const [configRes, usersRes] = await Promise.all([
          fetch('/api/zone-config'),
          fetch('/api/users'),
        ])
        if (configRes.ok) {
          setZoneConfig(await configRes.json())
        }
        if (usersRes.ok) {
          const data = await usersRes.json()
          // Solo empleados / responsables activos de la empresa del proyecto
          const filtered = (data.users || data).filter(
            (u: CompanyUser) => u.active && ['empleado', 'responsable'].includes(u.role)
          )
          setEmpleados(filtered)
        }
      } catch (e) {
        console.error('Wizard load error:', e)
      } finally {
        setLoadingConfig(false)
      }
    })()
  }, [])

  // ─── Cálculo en vivo ─────────────────────────────────────────────
  const splitResult = useMemo(() => {
    if (!zoneConfig) return null
    const valid = zonasIniciales.filter(z => z.m2 > 0 && z.nombre.trim())
    if (valid.length === 0) return null
    return splitZones(valid, zoneConfig.maxM2PorZona, zoneConfig.defaultPrefix)
  }, [zonasIniciales, zoneConfig])

  // ─── Handlers de la tabla de zonas iniciales ─────────────────────
  const updateZona = (tempId: string, field: keyof InitialZone, value: string | number) => {
    setZonasIniciales(prev => prev.map(z =>
      z.tempId === tempId ? { ...z, [field]: value } : z
    ))
  }
  const addZona = () => {
    setZonasIniciales(prev => [...prev, {
      tempId: nextTempId(),
      nombre: `Z${prev.length + 1}`,
      m2: 0,
      empleados: 1,
    }])
  }
  const removeZona = (tempId: string) => {
    setZonasIniciales(prev => prev.length > 1 ? prev.filter(z => z.tempId !== tempId) : prev)
  }

  const getEmpleadoName = (idx: number) => {
    if (idx < 0 || idx >= empleados.length) return '— sin asignar —'
    return empleados[idx]?.name || '—'
  }

  // ─── Submit ───────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!splitResult) return
    setSubmitting(true)
    setError(null)

    // Construir payload: sub-zonas con nombre renombrado + empleados
    const subZonasPayload = splitResult.subZonas.map(sz => ({
      nombre: subZonasRenombradas[sz.tempId] || sz.nombre,
      m2: sz.m2,
      empleadoIndex: sz.empleadoIndex,
    }))

    const empleadosPayload = empleados.map(u => ({
      userId: u.id,
      role: u.role || 'empleado',
    }))

    try {
      const res = await fetch(`/api/projects/${projectId}/generate-zones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subZonas: subZonasPayload,
          empleados: empleadosPayload,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Error al generar zonas')
        setSubmitting(false)
        return
      }
      onGenerated()
      onClose()
    } catch (e) {
      setError('Error de conexión al generar zonas')
      setSubmitting(false)
    }
  }

  // ─── Render ──────────────────────────────────────────────────────
  if (loadingConfig) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 text-center">
          <Loader2 className="h-6 w-6 animate-spin text-purple-600 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-900">Cargando configuración…</p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Si esto tarda más de 10 segundos, cierra y vuelve a abrir.
          </p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 8 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 8 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-purple-50 to-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Wand2 className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Generar zonas con algoritmo</h3>
              <p className="text-[11px] text-muted-foreground">
                Nombra las zonas · da m² + empleados · el algoritmo divide según m² máx ({zoneConfig?.maxM2PorZona || 800} m²)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-gray-900">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* ─── Empleados disponibles ────────────────────────────────── */}
          <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-blue-700" />
              <span className="text-xs font-semibold text-blue-900">
                Empleados disponibles ({empleados.length})
              </span>
            </div>
            {empleados.length === 0 ? (
              <p className="text-[11px] text-amber-700">
                ⚠ No hay empleados activos en la empresa. Crea usuarios en <strong>Datos Empresa → Usuarios</strong> antes de generar zonas.
              </p>
            ) : (
              <p className="text-[11px] text-muted-foreground">
                Se asignarán en orden: zona 1 → empleado 1, zona 2 → empleado 2… Si faltan, el último se repite.
              </p>
            )}
          </div>

          {/* ─── Tabla de zonas iniciales ───────────────────────────── */}
          <div>
            <Label className="text-xs font-semibold mb-2 block">
              {zoneConfig?.questionLabels?.zonas || 'Zonas iniciales (nombre + m² + empleados)'}
            </Label>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Nombre</th>
                    <th className="text-left px-3 py-2 font-semibold text-muted-foreground w-24">m²</th>
                    <th className="text-left px-3 py-2 font-semibold text-muted-foreground w-28">Empleados</th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody>
                  {zonasIniciales.map((z) => (
                    <tr key={z.tempId} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-3 py-2">
                        <Input
                          value={z.nombre}
                          onChange={(e) => updateZona(z.tempId, 'nombre', e.target.value)}
                          className="h-8 text-xs"
                          placeholder="Z1"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <Input
                          type="number" min={0} step={1}
                          value={z.m2 || ''}
                          onChange={(e) => updateZona(z.tempId, 'm2', parseFloat(e.target.value) || 0)}
                          className="h-8 text-xs"
                          placeholder="0"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <Input
                          type="number" min={0} step={1}
                          value={z.empleados}
                          onChange={(e) => updateZona(z.tempId, 'empleados', parseInt(e.target.value) || 0)}
                          className="h-8 text-xs"
                          placeholder="1"
                        />
                      </td>
                      <td className="px-2 text-center">
                        <button
                          onClick={() => removeZona(z.tempId)}
                          disabled={zonasIniciales.length <= 1}
                          className="text-red-500 hover:text-red-700 disabled:opacity-30"
                          title="Eliminar zona"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button
              size="sm" variant="outline" onClick={addZona}
              className="mt-2 h-7 text-[11px]"
            >
              <Plus className="h-3 w-3 mr-1" /> Añadir zona
            </Button>
          </div>

          {/* ─── Preview del cálculo ───────────────────────────────── */}
          {splitResult && splitResult.subZonas.length > 0 && (
            <div className="rounded-lg border border-purple-200 bg-purple-50/40 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-purple-900">
                  Resultado del cálculo
                </span>
                <span className="text-[11px] text-purple-700">
                  {splitResult.subZonas.length} zona(s) final(es) + 1 jaula
                </span>
              </div>

              {/* Sub-zonas resultantes (renombrables) */}
              <div className="space-y-1.5">
                {splitResult.subZonas.map((sz) => (
                  <div key={sz.tempId} className="flex items-center gap-2 bg-white rounded border border-purple-100 px-2 py-1.5">
                    <Input
                      value={subZonasRenombradas[sz.tempId] ?? sz.nombre}
                      onChange={(e) => setSubZonasRenombradas(prev => ({
                        ...prev,
                        [sz.tempId]: e.target.value,
                      }))}
                      className="h-7 text-xs flex-1"
                      placeholder={sz.nombre}
                    />
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                      {sz.m2} m²
                    </span>
                    <span className={`text-[11px] px-2 py-0.5 rounded ${
                      sz.empleadoRepetido
                        ? 'bg-amber-100 text-amber-800'
                        : sz.empleadoIndex < 0
                          ? 'bg-red-100 text-red-700'
                          : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {sz.empleadoIndex < 0 ? (
                        '— sin empleado —'
                      ) : (
                        <>
                          {sz.empleadoRepetido && '⚠ '}
                          {getEmpleadoName(sz.empleadoIndex)}
                        </>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Warnings */}
              {splitResult.warnings.length > 0 && (
                <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-800 space-y-0.5">
                  {splitResult.warnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-1">
                      <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Resumen */}
              <div className="mt-2 pt-2 border-t border-purple-200 text-[11px] text-muted-foreground flex justify-between">
                <span>Empleados únicos usados: <strong>{splitResult.empleadosUnicos}</strong></span>
                <span>Repetidos: <strong>{splitResult.empleadosRepetidos}</strong></span>
              </div>
            </div>
          )}

          {!splitResult && (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3 text-center text-[11px] text-muted-foreground">
              Rellena m² en las zonas iniciales para ver el cálculo.
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-[11px] text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t bg-gray-50 flex items-center justify-between gap-2 sticky bottom-0">
          <p className="text-[10px] text-muted-foreground">
            Al generar, se crean las zonas + asigna empleados + jaula física (S1).
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose} className="h-8 text-xs">
              Cancelar
            </Button>
            <Button
              size="sm" onClick={handleGenerate}
              disabled={!splitResult || submitting}
              className="h-8 text-xs bg-purple-600 hover:bg-purple-700 text-white"
              title={empleados.length === 0 ? 'No hay empleados asignados — se crearán las zonas sin asignar' : undefined}
            >
              {submitting ? (
                <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Generando…</>
              ) : (
                <><Sparkles className="h-3 w-3 mr-1" /> Generar {splitResult?.subZonas.length || 0} zona(s)</>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
