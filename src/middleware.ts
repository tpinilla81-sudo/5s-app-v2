import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// BUILD_VERSION se genera dinámicamente en build time.
// En Vercel: usa VERCEL_GIT_COMMIT_SHA + env vars.
// En local: usa timestamp actual.
function computeBuildVersion(): string {
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
  const pkgVersion = process.env.NEXT_PUBLIC_APP_VERSION
    || process.env.npm_package_version
    || '3.0.0';  // Fallback for testing
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const ts =
    now.getUTCFullYear().toString() +
    pad(now.getUTCMonth() + 1) +
    pad(now.getUTCDate()) +
    '-' +
    pad(now.getUTCHours()) +
    pad(now.getUTCMinutes()) +
    pad(now.getUTCSeconds());
  const sha = process.env.VERCEL_GIT_COMMIT_SHA
    ? '-' + process.env.VERCEL_GIT_COMMIT_SHA.substring(0, 7)
    : '';
  return `${ts}-v${pkgVersion}${sha}`;
}

const BUILD_VERSION = computeBuildVersion();
const SESSION_COOKIE = '5s_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // 1. Redirección para limpiar caché manual (/fresh)
  if (url.pathname === '/fresh') {
    const timestamp = Date.now();
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('_t', timestamp.toString());
    const redirectResponse = NextResponse.redirect(redirectUrl);
    redirectResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    redirectResponse.headers.set('Pragma', 'no-cache');
    redirectResponse.headers.set('Expires', '0');
    return redirectResponse;
  }

  // 2. Ruta de depuración de versión
  if (url.pathname === '/version') {
    return new NextResponse(BUILD_VERSION, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Build-Version': BUILD_VERSION,
      },
    });
  }

  // 3. Health check para monitoring
  if (url.pathname === '/health') {
    return new NextResponse(JSON.stringify({ status: 'ok', version: BUILD_VERSION }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 4. Procesar request normal
  const response = NextResponse.next();

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
      secure: process.env.NODE_ENV === 'production',
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
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }

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

// Matcher: ignorar archivos estáticos y assets
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|5s-logo.png|robots.txt|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico|.*\\.woff2?).*)'
  ],
};
