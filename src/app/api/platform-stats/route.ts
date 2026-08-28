import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { getAuthUser } from '../../../lib/auth-helpers'

// GET /api/platform-stats - Platform-wide statistics for Gestor (dueño de la app)
// v3.0.1: FIX - Corregidos nombres de relaciones Prisma
export async function GET(request: NextRequest) {
  try {
    // Verify the user is a gestor
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }
    if (user.role !== 'gestor') {
      return NextResponse.json({ success: false, error: 'Solo el gestor puede ver estadísticas de la plataforma' }, { status: 403 })
    }

    // Total counts
    const [
      totalCompanies,
      activeCompanies,
      totalUsers,
      activeUsers,
      totalProjects,
      activeProjects,
      totalAuditResults,
      totalActions,
      openActions,
    ] = await Promise.all([
      db.company.count(),
      db.company.count({ where: { active: true } }),
      db.user.count(),
      db.user.count({ where: { active: true } }),
      db.project.count(),
      db.project.count({ where: { active: true } }),
      db.auditResult.count(),
      db.actionItem.count(),
      db.actionItem.count({ where: { estado: 'abierta' } }),
    ])

    let totalTemplates = 0
    try {
      totalTemplates = await db.template.count({ where: { active: true } })
    } catch {
      totalTemplates = 0
    }

    // Users by role
    const usersByRole = await db.user.groupBy({
      by: ['role'],
      _count: { id: true },
    })

    const roleDistribution: Record<string, number> = {}
    for (const entry of usersByRole) {
      roleDistribution[entry.role] = entry._count.id
    }

    // v3.0.1 FIX: Companies with details + admin user - Using correct Prisma relation names
    // CompanyMember (not members), User (not user)
    const companies = await db.company.findMany({
      include: {
        _count: { 
          select: { 
            projects: true, 
            CompanyMember: true  // v3.0.1 FIX: CompanyMember not members
          } 
        },
        CompanyMember: {  // v3.0.1 FIX: CompanyMember not members
          where: {
            OR: [
              { role: 'admin_empresa' },
              { role: 'admin' },
            ],
          },
          include: {
            User: {  // v3.0.1 FIX: User not user
              select: { id: true, name: true, email: true, role: true, active: true },
            },
          },
          orderBy: { joinedAt: 'asc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    const companiesWithDetails = companies.map(c => {
      const adminMember = c.CompanyMember?.[0]  // v3.0.1 FIX: CompanyMember not members
      return {
        id: c.id,
        name: c.name,
        description: c.description,
        active: c.active,
        createdAt: c.createdAt,
        projectCount: c._count.projects,
        memberCount: c._count.CompanyMember || 0,  // v3.0.1 FIX
        // Admin user info
        adminUser: adminMember
          ? {
              id: adminMember.User.id,  // v3.0.1 FIX: User not user
              name: adminMember.User.name,
              email: adminMember.User.email,
              active: adminMember.User.active,
            }
          : null,
      }
    })

    // Recent users (last 10)
    const recentUsers = await db.user.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
      },
    })

    // Projects per company - v3.0.1 FIX: Use correct Prisma relations
    const projectsWithCompany = await db.project.findMany({
      include: {
        Company: { select: { id: true, name: true } },  // v3.0.1 FIX: Company not companyRel
        _count: { 
          select: { 
            ProjectMember: true,  // v3.0.1 FIX: ProjectMember not members
            Zone: true  // v3.0.1 FIX: Zone not zones
          } 
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    const projectsWithDetails = projectsWithCompany.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      company: p.company,
      companyId: p.companyId,
      companyName: p.Company?.name || null,  // v3.0.1 FIX: Company not companyRel
      active: p.active,
      startDate: p.startDate,
      createdAt: p.createdAt,
      memberCount: p._count.ProjectMember || 0,  // v3.0.1 FIX
      zoneCount: p._count.Zone || 0,  // v3.0.1 FIX
    }))

    // All users with company info - v3.0.1 FIX: Correct Prisma relation names
    const allUsers = await db.user.findMany({
      include: {
        Project: {  // v3.0.1 FIX: Project not memberships
          include: {
            Company: {  // v3.0.1 FIX
              select: { id: true, name: true }
            }
          }
        },
        CompanyMember: {  // v3.0.1 FIX: CompanyMember not companyMemberships
          include: {
            Company: { select: { id: true, name: true } }  // v3.0.1 FIX
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    })

    const usersWithCompany = allUsers.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      active: u.active,
      createdAt: u.createdAt,
      companies: u.CompanyMember?.map(cm => ({  // v3.0.1 FIX
        id: cm.Company.id,
        name: cm.Company.name,
        role: cm.role,
      })) || [],
      projects: u.Project?.map(m => ({  // v3.0.1 FIX
        id: m.id,
        name: m.name,
        company: m.Company?.name || null,  // v3.0.1 FIX
      })) || [],
    }))

    return NextResponse.json({
      success: true,
      data: {
        totals: {
          companies: totalCompanies,
          activeCompanies,
          users: totalUsers,
          activeUsers,
          projects: totalProjects,
          activeProjects,
          templates: totalTemplates,
          auditResults: totalAuditResults,
          actions: totalActions,
          openActions,
        },
        roleDistribution,
        companies: companiesWithDetails,
        recentUsers,
        projects: projectsWithDetails,
        users: usersWithCompany,
      },
    })
  } catch (error) {
    console.error('Error fetching platform stats:', error)
    return NextResponse.json({ success: false, error: 'Error fetching platform stats' }, { status: 500 })
  }
}
