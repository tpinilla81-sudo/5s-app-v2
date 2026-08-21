'use client'

import { useState, useEffect, useMemo } from 'react'
import { use5SStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Loader2,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Check,
  Building2,
  MapPin,
  Users,
  ClipboardCheck,
  LogOut,
  ChevronDown,
  Bell,
  BellRing,
  FileText,
  CreditCard,
  User,
  Mail,
  Eye,
  EyeOff,
  Key,
  RefreshCw,
  Wand2,
  AlertTriangle,
  Sparkles,
  HelpCircle,
} from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

const PRESET_COLORS = [
  '#8B5CF6', '#EAB308', '#3B82F6', '#F43F5E',
  '#F97316', '#22C55E', '#06B6D4', '#EC4899',
]

const SECTORS = [
  'Manufactura', 'Automoción', 'Alimentación', 'Farmacéutica', 'Construcción',
  'Energía', 'Telecomunicaciones', 'Transporte', 'Logística', 'Sanidad',
  'Educación', 'Servicios', 'Comercio', 'Hostelería', 'Agricultura',
  'Minería', 'Químico', 'Textil', 'Otros',
]

interface ZoneInput {
  name: string
  // v2.108.15 — Etiqueta opcional que el usuario puede añadir para
  // identificar la zona con un nombre más descriptivo. No reemplaza
  // al name (Z1, Z2...), lo acompaña. Ej: Z1 · Línea de ensamblaje.
  customLabel?: string
  description: string
  color: string
}

interface MemberInput {
  name: string
  email: string
  role: string
  zoneIds: string[]
  password?: string // Generated password shown after creation
  emailSent?: boolean // Track if welcome email was sent
}

import { calculateZonesFromTotals, type SplitResult } from '@/lib/zone-generator'

interface CompanyData {
  id: string
  name: string
  description?: string | null
  nif?: string | null
  sector?: string | null
  address?: string | null
  city?: string | null
  province?: string | null
  postalCode?: string | null
  country?: string | null
  phone?: string | null
  website?: string | null
  billingEmail?: string | null
  billingName?: string | null
  billingNif?: string | null
  billingAddress?: string | null
  billingCity?: string | null
  billingPostalCode?: string | null
  iban?: string | null
  contactName?: string | null
  contactEmail?: string | null
  contactPhone?: string | null
}

