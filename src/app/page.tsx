'use client'

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Zap,
  BarChart3,
  ChevronDown,
  Check,
  Workflow,
  Layers,
  Shield,
  Sparkles,
  TrendingUp,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GearBackground } from '@/components/GearScene'
import { ExecutiveChartsSection } from '@/components/ExecutiveCharts'

/* ─── useMounted Hook ─── */
function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

/* ─── Data ─── */
const valuePillars = [
  {
    icon: Layers,
    title: 'Business Central',
    subtitle: 'Planeación de Recursos Empresariales',
    description: 'Operaciones financieras unificadas, cadena de suministro y gestión de proyectos — implementados en la mitad del tiempo.',
    metrics: ['50% más rápido', 'Operaciones unificadas', 'Visibilidad en tiempo real'],
  },
  {
    icon: Workflow,
    title: 'Power Automate',
    subtitle: 'Automatización Inteligente de Flujos',
    description: 'Elimina procesos manuales. Nuestras automatizaciones convierten carga administrativa en velocidad operacional.',
    metrics: ['80% menos trabajo manual', 'Procesamiento sin errores', 'Ejecución 24/7'],
  },
  {
    icon: Zap,
    title: 'Power Apps',
    subtitle: 'Aplicaciones Empresariales a Medida',
    description: 'Aplicaciones purpose-built que se integran perfectamente con tu ecosistema Microsoft 365.',
    metrics: ['60% reducción de costos', 'Despliegue rápido', 'Integración nativa'],
  },
]

const WHATSAPP_NUMBER = '525617075485'

/* ─── Navigation Dots ─── */
function NavDots({ active, onNavigate }: { active: number; onNavigate: (i: number) => void }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {[0, 1, 2].map((i) => (
        <button
          key={i}
          className={`nav-dot ${active === i ? 'active' : ''}`}
          onClick={() => onNavigate(i)}
          aria-label={`Ir a sección ${i + 1}`}
        />
      ))}
    </div>
  )
}

