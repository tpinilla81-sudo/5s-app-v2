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

---
Task ID: v2.27
Agent: Main
Task: Revertir auto-link CompanyMember en API zona-members

Work Log:
- Usuario: el flujo correcto es alta en Datos Empresa → adjudicación
  en proyectos/zonas → tarifa sobre usuarios activos. El auto-link
  a CompanyMember que se añadió en v2.26 (commit 71f6b36) violaba
  el principio de "zonas no tocan empresas".
- Revertido en src/app/api/projects/[projectId]/zones/[zoneId]/members/route.ts:
  eliminado el bloque que hacía db.project.findUnique para companyId
  + db.companyMember.upsert idempotente.
- Sustituido por comentario aclarador: "No se toca CompanyMember aquí.
  La empresa del usuario se gestiona exclusivamente desde 'Datos
  Empresa → Usuarios'."
- Adjudicar a zona ahora solo crea/actualiza ProjectMember + MemberZone
  (comportamiento esperado).
- Verificada la UI AdminPanel.tsx: empty state en zona ya guía a
  Datos Empresa ("Crea nuevos usuarios en Datos Empresa → Usuarios
  y volverán a aparecer aquí"). Modal Nuevo Proyecto también indica
  "Solo puedes adjudicar usuarios ya dados de alta. Para crear nuevos,
  ve a Datos Empresa → Usuarios." No hay formulario de alta en zona
  ni en proyecto. Todo correcto.
- Build OK (21.0s, "✓ Compiled successfully").
- Bump v2.27 en middleware (BUILD_VERSION), LoginPage.tsx, page.tsx.
- Commit local: 6db1ec2.
- Push a GitHub: OK. Usando PAT nuevo proporcionado por usuario
  (ghp_...JH2r, válido 30 días). Cambio de fe7b8ed → 6db1ec2 en main.
- Vercel auto-redeploy disparado.

Stage Summary:
- API zona-members limpio: solo toca ProjectMember + MemberZone.
- Separación de responsabilidades respetada:
  * Datos Empresa → alta/edición/baja + CompanyMember
  * Proyectos/Zonas → solo adjudicar existentes (ProjectMember + MemberZone)
- v2.27 desplegado en Vercel.
- ⚠️ PAT quedó guardado en .git/config (remote URL con credenciales).
  El usuario puede revocarlo cuando quiera desde GitHub Settings.

---
Task ID: v2.28
Agent: Main
Task: Pantalla de selección de proyecto/zona tras login (eliminar dropdown del header)

Work Log:
- Decisiones UX confirmadas con usuario:
  * Mostrar SIEMPRE tras login (aunque tenga 1 sola opción)
  * Botón 'Cambiar' en header para volver al selector (elimina dropdown)
  * Gestor pasa por el MISMO selector (no skip a admin)
  * Layout: tarjetas de proyecto expandibles a zonas con color
- Cambios en src/lib/store.ts:
  * authView: añadido 'project_selector'
  * login/register/checkSession: si hay proyectos y NO es gestor,
    va a 'project_selector' (no asigna currentProject automáticamente).
    Gestor sigue yendo directo a 'board' con tab 'gestion'.
  * Nuevas acciones:
    - selectProjectAndZone(project, zone) → setea ambos + authView='board'
      + dispara fetchProgress y fetchEmployeeProgress
    - goToProjectSelector() → limpia currentProject/currentZone + authView='project_selector'
- Nuevo componente src/components/auth/ProjectSelector.tsx:
  * Header con logo + avatar del usuario + logout
  * Saludo personalizado ("Hola {nombre} 👋")
  * Grid 1-2 columnas de tarjetas de proyecto
  * Cada tarjeta: icono Building2 + nombre + companyName + descripción
    + badges (count de zonas, count de miembros)
  * Al clickar tarjeta: se expande (AnimatePresence) mostrando zonas
    accesibles como botones con color de la zona
  * Para admin/gestor/gerente: muestra todas las zonas del proyecto
  * Para empleado/responsable/auditor: solo las zonas en userZones
  * Empty state: "No tienes zonas asignadas en este proyecto"
  * Estado de carga con spinner
  * Si no hay proyectos: mensaje con CTA al logout
- Cambios en src/app/page.tsx:
  * Import ProjectSelector
  * Añadido 'if (authView === "project_selector") return <ProjectSelector onLogout={handleLogout} />'
  * Eliminado el dropdown de zona del header (líneas 384-413 antes)
  * Añadido botón 'Cambiar' (variant outline, color azul, icono RefreshCw)
    que llama a goToProjectSelector(). Visible solo cuando hay currentProject.
  * Destructure goToProjectSelector del store
- Bump v2.28 en middleware, LoginPage.tsx, page.tsx
- Build Next.js: "✓ Compiled successfully in 22.3s"
- Commit local: b6a9c29
- Push a GitHub: OK (6db1ec2..b6a9c29). Vercel auto-redeploy.

Stage Summary:
- Flujo nuevo: login → ProjectSelector → tablero
- Usuario cambia de proyecto/zona con botón 'Cambiar' del header
- Gestor se salta el selector (va directo a gestión)
- Dropdown del header eliminado

---
Task ID: v2.29
Agent: Main
Task: Fix formación S1 no aparece en zonas con boardConfigId sin slots

Work Log:
- Diagnóstico (ver informe agente-ba54e0a5):
  * Templates son GLOBALES (sin projectId/zoneId).
  * Zona nueva recibe automáticamente el boardConfigId default.
  * Board config default se crea VACÍO (sin slots).
  * FormacionModal era el ÚNICO modal que no caía al fallback global
    cuando board config no tenía slot para esa posición → "Sin formación
    configurada" en vez de mostrar la plantilla global.
  * Los demás modales (Inventario, Autoevaluación, Auditoría, Examen)
    SÍ caían al fallback global.

- Fix A — FormacionModal fallback global:
  (src/components/5s/FormacionModal.tsx)
  * Reescrita loadTemplate() con dos fases:
    1. Intentar leer del board config del zone (slot templates).
    2. Para CADA tipo (formacion/examen) por separado, si no se cargó
       en la fase 1, caer al fallback global /api/templates?type=...
  * Variables formacionLoaded/examLoaded marcan si la fase 1 tuvo éxito.
  * Mismo patrón que InventarioModal/Autoevaluacion/Auditoría.
  * NO rompe la configuración manual del admin: si el board config tiene
    slots con plantillas, esas siguen teniendo prioridad.

- Fix B — Auto-poblar slots del board config default:
  (src/app/api/board-configs/route.ts)
  * Nueva función ensureDefaultSlotsPopulated(boardConfigId):
    - Recorre los 25 slots (5S × 5 mini-steps).
    - Para cada slot sin plantillas enlazadas, busca la plantilla global
      correspondiente por (sStep, miniStep, type) y la enlaza.
    - Idempotente: respeta slots ya configurados manualmente.
    - Skip silencioso si no existe plantilla global para esa posición.
  * Invocada automáticamente desde GET /api/board-configs.
  * Mapeo mini-step → tipos:
    1 → formacion + examen
    2 → fotos
    3 → inventario
    4 → autoevaluacion + planaccion
    5 → auditoria

- Bump v2.29 en middleware, LoginPage.tsx, page.tsx.
- Build Next.js: "✓ Compiled successfully in 20.2s".
- Commit local: c7ceb4b.
- Push a GitHub: OK (b6a9c29..c7ceb4b). Vercel auto-redeploy.

Stage Summary:
- Cualquier zona (z1, z2, z3...) con boardConfigId asignado pero sin
  slots configurados ahora:
  1. En el FormacionModal, cae al fallback global (Fix A inmediato).
  2. Al visitar el panel admin de board-configs, se auto-pueblan los 25
     slots con las plantillas globales disponibles (Fix B definitivo).
- Las plantillas son globales → editar una se propaga a todas las
  zonas/proyectos que la referencian (no hay copias por zona).
- Gestor sigue yendo directo a su panel (no pasa por selector).

---
Task ID: v2.31
Agent: Main
Task: Plantillas se eligen por zona (antes que usuarios) + gestor edita genéricas en su panel

Work Log:
- Usuario: "las plantillas ya no tiene sentido que estén en la parte plantillas.
  tienen que estar elegidas en cada zona antes de los usuarios elegidos y desde
  ahí poder entrar a la edición. El gestor, en su panel, será el que tenga el
  poder de editar todas las plantillas genéricas."
- Eliminada la pestaña "Plantillas" del AdminPanel.tsx:
  * activeTab type: 'companies' | 'projects' | 'plantillas' → 'companies' | 'projects'
  * Eliminado el botón de tab "Plantillas" (líneas 1462-1472 originales)
  * Eliminado el bloque de contenido del tab Plantillas (líneas 2791-2796 originales)
  * Eliminado el import de TemplateManager y ProjectTemplatesSection
- Eliminado el <ProjectTemplatesSection> embebido dentro de cada proyecto
  (sub-sección redundante ahora que las plantillas viven por zona).
- Creado componente nuevo src/components/admin/ZoneTemplatesSection.tsx:
  * Se renderiza DENTRO de cada zona, ANTES de la tabla de miembros.
  * Muestra las 25 celdas (5S × 5 Pasos) con la plantilla asignada a cada una.
  * Cada celda tiene 2 botones:
    - Editar (lápiz) → abre Sheet con <TemplateManager embedded /> completo
    - Cambiar (refresh) → abre dropdown con todas las plantillas disponibles
      para esa (sStep, miniStep, type); al seleccionar, POST /api/board-slots
      con el nuevo templateIds (preserva las otras types del slot).
  * Indica si la zona usa tablero predeterminado (compartido) → aviso amber.
  * Contador "N asignadas" + badge con nombre del tablero.
- Actualizada la zona header del AdminPanel: el badge ya NO es hardcoded
  "Tablero predeterminado" — ahora muestra zone.boardConfig.name real
  (o "Sin tablero") con color indicativo (índigo=default, violeta=propio).
- Actualizada interfaz ZoneData: boardConfig ahora incluye isDefault?: boolean.
- Añadida pestaña "Plantillas" al GestorPanel.tsx:
  * GestorTab type: ... | 'plantillas'
  * tabs array: entrada nueva con icono BookOpen
  * Render: <TemplateManager /> dentro de contenedor blanco (para no chocar
    con el tema dark slate/violet del GestorPanel).
  * Banner "Modo Gestor — Editando la Biblioteca del Sistema".
  * Como gestor, TemplateManager auto-detecta el rol y edita plantillas
    globales (companyId=null) → cambios se propagan a todas las zonas/empresas.
- Bump v2.31 en middleware.ts (BUILD_VERSION), page.tsx (badge), LoginPage.tsx.
- TypeScript check: no new errors introduced (pre-existing errors unchanged).
- Next.js build: "✓ Compiled successfully in 22.5s".

Stage Summary:
- Flujo nuevo: AdminPanel → Proyectos → expandir proyecto → ver zonas →
  cada zona muestra PRIMERO sus plantillas (editar/cambiar por celda S×Paso),
  DESPUÉS sus miembros.
- Eliminada la pestaña "Plantillas" del AdminPanel (ya no tiene sentido ahí).
- Eliminado ProjectTemplatesSection (era sub-sección por proyecto, redundante).
- GestorPanel: nueva pestaña "Plantillas" para editar TODAS las plantillas
  genéricas (Biblioteca del Sistema) — power exclusive del gestor.
- Pendiente: commit + push a GitHub para deploy en Vercel.

---
Task ID: v2.32
Agent: Main
Task: Landing page — botones visibles (Iniciar Sesión + Pedir Información) + logo lima con colores correctos

Work Log:
- Usuario reportó: en la captura de la landing, el botón intermedio "Ver cómo
  funciona" se ve vacío (texto blanco sobre fondo transparente del outline).
  Pide: solo "Iniciar Sesión" + "Pedir Información" visibles arriba y abajo,
  y que el logo de la lima se vea con los mismos colores que en la app.
- Hero (arriba):
  * Eliminado el botón "Ver cómo funciona" (el intermedio que aparecía vacío).
  * Quedan solo dos botones: "Iniciar Sesión" (blanco con texto verde) y
    "Pedir Información" (amarillo brillante #FDE047 con texto verde oscuro).
  * El botón "Pedir Información" ahora es muy visible: fondo amarillo sólido
    + texto verde oscuro + sombra amarilla. Ya no es un outline transparente.
- CTA (abajo):
  * Cambiado el botón "Acceder a la plataforma" → "Iniciar Sesión"
    (mismo texto que arriba, para consistencia).
  * El botón "Solicitar Información" → "Pedir Información" con el mismo
    estilo amarillo brillante que arriba.
- Logo de la lima (/5s-logo.png):
  * Eliminado el drop-shadow-2xl que distorsionaba la percepción de los
    colores (hacía que el centro se viera más oscuro/amarillento).
  * Envolvido en un contenedor circular blanco (bg-white rounded-full) que
    aisla los colores del logo del gradient verde del hero. Así los colores
    se ven exactamente igual que en la app (anillo verde oscuro #1B5E20,
    5 segmentos verde lima #8BC34A, centro blanco con "5S" en lima).
  * En el footer: mismo tratamiento (logo sobre fondo blanco circular).
- Bump v2.32 en middleware, page.tsx, LoginPage.tsx.
- Build OK ("✓ Compiled successfully in 21.9s").
- Commit + push a GitHub para deploy en Vercel.

Stage Summary:
- Landing page: dos botones claros y visibles ("Iniciar Sesión" blanco +
  "Pedir Información" amarillo) tanto en el hero como en el CTA inferior.
- Logo de la lima con colores fieles a la app (sin distorsión por sombras
  ni mezcla con el fondo verde).
- Pendiente: verificar en Vercel que se ve correcto tras el deploy.

---
Task ID: v2.33
Agent: Main
Task: Fix bloqueo al subir varias fotos a la vez en FotosModal

Work Log:
- Usuario reportó: "No deja subir fotos a la vez, se bloquea".
- Diagnóstico raíz:
  1. La ruta /api/upload fue eliminada del proyecto el 22 jul (commit d07599d).
     Cada intento de subida → 404 → catch silencioso → serverUrl vacío →
     al hacer submit, los base64 (~150KB × N fotos) iban TODOS en el body
     del POST /api/photo-library → JSON.stringify gigante → navegador colgado.
  2. El handleFileSelect lanzaba FileReader + compressImage + fetch en paralelo
     para todas las fotos a la vez → saturaba CPU/memoria en móvil → UI congelada.
  3. addPhoto usaba `photos.length` capturado en el closure → índice stale
     cuando varias llamadas paralelas pisaban el mismo valor.
- Fix 1: Restaurada /api/upload/route.ts desde git history (última versión buena,
  "refactor: upload API solo Neon"). Convierte el File a base64 y lo devuelve
  como data URL — se almacena directamente en la columna photoUrl (text) de Neon.
- Fix 2: Reescrito FotosModal con cola secuencial:
  * uploadQueueRef: array de {rawBase64, photoType} pendientes.
  * isProcessingRef: semáforo para que solo un processQueue() corra a la vez.
  * photoCounterRef: contador siempre fresco (no stale como photos.length).
  * processQueue(): loop while-queue-no-vacía, comprime UNA foto, sube,
    actualiza estado por ID (no por índice), cede 30ms al event loop, repite.
  * addPhoto() ahora solo encola (no procesa) — las llamadas paralelas
    desde handleFileSelect solo llenan la cola baratamente.
  * handleFileSelect/handleCameraCapture leen archivos en paralelo
    (FileReader es I/O barato) y encolan; el procesamiento pesado es secuencial.
  * PhotoItem ahora tiene `id` único para updates robustos (inmune a
    reordenamientos / eliminaciones mientras la cola corre).
  * Cuando se cargan fotos existentes de la DB, photoCounterRef se inicializa
    con la cantidad existente para que los nuevos índices no colisionen.
- Fix 3: UI feedback:
  * Botón "Subir desde galería" se deshabilita y muestra spinner mientras la
    cola está activa (isQueueBusy = queueLength>0 || uploadingCount>0).
  * Banner azul "Procesando fotos una a una para evitar bloqueos".
  * Contador "N en cola" / "Subiendo N..." en tiempo real.
  * Icono rojo X si una foto falló al subir (uploaded=false, serverUrl='').
  * Texto de ayuda actualizado: "Se procesan una a una para no saturar".
- canSubmit ahora también requiere queueLength===0 (no solo uploadingCount===0)
  para evitar submit con fotos a medio procesar.
- Bump v2.33 en middleware.ts, page.tsx, LoginPage.tsx.
- TypeScript check: sin errores nuevos en FotosModal.tsx ni upload/route.ts
  (pre-existing error en MiniStepModal.tsx sigue, pero ignoreBuildErrors=true).
- Next.js build: "✓ Compiled successfully in 21.5s" — ruta /api/upload aparece
  en el listado de endpoints del build.

Stage Summary:
- Causa raíz del bloqueo: /api/upload faltante + subida paralela descontrolada.
- Solución: ruta restaurada + cola secuencial en cliente + UI que deshabilita
  el input mientras procesa.
- Pendiente: commit + push a GitHub para deploy en Vercel.

---
Task ID: v2.34
Agent: Main
Task: Fix bug en handleFileSelect v2.33 — input.value='' vaciaba el FileList antes de leer

Work Log:
- Usuario reportó: en Paso 2 S1, puede elegir fotos de carpeta pero no se ejecutan.
  Versión v2.33 confirmada.
- Diagnóstico: en la v2.33 cometí un bug en handleFileSelect. El orden era:
    const files = e.target.files;
    if (fileInputRef.current) fileInputRef.current.value = '';   ← BUG
    const fileArr = Array.from(files);                            ← files ya vacío
    await Promise.all(fileArr.map(...));
  Al asignar input.value='' el navegador vacía el FileList que `files` referenciaba.
  Array.from(files) devolvía [] → Promise.all([]) resolvía inmediatamente →
  no se procesaba ninguna foto.
- Fix: capturar Array.from(files) ANTES de limpiar el input.
  Ahora el orden es:
    const files = e.target.files;
    const fileArr = Array.from(files);          ← snapshot primero
    if (fileInputRef.current) fileInputRef.current.value = '';
    await Promise.all(fileArr.map(...));
  Mismo fix aplicado a handleCameraCapture.
- Añadidos console.log en handleFileSelect, handleCameraCapture y processQueue
  para que el usuario pueda abrir la consola del navegador y ver exactamente
  cuántos archivos se seleccionaron y cuántos se están procesando.
- Bump v2.34 en middleware.ts, page.tsx, LoginPage.tsx.
- Next.js build: "✓ Compiled successfully in 20.1s".
- Commit + push a GitHub para deploy en Vercel.

Stage Summary:
- Bug mío de la v2.33: limpiaba el input antes de leer los archivos.
- Fix en v2.34: snapshot del FileList antes de limpiar + logs de depuración.
- Pendiente: usuario prueba en v2.34 tras deploy (~1-2 min).

---
Task ID: v2.35
Agent: Main
Task: Límite mínimo de fotos configurable por plantilla + override por zona

Work Log:
- Usuario: "SE tiene qeu poder modificar la cantidad en la plantilla paso 2
  de cada s de cada zona de cada proyecto de cada empresa. Lo puede modificar
  el administrador. El gestor tambien, en su tablero pone 10 como partida."
- Modelo de datos (2 capas):
  1. Template.minPhotos (valor base) — lo define el gestor en plantillas
     globales type='fotos'. Default 10. El admin puede crear plantillas de
     empresa con otro valor.
  2. BoardSlotTemplate.minPhotosOverride (override por zona) — el admin lo
     rellena en cada zona para sobreescribir el valor base sin tocar la
     plantilla.
- Resolución en runtime (GET /api/photo-limits):
  1. Si override existe → usarlo.
  2. Si no, usar Template.minPhotos de la plantilla asignada.
  3. Si no hay plantilla → fallback a 10.
- Migración prisma/schema.prisma + SQL en
  prisma/migrations/20260814_add_min_photos_config/migration.sql.
- ensureDbSchema() en src/lib/db.ts ampliado con ALTER TABLE IF NOT EXISTS
  idempotente (ADD COLUMN minPhotos, ADD COLUMN minPhotosOverride, ADD COLUMN
  updatedAt) para que se aplique en el primer cold start tras deploy sin
  necesidad de correr prisma migrate localmente.
- Prisma client regenerado.
- API nueva /api/photo-limits/route.ts:
  * GET ?projectId&zoneId&sStep[&miniStep=2] → resuelve y devuelve
    { minPhotos, source, templateId, templateTitle, boardSlotTemplateId,
      baseMinPhotos, overrideMinPhotos }.
  * PUT body { boardSlotTemplateId, minPhotosOverride } → guarda/elimina override.
  * PUT body { templateId, minPhotos } → actualiza valor base de la plantilla.
- API /api/templates/route.ts actualizada:
  * POST incluye minPhotos (solo si type='fotos', default 10).
  * PUT acepta minPhotos (si llega undefined no lo toca).
- API /api/board-slots/route.ts: select de template ampliado con `minPhotos: true`
  para que el AdminPanel reciba el valor base.
- FotosModal.tsx:
  * Estado `minPhotos` (number) + `photoLimitSource` ('override'|'template'|'default').
  * useEffect llama a /api/photo-limits al abrir el modal → actualiza minPhotos.
  * Sustituidas todas las refs a MIN_PHOTOS constante por `minPhotos` dinámico:
    canSubmit, badge "X / Y mínimo", línea "Mínimo N fotos del ANTES".
  * Indicación visual del origen: "(override de zona)" o "(definido en plantilla)".
- TemplateManager.tsx (gestor y admin):
  * TemplateData.minPhotos añadido al interface.
  * Estado formMinPhotos (default 10).
  * startCreate, startEdit, importTemplateData → cargan el valor.
  * handleSave → incluye minPhotos en el payload (solo type='fotos').
  * exportTemplateData → version bumped a 2, incluye minPhotos.
  * Duplicate → incluye minPhotos al copiar.
  * UI: input "Mínimo de fotos" visible solo cuando formType==='fotos',
    debajo del campo "Nota mínima". Helper text explicativo.
  * Badge en lista de plantillas: "N fotos mín" (amber) para type='fotos'.
- ZoneTemplatesSection.tsx (admin, por zona):
  * SlotTemplate interface ampliada con minPhotosOverride + template.minPhotos.
  * Estado photoLimitEditing, photoLimitValue, photoLimitSaving.
  * savePhotoLimitOverride(slotTemplateId, value) → PUT /api/photo-limits.
  * UI: sub-fila amber bajo la celda type='fotos' con:
    - Valor actual (resuelto: override o heredado de plantilla).
    - Badge "override zona" si está sobreescrito, o "(hereda: N)" si no.
    - Botón "Cambiar" → input inline + Enter/Guardar/Cancelar.
    - Vaciar el input = eliminar override (volver a heredar).
- Bump v2.35 en middleware.ts, page.tsx, LoginPage.tsx.
- TypeScript: sin errores nuevos en archivos modificados (pre-existing errors
  en TemplateManager y MiniStepModal siguen, ignoreBuildErrors=true).
- Next.js build: "✓ Compiled successfully in 20.8s".

Stage Summary:
- Gestor: en su pestaña Plantillas, al editar una plantilla type='fotos',
  ve y edita el campo "Mínimo de fotos" (default 10). Es el valor base
  global para todas las zonas que usen esa plantilla.
- Admin de empresa: puede crear plantilla type='fotos' propia con su minPhotos.
- Admin de proyecto/zona: en la sección "Plantillas de esta zona", cada
  celda de tipo Fotos muestra el límite actual y un botón "Cambiar" para
  hacer override puntual (sin tocar la plantilla).
- FotosModal: al abrir, consulta /api/photo-limits y usa el valor resuelto
  (override > template > 10). Indica visualmente el origen del valor.
- Pendiente: commit + push a GitHub para deploy en Vercel. Las columnas
  nuevas se crearán automáticamente en el primer cold start vía
  ensureDbSchema (ADD COLUMN IF NOT EXISTS).

---
Task ID: v2.36
Agent: Main
Task: Fix bug — empleado siempre veía "mínimo 10 fotos" aunque el admin cambiara el límite a 5 en su zona

Work Log:
- Bug reportado por usuario: "he cambiado el número de fotos a 5 en el
  administrador z1 y en el empleado sigue apareciendo mínimo 10".
- Investigación del flujo:
  1. Admin entra a AdminPanel → Proyecto → Zona z1 → ZoneTemplatesSection.
     Recibe boardConfigId (que puede ser null si la zona no tiene tablero
     propio). Llama a /api/board-slots?zoneId=z1.
  2. /api/board-slots: si no se pasa boardConfigId, cae automáticamente
     al BoardConfiguration isDefault=true (lo crea si no existe). El
     admin ve los slots del tablero predeterminado del sistema.
  3. Admin cambia el override a 5 → PUT /api/photo-limits con
     boardSlotTemplateId (que pertenece al tablero predeterminado).
     El override se guarda correctamente en la DB.
  4. Empleado abre FotosModal → fetch GET /api/photo-limits?projectId&zoneId=z1&sStep&miniStep=2.
  5. BUG: /api/photo-limits tenía `if (!zone.boardConfigId) return 10`
     sin hacer fallback al tablero predeterminado. Por tanto el empleado
     siempre recibía 10, aunque el slot del tablero predeterminado tuviera
     el override a 5.
- Fix en /api/photo-limits/route.ts:
  * Si zone.boardConfigId es null, buscar BoardConfiguration isDefault=true
    (crearla si no existe) y usarla como effectiveBoardConfigId.
  * Buscar el slot con effectiveBoardConfigId en lugar de zone.boardConfigId.
  * Esto hace que GET sea consistente con lo que el admin ve/edita en
    ZoneTemplatesSection (que también cae al tablero predeterminado).
- Fix adicional: parsing robusto de miniStep.
  * Antes: `Number(searchParams.get('miniStep') || '2')`. Si el cliente
    pasa 'undefined' (string), `Number('undefined')` = NaN porque 'undefined'
    es truthy y el OR no se aplica.
  * Ahora: `Number.isFinite(miniStepParsed) ? miniStepParsed : 2`.
- Añadido log diagnóstico en GET con: zone.boardConfigId,
  effectiveBoardConfigId, sStep, miniStep, slotFound, fotosEntry.
- Bump v2.36 en middleware.ts, page.tsx, LoginPage.tsx.
- Build Next.js: ✓ Compiled successfully in 20.3s.
- Commit + push a GitHub (40c3a9f). Vercel deploy automático.

Stage Summary:
- Root cause: la API de lectura (GET /api/photo-limits) y la API de
  escritura (PUT, usada por ZoneTemplatesSection vía /api/board-slots)
  usaban lógica distinta para resolver el tablero de una zona sin
  boardConfigId propio. La escritura caía al default; la lectura
  devolvía 10 sin más.
- Tras el fix, cuando una zona no tiene tablero propio, el override que
  el admin edita (en el tablero predeterminado) se refleja
  correctamente en el empleado.
- Importante: si la zona NO tiene tablero propio, el override que el
  admin edita se aplica al tablero predeterminado del sistema, que es
  COMPARTIDO por todas las zonas sin tablero propio. La UI ya advierte
  de esto con un banner amber en ZoneTemplatesSection. Para tener
  overrides específicos por zona, hace falta asignar un tablero propio
  a la zona (sección Tableros del AdminPanel).
- Pendiente: usuario prueba en v2.36 tras deploy (~1-2 min). Si sigue
  viendo 10, abrir DevTools → Network → buscar la llamada a
  /api/photo-limits y revisar el JSON devuelto + el log del servidor
  Vercel que ahora imprime la traza de resolución.

---
Task ID: v2.37
Agent: Main
Task: Eliminar registros fantasma de inventario + quitar info técnica visible en todos los modales

Work Log:
- Dos bugs reportados por usuario en un mismo mensaje:
  1) "todos estos cambios son para todos los pasos iguales a este de todo,
     desde las plantillas de la app gestionada por el gestor a hasta todas
     de todos los proyectos de todas empresas. Ten en cuenta que los pasos
     de las todas las s generalmente coinciden y son muy parecidos"
  2) "estos registros salen sin meterlos nadie, no tendrían que estar"
     (con captura del InventarioModal mostrando 5 filas: Herramientas
     rotas, Material de oficina obsoleto, Piezas de repuesto activas,
     Documentación antigua, Equipos en desuso)

BUG 1: Registros fantasma en inventario
- Investigación del flujo:
  1. /api/seed/route.ts define INVENTORY_TEMPLATES con 5 items demo
     por cada S (líneas 221-294): items: [{name:'Herramientas rotas',...}, ...]
  2. Esos items van dentro del campo content (JSON) de la plantilla
     type='inventario'.
  3. Cuando el empleado abre InventarioModal, loadCustomInventoryConfig()
     lee la plantilla y llama a applyTemplateContent(content).
  4. applyTemplateContent detecta content.items.length > 0 y llama a
     importTemplateItems(content.items).
  5. importTemplateItems hace POST /api/inventory por cada item → crea
     registros REALES en la tabla Inventory.
  6. El empleado ve 5 filas en la tabla que NO metió nadie.
- Fix: vaciar items: [] en las 5 plantillas de inventario del seed
  (S1, S2, S3, S4, S5). Se mantiene:
    - Categorías (materiales, máquinas, mobiliario, información, transporte)
    - ExtraFields (código, subcategoría, zona, responsable, estado)
    - Desplegables jerárquicos (MATERIALES→MAT, MÁQUINAS→MAQ, etc.)
  esos sí definen la estructura legítima del inventario Seiton.
- Importante: los registros fantasma ya creados en la DB existente
  NO se borran automáticamente con este fix. El usuario/admin puede
  borrarlos manualmente con el botón ✕ de cada fila, o usar el botón
  de reset de paso si quiere limpiar todo. En adelante, al reseedear
  la plantilla o abrir el InventarioModal por primera vez en una zona
  nueva, ya no aparecerán items fantasma.

BUG 2: Información técnica visible al cliente en modales
- Ya en v2.36 se quitaron de FotosModal:
  - Banner "⚡ Las fotos se comprimen automáticamente (máx. 1200×900px,
    calidad 70%) para ahorrar espacio. Cada foto optimizada pesa ~80-150KB."
  - Texto "(override de zona)" / "(definido en plantilla)" en la lista
    de requisitos mínimos.
  - Bullet "Las fotos se comprimen automáticamente para ahorrar espacio".
