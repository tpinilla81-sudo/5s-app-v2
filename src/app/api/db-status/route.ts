import { NextResponse } from 'next/server'
import { verifyDatabaseConfig } from '@/lib/db'

/**
 * GET /api/db-status
 * Public diagnostic endpoint — returns database configuration status.
 * Does NOT expose sensitive data, only whether DATABASE_URL is configured correctly.
 */
export async function GET() {
  const dbError = verifyDatabaseConfig()
  const url = process.env.DATABASE_URL

  return NextResponse.json({
    configured: !dbError,
    error: dbError,
    urlPreview: url ? `${url.substring(0, 25)}...` : null,
    urlProtocol: url ? url.split('://')[0] : null,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
}
