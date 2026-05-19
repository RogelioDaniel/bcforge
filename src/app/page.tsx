'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  Building2,
  Cable,
  Cog,
  Database,
  FileSpreadsheet,
  Gauge,
  LayoutDashboard,
  Mail,
  MessageSquare,
  RefreshCw,
  Rocket,
  ScrollText,
  Shield,
  Smartphone,
  Zap,
  CheckCircle2,
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Code2,
  BarChart3,
  Workflow,
  Globe,
  Layers,
  Clock,
  Users,
  TrendingUp,
  Settings,
  Plug,
  Package,
  Factory,
  DollarSign,
  Truck,
  ShoppingCart,
  FileText,
  PieChart,
  Cloud,
  Lock,
  HeadphonesIcon,
  Target,
  Lightbulb,
  Handshake,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'

/* ─── Animated Counter ─── */
function Counter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

/* ─── Section Wrapper with Fade In ─── */
function FadeInSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Data ─── */
const bcModules = [
  {
    icon: DollarSign,
    title: 'Finanzas',
    description: 'Contabilidad, cuentas por cobrar y pagar, presupuestos, conciliaciones bancarias, flujo de caja y cierres contables automáticos.',
    tags: ['Contabilidad', 'CxC/CxP', 'Flujo de Efectivo'],
  },
  {
    icon: ShoppingCart,
    title: 'Ventas',
    description: 'Seguimiento de clientes, pedidos, cotizaciones, facturación electrónica, devoluciones, comisiones y condiciones comerciales.',
    tags: ['Cotizaciones', 'Pedidos', 'Facturación'],
  },
  {
    icon: Package,
    title: 'Compras',
    description: 'Solicitudes de compra, control de proveedores, órdenes de compra, recepción de mercancías, facturación y pagos automatizados.',
    tags: ['Proveedores', 'Órdenes', 'Pagos'],
  },
  {
    icon: Database,
    title: 'Inventario y Almacenes',
    description: 'Control de entradas y salidas en tiempo real, ubicaciones, trazabilidad, transferencias, ajustes y reservas de inventario.',
    tags: ['Stock', 'Trazabilidad', 'Almacenes'],
  },
  {
    icon: Factory,
    title: 'Producción',
    description: 'Control de procesos y costos de producción, materiales, órdenes de trabajo, rutas de fabricación y planificación de capacidad.',
    tags: ['Órdenes', 'Materiales', 'Costos'],
  },
  {
    icon: Truck,
    title: 'Logística y Envíos',
    description: 'Gestión de remisiones, rastreo de envíos, integración con paqueterías, planificación de rutas y confirmación de entregas.',
    tags: ['Envíos', 'Rastreo', 'Paquetería'],
  },
  {
    icon: FileText,
    title: 'Reportes e Inteligencia',
    description: 'Análisis interactivos, KPIs en tiempo real, dashboards ejecutivos, integración nativa con Power BI y exportación automática.',
    tags: ['Power BI', 'KPIs', 'Dashboards'],
  },
  {
    icon: PieChart,
    title: 'Gestión de Proyectos',
    description: 'Planeación, asignación de recursos, seguimiento de tiempos y costos, facturación por proyecto y análisis de rentabilidad.',
    tags: ['Recursos', 'Tiempos', 'Rentabilidad'],
  },
]