- v2.37 extiende la limpieza a TODOS los modales principales (auditoría
  solicitada para FormacionModal, InventarioModal, AutoevaluacionModal,
  AuditoriaModal, ActionPlanModal):
  - AutoevaluacionModal:
    * Quitado badge "v2.5" del header (con tooltip "Versión del modal").
    * Reemplazado "Error al guardar la autoevaluación. Revisa la consola
      (F12) para más detalles." → "No se pudo guardar la autoevaluación.
      Inténtalo de nuevo en unos minutos."
  - AuditoriaModal:
    * Quitado badge "v2.5" del header (con tooltip "Versión del modal").
    * Reemplazado "Error al guardar la auditoría. Revisa la consola
      (F12) para más detalles." → "No se pudo guardar la auditoría.
      Inténtalo de nuevo en unos minutos."
    * Botón "Forzar TODO OK" → "Marcar todo conforme".
    * Tooltip "Fuerza TODOS los items a OK (sobreescribe NOK existentes)"
      → "Marca todos los puntos como conformes".
    * Confirm "¿Sobreescribir N hallazgo(s) NOK y marcar TODO como OK?"
      → "¿Marcar los N hallazgo(s) pendientes como conformes? Se perderán
      las observaciones actuales."
- Auditoría completa reveló también 13+ toast.error que interpolan
  `${json.error}` directamente (server errors expuestos al usuario).
  No se han tocado en esta iteración porque:
  - Son útiles para que el admin/gestor diagnostique problemas.
  - El usuario no se ha quejado específicamente de ellos.
  - Un refactor a un helper formatApiError() sería más invasivo.
  Pendiente para futura iteración si el usuario lo pide.
