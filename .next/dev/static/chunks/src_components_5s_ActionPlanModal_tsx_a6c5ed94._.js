(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/5s/ActionPlanModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ActionPlanModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list-checks.js [app-client] (ecmascript) <export default as ListChecks>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/5s-constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
const ESTADO_OPTIONS = [
    {
        value: 'abierta',
        label: 'Abierta',
        color: 'bg-red-100 text-red-800'
    },
    {
        value: 'en_proceso',
        label: 'En Proceso',
        color: 'bg-yellow-100 text-yellow-800'
    },
    {
        value: 'resuelta',
        label: 'Resuelta',
        color: 'bg-green-100 text-green-800'
    },
    {
        value: 'cerrada',
        label: 'Cerrada',
        color: 'bg-gray-100 text-gray-600'
    }
];
const ENVIADO_OPTIONS = [
    'Sí',
    'No',
    'Pendiente'
];
// Generate week options (W1-W52)
const WEEK_OPTIONS = Array.from({
    length: 53
}, (_, i)=>`W${i + 1}`);
// Color sections matching the uploaded image
const SECTION_COLORS = {
    demandante: 'bg-amber-50 border-amber-300 text-amber-900',
    accion: 'bg-sky-50 border-sky-300 text-sky-900',
    seguimiento: 'bg-orange-50 border-orange-300 text-orange-900'
};
const HEADER_COLORS = {
    demandante: 'bg-amber-400 text-white',
    accion: 'bg-sky-400 text-white',
    seguimiento: 'bg-orange-400 text-white'
};
function ActionPlanModal({ open, onClose, sStep, miniStep }) {
    _s();
    const { fetchProgress, currentUser, adminFreeNavigation, currentProject, currentZone, canPerform, canView, hasPermission } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use5SStore"])();
    const sStepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S_STEPS"].find((s)=>s.id === sStep);
    const canSkipSteps = hasPermission('skip_steps');
    const canPerformStep = canPerform(sStep, miniStep);
    const canViewStep = canView(sStep, miniStep);
    // Permission-driven: read-only if no execute perm OR if candado closed for skip_steps users
    const isReadOnly = !canPerformStep || canSkipSteps && !adminFreeNavigation;
    const [actions, setActions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isCompleted, setIsCompleted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [zones, setZones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [expandedRow, setExpandedRow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const loadZones = async ()=>{
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
    const loadActions = async ()=>{
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
                setActions(json.data.map((a)=>({
                        id: a.id,
                        numeroEntrada: a.numeroEntrada || 0,
                        fechaEntrada: a.fechaEntrada ? new Date(a.fechaEntrada).toISOString().split('T')[0] : a.createdAt ? new Date(a.createdAt).toISOString().split('T')[0] : '',
                        comunicadoPor: a.comunicadoPor || '',
                        semana: a.semana || '',
                        seccionDemandante: a.seccionDemandante || '',
                        clienteZona: a.clienteZona || a.zone?.name || '',
                        personaDemandada: a.personaDemandada || '',
                        seccionDemandada: a.seccionDemandada || '',
                        hallazgo: a.hallazgo || a.itemDescription || '',
                        impactoObjetivo: a.impactoObjetivo || '',
                        enviado: a.enviado || '',
                        accionCorrectiva: a.accionCorrectiva || a.mejora || '',
                        accionesPreventivas: a.accionesPreventivas || '',
                        semanaPrevista: a.semanaPrevista || '',
                        responsable: a.responsable || '',
                        porcentaje: a.porcentaje || 0,
                        estado: a.estado === 'abierta' ? 'abierta' : a.estado === 'en_proceso' ? 'en_proceso' : a.estado === 'resuelta' || a.estado === 'cerrada' ? 'resuelta' : 'abierta',
                        semanaReal: a.semanaReal || '',
                        // Legacy
                        descripcion: a.itemDescription || a.hallazgo || '',
                        fechaCompromiso: a.fechaCompromiso ? new Date(a.fechaCompromiso).toISOString().split('T')[0] : '',
                        fechaLimite: a.fechaLimite ? new Date(a.fechaLimite).toISOString().split('T')[0] : '',
                        fechaReal: a.fechaReal ? new Date(a.fechaReal).toISOString().split('T')[0] : '',
                        prioridad: a.prioridad || 'media',
                        zoneId: a.zoneId || '',
                        zoneName: a.zone?.name || '',
                        verificadoPor: a.verificadoPor || '',
                        sStep: a.sStep || sStep,
                        miniStep: a.miniStep || 3
                    })));
            }
        } catch (error) {
            console.error('Error loading actions:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Error al cargar las acciones');
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ActionPlanModal.useEffect": ()=>{
            if (open) {
                loadActions();
                loadZones();
            }
        }
    }["ActionPlanModal.useEffect"], [
        open,
        sStep
    ]);
    const getNextNumero = ()=>{
        if (actions.length === 0) return 1;
        return Math.max(...actions.map((a)=>a.numeroEntrada || 0)) + 1;
    };
    const getCurrentWeek = ()=>{
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const diff = now.getTime() - start.getTime();
        const oneWeek = 1000 * 60 * 60 * 24 * 7;
        return `W${Math.ceil(diff / oneWeek + start.getDay() / 7)}`;
    };
    const handleAddAction = async ()=>{
        if (!currentProject?.id) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('No hay proyecto seleccionado.');
            return;
        }
        const nextNumero = getNextNumero();
        const today = new Date().toISOString().split('T')[0];
        const currentWeek = getCurrentWeek();
        try {
            const res = await fetch('/api/actions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
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
                    porcentaje: 0
                })
            });
            const json = await res.json();
            if (json.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Entrada agregada correctamente');
                await loadActions();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Error: ${json.error || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error adding action:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Error de conexión al agregar la entrada');
        }
    };
    const handleUpdateField = async (actionId, field, value)=>{
        // Optimistic update
        setActions((prev)=>prev.map((a)=>a.id === actionId ? {
                    ...a,
                    [field]: value
                } : a));
        try {
            const res = await fetch(`/api/actions?id=${actionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    [field]: value
                })
            });
            const json = await res.json();
            if (!json.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Error al actualizar: ${json.error || 'Error desconocido'}`);
                await loadActions(); // Revert
            }
        } catch (error) {
            console.error('Error updating action:', error);
            await loadActions(); // Revert
        }
    };
    const handleDeleteAction = async (id)=>{
        if (!confirm('¿Eliminar esta entrada?')) return;
        try {
            const res = await fetch(`/api/actions?id=${id}`, {
                method: 'DELETE'
            });
            const json = await res.json();
            if (json.success) {
                setActions((prev)=>prev.filter((a)=>a.id !== id));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Entrada eliminada');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Error al eliminar: ${json.error || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error deleting action:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Error de conexión al eliminar');
        }
    };
    // Count completed actions
    const completedCount = actions.filter((a)=>a.estado === 'resuelta' || a.estado === 'cerrada').length;
    const totalActions = actions.length;
    const canComplete = totalActions >= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACTION_PLAN_MIN_ITEMS"];
    const progressPercent = totalActions > 0 ? Math.round(completedCount / totalActions * 100) : 0;
    const handleComplete = async ()=>{
        if (!canComplete) return;
        try {
            const res = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=${miniStep}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: true,
                    score: progressPercent,
                    projectId: currentProject?.id,
                    zoneId: currentZone?.id || null
                })
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
    const handleAdminSkip = async ()=>{
        try {
            const res = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=${miniStep}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: true,
                    score: 100,
                    notes: 'Completado por administrador (skip)',
                    skipMissingTemplate: true,
                    projectId: currentProject?.id,
                    zoneId: currentZone?.id || null
                })
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
    const getEstadoBadge = (estado)=>{
        const opt = ESTADO_OPTIONS.find((e)=>e.value === estado);
        return opt || ESTADO_OPTIONS[0];
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: ()=>onClose(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            size: isFullscreen ? "fullscreen" : "xl",
            className: "flex flex-col overflow-hidden p-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    className: "px-6 pt-6 pb-2 flex-shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__["ListChecks"], {
                                className: "h-5 w-5",
                                style: {
                                    color: sStepData?.color
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                lineNumber: 339,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Plan de Acción",
                                    miniStep === 0 ? ' — Global' : ` — ${sStepData?.name}`
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                lineNumber: 340,
                                columnNumber: 13
                            }, this),
                            sStepData && miniStep !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                style: {
                                    borderColor: sStepData?.color,
                                    color: sStepData?.color
                                },
                                children: sStepData?.japaneseName
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                lineNumber: 342,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsFullscreen(!isFullscreen),
                                className: "ml-auto p-1 rounded hover:bg-muted transition-colors",
                                title: isFullscreen ? "Reducir ventana" : "Pantalla completa",
                                children: isFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                    className: "h-4 w-4 text-muted-foreground"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                    lineNumber: 351,
                                    columnNumber: 31
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                    className: "h-4 w-4 text-muted-foreground"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                    lineNumber: 351,
                                    columnNumber: 89
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                lineNumber: 346,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                        lineNumber: 338,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                    lineNumber: 337,
                    columnNumber: 9
                }, this),
                canSkipSteps && !isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-6 flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-lg flex-shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-amber-700 font-medium",
                            children: "Modo Admin:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                            lineNumber: 358,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            className: "text-xs border-amber-300 text-amber-700 hover:bg-amber-100",
                            onClick: handleAdminSkip,
                            children: "Completar paso sin plan"
                        }, void 0, false, {
                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                            lineNumber: 359,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                    lineNumber: 357,
                    columnNumber: 11
                }, this),
                isReadOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 p-2 mx-6 flex-shrink-0 bg-blue-50 border border-blue-200 rounded-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-blue-700 font-medium",
                        children: [
                            "Solo lectura: ",
                            canSkipSteps ? 'Activa el candado para poder realizar pasos.' : 'Puedes ver pero no modificar.'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                        lineNumber: 372,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                    lineNumber: 371,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-6 pb-6 min-h-0",
                    children: isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-4xl mb-3",
                                children: "✅"
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                lineNumber: 379,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold mb-2",
                                children: "¡Plan de Acción Completado!"
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                lineNumber: 380,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: [
                                    "Se han definido ",
                                    totalActions,
                                    " acciones, ",
                                    completedCount,
                                    " completadas (",
                                    progressPercent,
                                    "%)."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                lineNumber: 381,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                        lineNumber: 378,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col min-h-0 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between p-2 bg-muted rounded-lg text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: [
                                                    totalActions,
                                                    " entradas"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                lineNumber: 390,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted-foreground",
                                                children: [
                                                    "(",
                                                    completedCount,
                                                    " resueltas — ",
                                                    progressPercent,
                                                    "%)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                lineNumber: 391,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                        lineNumber: 389,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: handleAddAction,
                                            size: "sm",
                                            style: {
                                                backgroundColor: sStepData?.color
                                            },
                                            className: "text-white",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    className: "h-4 w-4 mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                    lineNumber: 400,
                                                    columnNumber: 19
                                                }, this),
                                                " Nueva Entrada"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                            lineNumber: 394,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                        lineNumber: 393,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                lineNumber: 388,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-auto border rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-xs border-collapse min-w-[800px] md:min-w-[1200px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "sticky top-0 z-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            colSpan: 9,
                                                            className: `${HEADER_COLORS.demandante} px-2 py-1.5 text-center text-xs font-bold border border-amber-500`,
                                                            children: "DEMANDA"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 411,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            colSpan: 4,
                                                            className: `${HEADER_COLORS.accion} px-2 py-1.5 text-center text-xs font-bold border border-sky-500`,
                                                            children: "ACCIÓN"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 415,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            colSpan: 5,
                                                            className: `${HEADER_COLORS.seguimiento} px-2 py-1.5 text-center text-xs font-bold border border-orange-500`,
                                                            children: "SEGUIMIENTO"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 419,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "bg-gray-400 text-white px-1 py-1.5 text-center text-xs font-bold border border-gray-500 w-8",
                                                            children: "🗑"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 422,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`,
                                                            children: "Nº"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 428,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`,
                                                            children: "Fecha"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 429,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`,
                                                            children: "Comunicado por"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 430,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`,
                                                            children: "Semana"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 431,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`,
                                                            children: "Sección Demandante"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 432,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`,
                                                            children: "Cliente / Zona"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 433,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`,
                                                            children: "Persona Demandada"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 434,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`,
                                                            children: "Sección Demandada"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 435,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.demandante} px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap`,
                                                            children: "Descripción"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 436,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.accion} px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap`,
                                                            children: "Impacto Objetivo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 438,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.accion} px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap`,
                                                            children: "Enviado"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 439,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.accion} px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap`,
                                                            children: "Acción Correctiva"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 440,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.accion} px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap`,
                                                            children: "Acciones Preventivas"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 441,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.seguimiento} px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap`,
                                                            children: "Semana Prevista"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 443,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.seguimiento} px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap`,
                                                            children: "Persona Responsable"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 444,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.seguimiento} px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap`,
                                                            children: "%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 445,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.seguimiento} px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap`,
                                                            children: "Estado"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 446,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: `${HEADER_COLORS.seguimiento} px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap`,
                                                            children: "Semana Real"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 447,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "bg-gray-300 text-gray-700 px-1 py-1 border border-gray-400 w-8"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 448,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                    lineNumber: 426,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                            lineNumber: 408,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: actions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 19,
                                                    className: "text-center py-12 text-muted-foreground",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__["ListChecks"], {
                                                            className: "h-8 w-8 mx-auto mb-2 opacity-50"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 455,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm",
                                                            children: "No hay entradas en el Plan de Acción"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 456,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs mt-1",
                                                            children: 'Haga clic en "Nueva Entrada" para agregar acciones'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 457,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                    lineNumber: 454,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                lineNumber: 453,
                                                columnNumber: 21
                                            }, this) : actions.map((action)=>{
                                                const isExpanded = expandedRow === action.id;
                                                const estadoBadge = getEstadoBadge(action.estado);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "hover:bg-muted/30 group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200 text-center font-bold`,
                                                            children: action.numeroEntrada || '-'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 468,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "date",
                                                                value: action.fechaEntrada,
                                                                onChange: (e)=>handleUpdateField(action.id, 'fechaEntrada', e.target.value),
                                                                className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 focus:bg-white focus:border focus:border-amber-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 472,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 471,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "text",
                                                                value: action.comunicadoPor,
                                                                onChange: (e)=>handleUpdateField(action.id, 'comunicadoPor', e.target.value),
                                                                placeholder: "Quién comunica",
                                                                className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 focus:bg-white focus:border focus:border-amber-400 w-24"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 480,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 479,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                                value: action.semana || '__none__',
                                                                onValueChange: (val)=>handleUpdateField(action.id, 'semana', val === '__none__' ? '' : val),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                        className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 w-16",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                            placeholder: "Sem"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                            lineNumber: 494,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                        lineNumber: 493,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                        className: "max-h-48",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: "__none__",
                                                                                children: "—"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                                lineNumber: 497,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            WEEK_OPTIONS.map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                    value: w,
                                                                                    children: w
                                                                                }, w, false, {
                                                                                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                                    lineNumber: 499,
                                                                                    columnNumber: 35
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                        lineNumber: 496,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 489,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 488,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "text",
                                                                value: action.seccionDemandante,
                                                                onChange: (e)=>handleUpdateField(action.id, 'seccionDemandante', e.target.value),
                                                                placeholder: "Sección",
                                                                className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 focus:bg-white focus:border focus:border-amber-400 w-24"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 505,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 504,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "text",
                                                                value: action.clienteZona,
                                                                onChange: (e)=>handleUpdateField(action.id, 'clienteZona', e.target.value),
                                                                placeholder: "Zona",
                                                                className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 focus:bg-white focus:border focus:border-amber-400 w-24"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 514,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 513,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "text",
                                                                value: action.personaDemandada,
                                                                onChange: (e)=>handleUpdateField(action.id, 'personaDemandada', e.target.value),
                                                                placeholder: "Persona",
                                                                className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 focus:bg-white focus:border focus:border-amber-400 w-24"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 523,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 522,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "text",
                                                                value: action.seccionDemandada,
                                                                onChange: (e)=>handleUpdateField(action.id, 'seccionDemandada', e.target.value),
                                                                placeholder: "Sección",
                                                                className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 focus:bg-white focus:border focus:border-amber-400 w-24"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 532,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 531,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.demandante} px-1 py-1 border border-amber-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                value: action.hallazgo,
                                                                onChange: (e)=>handleUpdateField(action.id, 'hallazgo', e.target.value),
                                                                placeholder: "Descripción del problema...",
                                                                className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 focus:bg-white focus:border focus:border-amber-400 min-w-[120px] resize-none",
                                                                rows: 1
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 541,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 540,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.accion} px-1 py-1 border border-sky-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "text",
                                                                value: action.impactoObjetivo,
                                                                onChange: (e)=>handleUpdateField(action.id, 'impactoObjetivo', e.target.value),
                                                                placeholder: "Impacto",
                                                                className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 focus:bg-white focus:border focus:border-sky-400 w-24"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 552,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 551,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.accion} px-1 py-1 border border-sky-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                                value: action.enviado || '__none__',
                                                                onValueChange: (val)=>handleUpdateField(action.id, 'enviado', val === '__none__' ? '' : val),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                        className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 w-20",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                            placeholder: "—"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                            lineNumber: 566,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                        lineNumber: 565,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: "__none__",
                                                                                children: "—"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                                lineNumber: 569,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            ENVIADO_OPTIONS.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                    value: opt,
                                                                                    children: opt
                                                                                }, opt, false, {
                                                                                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                                    lineNumber: 571,
                                                                                    columnNumber: 35
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                        lineNumber: 568,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 561,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 560,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.accion} px-1 py-1 border border-sky-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                value: action.accionCorrectiva,
                                                                onChange: (e)=>handleUpdateField(action.id, 'accionCorrectiva', e.target.value),
                                                                placeholder: "Acción correctiva...",
                                                                className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 focus:bg-white focus:border focus:border-sky-400 min-w-[120px] resize-none",
                                                                rows: 1
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 577,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 576,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.accion} px-1 py-1 border border-sky-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                value: action.accionesPreventivas,
                                                                onChange: (e)=>handleUpdateField(action.id, 'accionesPreventivas', e.target.value),
                                                                placeholder: "Acciones preventivas...",
                                                                className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 focus:bg-white focus:border focus:border-sky-400 min-w-[120px] resize-none",
                                                                rows: 1
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 586,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 585,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.seguimiento} px-1 py-1 border border-orange-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                                value: action.semanaPrevista || '__none__',
                                                                onValueChange: (val)=>handleUpdateField(action.id, 'semanaPrevista', val === '__none__' ? '' : val),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                        className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 w-16",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                            placeholder: "Sem"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                            lineNumber: 602,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                        lineNumber: 601,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                        className: "max-h-48",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: "__none__",
                                                                                children: "—"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                                lineNumber: 605,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            WEEK_OPTIONS.map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                    value: w,
                                                                                    children: w
                                                                                }, w, false, {
                                                                                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                                    lineNumber: 607,
                                                                                    columnNumber: 35
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                        lineNumber: 604,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 597,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 596,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.seguimiento} px-1 py-1 border border-orange-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "text",
                                                                value: action.responsable,
                                                                onChange: (e)=>handleUpdateField(action.id, 'responsable', e.target.value),
                                                                placeholder: "Responsable",
                                                                className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 focus:bg-white focus:border focus:border-orange-400 w-24"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 613,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 612,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.seguimiento} px-1 py-1 border border-orange-200 text-center`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "number",
                                                                min: 0,
                                                                max: 100,
                                                                value: action.porcentaje,
                                                                onChange: (e)=>handleUpdateField(action.id, 'porcentaje', parseFloat(e.target.value) || 0),
                                                                className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 focus:bg-white focus:border focus:border-orange-400 w-12 text-center"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 622,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 621,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.seguimiento} px-1 py-1 border border-orange-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                                value: action.estado,
                                                                onValueChange: (val)=>handleUpdateField(action.id, 'estado', val),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                        className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 w-20",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                            lineNumber: 637,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                        lineNumber: 636,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                        children: ESTADO_OPTIONS.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: opt.value,
                                                                                children: opt.label
                                                                            }, opt.value, false, {
                                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                                lineNumber: 641,
                                                                                columnNumber: 35
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                        lineNumber: 639,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 632,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 631,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `${SECTION_COLORS.seguimiento} px-1 py-1 border border-orange-200`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                                value: action.semanaReal || '__none__',
                                                                onValueChange: (val)=>handleUpdateField(action.id, 'semanaReal', val === '__none__' ? '' : val),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                        className: "h-6 text-[10px] p-0 px-1 bg-transparent border-0 w-16",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                            placeholder: "Sem"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                            lineNumber: 652,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                        lineNumber: 651,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                        className: "max-h-48",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: "__none__",
                                                                                children: "—"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                                lineNumber: 655,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            WEEK_OPTIONS.map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                    value: w,
                                                                                    children: w
                                                                                }, w, false, {
                                                                                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                                    lineNumber: 657,
                                                                                    columnNumber: 35
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                        lineNumber: 654,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 647,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 646,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-1 py-1 border border-gray-200 text-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleDeleteAction(action.id),
                                                                className: "text-red-400 hover:text-red-600 transition-colors",
                                                                title: "Eliminar entrada",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    className: "h-3.5 w-3.5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                    lineNumber: 668,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                                lineNumber: 663,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                            lineNumber: 662,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, action.id, true, {
                                                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                                    lineNumber: 466,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                            lineNumber: 451,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                    lineNumber: 407,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                lineNumber: 406,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-muted-foreground",
                                        children: [
                                            "Mín. ",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACTION_PLAN_MIN_ITEMS"],
                                            " entradas para completar el paso"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                        lineNumber: 681,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: handleComplete,
                                        disabled: !canComplete || isReadOnly,
                                        style: canComplete ? {
                                            backgroundColor: sStepData?.color
                                        } : undefined,
                                        children: [
                                            "Completar Plan de Acción (",
                                            totalActions,
                                            "/",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACTION_PLAN_MIN_ITEMS"],
                                            " mín.)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                        lineNumber: 684,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                                lineNumber: 680,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                        lineNumber: 386,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
                    lineNumber: 376,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
            lineNumber: 336,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/5s/ActionPlanModal.tsx",
        lineNumber: 335,
        columnNumber: 5
    }, this);
}
_s(ActionPlanModal, "LQJ+MVe3XwXCJQ4YBW8b/Wj8+io=");
_c = ActionPlanModal;
var _c;
__turbopack_context__.k.register(_c, "ActionPlanModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_5s_ActionPlanModal_tsx_a6c5ed94._.js.map