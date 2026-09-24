import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// v3.0.54 - Fix: Add existing users with userId (not email) - 2026-09-24

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
    version: 'v3.0.54',
    buildTime: '2026-09-24T18:45:00Z',
    feature: 'FIX_ADD_EXISTING_USERS_WITH_USERID',
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