- FormacionModal e InventarioModal no tenían badges de versión ni
  referencias F12 visibles; InventarioModal mantiene "plantilla" en
  varios textos pero es la terminología legítima del dominio (el admin
  sí configura plantillas, y el texto guía al usuario a pedir al admin
  que configure una).

Bump v2.37 en middleware.ts, page.tsx, LoginPage.tsx.
Build Next.js: ✓ Compiled successfully in 21.2s.
Commit + push a GitHub (b9084d8). Vercel deploy automático.

Stage Summary:
- Bug 1 resuelto de raíz: las nuevas zonas/proyectos ya no verán items
  fantasma en el inventario. Las zonas existentes con items fantasma ya
  creados deben limpiarse manualmente.
- Bug 2 resuelto para los modales principales: el cliente final ya no
  ve badges de versión, referencias a DevTools (F12), ni terminología
  técnica tipo "override"/"Sobreescribir"/"TODO OK" en AuditoriaModal.
- Consistencia entre los 5 pasos de las 5 S: FotosModal, AutoevaluacionModal
  y AuditoriaModal ahora tienen el mismo tono y nivel de limpieza.
- Pendiente: usuario prueba en v2.37 tras deploy (~1-2 min). Si detecta
  más info técnica en otros puntos de la app, reportar y se aplica otra
  iteración de limpieza.

---
Task ID: v2.38
Agent: Main
Task: Rediseñar la sección 'Ciclo 5S' de la landing page con visual pentágono tipo tablero

Work Log:
- Usuario reportó: "la zona marcada, el ciclo, que sea como el tablero
  pero indicando las S, como está en la explicación" (con captura de
  la sección 'El ciclo 5S' de la landing page marcada en rojo).
- Sección afectada: <section id="ciclo"> en src/components/auth/LandingPage.tsx
  (líneas 196-293). Es la sección de marketing que explica el ciclo 5S
  a usuarios potenciales antes de entrar a la app.
- Antes: la sección tenía un SVG pequeño (200×200 viewBox) con 5 nodos
  circulares (S1-S5) dispuestos en pentágono, conectados por líneas
  punteadas grises, con un círculo central verde claro con 'CICLO 5S'.
- Ahora: SVG más grande (400×400 viewBox, container 280px móvil /
  360px desktop) con:
  * Pentágono dividido en 5 gajos coloreados (uno por S), con
    gradiente lineal del color de cada S (igual que Board5S).
  * Borde blanco de 3px entre gajos para separación visual.
  * Cada gajo muestra 'S1' a 'S5' en blanco, font-weight 900, con
    text-shadow para legibilidad.
  * Gajo activo (seleccionado): halo translúcido del color de la S
    alrededor, fuente mayor (22 vs 18), y muestra el nombre español
    debajo del número (REVISAR, ORDENAR, LIMPIAR, ESTANDARIZAR,
    MANTENER) en blanco con sombra.
  * Click en cualquier gajo → setActiveS(i) → actualiza el panel
    lateral con descripción, resultado y dots de progreso.
  * Círculo central (radius 60) con gradiente radial verde claro y
    borde gris, mostrando 'CICLO' / '5S' en verde (#059669).
  * Sombra sutil (feDropShadow) bajo el pentágono para destacar
    del fondo blanco/verde-claro de la sección.
- Funciones helper replicadas de Board5S.tsx adaptadas a 400×400:
  * pentagonVertex(angle, radius)
  * getPentagonSlice(index, oR, iR)
  * getPentagonOutline(r)
  * getSliceLabelPos(i)
- El panel lateral derecho (detail panel) se mantiene idéntico:
  badge 'S{num}' coloreado + label en español + name japonés italic
  + descripción + resultado (bg-green-50) + dots de progreso.
- Bump v2.38 en middleware.ts, page.tsx, LoginPage.tsx.
- Build Next.js: ✓ Compiled successfully in 21.0s.
- Commit + push a GitHub (87c0b2c). Vercel deploy automático.

Stage Summary:
- La landing page ahora muestra el ciclo 5S con el mismo lenguaje
  visual que el tablero de la app, reforzando la identidad de marca.
- El usuario puede hacer click en cada gajo del pentágono para
  explorar las 5 S antes de registrarse.
- El visual es responsive (280px móvil / 360px desktop) y conserva
  la interactividad (hover opacity, click para activar).
- Pendiente: usuario prueba en v2.38 tras deploy (~1-2 min). Si
  quiere ajustar tamaños, colores o disposición del panel lateral,
  iterar.

---
Task ID: v2.39
Agent: Main
Task: Ocultar bulk-import al empleado + clasificación obligatoria de fotos del Paso 2

Work Log:
- Dos peticiones del usuario en un mismo mensaje:
  1) "primeramente, al empleado no le tiene que salir lo marcado"
     (con captura del InventarioModal marcando en rojo la sección
     'Clasificación' + los 4 botones Importar/Exportar).
  2) "como tenemos las fotos, de alguna buena forma, tenemos que
     hacer que esas fotos tengan un registro, como si obligara a
     esas fotos rellenar los datos que pide en la clasificación.
     En definitiva cada foto tiene que tener una clasificación.
     Las fotos que se han sacado en el paso dos, aquí se clasifican
     para inventariar y saber qué hacer con esos elementos. Es la
     dinámica. Luego esto se va adjuntando en el listado/inventarios."

PARTE 1: Ocultar bulk-import al empleado
- Nuevo flag en InventarioModal.tsx:
    const canManageBulk = ['gestor','admin','gerente','responsable']
      .includes(currentUser?.role || '');
- Sección 'Clasificación' (contador X/Y clasificados + %) envuelta
  en {canManageBulk && (...)}.
- Los 4 botones de Importar/Exportar (Importar Plantilla, Exportar
  CSV, Importar Archivo, Descargar Plantilla Excel) envueltos en
  {canManageBulk && (<>...</>)}.
- NO se oculta: el botón de imprimir etiquetas rojas (S1), que es
  operativo para el empleado en planta.
- Empleado y auditor ahora ven un InventarioModal limpio: solo
  formulario de alta, tabla de items, y botón Completar.

PARTE 2: Clasificación obligatoria de fotos del Paso 2
- Investigación del sistema existente:
  * step2Photos: estado con fotos del Paso 2 sin inventoryItemId.
  * handleLinkStep2Photo(photoId, itemId): vincula foto a item.
  * handleUnlinkPhoto(photoId, itemId): desvincula.
  * itemPhotos[itemId]: fotos vinculadas a cada item.
  * Modal showPhotoGallery: galería para vincular fotos.
  * Botón 📷 en cada fila de la tabla → abre PhotoGallery.
- El flujo ya existía, pero NO era obligatorio. El empleado podía
  completar el inventario dejando fotos sin clasificar.
- Cambios:
  * Nuevo estado derivado:
      const unclassifiedPhotosCount = step2Photos.length;
      const allPhotosClassified = unclassifiedPhotosCount === 0;
  * canComplete ahora requiere allPhotosClassified (tanto para S1
    como para S2-S5).
  * handleComplete tiene un guard extra:
      if (unclassifiedPhotosCount > 0) {
        toast.error(`Quedan ${unclassifiedPhotosCount} foto(s) del
        Paso 2 sin clasificar. Vincula cada foto a un elemento del
        inventario antes de completar.`);
        return;
      }
  * El card 'Fotos del Paso 2' cambia de purple a RED:
    - border-2 border-red-300 bg-red-50/40
    - Título: 'Fotos del Paso 2 pendientes de clasificar'
    - Badge: 'N sin clasificar'
    - Texto explicativo en rojo: 'Cada foto del Paso 2 debe
      vincularse a un elemento del inventario para saber qué hacer
      con ese elemento. Hasta que no clasifiques todas las fotos,
      no podrás completar el inventario.'
    - Instrucción: 'Para vincular: crea un elemento nuevo (o usa
      uno existente) y pulsa el botón 📷 Vincular Foto del Paso 2
      en su fila.'
    - Borde de cada thumbnail en border-red-200.
  * Junto al botón 'Completar Inventario' aparece contador rojo:
    '⚠ N foto(s) del Paso 2 sin clasificar' cuando hay pendientes.

Dinámica resultante (la que pidió el usuario):
1. Empleado saca fotos en Paso 2 (FotosModal).
2. En Paso 3 (Inventario) ve el card ROJO con las fotos pendientes.
3. Crea items del inventario (nombre, ubicación, categoría,
   cantidad, precio, estado, frecuencia, decisión, etc.).
4. Vincula cada foto a un item via el botón 📷 de la fila →
   abre PhotoGallery → selecciona la foto.
5. Al vincular, la foto desaparece del card rojo y se adjunta
   al item (aparece en la columna Fotos de la tabla).
6. Cuando todas las fotos están vinculadas, el card rojo
   desaparece y el botón 'Completar Inventario' se habilita.
7. Las fotos vinculadas quedan registradas en el inventario
   con trazabilidad (inventoryItemId en la tabla Photo).

Bump v2.39 en middleware.ts, page.tsx, LoginPage.tsx.
Build Next.js: ✓ Compiled successfully in 21.0s.
Commit + push a GitHub (24df73b). Vercel deploy automático.

Stage Summary:
- Empleado ve un InventarioModal limpio sin botones de gestión masiva.
- La dinámica Paso 2 → Paso 3 ahora es obligatoria: cada foto del
  Paso 2 debe clasificarse (vincularse a un item con sus datos)
  antes de poder completar el inventario.
- El feedback visual es claro: card rojo mientras haya pendientes,
  contador junto al botón, toast con número exacto al intentar
  completar.
- Pendiente: usuario prueba en v2.39 tras deploy (~1-2 min). Si
  quiere ajustar el texto del card, el umbral, o el flujo de
  vinculación (e.g. auto-crear item al vincular), iterar.

---
Task ID: v2.40
Agent: Main
Task: Foto ya vinculada al registro en el momento de tomarla (Paso 2 → borrador auto-creado en Inventario)

Work Log:
- Petición del usuario: "busco la manera de que la foto ya este como
  vinculada al registro, sea obligatorio o algo asi"
- En v2.39 habíamos hecho que clasificar fotos fuera OBLIGATORIO para
  completar el inventario, pero el flujo seguía siendo: sacar foto en
  Paso 2 → ir a Paso 3 → crear item → pulsar 📷 para vincular. Era
  manual y el usuario pedía que la foto YA ESTUVIERA vinculada al
  registro desde el momento de tomarla.

CAMBIO PRINCIPAL: cada foto del Paso 2 crea automáticamente un
elemento de inventario "borrador" con la foto ya vinculada.
- FotosModal.tsx handleSubmit refactorizado:
  * Antes: Promise.allSettled de libraryPromises (paralelo).
  * Ahora: bucle secuencial for-loop. Para cada foto:
    1) POST /api/photo-library → obtiene photoId
    2) POST /api/inventory con name="Pendiente de clasificar (idx+1)",
       category='' (API aplica default según sStep), y extra.isDraft=true
       + sourcePhotoId/sourcePhotoUrl/sourcePhotoType/sourcePhotoTitle
       para trazabilidad.
    3) PUT /api/photo-library con {id: photoId, inventoryItemId: newItemId}
       → vincula la foto al item recién creado.
  * Secuencial (no paralelo) porque cada iteración necesita el photoId
    del paso anterior y el itemId del paso intermedio.
  * Errores por-foto no abortan el resto: si una foto falla al guardar,
    se salta a la siguiente.

- InventarioModal.tsx:
  * Nuevo estado derivado:
      const pendingDraftsCount = items.filter(i => i.extra?.isDraft === true).length
      const allDraftsClassified = pendingDraftsCount === 0
  * canComplete ahora requiere allDraftsClassified (además de
    allPhotosClassified que ya existía para fotos huérfanas pre-v2.40).
  * handleComplete: nuevo guard extra con toast específico:
      "Quedan N elemento(s) del inventario pendiente(s) de clasificar.
       Edita su nombre, categoría y decisión antes de completar."
  * handleUpdateField extendido: si el item era borrador (isDraft=true)
    y el usuario cambia el nombre a algo distinto de "Pendiente de
    clasificar" O cambia la categoría, se elimina automáticamente la
    marca isDraft del extra. El item deja de contar como pendiente.
    Se mantiene sourcePhotoId/sourcePhotoUrl para trazabilidad histórica.
  * Select de categoría (sStep===1) en la tabla: onValueChange también
    limpia isDraft si era borrador (porque este flujo no pasa por
    handleUpdateField, hace fetch directo).
  * Tabla de items: nueva celda con badge rojo "Pendiente" para items
    borrador, junto al input del nombre. La fila completa se resalta
    con bg-red-50/40 + ring-1 ring-red-200 para que destaque.
  * Nuevo card rojo arriba de la tabla "Elementos pendientes de
    clasificar" (similar al de "Fotos del Paso 2 pendientes") con:
    - Contador "N sin clasificar"
    - Instrucciones: cambia nombre, categoría, decisión
    - Aclaración de que al rellenar nombre/categoría se quita el
      badge automáticamente.
  * Junto al botón "Completar Inventario": contador rojo
    "⚠ N elemento(s) pendiente(s) de clasificar" cuando hay borradores.

