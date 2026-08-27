import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// DEBUG ENDPOINT v3.0.0 - Verificar empresas en BD
export async function GET() {
  const db = new PrismaClient()
  try {
    const companies = await db.company.findMany({
      select: { id: true, name: true, active: true, createdAt: true }
    })
    const userCount = await db.user.count()
    
    return NextResponse.json({
      status: 'DEBUG_V3_OK',
      timestamp: new Date().toISOString(),
      data: {
        dbConnected: true,
        companyCount: companies.length,
        userCount,
        companies
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'DEBUG_V3_ERROR',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  } finally {
    await db.$disconnect()
  }
}
