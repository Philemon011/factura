"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Search, FileText, Trash2 } from "lucide-react"
import { deleteInvoice, updateInvoiceStatus } from "@/actions/invoices"
import { formatCFA, formatDate } from "@/lib/utils/formatters"
import InvoiceStatusBadge from "@/components/invoices/InvoiceStatusBadge"
import ConfirmModal from "@/components/ui/ConfirmModal"
import { Invoice, InvoiceStatus } from "@/types"

const statusFilters: { label: string; value: InvoiceStatus | "all" }[] = [
  { label: "Toutes", value: "all" },
  { label: "Brouillon", value: "draft" },
  { label: "Envoyée", value: "sent" },
  { label: "Payée", value: "paid" },
  { label: "En retard", value: "overdue" },
]

export default function InvoicesClient({
  initialInvoices,
}: {
  initialInvoices: Invoice[]
}) {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [targetId, setTargetId] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<InvoiceStatus | "all">("all")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)

  const filtered = invoices.filter((inv) => {
    const matchStatus = activeFilter === "all" || inv.status === activeFilter
    const matchSearch =
      inv.number.toLowerCase().includes(search.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const handleDeleteClick = (id: string) => {
    setTargetId(id)
    setConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!targetId) return
    setLoading(true)
    try {
      await deleteInvoice(targetId)
      setInvoices((prev) => prev.filter((inv) => inv.id !== targetId))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      setTargetId(null)
    }
  }

  const handleStatusChange = async (id: string, status: InvoiceStatus) => {
    try {
      await updateInvoiceStatus(id, status)
      setInvoices((prev) =>
        prev.map((inv) => inv.id === id ? { ...inv, status } : inv)
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-full p-4 pt-16 dark:bg-zinc-950 sm:p-6 sm:pt-6 lg:p-8">

      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-6 flex items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl">
            Factures
          </h1>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            {invoices.length} factures au total
          </p>
        </div>
        <Link
          href="/invoices/new"
          className="flex flex-shrink-0 items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 sm:px-4 sm:text-sm"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nouvelle facture</span>
          <span className="sm:hidden">Nouveau</span>
        </Link>
      </motion.div>

      {/* Filtres + recherche */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.25 }}
        className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeFilter === f.value
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800">
          <Search className="h-3.5 w-3.5 flex-shrink-0 text-zinc-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs text-zinc-700 outline-none placeholder:text-zinc-400 dark:bg-zinc-800 dark:text-zinc-200 sm:w-56"
          />
        </div>
      </motion.div>

      {/* Tableau */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="mb-3 h-8 w-8 text-zinc-300 dark:text-zinc-700" />
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Aucune facture trouvée
            </p>
            <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-600">
              Essaie un autre filtre ou terme de recherche
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 sm:px-6">Numéro</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 sm:px-6">Client</th>
                  <th className="hidden px-4 py-3 text-left text-xs font-medium text-zinc-400 sm:table-cell sm:px-6">Date émission</th>
                  <th className="hidden px-4 py-3 text-left text-xs font-medium text-zinc-400 sm:table-cell sm:px-6">Échéance</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 sm:px-6">Montant</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 sm:px-6">Statut</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 sm:px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((invoice, i) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.04 }}
                    className="border-b border-zinc-50 transition-colors last:border-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                  >
                    <td className="px-4 py-3.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 sm:px-6 sm:py-4">
                      {invoice.number}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-zinc-600 dark:text-zinc-400 sm:px-6 sm:py-4">
                      {invoice.clientName}
                    </td>
                    <td className="hidden px-4 py-3.5 text-sm text-zinc-500 sm:table-cell sm:px-6 sm:py-4">
                      {formatDate(invoice.issueDate)}
                    </td>
                    <td className="hidden px-4 py-3.5 text-sm text-zinc-500 sm:table-cell sm:px-6 sm:py-4">
                      {formatDate(invoice.dueDate)}
                    </td>
                    <td className="px-4 py-3.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 sm:px-6 sm:py-4">
                      {formatCFA(invoice.total)}
                    </td>
                    <td className="px-4 py-3.5 sm:px-6 sm:py-4">
                      <select
                        value={invoice.status}
                        onChange={(e) =>
                          handleStatusChange(invoice.id, e.target.value as InvoiceStatus)
                        }
                        className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-700 outline-none transition-colors dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        <option value="draft">Brouillon</option>
                        <option value="sent">Envoyée</option>
                        <option value="paid">Payée</option>
                        <option value="overdue">En retard</option>
                      </select>
                    </td>
                    <td className="px-4 py-3.5 sm:px-6 sm:py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/invoices/${invoice.id}`}
                          className="text-xs text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
                        >
                          Voir →
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(invoice.id)}
                          disabled={loading}
                          className="text-zinc-300 transition-colors hover:text-red-500 disabled:opacity-50 dark:text-zinc-700 dark:hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer la facture ?"
        description="Cette action est irréversible. La facture sera définitivement supprimée."
        confirmLabel="Supprimer"
        danger
      />
    </div>
  )
}