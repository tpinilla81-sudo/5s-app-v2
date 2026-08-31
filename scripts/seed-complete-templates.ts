/**
 * v3.0.3: Complete template seed script
 * 
 * This script creates PROPER templates with REAL content:
 * - formacion: Theoretical content about each S + exam questions
 * - examen: Multiple choice questions for each S
 * - autoevaluacion: Using AUDIT_CHECKLISTS from 5s-constants.ts
 * - auditoria: Using AUDIT_CHECKLISTS from 5s-constants.ts  
 * - inventario: Using INVENTORY_CONFIGS from 5s-constants.ts
 * - fotos: Photo requirements with minPhotos
 */

import { PrismaClient } from '@prisma/client'

// Set DATABASE_URL for local scripts
process.env.DATABASE_URL = 'postgresql://neondb_owner:npg_VeJs3ZAjUwp4@ep-round-glitter-as6ryhe3.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const db = new PrismaClient()

// ══════════════════════════════════════════════════════════════════════════════
// AUDIT CHECKLISTS (from src/lib/5s-constants.ts - original complete data)
// ══════════════════════════════════════════════════════════════════════════════

interface AuditItem { id: string; description: string; hasOther?: boolean }
interface AuditSection { id: string; title: string; items: AuditItem[] }

const AUDIT_CHECKLISTS: Record<number, AuditSection[]> = {
  1: [
    {
      id: '1.1', title: 'MATERIALES',
      items: [
        { id: '1.1.1', description: 'Consumibles' },
        { id: '1.1.2', description: 'Materia Prima' },
        { id: '1.1.3', description: 'Producto acabado o en proceso' },
        { id: '1.1.4', description: 'Otros (Indicar cuál)', hasOther: true },
      ],
    },
    {
      id: '1.2', title: 'MÁQUINAS Y EQUIPOS',
      items: [
        { id: '1.2.1', description: 'Máquinas (Inducción, bombeo, apriete, engrase…)' },
        { id: '1.2.2', description: 'Utillajes (volteo, apoyo, montaje…)' },
        { id: '1.2.3', description: 'Equipos y accesorios de Elevación (Grúas, eslingas, cáncamos, cables, grilletes…)' },
        { id: '1.2.4', description: 'Equipos de transporte (Carretillas, transpaletas, plataformas elevadoras, vehículos…)' },
        { id: '1.2.5', description: 'Equipos de ensayo (galgas, testers, banco de pruebas…)' },
        { id: '1.2.6', description: 'Herramientas de ensamblaje' },
        { id: '1.2.7', description: 'EQUIPOS INFORMÁTICOS' },
      ],
    },
    {
      id: '1.3', title: 'TRANSPORTE Y ALMACENAJE',
      items: [
        { id: '1.3.1', description: 'Contenedores vacíos, cajas, bidones, botes, cubos…' },
        { id: '1.3.2', description: 'Pallets u otros elementos de apoyo, tacos' },
        { id: '1.3.3', description: 'Bolsas, plásticos, protecciones, elementos de flejado' },
        { id: '1.3.4', description: 'Productos de limpieza, paños, escobas…' },
        { id: '1.3.5', description: 'Otros (Indicar cuál)', hasOther: true },
      ],
    },
    {
      id: '1.4', title: 'MOBILIARIO',
      items: [
        { id: '1.4.1', description: 'Bancos de trabajo' },
        { id: '1.4.2', description: 'Paneles herramienta' },
        { id: '1.4.3', description: 'Armarios o taquillas' },
        { id: '1.4.4', description: 'Sillas, mesas' },
        { id: '1.4.5', description: 'Paneles u otros soportes para información' },
        { id: '1.4.6', description: 'Otros (Indicar cuál)', hasOther: true },
      ],
    },
    {
      id: '1.5', title: 'INFORMACIÓN',
      items: [
        { id: '1.5.1', description: 'Planos o Instrucciones de trabajo' },
        { id: '1.5.2', description: 'Posters u otra información divulgativa' },
        { id: '1.5.3', description: 'Gráficos o indicadores' },
        { id: '1.5.4', description: 'Carpetas o bandejas con documentación innecesaria' },
        { id: '1.5.5', description: 'Otros (Indicar cuál)', hasOther: true },
      ],
    },
  ],
  2: [
    {
      id: '2.1', title: 'EQUIPOS Y MÁQUINAS',
      items: [
        { id: '2.1.1', description: 'Los equipos y máquinas están identificados con su número de equipo correspondiente' },
        { id: '2.1.2', description: 'La identificación anterior es visible (no es necesario manipular partes del equipo)' },
        { id: '2.1.3', description: 'Otros (Indicar cuál)', hasOther: true },
      ],
    },
    {
      id: '2.2', title: 'PASILLOS Y LUGARES DE UBICACIÓN',
      items: [
        { id: '2.2.1', description: 'Los pasillos y zonas de trabajo delimitados claramente' },
        { id: '2.2.2', description: 'Cuando algo falta, ¿todo el mundo sabe lo que falta? Todos pueden reconocer donde deben ubicarse.' },
        { id: '2.2.3', description: 'Los pallets de entrada y salida de material' },
        { id: '2.2.4', description: 'Los equipos móviles (escaleras, transpaletas, carros, utillajes sobre ruedas)' },
        { id: '2.2.5', description: 'Los medios de transporte (transpaletas, plataformas, carretillas, coches, camiones…)' },
        { id: '2.2.6', description: 'Las herramientas cuentan con ubicaciones señalizadas inequívocamente (sistemas poka-yoke, siluetas, etiquetas identificativas)' },
        { id: '2.2.7', description: 'Consumibles' },
      ],
    },
    {
      id: '2.3', title: 'SEÑALIZACIÓN',
      items: [
        { id: '2.3.1', description: 'Están señalizados de forma visible e inequívoca los mandos de maniobra de los equipos y máquinas (sentido de movimiento, on/off, stop, parada de emergencia…)' },
        { id: '2.3.2', description: 'Se puede reconocer cuando las máquinas están en tensión (con señal luminosa tipo led o similar)' },
        { id: '2.3.3', description: 'Existe señalización de peligro cuando las máquinas están en funcionamiento (luz rotatoria luminosa, señal destellante, aviso sonoro, balizamiento o cartel advertencia)' },
        { id: '2.3.4', description: 'La señalización del lugar es adecuada y visible desde todos los puntos (en especial la relativa a medios de extinción y vías de evacuación)' },
        { id: '2.3.5', description: 'Otros (Indicar cuál)', hasOther: true },
      ],
    },
    {
      id: '2.4', title: 'STOCKS DE MATERIAL',
      items: [
        { id: '2.4.1', description: 'Están identificados los materiales en el área de trabajo?' },
        { id: '2.4.2', description: 'Las etiquetas identificativas están en buenas condiciones, son claras y visibles' },
        { id: '2.4.3', description: 'La identificación informa acerca del cliente y proveedor' },
        { id: '2.4.4', description: 'La identificación contiene la denominación del material, referencia o artículo' },
        { id: '2.4.5', description: 'Es correcta la información, coincide esta con el material al que identifican y su ubicación' },
        { id: '2.4.6', description: 'Otros (Indicar cuál)', hasOther: true },
      ],
    },
    {
      id: '2.5', title: 'LAYOUT / DISTRIBUCIÓN',
      items: [
        { id: '2.5.1', description: 'El layout (distribución) del área es lógico y funcional' },
        { id: '2.5.2', description: 'Los flujos de trabajo están optimizados' },
        { id: '2.5.3', description: 'Las distancias entre puestos de trabajo son adecuadas' },
        { id: '2.5.4', description: 'Existe espacio suficiente para circulación segura' },
      ],
    },
  ],
  3: [
    {
      id: '3.1', title: 'FUENTES DE SUCIEDAD',
      items: [
        { id: '3.1.1', description: 'Polvo ambiental' },
        { id: '3.1.2', description: 'Residuos de producción (virutas, recortes, etc.)' },
        { id: '3.1.3', description: 'Fugas de aceite, grasa u otros fluidos' },
        { id: '3.1.4', description: 'Derrames de productos químicos' },
        { id: '3.1.5', description: 'Restos de embalaje y packaging' },
        { id: '3.1.6', description: 'Basura acumulada' },
        { id: '3.1.7', description: 'Otros (Indicar cuál)', hasOther: true },
      ],
    },
    {
      id: '3.2', title: 'EQUIPOS DE LIMPIEZA',
      items: [
        { id: '3.2.1', description: 'Escobas y recogedores disponibles y en buen estado' },
        { id: '3.2.2', description: 'Fregonas y cubos identificados y accesibles' },
        { id: '3.2.3', description: 'Aspiradoras industriales funcionando' },
        { id: '3.2.4', description: 'Productos de limpieza apropiados para cada superficie' },
        { id: '3.2.5', description: 'Equipos de protección personal para limpieza (guantes, gafas)' },
        { id: '3.2.6', description: 'Otros (Indicar cuál)', hasOther: true },
      ],
    },
    {
      id: '3.3', title: 'RUTINAS DE LIMPIEZA',
      items: [
        { id: '3.3.1', description: 'Existe programa de limpieza diario establecido' },
        { id: '3.3.2', description: 'Las responsabilidades de limpieza están asignadas' },
        { id: '3.3.3', description: 'Se realizan limpiezas semanales profundas' },
        { id: '3.3.4', description: 'Hay checklists de limpieza visibles' },
        { id: '3.3.5', description: 'Se registra la actividad de limpieza realizada' },
      ],
    },
    {
      id: '3.4', title: 'CONDICIÓN GENERAL',
      items: [
        { id: '3.4.1', description: 'Suelos limpios y sin obstáculos' },
        { id: '3.4.2', description: 'Paredes y superficies verticales limpias' },
        { id: '3.4.3', description: 'Ventanas y cristales transparentes' },
        { id: '3.4.4', description: 'Máquinas y equipos sin acumulación de suciedad' },
        { id: '3.4.5', description: 'El ambiente general transmite orden y limpieza' },
      ],
    },
  ],
  4: [
    {
      id: '4.1', title: 'ESTÁNDARES VISUALES',
      items: [
        { id: '4.1.1', description: 'Existen estándares fotográficos de referencia ("cómo debe quedar")' },
        { id: '4.1.2', description: 'Los estándares visibles muestran el estado ideal' },
        { id: '4.1.3', description: 'Hay ejemplos de "antes/después"' },
        { id: '4.1.4', description: 'Los estándares están actualizados' },
        { id: '4.1.5', description: 'Todo el personal conoce los estándares' },
      ],
    },
    {
      id: '4.2', title: 'PROCEDIMIENTOS DOCUMENTADOS',
      items: [
        { id: '4.2.1', description: 'Existen procedimientos escritos de trabajo (SOPs)' },
        { id: '4.2.2', description: 'Los procedimientos están accesibles en el punto de uso' },
        { id: '4.2.3', description: 'Los procedimientos son claros y fáciles de entender' },
        { id: '4.2.4', description: 'Se actualizan cuando cambian los procesos' },
        { id: '4.2.5', description: 'Hay registro de formación en los procedimientos' },
      ],
    },
    {
      id: '4.3', title: 'CHECKLISTS Y VERIFICACIONES',
      items: [
        { id: '4.3.1', description: 'Existen checklists diarios de mantenimiento del orden' },
        { id: '4.3.2', description: 'Se realizan auditorías internas periódicas' },
        { id: '4.3.3', description: 'Hay indicadores visuales de cumplimiento (tableros)' },
        { id: '4.3.4', description: 'Las desviaciones se registran y corrigen' },
        { id: '4.3.5', description: 'Se revisan y actualizan los estándares regularmente' },
      ],
    },
    {
      id: '4.4', title: 'SEÑALIZACIÓN ESTANDARIZADA',
      items: [
        { id: '4.4.1', description: 'Código de colores uniforme en toda la planta' },
        { id: '4.4.2', description: 'Formato de etiquetas estandarizado' },
        { id: '4.4.3', description: 'Señales de seguridad normalizadas (ISO/OSHA)' },
        { id: '4.4.4', description: 'Identificación de áreas y zonas consistente' },
        { id: '4.4.5', description: 'La señalización es comprensible para todos' },
      ],
    },
  ],
  5: [
    {
      id: '5.1', title: 'DISCIPLINA Y HÁBITOS',
      items: [
        { id: '5.1.1', description: 'Los trabajadores siguen los procedimientos establecidos' },
        { id: '5.1.2', description: 'Se devuelve todo a su lugar después de usarlo' },
        { id: '5.1.3', description: 'La limpieza se realiza de forma sistemática' },
        { id: '5.1.4', description: 'Se reportan inmediatamente anomalías' },
        { id: '5.1.5', description: 'Hay respeto por los estándares establecidos' },
      ],
    },
    {
      id: '5.2', title: 'AUDITORÍAS Y SEGUIMIENTO',
      items: [
        { id: '5.2.1', description: 'Se realizan auditorías 5S regulares (semanales/mensuales)' },
        { id: '5.2.2', description: 'Los resultados se comunican al equipo' },
        { id: '5.2.3', description: 'Hay plan de acción para mejoras detectadas' },
        { id: '5.2.4', description: 'Se reconoce y premia el buen desempeño' },
        { id: '5.2.5', description: 'La dirección participa activamente en el seguimiento' },
      ],
    },
    {
      id: '5.3', title: 'MEJORA CONTINUA',
      items: [
        { id: '5.3.1', description: 'Se suguyen ideas de mejora del personal' },
        { id: '5.3.2', description: 'Se implementan mejoras propuestas' },
        { id: '5.3.3', description: 'Los indicadores de 5S mejoran con el tiempo' },
        { id: '5.3.4', description: 'Se comparten mejores prácticas entre turnos/áreas' },
        { id: '5.3.5', description: 'Hay satisfacción general con el entorno de trabajo' },
      ],
    },
    {
      id: '5.4', title: 'FORMACIÓN Y SENSIBILIZACIÓN',
      items: [
        { id: '5.4.1', description: 'Todo el personal ha recibido formación inicial en 5S' },
        { id: '5.4.2', description: 'Se realiza refresco periódico de conceptos 5S' },
        { id: '5.4.3', description: 'Nuevos incorporados reciben inducción 5S' },
        { id: '5.4.4', description: 'Existe material visual de apoyo (carteles, manuales)' },
        { id: '5.4.5', description: 'El liderazgo demuestra compromiso con 5S' },
      ],
    },
  ],
}

