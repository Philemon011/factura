"use server"

import { createClient } from "@/lib/supabase/server"
import { Invoice, InvoiceStatus, LineItem } from "@/types"

export async function getInvoices(): Promise<Invoice[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from("invoices")
    .select(`*, invoice_items(*)`)
    .eq("user_id", user.id)
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
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from("invoices")
    .select(`*, invoice_items(*)`)
    .eq("id", id)
    .eq("user_id", user.id)
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
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Non authentifié")

  // Compter les factures de CET utilisateur uniquement
  const { count } = await supabase
    .from("invoices")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  const year = new Date().getFullYear()
  const number = `FAC-${year}-${String((count || 0) + 1).padStart(3, "0")}`

  // Vérifier si le numéro existe déjà pour cet utilisateur
  const { data: existing } = await supabase
    .from("invoices")
    .select("id")
    .eq("number", number)
    .eq("user_id", user.id)
    .single()

  // Si le numéro existe, ajouter un suffixe unique
  const finalNumber = existing
    ? `FAC-${year}-${String((count || 0) + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`
    : number

  const { data: created, error } = await supabase
    .from("invoices")
    .insert({
      number: finalNumber,
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
      user_id: user.id,
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
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Non authentifié")

  const { error } = await supabase
    .from("invoices")
    .update({ status })
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) throw new Error(error.message)
}

export async function deleteInvoice(id: string): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Non authentifié")

  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) throw new Error(error.message)
}

export async function getDashboardStats() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return {
      totalInvoices: 0,
      totalBilled: 0,
      totalPaid: 0,
      totalPending: 0,
    }

    const { data, error } = await supabase
      .from("invoices")
      .select("status, total")
      .eq("user_id", user.id)

    if (error || !data) return {
      totalInvoices: 0,
      totalBilled: 0,
      totalPaid: 0,
      totalPending: 0,
    }

    const totalInvoices = data.length
    const totalBilled = data.reduce((sum, inv) => sum + inv.total, 0)
    const totalPaid = data
      .filter((inv) => inv.status === "paid")
      .reduce((sum, inv) => sum + inv.total, 0)
    const totalPending = data
      .filter((inv) => inv.status === "sent" || inv.status === "overdue")
      .reduce((sum, inv) => sum + inv.total, 0)

    return { totalInvoices, totalBilled, totalPaid, totalPending }
  } catch {
    return {
      totalInvoices: 0,
      totalBilled: 0,
      totalPaid: 0,
      totalPending: 0,
    }
  }
}

export async function getChartData() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { monthlyData: [], statusData: [] }

    const { data, error } = await supabase
      .from("invoices")
      .select("status, total, created_at")
      .eq("user_id", user.id)

    if (error || !data) return { monthlyData: [], statusData: [] }

    // Données mensuelles — 6 derniers mois
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (5 - i))
      return {
        month: date.toLocaleDateString("fr-FR", { month: "short" }),
        year: date.getFullYear(),
        monthNum: date.getMonth(),
        facturé: 0,
        payé: 0,
      }
    })

    data.forEach((inv) => {
      const invDate = new Date(inv.created_at)
      const monthIndex = months.findIndex(
        (m) =>
          m.monthNum === invDate.getMonth() &&
          m.year === invDate.getFullYear()
      )
      if (monthIndex !== -1) {
        months[monthIndex].facturé += inv.total
        if (inv.status === "paid") {
          months[monthIndex].payé += inv.total
        }
      }
    })

    const monthlyData = months.map((m) => ({
      month: m.month,
      facturé: m.facturé,
      payé: m.payé,
    }))

    // Données par statut
    const statusCounts = {
      draft: 0,
      sent: 0,
      paid: 0,
      overdue: 0,
    }

    data.forEach((inv) => {
      statusCounts[inv.status as keyof typeof statusCounts]++
    })

    const statusData = [
      { name: "Brouillon", value: statusCounts.draft, color: "#a1a1aa" },
      { name: "Envoyée", value: statusCounts.sent, color: "#3b82f6" },
      { name: "Payée", value: statusCounts.paid, color: "#22c55e" },
      { name: "En retard", value: statusCounts.overdue, color: "#ef4444" },
    ].filter((s) => s.value > 0)

    return { monthlyData, statusData }
  } catch {
    return { monthlyData: [], statusData: [] }
  }
}