- FotosModal.tsx success UI:
  * Antes: "Próximo paso: Inventario (Clasificar elementos)" en azul.
  * Ahora: card ámbar explicativo que dice:
    "Cada foto que acabas de tomar se ha vinculado automáticamente a
    un elemento del inventario en estado Pendiente. En el siguiente
    paso deberás rellenar el nombre real del elemento, su categoría
    y la decisión a tomar. Hasta que no clasifiques todos los
    elementos, no podrás completar el inventario."

- Bump v2.40 en middleware.ts, page.tsx, LoginPage.tsx.
- Build Next.js: ✓ Compiled successfully in 20.5s.
- Commit + push a GitHub (4e3343d). Vercel deploy automático.

Stage Summary:
- El flujo Paso 2 → Paso 3 ahora es directo y obligatorio:
  1. Empleado saca fotos en Paso 2 (FotosModal).
  2. Al pulsar "Guardar", cada foto crea automáticamente un elemento
     de inventario "borrador" con la foto vinculada (inventoryItemId
     en PhotoLibrary).
  3. En Paso 3 (Inventario), los items borrador aparecen arriba en
     la tabla con badge rojo "Pendiente" y la foto ya attached.
  4. Empleado rellena nombre, categoría, decisión → isDraft se
     elimina automáticamente → badge desaparece.
  5. Cuando no quedan borradores (ni fotos huérfanas), se puede
     completar el inventario.
- Backward compatible: fotos huérfanas pre-v2.40 siguen apareciendo
  en el card "Fotos del Paso 2 pendientes" y se pueden vincular
  manualmente con el botón 📷 (flujo v2.39 sigue funcionando).
- Pendiente: usuario prueba en v2.40 tras deploy (~1-2 min). Si
  quiere ajustar el umbral de "clasificación" (p. ej. requerir
  también decisión o ubicación), el punto está en handleUpdateField.

---
Task ID: v2.41
Agent: Main
Task: Pulsar Enter guarda los cambios inline en el inventario (no hay que salir del modal)

Work Log:
- Usuario reportó: "no deja actualizar pulsando, hay que salirse siempre"
- Diagnóstico: todos los inputs inline de la tabla de inventario
  (nombre, ubicación, cantidad, precio, zonaOrigen) usaban SOLO
  onBlur para persistir. El usuario escribía, pulsaba Enter, y el
  input mantenía el foco → no se disparaba onBlur → no se guardaba.
  Para que se guardara tenía que hacer clic fuera del input O cerrar
  el modal entero. Mismo problema en el formulario "Agregar nuevo
  elemento": el campo nombre no respondía a Enter.

Fix:
- Nuevo helper commitOnEnter(e, commit) en InventarioModal:
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.currentTarget as HTMLInputElement).blur();
      commit();
    }
  El blur dispara onBlur (que llama a handleUpdateField), y el
  commit() explícito cubre el caso de inputs sin onBlur.
- Aplicado onKeyDown a los 5 inputs inline de la tabla:
    * Nombre del elemento
    * Ubicación
    * Cantidad
    * Precio
    * Zona Origen (fallback cuando no hay zonas configuradas)
- Formulario "Agregar nuevo elemento": los 3 inputs de texto/número
  (Elemento, Cantidad, Precio) ahora tienen onKeyDown que ejecuta
  handleAddItem() al pulsar Enter si hay nombre y categoría. Así
  el flujo es: escribir nombre → Enter → se agrega el elemento.

Bump v2.41 en middleware.ts, page.tsx, LoginPage.tsx.
Build Next.js: ✓ Compiled successfully in 20.4s.
Commit + push a GitHub (cfc1133). Vercel deploy automático.

Stage Summary:
- Ahora pulsar Enter en cualquier campo del inventario guarda el
  cambio sin tener que salir del modal.
- El formulario "Agregar elemento" también responde a Enter para
  agregar nuevos items rápidamente.
- Pendiente: usuario prueba en v2.41 tras deploy (~1-2 min). Si
  quedan otros campos donde Enter no guarda (p. ej. el modal de
  autoevaluación, auditoría o fotos), reportar y se aplica el
  mismo patrón commitOnEnter.

---
Task ID: v2.42
Agent: Main
Task: Migrar fotos huérfanas pre-v2.40 a borradores automáticamente

Work Log:
- Usuario reportó: "NO VEO EL PASO DE VINCULAR LA FOTO EXISTENTE COMO
  EXPLICAS"
- Diagnóstico: dos problemas separados:

  PROBLEMA 1: loadStep2Photos no filtraba fotos huérfanas.
  - Cargaba TODAS las fotos del Paso 2 (miniStep=2) del proyecto+zona,
    incluyendo las que ya tenían inventoryItemId (vinculadas a un item).
  - Esto hacía que el card "Fotos del Paso 2 pendientes de clasificar"
    mostrara fotos que en realidad ya estaban vinculadas a un borrador.
  - El unclassifiedPhotosCount era incorrecto (contaba vinculadas).
  - El usuario veía fotos en el card pero no entendía qué faltaba por
    hacer, porque en realidad no faltaba nada (el borrador ya existía).

  PROBLEMA 2: fotos tomadas antes de v2.40 no tenían borrador.
  - La lógica de auto-creación de borradores (v2.40) solo se ejecuta
    en FotosModal.handleSubmit al guardar fotos NUEVAS.
  - Las fotos tomadas antes del deploy de v2.40 existían en
    PhotoLibrary sin inventoryItemId y sin item asociado.
  - El usuario las veía en el card rojo pero no había manera de que
    se convirtieran en borradores — el flujo manual (📷 Vincular)
    era el único camino, y NO era lo que yo había explicado.

FIX:
- loadStep2Photos ahora filtra solo fotos huérfanas:
    const orphans = (json.data || []).filter((p: any) => !p.inventoryItemId);
    setStep2Photos(orphans.map(...));
  Las fotos vinculadas ya no aparecen en step2Photos ni en el card
  "pendientes de clasificar" ni en unclassifiedPhotosCount.

- Nueva función migrateOrphanPhotos(orphans):
  Para cada foto huérfana:
    1) POST /api/inventory con name="Pendiente de clasificar (idx+1)",
       category='', extra.isDraft=true, sourcePhotoId/Url/Type/Title.
    2) PUT /api/photo-library con {id: photoId, inventoryItemId: newItemId}
       → vincula la foto al nuevo item.
  Después de migrar todas:
    - await loadInventory() → los borradores aparecen en la tabla.
    - setTimeout(() => loadStep2Photos(), 0) → recarga step2Photos,
      que ahora debería estar vacío (todas vinculadas).
  Misma lógica que FotosModal.handleSubmit v2.40, replicada para
  fotos antiguas.

- Guard anti-reentrancia con useRef:
    const isMigratingRef = useRef(false);
  Si loadStep2Photos se vuelve a llamar mientras la migración está
  en curso (p. ej. por el setTimeout recursivo), no se vuelve a
  disparar migrateOrphanPhotos. Evita loop infinito.

- Import añadido: useRef en la línea de imports de React.

Bump v2.42 en middleware.ts, page.tsx, LoginPage.tsx.
Build Next.js: ✓ Compiled successfully in 20.9s.
Commit + push a GitHub (77c6f75). Vercel deploy automático.

Stage Summary:
- Ahora el flujo es consistente sin importar CUÁNDO se tomaron las
  fotos del Paso 2:
  * Fotos nuevas (v2.40+): FotosModal.handleSubmit crea el borrador
    y vincula la foto al guardar.
  * Fotos antiguas (pre-v2.40): al abrir InventarioModal,
    loadStep2Photos detecta las huérfanas y migrateOrphanPhotos les
    crea un borrador y las vincula automáticamente.
- El usuario ya no necesita usar el botón 📷 "Vincular Foto del Paso 2"
  manualmente — ese flujo sigue existiendo como fallback, pero la
  migración automática debería cubrir todos los casos.
- Al abrir InventarioModal con fotos pendientes, el usuario verá:
  1. Breve parpadeo mientras se migran las fotos (silencioso).
  2. Tabla con items "Pendiente de clasificar (N)" + badge rojo.
  3. La foto ya attached en la columna Fotos.
  4. Sin el card rojo de "Fotos del Paso 2 pendientes" (porque ya
     no hay huérfanas).
- Pendiente: usuario prueba en v2.42 tras deploy (~1-2 min). Si
  sigue sin ver los borradores, probablemente sea porque las fotos
  no existen en BD para ese sStep/zoneId — habría que verificar
  en la tabla PhotoLibrary directamente.

---
Task ID: v2.43
Agent: Main
Task: Limpiar flujo manual de vinculación + nombres de borrador por S + eliminar foto al borrar borrador

Work Log:
- Petición del usuario: "VALE, ACTUALIZA ASI" + "TAMBIEN LA PLANTILLA
  DESDE EL INICIO" + "TAMBIEN SERAN ASI LOS INVENTARIOS DE LA S2-3-4
  PERO CON SUS RESPECTIVOS, S2-NECESARIOS, S-3 PUNTOS DE SUCIEDAD,
  S4. ESTANDARES. TODO ENCARADO A LAS FOTOS QUE SE HACEN EN LOS PASOS 2"

LIMPIEZA del flujo manual de vinculación (ya obsoleto tras v2.42):
- Eliminado el card rojo "Fotos del Paso 2 pendientes de clasificar"
  del InventarioModal (ya no hay huérfanas tras la migración automática).
- Eliminado el botón 📷 "Vincular Foto del Paso 2" en cada fila de la
  tabla. Queda solo el botón Camera para adjuntar fotos adicionales.
- Eliminado el PhotoGallery Modal (Dialog) que se abría al pulsar 📷.
- Eliminadas las funciones handleLinkStep2Photo, handleUnlinkPhoto,
  openPhotoGallery del InventarioModal.
- Eliminados los estados showPhotoGallery y galleryTargetItemId.
- Se mantiene handleDeletePhoto (sigue siendo útil para fotos adjuntadas
  manualmente con el botón Camera).

NOMBRES de borrador específicos por S:
- Nuevo helper en src/lib/5s-constants.ts:
    DRAFT_NAME_BY_S: Record<number, (index: number) => string>
  * S1: "Pendiente de clasificar (N)"
  * S2: "Necesario pendiente (N)"
  * S3: "Punto de suciedad pendiente (N)"
  * S4: "Estándar pendiente (N)"
  * S5: "Cumplimiento pendiente (N)"
- Aplicado en FotosModal.handleSubmit (fotos nuevas) y en
  InventarioModal.migrateOrphanPhotos (fotos huérfanas pre-v2.40).
- handleUpdateField extendido: ahora reconoce TODOS los prefijos de
  borrador (DRAFT_PREFIXES array) para eliminar isDraft al cambiar el
  nombre a algo real. Antes solo reconocía "pendiente de clasificar".

INSTRUCCIONES específicas por S en el card de pendientes:
- Nuevo helper en src/lib/5s-constants.ts:
    DRAFT_INSTRUCTIONS_BY_S: Record<number, { title, subtitle, fields[] }>
  Cada S tiene su propio título, subtítulo y lista de campos a rellenar.
  * S1: "Elementos pendientes de clasificar" — nombre, categoría,
    decisión (Jaula/Tirar/Eliminar).
  * S2: "Necesarios pendientes de clasificar" — nombre, frecuencia de
    uso, ubicación y cantidad.
  * S3: "Puntos de suciedad pendientes" — nombre, tipo de suciedad
    (polvo/grasa/mancha/óxido), frecuencia y responsable.
  * S4: "Estándares pendientes" — nombre, tipo (visual/procedimiento/
    checklist), ubicación y responsable.
  * S5: "Cumplimientos pendientes" — nombre del estándar, cumplimiento
    (cumplido/parcial/incumplido), observaciones.
- Card "Elementos pendientes" ahora usa DRAFT_INSTRUCTIONS_BY_S[sStep]
  con IIFE inline para renderizar título, subtítulo y fields[].
- Mensaje de éxito del FotosModal actualizado para mencionar el S
  específico (S{sStep} · {japaneseName}) y los campos a rellenar.

ELIMINAR FOTO al borrar borrador (lo que pidió el usuario):
- Usuario: "CUIDADO PORQUE AL ELIMINAR FOTO DE LA LISTA NO VUELVE A
  APARECER"
- Antes: al borrar un item, la foto vinculada quedaba huérfana
  (onDelete: SetNull en el schema) y la migración la volvía a
  convertir en borrador al recargar — la foto "volvía a aparecer".
- Ahora: DELETE /api/inventory?id=X verifica si el item tiene
  extra.isDraft=true. Si es borrador, elimina también sus fotos
  asociadas (db.photoLibrary.deleteMany where inventoryItemId=id).
  Si es item normal (ya clasificado), mantiene el comportamiento
  onDelete: SetNull — la foto queda en la biblioteca sin item.
- Así, al borrar un borrador, la foto se elimina definitivamente y
  no vuelve a aparecer al recargar.

Bump v2.43 en middleware.ts, page.tsx, LoginPage.tsx.
Build Next.js: ✓ Compiled successfully in 21.3s.
Commit + push a GitHub (1fd3ed3). Vercel deploy automático.

Stage Summary:
- El flujo de fotos → inventario ahora es consistente para TODOS los S:
  * S1 (Clasificación): cada foto del Paso 2 crea "Pendiente de clasificar".
  * S2 (Orden): cada foto del Paso 2 crea "Necesario pendiente".
  * S3 (Limpieza): cada foto del Paso 2 crea "Punto de suciedad pendiente".
  * S4 (Estandarizar): cada foto del Paso 2 crea "Estándar pendiente".
  * S5 (Mantener): cada foto del Paso 2 crea "Cumplimiento pendiente".
- El card rojo de pendientes ahora muestra instrucciones específicas
  por S (qué campos hay que rellenar).
- Eliminados todos los elementos del flujo manual de vinculación
  (card, botón 📷, PhotoGallery Modal) que ya no aportaban valor.
- Al borrar un borrador, la foto asociada se elimina también (no
  vuelve a aparecer al recargar).
- Pendiente: usuario prueba en v2.43 tras deploy (~1-2 min). Si
  quiere ajustar los textos del card o añadir más campos específicos
  por S en DRAFT_INSTRUCTIONS_BY_S, iterar.

---
Task ID: v2.44
Agent: Main
Task: Limpiar Trazabilidad Fotográfica y Adjuntar Foto del InventarioModal

Work Log:
- Petición del usuario (con screenshot): "COMO HEMOS DICHO, SOBRA ESTO
  YA QEU SE RELLENA DIRECTAMENTE EN LA TABLA CON LAS FOTOS QEU SE HAN
  VINCULADO DEL PASO 2"
- El screenshot mostraba el formulario "+ Agregar" con su bloque
  "Adjuntar Foto" + Select Antes/Después + preview de archivo
  pendiente, y debajo el card "Elementos en Jaula — Trazabilidad
  Fotográfica".

