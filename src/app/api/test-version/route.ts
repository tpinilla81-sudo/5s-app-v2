import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = new PrismaClient()
  try {
    console.log('[TEST-V3] Starting query...')
    
    // Contar empresas
    const totalCount = await db.company.count()
    const activeCount = await db.company.count({ where: { active: true } })
    
    console.log('[TEST-V3] Counts - Total:', totalCount, 'Active:', activeCount)
    
    // Obtener empresas
    const companies = await db.company.findMany({
      select: { id: true, name: true, active: true },
      take: 10
    })
    
    console.log('[TEST-V3] Companies found:', companies.length, companies.map(c => c.name))
    
    return NextResponse.json({ 
      version: 'v3.0.1-TEST',
      timestamp: new Date().toISOString(),
      test: 'COMPANIES_DEBUG_V3',
      database: {
        connected: true,
        counts: {
          totalCompanies: totalCount,
          activeCompanies: activeCount,
          companiesFound: companies.length
        },
        companies: companies
      }
    });
  } catch (error: any) {
    console.error('[TEST-V3] Error:', error)
    return NextResponse.json({ 
      version: 'v3.0.1-TEST',
      timestamp: new Date().toISOString(),
      test: 'ERROR',
      error: error.message,
      stack: error.stack
    });
  } finally {
    await db.$disconnect()
  }
}
