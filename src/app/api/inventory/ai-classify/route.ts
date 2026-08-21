import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/inventory/ai-classify
 *
 * Usa VLM (Vision Language Model) para analizar una foto de un elemento
 * del inventario 5S y sugerir automáticamente:
 * - Nombre del elemento
 * - Categoría
 * - Estado/condición
 * - Decisión sugerida (Mantener, Retirar, Reparar, etc.)
 *
 * Body: {
 *   imageUrl: string (base64 data URL or http URL),
 *   sStep?: number (1-5, por defecto 1 para Seiri/clasificación),
 *   zoneName?: string (nombre de la zona para contexto)
 * }
 *
 * Returns: {
 *   success: boolean,
 *   data?: { ... },
 *   error?: string,
 *   configError?: true  // Si falta configuración de IA
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl, sStep = 1, zoneName } = body

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'imageUrl es requerido' },
        { status: 400 }
      )
    }

    // Intentar cargar ZAI dinámicamente y manejar error de configuración
    let zai: any
    try {
      const ZAI = (await import('z-ai-web-dev-sdk')).default
      zai = await ZAI.create()
    } catch (importError: any) {
      console.error('[ai-classify] Error loading ZAI SDK:', importError?.message)
      
      // Detectar error específico de configuración faltante
      if (importError?.message?.includes('Configuration file') || 
          importError?.message?.includes('.z-ai-config')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'La función de IA no está configurada. Contacta al administrador.',
            configError: true,
            details: 'Se requiere archivo .z-ai-config en el servidor'
          },
          { status: 503 }  // Service Unavailable
        )
      }
      
      throw importError  // Re-lanzar otros errores
    }

    // Prompt especializado según el S-Step para inventario
    const promptsByStep: Record<number, string> = {
      1: `Eres un experto en metodología 5S analizando fotos de elementos en una zona${zoneName ? ` llamada "${zoneName}"` : ''}.

Analiza esta foto y devuelve SOLO un JSON válido (sin markdown, sin \`\`\`) con esta estructura exacta:
{
  "name": "nombre del elemento detectado",
  "category": "una de estas: [Herramienta|Maquinaria|Materia prima|Producto terminado|Mobiliario|Equipo de oficina|Material de limpieza|Residuo|Documento|Otro]",
  "estado": "uno de estos: [Nuevo|Bueno|Regular|Dañado|Obsoleto|Roto|Sucio|Descompuesto]",
  "action": "una de estas decisiones 5S: [Mantener|Retirar|Reparar|Reciclar|Reubicar]",
  "confidence": "Alta|Media|Baja",
  "reasoning": "breve explicación de 10-15 palabras"
}

Reglas:
- Sé específico con el nombre (ej: "Taladro percutor" no solo "Herramienta")
- La acción debe seguir lógica 5S: si está dañado/obsoleto → Retirar o Reparar
- Responde SOLO el JSON, nada más.`,

      2: `Eres un experto en 5S (Seiton - Organización) analizando elementos.

Analiza esta foto y devuelve SOLO un JSON válido sin markdown:
{
  "name": "elemento u objeto visible",
  "category": "una de: [Herramienta|Contenedor|Estantería|Material|Equipo|Señalización|Otro]",
  "estado": "uno de: [Bien organizado|Desordenado|Mal ubicado|Sin etiqueta|Correcto]",
  "action": "una de: [Mantener|Reubicar|Etiquetar|Organizar]",
  "confidence": "Alta|Media|Baja",
  "reasoning": "explicación breve"
}
Responde SOLO el JSON.`,

      3: `Eres un experto en 5S (Seiso - Limpieza) analizando suciedad.

Analiza esta foto y devuelve SOLO un JSON válido sin markdown:
{
  "name": "elemento o área afectada",
  "category": "una de: [Superficie|Equipo|Suelo|Pared|Herramienta|Área general|Otro]",
  "estado": "uno de: [Limpio|Ligero sucio|Sucio|Muy sucio|Con manchas|Con polvo|Con grasa|Con óxido]",
  "action": "una de: [Limpiar|Limpiar a fondo|Desinfectar|Mantener]",
  "confidence": "Alta|Media|Baja",
  "reasoning": "explicación breve"
}
Responde SOLO el JSON.`,

      4: `Eres un experto en 5S (Seiketsu - Estandarización) analizando estándares.

Analiza esta foto y devuelve SOLO un JSON válido sin markdown:
{
  "name": "estándar o elemento visualizado",
  "category": "una de: [Etiqueta|Señal|Pictograma|Estándar|Zona demarcada|Otro]",
  "estado": "uno de: [Cumple|No cumple|Parcialmente|Deteriorado|Ausente|Correcto]",
  "action": "una de: [Mantener|Actualizar|Rehacer|Crear]",
  "confidence": "Alta|Media|Baja",
  "reasoning": "explicación breve"
}
Responde SOLO el JSON.`,

      5: `Eres un experto en 5S (Shitsuke - Disciplina) analizando cumplimiento.

Analiza esta foto y devuelve SOLO un JSON válido sin markdown:
{
  "name": "área o práctica observada",
  "category": "una de: [Persona|Área de trabajo|Proceso|Equipo|General|Otro]",
  "estado": "uno de: [Cumpliendo|No cumpliendo|Mejorable|Correcto|Incorrecto]",
  "action": "una de: [Reforzar|Capacitar|Corregir|Mantener|Reconocer]",
  "confidence": "Alta|Media|Baja",
  "reasoning": "explicación breve"
}
Responde SOLO el JSON.`,
    }

    const prompt = promptsByStep[sStep] || promptsByStep[1]

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

    let content = response.choices[0]?.message?.content?.trim() || ''

    if (!content) {
      return NextResponse.json(
        { success: false, error: 'No se pudo analizar la imagen' },
        { status: 500 }
      )
    }

    // Limpiar respuesta: quitar markdown code blocks si los hay
    content = content
      .replace(/^```json\s*/i, '')
      .replace(/```\s*$/, '')
      .trim()

    // Parsear JSON
    let result
    try {
      result = JSON.parse(content)
    } catch (parseError) {
      // Si no es JSON válido, intentar extraer datos con regex
      console.warn('[ai-classify] JSON parse failed, attempting extraction')
      
      // Intentar encontrar JSON en la respuesta
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0])
      } else {
        return NextResponse.json(
          { 
            success: false, 
            error: 'La IA no devolvió un formato válido',
            rawResponse: content.slice(0, 200) 
          },
          { status: 500 }
        )
      }
    }

    // Validar campos requeridos
    const requiredFields = ['name', 'category', 'estado', 'action']
    const missingFields = requiredFields.filter(f => !result[f])
    
    if (missingFields.length > 0) {
      console.warn('[ai-classify] Missing fields:', missingFields, 'Result:', result)
      // Completar campos faltantes con valores por defecto
      if (!result.name) result.name = 'Elemento identificado por IA'
      if (!result.category) result.category = 'Otro'
      if (!result.estado) result.estado = 'Por verificar'
      if (!result.action) result.action = 'Mantener'
    }

    return NextResponse.json({
      success: true,
      data: {
        name: String(result.name).slice(0, 100),
        category: String(result.category).slice(0, 50),
        estado: String(result.estado).slice(0, 50),
        action: String(result.action).slice(0, 30),
        confidence: String(result.confidence || 'Media').slice(0, 20),
        reasoning: String(result.reasoning || '').slice(0, 150),
      }
    })

  } catch (error: any) {
    console.error('[ai-classify] Error:', error)
    
    // Manejo específico de error de configuración
    if (error?.message?.includes('Configuration file') || 
        error?.message?.includes('.z-ai-config')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'La función de IA no está configurada. Contacta al administrador.',
          configError: true,
          details: error.message
        },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: error?.message || 'Error al analizar con IA' },
      { status: 500 }
    )
  }
}
