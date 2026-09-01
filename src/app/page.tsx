'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { use5SStore } from '../lib/store';
import { S_STEPS, MINI_STEPS } from '../lib/5s-constants';
import Board5S from '../components/5s/Board5S';
import FormacionModal from '../components/5s/FormacionModal';
import FotosModal from '../components/5s/FotosModal';
import InventarioModal from '../components/5s/InventarioModal';
import ActionPlanModal from '../components/5s/ActionPlanModal';
import GlobalInventoryModal from '../components/5s/GlobalInventoryModal';
import AuditResultsModal from '../components/5s/AuditResultsModal';
import StandardsLibrary from '../components/5s/StandardsLibrary';
import PhotoLibrary from '../components/5s/PhotoLibrary';
import AutoevaluacionModal from '../components/5s/AutoevaluacionModal';
import AuditoriaModal from '../components/5s/AuditoriaModal';
import JaulaView from '../components/5s/JaulaView';
import ActivosView from '../components/5s/ActivosView';
import PuntoLimpioView from '../components/5s/PuntoLimpioView';
import PlanDeAccionView from '../components/5s/PlanDeAccionView';
import LoginPage from '../components/auth/LoginPage';
import LandingPage from '../components/auth/LandingPage';
import ProjectSetup from '../components/auth/ProjectSetup';
import { ProjectSelector } from '../components/auth/ProjectSelector';
import TeamManagement from '../components/auth/TeamManagement';
import RolePermissions from '../components/auth/RolePermissions';
import AdminPanel from '../components/admin/AdminPanel';
import ConstructorPanel from '../components/admin/ConstructorPanel';
import GerentePanel from '../components/auth/GerentePanel';
import { UserTaskCalendar } from '../components/5s/UserTaskCalendar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { useIsMobile } from '../hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Loader2, RefreshCw, LogOut, Settings, ChevronDown, Shield, ShieldCheck, Unlock, Lock,
  LayoutDashboard, Wrench, BarChart3, FileText, MapPin, ListChecks,
  Crown, Trash2,
  ClipboardList, GraduationCap, Camera, CheckSquare, Trophy, ChevronRight,
  Lock as LockIcon, AlertTriangle, Building2, Zap, Bell, BellRing, BookOpen, Image as ImageIcon,
  Package, BoxSelect, Menu, Droplets, CalendarDays,
  Calendar, // v2.68: icono para programar evaluación
  X, // v2.87: botón cerrar panel de avisos
} from 'lucide-react';
import { toast } from 'sonner'; // v2.68: notificaciones toast para schedule

const MODAL_MAP: Record<string, React.ComponentType<{
  open: boolean;
  onClose: () => void;
  sStep: number;
  miniStep: number;
}>> = {
  formacion: FormacionModal,
  fotos: FotosModal,
  inventario: InventarioModal,
  actionplan: ActionPlanModal,
  autoevaluacion: AutoevaluacionModal,
  auditoria: AuditoriaModal,
};

function getModalType(miniStepId: number, sStep: number): string {
  if (miniStepId === 3) {
    return sStep === 5 ? 'actionplan' : 'inventario';
  }
  const map: Record<number, string> = {
    1: 'formacion',
    2: 'fotos',
    4: 'autoevaluacion',
    5: 'auditoria',
  };
  return map[miniStepId] || 'formacion';
}

const MINI_STEP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Camera,
  ClipboardList,
  CheckSquare,
  ShieldCheck,
};

