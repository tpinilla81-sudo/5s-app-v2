# 5S App Worklog

---
Task ID: 1
Agent: Main
Task: Set up local development environment with SQLite

Work Log:
- Changed Prisma schema datasource from PostgreSQL to SQLite
- Ran prisma db push to create /home/z/my-project/db/custom.db
- Generated Prisma client for SQLite engine

Stage Summary:
- Local development now uses SQLite database at /home/z/my-project/db/custom.db
- PostgreSQL schema preserved in deploy/ directory for production

---
Task ID: 2
Agent: Main
Task: Seed database with Roncal company demo data

Work Log:
- Created scripts/seed-roncal.mjs with comprehensive seed data
- Created Roncal company, project, 4 zones, 6 empleados (including "Tablero"), auditor, responsable, admin_empresa
- Set up role permissions with updated defaults
- Seeded templates and audit targets

Stage Summary:
- Roncal company seeded successfully with all users
- Login credentials: Tablero: tablero@roncal.com / tablero123

---
Task ID: 3
Agent: Main
Task: Create API endpoint /api/progress/reset for resetting all progress

Work Log:
- Created /src/app/api/progress/reset/route.ts with POST endpoint
- Endpoint deletes all progress, employee progress, audit results, checklist responses, exam answers, action items, photos, inventory, standards, PDCA items, evaluation schedules, and notifications
- Requires reset_data or skip_steps permission
- Supports optional zoneId filter

Stage Summary:
- Reset API fully functional at /api/progress/reset
- Deletes all project data with confirmation counts returned

---
Task ID: 4
Agent: Main
Task: UI changes - Borrar Pasos button, hide Permisos from empleados, add Step 4 notification

Work Log:
- Added 🗑️ "Borrar Pasos" button in desktop toolbar and mobile menu (visible only to users with reset_data/skip_steps permission)
- Hidden 🛡️ "Permisos" button from employees (only visible to gestor/admin with manage_permissions)
- Added 🔔 "Autoeval" notification button for Step 4 (when steps 1-3 completed, notifies responsable)
- Added notify_autoeval permission to RolePermissions component
- Updated empleado permissions: removed step4_a1 (autoeval done by responsable only), added notify_autoeval
- Added canSeePermissions and canResetData permission checks in page.tsx
- Added Trash2 to lucide-react imports

Stage Summary:
- Employees cannot see Permisos button anymore
- Employees can request responsable to do autocheck via 🔔 Autoeval button on Step 4
- Reset button available for testing (gestor/admin only)
- Updated DEFAULT_PERMISSIONS in RolePermissions.tsx to reflect new permission model

---
Task ID: 7
Agent: Main
Task: Re-clone project from GitHub + restore Neon DB connection + recreate individual calendar (Task 5 files lost from repo)