/* ─── Section 1: Executive Hook ─── */
function SlideExecutiveHook({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="snap-section relative flex items-center justify-center overflow-hidden">
      {/* Vidrio templado — frosted glass between gears and text */}
      <div className="absolute inset-0 frosted-glass-overlay glass-edge-glow" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          {/* Pre-headline badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse-subtle" />
              <span className="text-xs font-medium tracking-wider uppercase text-[#7d9a8a]">Socios Expertos Microsoft 365</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
          >
            Rendimiento Business Central:{' '}
            <span className="gradient-text">Doble Velocidad,</span>{' '}
            Mitad de Costo.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-[#7d9a8a] leading-relaxed max-w-2xl mb-10"
          >
            Aprovechamos IA propietaria dentro del ecosistema Microsoft 365 para acelerar implementaciones y maximizar la eficiencia financiera.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Button
              size="lg"
              onClick={onCTA}
              className="bg-[#10b981] hover:bg-[#059669] text-white font-semibold text-base px-8 h-13 rounded-lg hover:shadow-lg hover:shadow-[#10b981]/20 transition-all duration-300"
            >
              Solicitar Evaluación Gratuita
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <div className="flex items-center gap-6 text-sm text-[#7d9a8a]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#10b981]" />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#10b981]" />
                <span>Respuesta en 48h</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#7d9a8a]/60">Desplazar</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="scroll-chevron-glow"
        >
          <ChevronDown className="w-5 h-5 text-[#10b981]" strokeWidth={2.5} />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─── Section 2: Strategic Value Proposition + Charts ─── */
function SlideValueProposition() {
  return (
    <section className="snap-section relative flex items-center justify-center overflow-hidden">
      {/* Frosted glass overlay */}
      <div className="absolute inset-0 frosted-glass-overlay glass-edge-glow" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full max-h-screen overflow-y-auto scrollbar-hide py-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-md mb-5">
            <Sparkles className="w-3 h-3 text-[#10b981]" />
            <span className="text-[11px] font-medium tracking-wider uppercase text-[#7d9a8a]">Valor Estratégico</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            No solo desarrollamos.{' '}
            <span className="gradient-text">Optimizamos.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#7d9a8a] max-w-2xl mx-auto leading-relaxed">
            Nuestro framework interno impulsado por IA reduce los tiempos de proyecto tradicionales en un 50% — entregando ROI medible desde el día uno.
          </p>
        </motion.div>

        {/* Value Pillars */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {valuePillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group frosted-glass-content rounded-xl p-5 hover:border-[#10b981]/20 transition-all duration-500 glass-edge-glow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#10b981]/10 border border-[#10b981]/15 flex items-center justify-center group-hover:bg-[#10b981]/15 transition-colors duration-300">
                  <pillar.icon className="w-4 h-4 text-[#10b981]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{pillar.title}</h3>
                  <p className="text-[10px] text-[#7d9a8a]">{pillar.subtitle}</p>
                </div>
              </div>
              <p className="text-xs text-[#7d9a8a] leading-relaxed mb-3">{pillar.description}</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {pillar.metrics.map((metric) => (
                  <div key={metric} className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-[#10b981]" />
                    <span className="text-[10px] font-medium text-[#94a3b8]">{metric}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pain Point Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative rounded-xl overflow-hidden mb-8 frosted-glass-content glass-edge-glow"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/[0.06] to-[#34d399]/[0.03]" />
          <div className="absolute inset-0 border border-[#10b981]/10 rounded-xl" />
          <div className="relative p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 border border-[#10b981]/15 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-[#10b981]" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold mb-0.5">Elimina Fricción. Acelera Crecimiento.</h3>
              <p className="text-xs text-[#7d9a8a] leading-relaxed">
                Eliminamos la fricción en operaciones financieras y flujos de cumplimiento, transformando cuellos de botella administrativos en centros de ganancia optimizados.
              </p>
            </div>
            <Shield className="w-6 h-6 text-[#10b981]/20 shrink-0 hidden sm:block" />
          </div>
        </motion.div>

        {/* Executive Charts */}
        <ExecutiveChartsSection />
      </div>
    </section>
  )
}

/* ─── Section 3: High-Conversion WhatsApp CTA ─── */
function SlideCallToAction() {
  const whatsappMessage = encodeURIComponent('Hola BCForge, me gustaría solicitar una evaluación gratuita de mi proyecto de Business Central.')
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`

  return (
    <section className="snap-section relative flex items-center justify-center overflow-hidden">
      {/* Vidrio templado — frosted glass between gears and text */}
      <div className="absolute inset-0 frosted-glass-overlay glass-edge-glow" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse-subtle" />
            <span className="text-xs font-medium tracking-wider uppercase text-[#7d9a8a]">Respuesta Inmediata</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6"
        >
          Transforma Tu Operación.{' '}
          <span className="gradient-text">Habla Con Nosotros.</span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl text-[#7d9a8a] leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Una conversación puede cambiar la trayectoria de tu empresa. Sin formularios, sin esperas — conecta directo con nuestro equipo de expertos.
        </motion.p>

        {/* WhatsApp Button — Hero CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mb-12"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 sm:px-14 py-5 sm:py-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg sm:text-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] whatsapp-btn-glow"
          >
            {/* Pulse ring behind button */}
            <span className="absolute inset-0 rounded-2xl whatsapp-pulse-ring" />

            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 group-hover:rotate-12 transition-transform duration-300" />
            <span>Contáctanos por WhatsApp</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>

        {/* Trust indicators row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-10"
        >
          {[
            { icon: Phone, text: 'Respuesta en minutos' },
            { icon: Check, text: 'Sin compromiso' },
            { icon: Shield, text: 'Consultoría gratuita' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#10b981]/10 border border-[#10b981]/15 flex items-center justify-center">
                <item.icon className="w-3.5 h-3.5 text-[#10b981]" />
              </div>
              <span className="text-sm text-[#94a3b8]">{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <div className="executive-divider mb-5 max-w-xs mx-auto" />
          <p className="text-xs font-medium tracking-wider uppercase text-[#7d9a8a]/50">
            BCForge — Consultoría para Eficiencia Empresarial · Socios Expertos Microsoft 365
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Main Page ─── */
export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const mounted = useMounted()

  const handleNavigate = useCallback((index: number) => {
    const container = containerRef.current
    if (!container) return
    const sections = container.querySelectorAll('.snap-section')
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const container = containerRef.current
    if (!container) return

    const sections = container.querySelectorAll('.snap-section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target)
            if (index !== -1) setActiveSection(index)
          }
        })
      },
      { root: container, threshold: 0.5 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        handleNavigate(Math.min(activeSection + 1, 2))
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        handleNavigate(Math.max(activeSection - 1, 0))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection, handleNavigate, mounted])

  const handleCTA = () => {
    handleNavigate(2)
  }

  return (
    <>
      <GearBackground activeSlide={activeSection} />
      {mounted && <NavDots active={activeSection} onNavigate={handleNavigate} />}
      <div ref={containerRef} className="snap-container">
        <SlideExecutiveHook onCTA={handleCTA} />
        <SlideValueProposition />
        <SlideCallToAction />
      </div>
    </>
  )
}
