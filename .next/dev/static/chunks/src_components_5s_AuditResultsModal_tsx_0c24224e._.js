(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/5s/AuditResultsModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuditResultsModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
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
function AuditResultsModal({ open, onClose }) {
    _s();
    const { currentProject, currentZone, currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use5SStore"])();
    const [audits, setAudits] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [actions, setActions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('resumen');
    const [filterSStep, setFilterSStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [filterZone, setFilterZone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [filterEstado, setFilterEstado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [expandedAudit, setExpandedAudit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [zones, setZones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuditResultsModal.useEffect": ()=>{
            if (open) {
                loadData();
                loadZones();
            }
        }
    }["AuditResultsModal.useEffect"], [
        open,
        currentProject
    ]);
    const loadZones = async ()=>{
        if (!currentProject) return;
        try {
            const res = await fetch(`/api/projects/${currentProject.id}/zones`);
            if (res.ok) {
                const json = await res.json();
                setZones(json.zones || json.data || []);
            }
        } catch (e) {
            console.error('Error loading zones:', e);
        }
    };
    const loadData = async ()=>{
        setIsLoading(true);
        try {
            const projectIdParam = currentProject?.id ? `?projectId=${currentProject.id}` : '';
            // Load all audits for the project
            const auditRes = await fetch(`/api/audit${projectIdParam ? projectIdParam + '&sStep=0'.replace('sStep=0&', '') : '?sStep=0'}`);
            // Actually load audits for all S steps
            const [s1Audits, s2Audits, s3Audits, s4Audits, s5Audits, quarterlyAudits] = await Promise.all([
                fetch(`/api/audit?sStep=1${currentProject?.id ? `&projectId=${currentProject.id}` : ''}`).then((r)=>r.json()),
                fetch(`/api/audit?sStep=2${currentProject?.id ? `&projectId=${currentProject.id}` : ''}`).then((r)=>r.json()),
                fetch(`/api/audit?sStep=3${currentProject?.id ? `&projectId=${currentProject.id}` : ''}`).then((r)=>r.json()),
                fetch(`/api/audit?sStep=4${currentProject?.id ? `&projectId=${currentProject.id}` : ''}`).then((r)=>r.json()),
                fetch(`/api/audit?sStep=5${currentProject?.id ? `&projectId=${currentProject.id}` : ''}`).then((r)=>r.json()),
                fetch(`/api/audit?sStep=0${currentProject?.id ? `&projectId=${currentProject.id}` : ''}`).then((r)=>r.json())
            ]);
            const allAudits = [
                ...s1Audits.audits || [],
                ...s2Audits.audits || [],
                ...s3Audits.audits || [],
                ...s4Audits.audits || [],
                ...s5Audits.audits || [],
                ...quarterlyAudits.audits || []
            ];
            // Sort by date descending
            allAudits.sort((a, b)=>new Date(b.auditDate).getTime() - new Date(a.auditDate).getTime());
            setAudits(allAudits);
            // Load all action items from audits
            const actionsParams = new URLSearchParams();
            if (currentProject?.id) actionsParams.set('projectId', currentProject.id);
            if (currentUser?.id) actionsParams.set('userId', currentUser.id);
            if (currentUser?.role) actionsParams.set('userRole', currentUser.role);
            const actionsRes = await fetch(`/api/actions?${actionsParams.toString()}`);
            const actionsJson = await actionsRes.json();
            if (actionsJson.success) {
                setActions(actionsJson.data || []);
            }
        } catch (error) {
            console.error('Error loading audit results:', error);
        } finally{
            setIsLoading(false);
        }
    };
    // Per-zone scores
    const zoneScores = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuditResultsModal.useMemo[zoneScores]": ()=>{
            const result = {};
            // Overall score
            const allScores = audits.filter({
                "AuditResultsModal.useMemo[zoneScores].allScores": (a)=>a.score !== null
            }["AuditResultsModal.useMemo[zoneScores].allScores"]).map({
                "AuditResultsModal.useMemo[zoneScores].allScores": (a)=>a.score
            }["AuditResultsModal.useMemo[zoneScores].allScores"]);
            result['__overall'] = {
                name: 'Auditoría (Media)',
                scores: allScores,
                latest: allScores.length > 0 ? allScores[0] : null
            };
            // Per-zone scores from action items (using zone info)
            for (const zone of zones){
                const zoneActions = actions.filter({
                    "AuditResultsModal.useMemo[zoneScores].zoneActions": (a)=>a.zoneId === zone.id
                }["AuditResultsModal.useMemo[zoneScores].zoneActions"]);
                // Get audits that might relate to this zone via their NOK items
                // Since audits don't have zoneId directly, we infer from action items
                result[zone.id] = {
                    name: zone.name,
                    scores: [],
                    latest: null
                };
            }
            // Calculate per-S-step scores
            for(let s = 1; s <= 5; s++){
                const sAudits = audits.filter({
                    "AuditResultsModal.useMemo[zoneScores].sAudits": (a)=>a.sStep === s && a.score !== null
                }["AuditResultsModal.useMemo[zoneScores].sAudits"]);
                const sScores = sAudits.map({
                    "AuditResultsModal.useMemo[zoneScores].sScores": (a)=>a.score
                }["AuditResultsModal.useMemo[zoneScores].sScores"]);
                const sStepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S_STEPS"].find({
                    "AuditResultsModal.useMemo[zoneScores].sStepData": (step)=>step.id === s
                }["AuditResultsModal.useMemo[zoneScores].sStepData"]);
                result[`__s${s}`] = {
                    name: `S${s} ${sStepData?.name || ''}`,
                    scores: sScores,
                    latest: sScores.length > 0 ? sScores[0] : null
                };
            }
            return result;
        }
    }["AuditResultsModal.useMemo[zoneScores]"], [
        audits,
        actions,
        zones
    ]);
    // Audit-related disfunciones (action items from audits)
    const auditDisfunciones = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuditResultsModal.useMemo[auditDisfunciones]": ()=>{
            return actions.filter({
                "AuditResultsModal.useMemo[auditDisfunciones]": (a)=>a.source === 'auditoria' || a.source === 'auditoria_quarterly' || a.source === 'auditoria_weekly' || a.source === 'auditoria_monthly' || a.source?.startsWith('auditoria')
            }["AuditResultsModal.useMemo[auditDisfunciones]"]);
        }
    }["AuditResultsModal.useMemo[auditDisfunciones]"], [
        actions
    ]);
    // Apply filters
    const filteredDisfunciones = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuditResultsModal.useMemo[filteredDisfunciones]": ()=>{
            let filtered = [
                ...auditDisfunciones
            ];
            if (filterSStep !== 'all') {
                filtered = filtered.filter({
                    "AuditResultsModal.useMemo[filteredDisfunciones]": (a)=>a.sStep === parseInt(filterSStep)
                }["AuditResultsModal.useMemo[filteredDisfunciones]"]);
            }
            if (filterZone !== 'all') {
                filtered = filtered.filter({
                    "AuditResultsModal.useMemo[filteredDisfunciones]": (a)=>a.zoneId === filterZone || a.zone?.name === filterZone
                }["AuditResultsModal.useMemo[filteredDisfunciones]"]);
            }
            if (filterEstado !== 'all') {
                filtered = filtered.filter({
                    "AuditResultsModal.useMemo[filteredDisfunciones]": (a)=>a.estado === filterEstado
                }["AuditResultsModal.useMemo[filteredDisfunciones]"]);
            }
            return filtered;
        }
    }["AuditResultsModal.useMemo[filteredDisfunciones]"], [
        auditDisfunciones,
        filterSStep,
        filterZone,
        filterEstado
    ]);
    const getScoreColor = (score)=>{
        if (score === null) return 'text-gray-400';
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-amber-600';
        return 'text-red-600';
    };
    const getScoreBg = (score)=>{
        if (score === null) return 'bg-gray-50 border-gray-200';
        if (score >= 80) return 'bg-green-50 border-green-200';
        if (score >= 60) return 'bg-amber-50 border-amber-200';
        return 'bg-red-50 border-red-200';
    };
    const getEstadoBadge = (estado)=>{
        const map = {
            abierta: {
                label: 'Abierta',
                color: 'bg-red-100 text-red-800'
            },
            en_proceso: {
                label: 'En Proceso',
                color: 'bg-amber-100 text-amber-800'
            },
            resuelta: {
                label: 'Resuelta',
                color: 'bg-green-100 text-green-800'
            },
            cerrada: {
                label: 'Cerrada',
                color: 'bg-gray-100 text-gray-600'
            }
        };
        const info = map[estado] || map['abierta'];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
            className: info.color,
            children: info.label
        }, void 0, false, {
            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
            lineNumber: 251,
            columnNumber: 12
        }, this);
    };
    const formatDate = (dateStr)=>{
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('es-ES');
    };
    // Stats
    const totalDisfunciones = auditDisfunciones.length;
    const abiertas = auditDisfunciones.filter((a)=>a.estado === 'abierta').length;
    const enProceso = auditDisfunciones.filter((a)=>a.estado === 'en_proceso').length;
    const resueltas = auditDisfunciones.filter((a)=>a.estado === 'resuelta' || a.estado === 'cerrada').length;
    // Per-zone aggregate scores (from latest audit per zone)
    const zoneAggScores = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuditResultsModal.useMemo[zoneAggScores]": ()=>{
            const result = [];
            // Overall
            const allAuditScores = audits.filter({
                "AuditResultsModal.useMemo[zoneAggScores].allAuditScores": (a)=>a.score !== null && a.sStep >= 1 && a.sStep <= 5
            }["AuditResultsModal.useMemo[zoneAggScores].allAuditScores"]);
            if (allAuditScores.length > 0) {
                const avg = allAuditScores.reduce({
                    "AuditResultsModal.useMemo[zoneAggScores]": (s, a)=>s + (a.score || 0)
                }["AuditResultsModal.useMemo[zoneAggScores]"], 0) / allAuditScores.length;
                result.push({
                    zoneName: 'Auditoría (Media Global)',
                    avgScore: Math.round(avg * 10) / 10,
                    latestScore: allAuditScores[0]?.score || null,
                    auditCount: allAuditScores.length
                });
            }
            // Per S-step
            for(let s = 1; s <= 5; s++){
                const sAudits = audits.filter({
                    "AuditResultsModal.useMemo[zoneAggScores].sAudits": (a)=>a.sStep === s && a.score !== null
                }["AuditResultsModal.useMemo[zoneAggScores].sAudits"]);
                if (sAudits.length > 0) {
                    const avg = sAudits.reduce({
                        "AuditResultsModal.useMemo[zoneAggScores]": (sum, a)=>sum + (a.score || 0)
                    }["AuditResultsModal.useMemo[zoneAggScores]"], 0) / sAudits.length;
                    const sData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S_STEPS"].find({
                        "AuditResultsModal.useMemo[zoneAggScores].sData": (step)=>step.id === s
                    }["AuditResultsModal.useMemo[zoneAggScores].sData"]);
                    result.push({
                        zoneName: `${sData?.name || `S${s}`}`,
                        avgScore: Math.round(avg * 10) / 10,
                        latestScore: sAudits[0]?.score || null,
                        auditCount: sAudits.length
                    });
                }
            }
            // Per zone (from action items, we infer which zone each audit relates to)
            for (const zone of zones){
                const zoneActionItems = auditDisfunciones.filter({
                    "AuditResultsModal.useMemo[zoneAggScores].zoneActionItems": (a)=>a.zoneId === zone.id
                }["AuditResultsModal.useMemo[zoneAggScores].zoneActionItems"]);
                if (zoneActionItems.length > 0 || zones.length > 0) {
                    // Get the latest audit score for this zone
                    // Since audits don't store zoneId, we calculate from NOK action items
                    const zoneAuditIds = new Set(zoneActionItems.map({
                        "AuditResultsModal.useMemo[zoneAggScores]": (a)=>a.source + '_' + a.sStep
                    }["AuditResultsModal.useMemo[zoneAggScores]"]));
                    const latestScore = null; // Would need audit-zone relationship
                    result.push({
                        zoneName: zone.name,
                        avgScore: latestScore,
                        latestScore: latestScore,
                        auditCount: zoneActionItems.length
                    });
                }
            }
            return result;
        }
    }["AuditResultsModal.useMemo[zoneAggScores]"], [
        audits,
        auditDisfunciones,
        zones
    ]);
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                className: "h-5 w-5 text-blue-600"
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                lineNumber: 322,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Resultados de Auditoría"
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                lineNumber: 323,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: "text-xs border-blue-300 text-blue-700",
                                children: [
                                    audits.length,
                                    " auditorías"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                lineNumber: 324,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsFullscreen(!isFullscreen),
                                className: "ml-auto p-1 rounded hover:bg-muted transition-colors",
                                title: isFullscreen ? "Reducir ventana" : "Pantalla completa",
                                children: isFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                    className: "h-4 w-4 text-muted-foreground"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                    lineNumber: 332,
                                    columnNumber: 31
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                    className: "h-4 w-4 text-muted-foreground"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                    lineNumber: 332,
                                    columnNumber: 89
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                lineNumber: 327,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                        lineNumber: 321,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                    lineNumber: 320,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-6 pb-6 min-h-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-1 border-b pb-1",
                            children: [
                                {
                                    key: 'resumen',
                                    label: 'Resumen',
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                        lineNumber: 341,
                                        columnNumber: 69
                                    }, this)
                                },
                                {
                                    key: 'disfunciones',
                                    label: 'Disfunciones',
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                        lineNumber: 342,
                                        columnNumber: 79
                                    }, this),
                                    badge: abiertas
                                },
                                {
                                    key: 'seguimiento',
                                    label: 'Seguimiento',
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                        lineNumber: 343,
                                        columnNumber: 77
                                    }, this)
                                }
                            ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab(tab.key),
                                    className: `flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tab.key ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`,
                                    children: [
                                        tab.icon,
                                        tab.label,
                                        tab.badge !== undefined && tab.badge > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white",
                                            children: tab.badge
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                            lineNumber: 357,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, tab.key, true, {
                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                    lineNumber: 345,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                            lineNumber: 339,
                            columnNumber: 11
                        }, this),
                        isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center py-20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                lineNumber: 367,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                            lineNumber: 366,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                activeTab === 'resumen' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4 overflow-auto flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
                                            children: zoneAggScores.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                    className: `border-2 ${getScoreBg(item.avgScore)}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                        className: "p-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: `text-3xl font-black ${getScoreColor(item.avgScore)}`,
                                                                    children: item.avgScore !== null ? `${item.avgScore}%` : '—'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 380,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-semibold text-gray-700 mt-1",
                                                                    children: item.zoneName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 383,
                                                                    columnNumber: 29
                                                                }, this),
                                                                item.latestScore !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[10px] text-muted-foreground mt-0.5",
                                                                    children: [
                                                                        "Última: ",
                                                                        item.latestScore,
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 385,
                                                                    columnNumber: 31
                                                                }, this),
                                                                item.auditCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[10px] text-muted-foreground",
                                                                    children: [
                                                                        item.auditCount,
                                                                        " auditoría(s)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 390,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                            lineNumber: 379,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 25
                                                    }, this)
                                                }, idx, false, {
                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                            lineNumber: 375,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                    className: "border-2 bg-red-50 border-red-200",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                        className: "p-3 text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                className: "h-5 w-5 text-red-500 mx-auto mb-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                lineNumber: 404,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-2xl font-black text-red-600",
                                                                children: abiertas
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                lineNumber: 405,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-semibold text-red-700",
                                                                children: "Abiertas"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                lineNumber: 406,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                        lineNumber: 403,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                    lineNumber: 402,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                    className: "border-2 bg-amber-50 border-amber-200",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                        className: "p-3 text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                className: "h-5 w-5 text-amber-500 mx-auto mb-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                lineNumber: 411,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-2xl font-black text-amber-600",
                                                                children: enProceso
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                lineNumber: 412,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-semibold text-amber-700",
                                                                children: "En Proceso"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                lineNumber: 413,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                        lineNumber: 410,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                    className: "border-2 bg-green-50 border-green-200",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                        className: "p-3 text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                className: "h-5 w-5 text-green-500 mx-auto mb-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                lineNumber: 418,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-2xl font-black text-green-600",
                                                                children: resueltas
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                lineNumber: 419,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-semibold text-green-700",
                                                                children: "Resueltas"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                lineNumber: 420,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                        lineNumber: 417,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                            lineNumber: 401,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-sm font-bold text-gray-700 mb-2",
                                                    children: "Historial de Auditorías"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                    lineNumber: 427,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2 max-h-64 overflow-auto",
                                                    children: audits.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-muted-foreground text-center py-8",
                                                        children: "No hay auditorías registradas"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                        lineNumber: 430,
                                                        columnNumber: 25
                                                    }, this) : audits.slice(0, 20).map((audit)=>{
                                                        const sStepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S_STEPS"].find((s)=>s.id === audit.sStep);
                                                        const isExpanded = expandedAudit === audit.id;
                                                        // Parse NOK items from checklistData
                                                        let nokItems = [];
                                                        try {
                                                            if (audit.checklistData) {
                                                                const parsed = typeof audit.checklistData === 'string' ? JSON.parse(audit.checklistData) : audit.checklistData;
                                                                if (Array.isArray(parsed)) {
                                                                    nokItems = parsed.filter((r)=>r.status === 'nok');
                                                                } else if (typeof parsed === 'object') {
                                                                    nokItems = Object.values(parsed).filter((r)=>r.status === 'nok');
                                                                }
                                                            }
                                                        } catch  {}
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `rounded-lg border text-xs ${audit.result === 'apto' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "w-full p-2.5 flex items-center gap-2 hover:bg-black/5 transition-colors text-left",
                                                                    onClick: ()=>setExpandedAudit(isExpanded ? null : audit.id),
                                                                    children: [
                                                                        isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                            className: "h-3.5 w-3.5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                            lineNumber: 457,
                                                                            columnNumber: 47
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                            className: "h-3.5 w-3.5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                            lineNumber: 457,
                                                                            columnNumber: 89
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                            className: audit.result === 'apto' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                                                            children: audit.result === 'apto' ? 'Apto' : 'No Apto'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                            lineNumber: 458,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        audit.score !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                            variant: "outline",
                                                                            className: "text-[10px] font-bold",
                                                                            children: [
                                                                                audit.score,
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                            lineNumber: 462,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        sStepData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                            variant: "outline",
                                                                            style: {
                                                                                borderColor: sStepData.color,
                                                                                color: sStepData.color
                                                                            },
                                                                            className: "text-[10px]",
                                                                            children: sStepData.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                            lineNumber: 465,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-muted-foreground ml-auto",
                                                                            children: [
                                                                                new Date(audit.auditDate).toLocaleDateString('es-ES'),
                                                                                " — ",
                                                                                audit.auditorName
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                            lineNumber: 469,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 453,
                                                                    columnNumber: 31
                                                                }, this),
                                                                isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "px-3 pb-3 pt-0 space-y-2 border-t border-inherit",
                                                                    children: [
                                                                        audit.observations && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-muted-foreground italic mt-2",
                                                                            children: [
                                                                                '"',
                                                                                audit.observations,
                                                                                '"'
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                            lineNumber: 477,
                                                                            columnNumber: 37
                                                                        }, this),
                                                                        nokItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-semibold text-red-700 mb-1",
                                                                                    children: [
                                                                                        "Disfunciones detectadas (",
                                                                                        nokItems.length,
                                                                                        "):"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                    lineNumber: 481,
                                                                                    columnNumber: 39
                                                                                }, this),
                                                                                nokItems.map((nok, nIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "pl-3 py-0.5 text-red-600",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "font-medium",
                                                                                                children: nok.itemId
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                lineNumber: 486,
                                                                                                columnNumber: 43
                                                                                            }, this),
                                                                                            nok.hallazgo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                children: [
                                                                                                    " — ",
                                                                                                    nok.hallazgo
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                lineNumber: 487,
                                                                                                columnNumber: 60
                                                                                            }, this),
                                                                                            nok.mejora && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-amber-600",
                                                                                                children: [
                                                                                                    " → Mejora: ",
                                                                                                    nok.mejora
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                lineNumber: 488,
                                                                                                columnNumber: 58
                                                                                            }, this)
                                                                                        ]
                                                                                    }, nIdx, true, {
                                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                        lineNumber: 485,
                                                                                        columnNumber: 41
                                                                                    }, this))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                            lineNumber: 480,
                                                                            columnNumber: 37
                                                                        }, this),
                                                                        (()=>{
                                                                            const relatedActions = auditDisfunciones.filter((a)=>a.sStep === audit.sStep && a.source?.startsWith('auditoria')).slice(0, 10);
                                                                            if (relatedActions.length === 0) return null;
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "font-semibold text-blue-700 mb-1",
                                                                                        children: "Plan de Acción relacionado:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                        lineNumber: 505,
                                                                                        columnNumber: 41
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "space-y-1",
                                                                                        children: relatedActions.map((action)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "flex items-center gap-2 p-1.5 rounded bg-white/80 border text-[11px]",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "flex-1 min-w-0",
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                className: "font-medium",
                                                                                                                children: action.hallazgo || action.itemDescription
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                                lineNumber: 512,
                                                                                                                columnNumber: 49
                                                                                                            }, this),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                                className: "flex items-center gap-2 mt-0.5 text-muted-foreground flex-wrap",
                                                                                                                children: [
                                                                                                                    action.responsable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                        className: "flex items-center gap-0.5",
                                                                                                                        children: [
                                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                                                                                className: "h-3 w-3"
                                                                                                                            }, void 0, false, {
                                                                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                                                lineNumber: 516,
                                                                                                                                columnNumber: 55
                                                                                                                            }, this),
                                                                                                                            " ",
                                                                                                                            action.responsable
                                                                                                                        ]
                                                                                                                    }, void 0, true, {
                                                                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                                        lineNumber: 515,
                                                                                                                        columnNumber: 53
                                                                                                                    }, this),
                                                                                                                    action.fechaCompromiso && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                        className: "flex items-center gap-0.5 text-blue-600",
                                                                                                                        children: [
                                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                                                                className: "h-3 w-3"
                                                                                                                            }, void 0, false, {
                                                                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                                                lineNumber: 521,
                                                                                                                                columnNumber: 55
                                                                                                                            }, this),
                                                                                                                            " Compromiso: ",
                                                                                                                            formatDate(action.fechaCompromiso)
                                                                                                                        ]
                                                                                                                    }, void 0, true, {
                                                                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                                        lineNumber: 520,
                                                                                                                        columnNumber: 53
                                                                                                                    }, this),
                                                                                                                    action.fechaReal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                        className: "flex items-center gap-0.5 text-green-600",
                                                                                                                        children: [
                                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                                                                className: "h-3 w-3"
                                                                                                                            }, void 0, false, {
                                                                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                                                lineNumber: 526,
                                                                                                                                columnNumber: 55
                                                                                                                            }, this),
                                                                                                                            " Cierre real: ",
                                                                                                                            formatDate(action.fechaReal)
                                                                                                                        ]
                                                                                                                    }, void 0, true, {
                                                                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                                        lineNumber: 525,
                                                                                                                        columnNumber: 53
                                                                                                                    }, this),
                                                                                                                    action.fechaResolucion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                        className: "flex items-center gap-0.5 text-green-600",
                                                                                                                        children: [
                                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                                                                                className: "h-3 w-3"
                                                                                                                            }, void 0, false, {
                                                                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                                                lineNumber: 531,
                                                                                                                                columnNumber: 55
                                                                                                                            }, this),
                                                                                                                            " Resolución: ",
                                                                                                                            formatDate(action.fechaResolucion)
                                                                                                                        ]
                                                                                                                    }, void 0, true, {
                                                                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                                        lineNumber: 530,
                                                                                                                        columnNumber: 53
                                                                                                                    }, this)
                                                                                                                ]
                                                                                                            }, void 0, true, {
                                                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                                lineNumber: 513,
                                                                                                                columnNumber: 49
                                                                                                            }, this)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                        lineNumber: 511,
                                                                                                        columnNumber: 47
                                                                                                    }, this),
                                                                                                    getEstadoBadge(action.estado)
                                                                                                ]
                                                                                            }, action.id, true, {
                                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                lineNumber: 510,
                                                                                                columnNumber: 45
                                                                                            }, this))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                        lineNumber: 508,
                                                                                        columnNumber: 41
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 504,
                                                                                columnNumber: 39
                                                                            }, this);
                                                                        })()
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 475,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, audit.id, true, {
                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                            lineNumber: 450,
                                                            columnNumber: 29
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                    lineNumber: 428,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                            lineNumber: 426,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                    lineNumber: 373,
                                    columnNumber: 17
                                }, this),
                                activeTab === 'disfunciones' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 overflow-auto flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 flex-wrap",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                                    className: "h-4 w-4 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                    lineNumber: 559,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: filterSStep,
                                                    onValueChange: setFilterSStep,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            className: "w-[130px] h-8 text-xs",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                placeholder: "Todas S"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                lineNumber: 562,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                            lineNumber: 561,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "all",
                                                                    children: "Todas las S"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 565,
                                                                    columnNumber: 25
                                                                }, this),
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S_STEPS"].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                        value: String(s.id),
                                                                        children: [
                                                                            "S",
                                                                            s.id,
                                                                            " - ",
                                                                            s.name
                                                                        ]
                                                                    }, s.id, true, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 567,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                            lineNumber: 564,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                    lineNumber: 560,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: filterZone,
                                                    onValueChange: setFilterZone,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            className: "w-[140px] h-8 text-xs",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                placeholder: "Todas zonas"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                lineNumber: 573,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                            lineNumber: 572,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "all",
                                                                    children: "Todas las zonas"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 576,
                                                                    columnNumber: 25
                                                                }, this),
                                                                zones.map((z)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                        value: z.id,
                                                                        children: z.name
                                                                    }, z.id, false, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 578,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                            lineNumber: 575,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                    lineNumber: 571,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: filterEstado,
                                                    onValueChange: setFilterEstado,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            className: "w-[120px] h-8 text-xs",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                placeholder: "Todos"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                lineNumber: 584,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                            lineNumber: 583,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "all",
                                                                    children: "Todos los estados"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 587,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "abierta",
                                                                    children: "Abierta"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 588,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "en_proceso",
                                                                    children: "En Proceso"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 589,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "resuelta",
                                                                    children: "Resuelta"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 590,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "cerrada",
                                                                    children: "Cerrada"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 591,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                            lineNumber: 586,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                    lineNumber: 582,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground ml-auto",
                                                    children: [
                                                        "Mostrando ",
                                                        filteredDisfunciones.length,
                                                        " de ",
                                                        totalDisfunciones
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                    lineNumber: 594,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                            lineNumber: 558,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: filteredDisfunciones.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center py-12",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        className: "h-10 w-10 text-green-300 mx-auto mb-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                        lineNumber: 603,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-muted-foreground",
                                                        children: "No hay disfunciones que coincidan con los filtros"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                        lineNumber: 604,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                lineNumber: 602,
                                                columnNumber: 23
                                            }, this) : filteredDisfunciones.map((action)=>{
                                                const sStepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S_STEPS"].find((s)=>s.id === action.sStep);
                                                const isOverdue = (action.estado === 'abierta' || action.estado === 'en_proceso') && action.fechaLimite && new Date(action.fechaLimite).toISOString().split('T')[0] < new Date().toISOString().split('T')[0];
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                    className: `overflow-hidden ${isOverdue ? 'border-red-300 bg-red-50/30' : ''}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                        className: "p-3 space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex-1 min-w-0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-2 flex-wrap",
                                                                                children: [
                                                                                    sStepData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                        variant: "outline",
                                                                                        style: {
                                                                                            borderColor: sStepData.color,
                                                                                            color: sStepData.color
                                                                                        },
                                                                                        className: "text-[10px]",
                                                                                        children: [
                                                                                            "S",
                                                                                            action.sStep
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                        lineNumber: 621,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "font-semibold text-sm",
                                                                                        children: action.hallazgo || action.itemDescription
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                        lineNumber: 625,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    isOverdue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                        className: "bg-red-500 text-white text-[10px]",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                                                className: "h-3 w-3 mr-0.5"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                lineNumber: 628,
                                                                                                columnNumber: 41
                                                                                            }, this),
                                                                                            " Vencida"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                        lineNumber: 627,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 619,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            action.itemDescription && action.hallazgo && action.itemDescription !== action.hallazgo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-muted-foreground mt-0.5",
                                                                                children: action.itemDescription
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 633,
                                                                                columnNumber: 37
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 618,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "shrink-0",
                                                                        children: getEstadoBadge(action.estado)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 636,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                lineNumber: 617,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-muted-foreground font-medium",
                                                                                children: "Concepto"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 645,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "font-medium truncate",
                                                                                children: action.hallazgo || '—'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 646,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 644,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-muted-foreground font-medium",
                                                                                children: "Plan de Acción"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 650,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "font-medium truncate",
                                                                                children: action.accionCorrectiva || action.mejora || '—'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 651,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 649,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-muted-foreground font-medium",
                                                                                children: "Responsable"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 655,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "flex items-center gap-1 truncate",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                                        className: "h-3 w-3 shrink-0"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                        lineNumber: 657,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    action.responsable || 'Sin asignar'
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 656,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 654,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-muted-foreground font-medium",
                                                                                children: "Zona"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 663,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "flex items-center gap-1 truncate",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                                        className: "h-3 w-3 shrink-0"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                        lineNumber: 665,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    action.zone?.name || '—'
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 664,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 662,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-muted-foreground font-medium",
                                                                                children: "Fecha Compromiso"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 671,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "flex items-center gap-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                        className: "h-3 w-3 shrink-0 text-blue-500"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                        lineNumber: 673,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    formatDate(action.fechaCompromiso)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 672,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 670,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-muted-foreground font-medium",
                                                                                children: "Fecha Real Cierre"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 679,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "flex items-center gap-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                        className: "h-3 w-3 shrink-0 text-green-500"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                        lineNumber: 681,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    formatDate(action.fechaReal || action.fechaResolucion)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 680,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 678,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-muted-foreground font-medium",
                                                                                children: "Acciones Preventivas"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 687,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "truncate",
                                                                                children: action.accionesPreventivas || '—'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 688,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 686,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-muted-foreground font-medium",
                                                                                children: "Verificado Por"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 692,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "truncate",
                                                                                children: action.verificadoPor || '—'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                lineNumber: 693,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 691,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                lineNumber: 642,
                                                                columnNumber: 31
                                                            }, this),
                                                            action.porcentaje !== null && action.porcentaje > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 text-xs",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex-1 h-2 bg-gray-200 rounded-full overflow-hidden",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "h-full bg-blue-500 rounded-full transition-all",
                                                                            style: {
                                                                                width: `${Math.min(action.porcentaje, 100)}%`
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                            lineNumber: 701,
                                                                            columnNumber: 37
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 700,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: [
                                                                            action.porcentaje,
                                                                            "%"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 706,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                lineNumber: 699,
                                                                columnNumber: 33
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                        lineNumber: 615,
                                                        columnNumber: 29
                                                    }, this)
                                                }, action.id, false, {
                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                    lineNumber: 614,
                                                    columnNumber: 27
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                            lineNumber: 600,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                    lineNumber: 556,
                                    columnNumber: 17
                                }, this),
                                activeTab === 'seguimiento' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4 overflow-auto flex-1",
                                    children: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S_STEPS"].map((sStep)=>{
                                            const sActions = auditDisfunciones.filter((a)=>a.sStep === sStep.id);
                                            if (sActions.length === 0) return null;
                                            const sAbiertas = sActions.filter((a)=>a.estado === 'abierta').length;
                                            const sEnProceso = sActions.filter((a)=>a.estado === 'en_proceso').length;
                                            const sResueltas = sActions.filter((a)=>a.estado === 'resuelta' || a.estado === 'cerrada').length;
                                            const sProgress = sActions.length > 0 ? Math.round(sResueltas / sActions.length * 100) : 0;
                                            // Latest audit score
                                            const sAudits = audits.filter((a)=>a.sStep === sStep.id && a.score !== null);
                                            const latestScore = sAudits.length > 0 ? sAudits[0].score : null;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                className: "overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                    className: "p-4 space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "w-3 h-3 rounded-full",
                                                                            style: {
                                                                                backgroundColor: sStep.color
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                            lineNumber: 740,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-bold",
                                                                            style: {
                                                                                color: sStep.color
                                                                            },
                                                                            children: sStep.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                            lineNumber: 741,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: [
                                                                                "(",
                                                                                sStep.japaneseName,
                                                                                " - ",
                                                                                sStep.spanishName,
                                                                                ")"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                            lineNumber: 744,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 739,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: latestScore !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "outline",
                                                                        className: `text-xs font-bold ${getScoreColor(latestScore)}`,
                                                                        children: [
                                                                            "Auditoría: ",
                                                                            latestScore,
                                                                            "%"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 750,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 748,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                            lineNumber: 738,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1 h-3 bg-gray-100 rounded-full overflow-hidden",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-full rounded-full transition-all",
                                                                        style: {
                                                                            width: `${sProgress}%`,
                                                                            backgroundColor: sStep.color
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                        lineNumber: 760,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 759,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-bold",
                                                                    style: {
                                                                        color: sStep.color
                                                                    },
                                                                    children: [
                                                                        sProgress,
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 768,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                            lineNumber: 758,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-4 text-xs",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-red-600 font-medium",
                                                                    children: [
                                                                        sAbiertas,
                                                                        " abiertas"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 773,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-amber-600 font-medium",
                                                                    children: [
                                                                        sEnProceso,
                                                                        " en proceso"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 774,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-green-600 font-medium",
                                                                    children: [
                                                                        sResueltas,
                                                                        " resueltas"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 775,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-muted-foreground",
                                                                    children: [
                                                                        "(",
                                                                        sActions.length,
                                                                        " total)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 776,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                            lineNumber: 772,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1 max-h-48 overflow-auto",
                                                            children: sActions.map((action)=>{
                                                                const isOverdue = (action.estado === 'abierta' || action.estado === 'en_proceso') && action.fechaLimite && new Date(action.fechaLimite).toISOString().split('T')[0] < new Date().toISOString().split('T')[0];
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `flex items-center gap-2 p-1.5 rounded text-xs ${isOverdue ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-gray-100'}`,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex-1 min-w-0",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-medium truncate block",
                                                                                    children: action.hallazgo || action.itemDescription
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                    lineNumber: 791,
                                                                                    columnNumber: 37
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center gap-2 mt-0.5 text-muted-foreground flex-wrap",
                                                                                    children: [
                                                                                        action.responsable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                                                    className: "h-3 w-3 inline"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                                    lineNumber: 794,
                                                                                                    columnNumber: 47
                                                                                                }, this),
                                                                                                " ",
                                                                                                action.responsable
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                            lineNumber: 794,
                                                                                            columnNumber: 41
                                                                                        }, this),
                                                                                        action.fechaCompromiso && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-blue-600",
                                                                                            children: [
                                                                                                "Compromiso: ",
                                                                                                formatDate(action.fechaCompromiso)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                            lineNumber: 797,
                                                                                            columnNumber: 41
                                                                                        }, this),
                                                                                        action.fechaReal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-green-600",
                                                                                            children: [
                                                                                                "Cierre: ",
                                                                                                formatDate(action.fechaReal)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                            lineNumber: 800,
                                                                                            columnNumber: 41
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                                    lineNumber: 792,
                                                                                    columnNumber: 37
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                            lineNumber: 790,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        getEstadoBadge(action.estado)
                                                                    ]
                                                                }, action.id, true, {
                                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                                    lineNumber: 787,
                                                                    columnNumber: 33
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                            lineNumber: 780,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                    lineNumber: 737,
                                                    columnNumber: 25
                                                }, this)
                                            }, sStep.id, false, {
                                                fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                lineNumber: 736,
                                                columnNumber: 23
                                            }, this);
                                        }),
                                        auditDisfunciones.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center py-12",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    className: "h-10 w-10 text-green-300 mx-auto mb-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                    lineNumber: 816,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "No hay disfunciones de auditoría registradas"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                                    lineNumber: 817,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                            lineNumber: 815,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                                    lineNumber: 720,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
                    lineNumber: 337,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
            lineNumber: 319,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/5s/AuditResultsModal.tsx",
        lineNumber: 318,
        columnNumber: 5
    }, this);
}
_s(AuditResultsModal, "9aqgGRm7e7R34wtWx3Ntu/JxoWE=");
_c = AuditResultsModal;
var _c;
__turbopack_context__.k.register(_c, "AuditResultsModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_5s_AuditResultsModal_tsx_0c24224e._.js.map