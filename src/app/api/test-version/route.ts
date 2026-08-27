import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = new PrismaClient()
  try {
    // Consulta DIRECTA a BD
    const [totalCompanies, activeCompanies, users, companies] = await Promise.all([
      db.company.count(),
      db.company.count({ where: { active: true } }),
      db.user.count(),
      db.company.findMany({
        select: { id: true, name: true, active: true },
        take: 10
      })
    ])
    
    return NextResponse.json({ 
      version: 'v3.0.1-FINAL',
      timestamp: new Date().toISOString(),
      status: 'BD_DIRECTA',
      database: {
        connected: true,
        counts: {
          totalCompanies,
          activeCompanies, 
          users,
          companiesFound: companies.length
        },
        companies: companies.map(c => ({
          id: c.id,
          name: c.name,
          active: c.active
        }))
      }
    });
  } catch (error: any) {
    return NextResponse.json({ 
      version: 'v3.0.1-FINAL-ERROR',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  } finally {
    await db.$disconnect()
  }
}
