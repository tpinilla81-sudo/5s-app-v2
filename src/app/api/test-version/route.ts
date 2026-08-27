import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = new PrismaClient()
  try {
    // Get companies info
    const [companyCount, userCount, projectCount, companies] = await Promise.all([
      db.company.count(),
      db.user.count(),
      db.project.count(),
      db.company.findMany({
        select: { id: true, name: true, active: true },
        take: 10
      })
    ])
    
    return NextResponse.json({ 
      version: 'v3.0.0-TEST',
      timestamp: new Date().toISOString(),
      test: 'COMPANIES_DEBUG',
      database: {
        connected: true,
        companyCount,
        userCount,
        projectCount,
        companies
      }
    });
  } catch (error: any) {
    return NextResponse.json({ 
      version: 'v3.0.0-TEST',
      timestamp: new Date().toISOString(),
      test: 'ERROR',
      error: error.message
    });
  } finally {
    await db.$disconnect()
  }
}
