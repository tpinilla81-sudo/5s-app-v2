import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

/**
 * GET /api/system/health
 * 
 * Endpoint de diagnóstico del sistema.
 * Verifica:
 * - Conexión a base de datos
 * - Migraciones aplicadas
 * - Variables de entorno críticas
 * 
 * Útil para debugging en producción sin acceso a Vercel logs.
 */
export async function GET() {
  const healthStatus = {
    timestamp: new Date().toISOString(),
    status: 'ok' as 'ok' | 'degraded' | 'error',
    checks: {} as Record<string, any>,
  }

  // === CHECK 1: Conexión a Base de Datos ===
  try {
    await db.$queryRaw`SELECT 1`
    healthStatus.checks.database = {
      status: 'ok',
      message: 'Conexión exitosa a la base de datos'
    }
  } catch (dbError) {
    healthStatus.status = 'error'
    healthStatus.checks.database = {
      status: 'error',
      message: 'No se puede conectar a la base de datos',
      error: dbError instanceof Error ? dbError.message : String(dbError)
    }
    return NextResponse.json(healthStatus, { status: 503 })
  }

  // === CHECK 2: Verificar columnas de jaula (migración v2.108.19) ===
  try {
    const columns = await db.$queryRaw<
      { column_name: string; data_type: string }[]
    >`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'Project' 
      AND column_name LIKE 'jaula%'
      ORDER BY ordinal_position
    `
    
    const requiredColumns = [
      { name: 'jaulaStatus', type: 'text', critical: true },
      { name: 'jaulaPhotoUrl', type: 'text', critical: false },
      { name: 'jaulaPhotoData', type: 'bytea', critical: false },
      { name: 'jaulaVerifiedById', type: 'text', critical: false },
      { name: 'jaulaVerifiedAt', type: 'timestamp without time zone', critical: false },
      { name: 'jaulaNotes', type: 'text', critical: false },
    ]
    
    const existingColumns = new Set(columns.map(c => c.column_name.toLowerCase()))
    const missingColumns = requiredColumns.filter(rc => !existingColumns.has(rc.name.toLowerCase()))
    
    if (missingColumns.length > 0) {
      healthStatus.status = 'degraded'
      healthStatus.checks.jaulaMigration = {
        status: 'warning',
        message: `Faltan ${missingColumns.length} columna(s) de jaula`,
        missingColumns: missingColumns.map(c => ({ name: c.name, type: c.type, critical: c.critical })),
        existingColumns: columns.map(c => c.column_name),
        suggestion: 'Ejecute: npx prisma migrate deploy o use POST /api/system/apply-migrations'
      }
    } else {
      healthStatus.checks.jaulaMigration = {
        status: 'ok',
        message: 'Todas las columnas de jaula están presentes',
        columns: columns.map(c => ({ name: c.column_name, type: c.data_type }))
      }
    }
  } catch (migrationCheckError) {
    healthStatus.checks.jaulaMigration = {
      status: 'unknown',
      message: 'No se pudo verificar el estado de migración',
      error: migrationCheckError instanceof Error ? migrationCheckError.message : String(migrationCheckError)
    }
  }

  // === CHECK 3: Variables de Entorno Críticas ===
  const envChecks = {
    databaseUrl: !!process.env.DATABASE_URL,
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY.length > 10,
    nodeEnv: process.env.NODE_ENV || 'unknown',
  }
  
  healthStatus.checks.environment = envChecks
  if (!envChecks.databaseUrl) {
    healthStatus.status = 'error'
  }

  // === CHECK 4: Versión del Schema Prisma ===
  try {
    // Contar proyectos como test básico
    const projectCount = await db.project.count()
    healthStatus.checks.data = {
      status: 'ok',
      projectCount,
      message: `Base de datos accesible con ${projectCount} proyecto(s)`
    }
  } catch (dataError) {
    healthStatus.checks.data = {
      status: 'error',
      message: 'Error al acceder a datos',
      error: dataError instanceof Error ? dataError.message : String(dataError)
    }
  }

  const statusCode = healthStatus.status === 'ok' ? 200 : 
                     healthStatus.status === 'degraded' ? 200 : 503
  
  return NextResponse.json(healthStatus, { status: statusCode })
}

/**
 * POST /api/system/health
 * 
 * Aplica migraciones pendientes automáticamente.
 * Útil cuando no tienes acceso a CLI en producción.
 */
export async function POST() {
  try {
    // Verificar si faltan columnas de jaula
    const columns = await db.$queryRaw<
      { column_name: string }[]
    >`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Project' 
      AND column_name LIKE 'jaula%'
    `
    
    const existingColumns = new Set(columns.map(c => c.column_name.toLowerCase()))
    const appliedMigrations: string[] = []
    
    // Aplicar cada columna que falte
    if (!existingColumns.has('jaulastatus')) {
      await db.$executeRawUnsafe(`ALTER TABLE "Project" ADD COLUMN "jaulaStatus" TEXT DEFAULT 'pendiente'`)
      appliedMigrations.push('jaulaStatus')
    }
    
    if (!existingColumns.has('jaulaphotourl')) {
      await db.$executeRawUnsafe(`ALTER TABLE "Project" ADD COLUMN "jaulaPhotoUrl" TEXT`)
      appliedMigrations.push('jaulaPhotoUrl')
    }
    
    if (!existingColumns.has('jaulaphotodata')) {
      await db.$executeRawUnsafe(`ALTER TABLE "Project" ADD COLUMN "jaulaPhotoData" BYTEA`)
      appliedMigrations.push('jaulaPhotoData')
    }
    
    if (!existingColumns.has('jaulaverifiedbyid')) {
      await db.$executeRawUnsafe(`ALTER TABLE "Project" ADD COLUMN "jaulaVerifiedById" TEXT`)
      appliedMigrations.push('jaulaVerifiedById')
    }
    
    if (!existingColumns.has('jaulaverifiedat')) {
      await db.$executeRawUnsafe(`ALTER TABLE "Project" ADD COLUMN "jaulaVerifiedAt" TIMESTAMP(3)`)
      appliedMigrations.push('jaulaVerifiedAt')
    }
    
    if (!existingColumns.has('jaulanotes')) {
      await db.$executeRawUnsafe(`ALTER TABLE "Project" ADD COLUMN "jaulaNotes" TEXT`)
      appliedMigrations.push('jaulaNotes')
    }
    
    // Crear índice si no existe
    try {
      await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Project_jaulaStatus_idx" ON "Project"("jaulaStatus")`)
      appliedMigrations.push('Index: Project_jaulaStatus_idx')
    } catch {}
    
    return NextResponse.json({
      success: true,
      message: `Migraciones aplicadas: ${appliedMigrations.length}`,
      appliedMigrations,
      totalApplied: appliedMigrations.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[POST /api/system/health] Error aplicando migraciones:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Error al aplicar migraciones',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
