module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db,
    "ensureSystemConfigTable",
    ()=>ensureSystemConfigTable
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
;
;
;
const globalForPrisma = globalThis;
// Ensure DATABASE_URL points to Neon PostgreSQL (not SQLite from parent env)
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:')) {
    try {
        const envPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), '.env');
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(envPath)) {
            const envContent = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(envPath, 'utf8');
            const match = envContent.match(/^DATABASE_URL="(.+)"$/m);
            if (match && match[1].startsWith('postgresql://')) {
                process.env.DATABASE_URL = match[1];
            }
        }
    } catch (e) {
    // Ignore
    }
}
// Also load DATABASE_URL_UNPOOLED for Prisma migrations
if (!process.env.DATABASE_URL_UNPOOLED) {
    try {
        const envPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), '.env');
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(envPath)) {
            const envContent = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(envPath, 'utf8');
            const match = envContent.match(/^DATABASE_URL_UNPOOLED="(.+)"$/m);
            if (match) {
                process.env.DATABASE_URL_UNPOOLED = match[1];
            }
        }
    } catch (e) {
    // Ignore
    }
}
function createPrismaClient() {
    return new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
        log: [
            'error'
        ],
        datasources: {
            db: {
                url: process.env.DATABASE_URL
            }
        }
    });
}
// Always reuse the global instance to prevent connection pool exhaustion with Neon
// In dev, hot-reload can create many instances; in prod, serverless can too
const db = globalForPrisma.prisma ?? createPrismaClient();
// Store globally regardless of environment
globalForPrisma.prisma = db;
async function ensureSystemConfigTable() {
    if (globalForPrisma.systemConfigMigrated) return;
    try {
        await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "SystemConfig" (
        "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        "key" TEXT NOT NULL UNIQUE,
        "value" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
        await db.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "SystemConfig_key_key" ON "SystemConfig"("key");
    `);
        globalForPrisma.systemConfigMigrated = true;
    } catch (e) {
        // Table might already exist, or we might not have permissions — that's OK
        globalForPrisma.systemConfigMigrated = true;
    }
}
;
}),
"[project]/src/lib/auth-helpers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SESSION_COOKIE",
    ()=>SESSION_COOKIE,
    "generateSessionToken",
    ()=>generateSessionToken,
    "getAuthUser",
    ()=>getAuthUser,
    "getGerenteUser",
    ()=>getGerenteUser,
    "getSessionExpiry",
    ()=>getSessionExpiry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
const SESSION_COOKIE = '5s_session';
const SESSION_DURATION_DAYS = 7;
async function getAuthUser(request) {
    const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;
    if (!sessionToken) return null;
    // Look up the session by token (not by user ID!)
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].session.findUnique({
        where: {
            token: sessionToken
        },
        select: {
            id: true,
            userId: true,
            expiresAt: true
        }
    });
    if (!session) return null;
    // Check if session has expired
    if (new Date() > session.expiresAt) {
        // Clean up expired session
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].session.delete({
            where: {
                id: session.id
            }
        }).catch(()=>{});
        return null;
    }
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.findUnique({
        where: {
            id: session.userId
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            avatar: true,
            active: true
        }
    });
    if (!user || !user.active) {
        // User deactivated — clean up their session
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].session.delete({
            where: {
                id: session.id
            }
        }).catch(()=>{});
        return null;
    }
    return user;
}
async function getGerenteUser(request) {
    const user = await getAuthUser(request);
    if (!user) return null;
    // Permission-driven: check view_progress permission from DB
    const permConfig = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].rolePermissionConfig.findUnique({
        where: {
            role_permission: {
                role: user.role,
                permission: 'view_progress'
            }
        }
    });
    if (!permConfig?.allowed) return null;
    return user;
}
function generateSessionToken() {
    const { randomBytes } = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
    return randomBytes(32).toString('hex');
}
function getSessionExpiry() {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);
    return expiresAt;
}
}),
"[project]/src/app/api/auth/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-helpers.ts [app-route] (ecmascript)");
;
;
;
;
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days
;
function hashPasswordSync(password) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])('sha256').update(password).digest('hex');
}
async function GET(request) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthUser"])(request);
        if (!user) {
            const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                user: null
            }, {
                status: 200
            });
            response.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_COOKIE"], '', {
                path: '/',
                maxAge: 0
            });
            return response;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            user
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Session check error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            user: null
        }, {
            status: 200
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;
        if (!email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Email y contraseña son requeridos'
            }, {
                status: 400
            });
        }
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.findUnique({
            where: {
                email: email.toLowerCase().trim()
            }
        });
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Credenciales inválidas'
            }, {
                status: 401
            });
        }
        const hashedPassword = hashPasswordSync(password);
        if (user.password !== hashedPassword) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Credenciales inválidas'
            }, {
                status: 401
            });
        }
        if (!user.active) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Cuenta desactivada. Contacte al administrador.'
            }, {
                status: 403
            });
        }
        // Create a secure session token
        const token = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(32).toString('hex');
        const expiresAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionExpiry"])();
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].session.create({
            data: {
                token,
                userId: user.id,
                expiresAt
            }
        });
        // Clean up old expired sessions for this user
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].session.deleteMany({
            where: {
                userId: user.id,
                expiresAt: {
                    lt: new Date()
                }
            }
        }).catch(()=>{});
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                avatar: user.avatar,
                active: user.active
            }
        }, {
            status: 200
        });
        response.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_COOKIE"], token, {
            httpOnly: true,
            path: '/',
            maxAge: COOKIE_MAX_AGE,
            sameSite: 'lax',
            secure: ("TURBOPACK compile-time value", "development") === 'production'
        });
        return response;
    } catch (error) {
        console.error('Login error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error interno del servidor'
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const body = await request.json();
        const { name, email, password, role } = body;
        if (!name || !email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Nombre, email y contraseña son requeridos'
            }, {
                status: 400
            });
        }
        // Self-registration is always 'empleado' role — admin creates users with specific roles
        const userRole = 'empleado';
        // Check if user already exists
        const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.findUnique({
            where: {
                email: email.toLowerCase().trim()
            }
        });
        if (existingUser) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Ya existe un usuario con este email'
            }, {
                status: 409
            });
        }
        const hashedPassword = hashPasswordSync(password);
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.create({
            data: {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                password: hashedPassword,
                role: userRole
            }
        });
        // Create a secure session token for auto-login
        const token = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(32).toString('hex');
        const expiresAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionExpiry"])();
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].session.create({
            data: {
                token,
                userId: user.id,
                expiresAt
            }
        });
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                avatar: user.avatar,
                active: user.active
            }
        }, {
            status: 201
        });
        // Auto-login after registration
        response.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_COOKIE"], token, {
            httpOnly: true,
            path: '/',
            maxAge: COOKIE_MAX_AGE,
            sameSite: 'lax',
            secure: ("TURBOPACK compile-time value", "development") === 'production'
        });
        return response;
    } catch (error) {
        console.error('Registration error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error interno del servidor'
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const sessionToken = request.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_COOKIE"])?.value;
        // Delete the session from database
        if (sessionToken) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].session.deleteMany({
                where: {
                    token: sessionToken
                }
            }).catch(()=>{});
        }
    } catch (error) {
        console.error('Logout cleanup error:', error);
    }
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        message: 'Sesión cerrada'
    }, {
        status: 200
    });
    response.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_COOKIE"], '', {
        httpOnly: true,
        path: '/',
        maxAge: 0
    });
    return response;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__81f4aff0._.js.map