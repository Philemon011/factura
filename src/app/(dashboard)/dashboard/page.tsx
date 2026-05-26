import { getDashboardStats, getInvoices, getChartData } from "@/actions/invoices"
import DashboardClient from "@/components/dashboard/DashboardClient"

export default async function DashboardPage() {
  const [stats, invoices, chartData] = await Promise.all([
    getDashboardStats(),
    getInvoices(),
    getChartData(),
  ])

  return (
    <DashboardClient
      stats={stats}
      invoices={invoices}
      chartData={chartData}
    />
  )
}