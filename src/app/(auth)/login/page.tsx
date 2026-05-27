"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, ArrowRight, FileText, CircleCheck, Clock } from "lucide-react"
import { signIn } from "@/actions/auth"

const features = [
  { icon: FileText, text: "Créez des factures professionnelles en FCFA" },
  { icon: CircleCheck, text: "Suivez vos paiements en temps réel" },
  { icon: Clock, text: "Relancez les impayés automatiquement" },
]

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
    <div className="flex min-h-screen">

      {/* Panneau gauche — branding */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-zinc-900 p-12 lg:flex lg:w-[45%]">

        {/* Motif de fond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-white" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-white" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
            <span className="text-sm font-bold text-zinc-900">F</span>
          </div>
          <span className="text-lg font-semibold text-white">factura africa</span>
        </div>

        {/* Contenu central */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-3 text-3xl font-bold leading-tight text-white">
              Gérez votre facturation
              <span className="block text-zinc-400">simplement.</span>
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-zinc-400">
              La solution de facturation pensée pour les entrepreneurs
              et PME d'Afrique de l'Ouest.
            </p>

            <div className="space-y-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <feature.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-zinc-300">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Carte témoignage bas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
        >
          <p className="mb-3 text-sm leading-relaxed text-zinc-300">
            "Factura Africa a transformé ma gestion des factures. Je gagne
            plusieurs heures par semaine."
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-semibold text-white">
              AD
            </div>
            <div>
              <p className="text-xs font-medium text-white">Aminata Diallo</p>
              <p className="text-xs text-zinc-500">Freelance Designer · 🇸🇳 Dakar</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Panneau droit — formulaire */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white p-6 dark:bg-zinc-950 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          {/* Logo mobile */}
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100">
              <span className="text-sm font-bold text-white dark:text-zinc-900">F</span>
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              factura africa
            </span>
          </div>

          {/* Titre */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Bon retour 👋
            </h1>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              Connectez-vous à votre espace Factura Africa
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@entreprise.com"
                  required
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-4 text-sm text-zinc-800 outline-none transition-all focus:border-zinc-400 focus:bg-white focus:ring-4 focus:ring-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:bg-zinc-800 dark:focus:ring-zinc-800"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Mot de passe
                </label>
                <a href="#" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                  Mot de passe oublié ?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-10 text-sm text-zinc-800 outline-none transition-all focus:border-zinc-400 focus:bg-white focus:ring-4 focus:ring-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:bg-zinc-800 dark:focus:ring-zinc-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
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
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 dark:bg-red-950"
              >
                <span className="mt-0.5 text-red-500">⚠</span>
                <p className="text-xs font-medium text-red-600 dark:text-red-400">
                  {error}
                </p>
              </motion.div>
            )}

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Connexion en cours...
                </span>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
            <span className="text-xs text-zinc-400">ou</span>
            <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
          </div>

          {/* Lien inscription */}
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            Pas encore de compte ?{" "}
            <Link
              href="/register"
              className="font-semibold text-zinc-900 hover:underline dark:text-zinc-100"
            >
              Créer un compte gratuitement
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}