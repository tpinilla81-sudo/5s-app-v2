'use client';

import { useState, useEffect, useCallback, Fragment } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ListChecks, Plus, Trash2, Loader2, Filter, ChevronDown,
  FileText, User, Calendar, Target, ArrowRight, CheckCircle2,
  Clock, AlertCircle, X, Expand,
} from 'lucide-react';
import { toast } from 'sonner';
import { use5SStore } from '@/lib/store';
import { S_STEPS } from '@/lib/5s-constants';

// ═══════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════
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
  hallazgo: string;
  impacto: string; // v2.79: en HALLAZGO (antes impactoObjetivo en ACCIÓN)
  // v2.79: campos de ACCIÓN autorellenos desde el inventario (extra snapshot)
  accionCategoria: string;
  accionElemento: string;
  accionCantidad: string;
  // v2.81: ACCIÓN subdividida en Correctiva (3 cols) + Preventiva (1 col manual)
  accionDecision: string;       // Correctiva
  accionEtiqueta: string;       // Correctiva
  accionDestino: string;        // Correctiva
  accionPreventiva: string;     // Preventiva — Decisión manual (N/A por defecto)
  // SEGUIMIENTO
  semanaPrevista: string;
  porcentaje: number;
  estado: string;
  semanaReal: string;
  sStep: number;
  miniStep: number;
  zoneName: string;
  source?: string;
  extra?: any | null;
}

// v2.72: helper para saber si una entrada viene del inventario
function isInventarioSource(a: ActionItemData): boolean {
  return a.source === 'inventario' || (a.extra && a.extra.inventoryItemId);
}

