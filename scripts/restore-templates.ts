/**
 * Script para restaurar TODAS las plantillas del sistema (v3.0.7)
 * 
 * Estructura completa: 16 tipos × 5 pasos S = 80 plantillas
 * 
 * TIPOS POR PASO:
 * ┌─────────────────────────────────────────────────────┐
 * │ PASO 1: formacion, examen                           │
 * │ PASO 2: fotos                                       │
 * │ PASO 3: inventario, estandar, layout, plan_limpieza │
 * │ PASO 4: autoevaluacion, plan_accion                 │
 * │ PASO 5: auditoria, pdca                             │
 * │ + 5S básicas: clasificar, ordenar, limpiar,         │
 * │            estandarizar, mantener                   │
 * └─────────────────────────────────────────────────────┘
 * 
 * Ejecutar: npx tsx scripts/restore-templates.ts
 */
const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

// Constantes del sistema 5S
const S_JAPANESE = ['Seiri', 'Seiton', 'Seiso', 'Seiketsu', 'Shitsuke']
const S_NAMES = ['Revisar', 'Ordenar', 'Limpiar', 'Estandarizar', 'Mantener']

// Mapeo correcto de miniStep por tipo
const CORRECT_MINI_STEP: Record<string, number> = {
  formacion: 1,
  examen: 1,
  fotos: 2,
  inventario: 3,
  estandar: 3,
  layout: 3,
  plan_limpieza: 3,
  autoevaluacion: 4,
  plan_accion: 4,
  auditoria: 5,
  pdca: 5,
  // 5S básicas (miniStep 0 por defecto)
  clasificar: 0,
  ordenar: 0,
  limpiar: 0,
  estandarizar: 0,
  mantener: 0,
}

// Notas mínimas según tipo
const CORRECT_NOTA_MINIMA: Record<number | null> = {
  formacion: 80,
  examen: 80,
  autoevaluacion: 70,
  auditoria: 75,
}

// Todos los tipos que deben existir en el sistema
const ALL_TYPES = [
  // Paso 1 - Formación y Exámenes
  'formacion',
  'examen',
  
  // Paso 2 - Fotografías
  'fotos',
  
  // Paso 3 - Inventario y Estándares
  'inventario',
  'estandar',
  'layout',
  'plan_limpieza',
  
  // Paso 4 - Autoevaluación y Plan de Acción
  'autoevaluacion',
  'plan_accion',
  
  // Paso 5 - Auditoría y PDCA
  'auditoria',
  'pdca',
  
  // 5S Básicas
  'clasificar',
  'ordenar',
  'limpiar',
  'estandarizar',
  'mantener',
]

