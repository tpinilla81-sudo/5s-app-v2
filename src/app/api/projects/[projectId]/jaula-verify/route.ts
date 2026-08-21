import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../../lib/db'
import { getAuthUser } from '../../../../../lib/auth-helpers'
import { uploadToStorage, isStorageConfigured } from '../../../../../lib/supabase-storage'

/**
 * GET /api/projects/[projectId]/jaula-verify
 * Devuelve el estado de verificación de la Jaula del proyecto.
 * Si la foto está almacenada en BD (BLOB), la sirve como base64.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        name: true,
        jaulaStatus: true,
        jaulaPhotoUrl: true,
        jaulaPhotoData: true, // Include BLOB data
        jaulaVerifiedById: true,
        jaulaVerifiedAt: true,
        jaulaNotes: true,
      },
    })
    if (!project) {
      return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })
    }

    // If photo is in BLOB format (stored in DB), convert to base64 for frontend
    let photoUrl = project.jaulaPhotoUrl
    const isStoredInDb = !photoUrl || photoUrl.startsWith('db://')
    if (isStoredInDb && project.jaulaPhotoData) {
      // Convert Buffer to base64 data URL
      const base64 = Buffer.from(project.jaulaPhotoData).toString('base64')
      photoUrl = `data:image/jpeg;base64,${base64}`
    } else if (isStoredInDb) {
      // Photo was supposed to be in DB but no data found
      photoUrl = null
    }

    return NextResponse.json({ 
      success: true, 
      project: {
        ...project,
        jaulaPhotoUrl: photoUrl,
        // Don't send raw binary data to client
        jaulaPhotoData: undefined 
      }
    })
  } catch (error) {
    console.error('[jaula-verify GET]', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    return NextResponse.json(
      { 
        error: 'Error al obtener estado de jaula',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/projects/[projectId]/jaula-verify
 *
 * Body (multipart/form-data):
 *   - photo: File (la foto de la jaula física)
 *   - notes: string (opcional)
 *
 * El Responsable (o admin/gerente) sube una foto de la jaula física
 * que ha creado. Marca el proyecto como jaulaStatus='verificada'.
 *
 * Estrategia de almacenamiento:
 * 1. Supabase Storage (si está configurado) - RECOMENDADO
 * 2. Base de datos (BLOB) - FALLBACK automático para Vercel/serverless
 *
 * Solo roles: responsable, admin, gerente, gestor.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const allowedRoles = ['responsable', 'admin', 'gerente', 'gestor']
    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json(
        { error: 'Solo el Responsable (o admin/gerente/gestor) puede verificar la jaula' },
        { status: 403 }
      )
    }

    const project = await db.project.findUnique({ where: { id: projectId } })
    if (!project) {
      return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })
    }

    const formData = await request.formData()
    const photo = formData.get('photo') as File | null
    const notes = (formData.get('notes') as string | null) || ''

    if (!photo) {
      return NextResponse.json(
        { error: 'Debes subir una foto de la jaula física' },
        { status: 400 }
      )
    }

    // Validar tipo
    if (!photo.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'El archivo debe ser una imagen (JPG, PNG, etc.)' },
        { status: 400 }
      )
    }

    // Validar tamaño (max 8 MB)
    if (photo.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'La foto no puede superar 8 MB' },
        { status: 400 }
      )
    }

    // Generar nombre único
    const ext = photo.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filename = `jaula_${projectId}_${Date.now()}.${ext}`

    let photoUrl: string | null = null
    let photoData: Buffer | null = null

    // Convertir foto a Buffer para posible almacenamiento en BD
    const arrayBuffer = await photo.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // ESTRATEGIA 1: Intentar Supabase Storage si está configurado
    if (isStorageConfigured()) {
      console.log('[jaula-verify] Supabase configurado, intentando upload...')
      try {
        const upload = await uploadToStorage(photo, filename, photo.type || 'image/jpeg')
        if (upload?.url) {
          photoUrl = upload.url
          console.log('[jaula-verify] Upload a Supabase exitoso:', upload.url)
        } else {
          console.warn('[jaula-verify] Upload a Supabase falló, usando fallback BD')
        }
      } catch (uploadError) {
        console.error('[jaula-verify] Error en upload Supabase:', uploadError)
      }
    } else {
      console.log('[jaula-verify] Supabase NO configurado, usando almacenamiento en BD')
    }

    // ESTRATEGIA 2: Fallback a Base de Datos (BLOB) - Funciona en Vercel/serverless
    if (!photoUrl) {
      photoData = buffer
      photoUrl = `db://${filename}` // Indicador de que está en BD
      console.log('[jaula-verify] Foto guardada en BD (BLOB), tamaño:', buffer.length, 'bytes')
    }

    // Actualizar el proyecto con los datos de verificación
    const updateData: any = {
      jaulaStatus: 'verificada',
      jaulaPhotoUrl: photoUrl,
      jaulaVerifiedById: user.id,
      jaulaVerifiedAt: new Date(),
      jaulaNotes: notes || null,
    }

    // Incluir datos binarios solo si estamos usando BD como storage
    if (photoData) {
      updateData.jaulaPhotoData = photoData
    }

    const updated = await db.project.update({
      where: { id: projectId },
      data: updateData,
    })

    console.log(`[jaula-verify] Proyecto ${projectId} verificado por ${user.name} (${user.role})`)

    // Notificación eliminada: solo subir foto y continuar sin avisar al admin

    return NextResponse.json({
      success: true,
      message: 'Jaula verificada correctamente',
      storageMethod: photoData ? 'database' : 'supabase',
      project: {
        id: updated.id,
        jaulaStatus: updated.jaulaStatus,
        jaulaPhotoUrl: updated.jaulaPhotoUrl,
        jaulaVerifiedById: updated.jaulaVerifiedById,
        jaulaVerifiedAt: updated.jaulaVerifiedAt,
        jaulaNotes: updated.jaulaNotes,
      },
    })
  } catch (error) {
    console.error('[jaula-verify POST]', error)
    
    // Mejorar mensaje de error con detalles para diagnóstico
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    const errorDetails = String(error).slice(0, 500)
    
    // Detectar errores comunes y dar mensajes más específicos
    let userMessage = 'Error al verificar la jaula'
    if (errorMessage.includes('permission') || errorMessage.includes('denied')) {
      userMessage = 'Error de permisos al acceder a la base de datos'
    } else if (errorMessage.includes('connection') || errorMessage.includes('timeout')) {
      userMessage = 'Error de conexión a la base de datos'
    } else if (errorMessage.includes('file') || errorMessage.includes('filesystem') || errorMessage.includes('ENOENT') || errorMessage.exists('EACCES')) {
      userMessage = 'Error: No se puede escribir archivos en este servidor (use Supabase o BD)'
    } else if (errorMessage.includes('column') || errorMessage.includes('does not exist')) {
      userMessage = 'Error: La base de datos necesita migración. Ejecute: npx prisma migrate deploy'
    }
    
    return NextResponse.json(
      { 
        error: userMessage,
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined,
        code: errorMessage.slice(0, 100)
      },
      { status: 500 }
    )
  }
}
