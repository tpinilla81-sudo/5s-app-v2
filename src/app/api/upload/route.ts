import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const filename = formData.get('filename') as string | null

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    // Use Vercel Blob for storage (works in production + preview)
    // Falls back to local filesystem in dev if blob token not set
    const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

    if (BLOB_TOKEN) {
      // Production: use Vercel Blob
      const blob = await put(filename || file.name, file, {
        access: 'public',
        contentType: file.type || 'image/jpeg',
      })
      return NextResponse.json({ success: true, url: blob.url })
    } else {
      // Dev/local fallback: store in public/uploads/photos via base64 in DB
      // Since we can't write filesystem in serverless, we return the file data
      // so the caller can store it as base64 in the PhotoLibrary
      const arrayBuffer = await file.arrayBuffer()
      const base64 = Buffer.from(arrayBuffer).toString('base64')
      const mimeType = file.type || 'image/jpeg'
      const dataUrl = `data:${mimeType};base64,${base64}`
      
      return NextResponse.json({ 
        success: true, 
        url: dataUrl,
        isBase64: true, // Flag so caller knows this is base64, not a server URL
      })
    }
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 })
  }
}