// Generador de contenido según tipo y paso
function generateContent(type: string, sStep: number): object {
  const jName = S_JAPANESE[sStep - 1]
  const sName = S_NAMES[sStep - 1]
  
  switch (type) {
    case 'formacion':
      return {
        sections: [{
          title: `¿Qué es ${jName}?`,
          content: `Formación sobre la ${sStep}ª S: ${sName} (${jName})`,
          topics: [
            `Concepto fundamental de ${jName}`,
            `Beneficios de aplicar ${sName}`,
            `Herramientas y técnicas para ${jName}`,
            `Ejemplos prácticos de aplicación`
          ]
        }]
      }
      
    case 'examen':
      return {
        questions: [
          {
            question: `¿Qué significa ${jName} en el contexto 5S?`,
            options: [sName, 'Organizar', 'Limpiar', 'Estandarizar'],
            correctIndex: 0,
            explanation: `${jName} se traduce como ${sName}`
          },
          {
            question: `¿Cuál es el objetivo principal de ${sName}?`,
            options: ['Eliminar innecesarios', 'Organizar espacio', 'Mantener orden', 'Todas las anteriores'],
            correctIndex: 3,
            explanation: `${sName} abarca múltiples aspectos`
          },
          {
            question: `¿Con qué frecuencia se debe aplicar ${jName}?`,
            options: ['Anual', 'Mensual', 'Diariamente', 'Solo una vez'],
            correctIndex: 2,
            explanation: 'El 5S requiere práctica continua'
          },
          {
            question: `¿Quién es responsable de ${sName}?`,
            options: ['Solo el gestor', 'Solo el responsable', 'Todo el equipo', 'Nadie'],
            correctIndex: 2,
            explanation: 'El 5S es responsabilidad de todos'
          },
          {
            question: `¿Qué herramienta ayuda a implementar ${jName}?`,
            options: ['Auditoría', 'Checklist', 'Fotografías', 'Todas'],
            correctIndex: 3,
            explanation: 'Se usan múltiples herramientas'
          }
        ],
        passingScore: 80,
        timeLimit: 15 // minutos
      }
      
    case 'fotos':
      return {
        minPhotos: 10,
        instructions: `
          Instrucciones para fotografías ${jName}:
          
          1. FOTO ANTES: Tome foto del estado actual
          2. FOTO DESPUÉS: Tome foto después de la mejora
          3. ANGULO: Misma posición y ángulo para ambas
          4. ILUMINACIÓN: Buena iluminación visible
          5. REFERENCIA: Incluya objeto de referencia si es posible
        `.trim(),
        requiredShots: ['antes_general', 'antes_detalle', 'despues_general', 'despues_detalle'],
        tips: [
          'Use la misma cámara/teléfono para todas las fotos',
          'Marque el punto de referencia en el suelo',
          'Tome fotos a la misma hora si hay luz natural',
          'Incluya un objeto conocido para escala'
        ]
      }
      
    case 'inventario':
      return {
        title: `Inventario ${jName}`,
        subtitle: `Control de elementos para ${sName}`,
        templateName: `Inventario_${jName}`,
        categories: [
          { name: 'Herramientas', fields: ['nombre', 'cantidad', 'estado', 'ubicacion'] },
          { name: 'Materiales', fields: ['nombre', 'cantidad', 'unidad', 'minimo'] },
          { name: 'Equipos', fields: ['nombre', 'modelo', 'estado', 'mantenimiento'] },
          { name: 'Documentos', fields: ['nombre', 'version', 'ubicacion', 'responsable'] }
        ],
        extraFields: [
          { key: 'codigo', label: 'Código', type: 'text' },
          { key: 'observaciones', label: 'Observaciones', type: 'textarea' },
          { key: 'ultima_revision', label: 'Última Revisión', type: 'date' }
        ]
      }
      
    case 'estandar':
      return {
        sections: [
          {
            title: `Estándar para ${jName}`,
            content: `Formato estándar de trabajo para ${sName}`,
            items: [
              { criterion: 'Condición actual', standard: 'Estado deseado', method: 'Cómo lograrlo', frequency: 'Frecuencia' },
              { criterion: 'Limpieza visual', standard: 'Sin polvo ni manchas', method: 'Paño y limpiador', frequency: 'Diario' },
              { criterion: 'Organización', standard: 'Todo en su lugar', method: 'Etiquetado', frequency: 'Continuo' }
            ]
          }
        ],
        version: '1.0',
        lastUpdated: new Date().toISOString()
      }
      
    case 'layout':
      return {
        zones: [],
        description: `Layout de zona optimizado para ${jName}`,
        dimensions: { width: 10, height: 8, unit: 'metros' },
        elements: [
          { type: 'workstation', label: 'Puesto de trabajo', color: '#3B82F6' },
          { type: 'storage', label: 'Almacenamiento', color: '#10B981' },
          { type: 'tools', label: 'Herramientas', color: '#F59E0B' },
          { type: 'walkway', label: 'Pasillo', color: '#6B7280' },
          { type: 'safety', label: 'Zona seguridad', color: '#EF4444' }
        ]
      }
      
    case 'plan_limpieza':
      return {
        tasks: [
          { task: 'Barrer suelo', area: 'General', frequency: 'Diario', time: '5 min', responsible: '' },
          { task: 'Limpiar superficies', area: 'Mesas', frequency: 'Diario', time: '3 min', responsible: '' },
          { task: 'Limpiar equipos', area: 'Maquinaria', frequency: 'Semanal', time: '15 min', responsible: '' },
          { task: 'Ventilación', area: 'General', frequency: 'Semanal', time: '10 min', responsible: '' },
          { task: 'Limpieza profunda', area: 'Todo', frequency: 'Mensual', time: '1 hora', responsible: '' }
        ],
        frequency: 'diario',
        title: `Plan de Inspección y Limpieza - ${jName}`,
        checklist: [
          'Suelo limio y seco',
          'Superficies sin polvo',
          'Equipos operativos',
          'Herramientas en su lugar',
          'Señalización visible',
          'Pasillos despejados'
        ]
      }
      
    case 'autoevaluacion':
      return {
        sections: [
          {
            title: `Autoevaluación ${jName}`,
            items: [
              { id: 'a1', text: `Se aplica correctamente ${sName} en el área`, weight: 3, score: 0 },
              { id: 'a2', text: 'Todo el personal conoce los estándares', weight: 2, score: 0 },
              { id: 'a3', text: 'Las herramientas están organizadas', weight: 2, score: 0 },
              { id: 'a4', text: 'La limpieza es evidente', weight: 2, score: 0 },
              { id: 'a5', text: 'Hay evidencia de mejora continua', weight: 1, score: 0 }
            ]
          }
        ],
        evaluator: '',
        date: '',
        totalScore: 0,
        maxScore: 10,
        observations: ''
      }
      
    case 'plan_accion':
      return {
        actions: [
          { action: '', responsible: '', deadline: '', status: 'pendiente', priority: 'media' }
        ],
        generatedFrom: `autoevaluacion_${jName}`,
        createdAt: new Date().toISOString(),
        status: 'activo'
      }
      
    case 'auditoria':
      return {
        sections: [
          {
            title: `Auditoría ${jName}`,
            items: [
              { id: 'aud_1', text: `Cumplimiento de ${sName}`, criteria: 'Estándar documentado', score: 0, maxScore: 5, evidence: '' },
              { id: 'aud_2', text: 'Organización del área', criteria: 'Todo etiquetado y en lugar', score: 0, maxScore: 5, evidence: '' },
              { id: 'aud_3', text: 'Limpieza general', criteria: 'Sin suciedad visible', score: 0, maxScore: 5, evidence: '' },
              { id: 'aud_4', text: 'Conocimiento del personal', criteria: 'Saben explicar el 5S', score: 0, maxScore: 5, evidence: '' },
              { id: 'aud_5', text: 'Mejoras implementadas', criteria: 'Acciones de mejora visibles', score: 0, maxScore: 5, evidence: '' }
            ]
          }
        ],
        auditor: '',
        auditDate: '',
        overallScore: 0,
        maxTotalScore: 25,
        findings: [],
        recommendations: []
      }
      
    case 'pdca':
      return {
        plan: {
          objective: `Mejorar ${sName} (${jName})`,
          actions: [],
          resources: '',
          timeline: ''
        },
        do: {
          implementationDate: '',
          activities: [],
          results: []
        },
        check: {
          measurements: [],
          comparison: '',
          conclusions: ''
        },
        act: {
          standardize: false,
          improvements: [],
          nextCycle: ''
        },
        cycleStart: '',
        cycleEnd: '',
        status: 'plan'
      }
      
    // 5S Básicas
    case 'clasificar':
      return {
        instructions: `Revise la zona de trabajo y clasifique cada elemento:`,
        criteria: [
          { id: 'necesario', label: 'Necesario', description: 'Elementos usados frecuentemente (diariamente)' },
          { id: 'ocasional', label: 'Ocasional', description: 'Elementos usados semanalmente' },
          { id: 'innecesario', label: 'Innecesario', description: 'Elementos no usados o que no pertenecen aquí' }
        ],
        scoring: { necesario: 3, ocasional: 2, innecesario: 0 },
        maxScore: 3
      }
      
    case 'ordenar':
      return {
        instructions: `Asigne una ubicación específica a cada elemento necesario:`,
        criteria: [
          { id: 'etiquetado', label: 'Etiquetado', description: 'Cada ubicación está claramente identificada' },
          { id: 'accesible', label: 'Accesible', description: 'Fácil acceso según frecuencia de uso' },
          { id: 'visual', label: 'Visual', description: 'Sistema visual de localización implementado' }
        ],
        scoring: { etiquetado: 3, accesible: 2, visual: 2 },
        maxScore: 7
      }
      
    case 'limpiar':
      return {
        instructions: `Verifique el estado de limpieza de la zona:`,
        criteria: [
          { id: 'suelo', label: 'Suelo', description: 'Limpio, sin manchas ni residuos' },
          { id: 'superficies', label: 'Superficies', description: 'Mesas, estanterías y equipos limpios' },
          { id: 'equipos', label: 'Equipos', description: 'Equipos de trabajo limpios y mantenidos' }
        ],
        scoring: { suelo: 3, superficies: 3, equipos: 2 },
        maxScore: 8
      }
      
    case 'estandarizar':
      return {
        instructions: `Evalúe la documentación de procedimientos:`,
        criteria: [
          { id: 'procedimientos', label: 'Procedimientos', description: 'Procedimientos escritos y disponibles' },
          { id: 'checklists', label: 'Checklists', description: 'Listas de verificación implementadas' },
          { id: 'formacion', label: 'Formación', description: 'Personal formado en los procedimientos' }
        ],
        scoring: { procedimientos: 3, checklists: 3, formacion: 2 },
        maxScore: 8
      }
      
    case 'mantener':
      return {
        instructions: `Evalúe la disciplina de mantenimiento:`,
        criteria: [
          { id: 'auditorias', label: 'Auditorías', description: 'Auditorías regulares realizadas' },
          { id: 'mejoras', label: 'Mejoras', description: 'Acciones de mejora implementadas' },
          { id: 'compromiso', label: 'Compromiso', description: 'Compromiso del equipo visible' }
        ],
        scoring: { auditorias: 3, mejoras: 3, compromiso: 2 },
        maxScore: 8
      }
      
    default:
      return { type, sStep, content: `Plantilla base para ${type} S${sStep}` }
  }
}

