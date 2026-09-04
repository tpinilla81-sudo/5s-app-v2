'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { use5SStore } from '../../lib/store'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Badge } from '../ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog'
import {
  ArrowLeft,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Building2,
  Users,
  Key,
  Mail,
  Lock,
  User,
  UserCircle,
  Shield,
  MapPin,
  UserPlus,
  Loader2,
  AlertTriangle,
  Eye,
  EyeOff,
  CheckSquare,
  ShieldCheck,
  Save,
  LayoutGrid,
  FileText,
  Wand2,
  UserCheck,
} from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { S_STEPS } from '../../lib/5s-constants'
import ZoneTemplatesSection from './ZoneTemplatesSection'
import ProjectTemplatesSection from './ProjectTemplatesSection'
import { ZoneGeneratorWizard } from './ZoneGeneratorWizard'


// ─── Types ───────────────────────────────────────────────────────────────────

interface UserData {
  id: string
  email: string
  name: string
  role: string
  active: boolean
  plainPassword?: string | null
  createdAt: string
  companies: Array<{
    id: string
    name: string
    role: string
  }>
  projects: Array<{
    projectId: string
    projectName: string
    projectCompany: string
    role: string
    zones: Array<{ id: string; name: string; color: string }>
  }>
}

interface ProjectData {
  id: string
  name: string
  description: string | null
  company: string
  companyId: string | null
  startDate: string
  active: boolean
  zones: Array<{ id: string; name: string; description: string | null; color: string }>
  memberCount: number
}

interface ZoneData {
  id: string
  name: string
  description: string | null
  color: string
  boardConfigId: string | null
  boardConfig?: { id: string; name: string; isDefault?: boolean } | null
}

interface MemberData {
  id: string
  role: string
  user: { id: string; email: string; name: string; role: string; active: boolean; plainPassword?: string | null }
  zones: Array<{ id: string; name: string; color: string }>
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ROLE_LABELS: Record<string, string> = {
  gestor: 'Gestor (Dueño)',
  admin: 'Admin de Empresa',
  gerente: 'Gerente',
  responsable: 'Responsable',
  empleado: 'Empleado',
  auditor: 'Auditor',
}

const ROLE_COLORS: Record<string, string> = {
  gestor: 'bg-red-100 text-red-700 border-red-200',
  admin: 'bg-purple-100 text-purple-700 border-purple-200',
  gerente: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  responsable: 'bg-blue-100 text-blue-700 border-blue-200',
  empleado: 'bg-green-100 text-green-700 border-green-200',
  auditor: 'bg-orange-100 text-orange-700 border-orange-200',
}

const PRESET_COLORS = ['#8B5CF6', '#EAB308', '#3B82F6', '#F43F5E', '#F97316', '#22C55E', '#06B6D4', '#EC4899']

// ─── Field helper for Datos Empresa ─────────────────────────────────────────
// Muestra el valor en modo lectura o un Input editable según `editing`.
function Field({
  label, k, value, edit, setEdit, editing,
}: {
  label: string
  k: string
  value: string | null | undefined
  edit: Record<string, string>
  setEdit: React.Dispatch<React.SetStateAction<Record<string, string>>>
  editing: boolean
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {editing ? (
        <Input
          value={edit[k] ?? ''}
          onChange={e => setEdit(prev => ({ ...prev, [k]: e.target.value }))}
          className="h-8 text-sm"
          placeholder={label}
        />
      ) : (
        <div className={`h-8 px-2 flex items-center text-sm rounded-md border border-transparent bg-gray-50 ${
          (value ?? '').trim() === '' ? 'text-muted-foreground italic' : 'text-gray-900'
        }`}>
          {(value ?? '').trim() === '' ? '— sin rellenar —' : value}
        </div>
      )}
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

interface AdminPanelProps {
  embedded?: boolean;
  onLogout?: () => void;
}

export default function AdminPanel({ embedded, onLogout }: AdminPanelProps = {}) {
  const { setCurrentView, fetchProjects, fetchCompanies, projects, setCurrentProject, currentProject, goToProjectSelector } = use5SStore()
  const [activeTab, setActiveTab] = useState<'companies' | 'projects'>('companies')

  // ─── Projects state ──────────────────────────────────────────────────────
  const [allProjects, setAllProjects] = useState<ProjectData[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(false)
  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [editProjectData, setEditProjectData] = useState({ name: '', description: '', company: '' })

  // New project form
  const [showNewProject, setShowNewProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectCompany, setNewProjectCompany] = useState('')
  const [isNewCompanyCustom, setIsNewCompanyCustom] = useState(false)
  const [newProjectDesc, setNewProjectDesc] = useState('')
  const [newProjectZones, setNewProjectZones] = useState<Array<{ name: string; color: string }>>([
    { name: '', color: PRESET_COLORS[0] },
  ])

  // New-project members (existing or new) — added at creation time
  type NewProjectMember =
    | { mode: 'existing'; userId: string; name: string; email: string; role: string; zoneIdxs: number[] }
    | { mode: 'new'; name: string; email: string; password: string; role: string; zoneIdxs: number[] }
  const [newProjectMembers, setNewProjectMembers] = useState<NewProjectMember[]>([])
  // Form state for adding a member to the new-project form
  const [npMemberMode, setNpMemberMode] = useState<'existing' | 'new'>('existing')
  const [npMemberExistingId, setNpMemberExistingId] = useState('')
  const [npMemberName, setNpMemberName] = useState('')
  const [npMemberEmail, setNpMemberEmail] = useState('')
  const [npMemberPassword, setNpMemberPassword] = useState('')
  const [npMemberRole, setNpMemberRole] = useState('empleado')
  const [npMemberZoneIdxs, setNpMemberZoneIdxs] = useState<number[]>([])

  // Project detail (zones + members)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [projectZones, setProjectZones] = useState<ZoneData[]>([])
  const [projectMembers, setProjectMembers] = useState<MemberData[]>([])
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
  const [newZoneName, setNewZoneName] = useState('')
  const [newZoneColor, setNewZoneColor] = useState(PRESET_COLORS[0])
  // v2.107 — Wizard "Generar zonas" (algoritmo de zonificación)
  const [zoneWizardOpen, setZoneWizardOpen] = useState(false)
  const [zoneWizardProjectId, setZoneWizardProjectId] = useState<string | null>(null)
  const [boardConfigs, setBoardConfigs] = useState<Array<{ id: string; name: string; isDefault: boolean }>>([])
  const [defaultBoardConfigId, setDefaultBoardConfigId] = useState<string | null>(null)
  const [newMemberName, setNewMemberName] = useState('')
  const [newMemberEmail, setNewMemberEmail] = useState('')
  const [newMemberRole, setNewMemberRole] = useState('empleado')
  const [newMemberZones, setNewMemberZones] = useState<string[]>([])
  const [newMemberPassword, setNewMemberPassword] = useState('')
  const [addMemberMode, setAddMemberMode] = useState<'existing' | 'new'>('existing')
  const [selectedExistingUserId, setSelectedExistingUserId] = useState('')
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null)
  const [generatedMemberName, setGeneratedMemberName] = useState<string | null>(null)
  const [sendingCredentials, setSendingCredentials] = useState<string | null>(null)

  // ─── Per-zone "add existing user" state ─────────────────────────────────
  // Map: zoneId → selected userId in the per-zone picker
  const [zoneAddUserId, setZoneAddUserId] = useState<Record<string, string>>({})
  // Map: zoneId → role for the new assignment
  const [zoneAddRole, setZoneAddRole] = useState<Record<string, string>>({})
  // Per-zone "create new user" form state
  const [zoneAddMode, setZoneAddMode] = useState<Record<string, 'existing' | 'new'>>({})
  const [zoneNewName, setZoneNewName] = useState<Record<string, string>>({})
  const [zoneNewEmail, setZoneNewEmail] = useState<Record<string, string>>({})
  const [zoneNewPassword, setZoneNewPassword] = useState<Record<string, string>>({})
  // Per-zone inline search query for "existing user" picker
  const [zoneSearch, setZoneSearch] = useState<Record<string, string>>({})
  // Per-zone list expanded (true = show list; false = collapsed)
  const [zoneShowList, setZoneShowList] = useState<Record<string, boolean>>({})
  // Zone currently being edited (inline rename)
  const [editingZoneId, setEditingZoneId] = useState<string | null>(null)
  const [editingZoneName, setEditingZoneName] = useState('')

  // ─── Users state ─────────────────────────────────────────────────────────
  const [users, setUsers] = useState<UserData[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [editingUser, setEditingUser] = useState<string | null>(null)
  const [editUserData, setEditUserData] = useState({ name: '', email: '', role: '', active: true })
  const [resetPasswordUserId, setResetPasswordUserId] = useState<string | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // New user form
  const [showNewUser, setShowNewUser] = useState(false)
  const [newUserName, setNewUserName] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [newUserRole, setNewUserRole] = useState('empleado')

  // ─── Companies state ────────────────────────────────────────────────────
  const [companies, setCompanies] = useState<Array<{ id: string; name: string; description: string | null; active: boolean; projectCount: number; memberCount: number }>>([])
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false)
  const [showNewCompany, setShowNewCompany] = useState(false)
  const [newCompanyName, setNewCompanyName] = useState('')
  const [newCompanyDesc, setNewCompanyDesc] = useState('')
  const [editingCompany, setEditingCompany] = useState<string | null>(null)
  const [editCompanyData, setEditCompanyData] = useState({ name: '', description: '' })
  const [expandedCompanyId, setExpandedCompanyId] = useState<string | null>(null)
  const [companyMembers, setCompanyMembers] = useState<Array<{ id: string; userId: string; companyId: string; role: string; user: { id: string; name: string; email: string; role: string; active: boolean } }>>([])
  const [addGerenteUserId, setAddGerenteUserId] = useState('')
  const [isLoadingCompanyDetail, setIsLoadingCompanyDetail] = useState(false)
  const [deleteCompanyDialog, setDeleteCompanyDialog] = useState<{ open: boolean; companyId: string; companyName: string; projectCount: number }>({ open: false, companyId: '', companyName: '', projectCount: 0 })

  // ─── My Company (Datos Empresa) state ───────────────────────────────────
  const [myCompany, setMyCompany] = useState<{
    id: string; name: string; description: string | null; nif: string | null; sector: string | null;
    address: string | null; city: string | null; province: string | null; postalCode: string | null; country: string | null;
    phone: string | null; website: string | null;
    billingEmail: string | null; billingName: string | null; billingNif: string | null;
    billingAddress: string | null; billingCity: string | null; billingPostalCode: string | null; iban: string | null;
    contactName: string | null; contactEmail: string | null; contactPhone: string | null;
  } | null>(null)
  const [isLoadingMyCompany, setIsLoadingMyCompany] = useState(false)
  const [isSavingMyCompany, setIsSavingMyCompany] = useState(false)
  const [myCompanyEdit, setMyCompanyEdit] = useState<Record<string, string>>({})
  const [isEditingMyCompany, setIsEditingMyCompany] = useState(false)

  // ─── Company Users management (Datos Empresa → Usuarios) ────────────────
  const [showAddCompanyUser, setShowAddCompanyUser] = useState(false)
  const [newCompanyUserName, setNewCompanyUserName] = useState('')
  const [newCompanyUserEmail, setNewCompanyUserEmail] = useState('')
  const [newCompanyUserPassword, setNewCompanyUserPassword] = useState('')
  const [newCompanyUserRole, setNewCompanyUserRole] = useState('empleado')

  // ─── 5S Steps state ────────────────────────────────────────────────────
  const [progress5S, setProgress5S] = useState<Array<{ id: string; sStep: number; miniStep: number; completed: boolean; score: number | null; notes: string | null; zoneId: string | null; zoneName?: string }>>([])
  const [isLoading5S, setIsLoading5S] = useState(false)
  const [editingScore, setEditingScore] = useState<string | null>(null) // progress record id
  const [editScoreValue, setEditScoreValue] = useState('')
  const [editNotesValue, setEditNotesValue] = useState('')
  const [selected5SProjectId, setSelected5SProjectId] = useState<string | null>(null)
  const [selected5SZoneId, setSelected5SZoneId] = useState<string | null>(null)

  // ─── Data loading ────────────────────────────────────────────────────────
  const loadProjects = useCallback(async () => {
    setIsLoadingProjects(true)
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setAllProjects(data.projects || [])
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setIsLoadingProjects(false)
    }
  }, [])

  const loadUsers = useCallback(async () => {
    setIsLoadingUsers(true)
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setIsLoadingUsers(false)
    }
  }, [])

  const loadCompanies = useCallback(async () => {
    setIsLoadingCompanies(true)
    try {
      const res = await fetch('/api/companies')
      const data = await res.json()
      if (data.success) {
        setCompanies(data.companies || [])
      }
    } catch (error) {
      console.error('Error loading companies:', error)
    } finally {
      setIsLoadingCompanies(false)
    }
  }, [])

  const loadCompanyDetail = useCallback(async (companyId: string) => {
    setIsLoadingCompanyDetail(true)
    try {
      const res = await fetch(`/api/companies/${companyId}`)
      const data = await res.json()
      if (data.success) {
        setCompanyMembers(data.company?.members || [])
      }
    } catch (error) {
      console.error('Error loading company detail:', error)
    } finally {
      setIsLoadingCompanyDetail(false)
    }
  }, [])

  // ─── My Company (Datos Empresa) ─────────────────────────────────────────
  const loadMyCompany = useCallback(async () => {
    setIsLoadingMyCompany(true)
    try {
      const res = await fetch('/api/my-company')
      const data = await res.json()
      if (data.success && data.company) {
        setMyCompany(data.company)
        // Pre-fill editable copy
        const edit: Record<string, string> = {}
        for (const [k, v] of Object.entries(data.company)) {
          if (typeof v === 'string' || v === null) edit[k] = (v as string) ?? ''
        }
        setMyCompanyEdit(edit)
      }
    } catch (error) {
      console.error('Error loading my company:', error)
    } finally {
      setIsLoadingMyCompany(false)
    }
  }, [])

  const handleSaveMyCompany = async () => {
    setIsSavingMyCompany(true)
    try {
      const res = await fetch('/api/my-company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(myCompanyEdit),
      })
      const data = await res.json()
      if (data.success) {
        setMyCompany(data.company)
        const edit: Record<string, string> = {}
        for (const [k, v] of Object.entries(data.company)) {
          if (typeof v === 'string' || v === null) edit[k] = (v as string) ?? ''
        }
        setMyCompanyEdit(edit)
        setIsEditingMyCompany(false)
      } else {
        alert(data.error || 'Error al guardar los datos de la empresa')
      }
    } catch (error) {
      console.error('Error saving my company:', error)
      alert('Error al guardar los datos de la empresa')
    } finally {
      setIsSavingMyCompany(false)
    }
  }

