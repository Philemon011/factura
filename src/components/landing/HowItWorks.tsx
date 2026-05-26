"use client"

import { motion } from "framer-motion"
import { UserPlus, FileText, Send } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Créez votre compte",
    description:
      "Inscrivez-vous gratuitement en 30 secondes. Renseignez les informations de votre entreprise et vous êtes prêt.",
    color: "bg-blue-50 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-100 dark:border-blue-900",
  },
  {
    number: "02",
    icon: FileText,
    title: "Créez vos factures",
    description:
      "Ajoutez vos clients, renseignez vos articles et services. La TVA à 18% et les montants en FCFA sont calculés automatiquement.",
    color: "bg-green-50 dark:bg-green-950",
    iconColor: "text-green-600 dark:text-green-400",
    borderColor: "border-green-100 dark:border-green-900",
  },
  {
    number: "03",
    icon: Send,
    title: "Envoyez et suivez",
    description:
      "Envoyez vos factures à vos clients et suivez les paiements en temps réel. Relancez les impayés en un clic.",
    color: "bg-orange-50 dark:bg-orange-950",
    iconColor: "text-orange-500 dark:text-orange-400",
    borderColor: "border-orange-100 dark:border-orange-900",
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-zinc-50 py-20 dark:bg-zinc-900 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
            Simple et rapide
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Comment ça marche ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500 dark:text-zinc-400">
            En 3 étapes simples, gérez toute votre facturation depuis
            n'importe quel appareil.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* Ligne de connexion desktop */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-zinc-200 dark:bg-zinc-700 md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Numéro + icône */}
              <div className="relative mb-6">
                {/* Cercle numéro */}
                <div className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-white bg-white shadow-md dark:border-zinc-900 dark:bg-zinc-900">
                  <div className={`mb-1 flex h-10 w-10 items-center justify-center rounded-xl ${step.color}`}>
                    <step.icon className={`h-5 w-5 ${step.iconColor}`} />
                  </div>
                  <span className="text-xs font-bold text-zinc-400 dark:text-zinc-600">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Texte */}
              <div className={`w-full rounded-2xl border p-6 ${step.borderColor} bg-white dark:bg-zinc-950`}>
                <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}