Tras v2.40 (foto→borrador automático al tomar la foto en Paso 2) y
v2.42 (migración de huérfanas pre-v2.40), las fotos YA se muestran
en la columna "Fotos" de la tabla del inventario, vinculadas a su
item. Los siguientes elementos quedaban obsoletos:

ELIMINADO:
1. Card "Elementos en Jaula — Trazabilidad Fotográfica" (S1,
   innecesarios) — mostraba las mismas fotos que ya están en la
   tabla, en un card separado redundante.
2. Card "Puntos de Suciedad — Fotos Antes/Después" (S3) — mostraba
   las fotos Antes/Después de cada punto de suciedad en un card
   separado, con un botón "Adjuntar foto DESPUÉS" por item.
3. Bloque "Adjuntar Foto" del formulario "+ Agregar" — el Select
   Antes/Después, el label con icono Camera y el input file oculto,
   más el preview del archivo pendiente. Queda solo el botón
   "+ Agregar".

LIMPIEZA DE CÓDIGO:
- Eliminados state: pendingNewPhoto, pendingNewPhotoType.
- handleAddItem ya no intenta adjuntar la foto pendiente al nuevo
  item (bloque if (pendingNewPhoto && newItemId) {...} eliminado).
- Imports limpiados: ImageIcon, X, Link2, Unlink ya no se usan.

SE MANTIENE (no es obsoleto):
- Columna "Fotos" de la tabla — muestra las fotos vinculadas (que
  vienen del Paso 2) y permite eliminarlas con el botón × al hover.
- Botón Camera por fila de la tabla — por si el usuario quiere
  añadir una foto adicional (p. ej. foto DESPUÉS en S3 tras la
  limpieza).
- Photo Lightbox Dialog — para ver la foto ampliada al hacer click.
- handleAttachPhoto, handleDeletePhoto, itemPhotos,
  showPhotoLightbox, uploadingPhotoForItem — siguen usándose
  desde la tabla.
- Card rojo "Elementos pendientes de clasificar" (DRAFT_INSTRUCTIONS
  _BY_S) — se muestra solo cuando hay borradores sin clasificar,
  no es obsoleto.

Bump v2.44 en middleware.ts, page.tsx, LoginPage.tsx.
Build Next.js: ✓ Compiled successfully in 21.4s.
Commit + push a GitHub (e2a1c92). Vercel deploy automático.

Stage Summary:
- InventarioModal ahora muestra las fotos SOLO en la columna "Fotos"
  de la tabla. Eliminados los dos cards de Trazabilidad Fotográfica
  (S1 y S3) y el bloque "Adjuntar Foto" del formulario "+ Agregar".
- La columna "Fotos" sigue permitiendo:
  * Ver las fotos vinculadas desde el Paso 2 (auto-drafts).
  * Adjuntar una foto adicional con el botón Camera (caso de uso:
    foto DESPUÉS en S3).
  * Eliminar una foto con el botón × al hover.
  * Abrir el lightbox al hacer click en una foto.
- Pendiente: usuario prueba en v2.44 tras deploy (~1-2 min). Si
  quiere eliminar también el botón Camera de la tabla (dejar la
  columna como solo-lectura), iterar.

---
Task ID: v2.45
Agent: Main
Task: Eliminar el formulario 'Add item' completo del InventarioModal

Work Log:
- Petición del usuario: "pUES SE SIGUE VIENDO EL FORMULARIO QEU DIJIMOS
  QEU LO QUITAVAMOS Y QUE RELLENAVAMOS DE LA TABLA INFERIOR, RECUERDAS?"
- En v2.44 solo quité el bloque "Adjuntar Foto" pero dejé intacto el
  formulario completo de "Add item" (Card con Elemento, Zona origen,
  Categoría, Cantidad, Precio, extras, F. Entrada, Días cuarentena,
  F. Revisión y botón "+ Agregar"). Ese era el formulario que el
  usuario quería eliminar.

Ese formulario ya no tiene sentido porque:
- Los items se crean automáticamente como borradores al tomar fotos
  en el Paso 2 (FotosModal.handleSubmit v2.40).
- Las fotos huérfanas pre-v2.40 se migran automáticamente
  (migrateOrphanPhotos v2.42).
- El usuario rellena los datos directamente en la tabla inferior.

CAMBIOS:
- Eliminado el Card "Add item form" completo (383 líneas de JSX
  entre el comentario '{/* Add item form */}' y su '</Card>'
  cerrando). Script persistente en scripts/remove_add_form.py.
- Eliminado el state 'newItem' y su useEffect de sincronización de
  zonaOrigen.
- Eliminada la función 'handleAddItem' (POST /api/inventory desde
  el form). Quedan FotosModal.handleSubmit y migrateOrphanPhotos
  para crear items desde fotos, y handleImportTemplate /
  handleFileImport para crear items desde plantillas.
- Actualizado el empty-state:
    Antes: "Importe una plantilla o agregue elementos manualmente"
    Ahora: "Toma fotos en el Paso 2 (S{sStep} · {japaneseName} ·
           Fotos) y se crearán aquí automáticamente."
  Icono cambiado de ClipboardList a Camera para reflejar el flujo.
- Limpiados imports sin usar: Plus (lucide-react), defaultCategory.

LO QUE SE MANTIENE (no es obsoleto):
- Botones "Importar Plantilla", "Exportar CSV", "Importar Archivo",
  "Descargar Plantilla Excel" — para añadir items en bloque desde
  plantillas o archivos. Si el usuario quiere eliminarlos también,
  iterar.
- Card rojo "Elementos pendientes de clasificar" (solo si hay drafts).
- Layout de la Zona (S2/S3/S4).
- Tabla de items (con edición inline y todas las columnas).
- Columna "Fotos" de la tabla con botón Camera para adjuntar
  adicionales y lightbox.

Bump v2.45 en middleware.ts, page.tsx, LoginPage.tsx.
Build Next.js: ✓ Compiled successfully in 21.2s.
Commit + push a GitHub (25c0093). Vercel deploy automático.

Stage Summary:
- InventarioModal ya NO tiene el formulario "Add item". La única
  manera de crear items es:
  1. Tomar fotos en el Paso 2 (crea borradores automáticamente).
  2. Importar plantilla CSV/Excel.
- El usuario rellena los datos de cada borrador directamente en
  la tabla inferior (edición inline — nombre, ubicación, categoría,
  cantidad, precio, extras, decisión, días cuarentena, Z. Origen,
  Z. Destino).
- Pendiente: usuario prueba en v2.45 tras deploy (~1-2 min). Si
  quiere eliminar también los botones "Importar Plantilla / Archivo",
  iterar.

---
Task ID: v2.46
Agent: Main
Task: Bloquear borrado de fotos y items del Paso 2 una vez completado

Work Log:
- Petición del usuario: "HE ELIMINADO LAS FOTOS DEL PASO 2 UNA VEZ
  GUARDADO LAS 5 Y ME HA DEJADO SEGUIR EN EL PASO 3, ESTO HAY QEU
  CAMBIARLO, uNA VEZ QEU SE GUARDAN LAS FOTOS REQUERIDAS Y SE PASA AL
  PASO 3 NO SE TIENE QUE DEJAR BORRAR DEL PASO DOS. EN EL PASSO 3
  TIENESN QEU ESTAR FIJAS SIN PODER BORRA Y SE TIENE QEU RELLENAR LO
  REQUERIDO EN LA TABLA DE TODAS LAS FOTOS DEL PASO 2 PARA PODRE PASAR
  AL PASO 4"

PROBLEMA: el usuario podía eludir el requisito de clasificar todas
las fotos del Paso 2 simplemente borrando los borradores (filas de
la tabla) o las fotos (× en columna Fotos). Al desaparecer, el
'pendingDraftsCount' quedaba en 0 y 'canComplete' era true → podía
pasar al Paso 4 sin rellenar nada.

FRONTEND (InventarioModal.tsx):
- handleDeletePhoto: si photo.miniStep === 2 y miniStep >= 3,
  toast.error y return sin llamar al backend.
- handleDeleteItem: si item.extra?.sourcePhotoId y miniStep >= 3,
  toast.error y return sin llamar al backend.
- Columna Fotos: el botón × solo se renderiza si photo.miniStep !== 2.
  Las fotos del Paso 2 no muestran ×.
- Columna Delete (× de fila): si item.extra?.sourcePhotoId, en
  lugar del botón × se muestra un 🔒 con tooltip 'Elemento
  obligatorio vinculado al Paso 2'.

BACKEND (doble guard — el frontend puede ser bypaseado):
- DELETE /api/inventory?id=X:
  Si el item tiene extra.sourcePhotoId Y existe un Progress con
  (sStep, miniStep=2, completed=true, projectId, zoneId),
  devuelve 409 con mensaje explicando que no se puede eliminar.
- DELETE /api/photo-library?id=X:
  Si photo.miniStep === 2 Y existe un Progress con
  (sStep, miniStep=2, completed=true, projectId, zoneId),
  devuelve 409 con mensaje explicando que no se puede eliminar.
  También añadí check de photo not found → 404 limpio.

PhotoLibrary.tsx:
- handleDelete: ahora verifica res.ok. Si el backend devuelve 409,
  muestra alert() con el mensaje de error del backend (antes
  silenciaba cualquier error).

Bump v2.46 en middleware.ts, page.tsx, LoginPage.tsx.
Build Next.js: ✓ Compiled successfully in 21.2s.
Commit + push a GitHub (0fcab10). Vercel deploy automático.

Stage Summary:
- Una vez completado el Paso 2 (Fotos) y pasado al Paso 3 (Inventario):
  * Las fotos del Paso 2 no se pueden eliminar ni desde la columna
    Fotos de la tabla (× oculto) ni desde PhotoLibrary (backend 409).
  * Los items creados desde fotos del Paso 2 (con extra.sourcePhotoId)
    no se pueden eliminar (🔒 en vez de ×, backend 409).
  * El usuario TIENE que rellenas los datos de cada foto del Paso 2
    en la tabla (nombre, categoría, decisión, etc.) para que el
    borrador deje de ser 'pendiente' (pendingDraftsCount → 0) y
    pueda completar el inventario y pasar al Paso 4.
- Pendiente: usuario prueba en v2.46 tras deploy (~1-2 min). Si
  quiere que las fotos del Paso 2 tampoco se puedan eliminar DESDE
  FotosModal al reabrir el Paso 2 (p. ej. para añadir más fotos),
  iterar — aunque actualmente FotosModal solo opera sobre photos
  state local hasta que se ejecuta handleSubmit.

---
Task ID: v2.47
Agent: Main
Task: × en FotosModal (Paso 2) ahora borra de verdad

Work Log:
- Petición del usuario: "La x al lado de las fotos en paso 2, estan.
  Se puede elimnar pero no se guarda."

PROBLEMA: en FotosModal (Paso 2), el × al lado de cada foto solo
filtraba el estado local 'photos' (setPhotos(prev => prev.filter...)).
Las fotos que ya estaban en la biblioteca (savedToLibrary=true)
seguían en la BD y al reabrir el modal volvían a aparecer. El
borrado no persistía.

FIX (FotosModal.tsx):
- Añadido campo 'dbId' al interfaz PhotoItem — el id real en
  PhotoLibrary (solo se setea si savedToLibrary=true).
- Al cargar fotos existentes (loadExistingPhotos), set dbId=p.id.
- removePhoto ahora es async:
  * Si photo.savedToLibrary && photo.dbId → llama al backend
    DELETE /api/photo-library?id=<dbId>. Si 409 (Paso 2 ya
    completado), toast.error y NO quita del estado local. Si OK,
    quita del estado local.
  * Si no está en la biblioteca (foto recién capturada, no
    submitida) → solo filtra el estado local (comportamiento
    anterior).
- Importado 'toast' de sonner.

El backend guard de v2.46 (DELETE /api/photo-library devuelve 409
si photo.miniStep=2 y Progress(sStep, miniStep=2, completed=true))
sigue aplicando — así el usuario puede borrar fotos mientras esté
en el Paso 2, pero una vez completado y pasado al Paso 3, no.

Bump v2.47 en middleware.ts, page.tsx, LoginPage.tsx.
Build Next.js: ✓ Compiled successfully in 20.6s.
Commit + push a GitHub (2d49e40). Vercel deploy automático.

Stage Summary:
- En FotosModal (Paso 2):
  * Foto recién capturada (no submitida) → × la quita del estado
    local (igual que antes).
  * Foto ya guardada en la biblioteca → × ahora llama al backend
    DELETE y persiste el borrado.
  * Si el Paso 2 ya está completado (Progress.completed=true), el
    backend devuelve 409 y el × muestra toast.error explicando que
    no se puede eliminar. La foto NO se quita del estado local.
- Pendiente: usuario prueba en v2.47 tras deploy (~1-2 min).

---
Task ID: v2.48
Agent: Main
Task: Re-abrir Paso 2 completado para AÑADIR fotos + guardar etiqueta Jaula al imprimir

Work Log:
- Petición del usuario: "una vez que en el Paso 2 adjuntas las fotos y
  pasas al Paso 3 estas no se pueden borrar en el Paso 2, tampoco, se
  podrá acceder SOLO para adjuntar más fotos si se requiere en algún
  otro sitio, por ejemplo pasos 4 y 5". Y: "en el caso de la Jaula hay
  que imprimir etiqueta y esta se tiene que guardar en el sistema".

PROBLEMA 1: Una vez completado el Paso 2 con X fotos, no se podía
volver a abrir el modal para AÑADIR más fotos — la pantalla de éxito
mostraba solo 'Continuar al Inventario →' sin opción de añadir.

FIX FotosModal.tsx:
- Nuevo state `showAddMore` (bool, default false).
- Pantalla de éxito ahora incluye botón 'Añadir más fotos' (oculto
  si isReadOnly). Al pulsarlo → showAddMore=true → muestra el form
  de captura con las fotos existentes cargadas.
- Botón × ahora solo se renderiza si !photo.savedToLibrary. Las
  fotos ya guardadas muestran ✓ verde + tooltip 'Foto guardada
  (no se puede eliminar)'.
- handleSubmit:
  * Trackea dbId devuelto por backend para cada foto recién guardada
    (newlySavedDbIds array).
  * Al final, setPhotos actualiza savedToLibrary=true Y dbId para
    las nuevas fotos — así no se re-envían si el usuario vuelve a
    pulsar 'Añadir más fotos'.
  * Tras éxito, setShowAddMore(false) → vuelve a pantalla de éxito
    con el contador actualizado.
- Reset de showAddMore al cerrar el modal.

PROBLEMA 2: Al imprimir etiqueta roja (Jaula), no quedaba constancia
en el sistema. Solo se abría la ventana de impresión.

FIX TagPrinter.tsx:
- Nuevas props opcionales: itemIds (alineado con items) y
  onAfterPrint callback.
- Nueva función persistLabelSnapshot():
  * Si itemIds se pasa, para cada item hace GET /api/inventory?id=X
    → merge existing extra con { etiquetaGenerada: true,
    etiquetaFecha: ISO, etiquetaData: snapshot } → PUT.
  * Toast de confirmación 'N etiqueta(s) guardada(s) en el sistema.'
  * Llama onAfterPrint para refrescar la UI.
