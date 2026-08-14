import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

/**
 * POST /api/photo-describe
 *
 * v2.60: Usa VLM (Vision Language Model) para generar automáticamente
 * una descripción de la foto que se está subiendo. La descripción se
 * usará para autocompletar el campo "descripción" del PhotoLibrary.
 *
 * Body: { imageUrl: string (base64 data URL or http URL), sStep?: number }
 * Returns: { success: boolean, description?: string, error?: string }
 *
 * El prompt se adapta al S-Step:
 *  - S1 (Seiri): describe elementos innecesarios, herramientas, materiales, estado
 *  - S2 (Seiton): describe organización, almacenamiento, orden
 *  - S3 (Seiso): describe suciedad, polvo, manchas, puntos de limpieza
 *  - S4 (Seiketsu): describe estándares visuales, etiquetas, señalización
 *  - S5 (Shitsuke): describe cumplimiento, disciplina, hábitos
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl, sStep } = body

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'imageUrl es requerido' },
        { status: 400 }
      )
    }

    // Construir el prompt según el S-Step
    const prompts: Record<number, string> = {
      1: 'Describe brevemente (máximo 30 palabras) qué elemento innecesario o material aparece en esta foto. Incluye: tipo de objeto, cantidad aproximada, estado de conservación y ubicación si es visible. Responde en español, sin prefijos como "Esta imagen muestra".',
      2: 'Describe brevemente (máximo 30 palabras) cómo está organizado el espacio o almacenamiento en esta foto. Incluye: tipo de estantería/contenedor, nivel de orden, elementos almacenados. Responde en español, sin prefijos.',
      3: 'Describe brevemente (máximo 30 palabras) qué suciedad, polvo o mancha aparece en esta foto. Incluye: tipo de suciedad, superficie afectada, severidad. Responde en español, sin prefijos.',
      4: 'Describe brevemente (máximo 30 palabras) qué estándar visual, etiqueta o señalización aparece en esta foto. Incluye: tipo de estándar, estado de cumplimiento. Responde en español, sin prefijos.',
      5: 'Describe brevemente (máximo 30 palabras) qué se observa en esta foto sobre el cumplimiento de estándares 5S. Responde en español, sin prefijos.',
    }
    const prompt = prompts[sStep || 1] || prompts[1]

    const zai = await ZAI.create()

    const response = await zai.chat.completions.createVision({
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: imageUrl } },
          ],
        },
      ],
      thinking: { type: 'disabled' },
    })

    const description = response.choices[0]?.message?.content?.trim() || ''

    if (!description) {
      return NextResponse.json(
        { success: false, error: 'No se pudo generar una descripción' },
        { status: 500 }
      )
    }

    // Limpiar la descripción: quitar comillas, puntos finales, etc.
    let cleaned = description
      .replace(/^["\']+|["\']+$/g, '') // quitar comillas al inicio/final
      .replace(/^(Esta imagen muestra|En esta imagen|Se ve)\s*:?\s*/i, '') // quitar prefijos
      .trim()
    // Asegurar que no exceda ~200 caracteres
    if (cleaned.length > 200) {
      cleaned = cleaned.substring(0, 197) + '...'
    }

    return NextResponse.json({ success: true, description: cleaned })
  } catch (error: any) {
    console.error('[photo-describe] Error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Error al analizar la foto' },
      { status: 500 }
    )
  }
}
