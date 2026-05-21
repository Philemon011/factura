"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, FileText } from "lucide-react"
import { mockInvoices } from "@/lib/mock-data"
import { formatCFA, formatDate } from "@/lib/utils/formatters"
import InvoiceStatusBadge from "@/components/invoices/InvoiceStatusBadge"
import { InvoiceStatus } from "@/types"

const statusFilters: { label: string; value: InvoiceStatus | "all" }[] = [
  { label: "Toutes", value: "all" },
  { label: "Brouillon", value: "draft" },
  { label: "Envoyée", value: "sent" },
  { label: "Payée", value: "paid" },
  { label: "En retard", value: "overdue" },
]

export default function InvoicesPage() {
  const [activeFilter, setActiveFilter] = useState<InvoiceStatus | "all">("all")
  const [search, setSearch] = useState("")

  const filtered = mockInvoices.filter((inv) => {
    const matchStatus = activeFilter === "all" || inv.status === activeFilter
    const matchSearch =
      inv.number.toLowerCase().includes(search.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div className="p-8">

      {/* En-tête */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900">Factures</h1>
          <p className="mt-0.5 text-sm text-zinc-500">
            {mockInvoices.length} factures au total
          </p>
        </div>
        <Link
          href="/invoices/new"
          className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nouvelle facture
        </Link>
      </div>

      {/* Filtres + recherche */}
      <div className="mb-4 flex items-center justify-between gap-4">

        {/* Filtres statut */}
        <div className="flex items-center gap-1.5">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeFilter === f.value
                  ? "bg-zinc-900 text-white"
                  : "bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Recherche */}
        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2">
          <Search className="h-3.5 w-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Rechercher une facture ou un client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 text-xs text-zinc-700 outline-none placeholder:text-zinc-400"
          />
        </div>
      </div>

      {/* Tableau */}
      <div className="rounded-xl border border-zinc-200 bg-white">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="mb-3 h-8 w-8 text-zinc-300" />
            <p className="text-sm font-medium text-zinc-500">Aucune facture trouvée</p>
            <p className="mt-1 text-xs text-zinc-400">Essaie un autre filtre ou terme de recherche</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">Numéro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">Date émission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">Échéance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-zinc-800">
                    {invoice.number}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">
                    {invoice.clientName}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {formatDate(invoice.issueDate)}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {formatDate(invoice.dueDate)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-800">
                    {formatCFA(invoice.total)}
                  </td>
                  <td className="px-6 py-4">
                    <InvoiceStatusBadge status={invoice.status} />
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/invoices/${invoice.id}`}
                      className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
                    >
                      Voir →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}