import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'

// Debug endpoint - no auth required
export async function GET() {
  try {
    // Try to get ALL companies
    const allCompanies = await db.company.findMany({
      take: 10,
      select: { id: true, name: true, active: true, createdAt: true }
    })
    
    // Also check users count
    const userCount = await db.user.count()
    
    return NextResponse.json({
      success: true,
      debug: {
        totalCompanies: allCompanies.length,
        companies: allCompanies,
        totalUsers: userCount,
        dbConnected: true
      }
    })
  } catch (error: any) {
    console.error('Debug error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
