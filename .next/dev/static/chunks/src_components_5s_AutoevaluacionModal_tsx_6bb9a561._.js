(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/5s/AutoevaluacionModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AutoevaluacionModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-check-big.js [app-client] (ecmascript) <export default as CheckSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/5s-constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$checklist$2d$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/checklist-templates.ts [app-client] (ecmascript)");
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
;
function AutoevaluacionModal({ open, onClose, sStep, miniStep }) {
    _s();
    const { fetchProgress, currentUser, adminFreeNavigation, currentProject, currentZone, canPerform, canView, hasPermission } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use5SStore"])();
    const sStepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S_STEPS"].find((s)=>s.id === sStep);
    const canSkipSteps = hasPermission('skip_steps');
    const canPerformStep = canPerform(sStep, miniStep);
    const canViewStep = canView(sStep, miniStep);
    // Permission-driven: read-only if no execute perm OR if candado closed for skip_steps users
    const isReadOnly = !canPerformStep || canSkipSteps && !adminFreeNavigation;
    const canPerformAutoeval = canPerformStep;
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [expandedSections, setExpandedSections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [observaciones, setObservaciones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCompleted, setIsCompleted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [finalScore, setFinalScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [notaMinima, setNotaMinima] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(70);
    const [autoevalPhotos, setAutoevalPhotos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isUploadingPhotos, setIsUploadingPhotos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const photoInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Date/Time for scheduling and recording the evaluation
    const [fechaAutoevaluacion, setFechaAutoevaluacion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [horaAutoevaluacion, setHoraAutoevaluacion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [fechaProgramada, setFechaProgramada] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [horaProgramada, setHoraProgramada] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Load template from API (uses board config if zone has one)
    const { sections, isLoading: isLoadingTemplate, notaMinima: templateNotaMinima } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$checklist$2d$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChecklistTemplate"])('autoevaluacion', sStep, open, currentZone?.boardConfigId);
    // Apply template notaMinima when loaded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutoevaluacionModal.useEffect": ()=>{
            if (templateNotaMinima !== null) setNotaMinima(templateNotaMinima);
        }
    }["AutoevaluacionModal.useEffect"], [
        templateNotaMinima
    ]);
    // Fetch dynamic threshold (overrides template if present)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutoevaluacionModal.useEffect": ()=>{
            if (open && currentProject?.id) {
                const fetchThreshold = {
                    "AutoevaluacionModal.useEffect.fetchThreshold": async ()=>{
                        try {
                            const params = new URLSearchParams({
                                projectId: currentProject.id
                            });
                            if (currentZone?.id) params.set('zoneId', currentZone.id);
                            const res = await fetch(`/api/audit-targets?${params}`);
                            const json = await res.json();
                            if (json.success && json.data) {
                                const zoneTarget = json.data.find({
                                    "AutoevaluacionModal.useEffect.fetchThreshold.zoneTarget": (t)=>t.sStep === sStep && t.miniStep === 4 && t.zoneId === currentZone?.id
                                }["AutoevaluacionModal.useEffect.fetchThreshold.zoneTarget"]);
                                const projectTarget = json.data.find({
                                    "AutoevaluacionModal.useEffect.fetchThreshold.projectTarget": (t)=>t.sStep === sStep && t.miniStep === 4 && t.zoneId === null
                                }["AutoevaluacionModal.useEffect.fetchThreshold.projectTarget"]);
                                const target = zoneTarget || projectTarget;
                                if (target?.notaMinima) setNotaMinima(target.notaMinima);
                            }
                        } catch (e) {
                            console.error('Error fetching threshold:', e);
                        }
                    }
                }["AutoevaluacionModal.useEffect.fetchThreshold"];
                fetchThreshold();
            }
        }
    }["AutoevaluacionModal.useEffect"], [
        open,
        sStep,
        currentProject?.id,
        currentZone?.id
    ]);
    // Initialize expanded sections
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutoevaluacionModal.useEffect": ()=>{
            if (open && sections.length > 0) {
                const expanded = {};
                sections.forEach({
                    "AutoevaluacionModal.useEffect": (s)=>{
                        expanded[s.id] = true;
                    }
                }["AutoevaluacionModal.useEffect"]);
                setExpandedSections(expanded);
                setResults({});
                setObservaciones('');
                setIsCompleted(false);
                setFinalScore(0);
                setAutoevalPhotos([]);
                // Auto-fill current date/time for the evaluation
                const now = new Date();
                setFechaAutoevaluacion(now.toISOString().split('T')[0]);
                setHoraAutoevaluacion(now.toTimeString().slice(0, 5));
                // Load scheduled date if available
                loadScheduledDate();
            }
        }
    }["AutoevaluacionModal.useEffect"], [
        open,
        sStep,
        sections
    ]);
    // Load scheduled date/time for this autoevaluación
    const loadScheduledDate = async ()=>{
        if (!currentProject?.id || !currentZone?.id) return;
        try {
            const res = await fetch(`/api/evaluation-schedule?sStep=${sStep}&miniStep=4&projectId=${currentProject.id}&zoneId=${currentZone.id}`);
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
    const handleSaveSchedule = async ()=>{
        if (!currentProject?.id || !currentZone?.id) return;
        try {
            await fetch('/api/evaluation-schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sStep,
                    miniStep: 4,
                    projectId: currentProject.id,
                    zoneId: currentZone.id,
                    fechaProgramada,
                    horaProgramada
                })
            });
            toast.success('Fecha programada guardada');
        } catch (e) {
            console.error('Error saving schedule:', e);
            toast.error('Error al guardar la fecha programada');
        }
    };
    const totalItems = sections.reduce((sum, s)=>sum + s.items.length, 0) || 26;
    const scoring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AutoevaluacionModal.useMemo[scoring]": ()=>{
            const allResults = Object.values(results);
            const okCount = allResults.filter({
                "AutoevaluacionModal.useMemo[scoring]": (r)=>r.status === 'ok'
            }["AutoevaluacionModal.useMemo[scoring]"]).length;
            const nokCount = allResults.filter({
                "AutoevaluacionModal.useMemo[scoring]": (r)=>r.status === 'nok'
            }["AutoevaluacionModal.useMemo[scoring]"]).length;
            const answeredCount = okCount + nokCount;
            const scorePercent = totalItems > 0 ? Math.min(Math.round(okCount / totalItems * 100), 100) : 0;
            return {
                okCount,
                nokCount,
                answeredCount,
                scorePercent
            };
        }
    }["AutoevaluacionModal.useMemo[scoring]"], [
        results,
        totalItems
    ]);
    // Check that all NOK items have hallazgo and mejora filled
    const nokItems = Object.values(results).filter((r)=>r.status === 'nok');
    const allNokCompleted = nokItems.length === 0 || nokItems.every((r)=>(r.hallazgo || '').trim() !== '' && (r.mejora || '').trim() !== '');
    const passed = scoring.scorePercent >= notaMinima;
    const canSubmit = canPerformAutoeval && scoring.answeredCount > 0 && allNokCompleted;
    const handlePhotoSelect = async (e)=>{
        const files = e.target.files;
        if (!files) return;
        for (const file of Array.from(files)){
            const preview = URL.createObjectURL(file);
            setAutoevalPhotos((prev)=>[
                    ...prev,
                    {
                        file,
                        preview
                    }
                ]);
        }
        // Reset input
        if (photoInputRef.current) photoInputRef.current.value = '';
    };
    const removeAutoevalPhoto = (index)=>{
        setAutoevalPhotos((prev)=>{
            const photo = prev[index];
            if (photo.preview) URL.revokeObjectURL(photo.preview);
            return prev.filter((_, i)=>i !== index);
        });
    };
    const toggleSection = (sectionId)=>{
        setExpandedSections((prev)=>({
                ...prev,
                [sectionId]: !prev[sectionId]
            }));
    };
    const setItemStatus = (itemId, status)=>{
        setResults((prev)=>({
                ...prev,
                [itemId]: {
                    ...prev[itemId],
                    itemId,
                    status
                }
            }));
    };
    const setItemField = (itemId, field, value)=>{
        setResults((prev)=>({
                ...prev,
                [itemId]: {
                    ...prev[itemId],
                    itemId,
                    [field]: value
                }
            }));
    };
    const handleSubmit = async ()=>{
        if (!canSubmit) return;
        if (!canPerformAutoeval) return; // Only responsable/admin for S4, or any employee for S1/S2/S3/S5
        setIsSubmitting(true);
        try {
            // Only mark as completed if score meets notaMinima threshold
            // If not passed, still save results but step stays available for retry
            const res = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=${miniStep}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: passed,
                    score: scoring.scorePercent,
                    notes: JSON.stringify({
                        type: 'autoevaluacion',
                        passed,
                        notaMinima,
                        results: Object.values(results),
                        observaciones,
                        fechaAutoevaluacion,
                        horaAutoevaluacion,
                        fechaProgramada: fechaProgramada || null,
                        horaProgramada: horaProgramada || null
                    }),
                    projectId: currentProject?.id,
                    zoneId: currentZone?.id || null
                })
            });
            const json = await res.json();
            if (json.success) {
                setIsCompleted(true);
                setFinalScore(scoring.scorePercent);
                await fetchProgress();
                // ─── Create EmployeeProgress record for individual step 4 (autoevaluación) ───
                // Step 4 is individual for S1/S2/S3/S5 (done by employees) and for S4 (done by responsable)
                // We need to track individual completion so the gating system unlocks step 5
                if (passed && currentUser?.id && currentProject?.id && currentZone?.id) {
                    try {
                        await fetch('/api/employee-progress', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                sStep,
                                miniStep: 4,
                                completed: true,
                                score: scoring.scorePercent,
                                projectId: currentProject.id,
                                zoneId: currentZone.id,
                                userId: currentUser.id
                            })
                        });
                        // Also refresh employee progress so step 5 unlocks immediately
                        const { fetchEmployeeProgress } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use5SStore"].getState();
                        await fetchEmployeeProgress(currentProject.id, currentZone.id);
                    } catch (empErr) {
                        console.error('Error creating employee progress for autoeval:', empErr);
                    }
                }
                // ─── Upload photos to library with traceability ───
                if (autoevalPhotos.length > 0) {
                    setIsUploadingPhotos(true);
                    for(let idx = 0; idx < autoevalPhotos.length; idx++){
                        const photo = autoevalPhotos[idx];
                        try {
                            // Step 1: Upload the file to get a server URL
                            const formData = new FormData();
                            formData.append('file', photo.file);
                            formData.append('filename', `S${sStep}_autoeval_${currentZone?.name || 'zona'}_${idx + 1}_${Date.now()}.jpg`);
                            const uploadRes = await fetch('/api/upload', {
                                method: 'POST',
                                body: formData
                            });
                            const uploadData = await uploadRes.json();
                            if (uploadData.success && uploadData.url) {
                                // Step 2: Save to photo library with full traceability
                                await fetch('/api/photo-library', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        sStep,
                                        miniStep: 4,
                                        title: `Autoeval S${sStep} - Foto ${idx + 1}`,
                                        description: `${sStepData?.japaneseName || 'S' + sStep} - ${currentZone?.name || 'Zona'} - Paso 4 Autoevaluación - Subida por ${currentUser?.name || 'Usuario'}`,
                                        photoUrl: uploadData.url,
                                        photoType: 'hallazgo',
                                        category: `paso4_s${sStep}`,
                                        tags: JSON.stringify([
                                            `S${sStep}`,
                                            sStepData?.japaneseName || '',
                                            currentZone?.name || '',
                                            'paso4',
                                            'autoevaluacion',
                                            'hallazgo'
                                        ]),
                                        projectId: currentProject?.id,
                                        zoneId: currentZone?.id || null,
                                        uploadedBy: currentUser?.id || null
                                    })
                                });
                            }
                        } catch (photoErr) {
                            console.error('Error uploading autoeval photo:', photoErr);
                        }
                    }
                    setIsUploadingPhotos(false);
                }
                // ─── Create Action Items for NOK (disfunciones) ───
                const nokResults = Object.values(results).filter((r)=>r.status === 'nok');
                for (const nok of nokResults){
                    if (!nok.hallazgo && !nok.mejora) continue; // Skip items without description
                    try {
                        await fetch('/api/actions', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                sStep,
                                miniStep: 4,
                                itemId: nok.itemId,
                                itemDescription: `Disfunción detectada en autoevaluación: ${nok.itemId}`,
                                hallazgo: nok.hallazgo || nok.itemId,
                                mejora: nok.mejora || '',
                                responsable: null,
                                prioridad: 'media',
                                estado: 'abierta',
                                source: 'autoevaluacion',
                                auditor: null,
                                projectId: currentProject?.id,
                                zoneId: currentZone?.id || null
                            })
                        });
                    } catch (actionError) {
                        console.error('Error creating action item from autoevaluación:', actionError);
                    }
                }
                // ─── Notify responsables of NOK disfunciones ───
                if (nokResults.length > 0 && currentProject?.id && currentZone?.id) {
                    try {
                        const membersRes = await fetch(`/api/projects/${currentProject.id}/members`);
                        const membersData = await membersRes.json();
                        const allMembers = membersData?.members || [];
                        const sStepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S_STEPS"].find((s)=>s.id === sStep);
                        const disfuncionMessage = `Se han detectado ${nokResults.length} disfunción(es) en la autoevaluación de S${sStep} (${sStepData?.japaneseName || ''}) en la zona "${currentZone.name}". Revisa el Plan de Acción.`;
                        // Notify zone responsable
                        const responsableIds = new Set();
                        if (currentZone.responsableId) responsableIds.add(currentZone.responsableId);
                        const responsables = allMembers.filter((m)=>m.role === 'responsable');
                        for (const resp of responsables)responsableIds.add(resp.userId);
                        for (const respId of responsableIds){
                            await fetch('/api/notifications', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    userId: respId,
                                    type: 'disfuncion',
                                    title: `Disfunciones detectadas: S${sStep} — ${sStepData?.japaneseName || ''}`,
                                    message: disfuncionMessage,
                                    sStep,
                                    zoneId: currentZone.id,
                                    projectId: currentProject.id
                                })
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
                        for(let ms = 1; ms <= 4; ms++){
                            const zoneStep = allProgress.find((p)=>p.sStep === sStep && p.miniStep === ms && (p.zoneId === currentZone.id || p.zoneId === null) && p.completed);
                            if (zoneStep) continue; // Zone-level completed
                            // Also check employee progress for individual steps
                            const empStep = allEmpProgress.some((ep)=>ep.sStep === sStep && ep.miniStep === ms && ep.zoneId === currentZone.id && ep.completed);
                            if (empStep) continue; // Some employee completed this step
                            allStepsCompleted = false;
                            break;
                        }
                        if (allStepsCompleted) {
                            // Find auditor and responsable users for this project and notify them
                            const membersRes = await fetch(`/api/projects/${currentProject.id}/members`);
                            const membersData = await membersRes.json();
                            const allMembers = membersData?.members || [];
                            const sStepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S_STEPS"].find((s)=>s.id === sStep);
                            const notifMessage = `Los pasos 1-4 de S${sStep} (${sStepData?.japaneseName || ''}) en la zona "${currentZone.name}" han sido completados. La auditoría (Paso 5) está lista para realizarse.`;
                            // Notify auditors
                            const auditors = allMembers.filter((m)=>m.role === 'auditor');
                            for (const auditor of auditors){
                                await fetch('/api/notifications', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        userId: auditor.userId,
                                        type: 'audit_ready',
                                        title: `Auditoría lista: S${sStep} — ${sStepData?.japaneseName || ''}`,
                                        message: notifMessage,
                                        sStep,
                                        zoneId: currentZone.id,
                                        projectId: currentProject.id
                                    })
                                });
                            }
                            // Notify responsable of the zone (from zone.responsableId OR from project members)
                            const responsableIds = new Set();
                            if (currentZone.responsableId) responsableIds.add(currentZone.responsableId);
                            const responsables = allMembers.filter((m)=>m.role === 'responsable');
                            for (const resp of responsables)responsableIds.add(resp.userId);
                            for (const respId of responsableIds){
                                await fetch('/api/notifications', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        userId: respId,
                                        type: 'audit_ready',
                                        title: `Auditoría lista: S${sStep} — ${sStepData?.japaneseName || ''}`,
                                        message: notifMessage,
                                        sStep,
                                        zoneId: currentZone.id,
                                        projectId: currentProject.id
                                    })
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
        } finally{
            setIsSubmitting(false);
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
                                className: "h-5 w-5",
                                style: {
                                    color: sStepData?.color
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 495,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Autoevaluación Interna"
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 496,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                style: {
                                    borderColor: sStepData?.color,
                                    color: sStepData?.color
                                },
                                children: [
                                    sStepData?.japaneseName,
                                    " — ",
                                    sStepData?.spanishName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 497,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsFullscreen(!isFullscreen),
                                className: "ml-auto p-1 rounded hover:bg-muted transition-colors",
                                title: isFullscreen ? "Reducir ventana" : "Pantalla completa",
                                children: isFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                    className: "h-4 w-4 text-muted-foreground"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                    lineNumber: 505,
                                    columnNumber: 31
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                    className: "h-4 w-4 text-muted-foreground"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                    lineNumber: 505,
                                    columnNumber: 89
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 500,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                        lineNumber: 494,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                    lineNumber: 493,
                    columnNumber: 9
                }, this),
                canSkipSteps && !isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 p-2 mx-6 flex-shrink-0 bg-amber-50 border border-amber-200 rounded-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-amber-700 font-medium",
                            children: "Modo Admin:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                            lineNumber: 512,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            className: "text-xs border-amber-300 text-amber-700 hover:bg-amber-100",
                            onClick: handleAdminSkip,
                            children: "Completar paso sin autoevaluación"
                        }, void 0, false, {
                            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                            lineNumber: 513,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                    lineNumber: 511,
                    columnNumber: 11
                }, this),
                isReadOnly && !isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 p-2 mx-6 flex-shrink-0 bg-blue-50 border border-blue-200 rounded-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-blue-700 font-medium",
                        children: [
                            "Solo lectura: ",
                            canSkipSteps ? 'Activa el candado para poder realizar pasos.' : 'Puedes ver pero no modificar.'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                        lineNumber: 526,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                    lineNumber: 525,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-6 pb-6 min-h-0",
                    children: isLoadingTemplate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center py-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                            lineNumber: 533,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                        lineNumber: 532,
                        columnNumber: 11
                    }, this) : sections.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                className: "h-12 w-12 text-amber-500 mx-auto mb-3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 537,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold mb-2",
                                children: "No hay checklist configurado"
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 538,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground max-w-md mx-auto",
                                children: [
                                    "No se encontró una plantilla de autoevaluación para S",
                                    sStep,
                                    ". Crea una plantilla en ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Administración → Plantillas → Auditoría Interna"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                        lineNumber: 541,
                                        columnNumber: 37
                                    }, this),
                                    'o pulsa el botón "Crear plantillas por defecto".'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 539,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                        lineNumber: 536,
                        columnNumber: 11
                    }, this) : isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8",
                        children: [
                            passed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        className: "h-16 w-16 text-green-500 mx-auto mb-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                        lineNumber: 549,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold mb-2 text-green-700",
                                        children: "¡Autoevaluación Aprobada!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                        lineNumber: 550,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                        className: "h-16 w-16 text-red-500 mx-auto mb-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                        lineNumber: 554,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold mb-2 text-red-700",
                                        children: "Autoevaluación No Aprobada"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                        lineNumber: 555,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg mb-1",
                                children: [
                                    "Puntuación: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            finalScore,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                        lineNumber: 558,
                                        columnNumber: 53
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 558,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground",
                                children: [
                                    scoring.okCount,
                                    " OK / ",
                                    scoring.nokCount,
                                    " NOK de ",
                                    totalItems,
                                    " puntos de verificación"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 559,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground mt-1",
                                children: [
                                    "Mínimo requerido: ",
                                    notaMinima,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 562,
                                columnNumber: 13
                            }, this),
                            !passed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-amber-600 mt-3",
                                children: [
                                    "Debes obtener al menos ",
                                    notaMinima,
                                    "% para desbloquear el Paso 5 (Auditoría). Corrige las disfunciones y vuelve a realizar la autoevaluación."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 566,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                        lineNumber: 546,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 rounded-lg border-l-4",
                                style: {
                                    borderColor: sStepData?.color,
                                    backgroundColor: `${sStepData?.color}08`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium",
                                        style: {
                                            color: sStepData?.color
                                        },
                                        children: [
                                            "Autoevaluación Interna — ",
                                            sStepData?.japaneseName
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                        lineNumber: 576,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground mt-1",
                                        children: "Evalúa cada punto de verificación. Marca OK si cumple, NOK si hay desviación. Los NOKs generan hallazgos y puntos de mejora como plan de acción."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                        lineNumber: 579,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 575,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-blue-50 border border-blue-200 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-semibold text-blue-700 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                        lineNumber: 589,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Programar Autoevaluación"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                lineNumber: 588,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "fechaProgramada",
                                                                className: "text-[10px] text-blue-600",
                                                                children: "Fecha programada"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                lineNumber: 594,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                id: "fechaProgramada",
                                                                type: "date",
                                                                value: fechaProgramada,
                                                                onChange: (e)=>setFechaProgramada(e.target.value),
                                                                className: "h-7 text-xs"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                lineNumber: 595,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                        lineNumber: 593,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "horaProgramada",
                                                                className: "text-[10px] text-blue-600",
                                                                children: "Hora programada"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                lineNumber: 600,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                id: "horaProgramada",
                                                                type: "time",
                                                                value: horaProgramada,
                                                                onChange: (e)=>setHoraProgramada(e.target.value),
                                                                className: "h-7 text-xs"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                lineNumber: 601,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                        lineNumber: 599,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                lineNumber: 592,
                                                columnNumber: 17
                                            }, this),
                                            fechaProgramada && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                variant: "outline",
                                                className: "h-6 text-[10px] border-blue-300 text-blue-700",
                                                onClick: handleSaveSchedule,
                                                children: "Guardar programación"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                lineNumber: 607,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                        lineNumber: 587,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-semibold text-blue-700 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                        lineNumber: 615,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Registro de Autoevaluación"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                lineNumber: 614,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "fechaAutoeval",
                                                                className: "text-[10px] text-blue-600",
                                                                children: "Fecha realización"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                lineNumber: 620,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                id: "fechaAutoeval",
                                                                type: "date",
                                                                value: fechaAutoevaluacion,
                                                                onChange: (e)=>setFechaAutoevaluacion(e.target.value),
                                                                className: "h-7 text-xs"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                lineNumber: 621,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                        lineNumber: 619,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "horaAutoeval",
                                                                className: "text-[10px] text-blue-600",
                                                                children: "Hora realización"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                lineNumber: 626,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                id: "horaAutoeval",
                                                                type: "time",
                                                                value: horaAutoevaluacion,
                                                                onChange: (e)=>setHoraAutoevaluacion(e.target.value),
                                                                className: "h-7 text-xs"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                lineNumber: 627,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                        lineNumber: 625,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                lineNumber: 618,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                        lineNumber: 613,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 586,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between p-3 bg-muted rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium",
                                                children: "Puntuación"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                lineNumber: 638,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground",
                                                children: [
                                                    scoring.okCount,
                                                    " OK / ",
                                                    scoring.nokCount,
                                                    " NOK de ",
                                                    totalItems,
                                                    " puntos"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                lineNumber: 639,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                        lineNumber: 637,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                className: "bg-green-100 text-green-800",
                                                children: [
                                                    "OK: ",
                                                    scoring.okCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                lineNumber: 644,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                className: "bg-red-100 text-red-800",
                                                children: [
                                                    "NOK: ",
                                                    scoring.nokCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                lineNumber: 645,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: scoring.scorePercent >= notaMinima ? 'default' : 'secondary',
                                                children: [
                                                    scoring.scorePercent,
                                                    "% (mín. ",
                                                    notaMinima,
                                                    "%)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                lineNumber: 646,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                        lineNumber: 643,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 636,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "w-full p-3 flex items-center gap-2 hover:bg-muted/50 transition-colors text-left",
                                                onClick: ()=>toggleSection(section.id),
                                                children: [
                                                    expandedSections[section.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        className: "h-4 w-4 text-muted-foreground"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                        lineNumber: 662,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                        className: "h-4 w-4 text-muted-foreground"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                        lineNumber: 664,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        variant: "outline",
                                                        className: "text-xs font-mono",
                                                        children: section.id
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                        lineNumber: 666,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-sm",
                                                        children: section.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                        lineNumber: 667,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-auto text-xs text-muted-foreground",
                                                        children: [
                                                            section.items.length,
                                                            " puntos"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                        lineNumber: 668,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                lineNumber: 657,
                                                columnNumber: 19
                                            }, this),
                                            expandedSections[section.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                className: "px-4 pb-4 pt-0 space-y-3",
                                                children: section.items.map((item)=>{
                                                    const result = results[item.id];
                                                    const isNok = result?.status === 'nok';
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border rounded-lg p-3 space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-mono text-muted-foreground shrink-0 mt-0.5",
                                                                        children: item.id
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                        lineNumber: 684,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm flex-1",
                                                                        children: item.description
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                        lineNumber: 687,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex gap-1 shrink-0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: `px-2.5 py-1 rounded text-xs font-medium transition-colors ${result?.status === 'ok' ? 'bg-green-500 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100'}`,
                                                                                onClick: ()=>setItemStatus(item.id, 'ok'),
                                                                                children: "OK"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                                lineNumber: 689,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: `px-2.5 py-1 rounded text-xs font-medium transition-colors ${result?.status === 'nok' ? 'bg-red-500 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'}`,
                                                                                onClick: ()=>setItemStatus(item.id, 'nok'),
                                                                                children: "NOK"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                                lineNumber: 699,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: `px-2.5 py-1 rounded text-xs font-medium transition-colors ${result?.status === 'na' ? 'bg-gray-500 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`,
                                                                                onClick: ()=>setItemStatus(item.id, 'na'),
                                                                                children: "N/A"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                                lineNumber: 709,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                        lineNumber: 688,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                lineNumber: 683,
                                                                columnNumber: 29
                                                            }, this),
                                                            item.hasOther && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                placeholder: "Especificar...",
                                                                value: result?.otherText || '',
                                                                onChange: (e)=>setItemField(item.id, 'otherText', e.target.value),
                                                                className: "text-sm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                lineNumber: 724,
                                                                columnNumber: 31
                                                            }, this),
                                                            isNok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2 pl-6 border-l-2 border-red-200",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-xs font-medium text-red-700",
                                                                                children: "Referencia del hallazgo (desviación) *"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                                lineNumber: 736,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                                placeholder: "Obligatorio: describa la desviación encontrada...",
                                                                                value: result?.hallazgo || '',
                                                                                onChange: (e)=>setItemField(item.id, 'hallazgo', e.target.value),
                                                                                className: `text-sm mt-1 ${!(result?.hallazgo || '').trim() ? 'border-red-400 focus:border-red-500' : ''}`,
                                                                                rows: 2
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                                lineNumber: 737,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            !(result?.hallazgo || '').trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-[10px] text-red-500 mt-0.5",
                                                                                children: "Campo obligatorio"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                                lineNumber: 745,
                                                                                columnNumber: 37
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                        lineNumber: 735,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-xs font-medium text-amber-700",
                                                                                children: "Punto a Mejorar (sugerencia) *"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                                lineNumber: 749,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                                placeholder: "Obligatorio: sugiera una mejora...",
                                                                                value: result?.mejora || '',
                                                                                onChange: (e)=>setItemField(item.id, 'mejora', e.target.value),
                                                                                className: `text-sm mt-1 ${!(result?.mejora || '').trim() ? 'border-amber-400 focus:border-amber-500' : ''}`,
                                                                                rows: 2
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                                lineNumber: 750,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            !(result?.mejora || '').trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-[10px] text-amber-500 mt-0.5",
                                                                                children: "Campo obligatorio"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                                lineNumber: 758,
                                                                                columnNumber: 37
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                        lineNumber: 748,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: "outline",
                                                                            size: "sm",
                                                                            className: "text-xs",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                                                    className: "h-3 w-3 mr-1"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                                    lineNumber: 763,
                                                                                    columnNumber: 37
                                                                                }, this),
                                                                                " Añadir foto (biblioteca paso 2)"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                            lineNumber: 762,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                        lineNumber: 761,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                lineNumber: 734,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, item.id, true, {
                                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                        lineNumber: 681,
                                                        columnNumber: 27
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                lineNumber: 675,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, section.id, true, {
                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                        lineNumber: 655,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 653,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm font-medium",
                                            children: "Observaciones generales"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                            lineNumber: 780,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                            placeholder: "Observaciones adicionales de la autoevaluación...",
                                            value: observaciones,
                                            onChange: (e)=>setObservaciones(e.target.value),
                                            className: "mt-2",
                                            rows: 3
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                            lineNumber: 781,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                    lineNumber: 779,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 778,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "p-4 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                            className: "h-4 w-4 text-muted-foreground"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                            lineNumber: 796,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-sm font-medium",
                                                            children: "Fotos de la autoevaluación"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                            lineNumber: 797,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                    lineNumber: 795,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: [
                                                        autoevalPhotos.length,
                                                        " foto",
                                                        autoevalPhotos.length !== 1 ? 's' : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                    lineNumber: 799,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                            lineNumber: 794,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: "Añade fotos de hallazgos o disfunciones detectadas. Se guardarán en la biblioteca con trazabilidad."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                            lineNumber: 801,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ref: photoInputRef,
                                            type: "file",
                                            accept: "image/*",
                                            multiple: true,
                                            className: "hidden",
                                            onChange: handlePhotoSelect
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                            lineNumber: 804,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "w-full border-2 border-dashed rounded-lg p-4 flex flex-col items-center gap-2 hover:border-primary/50 hover:bg-muted/30 transition-colors",
                                            onClick: ()=>photoInputRef.current?.click(),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                    className: "h-5 w-5 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                    lineNumber: 816,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-medium",
                                                    children: "Seleccionar fotos"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                    lineNumber: 817,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                            lineNumber: 812,
                                            columnNumber: 17
                                        }, this),
                                        autoevalPhotos.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-4 gap-2",
                                            children: autoevalPhotos.map((photo, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: photo.preview,
                                                            alt: `Foto ${idx + 1}`,
                                                            className: "w-full h-20 object-cover rounded-lg border"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                            lineNumber: 823,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                                                            onClick: ()=>removeAutoevalPhoto(idx),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                className: "h-3 w-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                                lineNumber: 828,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                            lineNumber: 824,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                    lineNumber: 822,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                            lineNumber: 820,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                    lineNumber: 793,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 792,
                                columnNumber: 13
                            }, this),
                            nokItems.length > 0 && !allNokCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                        className: "h-4 w-4 text-red-600 shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                        lineNumber: 840,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-700",
                                        children: [
                                            "Debes completar los campos ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: '"Referencia del hallazgo"'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                lineNumber: 842,
                                                columnNumber: 46
                                            }, this),
                                            " y ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: '"Punto a Mejorar"'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                                lineNumber: 842,
                                                columnNumber: 91
                                            }, this),
                                            " en todos los items NOK (",
                                            nokItems.filter((r)=>!(r.hallazgo || '').trim() || !(r.mejora || '').trim()).length,
                                            " pendientes)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                        lineNumber: 841,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 839,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleSubmit,
                                    disabled: !canSubmit || isSubmitting,
                                    style: canSubmit ? {
                                        backgroundColor: passed ? sStepData?.color : '#dc2626'
                                    } : undefined,
                                    children: isSubmitting ? 'Enviando...' : passed ? `Completar Autoevaluación (${scoring.scorePercent}% - Apto)` : `Enviar Autoevaluación (${scoring.scorePercent}% - No Apto, mín. ${notaMinima}%)`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                    lineNumber: 849,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                                lineNumber: 848,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                        lineNumber: 573,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
                    lineNumber: 530,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
            lineNumber: 492,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/5s/AutoevaluacionModal.tsx",
        lineNumber: 491,
        columnNumber: 5
    }, this);
}
_s(AutoevaluacionModal, "HHUvV0tBWZFldr07g6nsCbsYvE4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$checklist$2d$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChecklistTemplate"]
    ];
});
_c = AutoevaluacionModal;
var _c;
__turbopack_context__.k.register(_c, "AutoevaluacionModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_5s_AutoevaluacionModal_tsx_6bb9a561._.js.map