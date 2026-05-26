"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface RevenueChartProps {
  data: { month: string; facturé: number; payé: number }[]
}

function formatCFA(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
  return value.toString()
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <p className="mb-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          {label}
        </p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {entry.name} :
            </span>
            <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
              {new Intl.NumberFormat("fr-FR").format(entry.value)} FCFA
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function RevenueChart({ data }: RevenueChartProps) {
  if (data.length === 0 || data.every((d) => d.facturé === 0)) {
    return (
      <div className="flex h-48 items-center justify-center">
        <p className="text-sm text-zinc-400 dark:text-zinc-600">
          Pas encore de données
        </p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={data}
        margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
        barGap={4}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e4e4e7"
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#a1a1aa" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={formatCFA}
          tick={{ fontSize: 11, fill: "#a1a1aa" }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f4f4f5" }} />
        <Legend
          wrapperStyle={{ fontSize: "11px", color: "#a1a1aa" }}
          iconType="circle"
          iconSize={8}
        />
        <Bar
          dataKey="facturé"
          fill="#18181b"
          radius={[4, 4, 0, 0]}
          maxBarSize={32}
        />
        <Bar
          dataKey="payé"
          fill="#22c55e"
          radius={[4, 4, 0, 0]}
          maxBarSize={32}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}