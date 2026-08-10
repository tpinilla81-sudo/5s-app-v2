'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Search, ArrowRight, Sparkles, BarChart3, ShieldCheck,
  ClipboardList, Camera, CheckSquare, GraduationCap,
  TrendingUp, Users, Target, Award, ArrowDown
} from 'lucide-react'

interface LandingPageProps {
  onLogin: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const S_STEPS_DATA = [
  { num: 1, name: 'Seiri', label: 'Revisar', color: '#ef4444', icon: Search, desc: 'Identificar y eliminar lo innecesario. Solo lo que se necesita, en la cantidad justa, en el lugar adecuado.' },
  { num: 2, name: 'Seiton', label: 'Ordenar', color: '#f97316', icon: ArrowRight, desc: 'Un lugar para cada cosa y cada cosa en su lugar. Ordenar para encontrar al instante.' },
  { num: 3, name: 'Seiso', label: 'Limpiar', color: '#eab308', icon: Sparkles, desc: 'Limpiar es inspeccionar. La limpieza como método de detección de anomalías y prevención.' },
  { num: 4, name: 'Seiketsu', label: 'Estandarizar', color: '#22c55e', icon: ClipboardList, desc: 'Crear estándares visuales y procedimientos para mantener los logros alcanzados.' },
  { num: 5, name: 'Shitsuke', label: 'Mantener', color: '#3b82f6', icon: ShieldCheck, desc: 'Disciplina y mejora continua. Convertir las buenas prácticas en hábito permanente.' },
]

const BENEFITS = [
  { icon: TrendingUp, title: 'Reducción de costes', desc: 'Elimina desperdicios, reduce tiempos de búsqueda y minimiza el inventario innecesario.' },
  { icon: Target, title: 'Mayor productividad', desc: 'Menos tiempo buscando herramientas y materiales, más tiempo produciendo valor.' },
  { icon: ShieldCheck, title: 'Seguridad laboral', desc: 'Un entorno ordenado y limpio reduce accidentes hasta un 60% según estudios.' },
  { icon: BarChart3, title: 'Control visual total', desc: 'Anomalías visibles al instante. El problema se detecta cuando aparece, no cuando explota.' },
  { icon: Users, title: 'Compromiso del equipo', desc: 'Todos participan, todos son responsables. La mejora es cosa de todos, no de un departamento.' },
  { icon: Award, title: 'Mejora continua real', desc: 'PDCA integrado. No es un proyecto, es una forma de trabajar que evoluciona cada día.' },
]

const FEATURES = [
  { icon: GraduationCap, title: 'Formación integrada', desc: 'Contenido formativo para cada S con evaluación del conocimiento.' },
  { icon: Camera, title: 'Evidencia fotográfica', desc: 'Fotos antes/después con trazabilidad completa por zona y elemento.' },
  { icon: CheckSquare, title: 'Autoevaluación y auditoría', desc: 'Checklists personalizables, puntuación automática y seguimiento de hallazgos.' },
  { icon: ClipboardList, title: 'Gestión de inventarios', desc: 'Innecessarios, necesarios, puntos de suciedad, estándares y disciplina.' },
  { icon: Sparkles, title: 'Tablero visual 5S', desc: 'Vista del progreso por zonas con indicadores de estado en tiempo real.' },
  { icon: BarChart3, title: 'PDCA y planes de acción', desc: 'Planificación, ejecución, verificación y actuación integrados en cada paso.' },
]

export default function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div className="flex-1 text-center md:text-left" {...fadeUp}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
                <Sparkles className="h-4 w-4" />
                Plataforma digital de gestión 5S
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Transforma tu empresa con el{' '}
                <span className="text-yellow-300">Método 5S</span>
              </h1>
              <p className="text-lg md:text-xl text-green-100 mb-8 max-w-xl">
                La herramienta digital que convierte la metodología 5S en resultados tangibles:
                más orden, más limpieza, más eficiencia, más competitividad.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button
                  size="lg"
                  onClick={onLogin}
                  className="bg-white text-green-700 hover:bg-green-50 text-lg px-8 py-6 shadow-xl shadow-green-900/20 font-semibold"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById('que-es')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-white/40 text-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  Descubre más
                  <ArrowDown className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
            >
              <img src="/5s-logo.png" alt="5S Logo" className="w-full h-full object-contain drop-shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Qué es 5S */}
      <section id="que-es" className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Las 5 S del éxito empresarial
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cinco principios japoneses que, aplicados con disciplina, transforman radicalmente
              cualquier entorno de trabajo. De la fábrica a la oficina, del almacén al hospital.
            </p>
          </motion.div>

          <div className="grid gap-6 md:gap-8">
            {S_STEPS_DATA.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-gray-200/50 border border-gray-100"
              >
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                  style={{ backgroundColor: s.color }}
                >
                  {s.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{s.label}</h3>
                    <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 italic">{s.name}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
                <s.icon className="hidden md:block flex-shrink-0 h-10 w-10 opacity-20" style={{ color: s.color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Qué consigues con 5S?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Las empresas que implementan 5S de forma sostenida obtienen resultados medibles
              desde el primer trimestre.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                  <b.icon className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-green-50/50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Todo lo que incluye la plataforma
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No es solo un checklist. Es una plataforma completa que digitaliza
              todo el ciclo 5S de tu organización.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para transformar tu organización?
            </h2>
            <p className="text-lg text-green-100 mb-8 max-w-xl mx-auto">
              El orden no es un lujo, es una ventaja competitiva.
              Empieza hoy con la plataforma 5S digital.
            </p>
            <Button
              size="lg"
              onClick={onLogin}
              className="bg-white text-green-700 hover:bg-green-50 text-lg px-10 py-6 shadow-xl font-semibold"
            >
              Acceder a la plataforma
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/5s-logo.png" alt="5S" className="w-8 h-8 object-contain" />
            <span className="text-sm text-gray-500">Método 5S — Plataforma digital</span>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Cincos. Metodología Lean Manufacturing.
          </p>
        </div>
      </footer>
    </div>
  )
}
