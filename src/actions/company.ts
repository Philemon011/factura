"use server"

import { createClient } from "@/lib/supabase/server"
import { Company } from "@/types"

export async function getCompany(): Promise<Company> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("company")
    .select("*")
    .single()

  if (error) throw new Error(error.message)

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

  const { data: existing } = await supabase
    .from("company")
    .select("id")
    .single()

  if (!existing) throw new Error("Entreprise introuvable")

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
    .eq("id", existing.id)

  if (error) throw new Error(error.message)
}