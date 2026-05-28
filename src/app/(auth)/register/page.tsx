"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, Building2, ArrowRight, CheckCircle } from "lucide-react"
import { signUp } from "@/actions/auth"
import GoogleButton from "@/components/auth/GoogleButton"

const benefits = [
  "Gratuit pour démarrer — aucune carte requise",
  "Factures en FCFA avec TVA 18% automatique",
  "Données sécurisées et isolées par compte",
]

export default function RegisterPage() {
  const [companyName, setCompanyName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères")
      setLoading(false)
      return
    }

    try {
      await signUp({ email, password, companyName })
    } catch (err: any) {
      const msg = err.message || ""
      if (msg.includes("NEXT_REDIRECT")) return
      setError(msg || "Une erreur est survenue")
      setLoading(false)
    }
  }

  const inputClass = "w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-4 text-sm text-zinc-800 outline-none transition-all focus:border-zinc-400 focus:bg-white focus:ring-4 focus:ring-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:bg-zinc-800 dark:focus:ring-zinc-800"

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
              Rejoignez 500+
              <span className="block text-zinc-400">entrepreneurs africains.</span>
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-zinc-400">
              Créez votre compte en 30 secondes et commencez à gérer
              vos factures comme un pro.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20">
                    <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                  </div>
                  <span className="text-sm text-zinc-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats bas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="relative grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
        >
          {[
            { value: "500+", label: "Utilisateurs" },
            { value: "12k+", label: "Factures" },
            { value: "+5 🌍", label: "Pays" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-zinc-500">{stat.label}</p>
            </div>
          ))}
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
              Créer un compte 
            </h1>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              Gratuit pour démarrer — aucune carte bancaire requise
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Nom entreprise */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Nom de l'entreprise
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="MonEntreprise SARL"
                  required
                  className={inputClass}
                />
              </div>
            </div>

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
                  className={inputClass}
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 caractères"
                  required
                  className={`${inputClass} pr-10`}
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

              {/* Indicateur force mot de passe */}
              {password.length > 0 && (
                <div className="mt-2 flex items-center gap-1.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${password.length >= i * 3
                          ? password.length >= 8
                            ? "bg-green-500"
                            : password.length >= 6
                              ? "bg-orange-400"
                              : "bg-red-400"
                          : "bg-zinc-200 dark:bg-zinc-700"
                        }`}
                    />
                  ))}
                  <span className="text-[10px] text-zinc-400">
                    {password.length >= 8
                      ? "Fort"
                      : password.length >= 6
                        ? "Moyen"
                        : "Faible"}
                  </span>
                </div>
              )}
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

            {/* Bouton submit */}
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
      Création en cours...
    </span>
  ) : (
    <>
      Créer mon compte
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </>
  )}
</button>
</form>

{/* CGU */}
<p className="mt-4 text-center text-xs text-zinc-400 dark:text-zinc-500">
  En créant un compte, vous acceptez nos{" "}
  <Link href="/terms" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">
    Conditions d'utilisation
  </Link>{" "}
  et notre{" "}
  <Link href="/privacy" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">
    Politique de confidentialité
  </Link>
</p>

{/* Divider */}
<div className="my-6 flex items-center gap-3">
  <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
  <span className="text-xs text-zinc-400">ou</span>
  <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
</div>

{/* Google */}
<GoogleButton label="Continuer avec Google" />

{/* Lien connexion */}
<p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
  Déjà un compte ?{" "}
  <Link
    href="/login"
    className="font-semibold text-zinc-900 hover:underline dark:text-zinc-100"
  >
    Se connecter
  </Link>
</p>
        </motion.div>
      </div>
    </div>
  )
}