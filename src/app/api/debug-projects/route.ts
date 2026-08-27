import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { getAuthUser } from '../../../lib/auth-helpers'

export async function GET(request: NextRequest) {
  const result: any = { step: 'start', timestamp: new Date().toISOString() }

  try {
    // Step 1: Auth
    result.step = 'auth'
    const user = await getAuthUser(request)
    if (!user) {
      result.error = 'No authenticated user'
      return NextResponse.json(result, { status: 401 })
    }
    result.user = { id: user.id, email: user.email, role: user.role }

    // Step 2: Check company memberships
    result.step = 'company-memberships'
    try {
      const companyMemberships = await db.companyMember.findMany({
        where: { userId: user.id },
        select: { companyId: true },
      })
      result.companyMemberships = companyMemberships
      result.companyIds = companyMemberships.map((cm) => cm.companyId)
    } catch (e: any) {
      result.companyError = e.message
    }

    // Step 3: Try simple project query first (no includes)
    result.step = 'simple-query'
    try {
      const allProjects = await db.project.findMany({
        where: { active: true },
        select: { id: true, name: true, active: true }
      })
      result.allProjects = allProjects
      result.projectCount = allProjects.length
    } catch (e: any) {
      result.simpleQueryError = e.message
      result.simpleQueryStack = e.stack?.substring(0, 500)
    }

    // Step 4: Try with zones include
    result.step = 'zones-include'
    try {
      const projectsWithZones = await db.project.findMany({
        where: { active: true },
        include: {
          zones: {
            orderBy: { createdAt: 'asc' },
          },
        },
        take: 2
      })
      result.projectsWithZones = projectsWithZones.map(p => ({
        id: p.id,
        name: p.name,
        zoneCount: p.zones.length
      }))
    } catch (e: any) {
      result.zonesIncludeError = e.message
    }

    // Step 5: Try with _count
    result.step = 'count-include'
    try {
      const projectsWithCount = await db.project.findMany({
        where: { active: true },
        include: {
          _count: {
            select: { members: true },
          },
        },
        take: 2
      })
      result.projectsWithCount = projectsWithCount.map(p => ({
        id: p.id,
        name: p.name,
        memberCount: p._count.members
      }))
    } catch (e: any) {
      result.countIncludeError = e.message
    }

    // Step 6: Try with companyRel (this might be the problem!)
    result.step = 'companyRel-include'
    try {
      const projectsWithCompany = await db.project.findMany({
        where: { active: true },
        include: {
          companyRel: {
            select: { id: true, name: true },
          },
        },
        take: 2
      })
      result.projectsWithCompany = projectsWithCompany
    } catch (e: any) {
      result.companyRelError = e.message
      result.companyRelStack = e.stack?.substring(0, 500)
    }

    // Step 7: Full query like the real endpoint
    result.step = 'full-query'
    try {
      const isGestor = user.role === 'gestor'
      const isAdmin = user.role === 'admin'
      const isGerente = user.role === 'gerente'
      const userId = user.id

      let whereCondition: any = { active: true }

      if (!isGestor && (isAdmin || isGerente)) {
        const companyIds = result.companyIds || []
        whereCondition = {
          active: true,
          OR: [
            { members: { some: { userId } } },
            { companyId: { in: companyIds.length > 0 ? companyIds : ['__none__'] } },
          ],
        }
      }

      const projects = await db.project.findMany({
        where: whereCondition,
        include: {
          zones: { orderBy: { createdAt: 'asc' } },
          _count: { select: { members: true } },
          companyRel: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
      })

      result.finalProjects = projects.map(p => ({
        id: p.id,
        name: p.name,
        companyName: p.companyRel?.name
      }))
    } catch (e: any) {
      result.fullQueryError = e.message
      result.fullQueryStack = e.stack?.substring(0, 1000)
    }

    return NextResponse.json(result)

  } catch (error: any) {
    result.step = 'error'
    result.error = error.message
    result.stack = error.stack?.substring(0, 1000)
    return NextResponse.json(result, { status: 500 })
  }
}