// ══════════════════════════════════════════════════════════════════════════════
// FORMACIÓN CONTENT - Real theoretical content for each S
// ══════════════════════════════════════════════════════════════════════════════

interface FormationContent {
  sections: Array<{
    title: string
    content: string
  }>
}

const FORMATION_CONTENT: Record<number, FormationContent> = {
  1: {
    sections: [
      {
        title: '¿Qué es SEIRI (Clasificar)?',
        content: `SEIRI es el primer paso de la metodología 5S y significa "CLASIFICAR" en japonés. Consiste en separar rigurosamente los elementos necesarios de los innecesarios en el lugar de trabajo.

OBJETIVO PRINCIPAL:
Eliminar del área de trabajo todo aquello que NO es necesario para las operaciones diarias. Esto incluye:
• Herramientas que no se usan
• Materiales obsoletos o defectuosos
• Documentación antigua
• Equipos rotos o en desuso
• Cualquier elemento que no tenga una función clara definida

LA REGLA DE ORO:
"Si no lo has usado en el último año, probablemente no lo necesitas"`

      },
      {
        title: 'Cómo aplicar SEIRI - Metodología paso a paso',
        content: `PASO 1: Etiquetado ROJO (Tagging)
Colocar etiquetas rojas a todos los elementos dudosos durante un período determinado (normalmente 1 semana a 1 mes). La etiqueta debe incluir:
- Nombre del elemento
- Razón de la clasificación como "dudoso"
- Fecha del etiquetado
- Quién lo etiquetó

PASO 2: Clasificación en 3 categorías
1. NECESARIOS: Uso diario o semanal → Mantener en el puesto
2. DUDOSOS: Uso mensual o desconocido → Área de cuarentena
3. INNECESARIOS: No se usa → Eliminar o disponer

PASO 3: Gestión del área de cuarentena
Establecer un lugar temporal para elementos dudosos. Si pasado el tiempo nadie los reclama, se descartan definitivamente.

BENEFICIOS ESPERADOS:
- Más espacio disponible
- Menor tiempo de búsqueda
- Ambiente más ordenado
- Reducción de accidentes`
      }
    ]
  },
  2: {
    sections: [
      {
        title: '¿Qué es SEITON (Ordenar)?',
        content: `SEITON es el segundo paso de 5S y significa "ORDENAR" u "ORGANIZAR". Una vez eliminado lo innecesario, debemos organizar lo necesario de manera que sea FÁCIL DE ENCONTRAR, USAR Y DEVOLVER.

PRINCIPIO CLAVE:
"Un lugar para cada cosa y cada cosa en su lugar"

OBJETIVOS:
• Minimizar el tiempo de búsqueda de herramientas y materiales
• Establecer un sistema lógico de organización
• Facilitar el retorno de objetos a su lugar
• Hacer visible cualquier anomalía (falta algo)

EL CONCEPTO POKA-YOKE:
Utilizar sistemas a prueba de errores que hacen imposible colocar un objeto en el lugar equivocado:
- Siluetas en paneles de herramientas
- Colores codificados por tipo
- Formas que solo permiten cierta orientación`
      },
      {
        title: 'Técnicas de implementación de SEITON',
        content: `TÉCNICA 1: Análisis de frecuencia de uso
• MUY FRECUENTE (diario): Al alcance de la mano, en el puesto
• FRECUENTE (semanal): Cerca del puesto, en armario o cajón
• OCASIONAL (mensual): En almacén cercano
• RARO (anual): En almacén central

TÉCNICA 2: Señalización visual
• Etiquetas con nombre y foto del objeto
• Código de colores por categoría
• Líneas de suelo delimitando ubicaciones
• Números/letras identificativos de posición

TÉCNICA 3: Organización ergonómica
• Objetos pesados: altura de la cintura para abajo
• Objetos ligeros y frecuentes: altura del pecho
• Objetos poco frecuentes: alto o bajo
• Objetos muy usados: mano derecha para diestros

REGLA DE LOS 30 SEGUNDOS:
Cualquier persona debe poder encontrar cualquier herramienta en menos de 30 segundos`
      }
    ]
  },
  3: {
    sections: [
      {
        title: '¿Qué es SEISO (Limpiar)?',
        content: `SEISO es el tercer paso y significa "LIMPIAR". No se trata solo de limpieza estética, sino de **limpiar para inspeccionar**.

CONCEPTO FUNDAMENTAL:
"La mejor forma de limpiar es no ensuciar, pero si ensucias, limpia inmediatamente"

LIMPIEZA INSPECCIÓN:
Al limpiar, estamos también:
• Detectando fugas y escapes
• Identificando partes sueltas o dañadas
• Encontrando anomalías en máquinas
• Percibiendo olores o ruidos extraños
• Viendo desgaste prematuro

TIPOS DE LIMPIEZA:
1. LIMPIEZA INICIAL (Shitsukoi): Limpieza profunda de arranque
2. LIMPIEZA DIARIA: Mantenimiento del nivel alcanzado
3. LIMPIEZA PROFUNDA: Periódica (semanal/mensual)

EL CICLO LIMPIEZAR-INSPECCIONAR-CORREGIR:
Limpiar → Encontrar problema → Analizar causa → Corregir → Estandarizar`
      },
      {
        title: 'Implementación de SEISO',
        content: `PASO 1: Identificar fuentes de suciedad
Mapear TODAS las fuentes de contaminación:
• Polvo ambiental
• Virutas y residuos de producción
• Fugas de aceite/grasa
• Derrames químicos
• Residuos de embalaje

PASO 2: Eliminar o reducir fuentes
• Instalar protectores y coberturas
• Reparar fugas inmediatamente
• Mejor procesos para generar menos residuos
• Cambiar a materiales menos contaminantes

PASO 3: Establecer rutinas
• Limpieza de inicio de turno (5 min)
• Limpieza durante turno (mantenimiento)
• Limpieza fin de turno (10 min)
• Limpieza semanal profunda (30-60 min)

PASO 4: Asignar responsables
Cada zona debe tener un responsable claro de limpieza. Rotar responsabilidades para compartir carga y conocimiento.

HERRAMIENTAS NECESARIAS:
- Escoba, fregona, aspiradora
- Paños, bayetas
- Productos de limpieza adecuados
- EPP (guantes, gafas, calzado)`
      }
    ]
  },
  4: {
    sections: [
      {
        title: '¿Qué es SEIKETSU (Estandarizar)?',
        content: `SEIKETSU significa "ESTANDARIZAR" y es el cuarto paso. Consiste en crear normas y estándares que permitan **MANTENER** los logros conseguidos en las 3S anteriores.

¿POR QUÉ ESTANDARIZAR?
Sin estándares, cada persona hace las cosas a su manera:
• Unos limpian bien, otros mal
• Unos ordenan, otros acumulan
• Los resultados son inconsistentes
• Es imposible mejorar lo que no se mide

COMPONENTES DE UN ESTÁNDAR:
1. Qué hay que hacer (procedimiento)
2. Cómo hay que hacerlo (método)
3. Cuándo hay que hacerlo (frecuencia)
4. Quién lo hace (responsable)
5. Cuánto tiempo toma (estándar)
6. Cómo verificar que está bien (checklist)

TIPOS DE ESTÁNDARES:
• Estándares visuales (fotos de referencia)
• Procedimientos operativos (SOPs)
• Checklists de verificación
• Indicadores y métricas`
      },
      {
        title: 'Creación y mantenimiento de estándares',
        content: `METODOLOGÍA PARA CREAR ESTÁNDARES:

PASO 1: Documentar el estado ideal
• Tomar fotos del área perfectamente organizada
• Crear diagramas y esquemas
• Definir condiciones específicas medibles

PASO 2: Escribir el procedimiento
Usar formato simple:
- Título claro
- Objetivo
- Alcance (dónde aplica)
- Responsable
- Paso a paso detallado
- Frecuencia
- Verificación

PASO 3: Comunicar y formar
• Explicar el POR QUÉ de cada estándar
• Entrenar a todo el personal
• Publicar en lugar visible
• Disponible en el punto de uso

PASO 4: Auditar y mejorar
• Revisar cumplimiento regularmente
• Actualizar cuando sea necesario
• Involucrar a los trabajadores en mejoras
• Celebrar los éxitos

HERRAMIENTAS DE SOPORTE:
- Tablero 5S visual
- Fotografías de referencia (antes/después)
- Checklists diarios/semanales
- Auditorías internas`
      }
    ]
  },
  5: {
    sections: [
      {
        title: '¿Qué es SHITSUKE (Disciplina/Mantener)?',
        content: `SHITSUKE es el quinto y último paso, significa "DISCIPLINA" o "AUTODISCIPLINA". Es la capacidad de **cumplir consistentemente** todo lo establecido en las 4S anteriores.

LA DISCIPLINA NO ES IMPONER, ES:
• Crear hábitos positivos
• Tener orgullo del trabajo bien hecho
• Comprensión del POR QUÉ
• Compromiso personal y colectivo
• Cultura de mejora continua

EL CICLO DE SHITSUKE:
Hacer → Revisar → Corregir → Mejorar → Volver a Hacer

FACTORES QUE FACILITAN LA DISCIPLINA:
1. Liderazgo comprometido (el jefe también cumple)
2. Formación continua
3. Reconocimiento y celebración
4. Visibilidad de resultados
5. Participación en decisiones
6. Tiempo dedicado (no es "tiempo perdido")

SEÑALES DE QUE SHITSUKE FUNCIONA:
- Los estándares se cumplen sin recordatorios
- Las personas corrigen espontáneamente
- Hay sugerencias de mejora
- Nuevos integrantes se adaptan rápido
- El ambiente se mantiene consistente`
      },
      {
        title: 'Sosteniendo SHITSUKE a largo plazo',
        content: `ESTRATEGIAS PARA MANTENER LA DISCIPLINA:

1. SISTEMA DE AUDITORÍAS
• Auditorías semanales rotativas
• Puntuación visible por área
• Premios al mejor equipo 5S del mes
• Planes de acción para áreas rezagadas

2. VISUAL MANAGEMENT
• Tablero 5S con puntuaciones
• Fotos del estado actual vs ideal
• Gráficos de evolución temporal
• Indicadores de cumplimiento (%)

3. PARTICIPACIÓN ACTIVA
• Reuniones breves diarias (5 min)
• Sugerencias de mejora premiadas
• Rotación de responsabilidades
• Celebración de logros

4. FORMACIÓN CONTINUA
• Inducción 5S para nuevos
• Refrescos trimestrales
• Intercambio de experiencias
• Visitas a otras áreas/empresas

5. LIDERAZGO EJEMPLAR
• Los mandos intermedios deben dar ejemplo
• Participar en auditorías
• Reconocer públicamente
• No tolerar incumplimientos

KPIs RECOMENDADOS:
- % de cumplimiento de checklists
- Número de sugerencias implementadas
- Tiempo medio de resolución de anomalías
- Puntuación en auditorías 5S
- Índice de satisfacción del ambiente`
      }
    ]
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// EXAM QUESTIONS - Real multiple choice questions for each S
// ══════════════════════════════════════════════════════════════════════════════

interface ExamQuestion {
  question: string
  options: string[]
  correctIndex: number
}

interface ExamContent {
  questions: ExamQuestion[]
}

const EXAM_QUESTIONS: Record<number, ExamContent> = {
  1: {
    questions: [
      {
        question: '¿Qué significa SEIRI en la metodología 5S?',
        options: ['Ordenar', 'Clasificar', 'Limpiar', 'Estandarizar'],
        correctIndex: 1
      },
      {
        question: '¿Cuál es el objetivo principal de SEIRI?',
        options: [
          'Limpiar todas las máquinas',
          'Crear procedimientos documentados',
          'Separar lo necesario de lo innecesario',
          'Asignar responsables por zona'
        ],
        correctIndex: 2
      },
      {
        question: '¿Qué color se usa normalmente para etiquetar elementos innecesarios en SEIRI?',
        options: ['Verde', 'Amarillo', 'Azul', 'Rojo'],
        correctIndex: 3
      },
      {
        question: 'Según la regla de SEIRI, ¿qué hacer con un objeto no usado en el último año?',
        options: [
          'Guardarlo en el almacén',
          'Considerarlo innecesario y clasificarlo',
          'Donarlo a otra área',
          'Preguntar al supervisor'
        ],
        correctIndex: 1
      },
      {
        question: '¿Qué es el "tagging" o etiquetado rojo en SEIRI?',
        options: [
          'Pintar de rojo los objetos peligrosos',
          'Etiquetar elementos dudosos para decidir después',
          'Marcar las salidas de emergencia',
          'Identificar herramientas de emergencia'
        ],
        correctIndex: 1
      },
      {
        question: '¿En cuántas categorías se clasifican los elementos en SEIRI?',
        options: ['2 categorías', '3 categorías', '4 categorías', '5 categorías'],
        correctIndex: 1
      },
      {
        question: '¿Dónde deben ir los elementos de uso DIARIO según SEIRI?',
        options: [
          'En el almacén central',
          'En el puesto de trabajo, al alcance',
          'En el archivo de documentación',
          'En el área de cuarentena'
        ],
        correctIndex: 1
      },
      {
        question: '¿Cuál es un BENEFICIO directo de aplicar SEIRI correctamente?',
        options: [
          'Mayor consumo de energía',
          'Más espacio disponible y menos tiempo de búsqueda',
          'Necesidad de más personal',
          'Aumento de inventario'
        ],
        correctIndex: 1
      }
    ]
  },
  2: {
    questions: [
      {
        question: '¿Qué significa SEITON en la metodología 5S?',
        options: ['Clasificar', 'Ordenar', 'Limpiar', 'Disciplina'],
        correctIndex: 1
      },
      {
        question: '¿Cuál es el principio clave de SEITON?',
        options: [
          'Limpiar todo daily',
          'Un lugar para cada cosa y cada cosa en su lugar',
          'Documentar todos los procedimientos',
          'Auditar semanalmente'
        ],
        correctIndex: 1
      },
      {
        question: '¿Qué es un sistema POKA-YOKE en SEITON?',
        options: [
          'Un software de gestión',
          'Un sistema a prueba de errores de colocación',
          'Un protocolo de seguridad',
          'Un formato de informe'
        ],
        correctIndex: 1
      },
      {
        question: '¿Dónde deben ubicarse los objetos de uso MUY FRECUENTE?',
        options: [
          'En el almacén lejano',
          'Al alcance de la mano en el puesto',
          'En archivadores altos',
          'Fuera del área de trabajo'
        ],
        correctIndex: 1
      },
      {
        question: '¿Cuál es la "Regla de los 30 segundos" en SEITON?',
        options: [
          'Tiempo máximo de limpieza',
          'Tiempo para encontrar cualquier herramienta',
          'Duración de la reunión diaria',
          'Tiempo de respuesta a emergencias'
        ],
        correctIndex: 1
      },
      {
        question: '¿Qué técnica de SEITON usa siluetas para identificar ubicaciones?',
        options: [
          'Codificación numérica',
          'Organización shadow board (panel silhouette)',
          'Etiquetado alfabético',
          'Señalización LED'
        ],
        correctIndex: 1
      },
      {
        question: '¿A qué altura deben ir los objetos PESADOS según ergonomía SEITON?',
        options: [
          'Por encima de la cabeza',
          'Altura del pecho o superior',
          'Altura de la cintura o inferior',
          'En el suelo'
        ],
        correctIndex: 2
      },
      {
        question: '¿Qué tipo de señal ayuda a identificar rápidamente ubicaciones en SEITON?',
        options: [
          'Señales auditivas',
          'Códigos de colores por categoría',
          'Olores característicos',
          'Texturas diferentes'
        ],
        correctIndex: 1
      }
    ]
  },
  3: {
    questions: [
      {
        question: '¿Qué significa SEISO en 5S?',
        options: ['Ordenar', 'Estandarizar', 'Limpiar', 'Disciplina'],
        correctIndex: 2
      },
      {
        question: '¿Cuál es el concepto fundamental de SEISO?',
        options: [
          'Limpiar cuando haya tiempo',
          'Limpiar para inspeccionar',
          'Contratar limpieza externa',
          'Limpiar solo al final del turno'
        ],
        correctIndex: 1
      },
      {
        question: 'Al limpiar en SEISO, ¿qué TAMBIÉN estamos haciendo?',
        options: [
          'Solo quitando polvo',
          'Inspeccionando y detectando anomalías',
          'Pintando las máquinas',
          'Reorganizando documentos'
        ],
        correctIndex: 1
      },
      {
        question: '¿Cuál NO es un tipo de limpieza en SEISO?',
        options: [
          'Limpieza inicial (Shitsukoi)',
          'Limpieza diaria',
          'Limpieza profunda periódica',
          'Limpieza anual obligatoria'
        ],
        correctIndex: 3
      },
      {
        question: '¿Qué es lo PRIMERO que debe hacerse en SEISO?',
        options: [
          'Comprar productos de limpieza',
          'Contratar personal de limpieza',
          'Identificar y eliminar fuentes de suciedad',
          'Crear checklists'
        ],
        correctIndex: 2
      },
      {
        question: '¿Qué hacer si detectamos una fuga de aceite al limpiar?',
        options: [
          'Solo limpiar el aceite',
          'Ignorar si es pequeña',
          'Reportar y reparar la fuente (limpieza-inspección)',
          'Tapar con un paño'
        ],
        correctIndex: 2
      },
      {
        question: '¿Cuánto tiempo se recomienda para limpieza de INICIO de turno?',
        options: [
          '0 minutos (no es necesario',
          'Aproximadamente 5 minutos',
          '30 minutos como mínimo',
          '1 hora completa'
        ],
        correctIndex: 1
      },
      {
        question: '¿Quién es responsable de la limpieza en SEISO?',
        options: [
          'Solo el personal de limpieza',
          'Solo el supervisor',
          'Cada trabajador de su área',
          'Solo mantenimiento'
        ],
        correctIndex: 2
      }
    ]
  },
  4: {
    questions: [
      {
        question: '¿Qué significa SEIKETSU?',
        options: ['Clasificar', 'Limpiar', 'Estandarizar', 'Mantener'],
        correctIndex: 2
      },
      {
        question: '¿Cuál es el propósito principal de SEIKETSU?',
        options: [
          'Limpiar más a fondo',
          'Crear normas para mantener las 3S anteriores',
          'Comprar más herramientas',
          'Contratar más personal'
        ],
        correctIndex: 1
      },
      {
        question: '¿Qué componente NO es parte de un estándar en SEIKETSU?',
        options: [
          'Qué hay que hacer',
          'Cómo hacerlo',
          'Cuándo y quién lo hace',
          'Cuánto cuesta el material'
        ],
        correctIndex: 3
      },
      {
        question: '¿Qué es un SOP en el contexto de SEIKETSU?',
        options: [
          'Standard Operating Procedure (Procedimiento Operativo Estándar)',
          'System Of Production',
          'Service Of Prevention',
          'Standard Order Processing'
        ],
        correctIndex: 0
      },
      {
        question: '¿Por qué los estándares deben estar en el PUNTO DE USO?',
        options: [
          'Para que se pierdan',
          'Para que sean accesibles cuando se necesiten',
          'Por requisitos legales',
          'Para decorar la pared'
        ],
        correctIndex: 1
      },
      {
        question: '¿Con qué frecuencia deben revisarse los estándares de SEIKETSU?',
        options: [
          'Nunca (una vez creados)',
          'Solo cuando falla algo',
          'Regularmente y cuando cambien los procesos',
          'Anualmente sin importar nada'
        ],
        correctIndex: 2
      },
      {
        question: '¿Qué herramienta visual ayuda mucho en SEIKETSU?',
        options: [
          'Fotos del estado ideal (referencia)',
          'Calculadoras complejas',
          'Relojes de pared',
          'Mapas de carreteras'
        ],
        correctIndex: 0
      },
      {
        question: '¿Quién debe participar en la creación de estándares?',
        options: [
          'Solo ingenieros',
          'Solo la dirección',
          'Los trabajadores que realizan la tarea',
          'Solo consultores externos'
        ],
        correctIndex: 2
      }
    ]
  },
  5: {
    questions: [
      {
        question: '¿Qué significa SHITSUKE?',
        options: ['Clasificar', 'Estandarizar', 'Disciplina/Autodisciplina', 'Ordenar'],
        correctIndex: 2
      },
      {
        question: '¿Cuál es la clave de SHITSUKE?',
        options: [
          'Imponer reglas estrictas',
          'Crear hábitos y autodisciplina',
          'Multar incumplimientos',
          'Contratar supervisores'
        ],
        correctIndex: 1
      },
      {
        question: '¿Qué indica que SHITSUKE está funcionando bien?',
        options: [
          'Los estándares se cumplen sin recordatorios constantes',
          'Hay muchos carteles en las paredes',
          'Se hacen reuniones largas',
          'El jefe siempre está presente'
        ],
        correctIndex: 0
      },
      {
        question: '¿Cuál es la mejor forma de mantener SHITSUKE?',
        options: [
          'Castigar errores',
          'Auditar, reconocer, involucrar y formar',
          'Ignorar pequeños desvíos',
          'Solo revisar una vez al año'
        ],
        correctIndex: 1
      },
      {
        question: '¿Qué rol tiene el LIDERAZGO en SHITSUKE?',
        options: [
          'Solo exigir a los demás',
          'Dar ejemplo cumpliendo también los estándares',
          'Delegar totalmente en supervisores',
          'No intervenir para no molestar'
        ],
        correctIndex: 1
      },
      {
        question: '¿Con qué frecuencia se recomiendan auditorías 5S para SHITSUKE?',
        options: [
          'Anualmente',
          'Trimestralmente',
          'Semanal o mensual (regular)',
          'Solo cuando hay visitas'
        ],
        correctIndex: 2
      },
      {
        question: '¿Qué hacer con las sugerencias de mejora en SHITSUKE?',
        options: [
          'Ignorarlas (pérdida de tiempo',
          'Reconocerlas, evaluarlas e implementar las viables',
          'Guardarlas para "cuando haya tiempo"',
          'Solo aceptar las de gerencia'
        ],
        correctIndex: 1
      },
      {
        question: '¿Cuál es señal de mala implementación de SHITSUKE?',
        options: [
          'Personal sugiere mejoras',
          'Se necesita constante recordatorio para cumplir estándares',
          'Los estándares se mejoran periodicamente',
          'Hay orgullo por el área de trabajo'
        ],
        correctIndex: 1
      }
    ]
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// INVENTORY CONFIGS (from 5s-constants.ts)
// ══════════════════════════════════════════════════════════════════════════════

interface InventoryCategory {
  name: string
  icon?: string
  fields: Array<{ key: string; label: string; type: 'text' | 'select' | 'number'; options?: string[] }>
}

interface InventoryConfig {
  title: string
  subtitle: string
  templateName: string
  categories: InventoryCategory[]
  extraFields: Array<{ key: string; label: string; type: string; required?: boolean }>
}

const INVENTORY_CONFIGS: Record<number, InventoryConfig> = {
  1: {
    title: 'Inventario S1 - Clasificación de Elementos',
    subtitle: 'Clasifica cada elemento fotografiado como NECESARIO, DUDOSO o INNECESARIO',
    templateName: 'Clasificación Seiri',
    categories: [
      {
        name: 'Estado de Clasificación',
        icon: 'package',
        fields: [
          { key: 'estado', label: 'Clasificación', type: 'select', options: ['Necesario', 'Dudoso', 'Innecesario'] },
          { key: 'razon', label: 'Razón', type: 'text' },
          { key: 'frecuencia_uso', label: 'Última vez usado', type: 'select', options: ['Esta semana', 'Este mes', 'Hace 3 meses', 'Hace 6+ meses', 'No recuerda'] },
        ]
      },
      {
        name: 'Decisión',
        icon: 'check-circle',
        fields: [
          { key: 'decision', label: 'Acción', type: 'select', options: ['Mantener en sitio', 'Mover a almacén', 'Enviar a Jaula', 'Eliminar/Reciclar'] },
          { key: 'ubicacion_destino', label: 'Ubicación destino', type: 'text' },
        ]
      }
    ],
    extraFields: [
      { key: 'nombre_elemento', label: 'Nombre del elemento', type: 'text', required: true },
      { key: 'categoria_original', label: 'Categoría original', type: 'select', options: ['Material', 'Herramienta', 'Equipo', 'Mobiliario', 'Documento', 'Otro'] },
    ]
  },
  2: {
    title: 'Inventario S2 - Organización de Necesarios',
    subtitle: 'Define la frecuencia de uso y ubicación óptima para cada elemento necesario',
    templateName: 'Organización Seiton',
    categories: [
      {
        name: 'Frecuencia de Uso',
        icon: 'clock',
        fields: [
          { key: 'frecuencia', label: 'Frecuencia', type: 'select', options: ['Diaria', 'Semanal', 'Mensual', 'Ocasional', 'Rara'] },
          { key: 'ubicacion_actual', label: 'Ubicación actual', type: 'text' },
          { key: 'ubicacion_optima', label: 'Ubicación óptima propuesta', type: 'text' },
        ]
      },
      {
        name: 'Identificación',
        icon: 'tag',
        fields: [
          { key: 'tiene_etiqueta', label: 'Tiene etiqueta identificativa', type: 'select', options: ['Sí', 'No', 'Necesita'] },
          { key: 'tipo_señalizacion', label: 'Tipo de señalización', type: 'select', options: ['Etiqueta', 'Silueta', 'Código color', 'Número', 'Ninguna'] },
        ]
      }
    ],
    extraFields: [
      { key: 'nombre_elemento', label: 'Nombre del elemento', type: 'text', required: true },
      { key: 'cantidad', label: 'Cantidad', type: 'number' },
    ]
  },
  3: {
    title: 'Inventario S3 - Puntos de Limpieza',
    subtitle: 'Registra puntos de suciedad detectados y planes de limpieza',
    templateName: 'Limpieza Seiso',
    categories: [
      {
        name: 'Tipo de Suciedad',
        icon: 'droplets',
        fields: [
          { key: 'tipo_suciedad', label: 'Tipo', type: 'select', options: ['Polvo', 'Grasa/Aceite', 'Virutas/Residuos', 'Manchas', 'Óxido', 'Otro'] },
          { key: 'fuente', label: 'Fuente probable', type: 'text' },
          { key: 'severidad', label: 'Severidad', type: 'select', options: ['Leve', 'Moderada', 'Grave'] },
        ]
      },
      {
        name: 'Plan de Limpieza',
        icon: 'sparkles',
        fields: [
          { key: 'metodo_limpieza', label: 'Método de limpieza', type: 'select', options: ['Aspirado', 'Barrido', 'Fregado', 'Desengrasado', 'Especializado'] },
          { key: 'frecuencia_recomendada', label: 'Frecuencia recomendada', type: 'select', options: ['Diaria', 'Semanal', 'Mensual', 'Caso por caso'] },
          { key: 'responsable', label: 'Responsable asignado', type: 'text' },
        ]
      }
    ],
    extraFields: [
      { key: 'nombre_punto', label: 'Nombre del punto/área', type: 'text', required: true },
      { key: 'ubicacion', label: 'Ubicación específica', type: 'text' },
    ]
  },
  4: {
    title: 'Inventario S4 - Registro de Estándares',
    subtitle: 'Documenta los estándares visuales y procedimientos del área',
    templateName: 'Estandarización Seiketsu',
    categories: [
      {
        name: 'Tipo de Estándar',
        icon: 'file-text',
        fields: [
          { key: 'tipo_estandar', label: 'Tipo', type: 'select', options: ['Visual (foto)', 'Procedimiento (SOP)', 'Checklist', 'Señalización', 'Layout'] },
          { key: 'nombre_estandar', label: 'Nombre del estándar', type: 'text' },
          { key: 'descripcion', label: 'Descripción breve', type: 'text' },
        ]
      },
      {
        name: 'Implementación',
        icon: 'check-square',
        fields: [
          { key: 'estado', label: 'Estado', type: 'select', options: ['En desarrollo', 'Publicado', 'En formación', 'Activo', 'Mejora pendiente'] },
          { key: 'ubicacion_publicacion', label: 'Dónde se publica', type: 'text' },
          { key: 'responsable_mantenimiento', label: 'Responsable de actualizar', type: 'text' },
        ]
      }
    ],
    extraFields: [
      { key: 'titulo', label: 'Título del estándar', type: 'text', required: true },
      { key: 'area_aplicacion', label: 'Área de aplicación', type: 'text' },
    ]
  },
  5: {
    title: 'Inventario S5 - Seguimiento de Cumplimiento',
    subtitle: 'Evalúa el nivel de cumplimiento de los estándares establecidos',
    templateName: 'Disciplina Shitsuke',
    categories: [
      {
        name: 'Evaluación',
        icon: 'clipboard-check',
        fields: [
          { key: 'nivel_cumplimiento', label: 'Nivel de cumplimiento', type: 'select', options: ['Cumplido (100%)', 'Parcial (50-99%)', 'Incumplido (<50%)', 'No aplicable'] },
          { key: 'observaciones', label: 'Observaciones', type: 'text' },
          { key: 'evidencia_foto', label: 'Tiene evidencia fotográfica', type: 'select', options: ['Sí', 'No'] },
        ]
      },
      {
        name: 'Acción Requerida',
        icon: 'alert-triangle',
        fields: [
          { key: 'accion_requerida', label: 'Acción requerida', type: 'select', options: ['Ninguna', 'Corrección inmediata', 'Mejora a corto plazo', 'Revisión de estándar', 'Formación complementaria'] },
          { key: 'fecha_compromiso', label: 'Fecha compromiso', type: 'text' },
          { key: 'responsable_accion', label: 'Responsable de la acción', type: 'text' },
        ]
      }
    ],
    extraFields: [
      { key: 'elemento_evaluado', label: 'Elemento/estándar evaluado', type: 'text', required: true },
      { key: 'auditor', label: 'Nombre del auditor', type: 'text' },
    ]
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN SEED FUNCTION
// ══════════════════════════════════════════════════════════════════════════════

async function seedCompleteTemplates() {
  console.log('╔══════════════════════════════════════════════════════════════╗')
  console.log('║  v3.0.3 COMPLETE TEMPLATE SEED - Real Content for 5S App   ║')
  console.log('╚══════════════════════════════════════════════════════════════╝\n')
  
  // Count existing
  const existingCount = await db.template.count()
  console.log(`📊 Plantillas existentes: ${existingCount}`)
  
  let created = 0
  let updated = 0
  const errors: string[] = []
  
  // Process each S-step (1-5)
  for (let sStep = 1; sStep <= 5; sStep++) {
    console.log(`\n━━━ Procesando S${sStep} ━━━`)
    
    // ─── TYPE: formacion ───
    try {
      const existing = await db.template.findFirst({
        where: { type: 'formacion', sStep, companyId: null }
      })
      
      const formationContent = FORMATION_CONTENT[sStep]
      const contentStr = JSON.stringify(formationContent)
      
      if (existing) {
        await db.template.update({
          where: { id: existing.id },
          data: {
            title: `Formación S${sStep} - ${['Seiri', 'Seiton', 'Seiso', 'Seiketsu', 'Shitsuke'][sStep-1]}`,
            description: `Contenido teórico completo para formación en ${['SEIRI (Clasificar)', 'SEITON (Ordenar)', 'SEISO (Limpiar)', 'SEIKETSU (Estandarizar)', 'SHITSUKE (Disciplina)'][sStep-1]}`,
            content: contentStr,
            active: true,
          }
        })
        console.log(`  ✏️  formacion S${sStep}: ACTUALIZADA con contenido real`)
        updated++
      } else {
        await db.template.create({
          data: {
            id: `tpl_form_s${sStep}_${Date.now()}`,
            type: 'formacion',
            sStep,
            miniStep: 1,
            title: `Formación S${sStep} - ${['Seiri', 'Seiton', 'Seiso', 'Seiketsu', 'Shitsuke'][sStep-1]}`,
            description: `Contenido teórico completo para formación`,
            content: contentStr,
            notaMinima: 80,
            active: true,
            companyId: null,
            updatedAt: new Date(),
          }
        })
        console.log(`  ✅ formacion S${sStep}: CREADA con contenido real`)
        created++
      }
    } catch (e: any) {
      errors.push(`formacion S${sStep}: ${e.message}`)
      console.log(`  ❌ formacion S${sStep}: ${e.message}`)
    }
    
    // ─── TYPE: examen (NEW!) ───
    try {
      const existing = await db.template.findFirst({
        where: { type: 'examen', sStep, companyId: null }
      })
      
      const examContent = EXAM_QUESTIONS[sStep]
      const contentStr = JSON.stringify(examContent)
      
      if (existing) {
        await db.template.update({
          where: { id: existing.id },
          data: {
            title: `Examen S${sStep} - ${['Seiri', 'Seiton', 'Seiso', 'Seiketsu', 'Shitsuke'][sStep-1]}`,
            description: `Evaluación de conocimientos sobre ${['SEIRI', 'SEITON', 'SEISO', 'SEIKETSU', 'SHITSUKE'][sStep-1]} (${examContent.questions.length} preguntas)`,
            content: contentStr,
            notaMinima: 80,
            active: true,
          }
        })
        console.log(`  ✏️  examen S${sStep}: ACTUALIZADO (${examContent.questions.length} preguntas)`)
        updated++
      } else {
        await db.template.create({
          data: {
            id: `tpl_exam_s${sStep}_${Date.now()}`,
            type: 'examen',
            sStep,
            miniStep: 1,
            title: `Examen S${sStep} - ${['Seiri', 'Seiton', 'Seiso', 'Seiketsu', 'Shitsuke'][sStep-1]}`,
            description: `Evaluación de conocimientos (${examContent.questions.length} preguntas)`,
            content: contentStr,
            notaMinima: 80,
            active: true,
            companyId: null,
            updatedAt: new Date(),
          }
        })
        console.log(`  ✅ examen S${sStep}: CREADO (${examContent.questions.length} preguntas)`)
        created++
      }
    } catch (e: any) {
      errors.push(`examen S${sStep}: ${e.message}`)
      console.log(`  ❌ examen S${sStep}: ${e.message}`)
    }
    
    // ─── TYPE: autoevaluacion ───
    try {
      const existing = await db.template.findFirst({
        where: { type: 'autoevaluacion', sStep, companyId: null }
      })
      
      const auditSections = AUDIT_CHECKLISTS[sStep]
      const contentStr = JSON.stringify({ sections: auditSections })
      
      if (existing) {
        await db.template.update({
          where: { id: existing.id },
          data: {
            title: `Autoevaluación S${sStep} - ${['Seiri', 'Seiton', 'Seiso', 'Seiketsu', 'Shitsuke'][sStep-1]}`,
            description: `Checklist de autoevaluación con ${auditSections.reduce((sum, s) => sum + s.items.length, 0)} criterios`,
            content: contentStr,
            active: true,
          }
        })
        console.log(`  ✏️  autoevaluacion S${sStep}: ACTUALIZADA (${auditSections.reduce((sum, s) => sum + s.items.length, 0)} items)`)
        updated++
      } else {
        await db.template.create({
          data: {
            id: `tpl_auto_s${sStep}_${Date.now()}`,
            type: 'autoevaluacion',
            sStep,
            miniStep: 4,
            title: `Autoevaluación S${sStep} - ${['Seiri', 'Seiton', 'Seiso', 'Seiketsu', 'Shitsuke'][sStep-1]}`,
            description: `Checklist de autoevaluación`,
            content: contentStr,
            notaMinima: 80,
            active: true,
            companyId: null,
            updatedAt: new Date(),
          }
        })
        console.log(`  ✅ autoevaluacion S${sStep}: CREADA (${auditSections.reduce((sum, s) => sum + s.items.length, 0)} items)`)
        created++
      }
    } catch (e: any) {
      errors.push(`autoevaluacion S${sStep}: ${e.message}`)
      console.log(`  ❌ autoevaluacion S${sStep}: ${e.message}`)
    }
    
    // ─── TYPE: auditoria ───
    try {
      const existing = await db.template.findFirst({
        where: { type: 'auditoria', sStep, companyId: null }
      })
      
      const auditSections = AUDIT_CHECKLISTS[sStep]
      const contentStr = JSON.stringify({ sections: auditSections })
      
      if (existing) {
        await db.template.update({
          where: { id: existing.id },
          data: {
            title: `Auditoría S${sStep} - ${['Seiri', 'Seiton', 'Seiso', 'Seiketsu', 'Shitsuke'][sStep-1]}`,
            description: `Checklist de auditoría con ${auditSections.reduce((sum, s) => sum + s.items.length, 0)} criterios`,
            content: contentStr,
            active: true,
          }
        })
        console.log(`  ✏️  auditoria S${sStep}: ACTUALIZADA (${auditSections.reduce((sum, s) => sum + s.items.length, 0)} items)`)
        updated++
      } else {
        await db.template.create({
          data: {
            id: `tpl_audit_s${sStep}_${Date.now()}`,
            type: 'auditoria',
            sStep,
            miniStep: 5,
            title: `Auditoría S${sStep} - ${['Seiri', 'Seiton', 'Seiso', 'Seiketsu', 'Shitsuke'][sStep-1]}`,
            description: `Checklist de auditoría`,
            content: contentStr,
            notaMinima: 80,
            active: true,
            companyId: null,
            updatedAt: new Date(),
          }
        })
        console.log(`  ✅ auditoria S${sStep}: CREADA (${auditSections.reduce((sum, s) => sum + s.items.length, 0)} items)`)
        created++
      }
    } catch (e: any) {
      errors.push(`auditoria S${sStep}: ${e.message}`)
      console.log(`  ❌ auditoria S${sStep}: ${e.message}`)
    }
    
    // ─── TYPE: inventario ───
    try {
      const existing = await db.template.findFirst({
        where: { type: 'inventario', sStep, companyId: null }
      })
      
      const invConfig = INVENTORY_CONFIGS[sStep]
      const contentStr = JSON.stringify(invConfig)
      
      if (existing) {
        await db.template.update({
          where: { id: existing.id },
          data: {
            title: invConfig.title,
            description: invConfig.subtitle,
            content: contentStr,
            active: true,
          }
        })
        console.log(`  ✏️  inventario S${sStep}: ACTUALIZADO (${invConfig.categories.length} categorías)`)
        updated++
      } else {
        await db.template.create({
          data: {
            id: `tpl_inv_s${sStep}_${Date.now()}`,
            type: 'inventario',
            sStep,
            miniStep: 3,
            title: invConfig.title,
            description: invConfig.subtitle,
            content: contentStr,
            active: true,
            companyId: null,
            updatedAt: new Date(),
          }
        })
        console.log(`  ✅ inventario S${sStep}: CREADO (${invConfig.categories.length} categorías)`)
        created++
      }
    } catch (e: any) {
      errors.push(`inventario S${sStep}: ${e.message}`)
      console.log(`  ❌ inventario S${sStep}: ${e.message}`)
    }
    
    // ─── TYPE: fotos ───
    try {
      const existing = await db.template.findFirst({
        where: { type: 'fotos', sStep, companyId: null }
      })
      
      const minPhotosByS: Record<number, number> = { 1: 5, 2: 8, 3: 6, 4: 4, 5: 3 }
      const contentStr = JSON.stringify({
        instructions: [`Toma fotografías del área antes y después de aplicar ${['SEIRI (Clasificar)', 'SEITON (Ordenar)', 'SEISO (Limpiar)', 'SEIKETSU (Estandarizar)', 'SHITSUKE (Disciplina)'][sStep-1]}`],
        minPhotos: minPhotosByS[sStep],
        photoTypes: ['Antes', 'Después', 'Detalle problema', 'Detalle solución']
      })
      
      if (existing) {
        await db.template.update({
          where: { id: existing.id },
          data: {
            title: `Registro Fotográfico S${sStep} - ${['Seiri', 'Seiton', 'Seiso', 'Seiketsu', 'Shitsuke'][sStep-1]}`,
            description: `Plantilla para documentación fotográfica (mínimo ${minPhotosByS[sStep]} fotos)`,
            content: contentStr,
            minPhotos: minPhotosByS[sStep],
            active: true,
          }
        })
        console.log(`  ✏️  fotos S${sStep}: ACTUALIZADA (minPhotos=${minPhotosByS[sStep]})`)
        updated++
      } else {
        await db.template.create({
          data: {
            id: `tpl_photo_s${sStep}_${Date.now()}`,
            type: 'fotos',
            sStep,
            miniStep: 2,
            title: `Registro Fotográfico S${sStep} - ${['Seiri', 'Seiton', 'Seiso', 'Seiketsu', 'Shitsuke'][sStep-1]}`,
            description: `Plantilla para documentación fotográfica`,
            content: contentStr,
            minPhotos: minPhotosByS[sStep],
            active: true,
            companyId: null,
            updatedAt: new Date(),
          }
        })
        console.log(`  ✅ fotos S${sStep}: CREADA (minPhotos=${minPhotosByS[sStep]})`)
        created++
      }
    } catch (e: any) {
      errors.push(`fotos S${sStep}: ${e.message}`)
      console.log(`  ❌ fotos S${sStep}: ${e.message}`)
    }
  }
  
  // Final summary
  const finalCount = await db.template.count()
  console.log('\n╔══════════════════════════════════════════════════════════════╗')
  console.log('║                    RESUMEN FINAL                          ║')
  console.log('╠══════════════════════════════════════════════════════════════╣')
  console.log(`║  Plantillas antes:  ${existingCount.toString().padStart(4)}                               ║`)
  console.log(`║  Plantillas después: ${finalCount.toString().padStart(4)}                               ║`)
  console.log(`║  Creadas:             ${created.toString().padStart(4)}                               ║`)
  console.log(`║  Actualizadas:        ${updated.toString().padStart(4)}                               ║`)
  
  if (errors.length > 0) {
    console.log('║  ERRORES:                                                  ║')
    errors.forEach(e => console.log(`║    - ${e}`))
  }
  
  console.log('╚══════════════════════════════════════════════════════════════╝')
  
  // Show final state by type
  console.log('\n📋 Estado final por tipo:')
  const types = ['formacion', 'examen', 'autoevaluacion', 'auditoria', 'inventario', 'fotos']
  for (const type of types) {
    const count = await db.template.count({ where: { type }})
    console.log(`   ${type.padEnd(15)}: ${count} plantillas`)
  }
}

seedCompleteTemplates()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error fatal:', err)
    process.exit(1)
  })
