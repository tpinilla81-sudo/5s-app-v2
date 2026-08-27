import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// DEBUG ENDPOINT - Public, no auth required
// TODO: Remove after fixing the issue
export async function GET() {
  const db = new PrismaClient()
  try {
    const companies = await db.company.findMany({
      select: { id: true, name: true, active: true, createdAt: true }
    })
    const userCount = await db.user.count()
    
    return NextResponse.json({
      debug: true,
      dbConnected: true,
      companyCount: companies.length,
      userCount,
      companies,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json({
      debug: true,
      dbConnected: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  } finally {
    await db.$disconnect()
  }
}
