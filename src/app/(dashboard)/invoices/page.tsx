import { getInvoices } from "@/actions/invoices"
import InvoicesClient from "@/components/invoices/InvoicesClient"

export default async function InvoicesPage() {
  const invoices = await getInvoices()
  return <InvoicesClient initialInvoices={invoices} />
}