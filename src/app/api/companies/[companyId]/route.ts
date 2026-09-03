import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { getAuthUser } from '../../../../lib/auth-helpers'

// GET /api/companies/[companyId] - Get company with projects and members
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }

    const isGestor = user.role === 'gestor'
    const isMember = !isGestor ? await db.companyMember.findFirst({
      where: { companyId, userId: user.id },
    }) : true

    if (!isGestor && !isMember) {
      return NextResponse.json({ success: false, error: 'Sin permisos' }, { status: 403 })
    }

    const company = await db.company.findUnique({
      where: { id: companyId },
      include: {
        projects: {
          where: { active: true },
          include: {
            _count: { select: { members: true } },
            zones: { orderBy: { createdAt: 'asc' } },
          },
          orderBy: { createdAt: 'desc' },
        },
        // Nota: Company no tiene 'members' directo, usamos CompanyMember
      },
    })

    if (!company) {
      return NextResponse.json({ success: false, error: 'Empresa no encontrada' }, { status: 404 })
    }

    // Obtener miembros por separado usando CompanyMember
    const members = await db.companyMember.findMany({
      where: { companyId },
      include: {
        user: { select: { id: true, name: true, email: true, role: true, active: true } },
      },
      orderBy: { joinedAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      company: {
        id: company.id,
        name: company.name,
        description: company.description,
        active: company.active,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
        // Datos fiscales y contacto
        nif: company.nif,
        sector: company.sector,
        address: company.address,
        city: company.city,
        province: company.province,
        postalCode: company.postalCode,
        country: company.country,
        phone: company.phone,
        website: company.website,
        // Facturación
        billingEmail: company.billingEmail,
        billingName: company.billingName,
        billingNif: company.billingNif,
        billingAddress: company.billingAddress,
        billingCity: company.billingCity,
        billingPostalCode: company.billingPostalCode,
        // Bancario
        iban: company.iban,
        // Contacto
        contactName: company.contactName,
        contactEmail: company.contactEmail,
        contactPhone: company.contactPhone,
        // Relaciones
        projects: company.projects.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          company: p.company,
          companyId: p.companyId,
          startDate: p.startDate,
          active: p.active,
          zones: p.zones,
          memberCount: p._count.members,
        })),
        members: members.map((m) => ({
          id: m.id,
          userId: m.userId,
          companyId: m.companyId,
          role: m.role,
          joinedAt: m.joinedAt,
          user: m.user,
        })),
      },
    })
  } catch (error) {
    console.error('Get company error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    const errorStack = error instanceof Error ? error.stack : ''
    console.error('Error details:', { message: errorMessage, stack: errorStack })
    return NextResponse.json({ 
      success: false, 
      error: `Error al obtener empresa: ${errorMessage}`,
      details: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
    }, { status: 500 })
  }
}