export default function HomePage() {
  const {
    activeModal,
    activeMiniStep,
    selectSStep,
    openModal,
    closeModal,
    seedDatabase,
    currentUser,
    currentProject,
    authView,
    isAuthLoading,
    checkSession,
    logout,
    setAuthView,
    adminFreeNavigation,
    setAdminFreeNavigation,
    currentZone,
    setCurrentZone,
    userZones,
    getAvailableZones,
    getMiniStepStatus,
    isQuesitoEarned,
    progress,
    selectedSStep,
    activeTab,
    setActiveTab,
    employeeProgress,
    goToProjectSelector,
    // v2.75: notifications desde el store (sacadas de useState local)
    notifications: notifs,
    unreadNotifs,
    notifPanelOpen: showNotifs,
    fetchNotifications,
    fetchUnreadCount,
    markNotificationRead,
    markAllNotificationsRead,
    toggleNotifPanel,
  } = use5SStore();

  const [isSeeding, setIsSeeding] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showTeamManagement, setShowTeamManagement] = useState(false);
  const [showRolePermissions, setShowRolePermissions] = useState(false);
  // v2.75: notifs, unreadNotifs, showNotifs ahora vienen del store (sacados de useState local)
  const [showUserCalendar, setShowUserCalendar] = useState(false);
  const [userTaskCount, setUserTaskCount] = useState(0);
  // v2.68: diálogo para programar fecha de autoeval/auditoría desde una notificación
  // v2.100: extendido para soportar modo 'propose_dates' (auditor propone hasta 3 fechas)
  const [scheduleDialog, setScheduleDialog] = useState<{
    open: boolean;
    notifId?: string;
    sStep?: number;
    miniStep?: number; // 4=autoeval, 5=auditoría
    zoneId?: string;
    projectId?: string;
    empleadoId?: string;
    responsableId?: string;
    type?: string;
    scheduleId?: string; // v2.100: para modo 'propose_dates' (PATCH en vez de POST)
  }>({ open: false });
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [scheduleTime, setScheduleTime] = useState<string>('10:00');
  const [isSavingSchedule, setIsSavingSchedule] = useState(false);
  // v2.100: propuestas múltiples (hasta 3) para el modo 'propose_dates'
  const [proposedDates, setProposedDates] = useState<{ fecha: string; hora: string }[]>([]);
  // v2.62: Track which S-steps have been requested for autoeval by the empleado.
  // Key format: `${sStep}` → true once the user has clicked "Solicitar autoeval"
  // This is in-memory only (no DB); resets on page reload. Persists in localStorage
  // so it survives navigation between tabs.
  const [autoevalRequested, setAutoevalRequested] = useState<Set<number>>(() => {
    try {
      const stored = typeof window !== 'undefined' ? window.localStorage.getItem('autoeval_requested_steps') : null;
      if (stored) {
        const arr = JSON.parse(stored) as number[];
        return new Set(arr);
      }
    } catch { /* ignore */ }
    return new Set();
  });
  const markAutoevalRequested = useCallback((sStep: number) => {
    setAutoevalRequested(prev => {
      const next = new Set(prev);
      next.add(sStep);
      try {
        window.localStorage.setItem('autoeval_requested_steps', JSON.stringify([...next]));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showGerencia, setShowGerencia] = useState(false);
  const [appVersion, setAppVersion] = useState<string>('v3.0.11');

  // Fetch version on mount
  useEffect(() => {
    fetch('/api/version', { cache: 'no-store' })
      .then(r => r.json())
      .then(v => setAppVersion(v.version || 'v3.0.11'))
      .catch(() => setAppVersion('v3.0.11'));
  }, []);
  const isMobile = useIsMobile();

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (authView === 'board' && !isInitialized) {
      const init = async (retries = 3) => {
        try {
          const res = await fetch('/api/progress');
          if (!res.ok && retries > 0) {
            await new Promise(r => setTimeout(r, 2000));
            return init(retries - 1);
          }
          const json = await res.json();
          if (json.success && json.data && json.data.length > 0) {
            use5SStore.setState({ progress: json.data, isLoadingProgress: false });
            setIsInitialized(true);
            // Also fetch employee progress for the current zone
            const { currentProject, currentZone } = use5SStore.getState();
            if (currentProject && currentZone) {
              await use5SStore.getState().fetchEmployeeProgress(currentProject.id, currentZone.id);
            }
            // v2.74.2: cargar schedules de evaluación para mostrar badge
            // "📅 Programado" sobre los globos 4 y 5
            try { await use5SStore.getState().fetchEvaluationSchedules(); } catch {}
            // v2.75: disparar endpoint unificado /api/avisos/generate que cubre
            // step_completed (autoeval_ready, audit_ready) + action_items
            // (new_action_item, action_due_today, action_overdue) + schedule
            // (evaluation_expired). Sustituye a /api/notifications/auto y
            // /api/avisos/auto.
            if (currentProject?.id && currentUser?.id) {
              fetch('/api/avisos/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  projectId: currentProject.id,
                  userId: currentUser.id,
                  source: 'all',
                }),
              }).catch(e => console.error('Auto-avisos error:', e));
            }
          } else {
            setIsSeeding(true);
            await seedDatabase();
            setIsSeeding(false);
            setIsInitialized(true);
          }
        } catch {
          if (retries > 0) {
            await new Promise(r => setTimeout(r, 2000));
            return init(retries - 1);
          }
          setIsSeeding(true);
          await seedDatabase();
          setIsSeeding(false);
          setIsInitialized(true);
        }
      };
      init();
    }
  }, [authView, isInitialized, seedDatabase]);

  const handleSStepClick = (sStep: number) => {
    selectSStep(sStep);
  };

  const handleOpenModal = (type: string, miniStep: number, sStep: number) => {
    if (sStep && !selectedSStep) {
      selectSStep(sStep);
    } else if (sStep && selectedSStep !== sStep) {
      selectSStep(sStep);
    }
    openModal(type as any, miniStep);
  };

  const handleReseed = async () => {
    setIsSeeding(true);
    await seedDatabase();
    setIsSeeding(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsInitialized(false);
  };

  const getRoleLabel = (role: string) => {
    const map: Record<string, string> = {
      gestor: 'Gestor (Dueño)', admin: 'Admin de Empresa', gerente: 'Gerente', responsable: 'Responsable',
      empleado: 'Empleado', auditor: 'Auditor',
    };
    return map[role] || role;
  };

  const getRoleBadgeColor = (role: string) => {
    const map: Record<string, string> = {
      gestor: 'bg-red-100 text-red-700 border-red-200',
      admin: 'bg-purple-100 text-purple-700 border-purple-200',
      gerente: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      responsable: 'bg-blue-100 text-blue-700 border-blue-200',
      empleado: 'bg-green-100 text-green-700 border-green-200',
      auditor: 'bg-orange-100 text-orange-700 border-orange-200',
    };
    return map[role] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  // Permission helpers — derived from store permissions map (NO admin bypass)
  const permissions = use5SStore(s => s.permissions);
  // v2.74.2: schedules de evaluación (autoeval/auditoría) — para mostrar badge
  // "📅 Programado" sobre los globos 4 y 5
  const evaluationSchedules = use5SStore(s => s.evaluationSchedules);
  const hasPermission = useMemo(() => {
    const hp = (perm: string): boolean => {
      if (!currentUser) return false;
      return permissions[currentUser.role]?.[perm] === true;
    };
    return hp;
  }, [currentUser, permissions]);
  const canPerformPerm = useMemo(() => (sStep: number, miniStep: number): boolean => hasPermission(`s${sStep}_step${miniStep}_a1`), [hasPermission]);
  const canViewPerm = useMemo(() => (sStep: number, miniStep: number): boolean => hasPermission(`s${sStep}_step${miniStep}_a0`), [hasPermission]);
  const canAuditAny = useMemo(() => currentUser ? [1,2,3,4,5].some(s => canPerformPerm(s, 5)) : false, [currentUser, canPerformPerm]);
  // Role checks — MUST be defined before any variable that references them
  const isGestor = currentUser?.role === 'gestor';
  const isAdmin = currentUser?.role === 'admin';
  const isResponsable = currentUser?.role === 'responsable';
  const canNotifyAudit = hasPermission('notify_audit'); // Only employees (by default) can trigger audit notification
  const canNotifyAutoeval = hasPermission('notify_autoeval'); // Only empleados can request responsable to do autoeval
  const canAcceptAuditMeeting = hasPermission('accept_audit_meeting'); // Auditors and responsables can accept audit meetings
  const canSeeNotifications = hasPermission('view_board'); // All board users can see notifications
  const canResetData = hasPermission('reset_data') || hasPermission('skip_steps'); // Testing: who can see the reset button
  const canSeePermissions = hasPermission('manage_permissions') || isAdmin || isGestor; // Only gestor/admin can see Permisos

  // v2.75: Fetch notifications usando el store (reemplaza useState local)
  // El store hace debounce de 5s y guarda el último fetch.
  // Polling cada 15s para refrescar unread count (v2.75.2: bajado de
  // 30s a 15s para que el empleado vea el aviso de cita programada
  // más rápido cuando el responsable programa).
  // v2.75.2: si el unread count cambia, también refrescamos las notifs
  // completas para que el panel muestre las nuevas al instante.
  const prevUnreadRef = useRef(0);
  useEffect(() => {
    if (canSeeNotifications && currentUser?.id && currentProject?.id) {
      fetchUnreadCount();
      const interval = setInterval(async () => {
        const before = use5SStore.getState().unreadNotifs;
        await fetchUnreadCount();
        const after = use5SStore.getState().unreadNotifs;
        // Si hay nuevas notifs desde la última vez, refrescar la lista completa
        if (after > before || after > prevUnreadRef.current) {
          try { await fetchNotifications(true); } catch (e) { console.error(e); }
          // También refrescar schedules por si hay una cita nueva
          try { await use5SStore.getState().fetchEvaluationSchedules(); } catch (e) { /* ignore */ }
        }
        prevUnreadRef.current = after;
      }, 15000); // Poll every 15s
      return () => clearInterval(interval);
    }
  }, [canSeeNotifications, currentUser?.id, currentProject?.id, fetchUnreadCount, fetchNotifications]);

  // v2.74/v2.75: Comprobar si alguna cita programada ha superado la ventana de 2h.
  // v2.75: ahora también dispara el endpoint unificado /api/avisos/generate que cubre:
  //   - step_completed (autoeval_ready, audit_ready)
  //   - action_items (new_action_item, action_due_today, action_overdue)
  //   - schedule (evaluation_expired)
  useEffect(() => {
    if (!currentUser?.id || !currentProject?.id) return;
    const checkVencidas = async () => {
      try {
        // v2.75: usar el endpoint unificado que hace todo (vencidas + step_completed + action_items)
        await fetch('/api/avisos/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId: currentProject.id,
            userId: currentUser.id,
            source: 'all',
          }),
        });
        // Refrescar schedules + notifs para que la UI refleje el cambio
        try { await use5SStore.getState().fetchEvaluationSchedules(); } catch {}
        try { await fetchUnreadCount(); } catch {}
      } catch (e) { /* silent */ }
    };
    checkVencidas();
    const interval = setInterval(checkVencidas, 5 * 60 * 1000); // cada 5 min
    return () => clearInterval(interval);
  }, [currentUser?.id, currentProject?.id, fetchUnreadCount]);

  // Fetch user task count for the calendar badge (vencidas + hoy)
  useEffect(() => {
    if (!currentUser?.id) {
      setUserTaskCount(0);
      return;
    }
    const fetchTaskCount = async () => {
      try {
        const params = new URLSearchParams({ userId: currentUser.id });
        if (currentProject?.id) params.set('projectId', currentProject.id);
        const res = await fetch(`/api/my-tasks?${params.toString()}`);
        const data = await res.json();
        if (data.success && data.stats) {
          setUserTaskCount((data.stats.vencidas || 0) + (data.stats.hoy || 0));
        }
      } catch (e) { /* silent */ }
    };
    fetchTaskCount();
    const interval = setInterval(fetchTaskCount, 60000); // every 60s
    return () => clearInterval(interval);
  }, [currentUser?.id, currentProject?.id]);

  const canManageTeam = currentUser && hasPermission('add_members');
  const canSkipSteps = hasPermission('skip_steps');
  const canSeeGerentePanel = hasPermission('view_progress') || hasPermission('edit_project');

  const isGlobalModal = activeModal === 'globalActionPlan' || activeModal === 'globalInventory' || activeModal === 'photoLibrary' || activeModal === 'standardsLibrary' || activeModal === 'auditResults';
  const ActiveModalComponent = !isGlobalModal && activeModal ? MODAL_MAP[activeModal] : null;

  // Available tabs based on role
  // GESTOR (dueño de la app): ONLY sees "Gestión" tab (company management platform)
  // ADMIN: Tablero + Admin (gestiona empresas, proyectos, plantillas, config tableros)
  // OTROS: Tablero
  // Inventario (Jaula/Activos/P.Limpio) y Plan de Acción se acceden desde la toolbar superior
  const availableTabs: { key: 'board' | 'admin' | 'maintenance' | 'gestion'; label: string; icon: React.ReactNode }[] = [];

  if (isGestor) {
    // Gestor SOLO ve su panel de gestión (empresas, usuarios, configuración)
    // NO ve el panel de Admin (eso es solo para admins de empresa)
    availableTabs.push({ key: 'gestion', label: 'Gestión', icon: <Crown className="h-3.5 w-3.5" /> });
  } else {
    // Tablero 5S — fixed, always visible, the main tool for everyone
    availableTabs.push({ key: 'board', label: 'Tablero', icon: <LayoutDashboard className="h-3.5 w-3.5" /> });
    // Admin — visible solo para admin de empresa (gestiona empresas, proyectos, plantillas, tableros)
    if (isAdmin) {
      availableTabs.push({ key: 'admin', label: 'Admin', icon: <Shield className="h-3.5 w-3.5" /> });
    }
  }

  // Loading screen
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 gap-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
          className="w-16 h-16">
          <img src="/5s-logo.png" alt="5S" className="w-full h-full object-contain" />
        </motion.div>
        <Loader2 className="h-6 w-6 text-green-500 animate-spin" />
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (authView === 'landing') return <LandingPage onLogin={() => setAuthView('login')} />;
  if (authView === 'login' || authView === 'register') return <LoginPage />;
  if (authView === 'setup') return <ProjectSetup />;
  if (authView === 'project_selector') return <ProjectSelector onLogout={handleLogout} />;
  if (authView === 'admin_panel') return <AdminPanel onLogout={handleLogout} />;
  if (authView === 'no_projects') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-6">
            <img src="/5s-logo.png" alt="5S" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Bienvenido, {currentUser?.name || 'Usuario'}</h1>
          <p className="text-muted-foreground mb-6">Tu cuenta ha sido creada correctamente. Aún no tienes ningún proyecto asignado.</p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-amber-800">El administrador del sistema te asignará un proyecto y un rol. Una vez asignado, podrás acceder a la plataforma.</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2"><LogOut className="h-4 w-4" /> Cerrar Sesión</Button>
        </div>
      </div>
    );
  }

  // ============================================================
  // SINGLE-SCREEN LAYOUT WITH TABS
  // ============================================================
  return (
    <div className="h-screen flex flex-col bg-green-50 overflow-hidden">
      {/* Compact Header */}
      <header className="border-b border-green-200 bg-green-50 shrink-0 z-20">
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <img src="/5s-logo.png" alt="5S" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-sm font-black text-gray-900 leading-tight tracking-wide">5S</h1>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-semibold text-green-600">by Método</span>
                <span className="text-[9px] font-mono text-white bg-purple-600 rounded px-1 py-0.5" title={`Versión de la app (build: ${appVersion})`}>
                  {appVersion && appVersion !== '...' && appVersion !== 'unknown'
                    ? appVersion.match(/v\d+\.\d+\.\d+/)?.[0] || appVersion.split('-').pop() || 'v?'
                    : 'v?'}
                </span>
                {isGestor && <span className="text-[10px] font-semibold text-red-500">· Gestor</span>}
                {!isGestor && currentProject && <span className="text-[10px] text-muted-foreground">· {currentProject.name}</span>}
                {!isGestor && currentZone && <span className="text-[10px] font-medium" style={{ color: currentZone.color || '#3B82F6' }}>· {currentZone.name}</span>}
              </div>
            </div>
            {/* Botón 'Cambiar' — vuelve a la pantalla de selección de proyecto/zona */}
            {currentProject && (
              <Button variant="outline" size="sm" onClick={goToProjectSelector}
                className="ml-2 h-7 px-2 gap-1 text-[10px] border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                title="Cambiar de proyecto o zona">
                <RefreshCw className="h-3 w-3" />
                <span className="hidden sm:inline">Cambiar</span>
              </Button>
            )}
          </div>

          {/* ── GESTOR HEADER: solo Avisos, Manual y Login ── */}
          {isGestor ? (
            <div className="flex items-center gap-2">
              {/* Avisos */}
              <Button variant={unreadNotifs > 0 ? 'default' : 'outline'} size="sm"
                className={`relative gap-1 text-[10px] h-8 ${unreadNotifs > 0 ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500' : 'border-orange-300 text-orange-600 hover:bg-orange-50'}`}
                onClick={async () => {
                  if (currentUser?.id && currentProject?.id) {
                    try { await fetchNotifications(true); } catch (e) { console.error(e); }
                  }
                  toggleNotifPanel();
                }}>
                {unreadNotifs > 0 ? <BellRing className="h-3.5 w-3.5" /> : <Bell className="h-3 w-3" />}
                <span>{unreadNotifs > 0 ? `${unreadNotifs} avisos` : 'Avisos'}</span>
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center animate-pulse">{unreadNotifs > 9 ? '9+' : unreadNotifs}</span>
                )}
              </Button>
              {/* 📅 Calendario de acciones */}
              {currentUser && (
                <Button variant={userTaskCount > 0 ? 'default' : 'outline'} size="sm"
                  className={`relative gap-1 text-[10px] h-8 ${userTaskCount > 0 ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' : 'border-blue-300 text-blue-600 hover:bg-blue-50'}`}
                  onClick={() => setShowUserCalendar(true)}
                  title="Mi calendario de acciones">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span>Calendario</span>
                  {userTaskCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center animate-pulse">{userTaskCount > 9 ? '9+' : userTaskCount}</span>
                  )}
                </Button>
              )}
              {/* Manual */}
              <Button variant="ghost" size="sm" onClick={async () => {
                try {
                  const res = await fetch('/api/manual');
                  if (!res.ok) throw new Error('Download failed');
                  const blob = await res.blob();
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url; link.download = 'Manual_Usuario_5S.pdf';
                  document.body.appendChild(link); link.click();
                  document.body.removeChild(link);
                  window.URL.revokeObjectURL(url);
                } catch { window.open('/Manual_Usuario_5S.pdf', '_blank'); }
              }} className="text-purple-600 hover:text-purple-700 h-8 px-2">
                <FileText className="h-3.5 w-3.5" />
                <span className="text-[10px]">Manual</span>
              </Button>
              {/* User menu (Login) */}
              {currentUser && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1 h-8 px-2">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-700 text-[9px] font-bold">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-[10px] font-medium max-w-[80px] truncate">{currentUser.name}</span>
                      <ChevronDown className="h-2.5 w-2.5 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-2 py-1.5">
                      <p className="text-xs font-medium">{currentUser.name}</p>
                      <p className="text-[10px] text-muted-foreground">{currentUser.email}</p>
                      <Badge className={`${getRoleBadgeColor(currentUser.role)} border mt-1 text-[10px]`}>
                        {getRoleLabel(currentUser.role)}
                      </Badge>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer text-xs">
                      <LogOut className="h-3 w-3 mr-1" /> Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ) : (
          /* ── NON-GESTOR HEADER: mobile vs desktop ── */
          isMobile ? (
            <div className="flex items-center gap-1">
              {/* 🔔 Notification bell - always visible */}
              {canSeeNotifications && (
                <Button variant={unreadNotifs > 0 ? 'default' : 'outline'} size="sm"
                  className={`relative w-11 h-11 ${unreadNotifs > 0 ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500' : 'border-orange-300 text-orange-600 hover:bg-orange-50'}`}
                  onClick={async () => {
                    if (currentUser?.id && currentProject?.id) {
                      try { await fetchNotifications(true); } catch (e) { console.error(e); }
                    }
                    toggleNotifPanel();
                  }}>
                  {unreadNotifs > 0 ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                  {unreadNotifs > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">{unreadNotifs > 9 ? '9+' : unreadNotifs}</span>
                  )}
                </Button>
              )}
              {/* 👤 User avatar - always visible */}
              {currentUser && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-11 h-11 p-0">
                      <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-2 py-1.5">
                      <p className="text-xs font-medium">{currentUser.name}</p>
                      <p className="text-[10px] text-muted-foreground">{currentUser.email}</p>
                      <Badge className={`${getRoleBadgeColor(currentUser.role)} border mt-1 text-[10px]`}>
                        {getRoleLabel(currentUser.role)}
                      </Badge>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer text-xs">
                      <LogOut className="h-3 w-3 mr-1" /> Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {/* ☰ Hamburger menu - opens Sheet with all actions */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="w-11 h-11 p-0">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 p-0">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle className="text-left">Menú</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col p-2 gap-1 overflow-y-auto">
                    {/* 📸 Fotos */}
                    {canSeeNotifications && (
                      <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-purple-50 transition-colors text-left min-h-[44px]"
                        onClick={() => { setMobileMenuOpen(false); openModal('photoLibrary', 2); }}>
                        <Camera className="h-5 w-5 text-purple-500 shrink-0" />
                        <span className="text-sm font-medium text-purple-600">Fotos</span>
                      </button>
                    )}
                    {/* 📚 Estándares */}
                    {canSeeNotifications && (
                      <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-indigo-50 transition-colors text-left min-h-[44px]"
                        onClick={() => { setMobileMenuOpen(false); openModal('standards', 3); }}>
                        <BookOpen className="h-5 w-5 text-indigo-500 shrink-0" />
                        <span className="text-sm font-medium text-indigo-600">Estándares</span>
                      </button>
                    )}
                    {/* 📦 Jaula de Excedentes */}
                    {canSeeNotifications && (
                      <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-red-50 transition-colors text-left min-h-[44px]"
                        onClick={() => { setMobileMenuOpen(false); setActiveTab('jaula'); }}>
                        <Package className="h-5 w-5 text-red-500 shrink-0" />
                        <span className="text-sm font-medium text-red-600">Jaula</span>
                      </button>
                    )}
                    {/* ✅ Activos necesarios */}
                    {canSeeNotifications && (
                      <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-green-50 transition-colors text-left min-h-[44px]"
                        onClick={() => { setMobileMenuOpen(false); setActiveTab('activos'); }}>
                        <BoxSelect className="h-5 w-5 text-green-500 shrink-0" />
                        <span className="text-sm font-medium text-green-600">Activos</span>
                      </button>
                    )}
                    {/* 💧 Punto Limpio (suciedad) */}
                    {canSeeNotifications && (
                      <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-blue-50 transition-colors text-left min-h-[44px]"
                        onClick={() => { setMobileMenuOpen(false); setActiveTab('puntoLimpio'); }}>
                        <Droplets className="h-5 w-5 text-blue-500 shrink-0" />
                        <span className="text-sm font-medium text-blue-600">Punto Limpio</span>
                      </button>
                    )}
                    {/* 📋 Plan de Acción */}
                    {canSeeNotifications && currentUser?.role !== 'auditor' && (
                      <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-orange-50 transition-colors text-left min-h-[44px]"
                        onClick={() => { setMobileMenuOpen(false); setActiveTab('actionplan'); }}>
                        <ListChecks className="h-5 w-5 text-orange-500 shrink-0" />
                        <span className="text-sm font-medium text-orange-600">Plan de Acción</span>
                      </button>
                    )}
                    {/* 📊 Gerencia */}
                    {canSeeGerentePanel && (
                      <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-blue-50 transition-colors text-left min-h-[44px]"
                        onClick={() => { setMobileMenuOpen(false); setShowGerencia(true); }}>
                        <BarChart3 className="h-5 w-5 text-blue-500 shrink-0" />
                        <span className="text-sm font-medium text-blue-600">Gerencia</span>
                      </button>
                    )}
                    {/* 🛡️ Admin */}
                    {isAdmin && (
                      <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors text-left min-h-[44px]"
                        onClick={() => { setMobileMenuOpen(false); setActiveTab('admin'); }}>
                        <Shield className="h-5 w-5 text-slate-500 shrink-0" />
                        <span className="text-sm font-medium text-slate-600">Admin</span>
                      </button>
                    )}
                    {/* 🔓 Lock/Unlock */}
                    {(isAdmin || canSkipSteps) && (
                      <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-amber-50 transition-colors text-left min-h-[44px]"
                        onClick={() => { setMobileMenuOpen(false); setAdminFreeNavigation(!adminFreeNavigation); }}>
                        {adminFreeNavigation ? <Unlock className="h-5 w-5 text-amber-500 shrink-0" /> : <Lock className="h-5 w-5 text-amber-500 shrink-0" />}
                        <span className="text-sm font-medium text-amber-600">{adminFreeNavigation ? 'Navegación libre' : 'Navegación secuencial'}</span>
                      </button>
                    )}
                    <div className="border-t my-1" />
                    {/* 📅 Mi Calendario — acciones del Plan de Acción */}
                    {currentUser && (
                      <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-blue-50 transition-colors text-left min-h-[44px]"
                        onClick={() => { setMobileMenuOpen(false); setShowUserCalendar(true); }}>
                        <CalendarDays className="h-5 w-5 text-blue-500 shrink-0" />
                        <span className="text-sm font-medium text-blue-600">Mi Calendario</span>
                        {userTaskCount > 0 && (
                          <span className="ml-auto bg-red-500 text-white text-[10px] font-bold rounded-full px-2 py-0.5">{userTaskCount}</span>
                        )}
                      </button>
                    )}
                    {/* v2.62: 'Borrar Pasos' eliminado — ya no vale */}

                    {/* 📄 Manual */}
                    <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-purple-50 transition-colors text-left min-h-[44px]"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        (async () => {
                          try {
                            const res = await fetch('/api/manual');
                            if (!res.ok) throw new Error('Download failed');
                            const blob = await res.blob();
                            const url = window.URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url; link.download = 'Manual_Usuario_5S.pdf';
                            document.body.appendChild(link); link.click();
                            document.body.removeChild(link);
                            window.URL.revokeObjectURL(url);
                          } catch { window.open('/Manual_Usuario_5S.pdf', '_blank'); }
                        })();
                      }}>
                      <FileText className="h-5 w-5 text-purple-500 shrink-0" />
                      <span className="text-sm font-medium text-purple-600">Manual</span>
                    </button>
                    {/* 🔄 Refresh */}
                    <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left min-h-[44px]"
                      onClick={() => { setMobileMenuOpen(false); handleReseed(); }}
                      disabled={isSeeding}>
                      <RefreshCw className={`h-5 w-5 text-gray-500 shrink-0 ${isSeeding ? 'animate-spin' : ''}`} />
                      <span className="text-sm font-medium text-gray-600">Actualizar</span>
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto">
            {/* v2.62: 'Borrar Pasos' eliminado — ya no vale */}
            {/* v2.65: orden toolbar — Avisos → Plan Acc. → Calendario → Fotos → Jaula → Activos → P. Limpio → Estándares */}
            {/* v2.68: orden toolbar — Avisos → Calendario → Plan Acc. → Fotos → Jaula → Activos → P. Limpio → Estándares */}
            {/* 🔔 Notification bell */}
            {canSeeNotifications && (
              <Button variant={unreadNotifs > 0 ? 'default' : 'outline'} size="sm"
                className={`relative gap-1 text-[10px] h-8 ${unreadNotifs > 0 ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500' : 'border-orange-300 text-orange-600 hover:bg-orange-50'}`}
                onClick={async () => {
                  if (currentUser?.id && currentProject?.id) {
                    try { await fetchNotifications(true); } catch (e) { console.error(e); }
                  }
                  toggleNotifPanel();
                }}>
                {unreadNotifs > 0 ? <BellRing className="h-3.5 w-3.5" /> : <Bell className="h-3 w-3" />}
                <span className="hidden sm:inline">{unreadNotifs > 0 ? `${unreadNotifs} avisos` : 'Avisos'}</span>
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center animate-pulse">{unreadNotifs > 9 ? '9+' : unreadNotifs}</span>
                )}
              </Button>
            )}
            {/* 📅 Calendario de acciones */}
            {currentUser && (
              <Button variant={userTaskCount > 0 ? 'default' : 'outline'} size="sm"
                className={`relative gap-1 text-[10px] h-8 ${userTaskCount > 0 ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' : 'border-blue-300 text-blue-600 hover:bg-blue-50'}`}
                onClick={() => setShowUserCalendar(true)}
                title="Mi calendario de acciones">
                <CalendarDays className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Calendario</span>
                {userTaskCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center animate-pulse">{userTaskCount > 9 ? '9+' : userTaskCount}</span>
                )}
              </Button>
            )}
            {/* 📋 Plan de Acción General */}
            {canSeeNotifications && currentUser?.role !== 'auditor' && (
              <Button variant="outline" size="sm"
                className="gap-1 text-[10px] h-8 border-orange-300 text-orange-600 hover:bg-orange-50"
                onClick={() => setActiveTab('actionplan')}
                title="Plan de Acción General">
                <ListChecks className="h-3 w-3" />
                <span className="hidden sm:inline">Plan Acc.</span>
              </Button>
            )}
            {/* 📸 Biblioteca de Fotos */}
            {canSeeNotifications && (
              <Button variant="outline" size="sm"
                className="gap-1 text-[10px] h-8 border-purple-300 text-purple-600 hover:bg-purple-50"
                onClick={() => openModal('photoLibrary', 2)}
                title="Biblioteca de Fotos">
                <Camera className="h-3 w-3" />
                <span className="hidden sm:inline">Fotos</span>
              </Button>
            )}
            {/* 📦 Jaula de Excedentes */}
            {canSeeNotifications && (
              <Button variant="outline" size="sm"
                className="gap-1 text-[10px] h-8 border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => setActiveTab('jaula')}
                title="Jaula de Excedentes">
                <Package className="h-3 w-3" />
                <span className="hidden sm:inline">Jaula</span>
              </Button>
            )}
            {/* ✅ Activos necesarios */}
            {canSeeNotifications && (
              <Button variant="outline" size="sm"
                className="gap-1 text-[10px] h-8 border-green-300 text-green-600 hover:bg-green-50"
                onClick={() => setActiveTab('activos')}
                title="Activos (Necesarios)">
                <BoxSelect className="h-3 w-3" />
                <span className="hidden sm:inline">Activos</span>
              </Button>
            )}
            {/* 💧 Punto Limpio (suciedad) */}
            {canSeeNotifications && (
              <Button variant="outline" size="sm"
                className="gap-1 text-[10px] h-8 border-blue-300 text-blue-600 hover:bg-blue-50"
                onClick={() => setActiveTab('puntoLimpio')}
                title="Punto Limpio (Suciedad)">
                <Droplets className="h-3 w-3" />
                <span className="hidden sm:inline">P. Limpio</span>
              </Button>
            )}
            {/* 📚 Biblioteca de Estándares */}
            {canSeeNotifications && (
              <Button variant="outline" size="sm"
                className="gap-1 text-[10px] h-8 border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                onClick={() => openModal('standards', 3)}
                title="Biblioteca de Estándares">
                <BookOpen className="h-3 w-3" />
                <span className="hidden sm:inline">Estándares</span>
              </Button>
            )}
            {/* 📊 Gerencia — accessible from header for roles with view_progress */}
            {canSeeGerentePanel && (
              <Button variant="outline" size="sm"
                className="gap-1 text-[10px] h-8 border-blue-300 text-blue-600 hover:bg-blue-50"
                onClick={() => setShowGerencia(true)}
                title="Panel de Gerencia">
                <BarChart3 className="h-3 w-3" />
                <span className="hidden sm:inline">Gerencia</span>
              </Button>
            )}
            {/* 🛡️ Admin — ahora es tab principal, no botón del header */}
            {/* Free navigation lock */}
            {(isAdmin || canSkipSteps) && (
              <Button variant={adminFreeNavigation ? 'default' : 'outline'} size="sm"
                onClick={() => setAdminFreeNavigation(!adminFreeNavigation)}
                className={`gap-1 text-[10px] h-8 ${adminFreeNavigation ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-500' : 'text-amber-600 border-amber-300 hover:bg-amber-50'}`}
                title={adminFreeNavigation ? 'Navegación libre activada' : 'Navegación secuencial'}>
                {adminFreeNavigation ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
              </Button>
            )}
            {canManageTeam && isAdmin && (
              <Button variant="ghost" size="sm" onClick={() => setActiveTab('admin')} className="text-green-600 hover:text-green-700 h-8 px-1.5" title="Administración">
                <Shield className="h-3.5 w-3.5" />
              </Button>
            )}

            <Button variant="ghost" size="sm" onClick={async () => {
              try {
                const res = await fetch('/api/manual');
                if (!res.ok) throw new Error('Download failed');
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url; link.download = 'Manual_Usuario_5S.pdf';
                document.body.appendChild(link); link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
              } catch { window.open('/Manual_Usuario_5S.pdf', '_blank'); }
            }} className="text-purple-600 hover:text-purple-700 h-8 px-1.5">
              <FileText className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReseed} disabled={isSeeding} className="text-muted-foreground h-8 px-1.5">
              <RefreshCw className={`h-3.5 w-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
            </Button>
            {/* User menu */}
            {currentUser && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1 h-8 px-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-[9px] font-bold">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[10px] font-medium max-w-[60px] truncate hidden sm:inline">{currentUser.name}</span>
                    <ChevronDown className="h-2.5 w-2.5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-xs font-medium">{currentUser.name}</p>
                    <p className="text-[10px] text-muted-foreground">{currentUser.email}</p>
                    <Badge className={`${getRoleBadgeColor(currentUser.role)} border mt-1 text-[10px]`}>
                      {getRoleLabel(currentUser.role)}
                    </Badge>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer text-xs">
                    <LogOut className="h-3 w-3 mr-1" /> Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          )
          )}
        </div>

        {/* Tab Navigation Bar — desktop: top tabs, mobile: hidden (bottom nav instead) */}
        {!isMobile && (
        <div className="border-t bg-white flex items-center gap-0 px-2 sm:px-4 overflow-x-auto">
          {availableTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-2 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-green-500 text-green-700 bg-green-50/50'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        )}
      </header>

      {/* Notification dropdown */}
      {showNotifs && (canSeeNotifications || isGestor) && (
        <div className="fixed top-12 right-2 sm:right-16 left-2 sm:left-auto z-50 sm:w-80 w-[calc(100vw-16px)] bg-white border rounded-lg shadow-xl max-h-96 overflow-y-auto">
          <div className="p-3 border-b flex items-center justify-between">
            <span className="text-sm font-semibold">Notificaciones</span>
            <div className="flex items-center gap-2">
              {notifs.length > 0 && (
                <button className="text-[10px] text-blue-600 hover:underline" onClick={async () => {
                  if (currentUser?.id) {
                    await fetch('/api/notifications', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ markAllRead: true, userId: currentUser.id }) });
                    markAllNotificationsRead();
                  }
                }}>Marcar todo como leído</button>
              )}
              {/* v2.87: botón X para cerrar el panel de avisos */}
              <button
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded p-0.5 transition-colors"
                onClick={() => toggleNotifPanel(false)}
                title="Cerrar avisos"
                aria-label="Cerrar avisos"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          {notifs.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">No hay notificaciones</div>
          ) : (
            <div className="divide-y">
              {notifs.map((n: any) => {
                // v2.61: Avisos relacionados con ActionItems → click abre calendario
                const isActionAviso = ['new_action_item', 'action_due_today', 'action_overdue'].includes(n.type);
                const handleActionAvisoClick = async () => {
                  if (!isActionAviso) return;
                  // Marcar como leído
                  try {
                    await fetch('/api/notifications', {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ notificationId: n.id, read: true }),
                    });
                  } catch (e) { /* ignore */ }
                  markNotificationRead(n.id);
                  toggleNotifPanel(false);
                  setShowUserCalendar(true);
                };
                return (
                <div
                  key={n.id}
                  className={`p-3 ${n.read ? 'bg-white' :
                    n.type === 'autoeval_ready' ? 'bg-amber-50' :
                    n.type === 'autoeval_requested' ? 'bg-amber-50' :
                    n.type === 'audit_requested' ? 'bg-orange-50' :
                    n.type === 'audit_ready' ? 'bg-emerald-50' :
                    n.type === 'audit_proposed_dates' ? 'bg-sky-50' :
                    n.type === 'autoeval_proposed_dates' ? 'bg-sky-50' :
                    n.type === 'audit_rejected_proposal' ? 'bg-orange-50' :
                    n.type === 'autoeval_rejected_proposal' ? 'bg-amber-50' :
                    n.type === 'evaluation_scheduled' ? 'bg-purple-50' :
                    n.type === 'evaluation_accepted' ? 'bg-green-50' :
                    n.type === 'evaluation_completed' ? 'bg-green-50' :
                    n.type === 'evaluation_expired' ? 'bg-red-50' :
                    n.type === 'new_action_item' ? 'bg-blue-50' :
                    n.type === 'action_due_today' ? 'bg-orange-50' :
                    n.type === 'action_overdue' ? 'bg-red-50' :
                    'bg-blue-50'} ${isActionAviso && !n.read ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
                  onClick={isActionAviso && !n.read ? handleActionAvisoClick : undefined}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {n.type === 'autoeval_ready' && <BellRing className="h-3 w-3 text-amber-600 shrink-0" />}
                    {n.type === 'autoeval_requested' && <BellRing className="h-3 w-3 text-amber-600 shrink-0" />}
                    {n.type === 'audit_requested' && <BellRing className="h-3 w-3 text-orange-500 shrink-0" />}
                    {n.type === 'audit_ready' && <ShieldCheck className="h-3 w-3 text-green-500 shrink-0" />}
                    {n.type === 'audit_proposed_dates' && <CalendarDays className="h-3 w-3 text-sky-600 shrink-0" />}
                    {n.type === 'autoeval_proposed_dates' && <CalendarDays className="h-3 w-3 text-sky-600 shrink-0" />}
                    {n.type === 'audit_rejected_proposal' && <AlertTriangle className="h-3 w-3 text-orange-600 shrink-0" />}
                    {n.type === 'autoeval_rejected_proposal' && <AlertTriangle className="h-3 w-3 text-amber-600 shrink-0" />}
                    {n.type === 'audit_meeting_accepted' && <CheckSquare className="h-3 w-3 text-green-600 shrink-0" />}
                    {n.type === 'evaluation_scheduled' && <CalendarDays className="h-3 w-3 text-purple-500 shrink-0" />}
                    {n.type === 'evaluation_accepted' && <CheckSquare className="h-3 w-3 text-green-600 shrink-0" />}
                    {n.type === 'evaluation_completed' && <CheckSquare className="h-3 w-3 text-green-600 shrink-0" />}
                    {n.type === 'evaluation_expired' && <AlertTriangle className="h-3 w-3 text-red-500 shrink-0" />}
                    {n.type === 'new_action_item' && <CalendarDays className="h-3 w-3 text-blue-500 shrink-0" />}
                    {n.type === 'action_due_today' && <AlertTriangle className="h-3 w-3 text-orange-500 shrink-0" />}
                    {n.type === 'action_overdue' && <AlertTriangle className="h-3 w-3 text-red-500 shrink-0" />}
                    <p className="text-xs font-semibold flex-1">{n.title}</p>
                    {isActionAviso && !n.read && (
                      <span className="text-[9px] text-blue-600 font-semibold">→ Calendario</span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5 whitespace-pre-line">{n.message}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-[9px] text-muted-foreground">{new Date(n.createdAt).toLocaleString('es-ES')}</p>
                    {/* v2.68: Programar fecha de autoeval/auditoría — botón visible para responsable/auditor.
                        v2.69: visible siempre (leída o no) — el botón siga disponible para reprogramar.
                        v2.94: añadido `autoeval_ready` — el backend genera esta notif automáticamente
                                cuando pasos 1-3 están completos y el 4 no. Antes el responsable no veía
                                el botón accionable porque solo se renderizaba para `autoeval_requested`
                                (que es la notif manual del botón "🔔 Autoeval" del empleado) y para
                                `audit_requested`. */}
                    {(n.type === 'autoeval_ready' || n.type === 'autoeval_requested' || n.type === 'audit_requested') && (
                      <button
                        className="text-[10px] font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 px-2 py-0.5 rounded border border-blue-300 transition-colors flex items-center gap-0.5"
                        onClick={async (e) => {
                          e.stopPropagation();
                          // v2.69: NO marcamos como leída aquí — el botón sigue visible siempre.
                          // Solo abrimos el diálogo.
                          // Find empleado that requested (we need to know who to notify back)
                          let empleadoId: string | undefined;
                          try {
                            const membersRes = await fetch(`/api/projects/${currentProject?.id}/members`);
                            const membersData = await membersRes.json();
                            const empleados = (membersData?.members || []).filter((m: any) => m.role === 'empleado');
                            // v2.74.5: priorizar zona, fallback a cualquier empleado
                            if (n.zoneId) {
                              const zoneEmps = empleados.filter((m: any) => m.zoneId === n.zoneId);
                              if (zoneEmps.length >= 1) {
                                empleadoId = zoneEmps[0].userId;
                              }
                            }
                            if (!empleadoId && empleados.length >= 1) {
                              empleadoId = empleados[0].userId;
                            }
                          } catch (e) { /* ignore */ }

                          setScheduleDialog({
                            open: true,
                            notifId: n.id,
                            sStep: n.sStep,
                            miniStep: (n.type === 'autoeval_ready' || n.type === 'autoeval_requested') ? 4 : 5,
                            zoneId: n.zoneId,
                            projectId: n.projectId || currentProject?.id,
                            empleadoId,
                            responsableId: currentUser?.id,
                            type: n.type,
                          });
                          // Default date = tomorrow
                          const tomorrow = new Date();
                          tomorrow.setDate(tomorrow.getDate() + 1);
                          setScheduleDate(tomorrow.toISOString().slice(0, 10));
                          setScheduleTime('10:00');
                          toggleNotifPanel(false);
                        }}
                      >
                        <Calendar className="h-2.5 w-2.5" />
                        Programar fecha
                      </button>
                    )}
                    {/* v2.74: Botón "Aceptar" para el asistente cuando recibe 'evaluation_scheduled'.
                        - v2.100: ahora funciona para CUALQUIER rol que sea el asistente (empleadoId)
                          del schedule — no solo 'empleado'. En auditoría el asistente es el
                          responsable de zona, en autoeval es el empleado.
                        - Solo si la notif no está leída (para no repetir la aceptación).
                        - Click: PATCH estado='aceptada' + marca notif como leída.
                        - Backend envía notificación al responsable confirmando la aceptación. */}
                    {n.type === 'evaluation_scheduled' && !n.read && (() => {
                      // v2.100: derivar el asistente del schedule desde el metadata
                      let meta: any = null;
                      try { meta = typeof n.metadata === 'string' ? JSON.parse(n.metadata) : n.metadata; } catch {}
                      const asistenteId = meta?.asistenteId || meta?.empleadoId;
                      return asistenteId === currentUser?.id;
                    })() && (
                      <button
                        className="text-[10px] font-semibold text-green-700 bg-green-100 hover:bg-green-200 px-2 py-0.5 rounded border border-green-300 transition-colors flex items-center gap-0.5"
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            // Buscar el schedule correspondiente a esta notificación
                            // (sStep + projectId + zoneId + miniStep derivado del título).
                            // El endpoint POST del schedule guarda sStep y miniStep en el schedule;
                            // aquí necesitamos recuperar el id del schedule.
                            const sStep = n.sStep;
                            const projectId = n.projectId || currentProject?.id;
                            const zoneId = n.zoneId || undefined;
                            if (!projectId || !sStep) {
                              alert('No se pudo identificar la cita. Contacta con el responsable.');
                              return;
                            }
                            // Deducir miniStep: por defecto 4 (autoeval). El título contiene
                            // "Autoevaluación" o "Auditoría" — lo usamos para distinguir.
                            const titleLower = (n.title || '').toLowerCase();
                            const miniStep = titleLower.includes('auditor') ? 5 : 4;

                            // Buscar el schedule
                            const listRes = await fetch(
                              `/api/evaluation-schedule?sStep=${sStep}&miniStep=${miniStep}&projectId=${projectId}${zoneId ? `&zoneId=${zoneId}` : ''}`
                            );
                            const listData = await listRes.json();
                            const scheduleId = listData?.data?.id;
                            if (!scheduleId) {
                              alert('No se encontró la cita programada. Puede que ya se haya procesado.');
                              return;
                            }

                            // PATCH estado='aceptada'
                            const patchRes = await fetch('/api/evaluation-schedule', {
                              method: 'PATCH',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ id: scheduleId, estado: 'aceptada' }),
                            });
                            const patchData = await patchRes.json();
                            if (!patchData?.success) {
                              alert(`Error al aceptar: ${patchData?.error || 'desconocido'}`);
                              return;
                            }

                            // Marcar notif como leída
                            await fetch('/api/notifications', {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ notificationId: n.id, read: true }),
                            });
                            markNotificationRead(n.id);

                            // Refrescar schedules en el store para que la UI se actualice
                            try { await use5SStore.getState().fetchEvaluationSchedules(); } catch {}

                            toast.success('Cita aceptada. El responsable ha sido notificado.');
                          } catch (err) {
                            console.error('Error accepting schedule:', err);
                            alert('Error al aceptar la cita.');
                          }
                        }}
                      >
                        <CheckSquare className="h-2.5 w-2.5" />
                        Aceptar cita
                      </button>
                    )}
                    {/* v2.100: Botones para aceptar/rechazar fechas propuestas por el ejecutor.
                        - Se muestra cuando el asistente recibe `audit_proposed_dates` o
                          `autoeval_proposed_dates`.
                        - Muestra botones "Aceptar" para cada fecha propuesta y un botón
                          "Rechazar todas" al final.
                        - Click en una fecha → PATCH estado='aceptada' con fechaElegidaIdx.
                        - Click en rechazar → PATCH estado='reprogramada' (vuelve a propuesta). */}
                    {(n.type === 'audit_proposed_dates' || n.type === 'autoeval_proposed_dates') && !n.read && (() => {
                      let meta: any = null;
                      try { meta = typeof n.metadata === 'string' ? JSON.parse(n.metadata) : n.metadata; } catch {}
                      const scheduleId = meta?.scheduleId;
                      const propuestas: { fecha: string; hora: string }[] = meta?.fechasPropuestas || [];
                      if (!scheduleId || propuestas.length === 0) return null;
                      return (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {propuestas.map((p, idx) => (
                            <button
                              key={idx}
                              className="text-[10px] font-semibold text-green-700 bg-green-100 hover:bg-green-200 px-2 py-0.5 rounded border border-green-300 transition-colors flex items-center gap-0.5"
                              onClick={async (e) => {
                                e.stopPropagation();
                                try {
                                  const patchRes = await fetch('/api/evaluation-schedule', {
                                    method: 'PATCH',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      id: scheduleId,
                                      estado: 'aceptada',
                                      fechaElegidaIdx: idx,
                                    }),
                                  });
                                  const patchData = await patchRes.json();
                                  if (!patchData?.success) {
                                    alert(`Error al aceptar: ${patchData?.error || 'desconocido'}`);
                                    return;
                                  }
                                  // Marcar notif como leída
                                  await fetch('/api/notifications', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ notificationId: n.id, read: true }),
                                  });
                                  markNotificationRead(n.id);
                                  try { await use5SStore.getState().fetchEvaluationSchedules(); } catch {}
                                  toast.success(`Cita aceptada para el ${p.fecha.split('-').reverse().join('/')} a las ${p.hora}.`);
                                } catch (err) {
                                  console.error('Error aceptando propuesta:', err);
                                  alert('Error al aceptar la propuesta.');
                                }
                              }}
                            >
                              <CheckSquare className="h-2.5 w-2.5" />
                              {p.fecha.split('-').reverse().join('/')} · {p.hora}
                            </button>
                          ))}
                          <button
                            className="text-[10px] font-semibold text-red-700 bg-red-100 hover:bg-red-200 px-2 py-0.5 rounded border border-red-300 transition-colors flex items-center gap-0.5"
                            onClick={async (e) => {
                              e.stopPropagation();
                              const motivo = prompt('Motivo del rechazo (opcional):') || '';
                              try {
                                const patchRes = await fetch('/api/evaluation-schedule', {
                                  method: 'PATCH',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({
                                    id: scheduleId,
                                    estado: 'reprogramada',
                                    notas: motivo || 'Propuestas rechazadas por el asistente',
                                  }),
                                });
                                const patchData = await patchRes.json();
                                if (!patchData?.success) {
                                  alert(`Error al rechazar: ${patchData?.error || 'desconocido'}`);
                                  return;
                                }
                                // Marcar notif como leída
                                await fetch('/api/notifications', {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ notificationId: n.id, read: true }),
                                });
                                markNotificationRead(n.id);
                                try { await use5SStore.getState().fetchEvaluationSchedules(); } catch {}
                                toast.success('Propuestas rechazadas. Se ha pedido al ejecutor que proponga nuevas fechas.');
                              } catch (err) {
                                console.error('Error rechazando propuestas:', err);
                                alert('Error al rechazar las propuestas.');
                              }
                            }}
                          >
                            <X className="h-2.5 w-2.5" />
                            Rechazar todas
                          </button>
                        </div>
                      );
                    })()}
                    {/* v2.100: Botón "Proponer fechas" para el ejecutor (auditor/responsable) que
                        recibe `audit_requested` o `autoeval_requested` cuando el asistente le
                        pide formalmente auditoría. Abre el AuditoriaModal/AutoevaluacionModal
                        con la sección "Proponer fechas" visible. */}
                    {(n.type === 'audit_requested' || n.type === 'autoeval_requested') && (() => {
                      let meta: any = null;
                      try { meta = typeof n.metadata === 'string' ? JSON.parse(n.metadata) : n.metadata; } catch {}
                      const scheduleId = meta?.scheduleId;
                      // v2.100: si el schedule está en estado 'solicitado', el ejecutor puede
                      // proponer fechas. Si no tiene scheduleId, la notif es informal (estilo viejo).
                      if (!scheduleId) return null;
                      const miniStep = n.type === 'audit_requested' ? 5 : 4;
                      return (
                        <button
                          className="text-[10px] font-semibold text-sky-700 bg-sky-100 hover:bg-sky-200 px-2 py-0.5 rounded border border-sky-300 transition-colors flex items-center gap-0.5"
                          onClick={async (e) => {
                            e.stopPropagation();
                            // Abrir el modal con la sección "Proponer fechas" activa
                            setScheduleDialog({
                              open: true,
                              notifId: n.id,
                              sStep: n.sStep,
                              miniStep,
                              zoneId: n.zoneId,
                              projectId: n.projectId || currentProject?.id,
                              type: 'propose_dates',
                              scheduleId,
                            });
                            toggleNotifPanel(false);
                          }}
                        >
                          <Calendar className="h-2.5 w-2.5" />
                          Proponer fechas
                        </button>
                      );
                    })()}
                    {/* v2.86: Botón "Reprogramar ahora" para notificaciones de cita expirada.
                        - Visible para responsable/auditor/admin SIEMPRE (leída o no).
                        - Abre el diálogo de programación con los datos del schedule vencido.
                        - El backend ya rechazará fechas pasadas (validación v2.86). */}
                    {n.type === 'evaluation_expired' && (isResponsable || currentUser?.role === 'auditor' || isAdmin) && (() => {
                      // Extraer scheduleId y datos del metadata
                      let meta: any = null;
                      try { meta = typeof n.metadata === 'string' ? JSON.parse(n.metadata) : n.metadata; } catch {}
                      const miniStep = meta?.miniStep || (n.title?.toLowerCase().includes('audit') ? 5 : 4);
                      return (
                        <button
                          className="text-[10px] font-semibold text-red-700 bg-red-100 hover:bg-red-200 px-2 py-0.5 rounded border border-red-300 transition-colors flex items-center gap-0.5 animate-pulse"
                          onClick={async (e) => {
                            e.stopPropagation();
                            // Buscar empleado de la zona (para notificarle)
                            let empleadoId: string | undefined;
                            try {
                              const membersRes = await fetch(`/api/projects/${currentProject?.id}/members`);
                              const membersData = await membersRes.json();
                              const empleados = (membersData?.members || []).filter((m: any) => m.role === 'empleado');
                              if (n.zoneId) {
                                const zoneEmps = empleados.filter((m: any) => m.zoneId === n.zoneId);
                                if (zoneEmps.length >= 1) {
                                  empleadoId = zoneEmps[0].userId;
                                }
                              }
                              if (!empleadoId && empleados.length >= 1) {
                                empleadoId = empleados[0].userId;
                              }
                            } catch (e) { /* ignore */ }

                            // Abrir diálogo con datos del schedule vencido
                            setScheduleDialog({
                              open: true,
                              notifId: n.id,
                              sStep: n.sStep,
                              miniStep,
                              zoneId: n.zoneId,
                              projectId: n.projectId || currentProject?.id,
                              empleadoId,
                              responsableId: currentUser?.id,
                              type: 'evaluation_expired',
                            });
                            // v2.86: Default = mañana a las 10:00 (NO usar la fecha vencida)
                            const tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            setScheduleDate(tomorrow.toISOString().slice(0, 10));
                            setScheduleTime('10:00');
                            toggleNotifPanel(false);
                          }}
                        >
                          <Calendar className="h-2.5 w-2.5" />
                          Reprogramar ahora
                        </button>
                      );
                    })()}
                    {/* Accept audit meeting button — only for audit_requested notifications and users with accept_audit_meeting permission */}
                    {n.type === 'audit_requested' && !n.read && canAcceptAuditMeeting && (
                      <button
                        className="text-[10px] font-semibold text-green-700 bg-green-100 hover:bg-green-200 px-2 py-0.5 rounded border border-green-300 transition-colors"
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            // Mark this notification as read
                            await fetch('/api/notifications', {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ notificationId: n.id, read: true }),
                            });
                            // Send acceptance notification back to the employee who requested
                            // Find the zone info for context
                            const zoneName = currentZone?.name || 'la zona';
                            const sStepName = n.sStep ? `S${n.sStep} (${S_STEPS.find(s => s.id === n.sStep)?.japaneseName || ''})` : 'la auditoría';
                            // Notify all employees in the zone
                            if (currentProject?.id && currentZone?.id) {
                              const membersRes = await fetch(`/api/projects/${currentProject.id}/members`);
                              const membersData = await membersRes.json();
                              const employees = (membersData?.members || []).filter((m: any) => m.role === 'empleado');
                              for (const emp of employees) {
                                await fetch('/api/notifications', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({
                                    userId: emp.userId,
                                    type: 'audit_meeting_accepted',
                                    title: `Reunión aceptada: ${sStepName}`,
                                    message: `${currentUser?.name || 'El auditor/responsable'} ha aceptado la reunión de auditoría para ${sStepName} en la zona "${zoneName}".`,
                                    sStep: n.sStep,
                                    zoneId: currentZone.id,
                                    projectId: currentProject.id,
                                  }),
                                });
                              }
                            }
                            // Refresh notifications
                            markNotificationRead(n.id);
                            alert('Reunión de auditoría aceptada. Se ha notificado al empleado.');
                          } catch (err) {
                            console.error('Error accepting meeting:', err);
                            alert('Error al aceptar la reunión.');
                          }
                        }}
                      >
                        ✓ Aceptar reunión
                      </button>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Main content - SINGLE SCREEN */}
      <main className={`flex-1 overflow-hidden flex flex-col ${isMobile ? 'pb-14' : ''}`}>
        {!isInitialized || isSeeding ? (
          <div className="flex-1 flex items-center justify-center gap-4">
            <Loader2 className="h-10 w-10 text-green-500 animate-spin" />
            <p className="text-muted-foreground">{isSeeding ? 'Inicializando datos...' : 'Cargando...'}</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0">
            <AnimatePresence mode="wait">
              {/* ═══ TAB: BOARD 5S — Board-Centric Layout ═══ */}
              {activeTab === 'board' && (
                <motion.div key="board" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col min-h-0">
                  {/* TOP: Hero Board - Centered and Prominent (scrollable area) */}
                  <div className="flex-1 min-h-0 overflow-auto flex flex-col items-center justify-start py-2">
                    {/* Zone required message for empleados without zone assigned */}
                    {!currentZone && currentUser && !hasPermission('manage_zones') && getAvailableZones().length === 0 && (
                      <div className="text-center space-y-3 py-8">
                        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
                          <MapPin className="h-8 w-8 text-amber-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Sin zona asignada</h3>
                        <p className="text-sm text-muted-foreground max-w-md">Tu responsable aún no te ha asignado ninguna zona. Una vez asignada, podrás comenzar tu formación y completar los pasos 5S.</p>
                      </div>
                    )}
                    {/* Zone selector prompt when user has zones but none selected */}
                    {!currentZone && getAvailableZones().length > 0 && (
                      <div className="text-center space-y-2 py-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                          <MapPin className="h-6 w-6 text-blue-500" />
                        </div>
                        <p className="text-xs text-muted-foreground">Selecciona una zona en la barra superior para comenzar</p>
                      </div>
                    )}
                    {currentZone && (
                      <div className="w-full flex-1 min-h-0 flex items-center justify-center px-2">
                        <Board5S onSStepClick={handleSStepClick} />
                      </div>
                    )}
                    {/* Notification: show which S-steps are ready for audit — only for users who can notify (employees) */}
                    {currentZone && canNotifyAudit && (() => {
                      const readyForAudit: number[] = [];
                      for (let s = 1; s <= 5; s++) {
                        // Check using BOTH zone-level AND employee-level progress
                        const steps1to4Done = [1,2,3,4].every(ms => {
                          const zoneCompleted = progress.some(p =>
                            p.sStep === s && p.miniStep === ms &&
                            (p.zoneId === currentZone.id || p.zoneId === null) &&
                            p.completed
                          );
                          const empCompleted = employeeProgress.some(ep =>
                            ep.sStep === s && ep.miniStep === ms &&
                            ep.zoneId === currentZone.id &&
                            ep.completed
                          );
                          return zoneCompleted || empCompleted;
                        });
                        const step5Done = progress.some(p =>
                          p.sStep === s && p.miniStep === 5 &&
                          (p.zoneId === currentZone.id || p.zoneId === null) &&
                          p.completed
                        );
                        if (steps1to4Done && !step5Done) readyForAudit.push(s);
                      }
                      if (readyForAudit.length === 0) return null;
                      return (
                        <div className="mt-2 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-2 max-w-md mx-auto">
                          <BellRing className="h-4 w-4 text-orange-500 shrink-0" />
                          <span className="text-xs text-orange-700 font-medium">
                            Pendiente de auditoría: {readyForAudit.map(s => `S${s} (${S_STEPS.find(ss => ss.id === s)?.japaneseName})`).join(', ')}
                          </span>
                        </div>
                      );
                    })()}

                  </div>

                  {/* BOTTOM: S-Step Cards — Compact horizontal row (only when zone selected) */}
                  {currentZone && (
                  <div className="shrink-0 border-t bg-white px-2 py-2 z-10">
                    <div className={`grid gap-2 max-w-5xl mx-auto ${isMobile ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'}`}>
                      {S_STEPS.map(s => {
                        const earned = isQuesitoEarned(s.id);
                        const zoneId = currentZone?.id;

                        // Count completed mini-steps using getMiniStepStatus (consistent with Board5S)
                        // This properly counts employeeProgress for individual steps like Formación
                        let completedMiniSteps = 0;
                        for (let ms = 1; ms <= 5; ms++) {
                          const status = getMiniStepStatus(s.id, ms);
                          if (status === 'completed' || status === 'completed_viewonly') completedMiniSteps++;
                        }
                        const pct = Math.min(Math.round((completedMiniSteps / 5) * 100), 100);

                        return (
                          <div
                            key={s.id}
                            className={`rounded-xl border-2 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-md ${
                              earned
                                ? 'border-green-500 bg-gradient-to-b from-green-50 to-emerald-50 shadow-md shadow-green-100'
                                : 'border-gray-200 bg-white'
                            }`}
                            onClick={() => handleSStepClick(s.id)}
                          >
                            {/* S Label header */}
                            <div
                              className={`flex items-center justify-center gap-1.5 ${isMobile ? 'py-2.5' : 'py-1.5'} ${earned ? 'bg-green-500' : ''}`}
                              style={!earned ? { backgroundColor: `${s.color}20` } : undefined}
                            >
                              <div className={`${isMobile ? 'w-8 h-8' : 'w-6 h-6'} rounded-lg flex items-center justify-center text-white ${isMobile ? 'text-sm' : 'text-xs'} font-black ${earned ? 'bg-green-600 ring-1 ring-yellow-400' : ''}`}
                                style={!earned ? { backgroundColor: s.color } : undefined}>
                                {earned ? '★' : s.id}
                              </div>
                              <span className={`${isMobile ? 'text-sm' : 'text-[10px]'} font-bold ${earned ? 'text-white' : ''}`} style={!earned ? { color: s.color } : undefined}>
                                {s.name}
                              </span>
                            </div>

                            {/* Mini-step dots */}
                            <div className={isMobile ? 'flex items-center justify-center gap-2 py-2.5 px-1' : 'flex items-center justify-center gap-1 py-1.5 px-1'}>
                              {MINI_STEPS.map(ms => {
                                const status = getMiniStepStatus(s.id, ms.id);
                                const effectiveStatus = status;
                                // 'completed_viewonly': step is done but user only has a0 (view) — show ✓ and can view (read-only)
                                const isCompleted = effectiveStatus === 'completed' || effectiveStatus === 'completed_viewonly';
                                const canOpenModal = effectiveStatus === 'completed' || effectiveStatus === 'completed_viewonly' || effectiveStatus === 'available';
                                const modalType = getModalType(ms.id, s.id);
                                // Lock reasons based on permissions and progression
                                const canPerformThisStep = canPerformPerm(s.id, ms.id);
                                const canViewThisStep = canViewPerm(s.id, ms.id);
                                // Check if previous step is completed (for intra-S progressive unlocking tooltip)
                                const isPrevStepDone = ms.id === 1 || progress.some(p =>
                                  p.sStep === s.id && p.miniStep === ms.id - 1 && (p.zoneId === currentZone?.id || p.zoneId === null) && p.completed
                                );
                                // Check if previous S is completed (for inter-S progressive unlocking tooltip)
                                const isPrevSDone = s.id === 1 || (() => {
                                  for (let ms2 = 1; ms2 <= 5; ms2++) {
                                    if (!progress.some(p => p.sStep === s.id - 1 && p.miniStep === ms2 && (p.zoneId === currentZone?.id || p.zoneId === null) && p.completed)) return false;
                                  }
                                  return true;
                                })();
                                const lockReason = canSkipSteps && !adminFreeNavigation
                                  ? 'Solo lectura (candado cerrado)'
                                  : effectiveStatus === 'completed_viewonly'
                                    ? 'Solo lectura (completado)'
                                    : effectiveStatus === 'locked' && canViewThisStep && !canPerformThisStep
                                      ? 'Solo lectura'
                                      : effectiveStatus === 'locked' && canPerformThisStep && !isPrevSDone
                                        ? `Completa S${s.id - 1}`
                                        : ms.id === 5 && effectiveStatus === 'locked' && canPerformThisStep && !isPrevStepDone
                                          ? 'Completa pasos 1-4'
                                          : ms.id > 1 && ms.id < 5 && effectiveStatus === 'locked' && canPerformThisStep && !isPrevStepDone
                                            ? `Completa paso ${ms.id - 1}`
                                            : effectiveStatus === 'locked'
                                              ? 'Sin permiso'
                                              : '';
                                // Get score for steps 4 and 5
                                const stepScore = (ms.id === 4 || ms.id === 5)
                                  ? progress.find(p => p.sStep === s.id && p.miniStep === ms.id && (p.zoneId === currentZone?.id || p.zoneId === null))?.score
                                  : null;

                                return (
                                  <div key={ms.id} className="flex flex-col items-center">
                                    {/* Score badge above step 4 and 5 dots */}
                                    {(ms.id === 4 || ms.id === 5) && stepScore != null && (
                                      <span className={`text-[7px] font-bold ${stepScore >= 70 ? 'text-green-600' : 'text-red-500'} leading-none mb-0.5`}>
                                        {stepScore}%
                                      </span>
                                    )}
                                    {/* "Request autoeval" button above step 4 when steps 1-3 are completed but 4 isn't — notify responsable to perform autocheck.
                                        v2.62: el aviso NO se envía al propio empleado. Tras click, el botón cambia
                                        a 'Solicitado ✓' (persistente en localStorage). */}
                                    {ms.id === 4 && canNotifyAutoeval && (() => {
                                      // Check if steps 1-3 are all completed (zone-level OR employee-level)
                                      const steps1to3Done = [1,2,3].every(msCheck => {
                                        const zoneCompleted = progress.some(p =>
                                          p.sStep === s.id && p.miniStep === msCheck &&
                                          (currentZone ? (p.zoneId === currentZone.id || p.zoneId === null) : true) &&
                                          p.completed
                                        );
                                        const empCompleted = employeeProgress.some(ep =>
                                          ep.sStep === s.id && ep.miniStep === msCheck &&
                                          currentZone && ep.zoneId === currentZone.id &&
                                          ep.completed
                                        );
                                        return zoneCompleted || empCompleted;
                                      });
                                      // Check step 4 is NOT completed
                                      const step4Done = progress.some(p =>
                                        p.sStep === s.id && p.miniStep === 4 &&
                                        (currentZone ? (p.zoneId === currentZone.id || p.zoneId === null) : true) &&
                                        p.completed
                                      );
                                      const empStep4Done = employeeProgress.some(ep =>
                                        ep.sStep === s.id && ep.miniStep === 4 &&
                                        currentZone && ep.zoneId === currentZone.id &&
                                        ep.completed
                                      );
                                      return steps1to3Done && !step4Done && !empStep4Done;
                                    })() && (() => {
                                      const alreadyRequested = autoevalRequested.has(s.id);
                                      return (
                                        <button
                                          className={`text-[8px] font-bold px-1.5 py-0.5 rounded border mb-0.5 transition-colors leading-tight whitespace-nowrap ${
                                            alreadyRequested
                                              ? 'text-green-700 bg-green-50 border-green-300 cursor-default'
                                              : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-300 animate-pulse bg-blue-50 shadow-sm'
                                          }`}
                                          disabled={alreadyRequested}
                                          onClick={async (e) => {
                                            e.stopPropagation();
                                            if (alreadyRequested) return;
                                            try {
                                              const sStepData = S_STEPS.find(ss => ss.id === s.id);
                                              const msg = `Se solicita autoevaluación para S${s.id} (${sStepData?.japaneseName || ''}) en la zona "${currentZone?.name || ''}". El responsable debe realizar el autocheck.\n\n👉 Habla con el empleado para acordar fecha y hora (presencial, teléfono o mensajería — fuera de la app). Luego usa el botón "📅 Programar" sobre el globo 4 para fijar la cita.`;

                                              const membersRes = await fetch(`/api/projects/${currentProject?.id}/members`);
                                              const membersData = await membersRes.json();
                                              const allMembers = membersData?.members || [];
                                              // Notify all responsables
                                              const responsableIds = new Set<string>();
                                              if (currentZone?.responsableId) responsableIds.add(currentZone.responsableId);
                                              const responsables = allMembers.filter((m: any) => m.role === 'responsable');
                                              for (const resp of responsables) responsableIds.add(resp.userId);
                                              for (const respId of responsableIds) {
                                                await fetch('/api/notifications', {
                                                  method: 'POST',
                                                  headers: { 'Content-Type': 'application/json' },
                                                  body: JSON.stringify({
                                                    userId: respId,
                                                    type: 'autoeval_requested',
                                                    title: `Solicitud autoevaluación: S${s.id} — ${sStepData?.japaneseName || ''}`,
                                                    message: msg,
                                                    sStep: s.id,
                                                    zoneId: currentZone?.id,
                                                    projectId: currentProject?.id,
                                                  }),
                                                });
                                              }
                                              // v2.62: NO se envía aviso al propio empleado.
                                              // El botón cambia a 'Solicitado ✓' para indicar el éxito.
                                              markAutoevalRequested(s.id);
                                            } catch (err) {
                                              console.error('Error sending autoeval request:', err);
                                              alert('Error al enviar la solicitud al responsable.');
                                            }
                                          }}
                                          title={alreadyRequested
                                            ? 'Autoevaluación solicitada al responsable — pendiente de realizar'
                                            : 'Solicitar autoevaluación: notificar al responsable para realizar el autocheck'}
                                        >
                                          {alreadyRequested ? '✓ Solicitado' : '🔔 Autoeval'}
                                        </button>
                                      );
                                    })()}
                                    {/* "Request audit" button above step 5 when steps 1-4 are completed but 5 isn't — only for users with notify_audit permission */}
                                    {ms.id === 5 && canNotifyAudit && (() => {
                                      // Check completion using BOTH zone-level progress AND individual employee progress
                                      // This ensures auditors/responsables see the button even if they don't have personal completion
                                      const steps1to4Done = [1,2,3,4].every(msCheck => {
                                        const zoneCompleted = progress.some(p =>
                                          p.sStep === s.id && p.miniStep === msCheck &&
                                          (currentZone ? (p.zoneId === currentZone.id || p.zoneId === null) : true) &&
                                          p.completed
                                        );
                                        const empCompleted = employeeProgress.some(ep =>
                                          ep.sStep === s.id && ep.miniStep === msCheck &&
                                          currentZone && ep.zoneId === currentZone.id &&
                                          ep.completed
                                        );
                                        return zoneCompleted || empCompleted;
                                      });
                                      const step5Done = progress.some(p =>
                                        p.sStep === s.id && p.miniStep === 5 &&
                                        (currentZone ? (p.zoneId === currentZone.id || p.zoneId === null) : true) &&
                                        p.completed
                                      );
                                      return steps1to4Done && !step5Done;
                                    })() && (
                                      <button
                                        className="text-[8px] font-bold text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-1.5 py-0.5 rounded border border-orange-300 mb-0.5 transition-colors leading-tight whitespace-nowrap animate-pulse bg-orange-50 shadow-sm"
                                        onClick={async (e) => {
                                          e.stopPropagation();
                                          try {
                                            const sStepData = S_STEPS.find(ss => ss.id === s.id);
                                            // Decision C: Employee does NOT propose date — only notifies auditor to schedule
                                            const msg = `Se solicita auditoría para S${s.id} (${sStepData?.japaneseName || ''}) en la zona "${currentZone?.name || ''}". El auditor debe programar la fecha y hora.\n\n👉 Habla con el empleado para acordar fecha y hora (presencial, teléfono o mensajería — fuera de la app). Luego usa el botón "📅 Programar" sobre el globo 5 para fijar la cita.`;
                                            
                                            const membersRes = await fetch(`/api/projects/${currentProject?.id}/members`);
                                            const membersData = await membersRes.json();
                                            const allMembers = membersData?.members || [];
                                            // Notify all auditors
                                            const auditors = allMembers.filter((m: any) => m.role === 'auditor');
                                            for (const auditor of auditors) {
                                              await fetch('/api/notifications', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                  userId: auditor.userId,
                                                  type: 'audit_requested',
                                                  title: `Solicitud auditoría: S${s.id} — ${sStepData?.japaneseName || ''}`,
                                                  message: msg,
                                                  sStep: s.id,
                                                  zoneId: currentZone?.id,
                                                  projectId: currentProject?.id,
                                                }),
                                              });
                                            }
                                            // Notify all responsables
                                            const responsableIds = new Set<string>();
                                            if (currentZone?.responsableId) responsableIds.add(currentZone.responsableId);
                                            const responsables = allMembers.filter((m: any) => m.role === 'responsable');
                                            for (const resp of responsables) responsableIds.add(resp.userId);
                                            for (const respId of responsableIds) {
                                              await fetch('/api/notifications', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                  userId: respId,
                                                  type: 'audit_requested',
                                                  title: `Solicitud auditoría: S${s.id} — ${sStepData?.japaneseName || ''}`,
                                                  message: msg,
                                                  sStep: s.id,
                                                  zoneId: currentZone?.id,
                                                  projectId: currentProject?.id,
                                                }),
                                              });
                                            }
                                            // Notify the requesting user as confirmation
                                            if (currentUser?.id) {
                                              await fetch('/api/notifications', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                  userId: currentUser.id,
                                                  type: 'audit_ready',
                                                  title: `Solicitud enviada: S${s.id} — ${sStepData?.japaneseName || ''}`,
                                                  message: `Tu solicitud de auditoría para S${s.id} ha sido enviada al auditor. El auditor programará la fecha y hora.`,
                                                  sStep: s.id,
                                                  zoneId: currentZone?.id,
                                                  projectId: currentProject?.id,
                                                }),
                                              });
                                            }
                                            alert('Solicitud de auditoría enviada. El auditor programará la fecha.');
                                          } catch (err) {
                                            console.error('Error sending audit request:', err);
                                            alert('Error al enviar la solicitud.');
                                          }
                                        }}
                                        title="Solicitar auditoría: notificar al auditor y responsable para fijar fecha"
                                      >
                                        🔔 Auditar
                                      </button>
                                    )}
                                    {/* v2.74.3: Badge "Programada" sobre los globos 4 y 5 cuando hay
                                        una cita programada. Visible para TODOS los roles. Texto corto:
                                        solo "Programada" (sin fecha/hora en el texto — el hover los muestra).
                                        Color único morado para programada/aceptada, rojo si vencida. */}
                                    {(ms.id === 4 || ms.id === 5) && currentZone && (() => {
                                      const sched = evaluationSchedules.find(sch =>
                                        sch.sStep === s.id &&
                                        sch.miniStep === ms.id &&
                                        sch.estado !== 'cancelada' &&
                                        sch.estado !== 'realizada' &&
                                        sch.fechaProgramada &&
                                        (!sch.zoneId || sch.zoneId === currentZone.id)
                                      );
                                      if (!sched) return null;
                                      const fechaCorta = sched.fechaProgramada!.split('-').reverse().join('/');
                                      const horaCorta = sched.horaProgramada || '10:00';
                                      const isVencida = sched.estado === 'vencida';
                                      const bg = isVencida
                                        ? 'bg-red-50 text-red-700 border-red-300'
                                        : 'bg-purple-50 text-purple-700 border-purple-300';
                                      const label = isVencida ? 'Vencida' : 'Programada';
                                      return (
                                        <span
                                          className={`text-[8px] font-bold px-1.5 py-0.5 rounded border mb-0.5 leading-tight whitespace-nowrap ${bg}`}
                                          title={`${label} — ${fechaCorta} ${horaCorta}`}
                                        >
                                          {label}
                                        </span>
                                      );
                                    })()}
                                    {/* v2.70/v2.74.4: Botón "Programar fecha" sobre paso 4 y 5 para responsable/auditor.
                                        Solo aparece cuando NO hay cita activa (programada/aceptada/en_ventana).
                                        Si ya hay cita → no se muestra (está el badge "Programada").
                                        Si la cita está vencida → sí se muestra (para reprogramar). */}
                                    {(ms.id === 4 || ms.id === 5) && (isResponsable || currentUser?.role === 'auditor' || isAdmin) && currentZone && currentProject && (() => {
                                      // Para paso 4: mostrar si pasos 1-3 están completos y paso 4 no
                                      // Para paso 5: mostrar si pasos 1-4 están completos y paso 5 no
                                      const requiredSteps = ms.id === 4 ? [1,2,3] : [1,2,3,4];
                                      const allPrevDone = requiredSteps.every(msCheck => {
                                        const zoneCompleted = progress.some(p =>
                                          p.sStep === s.id && p.miniStep === msCheck &&
                                          (currentZone ? (p.zoneId === currentZone.id || p.zoneId === null) : true) &&
                                          p.completed
                                        );
                                        const empCompleted = employeeProgress.some(ep =>
                                          ep.sStep === s.id && ep.miniStep === msCheck &&
                                          currentZone && ep.zoneId === currentZone.id &&
                                          ep.completed
                                        );
                                        return zoneCompleted || empCompleted;
                                      });
                                      const currentStepDone = progress.some(p =>
                                        p.sStep === s.id && p.miniStep === ms.id &&
                                        (currentZone ? (p.zoneId === currentZone.id || p.zoneId === null) : true) &&
                                        p.completed
                                      );
                                      if (!allPrevDone || currentStepDone) return false;
                                      // v2.74.4: NO mostrar botón si ya hay cita activa (programada/aceptada).
                                      // SÍ mostrar si no hay cita, o si está vencida (para reprogramar).
                                      const existingSched = evaluationSchedules.find(sch =>
                                        sch.sStep === s.id &&
                                        sch.miniStep === ms.id &&
                                        sch.fechaProgramada &&
                                        (!sch.zoneId || sch.zoneId === currentZone.id) &&
                                        ['programada', 'aceptada'].includes(sch.estado)
                                      );
                                      return !existingSched;
                                    })() && (
                                      <button
                                        className="text-[8px] font-bold text-purple-700 hover:text-purple-800 hover:bg-purple-50 px-1.5 py-0.5 rounded border border-purple-300 mb-0.5 transition-colors leading-tight whitespace-nowrap animate-pulse bg-purple-50 shadow-sm flex items-center gap-0.5"
                                        onClick={async (e) => {
                                          e.stopPropagation();
                                          // Buscar empleado de la zona (para notificarle)
                                          let empleadoId: string | undefined;
                                          try {
                                            const membersRes = await fetch(`/api/projects/${currentProject?.id}/members`);
                                            const membersData = await membersRes.json();
                                            const empleados = (membersData?.members || []).filter((m: any) => m.role === 'empleado');
                                            if (currentZone) {
                                              // Priorizar empleados de la zona actual
                                              const zoneEmps = empleados.filter((m: any) => m.zoneId === currentZone.id);
                                              if (zoneEmps.length >= 1) {
                                                empleadoId = zoneEmps[0].userId;
                                              }
                                            }
                                            // Fallback: si la zona no tiene empleado, tomar el primero del proyecto
                                            if (!empleadoId && empleados.length >= 1) {
                                              empleadoId = empleados[0].userId;
                                            }
                                          } catch (e) { /* ignore */ }

                                          setScheduleDialog({
                                            open: true,
                                            sStep: s.id,
                                            miniStep: ms.id, // 4=autoeval, 5=auditoría
                                            zoneId: currentZone?.id,
                                            projectId: currentProject?.id,
                                            empleadoId,
                                            responsableId: currentUser?.id,
                                          });
                                          const tomorrow = new Date();
                                          tomorrow.setDate(tomorrow.getDate() + 1);
                                          setScheduleDate(tomorrow.toISOString().slice(0, 10));
                                          setScheduleTime('10:00');
                                        }}
                                        title={`Programar fecha de ${ms.id === 4 ? 'autoevaluación' : 'auditoría'}: abrir calendario`}
                                      >
                                        <Calendar className="h-2.5 w-2.5" />
                                        Programar
                                      </button>
                                    )}
                                    <div className="relative">
                                      <button
                                        className={`
                                          w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all
                                          ${isMobile ? '!w-11 !h-11 !text-xs' : ''}
                                          ${effectiveStatus === 'completed'
                                            ? 'bg-green-500 text-white shadow-sm shadow-green-200 ring-2 ring-green-300'
                                            : effectiveStatus === 'completed_viewonly'
                                              ? 'bg-green-500 text-white shadow-sm shadow-green-200 ring-2 ring-green-300 cursor-default'
                                            : effectiveStatus === 'available'
                                              ? 'text-white hover:scale-110 hover:shadow-md cursor-pointer'
                                              : 'bg-gray-100 text-gray-300 cursor-not-allowed'}
                                        `}
                                        style={effectiveStatus === 'available' ? { backgroundColor: s.color } : undefined}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (canOpenModal) {
                                            handleOpenModal(modalType, ms.id, s.id);
                                          }
                                        }}
                                        disabled={!canOpenModal}
                                        title={`${ms.name}${lockReason ? ` (${lockReason})` : ''}`}
                                      >
                                        {isCompleted ? '✓' : effectiveStatus === 'locked' ? <LockIcon className="h-2.5 w-2.5" /> : ms.id}
                                      </button>
                                      {/* Admin reset button: only shown when admin with lock open and step is completed */}
                                      {canSkipSteps && adminFreeNavigation && effectiveStatus === 'completed' && (
                                        <button
                                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[8px] font-bold hover:bg-red-600 transition-colors z-10"
                                          onClick={async (e) => {
                                            e.stopPropagation();
                                            // v2.49: mensaje específico según miniStep.
                                            // cleanup=true ahora borra también fotos e items.
                                            const msId = ms.id;
                                            let msg = `¿Restablecer paso ${msId} de S${s.id}?\n\n`;
                                            if (msId === 2) {
                                              msg += `Esto eliminará:\n• El progreso del Paso 2 (Fotos) Y del Paso 3 (Inventario)\n• Todas las fotos del Paso 2\n• Todos los elementos del inventario\n\nPodrás empezar de cero desde el Paso 2.`;
                                            } else if (msId === 3) {
                                              msg += `Esto eliminará el progreso del Paso 3.\nLas fotos y elementos del inventario se conservan — podrás reclasificarlos.`;
                                            } else {
                                              msg += `Esto eliminará el progreso guardado.`;
                                            }
                                            if (!confirm(msg)) return;
                                            try {
                                              const params = new URLSearchParams({
                                                sStep: String(s.id),
                                                miniStep: String(msId),
                                                projectId: currentProject?.id || '',
                                                cleanup: 'true', // v2.49: deep cleanup
                                              });
                                              if (currentZone?.id) params.set('zoneId', currentZone.id);
                                              const res = await fetch(`/api/progress/step?${params}`, { method: 'DELETE' });
                                              const json = await res.json();
                                              if (json.success) {
                                                await use5SStore.getState().fetchProgress();
                                                if (currentProject && currentZone) {
                                                  await use5SStore.getState().fetchEmployeeProgress(currentProject.id, currentZone.id);
                                                }
                                              } else {
                                                alert(json.error || 'Error al restablecer');
                                              }
                                            } catch (err) { console.error('Reset error:', err); }
                                          }}
                                          title="Restablecer paso (admin)"
                                        >
                                          ×
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Progress bar */}
                            <div className="px-2 pb-1.5">
                              <div className="h-1.5 rounded-full overflow-hidden bg-gray-100">
                                <div
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{ width: `${pct}%`, backgroundColor: earned ? '#22c55e' : s.color }}
                                />
                              </div>
                              <div className="flex items-center justify-between mt-0.5">
                                <span className={`text-[8px] font-bold ${earned ? 'text-green-600' : 'text-muted-foreground'}`}>
                                  {earned ? 'COMPLETADO' : `${completedMiniSteps}/5`}
                                </span>
                                <span className={`text-[8px] font-bold ${earned ? 'text-green-600' : 'text-muted-foreground'}`}>
                                  {pct}%
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  )}
                </motion.div>
              )}

              {/* ═══ TAB: GESTIÓN (Solo Gestor - Dueño de la app) ═══ */}
              {activeTab === 'gestion' && isGestor && (
                <motion.div key="gestion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-h-0 overflow-auto p-4">
                  <ConstructorPanel />
                </motion.div>
              )}

              {/* ═══ TAB: JAULA (Excedentes) ═══ */}
              {activeTab === 'jaula' && (
                <motion.div key="jaula" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-h-0 overflow-hidden">
                  <JaulaView />
                </motion.div>
              )}

              {/* ═══ TAB: ACTIVOS (Necesarios) ═══ */}
              {activeTab === 'activos' && (
                <motion.div key="activos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-h-0 overflow-hidden">
                  <ActivosView />
                </motion.div>
              )}

              {/* ═══ TAB: PUNTO LIMPIO (Suciedad) ═══ */}
              {activeTab === 'puntoLimpio' && (
                <motion.div key="puntoLimpio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-h-0 overflow-hidden">
                  <PuntoLimpioView />
                </motion.div>
              )}

              {/* ═══ TAB: PLAN DE ACCIÓN ═══ */}
              {activeTab === 'actionplan' && currentUser?.role !== 'auditor' && (
                <motion.div key="actionplan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-h-0 overflow-hidden">
                  <PlanDeAccionView />
                </motion.div>
              )}

              {/* ═══ TAB: ADMIN (SOLO Admin de Empresa — NO Gestor) ═══ */}
              {activeTab === 'admin' && isAdmin && (
                <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-h-0 overflow-auto p-4">
                  <AdminPanel embedded />
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t shadow-lg safe-area-bottom">
          <div className="flex items-center justify-around h-14">
            {availableTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors min-w-[44px] ${
                  activeTab === tab.key
                    ? 'text-green-700 bg-green-50/80'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.icon}
                <span className="text-[9px] font-medium leading-none truncate max-w-[64px]">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Modals */}
      {ActiveModalComponent && selectedSStep && activeMiniStep && (
        <ActiveModalComponent
          open={activeModal !== null}
          onClose={closeModal}
          sStep={selectedSStep}
          miniStep={activeMiniStep}
        />
      )}

      {/* Global Action Plan Modal */}
      {activeModal === 'globalActionPlan' && currentProject && (
        <ActionPlanModal open={true} onClose={closeModal} sStep={selectedSStep || 1} miniStep={0} />
      )}

      {/* Global Inventory Modal */}
      {activeModal === 'globalInventory' && (
        <GlobalInventoryModal open={true} onClose={closeModal} />
      )}

      {/* Audit Results Modal */}
      {activeModal === 'auditResults' && (
        <AuditResultsModal open={true} onClose={closeModal} />
      )}

      {/* Standards Library Modal */}
      {activeModal === 'standardsLibrary' && (
        <StandardsLibrary open={true} onClose={closeModal} />
      )}

      {/* Photo Library Modal */}
      {activeModal === 'photoLibrary' && (
        <PhotoLibrary open={true} onClose={closeModal} initialSStep={selectedSStep || undefined} />
      )}

      {/* Team Management Modal */}
      <TeamManagement open={showTeamManagement} onClose={() => setShowTeamManagement(false)} />

      {/* Role Permissions Modal */}
      <RolePermissions open={showRolePermissions} onClose={() => setShowRolePermissions(false)} />

      {/* Gerencia Panel — Sheet overlay (accessed from header button) */}
      {showGerencia && (
        <Sheet open={showGerencia} onOpenChange={setShowGerencia}>
          <SheetContent side="right" className="w-[90vw] sm:w-[600px] p-0 overflow-auto">
            <SheetHeader className="p-4 border-b">
              <SheetTitle className="text-left flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Panel de Gerencia
              </SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <GerentePanel embedded />
            </div>
          </SheetContent>
        </Sheet>
      )}



      {/* Version indicator — small badge to verify deployment freshness */}
      {authView === 'board' && (
        <div className="fixed bottom-1 right-2 z-50 pointer-events-none">
          <span className="text-[8px] text-gray-300 font-mono select-none" title="Build version (refresh if stale)">v:{appVersion}</span>
        </div>
      )}

      {/* 📅 User Task Calendar — accessible from header toolbar */}
      {currentUser && (
        <UserTaskCalendar
          open={showUserCalendar}
          onClose={() => setShowUserCalendar(false)}
          userId={currentUser.id}
          projectId={currentProject?.id}
          userName={currentUser.name}
          onOpenActionPlan={() => {
            // v2.61: cierra el calendario y abre el Plan de Acción (tab)
            setShowUserCalendar(false);
            setActiveTab('actionplan');
          }}
        />
      )}

      {/* v2.68: Diálogo para programar fecha de autoeval/auditoría desde notificación */}
      {/* v2.100: Si scheduleDialog.type === 'propose_dates', muestra un picker múltiple (hasta 3 fechas) */}
      {scheduleDialog.open && scheduleDialog.type === 'propose_dates' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-sky-600" />
              <h3 className="text-base font-bold text-gray-900">
                Proponer fechas para {scheduleDialog.miniStep === 4 ? 'Autoevaluación' : 'Auditoría'}
                {scheduleDialog.sStep && ` — S${scheduleDialog.sStep}`}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              El asistente te ha solicitado formalmente esta revisión. Propón hasta 3 fechas alternativas
              para que el asistente elija la que mejor le convenga. Recibirá un aviso con tus propuestas.
            </p>
            {/* Formulario para añadir propuestas */}
            <div className="space-y-2 border-t pt-3">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Fecha</label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    min={new Date().toISOString().slice(0, 10)}
                  />
                </div>
                <div className="w-28">
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Hora</label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <button
                  className="text-xs px-3 py-2 rounded bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50 flex items-center gap-1 whitespace-nowrap"
                  disabled={!scheduleDate || proposedDates.length >= 3}
                  onClick={() => {
                    if (!scheduleDate) return;
                    // Evitar duplicados
                    if (proposedDates.some(p => p.fecha === scheduleDate && p.hora === scheduleTime)) {
                      toast.error('Esa fecha y hora ya están en la lista');
                      return;
                    }
                    setProposedDates([...proposedDates, { fecha: scheduleDate, hora: scheduleTime }]);
                    // Reset para añadir otra
                    setScheduleDate('');
                    setScheduleTime('10:00');
                  }}
                >
                  + Añadir
                </button>
              </div>
              {/* Lista de propuestas */}
              {proposedDates.length > 0 && (
                <div className="space-y-1">
                  {proposedDates.map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-sky-50 border border-sky-200 rounded px-2 py-1.5">
                      <span className="text-xs">
                        <span className="font-semibold text-sky-700">Opción {idx + 1}:</span>{' '}
                        {p.fecha.split('-').reverse().join('/')} a las {p.hora}
                      </span>
                      <button
                        className="text-red-500 hover:bg-red-100 rounded p-0.5"
                        onClick={() => setProposedDates(proposedDates.filter((_, i) => i !== idx))}
                        title="Quitar"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {proposedDates.length === 0 && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
                  Añade al menos una fecha propuesta para poder enviar.
                </p>
              )}
              {proposedDates.length >= 3 && (
                <p className="text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded p-2">
                  Máximo 3 propuestas. Quita una si quieres añadir otra.
                </p>
              )}
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t">
              <button
                className="text-xs px-3 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  setScheduleDialog({ open: false });
                  setProposedDates([]);
                }}
                disabled={isSavingSchedule}
              >
                Cancelar
              </button>
              <button
                className="text-xs px-4 py-1.5 rounded bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50 flex items-center gap-1"
                disabled={proposedDates.length === 0 || isSavingSchedule}
                onClick={async () => {
                  if (!scheduleDialog.scheduleId || proposedDates.length === 0) return;
                  setIsSavingSchedule(true);
                  try {
                    const res = await fetch('/api/evaluation-schedule', {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        id: scheduleDialog.scheduleId,
                        estado: 'propuesta',
                        fechasPropuestas: proposedDates,
                      }),
                    });
                    const json = await res.json();
                    if (json.success) {
                      toast.success(`Propuestas enviadas (${proposedDates.length}). El asistente elegirá una.`);
                      setScheduleDialog({ open: false });
                      setProposedDates([]);
                      try { await use5SStore.getState().fetchEvaluationSchedules(); } catch {}
                      try { await use5SStore.getState().fetchNotifications(true); } catch {}
                      // Marcar la notif de solicitud como leída
                      if (scheduleDialog.notifId) {
                        await fetch('/api/notifications', {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ notificationId: scheduleDialog.notifId, read: true }),
                        });
                        markNotificationRead(scheduleDialog.notifId);
                      }
                    } else {
                      console.error('[propose_dates] Server error:', json);
                      toast.error(`Error al proponer fechas: ${json.error || 'Error desconocido'}`);
                    }
                  } catch (e: any) {
                    console.error('Error saving propuestas:', e);
                    toast.error(`Error de conexión: ${e?.message || 'desconocido'}`);
                  } finally {
                    setIsSavingSchedule(false);
                  }
                }}
              >
                {isSavingSchedule && <Loader2 className="h-3 w-3 animate-spin" />}
                Enviar {proposedDates.length > 0 ? `(${proposedDates.length})` : ''}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* v2.68: Diálogo ORIGINAL — programación de una sola fecha (modo clásico) */}
      {scheduleDialog.open && scheduleDialog.type !== 'propose_dates' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-bold text-gray-900">
                Programar {scheduleDialog.miniStep === 4 ? 'Autoevaluación' : 'Auditoría'}
                {scheduleDialog.sStep && ` — S${scheduleDialog.sStep}`}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Selecciona fecha y hora. Se creará una entrada en tu calendario y en el del empleado,
              y se le notificará automáticamente.
            </p>
            {/* v2.86: Aviso especial cuando se está reprogramando una cita vencida */}
            {scheduleDialog.type === 'evaluation_expired' && (
              <div className="bg-red-50 border border-red-300 rounded-md p-2.5 text-xs text-red-800 flex items-start gap-2 animate-pulse">
                <span className="font-bold text-red-600">⚠️</span>
                <div>
                  <p className="font-bold">CITA EXPIRADA — Reprogramación manual</p>
                  <p>La cita anterior superó la ventana de 2 horas sin completarse. El sistema NO reprograma automáticamente. Debes elegir una nueva fecha y hora manualmente.</p>
                </div>
              </div>
            )}
            {/* v2.74.5: Aviso recordatorio de hablar con el empleado fuera de la app */}
            <div className="bg-amber-50 border border-amber-200 rounded-md p-2.5 text-xs text-amber-800 flex items-start gap-2">
              <span className="font-bold text-amber-600">⚠</span>
              <div>
                <p className="font-semibold">Antes de programar:</p>
                <p>Conversa con el empleado (presencial, teléfono, mensajería) para acordar fecha y hora. La app solo registra la cita ya acordada — la coordinación se hace fuera de la aplicación.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Fecha</label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Hora</label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t">
              <button
                className="text-xs px-3 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => setScheduleDialog({ open: false })}
                disabled={isSavingSchedule}
              >
                Cancelar
              </button>
              <button
                className="text-xs px-4 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1"
                disabled={!scheduleDate || isSavingSchedule}
                onClick={async () => {
                  if (!scheduleDate || !scheduleDialog.projectId || !scheduleDialog.sStep) return;
                  setIsSavingSchedule(true);
                  try {
                    const res = await fetch('/api/evaluation-schedule', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        sStep: scheduleDialog.sStep,
                        miniStep: scheduleDialog.miniStep,
                        projectId: scheduleDialog.projectId,
                        zoneId: scheduleDialog.zoneId,
                        fechaProgramada: scheduleDate,
                        horaProgramada: scheduleTime,
                        responsableId: scheduleDialog.responsableId,
                        empleadoId: scheduleDialog.empleadoId,
                        createdBy: currentUser?.id,
                        estado: 'programada',
                        // v2.75.2: rolEjecutor + notifyUser para que se
                        // dispare la notif 'evaluation_scheduled' al asistente.
                        rolEjecutor: scheduleDialog.miniStep === 5 ? 'auditor' : 'responsable',
                        notifyUser: true,
                      }),
                    });
                    const json = await res.json();
                    if (json.success) {
                      toast.success(`Fecha programada: ${scheduleDate.split('-').reverse().join('/')} a las ${scheduleTime}`);
                      setScheduleDialog({ open: false });
                      // v2.74.2/v2.75.2: refrescar schedules + notifs para
                      // que el badge "📅 Programado" aparezca inmediatamente
                      // y el asistente reciba la notif sin tener que
                      // refrescar la página.
                      try { await use5SStore.getState().fetchEvaluationSchedules(); } catch {}
                      try { await use5SStore.getState().fetchNotifications(true); } catch {}
                      // Open calendar to show the new entry
                      setShowUserCalendar(true);
                    } else {
                      // v2.71: mostrar el error real del servidor en el toast
                      console.error('[schedule] Server error:', json);
                      toast.error(`Error al programar: ${json.error || 'Error desconocido'}`);
                    }
                  } catch (e: any) {
                    console.error('Error saving schedule:', e);
                    toast.error(`Error de conexión: ${e?.message || 'desconocido'}`);
                  } finally {
                    setIsSavingSchedule(false);
                  }
                }}
              >
                {isSavingSchedule && <Loader2 className="h-3 w-3 animate-spin" />}
                Programar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
