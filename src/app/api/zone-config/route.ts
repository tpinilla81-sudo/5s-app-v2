import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { getAuthUser } from '../../../lib/auth-helpers'

// Valores por defecto del algoritmo de zonificación.
// Se aplican si todavía no existe ningún ZoneAlgorithmConfig en la DB.
const DEFAULT_CONFIG = {
  maxM2PorZona: 800,
  questionLabels: {
    zonas: 'Zonas iniciales (nombre + m² + empleados)',
    prefijo: 'Prefijo propuesto para sub-zonas',
  },
  defaultPrefix: 'Z',
}

/**
 * GET /api/zone-config
 * Devuelve la configuración global del algoritmo de zonificación.
 * Si no existe ningún registro, crea uno con defaults y lo devuelve.
 *
 * Accesible por cualquier usuario autenticado (la necesita el admin para
 * mostrar el wizard; la necesita el gestor para editarla).
 *
 * v2.108.1 — Si la tabla ZoneAlgorithmConfig todavía no existe en producción
 * (migración pendiente), devuelve defaults en vez de 500 para que la UI del
 * gestor nunca se vea vacía.
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    let config = null
    try {
      config = await db.zoneAlgorithmConfig.findFirst()
      if (!config) {
        config = await db.zoneAlgorithmConfig.create({
          data: {
            maxM2PorZona: DEFAULT_CONFIG.maxM2PorZona,
            questionLabels: JSON.stringify(DEFAULT_CONFIG.questionLabels),
            defaultPrefix: DEFAULT_CONFIG.defaultPrefix,
          },
        })
      }
    } catch (dbError) {
      // La tabla no existe todavía — devolvemos defaults para que la UI
      // no se vea vacía. El gestor puede guardar y se creará via migrate/schema.
      console.warn('GET /api/zone-config: tabla no disponible, devolviendo defaults', dbError)
      return NextResponse.json({
        ...DEFAULT_CONFIG,
        questionLabels: DEFAULT_CONFIG.questionLabels,
        id: null,
        _warning: 'La tabla ZoneAlgorithmConfig no existe todavía. Abre y cierra el panel de Gestión para que se cree automáticamente.',
      })
    }

    return NextResponse.json({
      maxM2PorZona: config.maxM2PorZona,
      questionLabels: (() => {
        try { return JSON.parse(config.questionLabels) } catch { return DEFAULT_CONFIG.questionLabels }
      })(),
      defaultPrefix: config.defaultPrefix,
      id: config.id,
    })
  } catch (error) {
    console.error('GET /api/zone-config error:', error)
    return NextResponse.json({ error: 'Error al obtener configuración' }, { status: 500 })
  }
}

/**
 * PUT /api/zone-config
 * Actualiza la configuración global del algoritmo de zonificación.
 * Solo gestor/admin.
 *
 * Body:
 *   - maxM2PorZona: number (m² máximo antes de dividir)
 *   - questionLabels: { zonas: string, prefijo: string } (textos del wizard)
 *   - defaultPrefix: string
 */
export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user || !['gestor', 'admin'].includes(user.role)) {
      return NextResponse.json(
        { error: 'No autorizado. Se requiere rol gestor o admin.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { maxM2PorZona, questionLabels, defaultPrefix } = body as {
      maxM2PorZona?: number
      questionLabels?: { zonas: string; prefijo: string }
      defaultPrefix?: string
    }

    if (typeof maxM2PorZona !== 'number' || maxM2PorZona <= 0) {
      return NextResponse.json(
        { error: 'maxM2PorZona debe ser un número positivo' },
        { status: 400 }
      )
    }

    let config = await db.zoneAlgorithmConfig.findFirst()
    if (!config) {
      config = await db.zoneAlgorithmConfig.create({
        data: {
          maxM2PorZona,
          questionLabels: JSON.stringify(questionLabels || DEFAULT_CONFIG.questionLabels),
          defaultPrefix: defaultPrefix || DEFAULT_CONFIG.defaultPrefix,
        },
      })
    } else {
      config = await db.zoneAlgorithmConfig.update({
        where: { id: config.id },
        data: {
          maxM2PorZona,
          ...(questionLabels ? { questionLabels: JSON.stringify(questionLabels) } : {}),
          ...(defaultPrefix !== undefined ? { defaultPrefix } : {}),
        },
      })
    }

    return NextResponse.json({
      maxM2PorZona: config.maxM2PorZona,
      questionLabels: (() => {
        try { return JSON.parse(config.questionLabels) } catch { return DEFAULT_CONFIG.questionLabels }
      })(),
      defaultPrefix: config.defaultPrefix,
      id: config.id,
    })
  } catch (error) {
    console.error('PUT /api/zone-config error:', error)
    return NextResponse.json({ error: 'Error al actualizar configuración' }, { status: 500 })
  }
}
