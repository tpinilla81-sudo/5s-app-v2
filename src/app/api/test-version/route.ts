import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ 
    version: 'v3.0.0-TEST',
    timestamp: new Date().toISOString(),
    test: 'NEW_ENDPOINT'
  });
}
