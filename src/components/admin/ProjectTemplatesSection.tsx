'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ChevronDown, ChevronUp, Building2, Crown } from 'lucide-react'
import { use5SStore } from '@/lib/store'
import TemplateManager from './TemplateManager'

interface ProjectTemplatesSectionProps {
  project: {
    id: string
    name: string
    company: string
    companyId: string | null
  }
  currentCompanyId: string | null
  currentCompanyName: string
}

/**
 * Sub-sección "Plantillas" dentro del detalle expandido de cada proyecto.
 *
 * Muestra un resumen compacto y, al expandir, todo el TemplateManager con
 * el contexto de empresa del proyecto activo. El admin/responsable puede
 * gestionar aquí sus plantillas (los tipos permitidos según rol).
 */
export default function ProjectTemplatesSection({
  project,
  currentCompanyId,
  currentCompanyName,
}: ProjectTemplatesSectionProps) {
  const { currentUser, setCurrentProject } = use5SStore()
  const [expanded, setExpanded] = useState(false)

  // El admin/responsable debe ver sus plantillas; el gestor no debería
  // llegar aquí porque usa GestorPanel, pero por seguridad mostramos solo lectura.
  const canManage = currentUser && ['admin', 'responsable', 'gestor'].includes(currentUser.role)
  if (!canManage) return null

  // Si el proyecto no tiene companyId (empresa legacy), avisamos — no se
  // pueden gestionar plantillas por empresa hasta vincularlo.
  const hasCompany = !!currentCompanyId

  // Cuando el usuario expande, hay que asegurar que currentProject del store
  // apunte al proyecto correcto (TemplateManager usa currentProject.companyId).
  const handleExpand = (next: boolean) => {
    if (next && currentUser) {
      // Solo set si el proyecto activo NO es este (evita re-fetch innecesario)
      const store = use5SStore.getState()
      if (store.currentProject?.id !== project.id) {
        // Buscamos el proyecto completo en el store (allProjects o projects)
        const fullProject = store.projects?.find(p => p.id === project.id) ||
                            (store as any).allProjects?.find((p: any) => p.id === project.id)
        if (fullProject) {
          setCurrentProject(fullProject)
        }
      }
    }
    setExpanded(next)
  }

  return (
    <div className="rounded-lg border border-green-200 bg-green-50/30 overflow-hidden">
      {/* Header — click to expand */}
      <button
        type="button"
        onClick={() => handleExpand(!expanded)}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-green-50/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-green-500/15 flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-green-600" />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-semibold text-gray-900 uppercase flex items-center gap-1">
              Plantillas
              <Badge className="ml-1 text-[9px] py-0 px-1.5 bg-blue-100 text-blue-700 border-0">
                <Building2 className="h-2.5 w-2.5 mr-0.5 inline" />
                {currentCompanyName}
              </Badge>
            </h4>
            <p className="text-[10px] text-muted-foreground">
              {hasCompany
                ? 'Gestiona las plantillas de formación, exámenes, checklists y auditorías de esta empresa'
                : 'Este proyecto no tiene empresa vinculada — vincula una empresa para habilitar la gestión de plantillas'}
            </p>
          </div>
        </div>
        {expanded ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
      </button>

      <AnimatePresence>
        {expanded && hasCompany && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-3 border-t border-green-200 bg-white">
              {/* Banner informativo */}
              <div className="mb-3 p-2 rounded-md bg-blue-50 border border-blue-100 flex items-start gap-2">
                <Crown className="h-3.5 w-3.5 text-violet-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-900 leading-relaxed">
                  Aquí gestionas las plantillas de <strong>{currentCompanyName}</strong>.
                  También verás las de la <strong>Biblioteca del Sistema</strong> (compartidas por
                  todas las empresas); para editarlas, usa <em>"Traer a mi empresa"</em> y
                  crearás una copia editable.
                  {currentUser?.role === 'responsable' && (
                    <>
                      {' '}
                      Como <strong>coordinador</strong>, solo puedes editar
                      <strong> autoevaluaciones</strong> y <strong>auditorías</strong>.
                    </>
                  )}
                </p>
              </div>

              {/* Embed TemplateManager — usa el currentProject del store
                  para saber qué empresa activa usar */}
              <TemplateManager embedded />

              {/* Footer actions */}
              <div className="mt-3 pt-2 border-t flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => setExpanded(false)} className="h-7 text-xs">
                  Cerrar plantillas
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
