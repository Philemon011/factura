"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Check, Zap } from "lucide-react"

const plans = [
  {
    name: "Gratuit",
    price: 0,
    description: "Parfait pour démarrer et tester la plateforme.",
    features: [
      "5 factures par mois",
      "2 clients maximum",
      "Calcul TVA automatique",
      "Export PDF basique",
      "Support par email",
    ],
    cta: "Commencer gratuitement",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Pro",
    price: 9900,
    description: "Pour les freelances et PME en pleine croissance.",
    features: [
      "Factures illimitées",
      "Clients illimités",
      "Calcul TVA automatique",
      "Export PDF personnalisé",
      "Logo sur les factures",
      "Rappels automatiques",
      "Support prioritaire",
    ],
    cta: "Commencer l'essai",
    href: "/register",
    highlighted: true,
    badge: "Populaire",
  },
  {
    name: "Business",
    price: 24900,
    description: "Pour les équipes et entreprises avec des besoins avancés.",
    features: [
      "Tout le plan Pro",
      "Plusieurs utilisateurs",
      "Rapports avancés",
      "API access",
      "Intégration comptable",
      "Manager dédié",
      "SLA garanti",
    ],
    cta: "Contacter l'équipe",
    href: "/register",
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-white py-20 dark:bg-zinc-950 sm:py-28"
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
          <span className="mb-4 inline-block rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
            Tarifs transparents
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Un plan pour chaque étape
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500 dark:text-zinc-400">
            Commencez gratuitement, évoluez selon vos besoins.
            Pas de frais cachés, pas de surprise.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                plan.highlighted
                  ? "border-zinc-900 bg-zinc-900 shadow-xl dark:border-zinc-100 dark:bg-zinc-100"
                  : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              }`}
            >
              {/* Badge populaire */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                    <Zap className="h-3 w-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Nom + description */}
              <div className="mb-5">
                <h3 className={`text-base font-semibold ${
                  plan.highlighted
                    ? "text-white dark:text-zinc-900"
                    : "text-zinc-900 dark:text-zinc-100"
                }`}>
                  {plan.name}
                </h3>
                <p className={`mt-1 text-sm ${
                  plan.highlighted
                    ? "text-zinc-400 dark:text-zinc-600"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}>
                  {plan.description}
                </p>
              </div>

              {/* Prix */}
              <div className="mb-6">
                {plan.price === 0 ? (
                  <div className="flex items-end gap-1">
                    <span className={`text-4xl font-bold ${
                      plan.highlighted
                        ? "text-white dark:text-zinc-900"
                        : "text-zinc-900 dark:text-zinc-100"
                    }`}>
                      Gratuit
                    </span>
                  </div>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className={`text-4xl font-bold ${
                      plan.highlighted
                        ? "text-white dark:text-zinc-900"
                        : "text-zinc-900 dark:text-zinc-100"
                    }`}>
                      {plan.price.toLocaleString("fr-FR")}
                    </span>
                    <span className={`mb-1 text-sm ${
                      plan.highlighted
                        ? "text-zinc-400 dark:text-zinc-600"
                        : "text-zinc-400"
                    }`}>
                      FCFA/mois
                    </span>
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <div className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${
                      plan.highlighted
                        ? "bg-white/20 dark:bg-zinc-900/20"
                        : "bg-zinc-100 dark:bg-zinc-800"
                    }`}>
                      <Check className={`h-2.5 w-2.5 ${
                        plan.highlighted
                          ? "text-white dark:text-zinc-900"
                          : "text-zinc-600 dark:text-zinc-400"
                      }`} />
                    </div>
                    <span className={`text-sm ${
                      plan.highlighted
                        ? "text-zinc-300 dark:text-zinc-700"
                        : "text-zinc-600 dark:text-zinc-400"
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.href}
                className={`block rounded-xl py-2.5 text-center text-sm font-medium transition-all ${
                  plan.highlighted
                    ? "bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    : "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Note bas */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center text-sm text-zinc-400 dark:text-zinc-600"
        >
          Tous les plans incluent 14 jours d'essai gratuit. Aucune carte bancaire requise.
        </motion.p>
      </div>
    </section>
  )
}