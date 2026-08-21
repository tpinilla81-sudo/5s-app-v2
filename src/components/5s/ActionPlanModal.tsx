'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
// v2.82: Textarea ya no se usa (Impacto ahora es auto-clasificado read-only).
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ListChecks, Plus, Trash2, ChevronDown, ChevronRight, AlertTriangle, Maximize2, Minimize2 } from 'lucide-react';
import { toast } from 'sonner';
import { use5SStore } from '@/lib/store';
import { S_STEPS, ACTION_PLAN_MIN_ITEMS } from '@/lib/5s-constants';

interface ActionItemData {
  id: string;
  numeroEntrada: number;
  fechaEntrada: string;
  // v2.78: FKs a User (reemplazan a los textos legacy)
  comunicadoPorId: string | null;
  comunicadoPorName: string; // derivado de comunicadoPorUser.name (display)
  personaDemandadaId: string | null;
  personaDemandadaName: string; // derivado de personaDemandadaUser.name (display)
  verificadoPorId: string | null;
  verificadoPorName: string; // derivado de verificadoPorUser.name (display)
  semana: string;
  // v2.79: simplificado — solo Zona (sin Cliente ni Secciones)
  zonaName: string;
  hallazgo: string; // DESCRIPCIÓN
  impacto: string; // v2.79: renombrado de impactoObjetivo, ahora en HALLAZGO
  // v2.79: campos de ACCIÓN autorellenos desde el inventario (extra snapshot)
  accionCategoria: string;
  accionElemento: string;
  accionCantidad: string;
  // v2.81: ACCIÓN subdividida en Correctiva (3 cols autorellenas) y
  // Preventiva (1 col manual, default 'N/A').
  accionDecision: string;       // Correctiva — Decisión (de extra)
  accionEtiqueta: string;       // Correctiva — Etiqueta (de extra)
  accionDestino: string;        // Correctiva — Destino (de extra)
  accionPreventiva: string;     // Preventiva — Decisión manual (N/A por defecto)
  // SEGUIMIENTO
  semanaPrevista: string;
  porcentaje: number;
  estado: string;
  semanaReal: string;
  // Legacy fields kept for compatibility
  descripcion: string;
  fechaCompromiso: string;
  fechaLimite: string;
  fechaReal: string;
  prioridad: string;
  zoneId: string;
  sStep: number;
  miniStep: number;
  source?: string;
  tipo?: string;
}

interface ZoneData {
  id: string;
  name: string;
}

interface ActionPlanModalProps {
  open: boolean;
  onClose: () => void;
  sStep: number;
  miniStep: number;
}

// v2.99.7: Estados simplificados a 3: ABIERTA / EN PROCESO / CERRADA.
// El porcentaje se sincroniza automáticamente:
//   ABIERTA     -> 0%
//   EN PROCESO  -> 50%
//   CERRADA     -> 100%
const ESTADO_OPTIONS = [
  { value: 'abierta', label: 'ABIERTA', color: 'bg-red-100 text-red-800' },
  { value: 'en_proceso', label: 'EN PROCESO', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'cerrada', label: 'CERRADA', color: 'bg-green-100 text-green-800' },
];

// v2.99.7: Mapping estado <-> porcentaje.
const PORCENTAJE_POR_ESTADO: Record<string, number> = {
  abierta: 0,
  en_proceso: 50,
  cerrada: 100,
};
const ESTADO_POR_PORCENTAJE = (p: number): string => {
  if (p >= 100) return 'cerrada';
  if (p >= 50) return 'en_proceso';
  return 'abierta';
};

const ENVIADO_OPTIONS = ['Sí', 'No', 'Pendiente'];

// v2.81: Opciones para la decisión de Acción Preventiva (manual).
// El usuario elige una; por defecto 'N/A' (no aplica).
const ACCION_PREVENTIVA_OPTIONS = [
  { value: 'N/A', label: 'N/A' },
  { value: 'Formación', label: 'Formación' },
  { value: 'Procedimiento', label: 'Procedimiento' },
  { value: 'Señalización', label: 'Señalización' },
  { value: 'Poka-yoke', label: 'Poka-yoke' },
  { value: 'Mantenimiento', label: 'Mantenimiento' },
  { value: '5S', label: '5S' },
  { value: 'Otra', label: 'Otra' },
];

// Generate week options (W1-W52)
const WEEK_OPTIONS = Array.from({ length: 53 }, (_, i) => `W${i + 1}`);

// Color sections matching the uploaded image
const SECTION_COLORS = {
  demandante: 'bg-amber-50 border-amber-300 text-amber-900', // Yellow section
  accion: 'bg-sky-50 border-sky-300 text-sky-900',           // Blue section
  seguimiento: 'bg-orange-50 border-orange-300 text-orange-900', // Orange section
};

const HEADER_COLORS = {
  demandante: 'bg-amber-400 text-white',
  accion: 'bg-sky-400 text-white',
  seguimiento: 'bg-orange-400 text-white',
};

