import { getInvoice } from "@/actions/invoices"
import { getClients } from "@/actions/clients"
import InvoiceDetailClient from "@/components/invoices/InvoiceDetailClient"
import Link from "next/link"

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [invoice, clients] = await Promise.all([
    getInvoice(id),
    getClients(),
  ])

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center p-8 py-24">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Facture introuvable
        </p>
        <Link
          href="/invoices"
          className="mt-3 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
        >
          ← Retour aux factures
        </Link>
      </div>
    )
  }

  const client = clients.find((c) => c.id === invoice.clientId) || null

  return <InvoiceDetailClient invoice={invoice} client={client} />
}