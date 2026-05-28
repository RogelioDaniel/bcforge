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
  Cell,
} from 'recharts'

/* ─── useMounted Hook ─── */
function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

/* ─── Chart Data: BCForge vs Otras Consultoras ─── */
const comparisonData = [
  {
    metric: 'Tiempo de\nImplementación',
    bcforge: 95,
    others: 40,
    label: '95% más rápido',
    description: 'Semanas reducidas en promedio',
  },
  {
    metric: 'Reducción\nde Costos',
    bcforge: 88,
    others: 30,
    label: '-60% costo promedio',
    description: 'Ahorro directo en operaciones',
  },
  {
    metric: 'ROI a\n12 Meses',
    bcforge: 92,
    others: 35,
    label: '+120% ROI',
    description: 'Retorno de inversión acumulado',
  },
  {
    metric: 'Automatización\nde Procesos',
    bcforge: 85,
    others: 25,
    label: '80% menos manual',
    description: 'Flujos automatizados end-to-end',
  },
  {
    metric: 'Satisfacción\ndel Cliente',
    bcforge: 97,
    others: 55,
    label: '97% aprobación',
    description: 'NPS promedio post-implantación',
  },
]

/* ─── Custom Tooltip ─── */
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload) return null
  const dataIndex = comparisonData.findIndex(d => d.metric === label)
  const dataItem = comparisonData[dataIndex]
  return (
    <div className="glass-card rounded-lg px-4 py-3 text-xs min-w-[180px]">
      <p className="text-white/70 mb-2 font-medium whitespace-pre-line">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }} className="font-semibold mb-0.5">
          {entry.name}: {entry.value}%
        </p>
      ))}
      {dataItem && (
        <div className="mt-2 pt-2 border-t border-white/10">
          <p className="text-[#10b981] font-bold">{dataItem.label}</p>
          <p className="text-white/40 mt-0.5">{dataItem.description}</p>
        </div>
      )}
    </div>
  )
}

/* ─── Main Export: Single Comparison Chart ─── */
export function ExecutiveChartsSection() {
  const mounted = useMounted()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass-card rounded-xl p-5 sm:p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h4 className="text-base font-semibold text-white/90">BCForge vs. Otras Consultoras</h4>
          <p className="text-[11px] text-[#7d9a8a] mt-0.5">Comparativa de rendimiento en implementaciones Microsoft 365</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/15">
          <span className="text-[11px] font-bold text-[#10b981]">2.5×</span>
          <span className="text-[10px] text-[#7d9a8a]">mejor rendimiento</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={comparisonData} barGap={4} barCategoryGap="25%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.06)" vertical={false} />
          <XAxis
            dataKey="metric"
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
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="others"
            name="Otras Consultoras"
            radius={[3, 3, 0, 0]}
            isAnimationActive={mounted}
            animationDuration={1200}
            animationEasing="ease-out"
          >
            {comparisonData.map((_, index) => (
              <Cell
                key={`others-${index}`}
                fill="rgba(255,255,255,0.1)"
              />
            ))}
          </Bar>
          <Bar
            dataKey="bcforge"
            name="BCForge"
            radius={[3, 3, 0, 0]}
            isAnimationActive={mounted}
            animationDuration={1400}
            animationEasing="ease-out"
          >
            {comparisonData.map((_, index) => (
              <Cell
                key={`bcforge-${index}`}
                fill="url(#barGradient)"
              />
            ))}
          </Bar>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.85} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <span className="text-[10px] text-[#7d9a8a]">Otras Consultoras</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(to bottom, #34d399, #10b981)' }} />
          <span className="text-[10px] text-[#7d9a8a]">BCForge</span>
        </div>
      </div>

      {/* Bottom stats row */}
      <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/[0.06]">
        {[
          { value: '-60%', label: 'Reducción de costo' },
          { value: '2.5×', label: 'Más rápido' },
          { value: '+120%', label: 'ROI a 12 meses' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-lg font-bold text-[#10b981]">{stat.value}</div>
            <div className="text-[9px] text-[#7d9a8a] mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
