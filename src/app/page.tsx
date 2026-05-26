import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Si connecté → dashboard, sinon → landing page
  if (user) {
    redirect("/dashboard")
  }

  redirect("/landing")
}