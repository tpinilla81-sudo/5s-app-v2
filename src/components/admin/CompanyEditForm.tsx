'use client'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Loader2 } from 'lucide-react'

interface CompanyEditFormData {
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

interface CompanyEditFormProps {
  data: CompanyEditFormData
  onChange: (data: CompanyEditFormData) => void
  loading?: boolean
}

export function CompanyEditForm({ data, onChange, loading }: CompanyEditFormProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 text-violet-400 animate-spin" />
      </div>
    )
  }

  const updateField = (field: keyof CompanyEditFormData, value: any) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-4">
      {/* VERSION BADGE */}
      <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
        v3.0.11 ✅ Formulario completo con CIF, Teléfono y más campos
      </div>

      {/* ─── DATOS BÁSICOS ─── */}
      <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 border border-emerald-500/30">
        <h4 className="text-sm font-semibold text-emerald-300 flex items-center gap-2">
          📋 Datos básicos
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-emerald-400">Nombre *</Label>
            <Input 
              value={data.name} 
              onChange={e => updateField('name', e.target.value)} 
              className="bg-slate-900 border-emerald-700/30 text-white h-9 text-sm"
              placeholder="Nombre de la empresa"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-emerald-400">Sector</Label>
            <Input 
              value={data.sector} 
              onChange={e => updateField('sector', e.target.value)} 
              className="bg-slate-900 border-emerald-700/30 text-white h-9 text-sm"
              placeholder="Ej: Automoción, Hostelería..."
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-emerald-400">Descripción</Label>
          <textarea
            value={data.description}
            onChange={e => updateField('description', e.target.value)}
            className="w-full bg-slate-900 border border-emerald-700/30 text-white text-sm rounded-md px-3 py-2 min-h-[60px] resize-y focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Descripción de la empresa..."
          />
        </div>
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={() => updateField('active', !data.active)}
            className={`relative w-11 h-6 rounded-full transition-colors ${data.active ? 'bg-emerald-600' : 'bg-red-600'}`}
          >
            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${data.active ? 'translate-x-5' : ''}`} />
          </button>
          <span className={`text-sm ${data.active ? 'text-emerald-400' : 'text-red-400'}`}>
            {data.active ? '✓ Empresa activa' : '✗ Empresa inactiva'}
          </span>
        </div>
      </div>

      {/* ─── DATOS FISCALES ─── */}
      <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 border border-blue-500/30">
        <h4 className="text-sm font-semibold text-blue-300 flex items-center gap-2">
          📋 Datos fiscales
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-blue-400">CIF / NIF</Label>
            <Input 
              value={data.nif || ''} 
              onChange={e => updateField('nif', e.target.value)} 
              className="bg-slate-900 border-blue-700/30 text-white h-9 text-sm"
              placeholder="B12345678"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-blue-400">Web</Label>
            <Input 
              value={data.website || ''} 
              onChange={e => updateField('website', e.target.value)} 
              className="bg-slate-900 border-blue-700/30 text-white h-9 text-sm"
              placeholder="https://www.ejemplo.com"
            />
          </div>
        </div>
      </div>

      {/* ─── DIRECCIÓN ─── */}
      <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 border border-purple-500/30">
        <h4 className="text-sm font-semibold text-purple-300 flex items-center gap-2">
          📍 Dirección
        </h4>
        <div className="space-y-1">
          <Label className="text-xs text-purple-400">Dirección</Label>
          <Input 
            value={data.address || ''} 
            onChange={e => updateField('address', e.target.value)} 
            className="bg-slate-900 border-purple-700/30 text-white h-9 text-sm"
            placeholder="Calle/Avenida, número, piso..."
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-purple-400">Ciudad</Label>
            <Input 
              value={data.city || ''} 
              onChange={e => updateField('city', e.target.value)} 
              className="bg-slate-900 border-purple-700/30 text-white h-9 text-sm"
              placeholder="Ciudad"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-purple-400">Provincia</Label>
            <Input 
              value={data.province || ''} 
              onChange={e => updateField('province', e.target.value)} 
              className="bg-slate-900 border-purple-700/30 text-white h-9 text-sm"
              placeholder="Provincia"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-purple-400">C.P.</Label>
            <Input 
              value={data.postalCode || ''} 
              onChange={e => updateField('postalCode', e.target.value)} 
              className="bg-slate-900 border-purple-700/30 text-white h-9 text-sm"
              placeholder="28001"
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-purple-400">País</Label>
          <Input 
            value={data.country || ''} 
            onChange={e => updateField('country', e.target.value)} 
            className="bg-slate-900 border-purple-700/30 text-white h-9 text-sm"
            placeholder="España"
          />
        </div>
      </div>

      {/* ─── CONTACTO ─── */}
      <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 border border-amber-500/30">
        <h4 className="text-sm font-semibold text-amber-300 flex items-center gap-2">
          📞 Contacto
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-amber-400">Teléfono</Label>
            <Input 
              value={data.phone || ''} 
              onChange={e => updateField('phone', e.target.value)} 
              className="bg-slate-900 border-amber-700/30 text-white h-9 text-sm"
              placeholder="+34 600 000 000"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-amber-400">Email de contacto</Label>
            <Input 
              type="email"
              value={data.contactEmail || ''} 
              onChange={e => updateField('contactEmail', e.target.value)} 
              className="bg-slate-900 border-amber-700/30 text-white h-9 text-sm"
              placeholder="contacto@empresa.com"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-amber-400">Persona de contacto</Label>
            <Input 
              value={data.contactName || ''} 
              onChange={e => updateField('contactName', e.target.value)} 
              className="bg-slate-900 border-amber-700/30 text-white h-9 text-sm"
              placeholder="Nombre del contacto"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-amber-400">Teléfono contacto</Label>
            <Input 
              value={data.contactPhone || ''} 
              onChange={e => updateField('contactPhone', e.target.value)} 
              className="bg-slate-900 border-amber-700/30 text-white h-9 text-sm"
              placeholder="+34 600 000 000"
            />
          </div>
        </div>
      </div>

      {/* ─── FACTURACIÓN ─── */}
      <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 border border-pink-500/30">
        <h4 className="text-sm font-semibold text-pink-300 flex items-center gap-2">
          🧾 Datos de facturación
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-pink-400">Razón social</Label>
            <Input 
              value={data.billingName || ''} 
              onChange={e => updateField('billingName', e.target.value)} 
              className="bg-slate-900 border-pink-700/30 text-white h-9 text-sm"
              placeholder="Empresa SL"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-pink-400">CIF facturación</Label>
            <Input 
              value={data.billingNif || ''} 
              onChange={e => updateField('billingNif', e.target.value)} 
              className="bg-slate-900 border-pink-700/30 text-white h-9 text-sm"
              placeholder="B12345678"
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-pink-400">Dirección facturación</Label>
          <Input 
            value={data.billingAddress || ''} 
            onChange={e => updateField('billingAddress', e.target.value)} 
            className="bg-slate-900 border-pink-700/30 text-white h-9 text-sm"
            placeholder="Dirección de facturación"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-pink-400">Ciudad</Label>
            <Input 
              value={data.billingCity || ''} 
              onChange={e => updateField('billingCity', e.target.value)} 
              className="bg-slate-900 border-pink-700/30 text-white h-9 text-sm"
              placeholder="Ciudad"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-pink-400">C.P.</Label>
            <Input 
              value={data.billingPostalCode || ''} 
              onChange={e => updateField('billingPostalCode', e.target.value)} 
              className="bg-slate-900 border-pink-700/30 text-white h-9 text-sm"
              placeholder="28001"
            />
          </div>
          <div className="space-y-1 sm:col-span-1">
            <Label className="text-xs text-pink-400">Email facturación</Label>
            <Input 
              type="email"
              value={data.billingEmail || ''} 
              onChange={e => updateField('billingEmail', e.target.value)} 
              className="bg-slate-900 border-pink-700/30 text-white h-9 text-sm"
              placeholder="factura@empresa.com"
            />
          </div>
        </div>
      </div>

      {/* ─── BANCARIO ─── */}
      <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 border border-cyan-500/30">
        <h4 className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
          🏦 Datos bancarios
        </h4>
        <div className="space-y-1 max-w-md">
          <Label className="text-xs text-cyan-400">IBAN</Label>
          <Input 
            value={data.iban || ''} 
            onChange={e => updateField('iban', e.target.value)} 
            className="bg-slate-900 border-cyan-700/30 text-white h-9 text-sm font-mono"
            placeholder="ES00 0000 0000 0000 0000 0000"
          />
        </div>
      </div>
    </div>
  )
}
