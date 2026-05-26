"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signUp(formData: {
  email: string
  password: string
  companyName: string
}) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      emailRedirectTo: undefined,
    },
  })

  if (error) throw new Error(error.message)

  if (data.user) {
    await supabase.from("company").insert({
      name: formData.companyName,
      email: formData.email,
      user_id: data.user.id,
    })
  }

  redirect("/dashboard")
}

export async function signIn(formData: {
  email: string
  password: string
}) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) throw new Error(error.message)

  redirect("/dashboard")
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}