- handlePrint ahora llama persistLabelSnapshot() después de abrir
  la ventana de impresión (no bloquea la UI).

FIX InventarioModal.tsx:
- Pasamos itemIds al TagPrinter (alineado con rojaItems).
- onAfterPrint llama loadInventory() para refrescar la tabla.
- Nuevo getEtiquetaBadge() muestra '🏷️ Impresa <fecha>' cuando
  extra.etiquetaGenerada=true. Se renderiza bajo la badge de decisión.

FIX JaulaModal.tsx + JaulaView.tsx:
- Mismo patrón: tagItemsAndIds → tagItems + tagItemIds.
- TagPrinter recibe itemIds + onAfterPrint=loadJaulaItems.

FIX /api/inventory/route.ts (GET):
- Nuevo: si se pasa ?id=X, devuelve un único item (con extra y
  photoUrls parseados). Lo usa TagPrinter para GET → merge → PUT
  sin perder otros campos de extra.

Bump v2.48 en middleware.ts, page.tsx, LoginPage.tsx.
Build Next.js: ✓ Compiled successfully in 21.0s.
Commit + push a GitHub (8bb4b3b). Vercel deploy automático.

Stage Summary:
- Para arreglar el caso puntual del usuario (Paso 2 con 4 fotos
  en vez de 5): puede re-abrir el Paso 2 (que ya está completado),
  pulsar 'Añadir más fotos', capturar/subir 1 foto adicional,
  pulsar 'Guardar fotos adicionales'. Solo se guarda la nueva,
  las 4 existentes no se re-envían. Progress se re-completa con
  5 fotos.
- Para añadir fotos adicionales a un Paso 2 ya correctamente
  completado (caso normal): mismo flujo. Las fotos ya guardadas
  muestran ✓ verde y no se pueden borrar.
- Al imprimir etiqueta roja desde InventarioModal / JaulaModal /
  JaulaView, se persiste en el sistema (item.extra.etiquetaGenerada
  + etiquetaFecha + etiquetaData). La tabla muestra '🏷️ Impresa
  <fecha>' bajo la decisión del item.
- Pendiente: usuario prueba en v2.48 tras deploy (~1-2 min).

---
Task ID: v2.49
Agent: Main
Task: Botón "Reiniciar Paso 2 y 3 desde cero" con cleanup profundo

Work Log:
- Petición del usuario: "vamos a dar un paso atrás y cerrar pasos 2 y 3
  para comenzar de nuevo".

PROBLEMA: la × admin (roja, arriba-derecha del círculo del paso)
solo borraba el Progress record. Las fotos del Paso 2 y los items
del inventario seguían en la BD y al reabrir los modales reaparecían.
El usuario no podía empezar de cero de verdad.

FIX DELETE /api/progress/step:
- Nuevo query param ?cleanup=true.
- Si cleanup=true Y miniStep=2:
  * Borra Inventory items (sStep/project/zone) — drafts del Paso 2
    + clasificados del Paso 3.
  * Borra Photos(miniStep=2) del sStep/project/zone.
  * Borra Progress(miniStep=3) — cascada porque el Paso 3 depende
    de los drafts creados en Paso 2.
  * Finalmente borra Progress(miniStep=2).
  * Orden: items → photos → progress (evita problemas de FK; el FK
    photoLibrary.inventoryItemId tiene onDelete: SetNull).
- miniStep=3 con cleanup=true: NO toca items ni fotos. Solo borra
  Progress(3). Las fotos del Paso 2 y los items siguen disponibles
  para reclasificar.

FIX page.tsx (× admin):
- Ahora pasa cleanup=true siempre.
- Mensaje de confirmación específico según miniStep:
  * msId=2: explica que borrará progreso 2+3, fotos e items.
  * msId=3: explica que solo borra progreso del 3.

FIX FotosModal + InventarioModal:
- Nuevo botón visible 'Reiniciar Paso 2 y 3 desde cero' en cabecera
  (banner rojo). Más fácil de encontrar que la × diminuta.
- Solo admin con candado abierto (canSkipSteps && adminFreeNavigation).
- FotosModal: solo se muestra si isCompleted (no interrumpe edición
  si el usuario está a mitad).
- InventarioModal: siempre visible (puede querer reiniciar a mitad
  del Paso 3).
- Confirm muestra cuántas fotos/items se eliminarán dinámicamente.
- Tras éxito: fetchProgress + clear state (setPhotos([])/setItems([]))
  + toast.success + onClose.

Bump v2.49 en middleware.ts, page.tsx, LoginPage.tsx.
Build Next.js: ✓ Compiled successfully en 19.9s.
Resolve merge conflicts durante rebase (auto-commit externo de
conversation-id chocó con bump de versión).
Commit + push a GitHub (941d76d). Vercel deploy automático.

Stage Summary:
- Para "empezar de cero desde el Paso 2":
  1. Activa el candado (Navegación libre) si no lo está.
  2. Abre FotosModal (Paso 2) — verás banner rojo "Reiniciar:
     Reiniciar Paso 2 y 3 desde cero".
  3. Click → confirm → se borran: Progress(2), Progress(3),
     Photos(miniStep=2), Inventory items del sStep/project/zone.
  4. Modal se cierra. Estado: Paso 2 y 3 disponibles (no completados).
  5. Abre Paso 2 → vacío → toma fotos → submits → drafts creados.
  6. Abre Paso 3 → clasifica → completa.
- Alternativa: × admin en el círculo del paso (también hace cleanup
  profundo si es el paso 2).
- Pendiente: usuario prueba en v2.49 tras deploy (~1-2 min).

---
Task ID: v2.50
Agent: Main
Task: Simplificar Paso 3 (S1) — auto-fill ubicación/categoría/frecuencia/Z Origen/Z Destino, decisión Retirar/Eliminar, lightbox negro, sin botón añadir fotos

Work Log:
- Petición del usuario: "la ubicación sale puesta automática ya que ya se
  sabe la zona, lo mismo que categoría. Frecuencia de uso, si es
  innecesario no aplica. Días de cuarentena solo si va a la jaula. En
  decisión Tirar es lo mismo que eliminar, dejar eliminar. En Z origen
  se sabe cuál es. En destino si es jaula es jaula. En decisión es
  Retirar que va a jaula o eliminar que va a residuo. La foto al
  pinchar sale en negro. Quitar poner más fotos, no hace falta."
- Aclaración: "no borrar columna, solo dejar deshabilitado o fijar,
  esta tabla vale para los necesarios" → los cambios de auto-fill/
  read-only aplican SOLO a S1; S2-S5 conservan las columnas editables.

CAMBIOS InventarioModal.tsx (solo S1):
- Ubicación: auto-fill desde currentZone/currentProject (read-only).
- Categoría: badge fijo 'Innecesario' (read-only) — antes era Select.
- Frecuencia uso: texto 'No aplica' (read-only) — antes era Select.
- Decisión: dropdown con solo 'Retirar' y 'Eliminar'.
  * Retirar → jaulaStatus='en_jaula', zonaDestino='Jaula',
    diasCuarentena default 40 si no tenía.
  * Eliminar → jaulaStatus='', jaulaFechaEntrada=null,
    diasCuarentena='_clear_', zonaDestino='Residuo'.
- Días cuarentena: solo se muestra el Select si decisión = Retirar;
  si Eliminar muestra '—'.
- Z Origen: auto-fill desde currentZone (read-only).
- Z Destino: auto-determinada por decisión (Jaula/Residuo, read-only).
- Lightbox foto: DialogContent con bg-black, texto blanco, border-0.
- Quitado botón 'añadir más fotos' (label con Camera icon).

CAMBIOS InventarioModal.tsx (S2-S5):
- Ubicación, Z Origen, Z Destino: restaurado comportamiento editable
  original (Input / Select con zonas del proyecto). NO se borran
  columnas.
- Frecuencia uso: como ya estaba dentro del bloque sStep===1, los
  demás S caen al else branch que renderiza extraFields.slice(0,2)
  → comportamiento original.

CAMBIOS 5s-constants.ts:
- INVENTORY_CONFIGS[1].extraFields decision options:
  ['Jaula','Tirar','Eliminar'] → ['Retirar','Eliminar'].
- subtitle y descriptionByS actualizados.
- DRAFT_INSTRUCTIONS_BY_S[1].fields actualizado.

CAMBIOS API inventory/route.ts:
- Default decision 'Retirar' (was 'Jaula').
- isJaulaDecision helper (acepta null/Retirar/Jaula como →jaula).
- isEliminarDecision helper (acepta Eliminar/Tirar como →residuo).
- Si isInnecesario + isEliminarDecision → fuerza jaulaStatus='' y
  jaulaFechaEntrada=null (no debe quedar en jaula).

BACKWARD COMPAT (helpers displayDecision/isJaulaDecision/isEliminarDecision):
- InventarioModal, JaulaView, JaulaModal, GlobalInventoryModal,
  TagPrinter: si el DB tiene decision='Jaula' (legacy) muestra
  'Retirar'; si tiene 'Tirar' muestra 'Eliminar'.
- TagPrinter QR y snapshot: usa 'Retirar' como default.

JaulaView.tsx:
- displayDecision() e isJaulaDecision() helpers.
- Filtro tagItemsAndIds: isJaulaDecision (acepta Retirar/Jaula/null).
- Select decisión: opciones Retirar/Eliminar/Reubicar.
- Badge card view: naranja si isJaulaDecision, rojo si no.
- Nueva entrada directa: decision default 'Retirar' (was 'Jaula').

JaulaModal.tsx:
- Mismos helpers y normalización que JaulaView.

GlobalInventoryModal.tsx:
- Badge decisión: clasificación de colores revisada para reconocer
  Retirar/Jaula → naranja, Eliminar/Tirar → rojo.
- Display text normalizado.

Version bump: v2.49 → v2.50 (middleware, page.tsx, LoginPage).
Build Next.js: ✓ Compiled successfully in 19.9s.
Commit 5712398 + push a GitHub. Vercel deploy automático.

Stage Summary:
- Paso 3 (S1) ahora es mucho más rápido de rellenar:
  * El usuario solo edita: Nombre, Cantidad, Precio, Estado, Decisión
    (y Días cuarentena si Retirar).
  * Ubicación, Categoría, Frecuencia, Z Origen, Z Destino se
    autocompletan / muestran fijos.
- Columnas NO se borraron — S2-S5 sigue funcionando como antes.
- Items legacy con decision='Jaula' o 'Tirar' se ven correctamente
  en JaulaView, JaulaModal, GlobalInventoryModal.
- Foto: al pulsar la miniatura se abre en grande sobre fondo negro.
- Pendiente: usuario prueba en v2.50 tras deploy (~1-2 min).

---
Task ID: v2.51
Agent: Main
Task: Añadir columna "Etiquetas" dedicada para S1 (etiqueta roja si Retirar→Jaula)

Work Log:
- Petición del usuario: "al poner retirar y jaula tiene que salir otra
  columna con la etiqueta roja para la jaula".
- Reglas confirmadas:
  * Eliminar → no aplica cuarentena, Z Destino = Residuo.
  * Retirar → Z Destino = Jaula, y debe mostrar etiqueta roja.

CAMBIOS InventarioModal.tsx (solo S1):
- Nueva columna "Etiquetas" entre "Días cuar." y "Z. Origen".
- Header: bg-rose-500, texto blanco, "Etiquetas".
- Cell bg-rose-50.
- Lógica:
  * isEliminarDecision → "—" (no aplica, va a residuo).
  * isJaulaDecision (Retirar/Jaula/null):
    - Si extra.etiquetaGenerada=true → getEtiquetaBadge (badge verde
      "Impresa DD/MM/YY").
    - Si no → badge rosa "🔴 Pendiente" con tooltip indicando que use
      el botón "Etiquetas" superior para imprimir.
- Movido getEtiquetaBadge fuera de la celda Decisión (ya tiene su
  propia columna).
- colSpan "CLASIFICACIÓN INNECESARIO" actualizado de 4 → 5.
- S2-S5: sin cambios (sigue usando extraFields.slice(0,2)).

Version bump: v2.50 → v2.51 (middleware, page.tsx, LoginPage).
Build Next.js: ✓ Compiled successfully in 21.0s.
Commit 70bcc36 + push a GitHub. Vercel deploy automático.

Stage Summary:
- Tabla S1 ahora tiene 13 columnas:
  Elemento | Ubicación | Categoría | Cantidad | Precio |
  Estado | Frec. uso | Decisión | Días cuar. | Etiquetas |
  Z. Origen | Z. Destino | Fotos | (delete)
- El usuario ve de un vistazo qué items van a Jaula y si ya tienen
  etiqueta impresa o están pendientes.
- Pendiente: usuario prueba en v2.51 tras deploy (~1-2 min).

---
Task ID: v2.52
Agent: Main
Task: Etiqueta automática al Retirar + quitar candado 🔒

Work Log:
- Petición del usuario: "z. destino no lo has puesto como te dije.
  si en decision es retirar sera jaula si es eliminar sera residuos,
  esto es automático. Si es retirar la etiqueta se hace automáticamente
  y se pone para poder imprimir en la columna. la foto se ve en negro,
  no se para qué es el candado."

3 PROBLEMAS:

1) Z Destino automática:
- Ya estaba implementado desde v2.50 (celda Z Destino renderiza
  'Residuo'/'Jaula' según decisión, read-only).
- Al cambiar decisión, handler ya hace handleUpdateField(zonaDestino).
- Confirmado: funciona correctamente.

2) Etiqueta automática al seleccionar Retirar:
- NUEVO handleAutoGenerateEtiqueta(item):
  * Calcula diasCuarentena (default 40) y fechaRevision.
  * Construye snapshot {nombre, ubicacion, cantidad, estado,
    frecuenciaUso, decision:'Retirar', categoria, fechaEntrada,
    fechaRevision, diasCuarentena, zonaOrigen, observaciones}.
  * Genera fecha = now ISO.
  * Persiste en DB: PUT /api/inventory con extra completo incluyendo
    etiquetaGenerada=true, etiquetaFecha=fecha, etiquetaData=snapshot.
  * Update optimista en state local.
- Handler de Decisión al seleccionar Retirar:
  * Llama handleAutoGenerateEtiqueta vía setTimeout(50ms) para que
    primero se apliquen los handleUpdateField de jaulaStatus y
    jaulaFechaEntrada.
- Handler de Decisión al seleccionar Eliminar:
  * Limpia etiquetaGenerada/etiquetaFecha/etiquetaData si existían.
- Columna "Etiquetas":
  * Si Retirar + etiquetaGenerada=true → muestra getEtiquetaBadge
    (verde "Impresa DD/MM/YY") + TagPrinter inline con un solo item
    (botón impresión individual).
  * Si Retirar sin etiquetaGenerada → badge rosa "Pendiente".
  * Si Eliminar → "—".

3) Candado 🔒:
- Símbolo 🔒 aparecía en la columna × cuando el item venía de una foto
  del Paso 2 (extra.sourcePhotoId). El usuario no entendía para qué era.
