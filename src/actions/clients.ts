"use server"

import { createClient } from "@/lib/supabase/server"
import { Client } from "@/types"

export async function getClients(): Promise<Client[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)

  return data.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email || "",
    phone: c.phone || "",
    address: c.address || "",
    createdAt: c.created_at,
  }))
}

export async function addClient(
  data: Omit<Client, "id" | "createdAt">
): Promise<Client> {
  const supabase = await createClient()
  const { data: created, error } = await supabase
    .from("clients")
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)

  return {
    id: created.id,
    name: created.name,
    email: created.email || "",
    phone: created.phone || "",
    address: created.address || "",
    createdAt: created.created_at,
  }
}

export async function updateClient(
  id: string,
  data: Partial<Client>
): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("clients")
    .update({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    })
    .eq("id", id)

  if (error) throw new Error(error.message)
}

export async function deleteClient(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)
}