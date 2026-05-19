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
  MapPin,
  MessageSquare,
  Phone,
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
const automationIdeas = [
  {
    icon: RefreshCw,
    title: 'Sincronización Automática de Inventario',
    description: 'Conecta Business Central con tu e-commerce, marketplace o sistema de almacén para actualizar existencias en tiempo real sin intervención manual.',
    tags: ['Inventario', 'E-commerce', 'Tiempo Real'],
  },
  {
    icon: ScrollText,
    title: 'Facturación Electrónica Automática',
    description: 'Genera y envía facturas electrónicas (CFDI) directamente desde Business Central. Cumple con requisitos fiscales automáticamente.',
    tags: ['Facturación', 'SAT/CFDI', 'Compliance'],
  },
  {
    icon: Bot,
    title: 'Notificaciones Inteligentes con Power Automate',
    description: 'Flujos automáticos que notifican cuando un pedido se retrasa, cuando el inventario baja, o cuando un cliente requiere seguimiento.',
    tags: ['Power Automate', 'Alertas', 'Workflows'],
  },
  {
    icon: FileSpreadsheet,
    title: 'Reportes Financieros Automatizados',
    description: 'Genera reportes de ventas, flujo de caja y estados financieros automáticamente cada semana o mes y envialos por correo.',
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
]

const developmentIdeas = [
  {
    icon: Smartphone,
    title: 'App Móvil de Campo',
    description: 'Aplicación personalizada para vendedores o técnicos de campo que se conecta en tiempo real con Business Central para crear pedidos, consultar inventario y registrar visitas.',
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
    description: 'Portal web donde tus proveedores consultan órdenes de compra, suben facturas y dan seguimiento a pagos, directamente conectado a Business Central.',
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
    description: 'Conecta Business Central con DHL, FedEx, Estafeta y otras paqueterías para generar guías, rastrear envíos y calcular costos automáticamente.',
    color: 'amber',
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
    description: 'Diseñamos una solución a medida con road map claro, tiempos y costos transparentes.',
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
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('sent')
      setTimeout(() => setFormStatus('idle'), 3000)
    }, 1500)
  }

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
              <a href="#automatizaciones" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Automatizaciones
              </a>
              <a href="#desarrollos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Desarrollos
              </a>
              <a href="#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Servicios
              </a>
              <a href="#proceso" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Proceso
              </a>
              <a href="#contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <a href="#contacto">Agendar llamada</a>
              </Button>
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-3">
                {['Automatizaciones', 'Desarrollos', 'Servicios', 'Proceso', 'Contacto'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-2 flex flex-col gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href="#contacto">Agendar llamada</a>
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                    <a href="#contacto">Cotización gratis</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
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
                  <a href="#automatizaciones">
                    Ver automatizaciones
                  </a>
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Sin compromiso</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Diagnóstico gratis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Soporte incluido</span>
                </div>
              </div>
            </FadeInSection>

            {/* Right - Dashboard Mockup with Hero Image */}
            <FadeInSection delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
                {/* Hero illustration behind the dashboard */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-20">
                  <Image
                    src="/hero-illustration.png"
                    alt="Business Central Automation"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="relative bg-card/95 border border-border rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="ml-2 text-xs text-muted-foreground">Business Central — Dashboard</span>
                  </div>

                  {/* Mini Dashboard */}
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

                  {/* Mini Chart Representation */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium">Flujo de Ventas</span>
                      <span className="text-xs text-muted-foreground">Últimos 7 días</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[40, 55, 35, 65, 50, 75, 60].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-sm bg-primary/70"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Automation Status */}
                  <div className="mt-4 flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">12 automatizaciones activas</span>
                    <span className="text-xs text-muted-foreground ml-auto">Última ejecución: hace 2 min</span>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── Visual Bridge Section ─── */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/automation-illustration.png"
              alt="Automatización de procesos con Business Central"
              width={1344}
              height={768}
              className="w-full h-auto object-cover rounded-2xl"
              priority
            />
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

      {/* ─── Stats Section ─── */}
      <section className="py-16 border-y border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 150, suffix: '+', label: 'Proyectos entregados', icon: Rocket },
              { value: 98, suffix: '%', label: 'Satisfacción del cliente', icon: CheckCircle2 },
              { value: 40, suffix: '%', label: 'Reducción de procesos manuales', icon: Zap },
              { value: 50, suffix: '+', label: 'Integraciones realizadas', icon: Cable },
            ].map((stat, i) => (
              <FadeInSection key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <stat.icon className="w-6 h-6 mx-auto mb-3 text-primary" />
                  <p className="text-3xl md:text-4xl font-bold">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Automation Ideas Section ─── */}
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
                Estas son solo algunas de las automatizaciones que podemos implementar en tu Business Central para ahorrar tiempo y reducir errores.
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationIdeas.map((idea, i) => (
              <FadeInSection key={idea.title} delay={i * 0.08}>
                <Card className="group h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <idea.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {idea.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {idea.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {idea.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Development Ideas Section ─── */}
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
                Más allá de automatizar, podemos crear nuevas funcionalidades que Business Central no trae por defecto y que tu negocio necesita.
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developmentIdeas.map((idea, i) => (
              <FadeInSection key={idea.title} delay={i * 0.08}>
                <Card className="group h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className={`h-1.5 ${idea.color === 'emerald' ? 'bg-primary' : 'bg-accent'}`} />
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                      idea.color === 'emerald' ? 'bg-primary/10 group-hover:bg-primary/20' : 'bg-accent/10 group-hover:bg-accent/20'
                    }`}>
                      <idea.icon className={`w-6 h-6 ${idea.color === 'emerald' ? 'text-primary' : 'text-accent'}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {idea.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {idea.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                      <span>Saber más</span>
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services Section ─── */}
      <section id="servicios" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Layers className="w-3 h-3 mr-1" />
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <FadeInSection key={service.title} delay={i * 0.08}>
                <Card className="group h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <service.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process Section ─── */}
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
                  {/* Connector line */}
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

      {/* ─── Testimonials Section ─── */}
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

            {/* Dots */}
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

          {/* Testimonial Cards Grid */}
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

      {/* ─── CTA + Contact Section ─── */}
      <section id="contacto" className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - CTA */}
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
                  { icon: Phone, label: '+52 (55) 1234-5678', text: 'Llámanos de Lun a Vie, 9am - 6pm' },
                  { icon: Mail, label: 'contacto@bcforge.mx', text: 'Te respondemos en menos de 24 hrs' },
                  { icon: MapPin, label: 'Ciudad de México, México', text: 'Servicios en toda LATAM' },
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
            </FadeInSection>

            {/* Right - Form */}
            <FadeInSection delay={0.2}>
              <Card className="border-border/50 shadow-xl">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-1">Solicita tu cotización</h3>
                  <p className="text-sm text-muted-foreground mb-6">Completa el formulario y te contactamos en menos de 24 horas.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="text-sm font-medium mb-1.5 block">
                          Nombre *
                        </label>
                        <Input id="name" placeholder="Tu nombre" required />
                      </div>
                      <div>
                        <label htmlFor="company" className="text-sm font-medium mb-1.5 block">
                          Empresa
                        </label>
                        <Input id="company" placeholder="Tu empresa" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium mb-1.5 block">
                        Email *
                      </label>
                      <Input id="email" type="email" placeholder="tu@email.com" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium mb-1.5 block">
                        Teléfono
                      </label>
                      <Input id="phone" type="tel" placeholder="+52 (55) 1234-5678" />
                    </div>
                    <div>
                      <label htmlFor="service" className="text-sm font-medium mb-1.5 block">
                        ¿Qué te interesa?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Implementación', 'Desarrollo a medida', 'Automatización', 'Integración', 'Business Intelligence', 'Capacitación'].map((s) => (
                          <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
                            <Checkbox />
                            <span>{s}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="text-sm font-medium mb-1.5 block">
                        Cuéntanos sobre tu proyecto
                      </label>
                      <Textarea id="message" placeholder="Describe brevemente lo que necesitas..." rows={3} />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={formStatus === 'sending'}
                    >
                      {formStatus === 'sending' ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : formStatus === 'sent' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          ¡Enviado con éxito!
                        </>
                      ) : (
                        <>
                          Enviar solicitud
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
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
            {/* Brand */}
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

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-3 text-sm">Servicios</h4>
              <ul className="space-y-2">
                {['Implementación', 'Desarrollo a medida', 'Automatización', 'Integraciones', 'Business Intelligence', 'Capacitación'].map((item) => (
                  <li key={item}>
                    <a href="#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Soluciones</h4>
              <ul className="space-y-2">
                {['Facturación electrónica', 'Sincronización inventario', 'Reportes automáticos', 'WhatsApp Business', 'Portal de proveedores', 'App móvil'].map((item) => (
                  <li key={item}>
                    <a href="#automatizaciones" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Contacto</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  contacto@bcforge.mx
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  +52 (55) 1234-5678
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  CDMX, México
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} BCForge. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Aviso de privacidad</a>
              <a href="#" className="hover:text-foreground transition-colors">Términos</a>
              <div className="flex items-center gap-1">
                <span>Hecho con</span>
                <svg className="w-3 h-3 text-primary fill-current" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                <span>y Business Central</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
