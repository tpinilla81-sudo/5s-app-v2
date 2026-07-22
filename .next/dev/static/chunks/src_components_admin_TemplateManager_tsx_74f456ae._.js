(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/admin/TemplateManager.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TemplateManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen-line.js [app-client] (ecmascript) <export default as Edit3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-check.js [app-client] (ecmascript) <export default as FileCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-check.js [app-client] (ecmascript) <export default as ClipboardCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code.js [app-client] (ecmascript) <export default as Code>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-list.js [app-client] (ecmascript) <export default as ClipboardList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$paste$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardPaste$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-paste.js [app-client] (ecmascript) <export default as ClipboardPaste>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCopy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-copy.js [app-client] (ecmascript) <export default as ClipboardCopy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right-left.js [app-client] (ecmascript) <export default as ArrowRightLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search-check.js [app-client] (ecmascript) <export default as SearchCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rocket.js [app-client] (ecmascript) <export default as Rocket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
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
// TemplateTab and TEMPLATE_TABS removed — now organized by S-step → Paso
const S_COLORS = {
    1: '#8B5CF6',
    2: '#EAB308',
    3: '#3B82F6',
    4: '#F43F5E',
    5: '#F97316',
    6: '#16A34A'
};
// MC Paso icon mapping
const MC_PASO_ICONS = {
    Play: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"],
    ClipboardList: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"],
    SearchCheck: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchCheck$3e$__["SearchCheck"],
    Rocket: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__["Rocket"],
    Target: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"]
};
const MINI_STEPS_LABELS = {
    1: 'Formación y Exámenes',
    2: 'Fotografías (Antes/Después)',
    3: 'Inventario / Estándar / Layout / Plan Limpieza',
    4: 'Autoevaluación / Plan de Acción',
    5: 'Auditoría Externa / PDCA'
};
// ═══════════════════════════════════════════════════════
// DEFAULT CONTENT GENERATORS
// ═══════════════════════════════════════════════════════
function getDefaultFormationContent(sStep) {
    const formations = {
        1: {
            sections: [
                {
                    title: '¿Qué es Seiri (Clasificar)?',
                    content: 'Seiri es la primera de las 5S y significa "clasificar" o "separar". Consiste en identificar y separar los elementos necesarios de los innecesarios en el lugar de trabajo, eliminando todo aquello que no se utiliza o que no aporta valor al proceso. El objetivo es crear un entorno de trabajo más limpio, seguro y eficiente, donde solo permanezcan los elementos esenciales para realizar las tareas diarias.'
                },
                {
                    title: 'Objetivos de Seiri',
                    content: '1. Eliminar del área de trabajo los elementos innecesarios que ocupan espacio y generan desorden.\n2. Liberar espacio útil para mejorar la organización y el flujo de trabajo.\n3. Reducir el tiempo de búsqueda de herramientas, materiales y documentos.\n4. Prevenir accidentes y errores causados por la acumulación de objetos innecesarios.\n5. Facilitar la identificación visual de los recursos realmente necesarios.'
                },
                {
                    title: 'Metodología de implementación',
                    content: '1. Recorrer el área de trabajo y clasificar todos los elementos en necesarios e innecesarios.\n2. Utilizar tarjetas de color rojo (Tarjetas Rojas) para marcar los elementos innecesarios.\n3. Colocar los elementos marcados en una "jaula de innecesarios" o zona temporal.\n4. Decidir el destino de cada elemento: eliminar, trasladar, donar o almacenar fuera del área.\n5. Documentar todas las decisiones y mantener un registro de los elementos retirados.\n6. Revisar periódicamente para evitar la acumulación de nuevos innecesarios.'
                },
                {
                    title: 'Beneficios esperados',
                    content: 'Al aplicar correctamente Seiri se obtienen beneficios como: mayor espacio disponible en el lugar de trabajo, reducción del tiempo perdido buscando elementos, disminución de accidentes por acumulación, mejora de la productividad al eliminar distracciones, y una cultura de orden y limpieza que se extiende a todas las áreas de la organización.'
                }
            ]
        },
        2: {
            sections: [
                {
                    title: '¿Qué es Seiton (Organizar)?',
                    content: 'Seiton es la segunda de las 5S y significa "organizar" o "ordenar". Consiste en establecer una ubicación definida para cada elemento necesario, de forma que sea fácil de encontrar, usar y devolver a su lugar. Seiton aplica el principio de "un lugar para cada cosa y cada cosa en su lugar", utilizando señalización visual, códigos de color y etiquetas para garantizar que cualquier persona pueda localizar y devolver los objetos de forma intuitiva.'
                },
                {
                    title: 'Objetivos de Seiton',
                    content: '1. Asignar una ubicación fija y lógica a cada elemento necesario del lugar de trabajo.\n2. Facilitar la localización rápida de herramientas, materiales y documentos.\n3. Garantizar que cualquier persona pueda encontrar y devolver los objetos sin necesidad de preguntar.\n4. Reducir el tiempo de preparación y cambio de herramientas.\n5. Implementar señalización visual y códigos de color para una identificación inmediata.'
                },
                {
                    title: 'Metodología de implementación',
                    content: '1. Analizar la frecuencia de uso de cada elemento: muy frecuente (cerca del puesto), frecuente (zona accesible), ocasional (almacén cercano) y raro (almacén lejano).\n2. Definir la ubicación óptima según la cercanía al punto de uso y la ergonomía.\n3. Implementar métodos de identificación: etiquetas, códigos de color, señales visuales, sombras, soportes.\n4. Crear un layout o distribución visual del área de trabajo.\n5. Señalizar pasillos, zonas de almacenamiento y ubicaciones específicas.\n6. Establecer reglas claras para la devolución de elementos a su ubicación.'
                },
                {
                    title: 'Beneficios esperados',
                    content: 'Los beneficios de aplicar Seiton incluyen: eliminación del tiempo perdido buscando herramientas o materiales, reducción de errores por confusión de elementos, mejora de la seguridad al tener pasillos despejados y zonas señalizadas, aumento de la eficiencia operativa, y una comunicación visual que permite detectar anomalías de forma inmediata.'
                }
            ]
        },
        3: {
            sections: [
                {
                    title: '¿Qué es Seiso (Limpiar)?',
                    content: 'Seiso es la tercera de las 5S y significa "limpiar" o "brillar". Va más allá de la simple limpieza: consiste en inspeccionar el lugar de trabajo mientras se limpia, identificando las fuentes de suciedad, las anomalías y los defectos. Seiso convierte la limpieza en una actividad de mantenimiento preventivo, donde cada persona es responsable de mantener su zona limpia y en condiciones óptimas.'
                },
                {
                    title: 'Objetivos de Seiso',
                    content: '1. Mantener el lugar de trabajo limpio y en condiciones óptimas de funcionamiento.\n2. Identificar y eliminar las fuentes de suciedad en su origen.\n3. Detectar anomalías, fugas, desgastes y defectos durante la limpieza.\n4. Establecer un plan de limpieza regular con responsables y frecuencias definidas.\n5. Crear el hábito de limpieza como parte de la rutina diaria de trabajo.'
                },
                {
                    title: 'Metodología de implementación',
                    content: '1. Realizar un inventario de puntos de suciedad: polvo, grasa, manchas, residuos, humedad, oxidación.\n2. Clasificar cada punto por nivel (leve, moderado, grave) y fuente (proceso, medio ambiente, falta de limpieza, escape, desgaste, derrame).\n3. Definir el método de limpieza adecuado para cada tipo de suciedad: aspirado, fregado, pulido, desinfección, reparación.\n4. Asignar frecuencias de limpieza: diaria, 3 veces por semana, semanal, quincenal, mensual.\n5. Crear un mapa de puntos de suciedad con responsables y plan de limpieza.\n6. Establecer un kit de limpieza accesible en cada zona.'
                },
                {
                    title: 'Beneficios esperados',
                    content: 'Aplicar Seiso aporta beneficios como: detección temprana de fallos y fugas, reducción de accidentes por suciedad, mejora de la calidad del producto al evitar contaminación, aumento de la vida útil de los equipos, y un entorno de trabajo más agradable y motivador para los empleados.'
                }
            ]
        },
        4: {
            sections: [
                {
                    title: '¿Qué es Seiketsu (Estandarizar)?',
                    content: 'Seiketsu es la cuarta de las 5S y significa "estandarizar" o "mantener el estado". Consiste en crear estándares, normas y procedimientos que mantengan los logros obtenidos con las 3S anteriores (Seiri, Seiton, Seiso). Seiketsu asegura que las mejoras no se pierdan con el tiempo y que todos los empleados sigan los mismos criterios de orden, organización y limpieza.'
                },
                {
                    title: 'Objetivos de Seiketsu',
                    content: '1. Crear estándares visuales y documentados para mantener los logros de las 3S.\n2. Establecer procedimientos claros que cualquier persona pueda seguir.\n3. Prevenir la reaparición de problemas ya resueltos.\n4. Implantar instrucciones visuales, diagramas y señalización permanente.\n5. Definir indicadores visuales que permitan detectar desviaciones de forma inmediata.'
                },
                {
                    title: 'Metodología de implementación',
                    content: '1. Documentar las mejores prácticas identificadas en las 3S anteriores.\n2. Crear estándares visuales: fotografías del estado correcto, diagramas de ubicación, etiquetas de identificación.\n3. Establecer procedimientos de inspección y mantenimiento con frecuencia y responsable.\n4. Implantar checklist de verificación diaria o semanal.\n5. Definir indicadores visuales de estado (semáforos, marcas de nivel, contornos).\n6. Revisar y actualizar los estándares periódicamente.'
                },
                {
                    title: 'Beneficios esperados',
                    content: 'Los beneficios de Seiketsu incluyen: consolidación de las mejoras de las 3S anteriores, reducción de la variabilidad en los procesos, facilitación de la formación de nuevos empleados, detección rápida de desviaciones, y creación de una base sólida para la mejora continua.'
                }
            ]
        },
        5: {
            sections: [
                {
                    title: '¿Qué es Shitsuke (Disciplina)?',
                    content: 'Shitsuke es la quinta y última de las 5S y significa "disciplina" o "sostener". Consiste en crear el hábito de respetar y cumplir los estándares establecidos en las 4S anteriores, de forma voluntaria y constante. Shitsuke transforma las normas en costumbres, asegurando que el orden, la organización, la limpieza y la estandarización se mantengan en el tiempo sin necesidad de supervisión constante.'
                },
                {
                    title: 'Objetivos de Shitsuke',
                    content: '1. Convertir el cumplimiento de los estándares en un hábito diario.\n2. Fomentar la autodisciplina y el compromiso personal con las 5S.\n3. Establecer mecanismos de seguimiento: auditorías internas y externas.\n4. Gestionar las anomalías detectadas y resolverlas de forma sistemática.\n5. Promover la mejora continua como filosofía de trabajo.'
                },
                {
                    title: 'Metodología de implementación',
                    content: '1. Realizar auditorías internas (autoevaluación) periódicas para verificar el cumplimiento de los estándares.\n2. Realizar auditorías externas con evaluadores independientes para objetividad.\n3. Registrar y gestionar las anomalías detectadas durante las auditorías.\n4. Establecer planes de acción correctiva con responsable y fecha límite.\n5. Comunicar los resultados de las auditorías a todo el equipo.\n6. Reconocer y premiar a los equipos que mantienen altos niveles de cumplimiento.'
                },
                {
                    title: 'Beneficios esperados',
                    content: 'Aplicar Shitsuke genera beneficios como: mantenimiento sostenido de las 5S en el tiempo, mejora continua de los procesos, mayor compromiso y motivación del personal, reducción de recaídas y problemas recurrentes, y una cultura de calidad que se extiende a todos los niveles de la organización.'
                }
            ]
        }
    };
    return formations[sStep] || formations[1];
}
function getDefaultExamContent(sStep) {
    const exams = {
        1: {
            questions: [
                {
                    question: '¿Cuál es el objetivo principal de Seiri (Clasificar)?',
                    options: [
                        'Separar lo necesario de lo innecesario',
                        'Organizar los elementos por tamaño',
                        'Limpiar las máquinas',
                        'Crear estándares visuales'
                    ],
                    correctIndex: 0
                },
                {
                    question: '¿Qué herramienta se utiliza en Seiri para marcar los elementos innecesarios?',
                    options: [
                        'Etiqueta verde',
                        'Tarjeta roja',
                        'Código de barras',
                        'Señal de tráfico'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Dónde se colocan temporalmente los elementos marcados como innecesarios?',
                    options: [
                        'En el almacén principal',
                        'En la jaula de innecesarios',
                        'En la mesa del responsable',
                        'En el pasillo'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Cuál es un beneficio de aplicar Seiri correctamente?',
                    options: [
                        'Aumentar el número de herramientas',
                        'Liberar espacio útil en el área de trabajo',
                        'Crear más documentos',
                        'Añadir más pasos al proceso'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué decisión NO se puede tomar sobre un elemento innecesario?',
                    options: [
                        'Eliminarlo',
                        'Trasladarlo a otra zona',
                        'Dejarlo donde está sin más',
                        'Donarlo o almacenarlo fuera del área'
                    ],
                    correctIndex: 2
                },
                {
                    question: '¿Cada cuánto se debe revisar el área para evitar acumulación de innecesarios?',
                    options: [
                        'Solo al inicio del proyecto',
                        'Una vez al año',
                        'Periódicamente de forma regular',
                        'Nunca, solo una vez'
                    ],
                    correctIndex: 2
                },
                {
                    question: '¿Qué tipo de elementos se deben eliminar en Seiri?',
                    options: [
                        'Los que se usan diariamente',
                        'Los que no se utilizan o no aportan valor',
                        'Los más caros',
                        'Los que tienen etiqueta'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Quién debe participar en el proceso de clasificación de Seiri?',
                    options: [
                        'Solo el responsable del área',
                        'Solo el jefe de producción',
                        'Todas las personas que trabajan en el área',
                        'Solo el equipo de mantenimiento'
                    ],
                    correctIndex: 2
                }
            ]
        },
        2: {
            questions: [
                {
                    question: '¿Cuál es el objetivo principal de Seiton (Organizar)?',
                    options: [
                        'Eliminar innecesarios',
                        'Asignar una ubicación definida a cada elemento necesario',
                        'Limpiar los equipos',
                        'Auditar el proceso'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué principio fundamental aplica Seiton?',
                    options: [
                        'Más es mejor',
                        'Un lugar para cada cosa y cada cosa en su lugar',
                        'Todo en una sola estantería',
                        'Guardar todo en cajas cerradas'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Dónde se deben ubicar los elementos de uso muy frecuente?',
                    options: [
                        'En el almacén lejano',
                        'Cerca del puesto de trabajo',
                        'En el suelo del pasillo',
                        'En la oficina del jefe'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Cuál de estos NO es un método de identificación visual en Seiton?',
                    options: [
                        'Etiquetas',
                        'Código de colores',
                        'Memorizar la ubicación',
                        'Sombras y siluetas'
                    ],
                    correctIndex: 2
                },
                {
                    question: '¿Qué es un layout en el contexto de Seiton?',
                    options: [
                        'Un tipo de herramienta',
                        'Una distribución visual del área de trabajo',
                        'Un informe de auditoría',
                        'Un código de barras'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué se debe hacer después de usar una herramienta según Seiton?',
                    options: [
                        'Dejarla donde se usó',
                        'Devolverla a su ubicación asignada',
                        'Pasarla al compañero',
                        'Guardarla en un cajón cualquiera'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Cómo se clasifica la frecuencia de uso en Seiton?',
                    options: [
                        'Barato y caro',
                        'Muy frecuente, frecuente, ocasional y raro',
                        'Grande y pequeño',
                        'Nuevo y viejo'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué beneficio aporta la señalización visual en Seiton?',
                    options: [
                        'Decorar el lugar de trabajo',
                        'Permitir detectar anomalías de forma inmediata',
                        'Aumentar el presupuesto',
                        'Reducir el número de herramientas'
                    ],
                    correctIndex: 1
                }
            ]
        },
        3: {
            questions: [
                {
                    question: '¿Cuál es el objetivo principal de Seiso (Limpiar)?',
                    options: [
                        'Hacer que todo brille',
                        'Inspeccionar mientras se limpia, identificando anomalías y fuentes de suciedad',
                        'Pintar las paredes',
                        'Comprar productos de limpieza'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿En qué se diferencia Seiso de una limpieza normal?',
                    options: [
                        'En que se usa más agua',
                        'En que convierte la limpieza en mantenimiento preventivo',
                        'En que solo la hace el equipo de limpieza',
                        'En que se hace una vez al año'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué tipos de suciedad se deben inventariar en Seiso?',
                    options: [
                        'Solo polvo',
                        'Polvo, grasa, manchas, residuos, humedad y oxidación',
                        'Solo grasa',
                        'Solo restos de comida'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Quién es responsable de la limpieza en Seiso?',
                    options: [
                        'Solo el equipo de limpieza',
                        'Solo el encargado',
                        'Cada persona en su zona de trabajo',
                        'El departamento de calidad'
                    ],
                    correctIndex: 2
                },
                {
                    question: '¿Qué se debe hacer al detectar una fuga durante la limpieza?',
                    options: [
                        'Ignorarla y seguir limpiando',
                        'Identificarla como fuente de suciedad y reportarla',
                        'Taparla con cinta',
                        'Esperar a que se seque sola'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué es un mapa de puntos de suciedad?',
                    options: [
                        'Un mapa del mundo',
                        'Una representación visual de las zonas con suciedad y sus características',
                        'Un plano del edificio',
                        'Un calendario de limpieza'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué frecuencia de limpieza se recomienda para zonas de alto tráfico?',
                    options: [
                        'Mensual',
                        'Diaria o varias veces por semana',
                        'Anual',
                        'Solo cuando está muy sucio'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué debe contener un kit de limpieza según Seiso?',
                    options: [
                        'Solo una escoba',
                        'Los productos y herramientas necesarios para la limpieza de la zona',
                        'Documentos de calidad',
                        'Herramientas de producción'
                    ],
                    correctIndex: 1
                }
            ]
        },
        4: {
            questions: [
                {
                    question: '¿Cuál es el objetivo principal de Seiketsu (Estandarizar)?',
                    options: [
                        'Limpiar más rápido',
                        'Crear estándares que mantengan los logros de las 3S anteriores',
                        'Eliminar más innecesarios',
                        'Organizar mejor las herramientas'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué tipo de estándares se crean en Seiketsu?',
                    options: [
                        'Solo escritos en papel',
                        'Visuales y documentados: fotos, diagramas, señalización, procedimientos',
                        'Solo verbales',
                        'Solo para directivos'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Para qué sirven los indicadores visuales en Seiketsu?',
                    options: [
                        'Para decorar',
                        'Para detectar desviaciones del estándar de forma inmediata',
                        'Para contar herramientas',
                        'Para medir la temperatura'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Cuál es un ejemplo de estándar visual?',
                    options: [
                        'Un correo electrónico',
                        'Una fotografía del estado correcto de una zona',
                        'Una reunión verbal',
                        'Un memorándum interno'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué es un checklist de verificación en Seiketsu?',
                    options: [
                        'Una lista de compras',
                        'Una lista de comprobación diaria o semanal del cumplimiento de estándares',
                        'Un inventario de herramientas',
                        'Un parte de trabajo'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Con qué frecuencia se deben revisar los estándares?',
                    options: [
                        'Nunca, una vez creados son fijos',
                        'Periódicamente para actualizarlos y mejorarlos',
                        'Solo cuando hay auditoría',
                        'Solo si hay queja del cliente'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué S anteriores sostiene Seiketsu?',
                    options: [
                        'Solo Seiri',
                        'Solo Seiton',
                        'Seiri, Seiton y Seiso (las 3S anteriores)',
                        'Ninguna'
                    ],
                    correctIndex: 2
                },
                {
                    question: '¿Por qué es importante documentar las mejores prácticas?',
                    options: [
                        'Por requisito legal',
                        'Para que los nuevos empleados puedan seguirlas y no se pierdan las mejoras',
                        'Para tener más papeleo',
                        'Porque lo dice el jefe'
                    ],
                    correctIndex: 1
                }
            ]
        },
        5: {
            questions: [
                {
                    question: '¿Cuál es el objetivo principal de Shitsuke (Disciplina)?',
                    options: [
                        'Crear más normas',
                        'Crear el hábito de respetar los estándares de forma voluntaria y constante',
                        'Poner multas a los empleados',
                        'Hacer auditorías puntuales'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué tipo de auditorías se realizan en Shitsuke?',
                    options: [
                        'Solo financieras',
                        'Internas (autoevaluación) y externas (evaluadores independientes)',
                        'Solo de producto',
                        'Solo de seguridad'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué se debe hacer al detectar una anomalía en una auditoría?',
                    options: [
                        'Ignorarla',
                        'Registrarla y crear un plan de acción correctiva con responsable y fecha',
                        'Esperar a la próxima auditoría',
                        'Solo informar verbalmente'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué convierte Shitsuke en hábito?',
                    options: [
                        'La supervisión constante',
                        'El cumplimiento voluntario y constante de los estándares',
                        'Las sanciones económicas',
                        'Los castigos'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Por qué es importante comunicar los resultados de las auditorías?',
                    options: [
                        'Para señalar culpables',
                        'Para que todo el equipo conozca el estado y participe en la mejora',
                        'Para archivarlos',
                        'Porque es obligatorio legalmente'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Cuál es la última etapa del ciclo de mejora continua en 5S?',
                    options: [
                        'Seiri',
                        'Shitsuke (que a su vez reinicia el ciclo)',
                        'Seiton',
                        'Seiso'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué papel tiene el reconocimiento en Shitsuke?',
                    options: [
                        'No tiene ningún papel',
                        'Motiva al equipo a mantener altos niveles de cumplimiento',
                        'Genera competencia negativa',
                        'Solo es para directivos'
                    ],
                    correctIndex: 1
                },
                {
                    question: '¿Qué sucede si no se aplica Shitsuke correctamente?',
                    options: [
                        'Nada, las 4S se mantienen solas',
                        'Las mejoras de las 4S anteriores se pierden con el tiempo',
                        'Se ahorra tiempo',
                        'Se reducen costes'
                    ],
                    correctIndex: 1
                }
            ]
        }
    };
    return exams[sStep] || exams[1];
}
function getDefaultChecklistContent(sStep) {
    const checklist = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUDIT_CHECKLISTS"][sStep];
    if (!checklist) return {
        sections: []
    };
    return {
        sections: checklist.map((section)=>({
                id: section.id,
                title: section.title,
                items: section.items.map((item)=>({
                        id: item.id,
                        description: item.description,
                        hasOther: item.hasOther || false
                    }))
            }))
    };
}
function getDefaultInventoryContent(sStep) {
    const cfg = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INVENTORY_CONFIGS"][sStep];
    if (!cfg) return {
        categories: [],
        extraFields: []
    };
    // S2: Use the comprehensive Seiton template matching the user's Excel structure
    // (categories by element type with hierarchical subcategories + traceability codes)
    if (sStep === 2) {
        return {
            title: 'Inventario de Necesarios',
            subtitle: 'SEITON — Organiza los elementos necesarios en su ubicación correcta',
            templateName: 'S2_Inventario_Necesarios_Seiton.xlsx',
            categories: [
                {
                    value: 'materiales',
                    label: 'MATERIALES',
                    color: 'bg-blue-100 text-blue-800'
                },
                {
                    value: 'maquinas_equipos',
                    label: 'MÁQUINAS Y EQUIPOS',
                    color: 'bg-purple-100 text-purple-800'
                },
                {
                    value: 'mobiliario',
                    label: 'MOBILIARIO',
                    color: 'bg-amber-100 text-amber-800'
                },
                {
                    value: 'informacion',
                    label: 'INFORMACIÓN',
                    color: 'bg-teal-100 text-teal-800'
                },
                {
                    value: 'transporte_almacenaje',
                    label: 'TRANSPORTE Y ALMACENAJE',
                    color: 'bg-orange-100 text-orange-800'
                }
            ],
            extraFields: [
                {
                    key: 'codigo',
                    label: 'Código de Trazabilidad',
                    type: 'text'
                },
                {
                    key: 'subcategoria',
                    label: 'Subcategoría',
                    type: 'select',
                    options: [
                        'Consumibles',
                        'Materia Prima',
                        'Producto en proceso',
                        'Producto acabado',
                        'Máquinas de trabajo',
                        'Utillajes de trabajo',
                        'Equipos y accesorios de Elevación',
                        'Equipos de ensayo y verificación',
                        'Herramientas de ensamblaje',
                        'Equipos informáticos',
                        'Equipos de limpieza',
                        'Bancos de trabajo',
                        'Paneles herramienta',
                        'Armarios o taquillas',
                        'Sillas, mesas',
                        'Paneles u otros soportes para información',
                        'Planos, instrucciones, boletines de trabajo',
                        'Posters u otra información divulgativa',
                        'Información referente a indicadores',
                        'Carpeta o bandejas con documentación',
                        'Información de seguridad',
                        'Máquinas de transporte',
                        'Utillajes de transporte, Pallets, embalajes de madera, cajas',
                        'Estanterías, gavetas, contenedores',
                        'Bolsas, plásticos, protecciones, elementos de flejado',
                        'Carros de transporte'
                    ]
                },
                {
                    key: 'zona_destino',
                    label: 'Zona Actual / Destino',
                    type: 'text'
                },
                {
                    key: 'responsable',
                    label: 'Responsable / Área',
                    type: 'text'
                },
                {
                    key: 'estado',
                    label: 'Estado de Conservación',
                    type: 'select',
                    options: [
                        'Excelente',
                        'Bueno',
                        'Regular',
                        'Requiere Mantenimiento'
                    ]
                }
            ],
            desplegables_jerarquicos: {
                'MATERIALES': {
                    prefijo_codigo: 'MAT',
                    subcategorias: [
                        'Consumibles',
                        'Materia Prima',
                        'Producto en proceso',
                        'Producto acabado'
                    ]
                },
                'MÁQUINAS Y EQUIPOS': {
                    prefijo_codigo: 'MAQ',
                    subcategorias: [
                        'Máquinas de trabajo',
                        'Utillajes de trabajo',
                        'Equipos y accesorios de Elevación',
                        'Equipos de ensayo y verificación',
                        'Herramientas de ensamblaje',
                        'Equipos informáticos',
                        'Equipos de limpieza'
                    ]
                },
                'MOBILIARIO': {
                    prefijo_codigo: 'MOB',
                    subcategorias: [
                        'Bancos de trabajo',
                        'Paneles herramienta',
                        'Armarios o taquillas',
                        'Sillas, mesas',
                        'Paneles u otros soportes para información'
                    ]
                },
                'INFORMACIÓN': {
                    prefijo_codigo: 'INF',
                    subcategorias: [
                        'Planos, instrucciones, boletines de trabajo',
                        'Posters u otra información divulgativa',
                        'Información referente a indicadores',
                        'Carpeta o bandejas con documentación',
                        'Información de seguridad'
                    ]
                },
                'TRANSPORTE Y ALMACENAJE': {
                    prefijo_codigo: 'TRA',
                    subcategorias: [
                        'Máquinas de transporte',
                        'Utillajes de transporte, Pallets, embalajes de madera, cajas',
                        'Estanterías, gavetas, contenedores',
                        'Bolsas, plásticos, protecciones, elementos de flejado',
                        'Carros de transporte'
                    ]
                }
            }
        };
    }
    return {
        categories: cfg.categories.map((c)=>({
                value: c.value,
                label: c.label,
                color: c.color
            })),
        extraFields: cfg.extraFields.map((f)=>({
                key: f.key,
                label: f.label,
                type: f.type,
                ...f.options ? {
                    options: f.options
                } : {}
            }))
    };
}
function getDefaultStandardContent() {
    return {
        fields: [
            {
                key: 'beforePhotoUrl',
                label: 'Foto Antes',
                type: 'photo',
                required: true
            },
            {
                key: 'afterPhotoUrl',
                label: 'Foto Después',
                type: 'photo',
                required: true
            },
            {
                key: 'responsable',
                label: 'Quién lo ha hecho',
                type: 'text',
                required: true
            },
            {
                key: 'contacto',
                label: 'Contacto',
                type: 'text',
                required: true
            },
            {
                key: 'mejoraTipo',
                label: 'Tipo de Mejora',
                type: 'select',
                options: [
                    'Seguridad',
                    'Calidad',
                    'Proceso',
                    'Logística'
                ],
                required: true
            }
        ]
    };
}
function getDefaultPlanAccionContent(sStep) {
    const S_JAPANESE = [
        'Seiri',
        'Seiton',
        'Seiso',
        'Seiketsu',
        'Shitsuke'
    ];
    const S_NAMES = [
        'Revisar',
        'Ordenar',
        'Limpiar',
        'Estandarizar',
        'Mantener'
    ];
    return {
        tableType: 'plan_accion',
        description: `Plan de Acción para ${S_JAPANESE[sStep - 1]} (${S_NAMES[sStep - 1]}). Registro de deficiencias encontradas en las autoevaluaciones y auditorías, con las acciones correctivas y preventivas propuestas, responsables y fechas de realización.`,
        columns: [
            {
                key: 'numeroEntrada',
                label: 'Nº Entrada',
                type: 'text',
                width: '100px',
                description: 'Zona + S de origen + número correlativo',
                required: true,
                placeholder: 'Ej: A-S1-001'
            },
            {
                key: 'fechaInicial',
                label: 'Fecha Inicial',
                type: 'date',
                width: '110px',
                description: 'Fecha en la que entra la deficiencia',
                required: true
            },
            {
                key: 'auditor',
                label: 'Auditor',
                type: 'text',
                width: '120px',
                description: 'Quién ha hecho la auditoría o la autoevaluación',
                required: true
            },
            {
                key: 'semana',
                label: 'Semana',
                type: 'text',
                width: '80px',
                description: 'La semana de la fecha inicial'
            },
            {
                key: 'zona',
                label: 'Zona',
                type: 'text',
                width: '100px',
                description: 'Qué zona es la afectada',
                required: true
            },
            {
                key: 'descripcion',
                label: 'Descripción',
                type: 'textarea',
                width: '200px',
                description: 'Descripción de la deficiencia encontrada',
                required: true
            },
            {
                key: 'accionCorrectiva',
                label: 'Acción Correctiva',
                type: 'textarea',
                width: '180px',
                description: 'Lo que se va a hacer ahora para corregir',
                required: true
            },
            {
                key: 'accionesPreventivas',
                label: 'Acciones Preventivas',
                type: 'textarea',
                width: '180px',
                description: 'Lo que se va a hacer para que no ocurra otra vez'
            },
            {
                key: 'semanaPrevista',
                label: 'Semana Prevista',
                type: 'text',
                width: '100px',
                description: 'La semana prevista para llevar las acciones preventivas'
            },
            {
                key: 'personaResponsable',
                label: 'Persona Responsable',
                type: 'text',
                width: '130px',
                description: 'Quién es el responsable',
                required: true
            },
            {
                key: 'estado',
                label: 'Estado',
                type: 'select',
                width: '110px',
                description: 'Progreso: Empezado (25%), Medio (50%), Casi Hecho (75%), Finalizado (100%)',
                options: [
                    'Empezado (25%)',
                    'Medio (50%)',
                    'Casi Hecho (75%)',
                    'Finalizado (100%)'
                ]
            },
            {
                key: 'progreso',
                label: 'Progreso %',
                type: 'number',
                width: '80px',
                description: 'Progreso en %: 25, 50, 75 o 100',
                min: 0,
                max: 100
            },
            {
                key: 'semanaReal',
                label: 'Semana Real',
                type: 'text',
                width: '100px',
                description: 'Semana real de la finalización'
            }
        ],
        sourceTypes: [
            'autoevaluacion',
            'auditoria'
        ],
        sStep: sStep
    };
}
function getDefaultLayoutContent(sStep) {
    return {
        layoutType: 'zone_layout',
        description: `Layout de la zona para S${sStep}. Dibuja o sube un plano de la zona indicando las áreas de trabajo, pasillos, ubicación de equipos y elementos estáticos.`,
        floorColors: [
            {
                color: '#0E6BA8',
                label: 'Azul RAL 5017 — Entrada de material',
                ral: 'RAL 5017'
            },
            {
                color: '#2D8C3C',
                label: 'Verde RAL 6032 — Salida de material premontado',
                ral: 'RAL 6032'
            },
            {
                color: '#E8E8E8',
                label: 'Blanco RAL 9003 — Elementos estáticos',
                ral: 'RAL 9003'
            },
            {
                color: '#F5E649',
                label: 'Amarillo RAL 1016 — Área de trabajo',
                ral: 'RAL 1016'
            },
            {
                color: '#CC0000',
                label: 'Rojo RAL 3000 — Equipos contra incendios',
                ral: 'RAL 3000'
            },
            {
                color: '#F5A623',
                label: 'Amarillo anaranjado RAL 1003 — Elementos de seguridad',
                ral: 'RAL 1003'
            }
        ],
        drawTools: [
            'select',
            'rect',
            'circle',
            'line',
            'arrow',
            'text'
        ],
        sStep: sStep,
        targetStandardCategory: 'layout',
        targetS4Library: true
    };
}
function getDefaultPlanLimpiezaContent(sStep) {
    return {
        planType: 'inspection_cleaning',
        description: `Plan de Inspección y Limpieza para S${sStep}. Define la ruta de inspección, los puntos de suciedad que no se pueden eliminar y las acciones de limpieza para la zona.`,
        sections: [
            {
                key: 'ruta_inspeccion',
                label: 'Ruta de Inspección',
                type: 'route',
                description: 'Define el recorrido de inspección paso a paso'
            },
            {
                key: 'puntos_suciedad',
                label: 'Puntos de Suciedad No Eliminables',
                type: 'checklist',
                description: 'Lista de puntos de suciedad que no se pueden eliminar, con acciones preventivas'
            },
            {
                key: 'acciones_limpieza',
                label: 'Acciones de Limpieza',
                type: 'list',
                description: 'Acciones de limpieza a realizar en cada punto'
            },
            {
                key: 'frecuencia',
                label: 'Frecuencia',
                type: 'select',
                options: [
                    'Diaria',
                    'Semanal',
                    'Quincenal',
                    'Mensual'
                ],
                description: 'Frecuencia de inspección'
            },
            {
                key: 'responsable',
                label: 'Responsable',
                type: 'text',
                description: 'Persona responsable de la inspección'
            }
        ],
        sStep: sStep,
        targetStandardCategory: 'plan_limpieza',
        targetS4Library: true
    };
}
function getDefaultPDCAContent(sStep) {
    return {
        pdcaType: 'continuous_improvement_board',
        description: `Tablero PDCA para S${sStep}. Herramienta de mejora continua después de acabar las 5S en la que se registra y se dirige las 5S. Incluye el Plan de Acción y KPIs referentes que indican progreso y trabajo realizado y por realizar.`,
        phases: [
            {
                key: 'plan',
                label: 'PLAN',
                labelEs: 'Planificar',
                description: 'Identificar problemas, establecer objetivos y definir planes de acción',
                color: '#3B82F6'
            },
            {
                key: 'do',
                label: 'DO',
                labelEs: 'Ejecutar',
                description: 'Implementar las acciones planificadas y recopilar datos',
                color: '#22C55E'
            },
            {
                key: 'check',
                label: 'CHECK',
                labelEs: 'Verificar',
                description: 'Analizar los resultados y comparar con los objetivos',
                color: '#EAB308'
            },
            {
                key: 'act',
                label: 'ACT',
                labelEs: 'Actuar',
                description: 'Estandarizar lo que funciona y corregir lo que no',
                color: '#F97316'
            }
        ],
        kpis: [
            {
                key: 'completion_rate',
                label: 'Tasa de Completado',
                description: 'Porcentaje de elementos PDCA completados'
            },
            {
                key: 'action_progress',
                label: 'Progreso del Plan de Acción',
                description: 'Progreso medio del Plan de Acción'
            },
            {
                key: 'open_actions',
                label: 'Acciones Abiertas',
                description: 'Acciones del plan de acción en estado abierta'
            },
            {
                key: 'overdue_items',
                label: 'Elementos Vencidos',
                description: 'Elementos PDCA con fecha límite pasada'
            }
        ],
        links: [
            'plan_accion',
            'standards_library'
        ],
        sStep: sStep
    };
}
function getDefaultFotosContent(sStep) {
    const descriptions = {
        1: 'Fotografía la zona para ver qué elementos innecesarios hay antes de clasificar',
        2: 'Fotografía la zona para ver cómo está organizada antes de reordenar',
        3: 'Fotografía la zona para documentar los puntos de suciedad antes de limpiar',
        4: 'Fotografía la zona para documentar el estado actual antes de estandarizar',
        5: 'Fotografía la zona para documentar el nivel de cumplimiento de los estándares'
    };
    return {
        sections: [
            {
                title: 'Fotografías Antes',
                description: descriptions[sStep] || 'Documenta el estado actual con fotografías',
                minPhotos: 3,
                photoTypes: [
                    'antes'
                ],
                instructions: 'Toma un mínimo de 3 fotografías del estado actual de la zona. Incluye vistas generales y detalles de los problemas detectados.'
            },
            {
                title: 'Fotografías Después',
                description: 'Fotografía el resultado tras aplicar las mejoras',
                minPhotos: 3,
                photoTypes: [
                    'despues'
                ],
                instructions: 'Toma fotografías desde los mismos ángulos que las fotos "antes" para poder comparar el antes y el después.'
            }
        ]
    };
}
function ChecklistEditor({ content, onChange }) {
    let parsed;
    try {
        parsed = JSON.parse(content);
    } catch  {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600",
            children: "El JSON no es válido. Corrígelo en modo JSON o carga el contenido por defecto."
        }, void 0, false, {
            fileName: "[project]/src/components/admin/TemplateManager.tsx",
            lineNumber: 378,
            columnNumber: 7
        }, this);
    }
    const sections = parsed.sections || [];
    const sPrefix = String(content.match(/"id"\s*:\s*"(\d+)\./)?.[1] || '1');
    const update = (newSections)=>{
        onChange(JSON.stringify({
            ...parsed,
            sections: newSections
        }, null, 2));
    };
    const addSection = ()=>{
        const newId = `${sPrefix}.${sections.length + 1}`;
        update([
            ...sections,
            {
                id: newId,
                title: 'Nueva Sección',
                items: []
            }
        ]);
    };
    const removeSection = (idx)=>{
        update(sections.filter((_, i)=>i !== idx));
    };
    const updateSection = (idx, field, value)=>{
        const updated = [
            ...sections
        ];
        updated[idx] = {
            ...updated[idx],
            [field]: value
        };
        update(updated);
    };
    const moveSection = (idx, dir)=>{
        const target = idx + dir;
        if (target < 0 || target >= sections.length) return;
        const updated = [
            ...sections
        ];
        [updated[idx], updated[target]] = [
            updated[target],
            updated[idx]
        ];
        update(updated);
    };
    const addItem = (sectionIdx)=>{
        const sec = sections[sectionIdx];
        const newItemId = `${sec.id}.${sec.items.length + 1}`;
        const updated = [
            ...sections
        ];
        updated[sectionIdx] = {
            ...updated[sectionIdx],
            items: [
                ...updated[sectionIdx].items,
                {
                    id: newItemId,
                    description: '',
                    hasOther: false
                }
            ]
        };
        update(updated);
    };
    const removeItem = (sectionIdx, itemIdx)=>{
        const updated = [
            ...sections
        ];
        updated[sectionIdx] = {
            ...updated[sectionIdx],
            items: updated[sectionIdx].items.filter((_, i)=>i !== itemIdx)
        };
        update(updated);
    };
    const updateItem = (sectionIdx, itemIdx, field, value)=>{
        const updated = [
            ...sections
        ];
        updated[sectionIdx] = {
            ...updated[sectionIdx],
            items: updated[sectionIdx].items.map((item, i)=>i === itemIdx ? {
                    ...item,
                    [field]: value
                } : item)
        };
        update(updated);
    };
    const moveItem = (sectionIdx, itemIdx, dir)=>{
        const items = sections[sectionIdx].items;
        const target = itemIdx + dir;
        if (target < 0 || target >= items.length) return;
        const updated = [
            ...sections
        ];
        const newItems = [
            ...updated[sectionIdx].items
        ];
        [newItems[itemIdx], newItems[target]] = [
            newItems[target],
            newItems[itemIdx]
        ];
        updated[sectionIdx] = {
            ...updated[sectionIdx],
            items: newItems
        };
        update(updated);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            sections.map((section, sIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-2 rounded-lg overflow-hidden bg-white shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 px-4 py-3 bg-gray-50 border-b",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-0.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>moveSection(sIdx, -1),
                                            className: "text-gray-400 hover:text-gray-600 leading-none",
                                            title: "Subir sección",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 464,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 463,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>moveSection(sIdx, 1),
                                            className: "text-gray-400 hover:text-gray-600 leading-none",
                                            title: "Bajar sección",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 467,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 466,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 462,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    value: section.id,
                                    onChange: (e)=>updateSection(sIdx, 'id', e.target.value),
                                    className: "w-20 h-9 text-sm font-mono",
                                    placeholder: "ID"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 470,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    value: section.title,
                                    onChange: (e)=>updateSection(sIdx, 'title', e.target.value),
                                    className: "flex-1 h-9 text-base font-semibold",
                                    placeholder: "Título de sección"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 476,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: ()=>addItem(sIdx),
                                    className: "h-9 w-9 p-0 text-green-600 hover:text-green-700 hover:bg-green-50",
                                    title: "Añadir item",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 484,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 482,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: ()=>removeSection(sIdx),
                                    className: "h-9 w-9 p-0 text-red-500 hover:text-red-600 hover:bg-red-50",
                                    title: "Eliminar sección",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 488,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 486,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 461,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 space-y-2",
                            children: [
                                section.items.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground italic px-2 py-2",
                                    children: "Sin items. Pulsa + para añadir."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 495,
                                    columnNumber: 15
                                }, this),
                                section.items.map((item, iIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-0.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>moveItem(sIdx, iIdx, -1),
                                                        className: "text-gray-300 hover:text-gray-500 leading-none",
                                                        title: "Subir",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 501,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                        lineNumber: 500,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>moveItem(sIdx, iIdx, 1),
                                                        className: "text-gray-300 hover:text-gray-500 leading-none",
                                                        title: "Bajar",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 504,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                        lineNumber: 503,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 499,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: item.id,
                                                onChange: (e)=>updateItem(sIdx, iIdx, 'id', e.target.value),
                                                className: "w-20 h-8 text-xs font-mono",
                                                placeholder: "ID"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 507,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: item.description,
                                                onChange: (e)=>updateItem(sIdx, iIdx, 'description', e.target.value),
                                                className: "flex-1 h-8 text-sm",
                                                placeholder: "Descripción del item"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 513,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap cursor-pointer shrink-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: item.hasOther,
                                                        onChange: (e)=>updateItem(sIdx, iIdx, 'hasOther', e.target.checked),
                                                        className: "rounded border-gray-300 h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                        lineNumber: 520,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Otros"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 519,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: ()=>removeItem(sIdx, iIdx),
                                                className: "h-8 w-8 p-0 text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity",
                                                title: "Eliminar",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 531,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 528,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, iIdx, true, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 498,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 493,
                            columnNumber: 11
                        }, this)
                    ]
                }, sIdx, true, {
                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                    lineNumber: 459,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "outline",
                onClick: addSection,
                className: "w-full border-dashed border-2 text-green-600 hover:bg-green-50 hover:border-green-400 gap-1 h-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 541,
                        columnNumber: 9
                    }, this),
                    "Añadir sección"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 539,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-muted-foreground text-center",
                children: [
                    sections.length,
                    " sección(es) · ",
                    sections.reduce((s, sec)=>s + sec.items.length, 0),
                    " item(s) en total"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 545,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/TemplateManager.tsx",
        lineNumber: 457,
        columnNumber: 5
    }, this);
}
_c = ChecklistEditor;
// ═══════════════════════════════════════════════════════
// VISUAL EDITOR: ExamEditor (examen)
// ═══════════════════════════════════════════════════════
function ExamEditor({ content, onChange }) {
    let parsed;
    try {
        parsed = JSON.parse(content);
    } catch  {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600",
            children: "El JSON no es válido. Corrígelo en modo JSON o carga el contenido por defecto."
        }, void 0, false, {
            fileName: "[project]/src/components/admin/TemplateManager.tsx",
            lineNumber: 561,
            columnNumber: 7
        }, this);
    }
    const questions = parsed.questions || [];
    const update = (newQuestions)=>{
        onChange(JSON.stringify({
            ...parsed,
            questions: newQuestions
        }, null, 2));
    };
    const addQuestion = ()=>{
        update([
            ...questions,
            {
                question: '',
                options: [
                    'Opción A',
                    'Opción B',
                    'Opción C',
                    'Opción D'
                ],
                correctIndex: 0
            }
        ]);
    };
    const removeQuestion = (idx)=>{
        update(questions.filter((_, i)=>i !== idx));
    };
    const updateQuestion = (idx, field, value)=>{
        const updated = [
            ...questions
        ];
        updated[idx] = {
            ...updated[idx],
            [field]: value
        };
        update(updated);
    };
    const updateOption = (qIdx, oIdx, value)=>{
        const updated = [
            ...questions
        ];
        updated[qIdx] = {
            ...updated[qIdx],
            options: updated[qIdx].options.map((o, i)=>i === oIdx ? value : o)
        };
        update(updated);
    };
    const addOption = (qIdx)=>{
        const updated = [
            ...questions
        ];
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const newIdx = updated[qIdx].options.length;
        updated[qIdx] = {
            ...updated[qIdx],
            options: [
                ...updated[qIdx].options,
                `Opción ${letters[newIdx] || newIdx + 1}`
            ]
        };
        update(updated);
    };
    const removeOption = (qIdx, oIdx)=>{
        const updated = [
            ...questions
        ];
        const newOptions = updated[qIdx].options.filter((_, i)=>i !== oIdx);
        let newCorrect = updated[qIdx].correctIndex;
        if (newCorrect >= newOptions.length) newCorrect = 0;
        else if (newCorrect > oIdx) newCorrect--;
        updated[qIdx] = {
            ...updated[qIdx],
            options: newOptions,
            correctIndex: newCorrect
        };
        update(updated);
    };
    const moveQuestion = (idx, dir)=>{
        const target = idx + dir;
        if (target < 0 || target >= questions.length) return;
        const updated = [
            ...questions
        ];
        [updated[idx], updated[target]] = [
            updated[target],
            updated[idx]
        ];
        update(updated);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            questions.map((q, qIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-2 rounded-lg overflow-hidden bg-white shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 px-4 py-3 bg-amber-50 border-b border-amber-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-0.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>moveQuestion(qIdx, -1),
                                            className: "text-gray-400 hover:text-gray-600 leading-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 626,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 625,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>moveQuestion(qIdx, 1),
                                            className: "text-gray-400 hover:text-gray-600 leading-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 629,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 628,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 624,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    className: "bg-amber-200 text-amber-800 shrink-0 text-sm px-2 py-0.5",
                                    children: [
                                        "P",
                                        qIdx + 1
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 632,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    value: q.question,
                                    onChange: (e)=>updateQuestion(qIdx, 'question', e.target.value),
                                    className: "flex-1 h-9 text-base",
                                    placeholder: "Pregunta"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 633,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: ()=>removeQuestion(qIdx),
                                    className: "h-9 w-9 p-0 text-red-500 hover:text-red-600 hover:bg-red-50",
                                    title: "Eliminar pregunta",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 641,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 639,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 623,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 space-y-2",
                            children: [
                                q.options.map((opt, oIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center gap-1.5 cursor-pointer shrink-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "radio",
                                                        name: `correct-${qIdx}`,
                                                        checked: q.correctIndex === oIdx,
                                                        onChange: ()=>updateQuestion(qIdx, 'correctIndex', oIdx),
                                                        className: "h-4 w-4 text-green-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                        lineNumber: 649,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-muted-foreground w-5 font-semibold",
                                                        children: String.fromCharCode(65 + oIdx)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                        lineNumber: 656,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 648,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: opt,
                                                onChange: (e)=>updateOption(qIdx, oIdx, e.target.value),
                                                className: `flex-1 h-8 text-sm ${q.correctIndex === oIdx ? 'border-green-400 bg-green-50' : ''}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 658,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: ()=>removeOption(qIdx, oIdx),
                                                className: "h-8 w-8 p-0 text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0",
                                                title: "Eliminar opción",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 667,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 663,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, oIdx, true, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 647,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: ()=>addOption(qIdx),
                                    className: "h-8 text-sm text-blue-500 hover:text-blue-600 gap-1 px-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 673,
                                            columnNumber: 15
                                        }, this),
                                        " Añadir opción"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 671,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 645,
                            columnNumber: 11
                        }, this)
                    ]
                }, qIdx, true, {
                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                    lineNumber: 622,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "outline",
                onClick: addQuestion,
                className: "w-full border-dashed border-2 text-amber-600 hover:bg-amber-50 hover:border-amber-400 gap-1 h-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 681,
                        columnNumber: 9
                    }, this),
                    "Añadir pregunta"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 679,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-muted-foreground text-center",
                children: [
                    questions.length,
                    " pregunta(s)"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 685,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/TemplateManager.tsx",
        lineNumber: 620,
        columnNumber: 5
    }, this);
}
_c1 = ExamEditor;
// ═══════════════════════════════════════════════════════
// VISUAL EDITOR: FormationEditor (formacion)
// ═══════════════════════════════════════════════════════
function FormationEditor({ content, onChange }) {
    let parsed;
    try {
        parsed = JSON.parse(content);
    } catch  {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600",
            children: "El JSON no es válido. Corrígelo en modo JSON o carga el contenido por defecto."
        }, void 0, false, {
            fileName: "[project]/src/components/admin/TemplateManager.tsx",
            lineNumber: 701,
            columnNumber: 7
        }, this);
    }
    const sections = parsed.sections || [];
    const update = (newSections)=>{
        onChange(JSON.stringify({
            ...parsed,
            sections: newSections
        }, null, 2));
    };
    const addSection = ()=>{
        update([
            ...sections,
            {
                title: '',
                content: ''
            }
        ]);
    };
    const removeSection = (idx)=>{
        update(sections.filter((_, i)=>i !== idx));
    };
    const updateSection = (idx, field, value)=>{
        const updated = [
            ...sections
        ];
        updated[idx] = {
            ...updated[idx],
            [field]: value
        };
        update(updated);
    };
    const moveSection = (idx, dir)=>{
        const target = idx + dir;
        if (target < 0 || target >= sections.length) return;
        const updated = [
            ...sections
        ];
        [updated[idx], updated[target]] = [
            updated[target],
            updated[idx]
        ];
        update(updated);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            sections.map((sec, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-2 rounded-lg overflow-hidden bg-white shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 px-4 py-3 bg-blue-50 border-b border-blue-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-0.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>moveSection(idx, -1),
                                            className: "text-gray-400 hover:text-gray-600 leading-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 742,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 741,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>moveSection(idx, 1),
                                            className: "text-gray-400 hover:text-gray-600 leading-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 745,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 744,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 740,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    className: "bg-blue-200 text-blue-800 shrink-0 text-sm px-2 py-0.5",
                                    children: [
                                        "Sección ",
                                        idx + 1
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 748,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    value: sec.title,
                                    onChange: (e)=>updateSection(idx, 'title', e.target.value),
                                    className: "flex-1 h-9 text-base font-semibold",
                                    placeholder: "Título de la sección"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 749,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: ()=>removeSection(idx),
                                    className: "h-9 w-9 p-0 text-red-500 hover:text-red-600 hover:bg-red-50",
                                    title: "Eliminar sección",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 757,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 755,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 739,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: sec.content,
                                onChange: (e)=>updateSection(idx, 'content', e.target.value),
                                className: "w-full h-28 p-3 border rounded-lg text-sm resize-y focus:ring-2 focus:ring-blue-300 focus:border-blue-400",
                                placeholder: "Contenido de la sección..."
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 761,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 760,
                            columnNumber: 11
                        }, this)
                    ]
                }, idx, true, {
                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                    lineNumber: 738,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "outline",
                onClick: addSection,
                className: "w-full border-dashed border-2 text-blue-600 hover:bg-blue-50 hover:border-blue-400 gap-1 h-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 773,
                        columnNumber: 9
                    }, this),
                    "Añadir sección"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 771,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-muted-foreground text-center",
                children: [
                    sections.length,
                    " sección(es) de formación"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 777,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/TemplateManager.tsx",
        lineNumber: 736,
        columnNumber: 5
    }, this);
}
_c2 = FormationEditor;
function InventoryConfigEditor({ content, onChange, sStep }) {
    let parsed;
    try {
        parsed = JSON.parse(content);
    } catch  {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600",
            children: "El JSON no es válido. Corrígelo en modo JSON o carga el contenido por defecto."
        }, void 0, false, {
            fileName: "[project]/src/components/admin/TemplateManager.tsx",
            lineNumber: 796,
            columnNumber: 7
        }, this);
    }
    const categories = parsed.categories || [];
    const extraFields = parsed.extraFields || [];
    const update = (newData)=>{
        onChange(JSON.stringify({
            ...parsed,
            ...newData
        }, null, 2));
    };
    const addCategory = ()=>{
        update({
            categories: [
                ...categories,
                {
                    value: '',
                    label: '',
                    color: 'bg-gray-100 text-gray-800'
                }
            ]
        });
    };
    const removeCategory = (idx)=>{
        update({
            categories: categories.filter((_, i)=>i !== idx)
        });
    };
    const updateCategory = (idx, field, value)=>{
        const updated = [
            ...categories
        ];
        updated[idx] = {
            ...updated[idx],
            [field]: value
        };
        update({
            categories: updated
        });
    };
    const moveCategory = (idx, dir)=>{
        const target = idx + dir;
        if (target < 0 || target >= categories.length) return;
        const updated = [
            ...categories
        ];
        [updated[idx], updated[target]] = [
            updated[target],
            updated[idx]
        ];
        update({
            categories: updated
        });
    };
    const addField = ()=>{
        update({
            extraFields: [
                ...extraFields,
                {
                    key: '',
                    label: '',
                    type: 'text'
                }
            ]
        });
    };
    const removeField = (idx)=>{
        update({
            extraFields: extraFields.filter((_, i)=>i !== idx)
        });
    };
    const updateField = (idx, field, value)=>{
        const updated = [
            ...extraFields
        ];
        updated[idx] = {
            ...updated[idx],
            [field]: value
        };
        // Remove options if type is not select
        if (field === 'type' && value !== 'select') {
            const { options, ...rest } = updated[idx];
            updated[idx] = rest;
        }
        update({
            extraFields: updated
        });
    };
    const moveField = (idx, dir)=>{
        const target = idx + dir;
        if (target < 0 || target >= extraFields.length) return;
        const updated = [
            ...extraFields
        ];
        [updated[idx], updated[target]] = [
            updated[target],
            updated[idx]
        ];
        update({
            extraFields: updated
        });
    };
    const addOption = (fIdx)=>{
        const updated = [
            ...extraFields
        ];
        const opts = [
            ...updated[fIdx].options || [],
            ''
        ];
        updated[fIdx] = {
            ...updated[fIdx],
            options: opts
        };
        update({
            extraFields: updated
        });
    };
    const removeOption = (fIdx, oIdx)=>{
        const updated = [
            ...extraFields
        ];
        const opts = (updated[fIdx].options || []).filter((_, i)=>i !== oIdx);
        updated[fIdx] = {
            ...updated[fIdx],
            options: opts
        };
        update({
            extraFields: updated
        });
    };
    const updateOption = (fIdx, oIdx, value)=>{
        const updated = [
            ...extraFields
        ];
        const opts = [
            ...updated[fIdx].options || []
        ];
        opts[oIdx] = value;
        updated[fIdx] = {
            ...updated[fIdx],
            options: opts
        };
        update({
            extraFields: updated
        });
    };
    const COLOR_PRESETS = [
        'bg-green-100 text-green-800',
        'bg-blue-100 text-blue-800',
        'bg-yellow-100 text-yellow-800',
        'bg-red-100 text-red-800',
        'bg-purple-100 text-purple-800',
        'bg-orange-100 text-orange-800',
        'bg-gray-100 text-gray-800',
        'bg-cyan-100 text-cyan-800',
        'bg-amber-100 text-amber-800',
        'bg-teal-100 text-teal-800',
        'bg-pink-100 text-pink-800'
    ];
    // Built-in fields that always appear in the inventory form (not editable in template, shown for reference)
    const builtInFields = sStep === 1 ? [
        {
            label: 'Elemento',
            section: 'Datos básicos',
            note: 'Nombre del elemento (obligatorio)'
        },
        {
            label: 'Zona',
            section: 'Datos básicos',
            note: 'Se rellena automáticamente con la zona actual'
        },
        {
            label: 'Categoría',
            section: 'Datos básicos',
            note: 'Innecesario (fijo)'
        },
        {
            label: 'Cantidad',
            section: 'Datos básicos'
        },
        {
            label: 'Precio (€)',
            section: 'Datos básicos'
        },
        {
            label: 'F. Entrada',
            section: 'Etiqueta',
            note: 'Fecha de entrada a la Jaula'
        },
        {
            label: 'F. Revisión',
            section: 'Etiqueta',
            note: 'Calculada automáticamente (F. Entrada + Días cuarentena)'
        },
        {
            label: 'Z. Origen',
            section: 'Zonas',
            note: 'Zona donde se encontró el elemento'
        },
        {
            label: 'Z. Destino',
            section: 'Zonas',
            note: 'Siempre "Jaula" para innecesarios'
        }
    ] : sStep === 2 ? [
        {
            label: 'Elemento',
            section: 'Datos básicos'
        },
        {
            label: 'Ubicación',
            section: 'Datos básicos'
        },
        {
            label: 'Zona',
            section: 'Datos básicos'
        },
        {
            label: 'Categoría',
            section: 'Datos básicos'
        },
        {
            label: 'Total exist.',
            section: 'Datos básicos'
        },
        {
            label: 'Precio (€)',
            section: 'Datos básicos'
        }
    ] : [
        {
            label: 'Elemento',
            section: 'Datos básicos'
        },
        {
            label: 'Ubicación',
            section: 'Datos básicos'
        },
        {
            label: 'Zona',
            section: 'Datos básicos'
        },
        {
            label: 'Categoría',
            section: 'Datos básicos'
        },
        {
            label: 'Total exist.',
            section: 'Datos básicos'
        },
        {
            label: 'Precio (€)',
            section: 'Datos básicos'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-sm font-bold text-blue-700 mb-2 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                className: "bg-blue-100 text-blue-800",
                                children: "Campos fijos del formulario"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 923,
                                columnNumber: 11
                            }, this),
                            builtInFields.length,
                            " campo(s) — no editables"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 922,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border rounded-lg p-3 bg-blue-50/30 space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-blue-600 mb-2",
                                children: "Estos campos siempre aparecen en el inventario y no se pueden quitar de la plantilla."
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 927,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 gap-1",
                                children: builtInFields.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-xs px-2 py-1 rounded bg-white/60",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-blue-800",
                                                children: f.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 931,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-blue-400",
                                                children: "—"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 932,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-blue-500 text-[10px]",
                                                children: f.section
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 933,
                                                columnNumber: 17
                                            }, this),
                                            f.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] text-blue-400 italic",
                                                children: [
                                                    "(",
                                                    f.note,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 934,
                                                columnNumber: 28
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 930,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 928,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 926,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 921,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-sm font-bold text-orange-700 mb-2 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                className: "bg-orange-100 text-orange-800",
                                children: "Categorías"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 944,
                                columnNumber: 11
                            }, this),
                            categories.length,
                            " categoría(s)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 943,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            categories.map((cat, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 group border rounded-lg p-2 bg-white",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-0.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>moveCategory(idx, -1),
                                                    className: "text-gray-300 hover:text-gray-500 leading-none",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                        lineNumber: 952,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 951,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>moveCategory(idx, 1),
                                                    className: "text-gray-300 hover:text-gray-500 leading-none",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                        lineNumber: 955,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 954,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 950,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: cat.value,
                                            onChange: (e)=>updateCategory(idx, 'value', e.target.value),
                                            className: "w-32 h-8 text-xs",
                                            placeholder: "Valor (ej: muy_frecuente)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 958,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: cat.label,
                                            onChange: (e)=>updateCategory(idx, 'label', e.target.value),
                                            className: "flex-1 h-8 text-xs",
                                            placeholder: "Etiqueta (ej: Muy frecuente)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 960,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: cat.color,
                                            onChange: (e)=>updateCategory(idx, 'color', e.target.value),
                                            className: "h-8 text-xs border rounded px-1 max-w-[180px]",
                                            children: COLOR_PRESETS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: c,
                                                    children: c
                                                }, c, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 964,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 962,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: cat.color,
                                            children: cat.label || 'Preview'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 966,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: ()=>removeCategory(idx),
                                            className: "h-8 w-8 p-0 text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 969,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 967,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 949,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: addCategory,
                                size: "sm",
                                className: "w-full border-dashed border-2 text-orange-600 hover:bg-orange-50 hover:border-orange-400 gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 975,
                                        columnNumber: 13
                                    }, this),
                                    " Añadir categoría"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 973,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 947,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 942,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-sm font-bold text-teal-700 mb-2 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                className: "bg-teal-100 text-teal-800",
                                children: "Campos extra"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 983,
                                columnNumber: 11
                            }, this),
                            extraFields.length,
                            " campo(s)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 982,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            extraFields.map((field, fIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-2 rounded-lg overflow-hidden bg-white shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 px-3 py-2 bg-teal-50 border-b border-teal-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-0.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>moveField(fIdx, -1),
                                                            className: "text-gray-300 hover:text-gray-500 leading-none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                                className: "h-3.5 w-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                lineNumber: 992,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 991,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>moveField(fIdx, 1),
                                                            className: "text-gray-300 hover:text-gray-500 leading-none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                className: "h-3.5 w-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                lineNumber: 995,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 994,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 990,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    className: "bg-teal-200 text-teal-800 shrink-0 text-[10px] px-1.5 py-0.5",
                                                    children: [
                                                        "Campo ",
                                                        fIdx + 1
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 998,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: field.key,
                                                    onChange: (e)=>updateField(fIdx, 'key', e.target.value),
                                                    className: "w-36 h-7 text-xs font-mono",
                                                    placeholder: "key (ej: ubicacion)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 999,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: field.label,
                                                    onChange: (e)=>updateField(fIdx, 'label', e.target.value),
                                                    className: "flex-1 h-7 text-xs",
                                                    placeholder: "Etiqueta (ej: Ubicación asignada)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1001,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: field.type,
                                                    onChange: (e)=>updateField(fIdx, 'type', e.target.value),
                                                    className: "h-7 text-xs border rounded px-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "text",
                                                            children: "Texto"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1005,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "number",
                                                            children: "Número"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1006,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "select",
                                                            children: "Selección"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1007,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1003,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    onClick: ()=>removeField(fIdx),
                                                    className: "h-7 w-7 p-0 text-red-400 hover:text-red-500",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                        lineNumber: 1011,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1009,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 989,
                                            columnNumber: 15
                                        }, this),
                                        field.type === 'select' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-3 py-2 space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-[10px] text-muted-foreground",
                                                    children: "Opciones:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1016,
                                                    columnNumber: 19
                                                }, this),
                                                (field.options || []).map((opt, oIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                value: opt,
                                                                onChange: (e)=>updateOption(fIdx, oIdx, e.target.value),
                                                                className: "flex-1 h-7 text-xs",
                                                                placeholder: `Opción ${oIdx + 1}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                lineNumber: 1019,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                variant: "ghost",
                                                                size: "sm",
                                                                onClick: ()=>removeOption(fIdx, oIdx),
                                                                className: "h-7 w-7 p-0 text-red-300 hover:text-red-500",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 1023,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                lineNumber: 1021,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, oIdx, true, {
                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                        lineNumber: 1018,
                                                        columnNumber: 21
                                                    }, this)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    onClick: ()=>addOption(fIdx),
                                                    className: "h-7 text-xs text-teal-600 hover:text-teal-700 gap-1 px-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            className: "h-3 w-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1029,
                                                            columnNumber: 21
                                                        }, this),
                                                        " Añadir opción"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1027,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1015,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, fIdx, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 988,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: addField,
                                size: "sm",
                                className: "w-full border-dashed border-2 text-teal-600 hover:bg-teal-50 hover:border-teal-400 gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 1037,
                                        columnNumber: 13
                                    }, this),
                                    " Añadir campo extra"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 1035,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 986,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 981,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/TemplateManager.tsx",
        lineNumber: 919,
        columnNumber: 5
    }, this);
}
_c3 = InventoryConfigEditor;
function StandardTemplateEditor({ content, onChange }) {
    let parsed;
    try {
        parsed = JSON.parse(content);
    } catch  {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600",
            children: "El JSON no es válido. Corrígelo en modo JSON o carga el contenido por defecto."
        }, void 0, false, {
            fileName: "[project]/src/components/admin/TemplateManager.tsx",
            lineNumber: 1056,
            columnNumber: 7
        }, this);
    }
    const fields = parsed.fields || [];
    const update = (newFields)=>{
        onChange(JSON.stringify({
            ...parsed,
            fields: newFields
        }, null, 2));
    };
    const addField = ()=>{
        update([
            ...fields,
            {
                key: '',
                label: '',
                type: 'text',
                required: false
            }
        ]);
    };
    const removeField = (idx)=>{
        update(fields.filter((_, i)=>i !== idx));
    };
    const updateField = (idx, field, value)=>{
        const updated = [
            ...fields
        ];
        updated[idx] = {
            ...updated[idx],
            [field]: value
        };
        // Remove options if type is not select
        if (field === 'type' && value !== 'select') {
            const { options, ...rest } = updated[idx];
            updated[idx] = rest;
        }
        update(updated);
    };
    const moveField = (idx, dir)=>{
        const target = idx + dir;
        if (target < 0 || target >= fields.length) return;
        const updated = [
            ...fields
        ];
        [updated[idx], updated[target]] = [
            updated[target],
            updated[idx]
        ];
        update(updated);
    };
    const addOption = (fIdx)=>{
        const updated = [
            ...fields
        ];
        const opts = [
            ...updated[fIdx].options || [],
            ''
        ];
        updated[fIdx] = {
            ...updated[fIdx],
            options: opts
        };
        update(updated);
    };
    const removeOption = (fIdx, oIdx)=>{
        const updated = [
            ...fields
        ];
        const opts = (updated[fIdx].options || []).filter((_, i)=>i !== oIdx);
        updated[fIdx] = {
            ...updated[fIdx],
            options: opts
        };
        update(updated);
    };
    const updateOption = (fIdx, oIdx, value)=>{
        const updated = [
            ...fields
        ];
        const opts = [
            ...updated[fIdx].options || []
        ];
        opts[oIdx] = value;
        updated[fIdx] = {
            ...updated[fIdx],
            options: opts
        };
        update(updated);
    };
    const TYPE_LABELS = {
        photo: 'Foto',
        text: 'Texto',
        number: 'Número',
        select: 'Selección'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            fields.map((field, fIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-2 rounded-lg overflow-hidden bg-white shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 px-3 py-2 bg-violet-50 border-b border-violet-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-0.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>moveField(fIdx, -1),
                                            className: "text-gray-300 hover:text-gray-500 leading-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 1126,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1125,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>moveField(fIdx, 1),
                                            className: "text-gray-300 hover:text-gray-500 leading-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 1129,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1128,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1124,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    className: "bg-violet-200 text-violet-800 shrink-0 text-[10px] px-1.5 py-0.5",
                                    children: [
                                        "Campo ",
                                        fIdx + 1
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1132,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    value: field.key,
                                    onChange: (e)=>updateField(fIdx, 'key', e.target.value),
                                    className: "w-36 h-7 text-xs font-mono",
                                    placeholder: "key (ej: beforePhotoUrl)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1133,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    value: field.label,
                                    onChange: (e)=>updateField(fIdx, 'label', e.target.value),
                                    className: "flex-1 h-7 text-xs",
                                    placeholder: "Etiqueta (ej: Foto Antes)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: field.type,
                                    onChange: (e)=>updateField(fIdx, 'type', e.target.value),
                                    className: "h-7 text-xs border rounded px-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "text",
                                            children: "Texto"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1139,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "number",
                                            children: "Número"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1140,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "select",
                                            children: "Selección"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1141,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "photo",
                                            children: "Foto"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1142,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1137,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-center gap-1 text-[10px] text-muted-foreground whitespace-nowrap cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: field.required || false,
                                            onChange: (e)=>updateField(fIdx, 'required', e.target.checked),
                                            className: "rounded border-gray-300 h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1145,
                                            columnNumber: 15
                                        }, this),
                                        "Oblig."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1144,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: ()=>removeField(fIdx),
                                    className: "h-7 w-7 p-0 text-red-400 hover:text-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 1152,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1150,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 1123,
                            columnNumber: 11
                        }, this),
                        field.type === 'select' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-3 py-2 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-[10px] text-muted-foreground",
                                    children: "Opciones:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1157,
                                    columnNumber: 15
                                }, this),
                                (field.options || []).map((opt, oIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: opt,
                                                onChange: (e)=>updateOption(fIdx, oIdx, e.target.value),
                                                className: "flex-1 h-7 text-xs",
                                                placeholder: `Opción ${oIdx + 1}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 1160,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: ()=>removeOption(fIdx, oIdx),
                                                className: "h-7 w-7 p-0 text-red-300 hover:text-red-500",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1164,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 1162,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, oIdx, true, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 1159,
                                        columnNumber: 17
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: ()=>addOption(fIdx),
                                    className: "h-7 text-xs text-violet-600 hover:text-violet-700 gap-1 px-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1170,
                                            columnNumber: 17
                                        }, this),
                                        " Añadir opción"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1168,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 1156,
                            columnNumber: 13
                        }, this)
                    ]
                }, fIdx, true, {
                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                    lineNumber: 1122,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "outline",
                onClick: addField,
                size: "sm",
                className: "w-full border-dashed border-2 text-violet-600 hover:bg-violet-50 hover:border-violet-400 gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1179,
                        columnNumber: 9
                    }, this),
                    " Añadir campo"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-muted-foreground text-center",
                children: [
                    fields.length,
                    " campo(s) · ",
                    fields.filter((f)=>f.required).length,
                    " obligatorio(s)"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1182,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/TemplateManager.tsx",
        lineNumber: 1120,
        columnNumber: 5
    }, this);
}
_c4 = StandardTemplateEditor;
function PlanAccionEditor({ content, onChange }) {
    let parsed;
    try {
        parsed = JSON.parse(content);
    } catch  {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600",
            children: "El JSON no es válido. Corrígelo en modo JSON o carga el contenido por defecto."
        }, void 0, false, {
            fileName: "[project]/src/components/admin/TemplateManager.tsx",
            lineNumber: 1203,
            columnNumber: 7
        }, this);
    }
    const columns = parsed.columns || [];
    const update = (newData)=>{
        onChange(JSON.stringify({
            ...parsed,
            ...newData
        }, null, 2));
    };
    const addColumn = ()=>{
        update({
            columns: [
                ...columns,
                {
                    key: '',
                    label: '',
                    type: 'text'
                }
            ]
        });
    };
    const removeColumn = (idx)=>{
        update({
            columns: columns.filter((_, i)=>i !== idx)
        });
    };
    const updateColumn = (idx, field, value)=>{
        const updated = [
            ...columns
        ];
        updated[idx] = {
            ...updated[idx],
            [field]: value
        };
        // Remove options if type is not select
        if (field === 'type' && value !== 'select') {
            const { options, ...rest } = updated[idx];
            updated[idx] = rest;
        }
        update({
            columns: updated
        });
    };
    const moveColumn = (idx, dir)=>{
        const target = idx + dir;
        if (target < 0 || target >= columns.length) return;
        const updated = [
            ...columns
        ];
        [updated[idx], updated[target]] = [
            updated[target],
            updated[idx]
        ];
        update({
            columns: updated
        });
    };
    const addOption = (cIdx)=>{
        const updated = [
            ...columns
        ];
        const opts = [
            ...updated[cIdx].options || [],
            ''
        ];
        updated[cIdx] = {
            ...updated[cIdx],
            options: opts
        };
        update({
            columns: updated
        });
    };
    const removeOption = (cIdx, oIdx)=>{
        const updated = [
            ...columns
        ];
        const opts = (updated[cIdx].options || []).filter((_, i)=>i !== oIdx);
        updated[cIdx] = {
            ...updated[cIdx],
            options: opts
        };
        update({
            columns: updated
        });
    };
    const updateOption = (cIdx, oIdx, value)=>{
        const updated = [
            ...columns
        ];
        const opts = [
            ...updated[cIdx].options || []
        ];
        opts[oIdx] = value;
        updated[cIdx] = {
            ...updated[cIdx],
            options: opts
        };
        update({
            columns: updated
        });
    };
    const TYPE_LABELS = {
        text: 'Texto',
        textarea: 'Texto largo',
        number: 'Número',
        date: 'Fecha',
        select: 'Selección'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-sm font-semibold text-rose-700",
                        children: "Descripción del Plan de Acción"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1270,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: parsed.description || '',
                        onChange: (e)=>update({
                                description: e.target.value
                            }),
                        className: "w-full h-20 p-3 border rounded-lg text-sm mt-1 resize-y focus:ring-2 focus:ring-rose-300 focus:border-rose-400",
                        placeholder: "Descripción del plan de acción..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1271,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1269,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-rose-50 border border-rose-200 rounded-lg p-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-rose-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "Plan de Acción:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 1282,
                            columnNumber: 11
                        }, this),
                        " Registro de deficiencias detectadas en las autoevaluaciones y auditorías. Cada columna define un campo de la tabla donde se registrarán las acciones correctivas/preventivas, responsables y seguimiento del progreso."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                    lineNumber: 1281,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1280,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-sm font-bold text-rose-700 mb-2 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                className: "bg-rose-100 text-rose-800",
                                children: "Columnas de la tabla"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 1290,
                                columnNumber: 11
                            }, this),
                            columns.length,
                            " columna(s)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1289,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            columns.map((col, cIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-2 rounded-lg overflow-hidden bg-white shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 px-3 py-2 bg-rose-50 border-b border-rose-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-0.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>moveColumn(cIdx, -1),
                                                            className: "text-gray-300 hover:text-gray-500 leading-none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                                className: "h-3.5 w-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                lineNumber: 1299,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1298,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>moveColumn(cIdx, 1),
                                                            className: "text-gray-300 hover:text-gray-500 leading-none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                className: "h-3.5 w-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                lineNumber: 1302,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1301,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1297,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    className: "bg-rose-200 text-rose-800 shrink-0 text-[10px] px-1.5 py-0.5",
                                                    children: [
                                                        "Col ",
                                                        cIdx + 1
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1305,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: col.key,
                                                    onChange: (e)=>updateColumn(cIdx, 'key', e.target.value),
                                                    className: "w-32 h-7 text-xs font-mono",
                                                    placeholder: "key (ej: zona)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1306,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: col.label,
                                                    onChange: (e)=>updateColumn(cIdx, 'label', e.target.value),
                                                    className: "flex-1 h-7 text-xs",
                                                    placeholder: "Etiqueta (ej: Zona)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1308,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: col.type,
                                                    onChange: (e)=>updateColumn(cIdx, 'type', e.target.value),
                                                    className: "h-7 text-xs border rounded px-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "text",
                                                            children: "Texto"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1312,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "textarea",
                                                            children: "Texto largo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1313,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "number",
                                                            children: "Número"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1314,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "date",
                                                            children: "Fecha"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1315,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "select",
                                                            children: "Selección"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1316,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1310,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-1 text-[10px] text-muted-foreground whitespace-nowrap cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: col.required || false,
                                                            onChange: (e)=>updateColumn(cIdx, 'required', e.target.checked),
                                                            className: "rounded border-gray-300 h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1319,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Oblig."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1318,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    onClick: ()=>removeColumn(cIdx),
                                                    className: "h-7 w-7 p-0 text-red-400 hover:text-red-500",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                        lineNumber: 1326,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1324,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1296,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-3 py-2 space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    className: "text-[10px] text-muted-foreground",
                                                                    children: "Descripción / Ayuda"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 1332,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                    value: col.description || '',
                                                                    onChange: (e)=>updateColumn(cIdx, 'description', e.target.value),
                                                                    className: "h-7 text-xs mt-0.5",
                                                                    placeholder: "Texto de ayuda para este campo"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 1333,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1331,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-28",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    className: "text-[10px] text-muted-foreground",
                                                                    children: "Ancho"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 1337,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                    value: col.width || '',
                                                                    onChange: (e)=>updateColumn(cIdx, 'width', e.target.value),
                                                                    className: "h-7 text-xs mt-0.5",
                                                                    placeholder: "100px"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 1338,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1336,
                                                            columnNumber: 19
                                                        }, this),
                                                        col.type === 'text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-32",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    className: "text-[10px] text-muted-foreground",
                                                                    children: "Placeholder"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 1343,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                    value: col.placeholder || '',
                                                                    onChange: (e)=>updateColumn(cIdx, 'placeholder', e.target.value),
                                                                    className: "h-7 text-xs mt-0.5",
                                                                    placeholder: "Ej: A-S1-001"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 1344,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1342,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1330,
                                                    columnNumber: 17
                                                }, this),
                                                col.type === 'select' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                            className: "text-[10px] text-muted-foreground",
                                                            children: "Opciones:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1351,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-wrap gap-1 mt-1",
                                                            children: [
                                                                (col.options || []).map((opt, oIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                                value: opt,
                                                                                onChange: (e)=>updateOption(cIdx, oIdx, e.target.value),
                                                                                className: "h-7 text-xs w-32",
                                                                                placeholder: `Opción ${oIdx + 1}`
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                lineNumber: 1355,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                variant: "ghost",
                                                                                size: "sm",
                                                                                onClick: ()=>removeOption(cIdx, oIdx),
                                                                                className: "h-7 w-7 p-0 text-red-300 hover:text-red-500",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                    className: "h-3 w-3"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                    lineNumber: 1359,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                lineNumber: 1357,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, oIdx, true, {
                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                        lineNumber: 1354,
                                                                        columnNumber: 25
                                                                    }, this)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    variant: "ghost",
                                                                    size: "sm",
                                                                    onClick: ()=>addOption(cIdx),
                                                                    className: "h-7 text-xs text-rose-600 hover:text-rose-700 gap-1 px-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                            lineNumber: 1365,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        " Añadir"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 1363,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1352,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1350,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1329,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, cIdx, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1295,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: addColumn,
                                size: "sm",
                                className: "w-full border-dashed border-2 text-rose-600 hover:bg-rose-50 hover:border-rose-400 gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 1375,
                                        columnNumber: 13
                                    }, this),
                                    " Añadir columna"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 1373,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1293,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1288,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-50 border rounded-lg p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Tipos de origen:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 1383,
                                columnNumber: 11
                            }, this),
                            " ",
                            (parsed.sourceTypes || []).join(', ') || 'autoevaluacion, auditoria'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1382,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-400 mt-1",
                        children: "Las deficiencias se alimentan automáticamente desde las autoevaluaciones y auditorías de este mismo paso S."
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1385,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1381,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-muted-foreground text-center",
                children: [
                    columns.length,
                    " columna(s) · ",
                    columns.filter((c)=>c.required).length,
                    " obligatoria(s)"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1390,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/TemplateManager.tsx",
        lineNumber: 1267,
        columnNumber: 5
    }, this);
}
_c5 = PlanAccionEditor;
// ═══════════════════════════════════════════════════════
// VISUAL EDITOR: LayoutTemplateEditor (layout)
// ═══════════════════════════════════════════════════════
function LayoutTemplateEditor({ content, onChange }) {
    let parsed = {};
    try {
        parsed = JSON.parse(content);
    } catch  {}
    const updateField = (key, value)=>{
        const updated = {
            ...parsed,
            [key]: value
        };
        onChange(JSON.stringify(updated, null, 2));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-blue-50 border border-blue-200 rounded-lg p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-blue-700 font-semibold",
                        children: "Layout de Zona"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1412,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-blue-600 mt-1",
                        children: "Esta plantilla configura la herramienta de dibujo/subida de layout de zona. Los layouts creados se guardarán como estándares en la Biblioteca de S4."
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1413,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1411,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xs font-semibold",
                        children: "Descripción"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1420,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                        value: parsed.description || '',
                        onChange: (e)=>updateField('description', e.target.value),
                        placeholder: "Describe el propósito del layout de zona...",
                        className: "text-xs min-h-[60px]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1421,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1419,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xs font-semibold",
                        children: "Tipo de Layout"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1430,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        value: parsed.layoutType || 'zone_layout',
                        onChange: (e)=>updateField('layoutType', e.target.value),
                        className: "h-8 text-xs"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1431,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1429,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "checkbox",
                        checked: parsed.targetS4Library === true,
                        onChange: (e)=>updateField('targetS4Library', e.target.checked)
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1439,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xs",
                        children: "Enviar a Biblioteca de Estándares de S4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1441,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1438,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-50 border rounded-lg p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold text-gray-700 mb-2",
                        children: "Colores de Suelo (RAL)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1445,
                        columnNumber: 9
                    }, this),
                    (parsed.floorColors || []).map((fc, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 mb-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-4 h-4 rounded border",
                                    style: {
                                        backgroundColor: fc.color
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1448,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px]",
                                    children: [
                                        fc.label,
                                        " (",
                                        fc.ral,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1449,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 1447,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] text-muted-foreground mt-1",
                        children: "Los colores RAL se configuran desde el editor de layout."
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1452,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1444,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-muted-foreground text-center",
                children: "Layout de Zona · Herramienta de dibujo/subida integrada"
            }, void 0, false, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1455,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/TemplateManager.tsx",
        lineNumber: 1410,
        columnNumber: 5
    }, this);
}
_c6 = LayoutTemplateEditor;
function PlanLimpiezaTemplateEditor({ content, onChange }) {
    let parsed = {};
    try {
        parsed = JSON.parse(content);
    } catch  {}
    const sections = parsed.sections || [];
    const updateField = (key, value)=>{
        const updated = {
            ...parsed,
            [key]: value
        };
        onChange(JSON.stringify(updated, null, 2));
    };
    const updateSection = (index, field, value)=>{
        const newSections = [
            ...sections
        ];
        newSections[index] = {
            ...newSections[index],
            [field]: value
        };
        updateField('sections', newSections);
    };
    const addSection = ()=>{
        const newSections = [
            ...sections,
            {
                key: `seccion_${sections.length + 1}`,
                label: 'Nueva Sección',
                type: 'text',
                description: ''
            }
        ];
        updateField('sections', newSections);
    };
    const removeSection = (index)=>{
        const newSections = sections.filter((_, i)=>i !== index);
        updateField('sections', newSections);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-cyan-50 border border-cyan-200 rounded-lg p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-cyan-700 font-semibold",
                        children: "Plan de Inspección y Limpieza"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1499,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-cyan-600 mt-1",
                        children: "Define la ruta de inspección, los puntos de suciedad no eliminables y las acciones de limpieza. Los planes creados se guardarán como estándares en la Biblioteca de S4."
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1500,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1498,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xs font-semibold",
                        children: "Descripción"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1507,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                        value: parsed.description || '',
                        onChange: (e)=>updateField('description', e.target.value),
                        placeholder: "Describe el plan de inspección y limpieza...",
                        className: "text-xs min-h-[60px]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1508,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1506,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "checkbox",
                        checked: parsed.targetS4Library === true,
                        onChange: (e)=>updateField('targetS4Library', e.target.checked)
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1517,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xs",
                        children: "Enviar a Biblioteca de Estándares de S4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1519,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1516,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-xs font-semibold",
                                children: "Secciones del Plan"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 1524,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                onClick: addSection,
                                className: "h-6 text-[10px] gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 1526,
                                        columnNumber: 13
                                    }, this),
                                    " Añadir Sección"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 1525,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1523,
                        columnNumber: 9
                    }, this),
                    sections.map((sec, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white border rounded-lg p-3 mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: sec.key,
                                            onChange: (e)=>updateSection(i, 'key', e.target.value),
                                            className: "h-7 text-xs flex-1",
                                            placeholder: "key"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1532,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: sec.label,
                                            onChange: (e)=>updateSection(i, 'label', e.target.value),
                                            className: "h-7 text-xs flex-1",
                                            placeholder: "Etiqueta"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1534,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                            value: sec.type,
                                            onValueChange: (v)=>updateSection(i, 'type', v),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    className: "h-7 text-xs w-28",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                        lineNumber: 1537,
                                                        columnNumber: 61
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1537,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "route",
                                                            children: "Ruta"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1539,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "checklist",
                                                            children: "Checklist"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1540,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "list",
                                                            children: "Lista"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1541,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "select",
                                                            children: "Selección"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1542,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "text",
                                                            children: "Texto"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 1543,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1538,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1536,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: ()=>removeSection(i),
                                            className: "h-7 w-7 p-0 text-red-500",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 1547,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1546,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1531,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    value: sec.description || '',
                                    onChange: (e)=>updateSection(i, 'description', e.target.value),
                                    className: "h-7 text-xs",
                                    placeholder: "Descripción de la sección"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1550,
                                    columnNumber: 13
                                }, this),
                                sec.type === 'select' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    value: (sec.options || []).join(', '),
                                    onChange: (e)=>updateSection(i, 'options', e.target.value.split(',').map((s)=>s.trim()).filter(Boolean)),
                                    className: "h-7 text-xs mt-1",
                                    placeholder: "Opciones separadas por coma"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1553,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 1530,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1522,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-muted-foreground text-center",
                children: [
                    sections.length,
                    " sección(es) · Plan de Inspección y Limpieza"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1563,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/TemplateManager.tsx",
        lineNumber: 1497,
        columnNumber: 5
    }, this);
}
_c7 = PlanLimpiezaTemplateEditor;
// ═══════════════════════════════════════════════════════
// VISUAL EDITOR: PDCATemplateEditor (pdca)
// ═══════════════════════════════════════════════════════
function PDCATemplateEditor({ content, onChange }) {
    let parsed = {};
    try {
        parsed = JSON.parse(content);
    } catch  {}
    const updateField = (key, value)=>{
        const updated = {
            ...parsed,
            [key]: value
        };
        onChange(JSON.stringify(updated, null, 2));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-orange-50 border border-orange-200 rounded-lg p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-orange-700 font-semibold",
                        children: "Tablero PDCA — Mejora Continua"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1585,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-orange-600 mt-1",
                        children: "Configuración del tablero PDCA (Plan-Do-Check-Act) como herramienta de mejora continua. Incluye KPIs de progreso y enlace al Plan de Acción y Biblioteca de Estándares."
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1586,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1584,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xs font-semibold",
                        children: "Descripción"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1593,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                        value: parsed.description || '',
                        onChange: (e)=>updateField('description', e.target.value),
                        placeholder: "Describe el tablero PDCA...",
                        className: "text-xs min-h-[60px]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1594,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1592,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xs font-semibold mb-2 block",
                        children: "Fases PDCA"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1603,
                        columnNumber: 9
                    }, this),
                    (parsed.phases || []).map((phase, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 mb-2 bg-white border rounded-lg p-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold",
                                    style: {
                                        backgroundColor: phase.color
                                    },
                                    children: phase.label?.charAt(0)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1606,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-bold",
                                                    children: phase.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1612,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-muted-foreground",
                                                    children: [
                                                        "(",
                                                        phase.labelEs,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 1613,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1611,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-muted-foreground",
                                            children: phase.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1615,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1610,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 1605,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] text-muted-foreground mt-1",
                        children: "Las fases PDCA son fijas (Plan-Do-Check-Act) y no se pueden modificar."
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1619,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1602,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xs font-semibold mb-2 block",
                        children: "KPIs del Tablero"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1623,
                        columnNumber: 9
                    }, this),
                    (parsed.kpis || []).map((kpi, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white border rounded-lg p-2 mb-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: "bg-orange-100 text-orange-800 text-[9px]",
                                            children: kpi.key
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1627,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-semibold",
                                            children: kpi.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 1628,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1626,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-muted-foreground ml-2",
                                    children: kpi.description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 1630,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 1625,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1622,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xs font-semibold mb-2 block",
                        children: "Enlaces Integrados"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1636,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: (parsed.links || []).map((link, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                className: "bg-teal-100 text-teal-800 text-[10px]",
                                children: link === 'plan_accion' ? '📋 Plan de Acción' : link === 'standards_library' ? '📚 Biblioteca' : link
                            }, i, false, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 1639,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1637,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] text-muted-foreground mt-1",
                        children: "El tablero PDCA se enlaza automáticamente con el Plan de Acción y la Biblioteca de Estándares."
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 1644,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1635,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-muted-foreground text-center",
                children: [
                    "Tablero PDCA · Mejora Continua · ",
                    (parsed.phases || []).length,
                    " fases · ",
                    (parsed.kpis || []).length,
                    " KPIs"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 1649,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/TemplateManager.tsx",
        lineNumber: 1583,
        columnNumber: 5
    }, this);
}
_c8 = PDCATemplateEditor;
// ═══════════════════════════════════════════════════════
// PASO DEFINITIONS — which template types belong to each paso
// ═══════════════════════════════════════════════════════
const PASO_CONFIG = [
    {
        paso: 1,
        label: 'Formación y Exámenes',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
        types: [
            'formacion',
            'examen'
        ]
    },
    {
        paso: 2,
        label: 'Fotografías (Antes/Después)',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"],
        types: [
            'fotos'
        ]
    },
    {
        paso: 3,
        label: 'Inventario / Estándar / Layout / Plan Limpieza',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"],
        types: [
            'inventario',
            'estandar',
            'layout',
            'plan_limpieza'
        ]
    },
    {
        paso: 4,
        label: 'Autoevaluación / Plan de Acción',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__["ClipboardCheck"],
        types: [
            'autoevaluacion',
            'plan_accion'
        ]
    },
    {
        paso: 5,
        label: 'Auditoría Externa / PDCA',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCheck$3e$__["FileCheck"],
        types: [
            'auditoria',
            'pdca'
        ]
    }
];
function TemplateManager() {
    _s();
    const { currentProject } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use5SStore"])();
    const [templates, setTemplates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingTemplate, setEditingTemplate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isCreating, setIsCreating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [expandedS, setExpandedS] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [expandedPaso, setExpandedPaso] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null) // 'S2-P3' format
    ;
    const [editorMode, setEditorMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('visual');
    // Form state
    const [formType, setFormType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('formacion');
    const [formSStep, setFormSStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [formMiniStep, setFormMiniStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3);
    const [formTitle, setFormTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [formDescription, setFormDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [formContent, setFormContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [formNotaMinima, setFormNotaMinima] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notaMinimaAplica, setNotaMinimaAplica] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [formActive, setFormActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Save feedback
    const [saveMessage, setSaveMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Fetch ALL templates at once (all types)
    const ALL_TYPES = [
        'formacion',
        'examen',
        'fotos',
        'inventario',
        'estandar',
        'layout',
        'plan_limpieza',
        'autoevaluacion',
        'plan_accion',
        'auditoria',
        'pdca'
    ];
    const fetchTemplates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TemplateManager.useCallback[fetchTemplates]": async (withSeed = false)=>{
            setIsLoading(true);
            try {
                // Run seed on first load to ensure miniStep values are correct.
                // The seed now fixes miniStep and creates missing templates.
                if (withSeed) {
                    try {
                        await fetch('/api/seed/templates', {
                            method: 'POST'
                        });
                    } catch (e) {
                        console.error('Auto-seed error:', e);
                    }
                }
                // Fetch all templates
                const allTemplates = [];
                for (const type of ALL_TYPES){
                    const res = await fetch(`/api/templates?type=${type}&includeInactive=true`);
                    const data = await res.json();
                    if (data.success && data.data) allTemplates.push(...data.data);
                }
                setTemplates(allTemplates);
            } catch (e) {
                console.error('Error fetching templates:', e);
            } finally{
                setIsLoading(false);
            }
        }
    }["TemplateManager.useCallback[fetchTemplates]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TemplateManager.useEffect": ()=>{
            fetchTemplates(true);
        }
    }["TemplateManager.useEffect"], [
        fetchTemplates
    ]);
    const resetForm = ()=>{
        setFormType('formacion');
        setFormSStep(1);
        setFormMiniStep(1);
        setFormTitle('');
        setFormDescription('');
        setFormContent('');
        setFormNotaMinima(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXAM_PASS_THRESHOLD"]);
        setFormActive(true);
        setEditingTemplate(null);
        setIsCreating(false);
        setEditorMode('visual');
    };
    const startCreate = (sStep, type, miniStep = 3)=>{
        setIsCreating(true);
        setFormType(type);
        setFormSStep(sStep);
        setFormMiniStep(miniStep);
        // MC templates use sStep=0, title shows MC instead of S0
        if (sStep === 0) {
            const mcPasoLabel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MC_PASO_CONFIG"].find((p)=>p.paso === miniStep)?.label || '';
            setFormTitle(`MC - ${mcPasoLabel}`);
        } else {
            setFormTitle(`S${sStep} - ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S_STEPS"].find((s)=>s.id === sStep)?.japaneseName || ''}`);
        }
        setFormDescription('');
        const aplicaNota = type === 'examen' || type === 'autoevaluacion' || type === 'auditoria';
        setNotaMinimaAplica(aplicaNota);
        setFormNotaMinima(aplicaNota ? type === 'examen' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXAM_PASS_THRESHOLD"] : type === 'autoevaluacion' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELF_EVAL_THRESHOLD"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUDIT_PASS_THRESHOLD"] : null);
        setFormActive(true);
        setEditorMode('visual');
        // Auto-set miniStep based on type
        const autoMiniStep = type === 'formacion' || type === 'examen' ? 1 : type === 'fotos' ? 2 : type === 'inventario' || type === 'estandar' || type === 'layout' || type === 'plan_limpieza' ? 3 : type === 'autoevaluacion' || type === 'plan_accion' ? 4 : type === 'auditoria' || type === 'pdca' ? 5 : miniStep;
        setFormMiniStep(autoMiniStep);
        if (type === 'formacion') {
            setFormContent(JSON.stringify(getDefaultFormationContent(sStep), null, 2));
        } else if (type === 'examen') {
            setFormContent(JSON.stringify(getDefaultExamContent(sStep), null, 2));
        } else if (type === 'fotos') {
            setFormContent(JSON.stringify(getDefaultFotosContent(sStep), null, 2));
        } else if (type === 'inventario') {
            setFormContent(JSON.stringify(getDefaultInventoryContent(sStep), null, 2));
        } else if (type === 'estandar') {
            setFormContent(JSON.stringify(getDefaultStandardContent(), null, 2));
        } else if (type === 'layout') {
            setFormContent(JSON.stringify(getDefaultLayoutContent(sStep), null, 2));
        } else if (type === 'plan_limpieza') {
            setFormContent(JSON.stringify(getDefaultPlanLimpiezaContent(sStep), null, 2));
        } else if (type === 'pdca') {
            setFormContent(JSON.stringify(getDefaultPDCAContent(sStep), null, 2));
        } else if (type === 'plan_accion') {
            setFormContent(JSON.stringify(getDefaultPlanAccionContent(sStep), null, 2));
        } else {
            setFormContent(JSON.stringify(getDefaultChecklistContent(sStep), null, 2));
        }
    };
    const startEdit = (template)=>{
        setEditingTemplate(template);
        setFormType(template.type);
        setFormSStep(template.sStep);
        setFormMiniStep(template.miniStep || 3);
        setFormTitle(template.title);
        setFormDescription(template.description || '');
        setFormContent(typeof template.content === 'string' ? template.content : JSON.stringify(template.content, null, 2));
        const aplicaNota = template.type === 'examen' || template.type === 'autoevaluacion' || template.type === 'auditoria';
        setNotaMinimaAplica(aplicaNota);
        setFormNotaMinima(template.notaMinima != null ? template.notaMinima : aplicaNota ? template.type === 'examen' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXAM_PASS_THRESHOLD"] : template.type === 'autoevaluacion' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELF_EVAL_THRESHOLD"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUDIT_PASS_THRESHOLD"] : null);
        setFormActive(template.active);
        setIsCreating(true);
        setEditorMode('visual');
    };
    const handleSave = async ()=>{
        setIsSaving(true);
        try {
            // Validate JSON
            try {
                JSON.parse(formContent);
            } catch  {
                alert('El contenido JSON no es válido. Revísalo.');
                setIsSaving(false);
                return;
            }
            const payload = {
                type: formType,
                sStep: formSStep,
                miniStep: formMiniStep,
                title: formTitle,
                description: formDescription || null,
                content: formContent,
                notaMinima: notaMinimaAplica ? formNotaMinima : null,
                active: formActive
            };
            if (editingTemplate) {
                const res = await fetch('/api/templates', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: editingTemplate.id,
                        ...payload
                    })
                });
                const data = await res.json();
                if (!data.success) {
                    alert('Error: ' + data.error);
                    return;
                }
            } else {
                const res = await fetch('/api/templates', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();
                if (!data.success) {
                    alert('Error: ' + data.error);
                    return;
                }
            }
            resetForm();
            fetchTemplates();
            setSaveMessage('Plantilla guardada correctamente');
            setTimeout(()=>setSaveMessage(null), 3000);
        } catch (e) {
            console.error('Error saving:', e);
            alert('Error al guardar');
        } finally{
            setIsSaving(false);
        }
    };
    const handleDelete = async (id)=>{
        if (!confirm('¿Eliminar esta plantilla?')) return;
        try {
            await fetch(`/api/templates?id=${id}`, {
                method: 'DELETE'
            });
            fetchTemplates();
        } catch (e) {
            console.error(e);
        }
    };
    const handleMovePaso = async (templateId, newMiniStep)=>{
        try {
            const res = await fetch('/api/templates', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: templateId,
                    miniStep: newMiniStep
                })
            });
            const data = await res.json();
            if (data.success) {
                fetchTemplates();
                setSaveMessage(`Plantilla movida a Paso ${newMiniStep}`);
                setTimeout(()=>setSaveMessage(null), 3000);
            } else {
                alert('Error al mover la plantilla: ' + data.error);
            }
        } catch (e) {
            console.error(e);
            alert('Error al mover la plantilla');
        }
    };
    // Full template export format (includes metadata + content)
    const exportTemplateData = (template)=>({
            _5sTemplateExport: true,
            version: 1,
            type: template.type,
            sStep: template.sStep,
            miniStep: template.miniStep,
            title: template.title,
            description: template.description,
            content: typeof template.content === 'string' ? JSON.parse(template.content) : template.content,
            notaMinima: template.notaMinima,
            active: template.active
        });
    const handleDownload = (template)=>{
        try {
            const data = exportTemplateData(template);
            const blob = new Blob([
                JSON.stringify(data, null, 2)
            ], {
                type: 'application/json'
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${template.type}_S${template.sStep}_${template.title.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
            a.click();
            URL.revokeObjectURL(url);
        } catch  {
            alert('Error al descargar la plantilla');
        }
    };
    const [copiedId, setCopiedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleCopyTemplate = async (template)=>{
        try {
            const data = exportTemplateData(template);
            await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
            setCopiedId(template.id);
            setTimeout(()=>setCopiedId(null), 2000);
        } catch  {
            // Fallback: create temporary textarea
            try {
                const data = exportTemplateData(template);
                const text = JSON.stringify(data, null, 2);
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                setCopiedId(template.id);
                setTimeout(()=>setCopiedId(null), 2000);
            } catch  {
                alert('No se pudo copiar al portapapeles');
            }
        }
    };
    const importTemplateData = (data)=>{
        // Check if it's a full export with metadata
        if (data && data._5sTemplateExport) {
            setFormType(data.type || 'formacion');
            setFormSStep(data.sStep || 1);
            setFormMiniStep(data.miniStep || 3);
            setFormTitle(data.title ? `${data.title} (copia)` : '');
            setFormDescription(data.description || '');
            setFormContent(JSON.stringify(data.content, null, 2));
            const aplicaNota = data.type === 'examen' || data.type === 'autoevaluacion' || data.type === 'auditoria';
            setNotaMinimaAplica(aplicaNota);
            setFormNotaMinima(data.notaMinima != null ? data.notaMinima : aplicaNota ? data.type === 'examen' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXAM_PASS_THRESHOLD"] : data.type === 'autoevaluacion' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELF_EVAL_THRESHOLD"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUDIT_PASS_THRESHOLD"] : null);
            setFormActive(data.active !== false);
            setIsCreating(true);
            setEditorMode('visual');
        } else {
            // Legacy: just content, only set formContent
            setFormContent(JSON.stringify(data, null, 2));
        }
    };
    const handlePasteTemplate = async ()=>{
        try {
            const text = await navigator.clipboard.readText();
            const data = JSON.parse(text);
            importTemplateData(data);
        } catch  {
            alert('No se pudo leer del portapapeles. Asegúrate de que hay una plantilla copiada (formato JSON válido).');
        }
    };
    const handleDuplicateTemplate = async (template)=>{
        try {
            const payload = {
                type: template.type,
                sStep: template.sStep,
                miniStep: template.miniStep,
                title: `${template.title} (copia)`,
                description: template.description,
                content: template.content,
                notaMinima: template.notaMinima,
                active: template.active
            };
            const res = await fetch('/api/templates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!data.success) {
                alert('Error: ' + data.error);
                return;
            }
            fetchTemplates();
        } catch  {
            alert('Error al duplicar la plantilla');
        }
    };
    const handleUploadJson = ()=>{
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e)=>{
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev)=>{
                try {
                    const data = JSON.parse(ev.target?.result);
                    importTemplateData(data);
                } catch  {
                    alert('El archivo JSON no es válido');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };
    const templatesByS = (sStep)=>templates.filter((t)=>t.sStep === sStep);
    const templatesBySAndPaso = (sStep, miniStep)=>templates.filter((t)=>t.sStep === sStep && t.miniStep === miniStep);
    // Count total templates for an S-step
    const countForS = (sStep)=>templates.filter((t)=>t.sStep === sStep).length;
    // Count templates for a specific paso within an S-step
    const countForPaso = (sStep, paso)=>templates.filter((t)=>t.sStep === sStep && t.miniStep === paso).length;
    const getTemplateSummary = (template)=>{
        try {
            const data = typeof template.content === 'string' ? JSON.parse(template.content) : template.content;
            if (data.questions) return `${data.questions.length} pregunta(s)`;
            if (data.columns) return `${data.columns.length} columna(s)`;
            if (data.fields) return `${data.fields.length} campo(s)`;
            if (data.categories || data.extraFields) return `${(data.categories || []).length} cat. / ${(data.extraFields || []).length} campos`;
            if (data.phases) return `${data.phases.length} fases PDCA · ${(data.kpis || []).length} KPIs`;
            if (data.floorColors) return `${data.floorColors.length} colores RAL · Layout`;
            if (data.planType === 'inspection_cleaning') return `${(data.sections || []).length} secciones · Plan Limpieza`;
            if (data.sections) {
                const totalItems = data.sections.reduce((s, sec)=>s + (sec.items?.length || 0), 0);
                return totalItems > 0 ? `${data.sections.length} sec. / ${totalItems} items` : `${data.sections.length} sección(es)`;
            }
            return '';
        } catch  {
            return '';
        }
    };
    // ═══════════════════════════════════════════════════════
    // RENDER
    // ═══════════════════════════════════════════════════════
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between shrink-0 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-bold flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                className: "h-5 w-5 text-green-600"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 2042,
                                columnNumber: 11
                            }, this),
                            "Plantillas Genéricas",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: "text-xs ml-2",
                                children: [
                                    templates.length,
                                    " plantilla",
                                    templates.length !== 1 ? 's' : '',
                                    " en total"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 2044,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 2041,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            saveMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded animate-pulse",
                                children: saveMessage
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 2050,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                onClick: handlePasteTemplate,
                                className: "gap-1 text-xs border-purple-300 text-purple-600 hover:bg-purple-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$paste$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardPaste$3e$__["ClipboardPaste"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 2056,
                                        columnNumber: 13
                                    }, this),
                                    "Pegar plantilla"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                lineNumber: 2054,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                        lineNumber: 2048,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 2040,
                columnNumber: 7
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "h-8 w-8 text-green-500 animate-spin"
                }, void 0, false, {
                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                    lineNumber: 2065,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 2064,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-h-0 overflow-auto space-y-3",
                children: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S_STEPS"].map((s)=>{
                        const sTotal = countForS(s.id);
                        const isExpanded = expandedS === s.id;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border-2 overflow-hidden",
                            style: {
                                borderColor: S_COLORS[s.id] + '40'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between px-4 py-3 cursor-pointer",
                                    style: {
                                        backgroundColor: S_COLORS[s.id] + '10'
                                    },
                                    onClick: ()=>setExpandedS(isExpanded ? null : s.id),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-sm",
                                                    style: {
                                                        backgroundColor: S_COLORS[s.id]
                                                    },
                                                    children: [
                                                        "S",
                                                        s.id
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2080,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold",
                                                            style: {
                                                                color: S_COLORS[s.id]
                                                            },
                                                            children: s.japaneseName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2085,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-muted-foreground ml-2",
                                                            children: [
                                                                "(",
                                                                s.spanishName,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2086,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground ml-2",
                                                            children: [
                                                                "— ",
                                                                s.name
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2087,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2084,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2079,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "outline",
                                                    style: {
                                                        color: S_COLORS[s.id],
                                                        borderColor: S_COLORS[s.id] + '40'
                                                    },
                                                    children: [
                                                        sTotal,
                                                        " plantilla",
                                                        sTotal !== 1 ? 's' : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2091,
                                                    columnNumber: 21
                                                }, this),
                                                isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2094,
                                                    columnNumber: 35
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2094,
                                                    columnNumber: 71
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2090,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 2076,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        animate: {
                                            height: 'auto',
                                            opacity: 1
                                        },
                                        exit: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        className: "overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 space-y-3",
                                            children: [
                                                PASO_CONFIG.map((pasoConfig)=>{
                                                    const pasoKey = `S${s.id}-P${pasoConfig.paso}`;
                                                    const pasoTemplates = templatesBySAndPaso(s.id, pasoConfig.paso);
                                                    const pasoCount = pasoTemplates.length;
                                                    const isPasoExpanded = expandedPaso === pasoKey;
                                                    const PasoIcon = pasoConfig.icon;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-lg border overflow-hidden",
                                                        style: {
                                                            borderColor: S_COLORS[s.id] + '25'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between px-3 py-2 cursor-pointer",
                                                                style: {
                                                                    backgroundColor: S_COLORS[s.id] + '08'
                                                                },
                                                                onClick: ()=>setExpandedPaso(isPasoExpanded ? null : pasoKey),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PasoIcon, {
                                                                                className: "h-4 w-4",
                                                                                style: {
                                                                                    color: S_COLORS[s.id]
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                lineNumber: 2119,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm font-semibold",
                                                                                style: {
                                                                                    color: S_COLORS[s.id]
                                                                                },
                                                                                children: [
                                                                                    "Paso ",
                                                                                    pasoConfig.paso,
                                                                                    ":"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                lineNumber: 2120,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm text-muted-foreground",
                                                                                children: pasoConfig.label
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                lineNumber: 2123,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                        lineNumber: 2118,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex gap-1",
                                                                                onClick: (e)=>e.stopPropagation(),
                                                                                children: pasoConfig.types.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                        variant: "outline",
                                                                                        size: "sm",
                                                                                        className: "h-6 px-2 text-[10px] gap-0.5",
                                                                                        style: {
                                                                                            borderColor: S_COLORS[s.id] + '40',
                                                                                            color: S_COLORS[s.id]
                                                                                        },
                                                                                        onClick: ()=>startCreate(s.id, type, pasoConfig.paso),
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                                                className: "h-3 w-3"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                lineNumber: 2133,
                                                                                                columnNumber: 41
                                                                                            }, this),
                                                                                            type === 'formacion' ? 'Formación' : type === 'examen' ? 'Examen' : type === 'autoevaluacion' ? 'Autoevaluación' : type === 'auditoria' ? 'Aud. Ext.' : type === 'inventario' ? 'Inventario' : type === 'fotos' ? 'Fotos' : type === 'plan_accion' ? 'Plan Acción' : 'Estándar'
                                                                                        ]
                                                                                    }, type, true, {
                                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                        lineNumber: 2129,
                                                                                        columnNumber: 39
                                                                                    }, this))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                lineNumber: 2127,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                variant: "outline",
                                                                                className: "text-[10px] h-5",
                                                                                style: {
                                                                                    color: S_COLORS[s.id],
                                                                                    borderColor: S_COLORS[s.id] + '30'
                                                                                },
                                                                                children: pasoCount
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                lineNumber: 2138,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            isPasoExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                                                className: "h-3.5 w-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                lineNumber: 2142,
                                                                                columnNumber: 53
                                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                className: "h-3.5 w-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                lineNumber: 2142,
                                                                                columnNumber: 93
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                        lineNumber: 2125,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                lineNumber: 2115,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                                children: isPasoExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                    initial: {
                                                                        height: 0,
                                                                        opacity: 0
                                                                    },
                                                                    animate: {
                                                                        height: 'auto',
                                                                        opacity: 1
                                                                    },
                                                                    exit: {
                                                                        height: 0,
                                                                        opacity: 0
                                                                    },
                                                                    className: "overflow-hidden",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "px-3 pb-3 space-y-2",
                                                                        children: pasoCount === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-center py-4 text-muted-foreground text-xs",
                                                                            children: "Sin plantillas para este paso. Pulsa + para crear."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                            lineNumber: 2153,
                                                                            columnNumber: 41
                                                                        }, this) : pasoTemplates.map((tpl)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: `p-2.5 rounded-lg border ${tpl.active ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-300 opacity-60'}`,
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center justify-between",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "flex items-center gap-3 flex-1 min-w-0",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                    className: "shrink-0",
                                                                                                    style: {
                                                                                                        backgroundColor: tpl.type === 'formacion' ? '#DBEAFE' : tpl.type === 'examen' ? '#FEF3C7' : tpl.type === 'autoevaluacion' ? '#D1FAE5' : tpl.type === 'auditoria' ? '#FED7AA' : tpl.type === 'inventario' ? '#FFEDD5' : tpl.type === 'fotos' ? '#E0F2FE' : tpl.type === 'plan_accion' ? '#FFE4E6' : tpl.type === 'layout' ? '#DBEAFE' : tpl.type === 'plan_limpieza' ? '#CFFAFE' : tpl.type === 'pdca' ? '#FFF7ED' : '#EDE9FE',
                                                                                                        color: tpl.type === 'formacion' ? '#1D4ED8' : tpl.type === 'examen' ? '#92400E' : tpl.type === 'autoevaluacion' ? '#065F46' : tpl.type === 'auditoria' ? '#9A3412' : tpl.type === 'inventario' ? '#9A3412' : tpl.type === 'fotos' ? '#0369A1' : tpl.type === 'plan_accion' ? '#9F1239' : tpl.type === 'layout' ? '#1D4ED8' : tpl.type === 'plan_limpieza' ? '#155E75' : tpl.type === 'pdca' ? '#9A3412' : '#6D28D9'
                                                                                                    },
                                                                                                    children: tpl.type === 'formacion' ? 'Formación' : tpl.type === 'examen' ? 'Examen' : tpl.type === 'autoevaluacion' ? 'Aut. Int.' : tpl.type === 'auditoria' ? 'Aud. Ext.' : tpl.type === 'inventario' ? 'Inventario' : tpl.type === 'fotos' ? 'Fotos' : tpl.type === 'plan_accion' ? 'Plan Acción' : tpl.type === 'layout' ? 'Layout' : tpl.type === 'plan_limpieza' ? 'Plan Limpieza' : tpl.type === 'pdca' ? 'PDCA' : 'Estándar'
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                    lineNumber: 2162,
                                                                                                    columnNumber: 49
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "min-w-0",
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                            className: "text-sm font-medium truncate",
                                                                                                            children: tpl.title
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                            lineNumber: 2169,
                                                                                                            columnNumber: 51
                                                                                                        }, this),
                                                                                                        tpl.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                            className: "text-xs text-muted-foreground truncate",
                                                                                                            children: tpl.description
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                            lineNumber: 2170,
                                                                                                            columnNumber: 71
                                                                                                        }, this)
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                    lineNumber: 2168,
                                                                                                    columnNumber: 49
                                                                                                }, this),
                                                                                                getTemplateSummary(tpl) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                    variant: "outline",
                                                                                                    className: "shrink-0 text-[10px]",
                                                                                                    children: getTemplateSummary(tpl)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                    lineNumber: 2173,
                                                                                                    columnNumber: 51
                                                                                                }, this),
                                                                                                tpl.notaMinima != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                    variant: "outline",
                                                                                                    className: "shrink-0 text-xs",
                                                                                                    children: [
                                                                                                        "Nota mín: ",
                                                                                                        tpl.notaMinima,
                                                                                                        "%"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                    lineNumber: 2178,
                                                                                                    columnNumber: 51
                                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                    variant: "outline",
                                                                                                    className: "shrink-0 text-xs text-gray-400 border-gray-200",
                                                                                                    children: "Sin nota mín"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                    lineNumber: 2182,
                                                                                                    columnNumber: 51
                                                                                                }, this),
                                                                                                !tpl.active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                    variant: "outline",
                                                                                                    className: "shrink-0 text-xs text-red-500 border-red-200",
                                                                                                    children: "Inactiva"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                    lineNumber: 2187,
                                                                                                    columnNumber: 51
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                            lineNumber: 2161,
                                                                                            columnNumber: 47
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "flex items-center gap-1 shrink-0 ml-2",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "relative",
                                                                                                    onClick: (e)=>e.stopPropagation(),
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                                            value: tpl.miniStep || 3,
                                                                                                            onChange: (e)=>handleMovePaso(tpl.id, Number(e.target.value)),
                                                                                                            className: "h-7 text-[10px] rounded border border-gray-200 bg-white px-1.5 pr-5 cursor-pointer hover:border-blue-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-200 appearance-none",
                                                                                                            style: {
                                                                                                                color: S_COLORS[tpl.sStep]
                                                                                                            },
                                                                                                            title: "Mover a otro paso",
                                                                                                            children: [
                                                                                                                1,
                                                                                                                2,
                                                                                                                3,
                                                                                                                4,
                                                                                                                5
                                                                                                            ].map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                                                    value: step,
                                                                                                                    children: [
                                                                                                                        "P",
                                                                                                                        step
                                                                                                                    ]
                                                                                                                }, step, true, {
                                                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                                    lineNumber: 2201,
                                                                                                                    columnNumber: 55
                                                                                                                }, this))
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                            lineNumber: 2193,
                                                                                                            columnNumber: 51
                                                                                                        }, this),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"], {
                                                                                                            className: "absolute right-0.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 text-gray-400 pointer-events-none"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                            lineNumber: 2206,
                                                                                                            columnNumber: 51
                                                                                                        }, this)
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                    lineNumber: 2192,
                                                                                                    columnNumber: 49
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                    variant: "ghost",
                                                                                                    size: "sm",
                                                                                                    onClick: ()=>handleCopyTemplate(tpl),
                                                                                                    className: "h-7 w-7 p-0 text-purple-500 hover:text-purple-700 hover:bg-purple-50",
                                                                                                    title: "Copiar al portapapeles",
                                                                                                    children: copiedId === tpl.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                                        className: "h-3.5 w-3.5"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                        lineNumber: 2210,
                                                                                                        columnNumber: 74
                                                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                                                        className: "h-3.5 w-3.5"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                        lineNumber: 2210,
                                                                                                        columnNumber: 110
                                                                                                    }, this)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                    lineNumber: 2208,
                                                                                                    columnNumber: 49
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                    variant: "ghost",
                                                                                                    size: "sm",
                                                                                                    onClick: ()=>handleDuplicateTemplate(tpl),
                                                                                                    className: "h-7 w-7 p-0 text-amber-500 hover:text-amber-700 hover:bg-amber-50",
                                                                                                    title: "Duplicar plantilla",
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCopy$3e$__["ClipboardCopy"], {
                                                                                                        className: "h-3.5 w-3.5"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                        lineNumber: 2214,
                                                                                                        columnNumber: 51
                                                                                                    }, this)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                    lineNumber: 2212,
                                                                                                    columnNumber: 49
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                    variant: "ghost",
                                                                                                    size: "sm",
                                                                                                    onClick: ()=>handleDownload(tpl),
                                                                                                    className: "h-7 w-7 p-0 text-gray-500 hover:text-gray-700",
                                                                                                    title: "Descargar JSON",
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                                                                        className: "h-3.5 w-3.5"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                        lineNumber: 2218,
                                                                                                        columnNumber: 51
                                                                                                    }, this)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                    lineNumber: 2216,
                                                                                                    columnNumber: 49
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                    variant: "ghost",
                                                                                                    size: "sm",
                                                                                                    onClick: ()=>startEdit(tpl),
                                                                                                    className: "h-7 w-7 p-0 text-blue-600 hover:text-blue-700",
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__["Edit3"], {
                                                                                                        className: "h-3.5 w-3.5"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                        lineNumber: 2222,
                                                                                                        columnNumber: 51
                                                                                                    }, this)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                    lineNumber: 2220,
                                                                                                    columnNumber: 49
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                    variant: "ghost",
                                                                                                    size: "sm",
                                                                                                    onClick: ()=>handleDelete(tpl.id),
                                                                                                    className: "h-7 w-7 p-0 text-red-500 hover:text-red-600",
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                                        className: "h-3.5 w-3.5"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                        lineNumber: 2226,
                                                                                                        columnNumber: 51
                                                                                                    }, this)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                    lineNumber: 2224,
                                                                                                    columnNumber: 49
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                            lineNumber: 2190,
                                                                                            columnNumber: 47
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                    lineNumber: 2160,
                                                                                    columnNumber: 45
                                                                                }, this)
                                                                            }, tpl.id, false, {
                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                lineNumber: 2158,
                                                                                columnNumber: 43
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                        lineNumber: 2151,
                                                                        columnNumber: 37
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2149,
                                                                    columnNumber: 35
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                lineNumber: 2147,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, pasoConfig.paso, true, {
                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                        lineNumber: 2112,
                                                        columnNumber: 29
                                                    }, this);
                                                }),
                                                sTotal === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center py-6 text-muted-foreground text-sm",
                                                    children: [
                                                        "No hay plantillas para S",
                                                        s.id,
                                                        ". Las plantillas por defecto se crean automáticamente."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2242,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2103,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 2101,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 2099,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, s.id, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 2073,
                            columnNumber: 15
                        }, this);
                    }),
                    (()=>{
                        const mcColor = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MC_STEP_CONFIG"].color;
                        const mcTotal = templates.filter((t)=>t.sStep === 0 && t.type === 'pdca').length + templates.filter((t)=>t.sStep === 0 && (t.type === 'plan_accion' || t.type === 'kpi' || t.type === 'estandar')).length;
                        const isMcExpanded = expandedS === 6;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border-2 overflow-hidden",
                            style: {
                                borderColor: mcColor + '40'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between px-4 py-3 cursor-pointer",
                                    style: {
                                        backgroundColor: mcColor + '10'
                                    },
                                    onClick: ()=>setExpandedS(isMcExpanded ? null : 6),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-sm",
                                                    style: {
                                                        backgroundColor: mcColor
                                                    },
                                                    children: "MC"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2267,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold",
                                                            style: {
                                                                color: mcColor
                                                            },
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MC_STEP_CONFIG"].japaneseName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2272,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-muted-foreground ml-2",
                                                            children: [
                                                                "(",
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MC_STEP_CONFIG"].spanishName,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2273,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground ml-2",
                                                            children: "— Fase 6"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2274,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2271,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2266,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "outline",
                                                    style: {
                                                        color: mcColor,
                                                        borderColor: mcColor + '40'
                                                    },
                                                    children: [
                                                        mcTotal,
                                                        " plantilla",
                                                        mcTotal !== 1 ? 's' : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2278,
                                                    columnNumber: 21
                                                }, this),
                                                isMcExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2281,
                                                    columnNumber: 37
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2281,
                                                    columnNumber: 73
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2277,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 2263,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: isMcExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        animate: {
                                            height: 'auto',
                                            opacity: 1
                                        },
                                        exit: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        className: "overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 space-y-3",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MC_PASO_CONFIG"].map((mcPaso)=>{
                                                const pasoKey = `MC-P${mcPaso.paso}`;
                                                const pasoTemplates = templates.filter((t)=>{
                                                    if (mcPaso.key === 'objetivos') return t.sStep === 0 && t.type === 'kpi';
                                                    const pdcaStep = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDCA_STEPS"].find((s)=>s.id === mcPaso.paso);
                                                    return t.sStep === 0 && t.type === 'pdca' && pdcaStep && (t.content || '').includes(`"phase": "${pdcaStep.letter.toLowerCase()}"`) || mcPaso.types.includes(t.type) && t.sStep === 0 && mcPaso.key !== 'objetivos';
                                                });
                                                const pasoCount = pasoTemplates.length;
                                                const isPasoExpanded = expandedPaso === pasoKey;
                                                const PasoIcon = MC_PASO_ICONS[mcPaso.icon] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"];
                                                const pasoColor = mcPaso.key === 'objetivos' ? mcColor : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDCA_STEPS"].find((s)=>s.id === mcPaso.paso)?.color || mcColor;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-lg border overflow-hidden",
                                                    style: {
                                                        borderColor: pasoColor + '25'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between px-3 py-2 cursor-pointer",
                                                            style: {
                                                                backgroundColor: pasoColor + '08'
                                                            },
                                                            onClick: ()=>setExpandedPaso(isPasoExpanded ? null : pasoKey),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PasoIcon, {
                                                                            className: "h-4 w-4",
                                                                            style: {
                                                                                color: pasoColor
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                            lineNumber: 2313,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        mcPaso.key !== 'objetivos' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold",
                                                                            style: {
                                                                                backgroundColor: pasoColor
                                                                            },
                                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDCA_STEPS"].find((s)=>s.id === mcPaso.paso)?.letter
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                            lineNumber: 2315,
                                                                            columnNumber: 37
                                                                        }, this) : null,
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm font-semibold",
                                                                            style: {
                                                                                color: pasoColor
                                                                            },
                                                                            children: mcPaso.label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                            lineNumber: 2319,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2312,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex gap-1",
                                                                            onClick: (e)=>e.stopPropagation(),
                                                                            children: mcPaso.types.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                    variant: "outline",
                                                                                    size: "sm",
                                                                                    className: "h-6 px-2 text-[10px] gap-0.5",
                                                                                    style: {
                                                                                        borderColor: pasoColor + '40',
                                                                                        color: pasoColor
                                                                                    },
                                                                                    onClick: ()=>startCreate(0, type, mcPaso.paso),
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                                            className: "h-3 w-3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                            lineNumber: 2330,
                                                                                            columnNumber: 41
                                                                                        }, this),
                                                                                        type === 'pdca' ? 'PDCA' : type === 'plan_accion' ? 'Plan Acción' : type === 'estandar' ? 'Estándar' : 'KPIs'
                                                                                    ]
                                                                                }, type, true, {
                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                    lineNumber: 2326,
                                                                                    columnNumber: 39
                                                                                }, this))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                            lineNumber: 2324,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                            variant: "outline",
                                                                            className: "text-[10px] h-5",
                                                                            style: {
                                                                                color: pasoColor,
                                                                                borderColor: pasoColor + '30'
                                                                            },
                                                                            children: pasoCount
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                            lineNumber: 2335,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        isPasoExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                                            className: "h-3.5 w-3.5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                            lineNumber: 2339,
                                                                            columnNumber: 53
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                            className: "h-3.5 w-3.5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                            lineNumber: 2339,
                                                                            columnNumber: 93
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2323,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2309,
                                                            columnNumber: 31
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                            children: isPasoExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                initial: {
                                                                    height: 0,
                                                                    opacity: 0
                                                                },
                                                                animate: {
                                                                    height: 'auto',
                                                                    opacity: 1
                                                                },
                                                                exit: {
                                                                    height: 0,
                                                                    opacity: 0
                                                                },
                                                                className: "overflow-hidden",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "px-3 pb-3 space-y-2",
                                                                    children: pasoCount === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center py-4 text-muted-foreground text-xs",
                                                                        children: "Sin plantillas para este paso. Pulsa + para crear."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                        lineNumber: 2350,
                                                                        columnNumber: 41
                                                                    }, this) : pasoTemplates.map((tpl)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `p-2.5 rounded-lg border ${tpl.active ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-300 opacity-60'}`,
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-3 flex-1 min-w-0",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                                variant: "outline",
                                                                                                className: "text-[9px] shrink-0",
                                                                                                style: {
                                                                                                    color: pasoColor,
                                                                                                    borderColor: pasoColor + '30'
                                                                                                },
                                                                                                children: tpl.type
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                lineNumber: 2359,
                                                                                                columnNumber: 49
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "min-w-0",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                        className: "text-sm font-medium truncate",
                                                                                                        children: tpl.title
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                        lineNumber: 2364,
                                                                                                        columnNumber: 51
                                                                                                    }, this),
                                                                                                    tpl.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                        className: "text-xs text-muted-foreground truncate",
                                                                                                        children: tpl.description
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                        lineNumber: 2365,
                                                                                                        columnNumber: 71
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                lineNumber: 2363,
                                                                                                columnNumber: 49
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                        lineNumber: 2358,
                                                                                        columnNumber: 47
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                variant: "ghost",
                                                                                                size: "sm",
                                                                                                onClick: ()=>startEdit(tpl),
                                                                                                className: "h-7 w-7 p-0 text-blue-600 hover:text-blue-700",
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__["Edit3"], {
                                                                                                    className: "h-3.5 w-3.5"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                    lineNumber: 2371,
                                                                                                    columnNumber: 51
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                lineNumber: 2369,
                                                                                                columnNumber: 49
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                variant: "ghost",
                                                                                                size: "sm",
                                                                                                onClick: ()=>handleDelete(tpl.id),
                                                                                                className: "h-7 w-7 p-0 text-red-500 hover:text-red-600",
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                                    className: "h-3.5 w-3.5"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                    lineNumber: 2375,
                                                                                                    columnNumber: 51
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                                lineNumber: 2373,
                                                                                                columnNumber: 49
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                        lineNumber: 2368,
                                                                                        columnNumber: 47
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                                lineNumber: 2357,
                                                                                columnNumber: 45
                                                                            }, this)
                                                                        }, tpl.id, false, {
                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                            lineNumber: 2355,
                                                                            columnNumber: 43
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2348,
                                                                    columnNumber: 37
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                lineNumber: 2346,
                                                                columnNumber: 35
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2344,
                                                            columnNumber: 31
                                                        }, this)
                                                    ]
                                                }, mcPaso.paso, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2306,
                                                    columnNumber: 29
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2290,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 2288,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 2286,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 2260,
                            columnNumber: 15
                        }, this);
                    })()
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 2068,
                columnNumber: 9
            }, this),
            isCreating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 bg-gray-900/60 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white w-[98vw] h-[96vh] rounded-xl shadow-2xl flex flex-col overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "shrink-0 flex items-center justify-between px-6 py-3 border-b bg-gradient-to-r from-gray-50 to-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        editingTemplate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__["Edit3"], {
                                            className: "h-5 w-5 text-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2408,
                                            columnNumber: 36
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "h-5 w-5 text-green-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2408,
                                            columnNumber: 82
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-bold",
                                            children: editingTemplate ? 'Editar Plantilla' : 'Nueva Plantilla'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2409,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 ml-4 px-3 py-1.5 rounded-lg border-2",
                                            style: {
                                                backgroundColor: S_COLORS[formSStep] + '10',
                                                borderColor: S_COLORS[formSStep] + '40'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-7 h-7 rounded flex items-center justify-center text-white font-black text-xs",
                                                    style: {
                                                        backgroundColor: S_COLORS[formSStep]
                                                    },
                                                    children: formSStep === 0 ? 'MC' : `S${formSStep}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2415,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-semibold",
                                                    style: {
                                                        color: S_COLORS[formSStep]
                                                    },
                                                    children: formSStep === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MC_STEP_CONFIG"].japaneseName : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S_STEPS"].find((s)=>s.id === formSStep)?.japaneseName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2419,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    style: {
                                                        backgroundColor: S_COLORS[formSStep] + '20',
                                                        color: S_COLORS[formSStep]
                                                    },
                                                    className: "text-xs px-2 py-0.5 border-0 font-semibold",
                                                    children: formSStep === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MC_PASO_CONFIG"].find((p)=>p.paso === formMiniStep)?.label || `Paso ${formMiniStep}` : `Paso ${formMiniStep}: ${MINI_STEPS_LABELS[formMiniStep] || `Paso ${formMiniStep}`}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2422,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2413,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 2407,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: resetForm,
                                    className: "h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                        lineNumber: 2432,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 2430,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 2406,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-h-0 overflow-y-auto px-6 py-4 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-4 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-semibold",
                                                    children: "Tipo"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2441,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: formType,
                                                    onValueChange: setFormType,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            className: "mt-1 h-10",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                lineNumber: 2444,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2443,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "formacion",
                                                                    children: "Formación"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2447,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "examen",
                                                                    children: "Examen"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2448,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "autoevaluacion",
                                                                    children: "Auditoría Interna"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2449,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "auditoria",
                                                                    children: "Auditoría Externa"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2450,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "inventario",
                                                                    children: "Inventario"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2451,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "estandar",
                                                                    children: "Estándar"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2452,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "layout",
                                                                    children: "Layout de Zona"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2453,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "plan_limpieza",
                                                                    children: "Plan de Inspección/Limpieza"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2454,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "plan_accion",
                                                                    children: "Plan de Acción"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2455,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "pdca",
                                                                    children: "Tablero PDCA"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2456,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2446,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2442,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2440,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-semibold",
                                                    children: "S (Fase)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2461,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: String(formSStep),
                                                    onValueChange: (v)=>setFormSStep(Number(v)),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            className: "mt-1 h-10",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                lineNumber: 2464,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2463,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: [
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S_STEPS"].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                        value: String(s.id),
                                                                        children: [
                                                                            "S",
                                                                            s.id,
                                                                            " - ",
                                                                            s.japaneseName,
                                                                            " (",
                                                                            s.spanishName,
                                                                            ")"
                                                                        ]
                                                                    }, s.id, true, {
                                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                        lineNumber: 2468,
                                                                        columnNumber: 25
                                                                    }, this)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "0",
                                                                    children: [
                                                                        "MC - ",
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MC_STEP_CONFIG"].japaneseName,
                                                                        " (",
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MC_STEP_CONFIG"].spanishName,
                                                                        ")"
                                                                    ]
                                                                }, 0, true, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2472,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2466,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2462,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2460,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-semibold",
                                                    children: "Paso"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2479,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: String(formMiniStep),
                                                    onValueChange: (v)=>setFormMiniStep(Number(v)),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            className: "mt-1 h-10",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                lineNumber: 2482,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2481,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: [
                                                                1,
                                                                2,
                                                                3,
                                                                4,
                                                                5
                                                            ].map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: String(step),
                                                                    children: [
                                                                        "Paso ",
                                                                        step,
                                                                        " — ",
                                                                        MINI_STEPS_LABELS[step]
                                                                    ]
                                                                }, step, true, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2486,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2484,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2480,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2478,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-semibold",
                                                    children: "Nota mínima (pasa/no pasa)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2494,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3 mt-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "flex items-center gap-1.5 cursor-pointer text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    checked: notaMinimaAplica,
                                                                    onChange: (e)=>{
                                                                        setNotaMinimaAplica(e.target.checked);
                                                                        if (!e.target.checked) setFormNotaMinima(null);
                                                                        else setFormNotaMinima(formType === 'examen' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXAM_PASS_THRESHOLD"] : formType === 'autoevaluacion' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELF_EVAL_THRESHOLD"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUDIT_PASS_THRESHOLD"]);
                                                                    },
                                                                    className: "rounded border-gray-300 h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2497,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-muted-foreground",
                                                                    children: "Aplica"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2507,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2496,
                                                            columnNumber: 21
                                                        }, this),
                                                        notaMinimaAplica ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                    type: "number",
                                                                    value: formNotaMinima ?? 0,
                                                                    onChange: (e)=>setFormNotaMinima(Number(e.target.value)),
                                                                    min: 0,
                                                                    max: 100,
                                                                    className: "h-10 w-20"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2511,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm text-muted-foreground",
                                                                    children: "%"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2513,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2510,
                                                            columnNumber: 23
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-gray-400 italic",
                                                            children: "No aplica"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2516,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2495,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2493,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 2439,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-4 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "col-span-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-semibold",
                                                    children: "Título"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2524,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: formTitle,
                                                    onChange: (e)=>setFormTitle(e.target.value),
                                                    className: "mt-1 h-10",
                                                    placeholder: "Título de la plantilla"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2525,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2523,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "col-span-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-semibold",
                                                    children: "Descripción"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2529,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: formDescription,
                                                    onChange: (e)=>setFormDescription(e.target.value),
                                                    className: "mt-1 h-10",
                                                    placeholder: "Descripción opcional"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2530,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2528,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 pt-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center gap-2 text-sm cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: formActive,
                                                        onChange: (e)=>setFormActive(e.target.checked),
                                                        className: "rounded border-gray-300 h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                        lineNumber: 2535,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Plantilla activa"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                lineNumber: 2534,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2533,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 2522,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col",
                                    style: {
                                        minHeight: 'calc(96vh - 320px)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-2 shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-semibold",
                                                    children: "Contenido"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2545,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        (formType === 'autoevaluacion' || formType === 'auditoria') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            size: "sm",
                                                            className: "text-xs",
                                                            onClick: ()=>setFormContent(JSON.stringify(getDefaultChecklistContent(formSStep), null, 2)),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                                    className: "h-3.5 w-3.5 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2551,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Cargar checklist por defecto"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2549,
                                                            columnNumber: 23
                                                        }, this),
                                                        formType === 'formacion' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            size: "sm",
                                                            className: "text-xs",
                                                            onClick: ()=>setFormContent(JSON.stringify(getDefaultFormationContent(formSStep), null, 2)),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                                    className: "h-3.5 w-3.5 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2558,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Cargar formación por defecto"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2556,
                                                            columnNumber: 23
                                                        }, this),
                                                        formType === 'examen' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            size: "sm",
                                                            className: "text-xs",
                                                            onClick: ()=>setFormContent(JSON.stringify(getDefaultExamContent(formSStep), null, 2)),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                                    className: "h-3.5 w-3.5 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2565,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Cargar examen por defecto"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2563,
                                                            columnNumber: 23
                                                        }, this),
                                                        formType === 'inventario' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            size: "sm",
                                                            className: "text-xs",
                                                            onClick: ()=>setFormContent(JSON.stringify(getDefaultInventoryContent(formSStep), null, 2)),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                                    className: "h-3.5 w-3.5 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2572,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Cargar inventario por defecto"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2570,
                                                            columnNumber: 23
                                                        }, this),
                                                        formType === 'estandar' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            size: "sm",
                                                            className: "text-xs",
                                                            onClick: ()=>setFormContent(JSON.stringify(getDefaultStandardContent(), null, 2)),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                                    className: "h-3.5 w-3.5 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2579,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Cargar estándar por defecto"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2577,
                                                            columnNumber: 23
                                                        }, this),
                                                        formType === 'plan_accion' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            size: "sm",
                                                            className: "text-xs",
                                                            onClick: ()=>setFormContent(JSON.stringify(getDefaultPlanAccionContent(formSStep), null, 2)),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                                    className: "h-3.5 w-3.5 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2586,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Cargar plan de acción por defecto"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2584,
                                                            columnNumber: 23
                                                        }, this),
                                                        formType === 'layout' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            size: "sm",
                                                            className: "text-xs",
                                                            onClick: ()=>setFormContent(JSON.stringify(getDefaultLayoutContent(formSStep), null, 2)),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                                    className: "h-3.5 w-3.5 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2593,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Cargar layout por defecto"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2591,
                                                            columnNumber: 23
                                                        }, this),
                                                        formType === 'plan_limpieza' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            size: "sm",
                                                            className: "text-xs",
                                                            onClick: ()=>setFormContent(JSON.stringify(getDefaultPlanLimpiezaContent(formSStep), null, 2)),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                                    className: "h-3.5 w-3.5 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2600,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Cargar plan de limpieza por defecto"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2598,
                                                            columnNumber: 23
                                                        }, this),
                                                        formType === 'pdca' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            size: "sm",
                                                            className: "text-xs",
                                                            onClick: ()=>setFormContent(JSON.stringify(getDefaultPDCAContent(formSStep), null, 2)),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                                    className: "h-3.5 w-3.5 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2607,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Cargar PDCA por defecto"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2605,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            size: "sm",
                                                            className: "text-xs",
                                                            onClick: handleUploadJson,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                                    className: "h-3.5 w-3.5 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2614,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Subir JSON"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2613,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex rounded-md border overflow-hidden",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setEditorMode('visual'),
                                                                    className: `flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${editorMode === 'visual' ? 'bg-green-100 text-green-700' : 'bg-white text-gray-500 hover:bg-gray-50'}`,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                            className: "h-3.5 w-3.5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                            lineNumber: 2625,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        "Visual"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2620,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setEditorMode('json'),
                                                                    className: `flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${editorMode === 'json' ? 'bg-gray-800 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"], {
                                                                            className: "h-3.5 w-3.5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                            lineNumber: 2633,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        "JSON"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                                    lineNumber: 2628,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2619,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2546,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2544,
                                            columnNumber: 17
                                        }, this),
                                        editorMode === 'visual' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border rounded-lg p-4 flex-1 overflow-y-auto bg-gray-50",
                                            children: [
                                                (formType === 'autoevaluacion' || formType === 'auditoria') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChecklistEditor, {
                                                    content: formContent,
                                                    onChange: setFormContent
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2644,
                                                    columnNumber: 23
                                                }, this),
                                                formType === 'examen' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExamEditor, {
                                                    content: formContent,
                                                    onChange: setFormContent
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2647,
                                                    columnNumber: 23
                                                }, this),
                                                formType === 'formacion' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormationEditor, {
                                                    content: formContent,
                                                    onChange: setFormContent
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2650,
                                                    columnNumber: 23
                                                }, this),
                                                formType === 'inventario' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InventoryConfigEditor, {
                                                    content: formContent,
                                                    onChange: setFormContent,
                                                    sStep: formSStep
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2653,
                                                    columnNumber: 23
                                                }, this),
                                                formType === 'estandar' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StandardTemplateEditor, {
                                                    content: formContent,
                                                    onChange: setFormContent
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2656,
                                                    columnNumber: 23
                                                }, this),
                                                formType === 'plan_accion' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanAccionEditor, {
                                                    content: formContent,
                                                    onChange: setFormContent
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2659,
                                                    columnNumber: 23
                                                }, this),
                                                formType === 'layout' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LayoutTemplateEditor, {
                                                    content: formContent,
                                                    onChange: setFormContent
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2662,
                                                    columnNumber: 23
                                                }, this),
                                                formType === 'plan_limpieza' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanLimpiezaTemplateEditor, {
                                                    content: formContent,
                                                    onChange: setFormContent
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2665,
                                                    columnNumber: 23
                                                }, this),
                                                formType === 'pdca' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PDCATemplateEditor, {
                                                    content: formContent,
                                                    onChange: setFormContent
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2668,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2642,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: formContent,
                                            onChange: (e)=>setFormContent(e.target.value),
                                            className: "w-full flex-1 p-4 border rounded-lg font-mono text-sm bg-gray-50 focus:ring-2 focus:ring-green-300 focus:border-green-400 resize-none",
                                            style: {
                                                minHeight: 'calc(96vh - 380px)'
                                            },
                                            spellCheck: false
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2672,
                                            columnNumber: 19
                                        }, this),
                                        (()=>{
                                            try {
                                                JSON.parse(formContent);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-1 flex items-center gap-1 text-xs text-green-600",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-block w-2 h-2 rounded-full bg-green-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2687,
                                                            columnNumber: 25
                                                        }, this),
                                                        "JSON válido"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2686,
                                                    columnNumber: 23
                                                }, this);
                                            } catch  {
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-1 flex items-center gap-1 text-xs text-red-600",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                            className: "h-3 w-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                            lineNumber: 2693,
                                                            columnNumber: 23
                                                        }, this),
                                                        "JSON inválido - revisa el formato"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                                    lineNumber: 2692,
                                                    columnNumber: 21
                                                }, this);
                                            }
                                        })()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 2543,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 2437,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "shrink-0 flex gap-3 justify-end px-6 py-3 border-t bg-gray-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    className: "h-10 px-6",
                                    onClick: resetForm,
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 2703,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleSave,
                                    disabled: isSaving || !formTitle || !formContent,
                                    className: "h-10 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white gap-2",
                                    children: [
                                        isSaving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "h-4 w-4 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2706,
                                            columnNumber: 29
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                            lineNumber: 2706,
                                            columnNumber: 76
                                        }, this),
                                        editingTemplate ? 'Guardar Cambios' : 'Crear Plantilla'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                                    lineNumber: 2704,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/TemplateManager.tsx",
                            lineNumber: 2702,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/admin/TemplateManager.tsx",
                    lineNumber: 2404,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/admin/TemplateManager.tsx",
                lineNumber: 2403,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/TemplateManager.tsx",
        lineNumber: 2038,
        columnNumber: 5
    }, this);
}
_s(TemplateManager, "sj7dZBLYilvy0p+HAhckT31hKtc=");
_c9 = TemplateManager;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "ChecklistEditor");
__turbopack_context__.k.register(_c1, "ExamEditor");
__turbopack_context__.k.register(_c2, "FormationEditor");
__turbopack_context__.k.register(_c3, "InventoryConfigEditor");
__turbopack_context__.k.register(_c4, "StandardTemplateEditor");
__turbopack_context__.k.register(_c5, "PlanAccionEditor");
__turbopack_context__.k.register(_c6, "LayoutTemplateEditor");
__turbopack_context__.k.register(_c7, "PlanLimpiezaTemplateEditor");
__turbopack_context__.k.register(_c8, "PDCATemplateEditor");
__turbopack_context__.k.register(_c9, "TemplateManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_admin_TemplateManager_tsx_74f456ae._.js.map