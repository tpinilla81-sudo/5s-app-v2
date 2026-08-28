import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'

// GET /api/platform-stats - Platform-wide statistics for Gestor
// v3.0.3: Simplified and robust version - works with or without auth
export async function GET(request: NextRequest) {
  try {
    // Basic counts with error handling for each
    let totalCompanies = 0, activeCompanies = 0
    let totalUsers = 0, activeUsers = 0
    let totalProjects = 0, activeProjects = 0
    let totalTemplates = 0
    
    try {
      totalCompanies = await db.company.count()
      activeCompanies = await db.company.count({ where: { active: true } })
    } catch (e) { console.warn('[platform-stats] Error counting companies:', e) }
    
    try {
      totalUsers = await db.user.count()
      activeUsers = await db.user.count({ where: { active: true } })
    } catch (e) { console.warn('[platform-stats] Error counting users:', e) }
    
    try {
      totalProjects = await db.project.count()
      activeProjects = await db.project.count({ where: { active: true } })
    } catch (e) { console.warn('[platform-stats] Error counting projects:', e) }
    
    try {
      totalTemplates = await db.template.count({ where: { active: true } })
    } catch (e) { console.warn('[platform-stats] Error counting templates:', e) }

    // Users by role
    let roleDistribution: Record<string, number> = {}
    try {
      const usersByRole = await db.user.groupBy({
        by: ['role'],
        _count: { id: true },
      })
      for (const entry of usersByRole) {
        roleDistribution[entry.role] = entry._count.id
      }
    } catch (e) { console.warn('[platform-stats] Error getting role distribution:', e) }

    // Companies with details - robust version
    let companiesWithDetails: any[] = []
    try {
      const companies = await db.company.findMany({
        include: {
          _count: { 
            select: { 
              projects: true,
              CompanyMember: true,
            } 
          },
          CompanyMember: {
            where: {
              OR: [
                { role: 'admin_empresa' },
                { role: 'admin' },
              ],
            },
            include: {
              User: {
                select: { id: true, name: true, email: true, role: true, active: true },
              },
            },
            orderBy: { joinedAt: 'asc' },
            take: 1,
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      companiesWithDetails = companies.map(c => {
        const adminMember = c.CompanyMember?.[0]
        return {
          id: c.id,
          name: c.name,
          description: c.description,
          active: c.active,
          createdAt: c.createdAt,
          projectCount: c._count.projects || 0,
          memberCount: c._count.CompanyMember || 0,
          adminUser: adminMember
            ? {
                id: adminMember.User?.id,
                name: adminMember.User?.name,
                email: adminMember.User?.email,
                active: adminMember.User?.active,
              }
            : null,
        }
      })
    } catch (e) {
      console.warn('[platform-stats] Error fetching company details:', e)
      // Fallback: return basic company list
      try {
        const basicCompanies = await db.company.findMany({
          select: { id: true, name: true, active: true, createdAt: true },
          take: 10,
        })
        companiesWithDetails = basicCompanies.map(c => ({
          ...c,
          projectCount: 0,
          memberCount: 0,
          adminUser: null,
        }))
      } catch (e2) {
        console.error('[platform-stats] Fatal error fetching companies:', e2)
      }
    }

    // Recent users
    let recentUsers: any[] = []
    try {
      recentUsers = await db.user.findMany({
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
    } catch (e) { console.warn('[platform-stats] Error fetching recent users:', e) }

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
        },
        roleDistribution,
        companies: companiesWithDetails,
        recentUsers,
      },
    })
  } catch (error) {
    console.error('Error fetching platform stats:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Error fetching platform stats',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
