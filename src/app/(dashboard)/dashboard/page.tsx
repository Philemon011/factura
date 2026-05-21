import { FileText, CircleCheck, Clock, AlertCircle } from "lucide-react"
import StatsCard from "@/components/dashboard/StatsCard"
import { mockStats, mockInvoices } from "@/lib/mock-data"
import { formatCFA, formatDate, getStatusLabel, getStatusClasses } from "@/lib/utils/formatters"

export default function DashboardPage() {
  const recentInvoices = mockInvoices.slice(0, 4)

  return (
    <div className="p-8">

      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-zinc-900">Dashboard</h1>
        <p className="mt-0.5 text-sm text-zinc-500">
          Bienvenue — voici un aperçu de votre activité
        </p>
      </div>

      {/* Stats cards */}
      <div className="mb-8 grid grid-cols-4 gap-4">
        {/* Remplace le premier StatsCard par celui-ci */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500">Total factures</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-semibold text-zinc-900">
            {mockStats.totalInvoices}
          </p>
          <p className="mt-0.5 text-xs text-zinc-400">factures créées</p>
        </div>
        <StatsCard
          title="Montant facturé"
          value={mockStats.totalBilled}
          icon={FileText}
          iconBg="bg-zinc-100"
          iconColor="text-zinc-600"
        />
        <StatsCard
          title="Montant payé"
          value={mockStats.totalPaid}
          icon={CircleCheck}
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />
        <StatsCard
          title="En attente"
          value={mockStats.totalPending}
          icon={Clock}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
        />
      </div>

      {/* Factures récentes */}
      <div className="rounded-xl border border-zinc-200 bg-white">
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-zinc-900">
            Factures récentes
          </h2>

          <a href="/invoices"
            className="text-xs text-zinc-400 hover:text-zinc-600"
          >
            Voir tout →
          </a>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">
                Numéro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">
                Montant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400">
                Statut
              </th>
            </tr>
          </thead>
          <tbody>
            {recentInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50"
              >
                <td className="px-6 py-4 text-sm font-medium text-zinc-800">
                  {invoice.number}
                </td>
                <td className="px-6 py-4 text-sm text-zinc-600">
                  {invoice.clientName}
                </td>
                <td className="px-6 py-4 text-sm text-zinc-500">
                  {formatDate(invoice.issueDate)}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-zinc-800">
                  {formatCFA(invoice.total)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClasses(invoice.status)}`}
                  >
                    {getStatusLabel(invoice.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}