  // ─── Company Users handlers (Datos Empresa → Usuarios) ──────────────────
  // Crea un usuario nuevo y lo liga automáticamente a la empresa del admin actual.
  const handleCreateCompanyUser = async () => {
    if (!myCompany) return
    const name = newCompanyUserName.trim()
    const email = newCompanyUserEmail.trim().toLowerCase()
    const password = newCompanyUserPassword
    if (!name || !email || password.length < 6) return

    try {
      // 1. Crear usuario
      const createRes = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: newCompanyUserRole, active: true }),
      })
      const createData = await createRes.json()
      let userId: string
      if (createRes.ok && createData.user) {
        userId = createData.user.id
      } else if (
        createRes.status === 400 &&
        typeof createData.error === 'string' &&
        createData.error.toLowerCase().includes('email')
      ) {
        // Email ya existe — hacer lookup y reutilizar
        const lookupRes = await fetch(`/api/users/lookup-by-email?email=${encodeURIComponent(email)}`)
        const lookupData = await lookupRes.json()
        if (!lookupData.found || !lookupData.user) {
          alert('Ya existe un usuario con ese email pero no se pudo localizar. Usa otro email.')
          return
        }
        userId = lookupData.user.id
      } else {
        alert(createData.error || 'Error al crear el usuario')
        return
      }

      // 2. Ligar a la empresa (si no lo está ya)
      await fetch(`/api/companies/${myCompany.id}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newCompanyUserRole }),
      })

      // 3. v3.0.32-fix: Asignar automáticamente al PRIMER proyecto de la empresa
      //    para que el usuario pueda acceder inmediatamente
      const firstProject = allProjects.find(p => p.company === myCompany.name) || allProjects[0]
      if (firstProject) {
        try {
          const assignProjectRes = await fetch(`/api/projects/${firstProject.id}/members`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, role: newCompanyUserRole }),
          })
          if (assignProjectRes.ok) {
            console.log(`[handleCreateCompanyUser] Usuario ${email} asignado al proyecto ${firstProject.name}`)
          } else {
            console.warn(`[handleCreateCompanyUser] No se pudo asignar al proyecto:`, await assignProjectRes.json())
          }
        } catch (e) {
          console.warn(`[handleCreateCompanyUser] Error asignando al proyecto:`, e)
        }
      }

      // 4. Recargar users y limpiar formulario
      await loadUsers()
      setNewCompanyUserName('')
      setNewCompanyUserEmail('')
      setNewCompanyUserPassword('')
      setNewCompanyUserRole('empleado')
      setShowAddCompanyUser(false)
      alert(`Usuario "${name}" creado y añadado a ${myCompany.name}.`)
    } catch (err) {
      console.error('Error creating company user:', err)
      alert('Error al crear el usuario')
    }
  }

  // Activar / desactivar usuario (no borrar — conserva referencias históricas).
  const handleToggleUserActive = async (userId: string, currentlyActive: boolean, userName: string) => {
    const action = currentlyActive ? 'desactivar' : 'activar'
    if (!confirm(`¿${action.charAt(0).toUpperCase() + action.slice(1)} a "${userName}"?`)) return
    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, active: !currentlyActive }),
      })
      const data = await res.json()
      if (data.success) {
        await loadUsers()
      } else {
        alert(data.error || `Error al ${action} el usuario`)
      }
    } catch (err) {
      console.error('Error toggling user active:', err)
      alert(`Error al ${action} el usuario`)
    }
  }

  // Resetear contraseña de un usuario.
  const handleResetUserPassword = async (userId: string, userEmail: string) => {
    const newPassword = prompt(`Nueva contraseña para ${userEmail} (mín. 6 caracteres):`)
    if (!newPassword) return
    if (newPassword.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, password: newPassword }),
      })
      const data = await res.json()
      if (data.success) {
        await loadUsers()
        alert(`Contraseña actualizada para ${userEmail}.`)
      } else {
        alert(data.error || 'Error al resetear la contraseña')
      }
    } catch (err) {
      console.error('Error resetting password:', err)
      alert('Error al resetear la contraseña')
    }
  }

  // Eliminar usuario completamente.
  const handleDeleteCompanyUser = async (userId: string, userName: string, userEmail: string) => {
    if (!confirm(`¿Eliminar definitivamente a "${userName}" (${userEmail})?\n\nSe quitará de todos los proyectos y zonas. Esta acción no se puede deshacer.`)) return
    try {
      const res = await fetch(`/api/users?id=${userId}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        await loadUsers()
        await loadProjects()
        await fetchProjects()
      } else {
        alert(data.error || 'Error al eliminar el usuario')
      }
    } catch (err) {
      console.error('Error deleting user:', err)
      alert('Error al eliminar el usuario')
    }
  }

  const loadProjectDetail = useCallback(async (projectId: string) => {
    setIsLoadingDetail(true)
    try {
      const [zonesRes, membersRes, configsRes] = await Promise.all([
        fetch(`/api/projects/${projectId}/zones`),
        fetch(`/api/projects/${projectId}/members`),
        fetch('/api/board-configs'),
      ])
      const zonesData = await zonesRes.json()
      const membersData = await membersRes.json()
      const configsData = await configsRes.json()
      const zones = zonesData.zones || []
      setProjectZones(zones)
      setProjectMembers(membersData.members || [])
      if (configsData.success) {
        const configs = (configsData.data || []).map((c: any) => ({ id: c.id, name: c.name, isDefault: c.isDefault }))
        setBoardConfigs(configs)
      }
      // Auto-select ALL zones when adding a member (better to remove than to add)
      setNewMemberZones(zones.map((z: any) => z.id))
      // Auto-select default board config for new zones
      const defaultConfig = (configsData.data || []).find((c: any) => c.isDefault)
      if (defaultConfig) {
        setDefaultBoardConfigId(defaultConfig.id)
      }
    } catch (error) {
      console.error('Error loading project detail:', error)
    } finally {
      setIsLoadingDetail(false)
    }
  }, [])

  const load5SProgress = useCallback(async () => {
    setIsLoading5S(true)
    try {
      const params = new URLSearchParams()
      if (selected5SProjectId) params.set('projectId', selected5SProjectId)
      const res = await fetch(`/api/progress?${params.toString()}`)
      const data = await res.json()
      const progressData = data?.data ? data.data : (Array.isArray(data) ? data : [])
      // Enrich with zone names
      if (selected5SProjectId) {
        const zonesRes = await fetch(`/api/projects/${selected5SProjectId}/zones`)
        const zonesData = await zonesRes.json()
        const zones = zonesData.zones || []
        const enriched = progressData.map((p: any) => ({
          ...p,
          zoneName: zones.find((z: any) => z.id === p.zoneId)?.name || (p.zoneId ? 'Zona sin nombre' : 'Sin zona'),
        }))
        setProgress5S(enriched)
      } else {
        setProgress5S(progressData)
      }
    } catch (error) {
      console.error('Error loading 5S progress:', error)
    } finally {
      setIsLoading5S(false)
    }
  }, [selected5SProjectId])

  useEffect(() => {
    loadProjects()
    loadUsers()
    loadCompanies()
    loadMyCompany()
  }, [loadProjects, loadUsers, loadCompanies, loadMyCompany])

  // 5S-steps tab was removed; load5SProgress kept for potential future use
  void load5SProgress;

  useEffect(() => {
    if (selectedProjectId) {
      loadProjectDetail(selectedProjectId)
    }
  }, [selectedProjectId, loadProjectDetail])

  useEffect(() => {
    if (expandedCompanyId) {
      loadCompanyDetail(expandedCompanyId)
    }
  }, [expandedCompanyId, loadCompanyDetail])

  // ─── Project actions ─────────────────────────────────────────────────────

  // Add an existing user to the new-project pending list.
  // New users must be created in "Datos Empresa → Usuarios" first.
  const handleAddNewProjectMember = () => {
    const u = users.find(x => x.id === npMemberExistingId)
    if (!u) return
    setNewProjectMembers(prev => [
      ...prev,
      {
        mode: 'existing' as const,
        userId: u.id,
        name: u.name,
        email: u.email,
        role: npMemberRole,
        zoneIdxs: npMemberZoneIdxs.length > 0 ? [...npMemberZoneIdxs] : newProjectZones.map((_, i) => i),
      },
    ])
    // Reset form
    setNpMemberExistingId('')
    setNpMemberName('')
    setNpMemberEmail('')
    setNpMemberPassword('')
    setNpMemberRole('empleado')
    setNpMemberZoneIdxs([])
  }

  const handleCreateProject = async () => {
    if (!newProjectName.trim() || !newProjectCompany.trim()) return
    const validZones = newProjectZones.filter(z => z.name.trim())
    if (validZones.length === 0) return

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProjectName,
          description: newProjectDesc || undefined,
          company: newProjectCompany,
          companyId: companies.find(c => c.name === newProjectCompany)?.id || undefined,
          zones: validZones.map(z => ({ name: z.name, color: z.color })),
        }),
      })
      if (res.ok) {
        const data = await res.json()
        const projectId = data.project.id
        // Real zone IDs returned by the backend, in the same order as validZones
        const realZoneIds: string[] = (data.project.zones || []).map((z: any) => z.id)

        // Auto-add current user as admin (always)
        const { currentUser } = use5SStore.getState()
        if (currentUser) {
          await fetch(`/api/projects/${projectId}/members`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: currentUser.email,
              name: currentUser.name,
              role: 'admin',
              zoneIds: realZoneIds,
            }),
          })
        }

        // Add each pending member (existing or new) to the newly created project
        for (const member of newProjectMembers) {
          // Resolve which zone IDs this member should be assigned to
          const memberZoneIds = member.zoneIdxs
            .map(i => realZoneIds[i])
            .filter(Boolean) as string[]
          const body: any = {
            email: member.email,
            name: member.name,
            role: member.role,
            zoneIds: memberZoneIds.length > 0 ? memberZoneIds : undefined,
          }
          if (member.mode === 'new' && member.password && member.password.length >= 6) {
            body.password = member.password
          }
          try {
            await fetch(`/api/projects/${projectId}/members`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            })
          } catch (err) {
            console.error('Error adding member to new project:', err)
          }
        }

        setShowNewProject(false)
        setNewProjectName('')
        setNewProjectCompany('')
        setIsNewCompanyCustom(false)
        setNewProjectDesc('')
        setNewProjectZones([{ name: '', color: PRESET_COLORS[0] }])
        setNewProjectMembers([])
        setNpMemberMode('existing')
        setNpMemberExistingId('')
        setNpMemberName('')
        setNpMemberEmail('')
        setNpMemberPassword('')
        setNpMemberRole('empleado')
        setNpMemberZoneIdxs([])
        await loadProjects()
        await fetchProjects()
      }
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  // v2.108.5 — Crear proyecto con solo nombre + empresa y lanzar el wizard
  // de zonificación inmediatamente. El wizard hará las preguntas (m², empleados)
  // y creará las zonas + asignará usuarios.
  //
  // v2.108.5 fix: si algo falla, mostrar alert con detalles exactos
  // (antes solo console.error → el admin no veía qué pasó y el wizard
  // nunca se abría).
  const handleCreateProjectAndWizard = async () => {
    if (!newProjectName.trim() || !newProjectCompany.trim()) {
      alert('Faltan datos: necesitas rellenar Nombre del Proyecto y Empresa.')
      return
    }

    const payload = {
      name: newProjectName.trim(),
      description: newProjectDesc?.trim() || undefined,
      company: newProjectCompany.trim(),
      companyId: companies.find(c => c.name === newProjectCompany)?.id || undefined,
      zones: [], // sin zonas — las creará el wizard
    }
    console.log('[handleCreateProjectAndWizard] POST /api/projects', payload)

    let projectId: string | null = null
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const msg = data.error || `HTTP ${res.status} al crear el proyecto`
        console.error('[handleCreateProjectAndWizard] POST /api/projects failed:', res.status, data)
        alert(`No se pudo crear el proyecto:\n\n${msg}\n\nRevisa la consola (F12) para más detalle.`)
        return
      }
      projectId = data?.project?.id
      if (!projectId) {
        console.error('[handleCreateProjectAndWizard] Respuesta sin project.id:', data)
        alert('Respuesta inesperada del servidor al crear el proyecto. Revisa consola (F12).')
        return
      }
      console.log('[handleCreateProjectAndWizard] proyecto creado:', projectId)
    } catch (error) {
      console.error('[handleCreateProjectAndWizard] error de red:', error)
      alert(`Error de red al crear el proyecto:\n\n${error instanceof Error ? error.message : String(error)}`)
      return
    }

    // Auto-add current user as admin del proyecto (no bloquea el wizard si falla)
    try {
      const { currentUser } = use5SStore.getState()
      if (currentUser) {
        await fetch(`/api/projects/${projectId}/members`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: currentUser.email,
            name: currentUser.name,
            role: 'admin',
          }),
        })
      }
    } catch (e) {
      console.warn('[handleCreateProjectAndWizard] no se pudo auto-añadir como admin:', e)
    }

    // Cerrar formulario y resetear estado
    setShowNewProject(false)
    setNewProjectName('')
    setNewProjectCompany('')
    setIsNewCompanyCustom(false)
    setNewProjectDesc('')
    setNewProjectZones([{ name: '', color: PRESET_COLORS[0] }])
    setNewProjectMembers([])

    // Recargar proyectos (en background, sin bloquear el wizard)
    Promise.all([loadProjects(), fetchProjects()]).catch(e =>
      console.warn('[handleCreateProjectAndWizard] error recargando proyectos:', e)
    )

    // Abrir wizard con el proyecto recién creado.
    // v2.108.5: Usamos setTimeout para garantizar que el estado se actualice
    // en el siguiente tick (a veces React batchea y el modal no aparece).
    console.log('[handleCreateProjectAndWizard] abriendo wizard para proyecto', projectId)
    setTimeout(() => {
      setZoneWizardProjectId(projectId)
      setZoneWizardOpen(true)
    }, 50)
  }

  const handleUpdateProject = async (projectId: string) => {
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editProjectData),
      })
      if (res.ok) {
        setEditingProject(null)
        await loadProjects()
        await fetchProjects()
      }
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    const project = allProjects.find(p => p.id === projectId)
    const name = project?.name || 'este proyecto'

    // v2.108.6 — Confirm explícito con lista de qué se borra
    const zoneCount = project?.zones?.length || 0
    const memberCount = project?.memberCount || 0
    const msg = `¿BORRAR "${name}"?\n\n`
      + `Se eliminarán PERMANENTEMENTE:\n`
      + `  • ${zoneCount} zona(s) + sus MemberZones\n`
      + `  • ${memberCount} miembro(s) del proyecto\n`
      + `  • Todos los inventarios, progresos y auditorías\n`
      + `  • Planes de acción (ActionItem) y fotos\n`
      + `  • Respuestas de exámenes y checklists\n`
      + `  • Notificaciones relacionadas\n\n`
      + `NO se puede deshacer.\n\n`
      + `Escribe BORRAR para confirmar:`
    const confirmation = prompt(msg)
    if (confirmation?.trim().toUpperCase() !== 'BORRAR') {
      return
    }

    try {
      const res = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        // v2.107 — Si el proyecto borrado era el activo en el store,
        // setCurrentProject(null) ahora limpia TODO el state colgante
        // (zona, progreso, userZones, notifs) para que no quede "tablero
        // fantasma" apuntando a la z1 del proyecto recién borrado.
        const store = use5SStore.getState()
        if (store.currentProject?.id === projectId) {
          store.setCurrentProject(null)
        }
        if (currentProject?.id === projectId) {
          const remaining = allProjects.filter(p => p.id !== projectId)
          setCurrentProject(remaining.length > 0 ? remaining[0] : null)
        }
        await loadProjects()
        await fetchProjects()
        // Feedback visual
        alert(`Proyecto "${name}" borrado.\nZonas: ${data.deleted?.zonesCount ?? '?'}\nNotifs: ${data.deleted?.notificationsDeleted ?? '?'}`)
      } else {
        const errMsg = data.error || `HTTP ${res.status}`
        console.error('Error deleting project:', res.status, data)
        alert(`No se pudo borrar el proyecto:\n\n${errMsg}`)
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      const msg = error instanceof Error ? error.message : String(error)
      alert(`Error de red al borrar el proyecto:\n\n${msg}`)
    }
  }

  const handleSelectProject = (projectId: string) => {
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null)
    } else {
      setSelectedProjectId(projectId)
      // Recargar users por si la carga inicial aún no terminó o si han cambiado
      loadUsers()
    }
  }

  const handleAddZone = async () => {
    if (!selectedProjectId || !newZoneName.trim()) return
    try {
      const res = await fetch(`/api/projects/${selectedProjectId}/zones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newZoneName, color: newZoneColor }),
      })
      if (res.ok) {
        setNewZoneName('')
        setNewZoneColor(PRESET_COLORS[(projectZones.length) % PRESET_COLORS.length])
        await loadProjectDetail(selectedProjectId)
        await loadProjects()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al agregar zona')
      }
    } catch (error) {
      console.error('Error adding zone:', error)
      alert('Error de conexión al agregar zona')
    }
  }

  const handleDeleteZone = async (zoneId: string, zoneName: string) => {
    if (!selectedProjectId) return
    if (!confirm(`¿Estás seguro de eliminar la zona "${zoneName}"? Los miembros asignados a esta zona perderán la asignación.`)) return
    try {
      const res = await fetch(`/api/projects/${selectedProjectId}/zones`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zoneId }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        await loadProjectDetail(selectedProjectId)
        await loadProjects()
        // v3.0.32: Feedback visual con detalles
        alert(`Zona "${zoneName}" eliminada correctamente.\n${data.details ? `Miembros desasignados: ${data.details.memberAssignmentsRemoved}` : ''}`)
      } else {
        const errMsg = data.error || `Error HTTP ${res.status}`
        console.error('Error deleting zone:', res.status, data)
        alert(`No se pudo borrar la zona:\n\n${errMsg}`)
      }
    } catch (error) {
      console.error('Error deleting zone:', error)
      const msg = error instanceof Error ? error.message : String(error)
      alert(`Error de red al eliminar zona:\n\n${msg}`)
    }
  }

  const handleZoneBoardConfig = async (zoneId: string, boardConfigId: string) => {
    if (!selectedProjectId) return
    try {
      const res = await fetch(`/api/projects/${selectedProjectId}/zones`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zoneId, boardConfigId }),
      })
      if (res.ok) {
        // Update local state
        setProjectZones(prev => prev.map(z => {
          if (z.id === zoneId) {
            const config = boardConfigs.find(c => c.id === boardConfigId)
            return { ...z, boardConfigId: boardConfigId || null, boardConfig: config ? { id: config.id, name: config.name } : null }
          }
          return z
        }))
      }
    } catch (error) {
      console.error('Error updating zone board config:', error)
    }
  }

  const handleAddMember = async () => {
    if (!selectedProjectId) return
    try {
      if (addMemberMode === 'existing') {
        // Add existing user to project
        const selectedUser = users.find(u => u.id === selectedExistingUserId)
        if (!selectedUser) return

        const body: any = {
          email: selectedUser.email,
          name: selectedUser.name,
          role: newMemberRole,
          zoneIds: newMemberZones.length > 0 ? newMemberZones : undefined,
        }
        const res = await fetch(`/api/projects/${selectedProjectId}/members`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.ok) {
          setSelectedExistingUserId('')
          setNewMemberRole('empleado')
          setNewMemberZones(projectZones.map(z => z.id))
          await loadProjectDetail(selectedProjectId)
        }
      } else {
        // Create new user and add to project
        if (!newMemberName.trim() || !newMemberEmail.trim()) return
        const body: any = {
          email: newMemberEmail,
          name: newMemberName,
          role: newMemberRole,
          zoneIds: newMemberZones.length > 0 ? newMemberZones : undefined,
        }
        if (newMemberPassword && newMemberPassword.length >= 6) {
          body.password = newMemberPassword
        }
        const res = await fetch(`/api/projects/${selectedProjectId}/members`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.ok) {
          const data = await res.json()
          if (data.member?.generatedPassword) {
            setGeneratedPassword(data.member.generatedPassword)
            setGeneratedMemberName(data.member.user?.name || newMemberName)
          }
          setNewMemberName('')
          setNewMemberEmail('')
          setNewMemberRole('empleado')
          setNewMemberZones(projectZones.map(z => z.id))
          setNewMemberPassword('')
          await loadProjectDetail(selectedProjectId)
        }
      }
    } catch (error) {
      console.error('Error adding member:', error)
    }
  }

  const handleRemoveMember = async (memberId: string, memberName: string) => {
    if (!selectedProjectId) return
    if (!confirm(`¿Estás seguro de eliminar a "${memberName}" de este proyecto?`)) return
    try {
      const res = await fetch(`/api/projects/${selectedProjectId}/members`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId }),
      })
      if (res.ok) {
        await loadProjectDetail(selectedProjectId)
        await loadProjects()
        await loadUsers()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al eliminar miembro')
      }
    } catch (error) {
      console.error('Error removing member:', error)
    }
  }

  // ─── Per-zone member actions ─────────────────────────────────────────────
  // Devuelve los miembros asignados a una zona concreta (deriva del estado de
  // projectMembers, que ya incluye el array `zones` de cada miembro).
  const getMembersOfZone = (zoneId: string): MemberData[] => {
    return projectMembers.filter(m => m.zones.some(z => z.id === zoneId))
  }

  // Asigna un usuario existente a una zona concreta. Si no es ProjectMember
  // todavía, lo crea con el rol indicado (por defecto 'empleado') y le asigna
  // esta zona. Si ya es ProjectMember, solo crea el MemberZone.
  const handleAddExistingUserToZone = async (zoneId: string) => {
    if (!selectedProjectId) return
    const userId = zoneAddUserId[zoneId]
    if (!userId) {
      alert('Selecciona un usuario de la lista desplegable.')
      return
    }
    const role = zoneAddRole[zoneId] || 'empleado'
    try {
      const res = await fetch(
        `/api/projects/${selectedProjectId}/zones/${zoneId}/members`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, role }),
        }
      )
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'Error al asignar usuario a la zona')
        return
      }
      // Update local state
      setProjectMembers(prev => {
        const existingIdx = prev.findIndex(m => m.id === data.member.id)
        if (existingIdx >= 0) {
          // Replace with the updated member (zones array updated)
          const next = [...prev]
          next[existingIdx] = data.member
          return next
        }
        // New project member
        return [...prev, data.member]
      })
      // Clear picker for this zone
      setZoneAddUserId(prev => { const n = { ...prev }; delete n[zoneId]; return n })
      setZoneAddRole(prev => { const n = { ...prev }; delete n[zoneId]; return n })
      setZoneSearch(prev => { const n = { ...prev }; delete n[zoneId]; return n })
      setZoneShowList(prev => { const n = { ...prev }; delete n[zoneId]; return n })
      await loadProjects()
    } catch (error) {
      console.error('Error adding user to zone:', error)
      alert('Error de conexión al asignar usuario a la zona')
    }
  }

  // Crea un usuario NUEVO desde el formulario de la zona y lo asigna a ella.
  // Si el email ya existe (en otra empresa, inactivo, etc.), automáticamente
  // busca ese usuario y lo asigna a la zona en vez de fallar.
  const handleCreateNewUserInZone = async (zoneId: string) => {
    if (!selectedProjectId) return
    const name = (zoneNewName[zoneId] || '').trim()
    const email = (zoneNewEmail[zoneId] || '').trim().toLowerCase()
    const password = zoneNewPassword[zoneId] || ''
    const role = zoneAddRole[zoneId] || 'empleado'

    if (!name || !email) {
      alert('Nombre y email son obligatorios.')
      return
    }
    if (!password || password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    try {
      // 1. Intentar crear el usuario
      let userId: string
      let wasExisting = false
      let existingUserName = name

      const createUserRes = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, active: true }),
      })
      const createUserData = await createUserRes.json()

      if (createUserRes.ok && createUserData.user) {
        userId = createUserData.user.id
      } else if (
        createUserRes.status === 400 &&
        typeof createUserData.error === 'string' &&
        createUserData.error.toLowerCase().includes('email')
      ) {
        // El email ya existe en el sistema (probablemente en otra empresa
        // o como usuario inactivo que el admin actual no ve en su lista).
        // Hacemos lookup exacto por email y lo asignamos a la zona.
        const lookupRes = await fetch(
          `/api/users/lookup-by-email?email=${encodeURIComponent(email)}`
        )
        if (!lookupRes.ok) {
          alert(
            `Ya existe un usuario con ese email pero no se pudo localizar ` +
            `automáticamente. Prueba con otro email.`
          )
          return
        }
        const lookupData = await lookupRes.json()
        if (!lookupData.found || !lookupData.user) {
          alert(
            `Ya existe un usuario con ese email pero no se pudo localizar ` +
            `automáticamente. Prueba con otro email.`
          )
          return
        }
        userId = lookupData.user.id
        wasExisting = true
        existingUserName = lookupData.user.name
      } else {
        alert(createUserData.error || 'Error al crear el usuario')
        return
      }

      // 2. Asignar a la zona (esto crea ProjectMember + MemberZone si no existen)
      const assignRes = await fetch(
        `/api/projects/${selectedProjectId}/zones/${zoneId}/members`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, role }),
        }
      )
      const assignData = await assignRes.json()
      if (!assignRes.ok) {
        alert(assignData.error || 'Error al asignar el usuario a la zona')
        return
      }

      // 3. Actualizar estado local
      setProjectMembers(prev => {
        const existingIdx = prev.findIndex(m => m.id === assignData.member.id)
        if (existingIdx >= 0) {
          const next = [...prev]
          next[existingIdx] = assignData.member
          return next
        }
        return [...prev, assignData.member]
      })

      // 4. Recargar users y projects para reflejar cambios
      await Promise.all([loadUsers(), loadProjects()])

      // 5. Limpiar formulario
      setZoneNewName(prev => { const n = { ...prev }; delete n[zoneId]; return n })
      setZoneNewEmail(prev => { const n = { ...prev }; delete n[zoneId]; return n })
      setZoneNewPassword(prev => { const n = { ...prev }; delete n[zoneId]; return n })
      setZoneAddRole(prev => { const n = { ...prev }; delete n[zoneId]; return n })
      setZoneAddMode(prev => { const n = { ...prev }; delete n[zoneId]; return n })

      // 6. Notificación al admin
      if (wasExisting) {
        alert(
          `El email "${email}" ya existía en el sistema (posiblemente en otra empresa). ` +
          `Se ha asignado a "${existingUserName}" a esta zona con el rol indicado. ` +
          `Si querías crear un usuario distinto, usa otro email.`
        )
        setGeneratedPassword(null)
        setGeneratedMemberName(null)
      } else {
        setGeneratedPassword(password)
        setGeneratedMemberName(name)
      }
    } catch (error) {
      console.error('Error creating new user in zone:', error)
      alert('Error de conexión al crear el usuario')
    }
  }

  // Retira a un miembro SOLO de esta zona (mantiene el ProjectMember y el User).
  const handleRemoveMemberFromZone = async (zoneId: string, memberId: string, memberName: string) => {
    if (!selectedProjectId) return
    if (!confirm(`¿Retirar a "${memberName}" de esta zona? Seguirá siendo miembro del proyecto.`)) return
    try {
      const res = await fetch(
        `/api/projects/${selectedProjectId}/zones/${zoneId}/members?memberId=${memberId}`,
        { method: 'DELETE' }
      )
      if (res.ok) {
        // Update local state: remove the zone from the member's zones array
        setProjectMembers(prev =>
          prev.map(m =>
            m.id === memberId
              ? { ...m, zones: m.zones.filter(z => z.id !== zoneId) }
              : m
          )
        )
        await loadProjects()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al retirar miembro de la zona')
      }
    } catch (error) {
      console.error('Error removing member from zone:', error)
    }
  }

  // Cambia el rol de un miembro (a nivel de proyecto, ya que el rol es por
  // ProjectMember en este esquema).
  const handleUpdateMemberRoleInZone = async (zoneId: string, memberId: string, newRole: string) => {
    if (!selectedProjectId) return
    setProjectMembers(prev => prev.map(m => m.id === memberId ? { ...m, role: newRole } : m))
    try {
      await fetch(
        `/api/projects/${selectedProjectId}/zones/${zoneId}/members`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ memberId, role: newRole }),
        }
      )
    } catch (error) {
      console.error('Error updating member role:', error)
    }
  }

  // Renombra una zona inline
  const handleSaveZoneName = async (zoneId: string) => {
    if (!selectedProjectId) return
    if (!editingZoneName.trim()) {
      setEditingZoneId(null)
      return
    }
    try {
      const res = await fetch(`/api/projects/${selectedProjectId}/zones`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zoneId, name: editingZoneName.trim() }),
      })
      if (res.ok) {
        setProjectZones(prev => prev.map(z => z.id === zoneId ? { ...z, name: editingZoneName.trim() } : z))
      } else {
        const data = await res.json()
        alert(data.error || 'Error al renombrar la zona')
      }
    } catch (error) {
      console.error('Error renaming zone:', error)
    }
    setEditingZoneId(null)
  }

  // ─── Company actions ────────────────────────────────────────────────────
  const handleCreateCompany = async () => {
    if (!newCompanyName.trim()) return
    try {
      const res = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCompanyName, description: newCompanyDesc || undefined }),
      })
      if (res.ok) {
        setShowNewCompany(false)
        setNewCompanyName('')
        setNewCompanyDesc('')
        await loadCompanies()
        await fetchCompanies()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al crear empresa')
      }
    } catch (error) {
      console.error('Error creating company:', error)
    }
  }

  const handleUpdateCompany = async (companyId: string) => {
    try {
      const res = await fetch(`/api/companies/${companyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCompanyData),
      })
      if (res.ok) {
        setEditingCompany(null)
        await loadCompanies()
        await fetchCompanies()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al actualizar empresa')
      }
    } catch (error) {
      console.error('Error updating company:', error)
    }
  }

  const handleDeleteCompany = (companyId: string) => {
    const company = companies.find(c => c.id === companyId)
    if (!company) return
    setDeleteCompanyDialog({
      open: true,
      companyId: company.id,
      companyName: company.name,
      projectCount: company.projectCount,
    })
  }

  const confirmDeleteCompany = async (force: boolean) => {
    const { companyId } = deleteCompanyDialog
    setDeleteCompanyDialog(d => ({ ...d, open: false }))
    try {
      const url = force ? `/api/companies/${companyId}?force=true` : `/api/companies/${companyId}`
      const res = await fetch(url, { method: 'DELETE' })
      if (res.ok) {
        const data = await res.json()
        if (data.softDelete) {
          alert(data.message)
        }
        await loadCompanies()
        await fetchCompanies()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al eliminar empresa')
      }
    } catch (error) {
      console.error('Error deleting company:', error)
    }
  }

  // v3.0.32-fix6: Asignar todos los usuarios sin proyecto
  const handleFixUsersWithoutProject = async () => {
    if (!confirm('¿Asignar TODOS los usuarios sin proyecto a su empresa?\n\nEsto corrige el bug donde usuarios como Luis no podían entrar aunque tenían zona asignada.')) {
      return
    }

    try {
      // Obtener info del usuario actual para la autenticación
      // FIX v3.0.34: Usar /api/auth (no /api/auth/me que no existe)
      const userRes = await fetch('/api/auth')
      const userData = await userRes.json()
      
      const res = await fetch('/api/admin/fix-users', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user': JSON.stringify(userData.user || userData)
        }
      })
      
      const data = await res.json()
      
      if (res.ok) {
        alert(`✅ ${data.message}\n\nUsuarios procesados: ${data.totalUsers}\nCorregidos: ${data.fixedCount}`)
        
        // Recargar datos
        await Promise.all([loadUsers(), loadProjects()])
        
        // Mostrar detalle de qué se corrigió
        const fixedUsers = data.results.filter((r: any) => r.status === 'fixed')
        if (fixedUsers.length > 0) {
          console.log('[fix-users] Usuarios corregidos:', fixedUsers)
        }
      } else {
        alert(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Error fixing users:', error)
      alert('❌ Error de conexión al corregir usuarios')
    }
  }

  const handleAddGerente = async () => {
    if (!expandedCompanyId || !addGerenteUserId) return
    try {
      const res = await fetch(`/api/companies/${expandedCompanyId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: addGerenteUserId, role: 'gerente' }),
      })
      if (res.ok) {
        setAddGerenteUserId('')
        await loadCompanyDetail(expandedCompanyId)
        await loadCompanies()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al asignar gerente')
      }
    } catch (error) {
      console.error('Error adding gerente:', error)
    }
  }

  const handleRemoveCompanyMember = async (userId: string, userName: string) => {
    if (!expandedCompanyId) return
    if (!confirm(`¿Estás seguro de eliminar a "${userName}" de esta empresa?`)) return
    try {
      const res = await fetch(`/api/companies/${expandedCompanyId}/members`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberUserId: userId }),
      })
      if (res.ok) {
        await loadCompanyDetail(expandedCompanyId)
        await loadCompanies()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al eliminar miembro')
      }
    } catch (error) {
      console.error('Error removing company member:', error)
    }
  }

  // ─── User actions ────────────────────────────────────────────────────────
  const handleCreateUser = async () => {
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserPassword.trim()) return
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
          role: newUserRole,
        }),
      })
      if (res.ok) {
        setShowNewUser(false)
        setNewUserName('')
        setNewUserEmail('')
        setNewUserPassword('')
        setNewUserRole('empleado')
        await loadUsers()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al crear usuario')
      }
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const handleUpdateUser = async (userId: string) => {
    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, ...editUserData }),
      })
      if (res.ok) {
        setEditingUser(null)
        await loadUsers()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al actualizar usuario')
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const handleResetPassword = async (userId: string) => {
    if (!newPassword || newPassword.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres')
      return
    }
    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, password: newPassword }),
      })
      if (res.ok) {
        setResetPasswordUserId(null)
        setNewPassword('')
        alert('Contraseña actualizada correctamente')
      }
    } catch (error) {
      console.error('Error resetting password:', error)
    }
  }

  const handleToggleActive = async (userId: string, currentActive: boolean) => {
    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, active: !currentActive }),
      })
      if (res.ok) {
        await loadUsers()
      }
    } catch (error) {
      console.error('Error toggling user active:', error)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return
    try {
      const res = await fetch(`/api/users?id=${userId}`, { method: 'DELETE' })
      if (res.ok) {
        await loadUsers()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al eliminar usuario')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className={`flex flex-col h-full bg-gradient-to-b from-gray-50 to-white`}>
      {/* Header - only shown in standalone mode */}
      {!embedded && (
        <header className="border-b bg-white shrink-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* v2.30.2: volver al selector de proyecto (no al board directamente) */}
              <Button variant="ghost" size="sm" onClick={goToProjectSelector} className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
              <div className="w-px h-6 bg-gray-200" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <h1 className="text-lg font-bold text-gray-900">Panel de Admin de Empresa</h1>
            </div>
            {onLogout && (
              <Button variant="outline" size="sm" onClick={onLogout} className="gap-1 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
                <LogOut className="h-3.5 w-3.5" />
                <span className="text-xs hidden sm:inline">Salir</span>
              </Button>
            )}
          </div>
        </header>
      )}

      {/* Tabs — Order: Empresas / Proyectos (las plantillas se gestionan por zona y desde el panel del gestor) */}
      <div className="border-b bg-white shrink-0">
        <div className={`flex gap-1 ${embedded ? '' : 'max-w-5xl mx-auto px-4'}`}>
          <button
            onClick={() => { setActiveTab('companies'); setSelectedProjectId(null) }}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'companies'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Building2 className="h-4 w-4" />
            Datos Empresa
          </button>
          <button
            onClick={() => { setActiveTab('projects'); setSelectedProjectId(null) }}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'projects'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Building2 className="h-4 w-4" />
            Proyectos
          </button>
        </div>
      </div>

      {/* Content */}
      <main className={`flex-1 min-h-0 overflow-auto w-full px-4 py-6 ${embedded ? '' : 'max-w-5xl mx-auto'}`}>
        <AnimatePresence mode="wait">
          {/* ═══ PROJECTS TAB ═══ */}
          {activeTab === 'projects' && (
            <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {/* ─────────── CAJA 1: PROYECTOS ACTIVOS (contiene la lista) ─────────── */}
              <div className="rounded-lg border border-blue-100 bg-blue-50/30 p-3 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-blue-500/15 flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Proyectos Activos</h3>
                      <p className="text-[11px] text-muted-foreground">
                        {allProjects.length === 0
                          ? 'Aún no hay proyectos. Crea el primero más abajo.'
                          : `${allProjects.filter(p => p.active).length} activos · ${allProjects.length} en total`}
                      </p>
                    </div>
                  </div>
                </div>
              
              {/* ─────────── LISTA DE PROYECTOS ACTIVOS ─────────── */}

              {/* Projects list */}
              {isLoadingProjects ? (
                <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-purple-500 animate-spin" /></div>
              ) : allProjects.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Building2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No hay proyectos creados</p>
                  <p className="text-xs mt-1">Crea un proyecto para comenzar la implementación 5S</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {allProjects.map(project => (
                    <Card key={project.id} className={`transition-all ${selectedProjectId === project.id ? 'border-purple-300 shadow-md' : 'hover:border-gray-300'}`}>
                      <CardContent className="p-4">
                        {/* Project header row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => handleSelectProject(project.id)}>
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-purple-500" />
                            </div>
                            <div className="flex-1">
                              {editingProject === project.id ? (
                                <div className="space-y-2" onClick={e => e.stopPropagation()}>
                                  <div className="grid grid-cols-2 gap-2">
                                    <Input value={editProjectData.name} onChange={e => setEditProjectData(d => ({ ...d, name: e.target.value }))} className="text-sm" />
                                    <Input value={editProjectData.company} onChange={e => setEditProjectData(d => ({ ...d, company: e.target.value }))} className="text-sm" />
                                  </div>
                                  <Input value={editProjectData.description} onChange={e => setEditProjectData(d => ({ ...d, description: e.target.value }))} className="text-sm" placeholder="Descripción" />
                                  <div className="flex gap-2">
                                    <Button size="sm" onClick={() => handleUpdateProject(project.id)} className="bg-purple-600 text-white h-7"><Check className="h-3 w-3 mr-1" />Guardar</Button>
                                    <Button size="sm" variant="outline" onClick={() => setEditingProject(null)} className="h-7">Cancelar</Button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <h3 className="font-semibold text-sm">{project.name}</h3>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>{project.company}</span>
                                    <span>·</span>
                                    <span>{project.zones.length} zonas</span>
                                    <span>·</span>
                                    <span>{project.memberCount} miembros</span>
                                    {!project.active && <Badge className="bg-red-100 text-red-700 border border-red-200 ml-1">Inactivo</Badge>}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          {editingProject !== project.id && (
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-500 hover:text-blue-700"
                                onClick={() => {
                                  setEditingProject(project.id)
                                  setEditProjectData({ name: project.name, description: project.description || '', company: project.company })
                                }}
                                title="Editar proyecto"
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-red-600"
                                onClick={() => handleDeleteProject(project.id)}
                                title="Eliminar proyecto"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>

                        {/* Expanded project detail */}
                        <AnimatePresence>
                          {selectedProjectId === project.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t space-y-4">
                                {isLoadingDetail ? (
                                  <div className="flex justify-center py-4"><Loader2 className="h-5 w-5 text-purple-500 animate-spin" /></div>
                                ) : (
                                  <>
                                    {/* Notificación de contraseña generada al crear nuevo usuario */}
                                    {generatedPassword && (
                                      <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                                        <ShieldCheck className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                        <div className="flex-1 min-w-0">
                                          <p className="text-xs font-semibold text-green-800">Contraseña creada para {generatedMemberName}</p>
                                          <div className="flex items-center gap-2 mt-1">
                                            <code className="text-sm font-mono bg-green-100 px-2 py-0.5 rounded text-green-900 select-all">{generatedPassword}</code>
                                            <Button size="sm" variant="outline" className="h-6 text-[10px] gap-1" onClick={() => { navigator.clipboard.writeText(generatedPassword) }}>
                                              <Save className="h-3 w-3" /> Copiar
                                            </Button>
                                          </div>
                                          <p className="text-[10px] text-green-700 mt-1">Guarda esta contraseña. No se volverá a mostrar.</p>
                                        </div>
                                        <button onClick={() => { setGeneratedPassword(null); setGeneratedMemberName(null) }} className="text-green-400 hover:text-green-600">
                                          <X className="h-4 w-4" />
                                        </button>
                                      </div>
                                    )}

                                    {/* Zonas existentes — UNA TRAS OTRA CON SUS USUARIOS */}
                                    
                                    {/* ═══════ PLANTILLAS DEL PROYECTO (v3.0.32) ═══════ */}
                                    <ProjectTemplatesSection
                                      project={{
                                        id: project.id,
                                        name: project.name,
                                        company: project.company,
                                        companyId: project.companyId
                                      }}
                                      currentCompanyId={project.companyId}
                                      currentCompanyName={project.company}
                                    />

                                    {/* Zonas existentes — UNA TRAS OTRA CON SUS USUARIOS */}
                                    <div>
                                      <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2 flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> Zonas del Proyecto
                                        {projectZones.length > 0 && (
                                          <Badge className="ml-1 text-[9px] py-0 px-1.5 bg-gray-100 text-gray-600 border-0">
                                            {projectZones.length}
                                          </Badge>
                                        )}
                                        <span className="ml-2 text-[10px] font-normal text-muted-foreground/70 normal-case">
                                          · Cada zona se muestra con sus miembros (compartidos entre zonas)
                                        </span>
                                      </h4>
                                      {projectZones.length === 0 ? (
                                        <div className="p-4 rounded-lg border border-dashed bg-gray-50 text-center">
                                          <MapPin className="h-6 w-6 mx-auto mb-1 text-gray-300" />
                                          <p className="text-xs text-muted-foreground">Todavía no hay zonas en este proyecto.</p>
                                          <p className="text-[10px] text-muted-foreground mt-0.5">Crea la primera zona más abajo.</p>
                                        </div>
                                      ) : (
                                        <div className="space-y-3">
                                          {projectZones.map(zone => {
                                            const zoneMembers = getMembersOfZone(zone.id)
                                            // Empresa del proyecto actual (para filtrar "existentes en esta empresa")
                                            const currentProjectCompany = allProjects.find(
                                              p => p.id === selectedProjectId
                                            )?.company
                                            // Usuarios disponibles para asignar a esta zona:
                                            // - activos
                                            // - que pertenezcan a la MISMA EMPRESA que el proyecto
                                            // - que no estén ya en esta zona
                                            const availableUsers = users.filter(u => {
                                              if (!u.active) return false
                                              if (zoneMembers.some(m => m.user.id === u.id)) return false
                                              if (!currentProjectCompany) return true
                                              // Debe pertenecer a la empresa del proyecto (vía companies[])
                                              // o ya tener un proyecto en esa misma empresa
                                              const inCompany = u.companies?.some(c => c.name === currentProjectCompany)
                                              const inProjectCompany = u.projects.some(p => p.projectCompany === currentProjectCompany)
                                              return inCompany || inProjectCompany
                                            })
                                            return (
                                              <div key={zone.id} className="rounded-lg border bg-white overflow-hidden">
                                                {/* Zona header */}
                                                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-50 to-white border-b">
                                                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: zone.color }} />
                                                  {editingZoneId === zone.id ? (
                                                    <>
                                                      <Input
                                                        value={editingZoneName}
                                                        onChange={e => setEditingZoneName(e.target.value)}
                                                        className="h-7 text-xs flex-1 max-w-[260px]"
                                                        autoFocus
                                                        onKeyDown={e => {
                                                          if (e.key === 'Enter') handleSaveZoneName(zone.id)
                                                          if (e.key === 'Escape') setEditingZoneId(null)
                                                        }}
                                                      />
                                                      <Button size="sm" className="h-7 text-[10px] bg-purple-600 text-white" onClick={() => handleSaveZoneName(zone.id)}>
                                                        <Check className="h-3 w-3 mr-1" /> Guardar
                                                      </Button>
                                                      <Button size="sm" variant="outline" className="h-7 text-[10px]" onClick={() => setEditingZoneId(null)}>
                                                        Cancelar
                                                      </Button>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <span className="font-semibold text-sm flex-1">{zone.name}</span>
                                                      <Badge
                                                        className={`text-[9px] px-1 py-0 border-0 ${
                                                          zone.boardConfig?.isDefault
                                                            ? 'bg-indigo-100 text-indigo-700'
                                                            : zone.boardConfig
                                                              ? 'bg-violet-100 text-violet-700'
                                                              : 'bg-gray-100 text-gray-500'
                                                        }`}
                                                        title={
                                                          zone.boardConfig
                                                            ? `Tablero: ${zone.boardConfig.name}${zone.boardConfig.isDefault ? ' (predeterminado del sistema, compartido por otras zonas)' : ''}`
                                                            : 'Esta zona no tiene tablero asignado'
                                                        }
                                                      >
                                                        <LayoutGrid className="h-2.5 w-2.5 mr-0.5 inline" />
                                                        {zone.boardConfig?.name || 'Sin tablero'}
                                                      </Badge>
                                                      <Badge className="text-[9px] px-1 py-0 bg-gray-100 text-gray-600 border-0">
                                                        <Users className="h-2.5 w-2.5 mr-0.5 inline" />
                                                        {zoneMembers.length} {zoneMembers.length === 1 ? 'miembro' : 'miembros'}
                                                      </Badge>
                                                      <Button
                                                        variant="ghost" size="sm"
                                                        className="h-7 w-7 p-0 text-blue-500 hover:text-blue-700"
                                                        onClick={() => { setEditingZoneId(zone.id); setEditingZoneName(zone.name) }}
                                                        title="Renombrar zona"
                                                      >
                                                        <Edit3 className="h-3.5 w-3.5" />
                                                      </Button>
                                                      <Button
                                                        variant="ghost" size="sm"
                                                        className="h-7 w-7 p-0 text-red-400 hover:text-red-600"
                                                        onClick={() => handleDeleteZone(zone.id, zone.name)}
                                                        title="Eliminar zona"
                                                      >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                      </Button>
                                                    </>
                                                  )}
                                                </div>

                                                {/* ─────────── LAS PLANTILLAS SE GESTIONAN DESDE EL PROYECTO ─────────── */}
                                                {/* Nota: Las plantillas del Sistema las crea el GESTOR.
                                                     Se visualizan en cada Proyecto (solo lectura para admin).
                                                     v3.0.32: Movido a Proyectos para simplificar flujo. */}

                                                {/* Miembros de esta zona — tabla editable */}
                                                <div className="p-3">
                                                  {zoneMembers.length === 0 ? (
                                                    <p className="text-xs text-muted-foreground text-center py-3">
                                                      No hay miembros en esta zona todavía.
                                                    </p>
                                                  ) : (
                                                    <div className="rounded-md border overflow-x-auto mb-3">
                                                      <Table>
                                                        <TableHeader>
                                                          <TableRow>
                                                            <TableHead className="text-xs">Nombre</TableHead>
                                                            <TableHead className="text-xs">Email</TableHead>
                                                            <TableHead className="text-xs">Rol</TableHead>
                                                            <TableHead className="text-xs text-center">Acciones</TableHead>
                                                          </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                          {zoneMembers.map(member => (
                                                            <TableRow key={member.id}>
                                                              <TableCell className="text-xs font-medium">{member.user.name}</TableCell>
                                                              <TableCell className="text-xs">{member.user.email}</TableCell>
                                                              <TableCell>
                                                                <Select
                                                                  value={member.role}
                                                                  onValueChange={(newRole) => handleUpdateMemberRoleInZone(zone.id, member.id, newRole)}
                                                                >
                                                                  <SelectTrigger className="h-7 text-[10px] w-[120px]">
                                                                    <SelectValue />
                                                                  </SelectTrigger>
                                                                  <SelectContent>
                                                                    <SelectItem value="admin">Administrador</SelectItem>
                                                                    <SelectItem value="gerente">Gerente</SelectItem>
                                                                    <SelectItem value="responsable">Responsable</SelectItem>
                                                                    <SelectItem value="empleado">Empleado</SelectItem>
                                                                    <SelectItem value="auditor">Auditor</SelectItem>
                                                                  </SelectContent>
                                                                </Select>
                                                              </TableCell>
                                                              <TableCell className="text-center">
                                                                <Button
                                                                  variant="outline" size="sm"
                                                                  className="h-7 text-[10px] text-red-500 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 gap-1"
                                                                  onClick={() => handleRemoveMemberFromZone(zone.id, member.id, member.user.name)}
                                                                  title="Retirar de esta zona (sigue en el proyecto)"
                                                                >
                                                                  <Trash2 className="h-3 w-3" />
                                                                </Button>
                                                              </TableCell>
                                                            </TableRow>
                                                          ))}
                                                        </TableBody>
                                                      </Table>
                                                    </div>
                                                  )}

                                                  {/* Añadir usuario existente a esta zona */}
                                                  <div className="rounded-md border border-dashed border-purple-200 bg-purple-50/40 p-2 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                      <span className="text-[11px] font-semibold text-purple-700 flex items-center gap-1">
                                                        <UserPlus className="h-3 w-3" />
                                                        Adjudicar usuario a esta zona
                                                      </span>
                                                      {currentProjectCompany && (
                                                        <span className="text-[10px] text-muted-foreground">
                                                          Empresa: <strong>{currentProjectCompany}</strong> · {availableUsers.length} disponible(s)
                                                        </span>
                                                      )}
                                                    </div>
                                                    {(() => {
                                                      if (isLoadingUsers) {
                                                        return (
                                                          <p className="text-[11px] text-muted-foreground text-center py-1">
                                                            <Loader2 className="h-3 w-3 inline animate-spin mr-1" />
                                                            Cargando usuarios...
                                                          </p>
                                                        )
                                                      }
                                                      if (availableUsers.length === 0) {
                                                        return (
                                                          <div className="space-y-1.5">
                                                            <p className="text-[11px] text-muted-foreground text-center py-1">
                                                              No hay usuarios de <strong>{currentProjectCompany || 'esta empresa'}</strong> disponibles
                                                              para adjudicar a esta zona (todos los activos ya están adjudicados, o no hay ninguno dado de alta).
                                                            </p>
                                                            <p className="text-[10px] text-center text-muted-foreground">
                                                              Crea nuevos usuarios en <strong>Datos Empresa → Usuarios</strong> y volverán a aparecer aquí.
                                                            </p>
                                                          </div>
                                                        )
                                                      }
                                                      const q = (zoneSearch[zone.id] || '').trim().toLowerCase()
                                                      const filtered = q
                                                        ? availableUsers.filter(u =>
                                                            u.name.toLowerCase().includes(q) ||
                                                            u.email.toLowerCase().includes(q)
                                                          )
                                                        : availableUsers
                                                      const selectedUser = zoneAddUserId[zone.id]
                                                        ? availableUsers.find(u => u.id === zoneAddUserId[zone.id])
                                                        : null
                                                      return (
                                                        <div className="space-y-2">
                                                          {/* Usuario seleccionado (preview) */}
                                                          {selectedUser && (
                                                            <div className="flex items-center gap-2 p-2 rounded-md bg-purple-100 border border-purple-300">
                                                              <UserCircle className="h-4 w-4 text-purple-600 shrink-0" />
                                                              <div className="flex-1 min-w-0">
                                                                <div className="text-xs font-semibold truncate">{selectedUser.name}</div>
                                                                <div className="text-[10px] text-muted-foreground truncate">{selectedUser.email}</div>
                                                              </div>
                                                              <Badge className={`${ROLE_COLORS[selectedUser.role] || ''} border text-[9px] py-0`}>
                                                                {ROLE_LABELS[selectedUser.role] || selectedUser.role}
                                                              </Badge>
                                                              <button
                                                                type="button"
                                                                onClick={() => setZoneAddUserId(prev => { const n = { ...prev }; delete n[zone.id]; return n })}
                                                                className="text-gray-400 hover:text-red-500 shrink-0"
                                                                title="Quitar selección"
                                                              >
                                                                <X className="h-3.5 w-3.5" />
                                                              </button>
                                                            </div>
                                                          )}

                                                          {/* Buscador + toggle lista */}
                                                          <div className="flex items-center gap-2">
                                                            <Input
                                                              placeholder="Buscar por nombre o email..."
                                                              value={zoneSearch[zone.id] || ''}
                                                              onChange={e => {
                                                                setZoneSearch(prev => ({ ...prev, [zone.id]: e.target.value }))
                                                                setZoneShowList(prev => ({ ...prev, [zone.id]: true }))
                                                              }}
                                                              onFocus={() => setZoneShowList(prev => ({ ...prev, [zone.id]: true }))}
                                                              className="h-7 text-xs flex-1"
                                                            />
                                                            <button
                                                              type="button"
                                                              onClick={() => setZoneShowList(prev => ({ ...prev, [zone.id]: !prev[zone.id] }))}
                                                              className="text-[10px] text-purple-700 hover:text-purple-900 px-2 h-7 rounded border border-purple-200 bg-white"
                                                              title={zoneShowList[zone.id] ? 'Ocultar lista' : 'Ver lista'}
                                                            >
                                                              {zoneShowList[zone.id] ? '▲ Ocultar' : '▼ Ver'} ({availableUsers.length})
                                                            </button>
                                                          </div>

                                                          {/* Lista de usuarios clickeables */}
                                                          {zoneShowList[zone.id] && (
                                                            <div className="border rounded-md bg-white max-h-[200px] overflow-y-auto">
                                                              {filtered.length === 0 ? (
                                                                <p className="text-[11px] text-muted-foreground text-center py-2">
                                                                  No hay coincidencias para &quot;{q}&quot;
                                                                </p>
                                                              ) : (
                                                                filtered.slice(0, 50).map(u => (
                                                                  <button
                                                                    key={u.id}
                                                                    type="button"
                                                                    onClick={() => {
                                                                      setZoneAddUserId(prev => ({ ...prev, [zone.id]: u.id }))
                                                                      setZoneShowList(prev => ({ ...prev, [zone.id]: false }))
                                                                      setZoneSearch(prev => ({ ...prev, [zone.id]: '' }))
                                                                    }}
                                                                    className={`w-full text-left px-2 py-1.5 flex items-center gap-2 border-b last:border-b-0 hover:bg-purple-50 transition-colors ${
                                                                      zoneAddUserId[zone.id] === u.id ? 'bg-purple-100' : ''
                                                                    }`}
                                                                  >
                                                                    <UserCircle className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                                                    <div className="flex-1 min-w-0">
                                                                      <div className="text-xs font-medium truncate">{u.name}</div>
                                                                      <div className="text-[10px] text-muted-foreground truncate">{u.email}</div>
                                                                    </div>
                                                                    <Badge className={`${ROLE_COLORS[u.role] || ''} border text-[9px] py-0 shrink-0`}>
                                                                      {ROLE_LABELS[u.role] || u.role}
                                                                    </Badge>
                                                                    {u.projects.length === 0 && (
                                                                      <Badge className="bg-amber-100 text-amber-700 border border-amber-200 text-[9px] py-0 shrink-0">
                                                                        Sin proyecto
                                                                      </Badge>
                                                                    )}
                                                                  </button>
                                                                ))
                                                              )}
                                                              {filtered.length > 50 && (
                                                                <p className="text-[10px] text-muted-foreground text-center py-1.5 border-t bg-gray-50">
                                                                  Mostrando 50 de {filtered.length}. Afina la búsqueda para ver más.
                                                                </p>
                                                              )}
                                                            </div>
                                                          )}

                                                          {/* Rol + Añadir (solo cuando hay selección) */}
                                                          {selectedUser && (
                                                            <div className="flex items-center gap-2 flex-wrap">
                                                              <Select
                                                                value={zoneAddRole[zone.id] || 'empleado'}
                                                                onValueChange={(val) => setZoneAddRole(prev => ({ ...prev, [zone.id]: val }))}
                                                              >
                                                                <SelectTrigger className="h-7 text-xs w-[140px]">
                                                                  <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent position="popper">
                                                                  <SelectItem value="admin">Administrador</SelectItem>
                                                                  <SelectItem value="gerente">Gerente</SelectItem>
                                                                  <SelectItem value="responsable">Responsable</SelectItem>
                                                                  <SelectItem value="empleado">Empleado</SelectItem>
                                                                  <SelectItem value="auditor">Auditor</SelectItem>
                                                                </SelectContent>
                                                              </Select>
                                                              <Button
                                                                size="sm"
                                                                className="h-7 text-xs bg-purple-600 text-white"
                                                                onClick={() => handleAddExistingUserToZone(zone.id)}
                                                              >
                                                                <UserPlus className="h-3 w-3 mr-1" />
                                                                Añadir a esta zona
                                                              </Button>
                                                            </div>
                                                          )}
                                                        </div>
                                                      )
                                                    })()}
                                                  </div>
                                                  <p className="text-[10px] text-muted-foreground mt-1.5">
                                                    Lista de usuarios activos de <strong>{currentProjectCompany || 'la empresa del proyecto'}</strong> que aún no están en esta zona.
                                                    Para crear nuevos usuarios, ve a <strong>Datos Empresa → Usuarios</strong>.
                                                  </p>
                                                </div>
                                              </div>
                                            )
                                          })}
                                        </div>
                                      )}
                                    </div>

                                    {/* Crear nueva zona — separado del listado */}
                                    <div className="rounded-lg border border-dashed border-purple-200 bg-purple-50/40 p-3">
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-xs font-semibold text-purple-700 uppercase flex items-center gap-1">
                                          <Plus className="h-3 w-3" /> Crear Nueva Zona
                                        </h4>
                                        {/* v2.107 — Wizard para generar zonas automáticamente */}
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="h-7 text-[10px] border-purple-300 text-purple-700 hover:bg-purple-100"
                                          onClick={() => {
                                            setZoneWizardProjectId(project.id)
                                            setZoneWizardOpen(true)
                                          }}
                                        >
                                          <Wand2 className="h-3 w-3 mr-1" />
                                          Generar zonas con algoritmo
                                        </Button>
                                      </div>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <div className="flex items-center gap-1">
                                          <span className="text-[10px] text-muted-foreground mr-1">Color:</span>
                                          {PRESET_COLORS.map(c => (
                                            <button key={c} type="button" className={`w-5 h-5 rounded-full border-2 ${newZoneColor === c ? 'border-gray-800' : 'border-transparent'}`} style={{ backgroundColor: c }} onClick={() => setNewZoneColor(c)} />
                                          ))}
                                        </div>
                                        <Input placeholder="Nombre de la nueva zona" value={newZoneName} onChange={e => setNewZoneName(e.target.value)} className="h-8 text-xs flex-1 min-w-[180px] max-w-[260px]" />
                                        <Button size="sm" onClick={handleAddZone} disabled={!newZoneName.trim()} className="h-8 text-xs bg-purple-600 text-white">
                                          <Plus className="h-3 w-3 mr-1" /> Agregar zona
                                        </Button>
                                      </div>
                                      <p className="text-[10px] text-muted-foreground mt-2">
                                        Usa <strong>Generar zonas</strong> si quieres que la app calcule el nº óptimo de zonas a partir del número de empleados, m², tipo de espacio y criticidad. Se crea también la <strong>jaula física</strong> automáticamente.
                                      </p>
                                    </div>

                                    {/* Las plantillas se gestionan ahora por zona (v2.31):
                                        dentro de cada zona, ANTES de los miembros.
                                        El gestor las edita globalmente desde su panel. */}
                                  </>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              </div>
              
              {/* ─────────── CAJA 2: ABRIR NUEVO PROYECTO ─────────── */}
              <div id="crear-nuevo-proyecto" className="rounded-lg border border-purple-200 bg-purple-50/30 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-purple-500/15 flex items-center justify-center">
                      <Plus className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Abrir Nuevo Proyecto</h3>
                      <p className="text-[11px] text-muted-foreground">
                        Da de alta un proyecto nuevo con sus zonas y usuarios (existentes o nuevos).
                      </p>
                    </div>
                  </div>
                  {showNewProject && (
                    <Button variant="ghost" size="sm" onClick={() => setShowNewProject(false)} className="h-7 text-xs">
                      <X className="h-3.5 w-3.5 mr-1" /> Cerrar formulario
                    </Button>
                  )}
                </div>
              
                {!showNewProject && allProjects.length > 0 ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowNewProject(true)}
                    className="w-full border-dashed border-purple-300 text-purple-700 hover:bg-purple-100 bg-white/60"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Abrir formulario de creación
                  </Button>
                ) : (
                  <Card className="border-purple-200 bg-white/70">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Plus className="h-4 w-4 text-purple-500" />
                        Crear Nuevo Proyecto
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* v2.108.4 — Formulario simplificado: Empresa → Proyecto → Descripción.
                          Las zonas las calcula el wizard según la config del gestor.
                          Los usuarios se asignan después, desde la lista de zonas del proyecto. */}
                      <div className="rounded-md border border-violet-200 bg-violet-50/40 px-3 py-2 text-[11px] text-violet-800">
                        <strong>Flujo:</strong> 1) Datos de empresa → 2) Nombre del proyecto → 3) Al crear se abre el wizard que pregunta zonas (m² + empleados) → 4) La app calcula el nº de zonas con el algoritmo del gestor → 5) Asignas usuarios a las zonas resultantes.
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Empresa *</Label>
                        {companies.length > 0 && !isNewCompanyCustom ? (
                          <div className="space-y-1">
                            <Select
                              value={newProjectCompany ? (companies.find(c => c.name === newProjectCompany)?.id || '') : undefined}
                              onValueChange={val => {
                                if (val === '__custom__') {
                                  setNewProjectCompany('')
                                  setIsNewCompanyCustom(true)
                                } else {
                                  const comp = companies.find(c => c.id === val)
                                  if (comp) setNewProjectCompany(comp.name)
                                }
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar empresa" />
                              </SelectTrigger>
                              <SelectContent>
                                {companies.map(c => (
                                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                ))}
                                <SelectItem value="__custom__">+ Otra empresa...</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <Input placeholder="Nombre de la nueva empresa" value={newProjectCompany} onChange={e => setNewProjectCompany(e.target.value)} />
                            {companies.length > 0 && (
                              <Button variant="ghost" size="sm" onClick={() => { setIsNewCompanyCustom(false); setNewProjectCompany('') }} className="h-6 text-xs text-purple-600 p-0">
                                ← Seleccionar empresa existente
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Nombre del Proyecto *</Label>
                        <Input placeholder="Nombre" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && newProjectName.trim() && newProjectCompany.trim()) { e.preventDefault(); handleCreateProjectAndWizard() } }} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Descripción</Label>
                        <Input placeholder="Descripción del proyecto (opcional)" value={newProjectDesc} onChange={e => setNewProjectDesc(e.target.value)} />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm" onClick={() => setShowNewProject(false)}>Cancelar</Button>
                        <Button
                          size="sm"
                          onClick={handleCreateProjectAndWizard}
                          disabled={!newProjectName.trim() || !newProjectCompany.trim()}
                          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                          title="Crea el proyecto y abre el wizard para calcular las zonas según la configuración del gestor"
                        >
                          <Wand2 className="h-3 w-3 mr-1" />
                          Crear proyecto
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
          )}

          {/* ═══ DATOS EMPRESA TAB ═══ */}
          {activeTab === 'companies' && (
            <motion.div key="companies" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Datos fiscales y de facturación de tu empresa
                </p>
                <div className="flex gap-2">
                  {/* v3.0.32-fix6: Botón temporal para corregir usuarios sin proyecto */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFixUsersWithoutProject}
                    className="text-orange-600 border-orange-300 hover:bg-orange-50"
                    title="Asigna todos los usuarios sin proyecto (corrige bug Luis)"
                  >
                    <UserCheck className="h-4 w-4 mr-1" />
                    Fix Usuarios
                  </Button>
                  {myCompany && (
                    <Button
                      variant={isEditingMyCompany ? 'outline' : 'default'}
                      size="sm"
                      onClick={() => setIsEditingMyCompany(!isEditingMyCompany)}
                      className={isEditingMyCompany ? '' : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'}
                    >
                      {isEditingMyCompany ? (
                        <><X className="h-4 w-4 mr-1" /> Cancelar edición</>
                      ) : (
                        <><Edit3 className="h-4 w-4 mr-1" /> Editar datos</>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {isLoadingMyCompany ? (
                <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-purple-500 animate-spin" /></div>
              ) : !myCompany ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Building2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No tienes empresa asignada</p>
                  <p className="text-xs mt-1">Contacta con el gestor de la plataforma para darte de alta en una empresa.</p>
                </div>
              ) : (
                <>
                  {/* ───── DATOS FISCALES DE LA EMPRESA ───── */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-purple-500" />
                        Datos Fiscales de la Empresa
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Nombre / Razón Social" k="name" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.name} />
                      <Field label="NIF / CIF" k="nif" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.nif} />
                      <Field label="Sector / Industria" k="sector" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.sector} />
                      <Field label="Teléfono" k="phone" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.phone} />
                      <Field label="Dirección" k="address" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.address} />
                      <Field label="Sitio Web" k="website" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.website} />
                      <Field label="Código Postal" k="postalCode" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.postalCode} />
                      <Field label="Ciudad" k="city" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.city} />
                      <Field label="Provincia" k="province" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.province} />
                      <Field label="País" k="country" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.country} />
                    </CardContent>
                  </Card>

                  {/* ───── DATOS DE FACTURACIÓN ───── */}
                  <Card className="border-amber-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <FileText className="h-4 w-4 text-amber-500" />
                        Datos de Facturación
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Razón Social (facturación)" k="billingName" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.billingName} />
                      <Field label="NIF de Facturación" k="billingNif" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.billingNif} />
                      <Field label="Email de Facturación" k="billingEmail" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.billingEmail} />
                      <Field label="IBAN (domiciliación)" k="iban" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.iban} />
                      <Field label="Dirección de Facturación" k="billingAddress" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.billingAddress} />
                      <Field label="Ciudad de Facturación" k="billingCity" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.billingCity} />
                      <Field label="CP de Facturación" k="billingPostalCode" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.billingPostalCode} />
                    </CardContent>
                  </Card>

                  {/* ───── PERSONA DE CONTACTO ───── */}
                  <Card className="border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <UserCircle className="h-4 w-4 text-blue-500" />
                        Persona de Contacto
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Field label="Nombre de contacto" k="contactName" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.contactName} />
                      <Field label="Email de contacto" k="contactEmail" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.contactEmail} />
                      <Field label="Teléfono de contacto" k="contactPhone" edit={myCompanyEdit} setEdit={setMyCompanyEdit} editing={isEditingMyCompany} value={myCompany.contactPhone} />
                    </CardContent>
                  </Card>

                  {/* ───── ACCIONES DE EDICIÓN ───── */}
                  {isEditingMyCompany && (
                    <div className="flex justify-end gap-2 sticky bottom-2 z-10 bg-white border rounded-lg p-2 shadow-md">
                      <Button variant="outline" size="sm" onClick={() => {
                        setIsEditingMyCompany(false)
                        // Revertir cambios: recargar del estado original
                        const edit: Record<string, string> = {}
                        for (const [k, v] of Object.entries(myCompany)) {
                          if (typeof v === 'string' || v === null) edit[k] = (v as string) ?? ''
                        }
                        setMyCompanyEdit(edit)
                      }}>
                        Cancelar
                      </Button>
                      <Button size="sm" onClick={handleSaveMyCompany} disabled={isSavingMyCompany} className="bg-purple-600 text-white">
                        {isSavingMyCompany ? (
                          <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Guardando…</>
                        ) : (
                          <><Save className="h-4 w-4 mr-1" /> Guardar cambios</>
                        )}
                      </Button>
                    </div>
                  )}

                  {/* ───── USUARIOS DE LA EMPRESA ───── */}
                  <Card className="border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        Usuarios de la Empresa
                      </CardTitle>
                      <p className="text-[11px] text-muted-foreground">
                        Listado maestro de usuarios de <strong>{myCompany.name}</strong>. Crea, edita o desactiva aquí;
                        luego los adjudicas a proyectos/zonas. La tarifa se calcula en función de los usuarios activos.
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {(() => {
                        const companyUsers = users.filter(u =>
                          u.companies?.some(c => c.id === myCompany.id)
                        )
                        const activeCount = companyUsers.filter(u => u.active).length
                        return (
                          <>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                {companyUsers.length} usuario(s) en total · {activeCount} activo(s) · {companyUsers.length - activeCount} inactivo(s)
                              </span>
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-purple-600 text-white"
                                onClick={() => setShowAddCompanyUser(v => !v)}
                              >
                                <UserPlus className="h-3 w-3 mr-1" />
                                {showAddCompanyUser ? 'Cancelar alta' : 'Crear nuevo usuario'}
                              </Button>
                            </div>

                            {/* Formulario de alta */}
                            {showAddCompanyUser && (
                              <div className="rounded-md border border-purple-200 bg-purple-50/40 p-3 space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                  <Input placeholder="Nombre completo *" value={newCompanyUserName} onChange={e => setNewCompanyUserName(e.target.value)} className="h-8 text-xs" />
                                  <Input type="email" placeholder="Email *" value={newCompanyUserEmail} onChange={e => setNewCompanyUserEmail(e.target.value)} className="h-8 text-xs" />
                                </div>
                                <div className="grid grid-cols-[1fr_140px] gap-2">
                                  <Input type="password" placeholder="Contraseña * (mín. 6 car.)" value={newCompanyUserPassword} onChange={e => setNewCompanyUserPassword(e.target.value)} className="h-8 text-xs" />
                                  <Select value={newCompanyUserRole} onValueChange={setNewCompanyUserRole}>
                                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="admin">Administrador</SelectItem>
                                      <SelectItem value="gerente">Gerente</SelectItem>
                                      <SelectItem value="responsable">Responsable</SelectItem>
                                      <SelectItem value="empleado">Empleado</SelectItem>
                                      <SelectItem value="auditor">Auditor</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button
                                  size="sm"
                                  className="w-full h-8 text-xs bg-purple-600 text-white"
                                  onClick={handleCreateCompanyUser}
                                  disabled={!newCompanyUserName.trim() || !newCompanyUserEmail.trim() || newCompanyUserPassword.length < 6}
                                >
                                  <UserPlus className="h-3 w-3 mr-1" />
                                  Crear usuario en {myCompany.name}
                                </Button>
                              </div>
                            )}

                            {/* Tabla de usuarios */}
                            {companyUsers.length === 0 ? (
                              <p className="text-xs text-muted-foreground text-center py-4">
                                No hay usuarios en esta empresa todavía. Crea el primero con el botón de arriba.
                              </p>
                            ) : (
                              <div className="rounded-md border overflow-x-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="text-xs">Nombre</TableHead>
                                      <TableHead className="text-xs">Email</TableHead>
                                      <TableHead className="text-xs">Rol</TableHead>
                                      <TableHead className="text-xs text-center">Estado</TableHead>
                                      <TableHead className="text-xs text-center">Acciones</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {companyUsers.map(u => (
                                      <TableRow key={u.id} className={!u.active ? 'opacity-50' : ''}>
                                        <TableCell className="text-xs font-medium">{u.name}</TableCell>
                                        <TableCell className="text-xs">{u.email}</TableCell>
                                        <TableCell>
                                          <Badge className={`${ROLE_COLORS[u.role] || 'bg-gray-100 text-gray-700 border-0'} border-0 text-[9px]`}>
                                            {ROLE_LABELS[u.role] || u.role}
                                          </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                          <Badge className={u.active ? 'bg-green-100 text-green-700 border-0 text-[9px]' : 'bg-red-100 text-red-700 border-0 text-[9px]'}>
                                            {u.active ? 'Activo' : 'Inactivo'}
                                          </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                          <div className="flex items-center justify-center gap-1">
                                            <Button
                                              variant="outline" size="sm"
                                              className="h-7 text-[10px]"
                                              onClick={() => handleToggleUserActive(u.id, u.active, u.name)}
                                              title={u.active ? 'Desactivar' : 'Activar'}
                                            >
                                              {u.active ? 'Desactivar' : 'Activar'}
                                            </Button>
                                            <Button
                                              variant="outline" size="sm"
                                              className="h-7 text-[10px] text-amber-600 border-amber-200 hover:bg-amber-50"
                                              onClick={() => handleResetUserPassword(u.id, u.email)}
                                              title="Resetear contraseña"
                                            >
                                              Reset pass
                                            </Button>
                                            <Button
                                              variant="outline" size="sm"
                                              className="h-7 w-7 p-0 text-red-500 border-red-200 hover:bg-red-50"
                                              onClick={() => handleDeleteCompanyUser(u.id, u.name, u.email)}
                                              title="Eliminar usuario"
                                            >
                                              <Trash2 className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            )}
                          </>
                        )
                      })()}
                    </CardContent>
                  </Card>
                </>
              )}
            </motion.div>
          )}

          {/* ═══ 5S Y PASOS TAB ═══ */}
          {/* 5S y Pasos tab removed - scores now shown on the board above steps 4/5 dots */}
          {false && (
            <motion.div key="5s-steps" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Gestiona las puntuaciones de Autoevaluación (Paso 4) y Auditoría (Paso 5) de cada S
                  </p>
                </div>
              </div>

              {/* Project & Zone selectors */}
              <div className="flex gap-3 items-end">
                <div className="space-y-1 flex-1">
                  <Label className="text-xs">Proyecto</Label>
                  <Select
                    value={selected5SProjectId || ''}
                    onValueChange={val => {
                      setSelected5SProjectId(val || null)
                      setSelected5SZoneId(null)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar proyecto" />
                    </SelectTrigger>
                    <SelectContent>
                      {allProjects.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1 flex-1">
                  <Label className="text-xs">Zona (opcional)</Label>
                  <Select
                    value={selected5SZoneId || '__all__'}
                    onValueChange={val => setSelected5SZoneId(val === '__all__' ? null : val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las zonas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">Todas las zonas</SelectItem>
                      {allProjects.find(p => p.id === selected5SProjectId)?.zones.map(z => (
                        <SelectItem key={z.id} value={z.id}>{z.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {!selected5SProjectId ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Selecciona un proyecto para ver las puntuaciones</p>
                </div>
              ) : isLoading5S ? (
                <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-purple-500 animate-spin" /></div>
              ) : (
                <div className="space-y-4">
                  {/* S Steps table */}
                  {['S1 Seiri', 'S2 Seiton', 'S3 Seiso', 'S4 Seiketsu', 'S5 Shitsuke'].map((sLabel, sIdx) => {
                    const sStep = sIdx + 1
                    const sColors = ['#8B5CF6', '#EAB308', '#3B82F6', '#F43F5E', '#F97316']
                    const color = sColors[sIdx]

                    // Filter progress for this S and selected zone
                    const sProgress = progress5S.filter(p =>
                      p.sStep === sStep &&
                      (!selected5SZoneId || p.zoneId === selected5SZoneId)
                    )

                    const step4Records = sProgress.filter(p => p.miniStep === 4)
                    const step5Records = sProgress.filter(p => p.miniStep === 5)

                    return (
                      <Card key={sStep} className="overflow-hidden">
                        <div
                          className="flex items-center gap-3 px-4 py-3"
                          style={{ backgroundColor: `${color}10`, borderLeft: `4px solid ${color}` }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                            style={{ backgroundColor: color }}
                          >
                            S{sStep}
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm" style={{ color }}>{sLabel}</h3>
                            <p className="text-xs text-muted-foreground">
                              {step4Records.length} autoevaluación(es) · {step5Records.length} auditoría(s)
                            </p>
                          </div>
                        </div>
                        <CardContent className="p-0">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="text-xs">Zona</TableHead>
                                <TableHead className="text-xs">Paso</TableHead>
                                <TableHead className="text-xs">Estado</TableHead>
                                <TableHead className="text-xs">Puntuación</TableHead>
                                <TableHead className="text-xs">Notas</TableHead>
                                <TableHead className="text-xs w-20">Acciones</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {/* Step 4 rows */}
                              {step4Records.length === 0 && step5Records.length === 0 && (
                                <TableRow>
                                  <TableCell colSpan={6} className="text-center text-xs text-muted-foreground py-4">
                                    Sin registros para esta S
                                  </TableCell>
                                </TableRow>
                              )}
                              {step4Records.map(record => (
                                <TableRow key={record.id}>
                                  <TableCell className="text-xs">{record.zoneName || 'Sin zona'}</TableCell>
                                  <TableCell className="text-xs">
                                    <div className="flex items-center gap-1">
                                      <CheckSquare className="h-3 w-3" style={{ color }} />
                                      <span>4 - Autoevaluación</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge className={record.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                      {record.completed ? 'Completado' : 'Pendiente'}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    {editingScore === record.id ? (
                                      <div className="flex items-center gap-1">
                                        <Input
                                          type="number"
                                          min={0}
                                          max={100}
                                          value={editScoreValue}
                                          onChange={e => setEditScoreValue(e.target.value)}
                                          className="w-16 h-7 text-xs"
                                        />
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-7 w-7 p-0 text-green-600"
                                          onClick={async () => {
                                            const newScore = parseInt(editScoreValue)
                                            if (isNaN(newScore) || newScore < 0 || newScore > 100) return
                                            try {
                                              const res = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=4`, {
                                                method: 'PUT',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                  score: newScore,
                                                  completed: newScore >= 70,
                                                  notes: editNotesValue,
                                                  projectId: selected5SProjectId,
                                                  zoneId: record.zoneId,
                                                }),
                                              })
                                              if (res.ok) {
                                                setEditingScore(null)
                                                await load5SProgress()
                                              }
                                            } catch (error) {
                                              console.error('Error updating score:', error)
                                            }
                                          }}
                                        >
                                          <Save className="h-3 w-3" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-7 w-7 p-0 text-red-400"
                                          onClick={() => setEditingScore(null)}
                                        >
                                          <X className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    ) : (
                                      <span className="font-bold text-sm">
                                        {record.score !== null ? `${record.score}%` : '—'}
                                      </span>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-xs text-muted-foreground">
                                    {editingScore === record.id ? (
                                      <Input
                                        value={editNotesValue}
                                        onChange={e => setEditNotesValue(e.target.value)}
                                        placeholder="Notas..."
                                        className="h-7 text-xs w-32"
                                      />
                                    ) : (
                                      <span title={record.notes || ''}>
                                        {record.notes ? (record.notes.length > 30 ? record.notes.slice(0, 30) + '…' : record.notes) : '—'}
                                      </span>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0"
                                      onClick={() => {
                                        setEditingScore(record.id)
                                        setEditScoreValue(record.score !== null ? String(record.score) : '')
                                        setEditNotesValue(record.notes || '')
                                      }}
                                    >
                                      <Edit3 className="h-3 w-3 text-blue-500" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                              {/* Step 5 rows */}
                              {step5Records.map(record => (
                                <TableRow key={record.id}>
                                  <TableCell className="text-xs">{record.zoneName || 'Sin zona'}</TableCell>
                                  <TableCell className="text-xs">
                                    <div className="flex items-center gap-1">
                                      <ShieldCheck className="h-3 w-3" style={{ color }} />
                                      <span>5 - Auditoría</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge className={record.completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                      {record.completed ? 'Apto' : 'No Apto'}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    {editingScore === record.id ? (
                                      <div className="flex items-center gap-1">
                                        <Input
                                          type="number"
                                          min={0}
                                          max={100}
                                          value={editScoreValue}
                                          onChange={e => setEditScoreValue(e.target.value)}
                                          className="w-16 h-7 text-xs"
                                        />
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-7 w-7 p-0 text-green-600"
                                          onClick={async () => {
                                            const newScore = parseInt(editScoreValue)
                                            if (isNaN(newScore) || newScore < 0 || newScore > 100) return
                                            try {
                                              const res = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=5`, {
                                                method: 'PUT',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                  score: newScore,
                                                  completed: newScore >= 75,
                                                  notes: editNotesValue,
                                                  projectId: selected5SProjectId,
                                                  zoneId: record.zoneId,
                                                }),
                                              })
                                              if (res.ok) {
                                                setEditingScore(null)
                                                await load5SProgress()
                                              }
                                            } catch (error) {
                                              console.error('Error updating score:', error)
                                            }
                                          }}
                                        >
                                          <Save className="h-3 w-3" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-7 w-7 p-0 text-red-400"
                                          onClick={() => setEditingScore(null)}
                                        >
                                          <X className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    ) : (
                                      <span className="font-bold text-sm">
                                        {record.score !== null ? `${record.score}%` : '—'}
                                      </span>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-xs text-muted-foreground">
                                    {editingScore === record.id ? (
                                      <Input
                                        value={editNotesValue}
                                        onChange={e => setEditNotesValue(e.target.value)}
                                        placeholder="Notas..."
                                        className="h-7 text-xs w-32"
                                      />
                                    ) : (
                                      <span title={record.notes || ''}>
                                        {record.notes ? (record.notes.length > 30 ? record.notes.slice(0, 30) + '…' : record.notes) : '—'}
                                      </span>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0"
                                      onClick={() => {
                                        setEditingScore(record.id)
                                        setEditScoreValue(record.score !== null ? String(record.score) : '')
                                        setEditNotesValue(record.notes || '')
                                      }}
                                    >
                                      <Edit3 className="h-3 w-3 text-blue-500" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Delete Company Dialog */}
      <Dialog open={deleteCompanyDialog.open} onOpenChange={(open) => { if (!open) setDeleteCompanyDialog(d => ({ ...d, open: false })) }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Eliminar Empresa
            </DialogTitle>
            <DialogDescription>
              Elige cómo quieres eliminar esta empresa
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              ¿Qué deseas hacer con <strong>{deleteCompanyDialog.companyName}</strong>?
            </p>
            {deleteCompanyDialog.projectCount > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800">
                  Esta empresa tiene <strong>{deleteCompanyDialog.projectCount} proyecto(s)</strong> asociado(s) con todos sus datos (zonas, auditorías, inventarios, etc.).
                </p>
              </div>
            )}
            <div className="space-y-2">
              {deleteCompanyDialog.projectCount > 0 && (
                <Button
                  variant="outline"
                  className="w-full justify-start text-amber-700 border-amber-300 hover:bg-amber-50"
                  onClick={() => confirmDeleteCompany(false)}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Solo desactivar (conserva los proyectos)
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full justify-start text-red-700 border-red-300 hover:bg-red-50"
                onClick={() => confirmDeleteCompany(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {deleteCompanyDialog.projectCount > 0
                  ? `Eliminar todo (empresa + ${deleteCompanyDialog.projectCount} proyecto(s))`
                  : 'Eliminar empresa permanentemente'}
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setDeleteCompanyDialog(d => ({ ...d, open: false }))}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={resetPasswordUserId !== null} onOpenChange={(open) => { if (!open) { setResetPasswordUserId(null); setNewPassword('') } }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-amber-500" />
              Cambiar Contraseña
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Nueva contraseña</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </Button>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => { setResetPasswordUserId(null); setNewPassword('') }}>Cancelar</Button>
              <Button size="sm" onClick={() => resetPasswordUserId && handleResetPassword(resetPasswordUserId)} disabled={!newPassword || newPassword.length < 6} className="bg-purple-600 text-white">
                Guardar Contraseña
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t bg-white mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-3 text-center">
          <p className="text-xs text-muted-foreground">
            Panel de Admin de Empresa — Metodología 5S
          </p>
        </div>
      </footer>

      {/* v2.107 — Wizard Generar Zonas */}
      <AnimatePresence>
        {zoneWizardOpen && zoneWizardProjectId && (
          <ZoneGeneratorWizard
            projectId={zoneWizardProjectId}
            onClose={() => {
              setZoneWizardOpen(false)
              setZoneWizardProjectId(null)
            }}
            onGenerated={async () => {
              // Recargar zonas del proyecto + lista global de proyectos
              if (selectedProjectId) await loadProjectDetail(selectedProjectId)
              await loadProjects()
              await fetchProjects()
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
