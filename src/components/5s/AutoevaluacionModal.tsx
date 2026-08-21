'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { CheckSquare, CheckCircle, XCircle, Camera, ChevronDown, ChevronRight, Maximize2, Minimize2, AlertCircle, Upload, X, Image as ImageIcon, Calendar, UserCircle, CheckCheck, Paperclip, Loader2, Sparkles } from 'lucide-react';
import { use5SStore } from '../../lib/store';
import {
  S_STEPS,
  SELF_EVAL_THRESHOLD,
} from '../../lib/5s-constants';
import type { AuditSection, AuditItemResult } from '../../lib/5s-constants';
import { useChecklistTemplate } from '../../lib/checklist-templates';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { buildHallazgoFromNok } from '../../lib/action-item-helpers';
import NokInventarioRow, {
  DEFAULT_NOK_INVENTORY_DATA,
  DEFAULT_NOK_INVENTORY_ROWS,
  type NokInventoryData,
} from './NokInventarioRow';
import { toast } from 'sonner';

interface AutoevaluacionModalProps {
  open: boolean;
  onClose: () => void;
  sStep: number;
  miniStep: number;
}



export default function AutoevaluacionModal({ open, onClose, sStep, miniStep }: AutoevaluacionModalProps) {
  const { fetchProgress, currentUser, adminFreeNavigation, currentProject, currentZone, canPerform, canView, hasPermission, openModal } = use5SStore();
  const sStepData = S_STEPS.find(s => s.id === sStep);
  const canSkipSteps = hasPermission('skip_steps');
  const canPerformStep = canPerform(sStep, miniStep);
  const canViewStep = canView(sStep, miniStep);
  // Permission-driven: read-only if no execute perm OR if candado closed for skip_steps users
  const isReadOnly = !canPerformStep || (canSkipSteps && !adminFreeNavigation);
  const canPerformAutoeval = canPerformStep;

  const [isFullscreen, setIsFullscreen] = useState(true);
  const [results, setResults] = useState<Record<string, AuditItemResult>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [observaciones, setObservaciones] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  // Track which (open, sStep, sections-signature) we've already initialized for,
  // so we don't reset user edits if `sections` ref changes mid-session.
  const initializedFor = useRef<string>('');
  const [notaMinima, setNotaMinima] = useState(70);
  const [autoevalPhotos, setAutoevalPhotos] = useState<{ file: File; preview: string; uploading?: boolean; serverUrl?: string }[]>([]);
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  // v2.106: Las fotos del NOK ya NO se gestionan aquí. Cada fila del
  // NokInventarioRow tiene su propio botón "+" para añadir fotos, y se
  // guardan en `nokPhotosByRow: Record<rowId, File[]>`. Al hacer submit,
  // se suben todas las fotos de cada fila y se asocian al ActionItem
  // correspondiente via photoRefs.
  const [nokPhotosByRow, setNokPhotosByRow] = useState<Record<string, File[]>>({});
  const [activeNokItemId, setActiveNokItemId] = useState<string | null>(null);

  // Project members for responsable selector on NOK items
  const [projectMembers, setProjectMembers] = useState<Array<{ id: string; userId: string; role: string; user: { id: string; name: string; email: string; role: string; active: boolean } }>>([]);

  // Date/Time for scheduling and recording the evaluation
  const [fechaAutoevaluacion, setFechaAutoevaluacion] = useState('');
  const [horaAutoevaluacion, setHoraAutoevaluacion] = useState('');
  const [fechaProgramada, setFechaProgramada] = useState('');
  const [horaProgramada, setHoraProgramada] = useState('');
  // Track auditoría schedule (miniStep 5) — employee sees this as read-only (auditor sets it)
  const [auditFechaProgramada, setAuditFechaProgramada] = useState('');
  const [auditHoraProgramada, setAuditHoraProgramada] = useState('');

  // v2.75: Pre-llenado de hallazgos pendientes heredados del paso 3 (inventario + plan manual)
  // Cargamos ActionItems abiertos/en_proceso de la zona con source in ['inventario','actionplan']
  // para que el responsable los revise durante la autoeval.
  const [heredados, setHeredados] = useState<Array<{
    id: string;
    hallazgo: string;
    itemId: string;
    source: string;
    prioridad: string;
    estado: string;
    photoRefs?: string | null;
    fechaLimite?: string | null;
    decisionRevision: 'pendiente' | 'sigue_nok' | 'resuelto';
    notasResolucion: string;
  }>>([]);

  // Load template from API (uses board config if zone has one)
  const { sections, isLoading: isLoadingTemplate, notaMinima: templateNotaMinima } = useChecklistTemplate('autoevaluacion', sStep, open, currentZone?.boardConfigId);

  // Apply template notaMinima when loaded
  useEffect(() => {
    if (templateNotaMinima !== null) setNotaMinima(templateNotaMinima);
  }, [templateNotaMinima]);

  // Load project members (for responsable selector on NOK items)
  useEffect(() => {
    if (open && currentProject?.id) {
      fetch(`/api/projects/${currentProject.id}/members`)
        .then(r => r.json())
        .then(data => setProjectMembers(data?.members || []))
        .catch(err => console.error('Error loading project members:', err));
    } else {
      setProjectMembers([]);
    }
  }, [open, currentProject?.id]);



  // Fetch dynamic threshold (overrides template if present)
  useEffect(() => {
    if (open && currentProject?.id) {
      const fetchThreshold = async () => {
        try {
          const params = new URLSearchParams({ projectId: currentProject.id });
          if (currentZone?.id) params.set('zoneId', currentZone.id);
          const res = await fetch(`/api/audit-targets?${params}`);
          const json = await res.json();
          if (json.success && json.data) {
            const zoneTarget = json.data.find((t: any) => t.sStep === sStep && t.miniStep === 4 && t.zoneId === currentZone?.id);
            const projectTarget = json.data.find((t: any) => t.sStep === sStep && t.miniStep === 4 && t.zoneId === null);
            const target = zoneTarget || projectTarget;
            if (target?.notaMinima) setNotaMinima(target.notaMinima);
          }
        } catch (e) { console.error('Error fetching threshold:', e); }
      };
      fetchThreshold();
    }
  }, [open, sStep, currentProject?.id, currentZone?.id]);

  // ─────────────────────────────────────────────────────────────
  // ROBUST PRE-TICK: Merge missing items as 'ok' whenever sections change.
  // This replaces the fragile one-shot pre-tick. Instead of setting results
  // once and praying the effect fires after sections loads, we continuously
  // MERGE missing items as 'ok' into `results` without overwriting user
  // edits. This guarantees that every visible item always has an 'ok' entry
  // unless the user explicitly marks it NOK/N/A.
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open || sections.length === 0) return;
    setResults(prev => {
      const next = { ...prev };
      let changed = false;
      sections.forEach(s => s.items.forEach(item => {
        if (!next[item.id]) {
          next[item.id] = { itemId: item.id, status: 'ok' };
          changed = true;
        }
      }));
      return changed ? next : prev;
    });
  }, [open, sections]);

  // Initialize expanded sections + reset form state once per (sStep + sections signature)
  useEffect(() => {
    if (!open || sections.length === 0) return;
    const sig = `${sStep}:${sections.map(s => s.items.map(i => i.id).join(',')).join('|')}`;
    if (initializedFor.current === sig) return;
    initializedFor.current = sig;

    const expanded: Record<string, boolean> = {};
    sections.forEach(s => { expanded[s.id] = true; });
    setExpandedSections(expanded);
    setObservaciones('');
    setIsCompleted(false);
    setFinalScore(0);
    setAutoevalPhotos([]);
    setNokPhotosByRow({});
    // Auto-fill current date/time for the evaluation
    const now = new Date();
    setFechaAutoevaluacion(now.toISOString().split('T')[0]);
    setHoraAutoevaluacion(now.toTimeString().slice(0, 5));
    // Load scheduled date if available
    loadScheduledDate();
    // Load previously saved results (so user can see what was saved before)
    loadSavedResults();
    // v2.75: cargar hallazgos pendientes heredados del paso 3 (inventario + plan manual)
    loadHeredados();
  }, [open, sStep, sections]);

  // Load previously saved audit results from the backend so the user can see
  // what was actually persisted. This makes the save behavior verifiable.
  const loadSavedResults = async () => {
    if (!currentProject?.id) return;
    try {
      const res = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=${miniStep}&projectId=${currentProject.id}${currentZone?.id ? `&zoneId=${currentZone.id}` : ''}`);
      const json = await res.json();
      if (json.success && json.data?.notes) {
        try {
          const notes = typeof json.data.notes === 'string' ? JSON.parse(json.data.notes) : json.data.notes;
          if (notes?.results && Array.isArray(notes.results)) {
            const loaded: Record<string, AuditItemResult> = {};
            notes.results.forEach((r: any) => {
              if (r?.itemId) loaded[r.itemId] = r;
            });
            // Only set if there's at least one real entry (don't overwrite with empty)
            if (Object.keys(loaded).length > 0) {
              setResults(loaded);
              if (notes.observaciones) setObservaciones(notes.observaciones);
              if (notes.fechaAutoevaluacion) setFechaAutoevaluacion(notes.fechaAutoevaluacion);
              if (notes.horaAutoevaluacion) setHoraAutoevaluacion(notes.horaAutoevaluacion);
            }
          }
        } catch (e) {
          console.error('Error parsing saved notes:', e);
        }
      }
    } catch (e) {
      console.error('Error loading saved results:', e);
    }
  };

  // Reset the init guard when modal closes, so next open re-initializes
  useEffect(() => {
    if (!open) {
      initializedFor.current = '';
      // Also clear results on close so next open starts fresh (then loads saved)
      setResults({});
    }
  }, [open]);

  // v2.75: Cargar ActionItems pendientes heredados del paso 3 (inventario S1-S4 + plan manual S5)
  // Estos son hallazgos que el responsable debe revisar durante la autoevaluación:
  //   - confirmar que sigue siendo NOK (mantener)
  //   - marcar como resuelto (cerrar con foto evidencia)
  //   - añadir nuevos NOKs al checklist
  // La deduplicación al guardar evita crear ActionItems duplicados para el mismo hallazgo.
  const loadHeredados = async () => {
    if (!currentProject?.id || !currentZone?.id) return;
    try {
      const res = await fetch(
        `/api/actions?projectId=${currentProject.id}&zoneId=${currentZone.id}` +
        `&source=inventario&source=actionplan`
      );
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        // Filtrar: estado abierto/en_proceso, source inventario o actionplan, miniStep=3
        const pendientes = json.data.filter((a: any) =>
          (a.source === 'inventario' || a.source === 'actionplan') &&
          (a.estado === 'abierta' || a.estado === 'en_proceso') &&
          a.miniStep === 3
        ).map((a: any) => ({
          id: a.id,
          hallazgo: a.hallazgo || a.itemDescription || '',
          itemId: a.itemId,
          source: a.source,
          prioridad: a.prioridad,
          estado: a.estado,
          photoRefs: a.photoRefs,
          fechaLimite: a.fechaLimite,
          decisionRevision: 'pendiente' as const,
          notasResolucion: '',
        }));
        setHeredados(pendientes);
      }
    } catch (e) {
      console.error('[autoeval] Error cargando heredados:', e);
    }
  };

  // v2.75: Helper para cambiar la decisión de revisión sobre un hallazgo heredado
  const setHeredadoDecision = (id: string, decision: 'pendiente' | 'sigue_nok' | 'resuelto') => {
    setHeredados(prev => prev.map(h => h.id === id ? { ...h, decisionRevision: decision } : h));
  };

  // v2.75: Helper para añadir notas de resolución
  const setHeredadoNotas = (id: string, notas: string) => {
    setHeredados(prev => prev.map(h => h.id === id ? { ...h, notasResolucion: notas } : h));
  };

  // Load scheduled date/time for this autoevaluación AND the auditoría schedule
  // v2.86: Si el schedule está en estado 'vencida', NO cargar la fecha antigua
  // (forzar al usuario a elegir una nueva). La fecha vencida ya no es válida.
  const loadScheduledDate = async () => {
    if (!currentProject?.id || !currentZone?.id) return;
    try {
      // Load autoevaluación schedule (miniStep 4)
      const res = await fetch(`/api/evaluation-schedule?sStep=${sStep}&miniStep=4&projectId=${currentProject.id}&zoneId=${currentZone.id}`);
      const json = await res.json();
      if (json.success && json.data) {
        const sched = json.data;
        // v2.86: si está vencida, NO cargar la fecha antigua — el usuario
        // debe elegir una nueva fecha manualmente.
        // v2.87: si está 'solicitado' (borrada sin reprogramar), tampoco cargar fecha.
        if (sched.estado === 'vencida' || sched.estado === 'solicitado') {
          setFechaProgramada('');
          setHoraProgramada('10:00');
        } else {
          setFechaProgramada(sched.fechaProgramada || '');
          setHoraProgramada(sched.horaProgramada || '');
        }
      }
      // Also load auditoría schedule (miniStep 5) — employee sees if auditor has set a date
      const auditRes = await fetch(`/api/evaluation-schedule?sStep=${sStep}&miniStep=5&projectId=${currentProject.id}&zoneId=${currentZone.id}`);
      const auditJson = await auditRes.json();
      if (auditJson.success && auditJson.data) {
        const auditSched = auditJson.data;
        // v2.86: igual para auditoría — no cargar fecha vencida
        // v2.87: igual para solicitado
        if (auditSched.estado === 'vencida' || auditSched.estado === 'solicitado') {
          setAuditFechaProgramada('');
          setAuditHoraProgramada('10:00');
        } else {
          setAuditFechaProgramada(auditSched.fechaProgramada || '');
          setAuditHoraProgramada(auditSched.horaProgramada || '');
        }
      }
    } catch (e) {
      console.error('Error loading scheduled date:', e);
    }
  };

  // Save scheduled date/time
  // v2.75: enviamos responsableId (ejecutor), empleadoId (asistente),
  // createdBy (quien programa) y notifyUser:true para que el backend
  // dispare la notif 'evaluation_scheduled' al asistente.
  // En autoeval (miniStep=4):
  //   - ejecutor = responsable de la zona (currentZone.responsableId)
  //     fallback al currentUser (que debe ser responsable)
  //   - asistente = primer empleado del proyecto asignado a la zona
  //   - createdBy = currentUser.id (responsable que programa)
  // v2.75.2: tras guardar, refresca el store (schedules + notifs) para
  // que el badge "Programada" aparezca al instante sin tener que cerrar
  // y reabrir el modal.
  const handleSaveSchedule = async () => {
    if (!currentProject?.id || !currentZone?.id) return;
    try {
      // Cargar miembros si no están cargados aún (race condition)
      let members = projectMembers;
      if (members.length === 0) {
        try {
          const r = await fetch(`/api/projects/${currentProject.id}/members`);
          const d = await r.json();
          members = d?.members || [];
          setProjectMembers(members);
        } catch (e) { /* ignore */ }
      }
      // Buscar empleado (asistente): priorizar empleados de la zona actual,
      // si no hay, coger el primer empleado del proyecto.
      const empleadoMember = members.find(m => m.role === 'empleado');
      const responsableId = currentZone.responsableId || currentUser?.id || null;
      const empleadoId = empleadoMember?.userId || null;

      if (!responsableId) {
        toast.error('No se puede programar: no hay responsable asignado');
        return;
      }
      if (!empleadoId) {
        toast.error('No se puede programar: no hay empleado en el proyecto');
        return;
      }

      const res = await fetch('/api/evaluation-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sStep,
          miniStep: 4,
          projectId: currentProject.id,
          zoneId: currentZone.id,
          fechaProgramada,
          horaProgramada,
          // v2.75: roles para que se disparen los avisos
          responsableId,   // EJECUTOR (responsable de zona)
          empleadoId,      // ASISTENTE (empleado)
          createdBy: currentUser?.id || null,
          rolEjecutor: 'responsable',
          notifyUser: true,
        }),
      });
      const json = await res.json();
      if (!json.success) {
        // v2.77: si el backend bloquea por hallazgos pendientes (409),
        // mostrar un diálogo con el listado para que el responsable sepa
        // exactamente qué debe cerrar antes de poder programar.
        if (res.status === 409 && json.code === 'PENDING_HALLAZGOS') {
          const pendingList = Array.isArray(json.pending) ? json.pending : [];
          const detail = pendingList.length > 0
            ? pendingList.slice(0, 5).map((p: any, i: number) =>
                `${i + 1}. ${p.hallazgo || p.itemId || '—'} (${p.source || '?'}, ${p.estado})`
              ).join('\n')
            : '';
          const extra = pendingList.length > 5 ? `\n…y ${pendingList.length - 5} más.` : '';
          alert(
            `${json.error}\n\nHallazgos pendientes:\n${detail}${extra}\n\n` +
            `Abre el Plan de Acción (paso 3) y cierra estos hallazgos antes de programar la autoevaluación.`
          );
        } else {
          toast.error(`Error al programar: ${json.error || 'desconocido'}`);
        }
        return;
      }
      toast.success('Fecha programada guardada — empleado avisado');
      // v2.75.2: refrescar store para que el badge "Programada" aparezca
      // inmediatamente sobre el globo 4 y el empleado lo vea sin tener
      // que refrescar la página.
      try {
        await use5SStore.getState().fetchEvaluationSchedules();
        await use5SStore.getState().fetchNotifications(true);
      } catch (e) { /* ignore */ }
    } catch (e) {
      console.error('Error saving schedule:', e);
      toast.error('Error al guardar la fecha programada');
    }
  };

  const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0) || 26;

  // SCORING: Treat missing results as 'ok' (default).
  // This is bulletproof — does NOT depend on useEffect timing.
  // Every visible item that hasn't been explicitly marked NOK/N/A counts as OK.
  const scoring = useMemo(() => {
    let okCount = 0;
    let nokCount = 0;
    sections.forEach(s => s.items.forEach(item => {
      const status = results[item.id]?.status ?? 'ok';
      if (status === 'ok') okCount++;
      else if (status === 'nok') nokCount++;
    }));
    const answeredCount = okCount + nokCount;
    const scorePercent = totalItems > 0 ? Math.min(Math.round((okCount / totalItems) * 100), 100) : 0;
    return { okCount, nokCount, answeredCount, scorePercent };
  }, [results, sections, totalItems]);

  // v2.105: Ya no hay campos obligatorios en el NOK — solo la tabla
  // NokInventarioRow + fotos opcionales. La validación se hace al cerrar
  // la acción en el Plan de Acción.
  const nokItems = Object.values(results).filter(r => r.status === 'nok');
  const allNokCompleted = true;

  const passed = scoring.scorePercent >= notaMinima;
  const canSubmit = canPerformAutoeval && scoring.answeredCount > 0 && allNokCompleted;

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (const file of Array.from(files)) {
      const preview = URL.createObjectURL(file);
      setAutoevalPhotos(prev => [...prev, { file, preview }]);
    }
    // Reset input
    if (photoInputRef.current) photoInputRef.current.value = '';
  };

  const removeAutoevalPhoto = (index: number) => {
    setAutoevalPhotos(prev => {
      const photo = prev[index];
      if (photo.preview) URL.revokeObjectURL(photo.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  // v2.106: Las fotos ahora se gestionan DENTRO de NokInventarioRow, con un
  // botón "+" por fila para añadir y un "×" por foto para eliminar. Este
  // state (nokPhotosByRow) es la fuente de verdad que se usa al hacer submit
  // para subir las fotos al backend y asociarlas a cada ActionItem por rowId.
  // (Reemplaza al state `nokPhotos` y `nokPhotoAnalyzing` de v2.105.)

  const autoFillResponsableForNok = (_itemId: string) => {
    // v2.106: stub — ya no autocompletamos responsable vía texto (lo resuelve
    // el backend por sesión = personaDemandadaId = responsable de zona).
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const setItemStatus = (itemId: string, status: 'ok' | 'nok' | 'na') => {
    setResults(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], itemId, status },
    }));
    // v2.64: Si se marca como NOK, autocompletar el responsable automáticamente
    if (status === 'nok') {
      // Pequeño defer para que el state se actualice antes de leerlo
      setTimeout(() => autoFillResponsableForNok(itemId), 0);
    }
  };

  const setItemField = (itemId: string, field: 'hallazgo' | 'mejora' | 'otherText' | 'responsable', value: string) => {
    setResults(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], itemId, [field]: value },
    }));
  };

  // v2.106: setter para el ARRAY de filas de inventario embebidas en cada
  // NOK. Cada NOK ahora puede tener varias filas (botón "+ Añadir línea"
  // dentro de NokInventarioRow). Se guarda en results[itemId].inventoryData
  // y al hacer submit se genera UN ActionItem por fila con su propio `extra`.
  const setNokInventoryData = (itemId: string, data: NokInventoryData[]) => {
    setResults(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], itemId, inventoryData: data },
    }));
  };

  // v2.106: setter para las fotos por fila (rowId). Cada fila del
  // NokInventarioRow tiene su propio botón "+" para añadir fotos.
  const setNokRowPhotos = (rowId: string, photos: File[]) => {
    setNokPhotosByRow(prev => {
      const next = { ...prev };
      if (photos.length === 0) delete next[rowId];
      else next[rowId] = photos;
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    if (!canPerformAutoeval) return; // Only responsable/admin for S4, or any employee for S1/S2/S3/S5
    setIsSubmitting(true);
    try {
      // Build effective results: merge missing items as 'ok' (default) before sending to backend
      const effectiveResults = sections.flatMap(s => s.items).map(item => {
        const r = results[item.id];
        return r ?? { itemId: item.id, status: 'ok' as const };
      });
      // Only mark as completed if score meets notaMinima threshold
      // If not passed, still save results but step stays available for retry
      const res = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=${miniStep}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: passed,
          score: scoring.scorePercent,
          notes: JSON.stringify({
            type: 'autoevaluacion',
            passed,
            notaMinima,
            results: effectiveResults,
            observaciones,
            fechaAutoevaluacion,
            horaAutoevaluacion,
            fechaProgramada: fechaProgramada || null,
            horaProgramada: horaProgramada || null,
          }),
          projectId: currentProject?.id,
          zoneId: currentZone?.id || null,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        toast.error(`Error del servidor: ${json.error || res.statusText || 'Error desconocido'}`);
        return;
      }
      if (json.success) {
        // Feedback visible al usuario
        toast.success(`Autoevaluación guardada: ${effectiveResults.length} items (${scoring.okCount} OK, ${scoring.nokCount} NOK, score ${scoring.scorePercent}%)`);
        setIsCompleted(true);
        setFinalScore(scoring.scorePercent);
        await fetchProgress();

        // v2.74.4: Marcar el schedule como 'realizada' y avisar a responsable/empleado
        // para que el badge "Programada" desaparezca y el otro sepa que se completó.
        if (passed && currentProject?.id && currentZone?.id) {
          try {
            // Buscar el schedule activo
            const schedRes = await fetch(
              `/api/evaluation-schedule?sStep=${sStep}&miniStep=4&projectId=${currentProject.id}&zoneId=${currentZone.id}`
            );
            const schedData = await schedRes.json();
            if (schedData?.success && schedData?.data?.id) {
              // PATCH estado='realizada'
              await fetch('/api/evaluation-schedule', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: schedData.data.id, estado: 'realizada' }),
              });
              // Crear notif 'evaluation_completed' para el otro rol
              const otherUserId = schedData.data.responsableId === currentUser?.id
                ? schedData.data.empleadoId
                : schedData.data.responsableId;
              if (otherUserId && otherUserId !== currentUser?.id) {
                const fechaStr = schedData.data.fechaProgramada
                  ? schedData.data.fechaProgramada.split('-').reverse().join('/')
                  : '';
                await fetch('/api/notifications', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    userId: otherUserId,
                    type: 'evaluation_completed',
                    title: `✓ Autoevaluación S${sStep} completada (score ${scoring.scorePercent}%)`,
                    message: `La autoevaluación de S${sStep} programada para el ${fechaStr} se ha completado con un ${scoring.scorePercent}%. Zona: ${currentZone?.name || 'sin zona'}.`,
                    sStep,
                    zoneId: currentZone.id,
                    projectId: currentProject.id,
                  }),
                });
              }
            }
          } catch (e) {
            console.error('[v2.74.4] Error marking schedule as realizada:', e);
          }
        }

        // ─── Create EmployeeProgress record for individual step 4 (autoevaluación) ───
        // Step 4 is individual for S1/S2/S3/S5 (done by employees) and for S4 (done by responsable)
        // We need to track individual completion so the gating system unlocks step 5
        if (passed && currentUser?.id && currentProject?.id && currentZone?.id) {
          try {
            await fetch('/api/employee-progress', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                sStep,
                miniStep: 4,
                completed: true,
                score: scoring.scorePercent,
                projectId: currentProject.id,
                zoneId: currentZone.id,
                userId: currentUser.id,
              }),
            });
            // Also refresh employee progress so step 5 unlocks immediately
            const { fetchEmployeeProgress } = use5SStore.getState();
            await fetchEmployeeProgress(currentProject.id, currentZone.id);
          } catch (empErr) {
            console.error('Error creating employee progress for autoeval:', empErr);
          }
        }

        // ─── Upload photos to library with traceability ───
        if (autoevalPhotos.length > 0) {
          setIsUploadingPhotos(true);
          for (let idx = 0; idx < autoevalPhotos.length; idx++) {
            const photo = autoevalPhotos[idx];
            try {
              // Step 1: Upload the file to get a server URL
              const formData = new FormData();
              formData.append('file', photo.file);
              formData.append('filename', `S${sStep}_autoeval_${currentZone?.name || 'zona'}_${idx + 1}_${Date.now()}.jpg`);

              const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
              });
              const uploadData = await uploadRes.json();

              if (uploadData.success && uploadData.url) {
                // Step 2: Save to photo library with full traceability
                await fetch('/api/photo-library', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    sStep,
                    miniStep: 4,
                    title: `Autoeval S${sStep} - Foto ${idx + 1}`,
                    description: `${sStepData?.japaneseName || 'S' + sStep} - ${currentZone?.name || 'Zona'} - Paso 4 Autoevaluación - Subida por ${currentUser?.name || 'Usuario'}`,
                    photoUrl: uploadData.url,
                    photoType: 'hallazgo',
                    category: `paso4_s${sStep}`,
                    tags: JSON.stringify([`S${sStep}`, sStepData?.japaneseName || '', currentZone?.name || '', 'paso4', 'autoevaluacion', 'hallazgo']),
                    projectId: currentProject?.id,
                    zoneId: currentZone?.id || null,
                    uploadedBy: currentUser?.id || null,
                  }),
                });
              }
            } catch (photoErr) {
              console.error('Error uploading autoeval photo:', photoErr);
            }
          }
          setIsUploadingPhotos(false);
        }

        // ─── Create Action Items for NOK (disfunciones) ───
        // v2.63: Para cada NOK, primero subimos sus fotos a la biblioteca
        // (con photoType='hallazgo' y tags que incluyan el itemId), y luego
        // creamos el ActionItem con photoRefs = JSON.stringify([urls]).
        // Así el flujo sigue el patrón S1: foto (paso 2) → plan de acción (paso 3).
        const nokResults = Object.values(results).filter((r: any) => r.status === 'nok');
        for (const nok of nokResults) {
          // v2.106: cada NOK ahora genera UN ActionItem por cada fila del
          // NokInventarioRow. buildHallazgoFromNok devuelve un ARRAY de
          // payloads (uno por fila). Para cada uno, subimos sus fotos
          // (si las hay, por rowId) y creamos el ActionItem con photoRefs.
          try {
            // 1. Generar los payloads de ActionItem para todas las filas
            const demandaFieldsArray = buildHallazgoFromNok({
              miniStep: 4,
              zonaName: currentZone?.name,
              sStep,
              itemId: nok.itemId,
              hallazgo: nok.itemId,
              inventoryData: nok.inventoryData || null,
            });

            // 2. Para cada payload (fila), subir sus fotos y crear el ActionItem
            for (let rIdx = 0; rIdx < demandaFieldsArray.length; rIdx++) {
              const demandaFields = demandaFieldsArray[rIdx];
              const invRow = (nok.inventoryData && nok.inventoryData[rIdx]) || null;
              const rowId = invRow?.rowId || `row-${rIdx}`;

              // Subir fotos de esta fila a la biblioteca
              const photoUrls: string[] = [];
              const rowPhotos = nokPhotosByRow[rowId] || [];
              if (rowPhotos.length > 0) {
                for (let pIdx = 0; pIdx < rowPhotos.length; pIdx++) {
                  const photo = rowPhotos[pIdx];
                  try {
                    const formData = new FormData();
                    formData.append('file', photo);
                    formData.append('filename', `S${sStep}_autoeval_nok_${nok.itemId}_row${rIdx + 1}_${currentZone?.name || 'zona'}_${pIdx + 1}_${Date.now()}.jpg`);
                    const uploadRes = await fetch('/api/upload', {
                      method: 'POST',
                      body: formData,
                    });
                    const uploadData = await uploadRes.json();
                    if (uploadData.success && uploadData.url) {
                      photoUrls.push(uploadData.url);
                      await fetch('/api/photo-library', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          sStep,
                          miniStep: 4,
                          title: `Hallazgo S${sStep} - ${nok.itemId} - Fila ${rIdx + 1} - Foto ${pIdx + 1}`,
                          description: `Hallazgo autoeval S${sStep} (${sStepData?.japaneseName || ''}) · Zona: ${currentZone?.name || '—'} · Item: ${nok.itemId} · Fila: ${invRow?.elemento || rIdx + 1}\nSubida por ${currentUser?.name || 'Usuario'}`,
                          photoUrl: uploadData.url,
                          photoType: 'hallazgo',
                          category: `autoeval_nok_s${sStep}`,
                          tags: JSON.stringify([
                            `S${sStep}`, sStepData?.japaneseName || '',
                            currentZone?.name || '', 'paso4', 'autoevaluacion',
                            'hallazgo', 'nok', `item:${nok.itemId}`, `row:${rowId}`,
                          ]),
                          projectId: currentProject?.id,
                          zoneId: currentZone?.id || null,
                          uploadedBy: currentUser?.id || null,
                        }),
                      });
                    }
                  } catch (photoErr) {
                    console.error(`[autoeval] Error subiendo foto ${pIdx + 1} fila ${rowId}:`, photoErr);
                  }
                }
              }

              // Crear el ActionItem para esta fila
              const actionRes = await fetch('/api/actions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  sStep,
                  miniStep: 4,
                  itemId: nok.itemId,
                  itemDescription: `Disfunción detectada en autoevaluación: ${nok.itemId}`,
                  hallazgo: demandaFields.hallazgo || nok.itemId,
                  mejora: '',
                  personaDemandadaId: currentZone?.responsableId || null,
                  prioridad: 'media',
                  source: 'autoevaluacion',
                  auditor: null,
                  projectId: currentProject?.id,
                  zoneId: currentZone?.id || null,
                  photoRefs: photoUrls.length > 0 ? JSON.stringify(photoUrls) : undefined,
                  ...demandaFields,
                }),
              });
              const actionJson = await actionRes.json();
              const actionItemId = actionJson?.data?.id;

              // Notificar al responsable si hay fotos y se creó el ActionItem
              if (actionItemId && photoUrls.length > 0 && currentZone?.responsableId) {
                try {
                  await fetch('/api/notifications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      userId: currentZone.responsableId,
                      type: 'new_action_item',
                      title: `Hallazgo con foto: S${sStep} - ${nok.itemId}`,
                      message: `Se ha detectado un hallazgo en la autoevaluación de S${sStep} (${sStepData?.japaneseName || ''}) en la zona "${currentZone?.name || '—'}" con ${photoUrls.length} foto(s) de evidencia.\n\nRevisa el Plan de Acción para ver la evidencia fotográfica.\n\n[ref:${actionItemId}]`,
                      sStep,
                      zoneId: currentZone?.id || null,
                      projectId: currentProject?.id,
                    }),
                  });
                } catch (notifErr) {
                  console.error('[autoeval] Error notificando hallazgo con foto:', notifErr);
                }
              }
            }
          } catch (actionError) {
            console.error('Error creating action item from autoevaluación:', actionError);
          }
        }

        // ─── v2.75: Procesar hallazgos heredados del paso 3 ───
        // Para cada heredado, aplicar la decisión del responsable:
        //   - 'sigue_nok': mantener abierto (se actúa como recordatorio de que sigue pendiente)
        //   - 'resuelto': cerrar el ActionItem (estado='cerrada', verificadoPorId=currentUser, fechaReal=now)
        //   - 'pendiente': no hacer nada (no se revisó, queda para próxima)
        if (heredados.length > 0) {
          for (const h of heredados) {
            if (h.decisionRevision === 'resuelto') {
              try {
                await fetch(`/api/actions?id=${h.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    estado: 'cerrada',
                    verificadoPorId: currentUser?.id || null,
                    notas: h.notasResolucion ? `Resuelto en autoeval S${sStep}: ${h.notasResolucion}` : `Resuelto en autoeval S${sStep}`,
                  }),
                });
              } catch (e) {
                console.error('[autoeval] Error cerrando heredado:', e);
              }
            } else if (h.decisionRevision === 'sigue_nok') {
              // Marcar como en_proceso para indicar que se revisó pero sigue pendiente
              try {
                await fetch(`/api/actions?id=${h.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    estado: 'en_proceso',
                    notas: h.notasResolucion ? `Revisado en autoeval S${sStep}: ${h.notasResolucion}` : `Revisado en autoeval S${sStep}, sigue pendiente`,
                  }),
                });
              } catch (e) {
                console.error('[autoeval] Error actualizando heredado:', e);
              }
            }
          }
        }

        // ─── Notify responsables of NOK disfunciones ───
        if (nokResults.length > 0 && currentProject?.id && currentZone?.id) {
          try {
            const membersRes = await fetch(`/api/projects/${currentProject.id}/members`);
            const membersData = await membersRes.json();
            const allMembers = membersData?.members || [];

            const sStepData = S_STEPS.find(s => s.id === sStep);
            const disfuncionMessage = `Se han detectado ${nokResults.length} disfunción(es) en la autoevaluación de S${sStep} (${sStepData?.japaneseName || ''}) en la zona "${currentZone.name}". Revisa el Plan de Acción.`;

            // Notify zone responsable
            const responsableIds = new Set<string>();
            if (currentZone.responsableId) responsableIds.add(currentZone.responsableId);
            const responsables = allMembers.filter((m: any) => m.role === 'responsable');
            for (const resp of responsables) responsableIds.add(resp.userId);

            for (const respId of responsableIds) {
              await fetch('/api/notifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: respId,
                  type: 'disfuncion',
                  title: `Disfunciones detectadas: S${sStep} — ${sStepData?.japaneseName || ''}`,
                  message: disfuncionMessage,
                  sStep,
                  zoneId: currentZone.id,
                  projectId: currentProject.id,
                }),
              });
            }
          } catch (notifError) {
            console.error('Error notifying responsables of disfunciones:', notifError);
          }
        }

        // Check if Steps 1-4 are now all completed for this S-step in the zone
        // If so, notify auditor(s) that they can perform Step 5
        if (currentProject?.id && currentZone?.id) {
          try {
            // Fetch all progress for this zone and S-step
            const progRes = await fetch(`/api/progress?projectId=${currentProject.id}`);
            const progData = await progRes.json();
            const allProgress = progData?.data || [];

            // Also fetch employee progress for individual steps (formación = step 1)
            const empProgRes = await fetch(`/api/employee-progress?projectId=${currentProject.id}&zoneId=${currentZone.id}`);
            const empProgData = await empProgRes.json();
            const allEmpProgress = empProgData?.data || [];

            // Check steps 1-4 completed (both zone-level progress AND employee progress)
            let allStepsCompleted = true;
            for (let ms = 1; ms <= 4; ms++) {
              const zoneStep = allProgress.find((p: any) =>
                p.sStep === sStep &&
                p.miniStep === ms &&
                (p.zoneId === currentZone.id || p.zoneId === null) &&
                p.completed
              );
              if (zoneStep) continue; // Zone-level completed

              // Also check employee progress for individual steps
              const empStep = allEmpProgress.some((ep: any) =>
                ep.sStep === sStep &&
                ep.miniStep === ms &&
                ep.zoneId === currentZone.id &&
                ep.completed
              );
              if (empStep) continue; // Some employee completed this step

              allStepsCompleted = false;
              break;
            }

            if (allStepsCompleted) {
              // Find auditor and responsable users for this project and notify them
              const membersRes = await fetch(`/api/projects/${currentProject.id}/members`);
              const membersData = await membersRes.json();
              const allMembers = membersData?.members || [];

              const sStepData = S_STEPS.find(s => s.id === sStep);
              const notifMessage = `Los pasos 1-4 de S${sStep} (${sStepData?.japaneseName || ''}) en la zona "${currentZone.name}" han sido completados. La auditoría (Paso 5) está lista para realizarse.`;

              // Notify auditors
              const auditors = allMembers.filter((m: any) => m.role === 'auditor');
              for (const auditor of auditors) {
                await fetch('/api/notifications', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    userId: auditor.userId,
                    type: 'audit_ready',
                    title: `Auditoría lista: S${sStep} — ${sStepData?.japaneseName || ''}`,
                    message: notifMessage,
                    sStep,
                    zoneId: currentZone.id,
                    projectId: currentProject.id,
                  }),
                });
              }

              // Notify responsable of the zone (from zone.responsableId OR from project members)
              const responsableIds = new Set<string>();
              if (currentZone.responsableId) responsableIds.add(currentZone.responsableId);
              const responsables = allMembers.filter((m: any) => m.role === 'responsable');
              for (const resp of responsables) responsableIds.add(resp.userId);
              for (const respId of responsableIds) {
                await fetch('/api/notifications', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    userId: respId,
                    type: 'audit_ready',
                    title: `Auditoría lista: S${sStep} — ${sStepData?.japaneseName || ''}`,
                    message: notifMessage,
                    sStep,
                    zoneId: currentZone.id,
                    projectId: currentProject.id,
                  }),
                });
              }
            }
          } catch (notifError) {
            console.error('Error sending notification to auditor:', notifError);
          }
        }
      }
    } catch (error) {
      console.error('Error submitting self-evaluation:', error);
      toast.error('No se pudo guardar la autoevaluación. Inténtalo de nuevo en unos minutos.');
    } finally {
      setIsSubmitting(false);
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

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent size={isFullscreen ? "fullscreen" : "xl"} className="flex flex-col overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-2 flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" style={{ color: sStepData?.color }} />
            <span>Autoevaluación Interna</span>
            <Badge variant="outline" style={{ borderColor: sStepData?.color, color: sStepData?.color }}>
              {sStepData?.japaneseName} — {sStepData?.spanishName}
            </Badge>
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
          <div className="flex items-center gap-2 p-2 mx-6 flex-shrink-0 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-xs text-amber-700 font-medium">Modo Admin:</span>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={handleAdminSkip}
            >
              Completar paso sin autoevaluación
            </Button>
          </div>
        )}

        {isReadOnly && !isCompleted && (
          <div className="flex items-center gap-2 p-2 mx-6 flex-shrink-0 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="text-xs text-blue-700 font-medium">Solo lectura: {canSkipSteps ? 'Activa el candado para poder realizar pasos.' : 'Puedes ver pero no modificar.'}</span>
          </div>
        )}

        {/* Barra FIJA con acciones rápidas — siempre visible, fuera del scroll */}
        {!isCompleted && sections.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap px-6 py-2 flex-shrink-0 bg-green-50 border-b border-green-200">
            <CheckCheck className="h-4 w-4 text-green-700 shrink-0" />
            <span className="text-xs text-green-800 font-medium">Estado actual:</span>
            <span className="ml-auto text-[10px] text-muted-foreground font-mono">
              {scoring.okCount} OK · {scoring.nokCount} NOK · {scoring.scorePercent}%
            </span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0">
        {isLoadingTemplate ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : sections.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-2">No hay checklist configurado</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              No se encontró una plantilla de autoevaluación para S{sStep}. 
              Crea una plantilla en <strong>Administración → Plantillas → Auditoría Interna</strong> 
              o pulsa el botón &quot;Crear plantillas por defecto&quot;.
            </p>
          </div>
        ) : isCompleted ? (
          <div className="text-center py-8">
            {passed ? (
              <>
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2 text-green-700">¡Autoevaluación Aprobada!</h3>
              </>
            ) : (
              <>
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2 text-red-700">Autoevaluación No Aprobada</h3>
              </>
            )}
            <p className="text-lg mb-1">Puntuación: <strong>{finalScore}%</strong></p>
            <p className="text-sm text-muted-foreground">
              {scoring.okCount} OK / {scoring.nokCount} NOK de {totalItems} puntos de verificación
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Mínimo requerido: {notaMinima}%
            </p>
            {!passed && (
              <div className="mt-4 space-y-3 text-left">
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  Debes obtener al menos <strong>{notaMinima}%</strong> para desbloquear el Paso 5 (Auditoría).
                  Los <strong>{scoring.nokCount} hallazgo(s) NOK</strong> ya están en el Plan de Acción como
                  acciones abiertas — el responsable debe cerrarlos antes de repetir la autoevaluación.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* 1. Ver hallazgos en el Plan de Acción */}
                  <Button
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    onClick={() => { onClose(); openModal('actionplan', 3); }}
                  >
                    <span className="text-sm">📋 Ver hallazgos en el Plan</span>
                  </Button>
                  {/* 2. Replanificar autoevaluación */}
                  <Button
                    variant="outline"
                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    onClick={() => { setIsCompleted(false); setResults({}); setNokPhotosByRow({}); setObservaciones(''); }}
                  >
                    <span className="text-sm">📅 Replanificar autoeval.</span>
                  </Button>
                  {/* 3. Reintentar ahora */}
                  <Button
                    variant="outline"
                    className="border-green-300 text-green-700 hover:bg-green-50"
                    onClick={() => { setIsCompleted(false); setResults({}); setNokPhotosByRow({}); }}
                  >
                    <span className="text-sm">🔄 Reintentar ahora</span>
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground text-center pt-1">
                  Los hallazgos anteriores se mantienen abiertos y reaparecerán como <strong>"heredados"</strong> en el siguiente intento.
                </p>
              </div>
            )}
            {passed && (
              <div>
              <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700">
                <p className="text-sm font-semibold">→ Próximo paso: Auditoría (Paso 5)</p>
                <p className="text-xs mt-1">Pulsa 🔔 Auditar en el pentágono para notificar al auditor. El auditor programará la fecha.</p>
                {auditFechaProgramada ? (
                  <p className="text-xs mt-1 text-green-700 font-medium">
                    ✅ Auditoría programada: {auditFechaProgramada} a las {auditHoraProgramada}
                  </p>
                ) : (
                  <p className="text-xs mt-1 text-amber-700 font-medium">
                    ⏳ Pendiente de programar — el auditor asignará fecha y hora
                  </p>
                )}
              </div>
              <div className="mt-3 flex justify-center">
                <Button
                  onClick={() => { onClose(); openModal('auditoria', 5); }}
                  style={{ backgroundColor: sStepData?.color }}
                  className="text-white"
                >
                  Continuar al paso 5: Auditoría →
                </Button>
              </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Info banner */}
            <div className="p-3 rounded-lg border-l-4" style={{ borderColor: sStepData?.color, backgroundColor: `${sStepData?.color}08` }}>
              <p className="text-sm font-medium" style={{ color: sStepData?.color }}>
                Autoevaluación Interna — {sStepData?.japaneseName}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Evalúa cada punto de verificación. Marca OK si cumple, NOK si hay desviación. 
                Los NOKs generan hallazgos y puntos de mejora como plan de acción.
              </p>
            </div>

            {/* Date/Time: Programación y Registro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Programar Autoevaluación
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="fechaProgramada" className="text-[10px] text-blue-600">Fecha programada</Label>
                    <Input id="fechaProgramada" type="date" value={fechaProgramada}
                      onChange={e => setFechaProgramada(e.target.value)}
                      className="h-7 text-xs" />
                  </div>
                  <div>
                    <Label htmlFor="horaProgramada" className="text-[10px] text-blue-600">Hora programada</Label>
                    <Input id="horaProgramada" type="time" value={horaProgramada}
                      onChange={e => setHoraProgramada(e.target.value)}
                      className="h-7 text-xs" />
                  </div>
                </div>
                {fechaProgramada && (
                  <Button size="sm" variant="outline" className="h-6 text-[10px] border-blue-300 text-blue-700"
                    onClick={handleSaveSchedule}>
                    Guardar programación
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                  <CheckSquare className="h-3.5 w-3.5" />
                  Registro de Autoevaluación
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="fechaAutoeval" className="text-[10px] text-blue-600">Fecha realización</Label>
                    <Input id="fechaAutoeval" type="date" value={fechaAutoevaluacion}
                      onChange={e => setFechaAutoevaluacion(e.target.value)}
                      className="h-7 text-xs" />
                  </div>
                  <div>
                    <Label htmlFor="horaAutoeval" className="text-[10px] text-blue-600">Hora realización</Label>
                    <Input id="horaAutoeval" type="time" value={horaAutoevaluacion}
                      onChange={e => setHoraAutoevaluacion(e.target.value)}
                      className="h-7 text-xs" />
                  </div>
                </div>
              </div>
            </div>

            {/* Score indicator */}
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <span className="text-sm font-medium">Puntuación</span>
                <p className="text-xs text-muted-foreground">
                  {scoring.okCount} OK / {scoring.nokCount} NOK de {totalItems} puntos
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">OK: {scoring.okCount}</Badge>
                <Badge className="bg-red-100 text-red-800">NOK: {scoring.nokCount}</Badge>
                <Badge variant={scoring.scorePercent >= notaMinima ? 'default' : 'secondary'}>
                  {scoring.scorePercent}% (mín. {notaMinima}%)
                </Badge>
              </div>
            </div>

            {/* v2.75: Panel de hallazgos heredados del paso 3 (inventario + plan manual) */}
            {!isReadOnly && heredados.length > 0 && (
              <Card className="border-amber-300 bg-amber-50/50">
                <div className="p-3 border-b border-amber-200 bg-amber-100/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-700" />
                      <span className="text-sm font-semibold text-amber-900">
                        Hallazgos pendientes heredados del Paso 3 ({heredados.length})
                      </span>
                    </div>
                    <Badge className="bg-amber-200 text-amber-900">
                      {heredados.filter(h => h.decisionRevision === 'pendiente').length} sin revisar
                    </Badge>
                  </div>
                  <p className="text-[11px] text-amber-800 mt-1">
                    Revisa cada hallazgo: confirma si sigue NOK, márcalo como resuelto, o déjalo pendiente.
                  </p>
                </div>
                <div className="divide-y divide-amber-100">
                  {heredados.map((h) => (
                    <div key={h.id} className="p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-[10px]">
                              {h.source === 'inventario' ? '📦 Inventario' : '📝 Plan'}
                            </Badge>
                            <Badge variant="outline" className={
                              h.prioridad === 'alta' ? 'text-[10px] border-red-300 text-red-700' :
                              h.prioridad === 'media' ? 'text-[10px] border-amber-300 text-amber-700' :
                              'text-[10px] border-gray-300 text-gray-600'
                            }>
                              {h.prioridad}
                            </Badge>
                            {h.fechaLimite && (
                              <span className="text-[10px] text-gray-500">
                                Vence: {new Date(h.fechaLimite).toLocaleDateString('es-ES')}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-800 mt-1 line-clamp-2">{h.hallazgo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-wrap">
                        <Button
                          size="sm" variant="outline"
                          className={`text-[11px] h-7 ${h.decisionRevision === 'sigue_nok' ? 'bg-red-100 border-red-400 text-red-800' : ''}`}
                          onClick={() => setHeredadoDecision(h.id, 'sigue_nok')}
                          disabled={isReadOnly}
                        >
                          <XCircle className="h-3 w-3 mr-1" /> Sigue NOK
                        </Button>
                        <Button
                          size="sm" variant="outline"
                          className={`text-[11px] h-7 ${h.decisionRevision === 'resuelto' ? 'bg-green-100 border-green-400 text-green-800' : ''}`}
                          onClick={() => setHeredadoDecision(h.id, 'resuelto')}
                          disabled={isReadOnly}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" /> Resuelto
                        </Button>
                        <Button
                          size="sm" variant="ghost"
                          className={`text-[11px] h-7 ${h.decisionRevision === 'pendiente' ? 'text-gray-500' : ''}`}
                          onClick={() => setHeredadoDecision(h.id, 'pendiente')}
                          disabled={isReadOnly}
                        >
                          Pendiente
                        </Button>
                      </div>
                      {h.decisionRevision === 'resuelto' && (
                        <Input
                          placeholder="Notas de resolución (cómo se resolvió)..."
                          value={h.notasResolucion}
                          onChange={(e) => setHeredadoNotas(h.id, e.target.value)}
                          className="text-xs h-8"
                          disabled={isReadOnly}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Checklist sections */}
            <div className="space-y-3">
              {sections.map(section => (
                <Card key={section.id} className="overflow-hidden">
                  {/* Section header */}
                  <button
                    className="w-full p-3 flex items-center gap-2 hover:bg-muted/50 transition-colors text-left"
                    onClick={() => toggleSection(section.id)}
                  >
                    {expandedSections[section.id] ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Badge variant="outline" className="text-xs font-mono">{section.id}</Badge>
                    <span className="font-semibold text-sm">{section.title}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {section.items.length} puntos
                    </span>
                  </button>

                  {/* Section items */}
                  {expandedSections[section.id] && (
                    <CardContent className="px-4 pb-4 pt-0 space-y-3">
                      {section.items.map(item => {
                        // BULLETPROOF DEFAULT 'ok': if no result entry exists, treat as 'ok'.
                        // This is the source of truth — does NOT depend on useEffect timing or MERGE.
                        // The MERGE effect above is just a secondary safety net.
                        const hasResult = !!results[item.id];
                        const result = results[item.id];
                        const status = hasResult ? (result?.status ?? 'ok') : 'ok';
                        const isNok = status === 'nok';

                        return (
                          <div key={item.id} className="border rounded-lg p-3 space-y-2">
                            {/* Item header: description + status buttons */}
                            <div className="flex items-start gap-3">
                              <span className="text-xs font-mono text-muted-foreground shrink-0 mt-0.5">
                                {item.id}
                              </span>
                              <p className="text-sm flex-1">{item.description}</p>
                              <div className="flex gap-1 shrink-0">
                                <button
                                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                                    status === 'ok'
                                      ? 'bg-green-500 text-white'
                                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                                  }`}
                                  onClick={() => setItemStatus(item.id, 'ok')}
                                >
                                  OK
                                </button>
                                <button
                                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                                    status === 'nok'
                                      ? 'bg-red-500 text-white'
                                      : 'bg-red-50 text-red-700 hover:bg-red-100'
                                  }`}
                                  onClick={() => setItemStatus(item.id, 'nok')}
                                >
                                  NOK
                                </button>
                                <button
                                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                                    status === 'na'
                                      ? 'bg-gray-500 text-white'
                                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                  }`}
                                  onClick={() => setItemStatus(item.id, 'na')}
                                >
                                  N/A
                                </button>
                              </div>
                            </div>

                            {/* "Otros" text field */}
                            {item.hasOther && (
                              <Input
                                placeholder="Especificar..."
                                value={result?.otherText || ''}
                                onChange={e => setItemField(item.id, 'otherText', e.target.value)}
                                className="text-sm"
                              />
                            )}

                            {/* NOK details: v2.106 — tabla multi-fila idéntica a
                                la del Paso 3 (con Precio, Fotos y + Añadir línea). */}
                            {isNok && (
                              <div className="space-y-2 pl-6 border-l-2 border-red-200">
                                <NokInventarioRow
                                  value={result?.inventoryData || DEFAULT_NOK_INVENTORY_ROWS}
                                  onChange={data => setNokInventoryData(item.id, data)}
                                  photosByRow={nokPhotosByRow}
                                  onPhotosChange={setNokRowPhotos}
                                  defaultElemento={item.description || item.id}
                                  defaultZonaName={currentZone?.name || ''}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {/* Observaciones */}
            <Card>
              <CardContent className="p-4">
                <label className="text-sm font-medium">Observaciones generales</label>
                <Textarea
                  placeholder="Observaciones adicionales de la autoevaluación..."
                  value={observaciones}
                  onChange={e => setObservaciones(e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Fotos de la autoevaluación */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-muted-foreground" />
                    <label className="text-sm font-medium">Fotos de la autoevaluación</label>
                  </div>
                  <span className="text-xs text-muted-foreground">{autoevalPhotos.length} foto{autoevalPhotos.length !== 1 ? 's' : ''}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Añade fotos de hallazgos o disfunciones detectadas. Se guardarán en la biblioteca con trazabilidad.
                </p>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoSelect}
                />
                <button
                  className="w-full border-2 border-dashed rounded-lg p-4 flex flex-col items-center gap-2 hover:border-primary/50 hover:bg-muted/30 transition-colors"
                  onClick={() => photoInputRef.current?.click()}
                >
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs font-medium">Seleccionar fotos</span>
                </button>
                {autoevalPhotos.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {autoevalPhotos.map((photo, idx) => (
                      <div key={idx} className="relative group">
                        <img src={photo.preview} alt={`Foto ${idx + 1}`} className="w-full h-20 object-cover rounded-lg border" />
                        <button
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeAutoevalPhoto(idx)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* v2.105: banner eliminado — ya no hay campos obligatorios en el NOK */}

            {/* Submit button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
                style={canSubmit ? { backgroundColor: passed ? sStepData?.color : '#dc2626' } : undefined}
              >
                {isSubmitting ? 'Enviando...' : passed ? `Completar Autoevaluación (${scoring.scorePercent}% - Apto)` : `Enviar Autoevaluación (${scoring.scorePercent}% - No Apto, mín. ${notaMinima}%)`}
              </Button>
            </div>
          </div>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
