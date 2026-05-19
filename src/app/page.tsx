'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  Building2,
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
  Globe as GlobeIcon,
  Layers,
  Clock,
  Users,
  TrendingUp,
  Plug,
  Package,
  Factory,
  DollarSign,
  Truck,
  ShoppingCart,
  FileText,
  PieChart,
  Target,
  Lightbulb,
  Send,
  Monitor,
  Server,
  HardDrive,
  ArrowRightLeft,
  CreditCard,
  Receipt,
  FileCheck,
  ClipboardCheck,
  Wrench,
  Activity,
  LineChart,
  BarChart2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Globe } from '@/components/Globe'
import Image from 'next/image'

/* ─── Mouse Light Effect (Desktop only) ─── */
function MouseLight() {
  const [pos, setPos] = useState({ x: -500, y: -500 })

  useEffect(() => {
    if (window.innerWidth <= 1024) return

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      className="pointer-events-none fixed z-[100] w-[300px] h-[300px] rounded-full opacity-[0.07] blur-[80px] bg-white hidden lg:block transition-transform duration-75"
      style={{
        left: pos.x - 150,
        top: pos.y - 150,
      }}
    />
  )
}

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
      {prefix}{count.toLocaleString()}{suffix}
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
    title: 'Inventario',
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
    title: 'Logística',
    description: 'Gestión de remisiones, rastreo de envíos, integración con paqueterías, planificación de rutas y confirmación de entregas.',
    tags: ['Envíos', 'Rastreo', 'Paquetería'],
  },
  {
    icon: FileText,
    title: 'Reportes / BI',
    description: 'Análisis interactivos, KPIs en tiempo real, dashboards ejecutivos, integración nativa con Power BI y exportación automática.',
    tags: ['Power BI', 'KPIs', 'Dashboards'],
  },
  {
    icon: PieChart,
    title: 'Proyectos',
    description: 'Planeación, asignación de recursos, seguimiento de tiempos y costos, facturación por proyecto y análisis de rentabilidad.',
    tags: ['Recursos', 'Tiempos', 'Rentabilidad'],
  },
]

