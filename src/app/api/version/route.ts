import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// v3.0.55 - Fix: Better error logging for zone assignment - 2026-09-24

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
    version: 'v3.0.55',
    buildTime: '2026-09-24T19:00:00Z',
    feature: 'BETTER_ZONE_ASSIGNMENT_ERROR_LOGGING',
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
