"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

const highlights = [
  "Gratuit pour démarrer",
  "Facturation en FCFA",
  "Données sécurisées",
]

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white dark:bg-zinc-950">

      {/* Fond décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#f4f4f5_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,_#18181b_0%,_transparent_70%)]" />
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-zinc-100/50 blur-3xl dark:bg-zinc-800/20" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-zinc-100/50 blur-3xl dark:bg-zinc-800/20" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-32 sm:px-6 sm:pt-40">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* Texte gauche */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Conçu pour les entrepreneurs africains
              </span>
            </motion.div>

            {/* Titre */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-5 text-4xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl lg:text-6xl"
            >
              Gérez vos
              <span className="block text-zinc-400 dark:text-zinc-600">
                factures en
              </span>
              FCFA facilement
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mb-8 text-base leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-lg"
            >
              Factura Africa est l'outil de facturation pensé pour les
              freelances et PME d'Afrique de l'Ouest. Créez, envoyez et
              suivez vos factures en quelques clics.
            </motion.p>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mb-8 flex flex-wrap gap-4"
            >
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-700 hover:shadow-lg dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                Commencer gratuitement
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                Se connecter
              </Link>
            </motion.div>
          </div>

          {/* Image / Dashboard mockup droite */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative hidden lg:block"
          >
            {/* Placeholder dashboard */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">

              {/* Barre titre mockup */}
              <div className="flex items-center gap-1.5 border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <div className="mx-auto flex items-center gap-2 rounded-md bg-zinc-100 px-4 py-1 dark:bg-zinc-800">
                  <span className="text-[10px] text-zinc-400">factura.africa/dashboard</span>
                </div>
              </div>

              {/* Contenu mockup */}
              <div className="p-5">
                {/* Stats */}
                <div className="mb-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "Total facturé", value: "2 450 000", color: "bg-blue-50 dark:bg-blue-950" },
                    { label: "Payé", value: "1 800 000", color: "bg-green-50 dark:bg-green-950" },
                    { label: "En attente", value: "650 000", color: "bg-orange-50 dark:bg-orange-950" },
                  ].map((stat) => (
                    <div key={stat.label} className={`rounded-xl p-3 ${stat.color}`}>
                      <p className="text-[9px] text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                      <p className="mt-1 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                        {stat.value} F
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tableau mockup */}
                <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="border-b border-zinc-100 px-4 py-2.5 dark:border-zinc-800">
                    <p className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">
                      Factures récentes
                    </p>
                  </div>
                  {[
                    { num: "FAC-2026-001", client: "Agence Cansaas", amount: "472 000", status: "Payée", color: "bg-green-100 text-green-700" },
                    { num: "FAC-2026-002", client: "TechBénin SARL", amount: "805 500", status: "Envoyée", color: "bg-blue-100 text-blue-700" },
                    { num: "FAC-2026-003", client: "Dakar Invest", amount: "472 000", status: "En retard", color: "bg-red-100 text-red-700" },
                  ].map((row) => (
                    <div key={row.num} className="flex items-center justify-between border-b border-zinc-50 px-4 py-2.5 last:border-0 dark:border-zinc-800">
                      <div>
                        <p className="text-[9px] font-medium text-zinc-800 dark:text-zinc-200">{row.num}</p>
                        <p className="text-[8px] text-zinc-400">{row.client}</p>
                      </div>
                      <p className="text-[9px] font-medium text-zinc-700 dark:text-zinc-300">{row.amount} F</p>
                      <span className={`rounded-full px-2 py-0.5 text-[8px] font-medium ${row.color}`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Carte flottante 1 */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-1/3 rounded-xl border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Nouvelle facture</p>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">+ 350 000 FCFA</p>
            </motion.div>

            {/* Carte flottante 2 */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-4 bottom-1/4 rounded-xl border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Paiement reçu</p>
              <p className="text-sm font-semibold text-green-600">✓ 472 000 FCFA</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex justify-center pb-8"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-zinc-300 p-1 dark:border-zinc-700"
          >
            <div className="h-1.5 w-0.5 rounded-full bg-zinc-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}