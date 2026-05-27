'use client'

import { useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'

/* ─── useMounted Hook ─── */
function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

/* ─── Chart Data ─── */

const costData = [
  { category: 'ERP\nLicencias', before: 100, after: 52, savings: 48 },
  { category: 'Implementación', before: 85, after: 40, savings: 45 },
  { category: 'Operaciones\nManual', before: 120, after: 24, savings: 96 },
  { category: 'Mantenimiento', before: 70, after: 35, savings: 35 },
  { category: 'Cumplimiento\nSAT', before: 90, after: 18, savings: 72 },
]

const timelineData = [
  { phase: 'Análisis', traditional: 8, bcforge: 4 },
  { phase: 'Diseño', traditional: 12, bcforge: 5 },
  { phase: 'Desarrollo', traditional: 24, bcforge: 10 },
  { phase: 'Pruebas', traditional: 10, bcforge: 4 },
  { phase: 'Despliegue', traditional: 6, bcforge: 2 },
  { phase: 'Go-Live', traditional: 4, bcforge: 2 },
]

const roiData = [
  { month: 'Mes 1', roi: -15 },
  { month: 'Mes 3', roi: 5 },
  { month: 'Mes 6', roi: 38 },
  { month: 'Mes 9', roi: 72 },
  { month: 'Mes 12', roi: 120 },
  { month: 'Mes 18', roi: 210 },
]

/* ─── Custom Tooltips ─── */
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload) return null
  return (
    <div className="glass-card rounded-lg px-3 py-2 text-xs">
      <p className="text-white/60 mb-1 font-medium whitespace-pre-line">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }} className="font-semibold">
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  )
}

function RoiTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload) return null
  return (
    <div className="glass-card rounded-lg px-3 py-2 text-xs">
      <p className="text-white/60 mb-1 font-medium">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }} className="font-semibold">
          ROI: {entry.value > 0 ? '+' : ''}{entry.value}%
        </p>
      ))}
    </div>
  )
}

/* ─── Cost Reduction Bar Chart ─── */
function CostReductionChart({ animate }: { animate: boolean }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={costData} barGap={3} barCategoryGap="20%">
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.06)" vertical={false} />
        <XAxis
          dataKey="category"
          tick={{ fill: '#7d9a8a', fontSize: 9 }}
          axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#7d9a8a', fontSize: 9 }}
          axisLine={false}
          tickLine={false}
          width={30}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="before"
          name="Costo Actual"
          fill="rgba(255,255,255,0.12)"
          radius={[3, 3, 0, 0]}
          isAnimationActive={animate}
          animationDuration={1200}
          animationEasing="ease-out"
        />
        <Bar
          dataKey="after"
          name="Con BCForge"
          fill="#10b981"
          radius={[3, 3, 0, 0]}
          isAnimationActive={animate}
          animationDuration={1400}
          animationEasing="ease-out"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

/* ─── Development Timeline Chart ─── */
function TimelineChart({ animate }: { animate: boolean }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={timelineData} barGap={3} barCategoryGap="20%" layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.06)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: '#7d9a8a', fontSize: 9 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}sem`}
          width={40}
        />
        <YAxis
          type="category"
          dataKey="phase"
          tick={{ fill: '#7d9a8a', fontSize: 9 }}
          axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
          tickLine={false}
          width={65}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload) return null
            return (
              <div className="glass-card rounded-lg px-3 py-2 text-xs">
                <p className="text-white/60 mb-1 font-medium">{label}</p>
                {payload.map((entry, i) => (
                  <p key={i} style={{ color: entry.color }} className="font-semibold">
                    {entry.name}: {entry.value} semanas
                  </p>
                ))}
              </div>
            )
          }}
        />
        <Bar
          dataKey="traditional"
          name="Tradicional"
          fill="rgba(255,255,255,0.12)"
          radius={[0, 3, 3, 0]}
          isAnimationActive={animate}
          animationDuration={1200}
          animationEasing="ease-out"
        />
        <Bar
          dataKey="bcforge"
          name="BCForge"
          fill="#34d399"
          radius={[0, 3, 3, 0]}
          isAnimationActive={animate}
          animationDuration={1400}
          animationEasing="ease-out"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

/* ─── ROI Area Chart ─── */
function RoiChart({ animate }: { animate: boolean }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={roiData}>
        <defs>
          <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.06)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: '#7d9a8a', fontSize: 9 }}
          axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#7d9a8a', fontSize: 9 }}
          axisLine={false}
          tickLine={false}
          width={35}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip content={<RoiTooltip />} />
        <Area
          type="monotone"
          dataKey="roi"
          name="ROI"
          stroke="#10b981"
          strokeWidth={2}
          fill="url(#roiGradient)"
          isAnimationActive={animate}
          animationDuration={1800}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

/* ─── Main Export: Charts Section ─── */
export function ExecutiveChartsSection() {
  const mounted = useMounted()

  return (
    <div className="space-y-6">
      {/* Cost Reduction + Timeline side by side */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Cost Reduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-semibold text-white/90">Reducción de Costos</h4>
              <p className="text-[10px] text-[#7d9a8a] mt-0.5">Antes vs. con implementación BCForge</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/15">
              <span className="text-[10px] font-bold text-[#10b981]">-60%</span>
              <span className="text-[9px] text-[#7d9a8a]">prom</span>
            </div>
          </div>
          <CostReductionChart animate={mounted} />
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-white/12" />
              <span className="text-[9px] text-[#7d9a8a]">Costo Actual</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#10b981]" />
              <span className="text-[9px] text-[#7d9a8a]">Con BCForge</span>
            </div>
          </div>
        </motion.div>

        {/* Timeline Acceleration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-semibold text-white/90">Aceleración de Tiempos</h4>
              <p className="text-[10px] text-[#7d9a8a] mt-0.5">Semanas: Desarrollo tradicional vs. BCForge</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#34d399]/10 border border-[#34d399]/15">
              <span className="text-[10px] font-bold text-[#34d399]">-57%</span>
              <span className="text-[9px] text-[#7d9a8a]">más rápido</span>
            </div>
          </div>
          <TimelineChart animate={mounted} />
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-white/12" />
              <span className="text-[9px] text-[#7d9a8a]">Tradicional</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#34d399]" />
              <span className="text-[9px] text-[#7d9a8a]">BCForge</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ROI Chart - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="glass-card rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-semibold text-white/90">Retorno de Inversión</h4>
            <p className="text-[10px] text-[#7d9a8a] mt-0.5">Proyección ROI acumulado a 18 meses</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/15">
            <span className="text-[10px] font-bold text-[#10b981]">+210%</span>
            <span className="text-[9px] text-[#7d9a8a]">a 18 meses</span>
          </div>
        </div>
        <RoiChart animate={mounted} />
      </motion.div>
    </div>
  )
}
