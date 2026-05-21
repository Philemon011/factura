import { create } from "zustand"
import { Invoice, InvoiceStatus, LineItem } from "@/types"
import { mockInvoices } from "@/lib/mock-data"
import { generateInvoiceNumber } from "@/lib/utils/formatters"

interface InvoiceStore {
  invoices: Invoice[]

  // Actions
  addInvoice: (data: Omit<Invoice, "id" | "number" | "createdAt">) => Invoice
  updateInvoice: (id: string, data: Partial<Invoice>) => void
  deleteInvoice: (id: string) => void
  updateStatus: (id: string, status: InvoiceStatus) => void
  getInvoice: (id: string) => Invoice | undefined
}

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoices: mockInvoices,

  addInvoice: (data) => {
    const { invoices } = get()
    const newInvoice: Invoice = {
      ...data,
      id: Math.random().toString(36).slice(2, 9),
      number: generateInvoiceNumber(invoices.length),
      createdAt: new Date().toISOString().split("T")[0],
    }
    set((state) => ({ invoices: [newInvoice, ...state.invoices] }))
    return newInvoice
  },

  updateInvoice: (id, data) => {
    set((state) => ({
      invoices: state.invoices.map((inv) =>
        inv.id === id ? { ...inv, ...data } : inv
      ),
    }))
  },

  deleteInvoice: (id) => {
    set((state) => ({
      invoices: state.invoices.filter((inv) => inv.id !== id),
    }))
  },

  updateStatus: (id, status) => {
    set((state) => ({
      invoices: state.invoices.map((inv) =>
        inv.id === id ? { ...inv, status } : inv
      ),
    }))
  },

  getInvoice: (id) => {
    return get().invoices.find((inv) => inv.id === id)
  },
}))