// Generador de título según tipo
function generateTitle(type: string, sStep: number): string {
  const jName = S_JAPANESE[sStep - 1]
  
  const titles: Record<string, string> = {
    formacion: `Formación S${sStep} - ${jName}`,
    examen: `Examen S${sStep} - ${jName}`,
    autoevaluacion: `Autoevaluación S${sStep} - ${jName}`,
    auditoria: `Auditoría S${sStep} - ${jName}`,
    inventario: `Inventario S${sStep} - ${jName}`,
    estandar: `Formato Estándar de Mejora - ${jName}`,
    plan_accion: `Plan de Acción S${sStep} - ${jName}`,
    layout: `Layout de Zona - ${jName}`,
    plan_limpieza: `Plan de Inspección y Limpieza - ${jName}`,
    pdca: `Tablero PDCA - ${jName}`,
    fotos: `Fotos S${sStep} - ${jName}`,
    clasificar: `Clasificar - Separar lo necesario de lo innecesario (S${sStep})`,
    ordenar: `Ordenar - Un lugar para cada cosa (S${sStep})`,
    limpiar: `Limpiar - Mantener el área impecable (S${sStep})`,
    estandarizar: `Estandarizar - Crear procedimientos documentados (S${sStep})`,
    mantener: `Mantener - Disciplina y mejora continua (S${sStep})`,
  }
  
  return titles[type] || `Plantilla ${type} S${sStep}`
}