// PUT /api/companies/[companyId] - Update company
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }
    if (user.role !== 'gestor' && user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Sin permisos para editar empresas' }, { status: 403 })
    }

    // Admin can only edit companies they're a member of; gestor can edit any
    if (user.role === 'admin') {
      const membership = await db.companyMember.findFirst({ where: { companyId, userId: user.id } })
      if (!membership) {
        return NextResponse.json({ success: false, error: 'Solo puedes editar empresas donde eres miembro' }, { status: 403 })
      }
    }

    const body = await request.json()
    const { 
      name, description, active,
      nif, sector, address, city, province, postalCode, country,
      phone, website, billingEmail, billingName, billingNif,
      billingAddress, billingCity, billingPostalCode, iban,
      contactName, contactEmail, contactPhone
    } = body

    const data: any = {}
    if (name !== undefined) data.name = name.trim()
    if (description !== undefined) data.description = description?.trim() || null
    if (active !== undefined) data.active = active
    // Datos fiscales y de contacto
    if (nif !== undefined) data.nif = nif?.trim() || null
    if (sector !== undefined) data.sector = sector?.trim() || null
    if (address !== undefined) data.address = address?.trim() || null
    if (city !== undefined) data.city = city?.trim() || null
    if (province !== undefined) data.province = province?.trim() || null
    if (postalCode !== undefined) data.postalCode = postalCode?.trim() || null
    if (country !== undefined) data.country = country?.trim() || null
    if (phone !== undefined) data.phone = phone?.trim() || null
    if (website !== undefined) data.website = website?.trim() || null
    // Facturación
    if (billingEmail !== undefined) data.billingEmail = billingEmail?.trim() || null
    if (billingName !== undefined) data.billingName = billingName?.trim() || null
    if (billingNif !== undefined) data.billingNif = billingNif?.trim() || null
    if (billingAddress !== undefined) data.billingAddress = billingAddress?.trim() || null
    if (billingCity !== undefined) data.billingCity = billingCity?.trim() || null
    if (billingPostalCode !== undefined) data.billingPostalCode = billingPostalCode?.trim() || null
    // Bancario
    if (iban !== undefined) data.iban = iban?.trim() || null
    // Contacto
    if (contactName !== undefined) data.contactName = contactName?.trim() || null
    if (contactEmail !== undefined) data.contactEmail = contactEmail?.trim() || null
    if (contactPhone !== undefined) data.contactPhone = contactPhone?.trim() || null

    // Check for duplicate name if changing
    if (name) {
      const existing = await db.company.findFirst({
        where: { name: name.trim(), NOT: { id: companyId } },
      })
      if (existing) {
        return NextResponse.json({ success: false, error: 'Ya existe una empresa con ese nombre' }, { status: 400 })
      }
    }

    const company = await db.company.update({
      where: { id: companyId },
      data,
      include: { _count: { select: { projects: true, members: true } } }
    })

    return NextResponse.json({
      success: true,
      company: {
        id: company.id,
        name: company.name,
        description: company.description,
        active: company.active,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
        projectCount: company._count.projects,
        memberCount: company._count.members,
        // Todos los datos adicionales
        nif: company.nif,
        sector: company.sector,
        address: company.address,
        city: company.city,
        province: company.province,
        postalCode: company.postalCode,
        country: company.country,
        phone: company.phone,
        website: company.website,
        billingEmail: company.billingEmail,
        billingName: company.billingName,
        billingNif: company.billingNif,
        billingAddress: company.billingAddress,
        billingCity: company.billingCity,
        billingPostalCode: company.billingPostalCode,
        iban: company.iban,
        contactName: company.contactName,
        contactEmail: company.contactEmail,
        contactPhone: company.contactPhone,
      },
    })
  } catch (error) {
    console.error('Update company error:', error)
    return NextResponse.json({ success: false, error: 'Error al actualizar empresa' }, { status: 500 })
  }
}

