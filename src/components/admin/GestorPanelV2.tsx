'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { use5SStore } from '../../lib/store'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog'
import {
  Crown,
  Building2,
  Users,
  Plus,
  Edit3,
  Check,
  X,
  Loader2,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Shield,
  UserPlus,
  Search,
  Mail,
  Database,
  Trash2,
  BookOpen,
  MapPin,
  Save,
  Eye,
  Calendar,
  Clock,
} from 'lucide-react'
import ResourceList from './ResourceList'
import TemplateManager from './TemplateManager'
import { CompanyEditForm } from './CompanyEditForm'

// ─── Types ───────────────────────────────────────────────────────────────────

interface PlatformStats {
  totals: {
    companies: number
    activeCompanies: number
    users: number
    activeUsers: number
    projects: number
    activeProjects: number
    templates: number
    auditResults: number
    actions: number
    openActions: number
  }
  roleDistribution: Record<string, number>
  companies: Array<{
    id: string
    name: string
    description: string | null
    active: boolean
    createdAt: string
    projectCount: number
    memberCount: number
    adminUser?: {
      id: string
      name: string
      email: string
      active: boolean
    } | null
  }>
  recentUsers: Array<{
    id: string
    name: string
    email: string
    role: string
    active: boolean
    createdAt: string
  }>
  projects: Array<{
    id: string
    name: string
    description: string | null
    company: string
    companyId: string | null
    companyName: string | null
    active: boolean
    startDate: string
    createdAt: string
    memberCount: number
    zoneCount: number
  }>
  users: Array<{
    id: string
    name: string
    email: string
    role: string
    active: boolean
    createdAt: string
    companies: Array<{ id: string; name: string; role: string }>
    projects: Array<{ id: string; name: string; company: string; role: string }>
  }>
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ROLE_LABELS: Record<string, string> = {
  gestor: 'Gestor',
  admin: 'Administrador',
  gerente: 'Gerente',
  responsable: 'Responsable',
  empleado: 'Empleado',
  auditor: 'Auditor',
}

const ROLE_COLORS: Record<string, string> = {
  gestor: 'bg-violet-100 text-violet-700 border-violet-200',
  admin: 'bg-purple-100 text-purple-700 border-purple-200',
  gerente: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  responsable: 'bg-blue-100 text-blue-700 border-blue-200',
  empleado: 'bg-green-100 text-green-700 border-green-200',
  auditor: 'bg-orange-100 text-orange-700 border-orange-200',
}

type GestorTab = 'dashboard' | 'empresas' | 'admins' | 'recursos' | 'plantillas' | 'zonificacion'

export default function GestorPanel() {
  const { setCurrentView, fetchProjects, fetchCompanies, projects, setCurrentProject, currentProject } = use5SStore()
  const [activeTab, setActiveTab] = useState<GestorTab>('dashboard')

  // Platform stats
  const [stats, setStats] = useState<PlatformStats | null>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(false)

  // Companies management
  const [showNewCompany, setShowNewCompany] = useState(false)
  const [newCompanyName, setNewCompanyName] = useState('')
  const [newCompanyDesc, setNewCompanyDesc] = useState('')
  const [editingCompany, setEditingCompany] = useState<string | null>(null)
  const [editCompanyData, setEditCompanyData] = useState({ name: '', description: '', active: true })

  // Admin management
  const [assigningAdminTo, setAssigningAdminTo] = useState<string | null>(null)
  const [searchEmail, setSearchEmail] = useState('')
  const [searchResults, setSearchResults] = useState<PlatformStats['users']>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showCreateUser, setShowCreateUser] = useState(false)
  const [newAdminData, setNewAdminData] = useState({ name: '', email: '', password: '' })
  const [isAssigning, setIsAssigning] = useState(false)
  const [sendingEmailFor, setSendingEmailFor] = useState<string | null>(null) // company id being sent email
  const [emailSentFor, setEmailSentFor] = useState<Set<string>>(new Set()) // company ids where email was already sent
  const [pendingCredentials, setPendingCredentials] = useState<Record<string, { name: string; email: string; password: string }>>({}) // companyId -> credentials
  const [deleteCompanyDialog, setDeleteCompanyDialog] = useState<{ open: boolean; companyId: string; companyName: string; projectCount: number }>({ open: false, companyId: '', companyName: '', projectCount: 0 })

  // Company detail view
  const [viewingCompany, setViewingCompany] = useState<{ open: boolean; company: PlatformStats['companies'][0] | null; detail: any | null; loading: boolean }>({ open: false, company: null, detail: null, loading: false })

  // Company edit dialog (full data editing)
  const [editingCompanyDialog, setEditingCompanyDialog] = useState<{
    open: boolean
    company: PlatformStats['companies'][0] | null
    detail: any | null
    loading: boolean
    saving: boolean
    data: {
      name: string
      description: string
      active: boolean
      nif: string
      sector: string
      address: string
      city: string
      province: string
      postalCode: string
      country: string
      phone: string
      website: string
      billingEmail: string
      billingName: string
      billingNif: string
      billingAddress: string
      billingCity: string
      billingPostalCode: string
      iban: string
      contactName: string
      contactEmail: string
      contactPhone: string
    }
  }>({ 
    open: false, company: null, detail: null, loading: false, saving: false, 
    data: { 
      name: '', description: '', active: true,
      nif: '', sector: '', address: '', city: '', province: '', postalCode: '', country: '',
      phone: '', website: '', billingEmail: '', billingName: '', billingNif: '', 
      billingAddress: '', billingCity: '', billingPostalCode: '', iban: '',
      contactName: '', contactEmail: '', contactPhone: ''
    }
  })

  // v2.108 — Zonificación: configuración global del algoritmo.
  const [zoneConfig, setZoneConfig] = useState<{
    maxM2PorZona: number
    questionLabels: { zonas: string; prefijo: string }
    defaultPrefix: string
  } | null>(null)
  const [zoneConfigSaving, setZoneConfigSaving] = useState(false)
  const [zoneConfigSaved, setZoneConfigSaved] = useState(false)

  // ─── Data loading ────────────────────────────────────────────────────────
  const loadStats = useCallback(async () => {
    setIsLoadingStats(true)
    try {
      const res = await fetch('/api/platform-stats')
      const data = await res.json()
      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error('Error loading platform stats:', error)
    } finally {
      setIsLoadingStats(false)
    }
  }, [])

  useEffect(() => {
    loadStats()
  }, [loadStats])

  // v2.108 — Carga la configuración global del algoritmo de zonificación
  const loadZoneConfig = useCallback(async () => {
    try {
      const res = await fetch('/api/zone-config')
      if (res.ok) {
        const data = await res.json()
        setZoneConfig({
          maxM2PorZona: data.maxM2PorZona,
          questionLabels: data.questionLabels,
          defaultPrefix: data.defaultPrefix,
        })
      }
    } catch (e) {
      console.error('loadZoneConfig error:', e)
    }
  }, [])

