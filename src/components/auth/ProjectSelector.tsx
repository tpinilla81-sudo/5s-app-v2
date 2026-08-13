'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, MapPin, ChevronDown, Building2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { use5SStore } from '@/lib/store'

interface ProjectSelectorProps {
  onLogout: () => void
}

// Role helpers inline (mismo modelo que page.tsx)
const getRoleLabel = (role: string): string => {
  const map: Record<string, string> = {
    admin: 'Admin',
    gestor: 'Gestor',
    gerente: 'Gerente',
    responsable: 'Responsable',
    empleado: 'Empleado',
    auditor: 'Auditor',
  }
  return map[role] || role
}

const getRoleBadgeColor = (role: string): string => {
  const map: Record<string, string> = {
    admin: 'bg-red-100 text-red-700',
    gestor: 'bg-purple-100 text-purple-700',
    gerente: 'bg-blue-100 text-blue-700',
    responsable: 'bg-green-100 text-green-700',
    empleado: 'bg-gray-100 text-gray-700',
    auditor: 'bg-orange-100 text-orange-700',
  }
  return map[role] || 'bg-gray-100 text-gray-700'
}

export function ProjectSelector({ onLogout }: ProjectSelectorProps) {
  const {
    currentUser,
    projects,
    userZones,
    selectProjectAndZone,
    fetchProjects,
    fetchUserZones,
  } = use5SStore()

  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Refresh projects + user zones on mount (in case data is stale)
  useMemo(() => {
    setLoading(true)
    Promise.all([fetchProjects(), fetchUserZones()]).finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Determine which zones to show per project for the current user
  // - gestor/admin/gerente: all project zones
  // - empleado/responsable/auditor: only zones in userZones
  const isPrivileged =
    currentUser?.role === 'gestor' ||
    currentUser?.role === 'admin' ||
    currentUser?.role === 'gerente'

  const userZoneIds = useMemo(
    () => new Set((userZones || []).map((uz) => uz.id)),
    [userZones]
  )

  const getZonesForProject = (project: typeof projects[number]) => {
    if (isPrivileged) return project.zones || []
    return (project.zones || []).filter((z) => userZoneIds.has(z.id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10">
              <img src="/5s-logo.png" alt="5S" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base font-black text-gray-900 leading-tight">5S · by Método</h1>
              <p className="text-[11px] text-muted-foreground">Elige tu zona de trabajo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {currentUser && (
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white border">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${getRoleBadgeColor(currentUser.role)}`}>
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium leading-tight">{currentUser.name}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{getRoleLabel(currentUser.role)}</p>
                </div>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={onLogout} className="gap-1 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
              <LogOut className="h-3.5 w-3.5" />
              <span className="text-xs hidden sm:inline">Salir</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Hola {currentUser?.name?.split(' ')[0] || ''} 👋
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Selecciona el proyecto y la zona donde vas a trabajar hoy.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center gap-2 py-12">
            <Loader2 className="h-6 w-6 text-green-500 animate-spin" />
            <p className="text-xs text-muted-foreground">Cargando proyectos…</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-sm text-amber-800 mb-4">
              Tu cuenta aún no tiene proyectos asignados. Pide al administrador que te asigne uno.
            </p>
            <Button variant="outline" size="sm" onClick={onLogout} className="gap-1">
              <LogOut className="h-3.5 w-3.5" /> Cerrar Sesión
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => {
              const zones = getZonesForProject(project)
              const isExpanded = expandedId === project.id
              const hasZones = zones.length > 0

              return (
                <div
                  key={project.id}
                  className={`bg-white border rounded-xl shadow-sm transition-all ${
                    isExpanded ? 'ring-2 ring-green-300' : 'hover:shadow-md'
                  }`}
                >
                  {/* Tarjeta clickable */}
                  <button
                    disabled={!hasZones}
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    className={`w-full text-left p-4 flex items-start justify-between gap-3 ${
                      hasZones ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="h-4 w-4 text-green-600 shrink-0" />
                        <h3 className="font-bold text-gray-900 text-base truncate">{project.name}</h3>
                      </div>
                      {project.companyName && (
                        <p className="text-[11px] text-muted-foreground mb-1">
                          {project.companyName}
                        </p>
                      )}
                      {project.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] gap-1">
                          <MapPin className="h-2.5 w-2.5" />
                          {zones.length} zona{zones.length !== 1 ? 's' : ''}
                        </Badge>
                        {project.memberCount > 0 && (
                          <Badge variant="outline" className="text-[10px]">
                            {project.memberCount} miembro{project.memberCount !== 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {hasZones && (
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground shrink-0 mt-1 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* Zonas expandibles */}
                  <AnimatePresence>
                    {isExpanded && hasZones && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 pt-0 border-t bg-gradient-to-b from-gray-50 to-white">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold mb-2 mt-2 px-1">
                            Zonas accesibles
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {zones.map((zone) => {
                              const color = zone.color || '#3B82F6'
                              return (
                                <button
                                  key={zone.id}
                                  onClick={() => selectProjectAndZone(project, zone)}
                                  className="text-left p-2.5 rounded-lg border-2 transition-all hover:scale-[1.02] active:scale-[0.98] group"
                                  style={{
                                    borderColor: color,
                                    backgroundColor: `${color}10`,
                                  }}
                                >
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="w-3 h-3 rounded-full shrink-0"
                                      style={{ backgroundColor: color }}
                                    />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-semibold text-gray-900 truncate">
                                        {zone.name}
                                      </p>
                                      {zone.description && (
                                        <p className="text-[10px] text-muted-foreground truncate">
                                          {zone.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-[10px] text-right mt-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }}>
                                    Entrar →
                                  </p>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Sin zonas accesibles */}
                  {isExpanded && !hasZones && (
                    <div className="p-3 border-t bg-amber-50">
                      <p className="text-xs text-amber-700 text-center">
                        No tienes zonas asignadas en este proyecto. Pide al responsable que te adjudique una.
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
