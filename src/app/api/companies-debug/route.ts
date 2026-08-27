import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// DEBUG: Verificar empresas en BD sin autenticación
export async function GET() {
  const db = new PrismaClient()
  try {
    const companies = await db.company.findMany({
      select: { id: true, name: true, active: true, createdAt: true }
    })
    const userCount = await db.user.count()
    
    return NextResponse.json({
      status: 'DEBUG_OK',
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
      status: 'DEBUG_ERROR',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  } finally {
    await db.$disconnect()
  }
}
