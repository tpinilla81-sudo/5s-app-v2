'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  Camera,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  AlertTriangle,
  Plus,
  Trash2,
  TrendingUp,
  Maximize2,
  Minimize2,
  Upload,
  X,
  Image as ImageIcon,
  Calendar,
  UserCircle,
  CheckCheck,
  Loader2,
  Sparkles,
  Paperclip,
} from 'lucide-react';
import { use5SStore } from '@/lib/store';
import {
  S_STEPS,
  AUDIT_PASS_THRESHOLD,
} from '@/lib/5s-constants';
import type { AuditSection, AuditItemResult } from '@/lib/5s-constants';
import { useChecklistTemplate } from '@/lib/checklist-templates';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { buildHallazgoFromNok } from '@/lib/action-item-helpers';

interface AuditoriaModalProps {
  open: boolean;
  onClose: () => void;
  sStep: number;
  miniStep: number;
}



export default function AuditoriaModal({ open, onClose, sStep, miniStep }: AuditoriaModalProps) {
  const { fetchProgress, currentUser, adminFreeNavigation, currentProject, currentZone, canPerform, hasPermission } = use5SStore();
  const sStepData = S_STEPS.find(s => s.id === sStep);
  const canSkipSteps = hasPermission('skip_steps');
  const canAudit = canPerform(sStep, 5);

  const [auditorName, setAuditorName] = useState('');
  const [results, setResults] = useState<Record<string, AuditItemResult>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [observaciones, setObservaciones] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  // Track which (open, sStep, sections-signature) we've already initialized for,
  // so we don't reset user edits if `sections` ref changes mid-session.
  const initializedFor = useRef<string>('');
  const [notaMinima, setNotaMinima] = useState(75);
  const [fechaAuditoria, setFechaAuditoria] = useState('');
  const [horaAuditoria, setHoraAuditoria] = useState('');
  const [auditPhotos, setAuditPhotos] = useState<{ file: File; preview: string; uploading?: boolean; serverUrl?: string }[]>([]);
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Project members for responsable selector on NOK items
  const [projectMembers, setProjectMembers] = useState<Array<{ id: string; userId: string; role: string; user: { id: string; name: string; email: string; role: string; active: boolean } }>>([]);

  // v2.64: Per-NOK-finding photos — IA describes the finding automatically
  const [nokPhotos, setNokPhotos] = useState<Record<string, { file: File; preview: string }[]>>({});
  const nokPhotoInputRef = useRef<Record<string, HTMLInputElement | null>>({});
  const [nokPhotoAnalyzing, setNokPhotoAnalyzing] = useState<Record<string, boolean>>({});

  // Scheduling for audit
  const [fechaProgramada, setFechaProgramada] = useState('');
  const [horaProgramada, setHoraProgramada] = useState('');

  // Load template from API (uses board config if zone has one)
  const { sections, isLoading: isLoadingTemplate, notaMinima: templateNotaMinima } = useChecklistTemplate('auditoria', sStep, open, currentZone?.boardConfigId);

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

  // Mejoras realizadas
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [haMejoras, setHaMejoras] = useState<boolean | null>(null);
  const [mejoras, setMejoras] = useState<Array<{ id: string; descripcion: string; responsable: string; fecha: string }>>([]);

  // v2.75: Pre-llenado de hallazgos pendientes heredados del paso 4 (autoeval) y paso 3 (inventario)
  // El auditor debe validar cada uno: mantener NOK, verificar resuelto, o recategorizar.
  // La deduplicacion al guardar evita crear ActionItems duplicados.
  const [heredados, setHeredados] = useState<Array<{
    id: string;
    hallazgo: string;
    itemId: string;
    source: string;
    prioridad: string;
    estado: string;
    photoRefs?: string | null;
    fechaLimite?: string | null;
    auditorOrig?: string | null;
    decisionRevision: 'pendiente' | 'mantener_nok' | 'verificado_resuelto' | 'recategorizar';
    nuevaPrioridad?: string;
    notasAuditor?: string;
  }>>([]);



  // Fetch dynamic threshold
  useEffect(() => {
    if (open && currentProject?.id) {
      const fetchThreshold = async () => {
        try {
          const params = new URLSearchParams({ projectId: currentProject.id });
          if (currentZone?.id) params.set('zoneId', currentZone.id);
          const res = await fetch(`/api/audit-targets?${params}`);
          const json = await res.json();
          if (json.success && json.data) {
            const zoneTarget = json.data.find((t: any) => t.sStep === sStep && t.miniStep === 5 && t.zoneId === currentZone?.id);
            const projectTarget = json.data.find((t: any) => t.sStep === sStep && t.miniStep === 5 && t.zoneId === null);
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
    setAuditorName(currentUser?.name || '');
    setObservaciones('');
    setIsCompleted(false);
    setFinalScore(0);
    setHaMejoras(null);
    setAuditPhotos([]);
    setMejoras([]);
    // Auto-fill date and time of the audit
    const now = new Date();
    setFechaAuditoria(now.toISOString().slice(0, 10));
    setHoraAuditoria(now.toTimeString().slice(0, 5));
    // Load scheduled date if available
    loadScheduledDate();
    // Load previously saved results (so user can see what was saved before)
    loadSavedResults();
    // v2.75: cargar hallazgos pendientes heredados del paso 4 (autoeval) y paso 3 (inventario)
    loadHeredados();
  }, [open, sStep, sections]);

  // v2.75: Cargar ActionItems pendientes heredados del paso 4 (autoeval) y paso 3 (inventario)
  // El auditor debe pronunciarse sobre cada uno: mantener NOK / verificar resuelto / recategorizar
  // Al guardar, los ActionItems verificados como resueltos se cierran con verificadoPorId=auditor.
  // Los ActionItems mantenidos como NOK se actualizan a prioridad='alta' y source='auditoria' (dedupe).
  const loadHeredados = async () => {
    if (!currentProject?.id || !currentZone?.id) return;
    try {
      // Cargar todos los ActionItems de la zona, filtrar por source y estado
      const res = await fetch(
        `/api/actions?projectId=${currentProject.id}` +
        `&source=autoevaluacion&source=inventario&source=actionplan`
      );
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const pendientes = json.data.filter((a: any) =>
          (a.source === 'autoevaluacion' || a.source === 'inventario' || a.source === 'actionplan') &&
          (a.estado === 'abierta' || a.estado === 'en_proceso') &&
          a.zoneId === currentZone.id
        ).map((a: any) => ({
          id: a.id,
          hallazgo: a.hallazgo || a.itemDescription || '',
          itemId: a.itemId,
          source: a.source,
          prioridad: a.prioridad,
          estado: a.estado,
          photoRefs: a.photoRefs,
          fechaLimite: a.fechaLimite,
          auditorOrig: a.auditor,
          decisionRevision: 'pendiente' as const,
          nuevaPrioridad: a.prioridad,
          notasAuditor: '',
        }));
        setHeredados(pendientes);
      }
    } catch (e) {
      console.error('[auditoria] Error cargando heredados:', e);
    }
  };

  // v2.75: Helper para cambiar la decisión de revisión sobre un hallazgo heredado
  const setHeredadoDecision = (id: string, decision: 'pendiente' | 'mantener_nok' | 'verificado_resuelto' | 'recategorizar') => {
    setHeredados(prev => prev.map(h => h.id === id ? { ...h, decisionRevision: decision } : h));
  };

  // v2.75: Helper para cambiar la nueva prioridad (en recategorización)
  const setHeredadoPrioridad = (id: string, prioridad: string) => {
    setHeredados(prev => prev.map(h => h.id === id ? { ...h, nuevaPrioridad: prioridad } : h));
  };

  // v2.75: Helper para añadir notas del auditor
  const setHeredadoNotas = (id: string, notas: string) => {
    setHeredados(prev => prev.map(h => h.id === id ? { ...h, notasAuditor: notas } : h));
  };

  // Load previously saved audit results from the backend
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
            if (Object.keys(loaded).length > 0) {
              setResults(loaded);
              if (notes.observaciones) setObservaciones(notes.observaciones);
              if (notes.fechaAuditoria) setFechaAuditoria(notes.fechaAuditoria);
              if (notes.horaAuditoria) setHoraAuditoria(notes.horaAuditoria);
              if (notes.auditorName) setAuditorName(notes.auditorName);
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
      setResults({});
    }
  }, [open]);

  // Load scheduled date/time for this auditoría
  const loadScheduledDate = async () => {
    if (!currentProject?.id || !currentZone?.id) return;
    try {
      const res = await fetch(`/api/evaluation-schedule?sStep=${sStep}&miniStep=5&projectId=${currentProject.id}&zoneId=${currentZone.id}`);
      const json = await res.json();
      if (json.success && json.data) {
        setFechaProgramada(json.data.fechaProgramada || '');
        setHoraProgramada(json.data.horaProgramada || '');
      }
    } catch (e) {
      console.error('Error loading scheduled date:', e);
    }
  };

  // Save scheduled date/time
  // v2.75: enviamos responsableId (ejecutor=auditor), empleadoId
  // (asistente=responsable de zona), createdBy y notifyUser:true
  // para que el backend dispare la notif 'evaluation_scheduled' al
  // asistente (responsable de zona).
  // En auditoría (miniStep=5):
  //   - ejecutor = primer auditor del proyecto
  //   - asistente = responsable de la zona (currentZone.responsableId)
  //     fallback al primer responsable del proyecto
  //   - createdBy = currentUser.id (auditor que programa)
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
      const auditorMember = members.find(m => m.role === 'auditor');
      const responsableMember = members.find(m => m.role === 'responsable');
      const responsableId = auditorMember?.userId || currentUser?.id || null;
      const empleadoId = currentZone.responsableId || responsableMember?.userId || null;

      if (!responsableId) {
        toast.error('No se puede programar: no hay auditor en el proyecto');
        return;
      }
      if (!empleadoId) {
        toast.error('No se puede programar: no hay responsable de zona');
        return;
      }

      const res = await fetch('/api/evaluation-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sStep,
          miniStep: 5,
          projectId: currentProject.id,
          zoneId: currentZone.id,
          fechaProgramada,
          horaProgramada,
          // v2.75: roles para que se disparen los avisos
          responsableId,   // EJECUTOR (auditor)
          empleadoId,      // ASISTENTE (responsable de zona)
          createdBy: currentUser?.id || null,
          rolEjecutor: 'auditor',
          notifyUser: true,
        }),
      });
      const json = await res.json();
      if (!json.success) {
        // v2.77: si el backend bloquea por hallazgos pendientes (409),
        // mostrar un diálogo con el listado para que el auditor sepa
        // exactamente qué debe cerrar el responsable antes de programar.
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
            `El responsable de zona debe cerrar estos hallazgos en el Plan de Acción antes de programar la auditoría.`
          );
        } else {
          toast.error(`Error al programar: ${json.error || 'desconocido'}`);
        }
        return;
      }
      toast.success('Fecha programada guardada — responsable avisado');
      // v2.75.2: refrescar store para que el badge "Programada" aparezca
      // inmediatamente sobre el globo 5 y el responsable lo vea sin tener
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

  const scoring = useMemo(() => {
    // SCORING: Treat missing results as 'ok' (default).
    // Bulletproof — does NOT depend on useEffect timing.
    let okCount = 0;
    let nokCount = 0;
    sections.forEach(s => s.items.forEach(item => {
      const status = results[item.id]?.status ?? 'ok';
      if (status === 'ok') okCount++;
      else if (status === 'nok') nokCount++;
    }));
    const answeredCount = okCount + nokCount;
    // Checklist maxes at 90%
    const checklistScore = totalItems > 0 ? Math.round((okCount / totalItems) * 90) : 0;
    // Each mejora with description adds 5%, max 2 mejoras = +10%
    const validMejorasCount = haMejoras ? mejoras.filter(m => m.descripcion.trim()).length : 0;
    const mejorasScore = Math.min(validMejorasCount, 2) * 5;
    const scorePercent = Math.min(checklistScore + mejorasScore, 100); // HARD CAP: never exceeds 100%
    return { okCount, nokCount, answeredCount, checklistScore, mejorasScore, validMejorasCount, scorePercent };
  }, [results, sections, totalItems, haMejoras, mejoras]);

  const canSubmit = canAudit && auditorName.trim() !== '' && scoring.answeredCount > 0;

  // Check that all NOK items have hallazgo and mejora filled
  const nokItems = Object.values(results).filter(r => r.status === 'nok');
  const allNokCompleted = nokItems.length === 0 || nokItems.every(r => (r.hallazgo || '').trim() !== '' && (r.mejora || '').trim() !== '' && (r.responsable || '').trim() !== '');
  const canSubmitFinal = canSubmit && allNokCompleted;

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
      setTimeout(() => autoFillResponsableForNok(itemId), 0);
    }
  };

  // v2.64: Per-NOK photo handlers — photo (paso 2) → IA describe → ActionItem (paso 3)
  const handleNokPhotoSelect = async (itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newPhotos: { file: File; preview: string }[] = [];
    for (const file of Array.from(files)) {
      const preview = URL.createObjectURL(file);
      newPhotos.push({ file, preview });
    }
    setNokPhotos(prev => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), ...newPhotos],
    }));
    if (nokPhotoInputRef.current[itemId]) nokPhotoInputRef.current[itemId]!.value = '';

    // v2.64: Autocompletar hallazgo/mejora con IA
    const currentResult = results[itemId];
    const shouldAutoDescribe = !(currentResult?.hallazgo || '').trim();
    if (shouldAutoDescribe && newPhotos.length > 0) {
      setNokPhotoAnalyzing(prev => ({ ...prev, [itemId]: true }));
      try {
        const file = newPhotos[0].file;
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        const descRes = await fetch('/api/photo-describe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl: dataUrl, sStep }),
        });
        const descJson = await descRes.json();
        if (descJson.success && descJson.description) {
          setItemField(itemId, 'hallazgo', descJson.description);
          const mejoraSuggested = `Aplicar 5S en ${sStepData?.japaneseName || 'S' + sStep}: corregir desviación detectada — ${descJson.description.slice(0, 100)}`;
          setItemField(itemId, 'mejora', mejoraSuggested);
          toast.success(`Descripción generada por IA para ${itemId}`);
        }
      } catch (err) {
        console.error('[auditoria] Error describiendo foto con IA:', err);
      } finally {
        setNokPhotoAnalyzing(prev => ({ ...prev, [itemId]: false }));
      }
    }

    // Autocompletar responsable
    const shouldAutoResponsable = !(currentResult?.responsable || '').trim();
    if (shouldAutoResponsable) {
      let responsableName: string | null = null;
      if (currentZone?.responsableId) {
        const zoneResp = projectMembers.find(m => m.userId === currentZone.responsableId);
        if (zoneResp?.user?.name) responsableName = zoneResp.user.name;
      }
      if (!responsableName) {
        const respMember = projectMembers.find(m => m.role === 'responsable');
        if (respMember?.user?.name) responsableName = respMember.user.name;
      }
      if (!responsableName && currentUser?.name) {
        responsableName = currentUser.name;
      }
      if (responsableName) setItemField(itemId, 'responsable', responsableName);
    }
  };

  const removeNokPhoto = (itemId: string, index: number) => {
    setNokPhotos(prev => {
      const photos = prev[itemId] || [];
      const photo = photos[index];
      if (photo?.preview) URL.revokeObjectURL(photo.preview);
      const updated = photos.filter((_, i) => i !== index);
      const next = { ...prev };
      if (updated.length === 0) delete next[itemId];
      else next[itemId] = updated;
      return next;
    });
  };

  // v2.64: Auto-completar responsable para NOK
  const autoFillResponsableForNok = (itemId: string) => {
    const currentResult = results[itemId];
    if ((currentResult?.responsable || '').trim()) return;
    let responsableName: string | null = null;
    if (currentZone?.responsableId) {
      const zoneResp = projectMembers.find(m => m.userId === currentZone.responsableId);
      if (zoneResp?.user?.name) responsableName = zoneResp.user.name;
    }
    if (!responsableName) {
      const respMember = projectMembers.find(m => m.role === 'responsable');
      if (respMember?.user?.name) responsableName = respMember.user.name;
    }
    if (!responsableName && currentUser?.name) {
      responsableName = currentUser.name;
    }
    if (responsableName) {
      setItemField(itemId, 'responsable', responsableName);
    }
  };

  // Marcar TODOS los items como OK de una sola vez.
  // Respeta los items ya marcados como NOK/N/A (no los sobreescribe).
  const markAllOk = () => {
    setResults(prev => {
      const next = { ...prev };
      sections.forEach(s => s.items.forEach(item => {
        const existing = next[item.id];
        if (!existing || existing.status === 'ok') {
          next[item.id] = { ...existing, itemId: item.id, status: 'ok' };
        }
      }));
      return next;
    });
  };

  // Forzar TODOS los items como OK (sobreescribe incluso NOK/N/A). Con confirmación.
  const forceAllOk = () => {
    const nokCount = sections.reduce((acc, s) => acc + s.items.filter(i => results[i.id]?.status === 'nok').length, 0);
    if (nokCount > 0) {
      if (!confirm(`¿Marcar los ${nokCount} hallazgo(s) pendientes como conformes? Se perderán las observaciones actuales.`)) return;
    }
    setResults(prev => {
      const next = { ...prev };
      sections.forEach(s => s.items.forEach(item => {
        next[item.id] = { ...next[item.id], itemId: item.id, status: 'ok' };
      }));
      return next;
    });
  };

  const setItemField = (itemId: string, field: 'hallazgo' | 'mejora' | 'otherText' | 'responsable', value: string) => {
    setResults(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], itemId, [field]: value },
    }));
  };

  const handleAuditPhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (const file of Array.from(files)) {
      const preview = URL.createObjectURL(file);
      setAuditPhotos(prev => [...prev, { file, preview }]);
    }
    if (photoInputRef.current) photoInputRef.current.value = '';
  };

  const removeAuditPhoto = (index: number) => {
    setAuditPhotos(prev => {
      const photo = prev[index];
      if (photo.preview) URL.revokeObjectURL(photo.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    const isApto = scoring.scorePercent >= notaMinima;
    try {
      // Save audit result (always save, even if not apto)
      const auditRes = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sStep,
          auditorName,
          result: isApto ? 'apto' : 'no_apto',
          score: Math.min(scoring.scorePercent, 100),
          observations: observaciones || null,
          fechaAuditoria,
          horaAuditoria,
          projectId: currentProject?.id,
          zoneId: currentZone?.id || null,
          checklistData: JSON.stringify(Object.values(results)),
          mejorasData: haMejoras ? JSON.stringify(mejoras.filter(m => m.descripcion.trim())) : null,
        }),
      });

      const auditJson = await auditRes.json();

      // Handle server-side role rejection
      if (auditRes.status === 403) {
        setIsSubmitting(false);
        alert(auditJson.error || 'No tienes permisos para realizar auditorías externas');
        return;
      }

      if (!auditJson.success) {
        setIsSubmitting(false);
        alert(auditJson.error || 'Error al guardar la auditoría');
        return;
      }
      if (auditJson.success) {
        // Feedback visible
        toast.success(`Auditoría guardada: ${Object.keys(results).length} items (${scoring.okCount} OK, ${scoring.nokCount} NOK, score ${scoring.scorePercent}%)`);

        // v2.74.4: Marcar el schedule como 'realizada' y avisar a responsable/empleado
        if (currentProject?.id && currentZone?.id) {
          try {
            const schedRes = await fetch(
              `/api/evaluation-schedule?sStep=${sStep}&miniStep=5&projectId=${currentProject.id}&zoneId=${currentZone.id}`
            );
            const schedData = await schedRes.json();
            if (schedData?.success && schedData?.data?.id) {
              await fetch('/api/evaluation-schedule', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: schedData.data.id, estado: 'realizada' }),
              });
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
                    title: `✓ Auditoría S${sStep} completada (score ${scoring.scorePercent}%)`,
                    message: `La auditoría de S${sStep} programada para el ${fechaStr} se ha completado con un ${scoring.scorePercent}%. Resultado: ${isApto ? 'APTO' : 'NO APTO'}. Zona: ${currentZone?.name || 'sin zona'}.`,
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

        // Also save results in progress.notes so loadSavedResults can find them on reopen
        try {
          await fetch(`/api/progress/step?sStep=${sStep}&miniStep=${miniStep}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              completed: isApto,
              score: scoring.scorePercent,
              notes: JSON.stringify({
                type: 'auditoria',
                passed: isApto,
                notaMinima,
                results: Object.values(results),
                observaciones,
                auditorName,
                fechaAuditoria,
                horaAuditoria,
              }),
              projectId: currentProject?.id,
              zoneId: currentZone?.id || null,
            }),
          });
        } catch (progressErr) {
          console.error('Error saving audit results to progress.notes:', progressErr);
        }

        // Create action items for each NOK to transmit disfunciones to the operator
        // v2.64: Sube fotos del hallazgo a la biblioteca y enlaza al ActionItem via photoRefs
        const nokResults = Object.values(results).filter(r => r.status === 'nok');
        for (const nok of nokResults) {
          // 1. Subir fotos del hallazgo a la biblioteca (si las hay)
          const photoUrls: string[] = [];
          const itemPhotos = nokPhotos[nok.itemId] || [];
          if (itemPhotos.length > 0) {
            for (let pIdx = 0; pIdx < itemPhotos.length; pIdx++) {
              const photo = itemPhotos[pIdx];
              try {
                const formData = new FormData();
                formData.append('file', photo.file);
                formData.append('filename', `S${sStep}_audit_nok_${nok.itemId}_${currentZone?.name || 'zona'}_${pIdx + 1}_${Date.now()}.jpg`);
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
                      miniStep: 5,
                      title: `Hallazgo Auditoría S${sStep} - ${nok.itemId} - Foto ${pIdx + 1}`,
                      description: `Hallazgo auditoría S${sStep} (${sStepData?.japaneseName || ''}) · Zona: ${currentZone?.name || '—'} · Item: ${nok.itemId}\nHallazgo: ${(nok.hallazgo || '').slice(0, 200)}\nAuditor: ${auditorName || '—'}`,
                      photoUrl: uploadData.url,
                      photoType: 'hallazgo',
                      category: `auditoria_nok_s${sStep}`,
                      tags: JSON.stringify([
                        `S${sStep}`, sStepData?.japaneseName || '',
                        currentZone?.name || '', 'paso5', 'auditoria',
                        'hallazgo', 'nok', `item:${nok.itemId}`,
                      ]),
                      projectId: currentProject?.id,
                      zoneId: currentZone?.id || null,
                      uploadedBy: currentUser?.id || null,
                    }),
                  });
                }
              } catch (photoErr) {
                console.error(`[auditoria] Error subiendo foto ${pIdx + 1} del NOK ${nok.itemId}:`, photoErr);
              }
            }
          }

          // 2. Crear ActionItem con photoRefs
          // v2.76: unificación de tablas — el ActionItem se crea con todos
          // los campos de "Demanda" autocompletados (seccionDemandante=
          // 'Auditoría', clienteZona=nombre zona, personaDemandada=
          // responsable de zona, etc.) para que aparezca en el Plan de
          // Acción con la misma estructura que las entradas manuales,
          // los items del inventario y los hallazgos de autoeval.
          const demandaFieldsAudit = buildHallazgoFromNok({
            miniStep: 5,
            zonaName: currentZone?.name,
          });
          await fetch('/api/actions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sStep,
              miniStep: 5,
              itemId: nok.itemId,
              itemDescription: `Disfunción detectada en auditoría: ${nok.itemId}`,
              hallazgo: nok.hallazgo || nok.itemId,
              mejora: nok.mejora || '',
              // v2.78: responsable legacy eliminado del payload.
              // comunicadoPorId se resuelve por sesión en el backend (= auditor).
              // personaDemandadaId = responsable de la zona (a quien se demanda
              //   la acción correctiva del NOK detectado en auditoría).
              personaDemandadaId: currentZone?.responsableId || null,
              prioridad: 'alta',
              estado: 'abierta',
              source: 'auditoria',
              auditor: auditorName,
              projectId: currentProject?.id,
              zoneId: currentZone?.id || null,
              // v2.78: sourceId se deja a null para NOKs de auditoría.
              // La deduplicación del backend usa (itemId, zoneId, projectId, estado)
              // para detectar NOKs repetidos entre autoeval y auditoría y hacer
              // UPDATE en lugar de INSERT.
              photoRefs: photoUrls.length > 0 ? JSON.stringify(photoUrls) : undefined,
              // v2.76/v2.78: campos de Hallazgo autocompletados (sin texto legacy)
              ...demandaFieldsAudit,
            }),
          });
        }

        // ─── v2.75: Procesar hallazgos heredados (autoeval/inventario/plan) ───
        // Para cada heredado, aplicar la decisión del auditor:
        //   - 'mantener_nok': actualizar prioridad='alta', source='auditoria', auditor=auditorName
        //   - 'verificado_resuelto': cerrar ActionItem (estado='cerrada', verificadoPorId=auditor, fechaReal=now)
        //   - 'recategorizar': cambiar prioridad (alta/media/baja) + source='auditoria' + notas
        //   - 'pendiente': no hacer nada (queda para próxima auditoría)
        if (heredados.length > 0) {
          for (const h of heredados) {
            try {
              if (h.decisionRevision === 'verificado_resuelto') {
                await fetch(`/api/actions?id=${h.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    estado: 'cerrada',
                    verificadoPorId: currentUser?.id || null,
                    notas: h.notasAuditor ? `Verificado resuelto en auditoría S${sStep} por ${auditorName}: ${h.notasAuditor}` : `Verificado resuelto en auditoría S${sStep} por ${auditorName}`,
                  }),
                });
                // Notificar al responsable que se cerró
                if (currentZone?.responsableId) {
                  await fetch('/api/notifications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      userId: currentZone.responsableId,
                      type: 'action_verified',
                      title: `Acción verificada: ${h.hallazgo.slice(0, 50)}`,
                      message: `El auditor ${auditorName} ha verificado como resuelta la acción del Plan de Acción en S${sStep}. Zona: ${currentZone.name}.${h.notasAuditor ? ` Notas: ${h.notasAuditor}` : ''}\n\n[ref:${h.id}]`,
                      metadata: JSON.stringify({
                        actionItemId: h.id,
                        verificadorId: currentUser?.id,
                        verificadorName: auditorName,
                        sStep,
                        miniStep: 5,
                      }),
                      sStep,
                      zoneId: currentZone.id,
                      projectId: currentProject?.id,
                    }),
                  });
                }
              } else if (h.decisionRevision === 'mantener_nok' || h.decisionRevision === 'recategorizar') {
                // Mantener como NOK: subir prioridad a 'alta' y marcar como revisado por auditor
                const nuevaPrioridad = h.decisionRevision === 'recategorizar' && h.nuevaPrioridad
                  ? h.nuevaPrioridad
                  : 'alta';
                // v2.78: cuando el auditor recategoriza, usamos personaDemandadaId (FK)
                // en lugar del texto legacy 'responsable'. El responsable demandado
                // es el responsable de la zona si está disponible.
                const personaDemandadaIdRecat = currentZone?.responsableId || null;
                await fetch(`/api/actions?id=${h.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    prioridad: nuevaPrioridad,
                    source: 'auditoria',
                    auditor: auditorName,
                    estado: 'en_proceso',
                    // v2.78: FK al responsable demandado (no texto legacy).
                    // Solo lo seteamos si está informado.
                    ...(personaDemandadaIdRecat ? { personaDemandadaId: personaDemandadaIdRecat } : {}),
                    notas: h.notasAuditor
                      ? `Confirmado NOK en auditoría S${sStep} por ${auditorName}. Prioridad: ${nuevaPrioridad}. Notas: ${h.notasAuditor}`
                      : `Confirmado NOK en auditoría S${sStep} por ${auditorName}. Prioridad: ${nuevaPrioridad}.`,
                  }),
                });
              }
            } catch (e) {
              console.error('[auditoria] Error procesando heredado:', e);
            }
          }
        }

        // ─── Notify responsables of NOK disfunciones from audit ───
        if (nokResults.length > 0 && currentProject?.id && currentZone?.id) {
          try {
            const membersRes = await fetch(`/api/projects/${currentProject.id}/members`);
            const membersData = await membersRes.json();
            const allMembers = membersData?.members || [];

            const sStepData = S_STEPS.find(s => s.id === sStep);
            const disfuncionMessage = `El auditor ha detectado ${nokResults.length} disfunción(es) en la auditoría de S${sStep} (${sStepData?.japaneseName || ''}) en la zona "${currentZone.name}". Revisa el Plan de Acción.`;

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
                  title: `Disfunciones en auditoría: S${sStep} — ${sStepData?.japaneseName || ''}`,
                  message: disfuncionMessage,
                  sStep,
                  zoneId: currentZone.id,
                  projectId: currentProject.id,
                }),
              });
            }
          } catch (notifError) {
            console.error('Error notifying responsables of audit disfunciones:', notifError);
          }
        }

        // ─── Upload audit photos to library with traceability ───
        if (auditPhotos.length > 0) {
          setIsUploadingPhotos(true);
          for (let idx = 0; idx < auditPhotos.length; idx++) {
            const photo = auditPhotos[idx];
            try {
              const formData = new FormData();
              formData.append('file', photo.file);
              formData.append('filename', `S${sStep}_auditoria_${currentZone?.name || 'zona'}_${idx + 1}_${Date.now()}.jpg`);

              const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
              });
              const uploadData = await uploadRes.json();

              if (uploadData.success && uploadData.url) {
                await fetch('/api/photo-library', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    sStep,
                    miniStep: 5,
                    title: `Auditoría S${sStep} - Foto ${idx + 1}`,
                    description: `${sStepData?.japaneseName || 'S' + sStep} - ${currentZone?.name || 'Zona'} - Paso 5 Auditoría - Auditor: ${auditorName}`,
                    photoUrl: uploadData.url,
                    photoType: 'hallazgo',
                    category: `paso5_s${sStep}`,
                    tags: JSON.stringify([`S${sStep}`, sStepData?.japaneseName || '', currentZone?.name || '', 'paso5', 'auditoria', 'hallazgo']),
                    projectId: currentProject?.id,
                    zoneId: currentZone?.id || null,
                    uploadedBy: currentUser?.id || null,
                  }),
                });
              }
            } catch (photoErr) {
              console.error('Error uploading audit photo:', photoErr);
            }
          }
          setIsUploadingPhotos(false);
        }

        // Mark the mini-step as completed
        // Build effective results: merge missing items as 'ok' (default) before sending to backend
        const effectiveResults = sections.flatMap(s => s.items).map(item => {
          const r = results[item.id];
          return r ?? { itemId: item.id, status: 'ok' as const };
        });
        const progressRes = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=${miniStep}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            completed: isApto,
            score: Math.min(scoring.scorePercent, 100),
            notes: JSON.stringify({
              type: 'auditoria_externa',
              auditor: auditorName,
              result: isApto ? 'apto' : 'no_apto',
              fecha: fechaAuditoria,
              hora: horaAuditoria,
              results: effectiveResults,
              observaciones,
              mejorasRealizadas: haMejoras,
              mejoras: haMejoras ? mejoras.filter(m => m.descripcion.trim()) : [],
              disfuncionesCount: nokResults.length,
            }),
            projectId: currentProject?.id,
            zoneId: currentZone?.id || null,
          }),
        });

        const progressJson = await progressRes.json();

        // Handle progress update failure
        if (!progressJson.success) {
          console.error('Error updating progress after audit:', progressJson.error);
          if (progressRes.status === 403) {
            alert(`La auditoría se ha guardado, pero no se pudo marcar el paso como completado: ${progressJson.error}. Verifica los permisos del auditor.`);
          } else {
            alert(`La auditoría se ha guardado, pero hubo un error al actualizar el progreso: ${progressJson.error || 'Error desconocido'}`);
          }
        }

        // Always mark as completed in UI if audit was saved successfully
        // (even if progress update failed, the audit result is saved)
        setIsCompleted(true);
        setFinalScore(scoring.scorePercent);

        // Refresh progress (this also refreshes employeeProgress now)
        await fetchProgress();
      }
    } catch (error) {
      console.error('Error submitting audit:', error);
      toast.error('No se pudo guardar la auditoría. Inténtalo de nuevo en unos minutos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminSkip = async () => {
    try {
      // Save audit result
      await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sStep,
          auditorName: 'Admin (skip)',
          result: 'apto',
          score: 100,
          observations: 'Completado por administrador (skip)',
          projectId: currentProject?.id,
          zoneId: currentZone?.id || null,
        }),
      });
      // Mark progress as completed
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
            <ShieldCheck className="h-5 w-5" style={{ color: sStepData?.color }} />
            <span>Auditoría Externa</span>
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
              Completar paso sin auditoría
            </Button>
          </div>
        )}

        {/* Barra FIJA con acciones rápidas — siempre visible, fuera del scroll */}
        {!isCompleted && sections.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap px-6 py-2 flex-shrink-0 bg-green-50 border-b border-green-200">
            <CheckCheck className="h-4 w-4 text-green-700 shrink-0" />
            <span className="text-xs text-green-800 font-medium">Acciones rápidas:</span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-7 text-xs border-green-300 text-green-700 hover:bg-green-100 bg-white"
              onClick={markAllOk}
              title="Marca como OK todos los items que aún no tienen estado (respeta los NOK/N/A ya marcados)"
            >
              Marcar todo OK
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-7 text-xs border-amber-300 text-amber-700 hover:bg-amber-100 bg-white"
              onClick={forceAllOk}
              title="Marca todos los puntos como conformes"
            >
              Marcar todo conforme
            </Button>
            <span className="ml-auto text-[10px] text-muted-foreground font-mono">
              {scoring.okCount} OK · {scoring.nokCount} NOK · {scoring.scorePercent}%
            </span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0">
        {/* Permission check */}
        {!canAudit && !isCompleted && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-700 font-medium">No tienes permiso para realizar auditorías en este paso. Tu rol: {currentUser?.role || 'sin rol'}</span>
          </div>
        )}

        {!canAudit && !isCompleted ? null : isLoadingTemplate ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : sections.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-2">No hay checklist configurado</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              No se encontró una plantilla de auditoría para S{sStep}. 
              Crea una plantilla en <strong>Administración → Plantillas → Auditoría Externa</strong> 
              o pulsa el botón &quot;Crear plantillas por defecto&quot;.
            </p>
          </div>
        ) : isCompleted ? (
          <div className="space-y-4">
            <div className="text-center py-4">
              {finalScore >= notaMinima ? (
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-3" />
              ) : (
                <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-3" />
              )}
              <h3 className="text-xl font-bold mb-2">
                {finalScore >= notaMinima ? 'Auditoría Externa Superada' : 'Auditoría No Superada'}
              </h3>
              <p className="text-lg mb-1">Puntuación Total: <strong>{finalScore}%</strong></p>
              <div className="flex justify-center gap-3 my-2">
                <Badge className="bg-blue-100 text-blue-800">Checklist: {scoring.checklistScore}%</Badge>
                <Badge className="bg-green-100 text-green-800">Mejoras: +{scoring.mejorasScore}%</Badge>
              </div>
              <p className="text-muted-foreground">
                {scoring.okCount} OK / {scoring.nokCount} NOK de {totalItems} puntos de verificación
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Auditor: <strong>{auditorName}</strong>
              </p>
            </div>

            {finalScore >= notaMinima ? (
              <div className="text-center">
                <Badge className="bg-green-500 text-lg px-4 py-1">Apto — Mini-paso completado</Badge>
                <p className="text-sm text-muted-foreground mt-2">La auditoría ha sido registrada y el paso se marca como completado.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-center">
                  <Badge className="bg-red-500 text-lg px-4 py-1">No Apto — Se requiere corrección</Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    Mínimo requerido: {notaMinima}%. Debes corregir las disfunciones y realizar una nueva auditoría.
                  </p>
                </div>

                {/* Saved confirmation */}
                <Card className="border-green-200 bg-green-50/30">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-800">Auditoría guardada correctamente</span>
                    </div>
                    <p className="text-xs text-green-700">
                      El resultado de esta auditoría ({finalScore}%) ha sido registrado. Las disfunciones detectadas se han guardado como acciones de mejora en el Plan de Acción.
                    </p>
                  </CardContent>
                </Card>

                {scoring.nokCount > 0 && (
                  <Card className="border-red-200">
                    <CardContent className="p-3">
                      <p className="text-sm font-semibold text-red-800 mb-2">
                        {scoring.nokCount} disfunciones detectadas:
                      </p>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {Object.values(results).filter(r => r.status === 'nok').map((nok) => (
                          <div key={nok.itemId} className="bg-red-50 border border-red-200 rounded p-2 text-xs">
                            <span className="font-medium text-red-700">{nok.itemId}</span>
                            {nok.hallazgo && <span className="text-red-600"> — {nok.hallazgo}</span>}
                            {nok.mejora && <span className="text-amber-600"> → Mejora: {nok.mejora}</span>}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Estas disfunciones están disponibles en el Plan de Acción para su seguimiento.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Info banner */}
            <div className="p-3 rounded-lg border-l-4" style={{ borderColor: sStepData?.color, backgroundColor: `${sStepData?.color}08` }}>
              <p className="text-sm font-medium" style={{ color: sStepData?.color }}>
                Auditoría Externa — {sStepData?.japaneseName}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                El auditor evalúa cada punto (máx. 90%). Cada mejora realizada suma +5% (máx. 2 mejoras = +10%). Para aprobar se necesita ≥{notaMinima}%.
                Los NOKs generan hallazgos y puntos de mejora como plan de acción.
              </p>
            </div>

            {/* Auditor name + date/time */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div>
                  <Label htmlFor="auditorName" className="text-sm font-medium">Nombre del Auditor Externo *</Label>
                  <Input
                    id="auditorName"
                    placeholder="Ingrese el nombre del auditor externo"
                    value={auditorName}
                    onChange={e => setAuditorName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="fechaAuditoria" className="text-sm font-medium">Fecha de auditoría</Label>
                    <Input
                      id="fechaAuditoria"
                      type="date"
                      value={fechaAuditoria}
                      onChange={e => setFechaAuditoria(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="horaAuditoria" className="text-sm font-medium">Hora de auditoría</Label>
                    <Input
                      id="horaAuditoria"
                      type="time"
                      value={horaAuditoria}
                      onChange={e => setHoraAuditoria(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                {/* Scheduling section */}
                <div className="border-t pt-3 mt-1">
                  <p className="text-xs font-semibold text-blue-700 flex items-center gap-1 mb-2">
                    <Calendar className="h-3.5 w-3.5" />
                    Programar Auditoría
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="fechaProgAudit" className="text-[10px] text-blue-600">Fecha programada</Label>
                      <Input id="fechaProgAudit" type="date" value={fechaProgramada}
                        onChange={e => setFechaProgramada(e.target.value)}
                        className="h-7 text-xs" />
                    </div>
                    <div>
                      <Label htmlFor="horaProgAudit" className="text-[10px] text-blue-600">Hora programada</Label>
                      <Input id="horaProgAudit" type="time" value={horaProgramada}
                        onChange={e => setHoraProgramada(e.target.value)}
                        className="h-7 text-xs" />
                    </div>
                  </div>
                  {fechaProgramada && (
                    <Button size="sm" variant="outline" className="h-6 text-[10px] border-blue-300 text-blue-700 mt-2"
                      onClick={handleSaveSchedule}>
                      Guardar programación
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Score indicator */}
            <div className="p-3 bg-muted rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Puntuación Total</span>
                  <p className="text-xs text-muted-foreground">
                    {scoring.okCount} OK / {scoring.nokCount} NOK de {totalItems} puntos
                  </p>
                </div>
                <Badge variant={scoring.scorePercent >= notaMinima ? 'default' : 'secondary'} className="text-base px-3 py-1">
                  {scoring.scorePercent}%
                </Badge>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-blue-100 text-blue-800">Checklist: {scoring.checklistScore}% (máx. 90%)</Badge>
                <Badge className="bg-green-100 text-green-800">Mejoras: +{scoring.mejorasScore}% ({scoring.validMejorasCount} {scoring.validMejorasCount === 1 ? 'mejora' : 'mejoras'}, máx. +10%)</Badge>
                <Badge className="bg-green-100 text-green-800">OK: {scoring.okCount}</Badge>
                <Badge className="bg-red-100 text-red-800">NOK: {scoring.nokCount}</Badge>
              </div>
              <p className="text-[10px] text-muted-foreground">Mínimo para aprobar: {notaMinima}%</p>
            </div>

            {/* v2.75: Panel de hallazgos heredados del paso 4 (autoeval) y paso 3 (inventario) */}
            {heredados.length > 0 && (
              <Card className="border-purple-300 bg-purple-50/50">
                <div className="p-3 border-b border-purple-200 bg-purple-100/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-purple-700" />
                      <span className="text-sm font-semibold text-purple-900">
                        Hallazgos heredados para verificar ({heredados.length})
                      </span>
                    </div>
                    <Badge className="bg-purple-200 text-purple-900">
                      {heredados.filter(h => h.decisionRevision === 'pendiente').length} sin revisar
                    </Badge>
                  </div>
                  <p className="text-[11px] text-purple-800 mt-1">
                    Pronúnciate sobre cada hallazgo detectado previamente: mantener como NOK, verificar resuelto, o recategorizar.
                  </p>
                </div>
                <div className="divide-y divide-purple-100">
                  {heredados.map((h) => (
                    <div key={h.id} className="p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-[10px]">
                              {h.source === 'autoevaluacion' ? '⚠️ Autoeval' :
                               h.source === 'inventario' ? '📦 Inventario' : '📝 Plan'}
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
                          className={`text-[11px] h-7 ${h.decisionRevision === 'mantener_nok' ? 'bg-red-100 border-red-400 text-red-800' : ''}`}
                          onClick={() => setHeredadoDecision(h.id, 'mantener_nok')}
                          
                        >
                          <XCircle className="h-3 w-3 mr-1" /> Mantener NOK
                        </Button>
                        <Button
                          size="sm" variant="outline"
                          className={`text-[11px] h-7 ${h.decisionRevision === 'verificado_resuelto' ? 'bg-green-100 border-green-400 text-green-800' : ''}`}
                          onClick={() => setHeredadoDecision(h.id, 'verificado_resuelto')}
                          
                        >
                          <CheckCircle className="h-3 w-3 mr-1" /> Verificado resuelto
                        </Button>
                        <Button
                          size="sm" variant="outline"
                          className={`text-[11px] h-7 ${h.decisionRevision === 'recategorizar' ? 'bg-blue-100 border-blue-400 text-blue-800' : ''}`}
                          onClick={() => setHeredadoDecision(h.id, 'recategorizar')}
                          
                        >
                          Recategorizar
                        </Button>
                      </div>
                      {h.decisionRevision === 'recategorizar' && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] text-gray-600">Nueva prioridad:</span>
                          {['alta', 'media', 'baja'].map(p => (
                            <Button
                              key={p}
                              size="sm" variant="ghost"
                              className={`text-[11px] h-6 px-2 ${h.nuevaPrioridad === p ? 'bg-blue-100 text-blue-800' : ''}`}
                              onClick={() => setHeredadoPrioridad(h.id, p)}
                              
                            >
                              {p}
                            </Button>
                          ))}
                        </div>
                      )}
                      {h.decisionRevision !== 'pendiente' && (
                        <Input
                          placeholder="Notas del auditor..."
                          value={h.notasAuditor}
                          onChange={(e) => setHeredadoNotas(h.id, e.target.value)}
                          className="text-xs h-8"
                          
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Checklist sections - same checklist as autoevaluación */}
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
                        const hasResult = !!results[item.id];
                        const result = results[item.id];
                        const status = hasResult ? (result?.status ?? 'ok') : 'ok';
                        const isNok = status === 'nok';

                        return (
                          <div key={item.id} className="border rounded-lg p-3 space-y-2">
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

                            {item.hasOther && (
                              <Input
                                placeholder="Especificar..."
                                value={result?.otherText || ''}
                                onChange={e => setItemField(item.id, 'otherText', e.target.value)}
                                className="text-sm"
                              />
                            )}

                            {/* NOK details: PRIMERO foto (paso 2) → IA describe → mejora + responsable (paso 3) */}
                            {isNok && (
                              <div className="space-y-2 pl-6 border-l-2 border-red-200">
                                {/* 1. FOTO PRIMERO */}
                                <div className="space-y-2">
                                  <label className="text-xs font-medium text-blue-700 flex items-center gap-1">
                                    <Camera className="h-3 w-3" />
                                    Foto del hallazgo (1º) — describe con IA el hallazgo
                                  </label>
                                  <input
                                    ref={el => { nokPhotoInputRef.current[item.id] = el; }}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={e => handleNokPhotoSelect(item.id, e)}
                                  />
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-xs"
                                      onClick={() => nokPhotoInputRef.current[item.id]?.click()}
                                    >
                                      <Camera className="h-3 w-3 mr-1" /> Añadir foto
                                    </Button>
                                    {(nokPhotos[item.id] || []).length > 0 && (
                                      <span className="text-[10px] text-muted-foreground">
                                        {(nokPhotos[item.id] || []).length} foto(s) adjunta(s)
                                      </span>
                                    )}
                                    {nokPhotoAnalyzing[item.id] && (
                                      <span className="text-[10px] text-purple-600 font-medium flex items-center gap-1">
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                        IA analizando…
                                      </span>
                                    )}
                                  </div>
                                  {(nokPhotos[item.id] || []).length > 0 && (
                                    <div className="grid grid-cols-4 gap-2 mt-1">
                                      {(nokPhotos[item.id] || []).map((photo, idx) => (
                                        <div key={idx} className="relative group">
                                          <img src={photo.preview} alt={`Hallazgo ${idx + 1}`} className="w-full h-16 object-cover rounded-lg border" />
                                          <button
                                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => removeNokPhoto(item.id, idx)}
                                            title="Quitar foto"
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  <p className="text-[10px] text-muted-foreground">
                                    Al añadir una foto, la IA autocompleta la descripción del hallazgo y la mejora sugerida.
                                  </p>
                                </div>

                                {/* 2. Hallazgo — autocompletado por IA, con botón para regenerar */}
                                <div>
                                  <label className="text-xs font-medium text-red-700 flex items-center justify-between">
                                    <span>Referencia del hallazgo (desviación) *</span>
                                    {(nokPhotos[item.id] || []).length > 0 && (
                                      <button
                                        type="button"
                                        className="text-[10px] text-purple-600 hover:text-purple-800 underline flex items-center gap-1"
                                        onClick={async () => {
                                          const photos = nokPhotos[item.id] || [];
                                          if (photos.length === 0) return;
                                          setNokPhotoAnalyzing(prev => ({ ...prev, [item.id]: true }));
                                          try {
                                            const file = photos[0].file;
                                            const dataUrl = await new Promise<string>((resolve, reject) => {
                                              const reader = new FileReader();
                                              reader.onload = () => resolve(reader.result as string);
                                              reader.onerror = reject;
                                              reader.readAsDataURL(file);
                                            });
                                            const descRes = await fetch('/api/photo-describe', {
                                              method: 'POST',
                                              headers: { 'Content-Type': 'application/json' },
                                              body: JSON.stringify({ imageUrl: dataUrl, sStep }),
                                            });
                                            const descJson = await descRes.json();
                                            if (descJson.success && descJson.description) {
                                              setItemField(item.id, 'hallazgo', descJson.description);
                                              const mejoraSuggested = `Aplicar 5S en ${sStepData?.japaneseName || 'S' + sStep}: corregir desviación detectada — ${descJson.description.slice(0, 100)}`;
                                              setItemField(item.id, 'mejora', mejoraSuggested);
                                              toast.success(`Descripción regenerada por IA`);
                                            } else {
                                              toast.error('No se pudo generar la descripción');
                                            }
                                          } catch (err) {
                                            console.error('[auditoria] Error regenerando descripción IA:', err);
                                            toast.error('Error al regenerar descripción');
                                          } finally {
                                            setNokPhotoAnalyzing(prev => ({ ...prev, [item.id]: false }));
                                          }
                                        }}
                                      >
                                        <Sparkles className="h-3 w-3" /> Regenerar con IA
                                      </button>
                                    )}
                                  </label>
                                  <Textarea
                                    placeholder="Obligatorio: describa la desviación encontrada..."
                                    value={result?.hallazgo || ''}
                                    onChange={e => setItemField(item.id, 'hallazgo', e.target.value)}
                                    className={`text-sm mt-1 ${!(result?.hallazgo || '').trim() ? 'border-red-400 focus:border-red-500' : ''}`}
                                    rows={2}
                                  />
                                  {!(result?.hallazgo || '').trim() && (
                                    <p className="text-[10px] text-red-500 mt-0.5">Campo obligatorio</p>
                                  )}
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-amber-700">Punto a Mejorar (sugerencia) *</label>
                                  <Textarea
                                    placeholder="Obligatorio: sugiera una mejora..."
                                    value={result?.mejora || ''}
                                    onChange={e => setItemField(item.id, 'mejora', e.target.value)}
                                    className={`text-sm mt-1 ${!(result?.mejora || '').trim() ? 'border-amber-400 focus:border-amber-500' : ''}`}
                                    rows={2}
                                  />
                                  {!(result?.mejora || '').trim() && (
                                    <p className="text-[10px] text-amber-500 mt-0.5">Campo obligatorio</p>
                                  )}
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-blue-700 flex items-center gap-1">
                                    <UserCircle className="h-3 w-3" />
                                    Responsable de la acción *
                                  </label>
                                  <Select
                                    value={result?.responsable || ''}
                                    onValueChange={val => setItemField(item.id, 'responsable', val)}
                                  >
                                    <SelectTrigger className={`text-sm mt-1 ${!(result?.responsable || '').trim() ? 'border-blue-400 focus:border-blue-500' : ''}`}>
                                      <SelectValue placeholder="Selecciona quien debe resolverlo..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {projectMembers.length === 0 ? (
                                        <SelectItem value="__none__" disabled>No hay miembros en el proyecto</SelectItem>
                                      ) : (
                                        projectMembers
                                          .filter(m => m.user?.active !== false)
                                          .map(m => (
                                            <SelectItem key={m.id} value={m.user.name}>
                                              <div className="flex items-center gap-2">
                                                <span>{m.user.name}</span>
                                                <span className="text-[10px] text-muted-foreground">({m.role})</span>
                                              </div>
                                            </SelectItem>
                                          ))
                                      )}
                                    </SelectContent>
                                  </Select>
                                  {!(result?.responsable || '').trim() && (
                                    <p className="text-[10px] text-blue-500 mt-0.5">Selecciona un responsable</p>
                                  )}
                                  {result?.responsable && (
                                    <p className="text-[10px] text-green-600 mt-0.5">
                                      ✓ Autocompletado — puedes cambiarlo si es necesario
                                    </p>
                                  )}
                                </div>
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

            {/* Mejoras realizadas */}
            <Card className="border-green-200 bg-green-50/30">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <label className="text-sm font-semibold text-green-800">¿Se han realizado mejoras desde la última auditoría?</label>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      haMejoras === true
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-green-700 border border-green-300 hover:bg-green-50'
                    }`}
                    onClick={() => { setHaMejoras(true); if (mejoras.length === 0) setMejoras([{ id: Date.now().toString(), descripcion: '', responsable: '', fecha: '' }]); }}
                  >
                    Sí
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      haMejoras === false
                        ? 'bg-gray-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => { setHaMejoras(false); setMejoras([]); }}
                  >
                    No
                  </button>
                </div>

                {haMejoras && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-green-700">
                        Mejoras realizadas ({mejoras.filter(m => m.descripcion.trim()).length})
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-green-300 text-green-700 hover:bg-green-50 h-7"
                        onClick={() => setMejoras([...mejoras, { id: Date.now().toString(), descripcion: '', responsable: '', fecha: '' }])}
                      >
                        <Plus className="h-3 w-3 mr-1" /> Añadir mejora
                      </Button>
                    </div>
                    {mejoras.map((mejora, idx) => (
                      <div key={mejora.id} className="bg-white border border-green-200 rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-green-700">Mejora {idx + 1}</span>
                          {mejoras.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-400 hover:text-red-600"
                              onClick={() => setMejoras(mejoras.filter(m => m.id !== mejora.id))}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        <div>
                          <label className="text-[10px] font-medium text-muted-foreground">Descripción de la mejora *</label>
                          <Textarea
                            placeholder="Describa la mejora realizada..."
                            value={mejora.descripcion}
                            onChange={e => {
                              const updated = [...mejoras];
                              updated[idx] = { ...updated[idx], descripcion: e.target.value };
                              setMejoras(updated);
                            }}
                            className="text-sm mt-0.5"
                            rows={2}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-medium text-muted-foreground">Responsable</label>
                            <Input
                              placeholder="Nombre del responsable"
                              value={mejora.responsable}
                              onChange={e => {
                                const updated = [...mejoras];
                                updated[idx] = { ...updated[idx], responsable: e.target.value };
                                setMejoras(updated);
                              }}
                              className="text-sm h-8 mt-0.5"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-medium text-muted-foreground">Fecha</label>
                            <Input
                              type="date"
                              value={mejora.fecha}
                              onChange={e => {
                                const updated = [...mejoras];
                                updated[idx] = { ...updated[idx], fecha: e.target.value };
                                setMejoras(updated);
                              }}
                              className="text-sm h-8 mt-0.5"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Observaciones */}
            <Card>
              <CardContent className="p-4">
                <label className="text-sm font-medium">Observaciones del auditor</label>
                <Textarea
                  placeholder="Observaciones adicionales de la auditoría externa..."
                  value={observaciones}
                  onChange={e => setObservaciones(e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Fotos de la auditoría */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-muted-foreground" />
                    <label className="text-sm font-medium">Fotos de la auditoría</label>
                  </div>
                  <span className="text-xs text-muted-foreground">{auditPhotos.length} foto{auditPhotos.length !== 1 ? 's' : ''}</span>
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
                  onChange={handleAuditPhotoSelect}
                />
                <button
                  className="w-full border-2 border-dashed rounded-lg p-4 flex flex-col items-center gap-2 hover:border-primary/50 hover:bg-muted/30 transition-colors"
                  onClick={() => photoInputRef.current?.click()}
                >
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs font-medium">Seleccionar fotos</span>
                </button>
                {auditPhotos.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {auditPhotos.map((photo, idx) => (
                      <div key={idx} className="relative group">
                        <img src={photo.preview} alt={`Foto ${idx + 1}`} className="w-full h-20 object-cover rounded-lg border" />
                        <button
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeAuditPhoto(idx)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* NOK incomplete warning */}
            {nokItems.length > 0 && !allNokCompleted && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                <p className="text-xs text-red-700">
                  Debes completar <strong>"Referencia del hallazgo"</strong>, <strong>"Punto a Mejorar"</strong> y <strong>"Responsable de la acción"</strong> en todos los items NOK ({nokItems.filter(r => !(r.hallazgo || '').trim() || !(r.mejora || '').trim() || !(r.responsable || '').trim()).length} pendientes)
                </p>
              </div>
            )}

            {/* Submit button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={!canSubmitFinal || isSubmitting}
                style={canSubmitFinal ? { backgroundColor: sStepData?.color } : undefined}
              >
                {isSubmitting ? 'Enviando...' : `Registrar Auditoría Externa (${scoring.scorePercent}%)`}
              </Button>
            </div>
          </div>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
