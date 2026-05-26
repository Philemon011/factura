"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Trash2 } from "lucide-react"
import { deleteInvoice, updateInvoiceStatus } from "@/actions/invoices"
import { formatCFA, formatDate, getStatusLabel, getStatusClasses } from "@/lib/utils/formatters"
import { Invoice, Client, InvoiceStatus } from "@/types"
import ConfirmModal from "@/components/ui/ConfirmModal"
import { toast } from "sonner"
import DownloadPDFButton from "@/components/invoices/DownloadPDFButton"
import { Company } from "@/types"

export default function InvoiceDetailClient({
  invoice: initialInvoice,
  client,
  company,
}: {
  invoice: Invoice
  client: Client | null
  company: Company
}) {
  const router = useRouter()
  const [invoice, setInvoice] = useState(initialInvoice)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleConfirmDelete = async () => {
  setLoading(true)
  try {
    await deleteInvoice(invoice.id)
    toast.success("Facture supprimée")
    router.push("/invoices")
  } catch (error) {
    toast.error("Erreur lors de la suppression")
    setLoading(false)
  }
}

  const handleStatusChange = async (status: InvoiceStatus) => {
  try {
    await updateInvoiceStatus(invoice.id, status)
    setInvoice((prev) => ({ ...prev, status }))
    toast.success("Statut mis à jour")
  } catch (error) {
    toast.error("Erreur lors de la mise à jour")
  }
}

  return (
    <div className="min-h-full bg-zinc-50 pt-14 dark:bg-zinc-950 sm:pt-0">

      {/* Header */}
      <div className="border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900 sm:px-8 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Link
              href="/invoices"
              className="flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              <ChevronLeft className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Factures</span>
            </Link>
            <span className="hidden text-zinc-300 dark:text-zinc-700 sm:inline">/</span>
            <span className="truncate text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {invoice.number}
            </span>
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            <select
              value={invoice.status}
              onChange={(e) => handleStatusChange(e.target.value as InvoiceStatus)}
              className="rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-700 outline-none transition-colors dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 sm:px-3 sm:py-2 sm:text-sm"
            >
              <option value="draft">Brouillon</option>
              <option value="sent">Envoyée</option>
              <option value="paid">Payée</option>
              <option value="overdue">En retard</option>
            </select>
            <DownloadPDFButton
  invoice={invoice}
  client={client}
  company={company}
/>

            <button
              onClick={() => setConfirmOpen(true)}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 px-2 py-1.5 text-xs text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:hover:bg-red-950 sm:px-3 sm:py-2 sm:text-sm"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Supprimer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenu */}
<div className="mx-auto max-w-[21cm] p-4 pt-6 sm:p-8">
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
  >
    {/* Label A4 */}
    <div className="mb-2 flex items-center justify-center gap-2">
      <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">
        Format A4
      </span>
      <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
    </div>

    {/* Feuille A4 */}
    <div
      className="relative bg-white shadow-[0_4px_24px_rgba(0,0,0,0.10)]"
      style={{
        width: "100%",
        aspectRatio: "210/297",
        padding: "48px",
      }}
    >
      {/* Bande décorative */}
      <div className="mb-8 h-1 w-full rounded-full bg-zinc-900" />

      {/* En-tête */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            FACTURE
          </h1>
          <p className="mt-1 text-xs text-zinc-400">N° {invoice.number}</p>
        </div>
        <div className="text-right">
          <div className="ml-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900">
            <span className="text-base font-bold text-white">F</span>
          </div>
          <span className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClasses(invoice.status)}`}>
            {getStatusLabel(invoice.status)}
          </span>
        </div>
      </div>

      {/* Émetteur / Client */}
      <div className="mb-8 grid grid-cols-2 gap-8">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            Émetteur
          </p>
          <p className="text-sm font-semibold text-zinc-900">MonEntreprise SARL</p>
          <p className="text-sm text-zinc-500">contact@monentreprise.bj</p>
          <p className="text-sm text-zinc-500">+229 97 00 00 00</p>
          <p className="text-sm text-zinc-500">Cotonou, Bénin</p>
        </div>
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            Client
          </p>
          <p className="text-sm font-semibold text-zinc-900">{invoice.clientName}</p>
          {client && (
            <>
              <p className="text-sm text-zinc-500">{client.email}</p>
              <p className="text-sm text-zinc-500">{client.phone}</p>
              <p className="text-sm text-zinc-500">{client.address}</p>
            </>
          )}
        </div>
      </div>

      {/* Dates */}
      <div className="mb-8 grid grid-cols-2 gap-8">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            Date d'émission
          </p>
          <p className="text-sm font-medium text-zinc-800">
            {formatDate(invoice.issueDate)}
          </p>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            Date d'échéance
          </p>
          <p className="text-sm font-medium text-zinc-800">
            {formatDate(invoice.dueDate)}
          </p>
        </div>
      </div>

      {/* Articles */}
      <table className="mb-6 w-full">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50">
            <th className="py-2 pl-3 text-left text-xs font-semibold text-zinc-500">Article</th>
            <th className="py-2 text-center text-xs font-semibold text-zinc-500">Qté</th>
            <th className="py-2 text-center text-xs font-semibold text-zinc-500">TVA</th>
            <th className="py-2 pr-3 text-right text-xs font-semibold text-zinc-500">Montant HT</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b border-zinc-100">
              <td className="py-2.5 pl-3 text-sm text-zinc-800">{item.name}</td>
              <td className="py-2.5 text-center text-sm text-zinc-500">{item.quantity}</td>
              <td className="py-2.5 text-center text-sm text-zinc-500">{item.taxRate}%</td>
              <td className="py-2.5 pr-3 text-right text-sm font-medium text-zinc-800">
                {formatCFA(item.quantity * item.unitPrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totaux */}
      <div className="ml-auto w-56 space-y-1.5">
        <div className="flex justify-between text-sm text-zinc-500">
          <span>Sous-total HT</span>
          <span>{formatCFA(invoice.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-500">
          <span>TVA</span>
          <span>{formatCFA(invoice.taxAmount)}</span>
        </div>
        {invoice.discount > 0 && (
          <div className="flex justify-between text-sm text-red-500">
            <span>Remise</span>
            <span>- {formatCFA(invoice.discount)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-zinc-200 pt-2 text-base font-bold text-zinc-900">
          <span>Total TTC</span>
          <span>{formatCFA(invoice.total)}</span>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="mt-6 rounded bg-zinc-50 px-4 py-3">
          <p className="text-xs text-zinc-400">{invoice.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-8 left-12 right-12">
        <div className="h-px w-full bg-zinc-100" />
        <p className="mt-2 text-center text-[10px] text-zinc-300">
          Factura Africa — {invoice.number}
        </p>
      </div>
    </div>
  </motion.div>
</div>

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