'use client'

import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Loader2, Save, Building2, Users, Shield, Mail, Phone, Key, AlertTriangle, RefreshCw, Eye, EyeOff, Lock, CheckCircle2, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'

interface FullEditCompanyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  companyId: string | null
}

interface AdminInfo {
  id: string
  name: string
  email: string
  role: string
  active: boolean
  joinedAt: string
  plainPassword?: string  // Contraseña en texto plano
}

export function FullEditCompanyModal({ open, onOpenChange, companyId }: FullEditCompanyModalProps) {
  const [data, setData] = useState({
    name: '',
    description: '',
    active: true,
    nif: '',
    sector: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'España',
    phone: '',
    website: '',
    billingEmail: '',
    billingName: '',
    billingNif: '',
    billingAddress: '',
    billingCity: '',
    billingPostalCode: '',
    iban: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  })
  
  const [admin, setAdmin] = useState<AdminInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<string>('')
  
  // Estados para la contraseña del admin
  const [showPassword, setShowPassword] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [resettingPassword, setResettingPassword] = useState(false)

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setError(null)
      setErrorDetails('')
      setLoading(false)
      setShowPassword(false)
      setIsEditingPassword(false)
      setNewPassword('')
      setResettingPassword(false)
    }
  }, [open])

  // Cargar datos cuando se abre el modal
  useEffect(() => {
    if (open && companyId) {
      loadCompanyData(companyId)
    }
  }, [open, companyId])

  const loadCompanyData = async (id: string) => {
    setLoading(true)
    setError(null)
    setErrorDetails('')
    console.log('[FullEditModal] Cargando empresa:', id)
    
    try {
      const response = await fetch(`/api/companies/${id}`, { 
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      
      console.log('[FullEditModal] Response status:', response.status)
      
      const result = await response.json()
      console.log('[FullEditModal] Respuesta API:', result)
      
      if (!response.ok) {
        // Manejar diferentes tipos de error
        let errorMsg = result.error || result.details || `Error ${response.status}`
        let details = result.details || result.stack || ''
        
        if (response.status === 401) {
          errorMsg = 'No autorizado - Sesión expirada'
          details = 'Tu sesión ha expirado. Por favor, recarga la página e inicia sesión nuevamente.'
        } else if (response.status === 403) {
          errorMsg = 'Sin permisos'
          details = 'No tienes permisos para ver esta empresa. Necesitas rol de Gestor o Admin.'
        } else if (response.status === 404) {
          errorMsg = 'Empresa no encontrada'
          details = 'La empresa ya no existe o fue eliminada.'
        }
        
        throw new Error(errorMsg + (details ? ` | ${details}` : ''))
      }
      
      const company = result.company || result
      if (company && company.name) {
        console.log('[FullEditModal] Datos empresa cargados:', company.name)
        setData({
          name: company.name || '',
          description: company.description || '',
          active: company.active !== undefined ? company.active : true,
          nif: company.nif || '',
          sector: company.sector || '',
          address: company.address || '',
          city: company.city || '',
          province: company.province || '',
          postalCode: company.postalCode || '',
          country: company.country || 'España',
          phone: company.phone || '',
          website: company.website || '',
          billingEmail: company.billingEmail || '',
          billingName: company.billingName || '',
          billingNif: company.billingNif || '',
          billingAddress: company.billingAddress || '',
          billingCity: company.billingCity || '',
          billingPostalCode: company.billingPostalCode || '',
          iban: company.iban || '',
          contactName: company.contactName || '',
          contactEmail: company.contactEmail || '',
          contactPhone: company.contactPhone || ''
        })

        // Buscar administrador entre los miembros
        if (company.members && Array.isArray(company.members)) {
          const adminMember = company.members.find((m: any) => 
            m.role === 'admin' || m.user?.role === 'admin'
          )
          if (adminMember && adminMember.user) {
            console.log('[FullEditModal] Admin encontrado:', adminMember.user.name)
            const adminData = {
              id: adminMember.user.id,
              name: adminMember.user.name,
              email: adminMember.user.email,
              role: adminMember.user.role,
              active: adminMember.user.active !== false, // default true
              joinedAt: adminMember.joinedAt,
              plainPassword: adminMember.user.plainPassword || adminMember.user.password || ''  // Contraseña en texto plano
            }
            console.log('[FullEditModal] Contraseña incluida:', adminData.plainPassword ? 'SÍ (' + adminData.plainPassword.length + ' chars)' : 'NO')
            setAdmin(adminData)
          } else {
            console.log('[FullEditModal] No se encontró admin en miembros:', company.members.length, 'miembros')
            setAdmin(null)
          }
        }
      } else {
        throw new Error('Datos de empresa inválidos o vacíos')
      }
    } catch (err: any) {
      console.error('[FullEditModal] Error cargando empresa:', err)
      const message = err.message || 'Error desconocido'
      setError(message.includes('|') ? message.split('|')[0] : message)
      setErrorDetails(message.includes('|') ? message.split('|').slice(1).join('|') : '')
      toast.error('Error al cargar: ' + (message.includes('|') ? message.split('|')[0] : message))
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!companyId || !data.name.trim()) {
      toast.error('El nombre es obligatorio')
      return
    }
    
    setSaving(true)
    try {
      console.log('[FullEditModal] Guardando empresa:', data.name)
      console.log('[FullEditModal] Datos a enviar:', JSON.stringify(data, null, 2))
      const res = await fetch(`/api/companies/${companyId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      const result = await res.json()
      console.log('[FullEditModal] Respuesta guardado:', result)
      console.log('[FullEditModal] Status:', res.status, res.statusText)
      
      if (res.ok) {
        toast.success('✅ Empresa actualizada correctamente')
        onOpenChange(false)
        window.location.reload()
      } else {
        // Mostrar error detallado
        const errorMsg = result.error || result.details || `Error ${res.status}: ${res.statusText}`
        console.error('[FullEditModal] Error detallado:', errorMsg)
        toast.error(`❌ ${errorMsg}`, { duration: 5000 })
      }
    } catch (error) {
      console.error('[FullEditModal] Error saving:', error)
      toast.error('❌ Error de conexión al guardar')
    }
    
    setSaving(false)
  }

  // Cargar contraseña del administrador
  const loadAdminPassword = async (userId: string) => {
    try {
      console.log('[FullEditModal] Cargando contraseña del admin:', userId)
      const res = await fetch(`/api/users?search=${admin?.email}`, { credentials: 'include' })
      if (res.ok) {
        const result = await res.json()
        if (result.success && result.users && result.users.length > 0) {
          const user = result.users.find((u: any) => u.id === userId)
          if (user && user.plainPassword) {
            console.log('[FullEditModal] Contraseña cargada')
            setAdmin(prev => prev ? { ...prev, plainPassword: user.plainPassword } : null)
          }
        }
      }
    } catch (err) {
      console.error('[FullEditModal] Error cargando contraseña:', err)
    }
  }

  // Restablecer/cambiar contraseña del admin
  const handleResetPassword = async () => {
    if (!admin) return
    
    // Si no estamos en modo edición, entrar en modo edición
    if (!isEditingPassword) {
      setIsEditingPassword(true)
      setNewPassword(admin.plainPassword || '')
      return
    }
    
    // Guardar nueva contraseña
    if (!newPassword || newPassword.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }
    
    setResettingPassword(true)
    try {
      console.log('[FullEditModal] Reseteando contraseña para:', admin.id)
      const res = await fetch('/api/users', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: admin.id,
          password: newPassword
        })
      })
      
      const result = await res.json()
      if (res.ok) {
        toast.success('✅ Contraseña actualizada correctamente')
        setAdmin(prev => prev ? { ...prev, plainPassword: newPassword } : null)
        setIsEditingPassword(false)
        setNewPassword('')
      } else {
        toast.error(result.error || 'Error al actualizar contraseña')
      }
    } catch (error) {
      console.error('[FullEditModal] Error reseteando contraseña:', error)
      toast.error('Error de conexión')
    }
    
    setResettingPassword(false)
  }

  // Generar contraseña aleatoria
  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%'
    let password = ''
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewPassword(password)
    toast.info('Contraseña aleatoria generada')
  }

  const updateField = (field: string, value: string | boolean) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-lg -m-6 mb-4">
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <Building2 className="h-6 w-6" />
            ✏️ Editar Empresa: {data.name || 'Cargando...'}
          </DialogTitle>
          <p className="text-blue-100 text-sm mt-1">Modifica todos los datos de la empresa</p>
        </DialogHeader>
        
        {error ? (
          <div className="py-8 px-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-red-700 mb-2">⚠️ {error}</h3>
              {errorDetails && (
                <div className="mt-3 p-3 bg-red-100 rounded-md text-left">
                  <p className="text-sm text-red-600 font-mono break-all">{errorDetails}</p>
                </div>
              )}
              <div className="flex justify-center gap-3 mt-5">
                <Button 
                  onClick={() => loadCompanyData(companyId!)} 
                  variant="outline"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reintentar
                </Button>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline"
                >
                  Recargar página
                </Button>
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-3" />
            <p className="text-slate-600 font-medium">Cargando datos de la empresa...</p>
            <p className="text-slate-400 text-sm mt-1">Por favor espera un momento</p>
          </div>
        ) : (
          <div className="space-y-5 p-2">
            
            {/* 👤 SECCIÓN ADMINISTRADOR ASIGNADO */}
            <section className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-lg p-4">
              <h3 className="font-bold text-violet-700 mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                👤 Administrador Asignado
              </h3>
              {admin ? (
                <div className="bg-white rounded-lg p-4 border border-violet-100 space-y-4">
                  {/* Fila principal: Nombre y Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                      <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-violet-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-slate-500 uppercase font-semibold">Nombre completo</p>
                        <p className="font-bold text-slate-800 truncate">{admin.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-slate-500 uppercase font-semibold">Email de acceso</p>
                        <p className="font-medium text-slate-800 truncate">{admin.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Fila de estado y rol */}
                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-violet-100">
                    <Badge className={`${
                      admin.active 
                        ? 'bg-green-100 text-green-700 border-green-300' 
                        : 'bg-red-100 text-red-700 border-red-300'
                    } px-3 py-1`}>
                      {admin.active ? (
                        <><CheckCircle2 className="h-3 w-3 mr-1" /> Cuenta Activa</>
                      ) : (
                        <><EyeOff className="h-3 w-3 mr-1" /> Cuenta Inactiva</>
                      )}
                    </Badge>
                    <Badge className="bg-violet-100 text-violet-700 border-violet-300 px-3 py-1">
                      <Key className="h-3 w-3 mr-1" />
                      Rol: {admin.role === 'admin' ? 'Administrador' : admin.role}
                    </Badge>
                  </div>

                  {/* Sección de Credenciales */}
                  <div className="mt-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2 text-sm">
                      <Lock className="h-4 w-4" />
                      🔐 Credenciales de Acceso
                    </h4>
                    
                    {/* Usuario/Email */}
                    <div className="mb-3">
                      <p className="text-[10px] text-amber-600 uppercase font-semibold mb-1">Usuario (Email)</p>
                      <div className="bg-white p-2.5 rounded border border-amber-200 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                        <p className="font-mono text-slate-700 font-medium text-sm">{admin.email}</p>
                      </div>
                    </div>

                    {/* Contraseña */}
                    <div className="mb-3">
                      <p className="text-[10px] text-amber-600 uppercase font-semibold mb-1">Contraseña</p>
                      
                      {isEditingPassword ? (
                        // Modo edición de contraseña
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Input
                              type={showPassword ? "text" : "password"}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="bg-white border-amber-300 font-mono text-sm"
                              placeholder="Nueva contraseña"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setShowPassword(!showPassword)}
                              className="shrink-0 border-amber-300 text-amber-600 hover:bg-amber-50"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={generateRandomPassword}
                              className="text-xs border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                              🎲 Generar aleatoria
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setIsEditingPassword(false)}
                              className="text-xs border-slate-300 text-slate-600 hover:bg-slate-50"
                            >
                              Cancelar
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              onClick={handleResetPassword}
                              disabled={resettingPassword || !newPassword || newPassword.length < 6}
                              className="text-xs bg-green-600 hover:bg-green-700 text-white"
                            >
                              {resettingPassword ? (
                                <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Guardando...</>
                              ) : (
                                <><Save className="h-3 w-3 mr-1" /> Guardar</>
                              )}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // Modo visualización de contraseña
                        <div className="flex gap-2">
                          <div className="flex-1 bg-white p-2.5 rounded border border-amber-200 flex items-center gap-2">
                            <Key className="h-4 w-4 text-amber-500 shrink-0" />
                            <p className="font-mono text-slate-700 font-medium text-sm flex-1 break-all">
                              {showPassword ? (admin.plainPassword || '••••••••') : '••••••••••••'}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            className="shrink-0 border-amber-300 text-amber-600 hover:bg-amber-50"
                            title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleResetPassword}
                            className="shrink-0 border-blue-300 text-blue-600 hover:bg-blue-50"
                            title="Restablecer/cambiar contraseña"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {!isEditingPassword && (
                      <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Click en 👁️ para ver contraseña o 🔄 para cambiarla
                      </p>
                    )}
                  </div>

                  {/* Fecha de asignación */}
                  <div className="text-xs text-slate-500 pt-2 border-t border-violet-100 flex items-center justify-between">
                    <span>📅 Asignado a esta empresa:</span>
                    <span className="font-medium">
                      {admin.joinedAt ? new Date(admin.joinedAt).toLocaleDateString('es-ES', { 
                        day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'N/A'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-orange-50 rounded-lg p-6 border border-orange-200 text-center">
                  <Users className="h-12 w-12 text-orange-400 mx-auto mb-3" />
                  <p className="text-orange-700 font-bold text-lg">Sin administrador asignado</p>
                  <p className="text-orange-500 text-sm mt-1">Esta empresa no tiene un administrador asignado aún</p>
                </div>
              )}
            </section>

            {/* DATOS BÁSICOS */}
            <section className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
                📋 Datos básicos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-700 font-semibold text-sm">Nombre *</Label>
                  <Input 
                    value={data.name} 
                    onChange={e => updateField('name', e.target.value)} 
                    className="bg-white border-slate-300 mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-slate-700 font-semibold text-sm">Sector</Label>
                  <Input 
                    value={data.sector} 
                    onChange={e => updateField('sector', e.target.value)} 
                    className="bg-white border-slate-300 mt-1" 
                    placeholder="Ej: Automoción"
                  />
                </div>
              </div>
              <div className="mt-3">
                <Label className="text-slate-700 font-semibold text-sm">Descripción</Label>
                <textarea 
                  value={data.description} 
                  onChange={e => updateField('description', e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md p-3 min-h-[70px] mt-1 text-slate-900"
                />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => updateField('active', !data.active)}
                  className={`w-12 h-7 rounded-full transition ${data.active ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  <span className={`block w-5 h-5 bg-white rounded-full transition transform ${data.active ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <span className={`font-medium ${data.active ? 'text-green-700' : 'text-red-700'}`}>
                  {data.active ? '✓ Activa' : '✗ Inactiva'}
                </span>
              </div>
            </section>

            {/* DATOS FISCALES */}
            <section className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                💰 Datos fiscales
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-700 font-semibold text-sm">CIF / NIF</Label>
                  <Input 
                    value={data.nif} 
                    onChange={e => updateField('nif', e.target.value)} 
                    className="bg-white border-slate-300 mt-1" 
                    placeholder="B12345678"
                  />
                </div>
                <div>
                  <Label className="text-slate-700 font-semibold text-sm">Web</Label>
                  <Input 
                    value={data.website} 
                    onChange={e => updateField('website', e.target.value)} 
                    className="bg-white border-slate-300 mt-1" 
                    placeholder="https://..."
                  />
                </div>
              </div>
            </section>

            {/* DIRECCIÓN */}
            <section className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-emerald-700 mb-3 flex items-center gap-2">
                📍 Dirección
              </h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-slate-700 font-semibold text-sm">Dirección</Label>
                  <Input 
                    value={data.address} 
                    onChange={e => updateField('address', e.target.value)} 
                    className="bg-white border-slate-300 mt-1" 
                    placeholder="Calle, número..."
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <Label className="text-slate-700 font-semibold text-xs">Ciudad</Label>
                    <Input value={data.city} onChange={e => updateField('city', e.target.value)} className="bg-white border-slate-300 mt-1" />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-semibold text-xs">Provincia</Label>
                    <Input value={data.province} onChange={e => updateField('province', e.target.value)} className="bg-white border-slate-300 mt-1" />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-semibold text-xs">C.P.</Label>
                    <Input value={data.postalCode} onChange={e => updateField('postalCode', e.target.value)} className="bg-white border-slate-300 mt-1" />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-semibold text-xs">País</Label>
                    <Input value={data.country} onChange={e => updateField('country', e.target.value)} className="bg-white border-slate-300 mt-1" />
                  </div>
                </div>
              </div>
            </section>

            {/* CONTACTO */}
            <section className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-orange-700 mb-3 flex items-center gap-2">
                📞 Contacto
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-700 font-semibold text-sm">Teléfono</Label>
                  <Input 
                    value={data.phone} 
                    onChange={e => updateField('phone', e.target.value)} 
                    className="bg-white border-slate-300 mt-1" 
                    placeholder="+34 600 000 000"
                  />
                </div>
                <div>
                  <Label className="text-slate-700 font-semibold text-sm">Email contacto</Label>
                  <Input 
                    type="email" 
                    value={data.contactEmail} 
                    onChange={e => updateField('contactEmail', e.target.value)} 
                    className="bg-white border-slate-300 mt-1" 
                    placeholder="contacto@empresa.com"
                  />
                </div>
                <div>
                  <Label className="text-slate-700 font-semibold text-sm">Persona contacto</Label>
                  <Input 
                    value={data.contactName} 
                    onChange={e => updateField('contactName', e.target.value)} 
                    className="bg-white border-slate-300 mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-slate-700 font-semibold text-sm">Teléfono contacto</Label>
                  <Input 
                    value={data.contactPhone} 
                    onChange={e => updateField('contactPhone', e.target.value)} 
                    className="bg-white border-slate-300 mt-1" 
                  />
                </div>
              </div>
            </section>

            {/* FACTURACIÓN */}
            <section className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-pink-700 mb-3 flex items-center gap-2">
                🧾 Facturación
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-700 font-semibold text-sm">Razón social</Label>
                  <Input 
                    value={data.billingName} 
                    onChange={e => updateField('billingName', e.target.value)} 
                    className="bg-white border-slate-300 mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-slate-700 font-semibold text-sm">CIF facturación</Label>
                  <Input 
                    value={data.billingNif} 
                    onChange={e => updateField('billingNif', e.target.value)} 
                    className="bg-white border-slate-300 mt-1" 
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-slate-700 font-semibold text-sm">Dirección facturación</Label>
                  <Input 
                    value={data.billingAddress} 
                    onChange={e => updateField('billingAddress', e.target.value)} 
                    className="bg-white border-slate-300 mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-slate-700 font-semibold text-sm">Ciudad</Label>
                  <Input 
                    value={data.billingCity} 
                    onChange={e => updateField('billingCity', e.target.value)} 
                    className="bg-white border-slate-300 mt-1" 
                  />
                </div>
                <div>
                  <Label className="text-slate-700 font-semibold text-sm">C.P.</Label>
                  <Input 
                    value={data.billingPostalCode} 
                    onChange={e => updateField('billingPostalCode', e.target.value)} 
                    className="bg-white border-slate-300 mt-1" 
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-slate-700 font-semibold text-sm">Email facturación</Label>
                  <Input 
                    type="email" 
                    value={data.billingEmail} 
                    onChange={e => updateField('billingEmail', e.target.value)} 
                    className="bg-white border-slate-300 mt-1" 
                  />
                </div>
              </div>
            </section>

            {/* BANCARIO */}
            <section className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-cyan-700 mb-3 flex items-center gap-2">
                🏦 Datos bancarios
              </h3>
              <div className="max-w-md">
                <Label className="text-slate-700 font-semibold text-sm">IBAN</Label>
                <Input 
                  value={data.iban} 
                  onChange={e => updateField('iban', e.target.value)} 
                  className="bg-white border-slate-300 mt-1 font-mono" 
                  placeholder="ES00 0000 0000 0000 0000 0000"
                />
              </div>
            </section>

            {/* BOTONES */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)} 
                className="border-slate-300 text-slate-700"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={saving || !data.name.trim()}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Guardar cambios
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
