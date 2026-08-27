import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { getAuthUser } from '../../../lib/auth-helpers'

export async function GET(request: NextRequest) {
  try {
    // 1. Check auth user
    const user = await getAuthUser(request)
    
    // 2. Try to get ALL companies without filters
    const allCompanies = await db.company.findMany({
      take: 10
    })
    
    // 3. Try with active filter
    const activeCompanies = await db.company.findMany({
      where: { active: true },
      take: 10
    })
    
    return NextResponse.json({
      success: true,
      debug: {
        authenticatedUser: user ? {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        } : null,
        isGestor: user?.role === 'gestor',
        totalCompaniesInDB: allCompanies.length,
        activeCompaniesInDB: activeCompanies.length,
        allCompanies: allCompanies.map(c => ({ id: c.id, name: c.name, active: c.active })),
        activeCompanies: activeCompanies.map(c => ({ id: c.id, name: c.name, active: c.active }))
      }
    })
  } catch (error: any) {
    console.error('Debug companies error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    }, { status: 500 })
  }
}