export default function ProjectSetup() {
  const { createProject, currentUser, logout } = use5SStore()
  const [step, setStep] = useState(1)
  const [isCreating, setIsCreating] = useState(false)
  const [myCompany, setMyCompany] = useState<CompanyData | null>(null)
  const [isLoadingCompany, setIsLoadingCompany] = useState(true)
  const [unreadNotifs, setUnreadNotifs] = useState(0)
  const [showNotifs, setShowNotifs] = useState(false)
  const [notifs, setNotifs] = useState<any[]>([])
  const [isSavingCompany, setIsSavingCompany] = useState(false)

  // Step 1: Project Info
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')

  // Step 2: Company data (pre-filled from gestor, editable by admin)
  const [companyName, setCompanyName] = useState('')
  const [companyNif, setCompanyNif] = useState('')
  const [companySector, setCompanySector] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [companyCity, setCompanyCity] = useState('')
  const [companyProvince, setCompanyProvince] = useState('')
  const [companyPostalCode, setCompanyPostalCode] = useState('')
  const [companyCountry, setCompanyCountry] = useState('España')
  const [companyPhone, setCompanyPhone] = useState('')
  const [companyWebsite, setCompanyWebsite] = useState('')
  // Billing
  const [billingName, setBillingName] = useState('')
  const [billingNif, setBillingNif] = useState('')
  const [billingEmail, setBillingEmail] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [billingCity, setBillingCity] = useState('')
  const [billingPostalCode, setBillingPostalCode] = useState('')
  const [iban, setIban] = useState('')
  // Contact
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')

  // Step 3: Zones
  const [zones, setZones] = useState<ZoneInput[]>([
    { name: '', description: '', color: PRESET_COLORS[0] },
  ])

  // v2.108.9 — Modo algoritmo de zonificación dentro del wizard
  // v2.108.11 — Simplificado: el usuario solo mete m² totales + empleados totales
  // y pulsa 'Calcular'. El algoritmo propone las zonas (Z1, Z2... Zn) con
  // empleados asignados 1:1 (reutiliza si faltan). Sin tabla editable.
  const [zoneMode, setZoneMode] = useState<'manual' | 'algorithm'>('algorithm')
  const [totalM2, setTotalM2] = useState<string>('')
  const [totalEmpleados, setTotalEmpleados] = useState<string>('')
  const [algorithmResult, setAlgorithmResult] = useState<SplitResult | null>(null)
  const [zoneConfig, setZoneConfig] = useState<{ maxM2PorZona: number; defaultPrefix: string; questionLabels?: { zonas: string } } | null>(null)
  const [loadingZoneConfig, setLoadingZoneConfig] = useState(true)

  // Cargar config del gestor para el algoritmo de zonificación
  useEffect(() => {
    if (step !== 3 || zoneMode !== 'algorithm') return
    let cancelled = false
    const loadConfig = async () => {
      try {
        const res = await fetch('/api/zone-config')
        if (cancelled) return
        if (res.ok) {
          const data = await res.json()
          setZoneConfig({
            maxM2PorZona: data.maxM2PorZona || 800,
            defaultPrefix: data.defaultPrefix || 'Z',
            questionLabels: data.questionLabels,
          })
        }
      } catch (e) {
        console.warn('Zone config load error, using defaults:', e)
        setZoneConfig({ maxM2PorZona: 800, defaultPrefix: 'Z' })
      } finally {
        if (!cancelled) setLoadingZoneConfig(false)
      }
    }
    loadConfig()
    return () => { cancelled = true }
  }, [step, zoneMode])

  // v2.108.16 — Botón 'Calcular': ejecuta el cálculo con el m²
  // input del usuario y el nº de empleados seleccionados en el paso Proyecto.
  // v2.108.16 — Los empleados ya NO se introducen a mano. Se derivan de
  // los companyMembers seleccionados (selectedCompanyMemberEmails.size).
  // No se puede elegir más empleados de los que ya están registrados.
  // v2.108.17 — Solo cuentan los miembros con role === 'empleado'.
  // Admins, gerentes, responsables y auditores NO cuentan para el reparto
  // de zonas — el cálculo de zonas se basa únicamente en los operarios.
  // (empleadosDisponibles se declara más abajo, después de los estados)

  const handleCalculateZones = () => {
    if (!zoneConfig) return
    const m2 = parseFloat(totalM2)
    if (isNaN(m2) || m2 <= 0) {
      alert('Introduce el total de m² del proyecto (mayor que 0).')
      return
    }
    if (empleadosDisponibles === 0) {
      alert('Selecciona al menos un usuario con rol "empleado" en el paso Proyecto para calcular las zonas.')
      return
    }
    const result = calculateZonesFromTotals(
      m2,
      empleadosDisponibles,
      zoneConfig.maxM2PorZona,
      zoneConfig.defaultPrefix
    )
    setAlgorithmResult(result)
  }

  // v2.108.15 — Handler para añadir un customLabel a una zona del resultado.
  // No reemplaza el nombre (Z1, Z2...), lo acompaña. El usuario puede
  // escribir un nombre descriptivo si quiere.
  const updateSubZoneCustomLabel = (tempId: string, customLabel: string) => {
    if (!algorithmResult) return
    setAlgorithmResult({
      ...algorithmResult,
      subZonas: algorithmResult.subZonas.map(sz =>
        sz.tempId === tempId ? { ...sz, customLabel } : sz
      ),
    })
  }

  // Sincronizar resultado del algoritmo con el array `zones` del wizard
  // cuando el usuario pulse 'Aplicar cálculo'
  // v2.108.15 — Propaga también el customLabel si el usuario lo rellenó.
  const applyAlgorithmResult = () => {
    if (!algorithmResult || algorithmResult.subZonas.length === 0) return
    const newZones: ZoneInput[] = algorithmResult.subZonas.map((sz, i) => ({
      name: sz.nombre,
      customLabel: sz.customLabel || '',
      description: '',
      color: PRESET_COLORS[i % PRESET_COLORS.length],
    }))
    setZones(newZones)
    setZoneMode('manual') // Cambiar a manual para que pueda ajustar si quiere
  }

  // Step 4: Team Members
  const [members, setMembers] = useState<MemberInput[]>([])
  const [newMember, setNewMember] = useState<MemberInput>({
    name: '',
    email: '',
    role: 'empleado',
    zoneIds: [], // Will be populated when zones are defined
    password: '',
  })
  const [showMemberPassword, setShowMemberPassword] = useState(false)

  // v2.108.8 — Miembros de la empresa (creados en step 1) y selección para el proyecto (step 2)
  // Los `companyMembers` se crean en el paso de Empresa (datos de contacto + credenciales).
  // En el paso de Proyecto, el admin marca cuáles de estos usuarios se asignan al proyecto.
  const [companyMembers, setCompanyMembers] = useState<MemberInput[]>([])
  const [newCompanyMember, setNewCompanyMember] = useState<MemberInput>({
    name: '',
    email: '',
    role: 'empleado',
    zoneIds: [],
    password: '',
  })
  const [showCompanyMemberPassword, setShowCompanyMemberPassword] = useState(false)
  const [selectedCompanyMemberEmails, setSelectedCompanyMemberEmails] = useState<Set<string>>(new Set())

  // v2.108.17 — Empleados disponibles para el cálculo de zonas:
  // solo miembros con role === 'empleado' que estén seleccionados
  // en el paso Proyecto. Excluye admin/gerente/responsable/auditor.
  const empleadosDisponibles = useMemo(() => {
    return companyMembers.filter(cm =>
      cm.role === 'empleado' && selectedCompanyMemberEmails.has(cm.email)
    ).length
  }, [companyMembers, selectedCompanyMemberEmails])

  // Generate a readable random password (8 chars: letters + digits, no ambiguous 0/O/1/l)
  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    let pwd = ''
    for (let i = 0; i < 8; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewMember(prev => ({ ...prev, password: pwd }))
    setShowMemberPassword(true)
  }

  // v2.108.8 — Generar contraseña para miembros de empresa (mismo algoritmo, distinto estado)
  const generateCompanyMemberPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    let pwd = ''
    for (let i = 0; i < 8; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewCompanyMember(prev => ({ ...prev, password: pwd }))
    setShowCompanyMemberPassword(true)
  }

  // v2.108.8 — Añadir miembro a la empresa (NO al proyecto todavía)
  const handleAddCompanyMember = () => {
    if (!newCompanyMember.name.trim() || !newCompanyMember.email.trim()) return
    if (newCompanyMember.password && newCompanyMember.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    // Validar email duplicado
    if (companyMembers.some(m => m.email.toLowerCase() === newCompanyMember.email.toLowerCase())) {
      alert(`Ya existe un miembro con email ${newCompanyMember.email} en la lista.`)
      return
    }
    setCompanyMembers([...companyMembers, { ...newCompanyMember }])
    // Auto-seleccionar este miembro para el proyecto por defecto
    setSelectedCompanyMemberEmails(prev => new Set(prev).add(newCompanyMember.email))
    setNewCompanyMember({ name: '', email: '', role: 'empleado', zoneIds: [], password: '' })
    setShowCompanyMemberPassword(false)
  }

  const handleRemoveCompanyMember = (index: number) => {
    const removed = companyMembers[index]
    setCompanyMembers(companyMembers.filter((_, i) => i !== index))
    if (removed) {
      setSelectedCompanyMemberEmails(prev => {
        const next = new Set(prev)
        next.delete(removed.email)
        return next
      })
    }
  }

  const toggleSelectCompanyMember = (email: string) => {
    setSelectedCompanyMemberEmails(prev => {
      const next = new Set(prev)
      if (next.has(email)) next.delete(email)
      else next.add(email)
      return next
    })
  }

  // Auto-select all zones when zones change (better to remove than to add)
  useEffect(() => {
    const allZoneIds = zones.map((_, i) => `zone-${i}`)
    setNewMember(prev => ({ ...prev, zoneIds: allZoneIds }))
  }, [zones.length])

  // Fetch the admin's company data on mount
  useEffect(() => {
    const fetchMyCompany = async () => {
      setIsLoadingCompany(true)
      try {
        const res = await fetch('/api/my-company')
        const data = await res.json()
        if (data.success && data.company) {
          const c = data.company
          setMyCompany(c)
          // Pre-fill ALL company data
          setCompanyName(c.name || '')
          setCompanyNif(c.nif || '')
          setCompanySector(c.sector || '')
          setCompanyAddress(c.address || '')
          setCompanyCity(c.city || '')
          setCompanyProvince(c.province || '')
          setCompanyPostalCode(c.postalCode || '')
          setCompanyCountry(c.country || 'España')
          setCompanyPhone(c.phone || '')
          setCompanyWebsite(c.website || '')
          // Billing
          setBillingName(c.billingName || '')
          setBillingNif(c.billingNif || '')
          setBillingEmail(c.billingEmail || '')
          setBillingAddress(c.billingAddress || '')
          setBillingCity(c.billingCity || '')
          setBillingPostalCode(c.billingPostalCode || '')
          setIban(c.iban || '')
          // Contact
          setContactName(c.contactName || '')
          setContactEmail(c.contactEmail || '')
          setContactPhone(c.contactPhone || '')
        }
      } catch (err) {
        console.error('Error fetching my company:', err)
      } finally {
        setIsLoadingCompany(false)
      }
    }
    fetchMyCompany()
  }, [])

  // Fetch notifications
  useEffect(() => {
    if (currentUser?.id) {
      const fetchNotifs = async () => {
        try {
          const res = await fetch(`/api/notifications?userId=${currentUser.id}&unread=true`)
          const data = await res.json()
          if (data.success) {
            setUnreadNotifs(data.data?.length || 0)
          }
        } catch (e) { console.error('Error fetching notifications:', e) }
      }
      fetchNotifs()
      const interval = setInterval(fetchNotifs, 30000)
      return () => clearInterval(interval)
    }
  }, [currentUser?.id])

  // v2.108.12 — Persistencia del wizard en localStorage.
  // El usuario reporta: "introduces los usuarios en empresa, pasas a proyectos
  // y de ahí a zonas, y si no rellenas las zonas desaparece, no guardan los
  // usuarios y hay que volver a meterlos".
  // Solución: cada cambio en cualquiera de los estados del wizard se guarda
  // en localStorage. Al recargar/volver, se restaura todo. Tras crear el
  // proyecto con éxito, se limpia.
  const WIZARD_STORAGE_KEY = 'projectSetup_wizard_v1'

  // Restore on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = window.localStorage.getItem(WIZARD_STORAGE_KEY)
      if (!stored) return
      const s = JSON.parse(stored)
      if (typeof s.step === 'number' && s.step >= 1 && s.step <= 5) setStep(s.step)
      if (typeof s.projectName === 'string') setProjectName(s.projectName)
      if (typeof s.projectDescription === 'string') setProjectDescription(s.projectDescription)
      if (typeof s.companyName === 'string' && s.companyName) setCompanyName(s.companyName)
      if (Array.isArray(s.zones) && s.zones.length > 0) setZones(s.zones)
      if (Array.isArray(s.members)) setMembers(s.members)
      if (Array.isArray(s.companyMembers)) setCompanyMembers(s.companyMembers)
      if (Array.isArray(s.selectedCompanyMemberEmails)) {
        setSelectedCompanyMemberEmails(new Set(s.selectedCompanyMemberEmails))
      }
      if (s.zoneMode === 'manual' || s.zoneMode === 'algorithm') setZoneMode(s.zoneMode)
      if (typeof s.totalM2 === 'string') setTotalM2(s.totalM2)
      if (typeof s.totalEmpleados === 'string') setTotalEmpleados(s.totalEmpleados)
      if (s.algorithmResult !== undefined) setAlgorithmResult(s.algorithmResult)
      // v2.108.12 — También restaurar datos de empresa (NIF, sector, etc.)
      // para no perder lo que el admin ya había tecleado.
      if (typeof s.companyNif === 'string') setCompanyNif(s.companyNif)
      if (typeof s.companySector === 'string') setCompanySector(s.companySector)
      if (typeof s.companyAddress === 'string') setCompanyAddress(s.companyAddress)
      if (typeof s.companyCity === 'string') setCompanyCity(s.companyCity)
      if (typeof s.companyProvince === 'string') setCompanyProvince(s.companyProvince)
      if (typeof s.companyPostalCode === 'string') setCompanyPostalCode(s.companyPostalCode)
      if (typeof s.companyCountry === 'string') setCompanyCountry(s.companyCountry)
      if (typeof s.companyPhone === 'string') setCompanyPhone(s.companyPhone)
      if (typeof s.companyWebsite === 'string') setCompanyWebsite(s.companyWebsite)
      if (typeof s.billingName === 'string') setBillingName(s.billingName)
      if (typeof s.billingNif === 'string') setBillingNif(s.billingNif)
      if (typeof s.billingEmail === 'string') setBillingEmail(s.billingEmail)
      if (typeof s.billingAddress === 'string') setBillingAddress(s.billingAddress)
      if (typeof s.billingCity === 'string') setBillingCity(s.billingCity)
      if (typeof s.billingPostalCode === 'string') setBillingPostalCode(s.billingPostalCode)
      if (typeof s.iban === 'string') setIban(s.iban)
      if (typeof s.contactName === 'string') setContactName(s.contactName)
      if (typeof s.contactEmail === 'string') setContactEmail(s.contactEmail)
      if (typeof s.contactPhone === 'string') setContactPhone(s.contactPhone)
    } catch (e) {
      console.warn('Error restoring wizard state:', e)
    }
  }, [])

  // Persist on every change
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const state = {
        step,
        projectName,
        projectDescription,
        companyName,
        zones,
        members,
        companyMembers,
        selectedCompanyMemberEmails: Array.from(selectedCompanyMemberEmails),
        zoneMode,
        totalM2,
        totalEmpleados,
        algorithmResult,
        companyNif,
        companySector,
        companyAddress,
        companyCity,
        companyProvince,
        companyPostalCode,
        companyCountry,
        companyPhone,
        companyWebsite,
        billingName,
        billingNif,
        billingEmail,
        billingAddress,
        billingCity,
        billingPostalCode,
        iban,
        contactName,
        contactEmail,
        contactPhone,
        // v2.108.12 — Track de versión por si cambiamos el schema en el futuro
        _v: 1,
        _savedAt: Date.now(),
      }
      window.localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.warn('Error persisting wizard state:', e)
    }
  }, [
    step, projectName, projectDescription, companyName,
    zones, members, companyMembers, selectedCompanyMemberEmails,
    zoneMode, totalM2, totalEmpleados, algorithmResult,
    companyNif, companySector, companyAddress, companyCity,
    companyProvince, companyPostalCode, companyCountry,
    companyPhone, companyWebsite,
    billingName, billingNif, billingEmail, billingAddress,
    billingCity, billingPostalCode, iban,
    contactName, contactEmail, contactPhone,
  ])

  // v2.108.12 — Reset del wizard (botón "Empezar de nuevo")
  const handleResetWizard = () => {
    if (!confirm('¿Seguro que quieres empezar de nuevo? Se borrarán todos los datos del wizard (usuarios, zonas, etc.) y no se podrá deshacer.')) return
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(WIZARD_STORAGE_KEY)
    }
    setStep(1)
    setProjectName('')
    setProjectDescription('')
    setZones([{ name: '', description: '', color: PRESET_COLORS[0] }])
    setMembers([])
    setCompanyMembers([])
    setSelectedCompanyMemberEmails(new Set())
    setZoneMode('algorithm')
    setTotalM2('')
    setTotalEmpleados('')
    setAlgorithmResult(null)
    setNewMember({ name: '', email: '', role: 'empleado', zoneIds: [], password: '' })
    setNewCompanyMember({ name: '', email: '', role: 'empleado', zoneIds: [], password: '' })
  }

  // Save company data to DB
  const saveCompanyData = async () => {
    setIsSavingCompany(true)
    try {
      await fetch('/api/my-company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nif: companyNif,
          sector: companySector,
          address: companyAddress,
          city: companyCity,
          province: companyProvince,
          postalCode: companyPostalCode,
          country: companyCountry,
          phone: companyPhone,
          website: companyWebsite,
          billingName,
          billingNif,
          billingEmail,
          billingAddress,
          billingCity,
          billingPostalCode,
          iban,
          contactName,
          contactEmail,
          contactPhone,
        }),
      })
    } catch (err) {
      console.error('Error saving company data:', err)
    } finally {
      setIsSavingCompany(false)
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  const canGoNext = () => {
    switch (step) {
      case 1:
        // v2.108.9 — El nombre de la empresa es obligatorio para avanzar.
        // Si el gestor ya asignó empresa (myCompany), companyName vendrá
        // pre-rellenado. Si no, el admin tiene que teclear uno.
        return companyName.trim() !== ''
      case 2:
        return projectName.trim() !== ''
      case 3:
        return zones.length > 0 && zones.every((z) => z.name.trim() !== '')
      case 4:
        return true
      case 5:
        return true
      default:
        return false
    }
  }

  // ─── Postal code autocomplete (Spain) ─────────────────────────────
  const [cpLoading, setCpLoading] = useState(false)
  const handlePostalCodeChange = async (cp: string) => {
    setCompanyPostalCode(cp)
    // Only search when 5 digits (Spanish CP format)
    if (cp.length === 5 && /^\d{5}$/.test(cp)) {
      setCpLoading(true)
      try {
        const res = await fetch(`https://zip-api.eu/api/v1/info/ES-${cp}`)
        if (res.ok) {
          const data = await res.json()
          if (data.place) setCompanyCity(data.place)
          if (data.admin_name) setCompanyProvince(data.admin_name)
        }
      } catch {
        // Silently ignore — API may be unavailable
      } finally {
        setCpLoading(false)
      }
    }
  }

  const [billingCpLoading, setBillingCpLoading] = useState(false)
  const handleBillingPostalCodeChange = async (cp: string) => {
    setBillingPostalCode(cp)
    if (cp.length === 5 && /^\d{5}$/.test(cp)) {
      setBillingCpLoading(true)
      try {
        const res = await fetch(`https://zip-api.eu/api/v1/info/ES-${cp}`)
        if (res.ok) {
          const data = await res.json()
          if (data.place) setBillingCity(data.place)
        }
      } catch {
        // Silently ignore
      } finally {
        setBillingCpLoading(false)
      }
    }
  }

  const handleNext = async () => {
    // v2.108.7 — Al salir del step 1 (Empresa), guardar datos de la empresa
    // (antes era step 2, ahora es step 1).
    if (step === 1) {
      saveCompanyData() // Fire and forget — don't block navigation
    }
    setStep(step + 1)
  }

  const handleAddZone = () => {
    const nextColor = PRESET_COLORS[zones.length % PRESET_COLORS.length]
    setZones([...zones, { name: '', description: '', color: nextColor }])
  }

  const handleRemoveZone = (index: number) => {
    if (zones.length > 1) {
      setZones(zones.filter((_, i) => i !== index))
    }
  }

  const handleZoneChange = (index: number, field: keyof ZoneInput, value: string) => {
    const updated = [...zones]
    updated[index] = { ...updated[index], [field]: value }
    setZones(updated)
  }

  const handleAddMember = () => {
    if (newMember.name.trim() && newMember.email.trim()) {
      // Validate password if provided (min 6 chars). If empty, backend will use default '123456'.
      if (newMember.password && newMember.password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.')
        return
      }
      setMembers([...members, { ...newMember }])
      // Auto-select ALL zones for the next member (better to remove than to add)
      const allZoneIds = zones.map((_, i) => `zone-${i}`)
      setNewMember({ name: '', email: '', role: 'empleado', zoneIds: allZoneIds, password: '' })
      setShowMemberPassword(false)
    }
  }

  const handleRemoveMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index))
  }

  const handleCreate = async () => {
    // v2.108.9 — Validaciones previas para evitar fallos silenciosos.
    // Antes, si companyName venía vacío (admin sin empresa asignada por el
    // gestor), el POST /api/projects devolvía 400 pero el error se perdía
    // en `createProject` (que solo hacía console.error). El usuario veía
    // el spinner terminar sin feedback y, al actualizar, el proyecto no
    // existía. Ahora validamos antes y mostramos el error al usuario.
    if (!projectName.trim()) {
      alert('El nombre del proyecto es obligatorio.')
      return
    }
    if (!companyName.trim()) {
      alert('El nombre de la empresa es obligatorio. Vuelve al paso 1 (Empresa) e introduce un nombre, o pide al gestor que te asigne una empresa.')
      return
    }

    setIsCreating(true)
    try {
      const result = await createProject({
        name: projectName,
        description: projectDescription || undefined,
        company: companyName,
        companyId: myCompany?.id || undefined,
        zones: zones.map((z) => ({
          name: z.name,
          description: z.description || undefined,
          color: z.color,
        })),
      })

      if (!result.success) {
        alert(`No se pudo crear el proyecto:\n${result.error || 'Error desconocido'}\n\nRevisa los datos e inténtalo de nuevo.`)
        return
      }

      // v2.108.12 — Proyecto creado con éxito: limpiar el localStorage del
      // wizard para que la próxima vez se empiece desde cero.
      if (typeof window !== 'undefined') {
        try { window.localStorage.removeItem(WIZARD_STORAGE_KEY) } catch {}
      }

      // Add additional members (admin is auto-added in createProject)
      const { currentProject } = use5SStore.getState()
      if (currentProject) {
        // v2.108.8 — Los `members` del step 4 (Equipo) se siguen añadiendo
        // por compatibilidad. Pero ahora también añadimos los `companyMembers`
        // seleccionados en step 2 (Proyecto).
        const updatedMembers = [...members]
        for (let i = 0; i < members.length; i++) {
          const member = members[i]
          const realZoneIds: string[] = []
          for (const zId of member.zoneIds) {
            if (zId && zId.startsWith('zone-')) {
              const zoneIndex = parseInt(zId.replace('zone-', ''), 10)
              const realZoneId = currentProject.zones[zoneIndex]?.id
              if (realZoneId) realZoneIds.push(realZoneId)
            }
          }

          const res = await fetch(`/api/projects/${currentProject.id}/members`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: member.email,
              name: member.name,
              role: member.role,
              zoneIds: realZoneIds.length > 0 ? realZoneIds : undefined,
              password: member.password || undefined,
            }),
          })
          const data = await res.json()
          if (data.member?.generatedPassword) {
            updatedMembers[i] = { ...updatedMembers[i], password: data.member.generatedPassword }
          }
        }
        setMembers(updatedMembers)

        // v2.108.8 — Añadir los `companyMembers` seleccionados al proyecto.
        // Si un miembro ya estaba en `members` (mismo email), lo saltamos.
        const membersEmails = new Set(members.map(m => m.email.toLowerCase()))
        for (const cm of companyMembers) {
          if (membersEmails.has(cm.email.toLowerCase())) continue
          if (!selectedCompanyMemberEmails.has(cm.email)) continue

          const res = await fetch(`/api/projects/${currentProject.id}/members`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: cm.email,
              name: cm.name,
              role: cm.role,
              // Sin zoneIds — se asignan zonas después desde el panel
              password: cm.password || undefined,
            }),
          })
          if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            console.warn(`No se pudo añadir ${cm.email} al proyecto:`, err.error || res.status)
          }
        }
      }
    } catch (error) {
      console.error('Error creating project:', error)
      alert(`Error inesperado al crear el proyecto: ${error instanceof Error ? error.message : 'desconocido'}`)
    } finally {
      setIsCreating(false)
    }
  }

  // Send welcome email to a member
  const [sendingEmailTo, setSendingEmailTo] = useState<string | null>(null)
  const handleSendWelcomeEmail = async (member: MemberInput) => {
    setSendingEmailTo(member.email)
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'admin_welcome',
          adminName: member.name,
          adminEmail: member.email,
          adminPassword: member.password || '',
          companyName: companyName,
          gestorEmail: currentUser?.email || undefined,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setMembers(members.map(m => m.email === member.email ? { ...m, emailSent: true } : m))
        if (data.testingMode) {
          alert(`Email enviado en modo prueba.\nEn producción iría a: ${member.email}\nContenido: contraseña = ${member.password || '123456'}`)
        }
      } else {
        alert('Error al enviar email: ' + (data.error || 'Desconocido'))
      }
    } catch (err) {
      console.error('Error sending welcome email:', err)
    } finally {
      setSendingEmailTo(null)
    }
  }

  const getRoleLabel = (role: string) => {
    const map: Record<string, string> = {
      admin: 'Administrador',
      gerente: 'Gerente',
      responsable: 'Responsable',
      empleado: 'Empleado',
      auditor: 'Auditor',
    }
    return map[role] || role
  }

  const getRoleBadgeColor = (role: string) => {
    const map: Record<string, string> = {
      admin: 'bg-purple-100 text-purple-700 border-purple-200',
      gerente: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      responsable: 'bg-blue-100 text-blue-700 border-blue-200',
      empleado: 'bg-green-100 text-green-700 border-green-200',
      auditor: 'bg-orange-100 text-orange-700 border-orange-200',
    }
    return map[role] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  // v2.108.7 — Orden invertido: Empresa primero, luego Proyecto.
  // 5 steps: Empresa → Proyecto → Zonas → Equipo → Confirmar
  const stepIcons = [Building2, CreditCard, MapPin, Users, ClipboardCheck]
  const stepLabels = ['Empresa', 'Proyecto', 'Zonas', 'Equipo', 'Confirmar']
  const totalSteps = 5

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* ── Top Navigation Bar ── */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <img src="/5s-logo.png" alt="5S" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-sm font-black text-gray-900 leading-tight tracking-wide">5S</h1>
              <span className="text-[10px] font-semibold text-green-600">Configurar Proyecto</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Notifications */}
            <Button variant={unreadNotifs > 0 ? 'default' : 'outline'} size="sm"
              className={`relative gap-1 text-[10px] h-7 ${unreadNotifs > 0 ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500' : 'border-orange-300 text-orange-600 hover:bg-orange-50'}`}
              onClick={async () => {
                if (currentUser?.id) {
                  try {
                    const res = await fetch(`/api/notifications?userId=${currentUser.id}&unread=true`)
                    const data = await res.json()
                    if (data.success) setNotifs(data.data || [])
                  } catch (e) { console.error(e) }
                }
                setShowNotifs(!showNotifs)
              }}>
              {unreadNotifs > 0 ? <BellRing className="h-3.5 w-3.5" /> : <Bell className="h-3 w-3" />}
              <span className="hidden sm:inline">{unreadNotifs > 0 ? `${unreadNotifs} avisos` : 'Avisos'}</span>
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center animate-pulse">{unreadNotifs > 9 ? '9+' : unreadNotifs}</span>
              )}
            </Button>
            {/* Manual */}
            <Button variant="ghost" size="sm" onClick={async () => {
              try {
                const res = await fetch('/api/manual')
                if (!res.ok) throw new Error('Download failed')
                const blob = await res.blob()
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url; link.download = 'Manual_Usuario_5S.pdf'
                document.body.appendChild(link); link.click()
                document.body.removeChild(link)
                window.URL.revokeObjectURL(url)
              } catch { window.open('/Manual_Usuario_5S.pdf', '_blank') }
            }} className="text-purple-600 hover:text-purple-700 h-7 px-1.5">
              <FileText className="h-3.5 w-3.5" />
              <span className="text-[10px] hidden sm:inline">Manual</span>
            </Button>
            {/* User menu */}
            {currentUser && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1 h-7 px-2">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-[9px] font-bold">
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
                    <Badge className={`${getRoleBadgeColor('admin')} border mt-1 text-[10px]`}>
                      Administrador
                    </Badge>
                    {myCompany && (
                      <p className="text-[10px] text-muted-foreground mt-1">{myCompany.name}</p>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer text-xs">
                    <LogOut className="h-3 w-3 mr-1" /> Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      {/* Notification dropdown */}
      {showNotifs && (
        <div className="fixed top-12 right-16 z-50 w-80 bg-white border rounded-lg shadow-xl max-h-96 overflow-y-auto">
          <div className="p-3 border-b flex items-center justify-between">
            <span className="text-sm font-semibold">Notificaciones</span>
            {notifs.length > 0 && (
              <button className="text-[10px] text-blue-600 hover:underline" onClick={async () => {
                if (currentUser?.id) {
                  await fetch('/api/notifications', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ markAllRead: true, userId: currentUser.id }) })
                  setUnreadNotifs(0)
                  setNotifs(notifs.map(n => ({ ...n, read: true })))
                }
              }}>Marcar todo como leído</button>
            )}
          </div>
          {notifs.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">No hay notificaciones</div>
          ) : (
            <div className="divide-y">
              {notifs.map((n: any) => (
                <div key={n.id} className={`p-3 text-xs ${!n.read ? 'bg-blue-50' : ''}`}>
                  <p className="font-medium">{n.title || n.type}</p>
                  <p className="text-muted-foreground mt-0.5">{n.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step Indicator */}
      <div className="max-w-3xl mx-auto w-full px-4 pt-6">
        {/* v2.108.12 — Banner de auto-guardado + botón Reiniciar */}
        <div className="flex items-center justify-between mb-3 text-[11px]">
          <span className="inline-flex items-center gap-1 text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Borrador guardado automáticamente
          </span>
          <button
            type="button"
            onClick={handleResetWizard}
            className="text-muted-foreground hover:text-red-600 underline-offset-2 hover:underline transition-colors"
            title="Borrar todos los datos del wizard y empezar desde cero"
          >
            Empezar de nuevo
          </button>
        </div>
        <div className="flex items-center justify-between mb-8">
          {stepLabels.map((label, i) => {
            const Icon = stepIcons[i]
            const stepNum = i + 1
            const isActive = step === stepNum
            const isCompleted = step > stepNum
            return (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      isCompleted
                        ? 'bg-green-500 text-white shadow-md shadow-green-200'
                        : isActive
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md shadow-green-200'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
                  </div>
                  {i < totalSteps - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${
                    isActive ? 'text-green-600' : isCompleted ? 'text-green-500' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 pb-8">

          {/* ── Step 1: Company Data (v2.108.7 — invertido, empresa primero) ── */}
          {step === 1 && (
            <div className="space-y-4">
              <Card className="border-0 shadow-lg shadow-green-100/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-green-500" />
                    Datos de la Empresa
                  </CardTitle>
                  <CardDescription>
                    Todos los campos son opcionales. Puedes completarlos más tarde. El nombre ya viene rellenado por el gestor.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Company info banner */}
                  {isLoadingCompany ? (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                      <Loader2 className="h-4 w-4 text-green-500 animate-spin" />
                      <span className="text-sm text-green-700">Cargando datos de tu empresa...</span>
                    </div>
                  ) : myCompany ? (
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-800">Tu empresa: {myCompany.name}</span>
                      </div>
                      {myCompany.nif && <p className="text-xs text-green-600 ml-6">NIF: {myCompany.nif}</p>}
                      {myCompany.sector && <p className="text-xs text-green-600 ml-6">Sector: {myCompany.sector}</p>}
                    </div>
                  ) : null}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1 sm:col-span-2">
                      <Label className="text-xs">Nombre de la Empresa</Label>
                      <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} readOnly={!!myCompany} className={myCompany ? 'bg-gray-50 cursor-not-allowed' : ''} />
                      {myCompany && <p className="text-[10px] text-muted-foreground">Asignada por el gestor</p>}
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">NIF / CIF</Label>
                      <Input placeholder="Ej: B12345678" value={companyNif} onChange={(e) => setCompanyNif(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Sector</Label>
                      <Select value={companySector} onValueChange={setCompanySector}>
                        <SelectTrigger><SelectValue placeholder="Selecciona sector" /></SelectTrigger>
                        <SelectContent>
                          {SECTORS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <Label className="text-xs">Dirección</Label>
                      <Input placeholder="Calle, número, piso..." value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Código Postal</Label>
                      <div className="relative">
                        <Input placeholder="Ej: 28001" value={companyPostalCode} onChange={(e) => handlePostalCodeChange(e.target.value)} maxLength={5} />
                        {cpLoading && <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500 animate-spin" />}
                      </div>
                      <p className="text-[10px] text-muted-foreground">Al escribir 5 dígitos se autocompletará ciudad y provincia</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Ciudad</Label>
                      <Input placeholder="Ej: Madrid" value={companyCity} onChange={(e) => setCompanyCity(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Provincia</Label>
                      <Input placeholder="Ej: Madrid" value={companyProvince} onChange={(e) => setCompanyProvince(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">País</Label>
                      <Input value={companyCountry} onChange={(e) => setCompanyCountry(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Teléfono</Label>
                      <Input placeholder="Ej: +34 91 123 4567" value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Sitio Web</Label>
                      <Input placeholder="Ej: www.empresa.com" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-blue-100/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-blue-500" />
                    Datos de Facturación
                  </CardTitle>
                  <CardDescription>
                    Opcional — Puedes completarlos más tarde desde la configuración
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Razón Social (Facturación)</Label>
                      <Input placeholder="Nombre legal de la empresa" value={billingName} onChange={(e) => setBillingName(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">NIF de Facturación</Label>
                      <Input placeholder="NIF para facturación" value={billingNif} onChange={(e) => setBillingNif(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Email de Facturación</Label>
                      <Input type="email" placeholder="facturacion@empresa.com" value={billingEmail} onChange={(e) => setBillingEmail(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">IBAN (Domiciliación)</Label>
                      <Input placeholder="ES12 3456 7890 1234 5678 9012" value={iban} onChange={(e) => setIban(e.target.value)} />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <Label className="text-xs">Dirección de Facturación</Label>
                      <Input placeholder="Dirección de facturación" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Ciudad (Facturación)</Label>
                      <Input placeholder="Ciudad" value={billingCity} onChange={(e) => setBillingCity(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Código Postal (Facturación)</Label>
                      <div className="relative">
                        <Input placeholder="CP" value={billingPostalCode} onChange={(e) => handleBillingPostalCodeChange(e.target.value)} maxLength={5} />
                        {billingCpLoading && <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500 animate-spin" />}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-purple-100/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-purple-500" />
                    Persona de Contacto
                  </CardTitle>
                  <CardDescription>
                    Opcional — Puedes completarlos más tarde
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Nombre</Label>
                      <Input placeholder="Nombre completo" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Email</Label>
                      <Input type="email" placeholder="contacto@empresa.com" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Teléfono</Label>
                      <Input placeholder="+34 600 123 456" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* v2.108.8 — Miembros de la empresa */}
              <Card className="border-0 shadow-lg shadow-emerald-100/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-500" />
                    Miembros de la Empresa
                  </CardTitle>
                  <CardDescription>
                    Crea los usuarios de la empresa aquí. En el paso de Proyecto elegirás cuáles se asignan a este proyecto.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentUser && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                          {currentUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-emerald-900">{currentUser.name} (Tú)</p>
                          <p className="text-xs text-emerald-600">{currentUser.email}</p>
                        </div>
                        <Badge className={`${getRoleBadgeColor('admin')} border`}>Administrador</Badge>
                      </div>
                    </div>
                  )}

                  {/* Form para añadir miembro de empresa */}
                  <div className="p-4 rounded-lg border bg-white space-y-3">
                    <p className="text-sm font-medium">Agregar miembro a la empresa</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Nombre</Label>
                        <Input placeholder="Nombre del miembro" value={newCompanyMember.name}
                          onChange={(e) => setNewCompanyMember({ ...newCompanyMember, name: e.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Email</Label>
                        <Input type="email" placeholder="email@ejemplo.com" value={newCompanyMember.email}
                          onChange={(e) => setNewCompanyMember({ ...newCompanyMember, email: e.target.value })} />
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <Label className="text-xs">Rol</Label>
                        <Select value={newCompanyMember.role} onValueChange={(value) => setNewCompanyMember({ ...newCompanyMember, role: value })}>
                          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gerente">Gerente</SelectItem>
                            <SelectItem value="responsable">Responsable</SelectItem>
                            <SelectItem value="empleado">Empleado</SelectItem>
                            <SelectItem value="auditor">Auditor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <Label className="text-xs flex items-center gap-1">
                          <Key className="h-3 w-3" />
                          Contraseña de acceso
                        </Label>
                        <div className="flex gap-1.5">
                          <div className="relative flex-1">
                            <Input
                              type={showCompanyMemberPassword ? 'text' : 'password'}
                              placeholder="Dejar vacío para auto-generar (123456)"
                              value={newCompanyMember.password || ''}
                              onChange={(e) => setNewCompanyMember({ ...newCompanyMember, password: e.target.value })}
                              className="pr-8 text-sm font-mono"
                              autoComplete="new-password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCompanyMemberPassword(!showCompanyMemberPassword)}
                              className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              tabIndex={-1}
                            >
                              {showCompanyMemberPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                            </button>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={generateCompanyMemberPassword}
                            title="Generar contraseña aleatoria"
                            className="h-9 px-2"
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          Mínimo 6 caracteres. Si la dejas vacía, se asignará automáticamente <code className="font-mono bg-muted px-1 rounded">123456</code>.
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleAddCompanyMember}
                      disabled={!newCompanyMember.name.trim() || !newCompanyMember.email.trim()}
                      className="w-full border-emerald-300 text-emerald-600 hover:bg-emerald-50">
                      <Plus className="h-4 w-4 mr-2" /> Agregar Miembro a la Empresa
                    </Button>
                  </div>

                  {/* Listado de miembros de empresa creados */}
                  {companyMembers.length > 0 && (
                    <div className="rounded-lg border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Contraseña</TableHead>
                            <TableHead className="w-10" />
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {companyMembers.map((member, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-sm">{member.name}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">{member.email}</TableCell>
                              <TableCell><Badge className={`${getRoleBadgeColor(member.role)} border`}>{getRoleLabel(member.role)}</Badge></TableCell>
                              <TableCell className="text-sm">
                                {member.password ? (
                                  <span className="font-mono text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                                    {member.password}
                                  </span>
                                ) : (
                                  <span className="text-xs text-muted-foreground">auto (123456)</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" onClick={() => handleRemoveCompanyMember(index)}
                                  className="text-red-500 hover:text-red-700 h-8 w-8 p-0">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {companyMembers.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Aún no has añadido miembros a la empresa. Puedes hacerlo más tarde desde el panel.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── Step 2: Project Info (v2.108.7 — invertido, proyecto después) ── */}
          {step === 2 && (
            <div className="space-y-4">
              <Card className="border-0 shadow-lg shadow-green-100/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-green-500" />
                    Información del Proyecto
                  </CardTitle>
                  <CardDescription>
                    Ingresa los datos básicos de tu proyecto 5S
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Company info banner */}
                  {isLoadingCompany ? (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                      <Loader2 className="h-4 w-4 text-green-500 animate-spin" />
                      <span className="text-sm text-green-700">Cargando datos de tu empresa...</span>
                    </div>
                  ) : myCompany ? (
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-800">Tu empresa: {myCompany.name}</span>
                      </div>
                      {myCompany.nif && <p className="text-xs text-green-600 ml-6">NIF: {myCompany.nif}</p>}
                      {myCompany.sector && <p className="text-xs text-green-600 ml-6">Sector: {myCompany.sector}</p>}
                    </div>
                  ) : null}

                  <div className="space-y-2">
                    <Label htmlFor="project-name">Nombre del Proyecto *</Label>
                    <Input
                      id="project-name"
                      placeholder="Ej: Implementación 5S - Planta Principal"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">El nombre identifica este proyecto dentro de tu empresa</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-desc">Descripción (opcional)</Label>
                    <Textarea
                      id="project-desc"
                      placeholder="Describe brevemente el objetivo del proyecto..."
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* v2.108.8 — Selección de miembros de empresa para este proyecto */}
              <Card className="border-0 shadow-lg shadow-emerald-100/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-500" />
                    Asignar Miembros al Proyecto
                  </CardTitle>
                  <CardDescription>
                    Marca qué miembros de la empresa se asignan a este proyecto. Podrás asignar zonas concretas después.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentUser && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-emerald-900">{currentUser.name} (Tú)</p>
                        <p className="text-xs text-emerald-600">{currentUser.email}</p>
                      </div>
                      <Badge className={`${getRoleBadgeColor('admin')} border`}>Administrador · auto</Badge>
                    </div>
                  )}

                  {companyMembers.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No has creado miembros en el paso anterior. Puedes continuar y asignarlos después desde el panel.
                    </p>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-muted-foreground">
                          {selectedCompanyMemberEmails.size} de {companyMembers.length} seleccionados
                        </p>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-7 text-xs"
                            onClick={() => setSelectedCompanyMemberEmails(new Set(companyMembers.map(m => m.email)))}>
                            Todos
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs"
                            onClick={() => setSelectedCompanyMemberEmails(new Set())}>
                            Ninguno
                          </Button>
                        </div>
                      </div>
                      <div className="rounded-lg border divide-y max-h-[400px] overflow-y-auto">
                        {companyMembers.map((member, index) => {
                          const isSelected = selectedCompanyMemberEmails.has(member.email)
                          return (
                            <label
                              key={index}
                              className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-emerald-50 ${isSelected ? 'bg-emerald-50/60' : ''}`}
                            >
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => toggleSelectCompanyMember(member.email)}
                                className="h-4 w-4"
                              />
                              <div className="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-900 text-xs font-bold">
                                {member.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{member.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                              </div>
                              <Badge className={`${getRoleBadgeColor(member.role)} border`}>{getRoleLabel(member.role)}</Badge>
                            </label>
                          )
                        })}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── Step 3: Zones ── */}
          {step === 3 && (
            <Card className="border-0 shadow-lg shadow-green-100/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-500" />
                  Zonas de Trabajo
                </CardTitle>
                <CardDescription>
                  Define las zonas donde se implementará la metodología 5S
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* v2.108.14 — Primero preguntar si el usuario tiene claras las zonas.
                    Si tiene claras → modo Manual.
                    Si no tiene claras → ofrecer cálculo automático (m² + empleados → propuesta). */}
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-blue-900">
                        ¿Tienes claras las zonas?
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        Si ya sabes cuántas zonas necesitas y sus nombres, defínelas manualmente.
                        Si prefieres que la app te sugiera el reparto a partir de m² y empleados, usa el cálculo automático.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setZoneMode('manual')}
                      className={`px-3 py-2.5 rounded-md text-xs font-medium transition-colors border-2 ${
                        zoneMode === 'manual'
                          ? 'bg-green-600 text-white border-green-600 shadow-sm'
                          : 'bg-white text-green-700 border-green-200 hover:bg-green-50'
                      }`}
                    >
                      <Check className="h-3.5 w-3.5 mr-1 inline" /> Sí, las defino manualmente
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoneMode('algorithm')}
                      className={`px-3 py-2.5 rounded-md text-xs font-medium transition-colors border-2 ${
                        zoneMode === 'algorithm'
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
                      }`}
                    >
                      <Wand2 className="h-3.5 w-3.5 mr-1 inline" /> No, usar cálculo automático
                    </button>
                  </div>
                </div>

                {/* ─── MODO CÁLCULO AUTOMÁTICO ─── */}
                {zoneMode === 'algorithm' && (
                  <>
                    {loadingZoneConfig ? (
                      <div className="flex items-center gap-2 p-4 justify-center">
                        <Loader2 className="h-5 w-5 animate-spin text-green-500" />
                        <span className="text-sm text-muted-foreground">Cargando configuración…</span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* v2.108.16 — m² totales: único input.
                            Los empleados se derivan de los usuarios
                            seleccionados en el paso Proyecto. */}
                        <div>
                          <Label className="text-xs font-semibold mb-1.5 block">
                            m² totales del proyecto *
                          </Label>
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            value={totalM2}
                            onChange={(e) => {
                              setTotalM2(e.target.value)
                              // Si cambia el input, invalidar el resultado previo.
                              setAlgorithmResult(null)
                            }}
                            className="h-10"
                            placeholder="Ej: 2400"
                          />
                        </div>

                        {/* v2.108.16 — Contador de empleados disponibles.
                            Viene de los companyMembers seleccionados en
                            el paso Proyecto. No se puede elegir más.
                            v2.108.17 — Solo cuentan los miembros con
                            role === 'empleado'. */}
                        <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 flex items-center gap-3">
                          <Users className="h-5 w-5 text-blue-600 shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-blue-900">
                              Empleados disponibles: {empleadosDisponibles}
                            </p>
                            <p className="text-[11px] text-blue-700 mt-0.5">
                              {empleadosDisponibles > 0
                                ? 'Solo cuentan los usuarios con rol "empleado" seleccionados en el paso Proyecto.'
                                : 'No has seleccionado usuarios con rol "empleado" en el paso Proyecto. Vuelve y marca al menos uno, o el modo Manual.'}
                            </p>
                          </div>
                          {empleadosDisponibles > 0 && (
                            <Badge variant="outline" className="text-[10px] px-1.5 border-blue-300 bg-white text-blue-700">
                              {empleadosDisponibles} empleado(s)
                            </Badge>
                          )}
                        </div>

                        {/* Botón Calcular — deshabilitado si no hay m² o empleados */}
                        <Button
                          onClick={handleCalculateZones}
                          disabled={!totalM2.trim() || parseFloat(totalM2) <= 0 || empleadosDisponibles === 0}
                          className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-300 disabled:cursor-not-allowed"
                          title={
                            !totalM2.trim() || parseFloat(totalM2) <= 0
                              ? 'Introduce los m² totales del proyecto'
                              : empleadosDisponibles === 0
                              ? 'Selecciona usuarios con rol "empleado" en el paso Proyecto'
                              : ''
                          }
                        >
                          <Wand2 className="h-4 w-4 mr-2" /> Calcular zonas
                        </Button>

                        {/* Resultado del cálculo — v2.108.16: solo se muestra
                            si hay m² + empleados. Si no, no aparece nada. */}
                        {totalM2.trim() && parseFloat(totalM2) > 0 && empleadosDisponibles > 0 && algorithmResult && algorithmResult.subZonas.length > 0 ? (
                          <div className="rounded-lg border border-purple-200 bg-purple-50/40 p-3 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-purple-900">
                                Zonas propuestas
                              </span>
                              <span className="text-[11px] text-purple-700">
                                {algorithmResult.subZonas.length} zona(s) · {algorithmResult.empleadosUnicos} empleado(s) único(s)
                              </span>
                            </div>
                            {/* v2.108.14 — NO mostrar m² por zona (es solo para el cálculo interno).
                                El usuario solo ve nº de zonas + reparto de empleados. */}
                            <div className="space-y-1.5">
                              {algorithmResult.subZonas.map((sz) => (
                                <div
                                  key={sz.tempId}
                                  className={`bg-white rounded border px-2 py-1.5 space-y-1.5 ${
                                    sz.empleadoRepetido
                                      ? 'border-amber-200'
                                      : 'border-purple-100'
                                  }`}
                                >
                                  {/* Fila 1: nombre Z1 + badge empleado */}
                                  <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                                    <span className="text-xs font-medium flex-1 truncate">{sz.nombre}</span>
                                    {sz.empleadoIndex >= 0 ? (
                                      <Badge
                                        variant="outline"
                                        className={`text-[10px] px-1.5 ${
                                          sz.empleadoRepetido
                                            ? 'border-amber-300 bg-amber-50 text-amber-700'
                                            : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                                        }`}
                                      >
                                        Empleado {sz.empleadoIndex + 1}
                                        {sz.empleadoRepetido && ' (repite)'}
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-[10px] px-1.5 border-gray-300 bg-gray-50 text-gray-500">
                                        Sin empleado
                                      </Badge>
                                    )}
                                  </div>
                                  {/* v2.108.15 — Input opcional para añadir
                                      un nombre descriptivo a la zona (no
                                      reemplaza Z1/Z2, lo acompaña). */}
                                  <Input
                                    value={sz.customLabel || ''}
                                    onChange={(e) => updateSubZoneCustomLabel(sz.tempId, e.target.value)}
                                    className="h-7 text-[11px]"
                                    placeholder="Añadir nombre opcional (ej: Línea de ensamblaje)"
                                  />
                                </div>
                              ))}
                            </div>
                            {algorithmResult.warnings.length > 0 && (
                              <div className="p-2 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-800 space-y-0.5">
                                {algorithmResult.warnings.map((w, i) => (
                                  <div key={i} className="flex items-start gap-1">
                                    <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                                    <span>{w}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {algorithmResult.empleadosRepetidos > 0 && (
                              <div className="text-[11px] text-amber-700 bg-amber-50/50 rounded p-2">
                                Reparto justo: el empleado repetido se asigna a las zonas más pequeñas.
                              </div>
                            )}
                            <Button
                              onClick={applyAlgorithmResult}
                              className="w-full h-9 text-xs bg-purple-600 hover:bg-purple-700 text-white"
                            >
                              <Sparkles className="h-3 w-3 mr-1" /> Aceptar y crear {algorithmResult.subZonas.length} zona(s)
                            </Button>
                          </div>
                        ) : algorithmResult && algorithmResult.subZonas.length === 0 && totalM2.trim() && parseFloat(totalM2) > 0 && empleadosDisponibles > 0 ? (
                          <div className="rounded-lg border border-dashed border-red-300 bg-red-50 p-3 text-center text-[11px] text-red-700">
                            <AlertTriangle className="h-3.5 w-3.5 inline mr-1" />
                            {algorithmResult.warnings[0] || 'No se pudo calcular. Revisa los valores.'}
                          </div>
                        ) : null}
                      </div>
                    )}
                  </>
                )}

                {/* ─── MODO MANUAL ─── */}
                {zoneMode === 'manual' && (
                      <>
                        {zones.map((zone, index) => (
                          <div key={index} className="p-4 rounded-lg border bg-white space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: zone.color }} />
                                <span className="text-sm font-medium">
                                  Zona {index + 1}
                                  {/* v2.108.15 — Si la zona viene del cálculo con
                                      un customLabel, mostrarlo junto al nombre. */}
                                  {zone.customLabel && (
                                    <span className="text-muted-foreground"> · {zone.customLabel}</span>
                                  )}
                                </span>
                              </div>
                              {zones.length > 1 && (
                                <Button variant="ghost" size="sm" onClick={() => handleRemoveZone(index)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <Label className="text-xs">Nombre *</Label>
                                <Input placeholder="Ej: Línea de ensamblaje" value={zone.name} onChange={(e) => handleZoneChange(index, 'name', e.target.value)} />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Etiqueta opcional</Label>
                                <Input
                                  placeholder="Ej: Línea de ensamblaje"
                                  value={zone.customLabel || ''}
                                  onChange={(e) => handleZoneChange(index, 'customLabel', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Descripción</Label>
                              <Input placeholder="Ej: Área principal de producción" value={zone.description} onChange={(e) => handleZoneChange(index, 'description', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Color</Label>
                              <div className="flex gap-2 flex-wrap">
                                {PRESET_COLORS.map((color) => (
                                  <button key={color} type="button" onClick={() => handleZoneChange(index, 'color', color)}
                                    className={`w-7 h-7 rounded-full border-2 transition-all ${zone.color === color ? 'border-gray-800 scale-110 shadow-md' : 'border-transparent hover:scale-105'}`}
                                    style={{ backgroundColor: color }} />
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" onClick={handleAddZone}
                          className="w-full border-dashed border-green-300 text-green-600 hover:bg-green-50 hover:text-green-700">
                          <Plus className="h-4 w-4 mr-2" /> Agregar Zona
                        </Button>
                      </>
                    )}
                  </CardContent>
            </Card>
          )}

          {/* ── Step 4: Team Members ── */}
          {step === 4 && (
            <Card className="border-0 shadow-lg shadow-green-100/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  Equipo de Trabajo
                </CardTitle>
                <CardDescription>
                  Agrega miembros al proyecto. Tú eres el administrador por defecto.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentUser && (
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-900">{currentUser.name} (Tú)</p>
                        <p className="text-xs text-green-600">{currentUser.email}</p>
                      </div>
                      <Badge className={`${getRoleBadgeColor('admin')} border`}>Administrador</Badge>
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-lg border bg-white space-y-3">
                  <p className="text-sm font-medium">Agregar miembro del equipo</p>

                  {/* v2.108.18 — Desplegable de usuarios ya dados de alta
                      en el paso Empresa (companyMembers). Ya no se meten
                      nombre/email a mano — se elige de la lista. */}
                  {companyMembers.length === 0 ? (
                    <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-center text-xs text-amber-800">
                      No hay usuarios dados de alta en la empresa.
                      Vuelve al paso <strong>Empresa</strong> y añade al menos uno
                      antes de poder asignar miembros al proyecto.
                    </div>
                  ) : (
                    <>
                      <div className="space-y-1">
                        <Label className="text-xs">Seleccionar usuario</Label>
                        <Select
                          value={newMember.email}
                          onValueChange={(email) => {
                            const cm = companyMembers.find(m => m.email === email)
                            if (cm) {
                              setNewMember({
                                ...newMember,
                                name: cm.name,
                                email: cm.email,
                                role: cm.role,
                                password: cm.password || '',
                              })
                            }
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="— Elige un usuario —" />
                          </SelectTrigger>
                          <SelectContent>
                            {companyMembers
                              .filter(cm => !members.some(m => m.email.toLowerCase() === cm.email.toLowerCase()))
                              .map((cm) => (
                                <SelectItem key={cm.email} value={cm.email}>
                                  {cm.name} · {cm.email} ({cm.role})
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        {companyMembers.filter(cm => !members.some(m => m.email.toLowerCase() === cm.email.toLowerCase())).length === 0 && (
                          <p className="text-[11px] text-amber-700 mt-1">
                            Todos los usuarios de la empresa ya están en el equipo.
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Rol</Label>
                          <Select value={newMember.role} onValueChange={(value) => setNewMember({ ...newMember, role: value })}>
                            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gerente">Gerente</SelectItem>
                              <SelectItem value="responsable">Responsable</SelectItem>
                              <SelectItem value="empleado">Empleado</SelectItem>
                              <SelectItem value="auditor">Auditor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Zonas (todas por defecto)</Label>
                          <div className="space-y-0.5 max-h-32 overflow-y-auto border rounded-md p-2">
                            {zones.filter((z) => z.name.trim()).map((zone, i) => (
                              <label key={i} className="flex items-center gap-1.5 text-sm cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5">
                                <Checkbox checked={newMember.zoneIds.includes(`zone-${i}`)}
                                  onCheckedChange={(checked) => {
                                    const zId = `zone-${i}`
                                    if (checked) {
                                      setNewMember({ ...newMember, zoneIds: [...newMember.zoneIds, zId] })
                                    } else {
                                      setNewMember({ ...newMember, zoneIds: newMember.zoneIds.filter(id => id !== zId) })
                                    }
                                  }} className="h-4 w-4" />
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: zone.color }} />
                                <span>{zone.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* v2.108.18 — Contraseña deshabilitada (proviene del
                          usuario dado de alta en el paso Empresa, no se edita aquí). */}
                      <div className="space-y-1">
                        <Label className="text-xs flex items-center gap-1">
                          <Key className="h-3 w-3" />
                          Contraseña de acceso
                        </Label>
                        <Input
                          type="text"
                          value={newMember.password || '— Heredada del paso Empresa —'}
                          disabled
                          className="text-sm font-mono bg-muted/50"
                        />
                        <p className="text-[10px] text-muted-foreground">
                          La contraseña se estableció al dar de alta el usuario en el paso <strong>Empresa</strong>.
                        </p>
                      </div>
                    </>
                  )}

                  <Button variant="outline" onClick={handleAddMember}
                    disabled={!newMember.name.trim() || !newMember.email.trim()}
                    className="w-full border-green-300 text-green-600 hover:bg-green-50">
                    <Plus className="h-4 w-4 mr-2" /> Agregar Miembro
                  </Button>
                </div>

                {members.length > 0 && (
                  <div className="rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead>Zona</TableHead>
                          <TableHead>Contraseña</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="w-10" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {members.map((member, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-sm">{member.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{member.email}</TableCell>
                            <TableCell><Badge className={`${getRoleBadgeColor(member.role)} border`}>{getRoleLabel(member.role)}</Badge></TableCell>
                            <TableCell className="text-sm">
                              {member.zoneIds.length > 0
                                ? member.zoneIds.map(zId => { const idx = parseInt(zId.replace('zone-', ''), 10); return zones[idx]?.name }).filter(Boolean).join(', ')
                                : '-'}
                            </TableCell>
                            <TableCell className="text-sm">
                              {member.password ? (
                                <span className="font-mono text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                                  {member.password}
                                </span>
                              ) : (
                                <span className="text-xs text-muted-foreground">—</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {member.password && !member.emailSent ? (
                                <Button variant="ghost" size="sm"
                                  onClick={() => handleSendWelcomeEmail(member)}
                                  disabled={sendingEmailTo === member.email}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50 h-8 px-2"
                                  title="Enviar email de bienvenida">
                                  {sendingEmailTo === member.email ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                                </Button>
                              ) : member.emailSent ? (
                                <Badge className="bg-green-100 text-green-700 border-green-200 border text-[10px]">Enviado</Badge>
                              ) : null}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" onClick={() => handleRemoveMember(index)}
                                className="text-red-500 hover:text-red-700 h-8 w-8 p-0">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {members.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Puedes agregar miembros más tarde desde la gestión del proyecto
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* ── Step 5: Confirmation ── */}
          {step === 5 && (
            <Card className="border-0 shadow-lg shadow-green-100/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-green-500" />
                  Confirmar Proyecto
                </CardTitle>
                <CardDescription>Revisa la información antes de crear el proyecto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Project */}
                <div className="p-4 rounded-lg bg-gray-50 border">
                  <h3 className="font-semibold text-sm mb-3 text-gray-700 flex items-center gap-2">
                    <Building2 className="h-4 w-4" /> Proyecto
                  </h3>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Nombre:</span><span className="font-medium">{projectName}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Empresa:</span><span className="font-medium">{companyName}</span></div>
                    {companyNif && <div className="flex justify-between"><span className="text-muted-foreground">NIF:</span><span className="font-medium">{companyNif}</span></div>}
                    {projectDescription && <div className="flex justify-between"><span className="text-muted-foreground">Descripción:</span><span className="font-medium text-right max-w-[60%]">{projectDescription}</span></div>}
                  </div>
                </div>

                {/* Billing summary */}
                {(billingName || billingEmail || iban) && (
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <h3 className="font-semibold text-sm mb-3 text-blue-700 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" /> Facturación
                    </h3>
                    <div className="space-y-1.5 text-sm">
                      {billingName && <div className="flex justify-between"><span className="text-blue-600">Razón Social:</span><span className="font-medium">{billingName}</span></div>}
                      {billingNif && <div className="flex justify-between"><span className="text-blue-600">NIF:</span><span className="font-medium">{billingNif}</span></div>}
                      {billingEmail && <div className="flex justify-between"><span className="text-blue-600">Email:</span><span className="font-medium">{billingEmail}</span></div>}
                      {iban && <div className="flex justify-between"><span className="text-blue-600">IBAN:</span><span className="font-medium">{iban}</span></div>}
                    </div>
                  </div>
                )}

                {/* Zones */}
                <div className="p-4 rounded-lg bg-gray-50 border">
                  <h3 className="font-semibold text-sm mb-3 text-gray-700 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Zonas ({zones.filter((z) => z.name.trim()).length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {zones.filter((z) => z.name.trim()).map((zone, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color }} />
                        <span>{zone.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team */}
                <div className="p-4 rounded-lg bg-gray-50 border">
                  <h3 className="font-semibold text-sm mb-3 text-gray-700 flex items-center gap-2">
                    <Users className="h-4 w-4" /> Equipo ({members.length + 1} miembros)
                  </h3>
                  <div className="space-y-2">
                    {currentUser && (
                      <div className="flex items-center justify-between text-sm">
                        <span>{currentUser.name} <span className="text-muted-foreground">(Tú)</span></span>
                        <Badge className={`${getRoleBadgeColor('admin')} border`}>Administrador</Badge>
                      </div>
                    )}
                    {members.map((member, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span>{member.name}</span>
                        <Badge className={`${getRoleBadgeColor(member.role)} border`}>{getRoleLabel(member.role)}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={handleCreate}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg h-12 text-base"
                  disabled={isCreating}>
                  {isCreating ? (
                    <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Creando Proyecto...</>
                  ) : (
                    <><Check className="h-5 w-5 mr-2" /> Crear Proyecto</>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)} disabled={isCreating} className="gap-1">
              <ChevronLeft className="h-4 w-4" /> Anterior
            </Button>
          ) : (
            <Button variant="ghost" onClick={handleLogout} className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-4 w-4" /> Salir
            </Button>
          )}

          {step < totalSteps && (
            <Button onClick={handleNext} disabled={!canGoNext() || isSavingCompany}
              className="gap-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
              {isSavingCompany ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Guardando...</>
              ) : (
                <>Siguiente <ChevronRight className="h-4 w-4" /></>
              )}
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
