import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/inventory/ai-status
 *
 * Verifica si la función de IA está disponible.
 * Intenta cargar ZAI SDK y devuelve si está configurado o no.
 *
 * Returns: {
 *   available: boolean,
 *   error?: string  // Si no está disponible, por qué
 * }
 */
export async function GET() {
  try {
    const ZAI = (await import('z-ai-web-dev-sdk')).default
    await ZAI.create()
    
    return NextResponse.json({
      available: true,
    })
  } catch (error: any) {
    console.error('[ai-status] Check failed:', error?.message)
    
    const isConfigError = 
      error?.message?.includes('Configuration file') || 
      error?.message?.includes('.z-ai-config')
    
    return NextResponse.json({
      available: false,
      error: isConfigError 
        ? 'IA no configurada' 
        : error?.message || 'Error desconocido'
    })
  }
}
