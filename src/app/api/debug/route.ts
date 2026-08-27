import { NextResponse } from 'next/server'

export async function GET() {
  const info: any = {
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL: process.env.DATABASE_URL ? 
        `${process.env.DATABASE_URL.substring(0, 30)}...${process.env.DATABASE_URL.substring(process.env.DATABASE_URL.length - 20)}` : 
        'NOT SET',
      NODE_ENV: process.env.NODE_ENV,
    },
    modules: {}
  }

  // Test Prisma
  try {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()
    const userCount = await prisma.user.count()
    info.modules.prisma = `OK (${userCount} users)`
    
    // Try to find a user
    const testUser = await prisma.user.findFirst({ select: { email: true, name: true } })
    info.testUser = testUser
    
    await prisma.$disconnect()
  } catch (e: any) {
    info.modules.prisma = `ERROR: ${e.message}`
    info.errorStack = e.stack
  }

  // Test bcrypt
  try {
    const bcrypt = await import('bcryptjs')
    const hash = bcrypt.hashSync('test', 10)
    info.modules.bcryptjs = `OK (hash works)`
  } catch (e: any) {
    info.modules.bcryptjs = `ERROR: ${e.message}`
  }

  return NextResponse.json(info)
}
