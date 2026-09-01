'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'
import { Loader2, Save, ArrowLeft, Building2 } from 'lucide-react'

export default function EditCompanyPage() {
  const params = useParams()
  const router = useRouter()
  const companyId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [companyName, setCompanyName] = useState('')
  
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
    country: '',
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

  useEffect(() => {
    if (companyId) {
      fetch(`/api/companies/${companyId}`)
        .then(r => r.json())
        .then(result => {
          const company = result.company || result
          setCompanyName(company.name || '')
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
            country: company.country || '',
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
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [companyId])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/companies/${companyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (res.ok) {
        router.push('/?tab=empresas')
        router.refresh()
      } else {
        alert('Error al guardar')
      }
    } catch (e) {
      alert('Error de conexión')
    }
    setSaving(false)
  }

  const updateField = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Volver
        </button>
        
        <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">✏️ Editar Empresa</h1>
              <p className="text-emerald-100">{companyName}</p>
            </div>
          </div>
          <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-mono">
            v3.0.11 ✅ Página de edición completa
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* DATOS BÁSICOS */}
        <section className="bg-slate-900 border-2 border-emerald-500 rounded-xl p-6">
          <h2 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
            📋 Datos básicos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-emerald-300">Nombre *</Label>
              <Input value={data.name} onChange={e => updateField('name', e.target.value)} 
                className="bg-slate-800 border-emerald-700 text-white" />
            </div>
            <div>
              <Label className="text-emerald-300">Sector</Label>
              <Input value={data.sector} onChange={e => updateField('sector', e.target.value)} 
                className="bg-slate-800 border-emerald-700 text-white" placeholder="Ej: Automoción" />
            </div>
          </div>
          <div className="mt-4">
            <Label className="text-emerald-300">Descripción</Label>
            <textarea 
              value={data.description} 
              onChange={e => updateField('description', e.target.value)}
              className="w-full bg-slate-800 border border-emerald-700 text-white rounded-md p-3 min-h-[80px]"
            />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => updateField('active', !data.active)}
              className={`w-12 h-7 rounded-full transition ${data.active ? 'bg-emerald-600' : 'bg-red-600'}`}
            >
              <span className={`block w-5 h-5 bg-white rounded-full transition transform ${data.active ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={data.active ? 'text-emerald-400' : 'text-red-400'}>
              {data.active ? '✓ Activa' : '✗ Inactiva'}
            </span>
          </div>
        </section>

        {/* DATOS FISCALES */}
        <section className="bg-slate-900 border-2 border-blue-500 rounded-xl p-6">
          <h2 className="text-lg font-bold text-blue-400 mb-4">📋 Datos fiscales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-blue-300">CIF / NIF</Label>
              <Input value={data.nif} onChange={e => updateField('nif', e.target.value)} 
                className="bg-slate-800 border-blue-700 text-white" placeholder="B12345678" />
            </div>
            <div>
              <Label className="text-blue-300">Web</Label>
              <Input value={data.website} onChange={e => updateField('website', e.target.value)} 
                className="bg-slate-800 border-blue-700 text-white" placeholder="https://..." />
            </div>
          </div>
        </section>

        {/* DIRECCIÓN */}
        <section className="bg-slate-900 border-2 border-purple-500 rounded-xl p-6">
          <h2 className="text-lg font-bold text-purple-400 mb-4">📍 Dirección</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-purple-300">Dirección</Label>
              <Input value={data.address} onChange={e => updateField('address', e.target.value)} 
                className="bg-slate-800 border-purple-700 text-white" placeholder="Calle, número..." />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-purple-300">Ciudad</Label>
                <Input value={data.city} onChange={e => updateField('city', e.target.value)} 
                  className="bg-slate-800 border-purple-700 text-white" />
              </div>
              <div>
                <Label className="text-purple-300">Provincia</Label>
                <Input value={data.province} onChange={e => updateField('province', e.target.value)} 
                  className="bg-slate-800 border-purple-700 text-white" />
              </div>
              <div>
                <Label className="text-purple-300">C.P.</Label>
                <Input value={data.postalCode} onChange={e => updateField('postalCode', e.target.value)} 
                  className="bg-slate-800 border-purple-700 text-white" />
              </div>
              <div>
                <Label className="text-purple-300">País</Label>
                <Input value={data.country} onChange={e => updateField('country', e.target.value)} 
                  className="bg-slate-800 border-purple-700 text-white" />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section className="bg-slate-900 border-2 border-amber-500 rounded-xl p-6">
          <h2 className="text-lg font-bold text-amber-400 mb-4">📞 Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-amber-300">Teléfono</Label>
              <Input value={data.phone} onChange={e => updateField('phone', e.target.value)} 
                className="bg-slate-800 border-amber-700 text-white" placeholder="+34 600 000 000" />
            </div>
            <div>
              <Label className="text-amber-300">Email contacto</Label>
              <Input type="email" value={data.contactEmail} onChange={e => updateField('contactEmail', e.target.value)} 
                className="bg-slate-800 border-amber-700 text-white" placeholder="contacto@empresa.com" />
            </div>
            <div>
              <Label className="text-amber-300">Persona contacto</Label>
              <Input value={data.contactName} onChange={e => updateField('contactName', e.target.value)} 
                className="bg-slate-800 border-amber-700 text-white" />
            </div>
            <div>
              <Label className="text-amber-300">Teléfono contacto</Label>
              <Input value={data.contactPhone} onChange={e => updateField('contactPhone', e.target.value)} 
                className="bg-slate-800 border-amber-700 text-white" />
            </div>
          </div>
        </section>

        {/* FACTURACIÓN */}
        <section className="bg-slate-900 border-2 border-pink-500 rounded-xl p-6">
          <h2 className="text-lg font-bold text-pink-400 mb-4">🧾 Facturación</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-pink-300">Razón social</Label>
              <Input value={data.billingName} onChange={e => updateField('billingName', e.target.value)} 
                className="bg-slate-800 border-pink-700 text-white" />
            </div>
            <div>
              <Label className="text-pink-300">CIF facturación</Label>
              <Input value={data.billingNif} onChange={e => updateField('billingNif', e.target.value)} 
                className="bg-slate-800 border-pink-700 text-white" />
            </div>
            <div className="md:col-span-2">
              <Label className="text-pink-300">Dirección facturación</Label>
              <Input value={data.billingAddress} onChange={e => updateField('billingAddress', e.target.value)} 
                className="bg-slate-800 border-pink-700 text-white" />
            </div>
            <div>
              <Label className="text-pink-300">Ciudad</Label>
              <Input value={data.billingCity} onChange={e => updateField('billingCity', e.target.value)} 
                className="bg-slate-800 border-pink-700 text-white" />
            </div>
            <div>
              <Label className="text-pink-300">C.P.</Label>
              <Input value={data.billingPostalCode} onChange={e => updateField('billingPostalCode', e.target.value)} 
                className="bg-slate-800 border-pink-700 text-white" />
            </div>
            <div className="md:col-span-2">
              <Label className="text-pink-300">Email facturación</Label>
              <Input type="email" value={data.billingEmail} onChange={e => updateField('billingEmail', e.target.value)} 
                className="bg-slate-800 border-pink-700 text-white" />
            </div>
          </div>
        </section>

        {/* BANCARIO */}
        <section className="bg-slate-900 border-2 border-cyan-500 rounded-xl p-6">
          <h2 className="text-lg font-bold text-cyan-400 mb-4">🏦 Datos bancarios</h2>
          <div className="max-w-md">
            <Label className="text-cyan-300">IBAN</Label>
            <Input value={data.iban} onChange={e => updateField('iban', e.target.value)} 
              className="bg-slate-800 border-cyan-700 text-white font-mono" 
              placeholder="ES00 0000 0000 0000 0000 0000" />
          </div>
        </section>

        {/* SAVE BUTTON */}
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" onClick={() => router.back()} className="border-slate-600">
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={saving || !data.name.trim()}
            className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 px-8"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  )
}
