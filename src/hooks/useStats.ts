import { useInvoiceStore } from "@/stores/invoice-store"
import { DashboardStats } from "@/types"

export function useStats(): DashboardStats {
  const invoices = useInvoiceStore((state) => state.invoices)

  const totalInvoices = invoices.length

  const totalBilled = invoices.reduce((sum, inv) => sum + inv.total, 0)

  const totalPaid = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.total, 0)

  const totalPending = invoices
    .filter((inv) => inv.status === "sent" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0)

  return {
    totalInvoices,
    totalBilled,
    totalPaid,
    totalPending,
  }
}