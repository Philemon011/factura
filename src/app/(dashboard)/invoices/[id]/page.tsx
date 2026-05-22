"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Trash2 } from "lucide-react"
import { useInvoiceStore } from "@/stores/invoice-store"
import { useClientStore } from "@/stores/client-store"
import { formatCFA, formatDate, getStatusLabel, getStatusClasses } from "@/lib/utils/formatters"
import { InvoiceStatus } from "@/types"
import ConfirmModal from "@/components/ui/ConfirmModal"

export default function InvoiceDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const getInvoice = useInvoiceStore((state) => state.getInvoice)
  const updateStatus = useInvoiceStore((state) => state.updateStatus)
  const deleteInvoice = useInvoiceStore((state) => state.deleteInvoice)
  const getClient = useClientStore((state) => state.getClient)

  const [confirmOpen, setConfirmOpen] = useState(false)

  const invoice = getInvoice(id as string)

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

  const client = getClient(invoice.clientId)

  const handleConfirmDelete = () => {
    deleteInvoice(invoice.id)
    router.push("/invoices")
  }

  const handleStatusChange = (status: InvoiceStatus) => {
    updateStatus(invoice.id, status)
  }

  return (
    <div className="min-h-full bg-zinc-50 pt-14 dark:bg-zinc-950 sm:pt-0">

      {/* Header */}
      <div className="border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900 sm:px-8 sm:py-4">
        <div className="flex items-center justify-between gap-3">

          {/* Breadcrumb */}
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

          {/* Actions */}
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

            <button
              onClick={() => setConfirmOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 px-2 py-1.5 text-xs text-red-500 transition-colors hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950 sm:px-3 sm:py-2 sm:text-sm"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Supprimer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="mx-auto max-w-3xl p-4 pt-6 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8"
        >

          {/* En-tête facture */}
          <div className="mb-6 flex items-start justify-between sm:mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
                FACTURE
              </h1>
              <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                N° {invoice.number}
              </p>
            </div>
            <div className="text-right">
              <div className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100 sm:h-12 sm:w-12">
                <span className="text-sm font-bold text-white dark:text-zinc-900">F</span>
              </div>
              <span className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClasses(invoice.status)}`}>
                {getStatusLabel(invoice.status)}
              </span>
            </div>
          </div>

          {/* Infos émetteur / client */}
          <div className="mb-6 grid grid-cols-2 gap-4 sm:mb-8 sm:gap-8">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 sm:text-xs">
                Émetteur
              </p>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 sm:text-sm">
                MonEntreprise SARL
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                contact@monentreprise.bj
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                +229 97 00 00 00
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                Cotonou, Bénin
              </p>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 sm:text-xs">
                Client
              </p>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 sm:text-sm">
                {invoice.clientName}
              </p>
              {client && (
                <>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                    {client.email}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                    {client.phone}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                    {client.address}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="mb-6 grid grid-cols-2 gap-4 sm:mb-8 sm:gap-8">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 sm:text-xs">
                Date d'émission
              </p>
              <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200 sm:text-sm">
                {formatDate(invoice.issueDate)}
              </p>
            </div>
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 sm:text-xs">
                Date d'échéance
              </p>
              <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200 sm:text-sm">
                {formatDate(invoice.dueDate)}
              </p>
            </div>
          </div>

          {/* Tableau articles — scroll horizontal mobile */}
          <div className="mb-6 overflow-x-auto">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="pb-3 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400 sm:text-xs">
                    Article
                  </th>
                  <th className="pb-3 text-center text-[10px] font-semibold uppercase tracking-widest text-zinc-400 sm:text-xs">
                    Qté
                  </th>
                  <th className="pb-3 text-center text-[10px] font-semibold uppercase tracking-widest text-zinc-400 sm:text-xs">
                    TVA
                  </th>
                  <th className="pb-3 text-right text-[10px] font-semibold uppercase tracking-widest text-zinc-400 sm:text-xs">
                    Montant HT
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-zinc-50 dark:border-zinc-800"
                  >
                    <td className="py-3 text-xs text-zinc-800 dark:text-zinc-200 sm:text-sm">
                      {item.name}
                    </td>
                    <td className="py-3 text-center text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                      {item.quantity}
                    </td>
                    <td className="py-3 text-center text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                      {item.taxRate}%
                    </td>
                    <td className="py-3 text-right text-xs font-medium text-zinc-800 dark:text-zinc-200 sm:text-sm">
                      {formatCFA(item.quantity * item.unitPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totaux */}
          <div className="ml-auto w-full max-w-xs space-y-2">
            <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
              <span>Sous-total HT</span>
              <span>{formatCFA(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
              <span>TVA</span>
              <span>{formatCFA(invoice.taxAmount)}</span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between text-xs text-red-500 sm:text-sm">
                <span>Remise</span>
                <span>- {formatCFA(invoice.discount)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-zinc-200 pt-2 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-zinc-100 sm:text-base">
              <span>Total TTC</span>
              <span>{formatCFA(invoice.total)}</span>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-6 rounded-lg bg-zinc-50 px-4 py-3 dark:bg-zinc-800 sm:mt-8">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {invoice.notes}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modale confirmation */}
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