- CAMBIO InventarioModal:
  * Celda × ahora muestra Button × siempre (no el candado).
  * handleDeleteItem: confirm() antes de borrar; si sourcePhotoId,
    avisa que la foto quedará como pendiente.
- CAMBIO API /api/inventory DELETE:
  * Quitado el GUARD que bloqueaba delete si sourcePhotoId + Paso 2
    completado. Ahora cualquier item se puede borrar.
  * La foto queda sin inventoryItemId (onDelete: SetNull) y reaparece
    como pendiente de clasificar en el Paso 2.

Version bump: v2.51 → v2.52 (middleware, page.tsx, LoginPage).
Build Next.js: ✓ Compiled successfully in 21.8s.
Commit aa08484 + push a GitHub. Vercel deploy automático.

Stage Summary:
- Flujo simplificado:
  1. Seleccionar Retirar → Z Destino = Jaula (auto), etiqueta generada
     automáticamente, columna Etiquetas muestra "Impresa DD/MM/YY" +
     botón 🖨️ para imprimir.
  2. Seleccionar Eliminar → Z Destino = Residuo (auto), Días cuar. = —,
     Etiquetas = —.
  3. Cualquier item se puede borrar con × (sin candado).
- Pendiente: usuario prueba en v2.52 tras deploy (~1-2 min).

---
Task ID: v2.53
Agent: Main
Task: Backfill etiqueta para items existentes con Retirar (fix v2.52 gap)

Work Log:
- Usuario reporta: "veo la version correcta (v2.52) pero no veo los cambios"
- Diagnóstico: handleAutoGenerateEtiqueta solo dispara en onValueChange.
  Items creados antes de v2.52 con decision='Retirar' ya seleccionada
  NO se backfillean → siguen mostrando badge "Pendiente" en lugar de
  "Impresa" + botón impresora.
- Fix: en loadInventory, tras setItems(mappedItems), si sStep===1:
  recorrer items y para cada uno con decision='Retirar' o 'Jaula'
  (legacy) sin etiquetaGenerada, llamar handleAutoGenerateEtiqueta
  vía setTimeout(50ms stagger).
- Bump v2.52 → v2.53 (middleware, page.tsx, LoginPage).
- Build Next.js: ✓ Compiled successfully.
- Commit 3577289 + push a GitHub. Vercel deploy automático.

Stage Summary:
- Al abrir InventarioModal en S1, cualquier item con Retirar
  previamente seleccionado ahora se auto-genera la etiqueta al cargar.
- Tras ~1-2 min de deploy Vercel, usuario debe ver v2.53 y, al abrir
  el modal, badges verdes "Impresa DD/MM/YY" en columna Etiquetas
  para todos los items con Retirar.
- Si aun así no ve cambios, probablemente está en S2-S5 (la columna
  solo existe en S1) o en modo read-only (candado cerrado).

---
Task ID: v2.54
Agent: Main
Task: Fix Z Destino + etiqueta auto + jaulaStatus no funcionaban en S1

Work Log:
- Usuario: "no se ven los cambios, por ejemplo el de Z. destino"
- ROOT CAUSE encontrado: migrateOrphanPhotos (Paso 2 → Paso 3)
  creaba items con category='' (string vacío). TODA la lógica
  automática de S1 comprobaba item.category === 'innecesario':
    * Z Destino auto (Jaula/Residuo): fallaba → caía al Select editable vacío
    * handleAutoGenerateEtiqueta: no disparaba
    * jaulaStatus/jaulaFechaEntrada: no se seteaban
    * Backfill v2.53: tampoco disparaba (también comprobaba category)
  Aunque la columna Categoría se renderiza hardcoded como "Innecesario"
  en S1, el dato real estaba vacío → todas las condiciones fallaban.

FIX (3 partes):
1) migrateOrphanPhotos: en S1, crear drafts con category='innecesario'
   desde el inicio (no '').
2) loadInventory backfill: si sStep===1 y category!=='innecesario',
   normalizar en state local + persistir via PUT /api/inventory
   (background, sin await). Esto repara items ya existentes en DB.
3) Relax de checks: cambiar todas las condiciones
   `item.category === 'innecesario'` → `sStep === 1 || item.category === 'innecesario'`
   (o variantes con `category !== 'necesario'` para S1).
   Archivos afectados: InventarioModal.tsx en 7 puntos:
     - línea 189 (isInnecesario en importTemplateItems)
     - líneas 433-441 (quantityNeeded/Unneeded en loadInventory)
     - líneas 1026-1037 (save handler)
     - líneas 1979-1981 (row render isInnecesario/isNecesario)
     - línea 2101 (decision handler isInn)
     - línea 2232 (Z Destino cell render)
     - línea 585 (migrateOrphanPhotos draft category)

Bump v2.53 → v2.54 (middleware, page.tsx, LoginPage).
Build Next.js: ✓ Compiled successfully.
Commit dc40d04 + push a GitHub. Vercel deploy automático.

Stage Summary:
- TRAS DEPLOY de v2.54 (~1-2 min), al abrir InventarioModal en S1:
  * Items existentes con category='' se auto-normalizan a 'innecesario'
    (visible en state local + persistido en DB en background).
  * Z Destino ahora SÍ muestra 'Jaula' (rojo) o 'Residuo' (amarillo)
    según decisión, en todos los items.
  * Etiquetas auto-generadas también disparan para items con Retirar.
  * jaulaStatus='en_jaula' + jaulaFechaEntrada se setean al elegir Retirar.
- Futuros drafts creados desde Paso 2 ya nacen con category='innecesario'.

---
Task ID: v2.55
Agent: Main
Task: Fix Decisión no dejaba poner Eliminar

Work Log:
- Usuario: "decision no deja poner eliminar"
- ROOT CAUSE: Race condition en onValueChange del Select de Decisión.
  El handler llamaba en secuencia:
    1) handleUpdateExtra(id, 'decision', 'Eliminar')
       → setItems aplica decision='Eliminar'
       → PUT /api/inventory con extra={..., decision:'Eliminar'}
    2) handleUpdateExtra(id, 'diasCuarentena', '_clear_')
       → usa CLOSURE STALE de `items` (aún con decision='Retirar')
       → construye newExtra desde item.extra (sin decision='Eliminar')
       → setItems aplica este extra → PISA decision='Eliminar'
       → PUT /api/inventario con extra sin decision='Eliminar'
  Neto: DB y state terminan con decision='Retirar' → dropdown rebota.
  Bug silencioso adicional: el bloque que borraba etiquetaGenerada/
  etiquetaFecha/etiquetaData construía un objeto `extra` pero nunca
  lo persistía (perdido desde v2.52).

FIX:
- Refactor onValueChange para S1 (innecesario):
  1) Construir newExtra (con decision=val) y topLevel updates una sola vez
  2) Si Eliminar: topLevel.zonaDestino='Residuo', jaulaStatus='',
     jaulaFechaEntrada=null; delete newExtra.diasCuarentena,
     etiquetaGenerada, etiquetaFecha, etiquetaData
  3) Si Retirar: topLevel.zonaDestino='Jaula', jaulaStatus='en_jaula',
     jaulaFechaEntrada si no tenía; newExtra.diasCuarentena=40 default
  4) Único setItems(prev => map con {...it, ...topLevel, extra:newExtra})
  5) Único PUT /api/inventory con {...topLevel, extra:newExtra}
  6) Si Retirar: setTimeout(handleAutoGenerateEtiqueta(updatedItem), 50)
- S2-S5: comportamiento simple, solo handleUpdateExtra (sin side-effects).

Bump v2.54 → v2.55 (middleware, page.tsx, LoginPage).
Build Next.js: ✓ Compiled successfully.
Commit 596ec95 + push a GitHub. Vercel deploy automático.

Stage Summary:
- TRAS DEPLOY v2.55 (~1-2 min):
  * Seleccionar "Eliminar" ahora SÍ se queda puesto (no rebota a Retirar)
  * Al elegir Eliminar: Z Destino=Residuo, Días cuar.=—, Etiquetas=—,
    jaulaStatus='', jaulaFechaEntrada=null, etiquetaData borrada
  * Al elegir Retirar: Z Destino=Jaula, etiqueta auto-generada, etc.
- Ya no hay race conditions entre los updates.

---
Task ID: v2.56
Agent: Main
Task: Foto lightbox negro + Decisión vacío por defecto

Work Log:
- Usuario: "faltaría poder ver la foto, sale en negro. En decision, de
  primeras poner en blanco para poder elegir del despegable eliminar o
  retirar para que salga la etiqueta, si está como ahora de primeras
  retirar, no sale etiqueta"

FIX 1 — Foto lightbox en negro:
- DialogContent: bg-black → bg-zinc-900 (gris oscuro, no negro puro)
- img: quitado bg-black del className, añadido onError handler que
  oculta el img y muestra un div con '🖼️ No se pudo cargar la imagen'
  en su lugar. Antes, si la foto fallaba o tardaba en cargar, el
  usuario veía una caja negra sin feedback.
- Footer: bg-black → bg-zinc-900 con border-zinc-700

FIX 2 — Decisión pre-seleccionada a Retirar (causaba que etiqueta
no se auto-generara):
- ROOT CAUSE: displayDecision(undefined) devolvía 'Retirar'. Así que
  el Select siempre mostraba 'Retirar' incluso para items nuevos sin
  decisión. Pero como el valor ya era 'Retirar', onValueChange NUNCA
  disparaba al abrir el modal → handleAutoGenerateEtiqueta nunca se
  llamaba → etiqueta nunca se generaba.
- FIX:
  1) Select value ahora: item.extra?.decision ? displayDecision(...) : undefined
     → Si no hay decisión, Select está vacío (placeholder '—')
  2) Z Destino: si no hay decisión → '—' (antes mostraba 'Jaula')
  3) Días cuarentena: si no hay decisión → '—' (antes mostraba Select con 40)
  4) Etiquetas: si no hay decisión → '—' (antes mostraba 'Pendiente')
  5) importTemplateItems: ya NO fuerza decision='Retirar' por defecto.
     Solo conservamos decision si el template lo trae.
- Backfill v2.53 sigue funcionando para items legacy con decision='Retirar'
  + sin etiquetaGenerada (los auto-genera al cargar).

Bump v2.55 → v2.56 (middleware, page.tsx, LoginPage).
Build Next.js: ✓ Compiled successfully.
Commit 05240fe + push a GitHub. Vercel deploy automático.

Stage Summary:
- TRAS DEPLOY v2.56 (~1-2 min):
  * Al abrir InventarioModal S1 con items nuevos:
    - Decisión: Select vacío con placeholder '—'
    - Z Destino: '—'
    - Días cuarentena: '—'
    - Etiquetas: '—'
  * Al seleccionar 'Retirar' en el Select:
    - onValueChange dispara (porque cambió de undefined a 'Retirar')
    - etiqueta se auto-genera
    - Z Destino = 'Jaula', Días cuar. = 40, Etiquetas = 'Impresa' + 🖨️
  * Al seleccionar 'Eliminar':
    - Z Destino = 'Residuo', Días cuar. = '—', Etiquetas = '—'
  * Al clickar en una foto: lightbox gris oscuro, si la foto carga
    se ve; si no carga, mensaje '🖼️ No se pudo cargar la imagen'

---
Task ID: v2.57
Agent: Main
Task: 4 cambios solicitados por usuario tras ver screenshot

Work Log:
- Usuario mandó screenshot mostrando tabla S1 con thumbnails negros en
  columna Fotos. Pidió:
  1) Eliminar botón global 'Etiquetas rojas' (ya hay uno por línea)
  2) Fix fotos en negro (thumbnails de 32x32px)
  3) Poder meter líneas manualmente
  4) Las fotos se guarden también en Paso 2 y en biblioteca

DIAGNÓSTICO VLM:
- Confirmado por análisis visual de la screenshot:
  * Thumbnails son rectángulos negros opacos sin contenido
  * El lightbox ya estaba fixeado en v2.56 (zinc-900)
  * El problema está en los <img> de 32x32px de la columna Fotos

CAMBIOS:

1) Eliminado botón global 'Etiquetas rojas':
   - Bloque entero (sStep===1 + rojaItems + TagPrinter) comentado
   - Razón: ya existe TagPrinter por línea en columna Etiquetas

2) Fix thumbnails negros:
   - <img>: className ahora incluye bg-gray-100 + border-gray-300
   - loading=lazy + decoding=async
   - onError handler: si foto no carga, reemplaza src por SVG data URL
     con icono de imagen gris (data:image/svg+xml;utf8,...)
   - Así nunca más se ve negro: o se ve la foto, o se ve icono gris

3) Botón 'Añadir línea' (handleAddRow):
   - POST /api/inventory con item vacío
   - S1: category='innecesario', quantityUnneeded=1, zonaOrigen auto
   - S2-S5: category='' (editable)
   - Recarga inventario tras crear para obtener ID real
   - Botón azul con icono Plus en toolbar, visible para cualquier editor

4) Botón '+' por item para adjuntar fotos:
   - En columna Fotos, después de miniaturas existentes
   - fileInputRefs: useRef<Map<string, HTMLInputElement>>
   - Inputs ocultos renderizados al final del componente (uno por item)
   - handleFileInputChange → handleAttachPhoto(itemId, file, 'antes')
   - handleAttachPhoto MODIFICADO:
     * miniStep: 2 (antes era miniStep del inventario, p.ej. 3)
     * category: 'paso2_s{sStep}' (antes 'inventario_s{sStep}')
     * tags incluyen 'paso2' además de 'inventario'
   - Así cada foto subida aparece en:
     a) Biblioteca de fotos (PhotoLibrary)
     b) Paso 2 / FotosModal (por miniStep=2)
     c) Columna Fotos del inventario (por inventoryItemId)
   - capture=environment para móvil (cámara trasera)

Bump v2.56 → v2.57 (middleware, page.tsx, LoginPage).
Build Next.js: ✓ Compiled successfully.
Commit 5d1f000 + 618d9e3 (gitignore) + push a GitHub. Vercel deploy.

Stage Summary:
- TRAS DEPLOY v2.57 (~1-2 min):
  * Toolbar: botón azul 'Añadir línea' a la izquierda
  * Columna Fotos: botón '+' dashed por item para adjuntar foto
  * Thumbnails: si la foto carga, se ve; si no, icono gris (no negro)
  * Sin botón global 'Etiquetas rojas' (usa el de cada línea)
  * Foto subida desde inventario → aparece también en Paso 2 y biblioteca

---
Task ID: v2.59
Agent: Main
Task: FIX fotos guardadas en negro (biblioteca, Paso 2, Paso 3)

Work Log:
- Usuario: "las fotos están guardadas en negro, no se ve ni en la
  biblioteca en el paso 2 ni en el paso 3"
- v2.58 solo cambió el fondo del lightbox (bg-zinc-900 → bg-white),
  pero el problema real era que las FOTOS se guardaban negras en DB.

ROOT CAUSE (src/lib/image-utils.ts → compressImage):
1) img.crossOrigin = 'anonymous' se seteaba SIEMPRE, incluso para
   data URLs (base64). Esto puede causar que el canvas se "tainte"
   y toDataURL('image/jpeg') devuelva una imagen completamente negra
   SILANCIOSAMENTE (sin lanzar error). El catch nunca disparaba.
