"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, ChevronLeft, Send, Save, Eye, EyeOff } from "lucide-react"
import { LineItem } from "@/types"
import { addInvoice, getInvoices } from "@/actions/invoices"
import { getClients } from "@/actions/clients"
import { generateInvoiceNumber, formatCFA, formatDate } from "@/lib/utils/formatters"
import LineItemRow from "@/components/invoices/LineItemRow"
import InvoiceSummary from "@/components/invoices/InvoiceSummary"

function generateId() {
  return Math.random().toString(36).slice(2, 9)
}

const defaultItem = (): LineItem => ({
  id: generateId(),
  name: "",
  quantity: 1,
  unitPrice: 0,
  taxRate: 18,
  amount: 0,
})

function A4Preview({
  invoiceNumber,
  selectedClient,
  issueDate,
  dueDate,
  items,
  subtotal,
  taxAmount,
  hasDiscount,
  discount,
  total,
  notes,
}: {
  invoiceNumber: string
  selectedClient: { name: string; email: string; address: string } | undefined
  issueDate: string
  dueDate: string
  items: LineItem[]
  subtotal: number
  taxAmount: number
  hasDiscount: boolean
  discount: number
  total: number
  notes: string
}) {
  return (
    <div>
      {/* Label */}
      <div className="mb-2 flex items-center justify-center gap-2">
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">
          Aperçu A4
        </span>
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Feuille A4 */}
      <div
        className="relative mx-auto bg-white shadow-[0_2px_16px_rgba(0,0,0,0.10)]"
        style={{ width: "100%", aspectRatio: "210/297", padding: "32px" }}
      >
        {/* Bande décorative */}
        <div className="mb-6 h-1 w-full rounded-full bg-zinc-900" />

        {/* En-tête */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-zinc-900">FACTURE</h3>
            <p className="mt-0.5 text-[10px] text-zinc-400">N° {invoiceNumber}</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900">
            <span className="text-xs font-bold text-white">F</span>
          </div>
        </div>

        {/* Infos */}
        {selectedClient ? (
          <div className="mb-5 grid grid-cols-2 gap-4 text-[10px]">
            <div>
              <p className="mb-1 font-semibold uppercase tracking-widest text-zinc-400">Émetteur</p>
              <p className="font-semibold text-zinc-800">MonEntreprise SARL</p>
              <p className="text-zinc-500">contact@monentreprise.bj</p>
              <p className="text-zinc-500">Cotonou, Bénin</p>
            </div>
            <div>
              <p className="mb-1 font-semibold uppercase tracking-widest text-zinc-400">Client</p>
              <p className="font-semibold text-zinc-800">{selectedClient.name}</p>
              <p className="text-zinc-500">{selectedClient.email}</p>
              <p className="text-zinc-500">{selectedClient.address}</p>
            </div>
          </div>
        ) : (
          <div className="mb-5 rounded-lg bg-zinc-50 px-3 py-2 text-[10px] text-zinc-400">
            Sélectionnez un client pour voir l'aperçu complet
          </div>
        )}

        {/* Dates */}
        <div className="mb-5 grid grid-cols-2 gap-4 text-[10px]">
          <div>
            <p className="text-zinc-400">Date d'émission</p>
            <p className="font-semibold text-zinc-800">{formatDate(issueDate)}</p>
          </div>
          <div>
            <p className="text-zinc-400">Échéance</p>
            <p className="font-semibold text-zinc-800">{formatDate(dueDate)}</p>
          </div>
        </div>

        {/* Articles */}
        <table className="mb-4 w-full text-[10px]">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <th className="py-1.5 pl-2 text-left font-semibold text-zinc-500">Article</th>
              <th className="py-1.5 text-center font-semibold text-zinc-500">Qté</th>
              <th className="py-1.5 pr-2 text-right font-semibold text-zinc-500">Montant HT</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-zinc-100">
                <td className="py-1.5 pl-2 text-zinc-700">{item.name || "—"}</td>
                <td className="py-1.5 text-center text-zinc-500">{item.quantity}</td>
                <td className="py-1.5 pr-2 text-right font-medium text-zinc-800">
                  {formatCFA(item.quantity * item.unitPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totaux */}
        <div className="ml-auto w-48 space-y-1 text-[10px]">
          <div className="flex justify-between text-zinc-500">
            <span>Sous-total HT</span>
            <span>{formatCFA(subtotal)}</span>
          </div>
          <div className="flex justify-between text-zinc-500">
            <span>TVA (18%)</span>
            <span>{formatCFA(taxAmount)}</span>
          </div>
          {hasDiscount && discount > 0 && (
            <div className="flex justify-between text-red-500">
              <span>Remise</span>
              <span>- {formatCFA(discount)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-zinc-200 pt-1.5 text-xs font-bold text-zinc-900">
            <span>Total TTC</span>
            <span>{formatCFA(total)}</span>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="mt-4 rounded bg-zinc-50 px-3 py-2">
            <p className="text-[9px] text-zinc-400">{notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="absolute bottom-6 left-8 right-8">
          <div className="h-px w-full bg-zinc-100" />
          <p className="mt-2 text-center text-[8px] text-zinc-300">
            Factura Africa — {invoiceNumber}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function NewInvoicePage() {
  const router = useRouter()
  const [clients, setClients] = useState<any[]>([])
  const [invoiceCount, setInvoiceCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const [clientId, setClientId] = useState("")
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  )
  const [items, setItems] = useState<LineItem[]>([defaultItem()])
  const [hasDiscount, setHasDiscount] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [notes, setNotes] = useState("")
  const [showPreview, setShowPreview] = useState(true)

  useEffect(() => {
    getClients().then(setClients)
    getInvoices().then((invs) => setInvoiceCount(invs.length))
  }, [])

  const invoiceNumber = generateInvoiceNumber(invoiceCount)

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const taxAmount = items.reduce((sum, item) => {
    const ht = item.quantity * item.unitPrice
    return sum + Math.round(ht * (item.taxRate / 100))
  }, 0)
  const total = Math.max(0, subtotal + taxAmount - discount)
  const selectedClient = clients.find((c) => c.id === clientId)

  const handleItemChange = (id: string, field: keyof LineItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => item.id === id ? { ...item, [field]: value } : item)
    )
  }

  const handleAddItem = () => setItems((prev) => [...prev, defaultItem()])

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleSubmit = async (status: "draft" | "sent") => {
    if (!clientId) {
      alert("Veuillez sélectionner un client")
      return
    }
    if (items.some((item) => !item.name)) {
      alert("Veuillez remplir le nom de tous les articles")
      return
    }
    setLoading(true)
    try {
      await addInvoice(
        {
          status,
          clientId,
          clientName: selectedClient?.name || "",
          issueDate,
          dueDate,
          items,
          subtotal,
          taxAmount,
          discount: hasDiscount ? discount : 0,
          total,
          notes,
        },
        invoiceCount
      )
      router.push("/invoices")
    } catch (error) {
      console.error(error)
      alert("Erreur lors de la création de la facture")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex h-screen flex-col bg-zinc-50 pt-14 dark:bg-zinc-950 sm:pt-0">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900 sm:px-8 sm:py-4"
      >
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
              Nouvelle facture
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-shrink-0 items-center gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 sm:px-3 sm:py-2 sm:text-sm"
            >
              {showPreview
                ? <><EyeOff className="h-3.5 w-3.5" /><span className="hidden sm:inline ml-1">Masquer</span></>
                : <><Eye className="h-3.5 w-3.5" /><span className="hidden sm:inline ml-1">Aperçu</span></>
              }
            </button>
            <button
  onClick={() => handleSubmit("draft")}
  disabled={loading}
  className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 sm:px-3 sm:py-2 sm:text-sm"
>
  <Save className="h-3.5 w-3.5" />
  <span className="hidden sm:inline">
    {loading ? "Enregistrement..." : "Brouillon"}
  </span>
</button>
<button
  onClick={() => handleSubmit("sent")}
  disabled={loading}
  className="flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 sm:px-4 sm:py-2 sm:text-sm"
>
  <Send className="h-3.5 w-3.5" />
  <span className="hidden sm:inline">
    {loading ? "Envoi..." : "Envoyer"}
  </span>
</button>
          </div>
        </div>
      </motion.div>

      {/* Zone principale */}
      <div className="flex flex-1 gap-0 overflow-hidden sm:gap-6 sm:p-6 lg:p-8">

        {/* Formulaire gauche */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="flex-1 overflow-y-auto p-4 sm:p-0"
        >
          <div className="space-y-4">
            <div>
              <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl">
                Créer une facture
              </h1>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                Créez une nouvelle facture et livrez-la instantanément.
              </p>
            </div>

            {/* Informations facture */}
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-5">
              <h2 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Informations de la facture
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Client *
                  </label>
                  <select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                  >
                    <option value="">Sélectionner un client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Numéro de facture
                  </label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    readOnly
                    className="w-full rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 text-sm text-zinc-400 outline-none dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Date d'émission *
                  </label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Date d'échéance *
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                  />
                </div>
              </div>
            </div>

            {/* Articles */}
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-5">
              <h2 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Articles / Services
              </h2>
              <div className="space-y-3">
                {items.map((item, index) => (
                  <LineItemRow
                    key={item.id}
                    item={item}
                    index={index}
                    onChange={handleItemChange}
                    onDelete={handleDeleteItem}
                    canDelete={items.length > 1}
                  />
                ))}
              </div>
              <button
                onClick={handleAddItem}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 py-3 text-sm text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-300"
              >
                <Plus className="h-4 w-4" />
                Ajouter un article
              </button>
            </div>

            {/* Notes */}
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-5">
              <h2 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Notes (optionnel)
              </h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Conditions de paiement, remerciements..."
                rows={3}
                className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-800 outline-none transition-colors placeholder:text-zinc-300 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder:text-zinc-600"
              />
            </div>

            {/* Récapitulatif */}
            <InvoiceSummary
              items={items}
              discount={discount}
              onDiscountChange={setDiscount}
              hasDiscount={hasDiscount}
              onToggleDiscount={() => setHasDiscount(!hasDiscount)}
            />
          </div>
        </motion.div>

        {/* Aperçu A4 — desktop sidebar */}
<AnimatePresence>
  {showPreview && (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25 }}
      className="hidden overflow-y-auto lg:block lg:w-[440px] lg:flex-shrink-0"
    >
      <A4Preview
        invoiceNumber={invoiceNumber}
        selectedClient={selectedClient}
        issueDate={issueDate}
        dueDate={dueDate}
        items={items}
        subtotal={subtotal}
        taxAmount={taxAmount}
        hasDiscount={hasDiscount}
        discount={discount}
        total={total}
        notes={notes}
      />
    </motion.div>
  )}
</AnimatePresence>

{/* Aperçu A4 — modale mobile */}
<AnimatePresence>
  {showPreview && (
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-100 dark:bg-zinc-950 lg:hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col h-full"
      >
        {/* Header modale */}
        <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Aperçu A4
          </span>
          <button
            onClick={() => setShowPreview(false)}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <EyeOff className="h-4 w-4" />
          </button>
        </div>
        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          <A4Preview
            invoiceNumber={invoiceNumber}
            selectedClient={selectedClient}
            issueDate={issueDate}
            dueDate={dueDate}
            items={items}
            subtotal={subtotal}
            taxAmount={taxAmount}
            hasDiscount={hasDiscount}
            discount={discount}
            total={total}
            notes={notes}
          />
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
      </div>
    </div>
  )
}