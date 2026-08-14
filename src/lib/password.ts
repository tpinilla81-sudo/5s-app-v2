import bcrypt from 'bcryptjs'
import { createHash } from 'crypto'
import { db } from './db'

const BCRYPT_ROUNDS = 12

/**
 * Legacy SHA256 hash (insecure — only used to verify old passwords during migration).
 * Format: 64 hex chars (no salt).
 */
function legacySha256Hash(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

/**
 * Detect if a hash is legacy SHA256 (64 hex chars) or modern bcrypt ($2b$...).
 */
export function isLegacyHash(hash: string): boolean {
  if (!hash || typeof hash !== 'string') return false
  // bcrypt hashes always start with $2a$, $2b$, or $2y$
  if (hash.startsWith('$2a$') || hash.startsWith('$2b$') || hash.startsWith('$2y$')) {
    return false
  }
  // SHA256 produces 64 hex chars
  return hash.length === 64 && /^[a-f0-9]+$/i.test(hash)
}

/**
 * Hash a password using bcrypt (modern, secure).
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password || password.length < 1) {
    throw new Error('Password cannot be empty')
  }
  return bcrypt.hash(password, BCRYPT_ROUNDS)
}

/**
 * Synchronous version for use in non-async contexts (use sparingly).
 */
export function hashPasswordSync(password: string): string {
  return bcrypt.hashSync(password, BCRYPT_ROUNDS)
}

/**
 * Verify a password against a hash. Supports both bcrypt (modern) and SHA256 (legacy).
 * Returns true if password matches.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (!password || !hash) return false

  // Modern bcrypt
  if (!isLegacyHash(hash)) {
    try {
      return bcrypt.compare(password, hash)
    } catch {
      return false
    }
  }

  // Legacy SHA256
  return legacySha256Hash(password) === hash
}

/**
 * Verify and auto-migrate: if the hash is legacy SHA256 and the password matches,
 * re-hash with bcrypt and update the user record.
 *
 * Call this on every successful login to gradually migrate all users.
 */
export async function verifyAndMigratePassword(
  userId: string,
  password: string,
  currentHash: string
): Promise<{ valid: boolean; migrated: boolean }> {
  const valid = await verifyPassword(password, currentHash)

  if (!valid) {
    return { valid: false, migrated: false }
  }

  // If legacy, migrate to bcrypt
  if (isLegacyHash(currentHash)) {
    try {
      const newHash = await hashPassword(password)
      await db.user.update({
        where: { id: userId },
        data: { password: newHash },
      })
      return { valid: true, migrated: true }
    } catch (err) {
      // Migration failed, but login is valid — log and continue
      console.error(`[password] Failed to migrate user ${userId}:`, err)
      return { valid: true, migrated: false }
    }
  }

  return { valid: true, migrated: false }
}

/**
 * Bulk-migrate all legacy SHA256 hashes to bcrypt.
 * Returns count of migrated users.
 */
export async function migrateAllLegacyPasswords(): Promise<{
  total: number
  migrated: number
  failed: number
  errors: string[]
}> {
  const users = await db.user.findMany({
    select: { id: true, email: true, password: true, plainPassword: true },
  })

  const legacyUsers = users.filter(u => isLegacyHash(u.password))
  const errors: string[] = []
  let migrated = 0
  let failed = 0

  for (const user of legacyUsers) {
    // Use plainPassword if available (it's stored for admin UI), otherwise skip
    if (!user.plainPassword) {
      errors.push(`${user.email}: no plainPassword available, cannot migrate`)
      failed++
      continue
    }

    try {
      const newHash = await hashPassword(user.plainPassword)
      await db.user.update({
        where: { id: user.id },
        data: { password: newHash },
      })
      migrated++
    } catch (err) {
      errors.push(`${user.email}: ${err instanceof Error ? err.message : String(err)}`)
      failed++
    }
  }

  return {
    total: legacyUsers.length,
    migrated,
    failed,
    errors: errors.slice(0, 20), // Limit error list
  }
}