const automationIdeas = [
  {
    icon: RefreshCw,
    title: 'Sincronización Automática de Inventario',
    description: 'Conecta Business Central con tu e-commerce, marketplace o sistema de almacén para actualizar existencias en tiempo real sin intervención manual.',
    tags: ['Inventario', 'E-commerce', 'Tiempo Real'],
  },
  {
    icon: ScrollText,
    title: 'Facturación Electrónica Automática (CFDI)',
    description: 'Genera y envía facturas electrónicas directamente desde Business Central. Cumple con requisitos fiscales del SAT de forma automática.',
    tags: ['Facturación', 'SAT/CFDI', 'Compliance'],
  },
  {
    icon: Bot,
    title: 'Notificaciones Inteligentes con Power Automate',
    description: 'Flujos automáticos que notifican cuando un pedido se retrasa, el inventario baja, o un cliente requiere seguimiento.',
    tags: ['Power Automate', 'Alertas', 'Workflows'],
  },
  {
    icon: FileSpreadsheet,
    title: 'Reportes Financieros Automatizados',
    description: 'Genera reportes de ventas, flujo de caja y estados financieros automáticamente cada semana o mes y envíalos por correo.',
    tags: ['Reportes', 'Finanzas', 'Email'],
  },
  {
    icon: MessageSquare,
    title: 'Integración WhatsApp Business',
    description: 'Envía confirmaciones de pedido, estados de envío y cotizaciones directamente por WhatsApp desde Business Central.',
    tags: ['WhatsApp', 'Comunicación', 'Ventas'],
  },
  {
    icon: Database,
    title: 'Migración y Limpieza de Datos',
    description: 'Automatiza la importación de catálogos, clientes y proveedores desde Excel, sistemas legacy u otras bases de datos.',
    tags: ['Migración', 'Datos', 'Importación'],
  },
  {
    icon: Mail,
    title: 'Campañas de Email Automatizadas',
    description: 'Segmenta clientes en Business Central y dispara campañas de email personalizadas según su historial de compras.',
    tags: ['Email Marketing', 'Segmentación', 'CRM'],
  },
  {
    icon: RefreshCw,
    title: 'Conciliación Bancaria Automática',
    description: 'Importa estados de cuenta automáticamente y concilia transacciones con tus registros contables sin intervención manual.',
    tags: ['Bancos', 'Conciliación', 'Contabilidad'],
  },
]

const developmentIdeas = [
  {
    icon: Smartphone,
    title: 'App Móvil de Campo',
    description: 'Aplicación personalizada para vendedores o técnicos que se conecta en tiempo real con Business Central para crear pedidos, consultar inventario y registrar visitas.',
    color: 'emerald',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard Ejecutivo a Medida',
    description: 'Panel de control con KPIs específicos de tu industria: ventas por región, margen por producto, cumplimiento de metas y pronósticos basados en IA.',
    color: 'amber',
  },
  {
    icon: Plug,
    title: 'Conector Personalizado con CRM',
    description: 'Integración bidireccional entre Business Central y tu CRM (HubSpot, Salesforce) para sincronizar clientes, oportunidades y pedidos.',
    color: 'emerald',
  },
  {
    icon: Shield,
    title: 'Portal de Proveedores',
    description: 'Portal web donde tus proveedores consultan órdenes de compra, suben facturas y dan seguimiento a pagos, conectado a Business Central.',
    color: 'amber',
  },
  {
    icon: Gauge,
    title: 'Sistema de Costos Avanzado',
    description: 'Extensión para manejo de costos por proyecto, centros de costo múltiples, y simulaciones de escenarios financieros.',
    color: 'emerald',
  },
  {
    icon: Globe,
    title: 'Integración con Plataformas de Envío',
    description: 'Conecta Business Central con DHL, FedEx, Estafeta y otras paqueterías para generar guías, rastrear envíos y calcular costos.',
    color: 'amber',
  },
  {
    icon: BarChart3,
    title: 'Predictor de Demanda con IA',
    description: 'Extensión que analiza historial de ventas y tendencias para sugerir niveles óptimos de reabastecimiento y pronósticos de demanda.',
    color: 'emerald',
  },
  {
    icon: Building2,
    title: 'Multi-sucursal Centralizada',
    description: 'Gestión de múltiples sucursales con consolidación automática, transferencias inter-sucursal y reportes comparativos.',
    color: 'amber',
  },
]

const bcBenefits = [
  {
    icon: Cloud,
    title: '100% en la Nube',
    description: 'Accede desde cualquier lugar y dispositivo. Seguridad y respaldo garantizados por Microsoft Azure.',
  },
  {
    icon: Lock,
    title: 'Seguridad Empresarial',
    description: 'Tus datos protegidos con la seguridad y garantía de Microsoft. Cumplimiento de normativas internacionales.',
  },
  {
    icon: Zap,
    title: 'Implementación Rápida',
    description: 'Puesta en marcha en semanas, no meses. Metodología probada para que operes lo antes posible.',
  },
  {
    icon: Target,
    title: 'Se Adapta a Tu Negocio',
    description: 'No tú al sistema. Business Central se personaliza a tus procesos con extensiones y desarrollo a medida.',
  },
  {
    icon: Lightbulb,
    title: 'Inteligencia Integrada',
    description: 'Sugerencias de IA, análisis predictivo y recomendaciones inteligentes para mejores decisiones.',
  },
  {
    icon: Handshake,
    title: 'Ecosistema Microsoft',
    description: 'Integración nativa con Outlook, Excel, Word, Teams, Power BI, Power Automate y más.',
  },
]

