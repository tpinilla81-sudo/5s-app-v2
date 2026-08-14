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
}

export function UserTaskCalendar({
  open,
  onClose,
  userId,
  projectId,
  userName,
}: UserTaskCalendarProps) {
  const [tasks, setTasks] = React.useState<TaskItem[]>([])
  const [stats, setStats] = React.useState<Stats | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [showCompleted, setShowCompleted] = React.useState(false)
  const [updatingId, setUpdatingId] = React.useState<string | null>(null)
  const [view, setView] = React.useState<'calendar' | 'list'>('calendar')

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
    } catch (e) {
      console.error('Error fetching tasks:', e)
    } finally {
      setLoading(false)
    }
  }, [userId, projectId, showCompleted])

  React.useEffect(() => {
    if (open) fetchData()
  }, [open, fetchData])

  // Group tasks by date for calendar markers
  const tasksByDate = React.useMemo(() => {
    const map = new Map<string, TaskItem[]>()
    for (const t of tasks) {
      if (!t.fechaLimite) continue
      const key = format(parseISO(t.fechaLimite), 'yyyy-MM-dd')
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(t)
    }
    return map
  }, [tasks])

  const vencidas = tasks.filter((t) => t._status === 'vencida')
  const hoy = tasks.filter((t) => t._status === 'hoy')
  const proximas = tasks.filter((t) => t._status === 'proxima')
  const sinFecha = tasks.filter((t) => t._status === 'sin_fecha')

  // Tasks for selected date in calendar view
  const tasksForSelectedDate = React.useMemo(() => {
    if (!selectedDate) return []
    const key = format(selectedDate, 'yyyy-MM-dd')
    return tasksByDate.get(key) || []
  }, [selectedDate, tasksByDate])

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

  // Custom day render to show markers
  const modifiers = {
    hasTasks: (date: Date) => tasksByDate.has(format(date, 'yyyy-MM-dd')),
    overdue: (date: Date) => {
      const key = format(date, 'yyyy-MM-dd')
      const items = tasksByDate.get(key)
      return !!items?.some((t) => t._status === 'vencida')
    },
  }

  const modifiersClassNames = {
    hasTasks: 'relative font-medium',
    overdue: 'relative text-red-600 font-bold',
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
              ? `Acciones asignadas a ${userName} provenientes del Plan de Acción general.`
              : 'Acciones programadas provenientes del Plan de Acción general.'}
          </SheetDescription>
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
                    let items: TaskItem[] = []
                    let hasOverdue = false
                    let hasToday = false
                    if (date instanceof Date && !isNaN(date.getTime())) {
                      const key = format(date, 'yyyy-MM-dd')
                      items = tasksByDate.get(key) || []
                      hasOverdue = items.some((t) => t._status === 'vencida')
                      hasToday = isToday(date)
                    }
                    return (
                      <span className="relative inline-flex w-full h-full items-center justify-center">
                        <button
                          {...props}
                          className={cn(
                            'inline-flex h-9 w-9 items-center justify-center rounded-md text-sm',
                            props.className
                          )}
                        />
                        {items.length > 0 && (
                          <span
                            className={cn(
                              'pointer-events-none absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full',
                              hasOverdue ? 'bg-red-500' : hasToday ? 'bg-orange-500' : 'bg-blue-500'
                            )}
                          />
                        )}
                      </span>
                    )
                  },
                }}
              />
            </div>

            {/* Tasks for selected date */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                {selectedDate ? format(selectedDate, "EEEE d 'de' MMMM", { locale: es }) : 'Selecciona una fecha'}
                <Badge variant="outline" className="text-xs">{tasksForSelectedDate.length}</Badge>
              </h4>
              {tasksForSelectedDate.length === 0 ? (
                <p className="text-xs text-muted-foreground italic py-2">
                  No hay acciones programadas para este día.
                </p>
              ) : (
                tasksForSelectedDate.map((t) => (
                  <TaskCard
                    key={t.id}
                    task={t}
                    onUpdate={updateTask}
                    updating={updatingId === t.id}
                  />
                ))
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
              />
            )}
            {proximas.length > 0 && (
              <TaskSection
                title="Próximas"
                count={proximas.length}
                color="blue"
                icon={<CircleDot className="h-4 w-4" />}
                tasks={proximas}
                onUpdate={updateTask}
                updatingId={updatingId}
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
}: {
  title: string
  count: number
  color: 'red' | 'orange' | 'blue' | 'gray'
  icon: React.ReactNode
  tasks: TaskItem[]
  onUpdate: (id: string, estado: string) => void
  updatingId: string | null
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
}: {
  task: TaskItem
  onUpdate: (id: string, estado: string) => void
  updating: boolean
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

  return (
    <div className={cn(
      'border rounded-md p-3 text-sm bg-card',
      task._status === 'vencida' && 'border-red-300 bg-red-50/30',
      task._status === 'hoy' && 'border-orange-300 bg-orange-50/30',
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
            {task.zone && (
              <span className="text-[10px] text-muted-foreground">📍 {task.zone.name}</span>
            )}
          </div>
          <p className="font-medium line-clamp-1">{task.itemDescription}</p>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{task.hallazgo}</p>
        </div>
        <div className="text-right shrink-0">
          {task.fechaLimite && (
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

      {!isResolved && (
        <div className="flex gap-2 mt-2">
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
        </div>
      )}
      {isResolved && (
        <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
          <CheckCircle2 className="h-3 w-3" />
          {task.fechaResolucion
            ? `Resuelta el ${format(parseISO(task.fechaResolucion), "d MMM yyyy", { locale: es })}`
            : 'Resuelta'}
        </div>
      )}
    </div>
  )
}