async function main() {
  console.log('========================================')
  console.log('  RESTAURANDO 80 PLANTILLAS DEL SISTEMA')
  console.log('  v3.0.7 - 16 tipos × 5 pasos S')
  console.log('========================================\n')
  
  let created = 0
  let updated = 0
  
  // Obtener plantillas existentes
  const existing = await db.template.findMany({ where: { companyId: null } })
  console.log(`Plantillas existentes en BD: ${existing.length}\n`)
  
  // Crear/actualizar cada plantilla
  for (let s = 1; s <= 5; s++) {
    for (const type of ALL_TYPES) {
      try {
        const miniStep = CORRECT_MINI_STEP[type] || 0
        const notaMinima = CORRECT_NOTA_MINIMA[type] || null
        
        // Buscar si ya existe
        const existingTpl = existing.find(t => t.sStep === s && t.type === type)
        
        if (existingTpl) {
          // Actualizar existente con contenido mejorado
          await db.template.update({
            where: { id: existingTpl.id },
            data: {
              miniStep,
              notaMinima,
              active: true,
              updatedAt: new Date()
            }
          })
          console.log(`✓ Actualizada: ${type} S${s}`)
          updated++
        } else {
          // Crear nueva
          await db.template.create({
            data: {
              id: `tpl_${type}_s${s}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
              type,
              sStep: s,
              miniStep,
              title: generateTitle(type, s),
              description: `Plantilla del sistema: ${generateTitle(type, s)}`,
              content: JSON.stringify(generateContent(type, s)),
              notaMinima,
              active: true,
              companyId: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          })
          console.log(`✓ Creada: ${type} S${s}`)
          created++
        }
      } catch (err) {
        console.error(`✗ Error con ${type} S${s}:`, err instanceof Error ? err.message : err)
      }
    }
  }
  
  // Resumen final
  const totalNow = await db.template.count({ where: { companyId: null } })
  
  console.log('\n========================================')
  console.log('              RESUMEN')
  console.log('========================================')
  console.log(`Plantillas creadas:     ${created}`)
  console.log(`Plantillas actualizadas: ${updated}`)
  console.log(`TOTAL en BD:            ${totalNow}`)
  console.log('========================================\n')
  
  // Listado por tipo
  const finalTemplates = await db.template.findMany({
    where: { companyId: null },
    select: { type: true, sStep: true, active: true }
  })
  
  const byType: Record<string, number> = {}
  finalTemplates.forEach(t => {
    byType[t.type] = (byType[t.type] || 0) + 1
  })
  
  console.log('--- Por Tipo ---')
  Object.entries(byType)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([type, count]) => {
      const steps = finalTemplates
        .filter(t => t.type === type)
        .map(t => t.sStep)
        .sort((a, b) => a - b)
      console.log(`  ${type.padEnd(18)}: ${count} plantillas (S: [${steps.join(',')}])`)
    })
  
  // Verificación de completitud
  const expectedCount = ALL_TYPES.length * 5
  if (totalNow === expectedCount) {
    console.log(`\n✅ COMPLETO: ${expectedCount}/${expectedCount} plantillas del sistema`)
  } else {
    console.log(`\n⚠️  INCOMPLETO: ${totalNow}/${expectedCount} plantillas esperadas`)
  }
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
