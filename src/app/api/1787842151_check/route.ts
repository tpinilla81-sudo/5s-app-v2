import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Endpoint único con timestamp - v3.0.1
export const dynamic = 'force-dynamic'

export async function GET() {
  const db = new PrismaClient()
  try {
    const companies = await db.company.findMany({
      select: { id: true, name: true, active: true }
    })
    
    return NextResponse.json({
      _status: 'NEW_ENDPOINT_WORKS',
      _version: 'v3.0.1-TIMESTAMPED',
      _time: new Date().toISOString(),
      dbConnected: true,
      companyCount: companies.length,
      companies: companies
    })
  } catch (e: any) {
    return NextResponse.json({ 
      _status: 'ERROR', 
      error: e.message,
      _time: new Date().toISOString()
    })
  } finally {
    await db.$disconnect()
  }
}
