import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// NEON CHECK 2026-08-27 - Verificación directa de BD
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  console.log('[NEON-CHECK] Starting...')
  
  const db = new PrismaClient()
  try {
    // Consultas directas
    const [companies, users, projects] = await Promise.all([
      db.company.findMany({ select: { id: true, name: true, active: true } }),
      db.user.findMany({ select: { id: true, name: true, email: true, role: true }, take: 5 }),
      db.project.findMany({ select: { id: true, name: true, companyId: true } })
    ])
    
    console.log('[NEON-CHECK] Results:', companies.length, 'companies,', users.length, 'users')
    
    return NextResponse.json({
      _check: 'NEON-20260827',
      timestamp: new Date().toISOString(),
      status: 'OK',
      data: {
        companies: { count: companies.length, items: companies },
        users: { count: users.length, items: users },
        projects: { count: projects.length, items: projects }
      }
    }, {
      headers: {
        'Cache-Control': 'no-store, private, must-revalidate',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store',
        'X-Cache-Status': 'BYPASS'
      }
    })
  } catch (error: any) {
    console.error('[NEON-CHECK] Error:', error)
    return NextResponse.json({
      _check: 'NEON-20260827',
      timestamp: new Date().toISOString(),
      status: 'ERROR',
      error: error.message
    }, { status: 500 })
  } finally {
    await db.$disconnect()
  }
}
