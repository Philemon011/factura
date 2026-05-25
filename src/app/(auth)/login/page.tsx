"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { signIn } from "@/actions/auth"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError("")
  try {
    await signIn({ email, password })
  } catch (err: any) {
    const msg = err.message || ""
    if (msg.includes("NEXT_REDIRECT")) return
    if (msg.includes("Email not confirmed")) {
      setError("Veuillez confirmer votre email avant de vous connecter.")
    } else if (msg.includes("Invalid login credentials")) {
      setError("Email ou mot de passe incorrect.")
    } else {
      setError("Une erreur est survenue. Veuillez réessayer.")
    }
    setLoading(false)
  }
}

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-sm"
            >
                {/* Logo */}
                <div className="mb-8 flex flex-col items-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100">
                        <span className="text-lg font-bold text-white dark:text-zinc-900">F</span>
                    </div>
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                        Connexion
                    </h1>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        Accédez à votre espace Factura
                    </p>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="vous@entreprise.com"
                                required
                                className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-800 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:placeholder:text-zinc-600"
                            />
                        </div>
                    </div>

                    {/* Mot de passe */}
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-10 text-sm text-zinc-800 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:placeholder:text-zinc-600"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                            >
                                {showPassword
                                    ? <EyeOff className="h-4 w-4" />
                                    : <Eye className="h-4 w-4" />
                                }
                            </button>
                        </div>
                    </div>

                    {/* Erreur */}
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-400"
                        >
                            {error}
                        </motion.p>
                    )}

                    {/* Bouton */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                    >
                        {loading ? "Connexion..." : "Se connecter"}
                        {!loading && <ArrowRight className="h-4 w-4" />}
                    </button>
                </form>

                {/* Lien inscription */}
                <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    Pas encore de compte ?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                    >
                        Créer un compte
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}