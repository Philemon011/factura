"use client"

import { motion } from "framer-motion"
import { FileText, CircleCheck, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"
import InvoiceStatusBadge from "@/components/invoices/InvoiceStatusBadge"
import { formatCFA, formatDate } from "@/lib/utils/formatters"
import { Invoice, DashboardStats } from "@/types"

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.3,
      ease: "easeOut" as const,
    },
  }),
}

export default function DashboardClient({
  stats,
  invoices,
}: {
  stats: DashboardStats
  invoices: Invoice[]
}) {
  const recentInvoices = [...invoices]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4)

  const cards = [
    {
      title: "Total factures",
      value: stats.totalInvoices,
      suffix: "factures créées",
      isCFA: false,
      icon: FileText,
      iconBg: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Montant facturé",
      value: stats.totalBilled,
      isCFA: true,
      icon: TrendingUp,
      iconBg: "bg-zinc-100 dark:bg-zinc-800",
      iconColor: "text-zinc-600 dark:text-zinc-400",
    },
    {
      title: "Montant payé",
      value: stats.totalPaid,
      isCFA: true,
      icon: CircleCheck,
      iconBg: "bg-green-50 dark:bg-green-950",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "En attente",
      value: stats.totalPending,
      isCFA: true,
      icon: Clock,
      iconBg: "bg-orange-50 dark:bg-orange-950",
      iconColor: "text-orange-500 dark:text-orange-400",
    },
  ]

  return (
    <div className="min-h-full p-4 pt-16 dark:bg-zinc-950 sm:p-6 sm:pt-6 lg:p-8">

      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-6"
      >
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl">
          Dashboard
        </h1>
        <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
          Bienvenue — voici un aperçu de votre activité
        </p>
      </motion.div>

      {/* Stats cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                {card.title}
              </p>
              <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${card.iconBg}`}>
                <card.icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
            </div>
            <p className="mt-3 text-lg font-semibold leading-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
              {card.isCFA ? formatCFA(card.value as number) : card.value}
            </p>
            {card.suffix && (
              <p className="mt-0.5 text-xs text-zinc-400">{card.suffix}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Factures récentes */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-800 sm:px-6 sm:py-4">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Factures récentes
          </h2>
          <Link
            href="/invoices"
            className="text-xs text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            Voir tout →
          </Link>
        </div>

        {recentInvoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="mb-3 h-8 w-8 text-zinc-300 dark:text-zinc-700" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Aucune facture pour l'instant
            </p>
            <Link
              href="/invoices/new"
              className="mt-3 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              Créer votre première facture →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 sm:px-6">Numéro</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 sm:px-6">Client</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 sm:px-6">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 sm:px-6">Montant</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 sm:px-6">Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((invoice, i) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    className="border-b border-zinc-50 transition-colors last:border-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                  >
                    <td className="px-4 py-3.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 sm:px-6 sm:py-4">
                      {invoice.number}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-zinc-600 dark:text-zinc-400 sm:px-6 sm:py-4">
                      {invoice.clientName}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-zinc-500 sm:px-6 sm:py-4">
                      {formatDate(invoice.issueDate)}
                    </td>
                    <td className="px-4 py-3.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 sm:px-6 sm:py-4">
                      {formatCFA(invoice.total)}
                    </td>
                    <td className="px-4 py-3.5 sm:px-6 sm:py-4">
                      <InvoiceStatusBadge status={invoice.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}