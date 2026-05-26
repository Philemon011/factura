"use server"

import { createClient } from "@/lib/supabase/server"
import { Company } from "@/types"

export async function getCompany(): Promise<Company> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return {
    name: "",
    email: "",
    phone: "",
    address: "",
    logoUrl: null,
    taxId: "",
  }

  const { data, error } = await supabase
    .from("company")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (error || !data) return {
    name: "",
    email: "",
    phone: "",
    address: "",
    logoUrl: null,
    taxId: "",
  }

  return {
    name: data.name,
    email: data.email || "",
    phone: data.phone || "",
    address: data.address || "",
    logoUrl: data.logo_url || null,
    taxId: data.tax_id || "",
  }
}

export async function updateCompany(data: Partial<Company>): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Non authentifié")

  const { data: existing } = await supabase
    .from("company")
    .select("id")
    .eq("user_id", user.id)
    .single()

  if (existing) {
    const { error } = await supabase
      .from("company")
      .update({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        logo_url: data.logoUrl,
        tax_id: data.taxId,
      })
      .eq("user_id", user.id)

    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase
      .from("company")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        logo_url: data.logoUrl,
        tax_id: data.taxId,
        user_id: user.id,
      })

    if (error) throw new Error(error.message)
  }
}