// v2.72: componente visual del snapshot de inventario (compartido desktop + mobile)
function OrigenInventarioPanel({ extra, compact = false }: { extra: any; compact?: boolean }) {
  if (!extra) {
    return (
      <div className="text-[10px] italic text-gray-400 py-1">
        Sin datos de inventario asociados (entrada manual).
      </div>
    );
  }
  const fields: { label: string; value: any }[] = [
    { label: 'Elemento', value: extra.elemento },
    { label: 'Ubicación', value: extra.ubicacion },
    { label: 'Categoría', value: extra.categoria },
    { label: 'Cantidad', value: extra.cantidad },
    { label: 'Precio (€)', value: extra.precio != null ? Number(extra.precio).toFixed(2) : null },
    { label: 'Estado', value: extra.estado },
    { label: 'Frec. uso', value: extra.frecuenciaUso },
    { label: 'Decisión', value: extra.decision },
    { label: 'Días cuar.', value: extra.diasCuarentena },
    { label: 'Etiquetas', value: extra.etiquetas },
    { label: 'Z. Origen', value: extra.zonaOrigen },
    { label: 'Z. Destino', value: extra.zonaDestino },
  ];
  return (
    <div className={`grid gap-x-3 gap-y-1 ${compact ? 'grid-cols-2' : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6'}`}>
      {fields.map(f => (
        <div key={f.label} className="min-w-0">
          <div className="text-[9px] font-bold text-emerald-700 uppercase tracking-wide leading-tight">{f.label}</div>
          <div className="text-[11px] text-gray-800 truncate" title={String(f.value ?? '')}>
            {f.value != null && String(f.value) !== '' ? String(f.value) : <span className="text-gray-300">—</span>}
          </div>
        </div>
      ))}
      {Array.isArray(extra.photoUrls) && extra.photoUrls.length > 0 && (
        <div className="col-span-2 sm:col-span-3 md:col-span-6 mt-1">
          <div className="text-[9px] font-bold text-emerald-700 uppercase tracking-wide mb-1">Fotos del hallazgo</div>
          <div className="flex gap-1.5 flex-wrap">
            {extra.photoUrls.map((url: string, i: number) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                className="block w-12 h-12 rounded border border-emerald-200 overflow-hidden bg-emerald-50 hover:scale-110 transition-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface ZoneData {
  id: string;
  name: string;
}

const ESTADO_OPTIONS = [
  { value: 'abierta', label: 'Abierta', color: 'bg-red-100 text-red-800', icon: AlertCircle },
  { value: 'en_proceso', label: 'En Proceso', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  { value: 'resuelta', label: 'Resuelta', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  { value: 'cerrada', label: 'Cerrada', color: 'bg-gray-100 text-gray-600', icon: X },
];

// v2.81: Opciones para la decisión de Acción Preventiva (manual).
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

const WEEK_OPTIONS = Array.from({ length: 53 }, (_, i) => `W${i + 1}`);

const S_COLORS: Record<number, string> = {
  1: '#8B5CF6', 2: '#EAB308', 3: '#3B82F6', 4: '#F43F5E', 5: '#F97316',
};

const S_BG_COLORS: Record<number, string> = {
  1: 'bg-violet-100 text-violet-800',
  2: 'bg-yellow-100 text-yellow-800',
  3: 'bg-blue-100 text-blue-800',
  4: 'bg-rose-100 text-rose-800',
  5: 'bg-orange-100 text-orange-800',
};

const SECTION_COLORS = {
  demandante: 'bg-amber-50 border-amber-300',
  accion: 'bg-sky-50 border-sky-300',
  seguimiento: 'bg-orange-50 border-orange-300',
};

// ═══════════════════════════════════════════════════════
// S-Step Badge Component
// ═══════════════════════════════════════════════════════
function SStepBadge({ sStep, compact = false }: { sStep: number; compact?: boolean }) {
  const stepData = S_STEPS.find(s => s.id === sStep);
  if (compact) {
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-md text-white font-black text-[10px] shrink-0"
        style={{ backgroundColor: S_COLORS[sStep] }}
        title={stepData ? `S${sStep} — ${stepData.japaneseName} (${stepData.spanishName})` : `S${sStep}`}
      >
        S{sStep}
      </span>
    );
  }
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white font-black text-xs shrink-0"
        style={{ backgroundColor: S_COLORS[sStep] }}
      >
        S{sStep}
      </span>
      <span className="text-[11px] font-semibold hidden sm:inline" style={{ color: S_COLORS[sStep] }}>
        {stepData?.japaneseName}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// New Entry Dialog
// ═══════════════════════════════════════════════════════
function NewEntryDialog({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (sStep: number) => void;
}) {
  const [selectedS, setSelectedS] = useState<number>(1);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-rose-600" />
            Nueva Entrada — Plan de Acción
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Selecciona desde qué S proviene la evidencia:
          </p>
          <div className="grid grid-cols-5 gap-2">
            {S_STEPS.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedS(s.id)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                  selectedS === s.id
                    ? 'scale-105 shadow-md'
                    : 'opacity-60 hover:opacity-80'
                }`}
                style={{
                  borderColor: selectedS === s.id ? S_COLORS[s.id] : 'transparent',
                  backgroundColor: selectedS === s.id ? S_COLORS[s.id] + '15' : 'transparent',
                }}
              >
                <span
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-sm"
                  style={{ backgroundColor: S_COLORS[s.id] }}
                >
                  S{s.id}
                </span>
                <span className="text-[10px] font-semibold" style={{ color: S_COLORS[s.id] }}>
                  {s.japaneseName}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button
            onClick={() => onConfirm(selectedS)}
            style={{ backgroundColor: S_COLORS[selectedS] }}
            className="text-white gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Crear en S{selectedS}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ═══════════════════════════════════════════════════════
// Mobile Action Card (for small screens)
// ═══════════════════════════════════════════════════════
function ActionCard({
  action,
  onUpdateField,
  onDelete,
  projectMembers,
}: {
  action: ActionItemData;
  onUpdateField: (id: string, field: string, value: any) => void;
  onDelete: (id: string) => void;
  projectMembers: Array<{ id: string; name: string; email: string; role: string }>;
}) {
  const [expanded, setExpanded] = useState(false);
  const estadoInfo = ESTADO_OPTIONS.find(e => e.value === action.estado) || ESTADO_OPTIONS[0];

  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      {/* Card header — always visible */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <SStepBadge sStep={action.sStep} compact />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs text-gray-500">#{action.numeroEntrada}</span>
            <span className="text-xs text-muted-foreground truncate">
              {action.hallazgo || 'Sin descripción'}
            </span>
          </div>
        </div>
        <Badge className={`text-[10px] px-1.5 py-0 ${estadoInfo.color}`}>
          {estadoInfo.label}
        </Badge>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </div>

      {/* Compact summary line */}
      {!expanded && (
        <div className="px-3 pb-2.5 flex items-center gap-3 text-[11px] text-muted-foreground">
          {action.personaDemandadaName && (
            <span className="flex items-center gap-1"><User className="h-3 w-3" />{action.personaDemandadaName}</span>
          )}
          {action.semanaPrevista && (
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{action.semanaPrevista}</span>
          )}
          <span className="flex items-center gap-1"><Target className="h-3 w-3" />{action.porcentaje}%</span>
        </div>
      )}

      {/* Expanded details */}
      {expanded && (
        <div className="border-t px-3 py-3 space-y-3">
          {/* HALLAZGO */}
          <div>
            <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <FileText className="h-3 w-3" /> Hallazgo
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              <Field label="Fecha" compact>
                <Input type="date" value={action.fechaEntrada} onChange={e => onUpdateField(action.id, 'fechaEntrada', e.target.value)}
                  className="h-7 text-xs p-0 px-1.5 border rounded" />
              </Field>
              <Field label="Semana" compact>
                <Select value={action.semana || 'W1'} onValueChange={v => onUpdateField(action.id, 'semana', v)}>
                  <SelectTrigger className="h-7 text-xs p-0 px-1.5 border rounded w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-48">
                    {WEEK_OPTIONS.map(w => <SelectItem key={w} value={w} className="text-xs">{w}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Detectado por" compact>
                <div className="text-[11px] px-1 py-1 flex flex-col">
                  <span className="font-medium">{action.comunicadoPorName || '—'}</span>
                  <span className="text-[9px] text-amber-700/80">
                    {(() => {
                      const s = action.sStep ? `S${action.sStep} · ` : '';
                      if (action.miniStep === 5) return `${s}Paso 5 · Auditoría`;
                      if (action.miniStep === 4) return `${s}Paso 4 · Autoeval`;
                      if (action.source === 'inventario') return `${s}Paso 3 · Inventario`;
                      return `${s}Paso 3 · Plan S5`;
                    })()}
                  </span>
                </div>
              </Field>
              <Field label="Zona" compact>
                <div className="text-[11px] px-1 py-1 text-gray-700 truncate">{action.zonaName || '—'}</div>
              </Field>
              <Field label="Responsable" compact>
                <Select
                  value={action.personaDemandadaId || '__none__'}
                  onValueChange={val => onUpdateField(action.id, 'personaDemandadaId', val === '__none__' ? null : val)}
                >
                  <SelectTrigger className="h-7 text-xs p-0 px-1.5 border rounded w-full">
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="__none__" className="text-xs">—</SelectItem>
                    {projectMembers.map(m => (
                      <SelectItem key={m.id} value={m.id} className="text-xs" title={`${m.email} (${m.role})`}>
                        {m.name} <span className="text-[9px] opacity-60">· {m.role}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Impacto" compact>
                <div className="text-xs p-1.5 border rounded min-h-[40px] flex items-center" title={`Impacto auto-clasificado: ${action.impacto || '—'}`}>
                  {action.impacto ? (
                    <span className={
                      action.impacto === 'CALIDAD' ? 'text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px] font-semibold' :
                      action.impacto === 'MEJORA TIEMPOS' ? 'text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-semibold' :
                      action.impacto === 'RIESGOS DE ACCIDENTES' ? 'text-red-700 bg-red-50 px-2 py-0.5 rounded text-[10px] font-semibold' :
                      'text-gray-700 text-[10px]'
                    }>
                      {action.impacto}
                    </span>
                  ) : <span className="text-gray-400 text-[10px]">—</span>}
                </div>
              </Field>
            </div>
          </div>

          {/* ACCIÓN (autorelleno desde inventario) */}
          <div>
            <div className="text-[10px] font-bold text-sky-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <ArrowRight className="h-3 w-3" /> Acción
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              <Field label="Categoría" compact>
                <div className="text-[11px] px-1 py-1 text-gray-700 truncate">{action.accionCategoria || '—'}</div>
              </Field>
              <Field label="Elemento" compact>
                <div className="text-[11px] px-1 py-1 text-gray-700 truncate">{action.accionElemento || '—'}</div>
              </Field>
              <Field label="Cantidad" compact>
                <div className="text-[11px] px-1 py-1 text-gray-700">{action.accionCantidad || '—'}</div>
              </Field>
              <Field label="Decisión" compact>
                <div className="text-[11px] px-1 py-1 text-gray-700 truncate">{action.accionDecision || '—'}</div>
              </Field>
              <Field label="Etiqueta" compact>
                <div className="text-[11px] px-1 py-1 text-gray-700 truncate">{action.accionEtiqueta || '—'}</div>
              </Field>
              <Field label="Destino" compact>
                <div className="text-[11px] px-1 py-1 text-gray-700 truncate">{action.accionDestino || '—'}</div>
              </Field>
              {/* v2.85: Acción Preventiva — automática "N/A" para items del
                  inventario (S1/S2). Para otros orígenes, manual. */}
              <Field label="Acción Preventiva" compact>
                {action.source === 'inventario' ? (
                  <div className="h-7 text-[11px] px-1.5 py-1 flex items-center text-gray-500 italic" title="Automática: los items del inventario no llevan acción preventiva">
                    N/A <span className="ml-1 text-[8px] text-gray-400">(auto)</span>
                  </div>
                ) : (
                  <Select
                    value={action.accionPreventiva || 'N/A'}
                    onValueChange={val => onUpdateField(action.id, 'accionesPreventivas', val)}
                  >
                    <SelectTrigger className="h-7 text-xs p-0 px-1.5 border rounded w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {ACCION_PREVENTIVA_OPTIONS.map(opt => (
                        <SelectItem key={opt.value} value={opt.value} className="text-xs">{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </Field>
            </div>
          </div>

          {/* SEGUIMIENTO */}
          <div>
            <div className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Seguimiento
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              <Field label="Sem. Prevista" compact>
                <Select value={action.semanaPrevista || 'W1'} onValueChange={v => onUpdateField(action.id, 'semanaPrevista', v)}>
                  <SelectTrigger className="h-7 text-xs p-0 px-1.5 border rounded w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-48">
                    {WEEK_OPTIONS.map(w => <SelectItem key={w} value={w} className="text-xs">{w}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Verificado por" compact>
                <Select
                  value={action.verificadoPorId || '__none__'}
                  onValueChange={val => onUpdateField(action.id, 'verificadoPorId', val === '__none__' ? null : val)}
                >
                  <SelectTrigger className="h-7 text-xs p-0 px-1.5 border rounded w-full">
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="__none__" className="text-xs">—</SelectItem>
                    {projectMembers.map(m => (
                      <SelectItem key={m.id} value={m.id} className="text-xs" title={`${m.email} (${m.role})`}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Estado" compact>
                <Select value={action.estado} onValueChange={v => onUpdateField(action.id, 'estado', v)}>
                  <SelectTrigger className="h-7 text-xs p-0 px-1.5 border rounded w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ESTADO_OPTIONS.map(opt => (
                      <SelectItem key={opt.value} value={opt.value} className="text-xs">{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Progreso %" compact>
                <Input type="number" min={0} max={100} value={action.porcentaje}
                  onChange={e => onUpdateField(action.id, 'porcentaje', Number(e.target.value))}
                  className="h-7 text-xs p-0 px-1.5 border rounded w-full text-center" />
              </Field>
              <Field label="Sem. Real" compact>
                <Select value={action.semanaReal || 'W1'} onValueChange={v => onUpdateField(action.id, 'semanaReal', v)}>
                  <SelectTrigger className="h-7 text-xs p-0 px-1.5 border rounded w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-48">
                    {WEEK_OPTIONS.map(w => <SelectItem key={w} value={w} className="text-xs">{w}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </div>

          {/* Delete button */}
          <div className="flex justify-end pt-1">
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 gap-1 text-xs h-7"
              onClick={() => onDelete(action.id)}>
              <Trash2 className="h-3.5 w-3.5" /> Eliminar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// Field helper for mobile cards
// ═══════════════════════════════════════════════════════
function Field({ label, children, compact = false }: { label: string; children: React.ReactNode; compact?: boolean }) {
  return (
    <div className={compact ? '' : 'space-y-1'}>
      <label className="text-[10px] font-medium text-muted-foreground leading-tight block">{label}</label>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// Main Component — Unified Plan de Acción
// ═══════════════════════════════════════════════════════
export default function PlanDeAccionView() {
  const { currentUser, currentProject, currentZone } = use5SStore();
  const [actions, setActions] = useState<ActionItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterEstado, setFilterEstado] = useState<string>('all');
  const [filterS, setFilterS] = useState<string>('all');
  // v2.76: filtro por origen (tabs unificados) — 'all' | 'manual' | 'inventario' | 'hallazgo'
  //   'manual'     → source='actionplan' (entradas manuales del Plan de Acción S5 paso 3)
  //   'inventario' → source='inventario' (items del inventario S1-S4 paso 3 con decisión)
  //   'hallazgo'   → source in ['autoevaluacion','auditoria'] (NOKs de pasos 4 y 5)
  const [filterOrigen, setFilterOrigen] = useState<string>('all');
  const [zones, setZones] = useState<ZoneData[]>([]);
  // v2.79: miembros del proyecto para los User pickers (Responsable, Verificado por)
  const [projectMembers, setProjectMembers] = useState<Array<{ id: string; name: string; email: string; role: string }>>([]);
  const [showNewDialog, setShowNewDialog] = useState(false);

  // Load zones + project members
  useEffect(() => {
    if (!currentProject) return;
    const loadZones = async () => {
      try {
        const res = await fetch(`/api/projects/${currentProject.id}/zones`);
        if (res.ok) {
          const json = await res.json();
          setZones(json.zones || json.data || []);
        }
      } catch (e) { console.error('Error loading zones:', e); }
    };
    const loadProjectMembers = async () => {
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
      } catch (e) { console.error('Error loading project members:', e); }
    };
    loadZones();
    loadProjectMembers();
  }, [currentProject?.id]);

  // Load ALL actions for the project
  const loadActions = useCallback(async () => {
    if (!currentProject?.id) return;
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('projectId', currentProject.id);
      if (currentUser?.id) params.set('userId', currentUser.id);
      if (currentUser?.role) params.set('userRole', currentUser.role);
      const res = await fetch(`/api/actions?${params.toString()}`);
      const json = await res.json();
      if (json.success && json.data) {
        setActions(json.data.map((a: any) => ({
          id: a.id,
          numeroEntrada: a.numeroEntrada || 0,
          fechaEntrada: a.fechaEntrada ? new Date(a.fechaEntrada).toISOString().split('T')[0] : (a.createdAt ? new Date(a.createdAt).toISOString().split('T')[0] : ''),
          // v2.78/v2.79: FKs a User
          comunicadoPorId: a.comunicadoPorId || null,
          comunicadoPorName: a.comunicadoPorUser?.name || a.comunicadoPor || '',
          personaDemandadaId: a.personaDemandadaId || null,
          personaDemandadaName: a.personaDemandadaUser?.name || a.personaDemandada || '',
          verificadoPorId: a.verificadoPorId || null,
          verificadoPorName: a.verificadoPorUser?.name || a.verificadoPor || '',
          semana: a.semana || '',
          // v2.79: simplificado — solo Zona
          zonaName: a.zone?.name || a.clienteZona || '',
          hallazgo: a.hallazgo || a.itemDescription || '',
          impacto: a.impactoObjetivo || '',
          // v2.79: campos de ACCIÓN autorellenos desde el inventario (extra)
          accionCategoria: a.extra?.categoria || '',
          accionElemento: a.extra?.elemento || '',
          accionCantidad: a.extra?.cantidad != null ? String(a.extra.cantidad) : '',
          accionDecision: a.extra?.decision || '',
          // v2.85: Etiqueta auto según S-step.
          //   S1 (innecesarios): etiqueta del inventario (para imprimir)
          //   S2-S5: "No aplica" (los necesarios no se etiquetan para impresión)
          accionEtiqueta: (() => {
            const raw = a.extra?.etiquetas || ''
            if (raw && raw.trim()) return raw
            // Si no hay etiqueta y viene de inventario S2-S5, mostrar "No aplica"
            if (a.source === 'inventario' && a.sStep && a.sStep !== 1) return 'No aplica'
            // Si no hay etiqueta y viene de inventario S1, también "No aplica"
            if (a.source === 'inventario' && a.sStep === 1) return 'No aplica'
            return ''
          })(),
          accionDestino: a.extra?.zonaDestino || '',
          // v2.85: Acción Preventiva — automática "N/A" para items del
          // inventario (S1/S2). Para otros orígenes, manual con default 'N/A'.
          accionPreventiva: a.accionesPreventivas || 'N/A',
          // SEGUIMIENTO
          semanaPrevista: a.semanaPrevista || '',
          porcentaje: a.porcentaje || 0,
          estado: a.estado || 'abierta',
          semanaReal: a.semanaReal || '',
          sStep: a.sStep || 1,
          miniStep: a.miniStep || 4,
          zoneName: a.zone?.name || '',
          source: a.source || '',
          extra: a.extra || null,
        })));
      }
    } catch (e) {
      console.error('Error loading actions:', e);
      toast.error('Error al cargar las acciones');
    } finally {
      setIsLoading(false);
    }
  }, [currentProject?.id, currentUser?.id, currentUser?.role]);

  useEffect(() => { loadActions(); }, [loadActions]);

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

  const handleAddAction = async (sStep: number) => {
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
          miniStep: 4,
          itemId: `PA-${sStep}-${Date.now()}`,
          itemDescription: '',
          hallazgo: '',
          source: 'actionplan',
          projectId: currentProject.id,
          zoneId: currentZone?.id || null,
          numeroEntrada: nextNumero,
          fechaEntrada: today,
          semana: currentWeek,
          estado: 'abierta',
          enviado: 'Pendiente',
          porcentaje: 0,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success(`Entrada creada en S${sStep}`);
        await loadActions();
      } else {
        toast.error(`Error: ${json.error || 'Error desconocido'}`);
      }
    } catch (e) {
      console.error('Error adding action:', e);
      toast.error('Error de conexión');
    }
    setShowNewDialog(false);
  };

  const handleUpdateField = async (actionId: string, field: string, value: any) => {
    setActions(prev => prev.map(a => a.id === actionId ? { ...a, [field]: value } : a));
    try {
      const res = await fetch(`/api/actions?id=${actionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      });
      const json = await res.json();
      if (!json.success) {
        toast.error(`Error al actualizar: ${json.error || 'Error desconocido'}`);
        await loadActions();
      }
    } catch (e) {
      console.error('Error updating action:', e);
      await loadActions();
    }
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
    } catch (e) {
      console.error('Error deleting action:', e);
      toast.error('Error de conexión');
    }
  };

  // Filter actions
  const filteredActions = actions
    .filter(a => filterEstado === 'all' || a.estado === filterEstado)
    .filter(a => filterS === 'all' || a.sStep === Number(filterS))
    // v2.76: filtro por origen unificado
    .filter(a => {
      if (filterOrigen === 'all') return true;
      const src = a.source || 'actionplan';
      if (filterOrigen === 'manual') return src === 'actionplan';
      if (filterOrigen === 'inventario') return src === 'inventario' || !!a.extra?.inventoryItemId;
      if (filterOrigen === 'hallazgo') return src === 'autoevaluacion' || src === 'auditoria';
      return true;
    });

  // Stats
  const totalActions = actions.length;
  const completedActions = actions.filter(a => a.estado === 'resuelta' || a.estado === 'cerrada').length;
  const openActions = actions.filter(a => a.estado === 'abierta').length;
  const inProgressActions = actions.filter(a => a.estado === 'en_proceso').length;

  const getEstadoBadge = (estado: string) => {
    const opt = ESTADO_OPTIONS.find(e => e.value === estado);
    return opt || ESTADO_OPTIONS[0];
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-3 sm:px-4 py-2.5 border-b bg-white shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <ListChecks className="h-5 w-5 text-rose-600 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold truncate">Plan de Acción</h2>
            <Badge variant="outline" className="text-[10px] shrink-0 hidden sm:inline-flex">
              {totalActions} entrada{totalActions !== 1 ? 's' : ''}
            </Badge>
          </div>
          <Button size="sm" className="gap-1 text-xs h-8 shrink-0" onClick={() => setShowNewDialog(true)}
            style={{ backgroundColor: '#E11D48' }}>
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Nueva Entrada</span>
            <span className="sm:hidden">Nueva</span>
          </Button>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterEstado('all')}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium border transition-colors whitespace-nowrap ${
              filterEstado === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            Todas {totalActions}
          </button>
          <button
            onClick={() => setFilterEstado('abierta')}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium border transition-colors whitespace-nowrap ${
              filterEstado === 'abierta' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-red-600 border-red-200 hover:bg-red-50'
            }`}
          >
            <AlertCircle className="h-3 w-3" /> Abiertas {openActions}
          </button>
          <button
            onClick={() => setFilterEstado('en_proceso')}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium border transition-colors whitespace-nowrap ${
              filterEstado === 'en_proceso' ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-yellow-600 border-yellow-200 hover:bg-yellow-50'
            }`}
          >
            <Clock className="h-3 w-3" /> En Proceso {inProgressActions}
          </button>
          <button
            onClick={() => setFilterEstado('resuelta')}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium border transition-colors whitespace-nowrap ${
              filterEstado === 'resuelta' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-green-600 border-green-200 hover:bg-green-50'
            }`}
          >
            <CheckCircle2 className="h-3 w-3" /> Resueltas {completedActions}
          </button>

          {/* S-step filter pills */}
          <div className="h-4 w-px bg-gray-200 mx-1 shrink-0" />
          {S_STEPS.map(s => {
            const count = actions.filter(a => a.sStep === s.id).length;
            return (
              <button
                key={s.id}
                onClick={() => setFilterS(filterS === String(s.id) ? 'all' : String(s.id))}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium border transition-colors whitespace-nowrap ${
                  filterS === String(s.id)
                    ? 'text-white border-transparent'
                    : 'bg-white border-gray-200 hover:opacity-80'
                }`}
                style={filterS === String(s.id) ? { backgroundColor: S_COLORS[s.id], borderColor: S_COLORS[s.id] } : { color: S_COLORS[s.id] }}
              >
                S{s.id} ({count})
              </button>
            );
          })}

          {/* Reset filters */}
          {(filterEstado !== 'all' || filterS !== 'all' || filterOrigen !== 'all') && (
            <button
              onClick={() => { setFilterEstado('all'); setFilterS('all'); setFilterOrigen('all'); }}
              className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              <X className="h-3 w-3" /> Limpiar
            </button>
          )}
        </div>

        {/* v2.76/v2.78: Fila de pestañas por origen — unificación de tablas.
            Etiquetas según definición del usuario:
              - "Plan S5"     → entradas manuales del Plan de Acción (S5 paso 3)
              - "Inventario"  → items del inventario (S1-S4 paso 3) con decisión
              - "Hallazgos 4-5" → NOKs detectados en autoeval (paso 4) o auditoría (paso 5)
              - "Todo"        → combinado con badge de origen
        */}
        <div className="flex items-center gap-1.5 mt-1.5 overflow-x-auto pb-1">
          <span className="text-[10px] text-muted-foreground shrink-0 mr-1">Origen:</span>
          {([
            { key: 'all', label: '📊 Todo', color: 'gray', count: actions.length },
            { key: 'manual', label: '📋 Plan S5', color: 'rose', count: actions.filter(a => (a.source || 'actionplan') === 'actionplan').length },
            { key: 'inventario', label: '📦 Inventario', color: 'emerald', count: actions.filter(a => a.source === 'inventario' || !!a.extra?.inventoryItemId).length },
            { key: 'hallazgo', label: '🔍 Hallazgos 4-5', color: 'purple', count: actions.filter(a => a.source === 'autoevaluacion' || a.source === 'auditoria').length },
          ] as const).map(tab => {
            const isActive = filterOrigen === tab.key;
            const colorMap: Record<string, { active: string; inactive: string }> = {
              gray: { active: 'bg-gray-900 text-white border-gray-900', inactive: 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50' },
              rose: { active: 'bg-rose-600 text-white border-rose-600', inactive: 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50' },
              emerald: { active: 'bg-emerald-600 text-white border-emerald-600', inactive: 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50' },
              purple: { active: 'bg-purple-600 text-white border-purple-600', inactive: 'bg-white text-purple-600 border-purple-200 hover:bg-purple-50' },
            };
            const c = colorMap[tab.color];
            return (
              <button
                key={tab.key}
                onClick={() => setFilterOrigen(tab.key)}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium border transition-colors whitespace-nowrap ${isActive ? c.active : c.inactive}`}
              >
                {tab.label} <span className="opacity-70">({tab.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-rose-500 animate-spin" />
        </div>
      ) : filteredActions.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <ListChecks className="h-12 w-12 text-gray-300 mb-3" />
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {actions.length === 0 ? 'No hay entradas en el Plan de Acción' : 'No hay entradas con estos filtros'}
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            {actions.length === 0 ? 'Pulsa "Nueva Entrada" para crear la primera.' : 'Cambia los filtros o limpia la selección.'}
          </p>
          {actions.length === 0 && (
            <Button size="sm" className="gap-1 text-xs" onClick={() => setShowNewDialog(true)}
              style={{ backgroundColor: '#E11D48' }}>
              <Plus className="h-3.5 w-3.5" /> Nueva Entrada
            </Button>
          )}
        </div>
      ) : (
        <>
          {/* MOBILE: Card-based layout */}
          <div className="flex-1 min-h-0 overflow-auto p-3 space-y-2 lg:hidden">
            {filteredActions.map(action => (
              <ActionCard
                key={action.id}
                action={action}
                onUpdateField={handleUpdateField}
                onDelete={handleDeleteAction}
                projectMembers={projectMembers}
              />
            ))}
          </div>

          {/* DESKTOP: Table layout */}
          <div className="flex-1 min-h-0 overflow-auto p-4 hidden lg:block">
            <div className="overflow-auto border rounded-lg">
              <table className="w-full text-xs border-collapse min-w-[1200px]">
                <thead className="sticky top-0 z-10">
                  <tr>
                    <th colSpan={1} className="bg-gray-600 text-white px-1.5 py-1.5 text-center font-bold border border-gray-500">
                      Origen
                    </th>
                    {/* v2.81: HALLAZGO 10 cols, ACCIÓN 4 cols (3 Correctiva + 1 Preventiva) */}
                    <th colSpan={10} className="bg-amber-400 text-white px-2 py-1.5 text-center text-xs font-bold border border-amber-500">
                      HALLAZGO
                    </th>
                    <th colSpan={4} className="bg-sky-400 text-white px-2 py-1.5 text-center text-xs font-bold border border-sky-500">
                      ACCIÓN
                    </th>
                    <th colSpan={5} className="bg-orange-400 text-white px-2 py-1.5 text-center text-xs font-bold border border-orange-500">
                      SEGUIMIENTO
                    </th>
                    <th className="bg-gray-400 text-white px-1 py-1.5 text-center text-xs font-bold border border-gray-500 w-8">
                      🗑
                    </th>
                  </tr>
                  <tr>
                    {/* Origen column */}
                    <th className="bg-gray-500 text-white px-1 py-1 text-center font-semibold border border-gray-400 whitespace-nowrap">S</th>
                    {/* HALLAZGO headers — v2.79: simplificado */}
                    <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Nº</th>
                    <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Fecha</th>
                    <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap" title="Usuario que detectó el hallazgo — automático según el paso: Paso 3 = empleado que registró el inventario, Paso 4 = responsable (autoeval), Paso 5 = auditor">Detectado por</th>
                    <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap" title="Categoría del inventario (innecesario/dudoso/util/...)">Categoría</th>
                    <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap" title="Elemento del inventario">Elemento</th>
                    <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Cantidad</th>
                    <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Semana</th>
                    <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Zona</th>
                    <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap" title="Responsable de resolver (empleado de la zona por defecto)">Responsable</th>
                    <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Impacto</th>
                    {/* ACCIÓN headers — v2.81: 3 Correctiva + 1 Preventiva */}
                    <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap" title="Decisión del inventario (Retirar/Eliminar/...)">Decisión</th>
                    <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Etiqueta</th>
                    <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap" title="Destino del item (zona o Residuo)">Destino</th>
                    <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap" title="Acción preventiva — manual, N/A si no aplica">Decisión</th>
                    {/* SEGUIMIENTO headers */}
                    <th className="bg-orange-400 text-white px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap">Sem. Prevista</th>
                    <th className="bg-orange-400 text-white px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap">Responsable</th>
                    <th className="bg-orange-400 text-white px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap">Estado</th>
                    <th className="bg-orange-400 text-white px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap">Progreso %</th>
                    <th className="bg-orange-400 text-white px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap">Sem. Real</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActions.map((action) => {
                    const estadoInfo = getEstadoBadge(action.estado);
                    return (
                      <Fragment key={action.id}>
                      <tr className={`border-b hover:bg-gray-50 ${action.estado === 'resuelta' || action.estado === 'cerrada' ? 'bg-green-50/50' : ''}`}>
                        {/* Origen S badge */}
                        <td className="px-1 py-1 border text-center bg-gray-50">
                          <span
                            className="inline-flex items-center justify-center w-7 h-7 rounded text-white font-black text-[10px]"
                            style={{ backgroundColor: S_COLORS[action.sStep] }}
                            title={`S${action.sStep} — ${S_STEPS.find(s => s.id === action.sStep)?.japaneseName}`}
                          >
                            S{action.sStep}
                          </span>
                        </td>
                        {/* ── HALLAZGO — v2.79: 7 columnas ── */}
                        <td className={`px-1 py-1 border ${SECTION_COLORS.demandante} text-center font-mono font-bold`}>
                          {action.numeroEntrada || '—'}
                        </td>
                        <td className={`px-1 py-1 border ${SECTION_COLORS.demandante}`}>
                          <Input type="date" value={action.fechaEntrada} onChange={e => handleUpdateField(action.id, 'fechaEntrada', e.target.value)}
                            className="h-6 text-[10px] p-0 px-1 border-0 bg-transparent" />
                        </td>
                        {/* v2.80: Detectado por — read-only, con paso debajo */}
                        <td className={`px-1 py-1 border ${SECTION_COLORS.demandante}`}>
                          <div className="min-h-[24px] text-[10px] px-1 flex flex-col justify-center text-gray-700">
                            <div className="truncate font-medium" title={action.comunicadoPorName || '—'}>
                              {action.comunicadoPorName || '—'}
                            </div>
                            <div className="text-[9px] text-amber-700/80 truncate">
                              {(() => {
                                const s = action.sStep ? `S${action.sStep} · ` : '';
                                if (action.miniStep === 5) return `${s}Paso 5 · Auditoría`;
                                if (action.miniStep === 4) return `${s}Paso 4 · Autoeval`;
                                if (action.source === 'inventario') return `${s}Paso 3 · Inventario`;
                                return `${s}Paso 3 · Plan S5`;
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
                        </td>
                        <td className={`px-1 py-1 border ${SECTION_COLORS.demandante} text-center`}>
                          <Select value={action.semana || 'W1'} onValueChange={v => handleUpdateField(action.id, 'semana', v)}>
                            <SelectTrigger className="h-6 text-[10px] p-0 px-1 border-0 bg-transparent w-16">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-48">
                              {WEEK_OPTIONS.map(w => <SelectItem key={w} value={w} className="text-xs">{w}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </td>
                        {/* v2.79: Zona — read-only */}
                        <td className={`px-1 py-1 border ${SECTION_COLORS.demandante}`}>
                          <div className="h-6 text-[10px] px-1 flex items-center text-gray-700 truncate" title={action.zonaName || '—'}>
                            {action.zonaName || '—'}
                          </div>
                        </td>
                        {/* v2.79: Responsable — User picker (FK). Default = primer empleado del proyecto, fallback responsable */}
                        <td className={`px-1 py-1 border ${SECTION_COLORS.demandante}`}>
                          <Select
                            value={
                              action.personaDemandadaId ||
                              projectMembers.find(m => m.role === 'empleado')?.id ||
                              projectMembers.find(m => m.role === 'responsable')?.id ||
                              '__none__'
                            }
                            onValueChange={val => handleUpdateField(action.id, 'personaDemandadaId', val === '__none__' ? null : val)}
                          >
                            <SelectTrigger className="h-6 text-[10px] p-0 px-1 border-0 bg-transparent w-28">
                              <SelectValue placeholder="—" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              <SelectItem value="__none__" className="text-xs">—</SelectItem>
                              {projectMembers.map(m => (
                                <SelectItem key={m.id} value={m.id} className="text-xs" title={`${m.email} (${m.role})`}>
                                  {m.name} <span className="text-[9px] opacity-60">· {m.role}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        {/* v2.82: Impacto — auto-clasificado (CALIDAD / MEJORA TIEMPOS /
                            RIESGOS DE ACCIDENTES). Read-only: se rellena al crear el
                            ActionItem desde paso 3/4/5. */}
                        <td className={`px-1 py-1 border ${SECTION_COLORS.demandante}`}>
                          <div className="h-6 text-[9px] px-1 flex items-center justify-center text-center font-semibold truncate" title={`Impacto auto-clasificado: ${action.impacto || '—'}`}>
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
                        {/* ── ACCIÓN — v2.80: 3 columnas (decisión / etiqueta / destino) ── */}
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
                        </td>
                        {/* v2.85: Acción Preventiva — automática "N/A" para items
                            del inventario (S1/S2). Para otros orígenes, manual. */}
                        <td className={`px-1 py-1 border ${SECTION_COLORS.accion}`}>
                          {action.source === 'inventario' ? (
                            <div className="h-6 text-[10px] px-1 flex items-center justify-center text-gray-500 italic" title="Automática: los items del inventario no llevan acción preventiva">
                              N/A <span className="ml-1 text-[8px] text-gray-400">(auto)</span>
                            </div>
                          ) : (
                            <Select
                              value={action.accionPreventiva || 'N/A'}
                              onValueChange={val => handleUpdateField(action.id, 'accionesPreventivas', val)}
                            >
                              <SelectTrigger className="h-6 text-[10px] p-0 px-1 border-0 bg-transparent w-24">
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
                        {/* Orange: Seguimiento */}
                        <td className={`px-1 py-1 border ${SECTION_COLORS.seguimiento} text-center`}>
                          <Select value={action.semanaPrevista || 'W1'} onValueChange={v => handleUpdateField(action.id, 'semanaPrevista', v)}>
                            <SelectTrigger className="h-6 text-[10px] p-0 px-1 border-0 bg-transparent w-16">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-48">
                              {WEEK_OPTIONS.map(w => <SelectItem key={w} value={w} className="text-xs">{w}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className={`px-1 py-1 border ${SECTION_COLORS.seguimiento}`}>
                          <Select
                            value={action.verificadoPorId || '__none__'}
                            onValueChange={val => handleUpdateField(action.id, 'verificadoPorId', val === '__none__' ? null : val)}
                          >
                            <SelectTrigger className="h-6 text-[10px] p-0 px-1 border-0 bg-transparent w-28">
                              <SelectValue placeholder="—" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              <SelectItem value="__none__" className="text-xs">—</SelectItem>
                              {projectMembers.map(m => (
                                <SelectItem key={m.id} value={m.id} className="text-xs" title={`${m.email} (${m.role})`}>
                                  {m.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className={`px-1 py-1 border ${SECTION_COLORS.seguimiento} text-center`}>
                          <Select value={action.estado} onValueChange={v => handleUpdateField(action.id, 'estado', v)}>
                            <SelectTrigger className="h-6 text-[10px] p-0 px-1 border-0 bg-transparent w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ESTADO_OPTIONS.map(opt => (
                                <SelectItem key={opt.value} value={opt.value} className="text-xs">{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className={`px-1 py-1 border ${SECTION_COLORS.seguimiento} text-center`}>
                          <Input type="number" min={0} max={100} value={action.porcentaje}
                            onChange={e => handleUpdateField(action.id, 'porcentaje', Number(e.target.value))}
                            className="h-6 text-[10px] p-0 px-1 border-0 bg-transparent w-14 text-center" />
                        </td>
                        <td className={`px-1 py-1 border ${SECTION_COLORS.seguimiento} text-center`}>
                          <Select value={action.semanaReal || 'W1'} onValueChange={v => handleUpdateField(action.id, 'semanaReal', v)}>
                            <SelectTrigger className="h-6 text-[10px] p-0 px-1 border-0 bg-transparent w-16">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-48">
                              {WEEK_OPTIONS.map(w => <SelectItem key={w} value={w} className="text-xs">{w}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </td>
                        {/* Delete */}
                        <td className="px-1 py-1 border text-center bg-gray-50">
                          <button onClick={() => handleDeleteAction(action.id)}
                            className="text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* New Entry Dialog */}
      <NewEntryDialog
        open={showNewDialog}
        onClose={() => setShowNewDialog(false)}
        onConfirm={handleAddAction}
      />
    </div>
  );
}
