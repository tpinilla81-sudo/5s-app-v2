import { NextRequest } from 'next/server'
import { db } from './db'
import { getAuthUser } from './auth-helpers'

export interface AuthContext {
  user: {
    id: string
    email: string
    name: string
    role: string
    avatar: string | null
    active: boolean
  }
  /** ID de la empresa activa del usuario (null si es gestor o no tiene empresa) */
  companyId: string | null
  /** Nombre de la empresa activa del usuario (para mostrar en UI / mensajes) */
  companyName: string | null
}

/**
 * Resuelve el contexto de autenticación + empresa del usuario.
 *
 * Reglas:
 * - gestor → companyId = null (es dueño de la plataforma, puede editar sistema)
 * - admin / gerente / responsable / empleado / auditor → su CompanyMember.role
 *   determina su empresa activa. Si pertenece a varias, se toma la primera
 *   (en el futuro se podría añadir un selector de empresa activa).
 *
 * Si el usuario no está autenticado o no tiene empresa asignada, devuelve null
 * en `user` (lo que el caller debe traducir en 401).
 */
export async function resolveAuthContext(request: NextRequest): Promise<AuthContext | null> {
  const user = await getAuthUser(request)
  if (!user) return null

  // Gestor no tiene empresa — es dueño de la plataforma.
  if (user.role === 'gestor') {
    return { user, companyId: null, companyName: null }
  }

  // Para el resto, buscar la primera empresa del usuario.
  // Order by joinedAt ASC para devolver la primera a la que se unió (estable).
  const membership = await db.companyMember.findFirst({
    where: { userId: user.id },
    include: { company: { select: { id: true, name: true } } },
    orderBy: { joinedAt: 'asc' },
  })

  if (!membership) {
    return { user, companyId: null, companyName: null }
  }

  return {
    user,
    companyId: membership.company.id,
    companyName: membership.company.name,
  }
}

/**
 * Tipos de plantilla que un responsable (coordinador) puede editar.
 * Definido por el dueño de la app: solo autoevaluaciones y auditorías,
 * porque son los checklists operativos que el coordinador ajusta en sus zonas.
 */
export const RESPONSABLE_EDITABLE_TYPES = ['autoevaluacion', 'auditoria'] as const

/**
 * ¿Puede el usuario editar plantillas de una empresa concreta?
 * - gestor → siempre (es dueño)
 * - admin → solo su propia empresa, todos los tipos
 * - responsable (coordinador) → solo su empresa + solo autoevaluacion/auditoria
 * - resto → nunca
 *
 * Pasar `templateType` para que el check respete la restricción por tipo del
 * responsable. Si no se pasa, se asume que se pregunta a nivel genérico y el
 * responsable se considera SIN permiso (false).
 */
export function canEditCompanyTemplates(
  ctx: AuthContext,
  companyId: string | null,
  templateType?: string,
): boolean {
  if (ctx.user.role === 'gestor') return true
  if (ctx.user.role === 'admin' && companyId != null && ctx.companyId === companyId) return true
  if (
    ctx.user.role === 'responsable' &&
    companyId != null &&
    ctx.companyId === companyId &&
    templateType != null &&
    (RESPONSABLE_EDITABLE_TYPES as readonly string[]).includes(templateType)
  ) {
    return true
  }
  return false
}

/**
 * ¿Puede el usuario editar plantillas de la Biblioteca del Sistema (companyId=null)?
 * Solo el gestor.
 */
export function canEditSystemTemplates(ctx: AuthContext): boolean {
  return ctx.user.role === 'gestor'
}
