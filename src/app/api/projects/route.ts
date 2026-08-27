import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { getAuthUser } from '../../../lib/auth-helpers'

// GET /api/projects - List projects with zones and member count
// Admin sees projects from their companies; gerente same; non-admin sees only their assigned projects
// GESTOR (platform owner) sees ALL projects across all companies.
export async function GET(request: NextRequest) {
  try {
    // Check if user is logged in via session
    const user = await getAuthUser(request)
    const userRole = user?.role || 'empleado'
    const userId: string | null = user?.id || null

    const isGestor = userRole === 'gestor'
    const isAdmin = userRole === 'admin'
    const isGerente = userRole === 'gerente'

    let whereCondition: any = { active: true }

    if (isGestor) {
      // Gestor (platform owner) sees ALL projects
      whereCondition = { active: true }
    } else if (isAdmin || isGerente) {
      // Admin & Gerente: only projects from their companies + projects they're directly assigned to
      const companyMemberships = await db.companyMember.findMany({
        where: { userId },
        select: { companyId: true },
      })
      const companyIds = companyMemberships.map((cm) => cm.companyId)

      whereCondition = {
        active: true,
        OR: [
          { members: { some: { userId } } },
          { companyId: { in: companyIds.length > 0 ? companyIds : ['__none__'] } },
        ],
      }
    } else if (userId) {
      // Other roles: only their assigned projects
      whereCondition = {
        active: true,
        members: {
          some: {
            userId: userId,
          },
        },
      }
    }

    const projects = await db.project.findMany({
      where: whereCondition,
      include: {
        zones: {
          orderBy: { createdAt: 'asc' },
        },
        _count: {
          select: { members: true },
        },
        company: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    const result = projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      company: project.company?.name || project.company,
      companyId: project.companyId,
      companyName: project.company?.name || project.company,
      startDate: project.startDate,
      active: project.active,
      zones: project.zones,
      memberCount: project._count.members,
    }))

    return NextResponse.json({ projects: result }, { status: 200 })
  } catch (error) {
    console.error('Fetch projects error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    
    // Detectar errores comunes de migración
    if (errorMessage.includes('column') && errorMessage.includes('does not exist')) {
      return NextResponse.json(
        { 
          error: 'Error: La base de datos necesita migración. Ejecute: npx prisma migrate deploy',
          details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
          needsMigration: true 
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Error al obtener proyectos' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create new project with zones
// Only gestor, admin, and gerente can create projects.
// Admin/gerente can only create projects in companies they belong to.
//
// v2.108.20 — MEJORA DE ROBUSTEZ:
// - Guarda progreso incluso si operaciones secundarias fallan
// - Mejora mensajes de error para diagnóstico
// - Maneja errores de migración de forma específica
export async function POST(request: NextRequest) {
  let createdProjectId: string | null = null // Para tracking de progreso
  
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, company, companyId, zones } = body

    if (!name || !company) {
      return NextResponse.json(
        { error: 'Nombre del proyecto y empresa son requeridos' },
        { status: 400 }
      )
    }

    // v2.108.2 — Las zonas son opcionales: si el admin aún no las sabe,
    // puede crear el proyecto vacío y lanzar luego el wizard de zonificación
    // desde el AdminPanel. Ese wizard creará las zonas via /generate-zones.
    const validZones = Array.isArray(zones) ? zones.filter((z: any) => z && z.name && z.name.trim()) : []

    // Authorization: only gestor, admin, gerente can create projects
    const isGestor = user.role === 'gestor'
    const isAdmin = user.role === 'admin'
    const isGerente = user.role === 'gerente'

    if (!isGestor && !isAdmin && !isGerente) {
      return NextResponse.json(
        { error: 'No tienes permisos para crear proyectos' },
        { status: 403 }
      )
    }

    // Admin/gerente: verify they belong to the company they're creating a project for
    if (!isGestor && companyId) {
      const membership = await db.companyMember.findFirst({
        where: { companyId, userId: user.id },
      })
      if (!membership) {
        return NextResponse.json(
          { error: 'Solo puedes crear proyectos en empresas donde eres miembro' },
          { status: 403 }
        )
      }
    }

    // If admin has no companyId provided, find their first company
    let effectiveCompanyId = companyId
    if (!isGestor && !effectiveCompanyId) {
      const companyMemberships = await db.companyMember.findMany({
        where: { userId: user.id },
        select: { companyId: true },
      })
      if (companyMemberships.length > 0) {
        effectiveCompanyId = companyMemberships[0].companyId
      }
    }

    // === CREACIÓN DEL PROYECTO (OPERACIÓN PRINCIPAL) ===
    // Esta es la operación crítica - si falla aquí, no se crea nada
    
    // v2.108.20 - Estrategia de compatibilidad:
    // Si las columnas de jaula no existen (migración no aplicada),
    // intentar crear SIN esos campos primero.
    let project: any = null
    let creationError: Error | null = null
    
    // PRIMER INTENTO: Con campos de jaula (versión completa)
    try {
      project = await db.project.create({
        data: {
          name: name.trim(),
          description: description?.trim() || null,
          company: company.trim(),
          companyId: effectiveCompanyId || null,
          // Inicializar estado de jaula como pendiente
          jaulaStatus: 'pendiente',
          zones: {
            create: validZones.map((zone: { name: string; description?: string; color?: string }) => ({
              name: zone.name.trim(),
              description: zone.description?.trim() || null,
              color: zone.color || '#3B82F6',
            })),
          },
        },
        include: {
          zones: true,
          _count: {
            select: { members: true },
          },
          company: {
            select: { id: true, name: true },
          },
        },
      })
      
      createdProjectId = project.id // Guardar ID para referencia
      
      // === OPERACIONES SECUNDARIAS (no críticas) ===
      // Si fallan, el proyecto ya está creado y podemos continuar
      
      // Auto-assign the creator as a project member if admin/gerente
      if (!isGestor) {
        try {
          await db.projectMember.upsert({
            where: { userId_projectId: { userId: user.id, projectId: project.id } },
            create: { userId: user.id, projectId: project.id, role: user.role },
            update: {},
          })
        } catch (memberError) {
          console.warn('[create-project] Warning: No se pudo añadir creador como miembro (non-fatal):', memberError)
          // Continuar - el proyecto ya existe
        }
      }

      // Auto-assign default board config to all zones in the new project
      try {
        const defaultConfig = await db.boardConfiguration.findFirst({
          where: { isDefault: true },
        })
        if (defaultConfig && project.zones.length > 0) {
          await db.zone.updateMany({
            where: { projectId: project.id },
            data: { boardConfigId: defaultConfig.id },
          })
        }
      } catch (boardError) {
        console.warn('[create-project] Warning: No se pudo asignar board config (non-fatal):', boardError)
        // Continuar - el proyecto ya existe sin board config
      }

      console.log(`[create-project] Proyecto "${project.id}" creado exitosamente por ${user.email} (${user.role})`)

      return NextResponse.json(
        {
          success: true,
          message: 'Proyecto creado correctamente',
          project: {
            id: project.id,
            name: project.name,
            description: project.description,
            company: project.company,
            companyId: project.companyId,
            companyName: project.company?.name || project.company,
            startDate: project.startDate,
            active: project.active,
            zones: project.zones,
            memberCount: project._count.members,
          },
        },
        { status: 201 }
      )
    } catch (createError) {
      // Error específico en la creación del proyecto
      console.error('[create-project] Error creando proyecto (intento 1 con jaula):', createError)
      const createErrorMessage = createError instanceof Error ? createError.message : String(createError)
      creationError = createError instanceof Error ? createError : new Error(createErrorMessage)
      
      // v2.108.20 - Si el error es por columna faltante (migración no aplicada),
      // intentar NUEVAMENTE SIN los campos de jaula (compatibilidad hacia atrás)
      if (createErrorMessage.includes('column') && createErrorMessage.includes('does not exist')) {
        console.warn('[create-project] Columna faltante detectada, intentando SIN campos de jaula...')
        
        try {
          // SEGUNDO INTENTO: Sin campos de jaula (compatibilidad)
          project = await db.project.create({
            data: {
              name: name.trim(),
              description: description?.trim() || null,
              company: company.trim(),
              companyId: effectiveCompanyId || null,
              // NO incluir jaulaStatus - la columna no existe aún
              zones: {
                create: validZones.map((zone: { name: string; description?: string; color?: string }) => ({
                  name: zone.name.trim(),
                  description: zone.description?.trim() || null,
                  color: zone.color || '#3B82F6',
                })),
              },
            },
            include: {
              zones: true,
              _count: {
                select: { members: true },
              },
              company: {
                select: { id: true, name: true },
              },
            },
          })
          
          createdProjectId = project.id
          console.log(`[create-project] Proyecto "${project.id}" creado EN MODO COMPATIBILIDAD (sin campos de jaula)`)
          
          // Continuar con las operaciones secundarias y return exitoso...
          // (mismo código que abajo pero inline para evitar duplicación compleja)
          
        } catch (compatError) {
          console.error('[create-project] Falló también el intento de compatibilidad:', compatError)
          // Ambos intentos fallaron - devolver error real
          const compatErrorMsg = compatError instanceof Error ? compatError.message : String(compatError)
          
          return NextResponse.json(
            { 
              error: 'Error al crear el proyecto. La base de datos puede necesitar migración.',
              details: process.env.NODE_ENV === 'development' ? compatErrorMsg : undefined,
              needsMigration: true,
              suggestion: 'Ejecute POST /api/system/health para aplicar migraciones automáticamente',
              originalError: createErrorMessage
            },
            { status: 500 }
          )
        }
      } else {
        // No es error de columna faltante - es otro tipo de error
        // Detectar otros errores comunes
        if (createErrorMessage.includes('connection') || createErrorMessage.includes('timeout') || createErrorMessage.includes('ECONNREFUSED')) {
          return NextResponse.json(
            { 
              error: 'Error de conexión a la base de datos. Intente nuevamente en unos segundos.',
              details: process.env.NODE_ENV === 'development' ? createErrorMessage : undefined,
              isConnectionError: true
            },
            { status: 503 }
          )
        }
        
        // Error genérico de creación
        return NextResponse.json(
          { 
            error: `Error al crear el proyecto: ${createErrorMessage.slice(0, 200)}`,
            details: process.env.NODE_ENV === 'development' ? createErrorMessage : undefined
          },
          { status: 500 }
        )
      }
    }
    
    // Si llegamos aquí con project = null, algo salió mal
    if (!project) {
      return NextResponse.json(
        { 
          error: 'Error inesperado al crear el proyecto',
          details: creationError?.message || 'Unknown error'
        },
        { status: 500 }
      )
    }
    
    createdProjectId = project.id // Guardar ID para referencia
    
    // === OPERACIONES SECUNDARIAS (no críticas) ===
    // Si fallan, el proyecto ya está creado y podemos continuar
    
    // Auto-assign the creator as a project member if admin/gerente
    if (!isGestor) {
      try {
        await db.projectMember.upsert({
          where: { userId_projectId: { userId: user.id, projectId: project.id } },
          create: { userId: user.id, projectId: project.id, role: user.role },
          update: {},
        })
      } catch (memberError) {
        console.warn('[create-project] Warning: No se pudo añadir creador como miembro (non-fatal):', memberError)
        // Continuar - el proyecto ya existe
      }
    }

    // Auto-assign default board config to all zones in the new project
    try {
      const defaultConfig = await db.boardConfiguration.findFirst({
        where: { isDefault: true },
      })
      if (defaultConfig && project.zones.length > 0) {
        await db.zone.updateMany({
          where: { projectId: project.id },
          data: { boardConfigId: defaultConfig.id },
        })
      }
    } catch (boardError) {
      console.warn('[create-project] Warning: No se pudo asignar board config (non-fatal):', boardError)
      // Continuar - el proyecto ya existe sin board config
    }

    console.log(`[create-project] Proyecto "${project.id}" creado exitosamente por ${user.email} (${user.role})`)

    return NextResponse.json(
      {
        success: true,
        message: 'Proyecto creado correctamente',
        compatibilityMode: !project.jaulaStatus, // Indica si se creó sin campos de jaula
        project: {
          id: project.id,
          name: project.name,
          description: project.description,
          company: project.company,
          companyId: project.companyId,
          companyName: project.company?.name || project.company,
          startDate: project.startDate,
          active: project.active,
          zones: project.zones,
          memberCount: project._count.members,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    // Error general del endpoint (autenticación, parsing, etc.)
    console.error('[POST /api/projects] Error general:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    
    // Si ya creamos el proyecto pero falló algo después, informar que se guardó
    if (createdProjectId) {
      return NextResponse.json(
        {
          warning: 'Proyecto creado parcialmente',
          projectId: createdProjectId,
          message: 'El proyecto fue creado pero algunas configuraciones adicionales pudieron no aplicarse.',
          error: errorMessage
        },
        { status: 201 } // Created, con advertencia
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Error al procesar la solicitud de creación',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}
