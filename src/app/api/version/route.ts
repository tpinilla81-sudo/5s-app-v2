import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// v3.0.38 - Quitar Fix Usuarios + Mejorar errores - 2026-09-04

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
    version: 'v3.0.38',
    buildTime: '2026-09-04T12:15:00Z',
    feature: 'REMOVE_FIX_USERS_BETTER_ERRORS',
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
