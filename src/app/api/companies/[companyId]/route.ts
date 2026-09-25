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
// v3.0.64: REESCRITURA COMPLETA - Borrar ABSOLUTAMENTE TODO
//
// RELACIONES DE USER que debemos manejar (del schema.prisma):
//   - CompanyMember[]
//   - EmployeeProgress[]
//   - InventoryItem[] (createdById)
//   - Project[] (jaulaVerifiedById)
//   - projects/ProjectMember[]
//   - Session[]
//   - Zone[] (responsableId)
//   - Notification (userId, sin cascade)
//
// ORDEN DE BORRADO:
// 1. Obtener empresa con todos sus datos
// 2. Identificar usuarios huérfanos (solo pertenecen a esta empresa)
// 3. Borrar proyectos con TODAS sus relaciones en cascada
// 4. Borrar CompanyMembers
// 5. Borrar Templates, Subscription
// 6. Borrar Company
// 7. Para CADA usuario huérfano: borrar TODOS sus datos y luego el usuario
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  let companyId = ''
  
  try {
    ({ companyId } = await params)
    console.log(`[DELETE company v3.0.64] Iniciando eliminación TOTAL para companyId: ${companyId}`)
    
    const user = await getAuthUser(request)
    console.log(`[DELETE company] Usuario autenticado:`, { id: user?.id, email: user?.email, role: user?.role })
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }
    if (user.role !== 'gestor') {
      return NextResponse.json({ success: false, error: 'Solo el gestor puede eliminar empresas' }, { status: 403 })
    }

    // ═══════════════════════════════════════════════════════════════
    // 1. OBTENER INFORMACIÓN COMPLETA DE LA EMPRESA
    // ═══════════════════════════════════════════════════════════════
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

    const projectIds = company.projects.map(p => p.id)
    const allMembers = company.CompanyMember
    
    // ═══════════════════════════════════════════════════════════════
    // 2. IDENTIFICAR USUARIOS HUÉRFANOS A BORRAR
    // ═══════════════════════════════════════════════════════════════
    const usersToDelete: Array<{id: string, email: string, name: string, role: string}> = []
    
    for (const member of allMembers) {
      // NUNCA borrar gestores del sistema
      if (member.User.role === 'gestor') {
        console.log(`[DELETE company] ⏭️ Omitiendo gestor: ${member.User.email}`)
        continue
      }
      
      // Verificar si el usuario pertenece a otras empresas
      const otherCompanyCount = await db.companyMember.count({
        where: { 
          userId: member.userId, 
          NOT: { companyId } 
        }
      })
      
      if (otherCompanyCount === 0) {
        // Este usuario SOLO pertenece a esta empresa → es huérfano
        usersToDelete.push({
          id: member.User.id,
          email: member.User.email,
          name: member.User.name,
          role: member.User.role
        })
        console.log(`[DELETE company] 🎯 Usuario huérfano identificado: ${member.User.email} (${member.User.role})`)
      } else {
        console.log(`[DELETE company] 🔒 Usuario ${member.User.email} tiene ${otherCompanyCount} empresa(s) más, se conserva`)
      }
    }

    console.log(`[DELETE company] 📊 RESUMEN PRE-BORRADO:`)
    console.log(`   • Proyectos a eliminar: ${projectIds.length}`, projectIds)
    console.log(`   • Miembros totales en empresa: ${allMembers.length}`)
    console.log(`   • Usuarios huérfanos a eliminar: ${usersToDelete.length}`, usersToDelete.map(u => u.email))

    // ═══════════════════════════════════════════════════════════════
    // 3. BORRAR TODOS LOS PROYECTOS Y SUS DATOS COMPLETOS
    // ═══════════════════════════════════════════════════════════════
    let deletedProjectCount = 0
    
    for (const project of company.projects) {
      try {
        console.log(`[DELETE company] 🗑️ Procesando proyecto: ${project.name} (${project.id})`)
        
        // Usar transacción para asegurar atomicidad por proyecto
        await db.$transaction(async (tx) => {
          const pid = project.id
          
          // 3.1. Notificaciones del proyecto
          await tx.notification.deleteMany({ where: { projectId: pid } })
          
          // 3.2. Obtener todas las zonas del proyecto
          const zones = await tx.zone.findMany({
            where: { projectId: pid },
            select: { id: true }
          })
          const zoneIds = zones.map(z => z.id)
          
          // 3.3. Obtener todos los miembros del proyecto
          const projectMembers = await tx.projectMember.findMany({
            where: { projectId: pid },
            select: { id: true, userId: true }
          })
          const projectMemberIds = projectMembers.map(m => m.id)
          
          // 3.4. Borrar datos de zonas (en orden correcto)
          if (zoneIds.length > 0) {
            // ActionItems de las zonas
            await tx.actionItem.deleteMany({ where: { zoneId: { in: zoneIds } } })
            // AuditTargets de las zonas
            await tx.auditTarget.deleteMany({ where: { zoneId: { in: zoneIds } } })
            // EmployeeProgress de las zonas
            await tx.employeeProgress.deleteMany({ where: { zoneId: { in: zoneIds } } })
            // EvaluationSchedule de las zonas
            await tx.evaluationSchedule.deleteMany({ where: { zoneId: { in: zoneIds } } })
            // InventoryItems de las zonas
            await tx.inventoryItem.deleteMany({ where: { zoneId: { in: zoneIds } } })
            // PDCAItems de las zonas
            await tx.pDCAItem.deleteMany({ where: { zoneId: { in: zoneIds } } })
            // PhotoLibrary de las zonas
            await tx.photoLibrary.deleteMany({ where: { zoneId: { in: zoneIds } } })
            // Progress de las zonas
            await tx.progress.deleteMany({ where: { zoneId: { in: zoneIds } } })
            // Standards de las zonas
            await tx.standard.deleteMany({ where: { zoneId: { in: zoneIds } } })
            
            // MemberZones de estas zonas
            await tx.memberZone.deleteMany({ where: { zoneId: { in: zoneIds } } })
            
            // Las propias Zonas (poner responsableId a null antes)
            await tx.zone.updateMany({
              where: { id: { in: zoneIds }, responsableId: { not: null } },
              data: { responsableId: null }
            })
            await tx.zone.deleteMany({ where: { id: { in: zoneIds } } })
          }
          
          // 3.5. Borrar datos directos del proyecto
          await tx.actionItem.deleteMany({ where: { projectId: pid, zoneId: null } })
          await tx.auditResult.deleteMany({ where: { projectId: pid } })
          await tx.auditTarget.deleteMany({ where: { projectId: pid, zoneId: null } })
          await tx.checklistResponse.deleteMany({ where: { projectId: pid } })
          await tx.employeeProgress.deleteMany({ where: { projectId: pid, zoneId: null } })
          await tx.evaluationSchedule.deleteMany({ where: { projectId: pid, zoneId: null } })
          await tx.examAnswer.deleteMany({ where: { projectId: pid } })
          await tx.inventoryItem.deleteMany({ where: { projectId: pid, zoneId: null } })
          await tx.pDCAItem.deleteMany({ where: { projectId: pid, zoneId: null } })
          await tx.photoLibrary.deleteMany({ where: { projectId: pid, zoneId: null } })
          await tx.progress.deleteMany({ where: { projectId: pid, zoneId: null } })
          await tx.standard.deleteMany({ where: { projectId: pid, zoneId: null } })
          
          // 3.6. MemberZones de los miembros del proyecto
          if (projectMemberIds.length > 0) {
            await tx.memberZone.deleteMany({ where: { memberId: { in: projectMemberIds } } })
          }
          
          // 3.7. Los propios ProjectMembers
          if (projectMemberIds.length > 0) {
            await tx.projectMember.deleteMany({ where: { id: { in: projectMemberIds } } })
          }
          
          // 3.8. Poner jaulaVerifiedById a null antes de borrar
          await tx.project.update({
            where: { id: pid },
            data: { jaulaVerifiedById: null }
          })
          
          // 3.9. FINALMENTE: El propio Proyecto
          await tx.project.delete({ where: { id: pid } })
        })
        
        deletedProjectCount++
        console.log(`[DELETE company] ✅ Proyecto completamente eliminado: ${project.name}`)
      } catch (projErr) {
        console.error(`[DELETE company] ❌ ERROR al borrar proyecto ${project.id}:`, projErr)
        // Continuar con los demás proyectos aunque uno falle
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // 4. BORRAR COMPANYMEMBERS (desvincular usuarios de esta empresa)
    // ═══════════════════════════════════════════════════════════════
    console.log(`[DELETE company] Borrando CompanyMembers de la empresa...`)
    const deletedMembers = await db.companyMember.deleteMany({ where: { companyId } })
    console.log(`[DELETE company] ✅ ${deletedMembers.count} CompanyMembers borrados`)

    // ═══════════════════════════════════════════════════════════════
    // 5. BORRAR TEMPLATES DE LA EMPRESA
    // ═══════════════════════════════════════════════════════════════
    console.log(`[DELETE company] Borrando Templates...`)
    
    // Primero borrar BoardSlotTemplates que referencian estos templates
    const templates = await db.template.findMany({
      where: { companyId },
      select: { id: true }
    })
    if (templates.length > 0) {
      const templateIds = templates.map(t => t.id)
      await db.boardSlotTemplate.deleteMany({ where: { templateId: { in: templateIds } } }).catch(() => {})
    }
    await db.template.deleteMany({ where: { companyId } })
    console.log(`[DELETE company] ✅ Templates borrados`)

    // ═══════════════════════════════════════════════════════════════
    // 6. BORRAR SUBSCRIPTION
    // ═══════════════════════════════════════════════════════════════
    console.log(`[DELETE company] Borrando Subscription...`)
    await db.subscription.deleteMany({ where: { companyId } }).catch(() => {})
    console.log(`[DELETE company] ✅ Subscription borrada`)

    // ═══════════════════════════════════════════════════════════════
    // 7. BORRAR LA EMPRESA
    // ═══════════════════════════════════════════════════════════════
    console.log(`[DELETE company] Borrando la Company...`)
    await db.company.delete({ where: { id: companyId } })
    console.log(`[DELETE company] ✅ Company borrada`)

    // ═══════════════════════════════════════════════════════════════
    // 8. BORRAR COMPLETAMENTE CADA USUARIO HUÉRFANO Y TODOS SUS DATOS
    // ═══════════════════════════════════════════════════════════════
    let deletedUserCount = 0
    const userErrors: Array<{email: string, error: string}> = []
    
    for (const userToDelete of usersToDelete) {
      try {
        console.log(`[DELETE company] 🗑️ Procesando usuario huérfano: ${userToDelete.email} (${userToDelete.role})`)
        const uid = userToDelete.id
        
        // 8.1. Sessions del usuario
        const sessionsDeleted = await db.session.deleteMany({ where: { userId: uid } })
        console.log(`  • Sessions borradas: ${sessionsDeleted.count}`)
        
        // 8.2. Notificaciones del usuario (¡IMPORTANTE: no tiene cascade!)
        const notificationsDeleted = await db.notification.deleteMany({ where: { userId: uid } })
        console.log(`  • Notificaciones borradas: ${notificationsDeleted.count}`)
        
        // 8.3. EmployeeProgress del usuario
        const progressDeleted = await db.employeeProgress.deleteMany({ where: { userId: uid } })
        console.log(`  • EmployeeProgress borrados: ${progressDeleted.count}`)
        
        // 8.4. InventoryItems creados por el usuario
        const inventoryDeleted = await db.inventoryItem.deleteMany({ where: { createdById: uid } })
        console.log(`  • InventoryItems borrados: ${inventoryDeleted.count}`)
        
        // 8.5. ProjectMembers del usuario (en cualquier proyecto)
        const userProjectMembers = await db.projectMember.findMany({
          where: { userId: uid },
          select: { id: true }
        })
        const userProjectMemberIds = userProjectMembers.map(pm => pm.id)
        
        if (userProjectMemberIds.length > 0) {
          // Borrar MemberZones de estos ProjectMembers
          await db.memberZone.deleteMany({ 
            where: { memberId: { in: userProjectMemberIds } } 
          })
          // Borrar los ProjectMembers
          await db.projectMember.deleteMany({ 
            where: { id: { in: userProjectMemberIds } } 
          })
          console.log(`  • ProjectMembers borrados: ${userProjectMemberIds.length}`)
        }
        
        // 8.6. CUALQUIER CompanyMember restante (por seguridad)
        const remainingCompanyMembers = await db.companyMember.deleteMany({ 
          where: { userId: uid } 
        })
        if (remainingCompanyMembers.count > 0) {
          console.log(`  • CompanyMembers restantes borrados: ${remainingCompanyMembers.count}`)
        }
        
        // 8.7. Zonas donde el usuario es responsable (responsableId)
        // IMPORTANTE: Hay que poner responsableId a NULL, no borrar la zona
        const zonesWhereResponsible = await db.zone.updateMany({
          where: { responsableId: uid },
          data: { responsableId: null }
        })
        if (zonesWhereResponsible.count > 0) {
          console.log(`  • Zonas desvinculadas (responsable): ${zonesWhereResponsible.count}`)
        }
        
        // 8.8. Proyectos donde el usuario es jaulaVerifiedById
        // IMPORTANTE: Hay que poner jaulaVerifiedById a NULL
        const projectsWhereVerifier = await db.project.updateMany({
          where: { jaulaVerifiedById: uid },
          data: { jaulaVerifiedById: null }
        })
        if (projectsWhereVerifier.count > 0) {
          console.log(`  • Proyectos desvinculados (verificador): ${projectsWhereVerifier.count}`)
        }
        
        // 8.9. FINALMENTE: BORRAR EL USUARIO
        await db.user.delete({ where: { id: uid } })
        
        deletedUserCount++
        console.log(`[DELETE company] ✅ USUARIO COMPLETAMENTE ELIMINADO: ${userToDelete.email}`)
      } catch (userErr) {
        const errMsg = userErr instanceof Error ? userErr.message : String(userErr)
        console.error(`[DELETE company] ❌ ERROR al borrar usuario ${userToDelete.email}:`, errMsg)
        console.error('Stack:', userErr instanceof Error ? userErr.stack : 'N/A')
        userErrors.push({ email: userToDelete.email, error: errMsg })
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // RESPUESTA FINAL
    // ═══════════════════════════════════════════════════════════════
    const resultParts: string[] = [
      '🗑️ Empresa y todos sus datos eliminados permanentemente',
      `${deletedProjectCount} proyecto(s) eliminado(s) con todos sus datos`,
      `${deletedUserCount} usuario(s) huérfano(s) eliminado(s) completamente`
    ]
    
    if (userErrors.length > 0) {
      resultParts.push(`⚠️ ${userErrors.length} error(es) al borrar usuarios`)
    }

    const finalMessage = resultParts.join(' | ')
    console.log(`[DELETE company] 🎉 ${finalMessage}`)

    return NextResponse.json({
      success: true,
      message: finalMessage,
      stats: {
        projectsDeleted: deletedProjectCount,
        usersDeleted: deletedUserCount,
        totalMembersInCompany: allMembers.length,
        orphanUsersIdentified: usersToDelete.length,
        errors: userErrors.length
      },
      errors: userErrors.length > 0 ? userErrors : undefined,
    })
  } catch (error) {
    console.error('[DELETE company] 💥 ERROR GENERAL:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error al eliminar empresa'
    console.error('[DELETE company] Detalles:', {
      companyId,
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    })
    
    return NextResponse.json({ 
      success: false, 
      error: `Error al eliminar empresa: ${errorMessage}`,
      _debug: {
        companyId,
        timestamp: new Date().toISOString(),
        version: 'v3.0.64'
      }
    }, { status: 500 })
  }
}