Work Log:
- Cloned repo from github.com/tpinilla81-sudo/5s-app-v2 using user PAT
- Created .env with Neon DATABASE_URL (postgresql://neondb_owner:...@ep-round-glitter-as6ryhe3.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require)
- bun install (931 packages)
- bunx prisma generate + bunx prisma db push (schema already in sync with Neon)
- Verified Neon DB connection: 19 users, 1 project (Mecanización S.A. en RONCAL SL), 1 ActionItem, 1 Zone, 1 AuditResult
- ⚠️ Discovered t_pinilla@outlook.com does NOT exist in Neon — the cleanup done in previous session only affected local SQLite, not Neon. Gestor in Neon is gestor@cincos.com.
- Recreated src/app/api/my-tasks/route.ts (GET + PATCH)
- Recreated src/components/5s/UserTaskCalendar.tsx (Sheet with monthly calendar + list view, stat cards, task cards with quick actions)
- Modified src/app/page.tsx:
  - Cleaned up duplicate UserTaskCalendar import
  - Added showUserCalendar + userTaskCount state
  - Added useEffect polling /api/my-tasks every 60s for badge count
  - Added "📅 Calendario" button in gestor header (between Avisos and Manual)
  - Added "📅 Calendario" button in non-gestor desktop toolbar (between Borrar and Avisos)
  - Added "📅 Mi Calendario" entry in mobile hamburger menu (between Permisos and Borrar Pasos)
  - Rendered <UserTaskCalendar> Sheet at end of JSX
- Verified TypeScript: no errors in new files (pre-existing errors in other files remain)
- Started dev server on :3000 — verified /api/my-tasks returns 200 with correct data
- Gerente sees all ActionItems in their project; responsable sees only items where their name/email matches responsable/personaDemandada OR where they are Zone.responsableId

Stage Summary:
- Project successfully re-cloned to /home/z/my-project/5s-app-v2/
- Neon PostgreSQL connection working (schema is postgresql, db push reports "already in sync")
- Individual calendar feature (Task 5) fully recreated and verified:
  - GET /api/my-tasks?userId=... → returns tasks + stats
  - PATCH /api/my-tasks → updates estado (abierta/en_proceso/resuelta)
  - UserTaskCalendar Sheet with calendar+list view, markers, quick actions
  - Calendar button in all 3 toolbar locations (gestor header, non-gestor desktop toolbar, mobile menu)
- ⚠️ PENDING: Neon DB cleanup (user previously requested "deja la app limpia excepto gestor t_pinilla@outlook.com" but that was only done on local SQLite; Neon still has 19 demo users). Need user confirmation before deleting production data.
- ⚠️ PENDING: Commit + push to GitHub so Vercel redeploys with the new calendar feature.
- ⚠️ PENDING: User should revoke the GitHub PAT (ghp_...23HFz4) — it was shared in plaintext in the chat.

---
Task ID: v2.19
Agent: Main
Task: Reorganizar sección de Proyectos en dos cajas separadas (Activos | Abrir Nuevo)

Work Log:
- Localizado el componente AdminPanel.tsx (pestaña Proyectos) — v2.18 ya había
  hecho una primera separación pero la lista de proyectos quedaba FUERA de la
  caja "Proyectos Activos", lo que daba sensación de "mezclado todo".
- Reescrito el cuerpo de la pestaña Proyectos con dos cajas claramente
  separadas:
  * CAJA 1 — "Proyectos Activos" (header azul): envuelve el banner + la
    lista de proyectos existentes. Cada proyecto expandible muestra:
    - info editable (nombre, descripción, empresa)
    - zonas existentes con sus miembros (editable rol, retirar de zona)
    - añadir zona nueva (renombrar/eliminar inline)
    - añadir usuario EXISTENTE a cada zona (picker con dropdown de todos
      los usuarios activos; los que ya están en la zona no aparecen)
    - añadir usuario NUEVO al proyecto con zonas asignadas
  * CAJA 2 — "Abrir Nuevo Proyecto" (header morado, debajo): formulario
    de alta con nombre, empresa, descripción, zonas, Y NUEVO: sección
    "Usuarios del proyecto" que permite añadir usuarios existentes o
    crear nuevos, con rol y selección de zonas, ANTES de crear el
    proyecto. Al crear, todos los usuarios pendientes se asignan al
    proyecto+zonas recién creadas.
- Añadido estado nuevo: newProjectMembers (lista de miembros pendientes),
  npMemberMode/Name/Email/Password/Role/ZoneIdxs para el formulario.
- Añadido handler handleAddNewProjectMember y actualizado
  handleCreateProject para iterar sobre newProjectMembers y llamar a
  POST /api/projects/{id}/members para cada uno.
- Bump de versión: middleware BUILD_VERSION → 20260813-120000-v2.19,
  badge en page.tsx y LoginPage.tsx → v2.19.
- Verificado: TypeScript compila limpio (solo quedan 2 errores
  preexistentes en AdminPanel no relacionados con este cambio); build
  de Next.js OK ("Compiled successfully in 20.8s").

Stage Summary:
- Pestaña Proyectos reorganizada visualmente en dos cajas claras.
- Caja 1 contiene la lista de proyectos activos con TODA la edición
  (info, zonas, miembros por zona, añadir existente/nuevo).
- Caja 2 permite crear un proyecto nuevo con zonas Y usuarios
  (existentes o nuevos) en un solo flujo.
- Listo para commit + push a Vercel.

---
Task ID: v2.20
Agent: Main
Task: Eliminar el listado "Miembros del Proyecto" (redundante — ya están en cada zona)

Work Log:
- Localizada la sección "Miembros del Proyecto" en AdminPanel.tsx
  (líneas 1558-1931): incluía el formulario de alta de miembros
  (existente/nuevo) + tabla editable con nombre/email/contraseña/rol/
  zonas + botones de enviar credenciales / eliminar.
- Confirmado que toda esa información YA está disponible dentro de cada
  zona en la sección "Zonas del Proyecto" (arriba): cada zona muestra
  sus miembros con rol, eliminar de zona, añadir existente/nuevo.
- Script scripts/remove_project_members_listing.py elimina 375 líneas
  (líneas 1557-1931 inclusive) dejando la estructura JSX válida.
- TypeScript: solo 2 errores preexistentes en AdminPanel.tsx (líneas
  635 y 1158), ninguno relacionado con este cambio.
- Next.js build: "✓ Compiled successfully in 20.5s" — 56 páginas
  estáticas generadas.
- Bump de versión: BUILD_VERSION → 20260813-130000-v2.20, badges en
  page.tsx y LoginPage.tsx → v2.20.
- Commit + push a GitHub (5c81f07). Vercel redeploy disparado.

Stage Summary:
- Pestaña Proyectos: cada proyecto expandible ahora muestra solo
  (1) info editable, (2) zonas con sus miembros. Sin listado
  duplicado a nivel de proyecto.
- Caja "Abrir Nuevo Proyecto" intacta (sigue permitiendo añadir
  usuarios existentes/nuevos al crear el proyecto).
- Despliegue en curso en Vercel.

---
Task ID: v2.21
Agent: Main
Task: Permitir crear usuario NUEVO desde cada zona existente (no solo asignar existentes)

Work Log:
- Detectado problema reportado por usuario: al añadir zona a un proyecto
  existente, solo aparece el picker de "Añadir existente" — no hay
  formulario para crear un usuario NUEVO y asignarlo a esa zona.
- Añadido estado por zona:
  * zoneAddMode: 'existing' | 'new' (toggle por zona)
  * zoneNewName, zoneNewEmail, zoneNewPassword (Record<zoneId, string>)
- Añadido handler handleCreateNewUserInZone(zoneId):
  1. POST /api/users → crea el User (sin empresa/proyecto)
  2. POST /api/projects/{pid}/zones/{zid}/members → asigna el nuevo
     userId a la zona (esto crea ProjectMember + MemberZone)
  3. Actualiza projectMembers local, recarga users + projects
  4. Limpia el formulario de esa zona
  5. Muestra notificación verde con la contraseña
- Sustituida la UI de "Añadir existente" por un toggle de 2 pestañas:
  * "Asignar existente" (muestra count de disponibles)
  * "Crear nuevo usuario" (formulario nombre/email/password/rol +
    botón "Crear y asignar a esta zona")
- Cuando no hay disponibles en modo existente, el mensaje ahora guía
  al usuario a usar "Crear nuevo usuario".
- Reubicada la notificación de contraseña generada (verde, con
  copiar/cerrar) al inicio del panel de detalle del proyecto, justo
  encima de "Zonas del Proyecto".
- Build OK (21.1s). Bump v2.21. Push + deploy verificado en Vercel
  (x-build-version: 20260813-140000-v2.21).

Stage Summary:
- Cada zona existente permite ahora AMBOS flujos: asignar existente
  (dropdown) O crear nuevo usuario (formulario inline).
- Validaciones: nombre + email obligatorios, contraseña ≥ 6 car.
- Tras crear un usuario nuevo, recarga la lista de users (aparecerá
  en "existentes" para otras zonas) y los proyectos (memberCount).

---
Task ID: v2.22
Agent: Main
Task: Fix crear usuario en zona — email duplicado falso + dropdown no aparece

Work Log:
- Causa raíz #1 ("email repetido" falso positivo): el API POST /api/users
  hace findUnique por email global. Si el email existe en OTRA empresa
  o como usuario inactivo (no visible en la lista del admin), falla con
  "Ya existe un usuario con ese email" aunque el admin no lo vea.
- Causa raíz #2 ("no aparece desplegable"): cuando availableUsers.length
  === 0, se mostraba un texto plano sin guía clara, y el Select dropdown
  del rol estaba dentro de un contenedor con overflow que recortaba el
  portal.
- Fix #1: añadido endpoint /api/users/lookup-by-email (gestor/admin)
  que hace findUnique por email exacto, sin filtrar por empresa/activo.
  En handleCreateNewUserInZone, si POST /api/users responde "email
  ya existe", se hace automáticamente lookup y se asigna ese usuario
  a la zona (con alert informativo al admin).
- Fix #2:
  * SelectContent con position="popper" + side="top" en TODOS los
    dropdowns de la sección de zona (evita recortes por overflow).
  * Placeholder dinámico: "Seleccionar usuario (N disponibles)".
  * Estado de carga: muestra "Cargando usuarios..." mientras
    isLoadingUsers=true.
  * Estado vacío mejorado: 3 mensajes — "No hay usuarios disponibles",
    botón inline "→ Crear nuevo usuario", nota explicativa.
  * Al expandir un proyecto (handleSelectProject), se llama loadUsers()
    para asegurar que la lista esté fresca.
- Build OK (20.8s, 57 páginas). Push + deploy verificado en Vercel
  (x-build-version: 20260813-150000-v2.22).

Stage Summary:
- Crear usuario nuevo en zona: si email colisiona, se reutiliza el
  usuario existente (incluso de otra empresa) en vez de fallar.
- Dropdown de existentes: siempre visible cuando hay disponibles,
  con count en el placeholder y portal bien posicionado.
- Empty state claro con CTA hacia "Crear nuevo usuario".

---
Task ID: v2.25
Agent: Main
Task: Sliding session — "con el mismo token, dura 7 días" desde última actividad

Work Log:
- Diagnóstico: la sesión actual era FIJA de 7 días desde el login.
  getAuthUser solo verificaba expiresAt; cookie con maxAge fijo de 7 días
  desde el login. Usuario activo era desconectado a los 7 días exactos.
- auth-helpers.ts (getAuthUser): añadida renovación "sliding" en DB.
  * Nueva constante SESSION_RENEWAL_THRESHOLD_DAYS = 1
  * Si faltan <1 día para expirar, UPDATE session.expiresAt = ahora + 7d
  * Evita escribir en DB en cada petición (solo cuando está cerca de
    expirar)
  * Exportada SESSION_DURATION_DAYS para reutilización
- middleware.ts: añadido refresh de cookie en cada petición autenticada.
  * Si request tiene cookie 5s_session, response.cookies.set con mismo
    valor + maxAge=7d
  * Hace la cookie "sliding" — el navegador no la borra mientras el
    usuario esté activo
- Bump versión v2.25 en middleware, LoginPage.tsx, page.tsx
- Build Next.js: "✓ Compiled successfully in 20.2s"
- Commit local: e3f6a50 "v2.25: sliding session — mismo token dura
  7 días desde última actividad"
- Push a GitHub: FALLA — el entorno actual no tiene credenciales
  configuradas (no ~/.git-credentials, no GH_TOKEN, no gh CLI).
  El usuario necesita hacer `git push origin main` desde su entorno
  para disparar el deploy en Vercel.

Stage Summary:
- Comportamiento nuevo: mientras el usuario use la app al menos una
  vez cada 7 días, NUNCA es desconectado. Solo caduca si pasan 7 días
  seguidos sin actividad.
- Mecanismo: cookie refrescada en cada request (middleware) + DB
  session.expiresAt renovada cuando faltan <24h (getAuthUser).
- El token mismo no cambia — sigue siendo el mismo durante toda la
  vida de la sesión. Solo se extienden cookie maxAge y DB expiresAt.
- Pendiente: `git push origin main` desde entorno con credenciales
  GitHub para deploy en Vercel.

---
Task ID: v2.26
Agent: Main
Task: Centralizar alta de usuarios en 'Datos Empresa'; en proyectos/zona solo adjudicar existentes

Work Log:
- Modelo nuevo definido por usuario:
  * Datos Empresa → listado maestro + alta/edición/borrado
  * Proyectos/Zona → solo adjudicar usuarios ya existentes
- UI AdminPanel.tsx:
  * Eliminado toggle "Crear nuevo / De esta empresa" dentro de cada zona
  * Eliminado formulario de "Crear nuevo usuario" dentro de cada zona
  * Eliminado toggle "Asignar existente / Crear nuevo" del modal Nuevo Proyecto
  * Eliminado formulario de creación en el modal Nuevo Proyecto
  * Añadida nueva sección "Usuarios de la Empresa" en pestaña Datos Empresa:
    - Listado maestro filtrado por empresa del admin actual
    - Formulario de alta (nombre/email/password/rol) con botón "Crear nuevo usuario"
    - Tabla con columnas: Nombre, Email, Rol, Estado, Acciones
    - Acciones por usuario: Activar/Desactivar, Reset pass, Eliminar
    - Stats: total / activos / inactivos
- Handlers nuevos:
  * handleCreateCompanyUser (POST /api/users + POST /api/companies/{id}/members)
  * handleToggleUserActive (PUT /api/users con active)
  * handleResetUserPassword (PUT /api/users con password)
  * handleDeleteCompanyUser (DELETE /api/users?id=)
- Estados nuevos: showAddCompanyUser, newCompanyUserName/Email/Password/Role
- API zona-members: añadido auto-link a empresa del proyecto
  (CompanyMember.upsert idempotente) como salvaguarda
- Build OK (21.6s). Bump v2.26 en middleware, LoginPage, page.tsx
- Commit local: bb84044
- Push a GitHub: FALLA — token PAT anterior fue revocado (correcto).
  Usuario debe pasar nuevo token o hacer push manual.

Stage Summary:
- Flujo nuevo coherente con tarifa: alta en Datos Empresa → adjudicación
  en proyectos/zonas → tarifa calculada sobre usuarios activos de la empresa
- En cada zona solo aparece picker de existentes (con buscador + lista)
- Empty state claro: "Crea nuevos usuarios en Datos Empresa → Usuarios"
- API de zona-members mantiene auto-link a empresa como defensa
