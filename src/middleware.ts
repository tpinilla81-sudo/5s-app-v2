import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BUILD_VERSION = '20260815-020000-v2.69';
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
