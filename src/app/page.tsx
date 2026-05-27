'use client'

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Zap,
  BarChart3,
  ChevronDown,
  Check,
  Send,
  Workflow,
  Layers,
  Shield,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
    subtitle: 'Enterprise Resource Planning',
    description: 'Unified financial operations, supply chain, and project management — deployed in half the time.',
    metrics: ['50% faster deployment', 'Unified operations', 'Real-time visibility'],
  },
  {
    icon: Workflow,
    title: 'Power Automate',
    subtitle: 'Intelligent Workflow Automation',
    description: 'Eliminate manual processes. Our automations convert administrative overhead into operational velocity.',
    metrics: ['80% less manual work', 'Zero-error processing', '24/7 execution'],
  },
  {
    icon: Zap,
    title: 'Power Apps',
    subtitle: 'Custom Enterprise Applications',
    description: 'Purpose-built apps that integrate seamlessly with your Microsoft 365 ecosystem.',
    metrics: ['60% cost reduction', 'Rapid deployment', 'Native integration'],
  },
]

const goalOptions = [
  'Migration to Business Central',
  'Process Automation',
  'System Integration',
  'Custom Application Development',
  'Performance Optimization',
  'General Consultation',
]

/* ─── Navigation Dots ─── */
function NavDots({ active, onNavigate }: { active: number; onNavigate: (i: number) => void }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {[0, 1, 2].map((i) => (
        <button
          key={i}
          className={`nav-dot ${active === i ? 'active' : ''}`}
          onClick={() => onNavigate(i)}
          aria-label={`Go to section ${i + 1}`}
        />
      ))}
    </div>
  )
}

