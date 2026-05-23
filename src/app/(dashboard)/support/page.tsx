"use client"

import { motion } from "framer-motion"
import { HelpCircle, MessageCircle, Mail, FileText } from "lucide-react"

const resources = [
  {
    icon: FileText,
    title: "Documentation",
    description: "Guides et tutoriels pour bien démarrer avec Factura Africa.",
    label: "Bientôt disponible",
    iconBg: "bg-blue-50 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: MessageCircle,
    title: "Chat en direct",
    description: "Discutez avec notre équipe support en temps réel.",
    label: "Bientôt disponible",
    iconBg: "bg-green-50 dark:bg-green-950",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    icon: Mail,
    title: "Email support",
    description: "Envoyez-nous un email, on répond sous 24h.",
    label: "support@factura.africa",
    iconBg: "bg-orange-50 dark:bg-orange-950",
    iconColor: "text-orange-500 dark:text-orange-400",
  },
]

export default function SupportPage() {
  return (
    <div className="min-h-full p-4 pt-16 dark:bg-zinc-950 sm:p-6 sm:pt-6 lg:p-8">

      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-8"
      >
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl">
          Aide & Support
        </h1>
        <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
          Notre équipe est là pour vous aider
        </p>
      </motion.div>

      {/* Bannière */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.25 }}
        className="mb-8 flex flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white py-12 text-center dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
          <HelpCircle className="h-7 w-7 text-zinc-400 dark:text-zinc-500" />
        </div>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          Comment pouvons-nous vous aider ?
        </h2>
        <p className="mt-1.5 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
          Le centre d'aide complet arrive bientôt. En attendant, contactez-nous directement.
        </p>
      </motion.div>

      {/* Cards ressources */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {resources.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.25, ease: "easeOut" as const }}
            className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${item.iconBg}`}>
              <item.icon className={`h-5 w-5 ${item.iconColor}`} />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {item.title}
            </h3>
            <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
              {item.description}
            </p>
            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}