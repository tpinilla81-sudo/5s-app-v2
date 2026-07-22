module.exports = [
"[project]/src/components/5s/InventarioModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InventarioModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/table.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-list.js [app-ssr] (ecmascript) <export default as ClipboardList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-spreadsheet.js [app-ssr] (ecmascript) <export default as FileSpreadsheet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-up.js [app-ssr] (ecmascript) <export default as FileUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-ssr] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-ssr] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen-tool.js [app-ssr] (ecmascript) <export default as PenTool>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-ssr] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-ssr] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-ssr] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link-2.js [app-ssr] (ecmascript) <export default as Link2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/5s-constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$5s$2f$LayoutEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/5s/LayoutEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$5s$2f$ColorCodeTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/5s/ColorCodeTable.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$5s$2f$TagPrinter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/5s/TagPrinter.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$5s$2f$CleaningPlanPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/5s/CleaningPlanPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$5s$2f$BibliotecaEstandaresView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/5s/BibliotecaEstandaresView.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/image-utils.ts [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
function InventarioModal({ open, onClose, sStep, miniStep }) {
    const { fetchProgress, currentUser, adminFreeNavigation, currentProject, currentZone, canPerform, canView, hasPermission } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use5SStore"])();
    const sStepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S_STEPS"].find((s)=>s.id === sStep);
    const defaultConfig = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INVENTORY_CONFIGS"][sStep] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INVENTORY_CONFIGS"][1];
    const [customConfig, setCustomConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hasTemplate, setHasTemplate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null); // null = loading, false = no template, true = has template
    const config = customConfig || defaultConfig;
    const canSkipSteps = hasPermission('skip_steps');
    const canPerformStep = canPerform(sStep, miniStep);
    const canViewStep = canView(sStep, miniStep);
    // Permission-driven: read-only if no execute perm OR if candado closed for skip_steps users
    const isReadOnly = !canPerformStep || canSkipSteps && !adminFreeNavigation;
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isCompleted, setIsCompleted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [csvPreview, setCsvPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isImporting, setIsImporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showLayoutEditor, setShowLayoutEditor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showColorCodeTable, setShowColorCodeTable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [savedLayouts, setSavedLayouts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [layoutUploaded, setLayoutUploaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Photo attachment state
    const [itemPhotos, setItemPhotos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [step2Photos, setStep2Photos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showPhotoGallery, setShowPhotoGallery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [galleryTargetItemId, setGalleryTargetItemId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uploadingPhotoForItem, setUploadingPhotoForItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uploadPhotoType, setUploadPhotoType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('antes');
    const [showPhotoLightbox, setShowPhotoLightbox] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingNewPhoto, setPendingNewPhoto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingNewPhotoType, setPendingNewPhotoType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('antes');
    // S1: default category is 'innecesario' since this template is for unnecessary items
    const defaultCategory = sStep === 1 ? 'innecesario' : undefined;
    const [newItem, setNewItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        location: '',
        category: defaultCategory,
        quantity: 1,
        quantityNeeded: 0,
        quantityUnneeded: 0,
        price: null,
        action: '',
        zonaOrigen: currentZone?.name || null,
        jaulaFechaEntrada: new Date().toISOString(),
        extra: {}
    });
    // Update zonaOrigen and default category when zone/step changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setNewItem((prev)=>({
                ...prev,
                zonaOrigen: currentZone?.name || prev.zonaOrigen,
                category: sStep === 1 ? 'innecesario' : prev.category
            }));
    }, [
        currentZone?.name,
        sStep
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (open) {
            // Load config/template FIRST — importTemplateItems will call loadInventory internally
            // after saving template items to DB, so items get proper IDs and are editable.
            // We do NOT call loadInventory() separately here to avoid race conditions.
            loadCustomInventoryConfig().then(()=>{
                // loadCustomInventoryConfig may or may not have called loadInventory via importTemplateItems.
                // If no template items were found, loadInventory wasn't called, so load it now.
                // We check by seeing if items are still empty after config load.
                setItems((prev)=>{
                    if (prev.length === 0) {
                        loadInventory();
                    }
                    return prev;
                });
            });
            // Load layouts for any S step that has layout support (S2 primarily, also S3/S4 for estandares)
            if (sStep === 2 || sStep === 3 || sStep === 4) loadLayouts();
            // Reset zonaOrigen to current zone when opening
            setNewItem((prev)=>({
                    ...prev,
                    zonaOrigen: currentZone?.name || null
                }));
            // Load Step 2 photos for this zone/project
            loadStep2Photos();
        }
    }, [
        open,
        sStep
    ]);
    // Helper: import template items into the database so they get real IDs and become editable
    const importTemplateItems = async (templateItems)=>{
        if (!currentProject?.id || !templateItems.length) return;
        try {
            // Check if items already exist in DB for this step/project/zone — avoid duplicates
            const existingRes = await fetch(`/api/inventory?sStep=${sStep}&projectId=${currentProject.id}${currentZone?.id ? `&zoneId=${currentZone.id}` : ''}`);
            const existingJson = await existingRes.json();
            const existingNames = new Set((existingJson.success ? existingJson.data : []).map((i)=>i.name?.trim().toLowerCase()));
            // Only import items that don't already exist in the DB
            const itemsToCreate = templateItems.filter((item)=>item.name && !existingNames.has(item.name.trim().toLowerCase()));
            if (itemsToCreate.length === 0) {
                // All items already in DB — just reload from API to get proper IDs
                await loadInventory();
                return;
            }
            // Create each item via POST so they get database IDs
            for (const item of itemsToCreate){
                const isInnecesario = sStep === 1 && item.category === 'innecesario';
                const isNecesario = sStep === 1 && item.category === 'necesario';
                const qty = item.quantity || 1;
                const extra = {
                    ...item.extra || {}
                };
                if (sStep === 1 && isInnecesario && !extra.decision) {
                    extra.decision = 'Jaula';
                }
                await fetch('/api/inventory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sStep,
                        projectId: currentProject.id,
                        zoneId: currentZone?.id || null,
                        name: item.name,
                        location: item.location || '',
                        category: item.category || '',
                        quantity: qty,
                        quantityNeeded: isNecesario ? qty : item.quantityNeeded || 0,
                        quantityUnneeded: isInnecesario ? qty : item.quantityUnneeded || 0,
                        price: item.price ?? null,
                        action: item.action || (isInnecesario ? extra.decision || 'Jaula' : ''),
                        extra,
                        jaulaStatus: isInnecesario && extra.decision !== 'Eliminar' && extra.decision !== 'Tirar' ? 'en_jaula' : '',
                        jaulaFechaEntrada: isInnecesario && extra.decision !== 'Eliminar' && extra.decision !== 'Tirar' ? new Date().toISOString() : null,
                        jaulaOrigen: isInnecesario ? currentZone?.name || currentProject.name || '' : null,
                        zonaOrigen: currentZone?.name || null,
                        zonaDestino: isInnecesario ? extra.decision === 'Tirar' || extra.decision === 'Eliminar' ? 'Residuo' : 'Jaula' : null
                    })
                });
            }
            // Now reload from API — items will have real database IDs and be fully editable
            await loadInventory();
        } catch (e) {
            console.error('Error importing template items:', e);
            // Fallback: just reload from API
            await loadInventory();
        }
    };
    // Helper: parse template content and apply it, falling back to INVENTORY_CONFIGS if empty
    const applyTemplateContent = async (content)=>{
        const hasCategories = Array.isArray(content.categories) && content.categories.length > 0;
        const hasExtraFields = Array.isArray(content.extraFields) && content.extraFields.length > 0;
        const hasItems = Array.isArray(content.items) && content.items.length > 0;
        if (hasCategories || hasExtraFields) {
            // Template has real structure — use it (fill missing parts from defaults)
            setCustomConfig({
                title: content.title || defaultConfig.title,
                subtitle: content.subtitle || defaultConfig.subtitle,
                templateName: content.templateName || defaultConfig.templateName,
                categories: hasCategories ? content.categories : defaultConfig.categories,
                extraFields: hasExtraFields ? content.extraFields : defaultConfig.extraFields,
                ...content.desplegables_jerarquicos ? {
                    desplegables_jerarquicos: content.desplegables_jerarquicos
                } : {}
            });
            setHasTemplate(true);
            // Auto-import template items into DB so they get IDs and become editable
            if (hasItems) {
                await importTemplateItems(content.items);
            }
        } else if (hasItems) {
            // Legacy format: only items, no structure — use default config
            setCustomConfig(null);
            setHasTemplate(true);
            await importTemplateItems(content.items);
        } else {
            // Empty or unknown format — fall back to INVENTORY_CONFIGS defaults
            setCustomConfig(null);
            setHasTemplate(true);
        }
    };
    const loadCustomInventoryConfig = async ()=>{
        try {
            // If the zone has a board config, fetch inventory template from that config
            if (currentZone?.boardConfigId) {
                const slotsRes = await fetch(`/api/board-slots?boardConfigId=${currentZone.boardConfigId}&sStep=${sStep}&miniStep=3`);
                const slotsJson = await slotsRes.json();
                if (slotsJson.success && slotsJson.data.length > 0) {
                    const slot = slotsJson.data[0];
                    const inventarioTemplates = (slot.templates || []).filter((t)=>t.template?.type === 'inventario');
                    if (inventarioTemplates.length > 0) {
                        const content = JSON.parse(inventarioTemplates[0].template.content);
                        await applyTemplateContent(content);
                    } else {
                        // No inventario template assigned in this board slot — use default config
                        setCustomConfig(null);
                        setHasTemplate(true);
                    }
                } else {
                    // No slot configured for this step — use default config
                    setCustomConfig(null);
                    setHasTemplate(true);
                }
            } else {
                // Fallback: load global template
                const res = await fetch(`/api/templates?type=inventario&sStep=${sStep}&miniStep=3`);
                const json = await res.json();
                if (json.success && json.data && json.data.length > 0) {
                    const content = JSON.parse(json.data[0].content);
                    await applyTemplateContent(content);
                } else {
                    // No global template — use default config (INVENTORY_CONFIGS has entries for all 5 S steps)
                    setCustomConfig(null);
                    setHasTemplate(true);
                }
            }
        } catch (e) {
            console.error('Error loading custom inventory config:', e);
            // On error, use default config so the modal still works
            setCustomConfig(null);
            setHasTemplate(true);
        }
    };
    const loadLayouts = async ()=>{
        if (!currentProject) return;
        try {
            const params = new URLSearchParams({
                projectId: currentProject.id,
                category: 'layout',
                sStep: String(sStep)
            });
            if (currentZone?.id) params.set('zoneId', currentZone.id);
            const res = await fetch(`/api/standards?${params}`);
            const json = await res.json();
            if (json.success) {
                setSavedLayouts(json.data.map((s)=>({
                        id: s.id,
                        title: s.title,
                        photoUrl: s.photoUrl,
                        createdAt: s.createdAt
                    })));
                setLayoutUploaded(json.data.length > 0);
            }
        } catch (e) {
            console.error('Error loading layouts:', e);
        }
    };
    const handleUploadLayoutImage = async (e)=>{
        const file = e.target.files?.[0];
        if (!file || !currentProject) return;
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('projectId', currentProject.id);
            formData.append('filename', `${currentProject.id}_layout_${sStep}_${Date.now()}.png`);
            console.log('[InventarioModal] Uploading layout image:', file.name, 'size:', (file.size / 1024).toFixed(1) + 'KB');
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            if (!res.ok) {
                console.error('[InventarioModal] Upload HTTP error:', res.status);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Error al subir imagen (HTTP ${res.status})`);
                e.target.value = '';
                return;
            }
            const json = await res.json();
            if (json.success && json.url) {
                const layoutDescriptions = {
                    2: 'Layout subido como imagen con marcado de suelo según estándar de colores',
                    3: 'Layout subido como imagen con puntos de suciedad y zonas de limpieza',
                    4: 'Layout subido como imagen con estándares implantados señalados'
                };
                // Save as a layout standard
                const standardPayload = {
                    sStep,
                    title: `Layout ${currentZone?.name || 'zona'} ${sStepData?.japaneseName || ''} (subido)`,
                    description: layoutDescriptions[sStep] || 'Layout subido como imagen',
                    category: 'layout',
                    photoUrl: json.url,
                    status: 'activo',
                    version: 1,
                    projectId: currentProject.id,
                    zoneId: currentZone?.id || null
                };
                console.log('[InventarioModal] Saving layout standard:', {
                    sStep,
                    category: 'layout',
                    hasPhotoUrl: true,
                    projectId: currentProject.id,
                    zoneId: currentZone?.id
                });
                const saveRes = await fetch('/api/standards', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(standardPayload)
                });
                if (!saveRes.ok) {
                    console.error('[InventarioModal] Standards API HTTP error:', saveRes.status);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Error al guardar estándar (HTTP ${saveRes.status})`);
                    e.target.value = '';
                    return;
                }
                const saveJson = await saveRes.json();
                if (saveJson.success) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Layout subido y guardado en Biblioteca de Estándares');
                    await loadLayouts();
                } else {
                    console.error('[InventarioModal] Standards API error:', saveJson.error);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Error al guardar estándar: ${saveJson.error || 'Error desconocido'}`);
                }
            } else {
                console.error('[InventarioModal] Upload failed:', json.error);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Error al subir imagen: ${json.error || 'Error desconocido'}`);
            }
        } catch (e) {
            console.error('[InventarioModal] Upload error:', e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error al subir la imagen del layout');
        }
        e.target.value = '';
    };
    const loadInventory = async ()=>{
        setIsLoading(true);
        try {
            const projectIdParam = currentProject?.id ? `&projectId=${currentProject.id}` : '';
            const zoneIdParam = currentZone?.id ? `&zoneId=${currentZone.id}` : '';
            const res = await fetch(`/api/inventory?sStep=${sStep}${projectIdParam}${zoneIdParam}`);
            const json = await res.json();
            if (json.success) {
                const photosMap = {};
                const mappedItems = json.data.map((item)=>{
                    // Map photos from the relation
                    const itemPhotosList = (item.photos || []).map((p)=>({
                            id: p.id,
                            title: p.title,
                            description: p.description,
                            photoUrl: p.photoUrl,
                            photoType: p.photoType,
                            category: p.category,
                            inventoryItemId: p.inventoryItemId,
                            miniStep: p.miniStep,
                            sStep: p.sStep,
                            createdAt: p.createdAt
                        }));
                    if (item.id && itemPhotosList.length > 0) {
                        photosMap[item.id] = itemPhotosList;
                    }
                    return {
                        id: item.id,
                        name: item.name,
                        location: item.location || '',
                        category: item.category || '',
                        quantity: item.quantity || 1,
                        // S1: Set quantities based on category (innecesario or necesario)
                        quantityNeeded: sStep === 1 ? item.category === 'necesario' ? item.quantityNeeded || item.quantity || 1 : 0 : item.quantityNeeded || 0,
                        quantityUnneeded: sStep === 1 ? item.category === 'innecesario' ? item.quantityUnneeded || item.quantity || 1 : 0 : item.quantityUnneeded || 0,
                        price: item.price ?? null,
                        action: item.action || '',
                        extra: typeof item.extra === 'string' ? JSON.parse(item.extra) : item.extra || {},
                        jaulaStatus: item.jaulaStatus || '',
                        jaulaFechaEntrada: item.jaulaFechaEntrada || null,
                        jaulaOrigen: item.jaulaOrigen || null,
                        jaulaFechaSalida: item.jaulaFechaSalida || null,
                        jaulaDestino: item.jaulaDestino || null,
                        zonaOrigen: item.zonaOrigen || null,
                        zonaDestino: item.zonaDestino || null,
                        photos: itemPhotosList
                    };
                });
                setItems(mappedItems);
                setItemPhotos(photosMap);
            } else {
                console.error('Error loading inventory:', json.error);
            }
        } catch (error) {
            console.error('Error loading inventory:', error);
        } finally{
            setIsLoading(false);
        }
    };
    // ─── Photo functions ───
    const loadStep2Photos = async ()=>{
        if (!currentProject?.id) return;
        try {
            const params = new URLSearchParams({
                projectId: currentProject.id,
                sStep: String(sStep),
                miniStep: '2'
            });
            if (currentZone?.id) params.set('zoneId', currentZone.id);
            const res = await fetch(`/api/photo-library?${params}`);
            const json = await res.json();
            if (json.success) {
                setStep2Photos(json.data.map((p)=>({
                        id: p.id,
                        title: p.title,
                        description: p.description,
                        photoUrl: p.photoUrl,
                        photoType: p.photoType,
                        category: p.category,
                        inventoryItemId: p.inventoryItemId,
                        miniStep: p.miniStep,
                        sStep: p.sStep,
                        createdAt: p.createdAt
                    })));
            }
        } catch (e) {
            console.error('Error loading Step 2 photos:', e);
        }
    };
    const handleAttachPhoto = async (itemId, file, photoType)=>{
        if (!currentProject?.id) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('No hay proyecto seleccionado');
            return;
        }
        setUploadingPhotoForItem(itemId);
        try {
            // Read and compress the image
            const reader = new FileReader();
            const base64Promise = new Promise((resolve)=>{
                reader.onloadend = ()=>resolve(reader.result);
                reader.readAsDataURL(file);
            });
            const rawBase64 = await base64Promise;
            const compressed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["compressImage"])(rawBase64);
            // Upload to server
            const filename = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generatePhotoFilename"])(currentProject.id, sStep, miniStep, Date.now());
            const uploadFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["base64toFile"])(compressed, filename);
            const formData = new FormData();
            formData.append('file', uploadFile);
            formData.append('filename', filename);
            formData.append('projectId', currentProject.id);
            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const uploadJson = await uploadRes.json();
            if (!uploadJson.success || !uploadJson.url) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Error al subir foto: ${uploadJson.error || 'Error desconocido'}`);
                return;
            }
            // Save to PhotoLibrary with inventoryItemId
            const sName = sStepData?.japaneseName || `S${sStep}`;
            const zoneName = currentZone?.name || 'Zona';
            const typeLabel = photoType === 'antes' ? 'ANTES' : photoType === 'despues' ? 'DESPUÉS' : 'Referencia';
            const date = new Date().toLocaleDateString('es-ES');
            const item = items.find((i)=>i.id === itemId);
            const itemLabel = item?.name || 'Elemento';
            const photoRes = await fetch('/api/photo-library', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sStep,
                    miniStep,
                    title: `S${sStep} ${sName} - ${zoneName} - ${itemLabel} - ${typeLabel} (${date})`,
                    description: `Foto adjunta al elemento de inventario: ${itemLabel}`,
                    photoUrl: uploadJson.url,
                    photoType,
                    category: `inventario_s${sStep}`,
                    tags: JSON.stringify([
                        `S${sStep}`,
                        sName,
                        zoneName,
                        `inventario`,
                        photoType,
                        itemLabel
                    ]),
                    projectId: currentProject.id,
                    zoneId: currentZone?.id || null,
                    uploadedBy: currentUser?.id || null,
                    inventoryItemId: itemId
                })
            });
            const photoJson = await photoRes.json();
            if (photoJson.success) {
                const newPhoto = {
                    id: photoJson.data.id,
                    title: photoJson.data.title,
                    description: photoJson.data.description,
                    photoUrl: photoJson.data.photoUrl,
                    photoType: photoJson.data.photoType,
                    category: photoJson.data.category,
                    inventoryItemId: itemId,
                    miniStep: photoJson.data.miniStep,
                    sStep: photoJson.data.sStep,
                    createdAt: photoJson.data.createdAt
                };
                // Update local state
                setItemPhotos((prev)=>({
                        ...prev,
                        [itemId]: [
                            ...prev[itemId] || [],
                            newPhoto
                        ]
                    }));
                setItems((prev)=>prev.map((it)=>it.id === itemId ? {
                            ...it,
                            photos: [
                                ...it.photos || [],
                                newPhoto
                            ]
                        } : it));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Foto adjuntada correctamente');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Error al guardar foto: ${photoJson.error || 'Error desconocido'}`);
            }
        } catch (e) {
            console.error('Error attaching photo:', e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error al adjuntar la foto');
        } finally{
            setUploadingPhotoForItem(null);
        }
    };
    const handleLinkStep2Photo = async (photoId, itemId)=>{
        try {
            const res = await fetch('/api/photo-library', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: photoId,
                    inventoryItemId: itemId
                })
            });
            const json = await res.json();
            if (json.success) {
                // Update local state: move the photo to the item's photos
                const photo = step2Photos.find((p)=>p.id === photoId);
                if (photo) {
                    const linkedPhoto = {
                        ...photo,
                        inventoryItemId: itemId
                    };
                    setItemPhotos((prev)=>({
                            ...prev,
                            [itemId]: [
                                ...prev[itemId] || [],
                                linkedPhoto
                            ]
                        }));
                    setItems((prev)=>prev.map((it)=>it.id === itemId ? {
                                ...it,
                                photos: [
                                    ...it.photos || [],
                                    linkedPhoto
                                ]
                            } : it));
                    // Remove from step2Photos since it's now linked
                    setStep2Photos((prev)=>prev.filter((p)=>p.id !== photoId));
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Foto vinculada al elemento');
                setShowPhotoGallery(false);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Error al vincular foto: ${json.error || 'Error desconocido'}`);
            }
        } catch (e) {
            console.error('Error linking photo:', e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error al vincular la foto');
        }
    };
    const handleUnlinkPhoto = async (photoId, itemId)=>{
        try {
            const res = await fetch('/api/photo-library', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: photoId,
                    inventoryItemId: null
                })
            });
            const json = await res.json();
            if (json.success) {
                // Remove from item's photos locally
                setItemPhotos((prev)=>({
                        ...prev,
                        [itemId]: (prev[itemId] || []).filter((p)=>p.id !== photoId)
                    }));
                setItems((prev)=>prev.map((it)=>it.id === itemId ? {
                            ...it,
                            photos: (it.photos || []).filter((p)=>p.id !== photoId)
                        } : it));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Foto desvinculada del elemento');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Error al desvincular foto: ${json.error || 'Error desconocido'}`);
            }
        } catch (e) {
            console.error('Error unlinking photo:', e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error al desvincular la foto');
        }
    };
    const handleDeletePhoto = async (photoId, itemId)=>{
        try {
            const res = await fetch(`/api/photo-library?id=${photoId}`, {
                method: 'DELETE'
            });
            const json = await res.json();
            if (json.success) {
                setItemPhotos((prev)=>({
                        ...prev,
                        [itemId]: (prev[itemId] || []).filter((p)=>p.id !== photoId)
                    }));
                setItems((prev)=>prev.map((it)=>it.id === itemId ? {
                            ...it,
                            photos: (it.photos || []).filter((p)=>p.id !== photoId)
                        } : it));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Foto eliminada');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Error al eliminar foto: ${json.error || 'Error desconocido'}`);
            }
        } catch (e) {
            console.error('Error deleting photo:', e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error al eliminar la foto');
        }
    };
    const openPhotoGallery = (itemId)=>{
        setGalleryTargetItemId(itemId);
        setShowPhotoGallery(true);
    };
    const handleAddItem = async ()=>{
        if (!newItem.name || !newItem.category) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Completa el nombre y la categoría del elemento');
            return;
        }
        if (!currentProject?.id) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('No hay proyecto seleccionado. Selecciona un proyecto antes de agregar elementos.');
            return;
        }
        // Auto-calculate quantityUnneeded/Needed based on category for S1
        const qty = newItem.quantity || 1;
        const isInnecesario = sStep === 1 && newItem.category === 'innecesario';
        const isNecesario = sStep === 1 && newItem.category === 'necesario';
        const qtyNeeded = isNecesario ? qty : newItem.quantityNeeded || 0;
        const qtyUnneeded = isInnecesario ? qty : newItem.quantityUnneeded || 0;
        // S1: auto-set decision to extra field (only for innecesario)
        const extra = {
            ...newItem.extra || {}
        };
        if (sStep === 1 && isInnecesario && !extra.decision) {
            extra.decision = 'Jaula';
        }
        // S1: Determine zona destino based on decision
        const getZonaDestino = (decision)=>{
            if (decision === 'Tirar' || decision === 'Eliminar') return 'Residuo';
            return 'Jaula'; // Default for Jaula or no decision
        };
        // S1: Keep all fields — user can fill in both necesario and innecesario fields
        // No field deletion since all fields are now visible and editable
        try {
            const res = await fetch('/api/inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sStep,
                    projectId: currentProject.id,
                    zoneId: currentZone?.id || null,
                    name: newItem.name,
                    location: newItem.location,
                    category: newItem.category || '',
                    quantity: qty,
                    quantityNeeded: qtyNeeded,
                    quantityUnneeded: qtyUnneeded,
                    price: newItem.price || null,
                    action: newItem.action || (isInnecesario ? extra.decision || 'Jaula' : ''),
                    extra,
                    // Only Jaula items get jaula entry/quarantine; Eliminar/Tirar items go directly to Residuo
                    jaulaStatus: isInnecesario && extra.decision !== 'Eliminar' && extra.decision !== 'Tirar' ? 'en_jaula' : '',
                    jaulaFechaEntrada: isInnecesario && extra.decision !== 'Eliminar' && extra.decision !== 'Tirar' ? newItem.jaulaFechaEntrada || new Date().toISOString() : null,
                    jaulaOrigen: isInnecesario ? newItem.zonaOrigen || currentZone?.name || currentProject.name || '' : null,
                    zonaOrigen: newItem.zonaOrigen || currentZone?.name || null,
                    zonaDestino: isInnecesario ? getZonaDestino(extra.decision) : newItem.zonaOrigen || currentZone?.name || null
                })
            });
            const json = await res.json();
            if (json.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Elemento agregado correctamente');
                // If there's a pending photo, attach it to the newly created item
                const newItemId = json.data?.id;
                if (pendingNewPhoto && newItemId) {
                    await handleAttachPhoto(newItemId, pendingNewPhoto, pendingNewPhotoType);
                    setPendingNewPhoto(null);
                }
                await loadInventory();
                setNewItem({
                    name: '',
                    location: '',
                    category: defaultCategory,
                    quantity: 1,
                    quantityNeeded: 0,
                    quantityUnneeded: 0,
                    price: null,
                    action: '',
                    zonaOrigen: currentZone?.name || null,
                    jaulaFechaEntrada: new Date().toISOString(),
                    extra: {}
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Error al agregar: ${json.error || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error adding item:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error de conexión al agregar el elemento');
        }
    };
    const handleImportTemplate = async ()=>{
        if (!currentProject?.id) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('No hay proyecto seleccionado.');
            return;
        }
        try {
            let templateItems = [];
            if (currentZone?.boardConfigId) {
                // Fetch from board config
                const slotsRes = await fetch(`/api/board-slots?boardConfigId=${currentZone.boardConfigId}&sStep=${sStep}&miniStep=3`);
                const slotsJson = await slotsRes.json();
                if (slotsJson.success && slotsJson.data.length > 0) {
                    const slot = slotsJson.data[0];
                    const inventarioTemplates = (slot.templates || []).filter((t)=>t.template?.type === 'inventario');
                    if (inventarioTemplates.length > 0) {
                        const content = JSON.parse(inventarioTemplates[0].template.content);
                        templateItems = content.items || [];
                    }
                }
            } else {
                // Fallback: global template
                const res = await fetch(`/api/templates?type=inventario&sStep=${sStep}`);
                const json = await res.json();
                if (json.success && json.data.length > 0) {
                    const content = JSON.parse(json.data[0].content);
                    templateItems = content.items || [];
                }
            }
            if (templateItems.length === 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('Esta plantilla define el formato (categorías y campos) pero no contiene elementos predefinidos. Agrega elementos manualmente con el botón "Agregar".');
                return;
            }
            // Use importTemplateItems to save items to DB and reload with proper IDs
            await importTemplateItems(templateItems);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Elementos de plantilla importados correctamente');
        } catch (error) {
            console.error('Error importing template:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error de conexión al importar plantilla');
        }
    };
    // Unified file import: supports both .csv and .xlsx files
    const handleFileImport = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const fileName = file.name.toLowerCase();
            let dataRows = [];
            let headerRow = [];
            if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
                // Parse Excel file using xlsx library
                const XLSX = await __turbopack_context__.A("[project]/node_modules/xlsx/xlsx.mjs [app-ssr] (ecmascript, async loader)");
                const arrayBuffer = await file.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, {
                    type: 'array'
                });
                const sheetName = workbook.SheetNames[0]; // Use first sheet
                const sheet = workbook.Sheets[sheetName];
                const rawData = XLSX.utils.sheet_to_json(sheet, {
                    header: 1,
                    defval: ''
                });
                if (rawData.length < 2) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('El archivo está vacío o no tiene datos');
                    e.target.value = '';
                    return;
                }
                // Find the header row: look for a row that contains 'Nº' or 'Elemento' or 'Nombre'
                let headerIdx = 0;
                for(let i = 0; i < Math.min(10, rawData.length); i++){
                    const rowStr = rawData[i].map((c)=>String(c).toLowerCase()).join('|');
                    if (rowStr.includes('elemento') || rowStr.includes('nombre') || rowStr.includes('nº') || rowStr.includes('punto')) {
                        headerIdx = i;
                        break;
                    }
                }
                headerRow = rawData[headerIdx].map((h)=>String(h).trim().toLowerCase());
                dataRows = rawData.slice(headerIdx + 1).filter((row)=>{
                    // Count non-empty, non-numeric-only cells
                    const meaningfulCells = row.filter((cell)=>{
                        const v = String(cell).trim();
                        return v !== '' && v !== '0';
                    });
                    // A row with data must have at least 2 meaningful cells (name + something)
                    // This filters out empty numbered rows and footer rows
                    if (meaningfulCells.length < 2) return false;
                    // Skip footer rows like "TOTAL ELEMENTOS", "Notas:", etc.
                    const firstMeaningful = meaningfulCells[0].toLowerCase();
                    if (firstMeaningful.includes('total') || firstMeaningful.includes('notas') || firstMeaningful.includes('clasificación')) return false;
                    return true;
                });
            } else if (fileName.endsWith('.csv')) {
                // Parse CSV file
                const text = await file.text();
                const lines = text.split('\n').filter((l)=>l.trim());
                if (lines.length < 2) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('El archivo CSV está vacío o no tiene datos');
                    e.target.value = '';
                    return;
                }
                headerRow = lines[0].split(',').map((h)=>h.trim().toLowerCase().replace(/^\uFEFF/, '')); // Remove BOM
                dataRows = lines.slice(1).filter((l)=>l.trim()).map((l)=>l.split(',').map((v)=>v.trim()));
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Formato no soportado. Usa .xlsx o .csv');
                e.target.value = '';
                return;
            }
            // Flexible column mapping: map various header names to standard fields
            const findCol = (headers, ...names)=>{
                for (const name of names){
                    const idx = headers.findIndex((h)=>h.includes(name));
                    if (idx >= 0) return idx;
                }
                return -1;
            };
            const colMap = {
                name: findCol(headerRow, 'elemento', 'nombre', 'punto', 'estándar', 'práctica', 'estandar', 'practica'),
                location: findCol(headerRow, 'ubicación', 'ubicacion', 'ámbito', 'ambito', 'proceso'),
                zona: findCol(headerRow, 'zona', 'zona origen'),
                category: findCol(headerRow, 'categoría', 'categoria', 'clasificación', 'clasificacion', 'tipo'),
                quantity: findCol(headerRow, 'cantidad', 'total exist', 'total'),
                quantityNeeded: findCol(headerRow, 'necesarios', 'nec.'),
                quantityUnneeded: findCol(headerRow, 'innecesarios', 'innec.'),
                price: findCol(headerRow, 'precio'),
                action: findCol(headerRow, 'acción', 'accion', 'decisión', 'decision', 'método', 'metodo'),
                estado: findCol(headerRow, 'estado'),
                frecuenciaUso: findCol(headerRow, 'frecuencia'),
                nivel: findCol(headerRow, 'nivel'),
                fuente: findCol(headerRow, 'fuente'),
                cercania: findCol(headerRow, 'cercanía', 'cercania'),
                documentado: findCol(headerRow, 'documentado'),
                cumplimiento: findCol(headerRow, 'cumplimiento'),
                ubicacionAsignada: findCol(headerRow, 'ubicación asignada', 'asignada'),
                metodoIdentificacion: findCol(headerRow, 'método identificación', 'identificación', 'identificacion'),
                frecuenciaLimpieza: findCol(headerRow, 'frecuencia limpieza'),
                metodoLimpieza: findCol(headerRow, 'método limpieza'),
                responsable: findCol(headerRow, 'responsable'),
                observaciones: findCol(headerRow, 'observacione')
            };
            const parsedItems = [];
            for (const values of dataRows){
                const strValues = values.map((v)=>String(v).trim());
                // Skip rows that are just a number (empty data rows from template)
                if (strValues.length < 2) continue;
                const nonEmptyCount = strValues.filter((v)=>v !== '' && v !== '0').length;
                if (nonEmptyCount < 1) continue;
                const getVal = (idx, fallback)=>idx >= 0 && idx < strValues.length ? strValues[idx] : fallback || '';
                const item = {
                    name: getVal(colMap.name, strValues[1] || strValues[0] || ''),
                    location: getVal(colMap.location, strValues[2] || ''),
                    category: getVal(colMap.category) || config.categories[0]?.value || '',
                    quantity: parseInt(getVal(colMap.quantity, strValues[4] || '1')) || 1,
                    quantityNeeded: parseInt(getVal(colMap.quantityNeeded, '0')) || 0,
                    quantityUnneeded: parseInt(getVal(colMap.quantityUnneeded, '0')) || 0,
                    price: parseFloat(getVal(colMap.price, '0')) || null,
                    action: getVal(colMap.action, '') || getVal(colMap.observaciones, ''),
                    zonaOrigen: colMap.zona >= 0 ? getVal(colMap.zona) || null : null,
                    extra: {}
                };
                // S1: All items are innecesario by nature, set default decision
                if (sStep === 1) {
                    item.quantityUnneeded = item.quantity;
                    item.quantityNeeded = 0;
                    if (colMap.estado >= 0) item.extra['estado'] = getVal(colMap.estado);
                    if (colMap.frecuenciaUso >= 0) item.extra['frecuenciaUso'] = getVal(colMap.frecuenciaUso);
                    // Map classification/decision columns
                    const decisionVal = getVal(colMap.category) || getVal(colMap.action, '');
                    if (decisionVal) {
                        const lower = decisionVal.toLowerCase();
                        if (lower.includes('jaula') || lower.includes('red') || lower.includes('etiqueta')) {
                            item.extra['decision'] = 'Jaula';
                        } else if (lower.includes('tirar') || lower.includes('residuo') || lower.includes('basura')) {
                            item.extra['decision'] = 'Tirar';
                        } else if (lower.includes('elimin')) {
                            item.extra['decision'] = 'Eliminar';
                        } else {
                            item.extra['decision'] = 'Jaula'; // Default for S1
                        }
                    }
                    if (!item.extra['decision']) item.extra['decision'] = 'Jaula';
                } else if (sStep === 2) {
                    if (colMap.ubicacionAsignada >= 0) item.extra['ubicacionAsignada'] = getVal(colMap.ubicacionAsignada);
                    if (colMap.metodoIdentificacion >= 0) item.extra['metodoIdentificacion'] = getVal(colMap.metodoIdentificacion);
                    if (colMap.cercania >= 0) item.extra['cercania'] = getVal(colMap.cercania);
                    if (colMap.frecuenciaUso >= 0) item.extra['frecuenciaUso'] = getVal(colMap.frecuenciaUso);
                } else if (sStep === 3) {
                    if (colMap.nivel >= 0) item.extra['nivel'] = getVal(colMap.nivel);
                    if (colMap.fuente >= 0) item.extra['fuente'] = getVal(colMap.fuente);
                    if (colMap.metodoLimpieza >= 0) item.extra['metodoLimpieza'] = getVal(colMap.metodoLimpieza);
                    if (colMap.frecuenciaLimpieza >= 0) item.extra['frecuenciaLimpieza'] = getVal(colMap.frecuenciaLimpieza);
                } else if (sStep === 4) {
                    if (colMap.estado >= 0) item.extra['estadoEstandar'] = getVal(colMap.estado);
                    if (colMap.documentado >= 0) item.extra['documentado'] = getVal(colMap.documentado);
                    if (colMap.cumplimiento >= 0) item.extra['cumplimiento'] = getVal(colMap.cumplimiento);
                } else if (sStep === 5) {
                    if (colMap.frecuenciaUso >= 0) item.extra['frecuencia'] = getVal(colMap.frecuenciaUso);
                    if (colMap.nivel >= 0) item.extra['practica'] = getVal(colMap.nivel);
                }
                // Also check config.extraFields for any remaining fields
                config.extraFields.forEach((field)=>{
                    if (item.extra[field.key]) return; // Already mapped above
                    const val = getVal(findCol(headerRow, field.label.toLowerCase()), '');
                    if (val) {
                        item.extra[field.key] = val;
                    }
                });
                // Skip items with no name
                if (!item.name) continue;
                parsedItems.push(item);
            }
            if (parsedItems.length > 0) {
                setCsvPreview(parsedItems);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info(`${parsedItems.length} elementos encontrados. Revisa y confirma la importación.`);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('No se encontraron elementos válidos en el archivo. Asegúrate de rellenar las filas con datos.');
            }
        } catch (error) {
            console.error('Error parsing file:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error al procesar el archivo. Verifica el formato.');
        }
        // Reset file input
        e.target.value = '';
    };
    const handleConfirmCsvImport = async ()=>{
        if (!csvPreview || csvPreview.length === 0) return;
        if (!currentProject?.id) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('No hay proyecto seleccionado.');
            return;
        }
        setIsImporting(true);
        try {
            const res = await fetch('/api/inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(csvPreview.map((item)=>({
                        sStep,
                        projectId: currentProject.id,
                        zoneId: currentZone?.id || null,
                        name: item.name,
                        location: item.location,
                        category: item.category || config.categories[0]?.value || '',
                        quantity: item.quantity || 1,
                        quantityNeeded: sStep === 1 ? item.category === 'necesario' ? item.quantityNeeded || item.quantity || 1 : 0 : item.quantityNeeded || 0,
                        quantityUnneeded: sStep === 1 ? item.category === 'innecesario' ? item.quantityUnneeded || item.quantity || 1 : 0 : item.quantityUnneeded || 0,
                        price: item.price || null,
                        action: item.action || '',
                        extra: item.extra || {},
                        // Only Jaula decision items get jaula entry/quarantine; Eliminar/Tirar go to Residuo directly
                        jaulaStatus: sStep === 1 && item.category === 'innecesario' && item.extra?.decision !== 'Eliminar' && item.extra?.decision !== 'Tirar' ? 'en_jaula' : '',
                        jaulaFechaEntrada: sStep === 1 && item.category === 'innecesario' && item.extra?.decision !== 'Eliminar' && item.extra?.decision !== 'Tirar' ? new Date().toISOString() : null,
                        jaulaOrigen: sStep === 1 && item.category === 'innecesario' && item.extra?.decision !== 'Eliminar' && item.extra?.decision !== 'Tirar' ? item.zonaOrigen || currentZone?.name || currentProject.name || '' : null,
                        zonaOrigen: item.zonaOrigen || currentZone?.name || null,
                        zonaDestino: sStep === 1 && item.category === 'innecesario' ? item.extra?.decision === 'Tirar' || item.extra?.decision === 'Eliminar' ? 'Residuo' : 'Jaula' : item.zonaOrigen || currentZone?.name || null
                    })))
            });
            const json = await res.json();
            if (json.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`${csvPreview.length} elementos importados correctamente`);
                setCsvPreview(null);
                await loadInventory();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Error al importar CSV: ${json.error || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error importing CSV:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error de conexión al importar CSV');
        } finally{
            setIsImporting(false);
        }
    };
    const handleDeleteItem = async (id)=>{
        try {
            const res = await fetch(`/api/inventory?id=${id}`, {
                method: 'DELETE'
            });
            const json = await res.json();
            if (json.success) {
                setItems((prev)=>prev.filter((item)=>item.id !== id));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Elemento eliminado');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Error al eliminar: ${json.error || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error de conexión al eliminar');
        }
    };
    const handleUpdateJaula = async (id, updates)=>{
        try {
            const res = await fetch(`/api/inventory?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updates)
            });
            const json = await res.json();
            if (json.success) {
                await loadInventory();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Error al actualizar: ${json.error || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error updating jaula:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error de conexión al actualizar');
        }
    };
    // Helper: update an extra field on an item and persist
    const handleUpdateExtra = async (itemId, key, value)=>{
        const item = items.find((i)=>i.id === itemId);
        if (!item) return;
        const newExtra = {
            ...item.extra || {}
        };
        if (value === '_clear_') {
            delete newExtra[key];
        } else {
            newExtra[key] = value;
        }
        // Optimistic local update
        setItems((prev)=>prev.map((it)=>it.id === itemId ? {
                    ...it,
                    extra: newExtra
                } : it));
        try {
            await fetch(`/api/inventory?id=${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    extra: newExtra
                })
            });
        } catch (e) {
            console.error('Error updating extra field:', e);
        }
    };
    // Helper: update a simple field on an item and persist
    const handleUpdateField = async (itemId, field, value)=>{
        const cleanValue = value === '_clear_' ? null : value;
        setItems((prev)=>prev.map((it)=>it.id === itemId ? {
                    ...it,
                    [field]: cleanValue
                } : it));
        try {
            await fetch(`/api/inventory?id=${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    [field]: cleanValue
                })
            });
        } catch (e) {
            console.error('Error updating field:', e);
        }
    };
    // Count classified items
    const classifiedCount = items.filter((i)=>i.category && i.category !== '').length;
    const classifyPercent = items.length > 0 ? Math.round(classifiedCount / items.length * 100) : 0;
    // For S2, S3, S4: layout must be uploaded AND classification threshold met
    const needsLayout = sStep === 2 || sStep === 3 || sStep === 4;
    // S1: No minimum percentage required — just need at least 1 item. If step 4 goes bad, it means not everything was eliminated.
    // S2-S5: Must meet classification threshold (80%)
    const canComplete = sStep === 1 ? items.length > 0 && classifiedCount > 0 : classifyPercent >= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INVENTORY_CLASSIFY_THRESHOLD"] && items.length > 0 && (!needsLayout || layoutUploaded);
    // S1 specific counts: split by category
    const innecesarios = sStep === 1 ? items.filter((i)=>i.category === 'innecesario') : items.filter((i)=>i.category === 'innecesario');
    const necesarios = sStep === 1 ? items.filter((i)=>i.category === 'necesario') : [];
    const jaulaItems = items.filter((i)=>i.jaulaStatus === 'en_jaula');
    const totalJaulaValue = jaulaItems.reduce((sum, i)=>sum + (i.price || 0) * i.quantity, 0);
    const handleComplete = async ()=>{
        if (!canComplete) return;
        // Extra guard: check layout for S2/S3/S4
        if (needsLayout && !layoutUploaded) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Debes dibujar o subir un layout antes de completar este paso');
            return;
        }
        try {
            const res = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=${miniStep}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: true,
                    score: classifyPercent,
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
            console.error('Error completing inventory:', error);
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
    const handleSkipMissingTemplate = async ()=>{
        try {
            const res = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=${miniStep}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: true,
                    score: 100,
                    notes: 'Paso sin plantilla - sin plantilla configurada',
                    projectId: currentProject?.id,
                    zoneId: currentZone?.id || null,
                    skipMissingTemplate: true
                })
            });
            const json = await res.json();
            if (json.success) {
                await fetchProgress();
                onClose();
            }
        } catch (error) {
            console.error('Error skip missing template:', error);
        }
    };
    const handleExport = ()=>{
        const extraHeaders = config.extraFields.map((f)=>f.label);
        const headerRow = [
            'Nombre',
            'Ubicación',
            'Categoría',
            'Total exist.',
            'Necesarios',
            'Innecesarios',
            'Precio (€)',
            ...extraHeaders,
            'Acción'
        ].join(',');
        const rows = items.map((item)=>{
            const extraValues = config.extraFields.map((f)=>{
                const val = item.extra?.[f.key] ?? '';
                return String(val).replace(/,/g, ';');
            });
            const priceStr = item.price != null ? item.price.toFixed(2) : '';
            return [
                item.name,
                item.location,
                item.category,
                item.quantity,
                item.quantityNeeded,
                item.quantityUnneeded,
                priceStr,
                ...extraValues,
                item.action
            ].join(',');
        });
        const csvContent = [
            headerRow,
            ...rows
        ].join('\n');
        const blob = new Blob([
            csvContent
        ], {
            type: 'text/csv;charset=utf-8;'
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `inventario_s${sStep}_${sStepData?.japaneseName?.toLowerCase()}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };
    const getCategoryBadge = (category)=>{
        const cat = config.categories.find((c)=>c.value === category);
        if (!cat) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
            variant: "secondary",
            children: category
        }, void 0, false, {
            fileName: "[project]/src/components/5s/InventarioModal.tsx",
            lineNumber: 1231,
            columnNumber: 22
        }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
            className: cat.color,
            children: cat.label
        }, void 0, false, {
            fileName: "[project]/src/components/5s/InventarioModal.tsx",
            lineNumber: 1232,
            columnNumber: 12
        }, this);
    };
    const getExtraValue = (item, fieldKey)=>{
        return item.extra?.[fieldKey] ?? '';
    };
    const getJaulaStatusBadge = (status)=>{
        const map = {
            '': {
                label: '—',
                color: 'bg-gray-50 text-gray-400'
            },
            en_jaula: {
                label: 'En Jaula',
                color: 'bg-red-100 text-red-800'
            },
            reclamado: {
                label: 'Reclamado',
                color: 'bg-amber-100 text-amber-800'
            },
            transferido: {
                label: 'Transferido',
                color: 'bg-green-100 text-green-800'
            }
        };
        const info = map[status] || map[''];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
            className: info.color,
            children: info.label
        }, void 0, false, {
            fileName: "[project]/src/components/5s/InventarioModal.tsx",
            lineNumber: 1247,
            columnNumber: 12
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: open,
                onOpenChange: ()=>onClose(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    size: isFullscreen ? "fullscreen" : "xl",
                    className: "flex flex-col overflow-hidden p-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            className: "px-6 pt-6 pb-2 flex-shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"], {
                                        className: "h-5 w-5",
                                        style: {
                                            color: sStepData?.color
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1256,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: config.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1257,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        style: {
                                            borderColor: sStepData?.color,
                                            color: sStepData?.color
                                        },
                                        children: sStepData?.japaneseName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1258,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsFullscreen(!isFullscreen),
                                        className: "ml-auto p-1 rounded hover:bg-muted transition-colors",
                                        title: isFullscreen ? "Reducir ventana" : "Pantalla completa",
                                        children: isFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                            className: "h-4 w-4 text-muted-foreground"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                            lineNumber: 1266,
                                            columnNumber: 31
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                            className: "h-4 w-4 text-muted-foreground"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                            lineNumber: 1266,
                                            columnNumber: 89
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1261,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                lineNumber: 1255,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                            lineNumber: 1254,
                            columnNumber: 9
                        }, this),
                        canSkipSteps && !isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-6 flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-lg flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-amber-700 font-medium",
                                    children: "Modo Admin:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                    lineNumber: 1273,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    size: "sm",
                                    className: "text-xs border-amber-300 text-amber-700 hover:bg-amber-100",
                                    onClick: handleAdminSkip,
                                    children: "Completar paso sin inventario"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                    lineNumber: 1274,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                            lineNumber: 1272,
                            columnNumber: 11
                        }, this),
                        isReadOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 p-2 mx-6 flex-shrink-0 bg-blue-50 border border-blue-200 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-blue-700 font-medium",
                                children: [
                                    "Solo lectura: ",
                                    canSkipSteps ? 'Activa el candado para poder realizar pasos.' : 'Puedes ver pero no modificar.'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                lineNumber: 1287,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                            lineNumber: 1286,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto px-6 pb-6 min-h-0",
                            children: hasTemplate === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center py-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "h-8 w-8 text-green-500 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1294,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-3 text-muted-foreground",
                                        children: "Cargando plantilla..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1295,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                lineNumber: 1293,
                                columnNumber: 11
                            }, this) : hasTemplate === false ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-16",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"], {
                                        className: "h-16 w-16 text-gray-300 mx-auto mb-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1299,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-gray-500 mb-2",
                                        children: "Sin plantilla configurada"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1300,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground max-w-md mx-auto",
                                        children: [
                                            "El administrador no ha configurado ninguna plantilla de inventario para S",
                                            sStep,
                                            " (",
                                            sStepData?.japaneseName,
                                            ") en el Paso 3. Puedes pasar este paso y completarlo más tarde."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1301,
                                        columnNumber: 13
                                    }, this),
                                    !isReadOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "mt-4",
                                        onClick: handleSkipMissingTemplate,
                                        children: "Pasar sin plantilla"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1306,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                lineNumber: 1298,
                                columnNumber: 11
                            }, this) : isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        className: "h-16 w-16 text-green-500 mx-auto mb-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1313,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold mb-2",
                                        children: "¡Inventario Completado!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1314,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground",
                                        children: [
                                            "Se han clasificado ",
                                            classifiedCount,
                                            " de ",
                                            items.length,
                                            " elementos (",
                                            classifyPercent,
                                            "%)."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1315,
                                        columnNumber: 13
                                    }, this),
                                    sStep === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 flex justify-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-red-600",
                                                children: [
                                                    "Innecesarios: ",
                                                    innecesarios.length
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                lineNumber: 1320,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-green-600",
                                                children: [
                                                    "Necesarios: ",
                                                    necesarios.length
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                lineNumber: 1321,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1319,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                lineNumber: 1312,
                                columnNumber: 11
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 rounded-lg border-l-4",
                                        style: {
                                            borderColor: sStepData?.color,
                                            backgroundColor: `${sStepData?.color}08`
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium",
                                            style: {
                                                color: sStepData?.color
                                            },
                                            children: config.subtitle
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                            lineNumber: 1329,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1328,
                                        columnNumber: 13
                                    }, this),
                                    step2Photos.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "border-2 border-purple-200 bg-purple-50/30",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                            className: "p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                            className: "h-5 w-5 text-purple-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1339,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-semibold text-purple-800",
                                                            children: [
                                                                "Fotos del Paso 2 (",
                                                                sStepData?.japaneseName,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1340,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                            className: "bg-purple-100 text-purple-800",
                                                            children: [
                                                                step2Photos.length,
                                                                " fotos"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1341,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 1338,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground mb-3",
                                                    children: "Estas fotos se tomaron en el paso de Fotos. Puedes vincularlas a elementos del inventario para mayor trazabilidad."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 1343,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto",
                                                    children: step2Photos.map((photo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative group border rounded-lg overflow-hidden bg-white",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: photo.photoUrl,
                                                                    alt: photo.title,
                                                                    className: "w-full h-24 object-cover cursor-pointer hover:opacity-80 transition-opacity",
                                                                    onClick: ()=>setShowPhotoLightbox(photo)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 1349,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "px-1.5 py-1 flex items-center justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                            className: `text-[9px] px-1 py-0 ${photo.photoType === 'antes' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`,
                                                                            children: photo.photoType === 'antes' ? 'Antes' : 'Después'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 1356,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            className: "text-[9px] text-purple-600 hover:text-purple-800 font-medium flex items-center gap-0.5",
                                                                            onClick: ()=>{
                                                                                // If there are items, open a quick selector
                                                                                if (items.length > 0 && items[0]?.id) {
                                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('Haz clic en el botón 📷 de un elemento del inventario para vincular esta foto');
                                                                                }
                                                                            },
                                                                            title: "Vincular a un elemento",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                                                                    className: "h-2.5 w-2.5"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 1369,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                " Vincular"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 1359,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 1355,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, photo.id, true, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1348,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 1346,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                            lineNumber: 1337,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1336,
                                        columnNumber: 15
                                    }, this),
                                    (sStep === 2 || sStep === 3 || sStep === 4) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "border-2 border-blue-200 bg-blue-50/30",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                            className: "p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__["PenTool"], {
                                                            className: "h-5 w-5 text-blue-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1384,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-semibold text-blue-800",
                                                            children: sStep === 2 ? 'Layout de la Zona — Marcado de Suelo' : sStep === 3 ? 'Layout de la Zona — Puntos de Limpieza' : 'Layout de la Zona — Estándares Implantados'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1385,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                            className: layoutUploaded ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800',
                                                            children: layoutUploaded ? 'Layout adjuntado' : 'Pendiente'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1390,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 1383,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground mb-3",
                                                    children: sStep === 2 ? 'Dibuja o sube el layout de la zona con el marcado de suelo según el estándar de colores. Esto es obligatorio para completar el paso 3 de S2 (Seiton).' : sStep === 3 ? 'Dibuja o sube el layout de la zona indicando los puntos de suciedad y las zonas de limpieza. Esto forma parte del inventario de S3 (Seiso).' : 'Dibuja o sube el layout de la zona con los estándares implantados señalados. Esto forma parte del inventario de S4 (Seiketsu).'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 1394,
                                                    columnNumber: 19
                                                }, this),
                                                !isReadOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                            size: "sm",
                                                            onClick: ()=>setShowLayoutEditor(true),
                                                            className: "gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs h-8",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__["PenTool"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 1407,
                                                                    columnNumber: 25
                                                                }, this),
                                                                " Dibujar Layout"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1405,
                                                            columnNumber: 23
                                                        }, this),
                                                        sStep === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            size: "sm",
                                                            onClick: ()=>setShowColorCodeTable(true),
                                                            className: "gap-1 text-xs h-8 border-yellow-400 text-yellow-700 hover:bg-yellow-50",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 1412,
                                                                    columnNumber: 27
                                                                }, this),
                                                                " Ver Estándar Colores"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1410,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                    variant: "outline",
                                                                    size: "sm",
                                                                    className: "gap-1 text-xs h-8 border-green-400 text-green-700 hover:bg-green-50",
                                                                    onClick: ()=>document.getElementById('layout-upload-s2')?.click(),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 1419,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        " Subir Imagen/Croquis"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 1416,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    id: "layout-upload-s2",
                                                                    type: "file",
                                                                    accept: "image/*",
                                                                    className: "hidden",
                                                                    onChange: handleUploadLayoutImage
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 1421,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1415,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 1404,
                                                    columnNumber: 21
                                                }, this),
                                                savedLayouts.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
                                                    children: savedLayouts.map((layout)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border rounded-lg overflow-hidden bg-white",
                                                            children: [
                                                                layout.photoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: layout.photoUrl,
                                                                    alt: layout.title,
                                                                    className: "w-full h-32 object-cover cursor-pointer hover:opacity-80 transition-opacity",
                                                                    onClick: ()=>window.open(layout.photoUrl, '_blank')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 1433,
                                                                    columnNumber: 29
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-xs",
                                                                    children: "Sin imagen"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 1437,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "px-2 py-1.5 flex items-center justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] font-medium truncate",
                                                                            children: layout.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 1442,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[9px] text-muted-foreground",
                                                                            children: new Date(layout.createdAt).toLocaleDateString('es-ES')
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 1443,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 1441,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, layout.id, true, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1431,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 1429,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center py-6 bg-white rounded-lg border border-dashed border-blue-300",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__["PenTool"], {
                                                            className: "h-8 w-8 text-blue-300 mx-auto mb-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1452,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: "No hay layout adjuntado"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1453,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] text-muted-foreground mt-0.5",
                                                            children: "Dibuja o sube el layout de la zona"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1454,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 1451,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                            lineNumber: 1382,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1381,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between p-3 bg-muted rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium",
                                                        children: "Clasificación"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                        lineNumber: 1464,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground",
                                                        children: [
                                                            classifiedCount,
                                                            "/",
                                                            items.length,
                                                            " clasificados"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                        lineNumber: 1465,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                lineNumber: 1463,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: canComplete ? 'default' : 'secondary',
                                                children: [
                                                    classifyPercent,
                                                    "%",
                                                    sStep !== 1 ? ` (mín. ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INVENTORY_CLASSIFY_THRESHOLD"]}%)` : ''
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                lineNumber: 1469,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1462,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 flex-wrap items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                size: "sm",
                                                onClick: handleImportTemplate,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        className: "h-4 w-4 mr-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                        lineNumber: 1477,
                                                        columnNumber: 17
                                                    }, this),
                                                    " Importar Plantilla"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                lineNumber: 1476,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                size: "sm",
                                                onClick: handleExport,
                                                disabled: items.length === 0,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                        className: "h-4 w-4 mr-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                        lineNumber: 1480,
                                                        columnNumber: 17
                                                    }, this),
                                                    " Exportar CSV"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                lineNumber: 1479,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__["FileUp"], {
                                                        className: "h-4 w-4 mr-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                        lineNumber: 1484,
                                                        columnNumber: 17
                                                    }, this),
                                                    " Importar Archivo",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "file",
                                                        accept: ".csv,.xlsx,.xls",
                                                        className: "hidden",
                                                        onChange: handleFileImport
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                        lineNumber: 1485,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                lineNumber: 1483,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `/templates/${config.templateName}`,
                                                download: true,
                                                className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__["FileSpreadsheet"], {
                                                        className: "h-4 w-4 mr-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                        lineNumber: 1497,
                                                        columnNumber: 17
                                                    }, this),
                                                    " Descargar Plantilla Excel"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                lineNumber: 1492,
                                                columnNumber: 15
                                            }, this),
                                            sStep === 1 && items.length > 0 && (()=>{
                                                // Helper: compute revision date = entry date + diasCuarentena (default 40)
                                                const withRevision = (i)=>{
                                                    let fechaRevision = null;
                                                    const dias = Number(i.extra?.diasCuarentena ?? 40);
                                                    if (i.jaulaFechaEntrada) {
                                                        try {
                                                            const d = new Date(i.jaulaFechaEntrada);
                                                            d.setDate(d.getDate() + dias);
                                                            fechaRevision = d.toISOString();
                                                        } catch  {}
                                                    }
                                                    return fechaRevision;
                                                };
                                                // Only Jaula decision items get a red tag (Eliminar/Tirar go to Residuo directly, no tag)
                                                const rojaItems = items.filter((i)=>i.category === 'innecesario' && (!i.extra?.decision || i.extra.decision === 'Jaula')).map((i)=>({
                                                        nombre: i.name,
                                                        ubicacion: i.location,
                                                        cantidad: i.quantityUnneeded || i.quantity,
                                                        estado: String(i.extra?.estado ?? ''),
                                                        frecuenciaUso: String(i.extra?.frecuenciaUso ?? ''),
                                                        decision: 'Jaula',
                                                        categoria: String(i.category ?? 'Innecesario'),
                                                        fechaEntrada: i.jaulaFechaEntrada,
                                                        fechaRevision: withRevision(i),
                                                        diasCuarentena: Number(i.extra?.diasCuarentena ?? 40),
                                                        zonaOrigen: i.zonaOrigen || i.jaulaOrigen
                                                    }));
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 ml-2 pl-2 border-l border-red-300",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-muted-foreground font-medium",
                                                            children: "Etiquetas:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1532,
                                                            columnNumber: 21
                                                        }, this),
                                                        rojaItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$5s$2f$TagPrinter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            items: rojaItems
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1534,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 1531,
                                                    columnNumber: 19
                                                }, this);
                                            })()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1475,
                                        columnNumber: 13
                                    }, this),
                                    csvPreview && csvPreview.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "border-2 border-blue-200 bg-blue-50/30",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                            className: "p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__["FileUp"], {
                                                                    className: "h-5 w-5 text-blue-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 1547,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-semibold text-blue-800",
                                                                    children: "Vista Previa de Importación"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 1548,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    className: "bg-blue-200 text-blue-900",
                                                                    children: [
                                                                        csvPreview.length,
                                                                        " elementos"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 1549,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1546,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                    variant: "outline",
                                                                    size: "sm",
                                                                    className: "text-xs",
                                                                    onClick: ()=>setCsvPreview(null),
                                                                    children: "Cancelar"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 1552,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                    size: "sm",
                                                                    className: "text-xs bg-blue-600 hover:bg-blue-700",
                                                                    onClick: handleConfirmCsvImport,
                                                                    disabled: isImporting,
                                                                    children: isImporting ? 'Importando...' : `Confirmar Importación (${csvPreview.length})`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 1560,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1551,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 1545,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "max-h-48 overflow-y-auto rounded-lg border",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Table"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHeader"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                            className: "text-xs",
                                                                            children: "Elemento"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 1574,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                            className: "text-xs",
                                                                            children: "Ubicación"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 1575,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                            className: "text-xs",
                                                                            children: "Categoría"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 1576,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                            className: "text-xs",
                                                                            children: "Cant."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 1577,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                            className: "text-xs",
                                                                            children: "Precio"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 1578,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 1573,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1572,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                                                children: csvPreview.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                className: "text-xs font-medium",
                                                                                children: item.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1584,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                className: "text-xs",
                                                                                children: item.location
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1585,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                className: "text-xs",
                                                                                children: item.category
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1586,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                className: "text-xs text-center",
                                                                                children: item.quantity
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1587,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                className: "text-xs text-right",
                                                                                children: item.price ? `${item.price.toFixed(2)} €` : '—'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1588,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, idx, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1583,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1581,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                        lineNumber: 1571,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 1570,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                            lineNumber: 1544,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1543,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                            className: "p-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 gap-3 items-end sm:grid-cols-5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "sm:col-span-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-medium",
                                                                        children: "Elemento *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1605,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        placeholder: "Nombre del elemento",
                                                                        value: newItem.name,
                                                                        onChange: (e)=>setNewItem((prev)=>({
                                                                                    ...prev,
                                                                                    name: e.target.value
                                                                                }))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1606,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1604,
                                                                columnNumber: 21
                                                            }, this),
                                                            sStep === 1 ? /* S1: Zona is pre-filled from current zone, read-only */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-medium flex items-center gap-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                                className: "h-3 w-3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1616,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            "Zona"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1615,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        value: currentZone?.name || newItem.zonaOrigen || 'Sin zona',
                                                                        readOnly: true,
                                                                        className: "bg-gray-50 text-gray-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1619,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1614,
                                                                columnNumber: 23
                                                            }, this) : /* Non-S1: Zona selectable */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-medium flex items-center gap-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                                className: "h-3 w-3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1629,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            "Zona"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1628,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    currentProject?.zones && currentProject.zones.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                        value: newItem.zonaOrigen || currentZone?.name || undefined,
                                                                        onValueChange: (val)=>setNewItem((prev)=>({
                                                                                    ...prev,
                                                                                    zonaOrigen: val
                                                                                })),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                    placeholder: "Seleccionar zona"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 1638,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1637,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                children: currentProject.zones.map((z)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: z.name,
                                                                                        children: z.name
                                                                                    }, z.id, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 1642,
                                                                                        columnNumber: 33
                                                                                    }, this))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1640,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1633,
                                                                        columnNumber: 27
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        placeholder: "Zona",
                                                                        value: newItem.zonaOrigen || currentZone?.name || '',
                                                                        onChange: (e)=>setNewItem((prev)=>({
                                                                                    ...prev,
                                                                                    zonaOrigen: e.target.value
                                                                                }))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1647,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1627,
                                                                columnNumber: 23
                                                            }, this),
                                                            sStep === 1 ? /* S1: Category is innecesario by default, shown as read-only badge */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-medium",
                                                                        children: "Categoría"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1658,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-9 flex items-center px-3 rounded-md border bg-red-50 text-red-700 text-sm font-medium",
                                                                        children: "Innecesario"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1659,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1657,
                                                                columnNumber: 23
                                                            }, this) : /* Non-S1: Category selectable */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-medium",
                                                                        children: "Categoría *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1666,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                        value: newItem.category || undefined,
                                                                        onValueChange: (val)=>setNewItem((prev)=>({
                                                                                    ...prev,
                                                                                    category: val,
                                                                                    extra: {
                                                                                        ...prev.extra || {},
                                                                                        subcategoria: ''
                                                                                    }
                                                                                })),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                    placeholder: "Categoría"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 1672,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1671,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                children: config.categories.filter((cat)=>cat.value && cat.value.trim() !== '').map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: cat.value,
                                                                                        children: cat.label
                                                                                    }, cat.value, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 1676,
                                                                                        columnNumber: 31
                                                                                    }, this))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1674,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1667,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1665,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-medium",
                                                                        children: sStep === 1 ? 'Cantidad' : 'Total exist.'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1685,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        type: "number",
                                                                        min: "1",
                                                                        value: newItem.quantity || 1,
                                                                        onChange: (e)=>setNewItem((prev)=>({
                                                                                    ...prev,
                                                                                    quantity: parseInt(e.target.value) || 1
                                                                                }))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1686,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1684,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-medium",
                                                                        children: "Precio (€)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1694,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        type: "number",
                                                                        min: "0",
                                                                        step: "0.01",
                                                                        placeholder: "0.00",
                                                                        value: newItem.price ?? '',
                                                                        onChange: (e)=>setNewItem((prev)=>({
                                                                                    ...prev,
                                                                                    price: e.target.value ? parseFloat(e.target.value) : null
                                                                                }))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1695,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1693,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                        lineNumber: 1603,
                                                        columnNumber: 19
                                                    }, this),
                                                    sStep === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3 mt-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-1.5",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-2.5 w-2.5 rounded bg-red-500"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1712,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[10px] font-medium text-red-700",
                                                                                children: "Campos de Innecesario"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1713,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1711,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-1.5",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-2.5 w-2.5 rounded bg-orange-500"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1716,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[10px] font-medium text-orange-700",
                                                                                children: "Datos de Etiqueta"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1717,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1715,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1710,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-1 sm:grid-cols-3 gap-3 items-end p-2 rounded-lg border border-red-200 bg-red-50/30",
                                                                children: [
                                                                    [
                                                                        'estado',
                                                                        'frecuenciaUso',
                                                                        'decision'
                                                                    ].map((key)=>{
                                                                        const field = config.extraFields.find((f)=>f.key === key);
                                                                        if (!field) return null;
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "text-xs font-medium text-red-700",
                                                                                    children: field.label
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 1728,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                field.type === 'select' && field.options ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                                    value: newItem.extra?.[field.key] ? String(newItem.extra[field.key]) : undefined,
                                                                                    onValueChange: (val)=>setNewItem((prev)=>{
                                                                                            const updated = {
                                                                                                ...prev,
                                                                                                extra: {
                                                                                                    ...prev.extra || {},
                                                                                                    [field.key]: val
                                                                                                }
                                                                                            };
                                                                                            // If decision is Eliminar/Tirar: clear quarantine/entry fields
                                                                                            if (field.key === 'decision' && (val === 'Eliminar' || val === 'Tirar')) {
                                                                                                updated.jaulaFechaEntrada = null;
                                                                                                delete updated.extra.diasCuarentena;
                                                                                            }
                                                                                            // If decision is Jaula: set default entry date and quarantine
                                                                                            if (field.key === 'decision' && val === 'Jaula') {
                                                                                                if (!updated.jaulaFechaEntrada) updated.jaulaFechaEntrada = new Date().toISOString();
                                                                                                if (!updated.extra.diasCuarentena) updated.extra.diasCuarentena = 40;
                                                                                            }
                                                                                            return updated;
                                                                                        }),
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                                placeholder: field.label
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                                lineNumber: 1750,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                            lineNumber: 1749,
                                                                                            columnNumber: 35
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                            children: field.options.filter((opt)=>opt && opt.trim() !== '').map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                    value: opt,
                                                                                                    children: opt
                                                                                                }, opt, false, {
                                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                                    lineNumber: 1754,
                                                                                                    columnNumber: 39
                                                                                                }, this))
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                            lineNumber: 1752,
                                                                                            columnNumber: 35
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 1730,
                                                                                    columnNumber: 33
                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                                    placeholder: field.label,
                                                                                    value: String(newItem.extra?.[field.key] ?? ''),
                                                                                    onChange: (e)=>setNewItem((prev)=>({
                                                                                                ...prev,
                                                                                                extra: {
                                                                                                    ...prev.extra || {},
                                                                                                    [field.key]: e.target.value
                                                                                                }
                                                                                            }))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 1759,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, field.key, true, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 1727,
                                                                            columnNumber: 29
                                                                        }, this);
                                                                    }),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "col-span-full flex items-center gap-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "w-2 h-2 rounded-full bg-red-400"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1774,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[9px] text-red-600 font-medium",
                                                                                children: newItem.extra?.decision === 'Eliminar' || newItem.extra?.decision === 'Tirar' ? `Decisión: ${newItem.extra.decision} → va a Residuo (sin etiqueta, sin cuarentena)` : 'Decisión: Jaula → etiqueta roja con cuarentena'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1775,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1773,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1722,
                                                                columnNumber: 23
                                                            }, this),
                                                            (!newItem.extra?.decision || newItem.extra.decision === 'Jaula') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-1 sm:grid-cols-4 gap-3 items-end p-2 rounded-lg border border-orange-200 bg-orange-50/30",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-xs font-medium text-orange-700 flex items-center gap-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                                                        className: "h-3 w-3"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 1788,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    "F. Entrada"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1787,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                                type: "date",
                                                                                value: newItem.jaulaFechaEntrada ? new Date(newItem.jaulaFechaEntrada).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                                                                                onChange: (e)=>{
                                                                                    const val = e.target.value ? new Date(e.target.value + 'T12:00:00').toISOString() : null;
                                                                                    setNewItem((prev)=>({
                                                                                            ...prev,
                                                                                            jaulaFechaEntrada: val
                                                                                        }));
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1791,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1786,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-xs font-medium text-orange-700 flex items-center gap-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                                                        className: "h-3 w-3"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 1802,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    "Días cuarentena"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1801,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                                value: String(newItem.extra?.diasCuarentena ?? 40),
                                                                                onValueChange: (val)=>setNewItem((prev)=>({
                                                                                            ...prev,
                                                                                            extra: {
                                                                                                ...prev.extra || {},
                                                                                                diasCuarentena: parseInt(val) || 40
                                                                                            }
                                                                                        })),
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                            lineNumber: 1815,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 1814,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                        children: [
                                                                                            7,
                                                                                            15,
                                                                                            20,
                                                                                            30,
                                                                                            40,
                                                                                            60,
                                                                                            90
                                                                                        ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                value: String(d),
                                                                                                children: [
                                                                                                    d,
                                                                                                    " días"
                                                                                                ]
                                                                                            }, d, true, {
                                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                                lineNumber: 1819,
                                                                                                columnNumber: 33
                                                                                            }, this))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 1817,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1805,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1800,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-xs font-medium text-orange-700 flex items-center gap-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                                                        className: "h-3 w-3"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 1826,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    "F. Revisión"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1825,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                                type: "date",
                                                                                value: (()=>{
                                                                                    const base = newItem.jaulaFechaEntrada || new Date().toISOString();
                                                                                    const dias = Number(newItem.extra?.diasCuarentena ?? 40);
                                                                                    try {
                                                                                        const d = new Date(base);
                                                                                        d.setDate(d.getDate() + dias);
                                                                                        return d.toISOString().split('T')[0];
                                                                                    } catch  {
                                                                                        return '';
                                                                                    }
                                                                                })(),
                                                                                readOnly: true,
                                                                                className: "bg-orange-50"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1829,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1824,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-end",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "w-2 h-2 rounded-full bg-orange-500"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 1846,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[9px] text-orange-600 font-medium",
                                                                                    children: "Datos para etiqueta roja"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 1847,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 1845,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1844,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1785,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true) : /* Non-S1: Original extra fields */ config.extraFields.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 sm:grid-cols-3 gap-3 items-end",
                                                        children: config.extraFields.map((field)=>{
                                                            // Dynamic subcategoria: filter options based on selected category
                                                            let effectiveOptions = field.type === 'select' ? field.options : undefined;
                                                            if (field.key === 'subcategoria' && config.desplegables_jerarquicos) {
                                                                const selectedCat = newItem.category;
                                                                if (selectedCat) {
                                                                    const catLabel = config.categories.find((c)=>c.value === selectedCat)?.label;
                                                                    const hierEntry = catLabel && config.desplegables_jerarquicos[catLabel] ? config.desplegables_jerarquicos[catLabel] : config.desplegables_jerarquicos[selectedCat];
                                                                    if (hierEntry) {
                                                                        effectiveOptions = hierEntry.subcategorias;
                                                                    } else {
                                                                        effectiveOptions = [];
                                                                    }
                                                                } else {
                                                                    effectiveOptions = Object.values(config.desplegables_jerarquicos).flatMap((h)=>h.subcategorias);
                                                                }
                                                            }
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-medium",
                                                                        children: field.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1878,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    field.type === 'select' && effectiveOptions ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                        value: newItem.extra?.[field.key] ? String(newItem.extra[field.key]) : undefined,
                                                                        onValueChange: (val)=>setNewItem((prev)=>({
                                                                                    ...prev,
                                                                                    extra: {
                                                                                        ...prev.extra || {},
                                                                                        [field.key]: val
                                                                                    }
                                                                                })),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                    placeholder: field.label
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 1890,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1889,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                children: effectiveOptions.filter((opt)=>opt && opt.trim() !== '').map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: opt,
                                                                                        children: opt
                                                                                    }, opt, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 1894,
                                                                                        columnNumber: 35
                                                                                    }, this))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1892,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1880,
                                                                        columnNumber: 29
                                                                    }, this) : field.type === 'number' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        type: "number",
                                                                        min: "0",
                                                                        max: "100",
                                                                        placeholder: field.label,
                                                                        value: newItem.extra?.[field.key] ?? '',
                                                                        onChange: (e)=>setNewItem((prev)=>({
                                                                                    ...prev,
                                                                                    extra: {
                                                                                        ...prev.extra || {},
                                                                                        [field.key]: parseInt(e.target.value) || 0
                                                                                    }
                                                                                }))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1901,
                                                                        columnNumber: 29
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        placeholder: field.label,
                                                                        value: String(newItem.extra?.[field.key] ?? ''),
                                                                        onChange: (e)=>setNewItem((prev)=>({
                                                                                    ...prev,
                                                                                    extra: {
                                                                                        ...prev.extra || {},
                                                                                        [field.key]: e.target.value
                                                                                    }
                                                                                }))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1915,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, field.key, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1877,
                                                                columnNumber: 25
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                        lineNumber: 1856,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-end items-center gap-2",
                                                        children: [
                                                            pendingNewPhoto && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5 text-xs text-muted-foreground",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-6 h-6 rounded bg-muted flex items-center justify-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 1938,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1937,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "max-w-[120px] truncate",
                                                                        children: pendingNewPhoto.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1940,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "text-destructive hover:text-red-700",
                                                                        onClick: ()=>setPendingNewPhoto(null),
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 1942,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1941,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1936,
                                                                columnNumber: 23
                                                            }, this),
                                                            !isReadOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                        value: pendingNewPhotoType,
                                                                        onValueChange: setPendingNewPhotoType,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                className: "h-7 w-20 text-[10px]",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 1950,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1949,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "antes",
                                                                                        children: "Antes"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 1953,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "despues",
                                                                                        children: "Después"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 1954,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1952,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1948,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "inline-flex items-center justify-center h-7 px-2 rounded-md border border-input bg-background text-xs cursor-pointer hover:bg-accent transition-colors gap-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                                                className: "h-3 w-3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1958,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            "Adjuntar Foto",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "file",
                                                                                accept: "image/*",
                                                                                capture: "environment",
                                                                                className: "hidden",
                                                                                onChange: (e)=>{
                                                                                    const file = e.target.files?.[0];
                                                                                    if (file) setPendingNewPhoto(file);
                                                                                    e.target.value = '';
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 1960,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1957,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1947,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                onClick: handleAddItem,
                                                                disabled: !newItem.name || !newItem.category,
                                                                size: "sm",
                                                                style: {
                                                                    backgroundColor: sStepData?.color
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                        className: "h-4 w-4 mr-1"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 1980,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    " Agregar"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 1974,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                        lineNumber: 1934,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                lineNumber: 1601,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                            lineNumber: 1600,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1599,
                                        columnNumber: 13
                                    }, this),
                                    sStep === 3 && items.some((i)=>(itemPhotos[i.id] || i.photos || []).length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "border-2 border-orange-200 bg-orange-50/30",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                            className: "p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                            className: "h-5 w-5 text-orange-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1992,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-semibold text-orange-800",
                                                            children: "Puntos de Suciedad — Fotos Antes/Después"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 1993,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 1991,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground mb-3",
                                                    children: "Las fotos vinculadas a cada punto de suciedad ayudan a documentar el estado antes y después de la limpieza."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 1995,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3 max-h-64 overflow-y-auto",
                                                    children: items.filter((i)=>(itemPhotos[i.id] || i.photos || []).length > 0).map((item)=>{
                                                        const itemPhotoList = itemPhotos[item.id] || item.photos || [];
                                                        const antesPhotos = itemPhotoList.filter((p)=>p.photoType === 'antes');
                                                        const despuesPhotos = itemPhotoList.filter((p)=>p.photoType === 'despues');
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start gap-3 p-2 rounded-lg border bg-white",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "min-w-0 flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-sm font-medium truncate",
                                                                            children: item.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2006,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-[10px] text-muted-foreground",
                                                                            children: [
                                                                                item.location || '—',
                                                                                " · ",
                                                                                item.category
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2007,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 2005,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex gap-2 flex-shrink-0",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-center",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[9px] font-medium text-amber-700 block mb-1",
                                                                                    children: "ANTES"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 2012,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                antesPhotos.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex gap-1",
                                                                                    children: antesPhotos.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                            src: p.photoUrl,
                                                                                            alt: "Antes",
                                                                                            className: "w-16 h-12 object-cover rounded border cursor-pointer hover:opacity-80",
                                                                                            onClick: ()=>setShowPhotoLightbox(p)
                                                                                        }, p.id, false, {
                                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                            lineNumber: 2016,
                                                                                            columnNumber: 37
                                                                                        }, this))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 2014,
                                                                                    columnNumber: 33
                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "w-16 h-12 bg-amber-50 border border-dashed border-amber-300 rounded flex items-center justify-center",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                                                        className: "h-3 w-3 text-amber-300"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 2021,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 2020,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2011,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-center",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[9px] font-medium text-green-700 block mb-1",
                                                                                    children: "DESPUÉS"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 2027,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                despuesPhotos.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex gap-1",
                                                                                    children: despuesPhotos.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                            src: p.photoUrl,
                                                                                            alt: "Después",
                                                                                            className: "w-16 h-12 object-cover rounded border cursor-pointer hover:opacity-80",
                                                                                            onClick: ()=>setShowPhotoLightbox(p)
                                                                                        }, p.id, false, {
                                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                            lineNumber: 2031,
                                                                                            columnNumber: 37
                                                                                        }, this))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 2029,
                                                                                    columnNumber: 33
                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "w-16 h-12 bg-green-50 border border-dashed border-green-300 rounded flex items-center justify-center",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                                                        className: "h-3 w-3 text-green-300"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 2036,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 2035,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2026,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 2009,
                                                                    columnNumber: 27
                                                                }, this),
                                                                !isReadOnly && item.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "inline-flex items-center justify-center px-2 py-1 rounded border border-dashed border-green-300 cursor-pointer hover:bg-green-50 text-[9px] text-green-600 gap-1 flex-shrink-0",
                                                                    title: "Adjuntar foto DESPUÉS",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2044,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        " Después",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "file",
                                                                            accept: "image/*",
                                                                            capture: "environment",
                                                                            className: "hidden",
                                                                            onChange: (e)=>{
                                                                                const file = e.target.files?.[0];
                                                                                if (file) handleAttachPhoto(item.id, file, 'despues');
                                                                                e.target.value = '';
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2045,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 2043,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, item.id, true, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 2004,
                                                            columnNumber: 25
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 1998,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                            lineNumber: 1990,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 1989,
                                        columnNumber: 15
                                    }, this),
                                    sStep === 1 && items.some((i)=>i.category === 'innecesario' && (itemPhotos[i.id] || i.photos || []).length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "border-2 border-red-200 bg-red-50/30",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                            className: "p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                            className: "h-5 w-5 text-red-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 2071,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-semibold text-red-800",
                                                            children: "Elementos en Jaula — Trazabilidad Fotográfica"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 2072,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 2070,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground mb-3",
                                                    children: "Las fotos de elementos innecesarios en la Jaula permiten la trazabilidad del material clasificado."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 2074,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto",
                                                    children: items.filter((i)=>i.category === 'innecesario' && (itemPhotos[i.id] || i.photos || []).length > 0).map((item)=>{
                                                        const itemPhotoList = itemPhotos[item.id] || item.photos || [];
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 p-2 rounded-lg border bg-white",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex -space-x-1",
                                                                    children: itemPhotoList.slice(0, 3).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                            src: p.photoUrl,
                                                                            alt: p.title,
                                                                            className: "w-10 h-10 object-cover rounded border-2 border-white cursor-pointer hover:opacity-80",
                                                                            onClick: ()=>setShowPhotoLightbox(p)
                                                                        }, p.id, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2084,
                                                                            columnNumber: 31
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 2082,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "min-w-0 flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs font-medium truncate",
                                                                            children: item.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2088,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-[9px] text-muted-foreground",
                                                                            children: [
                                                                                item.extra?.decision || 'Jaula',
                                                                                " · ",
                                                                                itemPhotoList.length,
                                                                                " foto",
                                                                                itemPhotoList.length !== 1 ? 's' : ''
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2089,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 2087,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, item.id, true, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 2081,
                                                            columnNumber: 25
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 2077,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                            lineNumber: 2069,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 2068,
                                        columnNumber: 15
                                    }, this),
                                    sStep === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$5s$2f$CleaningPlanPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            sStep: sStep,
                                            inventoryItems: items.map((i)=>({
                                                    name: i.name,
                                                    location: i.location,
                                                    category: i.category,
                                                    extra: i.extra ? JSON.stringify(i.extra) : null
                                                })),
                                            isReadOnly: isReadOnly
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                            lineNumber: 2104,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 2103,
                                        columnNumber: 15
                                    }, this),
                                    sStep === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$5s$2f$BibliotecaEstandaresView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                            lineNumber: 2120,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 2119,
                                        columnNumber: 15
                                    }, this),
                                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            1,
                                            2,
                                            3
                                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-10 bg-muted rounded animate-pulse"
                                            }, i, false, {
                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                lineNumber: 2128,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 2126,
                                        columnNumber: 15
                                    }, this) : items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-8 text-muted-foreground",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"], {
                                                className: "h-8 w-8 mx-auto mb-2 opacity-50"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                lineNumber: 2133,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm",
                                                children: "No hay elementos en el inventario"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                lineNumber: 2134,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs mt-1",
                                                children: "Importe una plantilla o agregue elementos manualmente"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                lineNumber: 2135,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 2132,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-80 overflow-y-auto rounded-lg border",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full text-xs border-collapse",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    className: "sticky top-0 z-10",
                                                    children: sStep === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 3,
                                                                        className: "bg-sky-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-sky-600",
                                                                        children: "IDENTIFICACIÓN"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2145,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-emerald-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-emerald-600",
                                                                        children: "CANTIDAD / VALOR"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2146,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 4,
                                                                        className: "bg-red-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-red-600",
                                                                        children: "CLASIFICACIÓN INNECESARIO"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2147,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-amber-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-amber-600",
                                                                        children: "UBICACIÓN"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2148,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-gray-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-gray-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2149,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 2144,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap",
                                                                        children: "Elemento"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2153,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap",
                                                                        children: "Ubicación"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2154,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap",
                                                                        children: "Categoría"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2155,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap",
                                                                        children: "Cantidad"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2157,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap",
                                                                        children: "Precio (€)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2158,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-red-400 text-white px-1 py-1 text-center font-semibold border border-red-400 whitespace-nowrap",
                                                                        children: "Estado"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2160,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-red-400 text-white px-1 py-1 text-center font-semibold border border-red-400 whitespace-nowrap",
                                                                        children: "Frec. uso"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2161,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-red-400 text-white px-1 py-1 text-center font-semibold border border-red-400 whitespace-nowrap",
                                                                        children: "Decisión"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2162,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-orange-400 text-white px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap",
                                                                        children: "Días cuar."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2163,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap",
                                                                        children: "Z. Origen"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2165,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap",
                                                                        children: "Z. Destino"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2166,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 whitespace-nowrap",
                                                                        children: "Fotos"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2168,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 w-8"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2169,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 2151,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true) : sStep === 2 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 3,
                                                                        className: "bg-sky-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-sky-600",
                                                                        children: "IDENTIFICACIÓN"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2175,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-emerald-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-emerald-600",
                                                                        children: "CANTIDAD / VALOR"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2176,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-blue-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-blue-600",
                                                                        children: "ORGANIZACIÓN"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2177,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-amber-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-amber-600",
                                                                        children: "UBICACIÓN"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2178,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-gray-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-gray-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2179,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 2174,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap",
                                                                        children: "Elemento"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2182,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap",
                                                                        children: "Ubicación"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2183,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap",
                                                                        children: "Categoría"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2184,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap",
                                                                        children: "Total"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2185,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap",
                                                                        children: "Precio (€)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2186,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    config.extraFields.slice(0, 2).map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "bg-blue-400 text-white px-1 py-1 text-center font-semibold border border-blue-400 whitespace-nowrap",
                                                                            children: f.label
                                                                        }, f.key, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2188,
                                                                            columnNumber: 29
                                                                        }, this)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap",
                                                                        children: "Z. Origen"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2190,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap",
                                                                        children: "Z. Destino"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2191,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 whitespace-nowrap",
                                                                        children: "Fotos"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2192,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 w-8"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2193,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 2181,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true) : sStep === 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 3,
                                                                        className: "bg-sky-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-sky-600",
                                                                        children: "IDENTIFICACIÓN"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2199,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-emerald-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-emerald-600",
                                                                        children: "CANTIDAD / VALOR"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2200,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-violet-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-violet-600",
                                                                        children: "ANÁLISIS DE SUCIEDAD"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2201,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-amber-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-amber-600",
                                                                        children: "UBICACIÓN"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2202,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-gray-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-gray-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2203,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 2198,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap",
                                                                        children: "Punto"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2206,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap",
                                                                        children: "Ubicación"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2207,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap",
                                                                        children: "Tipo suciedad"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2208,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap",
                                                                        children: "Total"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2209,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap",
                                                                        children: "Precio (€)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2210,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    config.extraFields.slice(0, 2).map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "bg-violet-400 text-white px-1 py-1 text-center font-semibold border border-violet-400 whitespace-nowrap",
                                                                            children: f.label
                                                                        }, f.key, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2212,
                                                                            columnNumber: 29
                                                                        }, this)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap",
                                                                        children: "Z. Origen"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2214,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap",
                                                                        children: "Z. Destino"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2215,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 whitespace-nowrap",
                                                                        children: "Fotos"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2216,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 w-8"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2217,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 2205,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true) : sStep === 4 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 3,
                                                                        className: "bg-sky-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-sky-600",
                                                                        children: "IDENTIFICACIÓN"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2223,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-emerald-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-emerald-600",
                                                                        children: "CANTIDAD / VALOR"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2224,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-teal-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-teal-600",
                                                                        children: "ESTADO DEL ESTÁNDAR"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2225,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-amber-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-amber-600",
                                                                        children: "UBICACIÓN"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2226,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-gray-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-gray-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2227,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 2222,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap",
                                                                        children: "Estándar"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2230,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap",
                                                                        children: "Ubicación"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2231,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap",
                                                                        children: "Tipo"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2232,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap",
                                                                        children: "Total"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2233,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap",
                                                                        children: "Precio (€)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2234,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    config.extraFields.slice(0, 2).map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "bg-teal-400 text-white px-1 py-1 text-center font-semibold border border-teal-400 whitespace-nowrap",
                                                                            children: f.label
                                                                        }, f.key, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2236,
                                                                            columnNumber: 29
                                                                        }, this)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap",
                                                                        children: "Z. Origen"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2238,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap",
                                                                        children: "Z. Destino"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2239,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 whitespace-nowrap",
                                                                        children: "Fotos"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2240,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 w-8"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2241,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 2229,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 3,
                                                                        className: "bg-sky-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-sky-600",
                                                                        children: "IDENTIFICACIÓN"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2247,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-emerald-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-emerald-600",
                                                                        children: "CANTIDAD / VALOR"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2248,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-indigo-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-indigo-600",
                                                                        children: "DISCIPLINA"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2249,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-amber-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-amber-600",
                                                                        children: "UBICACIÓN"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2250,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        colSpan: 2,
                                                                        className: "bg-gray-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-gray-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2251,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 2246,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap",
                                                                        children: "Práctica"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2254,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap",
                                                                        children: "Ubicación"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2255,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap",
                                                                        children: "Cumplimiento"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2256,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap",
                                                                        children: "Total"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2257,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap",
                                                                        children: "Precio (€)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2258,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    config.extraFields.slice(0, 2).map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "bg-indigo-400 text-white px-1 py-1 text-center font-semibold border border-indigo-400 whitespace-nowrap",
                                                                            children: f.label
                                                                        }, f.key, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2260,
                                                                            columnNumber: 29
                                                                        }, this)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap",
                                                                        children: "Z. Origen"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2262,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap",
                                                                        children: "Z. Destino"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2263,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 whitespace-nowrap",
                                                                        children: "Fotos"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2264,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 w-8"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2265,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                lineNumber: 2253,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 2140,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    children: items.map((item)=>{
                                                        const isInnecesario = item.category === 'innecesario';
                                                        const isNecesario = item.category === 'necesario';
                                                        const canEdit = !isReadOnly && item.id;
                                                        const inlineInput = "h-6 text-[10px] border-0 p-0 px-1 bg-transparent";
                                                        const inlineSelect = "h-6 text-[10px] border-0 p-0 bg-transparent";
                                                        // Section colors matching header groups
                                                        const idBg = sStep === 1 ? 'bg-sky-50' : sStep === 3 ? 'bg-sky-50' : sStep === 4 ? 'bg-sky-50' : sStep === 5 ? 'bg-sky-50' : 'bg-sky-50';
                                                        const qtyBg = 'bg-emerald-50';
                                                        const specBg = sStep === 1 ? 'bg-red-50' : sStep === 2 ? 'bg-blue-50' : sStep === 3 ? 'bg-violet-50' : sStep === 4 ? 'bg-teal-50' : 'bg-indigo-50';
                                                        const locBg = 'bg-amber-50';
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: `border-b hover:bg-gray-50 ${isInnecesario ? 'bg-red-50/30' : isNecesario ? 'bg-green-50/20' : ''}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: `px-1 py-1 border ${idBg} font-medium`,
                                                                    children: canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        value: item.name,
                                                                        className: inlineInput,
                                                                        onChange: (e)=>setItems((prev)=>prev.map((it)=>it.id === item.id ? {
                                                                                        ...it,
                                                                                        name: e.target.value
                                                                                    } : it)),
                                                                        onBlur: (e)=>handleUpdateField(item.id, 'name', e.target.value)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2287,
                                                                        columnNumber: 29
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px]",
                                                                        children: item.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2290,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 2285,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: `px-1 py-1 border ${idBg}`,
                                                                    children: canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        value: item.location || '',
                                                                        className: inlineInput,
                                                                        onChange: (e)=>setItems((prev)=>prev.map((it)=>it.id === item.id ? {
                                                                                        ...it,
                                                                                        location: e.target.value
                                                                                    } : it)),
                                                                        onBlur: (e)=>handleUpdateField(item.id, 'location', e.target.value)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2295,
                                                                        columnNumber: 29
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px]",
                                                                        children: item.location || '—'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2298,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 2293,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: `px-1 py-1 border ${idBg} text-center`,
                                                                    children: canEdit && sStep === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                        value: item.category || undefined,
                                                                        onValueChange: (val)=>{
                                                                            const isInn = val === 'innecesario';
                                                                            const isNec = val === 'necesario';
                                                                            const qty = item.quantity || 1;
                                                                            const updates = {
                                                                                category: val,
                                                                                quantityNeeded: isNec ? qty : 0,
                                                                                quantityUnneeded: isInn ? qty : 0,
                                                                                jaulaStatus: isInn ? 'en_jaula' : '',
                                                                                jaulaFechaEntrada: isInn ? item.jaulaFechaEntrada || new Date().toISOString() : null
                                                                            };
                                                                            setItems((prev)=>prev.map((it)=>it.id === item.id ? {
                                                                                        ...it,
                                                                                        ...updates
                                                                                    } : it));
                                                                            fetch(`/api/inventory?id=${item.id}`, {
                                                                                method: 'PUT',
                                                                                headers: {
                                                                                    'Content-Type': 'application/json'
                                                                                },
                                                                                body: JSON.stringify(updates)
                                                                            });
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                className: inlineSelect,
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 2312,
                                                                                    columnNumber: 71
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2312,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                children: config.categories.filter((c)=>c.value && c.value.trim() !== '').map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: c.value,
                                                                                        children: c.label
                                                                                    }, c.value, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 2315,
                                                                                        columnNumber: 35
                                                                                    }, this))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2313,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2303,
                                                                        columnNumber: 29
                                                                    }, this) : getCategoryBadge(item.category)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 2301,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: `px-1 py-1 border ${qtyBg} text-center`,
                                                                    children: canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        type: "number",
                                                                        min: "1",
                                                                        value: item.quantity || 1,
                                                                        className: `${inlineInput} w-12 text-center`,
                                                                        onChange: (e)=>{
                                                                            const val = parseInt(e.target.value) || 1;
                                                                            setItems((prev)=>prev.map((it)=>it.id === item.id ? {
                                                                                        ...it,
                                                                                        quantity: val
                                                                                    } : it));
                                                                        },
                                                                        onBlur: (e)=>handleUpdateField(item.id, 'quantity', parseInt(e.target.value) || 1)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2324,
                                                                        columnNumber: 29
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px]",
                                                                        children: sStep === 1 ? isInnecesario ? item.quantityUnneeded || item.quantity : isNecesario ? item.quantityNeeded || item.quantity : item.quantity : item.quantity
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2327,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 2322,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: `px-1 py-1 border ${qtyBg} text-right`,
                                                                    children: canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        type: "number",
                                                                        min: "0",
                                                                        step: "0.01",
                                                                        value: item.price ?? '',
                                                                        className: `${inlineInput} w-16 text-right`,
                                                                        onChange: (e)=>{
                                                                            const val = e.target.value ? parseFloat(e.target.value) : null;
                                                                            setItems((prev)=>prev.map((it)=>it.id === item.id ? {
                                                                                        ...it,
                                                                                        price: val
                                                                                    } : it));
                                                                        },
                                                                        onBlur: (e)=>handleUpdateField(item.id, 'price', e.target.value ? parseFloat(e.target.value) : null)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2332,
                                                                        columnNumber: 29
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px]",
                                                                        children: item.price != null ? `${item.price.toFixed(2)} €` : '—'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2335,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 2330,
                                                                    columnNumber: 25
                                                                }, this),
                                                                sStep === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: `px-1 py-1 border ${specBg} text-center`,
                                                                            children: canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                                value: item.extra?.estado ? String(item.extra.estado) : undefined,
                                                                                onValueChange: (val)=>handleUpdateExtra(item.id, 'estado', val),
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                        className: inlineSelect,
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                            placeholder: "—"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                            lineNumber: 2343,
                                                                                            columnNumber: 75
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 2343,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                value: "_clear_",
                                                                                                children: "—"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                                lineNumber: 2345,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            [
                                                                                                'Bueno',
                                                                                                'Regular',
                                                                                                'Malo'
                                                                                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                    value: opt,
                                                                                                    children: opt
                                                                                                }, opt, false, {
                                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                                    lineNumber: 2346,
                                                                                                    columnNumber: 78
                                                                                                }, this))
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 2344,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2342,
                                                                                columnNumber: 33
                                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[11px]",
                                                                                children: String(item.extra?.estado ?? '—')
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2349,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2340,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: `px-1 py-1 border ${specBg} text-center`,
                                                                            children: canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                                value: item.extra?.frecuenciaUso ? String(item.extra.frecuenciaUso) : undefined,
                                                                                onValueChange: (val)=>handleUpdateExtra(item.id, 'frecuenciaUso', val),
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                        className: inlineSelect,
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                            placeholder: "—"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                            lineNumber: 2355,
                                                                                            columnNumber: 75
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 2355,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                value: "_clear_",
                                                                                                children: "—"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                                lineNumber: 2357,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            [
                                                                                                'Diario',
                                                                                                'Semanal',
                                                                                                'Quincenal',
                                                                                                'Mensual',
                                                                                                'Trimestral',
                                                                                                'Anual',
                                                                                                'Nunca'
                                                                                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                    value: opt,
                                                                                                    children: opt
                                                                                                }, opt, false, {
                                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                                    lineNumber: 2358,
                                                                                                    columnNumber: 127
                                                                                                }, this))
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 2356,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2354,
                                                                                columnNumber: 33
                                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[11px]",
                                                                                children: String(item.extra?.frecuenciaUso ?? '—')
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2361,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2352,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: `px-1 py-1 border ${specBg} text-center`,
                                                                            children: canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                                value: item.extra?.decision ? String(item.extra.decision) : undefined,
                                                                                onValueChange: (val)=>{
                                                                                    handleUpdateExtra(item.id, 'decision', val);
                                                                                    const isInn = item.category === 'innecesario';
                                                                                    if (isInn) {
                                                                                        handleUpdateField(item.id, 'action', val);
                                                                                        const newDestino = val === 'Tirar' || val === 'Eliminar' ? 'Residuo' : 'Jaula';
                                                                                        handleUpdateField(item.id, 'zonaDestino', newDestino);
                                                                                        if (val === 'Tirar' || val === 'Eliminar') {
                                                                                            handleUpdateField(item.id, 'jaulaStatus', '');
                                                                                            handleUpdateField(item.id, 'jaulaFechaEntrada', null);
                                                                                            handleUpdateExtra(item.id, 'diasCuarentena', '_clear_');
                                                                                        } else if (val === 'Jaula') {
                                                                                            handleUpdateField(item.id, 'jaulaStatus', 'en_jaula');
                                                                                            if (!item.jaulaFechaEntrada) handleUpdateField(item.id, 'jaulaFechaEntrada', new Date().toISOString());
                                                                                            if (!item.extra?.diasCuarentena) handleUpdateExtra(item.id, 'diasCuarentena', 40);
                                                                                        }
                                                                                    }
                                                                                },
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                        className: inlineSelect,
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                            placeholder: "—"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                            lineNumber: 2385,
                                                                                            columnNumber: 75
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 2385,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                value: "_clear_",
                                                                                                children: "—"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                                lineNumber: 2387,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                value: "Jaula",
                                                                                                children: "Jaula"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                                lineNumber: 2388,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                value: "Tirar",
                                                                                                children: "Tirar"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                                lineNumber: 2389,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                value: "Eliminar",
                                                                                                children: "Eliminar"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                                lineNumber: 2390,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 2386,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2366,
                                                                                columnNumber: 33
                                                                            }, this) : item.extra?.decision ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                className: `text-[9px] px-1 ${item.extra.decision === 'Jaula' ? 'bg-orange-100 text-orange-800' : item.extra.decision === 'Tirar' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`,
                                                                                children: String(item.extra.decision)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2394,
                                                                                columnNumber: 33
                                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[11px] text-muted-foreground",
                                                                                children: "—"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2395,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2364,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "px-1 py-1 border bg-orange-50 text-center",
                                                                            children: item.extra?.decision === 'Eliminar' || item.extra?.decision === 'Tirar' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-muted-foreground",
                                                                                children: "—"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2400,
                                                                                columnNumber: 33
                                                                            }, this) : canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                                value: String(item.extra?.diasCuarentena ?? 40),
                                                                                onValueChange: (val)=>handleUpdateExtra(item.id, 'diasCuarentena', parseInt(val) || 40),
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                        className: inlineSelect,
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                            lineNumber: 2403,
                                                                                            columnNumber: 75
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 2403,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                        children: [
                                                                                            7,
                                                                                            15,
                                                                                            20,
                                                                                            30,
                                                                                            40,
                                                                                            60,
                                                                                            90
                                                                                        ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                value: String(d),
                                                                                                children: [
                                                                                                    d,
                                                                                                    "d"
                                                                                                ]
                                                                                            }, d, true, {
                                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                                lineNumber: 2405,
                                                                                                columnNumber: 75
                                                                                            }, this))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 2404,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2402,
                                                                                columnNumber: 33
                                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[11px]",
                                                                                children: [
                                                                                    item.extra?.diasCuarentena ?? 40,
                                                                                    "d"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2408,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                            lineNumber: 2398,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true) : config.extraFields.slice(0, 2).map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: `px-1 py-1 border ${specBg} text-center text-[11px]`,
                                                                        children: getExtraValue(item, f.key)
                                                                    }, f.key, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2413,
                                                                        columnNumber: 29
                                                                    }, this)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: `px-1 py-1 border ${locBg} text-center`,
                                                                    children: canEdit ? currentProject?.zones && currentProject.zones.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                        value: item.zonaOrigen || undefined,
                                                                        onValueChange: (val)=>handleUpdateField(item.id, 'zonaOrigen', val),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                className: inlineSelect,
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                    placeholder: "—"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 2423,
                                                                                    columnNumber: 73
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2423,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "_clear_",
                                                                                        children: "—"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 2425,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    currentProject.zones.map((z)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                            value: z.name,
                                                                                            children: z.name
                                                                                        }, z.id, false, {
                                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                            lineNumber: 2426,
                                                                                            columnNumber: 66
                                                                                        }, this))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2424,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2422,
                                                                        columnNumber: 31
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        value: item.zonaOrigen || '',
                                                                        className: inlineInput,
                                                                        placeholder: "—",
                                                                        onBlur: (e)=>handleUpdateField(item.id, 'zonaOrigen', e.target.value)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2430,
                                                                        columnNumber: 31
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] text-muted-foreground",
                                                                        children: item.zonaOrigen || '—'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2433,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 2419,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: `px-1 py-1 border ${locBg} text-center`,
                                                                    children: sStep === 1 && item.category === 'innecesario' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `text-[11px] font-medium ${item.extra?.decision === 'Tirar' || item.extra?.decision === 'Eliminar' ? 'text-yellow-700' : 'text-red-600'}`,
                                                                        children: item.extra?.decision === 'Tirar' || item.extra?.decision === 'Eliminar' ? 'Residuo' : 'Jaula'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2438,
                                                                        columnNumber: 29
                                                                    }, this) : canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                        value: item.zonaDestino || undefined,
                                                                        onValueChange: (val)=>{
                                                                            const targetZone = currentProject?.zones?.find((z)=>z.name === val);
                                                                            const updates = {
                                                                                zonaDestino: val
                                                                            };
                                                                            if (targetZone) updates.zoneId = targetZone.id;
                                                                            handleUpdateJaula(item.id, updates);
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                className: inlineSelect,
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                    placeholder: "—"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 2447,
                                                                                    columnNumber: 71
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2447,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "_clear_",
                                                                                        children: "—"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 2449,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    currentProject?.zones?.map((z)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                            value: z.name,
                                                                                            children: z.name
                                                                                        }, z.id, false, {
                                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                            lineNumber: 2450,
                                                                                            columnNumber: 66
                                                                                        }, this)) || []
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2448,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2440,
                                                                        columnNumber: 29
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] text-muted-foreground",
                                                                        children: item.zonaDestino || '—'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2453,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 2436,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-1 py-1 border bg-gray-50",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-1 flex-wrap",
                                                                        children: [
                                                                            (itemPhotos[item.id] || item.photos || []).map((photo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "relative group",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                            src: photo.photoUrl,
                                                                                            alt: photo.title,
                                                                                            className: "w-8 h-8 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity",
                                                                                            onClick: ()=>setShowPhotoLightbox(photo),
                                                                                            title: `${photo.photoType === 'antes' ? 'Antes' : photo.photoType === 'despues' ? 'Después' : photo.photoType} — ${photo.title}`
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                            lineNumber: 2460,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                            className: `absolute -top-1 -left-1 text-[7px] px-0.5 py-0 min-w-0 ${photo.photoType === 'antes' ? 'bg-amber-100 text-amber-800' : photo.photoType === 'despues' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`,
                                                                                            children: photo.photoType === 'antes' ? 'A' : photo.photoType === 'despues' ? 'D' : 'R'
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                            lineNumber: 2464,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        !isReadOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                            className: "absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100 transition-opacity",
                                                                                            onClick: (e)=>{
                                                                                                e.stopPropagation();
                                                                                                handleDeletePhoto(photo.id, item.id);
                                                                                            },
                                                                                            title: "Eliminar foto",
                                                                                            children: "×"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                            lineNumber: 2468,
                                                                                            columnNumber: 35
                                                                                        }, this)
                                                                                    ]
                                                                                }, photo.id, true, {
                                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                    lineNumber: 2459,
                                                                                    columnNumber: 31
                                                                                }, this)),
                                                                            !isReadOnly && item.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-0.5",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "inline-flex items-center justify-center w-7 h-7 rounded border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors",
                                                                                        title: "Adjuntar foto ANTES",
                                                                                        children: [
                                                                                            uploadingPhotoForItem === item.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                                                className: "h-3 w-3 animate-spin text-gray-400"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                                lineNumber: 2476,
                                                                                                columnNumber: 72
                                                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                                                                className: "h-3 w-3 text-gray-400"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                                lineNumber: 2476,
                                                                                                columnNumber: 133
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                type: "file",
                                                                                                accept: "image/*",
                                                                                                capture: "environment",
                                                                                                className: "hidden",
                                                                                                onChange: (e)=>{
                                                                                                    const file = e.target.files?.[0];
                                                                                                    if (file) handleAttachPhoto(item.id, file, 'antes');
                                                                                                    e.target.value = '';
                                                                                                }
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                                lineNumber: 2477,
                                                                                                columnNumber: 35
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 2475,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    step2Photos.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        className: "inline-flex items-center justify-center w-7 h-7 rounded border border-dashed border-purple-300 cursor-pointer hover:bg-purple-50 hover:border-purple-400 transition-colors",
                                                                                        onClick: ()=>openPhotoGallery(item.id),
                                                                                        title: "Vincular foto del Paso 2",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                                                                            className: "h-3 w-3 text-purple-400"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                            lineNumber: 2483,
                                                                                            columnNumber: 37
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                        lineNumber: 2481,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                                lineNumber: 2474,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2457,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 2456,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-1 py-1 border bg-gray-50",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "ghost",
                                                                        size: "sm",
                                                                        className: "h-7 text-destructive",
                                                                        onClick: ()=>item.id && handleDeleteItem(item.id),
                                                                        disabled: isReadOnly,
                                                                        children: "×"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                        lineNumber: 2492,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                                    lineNumber: 2491,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, item.id, true, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 2283,
                                                            columnNumber: 23
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 2270,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                            lineNumber: 2139,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 2138,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-end",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: handleComplete,
                                            disabled: !canComplete || items.length === 0 || isReadOnly,
                                            style: canComplete ? {
                                                backgroundColor: sStepData?.color
                                            } : undefined,
                                            children: [
                                                "Completar Inventario",
                                                sStep === 1 ? '' : ` (${classifyPercent}% clasificado)`
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                            lineNumber: 2505,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 2504,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                lineNumber: 1326,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                            lineNumber: 1291,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                    lineNumber: 1253,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                lineNumber: 1252,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$5s$2f$LayoutEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: showLayoutEditor,
                onClose: ()=>setShowLayoutEditor(false),
                onSave: ()=>{
                    setShowLayoutEditor(false);
                    loadLayouts();
                },
                sStep: sStep
            }, void 0, false, {
                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                lineNumber: 2520,
                columnNumber: 7
            }, this),
            sStep === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$5s$2f$ColorCodeTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: showColorCodeTable,
                onClose: ()=>setShowColorCodeTable(false)
            }, void 0, false, {
                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                lineNumber: 2529,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: showPhotoGallery,
                onOpenChange: ()=>setShowPhotoGallery(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-2xl max-h-[80vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                        className: "h-5 w-5 text-purple-600"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 2540,
                                        columnNumber: 15
                                    }, this),
                                    "Vincular Foto del Paso 2"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                lineNumber: 2539,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                            lineNumber: 2538,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground",
                            children: "Selecciona una foto del Paso 2 para vincularla a este elemento del inventario. La foto mantendrá su tipo (Antes/Después) y será trazable."
                        }, void 0, false, {
                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                            lineNumber: 2544,
                            columnNumber: 11
                        }, this),
                        galleryTargetItemId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-2 text-xs text-muted-foreground",
                            children: [
                                "Elemento destino: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: items.find((i)=>i.id === galleryTargetItemId)?.name || '—'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                    lineNumber: 2550,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                            lineNumber: 2549,
                            columnNumber: 13
                        }, this),
                        step2Photos.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-8 text-muted-foreground",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                    className: "h-8 w-8 mx-auto mb-2 opacity-50"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                    lineNumber: 2555,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm",
                                    children: "No hay fotos del Paso 2 disponibles para vincular"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                    lineNumber: 2556,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                            lineNumber: 2554,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
                            children: step2Photos.map((photo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border rounded-lg overflow-hidden bg-white group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: photo.photoUrl,
                                            alt: photo.title,
                                            className: "w-full h-32 object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                            lineNumber: 2562,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                            className: `text-[9px] px-1 py-0 ${photo.photoType === 'antes' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`,
                                                            children: photo.photoType === 'antes' ? 'Antes' : 'Después'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 2569,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] text-muted-foreground truncate",
                                                            children: photo.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 2572,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 2568,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "sm",
                                                    className: "w-full text-xs bg-purple-600 hover:bg-purple-700 text-white h-7",
                                                    onClick: ()=>galleryTargetItemId && handleLinkStep2Photo(photo.id, galleryTargetItemId),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                                            className: "h-3 w-3 mr-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                            lineNumber: 2579,
                                                            columnNumber: 23
                                                        }, this),
                                                        " Vincular"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                                    lineNumber: 2574,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                            lineNumber: 2567,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, photo.id, true, {
                                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                    lineNumber: 2561,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/5s/InventarioModal.tsx",
                            lineNumber: 2559,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                    lineNumber: 2537,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                lineNumber: 2536,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: !!showPhotoLightbox,
                onOpenChange: ()=>setShowPhotoLightbox(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-4xl max-h-[90vh] p-2",
                    children: showPhotoLightbox && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: showPhotoLightbox.photoUrl,
                                        alt: showPhotoLightbox.title,
                                        className: "w-full max-h-[70vh] object-contain rounded-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 2595,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        className: `absolute top-2 left-2 ${showPhotoLightbox.photoType === 'antes' ? 'bg-amber-100 text-amber-800' : showPhotoLightbox.photoType === 'despues' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`,
                                        children: showPhotoLightbox.photoType === 'antes' ? 'Antes' : showPhotoLightbox.photoType === 'despues' ? 'Después' : showPhotoLightbox.photoType
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 2600,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                lineNumber: 2594,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-2 pb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-sm font-medium",
                                        children: showPhotoLightbox.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 2605,
                                        columnNumber: 17
                                    }, this),
                                    showPhotoLightbox.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: showPhotoLightbox.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 2607,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-muted-foreground mt-1",
                                        children: new Date(showPhotoLightbox.createdAt).toLocaleString('es-ES')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                        lineNumber: 2609,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                                lineNumber: 2604,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/5s/InventarioModal.tsx",
                        lineNumber: 2593,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/5s/InventarioModal.tsx",
                    lineNumber: 2591,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/5s/InventarioModal.tsx",
                lineNumber: 2590,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=src_components_5s_InventarioModal_tsx_23bc51c7._.js.map