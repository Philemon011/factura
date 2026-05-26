"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { pdf } from "@react-pdf/renderer"
import InvoicePDF from "./InvoicePDF"
import { Invoice, Client, Company } from "@/types"

interface DownloadPDFButtonProps {
  invoice: Invoice
  client: Client | null
  company: Company
}

export default function DownloadPDFButton({
  invoice,
  client,
  company,
}: DownloadPDFButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      const blob = await pdf(
        <InvoicePDF
          invoice={invoice}
          client={client}
          company={company}
        />
      ).toBlob()

      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${invoice.number}.pdf`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Erreur PDF:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 sm:px-3 sm:py-2 sm:text-sm"
    >
      <Download className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">
        {loading ? "Génération..." : "Télécharger PDF"}
      </span>
    </button>
  )
}