/**
 * Script para crear plantillas del SISTEMA (Biblioteca del Sistema)
 * 
 * Estas plantillas son:
 * - Visibles para TODAS las empresas (companyId = null)
 * - Solo editables por el GESTOR
 * - Solo lectura para admins y responsables
 * 
 * Ejecutar: npx tsx scripts/seed-system-templates.ts
 */
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

// Plantillas base del Sistema para cada paso de las 5S
const SYSTEM_TEMPLATES = [
  // ═══════════════════════════════════════════
  // S1 - SEIRI (Clasificar)
  // ═══════════════════════════════════════════
  {
    type: 'formacion',
    sStep: 1,
    miniStep: 1,
    title: 'S1 - Formación Seiri (Clasificar)',
    description: 'Formación completa sobre la primera S: Clasificar/Seiri',
    content: JSON.stringify({
      sections: [
        { title: '¿Qué es Seiri?', content: 'Seiri significa "clasificar" o "separar". Consiste en identificar y separar los elementos necesarios de los innecesarios.' },
        { title: 'Objetivos', content: 'Eliminar innecesarios, liberar espacio, reducir tiempo de búsqueda, prevenir accidentes.' },
        { title: 'Metodología', content: '1. Clasificar elementos\n2. Usar tarjetas rojas\n3. Crear jaula de innecesarios\n4. Decidir destino\n5. Documentar' },
        { title: 'Beneficios', content: 'Mayor espacio, reducción de tiempo perdido, mejora de productividad, cultura de orden.' }
      ]
    }),
    active: true
  },
  {
    type: 'examen',
    sStep: 1,
    miniStep: 1,
    title: 'S1 - Examen Teórico Seiri',
    description: 'Examen para evaluar conocimientos de Seiri',
    content: JSON.stringify({
      questions: [
        { question: '¿Cuál es el objetivo principal de Seiri?', options: ['Separar lo necesario de lo innecesario', 'Organizar por tamaño', 'Limpiar máquinas', 'Crear estándares'], correctIndex: 0 },
        { question: '¿Qué herramienta se usa en Seiri?', options: ['Etiqueta verde', 'Tarjeta roja', 'Código de barras', 'Señal tráfico'], correctIndex: 1 },
        { question: '¿Dónde se colocan los elementos innecesarios?', options: ['Almacén principal', 'Jaula de innecesarios', 'Mesa responsable', 'Pasillo'], correctIndex: 1 },
        { question: '¿Qué beneficio aporta Seiri?', options: ['Más herramientas', 'Liberar espacio útil', 'Más documentos', 'Más pasos'], correctIndex: 1 },
        { question: '¿Quién participa en Seiri?', options: ['Solo responsable', 'Solo jefe', 'TODOS del área', 'Solo mantenimiento'], correctIndex: 2 }
      ],
      passingScore: 60
    }),
    notaMinima: 60,
    active: true
  },
  {
    type: 'fotos',
    sStep: 1,
    miniStep: 2,
    title: 'S1 - Registro Fotográfico Antes/Después',
    description: 'Plantilla para registrar fotos del estado antes y después de aplicar Seiri',
    content: JSON.stringify({
      instructions: 'Tome fotografías del área antes y después de aplicar Seiri. Marque con tarjetas rojas los elementos a eliminar.',
      minPhotos: 10,
      zones: ['Área general', 'Mesas de trabajo', 'Estanterías', 'Suelo', 'Pasillos']
    }),
    minPhotos: 10,
    active: true
  },
  {
    type: 'autoevaluacion',
    sStep: 1,
    miniStep: 4,
    title: 'S1 - Autoevaluación Seiri',
    description: 'Checklist de autoevaluación para Seiri',
    content: JSON.stringify({
      criteria: [
        { id: 's1_1', text: 'Se han identificado y separado los elementos necesarios e innecesarios', weight: 20 },
        { id: 's1_2', text: 'Los elementos innecesarios están etiquetados con tarjeta roja', weight: 15 },
        { id: 's1_3', text: 'Existe una zona de "jaula de innecesarios" temporal', weight: 15 },
        { id: 's1_4', text: 'Se ha decidido el destino de cada elemento innecesario', weight: 15 },
        { id: 's1_5', text: 'El área está libre de objetos que no se utilizan', weight: 20 },
        { id: 's1_6', text: 'Todo el personal conoce y aplica Seiri', weight: 15 }
      ],
      passingScore: 70
    }),
    notaMinima: 70,
    active: true
  },
  {
    type: 'auditoria',
    sStep: 1,
    miniStep: 5,
    title: 'S1 - Auditoría Externa Seiri',
    description: 'Plantilla de auditoría externa para verificar la implementación de Seiri',
    content: JSON.stringify({
      criteria: [
        { id: 'audit_s1_1', text: 'No hay elementos innecesarios en el área de trabajo', weight: 25 },
        { id: 'audit_s1_2', text: 'Existe evidencia de clasificación reciente (tarjetas rojas, registro)', weight: 20 },
        { id: 'audit_s1_3', text: 'La jaula de innecesarios se gestiona correctamente', weight: 15 },
        { id: 'audit_s1_4', text: 'El personal puede explicar qué es Seiri y cómo lo aplica', weight: 20 },
        { id: 'audit_s1_5', text: 'Hay indicadores de mejora medibles', weight: 20 }
      ],
      passingScore: 75
    }),
    notaMinima: 75,
    active: true
  },

  // ═══════════════════════════════════════════
  // S2 - SEITON (Organizar)
  // ═══════════════════════════════════════════
  {
    type: 'formacion',
    sStep: 2,
    miniStep: 1,
    title: 'S2 - Formación Seiton (Organizar)',
    description: 'Formación completa sobre la segunda S: Organizar/Seiton',
    content: JSON.stringify({
      sections: [
        { title: '¿Qué es Seiton?', content: 'Seiton significa "organizar" o "ordenar". Un lugar para cada cosa y cada cosa en su lugar.' },
        { title: 'Objetivos', content: 'Asignar ubicación facia, facilitar localización, reducir tiempo de preparación, implementar señalización visual.' },
        { title: 'Metodología', content: '1. Analizar frecuencia de uso\n2. Definir ubicación óptima\n3. Implementar identificación visual\n4. Crear layout\n5. Señalizar' },
        { title: 'Beneficios', content: 'Sin tiempo perdido buscando, menos errores, mayor seguridad, eficiencia operativa.' }
      ]
    }),
    active: true
  },
  {
    type: 'examen',
    sStep: 2,
    miniStep: 1,
    title: 'S2 - Examen Teórico Seiton',
    description: 'Examen para evaluar conocimientos de Seiton',
    content: JSON.stringify({
      questions: [
        { question: '¿Cuál es el objetivo principal de Seiton?', options: ['Eliminar innecesarios', 'Asignar ubicación definida', 'Limpiar equipos', 'Auditar proceso'], correctIndex: 1 },
        { question: '¿Qué principio aplica Seiton?', options: ['Más es mejor', 'Un lugar para cada cosa', 'Todo en estantería', 'Guardar en cajas'], correctIndex: 1 },
        { question: '¿Dónde van elementos de uso muy frecuente?', options: ['Almacén lejano', 'Cerca del puesto', 'Suelo pasillo', 'Oficina jefe'], correctIndex: 1 },
        { question: '¿Qué NO es método de identificación visual?', options: ['Etiquetas', 'Códigos color', 'Memorizar', 'Sombras'], correctIndex: 2 },
        { question: '¿Qué hacer después de usar una herramienta?', options: ['Dejar donde usó', 'Devolver a su lugar', 'Pasar al compañero', 'Cualquier cajón'], correctIndex: 1 }
      ],
      passingScore: 60
    }),
    notaMinima: 60,
    active: true
  },
  {
    type: 'fotos',
    sStep: 2,
    miniStep: 2,
    title: 'S2 - Registro Fotográfico Orden y Señalización',
    description: 'Plantilla para fotos de orden, señalización y ubicaciones',
    content: JSON.stringify({
      instructions: 'Fotografíe ejemplos de buena señalización, ubicaciones definidas y orden.',
      minPhotos: 10,
      zones: ['Señalización general', 'Ubicaciones herramientas', 'Etiquetado', 'Pasillos señalizados', 'Puntos de trabajo']
    }),
    minPhotos: 10,
    active: true
  },
  {
    type: 'autoevaluacion',
    sStep: 2,
    miniStep: 4,
    title: 'S2 - Autoevaluación Seiton',
    description: 'Checklist de autoevaluación para Seiton',
    content: JSON.stringify({
      criteria: [
        { id: 's2_1', text: 'Cada elemento tiene una ubicación definida y etiquetada', weight: 20 },
        { id: 's2_2', text: 'La señalización visible permite localizar cualquier elemento', weight: 18 },
        { id: 's2_3', text: 'Se aplican códigos de color de forma consistente', weight: 16 },
        { id: 's2_4', text: 'Los pasillos y zonas están claramente demarcados', weight: 16 },
        { id: 's2_5', text: 'Las herramientas se devuelven a su lugar después de usar', weight: 15 },
        { id: 's2_6', text: 'Existe un layout actualizado del área', weight: 15 }
      ],
      passingScore: 70
    }),
    notaMinima: 70,
    active: true
  },
  {
    type: 'auditoria',
    sStep: 2,
    miniStep: 5,
    title: 'S2 - Auditoría Externa Seiton',
    description: 'Plantilla de auditoría externa para Seiton',
    content: JSON.stringify({
      criteria: [
        { id: 'audit_s2_1', text: 'La señalización es clara y completa', weight: 22 },
        { id: 'audit_s2_2', text: 'Todo tiene su lugar asignado y está en él', weight: 22 },
        { id: 'audit_s2_3', text: 'Cualquier persona puede encontrar cualquier elemento', weight: 20 },
        { id: 'audit_s2_4', text: 'Los códigos de color se aplican correctamente', weight: 18 },
        { id: 'audit_s2_5', text: 'El layout refleja la realidad actual', weight: 18 }
      ],
      passingScore: 75
    }),
    notaMinima: 75,
    active: true
  },

  // ═══════════════════════════════════════════
  // S3 - SEISO (Limpiar)
  // ═══════════════════════════════════════════
  {
    type: 'formacion',
    sStep: 3,
    miniStep: 1,
    title: 'S3 - Formación Seiso (Limpiar)',
    description: 'Formación sobre la tercera S: Limpiar/Seiso',
    content: JSON.stringify({
      sections: [
        { title: '¿Qué es Seiso?', content: 'Seiso significa "limpiar" o "brillar". Inspeccionar mientras se limpia, detectando anomalías.' },
        { title: 'Objetivos', content: 'Mantener área limpia, identificar fuentes de suciedad, detectar anomalías, establecer rutinas.' },
        { title: 'Metodología', content: '1. Inventariar puntos suciedad\n2. Clasificar por nivel/fuente\n3. Definir métodos\n4. Asignar frecuencias\n5. Crear mapa\n6. Kit limpieza' },
        { title: 'Beneficios', content: 'Detección temprana fallos, menos accidentes, mejor calidad, mayor vida útil equipos.' }
      ]
    }),
    active: true
  },
  {
    type: 'examen',
    sStep: 3,
    miniStep: 1,
    title: 'S3 - Examen Teórico Seiso',
    description: 'Examen para evaluar conocimientos de Seiso',
    content: JSON.stringify({
      questions: [
        { question: '¿Objetivo principal de Seiso?', options: ['Que todo brille', 'Inspeccionar limpiando, detectar anomalías', 'Pintar paredes', 'Comprar productos'], correctIndex: 1 },
        { question: 'Diferencia vs limpieza normal?', options: ['Usa más agua', 'Es mantenimiento preventivo', 'Solo equipo limpieza', 'Una vez al año'], correctIndex: 1 },
        { question: 'Tipos de suciedad a inventariar?', options: ['Solo polvo', 'Polvo, grasa, manchas, residuos, humedad, oxidación', 'Solo grasa', 'Solo comida'], correctIndex: 1 },
        { question: 'Quién es responsable?', options: ['Equipo limpieza', 'Encargado', 'Cada persona en su zona', 'Calidad'], correctIndex: 2 },
        { question: 'Al detectar fuga durante limpieza?', options: ['Ignorarla', 'Identificar y reportarla', 'Taparla', 'Esperar seque'], correctIndex: 1 }
      ],
      passingScore: 60
    }),
    notaMinima: 60,
    active: true
  },
  {
    type: 'fotos',
    sStep: 3,
    miniStep: 2,
    title: 'S3 - Registro Fotográfico Limpieza',
    description: 'Plantilla para documentar limpieza y puntos de suciedad',
    content: JSON.stringify({
      instructions: 'Documente puntos de suciedad, acciones de limpieza y resultados.',
      minPhotos: 8,
      zones: ['Puntos críticos', 'Antes de limpieza', 'Después de limpieza', 'Equipos', 'Zonas comunes']
    }),
    minPhotos: 8,
    active: true
  },
  {
    type: 'autoevaluacion',
    sStep: 3,
    miniStep: 4,
    title: 'S3 - Autoevaluación Seiso',
    description: 'Checklist de autoevaluación para Seiso',
    content: JSON.stringify({
      criteria: [
        { id: 's3_1', text: 'El área de trabajo se mantiene limpia y ordenada', weight: 18 },
        { id: 's3_2', text: 'Existen kits de limpieza accesibles en cada zona', weight: 16 },
        { id: 's3_3', text: 'Hay un mapa de puntos de suciedad con responsables', weight: 17 },
        { id: 's3_4', text: 'Las frecuencias de limpieza se cumplen', weight: 17 },
        { id: 's3_5', text: 'Se detectan y reportan anomalías durante la limpieza', weight: 16 },
        { id: 's3_6', text: 'El personal conoce la diferencia entre limpiar y Seiso', weight: 16 }
      ],
      passingScore: 70
    }),
    notaMinima: 70,
    active: true
  },
  {
    type: 'auditoria',
    sStep: 3,
    miniStep: 5,
    title: 'S3 - Auditoría Externa Seiso',
    description: 'Plantilla de auditoría externa para Seiso',
    content: JSON.stringify({
      criteria: [
        { id: 'audit_s3_1', text: 'Los niveles de limpieza son aceptables y homogéneos', weight: 22 },
        { id: 'audit_s3_2', text: 'Existe evidencia de limpieza programada y registrada', weight: 20 },
        { id: 'audit_s3_3', text: 'Los kits de limpieza están completos y accesibles', weight: 19 },
        { id: 'audit_s3_4', text: 'Se identifican fuentes de suciedad en origen', weight: 20 },
        { id: 'audit_s3_5', text: 'El personal aplica Seiso como inspección, no solo limpieza', weight: 19 }
      ],
      passingScore: 75
    }),
    notaMinima: 75,
    active: true
  },

  // ═══════════════════════════════════════════
  // S4 - SEIKETSU (Estandarizar)
  // ═══════════════════════════════════════════
  {
    type: 'formacion',
    sStep: 4,
    miniStep: 1,
    title: 'S4 - Formación Seiketsu (Estandarizar)',
    description: 'Formación sobre la cuarta S: Estandarizar/Seiketsu',
    content: JSON.stringify({
      sections: [
        { title: '¿Qué es Seiketsu?', content: 'Seiketsu significa "estandarizar". Crear normas que mantengan las 3S anteriores.' },
        { title: 'Objetivos', content: 'Crear estándares visuales, establecer procedimientos, prevenir reaparición problemas, definir indicadores.' },
        { title: 'Metodología', content: '1. Documentar mejores prácticas\n2. Crear estándares visuales\n3. Establecer procedimientos\n4. Implantar checklists\n5. Definir indicadores\n6. Revisar periódicamente' },
        { title: 'Beneficios', content: 'Consolidación mejoras, reducción variabilidad, facilita formación, detección rápida desviaciones.' }
      ]
    }),
    active: true
  },
  {
    type: 'examen',
    sStep: 4,
    miniStep: 1,
    title: 'S4 - Examen Teórico Seiketsu',
    description: 'Examen para evaluar conocimientos de Seiketsu',
    content: JSON.stringify({
      questions: [
        { question: '¿Objetivo de Seiketsu?', options: ['Crear más documentos', 'Mantener logros de las 3S anteriores', 'Contratar más gente', 'Comprar equipos'], correctIndex: 1 },
        { question: '¿Qué son los estándares visuales?', options: ['Manuales largos', 'Fotos, diagramas, señalización del estado correcto', 'Reuniones', 'Emails'], correctIndex: 1 },
        { question: '¿Para qué sirven los checklists?', options: ['Para castigar', 'Verificación diaria/semanal del estado', 'Para rellenar', 'Obligatorios solo'], correctIndex: 1 },
        { question: '¿Qué son los indicadores visuales?', options: ['Números en pantalla', 'Semáforos, marcas nivel, contornos', 'Gráficos complejos', 'KPIs mensuales'], correctIndex: 1 },
        { question: '¿Con qué frecuencia revisar estándares?', options: ['Nunca', 'Una vez', 'Periódicamente', 'Solo cuando hay error'], correctIndex: 2 }
      ],
      passingScore: 60
    }),
    notaMinima: 60,
    active: true
  },
  {
    type: 'autoevaluacion',
    sStep: 4,
    miniStep: 4,
    title: 'S4 - Autoevaluación Seiketsu',
    description: 'Checklist de autoevaluación para Seiketsu',
    content: JSON.stringify({
      criteria: [
        { id: 's4_1', text: 'Existen estándares visuales documentados (fotos, diagramas)', weight: 18 },
        { id: 's4_2', text: 'Los procedimientos están escritos y son claros', weight: 17 },
        { id: 's4_3', text: 'Hay checklists de verificación en uso', weight: 17 },
        { id: 's4_4', text: 'Los indicadores visuales permiten detectar anomalías', weight: 16 },
        { id: 's4_5', text: 'Los estándares se actualizan cuando es necesario', weight: 16 },
        { id: 's4_6', text: 'Todo el personal conoce y sigue los estándares', weight: 16 }
      ],
      passingScore: 70
    }),
    notaMinima: 70,
    active: true
  },
  {
    type: 'auditoria',
    sStep: 4,
    miniStep: 5,
    title: 'S4 - Auditoría Externa Seiketsu',
    description: 'Plantilla de auditoría externa para Seiketsu',
    content: JSON.stringify({
      criteria: [
        { id: 'audit_s4_1', text: 'Los estándares son adecuados y completos', weight: 21 },
        { id: 'audit_s4_2', text: 'Hay evidencia de cumplimiento de los estándares', weight: 21 },
        { id: 'audit_s4_3', text: 'Los procedimientos se siguen consistentemente', weight: 20 },
        { id: 'audit_s4_4', text: 'Los indicadores visuales son efectivos', weight: 19 },
        { id: 'audit_s4_5', text: 'Existe proceso de mejora continua de estándares', weight: 19 }
      ],
      passingScore: 75
    }),
    notaMinima: 75,
    active: true
  },

  // ═══════════════════════════════════════════
  // S5 - SHITSUKE (Disciplina)
  // ═══════════════════════════════════════════
  {
    type: 'formacion',
    sStep: 5,
    miniStep: 1,
    title: 'S5 - Formación Shitsuke (Disciplina)',
    description: 'Formación sobre la quinta S: Disciplina/Shitsuke',
    content: JSON.stringify({
      sections: [
        { title: '¿Qué es Shitsuke?', content: 'Shitsuke significa "disciplina" o "sostener". Convertir normas en hábitos.' },
        { title: 'Objetivos', content: 'Crear hábitos, fomentar autodisciplina, establecer seguimiento, promover mejora continua.' },
        { title: 'Metodología', content: '1. Auditorías internas periódicas\n2. Auditorías externas\n3. Registrar anomalías\n4. Planes de acción\n5. Comunicar resultados\n6. Reconocer éxitos' },
        { title: 'Beneficios', content: 'Mantenimiento sostenido, mejora continua, compromiso personal, reducción recaídas, cultura calidad.' }
      ]
    }),
    active: true
  },
  {
    type: 'examen',
    sStep: 5,
    miniStep: 1,
    title: 'S5 - Examen Teórico Shitsuke',
    description: 'Examen para evaluar conocimientos de Shitsuke',
    content: JSON.stringify({
      questions: [
        { question: '¿Objetivo de Shitsuke?', options: ['Más reglas', 'Convertir estándares en hábitos diarios', 'Más supervisores', 'Más reuniones'], correctIndex: 1 },
        { question: '¿Qué tipo de auditorías se usan?', options: ['Solo externas', 'Internas y externas', 'Solo internas', 'Ninguna'], correctIndex: 1 },
        { question: '¿Para qué sirven los planes de acción?', options: ['Para castigar', 'Corregir anomalías con responsable y fecha', 'Para ignorar', 'Opcionales'], correctIndex: 1 },
        { question: '¿Cómo mantener la disciplina?', options: ['Castigando errores', 'Reconociendo éxitos y siguiendo', 'Ignorando', 'Reuniendo mucho'], correctIndex: 1 },
        { question: '¿Resultado final de Shitsuke?', options: ['Más papeles', 'Cultura de calidad sostenida', 'Más jefes', 'Más costes'], correctIndex: 1 }
      ],
      passingScore: 60
    }),
    notaMinima: 60,
    active: true
  },
  {
    type: 'autoevaluacion',
    sStep: 5,
    miniStep: 4,
    title: 'S5 - Autoevaluación Shitsuke',
    description: 'Checklist de autoevaluación para Shitsuke',
    content: JSON.stringify({
      criteria: [
        { id: 's5_1', text: 'Se realizan autoevaluaciones periódicamente', weight: 17 },
        { id: 's5_2', text: 'Las anomalías se registran y gestionan', weight: 17 },
        { id: 's5_3', text: 'Los planes de acción tienen responsable y fecha', weight: 17 },
        { id: 's5_4', text: 'Se comunican los resultados al equipo', weight: 16 },
        { id: 's5_5', text: 'El cumplimiento es voluntario y constante', weight: 17 },
        { id: 's5_6', text: 'Hay reconocimiento por buenos resultados', weight: 16 }
      ],
      passingScore: 70
    }),
    notaMinima: 70,
    active: true
  },
  {
    type: 'auditoria',
    sStep: 5,
    miniStep: 5,
    title: 'S5 - Auditoría Externa Shitsuke',
    description: 'Plantilla de auditoría externa para Shitsuke',
    content: JSON.stringify({
      criteria: [
        { id: 'audit_s5_1', text: 'Las 5S se mantienen de forma sostenida en el tiempo', weight: 21 },
        { id: 'audit_s5_2', text: 'Existe evidencia de mejora continua', weight: 21 },
        { id: 'audit_s5_3', text: 'El compromiso del personal es evidente', weight: 20 },
        { id: 'audit_s5_4', text: 'Los procesos de auditoría funcionan correctamente', weight: 19 },
        { id: 'audit_s5_5', text: 'La cultura de calidad está arraigada', weight: 19 }
      ],
      passingScore: 75
    }),
    notaMinima: 75,
    active: true
  }
]

