'use client'

import * as React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Calendar } from '@/components/ui/calendar'
import { es } from 'date-fns/locale'
import { format, isToday, isPast, isSameDay, parseISO, addDays, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns'
import {
  CalendarDays,
  Clock,
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  ListTodo,
  ArrowDownToLine,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface TaskItem {
  id: string
  itemId: string
  itemDescription: string
  hallazgo: string
  mejora: string | null
  responsable: string | null
  personaDemandada: string | null
  prioridad: 'alta' | 'media' | 'baja'
  estado: 'abierta' | 'en_proceso' | 'resuelta' | 'cerrada'
  fechaLimite: string | null
  fechaCompromiso: string | null
  fechaResolucion: string | null
  fechaReal: string | null
  fechaEntrada: string | null
  porcentaje: number | null
  source: string
  sStep: number
  miniStep: number
  notas: string | null
  project?: { id: string; name: string; company: string } | null
  zone?: { id: string; name: string } | null
  _status: 'vencida' | 'hoy' | 'proxima' | 'sin_fecha'
}

interface Stats {
  total: number
  vencidas: number
  hoy: number
  proximas: number
  sinFecha: number
}

interface UserTaskCalendarProps {
  open: boolean
  onClose: () => void
  userId: string
  projectId?: string
  userName?: string
  onOpenActionPlan?: (itemId?: string) => void
}

export function UserTaskCalendar({
  open,
  onClose,
  userId,
  projectId,
  userName,
  onOpenActionPlan,
}: UserTaskCalendarProps) {
  const [tasks, setTasks] = React.useState<TaskItem[]>([])
  const [stats, setStats] = React.useState<Stats | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [showCompleted, setShowCompleted] = React.useState(false)
  const [updatingId, setUpdatingId] = React.useState<string | null>(null)
  const [view, setView] = React.useState<'calendar' | 'list'>('calendar')
  // v2.74.5: citas de evaluación programadas (autoeval/auditoría)
  const [evalSchedules, setEvalSchedules] = React.useState<any[]>([])

  const fetchData = React.useCallback(async () => {
    if (!userId) return
    setLoading(true)
    try {
      const params = new URLSearchParams({ userId })
      if (projectId) params.set('projectId', projectId)
      if (showCompleted) params.set('showCompleted', 'true')
      const res = await fetch(`/api/my-tasks?${params.toString()}`)
      const json = await res.json()
      if (json.success) {
        setTasks(json.data || [])
        setStats(json.stats || null)
      }
      // v2.74.5: cargar también las citas de evaluación donde el usuario
      // es responsable OR empleado. Solo si tiene projectId.
      if (projectId) {
        try {
          const sres = await fetch(`/api/evaluation-schedule?userId=${userId}&projectId=${projectId}`)
          const sjson = await sres.json()
          if (sjson?.success && Array.isArray(sjson.data)) {
            setEvalSchedules(sjson.data)
          } else {
            setEvalSchedules([])
          }
        } catch {
          setEvalSchedules([])
        }
      }
    } catch (e) {
      console.error('Error fetching tasks:', e)
    } finally {
      setLoading(false)
    }
  }, [userId, projectId, showCompleted])

  React.useEffect(() => {
    if (open) fetchData()
  }, [open, fetchData])

  // v2.61: Group by BOTH fechaEntrada (when hallazgo entered) AND fechaLimite (cumplimiento)
  const entradasByDate = React.useMemo(() => {
    const map = new Map<string, TaskItem[]>()
    for (const t of tasks) {
      if (!t.fechaEntrada) continue
      const key = format(parseISO(t.fechaEntrada), 'yyyy-MM-dd')
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(t)
    }
    return map
  }, [tasks])

  const vencimientosByDate = React.useMemo(() => {
    const map = new Map<string, TaskItem[]>()
    for (const t of tasks) {
      if (!t.fechaLimite) continue
      const key = format(parseISO(t.fechaLimite), 'yyyy-MM-dd')
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(t)
    }
    // v2.74.5: añadir citas de evaluación programadas (autoeval/auditoría)
    // como eventos en el calendario. Se muestran como "vencimientos" (citas
    // próximas) para que aparezcan tanto en la vista de calendario como en
    // la lista. Construímos un TaskItem "virtual" para reutilizar la UI.
    for (const sch of evalSchedules) {
      if (!sch.fechaProgramada) continue
      if (sch.estado === 'cancelada' || sch.estado === 'realizada') continue
      const key = format(parseISO(sch.fechaProgramada), 'yyyy-MM-dd')
      const isAutoeval = sch.miniStep === 4
      const virtualTask: TaskItem = {
        id: `eval-${sch.id}`,
        itemId: `eval-${sch.id}`,
        itemDescription: `${isAutoeval ? 'Autoevaluación' : 'Auditoría'} S${sch.sStep} programada${sch.horaProgramada ? ' — ' + sch.horaProgramada : ''}`,
        hallazgo: sch.notas || `Cita de ${isAutoeval ? 'autoevaluación' : 'auditoría'} de S${sch.sStep} programada${sch.horaProgramada ? ' a las ' + sch.horaProgramada : ''}. Zona: ${sch.zone?.name || 'sin zona'}.`,
        mejora: null,
        responsable: null,
        personaDemandada: null,
        prioridad: 'media' as const,
        estado: 'abierta' as const,
        fechaLimite: sch.fechaProgramada,
        fechaCompromiso: null,
        fechaResolucion: null,
        fechaReal: null,
        fechaEntrada: null,
        porcentaje: null,
        source: 'evaluation_schedule',
        sStep: sch.sStep,
        miniStep: sch.miniStep,
        notas: sch.estado,
        project: sch.project,
        zone: sch.zone,
        _status: 'proxima' as const,
      }
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(virtualTask)
    }
    return map
  }, [tasks, evalSchedules])

  const vencidas = tasks.filter((t) => t._status === 'vencida')
  const hoy = tasks.filter((t) => t._status === 'hoy')
  const proximas = tasks.filter((t) => t._status === 'proxima')
  const sinFecha = tasks.filter((t) => t._status === 'sin_fecha')

  // v2.74.5: las citas de evaluación NO son ActionItems — las añadimos
  // a 'proximas' manualmente para que aparezcan en la lista lateral.
  // (El vencimientosByDate ya las incluye para la vista de calendario.)
  const evalProximas = evalSchedules
    .filter(s => s.fechaProgramada && s.estado !== 'cancelada' && s.estado !== 'realizada')
    .map(sch => {
      const isAutoeval = sch.miniStep === 4
      return {
        id: `eval-${sch.id}`,
        itemId: `eval-${sch.id}`,
        itemDescription: `${isAutoeval ? 'Autoevaluación' : 'Auditoría'} S${sch.sStep} programada${sch.horaProgramada ? ' — ' + sch.horaProgramada : ''}`,
        hallazgo: sch.notas || `Cita de ${isAutoeval ? 'autoevaluación' : 'auditoría'} de S${sch.sStep} programada${sch.horaProgramada ? ' a las ' + sch.horaProgramada : ''}. Zona: ${sch.zone?.name || 'sin zona'}.`,
        mejora: null,
        responsable: null,
        personaDemandada: null,
        prioridad: 'media' as const,
        estado: 'abierta' as const,
        fechaLimite: sch.fechaProgramada,
        fechaCompromiso: null,
        fechaResolucion: null,
        fechaReal: null,
        fechaEntrada: null,
        porcentaje: null,
        source: 'evaluation_schedule',
        sStep: sch.sStep,
        miniStep: sch.miniStep,
        notas: sch.estado,
        project: sch.project,
        zone: sch.zone,
        _status: 'proxima' as const,
      } as TaskItem
    })

  // Tasks for selected date in calendar view — split into entradas / vencimientos
  const tasksForSelectedDate = React.useMemo(() => {
    if (!selectedDate) return { entradas: [], vencimientos: [] }
    const key = format(selectedDate, 'yyyy-MM-dd')
    return {
      entradas: entradasByDate.get(key) || [],
      vencimientos: vencimientosByDate.get(key) || [],
    }
  }, [selectedDate, entradasByDate, vencimientosByDate])

  // Update task status
  async function updateTask(id: string, estado: string) {
    setUpdatingId(id)
    try {
      const res = await fetch('/api/my-tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, estado }),
      })
      const json = await res.json()
      if (json.success) {
        await fetchData()
      }
    } catch (e) {
      console.error('Error updating task:', e)
    } finally {
      setUpdatingId(null)
    }
  }

  // Custom day render — show TWO markers per day:
  //  ▼ blue  = fecha de entrada (hallazgo entered Plan)
  //  ● red   = fecha de cumplimiento (deadline, color by status)
  const modifiers = {
    hasEntrada: (date: Date) => entradasByDate.has(format(date, 'yyyy-MM-dd')),
    hasVencimiento: (date: Date) => vencimientosByDate.has(format(date, 'yyyy-MM-dd')),
  }

  const modifiersClassNames = {
    hasEntrada: 'relative font-medium',
    hasVencimiento: 'relative font-medium',
  }

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-2xl md:max-w-3xl overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <CalendarDays className="h-5 w-5 text-blue-600" />
            Mi Calendario de Acciones
          </SheetTitle>
          <SheetDescription>
            {userName
              ? `Hallazgos y cumplimientos asignados a ${userName}.`
              : 'Hallazgos y cumplimientos del Plan de Acción.'}
          </SheetDescription>
          {/* Leyenda v2.61 */}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
              Entrada de hallazgo
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
              Vencida
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />
              Vence hoy
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              Próxima
            </span>
          </div>
        </SheetHeader>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-4 gap-2 mb-4">
            <StatCard
              label="Vencidas"
              value={stats.vencidas}
              color="red"
              icon={<AlertTriangle className="h-3.5 w-3.5" />}
            />
            <StatCard
              label="Hoy"
              value={stats.hoy}
              color="orange"
              icon={<Clock className="h-3.5 w-3.5" />}
            />
            <StatCard
              label="Próximas"
              value={stats.proximas}
              color="blue"
              icon={<CircleDot className="h-3.5 w-3.5" />}
            />
            <StatCard
              label="Sin fecha"
              value={stats.sinFecha}
              color="gray"
              icon={<ListTodo className="h-3.5 w-3.5" />}
            />
          </div>
        )}

        {/* View toggle */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex bg-muted rounded-md p-0.5">
            <Button
              size="sm"
              variant={view === 'calendar' ? 'default' : 'ghost'}
              onClick={() => setView('calendar')}
              className="text-xs h-7"
            >
              <CalendarDays className="h-3.5 w-3.5 mr-1" /> Calendario
            </Button>
            <Button
              size="sm"
              variant={view === 'list' ? 'default' : 'ghost'}
              onClick={() => setView('list')}
              className="text-xs h-7"
            >
              <ListTodo className="h-3.5 w-3.5 mr-1" /> Lista
            </Button>
          </div>
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="h-3.5 w-3.5"
            />
            Mostrar completadas
          </label>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : view === 'calendar' ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={es}
                weekStartsOn={1}
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
                className="rounded-md border"
                components={{
                  DayButton: (props: any) => {
                    const date = props?.day?.date
                    let entradas: TaskItem[] = []
                    let vencimientos: TaskItem[] = []
                    let hasVencida = false
                    let hasHoy = false
                    let hasProxima = false
                    if (date instanceof Date && !isNaN(date.getTime())) {
                      const key = format(date, 'yyyy-MM-dd')
                      entradas = entradasByDate.get(key) || []
                      vencimientos = vencimientosByDate.get(key) || []
                      hasVencida = vencimientos.some((t) => t._status === 'vencida')
                      hasHoy = vencimientos.some((t) => t._status === 'hoy')
                      hasProxima = vencimientos.some((t) => t._status === 'proxima')
                    }
                    const hasAny = entradas.length > 0 || vencimientos.length > 0
                    return (
                      <span className="relative inline-flex w-full h-full items-center justify-center">
                        <button
                          {...props}
                          className={cn(
                            'inline-flex h-9 w-9 items-center justify-center rounded-md text-sm',
                            props.className
                          )}
                        />
                        {hasAny && (
                          <span className="pointer-events-none absolute bottom-0.5 left-1/2 -translate-x-1/2 flex items-center gap-0.5">
                            {entradas.length > 0 && (
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" title={`${entradas.length} entrada(s)`} />
                            )}
                            {vencimientos.length > 0 && (
                              <span
                                className={cn(
                                  'inline-block w-1.5 h-1.5 rounded-full',
                                  hasVencida ? 'bg-red-500' : hasHoy ? 'bg-orange-500' : hasProxima ? 'bg-green-500' : 'bg-gray-400'
                                )}
                                title={`${vencimientos.length} cumplimiento(s)`}
                              />
                            )}
                          </span>
                        )}
                      </span>
                    )
                  },
                }}
              />
            </div>

            {/* Tasks for selected date — split into Entradas and Vencimientos */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                {selectedDate ? format(selectedDate, "EEEE d 'de' MMMM", { locale: es }) : 'Selecciona una fecha'}
                <Badge variant="outline" className="text-xs">
                  {tasksForSelectedDate.entradas.length + tasksForSelectedDate.vencimientos.length}
                </Badge>
              </h4>

              {/* ENTRADAS del día */}
              {tasksForSelectedDate.entradas.length > 0 && (
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 mb-2">
                    <ArrowDownToLine className="h-3 w-3" />
                    Entradas de hallazgos
                    <Badge variant="outline" className="text-[10px]">{tasksForSelectedDate.entradas.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {tasksForSelectedDate.entradas.map((t) => (
                      <TaskCard
                        key={`ent-${t.id}`}
                        task={t}
                        highlight="entrada"
                        onUpdate={updateTask}
                        updating={updatingId === t.id}
                        onOpenActionPlan={onOpenActionPlan}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* VENCIMIENTOS del día */}
              {tasksForSelectedDate.vencimientos.length > 0 && (
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-orange-50 text-orange-700 mb-2">
                    <Clock className="h-3 w-3" />
                    Cumplimientos / Vencimientos
                    <Badge variant="outline" className="text-[10px]">{tasksForSelectedDate.vencimientos.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {tasksForSelectedDate.vencimientos.map((t) => (
                      <TaskCard
                        key={`venc-${t.id}`}
                        task={t}
                        highlight="vencimiento"
                        onUpdate={updateTask}
                        updating={updatingId === t.id}
                        onOpenActionPlan={onOpenActionPlan}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Empty state */}
              {tasksForSelectedDate.entradas.length === 0 && tasksForSelectedDate.vencimientos.length === 0 && (
                <p className="text-xs text-muted-foreground italic py-2">
                  No hay entradas ni cumplimientos programados para este día.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {vencidas.length > 0 && (
              <TaskSection
                title="Vencidas"
                count={vencidas.length}
                color="red"
                icon={<AlertTriangle className="h-4 w-4" />}
                tasks={vencidas}
                onUpdate={updateTask}
                updatingId={updatingId}
                onOpenActionPlan={onOpenActionPlan}
              />
            )}
            {hoy.length > 0 && (
              <TaskSection
                title="Para hoy"
                count={hoy.length}
                color="orange"
                icon={<Clock className="h-4 w-4" />}
                tasks={hoy}
                onUpdate={updateTask}
                updatingId={updatingId}
                onOpenActionPlan={onOpenActionPlan}
              />
            )}
            {(proximas.length > 0 || evalProximas.length > 0) && (
              <TaskSection
                title="Próximas"
                count={proximas.length + evalProximas.length}
                color="blue"
                icon={<CircleDot className="h-4 w-4" />}
                tasks={[...proximas, ...evalProximas]}
                onUpdate={updateTask}
                updatingId={updatingId}
                onOpenActionPlan={onOpenActionPlan}
              />
            )}
            {sinFecha.length > 0 && (
              <TaskSection
                title="Sin fecha"
                count={sinFecha.length}
                color="gray"
                icon={<ListTodo className="h-4 w-4" />}
                tasks={sinFecha}
                onUpdate={updateTask}
                updatingId={updatingId}
                onOpenActionPlan={onOpenActionPlan}
              />
            )}
            {tasks.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <CheckCircle2 className="h-10 w-10 mx-auto mb-2 text-green-500" />
                <p className="text-sm">No tienes acciones asignadas.</p>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  color,
  icon,
}: {
  label: string
  value: number
  color: 'red' | 'orange' | 'blue' | 'gray'
  icon: React.ReactNode
}) {
  const colors = {
    red: 'bg-red-50 text-red-700 border-red-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
  }
  return (
    <div className={cn('rounded-md border p-2 text-center', colors[color])}>
      <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-medium">
        {icon}
        {label}
      </div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  )
}

function TaskSection({
  title,
  count,
  color,
  icon,
  tasks,
  onUpdate,
  updatingId,
  onOpenActionPlan,
}: {
  title: string
  count: number
  color: 'red' | 'orange' | 'blue' | 'gray'
  icon: React.ReactNode
  tasks: TaskItem[]
  onUpdate: (id: string, estado: string) => void
  updatingId: string | null
  onOpenActionPlan?: (itemId?: string) => void
}) {
  const colors = {
    red: 'text-red-700 bg-red-50',
    orange: 'text-orange-700 bg-orange-50',
    blue: 'text-blue-700 bg-blue-50',
    gray: 'text-gray-700 bg-gray-50',
  }
  return (
    <div>
      <div className={cn('inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm font-semibold mb-2', colors[color])}>
        {icon}
        {title}
        <Badge variant="outline" className="text-xs">{count}</Badge>
      </div>
      <div className="space-y-2">
        {tasks.map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            onUpdate={onUpdate}
            updating={updatingId === t.id}
            onOpenActionPlan={onOpenActionPlan}
          />
        ))}
      </div>
    </div>
  )
}

function TaskCard({
  task,
  onUpdate,
  updating,
  highlight,
  onOpenActionPlan,
}: {
  task: TaskItem
  onUpdate: (id: string, estado: string) => void
  updating: boolean
  highlight?: 'entrada' | 'vencimiento'
  onOpenActionPlan?: (itemId?: string) => void
}) {
  const prioridadColors: Record<string, string> = {
    alta: 'bg-red-100 text-red-700',
    media: 'bg-yellow-100 text-yellow-700',
    baja: 'bg-green-100 text-green-700',
  }
  const estadoLabels: Record<string, string> = {
    abierta: 'Abierta',
    en_proceso: 'En proceso',
    resuelta: 'Resuelta',
    cerrada: 'Cerrada',
  }
  const isResolved = ['resuelta', 'cerrada'].includes(task.estado)
  const isFromInventory = task.source === 'inventario' || (task.itemId || '').startsWith('inv_')

  return (
    <div className={cn(
      'border rounded-md p-3 text-sm bg-card',
      task._status === 'vencida' && 'border-red-300 bg-red-50/30',
      task._status === 'hoy' && 'border-orange-300 bg-orange-50/30',
      highlight === 'entrada' && 'border-l-4 border-l-blue-400',
      highlight === 'vencimiento' && 'border-l-4 border-l-orange-400',
    )}>
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              S{task.sStep}.{task.miniStep === 4 ? 'Pre' : 'Aud'}
            </Badge>
            <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0', prioridadColors[task.prioridad])}>
              {task.prioridad}
            </Badge>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              {estadoLabels[task.estado] || task.estado}
            </Badge>
            {isFromInventory && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-purple-50 text-purple-700 border-purple-200">
                Inventario
              </Badge>
            )}
            {task.zone && (
              <span className="text-[10px] text-muted-foreground">📍 {task.zone.name}</span>
            )}
          </div>
          <p className="font-medium line-clamp-1">{task.itemDescription}</p>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{task.hallazgo}</p>
        </div>
        <div className="text-right shrink-0">
          {/* v2.61: show fechaEntrada if highlighted as entrada */}
          {highlight === 'entrada' && task.fechaEntrada && (
            <div className="text-[10px] text-blue-600 font-medium">
              ↓ Entró: {format(parseISO(task.fechaEntrada), "d MMM", { locale: es })}
            </div>
          )}
          {/* v2.61: show fechaLimite if highlighted as vencimiento */}
          {highlight === 'vencimiento' && task.fechaLimite && (
            <div className={cn(
              'text-xs font-medium',
              task._status === 'vencida' ? 'text-red-600' : task._status === 'hoy' ? 'text-orange-600' : 'text-muted-foreground'
            )}>
              {format(parseISO(task.fechaLimite), "d MMM", { locale: es })}
            </div>
          )}
          {/* Default: show fechaLimite when not highlighted */}
          {!highlight && task.fechaLimite && (
            <div className={cn(
              'text-xs font-medium',
              task._status === 'vencida' ? 'text-red-600' : task._status === 'hoy' ? 'text-orange-600' : 'text-muted-foreground'
            )}>
              {format(parseISO(task.fechaLimite), "d MMM", { locale: es })}
            </div>
          )}
        </div>
      </div>

      {(task.responsable || task.personaDemandada) && (
        <p className="text-[10px] text-muted-foreground mt-1">
          {task.responsable && <>👤 {task.responsable}</>}
          {task.responsable && task.personaDemandada && ' · '}
          {task.personaDemandada && <>→ {task.personaDemandada}</>}
        </p>
      )}

      <div className="flex gap-2 mt-2">
        {!isResolved && (
          <>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs flex-1"
              disabled={updating}
              onClick={() => onUpdate(task.id, 'en_proceso')}
            >
              {updating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Loader2 className="h-3 w-3" />}
              En proceso
            </Button>
            <Button
              size="sm"
              variant="default"
              className="h-7 text-xs flex-1 bg-green-600 hover:bg-green-700"
              disabled={updating}
              onClick={() => onUpdate(task.id, 'resuelta')}
            >
              {updating ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle2 className="h-3 w-3" />}
              Resuelta
            </Button>
          </>
        )}
        {isResolved && (
          <div className="flex items-center gap-1 text-xs text-green-600 flex-1">
            <CheckCircle2 className="h-3 w-3" />
            {task.fechaResolucion
              ? `Resuelta el ${format(parseISO(task.fechaResolucion), "d MMM yyyy", { locale: es })}`
              : 'Resuelta'}
          </div>
        )}
        {/* v2.61: botón Abrir en Plan de Acción */}
        {onOpenActionPlan && (
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-xs px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={() => onOpenActionPlan(task.id)}
            title="Abrir en Plan de Acción para editar fechas y rellenar"
          >
            <ExternalLink className="h-3 w-3" />
            <span className="hidden sm:inline">Plan</span>
          </Button>
        )}
      </div>
    </div>
  )
}
