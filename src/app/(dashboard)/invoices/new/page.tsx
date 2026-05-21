"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, ChevronLeft, Send, Save } from "lucide-react"
import { LineItem } from "@/types"
import { mockClients, mockInvoices } from "@/lib/mock-data"
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

export default function NewInvoicePage() {
  const invoiceNumber = generateInvoiceNumber(mockInvoices.length)
  const today = new Date().toISOString().split("T")[0]
  const defaultDue = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0]

  const [clientId, setClientId] = useState("")
  const [issueDate, setIssueDate] = useState(today)
  const [dueDate, setDueDate] = useState(defaultDue)
  const [items, setItems] = useState<LineItem[]>([defaultItem()])
  const [hasDiscount, setHasDiscount] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [notes, setNotes] = useState("")
  const [showPreview, setShowPreview] = useState(true)

  // Calculs
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const taxAmount = items.reduce((sum, item) => {
    const ht = item.quantity * item.unitPrice
    return sum + Math.round(ht * (item.taxRate / 100))
  }, 0)
  const total = Math.max(0, subtotal + taxAmount - discount)
  const selectedClient = mockClients.find((c) => c.id === clientId)

  // Handlers lignes
  const handleItemChange = (id: string, field: keyof LineItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  const handleAddItem = () => {
    setItems((prev) => [...prev, defaultItem()])
  }

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-zinc-50">

      {/* Header */}
      <div className="border-b border-zinc-200 bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/invoices"
              className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Factures
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="text-sm font-medium text-zinc-700">
              Nouvelle facture
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              {showPreview ? "Masquer" : "Aperçu"}
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors">
              <Save className="h-4 w-4" />
              Brouillon
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors">
              <Send className="h-4 w-4" />
              Envoyer
            </button>
          </div>
        </div>
      </div>

      {/* Zone principale scrollable en 2 colonnes */}
<div className="flex h-[calc(100vh-65px)] gap-6 overflow-hidden p-8">

  {/* Formulaire gauche — scroll indépendant */}
  <div className="flex-1 space-y-5 overflow-y-auto pr-2">
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">
        Créer une facture
      </h1>
      <p className="mt-0.5 text-sm text-zinc-500">
        Créez une nouvelle facture et livrez-la instantanément.
      </p>
    </div>

          {/* Informations facture */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold text-zinc-900">
              Informations de la facture
            </h2>

            <div className="grid grid-cols-2 gap-4">

              {/* Client */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-500">
                  Client *
                </label>
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 outline-none focus:border-zinc-400"
                >
                  <option value="">Sélectionner un client</option>
                  {mockClients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Numéro facture */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-500">
                  Numéro de facture
                </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  readOnly
                  className="w-full rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 text-sm text-zinc-400 outline-none"
                />
              </div>

              {/* Date émission */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-500">
                  Date d'émission *
                </label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 outline-none focus:border-zinc-400"
                />
              </div>

              {/* Date échéance */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-500">
                  Date d'échéance *
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 outline-none focus:border-zinc-400"
                />
              </div>

            </div>
          </div>

          {/* Articles / Services */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold text-zinc-900">
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
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 py-3 text-sm text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Ajouter un article
            </button>
          </div>

          {/* Notes */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-zinc-900">
              Notes (optionnel)
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Conditions de paiement, remerciements..."
              rows={3}
              className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-800 outline-none placeholder:text-zinc-300 focus:border-zinc-400"
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

        {/* Aperçu droite — scroll indépendant */}
  {showPreview && (
    <div className="w-[420px] flex-shrink-0 overflow-y-auto">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">

              {/* Header aperçu */}
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
                    FACTURE
                  </h3>
                  <p className="mt-0.5 text-xs text-zinc-400">
                    N° {invoiceNumber}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900">
                  <span className="text-sm font-bold text-white">F</span>
                </div>
              </div>

              {/* Infos client */}
              {selectedClient ? (
                <div className="mb-5 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="mb-1 font-medium text-zinc-400">Émetteur</p>
                    <p className="font-medium text-zinc-800">MonEntreprise</p>
                    <p className="text-zinc-500">contact@monentreprise.bj</p>
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-zinc-400">Client</p>
                    <p className="font-medium text-zinc-800">{selectedClient.name}</p>
                    <p className="text-zinc-500">{selectedClient.email}</p>
                    <p className="text-zinc-500">{selectedClient.address}</p>
                  </div>
                </div>
              ) : (
                <div className="mb-5 rounded-lg bg-zinc-50 px-4 py-3 text-xs text-zinc-400">
                  Sélectionnez un client pour voir l'aperçu complet
                </div>
              )}

              {/* Dates */}
              <div className="mb-5 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-zinc-400">Date d'émission</p>
                  <p className="font-medium text-zinc-800">{formatDate(issueDate)}</p>
                </div>
                <div>
                  <p className="text-zinc-400">Échéance</p>
                  <p className="font-medium text-zinc-800">{formatDate(dueDate)}</p>
                </div>
              </div>

              {/* Tableau articles */}
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="pb-2 text-left font-medium text-zinc-400">Article</th>
                    <th className="pb-2 text-center font-medium text-zinc-400">Qté</th>
                    <th className="pb-2 text-right font-medium text-zinc-400">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-zinc-50">
                      <td className="py-2 text-zinc-700">
                        {item.name || "—"}
                      </td>
                      <td className="py-2 text-center text-zinc-500">
                        {item.quantity}
                      </td>
                      <td className="py-2 text-right font-medium text-zinc-800">
                        {formatCFA(item.quantity * item.unitPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totaux */}
              <div className="mt-4 space-y-1.5 border-t border-zinc-100 pt-4 text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Sous-total HT</span>
                  <span>{formatCFA(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>TVA</span>
                  <span>{formatCFA(taxAmount)}</span>
                </div>
                {hasDiscount && discount > 0 && (
                  <div className="flex justify-between text-red-500">
                    <span>Remise</span>
                    <span>- {formatCFA(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-zinc-100 pt-2 text-sm font-semibold text-zinc-900">
                  <span>Total TTC</span>
                  <span>{formatCFA(total)}</span>
                </div>
              </div>

              {/* Notes */}
              {notes && (
                <p className="mt-4 text-[10px] text-zinc-400">{notes}</p>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  )
}