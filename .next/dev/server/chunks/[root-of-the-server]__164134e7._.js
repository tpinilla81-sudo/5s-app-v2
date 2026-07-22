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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
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
"[project]/src/app/api/permissions/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-helpers.ts [app-route] (ecmascript)");
;
;
;
// ═══════════════════════════════════════════════════════════════════
// TWO-TIER PERMISSION SYSTEM
// ═══════════════════════════════════════════════════════════════════
// Tier 1: PLATFORM permissions (gestor manages the app)
//   - What the gestor can do regarding the platform
//   - What the gestor allows/restricts for each admin de empresa
//   - Contracts, subscriptions, company limits, etc.
//
// Tier 2: PROJECT permissions (admin manages their company)
//   - What each role can do inside a project
//   - Only the admin de empresa can configure these
//   - The gestor does NOT touch these (each company is independent)
// ═══════════════════════════════════════════════════════════════════
// ═════════════════════════════════════════════════════════
// PER-S PERMISSION DEFINITIONS (PROJECT TIER)
// ═════════════════════════════════════════════════════════
const S_STEPS = [
    1,
    2,
    3,
    4,
    5
];
const MINI_STEPS = [
    1,
    2,
    3,
    4,
    5
];
const MINI_STEP_ACTIONS = {
    1: [
        'Ver formación',
        'Completar formación'
    ],
    2: [
        'Ver fotos',
        'Subir fotos'
    ],
    3: [
        'Ver inventario',
        'Editar inventario'
    ],
    4: [
        'Ver autoevaluación',
        'Realizar autoevaluación'
    ],
    5: [
        'Ver auditoría',
        'Realizar auditoría'
    ]
};
// Build all per-S permission IDs
const PER_S_PERMISSIONS = [];
for (const s of S_STEPS){
    for (const ms of MINI_STEPS){
        const actions = MINI_STEP_ACTIONS[ms];
        actions.forEach((_, aIdx)=>{
            PER_S_PERMISSIONS.push(`s${s}_step${ms}_a${aIdx}`);
        });
    }
}
// ═════════════════════════════════════════════════════════
// TIER 1: PLATFORM PERMISSIONS (gestor level)
// ═════════════════════════════════════════════════════════
const PLATFORM_PERMISSIONS = [
    // Company management
    'platform_create_company',
    'platform_edit_company',
    'platform_delete_company',
    'platform_view_companies',
    'platform_activate_company',
    // Admin management
    'platform_assign_admin',
    'platform_remove_admin',
    'platform_reset_admin_pwd',
    'platform_view_all_users',
    'platform_edit_users',
    // Contracts & subscriptions
    'platform_manage_contracts',
    'platform_view_contracts',
    'platform_manage_subscriptions',
    'platform_set_company_limits',
    // Platform config
    'platform_config',
    'platform_manage_templates',
    'platform_view_stats',
    'platform_send_notifications'
];
// ═════════════════════════════════════════════════════════
// TIER 2: PROJECT PERMISSIONS (admin de empresa level)
// ═════════════════════════════════════════════════════════
const PROJECT_GENERAL_PERMISSIONS = [
    'view_board',
    'view_progress',
    'view_project',
    'edit_project',
    'manage_zones',
    'view_team',
    'add_members',
    'remove_members',
    'change_roles',
    'manage_training',
    'delete_photos',
    'delete_inventory',
    'approve_audit',
    'delete_project',
    'reset_data',
    'manage_templates',
    'skip_steps',
    'notify_audit',
    'notify_autoeval',
    'manage_permissions',
    'accept_audit_meeting'
];
const ALL_PERMISSIONS = [
    ...PLATFORM_PERMISSIONS,
    ...PER_S_PERMISSIONS,
    ...PROJECT_GENERAL_PERMISSIONS
];
const ALL_ROLES = [
    'gestor',
    'admin',
    'gerente',
    'responsable',
    'empleado',
    'auditor'
];
// ═════════════════════════════════════════════════════════
// DEFAULT PERMISSIONS
// ═════════════════════════════════════════════════════════
const DEFAULT_PERMISSIONS = {
    // GESTOR: full platform access, NO project-level access (manages platform, not projects)
    gestor: [
        ...PLATFORM_PERMISSIONS
    ],
    // ADMIN DE EMPRESA: manages company/projects/users, does NOT execute 5S steps
    // Can VIEW everything (a0) but cannot EXECUTE any 5S step (a1)
    // Only gestor can change admin permissions
    admin: [
        // Project management (full control over company structure)
        'view_board',
        'view_progress',
        'view_project',
        'edit_project',
        'manage_zones',
        'view_team',
        'add_members',
        'remove_members',
        'change_roles',
        'manage_training',
        'delete_photos',
        'delete_inventory',
        'approve_audit',
        'delete_project',
        'reset_data',
        'manage_templates',
        'skip_steps',
        'notify_audit',
        'accept_audit_meeting',
        // S-steps: VIEW only (a0), cannot execute (a1)
        ...PER_S_PERMISSIONS.filter((id)=>id.endsWith('_a0'))
    ],
    gerente: [
        'view_board',
        'view_progress',
        'view_project',
        'view_team',
        'edit_project',
        'manage_zones',
        'accept_audit_meeting',
        // S-steps: can view all mini-steps, can edit inventory
        ...PER_S_PERMISSIONS.filter((id)=>{
            // All "view" actions (a0)
            if (id.endsWith('_a0')) return true;
            // Edit inventory for S2 and S3
            if (id.match(/^s[23]_step3_a1$/)) return true;
            return false;
        })
    ],
    responsable: [
        'view_board',
        'view_progress',
        'view_project',
        'view_team',
        'edit_project',
        'manage_zones',
        'add_members',
        'remove_members',
        'change_roles',
        'manage_training',
        'delete_photos',
        'delete_inventory',
        'approve_audit',
        'accept_audit_meeting',
        // S-steps: can view and execute steps 1-4, but NOT step 5 (conduct audit)
        ...PER_S_PERMISSIONS.filter((id)=>{
            if (id.endsWith('_a0')) return true // All view
            ;
            if (id.match(/_step5_a1$/)) return false // Cannot conduct audits
            ;
            return true // Can execute steps 1-4
            ;
        })
    ],
    empleado: [
        'view_board',
        'view_progress',
        'view_project',
        'view_team',
        'notify_audit',
        'notify_autoeval',
        'reset_data',
        // S-steps: can view all, can execute steps 1-4, can only view step 5
        ...PER_S_PERMISSIONS.filter((id)=>{
            if (id.endsWith('_a0')) return true // All view
            ;
            if (id.match(/_step5_a1$/)) return false // Cannot conduct audits
            ;
            return true // Can execute steps 1-4
            ;
        })
    ],
    auditor: [
        'view_board',
        'view_progress',
        'view_project',
        'view_team',
        'approve_audit',
        'accept_audit_meeting',
        // S-steps: can view all, can conduct audits (step 5 a1), but NOT execute steps 1-4
        ...PER_S_PERMISSIONS.filter((id)=>{
            if (id.endsWith('_a0')) return true // All view
            ;
            if (id.match(/_step5_a1$/)) return true // Can conduct audits
            ;
            return false // Cannot execute steps 1-4
            ;
        })
    ]
};
async function GET() {
    try {
        let configs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].rolePermissionConfig.findMany();
        // Ensure all expected permissions exist in DB using UPSERT (preserve custom edits!)
        const existingPermIds = new Set(configs.map((c)=>`${c.role}::${c.permission}`));
        const upsertPromises = [];
        for (const [role, defaultPerms] of Object.entries(DEFAULT_PERMISSIONS)){
            for (const permission of ALL_PERMISSIONS){
                const key = `${role}::${permission}`;
                if (!existingPermIds.has(key)) {
                    // Only create missing permissions with default value - NEVER overwrite existing customizations
                    const allowed = defaultPerms.includes(permission);
                    upsertPromises.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].rolePermissionConfig.upsert({
                        where: {
                            role_permission: {
                                role,
                                permission
                            }
                        },
                        update: {},
                        create: {
                            role,
                            permission,
                            allowed
                        }
                    }));
                }
            }
        }
        if (upsertPromises.length > 0) {
            // Batch upserts to avoid overwhelming the connection pool (Neon limit)
            const BATCH_SIZE = 20;
            for(let i = 0; i < upsertPromises.length; i += BATCH_SIZE){
                const batch = upsertPromises.slice(i, i + BATCH_SIZE);
                await Promise.all(batch);
            }
            configs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].rolePermissionConfig.findMany();
        }
        // Clean up stale/old-format permissions that no longer exist in the current system
        const allValidPermIds = new Set(ALL_PERMISSIONS);
        const staleConfigs = configs.filter((c)=>!allValidPermIds.has(c.permission));
        if (staleConfigs.length > 0) {
            // Batch deletes to avoid overwhelming the connection pool
            const BATCH_SIZE = 20;
            for(let i = 0; i < staleConfigs.length; i += BATCH_SIZE){
                const batch = staleConfigs.slice(i, i + BATCH_SIZE);
                await Promise.all(batch.map((c)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].rolePermissionConfig.deleteMany({
                        where: {
                            role: c.role,
                            permission: c.permission
                        }
                    })));
            }
            configs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].rolePermissionConfig.findMany();
        }
        // Group by role
        // Also clean up stale roles not in ALL_ROLES
        const validRoles = new Set(ALL_ROLES);
        const staleRoles = configs.filter((c)=>!validRoles.has(c.role));
        if (staleRoles.length > 0) {
            const staleRoleNames = [
                ...new Set(staleRoles.map((c)=>c.role))
            ];
            for (const role of staleRoleNames){
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].rolePermissionConfig.deleteMany({
                    where: {
                        role
                    }
                });
            }
            configs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].rolePermissionConfig.findMany();
        }
        const result = {};
        for (const role of ALL_ROLES){
            result[role] = {};
        }
        for (const config of configs){
            if (!result[config.role]) result[config.role] = {};
            result[config.role][config.permission] = config.allowed;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            permissions: result
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Get permissions error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error al obtener permisos'
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        // Only gestor or admin can modify permissions
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthUser"])(request);
        if (!user || user.role !== 'gestor' && user.role !== 'admin') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No autorizado'
            }, {
                status: 403
            });
        }
        const body = await request.json();
        const { permissions } = body;
        if (!permissions) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Se requiere el objeto permissions'
            }, {
                status: 400
            });
        }
        const updatePromises = [];
        for (const [role, perms] of Object.entries(permissions)){
            if (!ALL_ROLES.includes(role)) continue;
            for (const [permission, allowed] of Object.entries(perms)){
                if (!ALL_PERMISSIONS.includes(permission)) continue;
                // Admin cannot modify their own role's permissions — only gestor can
                if (user.role === 'admin' && role === 'admin') continue;
                updatePromises.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].rolePermissionConfig.upsert({
                    where: {
                        role_permission: {
                            role,
                            permission
                        }
                    },
                    update: {
                        allowed: Boolean(allowed)
                    },
                    create: {
                        role,
                        permission,
                        allowed: Boolean(allowed)
                    }
                }));
            }
        }
        await Promise.all(updatePromises);
        // Return updated config
        const configs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].rolePermissionConfig.findMany();
        const result = {};
        for (const role of ALL_ROLES){
            result[role] = {};
        }
        for (const config of configs){
            if (!result[config.role]) result[config.role] = {};
            result[config.role][config.permission] = config.allowed;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            permissions: result
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Update permissions error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error al actualizar permisos'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        // Only gestor can reset permissions
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthUser"])(request);
        if (!user || user.role !== 'gestor') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Solo el gestor puede restaurar permisos'
            }, {
                status: 403
            });
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].rolePermissionConfig.deleteMany({});
        const createPromises = [];
        for (const [role, perms] of Object.entries(DEFAULT_PERMISSIONS)){
            for (const permission of ALL_PERMISSIONS){
                const allowed = perms.includes(permission);
                createPromises.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].rolePermissionConfig.create({
                    data: {
                        role,
                        permission,
                        allowed
                    }
                }));
            }
        }
        // Batch creates to avoid overwhelming the connection pool (Neon limit)
        const BATCH_SIZE = 20;
        for(let i = 0; i < createPromises.length; i += BATCH_SIZE){
            const batch = createPromises.slice(i, i + BATCH_SIZE);
            await Promise.all(batch);
        }
        const configs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].rolePermissionConfig.findMany();
        const result = {};
        for (const config of configs){
            if (!result[config.role]) result[config.role] = {};
            result[config.role][config.permission] = config.allowed;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            permissions: result
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Reset permissions error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error al restaurar permisos'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__164134e7._.js.map