import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Endpoint de diagnóstico - SIN autenticación
// Para debuggear problemas de BD y empresas
export async function GET() {
  const db = new PrismaClient()
  try {
    // 1. Contar todo
    const [companyCount, userCount, projectCount, sessionCount] = await Promise.all([
      db.company.count(),
      db.user.count(),
      db.project.count(),
      db.session.count()
    ])

    // 2. Obtener empresas con detalles
    const companies = await db.company.findMany({
      include: {
        _count: { select: { projects: true, members: true } },
        members: {
          take: 3,
          orderBy: { joinedAt: 'asc' },
          include: {
            User: { select: { name: true, email: true, role: true } }
          }
        }
      },
      take: 10
    })

    // 3. Obtener usuarios (solo info básica)
    const users = await db.user.findMany({
      select: { id: true, name: true, email: true, role: true, active: true },
      take: 10,
      orderBy: { createdAt: 'desc' }
    })

    // 4. Verificar sesiones activas
    const sessions = await db.session.findMany({
      where: { expiresAt: { gt: new Date() } },
      include: {
        User: { select: { name: true, email: true, role: true } }
      },
      take: 5,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        counts: {
          companies: companyCount,
          users: userCount,
          projects: projectCount,
          activeSessions: sessionCount
        }
      },
      data: {
        companies: companies.map(c => ({
          id: c.id,
          name: c.name,
          active: c.active,
          projectCount: c._count.projects,
          memberCount: c._count.members,
          sampleMembers: c.members.map(m => ({
            name: m.User.name,
            email: m.User.email,
            role: m.User.role
          }))
        })),
        users,
        activeSessions: sessions.map(s => ({
          user: s.User.name,
          email: s.User.email,
          role: s.User.role,
          expiresAt: s.expiresAt
        }))
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'ERROR',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  } finally {
    await db.$disconnect()
  }
}
