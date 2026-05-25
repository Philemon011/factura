import { getDashboardStats, getInvoices } from "@/actions/invoices"
import DashboardClient from "@/components/dashboard/DashboardClient"

export default async function DashboardPage() {
  const [stats, invoices] = await Promise.all([
    getDashboardStats(),
    getInvoices(),
  ])

  return <DashboardClient stats={stats} invoices={invoices} />
}