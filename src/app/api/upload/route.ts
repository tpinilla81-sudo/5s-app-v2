import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/upload
 *
 * Handles photo uploads for Vercel serverless deployment.
 * Stores photos as base64 data URLs directly in Neon PostgreSQL (photoUrl field).
 *
 * Photos are compressed client-side (max 1200x900px, 70% JPEG quality ≈ 80-150KB).
 * Neon PostgreSQL `text` column has no practical size limit.
 * Vercel serverless has a 4.5MB body limit, more than enough.
 *
 * Accepts: multipart/form-data with 'file' field
 * Returns: { success: boolean, url?: string, error?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Solo se permiten archivos de imagen' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB — client-side compression should keep it well under)
    const MAX_SIZE = 10 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: `El archivo supera el límite de 10MB (${(file.size / 1024 / 1024).toFixed(1)}MB)` },
        { status: 400 }
      )
    }

    // Convert to base64 data URL → stored directly in Neon photoUrl column
    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    const dataUrl = `data:${file.type || 'image/jpeg'};base64,${base64}`

    const sizeKB = Math.round(base64.length * 0.75 / 1024)
    console.log(`[upload] Photo stored as base64 in Neon (${sizeKB}KB)`)

    if (sizeKB > 500) {
      console.warn(`[upload] Large photo (${sizeKB}KB). Client-side compression should keep photos under 200KB.`)
    }

    // v2.60: Server-side sanity check — si la imagen es sospechosamente
    // pequeña (menos de 2KB), probablemente sea un canvas vacío o una
    // imagen negra resultado de una compresión fallida en cliente.
    // Rechazar para que el cliente muestre error en lugar de guardar
    // basura en la base de datos.
    if (sizeKB < 2) {
      console.error(`[upload] Photo too small (${sizeKB}KB), likely empty/black canvas. Rejecting.`)
      return NextResponse.json(
        { success: false, error: 'La imagen está vacía o corrupta. Intenta tomar la foto de nuevo.' },
        { status: 400 }
      )
    }

    // v2.60: validar que el base64 no sea todo ceros (canvas vacío típico).
    // Un canvas vacío exportado como JPEG tiene una firma muy repetitiva.
    // Comprobamos los primeros 100 bytes del base64 decodificado.
    const buf = Buffer.from(arrayBuffer)
    // Si todos los bytes son 0xFF o 0x00 (patrón típico de canvas vacío),
    // es muy probable que sea una imagen negra/blanca sin contenido real.
    let suspiciousZeros = 0
    let suspiciousFFs = 0
    const sampleSize = Math.min(buf.length, 1000)
    for (let i = 0; i < sampleSize; i++) {
      if (buf[i] === 0x00) suspiciousZeros++
      else if (buf[i] === 0xFF) suspiciousFFs++
    }
    // Si más del 95% de la muestra son ceros o FFs, probablemente es canvas vacío
    if (sampleSize > 0 && (suspiciousZeros / sampleSize > 0.95 || suspiciousFFs / sampleSize > 0.95)) {
      console.error(`[upload] Photo appears to be empty canvas (zeros: ${(suspiciousZeros/sampleSize*100).toFixed(1)}%, FFs: ${(suspiciousFFs/sampleSize*100).toFixed(1)}%). Rejecting.`)
      return NextResponse.json(
        { success: false, error: 'La imagen parece estar vacía. Intenta tomar la foto de nuevo.' },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, url: dataUrl })
  } catch (error) {
    console.error('[upload] Error processing upload:', error)
    return NextResponse.json(
      { success: false, error: 'Error al procesar la subida del archivo' },
      { status: 500 }
    )
  }
}