async function main() {
  console.log('🌟 CREANDO PLANTILLAS DEL SISTEMA (Biblioteca del Sistema)\n')
  console.log('Estas plantillas serán:\n')
  console.log('  ✅ Visibles para TODAS las empresas')
  console.log('  🔒 Solo editables por el GESTOR')
  console.log('  👁️ Solo lectura para Admins y Responsables\n')
  
  let created = 0
  let skipped = 0
  
  for (const tpl of SYSTEM_TEMPLATES) {
    // Verificar si ya existe una plantilla igual del sistema
    const existing = await db.template.findFirst({
      where: {
        companyId: null, // Del sistema
        type: tpl.type,
        sStep: tpl.sStep,
        title: tpl.title
      }
    })
    
    if (existing) {
      console.log(`⏭️  Ya existe: ${tpl.title}`)
      skipped++
      continue
    }
    
    try {
      await db.template.create({
        data: {
          ...tpl,
          companyId: null // ← CLAVE: null = Biblioteca del Sistema
        }
      })
      console.log(`✅ Creada: ${tpl.title}`)
      created++
    } catch (error) {
      console.error(`❌ Error creando ${tpl.title}:`, error)
    }
  }
  
  console.log('\n═'.repeat(50))
  console.log('RESUMEN:')
  console.log(`  ✅ Plantillas creadas: ${created}`)
  console.log(`  ⏭️  Ya existían: ${skipped}`)
  console.log(`  📚 Total plantillas del sistema: ${created + skipped}`)
  console.log('\n🎉 Las plantillas del Sistema están listas!')
  console.log('   Los administradores ahora podrán verlas (solo lectura).')
}

main()
  .catch(e => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
