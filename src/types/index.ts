// Statuts possibles d'une facture
export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue"

// Une ligne de produit/service dans la facture
export interface LineItem {
  id: string
  name: string
  quantity: number
  unitPrice: number   // en francs CFA (entier)
  taxRate: number     // en % ex: 18
  amount: number      // quantity * unitPrice (calculé)
}

// Un client
export interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  createdAt: string
}

// Une facture complète
export interface Invoice {
  id: string
  number: string         // ex: "FAC-2024-001"
  status: InvoiceStatus
  clientId: string
  clientName: string     // dénormalisé pour l'affichage
  issueDate: string      // ISO date string
  dueDate: string        // ISO date string
  items: LineItem[]
  subtotal: number       // somme des montants HT
  taxAmount: number      // total TVA
  discount: number       // montant remise (0 si pas de remise)
  total: number          // montant final
  notes: string
  createdAt: string
}

// Paramètres de l'entreprise
export interface Company {
  name: string
  email: string
  phone: string
  address: string
  logoUrl: string | null
  taxId: string          // numéro fiscal
}

// Stats pour le dashboard
export interface DashboardStats {
  totalInvoices: number
  totalBilled: number    // somme de tous les totaux
  totalPaid: number      // somme des factures "paid"
  totalPending: number   // somme des factures "sent" + "overdue"
}