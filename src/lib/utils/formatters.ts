import { InvoiceStatus } from "@/types"

// Formate un montant en FCFA
// ex: 472000 → "472 000 FCFA"
export function formatCFA(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Formate une date ISO en date lisible
// ex: "2024-01-15" → "15 janv. 2024"
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString))
}

// Retourne le libellé français d'un statut
export function getStatusLabel(status: InvoiceStatus): string {
  const labels: Record<InvoiceStatus, string> = {
    draft: "Brouillon",
    sent: "Envoyée",
    paid: "Payée",
    overdue: "En retard",
  }
  return labels[status]
}

// Retourne les classes CSS Tailwind selon le statut
export function getStatusClasses(status: InvoiceStatus): string {
  const classes: Record<InvoiceStatus, string> = {
    draft: "bg-zinc-100 text-zinc-600",
    sent: "bg-blue-100 text-blue-700",
    paid: "bg-green-100 text-green-700",
    overdue: "bg-red-100 text-red-700",
  }
  return classes[status]
}

// Calcule le montant d'une ligne
// ex: qty=2, unitPrice=250000, taxRate=18 → { ht: 500000, tax: 90000, ttc: 590000 }
export function calcLineItem(
  quantity: number,
  unitPrice: number,
  taxRate: number
) {
  const ht = quantity * unitPrice
  const tax = Math.round(ht * (taxRate / 100))
  const ttc = ht + tax
  return { ht, tax, ttc }
}

// Génère un numéro de facture automatique
// ex: (5) → "FAC-2024-006"
export function generateInvoiceNumber(count: number): string {
  const year = new Date().getFullYear()
  const num = String(count + 1).padStart(3, "0")
  return `FAC-${year}-${num}`
}