export default function ActionPlanModal({ open, onClose, sStep, miniStep }: ActionPlanModalProps) {
  const { fetchProgress, currentUser, adminFreeNavigation, currentProject, currentZone, canPerform, canView, hasPermission } = use5SStore();
  const sStepData = S_STEPS.find(s => s.id === sStep);
  const canSkipSteps = hasPermission('skip_steps');
  const canPerformStep = canPerform(sStep, miniStep);
  const canViewStep = canView(sStep, miniStep);
  // Permission-driven: read-only if no execute perm OR if candado closed for skip_steps users
  const isReadOnly = !canPerformStep || (canSkipSteps && !adminFreeNavigation);

  const [actions, setActions] = useState<ActionItemData[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [zones, setZones] = useState<ZoneData[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(true);
  // v2.78: miembros del proyecto para los User pickers (personaDemandadaId,
  // verificadoPorId). Se cargan al abrir el modal.
  const [projectMembers, setProjectMembers] = useState<Array<{ id: string; name: string; email: string; role: string }>>([]);

  // v2.77: Diálogo de decisión de cierre (cuando se pasa a resuelta/cerrada)
  const [closeDialog, setCloseDialog] = useState<{
    actionId: string;
    hallazgo: string;
    source?: string;
  } | null>(null);
  const [closeDecision, setCloseDecision] = useState<'Resuelto' | 'Retirar' | 'Eliminar'>('Resuelto');
  const [closeDiasCuarentena, setCloseDiasCuarentena] = useState<number>(40);

  const loadZones = async () => {
    if (!currentProject) return;
    try {
      const res = await fetch(`/api/projects/${currentProject.id}/zones`);
      if (res.ok) {
        const json = await res.json();
        setZones(json.zones || json.data || []);
      }
    } catch (error) {
      console.error('Error loading zones:', error);
    }
  };

  // v2.78: Cargar miembros del proyecto para los User pickers
  const loadProjectMembers = async () => {
    if (!currentProject) return;
    try {
      const res = await fetch(`/api/projects/${currentProject.id}/members`);
      if (res.ok) {
        const json = await res.json();
        const members = (json.members || json.data || []).map((m: any) => ({
          id: m.userId || m.id,
          name: m.user?.name || m.name || 'Sin nombre',
          email: m.user?.email || m.email || '',
          role: m.role || '',
        }));
        setProjectMembers(members);
      }
    } catch (error) {
      console.error('Error loading project members:', error);
    }
  };

  const loadActions = async () => {
    try {
      const params = new URLSearchParams();
      // When opened globally (miniStep=0), load ALL actions; otherwise filter by sStep
      const isGlobal = miniStep === 0;
      if (!isGlobal) {
        params.set('sStep', String(sStep));
      }
      if (currentProject?.id) params.set('projectId', currentProject.id);
      if (currentUser?.id) params.set('userId', currentUser.id);
      if (currentUser?.role) params.set('userRole', currentUser.role);
      const res = await fetch(`/api/actions?${params.toString()}`);
      const json = await res.json();
      if (json.success && json.data) {
        setActions(json.data.map((a: any) => ({
          id: a.id,
          numeroEntrada: a.numeroEntrada || 0,
          fechaEntrada: a.fechaEntrada ? new Date(a.fechaEntrada).toISOString().split('T')[0] : (a.createdAt ? new Date(a.createdAt).toISOString().split('T')[0] : ''),
          // v2.99.4: si comunicadoPor es un texto generico del sistema
          // ('Sistema (auto desde Inventario S1)', 'Sistema', '—', '-', ''),
          // mostrar '—' en lugar de ese placeholder. El usuario real
          // debería venir por comunicadoPorUser (FK). Si no hay FK y el
          // texto es generico, no tenemos quien lo hizo — mostramos '—'.
          comunicadoPorId: a.comunicadoPorId || null,
          comunicadoPorName: (() => {
            const name = a.comunicadoPorUser?.name || a.comunicadoPor || ''
            const GENERICOS = [
              'Sistema (auto desde Inventario S1)',
              'Sistema',
              '—',
              '-',
              '',
            ]
            return GENERICOS.includes(name.trim()) ? '' : name
          })(),
          personaDemandadaId: a.personaDemandadaId || null,
          personaDemandadaName: a.personaDemandadaUser?.name || a.personaDemandada || '',
          verificadoPorId: a.verificadoPorId || null,
          verificadoPorName: a.verificadoPorUser?.name || a.verificadoPor || '',
          semana: a.semana || '',
          // v2.79: simplificado — solo Zona
          zonaName: a.zone?.name || a.clienteZona || '',
          hallazgo: a.hallazgo || a.itemDescription || '',
          // v2.79: renombrado de impactoObjetivo
          impacto: a.impactoObjetivo || '',
          // v2.79: campos de ACCIÓN autorellenos desde el inventario (extra snapshot)
          accionCategoria: a.extra?.categoria || '',
          accionElemento: a.extra?.elemento || '',
          accionCantidad: a.extra?.cantidad != null ? String(a.extra.cantidad) : '',
          // v2.89: Acción correctiva — label completo ("Retirar a Jaula" / "Eliminar a Residuo")
          accionDecision: (() => {
            const dbLabel = (a as any).accionCorrectiva || '';
            if (dbLabel && dbLabel.trim()) {
              const dec = a.extra?.decision || '';
              if (dec === 'Retirar') return 'Retirar a Jaula';
              if (dec === 'Eliminar') return 'Eliminar a Residuo';
              return dbLabel;
            }
            const dec = a.extra?.decision || '';
            if (dec === 'Retirar' || dec === 'Jaula') return 'Retirar a Jaula';
            if (dec === 'Eliminar' || dec === 'Tirar') return 'Eliminar a Residuo';
            return dec || '';
          })(),
          // v2.88: Etiqueta auto según S-step — refleja la columna "Etiquetas"
          // del inventario Paso 3 (Impresa/Pendiente/—).
          accionEtiqueta: (() => {
            if (a.source === 'inventario' && a.sStep && a.sStep !== 1) return 'No aplica'
            if (a.source === 'inventario' && a.sStep === 1) {
              const decision = a.extra?.decision || ''
              const etiquetaGenerada = !!(a.extra as any)?.etiquetaGenerada
              if (decision === 'Eliminar') return '—'
              if (etiquetaGenerada) return 'Impresa'
              if (decision === 'Retirar') return 'Pendiente'
              return '—'
            }
            const raw = a.extra?.etiquetas || ''
            return raw && raw.trim() ? raw : ''
          })(),
          accionDestino: a.extra?.zonaDestino || '',
          // v2.85: Acción Preventiva — automática "N/A" para items del
          // inventario (S1/S2). Para otros orígenes, manual con default 'N/A'.
          accionPreventiva: a.accionesPreventivas || 'N/A',
          // SEGUIMIENTO
          semanaPrevista: a.semanaPrevista || '',
          // v2.99.7: Porcentaje canónico según estado (0/50/100).
          porcentaje: (() => {
            const e = a.estado || 'abierta';
            if (e === 'cerrada') return 100;
            if (e === 'en_proceso') return 50;
            return 0;
          })(),
          estado: (() => {
            const e = a.estado;
            // v2.99.7: solo 3 estados válidos ahora.
            if (e === 'abierta' || e === 'en_proceso' || e === 'cerrada') return e;
            // Migrar estados legacy a los nuevos
            if (e === 'resuelta') return 'cerrada';
            return 'abierta';
          })(),
          semanaReal: a.semanaReal || '',
          // Legacy
          descripcion: a.itemDescription || a.hallazgo || '',
          fechaCompromiso: a.fechaCompromiso ? new Date(a.fechaCompromiso).toISOString().split('T')[0] : '',
          fechaLimite: a.fechaLimite ? new Date(a.fechaLimite).toISOString().split('T')[0] : '',
          fechaReal: a.fechaReal ? new Date(a.fechaReal).toISOString().split('T')[0] : '',
          prioridad: a.prioridad || 'media',
          zoneId: a.zoneId || '',
          sStep: a.sStep || sStep,
          miniStep: a.miniStep || 3,
          source: a.source || '',
          tipo: a.tipo || '',
        })));
      }
    } catch (error) {
      console.error('Error loading actions:', error);
      toast.error('Error al cargar las acciones');
    }
  };

  useEffect(() => {
    if (open) {
      loadActions();
      loadZones();
      loadProjectMembers();
    }
  }, [open, sStep]);

  const getNextNumero = () => {
    if (actions.length === 0) return 1;
    return Math.max(...actions.map(a => a.numeroEntrada || 0)) + 1;
  };

  const getCurrentWeek = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return `W${Math.ceil((diff / oneWeek) + start.getDay() / 7)}`;
  };

  // v2.89: Semana automática — calculada desde fechaEntrada (ISO 8601 week number).
  // Si no hay fecha, usa la semana actual. Es read-only en la UI.
  const getWeekFromDate = (dateStr: string): string => {
    try {
      const d = dateStr ? new Date(dateStr + 'T00:00:00') : new Date();
      if (isNaN(d.getTime())) return getCurrentWeek();
      const tmp = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      const dayNum = tmp.getUTCDay() || 7;
      tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
      const weekNum = Math.ceil((((tmp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
      return `W${weekNum}`;
    } catch {
      return getCurrentWeek();
    }
  };

  const handleAddAction = async () => {
    if (!currentProject?.id) {
      toast.error('No hay proyecto seleccionado.');
      return;
    }

    const nextNumero = getNextNumero();
    const today = new Date().toISOString().split('T')[0];
    const currentWeek = getCurrentWeek();

    try {
      const res = await fetch('/api/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sStep,
          miniStep: 3,
          itemId: `PA-${sStep}-${Date.now()}`,
          itemDescription: '',
          hallazgo: '',
          source: 'actionplan',
          projectId: currentProject.id,
          zoneId: currentZone?.id || null,
          // New Plan de Acción fields
          numeroEntrada: nextNumero,
          fechaEntrada: today,
          semana: currentWeek,
          estado: 'abierta',
          enviado: 'Pendiente',
          porcentaje: 0,
          // v2.76: marcar como entrada manual para el filtro por origen
          tipo: 'accion',
        }),
      });

      const json = await res.json();
      if (json.success) {
        toast.success('Entrada agregada correctamente');
        await loadActions();
      } else {
        toast.error(`Error: ${json.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error adding action:', error);
      toast.error('Error de conexión al agregar la entrada');
    }
  };

  const handleUpdateField = async (actionId: string, field: string, value: any) => {
    // v2.99.7: Si se está cambiando 'estado' a 'cerrada', abrir el diálogo
    // de decisión de cierre antes de persistir. El diálogo pedirá:
    // Resuelto / Retirar a Jaula / Eliminar y (si Retirar) los días de
    // cuarentena. El guardado real se hace en `confirmCloseDecision`.
    if (field === 'estado' && value === 'cerrada') {
      const action = actions.find(a => a.id === actionId);
      // Si ya estaba cerrada, no relanzar el diálogo
      if (action && action.estado !== 'cerrada') {
        setCloseDialog({
          actionId,
          hallazgo: action.hallazgo || action.descripcion || '',
          source: (action as any).source,
        });
        setCloseDecision('Resuelto');
        setCloseDiasCuarentena(40);
        return; // No persistir todavía; espera confirmación del diálogo
      }
    }

    // v2.99.7: Sincronizar estado <-> porcentaje:
    //   - Si cambia 'estado': actualizar 'porcentaje' al valor canónico.
    //   - Si cambia 'porcentaje': actualizar 'estado' según el nuevo valor.
    let extraUpdate: Record<string, any> | undefined;
    if (field === 'estado') {
      extraUpdate = { porcentaje: PORCENTAJE_POR_ESTADO[value] ?? 0 };
    } else if (field === 'porcentaje') {
      extraUpdate = { estado: ESTADO_POR_PORCENTAJE(Number(value) || 0) };
    }

    // v2.78: Mapa de campos del frontend → campos del backend.
    // Los FK de User se mandan con su nombre real (*Id) al backend.
    const fieldToBackend: Record<string, string> = {
      personaDemandadaId: 'personaDemandadaId',
      verificadoPorId: 'verificadoPorId',
      // Los demás van tal cual
    };
    const backendField = fieldToBackend[field] || field;

    // Optimistic update
    setActions(prev => prev.map(a =>
      a.id === actionId ? { ...a, [field]: value, ...(extraUpdate || {}) } : a
    ));

    try {
      const res = await fetch(`/api/actions?id=${actionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [backendField]: value, ...(extraUpdate || {}) }),
      });
      const json = await res.json();
      if (!json.success) {
        toast.error(`Error al actualizar: ${json.error || 'Error desconocido'}`);
        await loadActions(); // Revert
      }
    } catch (error) {
      console.error('Error updating action:', error);
      await loadActions(); // Revert
    }
  };

  // v2.77: Confirma el cierre con decisión + diasCuarentena y persiste.
  // Si decision='Retirar', el backend crea un InventoryItem en jaula.
  // Si decision='Eliminar', el backend crea un InventoryItem efímero transferido.
  // Si decision='Resuelto', solo cierra el ActionItem sin tocar la Jaula.
  // v2.78: al cerrar, seteamos verificadoPorId = currentUser.id (FK User).
  const confirmCloseDecision = async () => {
    if (!closeDialog) return;
    const { actionId } = closeDialog;
    const payload: any = {
      estado: 'cerrada',
      porcentaje: 100,
      decision: closeDecision,
      // v2.78: el usuario actual es quien verifica el cierre (FK User).
      verificadoPorId: currentUser?.id || null,
    };
    if (closeDecision === 'Retirar') {
      payload.diasCuarentena = closeDiasCuarentena;
    }

    // Optimistic update
    setActions(prev => prev.map(a =>
      a.id === actionId ? { ...a, estado: 'cerrada', porcentaje: 100 } : a
    ));

    try {
      const res = await fetch(`/api/actions?id=${actionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        const msg = closeDecision === 'Retirar'
          ? 'Cerrada y enviada a la Jaula de cuarentena'
          : closeDecision === 'Eliminar'
            ? 'Cerrada y enviada a Residuo'
            : 'Acción cerrada correctamente';
        toast.success(msg);
        await loadActions();
      } else {
        toast.error(`Error al cerrar: ${json.error || 'Error desconocido'}`);
        await loadActions();
      }
    } catch (error) {
      console.error('Error cerrando acción:', error);
      toast.error('Error de conexión al cerrar');
      await loadActions();
    } finally {
      setCloseDialog(null);
    }
  };

  const cancelCloseDecision = () => {
    // No cambiar el estado; queda como estaba
    setCloseDialog(null);
  };

  const handleDeleteAction = async (id: string) => {
    if (!confirm('¿Eliminar esta entrada?')) return;
    try {
      const res = await fetch(`/api/actions?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setActions(prev => prev.filter(a => a.id !== id));
        toast.success('Entrada eliminada');
      } else {
        toast.error(`Error al eliminar: ${json.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error deleting action:', error);
      toast.error('Error de conexión al eliminar');
    }
  };

  // Count completed actions
  const completedCount = actions.filter(a => a.estado === 'resuelta' || a.estado === 'cerrada').length;
  const totalActions = actions.length;
  const canComplete = totalActions >= ACTION_PLAN_MIN_ITEMS;
  const progressPercent = totalActions > 0 ? Math.round((completedCount / totalActions) * 100) : 0;

  const handleComplete = async () => {
    if (!canComplete) return;
    try {
      const res = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=${miniStep}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: true,
          score: progressPercent,
          projectId: currentProject?.id,
          zoneId: currentZone?.id || null,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setIsCompleted(true);
        await fetchProgress();
      }
    } catch (error) {
      console.error('Error completing action plan:', error);
    }
  };

  const handleAdminSkip = async () => {
    try {
      const res = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=${miniStep}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true, score: 100, notes: 'Completado por administrador (skip)', skipMissingTemplate: true, projectId: currentProject?.id, zoneId: currentZone?.id || null }),
      });
      const json = await res.json();
      if (json.success) {
        await fetchProgress();
        onClose();
      }
    } catch (error) {
      console.error('Error admin skip:', error);
    }
  };

  const getEstadoBadge = (estado: string) => {
    const opt = ESTADO_OPTIONS.find(e => e.value === estado);
    return opt || ESTADO_OPTIONS[0];
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent size={isFullscreen ? "fullscreen" : "xl"} className="flex flex-col overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-2 flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <ListChecks className="h-5 w-5" style={{ color: sStepData?.color }} />
            <span>Plan de Acción{miniStep === 0 ? ' — Global' : ` — ${sStepData?.name}`}</span>
            {sStepData && miniStep !== 0 && (
              <Badge variant="outline" style={{ borderColor: sStepData?.color, color: sStepData?.color }}>
                {sStepData?.japaneseName}
              </Badge>
            )}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="ml-auto p-1 rounded hover:bg-muted transition-colors"
              title={isFullscreen ? "Reducir ventana" : "Pantalla completa"}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4 text-muted-foreground" /> : <Maximize2 className="h-4 w-4 text-muted-foreground" />}
            </button>
          </DialogTitle>
        </DialogHeader>

        {canSkipSteps && !isCompleted && (
          <div className="mx-6 flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-lg flex-shrink-0">
            <span className="text-xs text-amber-700 font-medium">Modo Admin:</span>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={handleAdminSkip}
            >
              Completar paso sin plan
            </Button>
          </div>
        )}

        {isReadOnly && (
          <div className="flex items-center gap-2 p-2 mx-6 flex-shrink-0 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="text-xs text-blue-700 font-medium">Solo lectura: {canSkipSteps ? 'Activa el candado para poder realizar pasos.' : 'Puedes ver pero no modificar.'}</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0">
        {isCompleted ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-xl font-bold mb-2">¡Plan de Acción Completado!</h3>
            <p className="text-muted-foreground">
              Se han definido {totalActions} acciones, {completedCount} completadas ({progressPercent}%).
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0 space-y-3">
            {/* Stats bar */}
            <div className="flex items-center justify-between p-2 bg-muted rounded-lg text-sm">
              <div className="flex items-center gap-3">
                <span className="font-medium">{totalActions} entradas</span>
                <span className="text-muted-foreground">({completedCount} resueltas — {progressPercent}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleAddAction}
                  size="sm"
                  style={{ backgroundColor: sStepData?.color }}
                  className="text-white"
                >
                  <Plus className="h-4 w-4 mr-1" /> Nueva Entrada
                </Button>
              </div>
            </div>

            {/* Scrollable table */}
            <div className="flex-1 overflow-auto border rounded-lg">
              <table className="w-full text-xs border-collapse min-w-[800px] md:min-w-[1200px]">
                <thead className="sticky top-0 z-10">
                  {/* v2.87: fila 1 — cabeceras de sección */}
                  <tr>
                    <th colSpan={10} className={`${HEADER_COLORS.demandante} px-2 py-1.5 text-center text-xs font-bold border border-amber-500`}>
                      HALLAZGO
                    </th>
                    {/* v2.87: ACCIONES como cabecera única que abarca Correctiva (3) + Preventiva (1) */}
                    <th colSpan={4} className="bg-cyan-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-cyan-600 uppercase tracking-wider">
                      Acciones
                    </th>
                    <th colSpan={5} className={`${HEADER_COLORS.seguimiento} px-2 py-1.5 text-center text-xs font-bold border border-orange-500`}>
                      SEGUIMIENTO
                    </th>
                    <th className="bg-gray-400 text-white px-1 py-1.5 text-center text-xs font-bold border border-gray-500 w-8">
                      🗑
                    </th>
                  </tr>
                  {/* v2.87: fila 2 — sub-cabeceras CORRECTIVA + PREVENTIVA (cajas blancas con borde cyan) + labels HALLAZGO/SEGUIMIENTO */}
                  <tr>
                    <th className={`${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`}>Nº</th>
                    <th className={`${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`}>Fecha</th>
                    <th className={`${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`} title="Paso en el que se detectó el hallazgo (el responsable se muestra en otra columna)">Detectado por</th>
                    <th className={`${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`} title="Categoría del inventario (innecesario/dudoso/util/...)">Categoría</th>
                    <th className={`${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`} title="Elemento del inventario">Elemento</th>
                    <th className={`${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`}>Cantidad</th>
                    <th className={`${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`}>Semana</th>
                    <th className={`${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`}>Zona</th>
                    <th className={`${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`} title="Responsable de resolver el hallazgo (empleado de la zona por defecto, editable)">Responsable</th>
                    <th className={`${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`} title="Impacto objetivo — trabajaremos en esto luego">Impacto</th>
                    {/* v2.87: Sub-cabecera CORRECTIVA — caja blanca con borde cyan */}
                    <th colSpan={3} className="bg-white text-cyan-700 px-2 py-1 text-center font-bold border-2 border-cyan-500 border-b-1 uppercase tracking-wide text-[10px]">
                      Correctiva
                    </th>
                    {/* v2.87: Sub-cabecera PREVENTIVA — caja blanca con borde cyan */}
                    <th colSpan={1} className="bg-white text-cyan-700 px-2 py-1 text-center font-bold border-2 border-cyan-500 border-b-1 uppercase tracking-wide text-[10px]">
                      Preventiva
                    </th>
                    <th className={`${HEADER_COLORS.seguimiento} px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap`}>Semana Prevista</th>
                    <th className={`${HEADER_COLORS.seguimiento} px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap`} title="Usuario que verifica el cierre (FK User)">Verificado por</th>
                    <th className={`${HEADER_COLORS.seguimiento} px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap`}>%</th>
                    <th className={`${HEADER_COLORS.seguimiento} px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap`}>Estado</th>
                    <th className={`${HEADER_COLORS.seguimiento} px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap`}>Semana Real</th>
                    <th className="bg-gray-300 text-gray-700 px-1 py-1 border border-gray-400 w-8"></th>
                  </tr>
                  {/* v2.87: fila 3 — labels finales solo bajo ACCIONES */}
                  <tr>
                    <th className="bg-amber-50 border border-amber-200" />
                    <th className="bg-amber-50 border border-amber-200" />
                    <th className="bg-amber-50 border border-amber-200" />
                    <th className="bg-amber-50 border border-amber-200" />
                    <th className="bg-amber-50 border border-amber-200" />
                    <th className="bg-amber-50 border border-amber-200" />
                    <th className="bg-amber-50 border border-amber-200" />
                    <th className="bg-amber-50 border border-amber-200" />
                    <th className="bg-amber-50 border border-amber-200" />
                    <th className="bg-amber-50 border border-amber-200" />
                    <th className="bg-sky-50 text-sky-800 px-1 py-1 text-center font-semibold border border-sky-300 whitespace-nowrap" title="Acción correctiva: decisión del inventario (Retirar/Eliminar/...). Automática desde el paso 3.">Acción</th>
                    <th className="bg-sky-50 text-sky-800 px-1 py-1 text-center font-semibold border border-sky-300 whitespace-nowrap" title="Etiqueta para imprimir (auto desde inventario S1; 'No aplica' para S2-S5)">Etiqueta</th>
                    <th className="bg-sky-50 text-sky-800 px-1 py-1 text-center font-semibold border border-sky-300 whitespace-nowrap" title="Destino del item: zona o Residuo (auto desde inventario)">Destino</th>
                    <th className="bg-cyan-50 text-cyan-800 px-1 py-1 text-center font-semibold border border-cyan-300 whitespace-nowrap" title="Acción preventiva — automática 'N/A' para items del inventario, manual para otros orígenes">Acción</th>
                    <th className="bg-orange-50 border border-orange-200" />
                    <th className="bg-orange-50 border border-orange-200" />
                    <th className="bg-orange-50 border border-orange-200" />
                    <th className="bg-orange-50 border border-orange-200" />
                    <th className="bg-orange-50 border border-orange-200" />
                    <th className="bg-gray-50 border border-gray-200" />
                  </tr>
                </thead>
                <tbody>
                  {actions.length === 0 ? (
                    <tr>
                      <td colSpan={20} className="text-center py-12 text-muted-foreground">
                        <ListChecks className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No hay entradas en el Plan de Acción</p>
                        <p className="text-xs mt-1">Haga clic en &quot;Nueva Entrada&quot; para agregar acciones</p>
                      </td>
                    </tr>
                  ) : (
                    actions.map((action) => {
                      const isExpanded = expandedRow === action.id;
                      const estadoBadge = getEstadoBadge(action.estado);

                      return (
                        <tr key={action.id} className="hover:bg-muted/30 group">
                          {/* ── HALLAZGO — v2.79: 7 columnas ── */}
                          <td className={`${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200 text-center font-bold`}>
                            {action.numeroEntrada || '-'}
                          </td>
                          {/* v2.89: Fecha de entrada — read-only (no cambiable) */}
                          <td className={`${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200`}>
                            <div className="h-6 text-[10px] px-1 flex items-center text-gray-700" title={action.fechaEntrada || '—'}>
                              {action.fechaEntrada || '—'}
                            </div>
                          </td>
                          {/* v2.99.6: Detectado por — solo el Paso (responsable va en otra columna) */}
                          <td className={`${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200`}>
                            <div className="h-6 min-h-[24px] text-[10px] px-1 flex items-center text-gray-700 truncate" title={`${(() => {
                              if (action.miniStep === 5) return 'Paso 5';
                              if (action.miniStep === 4) return 'Paso 4';
                              return 'Paso 3';
                            })()}`}>
                              {(() => {
                                if (action.miniStep === 5) return 'Paso 5';
                                if (action.miniStep === 4) return 'Paso 4';
                                return 'Paso 3';
                              })()}
                            </div>
                          </td>
                          {/* v2.79: Categoría / Elemento / Cantidad — autorellenados desde el snapshot `extra`
                              del ActionItem (linkado al inventario del paso 3). Read-only. */}
                          <td className={`${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200`}>
                            <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.accionCategoria || '—'}>
                              {action.accionCategoria || '—'}
                            </div>
                          </td>
                          <td className={`${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200`}>
                            <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.accionElemento || '—'}>
                              {action.accionElemento || '—'}
                            </div>
                          </td>
                          <td className={`${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200 text-center`}>
                            <div className="h-6 text-[10px] px-1 flex items-center justify-center text-gray-700 truncate">
                              {action.accionCantidad || '—'}
                            </div>
                          </td>
                          {/* v2.89: Semana — auto-calculada desde fechaEntrada (read-only) */}
                          <td className={`${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200 text-center`}>
                            <div className="h-6 text-[10px] px-1 flex items-center justify-center text-gray-700 font-medium" title={`Semana automática según fecha de entrada (${action.fechaEntrada || 'hoy'})`}>
                              {getWeekFromDate(action.fechaEntrada)}
                            </div>
                          </td>
                          {/* v2.79: Zona — read-only (viene del paso donde se detectó) */}
                          <td className={`${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200`}>
                            <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.zonaName || '—'}>
                              {action.zonaName || '—'}
                            </div>
                          </td>
                          {/* v2.79: Responsable — User picker. Default = empleado de la zona,
                              fallback a responsable del proyecto si no hay empleado.
                              El usuario puede cambiar a cualquier otro miembro. */}
                          <td className={`${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200`}>
                            <Select
                              value={
                                action.personaDemandadaId ||
                                projectMembers.find(m => m.role === 'empleado')?.id ||
                                projectMembers.find(m => m.role === 'responsable')?.id ||
                                '__none__'
                              }
                              onValueChange={val => handleUpdateField(action.id, 'personaDemandadaId', val === '__none__' ? null : val)}
                            >
                              <SelectTrigger className="h-6 text-[10px] p-0 px-1 bg-transparent border-0 w-28">
                                <SelectValue placeholder="—" />
                              </SelectTrigger>
                              <SelectContent className="max-h-60">
                                <SelectItem value="__none__">—</SelectItem>
                                {projectMembers.map(m => (
                                  <SelectItem key={m.id} value={m.id} title={`${m.email} (${m.role})`}>
                                    {m.name} <span className="text-[9px] opacity-60">· {m.role}</span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          {/* v2.82: Impacto — auto-clasificado (CALIDAD / MEJORA TIEMPOS /
                              RIESGOS DE ACCIDENTES). Se calcula al crear el ActionItem
                              desde paso 3/4/5 y se guarda en impactoObjetivo. Read-only:
                              el usuario no edita este campo. */}
                          <td className={`${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200`}>
                            <div
                              className="h-6 text-[9px] px-1 flex items-center justify-center text-center font-semibold truncate"
                              title={`Impacto auto-clasificado: ${action.impacto || '—'}`}
                            >
                              {action.impacto ? (
                                <span className={
                                  action.impacto === 'CALIDAD' ? 'text-blue-700 bg-blue-50 px-1 py-0.5 rounded' :
                                  action.impacto === 'MEJORA TIEMPOS' ? 'text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded' :
                                  action.impacto === 'RIESGOS DE ACCIDENTES' ? 'text-red-700 bg-red-50 px-1 py-0.5 rounded' :
                                  'text-gray-700'
                                }>
                                  {action.impacto}
                                </span>
                              ) : '—'}
                            </div>
                          </td>

                          {/* ── ACCIÓN · CORRECTIVA — v2.86: 3 columnas (Acción+Etiqueta+Destino).
                              Solo source='inventario' trae estos datos; para otros orígenes
                              se muestran vacíos (—) ya que no hay inventario asociado. ── */}
                          <td className="bg-sky-50 px-1 py-1 border border-sky-200">
                            <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate font-medium" title={action.accionDecision || '—'}>
                              {action.accionDecision || '—'}
                            </div>
                          </td>
                          <td className="bg-sky-50 px-1 py-1 border border-sky-200">
                            <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.accionEtiqueta || '—'}>
                              {action.accionEtiqueta || '—'}
                            </div>
                          </td>
                          <td className="bg-sky-50 px-1 py-1 border border-sky-200">
                            <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.accionDestino || '—'}>
                              {action.accionDestino || '—'}
                            </div>
                          </td>
                          {/* v2.85: Acción Preventiva — automática "N/A" para items
                              del inventario (S1/S2). Para otros orígenes, manual. */}
                          <td className={`${SECTION_COLORS.accion} px-1 py-1 border border-sky-200`}>
                            {action.source === 'inventario' ? (
                              <div className="h-6 text-[10px] px-1 flex items-center justify-center text-gray-500 italic" title="Automática: los items del inventario no llevan acción preventiva">
                                N/A <span className="ml-1 text-[8px] text-gray-400">(auto)</span>
                              </div>
                            ) : (
                              <Select
                                value={action.accionPreventiva || 'N/A'}
                                onValueChange={val => handleUpdateField(action.id, 'accionesPreventivas', val)}
                              >
                                <SelectTrigger className="h-6 text-[10px] p-0 px-1 bg-transparent border-0 w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                  {ACCION_PREVENTIVA_OPTIONS.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </td>

                          {/* Orange section: Seguimiento */}
                          <td className={`${SECTION_COLORS.seguimiento} px-1 py-1 border border-orange-200`}>
                            <Select
                              value={action.semanaPrevista || '__none__'}
                              onValueChange={val => handleUpdateField(action.id, 'semanaPrevista', val === '__none__' ? '' : val)}
                            >
                              <SelectTrigger className="h-6 text-[10px] p-0 px-1 bg-transparent border-0 w-16">
                                <SelectValue placeholder="Sem" />
                              </SelectTrigger>
                              <SelectContent className="max-h-48">
                                <SelectItem value="__none__">—</SelectItem>
                                {WEEK_OPTIONS.map(w => (
                                  <SelectItem key={w} value={w}>{w}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          {/* v2.78: "Verificado por" — User picker (verificadoPorId FK) */}
                          <td className={`${SECTION_COLORS.seguimiento} px-1 py-1 border border-orange-200`}>
                            <Select
                              value={action.verificadoPorId || '__none__'}
                              onValueChange={val => handleUpdateField(action.id, 'verificadoPorId', val === '__none__' ? null : val)}
                            >
                              <SelectTrigger className="h-6 text-[10px] p-0 px-1 bg-transparent border-0 w-28">
                                <SelectValue placeholder="—" />
                              </SelectTrigger>
                              <SelectContent className="max-h-60">
                                <SelectItem value="__none__">—</SelectItem>
                                {projectMembers.map(m => (
                                  <SelectItem key={m.id} value={m.id} title={m.email}>
                                    {m.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className={`${SECTION_COLORS.seguimiento} px-1 py-1 border border-orange-200 text-center`}>
                            <div className="h-6 text-[10px] px-1 flex items-center justify-center text-gray-700 font-medium" title={`Progreso automático según estado (${action.estado})`}>
                              {action.porcentaje}%
                            </div>
                          </td>
                          <td className={`${SECTION_COLORS.seguimiento} px-1 py-1 border border-orange-200`}>
                            <Select
                              value={action.estado}
                              onValueChange={val => handleUpdateField(action.id, 'estado', val)}
                            >
                              <SelectTrigger className="h-6 text-[10px] p-0 px-1 bg-transparent border-0 w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {ESTADO_OPTIONS.map(opt => (
                                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className={`${SECTION_COLORS.seguimiento} px-1 py-1 border border-orange-200`}>
                            <Select
                              value={action.semanaReal || '__none__'}
                              onValueChange={val => handleUpdateField(action.id, 'semanaReal', val === '__none__' ? '' : val)}
                            >
                              <SelectTrigger className="h-6 text-[10px] p-0 px-1 bg-transparent border-0 w-16">
                                <SelectValue placeholder="Sem" />
                              </SelectTrigger>
                              <SelectContent className="max-h-48">
                                <SelectItem value="__none__">—</SelectItem>
                                {WEEK_OPTIONS.map(w => (
                                  <SelectItem key={w} value={w}>{w}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-1 py-1 border border-gray-200 text-center">
                            <button
                              onClick={() => handleDeleteAction(action.id)}
                              className="text-red-400 hover:text-red-600 transition-colors"
                              title="Eliminar entrada"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer with completion button */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-muted-foreground">
                Mín. {ACTION_PLAN_MIN_ITEMS} entradas para completar el paso
              </div>
              <Button
                onClick={handleComplete}
                disabled={!canComplete || isReadOnly}
                style={canComplete ? { backgroundColor: sStepData?.color } : undefined}
              >
                Completar Plan de Acción ({totalActions}/{ACTION_PLAN_MIN_ITEMS} mín.)
              </Button>
            </div>
          </div>
        )}

        {/* v2.77: Diálogo de decisión de cierre */}
        {closeDialog && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900">Cerrar acción</h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {closeDialog.hallazgo || 'Sin descripción'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700">
                  Decisión de cierre
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCloseDecision('Resuelto')}
                    className={`p-2 text-xs rounded-md border-2 transition-colors ${
                      closeDecision === 'Resuelto'
                        ? 'border-green-500 bg-green-50 text-green-700 font-bold'
                        : 'border-gray-200 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    ✓ Resuelto
                  </button>
                  <button
                    type="button"
                    onClick={() => setCloseDecision('Retirar')}
                    className={`p-2 text-xs rounded-md border-2 transition-colors ${
                      closeDecision === 'Retirar'
                        ? 'border-amber-500 bg-amber-50 text-amber-700 font-bold'
                        : 'border-gray-200 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    📦 A Jaula
                  </button>
                  <button
                    type="button"
                    onClick={() => setCloseDecision('Eliminar')}
                    className={`p-2 text-xs rounded-md border-2 transition-colors ${
                      closeDecision === 'Eliminar'
                        ? 'border-red-500 bg-red-50 text-red-700 font-bold'
                        : 'border-gray-200 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    🗑 Eliminar
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                  {closeDecision === 'Resuelto' && 'La acción se da por cerrada sin tocar la Jaula.'}
                  {closeDecision === 'Retirar' && 'Se crea un nuevo item en la Jaula de cuarentena para este hallazgo.'}
                  {closeDecision === 'Eliminar' && 'Se registra como eliminado/residuo (no entra en la Jaula).'}
                </p>
              </div>

              {closeDecision === 'Retirar' && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Días de cuarentena
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={365}
                    value={closeDiasCuarentena}
                    onChange={e => setCloseDiasCuarentena(parseInt(e.target.value) || 40)}
                    className="w-24"
                  />
                  <p className="text-[10px] text-gray-500">
                    Pasados esos días, el item quedará reclamable/transferible.
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" onClick={cancelCloseDecision}>
                  Cancelar
                </Button>
                <Button size="sm" onClick={confirmCloseDecision}>
                  Confirmar cierre
                </Button>
              </div>
            </div>
          </div>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