const automationIdeas = [
  {
    icon: RefreshCw,
    title: 'Sincronización Automática de Inventario',
    description: 'Conecta Business Central con tu e-commerce, marketplace o sistema de almacén para actualizar existencias en tiempo real.',
    tags: ['Inventario', 'E-commerce', 'Tiempo Real'],
  },
  {
    icon: ScrollText,
    title: 'Facturación Electrónica Automática (CFDI)',
    description: 'Genera y envía facturas electrónicas directamente desde Business Central. Cumple con requisitos fiscales del SAT.',
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
    description: 'Aplicación personalizada para vendedores o técnicos que se conecta en tiempo real con Business Central para crear pedidos y consultar inventario.',
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
    icon: GlobeIcon,
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

const licensePricing = [
  {
    name: 'Essentials',
    price: '$80',
    unit: 'USD/usuario/mes',
    storage: '3GB almacenamiento',
    description: 'Gestión financiera, ventas, compras, inventario y proyectos.',
    features: ['Finanzas', 'Ventas', 'Compras', 'Inventario', 'Proyectos'],
    popular: false,
  },
  {
    name: 'Premium',
    price: '$110',
    unit: 'USD/usuario/mes',
    storage: '5GB almacenamiento',
    description: 'Todo lo de Essentials más manufactura y gestión de servicio.',
    features: ['Todo Essentials', 'Manufactura', 'Servicio', 'Planificación'],
    popular: true,
  },
  {
    name: 'Team Member',
    price: '$8',
    unit: 'USD/usuario/mes',
    storage: 'Acceso limitado',
    description: 'Para usuarios que solo necesitan leer datos y aprobar documentos.',
    features: ['Lectura', 'Aprobaciones', 'Reportes básicos'],
    popular: false,
  },
  {
    name: 'Device',
    price: '$45',
    unit: 'USD/dispositivo/mes',
    storage: 'Para puntos de venta',
    description: 'Licencia por dispositivo para puntos de venta, almacén o producción.',
    features: ['Punto de venta', 'Almacén', 'Múltiples turnos'],
    popular: false,
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

const migrationSources = [
  { icon: Database, label: 'NAV' },
  { icon: FileSpreadsheet, label: 'Excel' },
  { icon: Server, label: 'SAP' },
  { icon: CreditCard, label: 'QuickBooks' },
  { icon: Monitor, label: 'Custom' },
]

const migrationSteps = [
  { icon: HardDrive, label: 'Extracción', desc: 'Exportamos tus datos' },
  { icon: ArrowRightLeft, label: 'Transformación', desc: 'Adaptamos al formato BC' },
  { icon: Database, label: 'Carga', desc: 'Importamos a Business Central' },
  { icon: ClipboardCheck, label: 'Validación', desc: 'Verificamos integridad' },
]

/* ─── Main Page ─── */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

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

  const navLinks = [
    { href: '#desarrollos', label: 'Desarrollos' },
    { href: '#sat', label: 'SAT' },
    { href: '#contacto', label: 'Contacto' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <MouseLight />

      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-emerald">
                <Cog className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                BC<span className="gradient-text">Forge</span>
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Button size="sm" className="bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300" asChild>
                <a href="#contacto">
                  Cotización gratis
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>

            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
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
              className="lg:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
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
      <section className="relative pt-24 pb-16 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <Badge variant="secondary" className="mb-6 px-3 py-1.5 text-xs font-medium border border-primary/20 bg-primary/5">
                <Sparkles className="w-3 h-3 mr-1 text-primary" />
                Consultoría Business Central
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                Forjamos la{' '}
                <span className="gradient-text">automatización</span>{' '}
                que tu negocio necesita
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Consultoría especializada en Microsoft Business Central. Automatizamos procesos, desarrollamos soluciones a medida e integramos las herramientas que tu empresa usa todos los días.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 text-base px-8 transition-all duration-300" asChild>
                  <a href="#contacto">
                    Comenzar ahora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="text-base px-8 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300" asChild>
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
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-10">
                  <Image src="/hero-illustration.png" alt="Business Central Automation" fill className="object-cover" priority />
                </div>
                <div className="relative bg-card/80 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 text-xs text-muted-foreground">Business Central — Dashboard</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { label: 'Ingresos', value: '$2.4M', change: '+18.3%', icon: TrendingUp },
                      { label: 'Pedidos', value: '1,247', change: '+12.5%', icon: ScrollText },
                      { label: 'Inventario', value: '98.2%', change: '+2.1%', icon: Database },
                      { label: 'Clientes Activos', value: '834', change: '+8.7%', icon: Users },
                    ].map((item) => (
                      <div key={item.label} className="bg-muted/30 border border-white/5 rounded-lg p-3 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">{item.label}</span>
                          <item.icon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <p className="text-lg font-bold">{item.value}</p>
                        <span className="text-xs text-emerald-500 font-medium">{item.change}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-muted/20 border border-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium">Flujo de Ventas</span>
                      <span className="text-xs text-muted-foreground">Últimos 7 días</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[40, 55, 35, 65, 50, 75, 60].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-sm bg-gradient-to-t from-primary/80 to-primary/40"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 bg-primary/5 border border-primary/10 rounded-lg p-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-medium text-primary">12 automatizaciones activas</span>
                    <span className="text-xs text-muted-foreground ml-auto">hace 2 min</span>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── BC Modules Section ─── */}
      <section id="modulos" className="py-20 md:py-28 relative">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 border border-primary/20 bg-primary/5">
                <Layers className="w-3 h-3 mr-1 text-primary" />
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

          <div className="max-w-3xl mx-auto space-y-3">
            {bcModules.map((mod, i) => (
              <FadeInSection key={mod.title} delay={i * 0.08}>
                <div className="group relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-primary/40 to-primary/10 group-hover:from-primary group-hover:to-primary/40 transition-all duration-500" />
                  <div className="pl-6 pr-4 py-4 bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl hover:border-primary/30 hover:bg-card/80 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:shadow-md group-hover:shadow-primary/10 transition-all duration-300">
                        <mod.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold group-hover:text-primary transition-colors">{mod.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5 line-clamp-2 group-hover:line-clamp-none transition-all">{mod.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 shrink-0">
                        {mod.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5 bg-primary/5 border border-primary/10">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Metrics & Customization Section ─── */}
      <section className="py-20 md:py-28 bg-muted/30 relative">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 border border-accent/20 bg-accent/5">
                <Activity className="w-3 h-3 mr-1 text-accent" />
                Métricas y Personalización
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Métricas que impulsan{' '}
                <span className="gradient-text">mejores decisiones</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Business Central te da KPIs y métricas en tiempo real para optimizar cada área de tu negocio. Cada empresa es única — BC se adapta.
              </p>
            </div>
          </FadeInSection>

          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            {/* Chart Mockups */}
            <FadeInSection>
              <div className="space-y-4">
                {/* Bar Chart */}
                <div className="bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Ventas por Mes</span>
                    </div>
                    <Badge variant="secondary" className="text-[10px] bg-primary/10 border border-primary/20">2024</Badge>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {[45, 62, 38, 78, 55, 90, 72, 85, 60, 95, 80, 88].map((h, i) => (
                      <div key={i} className="flex-1 relative group/bar cursor-pointer">
                        <motion.div
                          className="rounded-t bg-gradient-to-t from-primary/80 to-primary/30 hover:from-primary hover:to-primary/60 transition-colors duration-200 w-full"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.3 + i * 0.06, duration: 0.6, ease: 'easeOut' }}
                          style={{ minHeight: '4px' }}
                        />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-primary/20 rounded px-2 py-1 text-[10px] font-medium opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          ${h}K
                        </div>
                        {/* Subtle breathing animation after bar appears */}
                        <motion.div
                          className="absolute inset-0 rounded-t bg-primary/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.3, 0] }}
                          transition={{ delay: 1.5 + i * 0.1, duration: 2, repeat: Infinity, repeatDelay: 3 + i * 0.5 }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                    <span>Ene</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dic</span>
                  </div>
                </div>

                {/* Line Chart */}
                <div className="bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <LineChart className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">Tendencia de Ingresos</span>
                    </div>
                    <Badge variant="secondary" className="text-[10px] bg-accent/10 border border-accent/20">+23%</Badge>
                  </div>
                  <div className="relative h-24">
                    <svg className="w-full h-full" viewBox="0 0 400 80" fill="none">
                      <defs>
                        <linearGradient id="lineGrad" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="oklch(0.696 0.17 162.48)" />
                          <stop offset="100%" stopColor="oklch(0.769 0.188 70.08)" />
                        </linearGradient>
                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="80" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="oklch(0.696 0.17 162.48 / 20%)" />
                          <stop offset="100%" stopColor="oklch(0.696 0.17 162.48 / 0%)" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        d="M0,60 C50,55 80,45 120,40 C160,35 200,50 240,30 C280,10 320,25 360,15 L400,10"
                        stroke="url(#lineGrad)"
                        strokeWidth="2.5"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                      <motion.path
                        d="M0,60 C50,55 80,45 120,40 C160,35 200,50 240,30 C280,10 320,25 360,15 L400,10 L400,80 L0,80Z"
                        fill="url(#areaGrad)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.15, 0.08, 0.15] }}
                        transition={{ duration: 4, delay: 1, repeat: Infinity }}
                      />
                      {/* Animated dots at key points */}
                      {[[0,60],[120,40],[240,30],[400,10]].map(([x, y], idx) => (
                        <motion.circle
                          key={idx}
                          cx={x}
                          cy={y}
                          r="3"
                          fill="oklch(0.769 0.188 70.08)"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 2 + idx * 0.2, duration: 0.3 }}
                        />
                      ))}
                      {/* Pulsing dot at end */}
                      <motion.circle
                        cx="400"
                        cy="10"
                        r="4"
                        fill="oklch(0.769 0.188 70.08)"
                        animate={{ r: [4, 7, 4], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 3 }}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Metric Cards */}
            <FadeInSection delay={0.2}>
              <div className="space-y-4">
                <div className="bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center glow-emerald">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Crecimiento en Eficiencia</p>
                      <p className="text-3xl font-bold"><Counter target={40} suffix="%" /></p>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20">Promedio</Badge>
                  </div>
                </div>

                <div className="bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl p-6 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center glow-amber">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Horas Ahorradas al Mes</p>
                      <p className="text-3xl font-bold"><Counter target={120} suffix="hrs" /></p>
                    </div>
                    <Badge className="bg-accent/10 text-accent border-accent/20">Por cliente</Badge>
                  </div>
                </div>

                <div className="bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center glow-emerald">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Precisión en Datos</p>
                      <p className="text-3xl font-bold"><Counter target={99} suffix="." /><Counter target={7} suffix="%" /></p>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20">Sin errores</Badge>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-1">Cada negocio es único</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">Business Central se adapta a tus procesos, no al revés. Configuramos métricas, dashboards y alertas específicas para tu industria y operación.</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── Global Transactions Section ─── */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 border border-primary/20 bg-primary/5">
                <GlobeIcon className="w-3 h-3 mr-1 text-primary" />
                Transacciones Globales
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Business Central mueve al{' '}
                <span className="gradient-text">mundo</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Cada minuto, miles de empresas confían en Business Central para procesar transacciones críticas. Nuestras extensiones potencian esa operación global.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-card/30 backdrop-blur-sm" style={{ height: '520px' }}>
              <Globe className="w-full h-full" />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Empresas activas</p>
                <p className="text-2xl font-bold"><Counter target={40000} suffix="+" /></p>
                <p className="text-[11px] text-primary">Globalmente</p>
              </div>
              <div className="bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Países</p>
                <p className="text-2xl font-bold"><Counter target={175} suffix="+" /></p>
                <p className="text-[11px] text-primary">Con presencia BC</p>
              </div>
              <div className="bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Disponibilidad</p>
                <p className="text-2xl font-bold"><Counter target={99} suffix=".9%" /></p>
                <p className="text-[11px] text-primary">SLA garantizado</p>
              </div>
              <div className="bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Nuestras extensiones</p>
                <p className="text-2xl font-bold gradient-text">Activas</p>
                <p className="text-[11px] text-primary">24/7 monitoreo</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── SAT Compliance Section ─── */}
      <section id="sat" className="py-20 md:py-28 bg-muted/30 relative">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 border border-destructive/20 bg-destructive/5">
                <Shield className="w-3 h-3 mr-1 text-destructive" />
                Cumplimiento SAT
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Evita dolores de cabeza con el{' '}
                <span className="gradient-text">SAT</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Automatiza tu facturación electrónica, cálculos de impuestos y reportes fiscales. Cumple sin complicaciones.
              </p>
            </div>
          </FadeInSection>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <FadeInSection>
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <Image src="/sat-compliance-v2.png" alt="Cumplimiento SAT con Business Central" width={600} height={400} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="space-y-4">
                {[
                  {
                    icon: Receipt,
                    title: 'Facturación CFDI automática',
                    desc: 'Genera, timbra y envía facturas electrónicas CFDI 4.0 directamente desde Business Central sin intervención manual.',
                  },
                  {
                    icon: CreditCard,
                    title: 'Cálculo de impuestos automático',
                    desc: 'IVA, ISR, retenciones y complementos fiscales calculados automáticamente según las reglas vigentes.',
                  },
                  {
                    icon: FileCheck,
                    title: 'Reportes fiscales al instante',
                    desc: 'Genera reportes de impuestos, declaraciones y papeles de trabajo con un clic. Listos para tu contador.',
                  },
                  {
                    icon: ClipboardCheck,
                    title: 'Auditoría siempre lista',
                    desc: 'Trazabilidad completa de todas las transacciones. Cuando el SAT audita, tú ya tienes todo organizado.',
                  },
                ].map((item, i) => (
                  <div key={item.title} className="group flex items-start gap-4 bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl p-4 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── Automation Ideas ─── */}
      <section id="automatizaciones" className="py-20 md:py-28 relative">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 border border-primary/20 bg-primary/5">
                <Zap className="w-3 h-3 mr-1 text-primary" />
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

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {automationIdeas.map((idea, i) => (
              <FadeInSection key={idea.title} delay={i * 0.06}>
                <div className="group snap-start shrink-0 w-[280px] hover:w-[360px] bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:shadow-md group-hover:shadow-primary/10 transition-all duration-300">
                    <idea.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold mb-1.5 group-hover:text-primary transition-colors whitespace-nowrap">{idea.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">{idea.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {idea.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5 bg-primary/5 border border-primary/10">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Development Ideas ─── */}
      <section id="desarrollos" className="py-20 md:py-28 bg-muted/30 relative">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 border border-accent/20 bg-accent/5">
                <Code2 className="w-3 h-3 mr-1 text-accent" />
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

          <div className="max-w-3xl mx-auto space-y-2">
            {developmentIdeas.map((idea, i) => (
              <FadeInSection key={idea.title} delay={i * 0.06}>
                <div className={`group relative overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-500 hover:shadow-lg ${
                  idea.color === 'emerald'
                    ? 'bg-card/60 border-primary/10 hover:border-primary/30 hover:shadow-primary/5'
                    : 'bg-card/60 border-accent/10 hover:border-accent/30 hover:shadow-accent/5'
                }`}>
                  <div className={`h-0.5 ${idea.color === 'emerald' ? 'bg-gradient-to-r from-primary/60 to-primary' : 'bg-gradient-to-r from-accent/60 to-accent'}`} />
                  <div className="p-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      idea.color === 'emerald'
                        ? 'bg-primary/10 border-primary/20 group-hover:bg-primary/20'
                        : 'bg-accent/10 border-accent/20 group-hover:bg-accent/20'
                    }`}>
                      <idea.icon className={`w-5 h-5 ${idea.color === 'emerald' ? 'text-primary' : 'text-accent'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold">{idea.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5 line-clamp-1 group-hover:line-clamp-none transition-all duration-300">{idea.description}</p>
                    </div>
                    <ArrowUpRight className={`w-4 h-4 shrink-0 ${idea.color === 'emerald' ? 'text-primary' : 'text-accent'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Migrations & RapidStart Section ─── */}
      <section id="migraciones" className="py-20 md:py-28 relative">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 border border-primary/20 bg-primary/5">
                <ArrowRightLeft className="w-3 h-3 mr-1 text-primary" />
                Migraciones
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Migra a Business Central{' '}
                <span className="gradient-text">sin interrupciones</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Desde NAV, sistemas legacy o Excel — migramos tus datos de forma segura con RapidStart Services de Microsoft.
              </p>
            </div>
          </FadeInSection>

          {/* Migration Sources */}
          <FadeInSection>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {migrationSources.map((src) => (
                <div key={src.label} className="flex flex-col items-center gap-2 bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl px-6 py-4 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300">
                  <src.icon className="w-6 h-6 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">{src.label}</span>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* Migration Process */}
          <FadeInSection delay={0.1}>
            <div className="bg-card/60 border border-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 shine-sweep">
              <div className="flex items-center gap-2 mb-6">
                <Wrench className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">RapidStart Services — Proceso de Migración</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {migrationSteps.map((step, i) => (
                  <div key={step.label} className="text-center relative">
                    {i < migrationSteps.length - 1 && (
                      <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
                    )}
                    <div className="relative z-10 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="text-sm font-semibold mb-1">{step.label}</h4>
                    <p className="text-[11px] text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Migration Types */}
          <FadeInSection delay={0.2}>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl p-5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-2">Migración desde NAV</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Transición completa de Dynamics NAV a Business Central con toda tu data histórica, configuraciones y personalizaciones.</p>
              </div>
              <div className="bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl p-5 hover:border-accent/30 hover:shadow-md hover:shadow-accent/5 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-3">
                  <FileSpreadsheet className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-sm font-semibold mb-2">Desde Sistemas Legacy</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Migramos tu información de Excel, otros ERPs o bases de datos propietarias a Business Central de forma segura y validada.</p>
              </div>
              <div className="bg-card/60 border border-white/10 backdrop-blur-sm rounded-xl p-5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-2">RapidStart Services</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Herramienta oficial de Microsoft para migración de datos. Configuración, importación y validación en un proceso controlado y repetible.</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── License Pricing Section ─── */}
      <section id="licencias" className="py-20 md:py-28 bg-muted/30 relative">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 border border-primary/20 bg-primary/5">
                <CreditCard className="w-3 h-3 mr-1 text-primary" />
                Licencias
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Precios de{' '}
                <span className="gradient-text">Business Central</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Elige la licencia que mejor se adapte a las necesidades de tu equipo.
              </p>
            </div>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {licensePricing.map((plan, i) => (
              <FadeInSection key={plan.name} delay={i * 0.08}>
                <Card className={`group h-full border backdrop-blur-sm transition-all duration-300 relative ${
                  plan.popular
                    ? 'bg-card/80 border-primary/40 hover:border-primary/60 shadow-lg shadow-primary/10'
                    : 'bg-card/60 border-white/10 hover:border-primary/30'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-3 py-0.5 text-[10px]">Más Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{plan.storage}</p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold gradient-text">{plan.price}</span>
                      <span className="text-xs text-muted-foreground ml-1">{plan.unit}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{plan.description}</p>
                    <div className="space-y-2">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className={`w-full mt-5 ${
                        plan.popular
                          ? 'bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20'
                          : 'bg-muted/50 hover:bg-primary/10 border border-white/10 hover:border-primary/20'
                      } transition-all duration-300`}
                      variant={plan.popular ? 'default' : 'outline'}
                      asChild
                    >
                      <a href="#contacto">Solicitar cotización</a>
                    </Button>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay={0.4}>
            <p className="text-center text-xs text-muted-foreground mt-8">
              * Precios sujetos a cambio. Consulta con nosotros para cotización personalizada.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* ─── Process Section ─── */}
      <section id="proceso" className="py-20 md:py-28 relative">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 border border-primary/20 bg-primary/5">
                <Clock className="w-3 h-3 mr-1 text-primary" />
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

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <FadeInSection key={step.step} delay={i * 0.15}>
                <div className="relative text-center">
                  {i < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
                  )}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 glow-emerald">
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

      {/* ─── Contact Form Section ─── */}
      <section id="contacto" className="py-20 md:py-28 bg-muted/30 relative">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 border border-primary/20 bg-primary/5">
                <Mail className="w-3 h-3 mr-1 text-primary" />
                Contacto
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Listo para{' '}
                <span className="gradient-text">transformar</span>{' '}
                tu negocio?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Cuéntanos sobre tu proyecto y te contactamos con una propuesta sin compromiso.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-card/60 border border-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                {formStatus === 'sent' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 glow-emerald">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">¡Solicitud enviada!</h3>
                    <p className="text-muted-foreground text-sm">Nos pondremos en contacto contigo pronto.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium mb-1.5 block">Nombre *</label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Tu nombre"
                          className="bg-muted/30 border-white/10 focus:border-primary/40"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium mb-1.5 block">Empresa</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Nombre de tu empresa"
                          className="bg-muted/30 border-white/10 focus:border-primary/40"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium mb-1.5 block">Email *</label>
                        <Input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="tu@email.com"
                          className="bg-muted/30 border-white/10 focus:border-primary/40"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium mb-1.5 block">Teléfono</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(555) 123-4567"
                          className="bg-muted/30 border-white/10 focus:border-primary/40"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1.5 block">Mensaje</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Cuéntanos sobre tu proyecto o necesidad..."
                        rows={4}
                        className="bg-muted/30 border-white/10 focus:border-primary/40 resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-3 block">¿En qué estás interesado?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {interestOptions.map((interest) => (
                          <label
                            key={interest}
                            className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                              selectedInterests.includes(interest)
                                ? 'bg-primary/10 border-primary/30 text-primary'
                                : 'bg-muted/20 border-white/10 text-muted-foreground hover:border-primary/20'
                            }`}
                          >
                            <Checkbox
                              checked={selectedInterests.includes(interest)}
                              onCheckedChange={() => toggleInterest(interest)}
                              className="border-primary/30"
                            />
                            {interest}
                          </label>
                        ))}
                      </div>
                    </div>
                    {formStatus === 'error' && (
                      <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2">
                        Error al enviar. Intenta de nuevo.
                      </div>
                    )}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={formStatus === 'sending'}
                      className="w-full bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                    >
                      {formStatus === 'sending' ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Enviando...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Enviar solicitud
                        </span>
                      )}
                    </Button>
                    <a
                      href="https://wa.me/525617075485?text=Hola%20quiero%20una%20cotización%20para%20Business%20Central"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full mt-3 py-3 px-4 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/20"
                    >
                      <MessageSquare className="w-4 h-4" />
                      O escríbenos por WhatsApp
                    </a>
                  </form>
                )}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/10 bg-card/40 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                  <Cog className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">
                  BC<span className="gradient-text">Forge</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Consultoría especializada en Microsoft Business Central. Automatización, desarrollo e integraciones.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Servicios</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {['Implementación', 'Desarrollo a medida', 'Automatización', 'Integraciones', 'Capacitación'].map((item) => (
                  <li key={item}><a href="#desarrollos" className="hover:text-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Soluciones</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {['Módulos BC', 'SAT / CFDI', 'Migraciones', 'Power Platform', 'Licencias'].map((item) => (
                  <li key={item}><a href={`#${item.toLowerCase().replace(/\s+/g, '').replace('/', '')}`} className="hover:text-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {['Proceso', 'Contacto'].map((item) => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} BCForge. Todos los derechos reservados.
            </p>
            <p className="text-xs text-muted-foreground">
              Microsoft Dynamics 365 Business Central es una marca registrada de Microsoft Corporation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
