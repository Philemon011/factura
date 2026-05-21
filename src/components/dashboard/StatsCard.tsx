import { LucideIcon } from "lucide-react"
import { formatCFA } from "@/lib/utils/formatters"

interface StatsCardProps {
  title: string
  value: number
  icon: LucideIcon
  iconColor: string
  iconBg: string
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBg,
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">{title}</p>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg}`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
      </div>
      <p className="mt-3 text-2xl font-semibold text-zinc-900">
        {formatCFA(value)}
      </p>
    </div>
  )
}