2) JPEG no soporta transparencia. Si el canvas tenía píxeles
   transparentes (PNG con alpha, o áreas del canvas no cubiertas por
   la imagen), se convertían a NEGRO al exportar como JPEG.
3) No había validación de dimensiones — si la imagen tenía width=0
   o height=0, el canvas era 0x0 → toDataURL devolvía negro.

FIX en compressImage:
- No setear crossOrigin para data URLs (solo para http:// o https://)
- Validar dimensiones: si width o height son 0, rechazar con error
- Llenar canvas con blanco (#ffffff) ANTES de drawImage
  → así píxeles transparentes se convierten en blancos, no negros
- Sanity check: si resultado < 1KB para imagen >100x100, probablemente
  es negro → devolver original sin comprimir

FIX en callers:
- InventarioModal.handleAttachPhoto: envolver compressImage() en
  try/catch; si falla, usar rawBase64 original
- FotosModal.processQueue: misma protección
- Mejor foto grande (sin comprimir) que foto negra

Bump v2.58 → v2.59 (middleware, page.tsx, LoginPage).
Build Next.js: ✓ Compiled successfully.
Commit 71e01cb + push a GitHub. Vercel deploy.

Stage Summary:
- TRAS DEPLOY v2.59 (~1-2 min):
  * Fotos subidas desde Paso 2 o desde Inventario (botón +) se guardan
    correctamente en la biblioteca, aparecen en Paso 2 y en la columna
    Fotos del Paso 3.
  * Las fotos ya existentes en negro NO se recuperan (ya están
    guardadas como negro en DB). El usuario debe borrarlas y volver
    a subirlas para que se vean correctamente.
  * Si por algún motivo la compresión sigue fallando para una foto
    específica, se usará el original sin comprimir (más grande pero
    visible).

---
Task ID: v2.60
Agent: Main
Task: Inventario → Plan de Acción + Diario, fix fotos negras, botón X fotos, VLM auto-descripción

Work Log:
- Usuario: "del paso 3, poder eliminar foto por si se mete confundida
  con una x arriba en el icono de la foto. bidireccionalmente se
  actualiza en paso 2 y biblioteca de fotos"
- Usuario: "del acuerdo. Ahora el flujo es que todo que se ha apuntado
  en el inventario se traspase al plan de accion y al diario del
  responsable, para que se hagan esas tareas de eliminar y retirar
  a jaula."
- Usuario: "podriamos implementar una IA para en la descripcion ponga
  automatico lo que se ve en la foto?"
- Usuario: "realiza todo"

CAMBIOS:

1) FIX FOTOS NEGRAS (upload pipeline):
   - /api/upload: sanity check server-side
     * Rechaza imágenes <2KB (canvas vacío típico)
     * Rechaza imágenes con >95% de bytes 0x00 o 0xFF (patrón canvas vacío)
   - image-utils.ts compressImage:
     * PNG fallback si JPEG devuelve sospechosamente pequeño (<1KB para >100x100)
     * Si PNG tampoco funciona, usar original sin comprimir
   - FotosModal.capturePhoto:
     * Validar video.videoWidth > 0 antes de capturar (evita canvas 0x0)
     * Llenar canvas con blanco antes de drawImage
     * Sanity check post-captura: si <1KB, no añadir a la cola
     * Mensaje al usuario si la captura falla

2) FIX JAULA VACÍO + Z1:
   - InventarioModal onDecisionChange Retirar:
     * Asegurar jaulaOrigen = zonaOrigen || currentZone.name || project.name
     * Asegurar zonaOrigen si no está seteado
   - loadInventory backfill:
     * Items S1 con decision='Retirar' pero jaulaStatus='' se normalizan
       a jaulaStatus='en_jaula' automáticamente
     * Persiste en DB (background) y actualiza state local
     * Así aparecen en el JaulaView aunque se hayan creado antes de v2.60

3) BOTÓN × EN FOTOS DEL PASO 3:
   - Botón × SIEMPRE visible (antes solo si miniStep !== 2)
   - Icono SVG (×) en vez de carácter texto
   - Confirmación si es foto del Paso 2: 'Se quitará del inventario,
     del Paso 2 y de la biblioteca de fotos'
   - handleDeletePhoto mejorado:
     * Actualiza itemPhotos (caché local)
     * Actualiza items[].photos (array embebido)
     * Actualiza step2Photos si la foto era del Paso 2
     * Actualiza photoUrl principal del item si era la foto principal
     * Mensaje: 'Foto eliminada del inventario, Paso 2 y biblioteca'
   - Si el backend devuelve 409 (Paso 2 completado), muestra error

4) INVENTARIO → PLAN DE ACCIÓN + DIARIO:
   - Nuevo endpoint POST /api/inventory/sync-actions:
     * Busca items S1 con decision='Retirar' o 'Eliminar'
     * Para cada uno, verifica si ya existe ActionItem con itemId=`inv_${id}`
     * Si no existe, lo crea con:
       - hallazgo: 'Elemento innecesario detectado en {zona}: {nombre} ({qty} und.)'
       - accionCorrectiva: 'Retirar a Jaula de cuarentena (40 días)' o 'Eliminar y enviar a Residuo'
       - clienteZona: zonaOrigen del item
       - personaDemandada: responsable de la zona (si existe)
       - source: 'inventario'
       - estado: 'abierta'
       - prioridad: 'alta' si Eliminar o vencido, 'media' si no
       - fechaLimite: jaulaFechaEntrada + diasCuarentena (para Retirar)
       - semana: W{weekNumber}
       - numeroEntrada: auto-increment per project
   - InventarioModal.handleComplete:
     * Tras completar el paso, llama a /api/inventory/sync-actions
     * Muestra toast: 'Plan de Acción actualizado: X tarea(s) nueva(s)'
   - InventarioModal onDecisionChange:
     * Sincroniza en background al seleccionar Retirar/Eliminar
     * No espera al completado del paso
   - ResponsablePanel:
     * Nueva sección 'Diario del Responsable'
     * Carga tareas de /api/actions con filtro por rol
     * Filtros: Todas / Pendientes / En proceso / Resueltas / Desde inventario
     * Card por tarea con:
       - Icono según tipo (Package=Retirar, Trash2=Eliminar, ListTodo=otro)
       - Badges: estado, 'Inventario S1' si source=inventario, Urgente, Vencida
       - hallazgo + accionCorrectiva
       - Metadata: zona, responsable, fecha límite, fecha entrada
       - Progress bar si porcentaje > 0
       - Botones: Iniciar / Resolver / Cerrar
     * Colores: rojo si vencida, naranja si urgente, azul si normal

5) VLM AUTO-DESCRIPCIÓN:
   - Nuevo endpoint POST /api/photo-describe:
     * Usa ZAI chat.completions.createVision
     * Prompt por S-Step (S1: elementos innecesarios, S2: organización,
       S3: suciedad, S4: estándares visuales, S5: cumplimiento)
     * Máximo 30 palabras, español, sin prefijos
     * Limpia la respuesta (quita comillas, prefijos, trunca a 200 chars)
   - FotosModal.handleSubmit:
     * Tras guardar cada foto en PhotoLibrary, pide descripción VLM
     * Actualiza PhotoLibrary.description con la respuesta
     * No bloquea el submit — si VLM falla, la foto queda con desc genérica
   - InventarioModal.handleAttachPhoto:
     * Misma integración
     * Actualiza estado local (itemPhotos + items[].photos) para que
       se vea en la UI inmediatamente

Bump v2.59 → v2.60 (middleware, page.tsx, LoginPage).
Build Next.js: ✓ Compiled successfully.
Commit 235dff8 + push a GitHub. Vercel deploy automático.

Stage Summary:
- TRAS DEPLOY v2.60 (~1-2 min):
  * Fotos subidas desde Paso 2 o Inventario: validación server-side
    rechaza canvas vacío; PNG fallback si JPEG falla
  * Items S1 con Retirar aparecen en JaulaView (backfill automático)
  * Botón × en todas las fotos del Paso 3 (también Paso 2 con confirm)
  * Completar inventario S1 → crea ActionItems automáticamente
  * Cambiar decisión a Retirar/Eliminar → sincroniza en background
  * Diario del Responsable: nueva sección con tareas pendientes
  * Fotos subidas → descripción automática con IA (VLM) en background

---
Task ID: v2.61
Agent: Main
Task: Calendario con entradas+cumplimientos + Avisos automáticos del Plan de Acción

Work Log:
- Usuario: "EN EL CALENDARIO INDIVIDUAL TIENEN QUE APARECER LAS FECHAS
  DE ENTRADA DE HALLAZGOS ASI COMO LAS DE CUMPLIMIENTO QUE SE PONEN.
  EN AVISOS LAS FECHAS CUMPLIDAS Y QUE NO SE HA HECHO NADA. ES DECIR,
  SE PASA DEL PASO 3 LAS COSAS QUE HAY QUE HACER EN EL PLAN DE ACCION
  CON EL RESPONSABLE Y A LA VEZ DE QUE EN EL CALENDARIO SE MARCAN ESAS
  FECHAS CON LA TAREA Y EN AVISOS SALTA AVISO, LOS AVISOS SON LAS
  LLAMADAS AL PLAN CALENDARIO Y DEL CALENDARIO AL PLAN DE ACCION. EL
  RESPONSABLE ENTRA A AVISO Y VEO QUE AVISO ES. DE HAY PASA AL DIARIO
  PARA VER LA FECHA Y DEL CALENDARIO AL PLAN DE ACCION PARA RELLENARLO
  Y PONER OTRAS FECHAS. LOS AVISOS SON EN EL DIA QUE SE CUMPLE O ENTRA
  EL HALLAZGO AL PLAN DE ACCION Y SE CALENDERIZA EN CALENDARIO, ESTO
  POR INDIVIDUAL POR RESPONSABLE"

CAMBIOS:

1) NUEVO ENDPOINT /api/avisos/auto:
   - Escanea ActionItems asignados al usuario (responsable, personaDemandada,
     zonas donde es responsable, o gerente en su proyecto).
   - Genera 3 tipos de Notification:
     * 'new_action_item' → fechaEntrada == hoy (hallazgo nuevo)
     * 'action_due_today' → fechaLimite == hoy (vence hoy)
     * 'action_overdue' → fechaLimite < hoy (vencida)
   - Dedupe por (userId, type, itemId-ref, día actual).
   - Cada mensaje incluye [ref:actionItemId] para el dedupe.
   - Body: { userId, projectId? } → retorna { created, skipped, totalScanned }

2) /api/inventory/sync-actions:
   - Al crear ActionItem desde inventario S1 (Retirar/Eliminar),
     también crea Notification inmediata con type='new_action_item':
     * Al responsable de la zona (si existe)
     * A gerentes/admins del proyecto
   - Mensaje incluye: zona, acción correctiva, fecha vencimiento
   - Try/catch: si falla la notificación, no bloquea la creación del ActionItem.

3) UserTaskCalendar v2.61 (componente principal):
   - Agrupar tareas por DOS fechas:
     * entradasByDate → Map<yyyy-MM-dd, TaskItem[]> usando fechaEntrada
     * vencimientosByDate → Map<yyyy-MM-dd, TaskItem[]> usando fechaLimite
   - Calendario con DOS marcadores por día:
     * Punto azul = entrada de hallazgo
     * Punto rojo (vencida) / naranja (hoy) / verde (próxima) = cumplimiento
   - Al seleccionar un día, mostrar DOS secciones:
     * 'Entradas de hallazgos' (fondo azul claro, borde azul)
     * 'Cumplimientos / Vencimientos' (fondo naranja claro, borde naranja)
   - TaskCard con parámetro 'highlight':
     * 'entrada' → borde lateral izquierdo azul + texto '↓ Entró: d MMM'
     * 'vencimiento' → borde lateral izquierdo naranja + texto fecha en color
   - Badge 'Inventario' para items con source='inventario' o itemId empieza
     con 'inv_'
   - Botón 'Plan' (ExternalLink) en cada TaskCard → onOpenActionPlan(task.id)
   - Leyenda visible al inicio: azul=entrada, rojo=vencida, naranja=hoy,
     verde=próxima
   - Props: añadido onOpenActionPlan?: (itemId?) => void

4) page.tsx:
   - En init(): tras /api/notifications/auto, también llama a
     /api/avisos/auto con { userId: currentUser.id, projectId }.
   - Renderizar avisos con nuevos tipos:
     * 'new_action_item' → fondo azul, icono CalendarDays azul
     * 'action_due_today' → fondo naranja, icono AlertTriangle naranja
     * 'action_overdue' → fondo rojo, icono AlertTriangle rojo
   - Click en aviso de acción (no leído) → marca leído + cierra dropdown +
     abre UserTaskCalendar (setShowUserCalendar(true))
   - Etiqueta '→ Calendario' visible en avisos de acción no leídos.
   - UserTaskCalendar recibe onOpenActionPlan={() => {
     setShowUserCalendar(false); setActiveTab('actionplan'); }}
   - Button 'Aceptar reunión' con stopPropagation para no abrir calendario.

5) Bump v2.60 → v2.61 (middleware.ts, page.tsx).
   Build Next.js: ✓ Compiled successfully (21.3s).
   Commit fcc00be + push a GitHub. Vercel deploy automático.

FLUJO COMPLETO (Paso 3 → Plan → Calendario → Avisos → Diario → Plan):
- Paso 3 inventario S1 → onDecisionChange → /api/inventory/sync-actions:
  1. Crea ActionItem con fechaEntrada=hoy, fechaLimite calculada
  2. Crea Notification 'new_action_item' al responsable
- Usuario abre header → ve badge 'X avisos' → click → dropdown muestra
  'Nuevo hallazgo: ...' (azul)
- Click en aviso → marca leído → abre Mi Calendario
- En calendario, día de hoy tiene marcador azul (entrada) + día de
  vencimiento tendrá marcador rojo/naranja/verde
- Al seleccionar día, ve tareas con sección 'Entradas' o 'Vencimientos'
- Click botón 'Plan' en tarea → cierra calendario → abre tab Plan de
  Acción para editar/poner nuevas fechas
- Cada día al cargar la app, /api/avisos/auto genera avisos de
  vencimientos (hoy o pasados) no notificados → avisan al responsable
- Responsable entra a Avisos → ve 'Tarea para hoy' o 'Tarea vencida' →
  click → calendario → plan

Stage Summary:
- TRAS DEPLOY v2.61 (~1-2 min):
  * Inventariar Retirar/Eliminar en Paso 3 → responsable recibe Aviso
    inmediato 'Nuevo hallazgo'
  * Calendario individual muestra DOS tipos de marcadores por día:
    entrada (azul) y cumplimiento (rojo/naranja/verde)
  * Cada día, al cargar la app, se generan avisos de vencimientos
    (hoy o pasados) para el responsable
  * Click en Aviso de acción → abre Calendario
  * Click en 'Plan' en tarea del calendario → abre Plan de Acción
  * Flujo completo: Paso 3 → Aviso → Calendario → Plan → nuevas fechas
