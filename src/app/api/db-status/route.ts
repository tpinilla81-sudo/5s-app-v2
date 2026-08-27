import { NextResponse } from 'next/server'
import { verifyDatabaseConfig } from '../../../lib/db'
import { PrismaClient } from '@prisma/client'

/**
 * GET /api/db-status
 * Public diagnostic endpoint — returns database configuration status.
 * v3.0.1: Now includes full company debug info
 */
export async function GET() {
  const dbError = verifyDatabaseConfig()
  const url = process.env.DATABASE_URL
  
  // Try to get actual counts from database
  let companyCount = -1
  let userCount = -1
  let projectCount = -1
  let dbConnected = false
  let companies = []
  
  try {
    const db = new PrismaClient()
    
    // Quick count queries
    companyCount = await db.company.count()
    userCount = await db.user.count()
    projectCount = await db.project.count()
    
    // Get company details for debugging
    companies = await db.company.findMany({
      select: { id: true, name: true, active: true, createdAt: true },
      take: 10
    })
    
    dbConnected = true
    await db.$disconnect()
  } catch (error: any) {
    console.error('DB count error:', error.message)
  }

  return NextResponse.json({
    configured: !dbError,
    error: dbError,
    urlPreview: url ? `${url.substring(0, 25)}...` : null,
    urlProtocol: url ? url.split('://')[0] : null,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    // Debug info - v3.0.1 FULL DEBUG
    _version: 'v3.0.1-FULL-DEBUG',
    _timestamp: new Date().toISOString(),
    debug: {
      dbConnected,
      companyCount,
      userCount,
      projectCount,
      companies: companies.map(c => ({
        id: c.id,
        name: c.name,
        active: c.active
      }))
    }
  })
}
