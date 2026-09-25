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
        User: { select: { id: true, name: true, email: true, password: true, plainPassword: true, role: true, active: true } },
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
          user: m.User,  // El campo en Prisma es 'User' (mayúscula)
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
      include: { _count: { select: { projects: true } } }
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
    const errorMessage = error instanceof Error ? error.message : 'Error al actualizar empresa'
    const errorStack = error instanceof Error ? error.stack : ''
    console.error('Update error details:', { message: errorMessage, stack: errorStack })
    return NextResponse.json({ 
      success: false, 
      error: errorMessage,
      details: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
    }, { status: 500 })
  }
}

// DELETE /api/companies/[companyId] - Delete company (gestor only)
//
// v3.0.63: REESCRITURA COMPLETA - Borrar ABSOLUTAMENTE TODO
//
// ORDEN DE BORRADO (CORREGIDO Y COMPLETO):
// 1. Obtener TODOS los usuarios de esta empresa
// 2. Para cada proyecto: notificaciones → memberZones → zones → projectMembers → project
// 3. Borrar CompanyMembers
// 4. Borrar Templates
// 5. Borrar Subscription
// 6. Borrar Company
// 7. Borrar TODOS los datos de usuarios huérfanos (sessions, progress, inventory, ZONAS del usuario, etc.)
// 8. Borrar los propios usuarios huérfanos
//
// REGLA DE ORO: Si se borra una empresa, se BORRA TODO rastro
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  let companyId = ''
  
  try {
    ({ companyId } = await params)
    console.log(`[DELETE company v3.0.63] Iniciando eliminación TOTAL para companyId: ${companyId}`)
    
    const user = await getAuthUser(request)
    console.log(`[DELETE company] Usuario autenticado:`, { id: user?.id, email: user?.email, role: user?.role })
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }
    if (user.role !== 'gestor') {
      return NextResponse.json({ success: false, error: 'Solo el gestor puede eliminar empresas' }, { status: 403 })
    }

    // ── 1. Obtener información completa de la empresa ──
    const company = await db.company.findUnique({
      where: { id: companyId },
      include: {
        projects: { select: { id: true, name: true } },
        CompanyMember: {
          include: {
            User: { select: { id: true, role: true, active: true, email: true, name: true } },
          },
        },
      },
    })

    if (!company) {
      return NextResponse.json({ success: false, error: 'Empresa no encontrada' }, { status: 404 })
    }

    const projectCount = company.projects.length
    const allMembers = company.CompanyMember
    
    // ── 2. Identificar usuarios a borrar (todos excepto gestores) ──
    const usersToDelete: Array<{id: string, email: string, name: string, role: string}> = []
    for (const member of allMembers) {
      if (member.User.role === 'gestor') {
        console.log(`[DELETE company] Omitiendo gestor: ${member.User.email}`)
        continue
      }
      
      // Verificar si tiene otras empresas
      const otherCompanies = await db.companyMember.count({
        where: { userId: member.userId, NOT: { companyId } }
      })
      
      if (otherCompanies === 0) {
        usersToDelete.push({
          id: member.User.id,
          email: member.User.email,
          name: member.User.name,
          role: member.User.role
        })
      } else {
        console.log(`[DELETE company] Usuario ${member.User.email} tiene otras empresas (${otherCompanies}), no se borrará`)
      }
    }

    console.log(`[DELETE company] Resumen:`)
    console.log(`  - Proyectos a borrar: ${projectCount}`)
    console.log(`  - Miembros totales: ${allMembers.length}`)
    console.log(`  - Usuarios huérfanos a borrar: ${usersToDelete.length}`, usersToDelete.map(u => u.email))

    // ── 3. Borrar TODOS los proyectos y sus datos ──
    let deletedProjectCount = 0
    for (const project of company.projects) {
      try {
        console.log(`[DELETE company] Borrando proyecto: ${project.name} (${project.id})`)
        
        await db.$transaction(async (tx) => {
          // Notificaciones del proyecto
          await tx.notification.deleteMany({ where: { projectId: project.id } })
          
          // Obtener zonas del proyecto
          const zones = await tx.zone.findMany({
            where: { projectId: project.id },
            select: { id: true }
          })
          const zoneIds = zones.map(z => z.id)
          
          // Obtener miembros del proyecto
          const projectMembers = await tx.projectMember.findMany({
            where: { projectId: project.id },
            select: { id: true }
          })
          const projectMemberIds = projectMembers.map(m => m.id)
          
          // Borrar MemberZone (asignaciones de zonas)
          if (zoneIds.length > 0) {
            await tx.memberZone.deleteMany({ where: { zoneId: { in: zoneIds } } })
          }
          if (projectMemberIds.length > 0) {
            await tx.memberZone.deleteMany({ where: { memberId: { in: projectMemberIds } } })
          }
          
          // Borrar zonas
          if (zoneIds.length > 0) {
            await tx.zone.deleteMany({ where: { id: { in: zoneIds } } })
          }
          
          // Borrar miembros del proyecto
          if (projectMemberIds.length > 0) {
            await tx.projectMember.deleteMany({ where: { id: { in: projectMemberIds } } })
          }
          
          // Borrar el proyecto
          await tx.project.delete({ where: { id: project.id } })
        })
        
        deletedProjectCount++
        console.log(`[DELETE company] ✅ Proyecto borrado: ${project.name}`)
      } catch (err) {
        console.error(`[DELETE company] ❌ Error borrando proyecto ${project.id}:`, err)
      }
    }

    // ── 4. Borrar CompanyMembers (desvincular usuarios de esta empresa) ──
    console.log(`[DELETE company] Borrando CompanyMembers...`)
    await db.companyMember.deleteMany({ where: { companyId } })

    // ── 5. Borrar Templates de esta empresa ──
    console.log(`[DELETE company] Borrando Templates...`)
    await db.template.deleteMany({ where: { companyId } })

    // ── 6. Borrar Subscription ──
    console.log(`[DELETE company] Borrando Subscription...`)
    await db.subscription.deleteMany({ where: { companyId } }).catch(() => {})

    // ── 7. Borrar la Empresa ──
    console.log(`[DELETE company] Borrando la Company...`)
    await db.company.delete({ where: { id: companyId } })

    // ── 8. BORRAR COMPLETAMENTE LOS USUARIOS HUÉRFANOS Y TODOS SUS DATOS ──
    let deletedUserCount = 0
    const userErrors: string[] = []
    
    for (const userToDelete of usersToDelete) {
      try {
        console.log(`[DELETE company] Borrando usuario huérfano: ${userToDelete.email} (${userToDelete.role})`)
        
        // 8a. Sessions del usuario
        await db.session.deleteMany({ where: { userId: userToDelete.id } }).catch(() => {})
        
        // 8b. EmployeeProgress del usuario
        await db.employeeProgress.deleteMany({ where: { userId: userToDelete.id } }).catch(() => {})
        
        // 8c. InventoryItems creados por el usuario
        await db.inventoryItem.deleteMany({ where: { createdById: userToDelete.id } }).catch(() => {})
        
        // 8d. Zonas donde el usuario pueda ser miembro (por si acaso)
        // Primero encontrar MemberZones del usuario
        const userMemberZones = await db.memberZone.findMany({
          where: { 
            Member: { 
              User: { id: userToDelete.id } 
            } 
          },
          select: { id: true }
        })
        if (userMemberZones.length > 0) {
          await db.memberZone.deleteMany({ 
            where: { id: { in: userMemberZones.map(mz => mz.id) } } 
          }).catch(() => {})
        }
        
        // 8e. ProjectMembers restantes del usuario
        await db.projectMember.deleteMany({ 
          where: { userId: userToDelete.id } 
        }).catch(() => {})
        
        // 8f. CUALQUIER CompanyMember restante (por seguridad)
        await db.companyMember.deleteMany({ 
          where: { userId: userToDelete.id } 
        }).catch(() => {})
        
        // 8g. Finalmente BORRAR EL USUARIO
        await db.user.delete({ where: { id: userToDelete.id } })
        
        deletedUserCount++
        console.log(`[DELETE company] ✅ Usuario borrado: ${userToDelete.email}`)
      } catch (userErr) {
        const errMsg = userErr instanceof Error ? userErr.message : String(userErr)
        console.error(`[DELETE company] ❌ Error borrando usuario ${userToDelete.email}:`, errMsg)
        userErrors.push(`${userToDelete.email}: ${errMsg}`)
      }
    }

    // ── RESPUESTA FINAL ──
    const parts: string[] = ['🗑️ Empresa eliminada permanentemente']
    parts.push(`${deletedProjectCount} proyecto(s) eliminado(s)`)
    parts.push(`${deletedUserCount} usuario(s) eliminado(s)`)
    
    if (userErrors.length > 0) {
      parts.push(`${userErrors.length} error(es) al borrar usuarios`)
    }

    console.log(`[DELETE company] ✅ ELIMINACIÓN COMPLETADA:`, parts.join(' | '))

    return NextResponse.json({
      success: true,
      deletedProjectCount,
      deletedUserCount,
      totalUsersInCompany: allMembers.length,
      orphanUsersFound: usersToDelete.length,
      errors: userErrors.length > 0 ? userErrors : undefined,
      message: parts.join(' — '),
    })
  } catch (error) {
    console.error('[DELETE company] Error general:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error al eliminar empresa'
    console.error(`[DELETE company] Detalles del error:`, {
      companyId,
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    })
    
    // SIEMPRE devolver JSON válido
    return NextResponse.json({ 
      success: false, 
      error: `Error al eliminar empresa: ${errorMessage}`,
      _debug: {
        companyId,
        timestamp: new Date().toISOString()
      }
    }, { status: 500 })
  }
}
