(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__13jvavz._.js",
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
;
// BUILD_VERSION se genera dinámicamente en build time.
// En Vercel: usa VERCEL_GIT_COMMIT_SHA + env vars.
// En local: usa timestamp actual.
function computeBuildVersion() {
    // 1. Si viene inyectado por el entorno (CI/CD), úsalo
    if (process.env.BUILD_VERSION) {
        return process.env.BUILD_VERSION;
    }
    // 2. Formato: YYYYMMDD-HHMMSS-v<package-version>
    //    Usamos process.env.VERCEL_GIT_COMMIT_SHA si está disponible (deploy en Vercel)
    //    para que cada deploy tenga una versión única.
    // v2.95: NEXT_PUBLIC_APP_VERSION se inyecta en build time desde package.json
    //    via next.config.ts. Antes usábamos process.env.npm_package_version, que
    //    solo está disponible cuando se ejecutan scripts npm localmente — en el
    //    runtime serverless de Vercel esa var no existe y siempre caía al
    //    fallback '2.90.0', por eso el badge de versión nunca se actualizaba.
    const pkgVersion = ("TURBOPACK compile-time value", "3.0.50") || process.env.npm_package_version || '3.0.0'; // Fallback for testing
    const now = new Date();
    const pad = (n)=>n.toString().padStart(2, '0');
    const ts = now.getUTCFullYear().toString() + pad(now.getUTCMonth() + 1) + pad(now.getUTCDate()) + '-' + pad(now.getUTCHours()) + pad(now.getUTCMinutes()) + pad(now.getUTCSeconds());
    const sha = process.env.VERCEL_GIT_COMMIT_SHA ? '-' + process.env.VERCEL_GIT_COMMIT_SHA.substring(0, 7) : '';
    return `${ts}-v${pkgVersion}${sha}`;
}
const BUILD_VERSION = computeBuildVersion();
const SESSION_COOKIE = '5s_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
function middleware(request) {
    const url = request.nextUrl;
    // 1. Redirección para limpiar caché manual (/fresh)
    if (url.pathname === '/fresh') {
        const timestamp = Date.now();
        const redirectUrl = new URL('/', request.url);
        redirectUrl.searchParams.set('_t', timestamp.toString());
        const redirectResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(redirectUrl);
        redirectResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        redirectResponse.headers.set('Pragma', 'no-cache');
        redirectResponse.headers.set('Expires', '0');
        return redirectResponse;
    }
    // 2. Ruta de depuración de versión
    if (url.pathname === '/version') {
        // v3.0.2: Usar BUILD_VERSION dinámico en lugar de valor harcodeado
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"](BUILD_VERSION, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'X-Build-Version': BUILD_VERSION
            }
        });
    }
    // 3. Health check para monitoring
    if (url.pathname === '/health') {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify({
            status: 'ok',
            version: BUILD_VERSION
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    // 4. Procesar request normal
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    // Sliding session: si el usuario tiene cookie de sesión, refrescar su
    // maxAge a 7 días en CADA petición. Así un usuario activo nunca es
    // desconectado por expiración de cookie — el token "dura 7 días" desde
    // su última actividad, no desde el login.
    const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;
    if (sessionToken) {
        response.cookies.set(SESSION_COOKIE, sessionToken, {
            httpOnly: true,
            path: '/',
            maxAge: SESSION_MAX_AGE,
            sameSite: 'lax',
            secure: ("TURBOPACK compile-time value", "development") === 'production'
        });
    }
    // Security headers para producción
    // X-Frame-Options: evitar clickjacking (la app no se embebe en iframes)
    response.headers.set('X-Frame-Options', 'DENY');
    // X-Content-Type-Options: evitar MIME-type sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff');
    // Referrer-Policy: control de información de referencia
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    // Permissions-Policy: limitar APIs del navegador
    response.headers.set('Permissions-Policy', 'camera=(self), microphone=(), geolocation=()');
    // X-XSS-Protection: protección legacy contra XSS
    response.headers.set('X-XSS-Protection', '1; mode=block');
    // HSTS: forzar HTTPS en producción (2 años, include subdomains, preload-ready)
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Cache control: no cachear páginas dinámicas, pero sí assets estáticos
    if (!url.pathname.startsWith('/_next/static/') && !url.pathname.startsWith('/_next/image/')) {
        response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        response.headers.set('Surrogate-Control', 'no-store');
        response.headers.set('X-Accel-Expires', '0');
        response.headers.delete('ETag');
    } else {
        // Assets estáticos: caché agresivo (1 año, inmutable)
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
    response.headers.set('X-Build-Version', BUILD_VERSION);
    return response;
}
const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|5s-logo.png|robots.txt|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico|.*\\.woff2?).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__13jvavz._.js.map