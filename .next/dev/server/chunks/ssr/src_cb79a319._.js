module.exports = [
"[project]/src/lib/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "use5SStore",
    ()=>use5SStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
;
// Mini-step types: ZONE steps (2,3,5) are collaborative per zone; INDIVIDUAL steps (1,4) are per employee
// Step 1 (Formación+Examen) is individual — each employee must pass the exam
// Step 4 (Autoevaluación) is individual — each employee/responsable does their own self-assessment
//   For S1/S2/S3/S5: done by empleados; for S4: done by responsable
// Step 5 (Auditoría) is zone-level — done by auditor for the zone as a whole
const ZONE_MINI_STEPS = [
    2,
    3,
    5
];
const INDIVIDUAL_MINI_STEPS = [
    1,
    4
];
const use5SStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        // Progress & Board State
        progress: [],
        employeeProgress: [],
        currentView: 'board',
        activeTab: 'board',
        selectedSStep: null,
        activeModal: null,
        activeMiniStep: null,
        isLoadingProgress: true,
        adminFreeNavigation: true,
        currentZone: null,
        userZones: [],
        // Auth & Project State
        currentUser: null,
        currentProject: null,
        authView: 'login',
        projects: [],
        companies: [],
        isAuthLoading: true,
        isLoginLoading: false,
        authError: null,
        // Permissions State
        permissions: {},
        // Progress & Board Actions
        fetchProgress: async ()=>{
            try {
                const { currentProject, currentZone } = get();
                const params = currentProject ? `?projectId=${currentProject.id}` : '';
                const res = await fetch(`/api/progress${params}`);
                const data = await res.json();
                // API returns { success: true, data: [...] }
                const progressData = data?.data ? data.data : Array.isArray(data) ? data : [];
                set({
                    progress: progressData,
                    isLoadingProgress: false
                });
                // Also refresh employee progress to keep isQuesitoEarned accurate
                if (currentProject) {
                    try {
                        const epParams = `?projectId=${currentProject.id}` + (currentZone ? `&zoneId=${currentZone.id}` : '');
                        const epRes = await fetch(`/api/employee-progress${epParams}`);
                        const epData = await epRes.json();
                        const epResult = epData?.data ? epData.data : Array.isArray(epData) ? epData : [];
                        set({
                            employeeProgress: epResult
                        });
                    } catch (epError) {
                        console.error('Error fetching employee progress during refresh:', epError);
                    }
                }
            } catch (error) {
                console.error('Error fetching progress:', error);
                set({
                    isLoadingProgress: false
                });
            }
        },
        fetchEmployeeProgress: async (projectId, zoneId)=>{
            try {
                let params = `?projectId=${projectId}`;
                if (zoneId) params += `&zoneId=${zoneId}`;
                const res = await fetch(`/api/employee-progress${params}`);
                const data = await res.json();
                const epData = data?.data ? data.data : Array.isArray(data) ? data : [];
                set({
                    employeeProgress: epData
                });
            } catch (error) {
                console.error('Error fetching employee progress:', error);
            }
        },
        selectSStep: (s)=>{
            if (s === null) {
                set({
                    selectedSStep: null
                });
            } else {
                set({
                    selectedSStep: s
                });
            }
        },
        setCurrentView: (view)=>set({
                currentView: view
            }),
        setActiveTab: (tab)=>set({
                activeTab: tab
            }),
        openModal: (type, miniStep)=>set({
                activeModal: type,
                activeMiniStep: miniStep
            }),
        closeModal: ()=>set({
                activeModal: null,
                activeMiniStep: null
            }),
        setAdminFreeNavigation: (enabled)=>set({
                adminFreeNavigation: enabled
            }),
        setCurrentZone: (zone)=>{
            set({
                currentZone: zone
            });
            // Also fetch employee progress when zone changes
            const { currentProject } = get();
            if (currentProject && zone) {
                get().fetchEmployeeProgress(currentProject.id, zone.id);
            }
        },
        fetchUserZones: async ()=>{
            try {
                const res = await fetch('/api/auth/zones');
                const data = await res.json();
                const zones = data.zones || [];
                set({
                    userZones: zones
                });
                // Auto-select zone if user has zones but none selected yet
                const { currentUser, currentZone, currentProject } = get();
                if (zones.length >= 1 && !currentZone) {
                    const z = zones[0];
                    // Find matching zone in current project
                    const projectZone = currentProject?.zones.find((pz)=>pz.id === z.id) || {
                        id: z.id,
                        name: z.name,
                        description: z.description,
                        color: z.color,
                        projectId: z.projectId,
                        responsableId: z.responsableId,
                        boardConfigId: z.boardConfigId || null
                    };
                    set({
                        currentZone: projectZone
                    });
                    if (currentProject) {
                        get().fetchEmployeeProgress(currentProject.id, z.id);
                    }
                }
                return zones;
            } catch (error) {
                console.error('Error fetching user zones:', error);
                return [];
            }
        },
        getAvailableZones: ()=>{
            const { currentUser, currentProject, userZones, permissions } = get();
            if (!currentProject) return [];
            // Direct permission check (avoid circular get().hasPermission during store init)
            const checkPerm = (perm)=>{
                if (!currentUser) return false;
                const rolePerms = permissions[currentUser.role];
                return rolePerms?.[perm] === true;
            };
            // Users with manage_zones permission can see all project zones
            if (checkPerm('manage_zones')) {
                return currentProject.zones;
            }
            // Users with view_board: show assigned zones or all if none assigned
            if (checkPerm('view_board')) {
                const userZoneIds = userZones.map((uz)=>uz.id);
                const assignedZones = currentProject.zones.filter((z)=>userZoneIds.includes(z.id));
                if (assignedZones.length === 0) {
                    return currentProject.zones;
                }
                return assignedZones;
            }
            // Fallback: only assigned zones
            const userZoneIds = userZones.map((uz)=>uz.id);
            return currentProject.zones.filter((z)=>userZoneIds.includes(z.id));
        },
        seedDatabase: async ()=>{
            try {
                await fetch('/api/seed', {
                    method: 'POST'
                });
                await get().fetchProgress();
            } catch (error) {
                console.error('Error seeding database:', error);
            }
        },
        // ═══════════════════════════════════════════════════════
        // PERMISSION SYSTEM — Single source of truth
        // ═══════════════════════════════════════════════════════
        fetchPermissions: async ()=>{
            try {
                const res = await fetch('/api/permissions');
                const data = await res.json();
                if (data.permissions) {
                    set({
                        permissions: data.permissions
                    });
                }
            } catch (error) {
                console.error('Error fetching permissions:', error);
            }
        },
        hasPermission: (permission)=>{
            const { currentUser, permissions } = get();
            if (!currentUser) return false;
            // Permission-driven: check rolePermissionConfig from DB (NO admin bypass)
            const rolePerms = permissions[currentUser.role];
            if (!rolePerms) return false;
            return rolePerms[permission] === true;
        },
        canPerform: (sStep, miniStep)=>{
            // Check a1 (execute/perform) permission for a specific sStep + miniStep
            return get().hasPermission(`s${sStep}_step${miniStep}_a1`);
        },
        canView: (sStep, miniStep)=>{
            // Check a0 (view) permission for a specific sStep + miniStep
            return get().hasPermission(`s${sStep}_step${miniStep}_a0`);
        },
        // ═══════════════════════════════════════════════════════
        // getMiniStepStatus — Permission-Driven with Business Rules
        // Permissions are the source of truth for WHO can do WHAT.
        // Business rules define WHEN things are accessible:
        //   - INTER-S progression: S2 requires S1 completed, S3 requires S2, etc.
        //   - INTRA-S progression: step N requires step N-1 completed
        //   - Step 5 (audit): requires steps 1-4 ALL completed within the same S
        //   - a1 (perform) → can enter and act (if previous step done)
        //   - a0 (view) only → can see the step exists, but CANNOT enter it
        //   - No permission → locked (not even visible)
        //   - IMPORTANT: Previous step completion is checked at ZONE level,
        //     so an auditor can access step 5 if employees completed 1-4
        //   - For step 1 (individual): also checks EmployeeProgress for the
        //     current user, so the employee's own completion unlocks step 2
        // ═══════════════════════════════════════════════════════
        getMiniStepStatus: (sStep, miniStep)=>{
            const { progress, employeeProgress, currentUser, adminFreeNavigation, currentZone } = get();
            if (!currentUser) return 'locked';
            const canViewStep = get().canView(sStep, miniStep);
            const canPerformStep = get().canPerform(sStep, miniStep);
            // Permission-driven: skip_steps from DB replaces hardcoded isAdmin check
            const canSkipSteps = get().hasPermission('skip_steps');
            const skipLocks = canSkipSteps && adminFreeNavigation;
            // Check if a specific mini-step of a specific S is completed at zone level
            const isStepCompletedAt = (s, ms)=>{
                if (currentZone) {
                    const zoneStep = progress.find((p)=>p.sStep === s && p.miniStep === ms && (p.zoneId === currentZone.id || p.zoneId === null) && p.completed);
                    return !!zoneStep;
                }
                const anyStep = progress.find((p)=>p.sStep === s && p.miniStep === ms && p.completed);
                return !!anyStep;
            };
            // Check if a specific S-step (all 5 mini-steps) is fully completed (quesito earned)
            // Also checks employeeProgress for individual steps, consistent with areSteps1to4Completed
            const isSCompleted = (s)=>{
                for(let ms = 1; ms <= 5; ms++){
                    // Check zone-level progress first
                    if (isStepCompletedAt(s, ms)) continue;
                    // Also check employeeProgress for this step (e.g., individual formación step 1)
                    const anyEmpCompleted = currentZone ? employeeProgress.some((ep)=>ep.sStep === s && ep.miniStep === ms && ep.zoneId === currentZone.id && ep.completed) : employeeProgress.some((ep)=>ep.sStep === s && ep.miniStep === ms && ep.completed);
                    if (!anyEmpCompleted) return false;
                }
                return true;
            };
            // Check if the CURRENT USER has completed step 1 individually (EmployeeProgress)
            // This is crucial for unlocking step 2 for an employee who passed the exam
            // even if not ALL employees in the zone have completed it yet
            const hasUserCompletedStep1 = ()=>{
                if (!currentZone) return false;
                const userStep = employeeProgress.find((ep)=>ep.sStep === sStep && ep.miniStep === 1 && ep.zoneId === currentZone.id && ep.userId === currentUser.id && ep.completed);
                return !!userStep;
            };
            // Check if already completed at zone level (or project level if no zone)
            const isStepCompleted = ()=>isStepCompletedAt(sStep, miniStep);
            // Check if the CURRENT USER has completed this individual step (EmployeeProgress)
            // For step 1 (formación) and step 4 (autoevaluación), completion is tracked per employee
            const hasUserCompletedIndividualStep = ()=>{
                if (!currentZone) return false;
                if (miniStep !== 1 && miniStep !== 4) return false // Only individual steps
                ;
                const userStep = employeeProgress.find((ep)=>ep.sStep === sStep && ep.miniStep === miniStep && ep.zoneId === currentZone.id && ep.userId === currentUser.id && ep.completed);
                return !!userStep;
            };
            // Combined: step is "done" if either zone-level completed OR user completed individually
            const isStepDoneForUser = ()=>isStepCompleted() || hasUserCompletedIndividualStep();
            // Check if step is completed by ANYONE (zone or any employee)
            // This is crucial: ALL users must see completed steps in green,
            // even if they don't have permission to enter them (e.g., auditors viewing steps 1-4)
            const isStepCompletedByAnyone = ()=>{
                if (isStepCompleted()) return true;
                if (!currentZone) {
                    return employeeProgress.some((ep)=>ep.sStep === sStep && ep.miniStep === miniStep && ep.completed);
                }
                return employeeProgress.some((ep)=>ep.sStep === sStep && ep.miniStep === miniStep && ep.zoneId === currentZone.id && ep.completed);
            };
            // Helper: check if steps 1-4 are all completed for this S-step
            // Uses BOTH zone-level progress AND any employee progress,
            // so auditors can access step 5 when employees have completed 1-4
            const areSteps1to4Completed = ()=>{
                for(let ms = 1; ms <= 4; ms++){
                    const zoneCompleted = isStepCompletedAt(sStep, ms);
                    if (zoneCompleted) continue;
                    // Check if ANY employee has completed this step individually
                    const anyEmpCompleted = currentZone ? employeeProgress.some((ep)=>ep.sStep === sStep && ep.miniStep === ms && ep.zoneId === currentZone.id && ep.completed) : employeeProgress.some((ep)=>ep.sStep === sStep && ep.miniStep === ms && ep.completed);
                    if (!anyEmpCompleted) return false;
                }
                return true;
            };
            // ═══ INTER-S PROGRESSION CHECK ═══
            // S1 is always available. S2 requires S1 completed. S3 requires S2. Etc.
            // This enforces the 5S methodology sequence: Clasificar → Ordenar → Limpiar → Estandarizar → Mantener
            const isPreviousSCompleted = ()=>{
                if (sStep === 1) return true // S1 has no prerequisite
                ;
                return isSCompleted(sStep - 1);
            };
            // ═══ INTRA-S PROGRESSION CHECK ═══
            // Step 1: always available (if you have permission AND previous S is done)
            // Steps 2-4: need the immediately previous step completed
            // Step 5: needs ALL steps 1-4 completed
            // IMPORTANT: Completion checks include BOTH zone-level AND any employee progress,
            // so auditors/responsables can see steps as available when employees completed them
            const isPreviousStepCompleted = ()=>{
                if (miniStep === 1) return true;
                if (miniStep === 5) return areSteps1to4Completed();
                // Steps 2, 3, 4: need previous step completed at zone level
                if (isStepCompletedAt(sStep, miniStep - 1)) return true;
                // For step 2: current user completed step 1 individually (exam passed)
                if (miniStep === 2 && hasUserCompletedStep1()) return true;
                // Also check: ANY employee completed previous step (for auditors/responsables)
                const anyEmpCompletedPrev = currentZone ? employeeProgress.some((ep)=>ep.sStep === sStep && ep.miniStep === miniStep - 1 && ep.zoneId === currentZone.id && ep.completed) : employeeProgress.some((ep)=>ep.sStep === sStep && ep.miniStep === miniStep - 1 && ep.completed);
                if (anyEmpCompletedPrev) return true;
                return false;
            };
            // ── If already completed (zone-level OR user's individual), VERIFY COHERENCY ──
            if (isStepDoneForUser()) {
                const isChainCoherent = ()=>{
                    // First check inter-S: previous S must be completed
                    if (!isPreviousSCompleted()) return false;
                    // Then check intra-S chain — reuse same logic as isPreviousStepCompleted
                    if (miniStep === 1) return true // Step 1 is always coherent if previous S is done
                    ;
                    if (miniStep === 5) return areSteps1to4Completed();
                    if (isStepCompletedAt(sStep, miniStep - 1)) return true;
                    if (miniStep === 2 && hasUserCompletedStep1()) return true;
                    // Also check any employee completed previous step
                    const anyEmpPrev = currentZone ? employeeProgress.some((ep)=>ep.sStep === sStep && ep.miniStep === miniStep - 1 && ep.zoneId === currentZone.id && ep.completed) : employeeProgress.some((ep)=>ep.sStep === sStep && ep.miniStep === miniStep - 1 && ep.completed);
                    if (anyEmpPrev) return true;
                    return false;
                };
                if (isChainCoherent()) {
                    if (canPerformStep || canSkipSteps) return 'completed';
                    if (canViewStep) return 'completed_viewonly';
                    return 'locked';
                }
            // Chain is incoherent: treat as NOT completed — fall through
            }
            // ── Step completed by ANYONE (zone or employee) → show as green for ALL users ──
            // Even users without permission must see completed steps in green
            if (isStepCompletedByAnyone()) {
                if (canPerformStep || canSkipSteps) return 'completed';
                // Everyone else sees it as completed_viewonly (green, read-only)
                return 'completed_viewonly';
            }
            // ── Admin with lock open: skip all checks ──
            if (skipLocks) return 'available';
            // ── No permission at all = locked ──
            if (!canViewStep && !canPerformStep) return 'locked';
            // ── Has perform permission (a1) → check progression ──
            if (canPerformStep) {
                // INTER-S: can't start this S until previous S is completed
                if (!isPreviousSCompleted()) return 'locked';
                // INTRA-S: can't enter step until previous step is completed
                if (!isPreviousStepCompleted()) return 'locked';
                return 'available';
            }
            // ── Has view permission only (a0) → can see but CANNOT enter ──
            if (canViewStep) return 'locked';
            return 'locked';
        },
        isZoneMiniStepComplete: (sStep, miniStep, zoneId)=>{
            const { progress, employeeProgress, currentProject } = get();
            if (!currentProject) return false;
            if (ZONE_MINI_STEPS.includes(miniStep)) {
                // Zone step: check if the zone's Progress record is completed
                const zoneStep = progress.find((p)=>p.sStep === sStep && p.miniStep === miniStep && p.zoneId === zoneId);
                return zoneStep?.completed ?? false;
            }
            if (INDIVIDUAL_MINI_STEPS.includes(miniStep)) {
                // Individual step (1 only): ALL employees in the zone must have completed
                // The zone-level Progress record for step 1 is only marked completed when ALL employees pass
                const zoneStep = progress.find((p)=>p.sStep === sStep && p.miniStep === miniStep && (p.zoneId === zoneId || p.zoneId === null) && p.completed);
                return !!zoneStep;
            }
            return false;
        },
        isQuesitoEarned: (sStep)=>{
            const { progress, employeeProgress, currentZone } = get();
            const zoneId = currentZone?.id || null;
            // Check ALL 5 mini-steps are completed — each one individually
            // For zone-level steps (2,3,5): check progress table
            // For individual steps (1,4): also check employeeProgress as fallback
            for(let miniStep = 1; miniStep <= 5; miniStep++){
                // Check zone-level progress first
                const zoneStep = progress.find((p)=>p.sStep === sStep && p.miniStep === miniStep && (p.zoneId === zoneId || p.zoneId === null) && p.completed);
                if (zoneStep) continue;
                // Also check employeeProgress for this step (e.g., individual formación step 1)
                // This ensures the quesito is earned even when not all employees have completed step 1,
                // but the auditor was able to pass step 5 (audit) because areSteps1to4Completed returned true
                const anyEmpCompleted = currentZone ? employeeProgress.some((ep)=>ep.sStep === sStep && ep.miniStep === miniStep && ep.zoneId === currentZone.id && ep.completed) : employeeProgress.some((ep)=>ep.sStep === sStep && ep.miniStep === miniStep && ep.completed);
                if (anyEmpCompleted) continue;
                return false;
            }
            return true;
        },
        is5SCompleted: ()=>{
            for(let i = 1; i <= 5; i++){
                if (!get().isQuesitoEarned(i)) return false;
            }
            return true;
        },
        getCompletedCount: ()=>{
            const { progress, currentZone } = get();
            if (currentZone) {
                const completedMiniSteps = progress.filter((p)=>(p.zoneId === currentZone.id || p.zoneId === null) && p.completed).length;
                let completedSSteps = 0;
                for(let i = 1; i <= 5; i++){
                    if (get().isQuesitoEarned(i)) completedSSteps++;
                }
                return {
                    sSteps: completedSSteps,
                    miniSteps: completedMiniSteps,
                    total: 25
                };
            }
            const completedMiniSteps = progress.filter((p)=>p.completed).length;
            let completedSSteps = 0;
            for(let i = 1; i <= 5; i++){
                if (get().isQuesitoEarned(i)) completedSSteps++;
            }
            return {
                sSteps: completedSSteps,
                miniSteps: completedMiniSteps,
                total: 25
            };
        },
        // Auth & Project Actions
        login: async (email, password)=>{
            try {
                set({
                    isLoginLoading: true,
                    authError: null
                });
                const res = await fetch('/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                });
                const data = await res.json();
                if (!res.ok) {
                    const errorMsg = data.error || 'Email o contraseña incorrectos';
                    set({
                        isLoginLoading: false,
                        authError: errorMsg
                    });
                    return false;
                }
                if (!data.user) {
                    set({
                        isLoginLoading: false,
                        authError: 'Error inesperado al iniciar sesión'
                    });
                    return false;
                }
                set({
                    currentUser: data.user,
                    isLoginLoading: false,
                    authError: null
                });
                // Load permissions after login
                try {
                    await get().fetchPermissions();
                } catch (e) {
                    console.error('Error loading permissions after login:', e);
                }
                // Gestor (dueño de la app) goes directly to management panel
                if (data.user.role === 'gestor') {
                    set({
                        authView: 'board',
                        activeTab: 'gestion'
                    });
                    try {
                        await get().fetchCompanies();
                    } catch (e) {
                        console.error('Error fetching companies after login:', e);
                    }
                    return true;
                }
                // Check for projects after login
                try {
                    await get().fetchProjects();
                } catch (e) {
                    console.error('Error fetching projects after login:', e);
                }
                const { projects } = get();
                if (projects.length > 0) {
                    set({
                        currentProject: projects[0],
                        authView: 'board'
                    });
                    // Fetch user's assigned zones after login
                    try {
                        await get().fetchUserZones();
                    } catch (e) {
                        console.error('Error fetching user zones after login:', e);
                    }
                } else {
                    // Only admin can create projects via setup wizard
                    // Non-admin users see a waiting screen
                    if (data.user.role === 'admin') {
                        set({
                            authView: 'setup'
                        });
                    } else {
                        set({
                            authView: 'no_projects'
                        });
                    }
                }
                return true;
            } catch (error) {
                console.error('Login error:', error);
                set({
                    isLoginLoading: false,
                    authError: 'Error de conexión. Inténtalo de nuevo.'
                });
                return false;
            }
        },
        register: async (name, email, password, role)=>{
            try {
                set({
                    isLoginLoading: true,
                    authError: null
                });
                const res = await fetch('/api/auth', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        role
                    })
                });
                const data = await res.json();
                if (!res.ok) {
                    const errorMsg = data.error || 'Error al crear cuenta';
                    set({
                        isLoginLoading: false,
                        authError: errorMsg
                    });
                    return false;
                }
                set({
                    currentUser: data.user,
                    isLoginLoading: false,
                    authError: null
                });
                // Load permissions after registration
                await get().fetchPermissions();
                // Check for projects after registration
                await get().fetchProjects();
                const { projects } = get();
                if (projects.length > 0) {
                    set({
                        currentProject: projects[0],
                        authView: 'board'
                    });
                } else {
                    // Self-registered users are always 'empleado' — they need admin to assign a project
                    set({
                        authView: 'no_projects'
                    });
                }
                return true;
            } catch (error) {
                console.error('Registration error:', error);
                set({
                    isLoginLoading: false,
                    authError: 'Error de conexión. Inténtalo de nuevo.'
                });
                return false;
            }
        },
        logout: async ()=>{
            try {
                await fetch('/api/auth', {
                    method: 'DELETE'
                });
            } catch (error) {
                console.error('Logout error:', error);
            }
            set({
                currentUser: null,
                currentProject: null,
                currentZone: null,
                userZones: [],
                authView: 'login',
                projects: [],
                companies: [],
                isLoginLoading: false,
                authError: null,
                permissions: {}
            });
        },
        checkSession: async ()=>{
            try {
                set({
                    isAuthLoading: true
                });
                const res = await fetch('/api/auth');
                const data = await res.json();
                if (data.user) {
                    set({
                        currentUser: data.user
                    });
                    // Load permissions after session restore
                    await get().fetchPermissions();
                    // Gestor (dueño de la app) goes directly to management panel
                    if (data.user.role === 'gestor') {
                        set({
                            authView: 'board',
                            activeTab: 'gestion'
                        });
                        await get().fetchCompanies();
                        set({
                            isAuthLoading: false
                        });
                        return;
                    }
                    await get().fetchProjects();
                    const { projects } = get();
                    if (projects.length > 0) {
                        set({
                            currentProject: projects[0],
                            authView: 'board'
                        });
                        // Fetch user's assigned zones after session restore
                        await get().fetchUserZones();
                    } else {
                        // Only admin can create projects via setup wizard
                        const { currentUser } = get();
                        if (currentUser?.role === 'admin') {
                            set({
                                authView: 'setup'
                            });
                        } else {
                            set({
                                authView: 'no_projects'
                            });
                        }
                    }
                } else {
                    set({
                        authView: 'login'
                    });
                }
            } catch (error) {
                console.error('Session check error:', error);
                set({
                    authView: 'login'
                });
            } finally{
                set({
                    isAuthLoading: false
                });
            }
        },
        fetchProjects: async ()=>{
            try {
                const res = await fetch('/api/projects');
                const data = await res.json();
                set({
                    projects: data.projects || []
                });
            } catch (error) {
                console.error('Fetch projects error:', error);
            }
        },
        fetchCompanies: async ()=>{
            try {
                const res = await fetch('/api/companies');
                const data = await res.json();
                if (data.success) {
                    set({
                        companies: data.companies || []
                    });
                }
            } catch (error) {
                console.error('Fetch companies error:', error);
            }
        },
        createProject: async (data)=>{
            try {
                const res = await fetch('/api/projects', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await res.json();
                if (res.ok && result.project) {
                    // Add the current user as admin member of the project
                    const { currentUser } = get();
                    if (currentUser) {
                        try {
                            await fetch(`/api/projects/${result.project.id}/members`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    email: currentUser.email,
                                    name: currentUser.name,
                                    role: 'admin',
                                    zoneIds: result.project.zones?.map((z)=>z.id) || []
                                })
                            });
                        } catch (memberError) {
                            console.error('Error adding admin as member:', memberError);
                        // Don't block project creation if member add fails
                        }
                    }
                    set({
                        currentProject: result.project,
                        authView: 'board'
                    });
                    await get().fetchProjects();
                } else {
                    console.error('Create project error:', result.error);
                }
            } catch (error) {
                console.error('Create project error:', error);
            }
        },
        setCurrentProject: (project)=>{
            set({
                currentProject: project
            });
            if (project) {
                set({
                    authView: 'board'
                });
            }
        },
        setAuthView: (view)=>set({
                authView: view,
                authError: null
            }),
        clearAuthError: ()=>set({
                authError: null
            })
    }));
}),
"[project]/src/lib/5s-constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTION_PLAN_MIN_ITEMS",
    ()=>ACTION_PLAN_MIN_ITEMS,
    "AUDIT_CHECKLISTS",
    ()=>AUDIT_CHECKLISTS,
    "AUDIT_PASS_THRESHOLD",
    ()=>AUDIT_PASS_THRESHOLD,
    "AUDIT_TOTAL_ITEMS",
    ()=>AUDIT_TOTAL_ITEMS,
    "EXAM_PASS_THRESHOLD",
    ()=>EXAM_PASS_THRESHOLD,
    "INVENTORY_CLASSIFY_THRESHOLD",
    ()=>INVENTORY_CLASSIFY_THRESHOLD,
    "INVENTORY_CONFIGS",
    ()=>INVENTORY_CONFIGS,
    "MC_PASO_CONFIG",
    ()=>MC_PASO_CONFIG,
    "MC_SECTIONS",
    ()=>MC_SECTIONS,
    "MC_STEP_CONFIG",
    ()=>MC_STEP_CONFIG,
    "MINI_STEPS",
    ()=>MINI_STEPS,
    "MIN_PHOTOS",
    ()=>MIN_PHOTOS,
    "MONTHLY_AUDIT_CHECKLIST",
    ()=>MONTHLY_AUDIT_CHECKLIST,
    "MONTHLY_AUDIT_TOTAL_ITEMS",
    ()=>MONTHLY_AUDIT_TOTAL_ITEMS,
    "PDCA_STEPS",
    ()=>PDCA_STEPS,
    "PDCA_TEMPLATES",
    ()=>PDCA_TEMPLATES,
    "QUARTERLY_AUDIT_CHECKLIST",
    ()=>QUARTERLY_AUDIT_CHECKLIST,
    "QUARTERLY_AUDIT_TOTAL_ITEMS",
    ()=>QUARTERLY_AUDIT_TOTAL_ITEMS,
    "SELF_EVAL_THRESHOLD",
    ()=>SELF_EVAL_THRESHOLD,
    "S_STEPS",
    ()=>S_STEPS,
    "WEEKLY_AUDIT_CHECKLIST",
    ()=>WEEKLY_AUDIT_CHECKLIST,
    "WEEKLY_AUDIT_TOTAL_ITEMS",
    ()=>WEEKLY_AUDIT_TOTAL_ITEMS,
    "getAuditTotalItems",
    ()=>getAuditTotalItems
]);
const S_STEPS = [
    {
        id: 1,
        name: 'REVISAR',
        japaneseName: 'Seiri',
        spanishName: 'Clasificar',
        color: '#8B5CF6',
        bgColor: '#EDE9FE',
        description: 'Clasificar y separar los elementos necesarios de los innecesarios en el lugar de trabajo.'
    },
    {
        id: 2,
        name: 'ORDENAR',
        japaneseName: 'Seiton',
        spanishName: 'Organizar',
        color: '#EAB308',
        bgColor: '#FEF9C3',
        description: 'Organizar los elementos necesarios de manera que sean fáciles de encontrar, usar y devolver.'
    },
    {
        id: 3,
        name: 'LIMPIAR',
        japaneseName: 'Seiso',
        spanishName: 'Limpiar',
        color: '#3B82F6',
        bgColor: '#DBEAFE',
        description: 'Limpiar el lugar de trabajo identificando y eliminando las fuentes de suciedad.'
    },
    {
        id: 4,
        name: 'ESTANDARIZAR',
        japaneseName: 'Seiketsu',
        spanishName: 'Estandarizar',
        color: '#F43F5E',
        bgColor: '#FFE4E6',
        description: 'Crear estándares y normas que mantengan los logros de las 3S anteriores.'
    },
    {
        id: 5,
        name: 'MANTENER',
        japaneseName: 'Shitsuke',
        spanishName: 'Disciplina',
        color: '#F97316',
        bgColor: '#FFEDD5',
        description: 'Crear el hábito de respetar los estándares establecidos mediante disciplina y compromiso.'
    }
];
const PDCA_STEPS = [
    {
        id: 1,
        letter: 'D',
        name: 'Do',
        spanishName: 'Hacer',
        color: '#2563EB',
        bgColor: '#DBEAFE',
        icon: 'Play',
        description: 'Ejecutar las acciones planificadas. Implementar las mejoras identificadas y llevar a cabo las actividades del plan de acción.'
    },
    {
        id: 2,
        letter: 'P',
        name: 'Plan',
        spanishName: 'Planificar',
        color: '#7C3AED',
        bgColor: '#EDE9FE',
        icon: 'ClipboardList',
        description: 'Planificar las mejoras. Identificar oportunidades de mejora, establecer objetivos, definir acciones y asignar responsables.'
    },
    {
        id: 3,
        letter: 'C',
        name: 'Check',
        spanishName: 'Verificar',
        color: '#059669',
        bgColor: '#D1FAE5',
        icon: 'SearchCheck',
        description: 'Verificar los resultados. Comparar los resultados obtenidos con los objetivos planificados mediante indicadores y auditorías.'
    },
    {
        id: 4,
        letter: 'A',
        name: 'Act',
        spanishName: 'Actuar',
        color: '#DC2626',
        bgColor: '#FEE2E2',
        icon: 'Rocket',
        description: 'Actuar sobre las diferencias. Estandarizar los éxitos, corregir las desviaciones y comenzar un nuevo ciclo de mejora.'
    }
];
const PDCA_TEMPLATES = {
    pdca_board: {
        name: 'Tablero PDCA',
        description: 'Tablero visual del ciclo de Deming para seguimiento de mejoras',
        applyTo: [
            1,
            2,
            3,
            4
        ]
    },
    plan_accion: {
        name: 'Plan de Acción',
        description: 'Plan de acción con responsables, plazos y seguimiento',
        applyTo: [
            1,
            2
        ]
    },
    realizacion_estandar: {
        name: 'B - Realización de Estándar',
        description: 'Plantilla para la realización y documentación de estándares',
        applyTo: [
            2,
            4
        ]
    },
    kpi: {
        name: 'KPIs de Mejora',
        description: 'Indicadores clave de rendimiento para medir la mejora continua',
        applyTo: [
            2,
            3
        ]
    }
};
const MC_SECTIONS = [
    {
        id: 1,
        key: 'objetivos',
        name: 'Objetivos',
        icon: 'Target',
        description: 'Define los objetivos de mejora continua para el proyecto. Establece metas medibles y plazos.'
    }
];
const MC_STEP_CONFIG = {
    id: 6,
    name: 'MEJORA CONTINUA',
    japaneseName: 'Kaizen',
    spanishName: 'Mejora Continua',
    color: '#16A34A',
    bgColor: '#DCFCE7',
    description: 'Fase 6 — Ciclo de Deming (D-P-C-A): Do, Plan, Check, Act. Mejora continua mediante auditorías periódicas, plan de acción y KPIs.'
};
const MC_PASO_CONFIG = [
    {
        paso: 1,
        label: 'Do — Hacer',
        key: 'do',
        icon: 'Play',
        types: [
            'pdca',
            'plan_accion'
        ]
    },
    {
        paso: 2,
        label: 'Plan — Planificar',
        key: 'plan',
        icon: 'ClipboardList',
        types: [
            'pdca',
            'plan_accion',
            'estandar'
        ]
    },
    {
        paso: 3,
        label: 'Check — Verificar',
        key: 'check',
        icon: 'SearchCheck',
        types: [
            'pdca',
            'kpi'
        ]
    },
    {
        paso: 4,
        label: 'Act — Actuar',
        key: 'act',
        icon: 'Rocket',
        types: [
            'pdca',
            'estandar'
        ]
    },
    {
        paso: 5,
        label: 'Objetivos',
        key: 'objetivos',
        icon: 'Target',
        types: [
            'kpi'
        ]
    }
];
const MINI_STEPS = [
    {
        id: 1,
        name: 'Formación + Examen',
        icon: 'GraduationCap',
        description: 'Completa la formación y aprueba el examen (mínimo 80%)'
    },
    {
        id: 2,
        name: 'Fotografías (Antes)',
        icon: 'Camera',
        description: 'Toma fotografías de las zonas para documentar el estado actual antes de actuar',
        descriptionByS: {
            1: 'Fotografía la zona para ver qué elementos innecesarios hay antes de clasificar',
            2: 'Fotografía la zona para ver cómo está organizada antes de reordenar',
            3: 'Fotografía la zona para documentar los puntos de suciedad antes de limpiar',
            4: 'Fotografía la zona para documentar el estado actual antes de estandarizar',
            5: 'Fotografía la zona para documentar el nivel de cumplimiento de los estándares'
        }
    },
    {
        id: 3,
        name: 'Inventario',
        icon: 'ClipboardList',
        description: 'Registra los elementos correspondientes a esta S',
        descriptionByS: {
            1: 'Inventaria SOLO los elementos innecesarios. Incluye ubicación, cantidad, precio (€), estado y decisión (Jaula, Tirar o Eliminar)',
            2: 'Inventaria SOLO los elementos necesarios: ubicación, frecuencia de uso, cercanía y método de identificación',
            3: 'Inventaria los puntos de suciedad: tipo, nivel, fuente y método de limpieza',
            4: 'Inventaria los estándares implantados: tipo, estado, documentación y cumplimiento. Incluye la Biblioteca de Estándares',
            5: 'Plan de Acción: Define las acciones a realizar para mantener la disciplina y mejora continua'
        }
    },
    {
        id: 4,
        name: 'Autoevaluación (Interna)',
        icon: 'CheckSquare',
        description: 'Checklist de verificación interna con el mismo formato que la auditoría',
        descriptionByS: {
            1: 'Verifica internamente la clasificación de elementos mediante checklist',
            2: 'Verifica internamente la organización y señalización mediante checklist',
            3: 'Verifica internamente la limpieza y mantenimiento mediante checklist',
            4: 'Verifica internamente la estandarización e indicadores mediante checklist',
            5: 'Verifica internamente la disciplina y gestión de anomalías mediante checklist'
        }
    },
    {
        id: 5,
        name: 'Auditoría Externa',
        icon: 'ShieldCheck',
        description: 'Validación por un auditor externo con el mismo checklist',
        descriptionByS: {
            1: 'Auditoría externa de la S1: Clasificación de innecesarios',
            2: 'Auditoría externa de la S2: Organización y ubicación',
            3: 'Auditoría externa de la S3: Limpieza y mantenimiento',
            4: 'Auditoría externa de la S4: Estandarización e indicadores',
            5: 'Auditoría externa de la S5: Disciplina y mejora continua'
        }
    }
];
const INVENTORY_CONFIGS = {
    1: {
        title: 'Inventario de Innecesarios (Clasificación)',
        subtitle: 'SEIRI — Clasifica los elementos innecesarios y decide su destino (Jaula/Tirar/Eliminar)',
        categories: [
            {
                value: 'innecesario',
                label: 'Innecesario',
                color: 'bg-red-100 text-red-800'
            }
        ],
        extraFields: [
            // === Campos de Innecesario (rojo) ===
            {
                key: 'estado',
                label: 'Estado',
                type: 'select',
                options: [
                    'Bueno',
                    'Regular',
                    'Malo'
                ]
            },
            {
                key: 'frecuenciaUso',
                label: 'Frecuencia uso',
                type: 'select',
                options: [
                    'Diario',
                    'Semanal',
                    'Quincenal',
                    'Mensual',
                    'Trimestral',
                    'Anual',
                    'Nunca'
                ]
            },
            {
                key: 'decision',
                label: 'Decisión',
                type: 'select',
                options: [
                    'Jaula',
                    'Tirar',
                    'Eliminar'
                ]
            },
            // === Datos de Etiqueta (naranja) ===
            {
                key: 'diasCuarentena',
                label: 'Días cuarentena',
                type: 'select',
                options: [
                    '7',
                    '15',
                    '20',
                    '30',
                    '40',
                    '60',
                    '90'
                ]
            }
        ],
        templateName: 'S1_Inventario_Innecesarios_Seiri.xlsx'
    },
    2: {
        title: 'Inventario de Necesarios',
        subtitle: 'SEITON — Organiza los elementos necesarios en su ubicación correcta',
        categories: [
            {
                value: 'muy_frecuente',
                label: 'Muy frecuente',
                color: 'bg-green-100 text-green-800'
            },
            {
                value: 'frecuente',
                label: 'Frecuente',
                color: 'bg-blue-100 text-blue-800'
            },
            {
                value: 'ocasional',
                label: 'Ocasional',
                color: 'bg-yellow-100 text-yellow-800'
            },
            {
                value: 'raro',
                label: 'Raro',
                color: 'bg-red-100 text-red-800'
            }
        ],
        extraFields: [
            {
                key: 'ubicacionAsignada',
                label: 'Ubicación asignada',
                type: 'text'
            },
            {
                key: 'metodoIdentificacion',
                label: 'Método identificación',
                type: 'select',
                options: [
                    'Etiqueta',
                    'Código color',
                    'Señal visual',
                    'Sombra/Contorno',
                    'Código numérico',
                    'Otro'
                ]
            },
            {
                key: 'cercania',
                label: 'Cercanía al puesto',
                type: 'select',
                options: [
                    'Muy cerca (brazo)',
                    'Cerca (1-3 pasos)',
                    'Media distancia',
                    'Poco accesible'
                ]
            }
        ],
        templateName: 'S2_Inventario_Necesarios_Seiton.xlsx'
    },
    3: {
        title: 'Inventario de Puntos de Suciedad',
        subtitle: 'SEISO — Identifica y registra los puntos de suciedad de la zona',
        categories: [
            {
                value: 'polvo',
                label: 'Polvo',
                color: 'bg-gray-100 text-gray-800'
            },
            {
                value: 'grasa',
                label: 'Grasa',
                color: 'bg-yellow-100 text-yellow-800'
            },
            {
                value: 'mancha',
                label: 'Mancha',
                color: 'bg-orange-100 text-orange-800'
            },
            {
                value: 'residuos',
                label: 'Residuos',
                color: 'bg-red-100 text-red-800'
            },
            {
                value: 'humedad',
                label: 'Humedad',
                color: 'bg-blue-100 text-blue-800'
            },
            {
                value: 'oxidacion',
                label: 'Oxidación',
                color: 'bg-amber-100 text-amber-800'
            },
            {
                value: 'otro',
                label: 'Otro',
                color: 'bg-purple-100 text-purple-800'
            }
        ],
        extraFields: [
            {
                key: 'nivel',
                label: 'Nivel',
                type: 'select',
                options: [
                    'Leve',
                    'Moderado',
                    'Grave'
                ]
            },
            {
                key: 'fuente',
                label: 'Fuente de suciedad',
                type: 'select',
                options: [
                    'Proceso productivo',
                    'Medio ambiente',
                    'Falta de limpieza',
                    'Escape/Fuga',
                    'Desgaste',
                    'Derrame',
                    'Otro'
                ]
            },
            {
                key: 'metodoLimpieza',
                label: 'Método limpieza',
                type: 'select',
                options: [
                    'Aspirado',
                    'Fregado',
                    'Pulido',
                    'Desinfección',
                    'Reparación',
                    'Otro'
                ]
            },
            {
                key: 'frecuenciaLimpieza',
                label: 'Frecuencia limpieza',
                type: 'select',
                options: [
                    'Diaria',
                    '3 veces/semana',
                    'Semanal',
                    'Quincenal',
                    'Mensual'
                ]
            }
        ],
        templateName: 'S3_Inventario_Puntos_Suciedad_Seiso.xlsx'
    },
    4: {
        title: 'Inventario de Estándares Implantados',
        subtitle: 'SEIKETSU — Registra los estándares y su estado de implantación',
        categories: [
            {
                value: 'visual',
                label: 'Visual',
                color: 'bg-blue-100 text-blue-800'
            },
            {
                value: 'procedimiento',
                label: 'Procedimiento',
                color: 'bg-green-100 text-green-800'
            },
            {
                value: 'checklist',
                label: 'Checklist',
                color: 'bg-purple-100 text-purple-800'
            },
            {
                value: 'senalizacion',
                label: 'Señalización',
                color: 'bg-yellow-100 text-yellow-800'
            },
            {
                value: 'diagrama',
                label: 'Diagrama flujo',
                color: 'bg-cyan-100 text-cyan-800'
            },
            {
                value: 'registro',
                label: 'Registro',
                color: 'bg-gray-100 text-gray-800'
            },
            {
                value: 'otro',
                label: 'Otro',
                color: 'bg-orange-100 text-orange-800'
            }
        ],
        extraFields: [
            {
                key: 'estadoEstandar',
                label: 'Estado',
                type: 'select',
                options: [
                    'Implantado',
                    'En proceso',
                    'Pendiente'
                ]
            },
            {
                key: 'documentado',
                label: 'Documentado',
                type: 'select',
                options: [
                    'Sí',
                    'No',
                    'Parcialmente'
                ]
            },
            {
                key: 'cumplimiento',
                label: 'Cumplimiento %',
                type: 'number'
            },
            {
                key: 'fechaRevision',
                label: 'Fecha revisión',
                type: 'text'
            }
        ],
        templateName: 'S4_Inventario_Estandares_Seiketsu.xlsx'
    },
    5: {
        title: 'Inventario de Prácticas de Disciplina',
        subtitle: 'SHITSUKE — Registra los hábitos y prácticas de disciplina observados',
        categories: [
            {
                value: 'cumplido',
                label: 'Cumplido',
                color: 'bg-green-100 text-green-800'
            },
            {
                value: 'parcial',
                label: 'Parcial',
                color: 'bg-yellow-100 text-yellow-800'
            },
            {
                value: 'incumplido',
                label: 'Incumplido',
                color: 'bg-red-100 text-red-800'
            }
        ],
        extraFields: [
            {
                key: 'practica',
                label: 'Práctica/Hábito',
                type: 'text'
            },
            {
                key: 'responsable',
                label: 'Responsable',
                type: 'text'
            },
            {
                key: 'frecuencia',
                label: 'Frecuencia',
                type: 'select',
                options: [
                    'Diaria',
                    'Semanal',
                    'Mensual'
                ]
            }
        ],
        templateName: 'S5_Inventario_Disciplina_Shitsuke.xlsx'
    }
};
const MIN_PHOTOS = 10;
const INVENTORY_CLASSIFY_THRESHOLD = 80;
const ACTION_PLAN_MIN_ITEMS = 3;
const SELF_EVAL_THRESHOLD = 70;
const AUDIT_PASS_THRESHOLD = 75;
const EXAM_PASS_THRESHOLD = 80;
const AUDIT_CHECKLISTS = {
    1: [
        {
            id: '1.1',
            title: 'MATERIALES',
            items: [
                {
                    id: '1.1.1',
                    description: 'Consumibles'
                },
                {
                    id: '1.1.2',
                    description: 'Materia Prima'
                },
                {
                    id: '1.1.3',
                    description: 'Producto acabado o en proceso'
                },
                {
                    id: '1.1.4',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '1.2',
            title: 'MÁQUINAS Y EQUIPOS',
            items: [
                {
                    id: '1.2.1',
                    description: 'Máquinas (Inducción, bombeo, apriete, engrase…)'
                },
                {
                    id: '1.2.2',
                    description: 'Utillajes (volteo, apoyo, montaje…)'
                },
                {
                    id: '1.2.3',
                    description: 'Equipos y accesorios de Elevación (Grúas, eslingas, cáncamos, cables, grilletes…)'
                },
                {
                    id: '1.2.4',
                    description: 'Equipos de transporte (Carretillas, transpaletas, plataformas elevadoras, vehículos…)'
                },
                {
                    id: '1.2.5',
                    description: 'Equipos de ensayo (galgas, testers, banco de pruebas…)'
                },
                {
                    id: '1.2.6',
                    description: 'Herramientas de ensamblaje'
                },
                {
                    id: '1.2.7',
                    description: 'EQUIPOS INFORMÁTICOS'
                }
            ]
        },
        {
            id: '1.3',
            title: 'TRANSPORTE Y ALMACENAJE',
            items: [
                {
                    id: '1.3.1',
                    description: 'Contenedores vacíos, cajas, bidones, botes, cubos…'
                },
                {
                    id: '1.3.2',
                    description: 'Pallets u otros elementos de apoyo, tacos'
                },
                {
                    id: '1.3.3',
                    description: 'Bolsas, plásticos, protecciones, elementos de flejado'
                },
                {
                    id: '1.3.4',
                    description: 'Productos de limpieza, paños, escobas…'
                },
                {
                    id: '1.3.5',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '1.4',
            title: 'MOBILIARIO',
            items: [
                {
                    id: '1.4.1',
                    description: 'Bancos de trabajo'
                },
                {
                    id: '1.4.2',
                    description: 'Paneles herramienta'
                },
                {
                    id: '1.4.3',
                    description: 'Armarios o taquillas'
                },
                {
                    id: '1.4.4',
                    description: 'Sillas, mesas'
                },
                {
                    id: '1.4.5',
                    description: 'Paneles u otros soportes para información'
                },
                {
                    id: '1.4.6',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '1.5',
            title: 'INFORMACIÓN',
            items: [
                {
                    id: '1.5.1',
                    description: 'Planos o Instrucciones de trabajo'
                },
                {
                    id: '1.5.2',
                    description: 'Posters u otra información divulgativa'
                },
                {
                    id: '1.5.3',
                    description: 'Gráficos o indicadores'
                },
                {
                    id: '1.5.4',
                    description: 'Carpetas o bandejas con documentación innecesaria'
                },
                {
                    id: '1.5.5',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        }
    ],
    2: [
        {
            id: '2.1',
            title: 'EQUIPOS Y MÁQUINAS',
            items: [
                {
                    id: '2.1.1',
                    description: 'Los equipos y máquinas están identificados con su número de equipo correspondiente'
                },
                {
                    id: '2.1.2',
                    description: 'La identificación anterior es visible (no es necesario manipular partes del equipo)'
                },
                {
                    id: '2.1.3',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '2.2',
            title: 'PASILLOS Y LUGARES DE UBICACIÓN',
            items: [
                {
                    id: '2.2.1',
                    description: 'Los pasillos y zonas de trabajo delimitados claramente'
                },
                {
                    id: '2.2.2',
                    description: 'Cuando algo falta, ¿todo el mundo sabe lo que falta? Todos pueden reconocer donde deben ubicarse.'
                },
                {
                    id: '2.2.3',
                    description: 'Los pallets de entrada y salida de material'
                },
                {
                    id: '2.2.4',
                    description: 'Los equipos móviles (escaleras, transpaletas, carros, utillajes sobre ruedas)'
                },
                {
                    id: '2.2.5',
                    description: 'Los medios de transporte (transpaletas, plataformas, carretillas, coches, camiones…)'
                },
                {
                    id: '2.2.6',
                    description: 'Las herramientas cuentan con ubicaciones señalizadas inequívocamente (sistemas poka-yoke, siluetas, etiquetas identificativas)'
                },
                {
                    id: '2.2.7',
                    description: 'Consumibles'
                }
            ]
        },
        {
            id: '2.3',
            title: 'SEÑALIZACIÓN',
            items: [
                {
                    id: '2.3.1',
                    description: 'Están señalizados de forma visible e inequívoca los mandos de maniobra de los equipos y máquinas (sentido de movimiento, on/off, stop, parada de emergencia…)'
                },
                {
                    id: '2.3.2',
                    description: 'Se puede reconocer cuando las máquinas están en tensión (con señal luminosa tipo led o similar)'
                },
                {
                    id: '2.3.3',
                    description: 'Existe señalización de peligro cuando las máquinas están en funcionamiento (luz rotatoria luminosa, señal destellante, aviso sonoro, balizamiento o cartel advertencia)'
                },
                {
                    id: '2.3.4',
                    description: 'La señalización del lugar es adecuada y visible desde todos los puntos (en especial la relativa a medios de extinción y vías de evacuación)'
                },
                {
                    id: '2.3.5',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '2.4',
            title: 'STOCKS DE MATERIAL',
            items: [
                {
                    id: '2.4.1',
                    description: 'Están identificados los materiales en el área de trabajo?'
                },
                {
                    id: '2.4.2',
                    description: 'Las etiquetas identificativas están en buenas condiciones, son claras y visibles'
                },
                {
                    id: '2.4.3',
                    description: 'La identificación informa acerca del cliente y proveedor'
                },
                {
                    id: '2.4.4',
                    description: 'La identificación contiene la denominación del material, referencia o artículo'
                },
                {
                    id: '2.4.5',
                    description: 'Es correcta la información, coincide esta con el material al que identifican y su ubicación'
                },
                {
                    id: '2.4.6',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '2.5',
            title: 'LAYOUT',
            items: [
                {
                    id: '2.5.1',
                    description: 'Existe un layout actualizado de la zona que refleja la disposición real de equipos, máquinas y elementos'
                },
                {
                    id: '2.5.2',
                    description: 'El layout está visible y accesible para todo el personal de la zona'
                },
                {
                    id: '2.5.3',
                    description: 'Las ubicaciones en el layout están codificadas y referenciadas (nomenclatura de posiciones)'
                },
                {
                    id: '2.5.4',
                    description: 'El layout se actualiza tras cada cambio de disposición de la zona'
                },
                {
                    id: '2.5.5',
                    description: 'El flujo de materiales y personas está definido en el layout (entradas, salidas, recorridos)'
                },
                {
                    id: '2.5.6',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '2.6',
            title: 'CÓDIGO DE COLORES / MARCADO DE SUELO',
            items: [
                {
                    id: '2.6.1',
                    description: 'Existe un código de colores definido y documentado para el marcado del suelo de la zona'
                },
                {
                    id: '2.6.2',
                    description: 'El código de colores es conocido por todo el personal (está expuesto o en la biblioteca de estándares)'
                },
                {
                    id: '2.6.3',
                    description: 'Las líneas de suelo están pintadas o pegadas en buen estado, sin desgaste ni roturas'
                },
                {
                    id: '2.6.4',
                    description: 'Los pasillos de circulación están delimitados con el color correspondiente según el código'
                },
                {
                    id: '2.6.5',
                    description: 'Las zonas de almacenamiento y ubicación de materiales están delimitadas con el color correspondiente'
                },
                {
                    id: '2.6.6',
                    description: 'Las zonas de peligro/restricción están marcadas con el color de aviso correspondiente'
                },
                {
                    id: '2.6.7',
                    description: 'Las áreas de evacuación y seguridad están señalizadas en suelo según normativa'
                },
                {
                    id: '2.6.8',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        }
    ],
    3: [
        {
            id: '3.1',
            title: 'MÁQUINAS O PUESTOS DE TRABAJO',
            items: [
                {
                    id: '3.1.1',
                    description: 'Máquinas herramienta o grandes utillajes anclados al suelo (volteo o anclaje de piezas para ensamblar)'
                },
                {
                    id: '3.1.2',
                    description: 'Bancos de trabajo o de pruebas'
                },
                {
                    id: '3.1.3',
                    description: 'Grúas, carretillas y otros vehículos móviles'
                },
                {
                    id: '3.1.4',
                    description: 'Andamios'
                },
                {
                    id: '3.1.5',
                    description: 'Mesas, taburetes, sillas'
                },
                {
                    id: '3.1.6',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '3.2',
            title: 'ENTORNO DE TRABAJO',
            items: [
                {
                    id: '3.2.1',
                    description: 'Suelos'
                },
                {
                    id: '3.2.2',
                    description: 'Paredes, columnas, techos, ventanas, puertas, alfeizares…'
                },
                {
                    id: '3.2.3',
                    description: 'Paneles informativos y de gestión operativa (producción, indicadores…)'
                },
                {
                    id: '3.2.4',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '3.3',
            title: 'HERRAMIENTAS Y EQUIPOS',
            items: [
                {
                    id: '3.3.1',
                    description: 'Están limpias las herramientas? Se pueden manipular sin mancharse? (no hay restos de grasas, silicona, pintura seca..)'
                },
                {
                    id: '3.3.2',
                    description: 'Los equipos de trabajo, bombas de apriete, útiles...'
                },
                {
                    id: '3.3.3',
                    description: 'Están limpios los equipos y accesorios de elevación'
                },
                {
                    id: '3.3.4',
                    description: 'Se mantiene limpio el equipamiento en el interior de los armarios y/o cajones, incluso si no se está usando'
                },
                {
                    id: '3.3.5',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '3.4',
            title: 'MANTENER LIMPIO',
            items: [
                {
                    id: '3.4.1',
                    description: '¿Se sabe quién debe limpiar, cuándo y dónde?'
                },
                {
                    id: '3.4.2',
                    description: '¿Cubre las necesidades de la zona? (tener en cuenta el resultado en los puntos anteriores)'
                },
                {
                    id: '3.4.3',
                    description: '¿Se realiza la limpieza según lo planificado? (frecuencia, dedicación de tiempo, etc..)'
                },
                {
                    id: '3.4.4',
                    description: 'Están limpios los Equipos de Protección Individual EPI (gafas, protección respiratoria, cascos, guantes…)'
                },
                {
                    id: '3.4.5',
                    description: 'Se evidencia una tendencia a manchar menos en la rutina del trabajo diario (la ropa de trabajo se mantiene limpia, no se dejan huellas en superficies limpias, se limpia cuando se ensucia, no hay basura en lugares de paso…)'
                },
                {
                    id: '3.4.6',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '3.5',
            title: 'KIT DE LIMPIEZA',
            items: [
                {
                    id: '3.5.1',
                    description: 'Hay un kit de limpieza básico disponible en la zona?'
                },
                {
                    id: '3.5.2',
                    description: 'Es adecuado el kit de limpieza al tipo de suciedad y superficies a limpiar? (desengrasante si hay que limpiar grasa, escoba si hay que barrer…)'
                },
                {
                    id: '3.5.3',
                    description: 'La cantidad de contenedores es adecuada a los residuos generados, estos no están excesivamente llenos (tapa cerrada) ni hay basura fuera del contenedor.'
                },
                {
                    id: '3.5.4',
                    description: 'Se realiza una recogida selectiva de los residuos (como mínimo los residuos peligrosos deben estar separados de los residuos inertes)'
                },
                {
                    id: '3.5.5',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        }
    ],
    4: [
        {
            id: '4.1',
            title: 'ESTANDARIZACIÓN',
            items: [
                {
                    id: '4.1.1',
                    description: 'Se respetan los estándares globales en cuanto a marcaje y uso en Suelos'
                },
                {
                    id: '4.1.2',
                    description: 'Se respetan los estándares globales en cuanto a marcaje y uso en Pasillos'
                },
                {
                    id: '4.1.3',
                    description: 'Se respetan los estándares globales en cuanto a marcaje y uso en Zonas de trabajo, entrada y salida de materiales'
                },
                {
                    id: '4.1.4',
                    description: 'Se respetan los estándares globales en cuanto a marcaje y uso en Residuos, zonas de riesgo permanente y de paso no permitido'
                },
                {
                    id: '4.1.5',
                    description: 'Está construido según el estándar corporativo el Panel PDCA'
                },
                {
                    id: '4.1.6',
                    description: 'Está construido según el estándar corporativo el Panel Lay Out Global'
                },
                {
                    id: '4.1.7',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '4.2',
            title: 'RESPETAR ESTÁNDARES',
            items: [
                {
                    id: '4.2.1',
                    description: 'Las ubicaciones en el suelo son respetadas, todo está ubicado en su lugar correspondiente'
                },
                {
                    id: '4.2.2',
                    description: 'Las ubicaciones de las herramientas en los paneles y cajas (incluso en el interior) son respetadas, no se encuentran herramientas fuera de ubicación'
                },
                {
                    id: '4.2.3',
                    description: 'Se aplican los estándares creados en una zona o departamento en el resto de zonas (copiar-pegar). No hay diferentes estándares para la misma función (diferentes códigos de colores, formatos, señalización, etc)'
                },
                {
                    id: '4.2.4',
                    description: 'La documentación se encuentra organizada y clasificada de forma que facilita su localización'
                },
                {
                    id: '4.2.5',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '4.3',
            title: 'INSPECCIÓN Y MANTENIMIENTO',
            items: [
                {
                    id: '4.3.1',
                    description: 'Existen planes de inspección para máquinas y equipos de trabajo que requieran mantenimiento periódico?'
                },
                {
                    id: '4.3.2',
                    description: 'Podemos reconocer visualmente si las máquinas y equipos han pasado la inspección periódica correspondiente de forma favorable (con etiquetas de colores o sistemas análogos)'
                },
                {
                    id: '4.3.3',
                    description: 'Se aplica un sistema con código de colores para la indicación visual del estado de revisión en los equipos y accesorios de elevación?'
                },
                {
                    id: '4.3.4',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '4.4',
            title: 'INSTRUCCIONES VISUALES',
            items: [
                {
                    id: '4.4.1',
                    description: 'Existen instrucciones gráficas en puntos visibles del área de trabajo sobre estándares de uso común (check list, fichas o planes de izado, diagramas de flujo, secuencias de proceso, instrucciones punto a punto,…)'
                },
                {
                    id: '4.4.2',
                    description: 'Los productos químicos están correctamente identificados, contenido, peligrosidad, riesgos para la salud,…y acompañados de su ficha de datos de seguridad'
                },
                {
                    id: '4.4.3',
                    description: 'Las señalizaciones de peligro e instrucciones de las máquinas y equipos se conservan de forma que sigan siendo útiles al usuario del equipo'
                },
                {
                    id: '4.4.4',
                    description: 'Se dispone de instrucciones visuales de cómo actuar en caso de emergencia (incendio, evacuación, derrame, accidente, etc.)'
                },
                {
                    id: '4.4.5',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '4.5',
            title: 'INDICADORES VISUALES',
            items: [
                {
                    id: '4.5.1',
                    description: 'Existe un panel o documento en lugar visible para el seguimiento de la producción (previsto/real, hitos, o similar)'
                },
                {
                    id: '4.5.2',
                    description: 'Se realiza un seguimiento visual de acciones correctivas, preventivas y de mejora continua (gráfico acciones PDCA, incidencias de calidad, etc..)'
                },
                {
                    id: '4.5.3',
                    description: 'Se mantienen actualizados todos los indicadores visuales existentes en la zona/proceso. Es una rutina constante la actualización y seguimiento'
                },
                {
                    id: '4.5.4',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        }
    ],
    5: [
        {
            id: '5.1',
            title: 'AUDITORÍAS',
            items: [
                {
                    id: '5.1.1',
                    description: 'Se realizan auditorías semanales 5S'
                },
                {
                    id: '5.1.2',
                    description: 'Se transforman las anomalías en acciones correctivas o de mejora con el fin de que no se repitan'
                },
                {
                    id: '5.1.3',
                    description: 'Si están implantadas otras herramientas de inspección o comprobación, estas son utilizadas según el estándar'
                },
                {
                    id: '5.1.4',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '5.2',
            title: 'GESTIÓN DE ANOMALÍAS',
            items: [
                {
                    id: '5.2.1',
                    description: 'Hay un sistema de declaración de anomalías implantado, entendiendo por "declaración de anomalías" hacerlas visibles, evitar que los problemas queden escondidos.'
                },
                {
                    id: '5.2.2',
                    description: 'Se encuentran evidencias de que el sistema de declaración de anomalías es eficaz, las anomalías se registran y se resuelven de forma efectiva, evitando que se repitan'
                },
                {
                    id: '5.2.3',
                    description: 'Existen instrucciones visuales del funcionamiento del sistema de declaración de anomalías'
                },
                {
                    id: '5.2.4',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        },
        {
            id: '5.3',
            title: 'ACCIÓN',
            items: [
                {
                    id: '5.3.1',
                    description: 'Se gestiona la mejora continua a través del panel PDCA visual de la zona'
                },
                {
                    id: '5.3.2',
                    description: 'Las acciones de mejora se incluyen en el plan de acción y se realizan acciones semanalmente (mejora continua)'
                },
                {
                    id: '5.3.3',
                    description: 'Se lleva a cabo un seguimiento por medio de indicadores que miden la continuidad del ciclo PDCA.'
                },
                {
                    id: '5.3.4',
                    description: 'Otros (Indicar cuál)',
                    hasOther: true
                }
            ]
        }
    ]
};
function getAuditTotalItems(sStep) {
    const sections = AUDIT_CHECKLISTS[sStep];
    if (!sections) return 0;
    return sections.reduce((sum, section)=>sum + section.items.length, 0);
}
const AUDIT_TOTAL_ITEMS = {
    1: getAuditTotalItems(1),
    2: getAuditTotalItems(2),
    3: getAuditTotalItems(3),
    4: getAuditTotalItems(4),
    5: getAuditTotalItems(5)
};
const QUARTERLY_AUDIT_CHECKLIST = Object.values(AUDIT_CHECKLISTS).flat();
const WEEKLY_AUDIT_CHECKLIST = AUDIT_CHECKLISTS[3];
const MONTHLY_AUDIT_CHECKLIST = Object.entries(AUDIT_CHECKLISTS).flatMap(([sStep, sections])=>sections.map((section)=>({
            ...section,
            items: section.items.slice(0, 2)
        })));
const WEEKLY_AUDIT_TOTAL_ITEMS = WEEKLY_AUDIT_CHECKLIST.reduce((sum, section)=>sum + section.items.length, 0);
const MONTHLY_AUDIT_TOTAL_ITEMS = MONTHLY_AUDIT_CHECKLIST.reduce((sum, section)=>sum + section.items.length, 0);
const QUARTERLY_AUDIT_TOTAL_ITEMS = QUARTERLY_AUDIT_CHECKLIST.reduce((sum, section)=>sum + section.items.length, 0);
}),
"[project]/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/src/lib/image-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base64toFile",
    ()=>base64toFile,
    "compressImage",
    ()=>compressImage,
    "estimateBase64Size",
    ()=>estimateBase64Size,
    "formatBytes",
    ()=>formatBytes,
    "generatePhotoFilename",
    ()=>generatePhotoFilename
]);
/**
 * Image compression utilities for client-side photo optimization.
 * Reduces photo size before uploading to save database space and bandwidth.
 */ const MAX_WIDTH = 1200;
const MAX_HEIGHT = 900;
const JPEG_QUALITY = 0.7; // 70% quality - good balance between size and visual quality
async function compressImage(source) {
    return new Promise((resolve, reject)=>{
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = ()=>{
            try {
                // Calculate new dimensions maintaining aspect ratio
                let { width, height } = img;
                if (width > MAX_WIDTH) {
                    height = Math.round(height * MAX_WIDTH / width);
                    width = MAX_WIDTH;
                }
                if (height > MAX_HEIGHT) {
                    width = Math.round(width * MAX_HEIGHT / height);
                    height = MAX_HEIGHT;
                }
                // Create canvas and draw resized image
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }
                // Use high-quality downscaling
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);
                // Convert to JPEG with compression
                const compressed = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
                resolve(compressed);
            } catch (err) {
                reject(err);
            }
        };
        img.onerror = ()=>reject(new Error('Failed to load image'));
        // Load from source
        if (typeof source === 'string') {
            img.src = source;
        } else {
            const reader = new FileReader();
            reader.onloadend = ()=>{
                img.src = reader.result;
            };
            reader.onerror = ()=>reject(new Error('Failed to read file'));
            reader.readAsDataURL(source);
        }
    });
}
function base64toFile(base64, filename) {
    const arr = base64.split(',');
    const mime = arr[0]?.match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([
        u8arr
    ], filename, {
        type: mime
    });
}
function generatePhotoFilename(projectId, sStep, miniStep, index) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 6);
    return `${projectId}_S${sStep}_M${miniStep}_${index}_${timestamp}_${random}.jpg`;
}
function estimateBase64Size(base64) {
    const base64Length = base64.split(',')[1]?.length || 0;
    return Math.round(base64Length * 3 / 4);
}
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = [
        'B',
        'KB',
        'MB',
        'GB'
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
}),
"[project]/src/lib/checklist-templates.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchAllChecklistTemplates",
    ()=>fetchAllChecklistTemplates,
    "fetchChecklistTemplate",
    ()=>fetchChecklistTemplate,
    "fetchItemDescription",
    ()=>fetchItemDescription,
    "templateToAuditSections",
    ()=>templateToAuditSections,
    "useChecklistTemplate",
    ()=>useChecklistTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/5s-constants.ts [app-ssr] (ecmascript)");
'use client';
;
;
function templateToAuditSections(content) {
    if (!content || typeof content !== 'object') return [];
    const parsed = content;
    // ── Standard format: { sections: [...] } ──
    if (parsed.sections && Array.isArray(parsed.sections)) {
        return parsed.sections.map((section, sIdx)=>({
                id: section.id || `sec-${sIdx}`,
                title: section.title || `Sección ${sIdx + 1}`,
                items: (section.items || []).map((item, iIdx)=>({
                        id: item.id || `item-${sIdx}-${iIdx}`,
                        description: item.description || '',
                        hasOther: item.hasOther || false
                    }))
            }));
    }
    // ── Legacy autoeval format: { items: [{ description, maxScore }] } ──
    // Convert to a single section with all items
    if (parsed.items && Array.isArray(parsed.items)) {
        return [
            {
                id: 'sec-autoeval',
                title: 'Puntos de Verificación',
                items: parsed.items.map((item, iIdx)=>({
                        id: item.id || `item-autoeval-${iIdx}`,
                        description: item.description || item.criterion || '',
                        hasOther: item.hasOther || false
                    }))
            }
        ];
    }
    // ── Legacy audit format: { criteria: [{ criterion, weight }] } ──
    // Convert to a single section with all criteria as items
    if (parsed.criteria && Array.isArray(parsed.criteria)) {
        return [
            {
                id: 'sec-audit',
                title: 'Criterios de Auditoría',
                items: parsed.criteria.map((c, iIdx)=>({
                        id: c.id || `item-audit-${iIdx}`,
                        description: c.criterion || c.description || '',
                        hasOther: c.hasOther || false
                    }))
            }
        ];
    }
    return [];
}
async function fetchChecklistTemplate(type, sStep, miniStep = type === 'autoevaluacion' ? 4 : 5, boardConfigId) {
    // If board config is provided, try it first
    if (boardConfigId) {
        try {
            const slotsRes = await fetch(`/api/board-slots?boardConfigId=${boardConfigId}&sStep=${sStep}&miniStep=${miniStep}`);
            const slotsJson = await slotsRes.json();
            if (slotsJson.success && slotsJson.data.length > 0) {
                const slot = slotsJson.data[0];
                const matchingTemplates = (slot.templates || []).filter((t)=>t.template?.type === type);
                if (matchingTemplates.length > 0) {
                    const tpl = matchingTemplates[0].template;
                    const parsed = typeof tpl.content === 'string' ? JSON.parse(tpl.content) : tpl.content;
                    const sections = templateToAuditSections(parsed);
                    if (sections.length > 0) {
                        return {
                            sections,
                            notaMinima: tpl.notaMinima ?? null
                        };
                    }
                }
            }
        } catch (e) {
            console.error(`Error fetching ${type} template from board config for S${sStep}:`, e);
        }
    }
    // Fallback: global template
    try {
        const res = await fetch(`/api/templates?type=${type}&sStep=${sStep}`);
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
            const tpl = json.data[0];
            const parsed = typeof tpl.content === 'string' ? JSON.parse(tpl.content) : tpl.content;
            const sections = templateToAuditSections(parsed);
            if (sections.length > 0) {
                return {
                    sections,
                    notaMinima: tpl.notaMinima ?? null
                };
            }
        }
    } catch (e) {
        console.error(`Error fetching ${type} template for S${sStep}:`, e);
    }
    // ── Final fallback: use AUDIT_CHECKLISTS from constants ──
    // These are the built-in checklists that ship with the app
    const builtIn = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUDIT_CHECKLISTS"][sStep];
    if (builtIn && builtIn.length > 0) {
        return {
            sections: builtIn,
            notaMinima: null
        };
    }
    return null;
}
async function fetchAllChecklistTemplates(type) {
    const result = {};
    try {
        const res = await fetch(`/api/templates?type=${type}&includeInactive=false`);
        const json = await res.json();
        if (json.success && json.data) {
            for (const tpl of json.data){
                const parsed = typeof tpl.content === 'string' ? JSON.parse(tpl.content) : tpl.content;
                const sections = templateToAuditSections(parsed);
                if (sections.length > 0) {
                    result[tpl.sStep] = sections;
                }
            }
        }
    } catch (e) {
        console.error(`Error fetching all ${type} templates:`, e);
    }
    // ── Fallback: fill missing S-steps from AUDIT_CHECKLISTS constants ──
    for(let s = 1; s <= 5; s++){
        if (!result[s] || result[s].length === 0) {
            const builtIn = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$5s$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUDIT_CHECKLISTS"][s];
            if (builtIn && builtIn.length > 0) {
                result[s] = builtIn;
            }
        }
    }
    return result;
}
async function fetchItemDescription(sStep, itemId) {
    // Try auditoria template first, then autoevaluacion
    for (const type of [
        'auditoria',
        'autoevaluacion'
    ]){
        const data = await fetchChecklistTemplate(type, sStep);
        if (data) {
            for (const section of data.sections){
                const item = section.items.find((i)=>i.id === itemId);
                if (item) return item.description;
            }
        }
    }
    return itemId;
}
function useChecklistTemplate(type, sStep, enabled = true, boardConfigId) {
    const [sections, setSections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [notaMinima, setNotaMinima] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!enabled) return;
        setIsLoading(true);
        const result = await fetchChecklistTemplate(type, sStep, undefined, boardConfigId);
        if (result) {
            setSections(result.sections);
            if (result.notaMinima !== null) setNotaMinima(result.notaMinima);
        } else {
            setSections([]);
            setNotaMinima(null);
        }
        setIsLoading(false);
    }, [
        type,
        sStep,
        enabled,
        boardConfigId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (enabled) load();
    }, [
        load
    ]);
    return {
        sections,
        notaMinima,
        isLoading,
        reload: load
    };
}
}),
"[project]/src/hooks/use-mobile.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsMobile",
    ()=>useIsMobile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
    const [isMobile, setIsMobile] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](undefined);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const onChange = ()=>{
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        mql.addEventListener("change", onChange);
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        return ()=>mql.removeEventListener("change", onChange);
    }, []);
    return !!isMobile;
}
}),
];

//# sourceMappingURL=src_cb79a319._.js.map