const services = [
  {
    icon: Settings,
    title: 'Implementación',
    description: 'Despliegue completo de Business Central adaptado a tus procesos. Desde la configuración inicial hasta la puesta en producción.',
  },
  {
    icon: Code2,
    title: 'Desarrollo a Medida',
    description: 'Extensiones y personalizaciones en AL que se adaptan exactamente a lo que tu negocio necesita. Sin límites.',
  },
  {
    icon: Cable,
    title: 'Integraciones',
    description: 'Conecta Business Central con tus herramientas: e-commerce, CRM, bancarios, paquetería, SAT y más.',
  },
  {
    icon: Workflow,
    title: 'Automatización',
    description: 'Flujos de trabajo con Power Automate que eliminan tareas repetitivas y reducen errores humanos.',
  },
  {
    icon: BarChart3,
    title: 'Business Intelligence',
    description: 'Reportes y dashboards con Power BI conectados a Business Central para decisiones basadas en datos.',
  },
  {
    icon: Users,
    title: 'Capacitación',
    description: 'Formación a tu equipo para que saque el máximo provecho de Business Central. Talleres prácticos y documentación.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Soporte Continuo',
    description: 'Acompañamiento post-implementación con soporte técnico, actualizaciones y mejoras continuas.',
  },
  {
    icon: Truck,
    title: 'Migración de Datos',
    description: 'Importamos tu información de sistemas legacy, Excel u otros ERPs a Business Central de forma segura.',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Diagnóstico',
    description: 'Analizamos tus procesos actuales, identificamos cuellos de botella y áreas de oportunidad.',
    icon: Building2,
  },
  {
    step: '02',
    title: 'Propuesta',
    description: 'Diseñamos una solución a medida con roadmap claro, tiempos y costos transparentes.',
    icon: ScrollText,
  },
  {
    step: '03',
    title: 'Desarrollo',
    description: 'Construimos con metodología ágil, entregas incrementales y validación continua contigo.',
    icon: Code2,
  },
  {
    step: '04',
    title: 'Despliegue',
    description: 'Puesta en producción con migración de datos, capacitación y soporte post-implementación.',
    icon: Rocket,
  },
]

const testimonials = [
  {
    name: 'Miguel Ángel Vargas',
    role: 'Director de Operaciones',
    company: 'LogiMax',
    text: 'BCForge automatizó todo nuestro proceso de facturación electrónica. Lo que antes nos tomaba 3 horas al día ahora se hace solo. Increíble.',
  },
  {
    name: 'Carolina Mendez',
    role: 'Gerente Financiera',
    company: 'Distribuidora del Norte',
    text: 'La integración con nuestro e-commerce fue impecable. Ahora el inventario se actualiza en tiempo real y los errores de existencias desaparecieron.',
  },
  {
    name: 'Roberto Sánchez',
    role: 'CEO',
    company: 'TechParts MX',
    text: 'El dashboard ejecutivo que nos desarrollaron cambió la forma en que tomamos decisiones. Ahora tenemos visibilidad total del negocio en una pantalla.',
  },
  {
    name: 'Ana Lucía Hernández',
    role: 'Coordinadora de Ventas',
    company: 'Grupo Alimentos',
    text: 'Las notificaciones automáticas por WhatsApp mejoraron nuestra atención al cliente. Los pedidos se confirman al instante sin intervención manual.',
  },
  {
    name: 'Fernando Morales',
    role: 'Director Comercial',
    company: 'AutoPartes Express',
    text: 'La app móvil para vendedores de campo fue un game changer. Nuestro equipo ahora captura pedidos en visita y llegan directo a Business Central.',
  },
  {
    name: 'Patricia Ruiz',
    role: 'Contralora',
    company: 'Industrias del Bajío',
    text: 'El sistema de costos avanzado que nos desarrollaron nos permite simular escenarios y tomar mejores decisiones financieras. Soporte de primer nivel.',
  },
]

