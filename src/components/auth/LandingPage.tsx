'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Search, ArrowRight, Sparkles, BarChart3, ShieldCheck,
  ClipboardList, Camera, CheckSquare, GraduationCap,
  TrendingUp, Users, Target, Award, ArrowDownRight,
  RotateCcw, Zap, Clock, Layers,
  ChevronRight, Play, CheckCircle2,
  Lightbulb, Wrench, FileText, MapPin
} from 'lucide-react'
import SolicitarInfoDialog from './SolicitarInfoDialog'

interface LandingPageProps {
  onLogin: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

// ── Animated counter hook ──
function useCounter(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (!startOnView) return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTime = performance.now()
        const step = () => {
          const progress = Math.min((performance.now() - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
          setCount(Math.round(eased * end))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [end, duration, startOnView])

  return { count, ref }
}

// ── 5S Cycle data ──
const S_CYCLE = [
  { num: 1, name: 'SEIRI', label: 'Revisar', color: '#ef4444', angle: 270,
    desc: 'Identificar y separar lo necesario de lo innecesario. Eliminar lo que no aporta valor.',
    result: 'Espacio liberado, desperdicios eliminados' },
  { num: 2, name: 'SEITON', label: 'Ordenar', color: '#f97316', angle: 342,
    desc: 'Un lugar para cada cosa. Etiquetar, señalar y ordenar para acceso inmediato.',
    result: 'Tiempo de búsqueda reducido a 0' },
  { num: 3, name: 'SEISO', label: 'Limpiar', color: '#eab308', angle: 54,
    desc: 'Limpiar es inspeccionar. Detectar fugas, desgastes y anomalías durante la limpieza.',
    result: 'Anomalías detectadas al instante' },
  { num: 4, name: 'SEIKETSU', label: 'Estandarizar', color: '#22c55e', angle: 126,
    desc: 'Crear estándares visuales y procedimientos que mantengan los tres pasos anteriores.',
    result: 'Consistencia: siempre igual, siempre bien' },
  { num: 5, name: 'SHITSUKE', label: 'Mantener', color: '#3b82f6', angle: 198,
    desc: 'Disciplina y mejora continua. Convertir las buenas prácticas en hábito permanente.',
    result: 'Cultura de mejora continua arraigada' },
]

// ── Stats ──
const STATS = [
  { value: 60, suffix: '%', label: 'Reducción de accidentes', icon: ShieldCheck },
  { value: 40, suffix: '%', label: 'Aumento de productividad', icon: TrendingUp },
  { value: 85, suffix: '%', label: 'Reducción tiempos búsqueda', icon: Clock },
  { value: 3, suffix: 'x', label: 'Retorno de la inversión', icon: BarChart3 },
]

// ── Flow: How the app connects everything ──
const FLOW_STEPS = [
  { icon: GraduationCap, title: 'Formación', desc: 'El equipo aprende cada S con contenido interactivo y exámenes', color: '#ef4444' },
  { icon: Camera, title: 'Evidencia', desc: 'Fotos antes/después con geolocalización y trazabilidad', color: '#f97316' },
  { icon: ClipboardList, title: 'Inventario', desc: 'Listados digitales de innecesarios, necesarios, suciedad y estándares', color: '#eab308' },
  { icon: CheckSquare, title: 'Autoevaluación', desc: 'Checklists con puntuación automática y detección de hallazgos', color: '#22c55e' },
  { icon: ShieldCheck, title: 'Auditoría', desc: 'Auditorías trimestrales con informes, seguimiento y planes de acción', color: '#3b82f6' },
]

// ── Interaction connections ──
const CONNECTIONS = [
  { from: 'Gestor', to: 'Empresa', desc: 'Crea y gestiona empresas desde el panel central' },
  { from: 'Admin', to: 'Proyecto', desc: 'Configura zonas, tableros y asigna responsables' },
  { from: 'Responsable', to: 'Zona', desc: 'Dirige la autoevaluación y seguimiento de su zona' },
  { from: 'Empleado', to: 'Pasos 5S', desc: 'Completa formación, fotos e inventario' },
  { from: 'Auditor', to: 'Auditoría', desc: 'Realiza auditorías trimestrales y genera informes' },
  { from: 'Gerente', to: 'Dashboard', desc: 'Supervisa progreso, KPIs y planes de acción' },
]

export default function LandingPage({ onLogin }: LandingPageProps) {
  const [activeS, setActiveS] = useState(0)
  const [activeFlow, setActiveFlow] = useState(0)
  const stat1 = useCounter(60)
  const stat2 = useCounter(40)
  const stat3 = useCounter(85)
  const stat4 = useCounter(3)
  const statRefs = [stat1, stat2, stat3, stat4]

  // Auto-cycle 5S
  useEffect(() => {
    const interval = setInterval(() => setActiveS(prev => (prev + 1) % 5), 3000)
    return () => clearInterval(interval)
  }, [])

  // Auto-cycle flow
  useEffect(() => {
    const interval = setInterval(() => setActiveFlow(prev => (prev + 1) % FLOW_STEPS.length), 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══ HERO ═══ */}
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
                <Button size="lg" onClick={onLogin}
                  className="bg-white text-green-700 hover:bg-green-50 text-lg px-8 py-6 shadow-xl shadow-green-900/20 font-semibold">
                  Iniciar Sesión
                </Button>
                {/* Access button — opens the contact dialog in the background */}
                <SolicitarInfoDialog
                  label="Pedir Información"
                  variant="outline"
                  size="lg"
                  className="bg-yellow-300/95 border-yellow-200 text-green-800 hover:bg-yellow-200 text-lg px-8 py-6 font-semibold shadow-lg shadow-yellow-900/10"
                />
              </div>
            </motion.div>
            <motion.div className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64"
              initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}>
              {/* Logo de la lima 5S — mismo /5s-logo.png que se usa en la app.
                  Fondo blanco circular para que los colores se vean idénticos
                  (sin mezclarse con el gradient verde del hero). Sin drop-shadow
                  para no alterar la percepción de los colores. */}
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-2">
                <img src="/5s-logo.png" alt="5S Logo" className="w-full h-full object-contain" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ STATS COUNTER ═══ */}
      <section className="py-12 md:py-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((stat, i) => (
              <div key={i} ref={statRefs[i].ref} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">
                    {statRefs[i].count}{stat.suffix}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5S CYCLE INTERACTIVE ═══ */}
      <section id="ciclo" className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              El ciclo 5S: 5 pasos, 1 transformación
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cada S alimenta la siguiente. Es un ciclo virtuoso que se refuerza a sí mismo.
              Haz clic en cada paso para ver cómo se conectan.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Pentagon visual */}
            <div className="flex-shrink-0 w-[280px] h-[280px] md:w-[340px] md:h-[340px] relative">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Center circle */}
                <circle cx="100" cy="100" r="28" fill="#059669" opacity="0.1" />
                <text x="100" y="96" textAnchor="middle" className="text-[9px] font-bold" fill="#059669">CICLO</text>
                <text x="100" y="108" textAnchor="middle" className="text-[8px]" fill="#059669">5S</text>

