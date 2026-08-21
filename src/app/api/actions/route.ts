import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/auth-helpers'

// v2.72: helper para parsear `extra` (JSON string) sin romper si está malformado
function safeParseExtra(raw: string): any {
  try { return JSON.parse(raw) } catch { return null }
}

// v2.99.5: Textos genéricos que el sistema escribía en `comunicadoPor`
// (texto legacy) antes de v2.84 cuando no había un usuario real identificado.
const GENERICOS_COMUNICADO = [
  'Sistema (auto desde Inventario S1)',
  'Sistema',
  '—',
  '-',
  '',
]

/**
 * v2.99.5: Para ActionItems legacy cuyo `comunicadoPorId` es null o cuyo
 * `comunicadoPor` (texto) es un placeholder genérico del sistema, resuelve
 * automáticamente el usuario real que hizo el Paso 3 (empleado que registró
 * el item en el inventario) a partir del InventoryItem.createdById.
 *
 * Esto evita tener que ejecutar una migración manual: el endpoint siempre
 * devuelve el usuario correcto, haya o no FK seteada en el ActionItem.
 *
 * Mutates the array in place adding `comunicadoPorUser` when missing.
 */
async function enrichWithInventoryCreator(actions: any[]): Promise<void> {
  // Filtrar los que necesitan resolución
  const needingResolution = actions.filter(a => {
    if (a.comunicadoPorUser) return false // ya tiene usuario real
    if (a.source !== 'inventario') return false // solo aplica a inventario
    const text = (a.comunicadoPor || '').trim()
    return GENERICOS_COMUNICADO.includes(text)
  })

  if (needingResolution.length === 0) return

  // Recoger los inventoryItemIds desde extra o sourceId
  const invIdToActionIdx = new Map<string, number[]>()
  for (const a of needingResolution) {
    let invId: string | null = null
    // v2.99.5: preferir sourceId (FK directo al InventoryItem)
    if (a.sourceId) {
      invId = a.sourceId
    } else if (a.extra) {
      // extra puede venir como string (raw DB) o ya parseado (enriched)
      const extraObj = typeof a.extra === 'string' ? safeParseExtra(a.extra) : a.extra
      invId = extraObj?.inventoryItemId || null
    }
    if (invId) {
      if (!invIdToActionIdx.has(invId)) invIdToActionIdx.set(invId, [])
      // find index in original actions array
      const idx = actions.indexOf(a)
      if (idx >= 0) invIdToActionIdx.get(invId)!.push(idx)
    }
  }

  if (invIdToActionIdx.size === 0) return

  // Batch fetch de los InventoryItems con su createdBy
  const invItems = await db.inventoryItem.findMany({
    where: { id: { in: Array.from(invIdToActionIdx.keys()) } },
    select: {
      id: true,
      createdById: true,
      createdBy: { select: { id: true, name: true, email: true } },
    },
  })

  for (const inv of invItems) {
    if (!inv.createdBy) continue
    const idxs = invIdToActionIdx.get(inv.id) || []
    for (const idx of idxs) {
      actions[idx].comunicadoPorUser = inv.createdBy
      // También setear comunicadoPorId por si acaso (no se persiste, solo response)
      if (!actions[idx].comunicadoPorId) {
        actions[idx].comunicadoPorId = inv.createdBy.id
      }
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sStep = searchParams.get('sStep')
    const projectId = searchParams.get('projectId')
    const source = searchParams.get('source')
    const estado = searchParams.get('estado')
    const userId = searchParams.get('userId')
    const userRole = searchParams.get('userRole')
    const jaulaOnly = searchParams.get('jaulaOnly')

    // TASK 3: jaulaOnly query for global jaula view
    if (jaulaOnly === 'true') {
      const jaulaItems = await db.inventoryItem.findMany({
        where: {
          jaulaStatus: { not: '' },
        },
        orderBy: { createdAt: 'desc' },
        include: {
          project: {
            select: { id: true, name: true, company: true },
          },
        },
      })
      const parsed = jaulaItems.map(item => ({
        ...item,
        extra: item.extra ? JSON.parse(item.extra) : null,
      }))
      return NextResponse.json({ success: true, data: parsed })
    }

    // TASK 4: Role-based filtering for action plans
    if (userRole && userId) {
      if (userRole === 'gerente') {
        // Gerente sees ALL action plans across all projects
        const where: any = {}
        if (sStep !== null) where.sStep = parseInt(sStep!)
        if (source) where.source = source
        if (estado) where.estado = estado

        const actions = await db.actionItem.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          include: {
            zone: { select: { id: true, name: true } },
            project: { select: { id: true, name: true, company: true } },
            // v2.78: incluir FKs de User para mostrar nombres en el frontend
            comunicadoPorUser: { select: { id: true, name: true, email: true } },
            personaDemandadaUser: { select: { id: true, name: true, email: true } },
            verificadoPorUser: { select: { id: true, name: true, email: true } },
          },
        })
        // v2.99.5: resolver automáticamente el usuario creador del inventario
        // para ActionItems legacy sin comunicadoPorUser.
        await enrichWithInventoryCreator(actions)
        const parsed = actions.map(a => ({ ...a, extra: a.extra ? safeParseExtra(a.extra) : null }))
        return NextResponse.json({ success: true, data: parsed })
      }

      if (userRole === 'responsable') {
        // Responsable sees action plans from their own projects only
        const memberships = await db.projectMember.findMany({
          where: { userId, role: 'responsable' },
          select: { projectId: true },
        })
        const projectIds = memberships.map(m => m.projectId)
        const where: any = { projectId: { in: projectIds } }
        if (sStep !== null) where.sStep = parseInt(sStep!)
        if (source) where.source = source
        if (estado) where.estado = estado

        const actions = await db.actionItem.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          include: {
            zone: { select: { id: true, name: true } },
            project: { select: { id: true, name: true, company: true } },
            // v2.78: incluir FKs de User para mostrar nombres en el frontend
            comunicadoPorUser: { select: { id: true, name: true, email: true } },
            personaDemandadaUser: { select: { id: true, name: true, email: true } },
            verificadoPorUser: { select: { id: true, name: true, email: true } },
          },
        })
        // v2.99.5: resolver automáticamente el usuario creador del inventario
        await enrichWithInventoryCreator(actions)
        const parsed = actions.map(a => ({ ...a, extra: a.extra ? safeParseExtra(a.extra) : null }))
        return NextResponse.json({ success: true, data: parsed })
      }

      if (userRole === 'empleado') {
        // Empleado sees action plans from their zones only
        const memberZones = await db.memberZone.findMany({
          where: {
            member: { userId },
          },
          select: { zoneId: true },
        })
        const zoneIds = memberZones.map(mz => mz.zoneId)
        const where: any = { zoneId: { in: zoneIds } }
        if (sStep !== null) where.sStep = parseInt(sStep!)
        if (source) where.source = source
        if (estado) where.estado = estado

        const actions = await db.actionItem.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          include: {
            zone: { select: { id: true, name: true } },
            project: { select: { id: true, name: true, company: true } },
            // v2.78: incluir FKs de User para mostrar nombres en el frontend
            comunicadoPorUser: { select: { id: true, name: true, email: true } },
            personaDemandadaUser: { select: { id: true, name: true, email: true } },
            verificadoPorUser: { select: { id: true, name: true, email: true } },
          },
        })
        // v2.99.5: resolver automáticamente el usuario creador del inventario
        await enrichWithInventoryCreator(actions)
        const parsed = actions.map(a => ({ ...a, extra: a.extra ? safeParseExtra(a.extra) : null }))
        return NextResponse.json({ success: true, data: parsed })
      }
    }

    // Default: standard filtering
    const where: any = {}
    if (sStep !== null) where.sStep = parseInt(sStep)
    if (projectId) where.projectId = projectId
    if (source) where.source = source
    if (estado) where.estado = estado

    const actions = await db.actionItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        zone: { select: { id: true, name: true } },
        // v2.78: incluir FKs de User para mostrar nombres en el frontend
        comunicadoPorUser: { select: { id: true, name: true, email: true } },
        personaDemandadaUser: { select: { id: true, name: true, email: true } },
        verificadoPorUser: { select: { id: true, name: true, email: true } },
      },
    })

    // v2.99.5: resolver automáticamente el usuario creador del inventario
    // para ActionItems legacy sin comunicadoPorUser. Así no hace falta
    // ejecutar migración manual: el endpoint siempre devuelve el usuario
    // real que hizo el Paso 3 (empleado que registró el item en el inventario).
    await enrichWithInventoryCreator(actions)

    // v2.72: parse `extra` (JSON string) → objeto para el frontend
    const parsed = actions.map(a => ({
      ...a,
      extra: a.extra ? safeParseExtra(a.extra) : null,
    }))

    return NextResponse.json({ success: true, data: parsed })
  } catch (error) {
    console.error('Error fetching actions:', error)
    return NextResponse.json({ success: false, error: 'Error fetching actions' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      sStep,
      miniStep,
      itemId,
      itemDescription,
      hallazgo,
      mejora,
      responsable,
      prioridad,
      estado,
      fechaCompromiso,
      fechaLimite,
      fechaReal,
      source,
      auditor,
      projectId,
      zoneId,
      verificadoPor,
      // Plan de Acción table fields
      numeroEntrada,
      fechaEntrada,
      comunicadoPor,
      semana,
      seccionDemandante,
      clienteZona,
      personaDemandada,
      seccionDemandada,
      impactoObjetivo,
      enviado,
      accionCorrectiva,
      accionesPreventivas,
      semanaPrevista,
      porcentaje,
      semanaReal,
      photoRefs, // v2.63: JSON array of photo URLs linked to this hallazgo
      extra, // v2.72: snapshot del inventario (JSON string o objeto)
      // v2.75: nuevos campos de trazabilidad y unificación
      sourceId,
      comunicadoPorId: bodyComunicadoPorId,
      personaDemandadaId,
      verificadoPorId,
      tipo,
      status,
    } = body

    // Allow draft entries from actionplan source with placeholder description
    const effectiveDescription = hallazgo || itemDescription || (source === 'actionplan' ? 'Nueva entrada' : '')
    if (!effectiveDescription) {
      return NextResponse.json({ success: false, error: 'Missing description' }, { status: 400 })
    }

    // Validate projectId
    if (!projectId) {
      return NextResponse.json({ success: false, error: 'projectId is required. No project selected.' }, { status: 400 })
    }

    // Verify project exists
    const projectExists = await db.project.findUnique({ where: { id: projectId } })
    if (!projectExists) {
      return NextResponse.json({ success: false, error: `Project with id '${projectId}' not found` }, { status: 400 })
    }

    // ────────────────────────────────────────────────────────────────────
    // v2.78: comunicadoPorId SIEMPRE = usuario de la sesión.
    // El que detecta el hallazgo es quien hace el paso (autoeval/auditoría/
    // plan/inventario). Ignoramos cualquier valor que venga en el body.
    // ────────────────────────────────────────────────────────────────────
    const sessionUser = await getAuthUser(request)
    const comunicadoPorId = sessionUser?.id || bodyComunicadoPorId || null

    // Auto-increment numeroEntrada per project if not provided
    let nextNumero = numeroEntrada;
    if (nextNumero === undefined || nextNumero === null) {
      const lastAction = await db.actionItem.findFirst({
        where: { projectId },
        orderBy: { numeroEntrada: 'desc' },
      });
      nextNumero = (lastAction?.numeroEntrada || 0) + 1;
    }

    // ────────────────────────────────────────────────────────────────────
    // v2.78: Deduplicación estricta.
    // Si ya existe un ActionItem ABIERTO (estado in ['abierta','en_proceso'])
    // con el mismo (itemId, zoneId, projectId), hacemos UPDATE en lugar de
    // INSERT. Esto evita duplicados cuando el mismo NOK se detecta primero
    // en autoeval (paso 4) y luego de nuevo en auditoría (paso 5) sin que
    // se haya resuelto entre medias.
    //
    // Casos:
    //   - sourceId + itemId informados → dedup por (sourceId, itemId, zoneId)
    //   - solo itemId (autoeval/auditoría NOKs) → dedup por (itemId, zoneId, projectId)
    //   - actionplan manual (itemId tipo `PA-${sStep}-${Date.now()}`) →
    //     nunca colisiona, así que no se deduplica aunque entre en el bloque.
    // ────────────────────────────────────────────────────────────────────
    if (itemId) {
      const dupWhere: any = {
        projectId,
        itemId,
        estado: { in: ['abierta', 'en_proceso'] },
      }
      if (zoneId) {
        dupWhere.zoneId = zoneId
      } else {
        // zoneId null → buscar tanto si está seteado como si no
        dupWhere.OR = [{ zoneId: null }, { zoneId: undefined as any }]
      }
      // Si sourceId viene informado, restringimos por él (más preciso).
      // Si no, dedup solo por itemId+zoneId+projectId (caso autoeval/auditoría).
      if (sourceId) {
        dupWhere.sourceId = sourceId
      }

      const existing = await db.actionItem.findFirst({ where: dupWhere })

      if (existing) {
        // Deduplicación: actualizar el existente en lugar de crear uno nuevo.
        const dupUpdate: any = {}
        // Refrescar descripción si la nueva es más informativa
        if (hallazgo && hallazgo.length > (existing.hallazgo || '').length) {
          dupUpdate.hallazgo = hallazgo
          dupUpdate.itemDescription = effectiveDescription
        }
        if (mejora) dupUpdate.mejora = mejora
        // Subir prioridad si la nueva es mayor (alta > media > baja)
        const prioridadOrder: Record<string, number> = { baja: 1, media: 2, alta: 3 }
        const newPrio = prioridad || 'media'
        if (
          !existing.prioridad ||
          (prioridadOrder[newPrio] || 2) > (prioridadOrder[existing.prioridad] || 0)
        ) {
          dupUpdate.prioridad = newPrio
        }
        // Mantener comunicadoPorId si ya estaba, si no usar el nuevo
        if (!existing.comunicadoPorId && comunicadoPorId) {
          dupUpdate.comunicadoPorId = comunicadoPorId
        }
        // Mantener personaDemandadaId si ya estaba, si no usar el nuevo
        if (!existing.personaDemandadaId && personaDemandadaId) {
          dupUpdate.personaDemandadaId = personaDemandadaId
        }
        // Si el nuevo source es auditoría y el viejo era autoeval, "promocionar"
        if (
          source === 'auditoria' &&
          existing.source !== 'auditoria'
        ) {
          dupUpdate.source = 'auditoria'
          dupUpdate.miniStep = 5
          dupUpdate.auditor = auditor || existing.auditor
        }
        // Combinar photoRefs (existing + new sin duplicados)
        if (photoRefs) {
          try {
            const existingPhotos = existing.photoRefs ? JSON.parse(existing.photoRefs) : []
            const newPhotos = JSON.parse(photoRefs)
            if (Array.isArray(existingPhotos) && Array.isArray(newPhotos)) {
              const merged = Array.from(new Set([...existingPhotos, ...newPhotos]))
              dupUpdate.photoRefs = JSON.stringify(merged)
            }
          } catch {
            dupUpdate.photoRefs = photoRefs
          }
        }
        // Mergear extra (snapshot del inventario)
        if (extra) {
          try {
            const existingExtra = existing.extra ? JSON.parse(existing.extra) : {}
            const newExtra = typeof extra === 'string' ? JSON.parse(extra) : extra
            dupUpdate.extra = JSON.stringify({ ...existingExtra, ...newExtra })
          } catch {
            dupUpdate.extra = typeof extra === 'string' ? extra : JSON.stringify(extra)
          }
        }
        dupUpdate.updatedAt = new Date()

        const updated = await db.actionItem.update({
          where: { id: existing.id },
          data: dupUpdate,
        })
        console.log(`[actions POST] DEDUP: ActionItem ${existing.id} actualizado en lugar de crear duplicado (sourceId=${sourceId}, itemId=${itemId})`)
        return NextResponse.json({ success: true, data: updated, deduplicated: true })
      }
    }

    const action = await db.actionItem.create({
      data: {
        sStep: sStep || 0,
        miniStep: miniStep || 3,
        itemId: itemId || `ACT-${Date.now()}`,
        itemDescription: effectiveDescription,
        hallazgo: effectiveDescription,
        mejora: mejora || null,
        // v2.78: ya NO escribimos en campos legacy de texto (responsable,
        // verificadoPor, personaDemandada, comunicadoPor). Solo FKs.
        prioridad: prioridad || 'media',
        estado: estado || 'abierta',
        fechaCompromiso: fechaCompromiso ? new Date(fechaCompromiso) : null,
        fechaLimite: fechaLimite ? new Date(fechaLimite) : null,
        fechaReal: fechaReal ? new Date(fechaReal) : null,
        source: source || 'actionplan',
        auditor: auditor || null,
        zoneId: zoneId || null,
        projectId: projectId || '',
        numeroEntrada: nextNumero,
        fechaEntrada: fechaEntrada ? new Date(fechaEntrada) : new Date(),
        semana: semana || null,
        seccionDemandante: seccionDemandante || null,
        clienteZona: clienteZona || null,
        seccionDemandada: seccionDemandada || null,
        impactoObjetivo: impactoObjetivo || null,
        enviado: enviado || null,
        accionCorrectiva: accionCorrectiva || null,
        accionesPreventivas: accionesPreventivas || null,
        semanaPrevista: semanaPrevista || null,
        porcentaje: porcentaje !== undefined ? porcentaje : 0,
        semanaReal: semanaReal || null,
        photoRefs: photoRefs || null, // v2.63: fotos del hallazgo enlazadas al ActionItem
        extra: extra ? (typeof extra === 'string' ? extra : JSON.stringify(extra)) : null, // v2.72
        // v2.75/v2.78: nuevos campos
        sourceId: sourceId || null,
        comunicadoPorId, // siempre = session.user.id (inyectado por backend)
        personaDemandadaId: personaDemandadaId || null,
        verificadoPorId: verificadoPorId || null,
        tipo: tipo || 'accion',
        status: status || null,
      },
    })

    return NextResponse.json({ success: true, data: action })
  } catch (error) {
    console.error('Error creating action:', error)
    return NextResponse.json({ success: false, error: 'Error creating action' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing action ID' }, { status: 400 })
    }

    const body = await request.json()
    // v2.84: capturar sessionUser para los InventoryItem creados al cerrar
    // ActionItems (decision='Retirar'/'Eliminar') — el creador de ese
    // nuevo InventoryItem debe ser quien está cerrando la acción.
    const sessionUser = await getAuthUser(request)
    const updateData: any = {}

    if (body.estado !== undefined) updateData.estado = body.estado
    if (body.prioridad !== undefined) updateData.prioridad = body.prioridad
    // v2.78: 'responsable' como texto legacy ya NO se escribe.
    // Si el caller manda 'responsable' (texto), lo ignoramos — debe usar
    // 'personaDemandadaId' (FK) para asignar responsable.
    if (body.mejora !== undefined) updateData.mejora = body.mejora
    if (body.notas !== undefined) updateData.notas = body.notas
    if (body.fechaCompromiso !== undefined) updateData.fechaCompromiso = body.fechaCompromiso ? new Date(body.fechaCompromiso) : null
    if (body.fechaLimite !== undefined) updateData.fechaLimite = body.fechaLimite ? new Date(body.fechaLimite) : null
    if (body.fechaReal !== undefined) updateData.fechaReal = body.fechaReal ? new Date(body.fechaReal) : null
    if (body.zoneId !== undefined) updateData.zoneId = body.zoneId || null
    // v2.78: 'verificadoPor' (texto) ya NO se escribe. Usar verificadoPorId.
    // Plan de Acción table fields
    if (body.numeroEntrada !== undefined) updateData.numeroEntrada = body.numeroEntrada
    if (body.fechaEntrada !== undefined) updateData.fechaEntrada = body.fechaEntrada ? new Date(body.fechaEntrada) : null
    // v2.78: 'comunicadoPor' (texto) y 'personaDemandada' (texto) ya NO se
    // escriben. Solo se actualizan vía FK (comunicadoPorId / personaDemandadaId).
    if (body.semana !== undefined) updateData.semana = body.semana
    if (body.seccionDemandante !== undefined) updateData.seccionDemandante = body.seccionDemandante
    if (body.clienteZona !== undefined) updateData.clienteZona = body.clienteZona
    if (body.seccionDemandada !== undefined) updateData.seccionDemandada = body.seccionDemandada
    if (body.impactoObjetivo !== undefined) updateData.impactoObjetivo = body.impactoObjetivo
    if (body.enviado !== undefined) updateData.enviado = body.enviado
    if (body.accionCorrectiva !== undefined) updateData.accionCorrectiva = body.accionCorrectiva
    if (body.accionesPreventivas !== undefined) updateData.accionesPreventivas = body.accionesPreventivas
    if (body.semanaPrevista !== undefined) updateData.semanaPrevista = body.semanaPrevista
    if (body.porcentaje !== undefined) updateData.porcentaje = body.porcentaje
    if (body.semanaReal !== undefined) updateData.semanaReal = body.semanaReal
    if (body.photoRefs !== undefined) updateData.photoRefs = body.photoRefs // v2.63
    // v2.72: snapshot del inventario
    if (body.extra !== undefined) {
      updateData.extra = body.extra === null ? null
        : (typeof body.extra === 'string' ? body.extra : JSON.stringify(body.extra))
    }
    // Description fields
    if (body.hallazgo !== undefined) updateData.hallazgo = body.hallazgo
    if (body.itemDescription !== undefined) updateData.itemDescription = body.itemDescription
    if (body.notas !== undefined) updateData.notas = body.notas
    if (body.auditor !== undefined) updateData.auditor = body.auditor
    // v2.75: nuevos campos de trazabilidad y unificación
    if (body.sourceId !== undefined) updateData.sourceId = body.sourceId || null
    if (body.comunicadoPorId !== undefined) updateData.comunicadoPorId = body.comunicadoPorId || null
    if (body.personaDemandadaId !== undefined) updateData.personaDemandadaId = body.personaDemandadaId || null
    if (body.verificadoPorId !== undefined) updateData.verificadoPorId = body.verificadoPorId || null
    if (body.tipo !== undefined) updateData.tipo = body.tipo
    if (body.status !== undefined) updateData.status = body.status || null

    // If resolving, set resolution date
    if (body.estado === 'resuelta' || body.estado === 'cerrada') {
      updateData.fechaResolucion = new Date()
      updateData.fechaReal = updateData.fechaReal || new Date()
      // v2.75: si se está cerrando y viene verificadoPorId, lo persistimos
      if (body.verificadoPorId) updateData.verificadoPorId = body.verificadoPorId

      // ──────────────────────────────────────────────────────────────────
      // v2.77: Decisión de cierre + Jaula desde cualquier origen.
      // ──────────────────────────────────────────────────────────────────
      // El frontend (ActionPlanModal) puede enviar `decision` y
      // `diasCuarentena` cuando el usuario marca estado='cerrada':
      //   decision:        'Resuelto' | 'Retirar' | 'Eliminar'
      //   diasCuarentena:  número (solo relevante si decision='Retirar')
      //
      // Comportamiento:
      //  • source='inventario' + decision='Retirar'/'Eliminar' →
      //    actualizar el InventoryItem original (mantiene lógica v2.76):
      //      - Si decision='Eliminar' → jaulaStatus='transferido',
      //        jaulaDestino='Residuo', jaulaFechaSalida=now
      //      - Si decision='Retirar' → NO se hace nada aquí (el item ya
      //        está en jaula porque así lo creó /api/inventory/sync-actions).
      //        Si el snapshot trae zonaDestino, se marca transferido.
      //
      //  • source EN ('autoevaluacion', 'auditoria', 'actionplan') +
      //    decision='Retirar' → CREAR un nuevo InventoryItem con
      //    jaulaStatus='en_jaula', jaulaFechaEntrada=now,
      //    jaulaFechaLimite=now+diasCuarentena, zonaOrigen=zone.name,
      //    y guardar su id en ActionItem.extra.inventoryItemId para
      //    trazabilidad. Esto permite que la Jaula reciba hallazgos de
      //    los pasos 4 y 5, no solo del paso 3.
      //
      //  • Cualquier source + decision='Eliminar' y NO hay
      //    InventoryItem previo → se crea un InventoryItem efímero ya
      //    'transferido' a Residuo (para que aparezca en el histórico).
      //
      //  • decision='Resuelto' (o ausente) → no se toca la Jaula.
      try {
        const before = await db.actionItem.findUnique({
          where: { id },
          select: {
            source: true, extra: true, hallazgo: true, sStep: true,
            zoneId: true, projectId: true, itemId: true,
            // v2.84: incluir comunicadoPorId para que al crear el InventoryItem
            // derivado (jaula/residuo) podamos setear createdById.
            comunicadoPorId: true,
          },
        })
        if (!before) {
          throw new Error('ActionItem no encontrado al cerrar')
        }

        // Leer decisión del body; si no viene, intentar leerla del snapshot
        // existente (para source='inventario' que ya trae decision en extra).
        let snapshot: any = {}
        try { snapshot = before.extra ? JSON.parse(before.extra) : {} } catch {}
        const decision = body.decision || snapshot?.decision || null
        const diasCuarentena =
          typeof body.diasCuarentena === 'number' ? body.diasCuarentena :
          (snapshot?.diasCuarentena && !Number.isNaN(Number(snapshot.diasCuarentena)))
            ? Number(snapshot.diasCuarentena) : 40

        // Persistir la decisión + diasCuarentena en `extra` para trazabilidad
        if (body.decision || body.diasCuarentena !== undefined) {
          const newExtra = {
            ...snapshot,
            ...(body.decision ? { decision: body.decision } : {}),
            ...(body.diasCuarentena !== undefined ? { diasCuarentena } : {}),
            cierreDecisionAt: new Date().toISOString(),
          }
          updateData.extra = JSON.stringify(newExtra)
        }

        const source = before.source || 'actionplan'

        // ── Caso 1: source='inventario' → actualizar InventoryItem existente ──
        if (source === 'inventario' && snapshot?.inventoryItemId) {
          const invId = snapshot.inventoryItemId
          const invItem = await db.inventoryItem.findUnique({
            where: { id: invId },
            select: { id: true, jaulaStatus: true },
          })
          if (invItem && invItem.jaulaStatus === 'en_jaula') {
            // Si decision='Eliminar' → transferir a residuo
            // Si decision='Retirar' y hay zonaDestino → transferir
            // Si decision='Resuelto' → dejarlo en jaula (no debería pasar)
            if (decision === 'Eliminar') {
              await db.inventoryItem.update({
                where: { id: invId },
                data: {
                  jaulaStatus: 'transferido',
                  jaulaFechaSalida: new Date(),
                  jaulaDestino: 'Residuo',
                },
              })
              console.log(`[actions PUT] Inv ${invId} → Residuo (cerrar ActionItem ${id})`)
            } else if (decision === 'Retirar' && snapshot?.zonaDestino) {
              await db.inventoryItem.update({
                where: { id: invId },
                data: {
                  jaulaStatus: 'transferido',
                  jaulaFechaSalida: new Date(),
                  jaulaDestino: snapshot.zonaDestino,
                },
              })
              console.log(`[actions PUT] Inv ${invId} → ${snapshot.zonaDestino} (cerrar ActionItem ${id})`)
            }
          }
        } else if (
          // ── Caso 2: source en pasos 4/5/plan + decision='Retirar' → crear Inv en jaula ──
          ['autoevaluacion', 'auditoria', 'actionplan'].includes(source) &&
          decision === 'Retirar'
        ) {
          // Buscar nombre de la zona para zonaOrigen
          let zoneName = 'Sin zona'
          if (before.zoneId) {
            const z = await db.zone.findUnique({
              where: { id: before.zoneId },
              select: { name: true },
            })
            if (z?.name) zoneName = z.name
          }

          const now = new Date()
          const limite = new Date(now.getTime() + diasCuarentena * 24 * 60 * 60 * 1000)

          // Crear InventoryItem en jaula
          const newInv = await db.inventoryItem.create({
            data: {
              sStep: before.sStep || 5,
              name: (before.hallazgo || 'Hallazgo').slice(0, 120),
              location: zoneName,
              category: 'innecesario',
              quantity: 1,
              price: null,
              action: 'Retirar a Jaula de cuarentena',
              projectId: before.projectId,
              zoneId: before.zoneId || null,
              jaulaStatus: 'en_jaula',
              jaulaFechaEntrada: now,
              jaulaOrigen: zoneName,
              jaulaFechaLimite: limite,
              zonaOrigen: zoneName,
              zonaDestino: null,
              // v2.84: el usuario que está cerrando la acción es quien
              // "crea" el InventoryItem en jaula (para trazabilidad).
              createdById: sessionUser?.id || before.comunicadoPorId || null,
              extra: JSON.stringify({
                origen: 'actionplan',
                sourceActionItemId: id,
                source: before.source,
                miniStep: before.source === 'autoevaluacion' ? 4 : (before.source === 'auditoria' ? 5 : 3),
                itemId: before.itemId,
                decision: 'Retirar',
                diasCuarentena,
                capturedAt: now.toISOString(),
              }),
            },
          })

          // Guardar inventoryItemId en extra del ActionItem para trazabilidad inversa
          const newExtra = {
            ...snapshot,
            inventoryItemId: newInv.id,
            decision: 'Retirar',
            diasCuarentena,
            jaulaCreadaEn: now.toISOString(),
          }
          updateData.extra = JSON.stringify(newExtra)

          console.log(`[actions PUT] Creado InventoryItem ${newInv.id} en jaula desde ActionItem ${id} (source=${source})`)

          // Notificar a gerentes/admins del proyecto que hay un nuevo item en jaula
          try {
            const admins = await db.projectMember.findMany({
              where: { projectId: before.projectId, role: { in: ['gerente', 'admin', 'responsable'] } },
              select: { userId: true },
            })
            for (const a of admins) {
              await db.notification.create({
                data: {
                  userId: a.userId,
                  type: 'new_action_item',
                  title: `Item en Jaula: ${(before.hallazgo || 'Hallazgo').slice(0, 50)}`,
                  message: `Al cerrar un hallazgo de ${source} se ha creado un item en la Jaula de cuarentena (${zoneName}). Salida prevista: ${limite.toLocaleDateString('es-ES')}.\n\n[ref:${newInv.id}]`,
                  sStep: before.sStep || 5,
                  zoneId: before.zoneId || null,
                  projectId: before.projectId,
                },
              })
            }
          } catch (notifErr) {
            console.error('[actions PUT] Error notificando jaula:', notifErr)
          }
        } else if (
          // ── Caso 3: cualquier source + decision='Eliminar' sin InventoryItem previo ──
          ['autoevaluacion', 'auditoria', 'actionplan'].includes(source) &&
          decision === 'Eliminar'
        ) {
          // Crear InventoryItem efímero ya 'transferido' a Residuo para histórico
          let zoneName = 'Sin zona'
          if (before.zoneId) {
            const z = await db.zone.findUnique({
              where: { id: before.zoneId },
              select: { name: true },
            })
            if (z?.name) zoneName = z.name
          }
          const now = new Date()
          const newInv = await db.inventoryItem.create({
            data: {
              sStep: before.sStep || 5,
              name: (before.hallazgo || 'Hallazgo').slice(0, 120),
              location: zoneName,
              category: 'innecesario',
              quantity: 1,
              action: 'Eliminar a Residuo',
              projectId: before.projectId,
              zoneId: before.zoneId || null,
              jaulaStatus: 'transferido',
              jaulaFechaEntrada: now,
              jaulaFechaSalida: now,
              jaulaOrigen: zoneName,
              jaulaDestino: 'Residuo',
              zonaOrigen: zoneName,
              // v2.84: el usuario que está cerrando la acción es quien
              // "crea" el InventoryItem efímero (para trazabilidad).
              createdById: sessionUser?.id || before.comunicadoPorId || null,
              extra: JSON.stringify({
                origen: 'actionplan',
                sourceActionItemId: id,
                source: before.source,
                decision: 'Eliminar',
                capturedAt: now.toISOString(),
              }),
            },
          })
          const newExtra = {
            ...snapshot,
            inventoryItemId: newInv.id,
            decision: 'Eliminar',
            jaulaCreadaEn: now.toISOString(),
          }
          updateData.extra = JSON.stringify(newExtra)
          console.log(`[actions PUT] Creado InventoryItem efímero ${newInv.id} → Residuo desde ActionItem ${id}`)
        }
      } catch (syncErr) {
        console.error('[actions PUT] Error auto-sincronizando inventario jaula:', syncErr)
        // No bloquear el cierre del ActionItem si la sincronización falla
      }
    }

    const action = await db.actionItem.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, data: action })
  } catch (error) {
    console.error('Error updating action:', error)
    return NextResponse.json({ success: false, error: 'Error updating action' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing action ID' }, { status: 400 })
    }

    await db.actionItem.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting action:', error)
    return NextResponse.json({ success: false, error: 'Error deleting action' }, { status: 500 })
  }
}