/* ─── Main Page ─── */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          interests: selectedInterests,
        }),
      })

      if (!response.ok) {
        throw new Error('Error al enviar')
      }

      setFormStatus('sent')
      setFormData({ name: '', company: '', email: '', phone: '', message: '' })
      setSelectedInterests([])
      setTimeout(() => setFormStatus('idle'), 4000)
    } catch {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  }

  const interestOptions = ['Implementación', 'Desarrollo a medida', 'Automatización', 'Integración', 'Business Intelligence', 'Capacitación', 'Migración de datos', 'Soporte']

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Cog className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                BC<span className="text-primary">Forge</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {[
                { href: '#modulos', label: 'Módulos BC' },
                { href: '#automatizaciones', label: 'Automatizaciones' },
                { href: '#desarrollos', label: 'Desarrollos' },
                { href: '#servicios', label: 'Servicios' },
                { href: '#proceso', label: 'Proceso' },
                { href: '#contacto', label: 'Contacto' },
              ].map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                <a href="#contacto">
                  Cotización gratis
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-3">
                {['Módulos BC', 'Automatizaciones', 'Desarrollos', 'Servicios', 'Proceso', 'Contacto'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-').replace('ó', 'o')}`}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-2">
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90" asChild>
                    <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>Cotización gratis</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <Badge variant="secondary" className="mb-6 px-3 py-1 text-xs font-medium">
                <Sparkles className="w-3 h-3 mr-1" />
                Consultoría Business Central
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Forjamos la{' '}
                <span className="gradient-text">automatización</span>{' '}
                que tu negocio necesita
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Consultoría especializada en Microsoft Business Central. Automatizamos procesos, desarrollamos soluciones a medida e integramos las herramientas que tu empresa usa todos los días.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-base px-8" asChild>
                  <a href="#contacto">
                    Comenzar ahora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="text-base px-8" asChild>
                  <a href="#modulos">
                    Ver módulos BC
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-8 text-sm text-muted-foreground">
                {['Sin compromiso', 'Diagnóstico gratis', 'Soporte incluido'].map((text) => (
                  <div key={text} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-15">
                  <Image src="/hero-illustration.png" alt="Business Central Automation" fill className="object-cover" priority />
                </div>
                <div className="relative bg-card/95 border border-border rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="ml-2 text-xs text-muted-foreground">Business Central — Dashboard</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { label: 'Ingresos', value: '$2.4M', change: '+18.3%', icon: TrendingUp },
                      { label: 'Pedidos', value: '1,247', change: '+12.5%', icon: ScrollText },
                      { label: 'Inventario', value: '98.2%', change: '+2.1%', icon: Database },
                      { label: 'Clientes Activos', value: '834', change: '+8.7%', icon: Users },
                    ].map((item) => (
                      <div key={item.label} className="bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">{item.label}</span>
                          <item.icon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <p className="text-lg font-bold">{item.value}</p>
                        <span className="text-xs text-emerald-600 font-medium">{item.change}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium">Flujo de Ventas</span>
                      <span className="text-xs text-muted-foreground">Últimos 7 días</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[40, 55, 35, 65, 50, 75, 60].map((h, i) => (
                        <motion.div key={i} className="flex-1 rounded-sm bg-primary/70" initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }} />
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">12 automatizaciones activas</span>
                    <span className="text-xs text-muted-foreground ml-auto">hace 2 min</span>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="py-16 border-y border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 150, suffix: '+', label: 'Proyectos entregados', icon: Rocket },
              { value: 98, suffix: '%', label: 'Satisfacción del cliente', icon: CheckCircle2 },
              { value: 40, suffix: '%', label: 'Reducción procesos manuales', icon: Zap },
              { value: 50, suffix: '+', label: 'Integraciones realizadas', icon: Cable },
            ].map((stat, i) => (
              <FadeInSection key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <stat.icon className="w-6 h-6 mx-auto mb-3 text-primary" />
                  <p className="text-3xl md:text-4xl font-bold"><Counter target={stat.value} suffix={stat.suffix} /></p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BC Modules Section (from erp365 inspiration) ─── */}
      <section id="modulos" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Layers className="w-3 h-3 mr-1" />
                Módulos de Business Central
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Todo tu negocio en{' '}
                <span className="gradient-text">un solo sistema</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Business Central integra finanzas, ventas, compras, inventario, producción y más. Conoce sus módulos principales.
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {bcModules.map((mod, i) => (
              <FadeInSection key={mod.title} delay={i * 0.06}>
                <Card className="group h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <mod.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold mb-1.5 group-hover:text-primary transition-colors">{mod.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{mod.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {mod.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Visual Bridge ─── */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            <Image src="/automation-illustration.png" alt="Automatización con Business Central" width={1344} height={768} className="w-full h-auto object-cover rounded-2xl" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent rounded-2xl" />
            <div className="absolute inset-0 flex items-center p-8 md:p-12">
              <div className="max-w-md">
                <FadeInSection>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    Tu operación puede ser{' '}
                    <span className="gradient-text">10x más eficiente</span>
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Cada proceso manual que automatizamos es tiempo que tu equipo recupera para enfocarse en lo que realmente importa.
                  </p>
                  <Button className="bg-primary hover:bg-primary/90" asChild>
                    <a href="#contacto">
                      Agenda tu diagnóstico gratis
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </FadeInSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BC Benefits (from erp365 inspiration) ─── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                ¿Por qué Business Central?
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Beneficios de{' '}
                <span className="gradient-text">Dynamics 365 BC</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Una plataforma completa y personalizable para mejorar la productividad de tu empresa.
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bcBenefits.map((benefit, i) => (
              <FadeInSection key={benefit.title} delay={i * 0.08}>
                <Card className="group h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <benefit.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Automation Ideas ─── */}
      <section id="automatizaciones" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-3 h-3 mr-1" />
                Automatizaciones
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ideas que puedes{' '}
                <span className="gradient-text">automatizar</span>{' '}
                hoy
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Estas son solo algunas de las automatizaciones que podemos implementar para ahorrar tiempo y reducir errores.
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {automationIdeas.map((idea, i) => (
              <FadeInSection key={idea.title} delay={i * 0.06}>
                <Card className="group h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <idea.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold mb-1.5 group-hover:text-primary transition-colors">{idea.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{idea.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {idea.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Development Ideas ─── */}
      <section id="desarrollos" className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Code2 className="w-3 h-3 mr-1" />
                Desarrollos Nuevos
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ideas para{' '}
                <span className="gradient-text">desarrollar</span>{' '}
                en tu Business Central
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Más allá de automatizar, podemos crear nuevas funcionalidades que Business Central no trae por defecto.
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {developmentIdeas.map((idea, i) => (
              <FadeInSection key={idea.title} delay={i * 0.06}>
                <Card className="group h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className={`h-1.5 ${idea.color === 'emerald' ? 'bg-primary' : 'bg-accent'}`} />
                  <CardContent className="p-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      idea.color === 'emerald' ? 'bg-primary/10 group-hover:bg-primary/20' : 'bg-accent/10 group-hover:bg-accent/20'
                    }`}>
                      <idea.icon className={`w-5 h-5 ${idea.color === 'emerald' ? 'text-primary' : 'text-accent'}`} />
                    </div>
                    <h3 className="text-sm font-semibold mb-1.5">{idea.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{idea.description}</p>
                    <div className="mt-3 flex items-center text-xs text-primary font-medium group-hover:gap-2 transition-all">
                      <span>Saber más</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section id="servicios" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Settings className="w-3 h-3 mr-1" />
                Servicios
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nuestros servicios de{' '}
                <span className="gradient-text">consultoría</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Acompañamos tu transformación digital con Business Central de principio a fin.
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <FadeInSection key={service.title} delay={i * 0.06}>
                <Card className="group h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <service.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-sm font-semibold mb-1">{service.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section id="proceso" className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Clock className="w-3 h-3 mr-1" />
                Proceso
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Así es como{' '}
                <span className="gradient-text">trabajamos</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Un proceso claro y transparente para que siempre sepas en qué punto estamos.
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <FadeInSection key={step.step} delay={i * 0.15}>
                <div className="relative text-center">
                  {i < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
                  )}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary mb-1 block">{step.step}</span>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <MessageSquare className="w-3 h-3 mr-1" />
                Testimonios
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Lo que dicen nuestros{' '}
                <span className="gradient-text">clientes</span>
              </h2>
            </div>
          </FadeInSection>

          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="text-5xl text-primary/20 mb-4">&ldquo;</div>
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 italic">
                  {testimonials[activeTestimonial].text}
                </p>
                <div>
                  <p className="font-semibold">{testimonials[activeTestimonial].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[activeTestimonial].role} · {testimonials[activeTestimonial].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeTestimonial ? 'w-6 bg-primary' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-12">
            {testimonials.slice(0, 3).map((t, i) => (
              <FadeInSection key={t.name} delay={i * 0.1}>
                <Card className="h-full">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-medium">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section id="contacto" className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeInSection>
              <Badge variant="secondary" className="mb-4">
                <Mail className="w-3 h-3 mr-1" />
                Contacto
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Listo para{' '}
                <span className="gradient-text">transformar</span>{' '}
                tu operación?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Cuéntanos sobre tu negocio y te mostraremos cómo Business Central puede trabajar para ti. Diagnóstico y cotización sin compromiso.
              </p>

              <div className="space-y-6">
                {[
                  { icon: CheckCircle2, label: 'Respuesta en menos de 24 horas', text: 'Revisamos tu solicitud y te contactamos personalmente' },
                  { icon: Target, label: 'Diagnóstico sin costo', text: 'Analizamos tus procesos sin compromiso y te damos recomendaciones' },
                  { icon: Users, label: 'Atención personalizada', text: 'Un consultor especializado te acompaña desde el día uno' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">¿Prefieres agendar una llamada?</strong> Completa el formulario y selecciona &ldquo;Solicito llamada&rdquo; en el mensaje. Te contactamos en tu horario preferido.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <Card className="border-border/50 shadow-xl">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-1">Solicita tu cotización</h3>
                  <p className="text-sm text-muted-foreground mb-6">Completa el formulario y te contactamos en menos de 24 horas.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="text-sm font-medium mb-1.5 block">Nombre *</label>
                        <Input id="name" placeholder="Tu nombre" required value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} />
                      </div>
                      <div>
                        <label htmlFor="company" className="text-sm font-medium mb-1.5 block">Empresa</label>
                        <Input id="company" placeholder="Tu empresa" value={formData.company} onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email *</label>
                      <Input id="email" type="email" placeholder="tu@email.com" required value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium mb-1.5 block">Teléfono</label>
                      <Input id="phone" type="tel" placeholder="+52 (55) 1234-5678" value={formData.phone} onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">¿Qué te interesa?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {interestOptions.map((s) => (
                          <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
                            <Checkbox checked={selectedInterests.includes(s)} onCheckedChange={() => toggleInterest(s)} />
                            <span>{s}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="text-sm font-medium mb-1.5 block">Cuéntanos sobre tu proyecto</label>
                      <Textarea id="message" placeholder="Describe brevemente lo que necesitas..." rows={3} value={formData.message} onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))} />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90" disabled={formStatus === 'sending'}>
                      {formStatus === 'sending' ? (
                        <><RefreshCw className="w-4 h-4 mr-2 animate-spin" />Enviando...</>
                      ) : formStatus === 'sent' ? (
                        <><CheckCircle2 className="w-4 h-4 mr-2" />¡Enviado! Te contactamos pronto</>
                      ) : formStatus === 'error' ? (
                        <>Error al enviar. Intenta de nuevo.</>
                      ) : (
                        <>Enviar solicitud<ArrowRight className="w-4 h-4 ml-2" /></>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border/50 bg-muted/30 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Cog className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  BC<span className="text-primary">Forge</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Consultoría especializada en Microsoft Business Central. Automatización, desarrollo e integraciones.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Servicios</h4>
              <ul className="space-y-2">
                {['Implementación', 'Desarrollo a medida', 'Automatización', 'Integraciones', 'Business Intelligence', 'Capacitación', 'Soporte', 'Migración'].map((item) => (
                  <li key={item}><a href="#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Módulos BC</h4>
              <ul className="space-y-2">
                {['Finanzas', 'Ventas', 'Compras', 'Inventario', 'Producción', 'Logística', 'Reportes', 'Proyectos'].map((item) => (
                  <li key={item}><a href="#modulos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Contáctanos</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Escríbenos por el formulario y te respondemos en menos de 24 horas.
              </p>
              <Button size="sm" variant="outline" asChild>
                <a href="#contacto">Ir al formulario</a>
              </Button>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} BCForge. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Aviso de privacidad</a>
              <a href="#" className="hover:text-foreground transition-colors">Términos</a>
              <span>Partner certificado Microsoft</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
