"use server"

import { createClient } from "@/lib/supabase/server"
import { Invoice, InvoiceStatus, LineItem } from "@/types"

export async function getInvoices(): Promise<Invoice[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("invoices")
    .select(`*, invoice_items(*)`)
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)

  return data.map((inv) => ({
    id: inv.id,
    number: inv.number,
    status: inv.status as InvoiceStatus,
    clientId: inv.client_id || "",
    clientName: inv.client_name,
    issueDate: inv.issue_date,
    dueDate: inv.due_date,
    subtotal: inv.subtotal,
    taxAmount: inv.tax_amount,
    discount: inv.discount,
    total: inv.total,
    notes: inv.notes || "",
    createdAt: inv.created_at,
    items: (inv.invoice_items || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unit_price,
      taxRate: item.tax_rate,
      amount: item.amount,
    })),
  }))
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("invoices")
    .select(`*, invoice_items(*)`)
    .eq("id", id)
    .single()

  if (error) return null

  return {
    id: data.id,
    number: data.number,
    status: data.status as InvoiceStatus,
    clientId: data.client_id || "",
    clientName: data.client_name,
    issueDate: data.issue_date,
    dueDate: data.due_date,
    subtotal: data.subtotal,
    taxAmount: data.tax_amount,
    discount: data.discount,
    total: data.total,
    notes: data.notes || "",
    createdAt: data.created_at,
    items: (data.invoice_items || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unit_price,
      taxRate: item.tax_rate,
      amount: item.amount,
    })),
  }
}

export async function addInvoice(
  data: Omit<Invoice, "id" | "number" | "createdAt">,
  invoiceCount: number
): Promise<Invoice> {
  const supabase = await createClient()

  const year = new Date().getFullYear()
  const number = `FAC-${year}-${String(invoiceCount + 1).padStart(3, "0")}`

  const { data: created, error } = await supabase
    .from("invoices")
    .insert({
      number,
      status: data.status,
      client_id: data.clientId || null,
      client_name: data.clientName,
      issue_date: data.issueDate,
      due_date: data.dueDate,
      subtotal: data.subtotal,
      tax_amount: data.taxAmount,
      discount: data.discount,
      total: data.total,
      notes: data.notes,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)

  if (data.items.length > 0) {
    const { error: itemsError } = await supabase
      .from("invoice_items")
      .insert(
        data.items.map((item) => ({
          invoice_id: created.id,
          name: item.name,
          quantity: item.quantity,
          unit_price: item.unitPrice,
          tax_rate: item.taxRate,
          amount: item.quantity * item.unitPrice,
        }))
      )
    if (itemsError) throw new Error(itemsError.message)
  }

  return {
    ...data,
    id: created.id,
    number: created.number,
    createdAt: created.created_at,
  }
}

export async function updateInvoiceStatus(
  id: string,
  status: InvoiceStatus
): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("invoices")
    .update({ status })
    .eq("id", id)

  if (error) throw new Error(error.message)
}

export async function deleteInvoice(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)
}

export async function getDashboardStats() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("invoices")
    .select("status, total")

  if (error) throw new Error(error.message)

  const totalInvoices = data.length
  const totalBilled = data.reduce((sum, inv) => sum + inv.total, 0)
  const totalPaid = data
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.total, 0)
  const totalPending = data
    .filter((inv) => inv.status === "sent" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0)

  return { totalInvoices, totalBilled, totalPaid, totalPending }
}