                {/* Connecting lines */}
                {S_CYCLE.map((s, i) => {
                  const next = S_CYCLE[(i + 1) % 5]
                  const r = 75
                  const x1 = 100 + r * Math.cos((s.angle - 90) * Math.PI / 180)
                  const y1 = 100 + r * Math.sin((s.angle - 90) * Math.PI / 180)
                  const x2 = 100 + r * Math.cos((next.angle - 90) * Math.PI / 180)
                  const y2 = 100 + r * Math.sin((next.angle - 90) * Math.PI / 180)
                  return (
                    <line key={`line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={i === activeS ? s.color : '#d1d5db'} strokeWidth={i === activeS ? 2.5 : 1}
                      strokeDasharray={i === activeS ? 'none' : '4 3'} opacity={i === activeS ? 1 : 0.4} />
                  )
                })}

                {/* Nodes */}
                {S_CYCLE.map((s, i) => {
                  const r = 75
                  const x = 100 + r * Math.cos((s.angle - 90) * Math.PI / 180)
                  const y = 100 + r * Math.sin((s.angle - 90) * Math.PI / 180)
                  const isActive = i === activeS
                  return (
                    <g key={`node-${i}`} onClick={() => setActiveS(i)} className="cursor-pointer">
                      <circle cx={x} cy={y} r={isActive ? 20 : 15}
                        fill={isActive ? s.color : 'white'} stroke={s.color}
                        strokeWidth={isActive ? 3 : 2}
                        style={{ transition: 'all 0.3s' }} />
                      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
                        className="text-[10px] font-bold" fill={isActive ? 'white' : s.color}>
                        S{s.num}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Active step detail */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeS}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                      style={{ backgroundColor: S_CYCLE[activeS].color }}>
                      S{S_CYCLE[activeS].num}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{S_CYCLE[activeS].label}</h3>
                      <span className="text-sm font-medium text-gray-400 italic">{S_CYCLE[activeS].name}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">{S_CYCLE[activeS].desc}</p>
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-green-800">{S_CYCLE[activeS].result}</span>
                  </div>
                  {/* Progress dots */}
                  <div className="flex gap-2 mt-6">
                    {S_CYCLE.map((s, i) => (
                      <button key={i} onClick={() => setActiveS(i)}
                        className={`h-2 rounded-full transition-all ${i === activeS ? 'w-8' : 'w-2'}`}
                        style={{ backgroundColor: i === activeS ? s.color : '#d1d5db' }} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ APP FLOW: How it all connects ═══ */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cómo funciona la plataforma
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cada paso del método 5S se despliega en 5 mini-pasos interconectados.
              Todo fluye, nada se pierde.
            </p>
          </motion.div>

          {/* Flow visualization */}
          <div className="relative">
            <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0">
              {FLOW_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className={`flex-1 relative ${i === activeFlow ? 'z-10' : 'z-0'}`}
                  onClick={() => setActiveFlow(i)}
                >
                  <div className={`mx-1 md:mx-2 rounded-xl p-4 md:p-5 border-2 transition-all cursor-pointer ${
                    i === activeFlow
                      ? 'bg-white shadow-lg border-green-500 scale-105'
                      : 'bg-white/60 border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: step.color + '15' }}>
                        <step.icon className="h-4 w-4" style={{ color: step.color }} />
                      </div>
                      <span className={`font-semibold text-sm ${i === activeFlow ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.title}
                      </span>
                    </div>
                    <AnimatePresence mode="wait">
                      {i === activeFlow && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-gray-600 leading-relaxed"
                        >
                          {step.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* Arrow connector */}
                  {i < FLOW_STEPS.length - 1 && (
                    <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
                      <ChevronRight className="h-4 w-4 text-gray-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Connection line */}
          <div className="mt-3 flex justify-center gap-1">
            {FLOW_STEPS.map((_, i) => (
              <button key={i} onClick={() => setActiveFlow(i)}
                className={`h-1.5 rounded-full transition-all ${i === activeFlow ? 'w-6 bg-green-500' : 'w-1.5 bg-gray-300'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ROLES & CONNECTIONS ═══ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cada rol, su conexión
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              La plataforma conecta a cada persona con su responsabilidad.
              Todos participan, nada queda huérfano.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONNECTIONS.map((c, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    {c.from}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-300" />
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                    {c.to}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BENEFITS ═══ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-green-50/30 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              El poder de 5S digitalizado
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              El papel se pierde, el Excel se desactualiza. La plataforma 5S mantiene todo vivo,
              conectado y en tiempo real.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Zap, title: 'Detección inmediata', desc: 'Las anomalías se detectan cuando aparecen, no cuando causan un paro. El control visual digital permite reaccionar antes de que el problema crezca, reduciendo costes de no calidad hasta un 40%.', color: '#f59e0b' },
              { icon: Layers, title: 'Trazabilidad total', desc: 'Cada foto, cada hallazgo, cada acción queda registrado con fecha, autor y zona. Nada se pierde. Puedes reconstruir la historia completa de mejora de cualquier área con un clic.', color: '#8b5cf6' },
              { icon: RotateCcw, title: 'Ciclo PDCA integrado', desc: 'Planificar, hacer, verificar, actuar. Cada hallazgo genera un plan de acción, cada acción se verifica, cada verificación cierra el ciclo. La mejora no se para nunca.', color: '#06b6d4' },
              { icon: Lightbulb, title: 'Inteligencia de datos', desc: 'La plataforma no solo registra: analiza. Tendencias de puntuación, zonas críticas, evolución temporal. Datos que se convierten en decisiones informadas, no en intuiciones.', color: '#ec4899' },
            ].map((b, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-5 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 hover:border-green-200 transition-all"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: b.color + '12' }}>
                  <b.icon className="h-7 w-7" style={{ color: b.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={onLogin}
                className="bg-white text-green-700 hover:bg-green-50 text-lg px-10 py-6 shadow-xl font-semibold">
                Iniciar Sesión
              </Button>
              <SolicitarInfoDialog
                label="Pedir Información"
                variant="outline"
                size="lg"
                className="bg-yellow-300/95 border-yellow-200 text-green-800 hover:bg-yellow-200 text-lg px-10 py-6 font-semibold shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shadow-sm">
              <img src="/5s-logo.png" alt="5S" className="w-full h-full object-contain" />
            </div>
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
