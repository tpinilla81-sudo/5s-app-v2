import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// v3.0.30 - FIX ERROR members EN COMPANY UPDATE - 2026-09-03

export async function GET() {
  let dbInfo = { connected: false, companyCount: -1, companies: [] };
  
  try {
    const db = new PrismaClient();
    const companies = await db.company.findMany({
      select: { id: true, name: true, active: true }
    });
    dbInfo = {
      connected: true,
      companyCount: companies.length,
      companies: companies
    };
    await db.$disconnect();
  } catch (e: any) {
    dbInfo = { connected: false, error: e.message, companyCount: -1, companies: [] };
  }

  return NextResponse.json({
    version: 'v3.0.30',
    buildTime: '2026-09-03T08:15:00Z',
    feature: 'FIX_MEMBERS_COUNT_COMPANY_UPDATE',
    timestamp: new Date().toISOString(),
    debug: dbInfo
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