/* ─── Section 1: Executive Hook ─── */
function SlideExecutiveHook({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="snap-section relative flex items-center justify-center overflow-hidden">
      {/* Frosted glass overlay — vidrio templado effect */}
      <div className="absolute inset-0 frosted-glass-overlay glass-edge-glow" />
      {/* Extra gradient for readability on left side */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060d1b]/70 via-transparent to-transparent" />

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
              <div className="w-1.5 h-1.5 rounded-full bg-[#4f8fff] animate-pulse-subtle" />
              <span className="text-xs font-medium tracking-wider uppercase text-[#7d8fa8]">Microsoft 365 Expert Partners</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
          >
            Business Central Performance:{' '}
            <span className="gradient-text">Double the Velocity,</span>{' '}
            Half the Cost.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-[#7d8fa8] leading-relaxed max-w-2xl mb-10"
          >
            We leverage proprietary AI within the Microsoft 365 ecosystem to accelerate deployment and maximize financial efficiency.
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
              className="bg-[#4f8fff] hover:bg-[#3b7eee] text-white font-semibold text-base px-8 h-13 rounded-lg hover:shadow-lg hover:shadow-[#4f8fff]/20 transition-all duration-300"
            >
              Request Free Project Evaluation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <div className="flex items-center gap-6 text-sm text-[#7d8fa8]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#4f8fff]" />
                <span>No commitment</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#4f8fff]" />
                <span>48-hour response</span>
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
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#7d8fa8]/60">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-[#7d8fa8]/40" />
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

      {/* Content - scrollable within snap section */}
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
            <Sparkles className="w-3 h-3 text-[#4f8fff]" />
            <span className="text-[11px] font-medium tracking-wider uppercase text-[#7d8fa8]">Strategic Value</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            We don&apos;t just develop.{' '}
            <span className="gradient-text">We optimize.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#7d8fa8] max-w-2xl mx-auto leading-relaxed">
            Our internal AI-driven framework slashes traditional project timelines by 50% — delivering measurable ROI from day one.
          </p>
        </motion.div>

        {/* Value Pillars - Compact */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {valuePillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group frosted-glass-content rounded-xl p-5 hover:border-[#4f8fff]/20 transition-all duration-500 glass-edge-glow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#4f8fff]/10 border border-[#4f8fff]/15 flex items-center justify-center group-hover:bg-[#4f8fff]/15 transition-colors duration-300">
                  <pillar.icon className="w-4 h-4 text-[#4f8fff]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{pillar.title}</h3>
                  <p className="text-[10px] text-[#7d8fa8]">{pillar.subtitle}</p>
                </div>
              </div>
              <p className="text-xs text-[#7d8fa8] leading-relaxed mb-3">{pillar.description}</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {pillar.metrics.map((metric) => (
                  <div key={metric} className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-[#4f8fff]" />
                    <span className="text-[10px] font-medium text-[#94a3b8]">{metric}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pain Point Banner - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative rounded-xl overflow-hidden mb-8 frosted-glass-content glass-edge-glow"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#4f8fff]/[0.06] to-[#60a5fa]/[0.03]" />
          <div className="absolute inset-0 border border-[#4f8fff]/10 rounded-xl" />
          <div className="relative p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#4f8fff]/10 border border-[#4f8fff]/15 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-[#4f8fff]" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold mb-0.5">Eliminate Friction. Accelerate Growth.</h3>
              <p className="text-xs text-[#7d8fa8] leading-relaxed">
                We eliminate friction in financial operations and compliance workflows, transforming administrative bottlenecks into streamlined profit centers.
              </p>
            </div>
            <Shield className="w-6 h-6 text-[#4f8fff]/20 shrink-0 hidden sm:block" />
          </div>
        </motion.div>

        {/* Executive Charts */}
        <ExecutiveChartsSection />
      </div>
    </section>
  )
}

/* ─── Section 3: High-Conversion CTA ─── */
function SlideCallToAction() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    goal: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          message: formData.goal ? `Primary Goal: ${formData.goal}` : '',
          interests: formData.goal ? [formData.goal] : [],
        }),
      })

      if (!response.ok) throw new Error('Error al enviar')

      setFormStatus('sent')
      setFormData({ name: '', company: '', email: '', goal: '' })
      setTimeout(() => setFormStatus('idle'), 5000)
    } catch {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  }

  return (
    <section className="snap-section relative flex items-center justify-center overflow-hidden">
      {/* Frosted glass overlay */}
      <div className="absolute inset-0 frosted-glass-overlay glass-edge-glow" />
      {/* Extra gradient for form side */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#060d1b]/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-md mb-6">
              <BarChart3 className="w-3 h-3 text-[#4f8fff]" />
              <span className="text-[11px] font-medium tracking-wider uppercase text-[#7d8fa8]">Free Audit</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-[1.1]">
              Secure Your Free{' '}
              <span className="gradient-text">Automation Audit.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#7d8fa8] leading-relaxed mb-8 max-w-md">
              Let&apos;s analyze your current migration, automation, or integration requirements. Discover how to cut operational time in half.
            </p>

            {/* Trust indicators */}
            <div className="space-y-4 mb-8">
              {[
                'Comprehensive process analysis within 48 hours',
                'Actionable roadmap with measurable ROI projections',
                'No commitment — pure strategic insight',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#4f8fff]/10 border border-[#4f8fff]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#4f8fff]" />
                  </div>
                  <span className="text-sm text-[#94a3b8]">{item}</span>
                </div>
              ))}
            </div>

            {/* Closing statement */}
            <div className="executive-divider mb-4" />
            <p className="text-xs font-medium tracking-wider uppercase text-[#7d8fa8]/60">
              Consultancy for Enterprise Efficiency — Microsoft 365 Expert Partners
            </p>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="frosted-glass-content glass-edge-glow rounded-2xl p-6 sm:p-8">
              {formStatus === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#4f8fff]/10 border border-[#4f8fff]/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-[#4f8fff]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Evaluation Request Received</h3>
                  <p className="text-sm text-[#7d8fa8]">Our team will be in touch within 48 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-xs font-medium text-[#94a3b8] mb-1.5 block">Full Name *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Mitchell"
                      className="h-11 bg-white/[0.04] border-white/[0.08] rounded-lg placeholder:text-[#7d8fa8]/40 focus:border-[#4f8fff]/30 focus:ring-[#4f8fff]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#94a3b8] mb-1.5 block">Company</label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Acme Corporation"
                      className="h-11 bg-white/[0.04] border-white/[0.08] rounded-lg placeholder:text-[#7d8fa8]/40 focus:border-[#4f8fff]/30 focus:ring-[#4f8fff]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#94a3b8] mb-1.5 block">Business Email *</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john@company.com"
                      className="h-11 bg-white/[0.04] border-white/[0.08] rounded-lg placeholder:text-[#7d8fa8]/40 focus:border-[#4f8fff]/30 focus:ring-[#4f8fff]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#94a3b8] mb-1.5 block">Primary Goal</label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
                      className="executive-select w-full h-11 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-foreground focus:border-[#4f8fff]/30 focus:ring-1 focus:ring-[#4f8fff]/10 focus:outline-none transition-all"
                    >
                      <option value="" className="bg-[#0c1829]">Select your primary objective</option>
                      {goalOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0c1829]">{opt}</option>
                      ))}
                    </select>
                  </div>

                  <Button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full h-12 bg-[#4f8fff] hover:bg-[#3b7eee] text-white font-semibold text-base rounded-lg hover:shadow-lg hover:shadow-[#4f8fff]/20 transition-all duration-300 mt-2"
                  >
                    {formStatus === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Processing...
                      </span>
                    ) : formStatus === 'error' ? (
                      'Error — Please try again'
                    ) : (
                      <span className="flex items-center gap-2">
                        Request Free Audit
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>

                  <p className="text-[10px] text-[#7d8fa8]/50 text-center">
                    By submitting, you agree to receive communications from BCForge. No spam.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
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

  // Track active section via IntersectionObserver
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

  // Keyboard navigation
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
      {/* Fixed Three.js Gear Background — persists across all slides */}
      <GearBackground activeSlide={activeSection} />

      {/* Navigation dots */}
      {mounted && <NavDots active={activeSection} onNavigate={handleNavigate} />}

      {/* Snap scroll content — each section has its own frosted glass overlay */}
      <div ref={containerRef} className="snap-container">
        <SlideExecutiveHook onCTA={handleCTA} />
        <SlideValueProposition />
        <SlideCallToAction />
      </div>
    </>
  )
}