  useEffect(() => {
    loadZoneConfig()
  }, [loadZoneConfig])

  const handleSaveZoneConfig = async () => {
    if (!zoneConfig) return
    setZoneConfigSaving(true)
    try {
      const res = await fetch('/api/zone-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(zoneConfig),
      })
      if (res.ok) {
        setZoneConfigSaved(true)
        setTimeout(() => setZoneConfigSaved(false), 2500)
      } else {
        const data = await res.json()
        alert(data.error || 'Error al guardar configuración')
      }
    } catch (e) {
      alert('Error de conexión al guardar configuración')
    } finally {
      setZoneConfigSaving(false)
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
        await loadStats()
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
        await loadStats()
        await fetchCompanies()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al actualizar empresa')
      }
    } catch (error) {
      console.error('Error updating company:', error)
    }
  }

  const handleToggleCompanyActive = async (companyId: string, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/companies/${companyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentActive }),
      })
      if (res.ok) {
        await loadStats()
        await fetchCompanies()
      }
    } catch (error) {
      console.error('Error toggling company active:', error)
    }
  }

  const handleDeleteCompany = (companyId: string) => {
    const company = stats?.companies.find(c => c.id === companyId)
    if (!company) return
    setDeleteCompanyDialog({
      open: true,
      companyId: company.id,
      companyName: company.name,
      projectCount: company.projectCount,
    })
  }

  const confirmDeleteCompany = async () => {
    const { companyId } = deleteCompanyDialog
    setDeleteCompanyDialog(d => ({ ...d, open: false }))
    try {
      const res = await fetch(`/api/companies/${companyId}`, { method: 'DELETE' })
      if (res.ok) {
        await loadStats()
        await fetchCompanies()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al eliminar empresa')
      }
    } catch (error) {
      console.error('Error deleting company:', error)
    }
  }

  // ─── View Company Details ──────────────────────────────────────────────
  const handleViewCompany = async (company: PlatformStats['companies'][0]) => {
    setViewingCompany({ open: true, company, detail: null, loading: true })
    try {
      const res = await fetch(`/api/companies/${company.id}`)
      const data = await res.json()
      if (data.success || data.company) {
        setViewingCompany(prev => ({ ...prev, detail: data.company || data, loading: false }))
      } else {
        setViewingCompany(prev => ({ ...prev, loading: false }))
      }
    } catch (error) {
      console.error('Error loading company details:', error)
      setViewingCompany(prev => ({ ...prev, loading: false }))
    }
  }

  // ─── Edit Company (Full Dialog) ─────────────────────────────────────────
  const handleEditCompany = async (company: PlatformStats['companies'][0]) => {
    setEditingCompanyDialog({
      open: true,
      company,
      detail: null,
      loading: true,
      saving: false,
      data: { 
        name: company.name, 
        description: company.description || '', 
        active: company.active,
        nif: '', sector: '', address: '', city: '', province: '', postalCode: '', country: '',
        phone: '', website: '', billingEmail: '', billingName: '', billingNif: '',
        billingAddress: '', billingCity: '', billingPostalCode: '', iban: '',
        contactName: '', contactEmail: '', contactPhone: ''
      }
    })
    try {
      const res = await fetch(`/api/companies/${company.id}`)
      const data = await res.json()
      if (data.success || data.company) {
        const fullCompany = data.company || data
        setEditingCompanyDialog(prev => ({
          ...prev,
          detail: fullCompany,
          loading: false,
          data: {
            name: fullCompany.name || prev.data.name,
            description: fullCompany.description || '',
            active: fullCompany.active !== undefined ? fullCompany.active : prev.data.active,
            nif: fullCompany.nif || '',
            sector: fullCompany.sector || '',
            address: fullCompany.address || '',
            city: fullCompany.city || '',
            province: fullCompany.province || '',
            postalCode: fullCompany.postalCode || '',
            country: fullCompany.country || '',
            phone: fullCompany.phone || '',
            website: fullCompany.website || '',
            billingEmail: fullCompany.billingEmail || '',
            billingName: fullCompany.billingName || '',
            billingNif: fullCompany.billingNif || '',
            billingAddress: fullCompany.billingAddress || '',
            billingCity: fullCompany.billingCity || '',
            billingPostalCode: fullCompany.billingPostalCode || '',
            iban: fullCompany.iban || '',
            contactName: fullCompany.contactName || '',
            contactEmail: fullCompany.contactEmail || '',
            contactPhone: fullCompany.contactPhone || ''
          }
        }))
      } else {
        setEditingCompanyDialog(prev => ({ ...prev, loading: false }))
      }
    } catch (error) {
      console.error('Error loading company for edit:', error)
      setEditingCompanyDialog(prev => ({ ...prev, loading: false }))
    }
  }

  const handleSaveEditedCompany = async () => {
    if (!editingCompanyDialog.company) return
    setEditingCompanyDialog(prev => ({ ...prev, saving: true }))
    try {
      const res = await fetch(`/api/companies/${editingCompanyDialog.company.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCompanyDialog.data)
      })
      if (res.ok) {
        setEditingCompanyDialog({ open: false, company: null, detail: null, loading: false, saving: false, data: { name: '', description: '', active: true } })
        await loadStats()
        await fetchCompanies()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al guardar cambios')
        setEditingCompanyDialog(prev => ({ ...prev, saving: false }))
      }
    } catch (error) {
      console.error('Error saving company:', error)
      alert('Error de conexión al guardar')
      setEditingCompanyDialog(prev => ({ ...prev, saving: false }))
    }
  }

  // ─── Admin assignment actions ───────────────────────────────────────────
  const handleSearchUser = async () => {
    if (!searchEmail.trim() || searchEmail.length < 3) {
      setSearchResults([])
      return
    }
    setIsSearching(true)
    try {
      const res = await fetch(`/api/users?search=${encodeURIComponent(searchEmail)}`)
      const data = await res.json()
      if (data.success) {
        setSearchResults(data.users || [])
      }
    } catch (error) {
      console.error('Error searching users:', error)
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    if (searchEmail.length >= 3) {
      const t = setTimeout(() => handleSearchUser(), 300)
      return () => clearTimeout(t)
    } else {
      setSearchResults([])
    }
  }, [searchEmail])

  const handleAssignExistingUser = async (userId: string) => {
    if (!assigningAdminTo) return
    setIsAssigning(true)
    try {
      // First, ensure the user has 'admin' role
      await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, role: 'admin' }),
      })

      // Then assign them to the company as admin
      const res = await fetch(`/api/companies/${assigningAdminTo}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: 'admin_empresa' }),
      })

      if (res.ok) {
        setAssigningAdminTo(null)
        setSearchEmail('')
        setSearchResults([])
        await loadStats()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al asignar administrador')
      }
    } catch (error) {
      console.error('Error assigning admin:', error)
    } finally {
      setIsAssigning(false)
    }
  }

  const handleCreateAndAssignAdmin = async () => {
    if (!assigningAdminTo) return
    if (!newAdminData.name.trim() || !newAdminData.email.trim() || newAdminData.password.length < 6) {
      alert('Completa todos los campos. La contraseña debe tener al menos 6 caracteres.')
      return
    }
    setIsAssigning(true)
    try {
      // 1. Create user with role 'admin'
      const createRes = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newAdminData.name,
          email: newAdminData.email,
          password: newAdminData.password,
          role: 'admin',
          active: true,
        }),
      })

      if (!createRes.ok) {
        const data = await createRes.json()
        alert(data.error || 'Error al crear usuario')
        setIsAssigning(false)
        return
      }

      const createData = await createRes.json()
      const newUserId = createData.user?.id

      if (!newUserId) {
        alert('Usuario creado pero no se pudo obtener el ID. Asigna el admin manualmente.')
        setIsAssigning(false)
        return
      }

      // 2. Assign user to company
      const assignRes = await fetch(`/api/companies/${assigningAdminTo}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: newUserId, role: 'admin_empresa' }),
      })

      if (assignRes.ok) {
        // Store credentials temporarily so the gestor can send them via email later
        setPendingCredentials(prev => ({
          ...prev,
          [assigningAdminTo]: {
            name: newAdminData.name,
            email: newAdminData.email,
            password: newAdminData.password,
          },
        }))

        setAssigningAdminTo(null)
        setShowCreateUser(false)
        setNewAdminData({ name: '', email: '', password: '' })
        await loadStats()
      } else {
        const data = await assignRes.json()
        alert(data.error || 'Usuario creado pero error al asignar a la empresa')
      }
    } catch (error) {
      console.error('Error creating admin:', error)
    } finally {
      setIsAssigning(false)
    }
  }

  const handleRemoveAdmin = async (companyId: string, userId: string) => {
    if (!confirm('¿Quitar a este administrador de la empresa?')) return
    try {
      const res = await fetch(`/api/companies/${companyId}/members`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberUserId: userId }),
      })
      if (res.ok) {
        await loadStats()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al quitar administrador')
      }
    } catch (error) {
      console.error('Error removing admin:', error)
    }
  }
  // ─── Render ──────────────────────────────────────────────────────────────
  const tabs: { key: GestorTab; label: string; icon: React.ReactNode }[] = [
    { key: 'dashboard', label: 'KPIs', icon: <Activity className="h-4 w-4" /> },
    { key: 'empresas', label: 'Empresas', icon: <Building2 className="h-4 w-4" /> },
    { key: 'admins', label: 'Administradores', icon: <Shield className="h-4 w-4" /> },
    { key: 'plantillas', label: 'Plantillas', icon: <BookOpen className="h-4 w-4" /> },
    { key: 'zonificacion', label: 'Zonificación', icon: <MapPin className="h-4 w-4" /> },
    { key: 'recursos', label: 'Recursos', icon: <Database className="h-4 w-4" /> },
  ]

  // ─── Send invitation email manually ────────────────────────────────────
  const handleSendInvitationEmail = async (companyId: string) => {
    const company = stats?.companies?.find(c => c.id === companyId)
    if (!company?.adminUser) {
      alert('Esta empresa no tiene administrador asignado')
      return
    }

    const adminName = company.adminUser.name
    const adminEmail = company.adminUser.email
    const companyName = company.name
    const gestorEmail = currentUser?.email

    // Check if we have the plain-text password from creation
    const credentials = pendingCredentials[companyId]
    const adminPassword = credentials?.password

    const hasPassword = !!adminPassword
    const confirmMsg = hasPassword
      ? `¿Enviar email de inscripción a ${adminName} (${adminEmail}) con sus credenciales?\nSe enviará copia al gestor (${gestorEmail}).`
      : `¿Enviar email de inscripción a ${adminName} (${adminEmail})?\n\nNota: No se dispone de la contraseña en texto plano. El email indicará que debe restablecerla.\nSe enviará copia al gestor (${gestorEmail}).`

    if (!confirm(confirmMsg)) return

    setSendingEmailFor(companyId)
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'admin_welcome',
          adminName,
          adminEmail,
          adminPassword: adminPassword || '',
          companyName,
          gestorEmail,
          sendCopy: true,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setEmailSentFor(prev => new Set(prev).add(companyId))
        // Clear stored credentials after sending
        setPendingCredentials(prev => {
          const next = { ...prev }
          delete next[companyId]
          return next
        })
      } else {
        alert(data.error || 'Error al enviar el email')
      }
    } catch (error) {
      console.error('Error sending invitation email:', error)
      alert('Error al enviar el email')
    } finally {
      setSendingEmailFor(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-violet-950/20 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-violet-800/30 bg-slate-950 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Crown className="h-5 w-5 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-violet-300 to-purple-200 bg-clip-text text-transparent">
                Gestor Panel
              </h1>
              <p className="text-xs text-violet-400">Dueño de la Plataforma</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (!currentProject && projects.length > 0) {
                  setCurrentProject(projects[0])
                }
                setCurrentView('board')
              }}
              className="gap-1.5 border-violet-700/50 text-violet-300 hover:bg-violet-900/30 hover:text-violet-200"
            >
              ← Vista App
            </Button>
            <Badge className="bg-gradient-to-r from-violet-600 to-purple-600 text-white border-0 px-3 py-1">
              <Crown className="h-3 w-3 mr-1" /> GESTOR
            </Badge>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-violet-800/20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 flex gap-0 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-violet-400 text-violet-300 bg-violet-900/20'
                  : 'border-transparent text-violet-500 hover:text-violet-300 hover:border-violet-700/50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {/* ═══ DASHBOARD TAB (KPIs) ═══ */}
          {activeTab === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              {isLoadingStats ? (
                <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 text-violet-400 animate-spin" /></div>
              ) : stats ? (
                <>
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-gradient-to-br from-violet-900/40 to-purple-900/20 border-violet-700/30 text-white">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Building2 className="h-5 w-5 text-violet-400" />
                          <Badge className="bg-violet-800/50 text-violet-300 border-0 text-[10px]">
                            {stats.totals.activeCompanies}/{stats.totals.companies} activas
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold">{stats.totals.companies}</p>
                        <p className="text-xs text-violet-400">Empresas</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-blue-900/40 to-indigo-900/20 border-blue-700/30 text-white">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Users className="h-5 w-5 text-blue-400" />
                          <Badge className="bg-blue-800/50 text-blue-300 border-0 text-[10px]">
                            {stats.totals.activeUsers}/{stats.totals.users} activos
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold">{stats.totals.users}</p>
                        <p className="text-xs text-blue-400">Usuarios</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-emerald-900/40 to-green-900/20 border-emerald-700/30 text-white">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <TrendingUp className="h-5 w-5 text-emerald-400" />
                          <Badge className="bg-emerald-800/50 text-emerald-300 border-0 text-[10px]">
                            {stats.totals.activeProjects}/{stats.totals.projects} activos
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold">{stats.totals.projects}</p>
                        <p className="text-xs text-emerald-400">Proyectos</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-orange-900/40 to-amber-900/20 border-orange-700/30 text-white">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <AlertTriangle className="h-5 w-5 text-orange-400" />
                          <Badge className="bg-orange-800/50 text-orange-300 border-0 text-[10px]">
                            de {stats.totals.actions} total
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold">{stats.totals.openActions}</p>
                        <p className="text-xs text-orange-400">Acciones Abiertas</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Role distribution + Platform health */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-slate-900/60 border-violet-700/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-violet-300 flex items-center gap-2">
                          <Users className="h-4 w-4" /> Distribución de Roles
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {Object.entries(stats.roleDistribution).map(([role, count]) => (
                            <div key={role} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge className={`${ROLE_COLORS[role] || 'bg-gray-100 text-gray-700 border-gray-200'} border text-xs`}>
                                  {ROLE_LABELS[role] || role}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                                    style={{ width: `${Math.min((count / stats.totals.users) * 100, 100)}%` }}
                                  />
                                </div>
                                <span className="text-sm font-semibold text-white w-8 text-right">{count}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900/60 border-violet-700/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-violet-300 flex items-center gap-2">
                          <Activity className="h-4 w-4" /> Salud de Plataforma
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-violet-400">Empresas activas</span>
                            <span className="text-sm font-bold text-white">
                              {stats.totals.companies > 0 ? Math.round((stats.totals.activeCompanies / stats.totals.companies) * 100) : 0}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-violet-400">Usuarios activos</span>
                            <span className="text-sm font-bold text-white">
                              {stats.totals.users > 0 ? Math.round((stats.totals.activeUsers / stats.totals.users) * 100) : 0}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-violet-400">Proyectos activos</span>
                            <span className="text-sm font-bold text-white">
                              {stats.totals.projects > 0 ? Math.round((stats.totals.activeProjects / stats.totals.projects) * 100) : 0}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-violet-400">Plantillas disponibles</span>
                            <span className="text-sm font-bold text-white">{stats.totals.templates}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-violet-400">Auditorías realizadas</span>
                            <span className="text-sm font-bold text-white">{stats.totals.auditResults}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent users */}
                  <Card className="bg-slate-900/60 border-violet-700/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-violet-300 flex items-center gap-2">
                        <Activity className="h-4 w-4" /> Últimos Usuarios Registrados
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {stats.recentUsers.map(user => (
                          <div key={user.id} className="flex items-center justify-between py-1.5 border-b border-violet-800/20 last:border-0">
                            <div className="flex items-center gap-2">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${user.active ? 'bg-violet-800/50 text-violet-300' : 'bg-gray-800/50 text-gray-500'}`}>
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-xs font-medium text-white">{user.name}</p>
                                <p className="text-[10px] text-violet-500">{user.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={`${ROLE_COLORS[user.role] || 'bg-gray-100 text-gray-700 border-gray-200'} border text-[10px]`}>
                                {ROLE_LABELS[user.role] || user.role}
                              </Badge>
                              {user.active ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                              ) : (
                                <XCircle className="h-3.5 w-3.5 text-red-500" />
                              )}
                            </div>
                          </div>
                        ))}
                        {stats.recentUsers.length === 0 && (
                          <p className="text-xs text-violet-500 text-center py-4">Aún no hay usuarios registrados</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="text-center py-12 text-violet-500">
                  <p>No se pudieron cargar las estadísticas</p>
                </div>
              )}
            </motion.div>
          )}

          {/* ═══ EMPRESAS TAB ═══ */}
          {activeTab === 'empresas' && (
            <motion.div key="empresas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-violet-400">Todas las empresas de la plataforma</p>
                <Button
                  onClick={() => setShowNewCompany(true)}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" /> Nueva Empresa
                </Button>
              </div>

              {/* New company form */}
              {showNewCompany && (
                <Card className="bg-violet-900/20 border-violet-700/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-violet-300 flex items-center gap-2">
                      <Plus className="h-4 w-4 text-violet-400" /> Crear Nueva Empresa
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-violet-400">Nombre *</Label>
                        <Input placeholder="Nombre de la empresa" value={newCompanyName} onChange={e => setNewCompanyName(e.target.value)} className="bg-slate-900/60 border-violet-700/30 text-white" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-violet-400">Descripción</Label>
                        <Input placeholder="Descripción (opcional)" value={newCompanyDesc} onChange={e => setNewCompanyDesc(e.target.value)} className="bg-slate-900/60 border-violet-700/30 text-white" />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm" onClick={() => setShowNewCompany(false)} className="border-violet-700/50 text-violet-300">Cancelar</Button>
                      <Button size="sm" onClick={handleCreateCompany} disabled={!newCompanyName.trim()} className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">Crear</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {isLoadingStats ? (
                <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-violet-400 animate-spin" /></div>
              ) : (
                <div className="grid gap-3">
                  {stats?.companies.map(company => (
                    <Card 
                      key={company.id} 
                      className={`bg-slate-900/60 ${company.active ? 'border-violet-700/20' : 'border-red-700/30 opacity-60'} hover:border-violet-500/40 transition-colors cursor-pointer`}
                      onClick={() => editingCompany !== company.id && handleViewCompany(company)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${company.active ? 'bg-violet-800/40' : 'bg-red-900/30'}`}>
                              <Building2 className={`h-5 w-5 ${company.active ? 'text-violet-400' : 'text-red-400'}`} />
                            </div>
                            <div className="flex-1">
                              {editingCompany === company.id ? (
                                <div className="space-y-2" onClick={e => e.stopPropagation()}>
                                  <Input value={editCompanyData.name} onChange={e => setEditCompanyData(d => ({ ...d, name: e.target.value }))} className="bg-slate-800 border-violet-700/30 text-white text-sm" />
                                  <Input value={editCompanyData.description} onChange={e => setEditCompanyData(d => ({ ...d, description: e.target.value }))} className="bg-slate-800 border-violet-700/30 text-white text-sm" placeholder="Descripción" />
                                  <div className="flex gap-2">
                                    <Button size="sm" onClick={() => handleUpdateCompany(company.id)} className="bg-violet-600 text-white h-7"><Check className="h-3 w-3 mr-1" />Guardar</Button>
                                    <Button size="sm" variant="ghost" onClick={() => setEditingCompany(null)} className="text-violet-400 h-7">Cancelar</Button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <p className="text-sm font-semibold text-white">{company.name}</p>
                                  <div className="flex items-center gap-3 mt-1">
                                    <span className="text-[10px] text-violet-500">{company.description || 'Sin descripción'}</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                            <div className="text-center">
                              <p className="text-lg font-bold text-white">{company.projectCount}</p>
                              <p className="text-[10px] text-violet-500">Proyectos</p>
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-bold text-white">{company.memberCount}</p>
                              <p className="text-[10px] text-violet-500">Miembros</p>
                            </div>
                            <Badge className={`${company.active ? 'bg-green-900/30 text-green-400 border-green-700/30' : 'bg-red-900/30 text-red-400 border-red-700/30'} border text-[10px]`}>
                              {company.active ? 'Activa' : 'Inactiva'}
                            </Badge>
                            {/* ✏️✅ BOTÓN EDITAR EMPRESA - CON TEXTO Y TOOLTIP */}
                            <Button
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); window.location.href = `/edit-company/${company.id}` }}
                              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-lg border-2 border-cyan-300/50 flex items-center gap-1.5"
                              title="✏️ EDITAR EMPRESA: Modificar todos los datos (CIF, NIF, dirección, teléfono, contacto, facturación, IBAN...)"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">EDITAR</span>
                            </Button>
                            {/* 🔄 BOTÓN ACTIVAR/DESACTIVAR */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleCompanyActive(company.id, company.active)}
                              className={`h-8 w-8 p-0 rounded-md ${company.active ? 'text-green-500 hover:bg-green-900/40 border border-green-700/30' : 'text-red-500 hover:bg-red-900/40 border border-red-700/30'}`}
                              title={`🔄 ${company.active ? 'DESACTIVAR empresa: La empresa ya no podrá usar la aplicación' : 'ACTIVAR empresa: La empresa podrá usar la aplicación nuevamente'}`}
                            >
                              {company.active ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                            </Button>
                            {/* 🗑️ BOTÓN ELIMINAR */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCompany(company.id)}
                              className="h-8 w-8 p-0 text-red-400 hover:bg-red-900/40 rounded-md border border-red-700/30"
                              title="🗑️ ELIMINAR empresa: Borrar permanentemente esta empresa y todos sus datos (NO se puede deshacer)"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {(!stats || stats.companies.length === 0) && (
                    <Card className="bg-slate-900/60 border-violet-700/20">
                      <CardContent className="py-12 text-center">
                        <Building2 className="h-10 w-10 text-violet-700 mx-auto mb-3" />
                        <p className="text-sm text-violet-500">No hay empresas creadas todavía</p>
                        <p className="text-xs text-violet-600 mt-1">Pulsa "Nueva Empresa" para crear la primera</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* ═══ ADMINISTRADORES TAB ═══ */}
          {activeTab === 'admins' && (
            <motion.div key="admins" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-violet-400" />
                <h2 className="text-lg font-bold text-white">Administradores por Empresa</h2>
              </div>
              <p className="text-sm text-violet-400 -mt-2">
                Asigna un administrador a cada empresa. El administrador gestionará los usuarios, proyectos y zonas de su empresa.
              </p>

              {isLoadingStats ? (
                <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-violet-400 animate-spin" /></div>
              ) : stats && stats.companies.length > 0 ? (
                <div className="grid gap-3">
                  {stats.companies.map(company => (
                    <Card key={company.id} className="bg-slate-900/60 border-violet-700/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
                          {/* Company info */}
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${company.active ? 'bg-violet-800/40' : 'bg-red-900/30'}`}>
                              <Building2 className={`h-5 w-5 ${company.active ? 'text-violet-400' : 'text-red-400'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-white truncate">{company.name}</p>
                              <p className="text-[10px] text-violet-500">
                                {company.projectCount} proyectos · {company.memberCount} miembros
                              </p>
                            </div>
                          </div>

                          {/* Admin info */}
                          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                            {company.adminUser ? (
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-900/20 border border-purple-700/30">
                                <div className="w-7 h-7 rounded-full bg-purple-700/50 flex items-center justify-center text-xs font-bold text-purple-200">
                                  {company.adminUser.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="text-left">
                                  <p className="text-xs font-medium text-white">{company.adminUser.name}</p>
                                  <p className="text-[10px] text-purple-400">{company.adminUser.email}</p>
                                </div>
                                <Badge className="bg-purple-900/40 text-purple-300 border-purple-700/30 border text-[10px] ml-1">
                                  ADMIN
                                </Badge>
                              </div>
                            ) : (
                              <Badge className="bg-amber-900/30 text-amber-400 border-amber-700/30 border text-[10px]">
                                Sin admin
                              </Badge>
                            )}

                            {/* Action buttons */}
                            {company.adminUser ? (
                              <div className="flex items-center gap-2">
                                {pendingCredentials[company.id] && !emailSentFor.has(company.id) && (
                                  <Badge className="bg-amber-900/40 text-amber-300 border-amber-700/30 border text-[9px] animate-pulse">
                                    Credenciales pendientes
                                  </Badge>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSendInvitationEmail(company.id)}
                                  disabled={sendingEmailFor === company.id}
                                  className={`border-emerald-700/50 h-7 text-xs ${
                                    emailSentFor.has(company.id)
                                      ? 'bg-emerald-900/30 text-emerald-400'
                                      : 'text-emerald-400 hover:bg-emerald-900/30'
                                  }`}
                                >
                                  {sendingEmailFor === company.id ? (
                                    <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Enviando...</>
                                  ) : emailSentFor.has(company.id) ? (
                                    <><CheckCircle2 className="h-3 w-3 mr-1" /> Enviado</>
                                  ) : (
                                    <><Mail className="h-3 w-3 mr-1" /> Enviar Email</>
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRemoveAdmin(company.id, company.adminUser!.id)}
                                  className="border-red-700/50 text-red-400 hover:bg-red-900/30 h-7 text-xs"
                                >
                                  <X className="h-3 w-3 mr-1" /> Quitar
                                </Button>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => {
                                  setAssigningAdminTo(company.id)
                                  setSearchEmail('')
                                  setSearchResults([])
                                  setShowCreateUser(false)
                                }}
                                className="bg-gradient-to-r from-violet-600 to-purple-600 text-white h-7 text-xs"
                              >
                                <UserPlus className="h-3 w-3 mr-1" /> Asignar
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-slate-900/60 border-violet-700/20">
                  <CardContent className="py-12 text-center">
                    <Shield className="h-10 w-10 text-violet-700 mx-auto mb-3" />
                    <p className="text-sm text-violet-500">No hay empresas creadas</p>
                    <p className="text-xs text-violet-600 mt-1">Crea una empresa primero en la pestaña "Empresas"</p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}

          {/* ═══ RECURSOS TAB ═══ */}
          {activeTab === 'recursos' && (
            <motion.div key="recursos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <ResourceList showAllCompanies={true} dark={true} />
            </motion.div>
          )}

          {/* ═══ ZONIFICACIÓN TAB (v2.108) ═══ */}
          {/* Configuración global del algoritmo de zonificación.
              El gestor define el límite de m² por zona y los textos de las
              preguntas del wizard. Los admins ven esta config al crear zonas. */}
          {activeTab === 'zonificacion' && (
            <motion.div key="zonificacion" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="rounded-xl bg-white text-gray-900 shadow-lg p-5 max-w-2xl">
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-violet-700" />
                  <div>
                    <h2 className="text-base font-bold">Configuración del algoritmo de zonificación</h2>
                    <p className="text-xs text-muted-foreground">
                      Define el límite de m² por zona y los textos del wizard que verán los administradores.
                    </p>
                  </div>
                </div>

                {!zoneConfig ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground py-8">
                    <Loader2 className="h-4 w-4 animate-spin" /> Cargando configuración…
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* m² máximo por zona */}
                    <div>
                      <Label className="text-xs font-semibold block mb-1.5">
                        m² máximo por zona
                      </Label>
                      <Input
                        type="number" min={50} step={50}
                        value={zoneConfig.maxM2PorZona}
                        onChange={(e) => setZoneConfig({
                          ...zoneConfig,
                          maxM2PorZona: parseFloat(e.target.value) || 0,
                        })}
                        className="h-9 text-sm max-w-[200px]"
                      />
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Si una zona supera este m², el algoritmo la divide en sub-zonas.
                        Ej. 800 m² y una zona de 801 → se divide en 2.
                      </p>
                    </div>

                    {/* Prefijo propuesto */}
                    <div>
                      <Label className="text-xs font-semibold block mb-1.5">
                        Prefijo propuesto para sub-zonas
                      </Label>
                      <Input
                        value={zoneConfig.defaultPrefix}
                        onChange={(e) => setZoneConfig({
                          ...zoneConfig,
                          defaultPrefix: e.target.value,
                        })}
                        className="h-9 text-sm max-w-[200px]"
                        maxLength={6}
                      />
                      <p className="text-[11px] text-muted-foreground mt-1">
                        El admin puede sobreescribir los nombres manualmente; este es solo el prefijo por defecto.
                      </p>
                    </div>

                    {/* Texto pregunta "zonas iniciales" */}
                    <div>
                      <Label className="text-xs font-semibold block mb-1.5">
                        Texto de la pregunta "zonas iniciales"
                      </Label>
                      <Input
                        value={zoneConfig.questionLabels.zonas}
                        onChange={(e) => setZoneConfig({
                          ...zoneConfig,
                          questionLabels: { ...zoneConfig.questionLabels, zonas: e.target.value },
                        })}
                        className="h-9 text-sm"
                      />
                    </div>

                    {/* Texto pregunta "prefijo" */}
                    <div>
                      <Label className="text-xs font-semibold block mb-1.5">
                        Texto de la pregunta "prefijo"
                      </Label>
                      <Input
                        value={zoneConfig.questionLabels.prefijo}
                        onChange={(e) => setZoneConfig({
                          ...zoneConfig,
                          questionLabels: { ...zoneConfig.questionLabels, prefijo: e.target.value },
                        })}
                        className="h-9 text-sm"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2 border-t">
                      <Button
                        onClick={handleSaveZoneConfig}
                        disabled={zoneConfigSaving}
                        className="bg-violet-700 hover:bg-violet-800 text-white"
                      >
                        {zoneConfigSaving ? (
                          <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Guardando…</>
                        ) : (
                          <><Save className="h-4 w-4 mr-1" /> Guardar configuración</>
                        )}
                      </Button>
                      {zoneConfigSaved && (
                        <span className="text-xs text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Guardado
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ═══ PLANTILLAS GENÉRICAS TAB (v2.31) ═══ */}
          {/* El gestor es el único que puede editar la Biblioteca del Sistema
              (plantillas globales compartidas por todas las empresas).
              Desde aquí puede crear, editar, duplicar y eliminar cualquier
              plantilla genérica. Las empresas ven estas plantillas pero no
              pueden modificarlas (solo duplicarlas a su propia biblioteca). */}
          {activeTab === 'plantillas' && (
            <motion.div key="plantillas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="rounded-xl bg-white text-gray-900 shadow-lg p-5">
                <div className="mb-3 flex items-center gap-2 text-violet-700">
                  <Crown className="h-4 w-4" />
                  <span className="text-xs font-semibold">
                    Modo Gestor — Editando la Biblioteca del Sistema
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Las plantillas que edites aquí se propagan a todas las zonas
                    de todas las empresas que las usen.
                  </span>
                </div>
                <TemplateManager />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ═══ VIEW COMPANY DETAILS DIALOG ═══ */}
      <Dialog open={viewingCompany.open} onOpenChange={(open) => { if (!open) setViewingCompany({ open: false, company: null, detail: null, loading: false }) }}>
        <DialogContent className="bg-slate-900 border-violet-700/30 max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-violet-300 flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Detalles de la Empresa
            </DialogTitle>
            <DialogDescription className="text-violet-400">
              Información completa de la empresa y sus datos asociados
            </DialogDescription>
          </DialogHeader>
          
          {viewingCompany.loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 text-violet-400 animate-spin" />
            </div>
          ) : viewingCompany.company && (
            <div className="space-y-5">
              {/* Company basic info */}
              <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{viewingCompany.company.name}</h3>
                    <p className="text-xs text-violet-400 mt-1">{viewingCompany.company.description || 'Sin descripción'}</p>
                  </div>
                  <Badge className={`${viewingCompany.company.active ? 'bg-green-900/30 text-green-400 border-green-700/30' : 'bg-red-900/30 text-red-400 border-red-700/30'} border text-xs`}>
                    {viewingCompany.company.active ? 'Activa' : 'Inactiva'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-violet-300">
                    <Calendar className="h-3.5 w-3.5" />
                    Creada: {new Date(viewingCompany.company.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2 text-violet-300">
                    <Users className="h-3.5 w-3.5" />
                    ID: {viewingCompany.company.id.substring(0, 12)}...
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-700">
                  <div className="text-center bg-slate-900/50 rounded p-2">
                    <p className="text-xl font-bold text-white">{viewingCompany.company.projectCount}</p>
                    <p className="text-[10px] text-violet-500">Proyectos</p>
                  </div>
                  <div className="text-center bg-slate-900/50 rounded p-2">
                    <p className="text-xl font-bold text-white">{viewingCompany.company.memberCount}</p>
                    <p className="text-[10px] text-violet-500">Miembros</p>
                  </div>
                  <div className="text-center bg-slate-900/50 rounded p-2">
                    <p className="text-xl font-bold text-white">{viewingCompany.detail?.projects?.length || viewingCompany.company.projectCount || 0}</p>
                    <p className="text-[10px] text-violet-500">Zonas totales</p>
                  </div>
                </div>
              </div>

              {/* Admin info */}
              {viewingCompany.company.adminUser && (
                <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" /> Administrador asignado
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-700/50 flex items-center justify-center text-sm font-bold text-purple-200">
                      {viewingCompany.company.adminUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{viewingCompany.company.adminUser.name}</p>
                      <p className="text-xs text-purple-400">{viewingCompany.company.adminUser.email}</p>
                    </div>
                    <Badge className="bg-purple-900/40 text-purple-300 border-purple-700/30 border text-[10px] ml-auto">
                      ADMIN
                    </Badge>
                  </div>
                </div>
              )}

              {!viewingCompany.company.adminUser && (
                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3">
                  <p className="text-xs text-amber-400 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" /> Esta empresa no tiene administrador asignado
                  </p>
                </div>
              )}

              {/* Projects list */}
              {viewingCompany.detail?.projects && viewingCompany.detail.projects.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-violet-300 flex items-center gap-2">
                    <Database className="h-4 w-4" /> Proyectos ({viewingCompany.detail.projects.length})
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {viewingCompany.detail.projects.map((project: any) => (
                      <div key={project.id} className="bg-slate-800/50 rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">{project.name}</p>
                          <p className="text-[10px] text-violet-500 mt-0.5">
                            {project.zoneCount || 0} zonas · {project.memberCount || 0} miembros
                            {project.startDate && ` · Inicio: ${new Date(project.startDate).toLocaleDateString('es-ES')}`}
                          </p>
                        </div>
                        <Badge className={`${project.active ? 'bg-green-900/30 text-green-400 border-green-700/30' : 'bg-red-900/30 text-red-400 border-red-700/30'} border text-[10px]`}>
                          {project.active ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Members list */}
              {viewingCompany.detail?.members && viewingCompany.detail.members.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-violet-300 flex items-center gap-2">
                    <Users className="h-4 w-4" /> Miembros ({viewingCompany.detail.members.length})
                  </h4>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {viewingCompany.detail.members.map((member: any) => (
                      <div key={member.id || member.userId} className="flex items-center gap-2 px-3 py-2 bg-slate-800/30 rounded-lg">
                        <div className="w-7 h-7 rounded-full bg-violet-700/40 flex items-center justify-center text-xs font-bold text-violet-200">
                          {(member.user?.name || member.name || '?').charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white truncate">{member.user?.name || member.name}</p>
                          <p className="text-[10px] text-violet-500 truncate">{member.user?.email || member.email}</p>
                        </div>
                        <Badge className={`${ROLE_COLORS[member.role || member.user?.role] || 'bg-gray-100 text-gray-700 border-gray-200'} border text-[9px]`}>
                          {ROLE_LABELS[member.role || member.user?.role] || member.role || member.user?.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2 pt-3 border-t border-slate-700">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setViewingCompany({ open: false, company: null, detail: null, loading: false })
                    setEditingCompany(viewingCompany.company!.id)
                    setEditCompanyData({ 
                      name: viewingCompany.company!.name, 
                      description: viewingCompany.company!.description || '', 
                      active: viewingCompany.company!.active 
                    })
                    setActiveTab('empresas')
                  }}
                  className="border-violet-700/50 text-violet-300 hover:bg-violet-900/20"
                >
                  <Edit3 className="h-3.5 w-3.5 mr-1" /> Editar empresa
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setViewingCompany({ open: false, company: null, detail: null, loading: false })
                    setAssigningAdminTo(viewingCompany.company!.id)
                    setActiveTab('admins')
                  }}
                  className={!viewingCompany.company?.adminUser ? "border-emerald-700/50 text-emerald-400 hover:bg-emerald-900/20" : "border-purple-700/50 text-purple-400 hover:bg-purple-900/20"}
                >
                  <UserPlus className="h-3.5 w-3.5 mr-1" /> 
                  {viewingCompany.company?.adminUser ? 'Gestionar admin' : 'Asignar admin'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ═══ EDIT COMPANY DIALOG (Full) - v3.0.11 NEW COMPONENT ═══ */}
      <Dialog open={editingCompanyDialog.open} onOpenChange={(open) => { if (!open) setEditingCompanyDialog({ open: false, company: null, detail: null, loading: false, saving: false, data: { name: '', description: '', active: true, nif: '', sector: '', address: '', city: '', province: '', postalCode: '', country: '', phone: '', website: '', billingEmail: '', billingName: '', billingNif: '', billingAddress: '', billingCity: '', billingPostalCode: '', iban: '', contactName: '', contactEmail: '', contactPhone: '' } }) }}>
        <DialogContent className="bg-slate-900 border-emerald-500/50 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-emerald-300 flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              ✏️ Editar Empresa - {editingCompanyDialog.company?.name}
            </DialogTitle>
            <DialogDescription className="text-emerald-400">
              Modifica todos los datos de la empresa y guarda los cambios
            </DialogDescription>
          </DialogHeader>
          
          {editingCompanyDialog.company && (
            <>
              <CompanyEditForm 
                data={editingCompanyDialog.data}
                onChange={(newData) => setEditingCompanyDialog(d => ({ ...d, data: newData }))}
                loading={editingCompanyDialog.loading}
              />

              {/* Info read-only */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-300 bg-slate-800/30 rounded-lg px-3 py-2">
                  <Calendar className="h-3.5 w-3.5" />
                  Creada: {new Date(editingCompanyDialog.company.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2 text-emerald-300 bg-slate-800/30 rounded-lg px-3 py-2">
                  <Database className="h-3.5 w-3.5" />
                  {editingCompanyDialog.company.projectCount} proyectos · {editingCompanyDialog.company.memberCount} miembros
                </div>
              </div>

              {/* Admin info */}
              {editingCompanyDialog.company.adminUser && (
                <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3">
                  <p className="text-xs text-purple-300">
                    👤 Admin: <strong>{editingCompanyDialog.company.adminUser.name}</strong> ({editingCompanyDialog.company.adminUser.email})
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 pt-3 border-t border-slate-700">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingCompanyDialog({ open: false, company: null, detail: null, loading: false, saving: false, data: { name: '', description: '', active: true, nif: '', sector: '', address: '', city: '', province: '', postalCode: '', country: '', phone: '', website: '', billingEmail: '', billingName: '', billingNif: '', billingAddress: '', billingCity: '', billingPostalCode: '', iban: '', contactName: '', contactEmail: '', contactPhone: '' } })}
                  className="border-slate-600 text-slate-400 hover:bg-slate-800"
                >
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveEditedCompany}
                  disabled={editingCompanyDialog.saving || !editingCompanyDialog.data.name.trim()}
                  className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white flex-1"
                >
                  {editingCompanyDialog.saving ? (
                    <><Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> Guardando...</>
                  ) : (
                    <><Save className="h-3.5 w-3.5 mr-1" /> Guardar todos los cambios</>
                  )}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ═══ DELETE COMPANY DIALOG ═══ */}
      <Dialog open={deleteCompanyDialog.open} onOpenChange={(open) => { if (!open) setDeleteCompanyDialog(d => ({ ...d, open: false })) }}>
        <DialogContent className="bg-slate-900 border-violet-700/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Eliminar Empresa
            </DialogTitle>
            <DialogDescription className="text-violet-400">
              Esta acción es irreversible
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-violet-300">
              ¿Estás seguro de eliminar <strong className="text-white">{deleteCompanyDialog.companyName}</strong> permanentemente?
            </p>
            {deleteCompanyDialog.projectCount > 0 && (
              <div className="bg-red-900/30 border border-red-700/30 rounded-lg p-3">
                <p className="text-sm text-red-300">
                  Se eliminarán <strong>{deleteCompanyDialog.projectCount} proyecto(s)</strong> con todos sus datos (zonas, auditorías, inventarios, miembros, etc.).
                </p>
              </div>
            )}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start text-red-400 border-red-700/30 hover:bg-red-900/30 bg-transparent"
                onClick={() => confirmDeleteCompany()}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {deleteCompanyDialog.projectCount > 0
                  ? `Eliminar todo (empresa + ${deleteCompanyDialog.projectCount} proyecto(s))`
                  : 'Eliminar empresa permanentemente'}
              </Button>
              <Button
                variant="ghost"
                className="w-full text-violet-400"
                onClick={() => setDeleteCompanyDialog(d => ({ ...d, open: false }))}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ═══ ASSIGN ADMIN DIALOG ═══ */}
      <Dialog open={!!assigningAdminTo} onOpenChange={(open) => !open && setAssigningAdminTo(null)}>
        <DialogContent className="bg-slate-900 border-violet-700/30 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-violet-300 flex items-center gap-2">
              <UserPlus className="h-5 w-5" /> Asignar Administrador
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Toggle: existing or new user */}
            <div className="flex gap-2">
              <Button
                variant={!showCreateUser ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowCreateUser(false)}
                className={!showCreateUser ? 'bg-violet-600 text-white' : 'border-violet-700/50 text-violet-300'}
              >
                <Search className="h-3 w-3 mr-1" /> Buscar existente
              </Button>
              <Button
                variant={showCreateUser ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowCreateUser(true)}
                className={showCreateUser ? 'bg-violet-600 text-white' : 'border-violet-700/50 text-violet-300'}
              >
                <Plus className="h-3 w-3 mr-1" /> Crear nuevo
              </Button>
            </div>

            {/* Existing user search */}
            {!showCreateUser && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-violet-400">Buscar por email o nombre</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-violet-500" />
                    <Input
                      placeholder="email@ejemplo.com"
                      value={searchEmail}
                      onChange={e => setSearchEmail(e.target.value)}
                      className="bg-slate-800 border-violet-700/30 text-white pl-9"
                      autoFocus
                    />
                  </div>
                </div>

                {isSearching && (
                  <div className="flex justify-center py-2"><Loader2 className="h-4 w-4 text-violet-400 animate-spin" /></div>
                )}

                {searchResults.length > 0 && (
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {searchResults.map(user => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 hover:bg-violet-900/20 border border-violet-800/20 cursor-pointer"
                        onClick={() => handleAssignExistingUser(user.id)}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-violet-700/50 flex items-center justify-center text-xs font-bold text-violet-200">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-white">{user.name}</p>
                            <p className="text-[10px] text-violet-400">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${ROLE_COLORS[user.role] || 'bg-gray-100 text-gray-700 border-gray-200'} border text-[10px]`}>
                            {ROLE_LABELS[user.role] || user.role}
                          </Badge>
                          <Button size="sm" disabled={isAssigning} className="bg-violet-600 text-white h-6 text-xs">
                            <Check className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {searchEmail.length >= 3 && !isSearching && searchResults.length === 0 && (
                  <p className="text-xs text-violet-500 text-center py-2">
                    No se encontraron usuarios. Crea uno nuevo con el botón de arriba.
                  </p>
                )}
              </div>
            )}

            {/* Create new user */}
            {showCreateUser && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-violet-400">Nombre completo *</Label>
                  <Input
                    placeholder="Juan Pérez"
                    value={newAdminData.name}
                    onChange={e => setNewAdminData(d => ({ ...d, name: e.target.value }))}
                    className="bg-slate-800 border-violet-700/30 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-violet-400">Email *</Label>
                  <Input
                    type="email"
                    placeholder="juan@empresa.com"
                    value={newAdminData.email}
                    onChange={e => setNewAdminData(d => ({ ...d, email: e.target.value }))}
                    className="bg-slate-800 border-violet-700/30 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-violet-400">Contraseña * (mín. 6 caracteres)</Label>
                  <Input
                    type="password"
                    placeholder="••••••"
                    value={newAdminData.password}
                    onChange={e => setNewAdminData(d => ({ ...d, password: e.target.value }))}
                    className="bg-slate-800 border-violet-700/30 text-white"
                  />
                </div>
                <p className="text-[10px] text-violet-500">
                  Se creará el usuario con rol <strong>Administrador</strong> y se asignará a esta empresa.
                </p>
              </div>
            )}

            {/* Footer actions */}
            <div className="flex gap-2 justify-end pt-2 border-t border-violet-800/20">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAssigningAdminTo(null)
                  setShowCreateUser(false)
                  setNewAdminData({ name: '', email: '', password: '' })
                  setSearchEmail('')
                  setSearchResults([])
                }}
                className="border-violet-700/50 text-violet-300"
              >
                Cancelar
              </Button>
              {showCreateUser && (
                <Button
                  size="sm"
                  onClick={handleCreateAndAssignAdmin}
                  disabled={isAssigning || !newAdminData.name.trim() || !newAdminData.email.trim() || newAdminData.password.length < 6}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                >
                  {isAssigning ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Plus className="h-3 w-3 mr-1" />}
                  Crear y asignar
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
  
// v3.0.11 deployed
