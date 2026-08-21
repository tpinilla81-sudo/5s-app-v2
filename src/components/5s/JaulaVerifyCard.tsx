'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Loader2, Camera, Upload, CheckCircle2, AlertCircle, X } from 'lucide-react'

interface JaulaVerifyCardProps {
  projectId: string
  projectName: string
  /** Permiso: solo responsable/admin/gerente/gestor pueden subir foto */
  canVerify: boolean
  /** Callback opcional cuando se verifica correctamente */
  onVerified?: () => void
}

interface JaulaState {
  status: string | null
  photoUrl: string | null
  verifiedById: string | null
  verifiedAt: string | null
  notes: string | null
}

export function JaulaVerifyCard({ projectId, projectName, canVerify, onVerified }: JaulaVerifyCardProps) {
  const [state, setState] = useState<JaulaState | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notes, setNotes] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadState = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/projects/${projectId}/jaula-verify`)
      const data = await res.json()
      if (data.success && data.project) {
        setState({
          status: data.project.jaulaStatus,
          photoUrl: data.project.jaulaPhotoUrl,
          verifiedById: data.project.jaulaVerifiedById,
          verifiedAt: data.project.jaulaVerifiedAt,
          notes: data.project.jaulaNotes,
        })
        setNotes(data.project.jaulaNotes || '')
      }
    } catch (e) {
      console.error('Error loading jaula state:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadState()
  }, [projectId])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen (JPG, PNG, etc.)')
      return
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('La foto no puede superar 8 MB')
      return
    }
    setError(null)
    setSelectedFile(file)
    // Preview
    const reader = new FileReader()
    reader.onload = () => setPreviewUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Selecciona una foto primero')
      return
    }
    setUploading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('photo', selectedFile)
      formData.append('notes', notes)
      const res = await fetch(`/api/projects/${projectId}/jaula-verify`, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        await loadState()
        setSelectedFile(null)
        setPreviewUrl(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
        onVerified?.()
      } else {
        setError(data.error || 'Error al subir la foto')
      }
    } catch (e) {
      console.error('Error uploading jaula photo:', e)
      setError('Error al subir la foto')
    } finally {
      setUploading(false)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 flex items-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-amber-600" />
        <span className="text-sm text-amber-700">Cargando estado de la jaula…</span>
      </div>
    )
  }

  const isVerified = state?.status === 'verificada'
  const isPending = !state?.status || state.status === 'pendiente'

  return (
    <div className={`rounded-lg border-2 p-4 space-y-3 ${
      isVerified
        ? 'border-emerald-300 bg-emerald-50/50'
        : 'border-amber-300 bg-amber-50/50'
    }`}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 ${
          isVerified ? 'bg-emerald-500' : 'bg-amber-500'
        }`}>
          {isVerified
            ? <CheckCircle2 className="h-5 w-5" />
            : <AlertCircle className="h-5 w-5" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold text-gray-900">
              Jaula física de cuarentena
            </h4>
            <Badge variant="outline" className={`text-[10px] ${
              isVerified
                ? 'border-emerald-300 bg-emerald-100 text-emerald-800'
                : 'border-amber-300 bg-amber-100 text-amber-800'
            }`}>
              {isVerified ? '✓ Verificada' : '⏳ Pendiente'}
            </Badge>
          </div>
          <p className="text-xs text-gray-600 mt-0.5">
            {isVerified
              ? `Verificada el ${state?.verifiedAt ? new Date(state.verifiedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}`
              : `El Responsable debe crear físicamente la jaula en el proyecto "${projectName}" y subir una foto para verificarlo.`}
          </p>
        </div>
      </div>

      {/* Instrucciones de cómo crear la jaula física */}
      {isPending && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm">
            <span>📋</span>
            <span>Cómo crear la jaula física:</span>
          </div>
          <ul className="text-xs text-blue-700 space-y-1 ml-6 list-disc">
            <li>Elegir un <strong>lugar o espacio que NO se use para nada</strong></li>
            <li>Tamaño aproximado: <strong>10 metros cuadrados</strong></li>
            <li><strong>Acordonar el perímetro</strong> con cualquier material disponible (cinta, conos, cadenas, barreras, etc.)</li>
            <li>El espacio servirá como área de cuarentena para materiales/elementos del proyecto 5S</li>
          </ul>
        </div>
      )}

      {/* Foto existente (si verificada) */}
      {isVerified && state?.photoUrl && (
        <div className="rounded-lg overflow-hidden border bg-white">
          <img
            src={state.photoUrl}
            alt="Foto de la jaula física"
            className="w-full max-h-64 object-cover"
          />
          {state.notes && (
            <div className="p-2 text-xs text-gray-600 bg-gray-50 border-t">
              <strong>Notas:</strong> {state.notes}
            </div>
          )}
        </div>
      )}

      {/* Formulario de subida (solo si puede verificar y está pendiente) */}
      {canVerify && isPending && (
        <div className="space-y-3 border-t border-amber-200 pt-3">
          <div>
            <Label className="text-xs font-semibold mb-1.5 block">
              <Camera className="h-3.5 w-3.5 inline mr-1" />
              Foto de la jaula creada *
            </Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-xs text-gray-700 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200 cursor-pointer"
            />
          </div>

          {previewUrl && (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full max-h-48 object-cover rounded-lg border"
              />
              <button
                onClick={handleReset}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center"
                title="Quitar foto"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <div>
            <Label className="text-xs font-semibold mb-1.5 block">
              Notas (opcional)
            </Label>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Ubicada en la esquina noreste del almacén"
              className="h-9 text-sm"
            />
          </div>

          {error && (
            <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded p-2">
              {error}
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white disabled:bg-amber-300"
          >
            {uploading ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Subiendo foto…</>
            ) : (
              <><Upload className="h-4 w-4 mr-2" /> Verificar jaula</>
            )}
          </Button>
        </div>
      )}

      {/* Si no puede verificar y está pendiente */}
      {!canVerify && isPending && (
        <div className="text-xs text-amber-800 bg-amber-100/50 rounded p-2 border-t border-amber-200">
          Solo el <strong>Responsable</strong> del proyecto puede verificar la jaula.
          Si eres el Responsable, contacta con el admin del proyecto para que te asigne el rol.
        </div>
      )}
    </div>
  )
}
