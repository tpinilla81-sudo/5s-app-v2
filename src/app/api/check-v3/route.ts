import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// v3.0.1 CHECK - Endpoint único para verificar BD
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  // Headers anti-cache
  const headers = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'X-Version': 'v3.0.1-CHECK'
  }
  
  const db = new PrismaClient()
  try {
    console.log('[CHECK-V3] Iniciando consulta...')
    
    const [totalCompanies, activeCompanies, users, companies] = await Promise.all([
      db.company.count(),
      db.company.count({ where: { active: true } }),
      db.user.count(),
      db.company.findMany({
        select: { id: true, name: true, active: true, createdAt: true },
        take: 10
      })
    ])
    
    console.log('[CHECK-V3] Resultados:', { totalCompanies, activeCompanies, companiesFound: companies.length })
    
    return NextResponse.json({
      status: 'OK',
      version: 'v3.0.1-CHECK',
      timestamp: new Date().toISOString(),
      data: {
        database: { connected: true },
        counts: { totalCompanies, activeCompanies, users },
        companies
      }
    }, { headers })
    
  } catch (error: any) {
    console.error('[CHECK-V3] Error:', error)
    return NextResponse.json({
      status: 'ERROR',
      version: 'v3.0.1-CHECK',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500, headers })
  } finally {
    await db.$disconnect()
  }
}
