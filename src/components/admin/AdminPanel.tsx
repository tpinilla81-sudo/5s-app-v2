'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { use5SStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  ArrowLeft,
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
  BookOpen,
  LayoutGrid,
  Sparkles,
  FileText,
} from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { S_STEPS } from '@/lib/5s-constants'
import TemplateManager from './TemplateManager'


// ─── Types ───────────────────────────────────────────────────────────────────

interface UserData {
  id: string
  email: string
  name: string
  role: string
  active: boolean
  plainPassword?: string | null
  createdAt: string
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
  boardConfig?: { id: string; name: string } | null
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
}

export default function AdminPanel({ embedded }: AdminPanelProps = {}) {
  const { setCurrentView, fetchProjects, fetchCompanies, projects, setCurrentProject, currentProject } = use5SStore()
  const [activeTab, setActiveTab] = useState<'companies' | 'projects' | 'plantillas' | 'mejoraContinua'>('companies')

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

  // Project detail (zones + members)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [projectZones, setProjectZones] = useState<ZoneData[]>([])
  const [projectMembers, setProjectMembers] = useState<MemberData[]>([])
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
  const [newZoneName, setNewZoneName] = useState('')
  const [newZoneColor, setNewZoneColor] = useState(PRESET_COLORS[0])
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
        // Auto-add current user as admin
        const { currentUser } = use5SStore.getState()
        if (currentUser) {
          await fetch(`/api/projects/${data.project.id}/members`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: currentUser.email, name: currentUser.name, role: 'admin', zoneIds: data.project.zones?.map((z: any) => z.id) || [] }),
          })
        }
        setShowNewProject(false)
        setNewProjectName('')
        setNewProjectCompany('')
        setIsNewCompanyCustom(false)
        setNewProjectDesc('')
        setNewProjectZones([{ name: '', color: PRESET_COLORS[0] }])
        await loadProjects()
        await fetchProjects()
      }
    } catch (error) {
      console.error('Error creating project:', error)
    }
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
    if (!confirm('¿Estás seguro de eliminar este proyecto? Se eliminarán todos los datos asociados (inventarios, progresos, auditorías, etc.).')) return
    try {
      const res = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' })
      if (res.ok) {
        if (currentProject?.id === projectId) {
          const remaining = allProjects.filter(p => p.id !== projectId)
          setCurrentProject(remaining.length > 0 ? remaining[0] : null)
        }
        await loadProjects()
        await fetchProjects()
      }
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleSelectProject = (projectId: string) => {
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null)
    } else {
      setSelectedProjectId(projectId)
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
      if (res.ok) {
        await loadProjectDetail(selectedProjectId)
        await loadProjects()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al eliminar zona')
      }
    } catch (error) {
      console.error('Error deleting zone:', error)
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
        <header className="border-b bg-white/80 backdrop-blur-sm shrink-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => {
                if (!currentProject && allProjects.length > 0) {
                  setCurrentProject(allProjects[0])
                }
                setCurrentView('board')
              }} className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Volver al Tablero
              </Button>
              <div className="w-px h-6 bg-gray-200" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <h1 className="text-lg font-bold text-gray-900">Panel de Admin de Empresa</h1>
            </div>
          </div>
        </header>
      )}

      {/* Tabs — Order: Empresas / Proyectos / Plantillas / Configuración de Tableros */}
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

          <button
            onClick={() => { setActiveTab('plantillas'); setSelectedProjectId(null) }}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'plantillas'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Plantillas
          </button>

          <button
            onClick={() => { setActiveTab('mejoraContinua'); setSelectedProjectId(null) }}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'mejoraContinua'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Configuración Mejora Continua
          </button>
        </div>
      </div>

      {/* Content */}
      <main className={`flex-1 min-h-0 overflow-auto w-full px-4 py-6 ${activeTab === 'mejoraContinua' ? 'max-w-7xl mx-auto' : embedded ? '' : 'max-w-5xl mx-auto'}`}>
        <AnimatePresence mode="wait">
          {/* ═══ PROJECTS TAB ═══ */}
          {activeTab === 'projects' && (
            <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {/* New project button */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Gestiona los proyectos de implementación 5S
                </p>
                <Button
                  onClick={() => setShowNewProject(true)}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" /> Nuevo Proyecto
                </Button>
              </div>

              {/* New project form */}
              {showNewProject && (
                <Card className="border-purple-200 bg-purple-50/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Plus className="h-4 w-4 text-purple-500" />
                      Crear Nuevo Proyecto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Nombre del Proyecto *</Label>
                        <Input placeholder="Nombre" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} />
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
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Descripción</Label>
                      <Input placeholder="Descripción del proyecto (opcional)" value={newProjectDesc} onChange={e => setNewProjectDesc(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Zonas *</Label>
                        <Button variant="ghost" size="sm" onClick={() => setNewProjectZones([...newProjectZones, { name: '', color: PRESET_COLORS[newProjectZones.length % PRESET_COLORS.length] }])} className="h-6 text-xs text-purple-600">
                          <Plus className="h-3 w-3 mr-1" /> Agregar zona
                        </Button>
                      </div>
                      {newProjectZones.map((zone, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <button
                            type="button"
                            className="w-6 h-6 rounded-full border-2 flex-shrink-0"
                            style={{ backgroundColor: zone.color, borderColor: zone.color }}
                            onClick={() => {
                              const next = PRESET_COLORS[(PRESET_COLORS.indexOf(zone.color) + 1) % PRESET_COLORS.length]
                              const updated = [...newProjectZones]
                              updated[idx] = { ...updated[idx], color: next }
                              setNewProjectZones(updated)
                            }}
                          />
                          <Input
                            placeholder="Nombre de la zona"
                            value={zone.name}
                            onChange={e => {
                              const updated = [...newProjectZones]
                              updated[idx] = { ...updated[idx], name: e.target.value }
                              setNewProjectZones(updated)
                            }}
                            className="flex-1"
                          />
                          {newProjectZones.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => setNewProjectZones(newProjectZones.filter((_, i) => i !== idx))} className="h-8 w-8 p-0 text-red-400 hover:text-red-600">
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm" onClick={() => setShowNewProject(false)}>Cancelar</Button>
                      <Button
                        size="sm"
                        onClick={handleCreateProject}
                        disabled={!newProjectName.trim() || !newProjectCompany.trim() || newProjectZones.filter(z => z.name.trim()).length === 0}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                      >
                        Crear Proyecto
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

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
                                    {/* Zones */}
                                    <div>
                                      <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2 flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> Zonas
                                      </h4>
                                      <div className="flex flex-wrap gap-2 mb-2">
                                        {projectZones.map(zone => (
                                          <div key={zone.id} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-white text-xs">
                                            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: zone.color }} />
                                            <span className="font-medium">{zone.name}</span>
                                            {/* Tablero fijo: siempre el predeterminado, no editable */}
                                            <Badge className="text-[9px] px-1 py-0 bg-indigo-100 text-indigo-700 border-0 ml-1" title="Esta zona usa el tablero predeterminado del sistema">
                                              <LayoutGrid className="h-2.5 w-2.5 mr-0.5 inline" />
                                              Tablero predeterminado
                                            </Badge>
                                            <button onClick={() => handleDeleteZone(zone.id, zone.name)} className="text-red-400 hover:text-red-600 ml-1" title="Eliminar zona"><Trash2 className="h-3 w-3" /></button>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                          {PRESET_COLORS.map(c => (
                                            <button key={c} type="button" className={`w-5 h-5 rounded-full border-2 ${newZoneColor === c ? 'border-gray-800' : 'border-transparent'}`} style={{ backgroundColor: c }} onClick={() => setNewZoneColor(c)} />
                                          ))}
                                        </div>
                                        <Input placeholder="Nueva zona" value={newZoneName} onChange={e => setNewZoneName(e.target.value)} className="h-8 text-xs max-w-[200px]" />
                                        <Button size="sm" onClick={handleAddZone} disabled={!newZoneName.trim()} className="h-8 text-xs bg-purple-600 text-white">
                                          <Plus className="h-3 w-3 mr-1" /> Agregar
                                        </Button>
                                      </div>
                                    </div>

                                    {/* Members */}
                                    <div>
                                      <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2 flex items-center gap-1">
                                        <Users className="h-3 w-3" /> Miembros del Proyecto
                                      </h4>

                                      {/* Alta de usuarios: modo "existente" o "nuevo" */}
                                      <Card className="mb-3 border-gray-200">
                                        <CardContent className="p-3 space-y-3">
                                          {/* Toggle modo */}
                                          <div className="flex gap-1 bg-gray-100 p-1 rounded-md">
                                            <button
                                              type="button"
                                              onClick={() => setAddMemberMode('existing')}
                                              className={`flex-1 h-7 text-xs font-medium rounded transition-colors ${
                                                addMemberMode === 'existing'
                                                  ? 'bg-white text-purple-700 shadow-sm'
                                                  : 'text-gray-600 hover:text-gray-800'
                                              }`}
                                            >
                                              Asignar existente
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => setAddMemberMode('new')}
                                              className={`flex-1 h-7 text-xs font-medium rounded transition-colors ${
                                                addMemberMode === 'new'
                                                  ? 'bg-white text-purple-700 shadow-sm'
                                                  : 'text-gray-600 hover:text-gray-800'
                                              }`}
                                            >
                                              <UserPlus className="h-3 w-3 inline mr-1" />
                                              Crear nuevo usuario
                                            </button>
                                          </div>

                                          {/* Modo: asignar existente */}
                                          {addMemberMode === 'existing' ? (
                                            <Select value={selectedExistingUserId} onValueChange={setSelectedExistingUserId}>
                                              <SelectTrigger className="h-8 text-xs">
                                                <SelectValue placeholder="Seleccionar usuario existente..." />
                                              </SelectTrigger>
                                              <SelectContent>
                                                {users
                                                  .filter(u => u.active && !projectMembers.some(m => m.user.id === u.id))
                                                  .map(u => (
                                                    <SelectItem key={u.id} value={u.id}>
                                                      <div className="flex items-center gap-2">
                                                        <span>{u.name}</span>
                                                        <span className="text-muted-foreground">({u.email})</span>
                                                        <Badge className={`${ROLE_COLORS[u.role] || ''} border text-[9px] py-0`}>
                                                          {ROLE_LABELS[u.role] || u.role}
                                                        </Badge>
                                                        {u.projects.length === 0 && (
                                                          <Badge className="bg-amber-100 text-amber-700 border border-amber-200 text-[9px] py-0">
                                                            Sin proyecto
                                                          </Badge>
                                                        )}
                                                      </div>
                                                    </SelectItem>
                                                  ))}
                                              </SelectContent>
                                            </Select>
                                          ) : (
                                            /* Modo: crear nuevo usuario */
                                            <div className="space-y-2">
                                              <div className="grid grid-cols-2 gap-2">
                                                <Input
                                                  placeholder="Nombre completo *"
                                                  value={newMemberName}
                                                  onChange={e => setNewMemberName(e.target.value)}
                                                  className="h-8 text-xs"
                                                />
                                                <Input
                                                  type="email"
                                                  placeholder="Email *"
                                                  value={newMemberEmail}
                                                  onChange={e => setNewMemberEmail(e.target.value)}
                                                  className="h-8 text-xs"
                                                />
                                              </div>
                                              <Input
                                                type="password"
                                                placeholder="Contraseña (mín. 6 car.; vacío = auto-generada)"
                                                value={newMemberPassword}
                                                onChange={e => setNewMemberPassword(e.target.value)}
                                                className="h-8 text-xs"
                                              />
                                              {newMemberPassword && newMemberPassword.length < 6 && (
                                                <p className="text-[10px] text-amber-600">La contraseña debe tener al menos 6 caracteres.</p>
                                              )}
                                              <p className="text-[10px] text-muted-foreground">
                                                Si dejas la contraseña vacía, se generará una automáticamente y se mostrará una vez creada.
                                              </p>
                                            </div>
                                          )}

                                          {/* Rol + Zonas (compartido por ambos modos) */}
                                          <div className="grid grid-cols-2 gap-2">
                                            <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                                              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="admin">Administrador</SelectItem>
                                                <SelectItem value="gerente">Gerente</SelectItem>
                                                <SelectItem value="responsable">Responsable</SelectItem>
                                                <SelectItem value="empleado">Empleado</SelectItem>
                                                <SelectItem value="auditor">Auditor</SelectItem>
                                              </SelectContent>
                                            </Select>
                                            <div className="space-y-1">
                                              <p className="text-[10px] text-muted-foreground font-medium">Zonas (todas por defecto)</p>
                                              <div className="space-y-0.5 max-h-32 overflow-y-auto">
                                                {projectZones.map(z => (
                                                  <label key={z.id} className="flex items-center gap-1.5 text-xs cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5">
                                                    <Checkbox
                                                      checked={newMemberZones.includes(z.id)}
                                                      onCheckedChange={(checked) => {
                                                        if (checked) {
                                                          setNewMemberZones([...newMemberZones, z.id])
                                                        } else {
                                                          setNewMemberZones(newMemberZones.filter(id => id !== z.id))
                                                        }
                                                      }}
                                                      className="h-3.5 w-3.5"
                                                    />
                                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: z.color }} />
                                                    <span>{z.name}</span>
                                                  </label>
                                                ))}
                                              </div>
                                            </div>
                                          </div>

                                          {/* Botón: cambia según modo */}
                                          <Button
                                            size="sm"
                                            onClick={handleAddMember}
                                            disabled={
                                              addMemberMode === 'existing'
                                                ? !selectedExistingUserId
                                                : !newMemberName.trim() || !newMemberEmail.trim()
                                            }
                                            className="w-full h-8 text-xs bg-purple-600 text-white"
                                          >
                                            <UserPlus className="h-3 w-3 mr-1" />
                                            {addMemberMode === 'existing' ? 'Asignar al Proyecto' : 'Crear y Asignar al Proyecto'}
                                          </Button>
                                        </CardContent>
                                      </Card>

                                      {/* Generated password notification */}
                                      {generatedPassword && (
                                        <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                                          <ShieldCheck className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                          <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-green-800">Contraseña generada para {generatedMemberName}</p>
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

                                      {/* Members table — complete, editable, with passwords */}
                                      {projectMembers.length === 0 ? (
                                        <p className="text-xs text-muted-foreground text-center py-4">No hay miembros en este proyecto</p>
                                      ) : (
                                        <div className="space-y-2">
                                          {/* Excel download button */}
                                          <div className="flex justify-end">
                                            <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1 text-green-600 border-green-200 hover:bg-green-50" onClick={() => {
                                              // Build CSV for Excel download
                                              const headers = ['Nombre', 'Email', 'Contraseña', 'Rol', 'Zonas', 'Estado']
                                              const rows = projectMembers.map(m => [
                                                m.user.name,
                                                m.user.email,
                                                m.user.plainPassword || '••••••',
                                                ROLE_LABELS[m.role] || m.role,
                                                m.zones.map(z => z.name).join('; '),
                                                m.user.active ? 'Activo' : 'Inactivo',
                                              ])
                                              const csvContent = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
                                              const BOM = '\uFEFF'
                                              const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
                                              const link = document.createElement('a')
                                              link.href = URL.createObjectURL(blob)
                                              link.download = `recursos_proyecto_${selectedProjectId}.csv`
                                              link.click()
                                            }}>
                                              <Save className="h-3 w-3" /> Descargar Excel (CSV)
                                            </Button>
                                          </div>
                                          <div className="rounded-lg border overflow-x-auto">
                                            <Table>
                                              <TableHeader>
                                                <TableRow>
                                                  <TableHead className="text-xs">Nombre</TableHead>
                                                  <TableHead className="text-xs">Email</TableHead>
                                                  <TableHead className="text-xs">Contraseña</TableHead>
                                                  <TableHead className="text-xs">Rol</TableHead>
                                                  <TableHead className="text-xs">Zonas</TableHead>
                                                  <TableHead className="text-xs text-center">Acciones</TableHead>
                                                </TableRow>
                                              </TableHeader>
                                              <TableBody>
                                                {projectMembers.map(member => (
                                                  <TableRow key={member.id}>
                                                    <TableCell className="text-xs font-medium">
                                                      <Input
                                                        className="h-7 text-xs border-transparent hover:border-gray-300 focus:border-purple-400 px-1 py-0 min-w-[80px]"
                                                        value={member.user.name}
                                                        onChange={async (e) => {
                                                          const newName = e.target.value
                                                          setProjectMembers(prev => prev.map(m => m.id === member.id ? { ...m, user: { ...m.user, name: newName } } : m))
                                                          await fetch('/api/users', {
                                                            method: 'PUT',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ id: member.user.id, name: newName }),
                                                          })
                                                        }}
                                                      />
                                                    </TableCell>
                                                    <TableCell className="text-xs">
                                                      <Input
                                                        className="h-7 text-xs border-transparent hover:border-gray-300 focus:border-purple-400 px-1 py-0 min-w-[120px]"
                                                        value={member.user.email}
                                                        onChange={async (e) => {
                                                          const newEmail = e.target.value
                                                          setProjectMembers(prev => prev.map(m => m.id === member.id ? { ...m, user: { ...m.user, email: newEmail } } : m))
                                                        }}
                                                        onBlur={async (e) => {
                                                          const newEmail = e.target.value.trim().toLowerCase()
                                                          if (newEmail && newEmail !== member.user.email) {
                                                            await fetch('/api/users', {
                                                              method: 'PUT',
                                                              headers: { 'Content-Type': 'application/json' },
                                                              body: JSON.stringify({ id: member.user.id, email: newEmail }),
                                                            })
                                                          }
                                                        }}
                                                      />
                                                    </TableCell>
                                                    <TableCell className="text-xs">
                                                      <div className="flex items-center gap-1">
                                                        <Input
                                                          className="h-7 text-xs border-transparent hover:border-gray-300 focus:border-purple-400 px-1 py-0 min-w-[90px] font-mono"
                                                          value={member.user.plainPassword || '••••••'}
                                                          onChange={async (e) => {
                                                            const newPwd = e.target.value
                                                            setProjectMembers(prev => prev.map(m => m.id === member.id ? { ...m, user: { ...m.user, plainPassword: newPwd } } : m))
                                                          }}
                                                          onBlur={async (e) => {
                                                            const newPwd = e.target.value
                                                            if (newPwd && newPwd.length >= 6 && newPwd !== '••••••') {
                                                              await fetch('/api/users', {
                                                                method: 'PUT',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({ id: member.user.id, password: newPwd }),
                                                              })
                                                            }
                                                          }}
                                                        />
                                                        <button
                                                          className="text-gray-400 hover:text-purple-600 shrink-0"
                                                          title="Restablecer contraseña"
                                                          onClick={async () => {
                                                            const newPwd = prompt(`Nueva contraseña para ${member.user.name}:`, '123456')
                                                            if (!newPwd || newPwd.length < 6) {
                                                              if (newPwd !== null) alert('La contraseña debe tener al menos 6 caracteres')
                                                              return
                                                            }
                                                            await fetch('/api/users', {
                                                              method: 'PUT',
                                                              headers: { 'Content-Type': 'application/json' },
                                                              body: JSON.stringify({ id: member.user.id, password: newPwd }),
                                                            })
                                                            setProjectMembers(prev => prev.map(m => m.id === member.id ? { ...m, user: { ...m.user, plainPassword: newPwd } } : m))
                                                            alert(`Contraseña actualizada a: ${newPwd}`)
                                                          }}
                                                        >
                                                          <Key className="h-3.5 w-3.5" />
                                                        </button>
                                                      </div>
                                                    </TableCell>
                                                    <TableCell>
                                                      <Select value={member.role} onValueChange={async (newRole) => {
                                                        setProjectMembers(prev => prev.map(m => m.id === member.id ? { ...m, role: newRole } : m))
                                                        // Update member role via API
                                                        try {
                                                          await fetch(`/api/projects/${selectedProjectId}/members`, {
                                                            method: 'PATCH',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ memberId: member.id, role: newRole }),
                                                          })
                                                        } catch (err) {
                                                          console.error('Error updating role:', err)
                                                        }
                                                      }}>
                                                        <SelectTrigger className="h-7 text-[10px] w-[110px]">
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
                                                    <TableCell className="text-xs">
                                                      {member.zones.length > 0 ? (
                                                        <div className="flex flex-wrap gap-1">
                                                          {member.zones.map(z => (
                                                            <span key={z.id} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gray-50 border text-[10px]">
                                                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: z.color }} />
                                                              {z.name}
                                                            </span>
                                                          ))}
                                                        </div>
                                                      ) : <span className="text-muted-foreground">-</span>}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                      <div className="flex items-center justify-center gap-1">
                                                        <Button variant="outline" size="sm" className="h-7 text-[10px] text-blue-500 border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 gap-1" onClick={async () => {
                                                          const pwd = member.user.plainPassword || prompt(`Contraseña para enviar a ${member.user.name}:`, '123456')
                                                          if (!pwd) return
                                                          const finalPwd = pwd.length >= 6 ? pwd : '123456'
                                                          setSendingCredentials(member.id)
                                                          try {
                                                            const res = await fetch(`/api/projects/${selectedProjectId}/send-credentials`, {
                                                              method: 'POST',
                                                              headers: { 'Content-Type': 'application/json' },
                                                              body: JSON.stringify({ memberId: member.id, password: finalPwd }),
                                                            })
                                                            const data = await res.json()
                                                            if (data.success) {
                                                              if (data.testingMode) {
                                                                alert(`Email enviado en modo de prueba a: ${data.redirectedTo}\n(El email real iría a: ${member.user.email})`)
                                                              } else {
                                                                alert(`Email de bienvenida enviado a: ${member.user.email}`)
                                                              }
                                                            } else {
                                                              alert(`Error al enviar email: ${data.error}`)
                                                            }
                                                          } catch (err) {
                                                            alert('Error de conexión al enviar credenciales')
                                                          } finally {
                                                            setSendingCredentials(null)
                                                          }
                                                        }} title="Enviar credenciales por email" disabled={sendingCredentials === member.id}>
                                                          {sendingCredentials === member.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Mail className="h-3 w-3" />}
                                                          Enviar
                                                        </Button>
                                                        <Button variant="outline" size="sm" className="h-7 text-[10px] text-red-500 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 gap-1" onClick={() => handleRemoveMember(member.id, member.user.name)} title="Eliminar miembro del proyecto">
                                                          <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                      </div>
                                                    </TableCell>
                                                  </TableRow>
                                                ))}
                                              </TableBody>
                                            </Table>
                                          </div>
                                        </div>
                                      )}
                                    </div>
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

            </motion.div>
          )}

          {/* ═══ DATOS EMPRESA TAB ═══ */}
          {activeTab === 'companies' && (
            <motion.div key="companies" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Datos fiscales y de facturación de tu empresa
                </p>
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
                    <div className="flex justify-end gap-2 sticky bottom-2 z-10 bg-white/90 backdrop-blur border rounded-lg p-2 shadow-md">
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
          {/* ═══ PLANTILLAS TAB ═══ */}
          {activeTab === 'plantillas' && (
            <motion.div key="plantillas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <TemplateManager />
            </motion.div>
          )}

          {/* ═══ MEJORA CONTINUA TAB ═══ */}
          {activeTab === 'mejoraContinua' && (
            <motion.div key="mejoraContinua" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Mejora Continua</h2>
                <p className="text-sm text-muted-foreground max-w-md mb-4">
                  Aquí se configurará el panel de Mejora Continua (ciclo PDCA) para los proyectos 5S.
                  Esta sección estará disponible próximamente.
                </p>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  Próximamente
                </Badge>
              </div>
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
    </div>
  )
}
