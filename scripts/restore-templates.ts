/**
 * Script para restaurar las 30 plantillas del sistema (v3.0.7)
 * 6 tipos × 5 pasos S = 30 plantillas
 * 
 * Ejecutar: npx tsx scripts/restore-templates.ts
 */
const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

// Definición de las 30 plantillas del sistema
const TEMPLATES = [
  // === S1 - CLASIFICAR (5 tipos) ===
  {
    type: 'clasificar', sStep: 1, miniStep: 0,
    title: 'Clasificar - Separar lo necesario de lo innecesario',
    description: 'Identificar y clasificar elementos necesarios e innecesarios en la zona de trabajo',
    content: JSON.stringify({
      instructions: 'Revise la zona de trabajo y clasifique cada elemento:',
      criteria: [
        { id: 'necesario', label: 'Necesario', description: 'Elementos usados frecuentemente (diariamente)' },
        { id: 'ocasional', label: 'Ocasional', description: 'Elementos usados semanalmente' },
        { id: 'innecesario', label: 'Innecesario', description: 'Elementos no usados o que no pertenecen aquí' }
      ],
      scoring: { necesario: 3, ocasional: 2, innecesario: 0 },
      maxScore: 3
    }),
    notaMinima: 60, active: true
  },
  {
    type: 'ordenar', sStep: 1, miniStep: 0,
    title: 'Ordenar - Un lugar para cada cosa',
    description: 'Definir ubicaciones específicas para cada elemento necesario',
    content: JSON.stringify({
      instructions: 'Asigne una ubicación específica a cada elemento necesario:',
      criteria: [
        { id: 'etiquetado', label: 'Etiquetado', description: 'Cada ubicación está claramente identificada' },
        { id: 'accesible', label: 'Accesible', description: 'Fácil acceso según frecuencia de uso' },
        { id: 'visual', label: 'Visual', description: 'Sistema visual de localización implementado' }
      ],
      scoring: { etiquetado: 3, accesible: 2, visual: 2 },
      maxScore: 7
    }),
    notaMinima: 70, active: true
  },
  {
    type: 'limpiar', sStep: 1, miniStep: 0,
    title: 'Limpiar - Mantener el área impecable',
    description: 'Establecer rutinas de limpieza y mantenimiento',
    content: JSON.stringify({
      instructions: 'Verifique el estado de limpieza de la zona:',
      criteria: [
        { id: 'suelo', label: 'Suelo', description: 'Limpio, sin manchas ni residuos' },
        { id: 'superficies', label: 'Superficies', description: 'Mesas, estanterías y equipos limpios' },
        { id: 'equipos', label: 'Equipos', description: 'Equipos de trabajo limpios y mantenidos' }
      ],
      scoring: { suelo: 3, superficies: 3, equipos: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'estandarizar', sStep: 1, miniStep: 0,
    title: 'Estandarizar - Crear procedimientos documentados',
    description: 'Documentar las mejores prácticas y procedimientos',
    content: JSON.stringify({
      instructions: 'Evalúe la documentación de procedimientos:',
      criteria: [
        { id: 'procedimientos', label: 'Procedimientos', description: 'Procedimientos escritos y disponibles' },
        { id: 'checklists', label: 'Checklists', description: 'Listas de verificación implementadas' },
        { id: 'formacion', label: 'Formación', description: 'Personal formado en los procedimientos' }
      ],
      scoring: { procedimientos: 3, checklists: 3, formacion: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'mantener', sStep: 1, miniStep: 0,
    title: 'Mantener - Disciplina y mejora continua',
    description: 'Asegurar la sostenibilidad del sistema 5S',
    content: JSON.stringify({
      instructions: 'Evalúe la disciplina de mantenimiento:',
      criteria: [
        { id: 'auditorias', label: 'Auditorías', description: 'Auditorías regulares realizadas' },
        { id: 'mejoras', label: 'Mejoras', description: 'Acciones de mejora implementadas' },
        { id: 'compromiso', label: 'Compromiso', description: 'Compromiso del equipo visible' }
      ],
      scoring: { auditorias: 3, mejoras: 3, compromiso: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },

  // === S2 - ORDENAR (5 tipos) ===
  {
    type: 'clasificar', sStep: 2, miniStep: 0,
    title: 'Clasificar - Identificación de necesidades reales',
    description: 'Análisis profundo de qué es realmente necesario',
    content: JSON.stringify({
      instructions: 'Analice críticamente cada elemento de la zona:',
      criteria: [
        { id: 'frecuencia', label: 'Frecuencia de uso', description: '¿Cuándo se usó por última vez?' },
        { id: 'necesidad', label: 'Necesidad real', description: '¿Es imprescindible para el trabajo?' },
        { id: 'alternativas', label: 'Alternativas', description: '¿Se puede compartir o eliminar?' }
      ],
      scoring: { frecuencia: 3, necesidad: 3, alternativas: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'ordenar', sStep: 2, miniStep: 0,
    title: 'Ordenar - Optimización del espacio',
    description: 'Organización eficiente del espacio de trabajo',
    content: JSON.stringify({
      instructions: 'Optimice la disposición del espacio:',
      criteria: [
        { id: 'ergonomia', label: 'Ergonomía', description: 'Disposición ergonómica del espacio' },
        { id: 'flujo', label: 'Flujo de trabajo', description: 'Movimientos minimizados' },
        { id: 'densidad', label: 'Densidad', description: 'Uso eficiente del espacio disponible' }
      ],
      scoring: { ergonomia: 3, flujo: 3, densidad: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'limpiar', sStep: 2, miniStep: 0,
    title: 'Limpiar - Plan de limpieza estructurado',
    description: 'Implementar plan de limpieza sistemático',
    content: JSON.stringify({
      instructions: 'Verifique el plan de limpieza:',
      criteria: [
        { id: 'planificacion', label: 'Planificación', description: 'Tareas y frecuencias definidas' },
        { id: 'responsables', label: 'Responsables', description: 'Cada tarea tiene responsable asignado' },
        { id: 'registros', label: 'Registros', description: 'Registro de limpieza actualizado' }
      ],
      scoring: { planificacion: 3, responsables: 3, registros: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'estandarizar', sStep: 2, miniStep: 0,
    title: 'Estandarizar - Protocolos visuales',
    description: 'Implementar señalización y protocolos estandarizados',
    content: JSON.stringify({
      instructions: 'Evalúe los protocolos visuales:',
      criteria: [
        { id: 'senalizacion', label: 'Señalización', description: 'Carteles y señales claras' },
        { id: 'codificacion', label: 'Codificación', description: 'Código de colores implementado' },
        { id: 'protocolos', label: 'Protocolos', description: 'Protocolos de actuación definidos' }
      ],
      scoring: { senalizacion: 3, codificacion: 3, protocolos: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'mantener', sStep: 2, miniStep: 0,
    title: 'Mantener - Sistema de auditoría',
    description: 'Establecer sistema de auditorías periódicas',
    content: JSON.stringify({
      instructions: 'Evalúe el sistema de auditorías:',
      criteria: [
        { id: 'calendario', label: 'Calendario', description: 'Fechas de auditoría programadas' },
        { id: 'evaluacion', label: 'Evaluación', description: 'Criterios de evaluación claros' },
        { id: 'seguimiento', label: 'Seguimiento', description: 'Seguimiento de acciones correctivas' }
      ],
      scoring: { calendario: 3, evaluacion: 3, seguimiento: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },

  // === S3 - LIMPIAR (5 tipos) ===
  {
    type: 'clasificar', sStep: 3, miniStep: 0,
    title: 'Clasificar - Eliminación de residuos',
    description: 'Gestión adecuada de residuos y materiales desechables',
    content: JSON.stringify({
      instructions: 'Gestione los residuos correctamente:',
      criteria: [
        { id: 'separacion', label: 'Separación', description: 'Residuos separados por tipo' },
        { id: 'reciclaje', label: 'Reciclaje', description: 'Materiales reciclables identificados' },
        { id: 'peligrosos', label: 'Peligrosos', description: 'Residuos peligrosos gestionados adecuadamente' }
      ],
      scoring: { separacion: 3, reciclaje: 2, peligrosos: 3 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'ordenar', sStep: 3, miniStep: 0,
    title: 'Ordenar - Organización de herramientas',
    description: 'Sistema de organización de herramientas y utensilios',
    content: JSON.stringify({
      instructions: 'Organice las herramientas:',
      criteria: [
        { id: 'panel', label: 'Panel herramientas', description: 'Panel o shadow board implementado' },
        { id: 'inventario', label: 'Inventario', description: 'Inventario de herramientas actualizado' },
        { id: 'estado', label: 'Estado', description: 'Herramientas en buen estado' }
      ],
      scoring: { panel: 3, inventario: 2, estado: 3 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'limpiar', sStep: 3, miniStep: 0,
    title: 'Limpiar - Limpieza profunda',
    description: 'Limpieza detallada de todos los elementos',
    content: JSON.stringify({
      instructions: 'Realice limpieza profunda:',
      criteria: [
        { id: 'detalles', label: 'Detalles', description: 'Limpieza de rincones y zonas difíciles' },
        { id: 'equipos', label: 'Equipos', description: 'Limpieza interna y externa de equipos' },
        { id: 'suelos', label: 'Suelos', description: 'Suelos sin marcas ni manchas' }
      ],
      scoring: { detalles: 3, equipos: 3, suelos: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'estandarizar', sStep: 3, miniStep: 0,
    title: 'Estandarizar - Procedimientos de limpieza',
    description: 'Documentar procedimientos de limpieza específicos',
    content: JSON.stringify({
      instructions: 'Documente los procedimientos:',
      criteria: [
        { id: 'instrucciones', label: 'Instrucciones', description: 'Instrucciones paso a paso' },
        { id: 'productos', label: 'Productos', description: 'Productos y cantidades especificadas' },
        { id: 'frecuencia', label: 'Frecuencia', description: 'Frecuencias de cada tarea definidas' }
      ],
      scoring: { instrucciones: 3, productos: 3, frecuencia: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'mantener', sStep: 3, miniStep: 0,
    title: 'Mantener - Control de calidad de limpieza',
    description: 'Sistema de verificación de calidad de limpieza',
    content: JSON.stringify({
      instructions: 'Controle la calidad de limpieza:',
      criteria: [
        { id: 'checklist', label: 'Checklist', description: 'Lista de verificación completa' },
        { id: 'fotos', label: 'Fotos', description: 'Registro fotográfico antes/después' },
        { id: 'correcciones', label: 'Correcciones', description: 'Acciones correctivas inmediatas' }
      ],
      scoring: { checklist: 3, fotos: 2, correcciones: 3 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },

  // === S4 - ESTANDARIZAR (5 tipos) ===
  {
    type: 'clasificar', sStep: 4, miniStep: 0,
    title: 'Clasificar - Criterios estandarizados',
    description: 'Definir criterios uniformes de clasificación',
    content: JSON.stringify({
      instructions: 'Aplique criterios estandarizados:',
      criteria: [
        { id: 'uniformidad', label: 'Uniformidad', description: 'Criterios iguales en todas las zonas' },
        { id: 'formacion', label: 'Formación', description: 'Todo el personal conoce los criterios' },
        { id: 'actualizacion', label: 'Actualización', description: 'Criterios revisados y actualizados' }
      ],
      scoring: { uniformidad: 3, formacion: 3, actualizacion: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'ordenar', sStep: 4, miniStep: 0,
    title: 'Ordenar - Estándares de organización',
    description: 'Definir estándares de organización uniformes',
    content: JSON.stringify({
      instructions: 'Aplique los estándares de organización:',
      criteria: [
        { id: 'layout', label: 'Layout estándar', description: 'Disposición tipo definida' },
        { id: 'almacenaje', label: 'Almacenaje', description: 'Sistema de almacenaje estandarizado' },
        { id: 'identificacion', label: 'Identificación', description: 'Sistema de identificación único' }
      ],
      scoring: { layout: 3, almacenaje: 3, identificacion: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'limpiar', sStep: 4, miniStep: 0,
    title: 'Limpiar - Estándares de limpieza',
    description: 'Definir niveles de limpieza aceptables',
    content: JSON.stringify({
      instructions: 'Verifique los estándares de limpieza:',
      criteria: [
        { id: 'niveles', label: 'Niveles', description: 'Niveles de limpieza definidos' },
        { id: 'metodos', label: 'Métodos', description: 'Métodos estandarizados aplicados' },
        { id: 'verificacion', label: 'Verificación', description: 'Método de verificación establecido' }
      ],
      scoring: { niveles: 3, metodos: 3, verificacion: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'estandarizar', sStep: 4, miniStep: 0,
    title: 'Estandarizar - Manual de procedimientos',
    description: 'Crear manual completo de procedimientos 5S',
    content: JSON.stringify({
      instructions: 'Evalúe el manual de procedimientos:',
      criteria: [
        { id: 'completo', label: 'Completo', description: 'Todos los procedimientos documentados' },
        { id: 'accesible', label: 'Accesible', description: 'Disponible para todo el personal' },
        { id: 'versionado', label: 'Versionado', description: 'Control de versiones implementado' }
      ],
      scoring: { completo: 3, accesible: 3, versionado: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'mantener', sStep: 4, miniStep: 0,
    title: 'Mantener - Indicadores y KPIs',
    description: 'Establecer indicadores de seguimiento del sistema 5S',
    content: JSON.stringify({
      instructions: 'Evalúe los indicadores del sistema:',
      criteria: [
        { id: 'kpis', label: 'KPIs definidos', description: 'Indicadores clave establecidos' },
        { id: 'medicion', label: 'Medición', description: 'Sistema de medición implementado' },
        { id: 'dashboard', label: 'Dashboard', description: 'Panel de control visible' }
      ],
      scoring: { kpis: 3, medicion: 3, dashboard: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },

  // === S5 - MANTENER (5 tipos) ===
  {
    type: 'clasificar', sStep: 5, miniStep: 0,
    title: 'Clasificar - Revisión periódica',
    description: 'Sistema de revisión continua de necesidades',
    content: JSON.stringify({
      instructions: 'Realice revisión periódica:',
      criteria: [
        { id: 'periodicidad', label: 'Periodicidad', description: 'Revisiones programadas regularmente' },
        { id: 'participacion', label: 'Participación', description: 'Todo el equipo participa' },
        { id: 'decisiones', label: 'Decisiones', description: 'Decisiones documentadas y ejecutadas' }
      ],
      scoring: { periodicidad: 3, participacion: 3, decisiones: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'ordenar', sStep: 5, miniStep: 0,
    title: 'Ordenar - Mejora continua de la organización',
    description: 'Sistema de mejora continua de la organización',
    content: JSON.stringify({
      instructions: 'Implemente mejora continua:',
      criteria: [
        { id: 'sugerencias', label: 'Sugerencias', description: 'Sistema de sugerencias activo' },
        { id: 'implementacion', label: 'Implementación', description: 'Mejoras implementadas regularmente' },
        { id: 'resultados', label: 'Resultados', description: 'Resultados medidos y comunicados' }
      ],
      scoring: { sugerencias: 3, implementacion: 3, resultados: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'limpiar', sStep: 5, miniStep: 0,
    title: 'Limpiar - Cultura de limpieza',
    description: 'Fomentar cultura de limpieza en toda la organización',
    content: JSON.stringify({
      instructions: 'Fomente la cultura de limpieza:',
      criteria: [
        { id: 'conciencia', label: 'Conciencia', description: 'Consciencia de limpieza generalizada' },
        { id: 'autogestion', label: 'Autogestión', description: 'Cada uno limpia su área' },
        { id: 'orgullo', label: 'Orgullo', description: 'Orgullo por el lugar de trabajo' }
      ],
      scoring: { conciencia: 3, autogestion: 3, orgullo: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'estandarizar', sStep: 5, miniStep: 0,
    title: 'Estandarizar - Mejora de procedimientos',
    description: 'Sistema de mejora continua de procedimientos',
    content: JSON.stringify({
      instructions: 'Mejore los procedimientos continuamente:',
      criteria: [
        { id: 'revision', label: 'Revisión', description: 'Procedimientos revisados periódicamente' },
        { id: 'actualizacion', label: 'Actualización', description: 'Mejoras incorporadas al procedimiento' },
        { id: 'comunicacion', label: 'Comunicación', description: 'Cambios comunicados a todo el equipo' }
      ],
      scoring: { revision: 3, actualizacion: 3, comunicacion: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  },
  {
    type: 'mantener', sStep: 5, miniStep: 0,
    title: 'Mantener - Sostenibilidad del sistema 5S',
    description: 'Garantizar la sostenibilidad a largo plazo del sistema 5S',
    content: JSON.stringify({
      instructions: 'Evalúe la sostenibilidad del sistema:',
      criteria: [
        { id: 'liderazgo', label: 'Liderazgo', description: 'Compromiso visible de la dirección' },
        { id: 'recursos', label: 'Recursos', description: 'Recursos asignados al sistema 5S' },
        { id: 'visibilidad', label: 'Visibilidad', description: 'Resultados visibles y compartidos' }
      ],
      scoring: { liderazgo: 3, recursos: 3, visibilidad: 2 },
      maxScore: 8
    }),
    notaMinima: 65, active: true
  }
]

async function main() {
  console.log('=== RESTAURANDO 30 PLANTILLAS DEL SISTEMA ===\n')
  
  let created = 0
  let updated = 0
  
  for (const tpl of TEMPLATES) {
    try {
      // Buscar si ya existe una plantilla igual
      const existing = await db.template.findFirst({
        where: {
          type: tpl.type,
          sStep: tpl.sStep,
          companyId: null  // Solo plantillas del sistema
        }
      })
      
      if (existing) {
        // Actualizar existente
        await db.template.update({
          where: { id: existing.id },
          data: {
            ...tpl,
            updatedAt: new Date()
          }
        })
        console.log(`✓ Actualizada: ${tpl.type} S${tpl.sStep} - ${tpl.title.substring(0, 40)}...`)
        updated++
      } else {
        // Crear nueva
        await db.template.create({
          data: {
            id: `tpl_${tpl.type}_s${tpl.sStep}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            ...tpl,
            companyId: null,  // Plantilla del sistema
            createdAt: new Date(),
            updatedAt: new Date()
          }
        })
        console.log(`✓ Creada: ${tpl.type} S${tpl.sStep} - ${tpl.title.substring(0, 40)}...`)
        created++
      }
    } catch (err) {
      console.error(`✗ Error con ${tpl.type} S${tpl.sStep}:`, err.message)
    }
  }
  
  console.log('\n=== RESUMEN ===')
  console.log(`Plantillas creadas: ${created}`)
  console.log(`Plantillas actualizadas: ${updated}`)
  
  // Verificación final
  const total = await db.template.count({ where: { companyId: null } })
  console.log(`Total plantillas del sistema en BD: ${total}`)
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