// DELETE /api/companies/[companyId] - Delete company (gestor only)
//
// ORDEN DE BORRADO (v3.0.7 - CORREGIDO):
// 1. Projects → Zones → MemberZones → ProjectMembers → Project
// 2. CompanyMembers (desasigna usuarios de esta empresa)
// 3. Templates de esta empresa (companyId no null)
// 4. Subscription
// 5. Company (la empresa en sí)
// 6. Admins huérfanos (users sin empresas, solo si son admin)
//
// LO QUE NO SE BORRA:
// - User (excepto admins huérfanos explícitamente)
// - Gestor (nunca se borra)
// - Usuarios con membresía en otras empresas
// - Templates del sistema (companyId = null)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }
    if (user.role !== 'gestor') {
      return NextResponse.json({ success: false, error: 'Solo el gestor (dueño de la app) puede eliminar empresas' }, { status: 403 })
    }

    // Get company info before deletion
    const company = await db.company.findUnique({
      where: { id: companyId },
      include: {
        projects: {
          select: { id: true, name: true },
        },
        members: {
          include: {
            user: { select: { id: true, role: true, active: true } },
          },
        },
      },
    })

    if (!company) {
      return NextResponse.json({ success: false, error: 'Empresa no encontrada' }, { status: 404 })
    }

    const projectCount = company.projects.length

    // Find orphan admins to delete along with the company
    // Un admin es "huérfano" si solo pertenece a esta empresa
    const orphanAdminIds: string[] = []
    for (const member of company.members) {
      if (member.user.role === 'admin') {
        const otherMemberships = await db.companyMember.count({
          where: {
            userId: member.userId,
            NOT: { companyId },
          },
        })
        if (otherMemberships === 0) {
          orphanAdminIds.push(member.userId)
        }
      }
    }

    // ── Delete all projects and their related data manually ──
    // Orden correcto para evitar FK constraint errors
    let deletedProjectCount = 0
    const errors: string[] = []

    for (const project of company.projects) {
      try {
        // Usar transacción por proyecto para atomicidad
        await db.$transaction(async (tx) => {
          // ─── 1. Datos sin cascade ───
          await tx.notification.deleteMany({ where: { projectId: project.id } })

          // ─── 2. Obtener IDs ───
          const zoneIds = (await tx.zone.findMany({
            where: { projectId: project.id },
            select: { id: true },
          })).map(z => z.id)

          const memberIds = (await tx.projectMember.findMany({
            where: { projectId: project.id },
            select: { id: true },
          })).map(m => m.id)

          // ─── 3. MemberZone (desasignar usuarios de zonas) ───
          if (zoneIds.length > 0) {
            await tx.memberZone.deleteMany({ where: { zoneId: { in: zoneIds } } })
          }
          if (memberIds.length > 0) {
            await tx.memberZone.deleteMany({ where: { memberId: { in: memberIds } } })
          }

          // ─── 4. Zonas (cascade borra sus datos hijos) ───
          if (zoneIds.length > 0) {
            await tx.zone.deleteMany({ where: { id: { in: zoneIds } } })
          }

          // ─── 5. ProjectMembers (desasignar usuarios del proyecto) ───
          // Los User NO se borran aquí
          if (memberIds.length > 0) {
            await tx.projectMember.deleteMany({ where: { id: { in: memberIds } } })
          }

          // ─── 6. El Proyecto (cascade borra datos restantes) ───
          await tx.project.delete({ where: { id: project.id } })
        })

        deletedProjectCount++
      } catch (projectDeleteError) {
        const errMsg = projectDeleteError instanceof Error ? projectDeleteError.message : String(projectDeleteError)
        console.error(`Error deleting project ${project.id} (${project.name}):`, errMsg)
        errors.push(`Proyecto "${project.name}": ${errMsg}`)
      }
    }

    // If some projects failed to delete, try the cascade approach (works if migration is applied)
    if (errors.length > 0 && deletedProjectCount < projectCount) {
      try {
        await db.company.delete({ where: { id: companyId } })
        // If we get here, cascade worked
        return NextResponse.json({
          success: true,
          deletedProjectCount: projectCount,
          deletedAdminCount: 0,
          message: 'Empresa eliminada permanentemente (via cascade)',
        })
      } catch {
        // Cascade didn't work either, report errors
        return NextResponse.json({
          success: false,
          error: `No se pudieron eliminar todos los proyectos. Errores: ${errors.join('; ')}`,
        }, { status: 500 })
      }
    }

    // ── Delete CompanyMembers (usuarios de esta empresa) ──
    // Los User NO se borran, solo se desasignan de esta empresa
    await db.companyMember.deleteMany({ where: { companyId } })

    // ── Delete templates specific to this company ──
    await db.template.deleteMany({ where: { companyId } })

    // ── Delete subscription ──
    await db.subscription.deleteMany({ where: { companyId } }).catch(() => {})

    // ── Delete the Company (finalmente) ──
    await db.company.delete({ where: { id: companyId } })

    // ── Delete orphan admin users that no longer have any company ──
    let deletedAdminCount = 0
    for (const userId of orphanAdminIds) {
      try {
        // Verificar que todavía no tenga empresas (por si acaso)
        const remainingCompanies = await db.companyMember.count({ where: { userId } })
        if (remainingCompanies === 0) {
          // Borrar datos restantes del usuario
          await db.session.deleteMany({ where: { userId } })
          await db.employeeProgress.deleteMany({ where: { userId } })
          await db.inventoryItem.deleteMany({ where: { createdById: userId } })
          
          // Finalmente borrar el usuario admin huérfano
          await db.user.delete({ where: { id: userId } })
          deletedAdminCount++
        }
      } catch (userDeleteError) {
        console.error(`Error deleting orphan admin ${userId}:`, userDeleteError)
      }
    }

    const parts: string[] = ['Empresa eliminada permanentemente']
    if (deletedProjectCount > 0) parts.push(`${deletedProjectCount} proyecto(s) eliminado(s)`)
    if (deletedAdminCount > 0) parts.push(`${deletedAdminCount} administrador(es) huérfano(s) eliminado(s)`)

    return NextResponse.json({
      success: true,
      deletedProjectCount,
      deletedAdminCount,
      message: parts.join(' — '),
    })
  } catch (error) {
    console.error('Delete company error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error al eliminar empresa'
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
