import { formatCFA } from "@/lib/utils/formatters"
import { LineItem } from "@/types"

interface InvoiceSummaryProps {
  items: LineItem[]
  discount: number
  onDiscountChange: (value: number) => void
  hasDiscount: boolean
  onToggleDiscount: () => void
}

export default function InvoiceSummary({
  items,
  discount,
  onDiscountChange,
  hasDiscount,
  onToggleDiscount,
}: InvoiceSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const taxAmount = items.reduce((sum, item) => {
    const ht = item.quantity * item.unitPrice
    return sum + Math.round(ht * (item.taxRate / 100))
  }, 0)
  const total = subtotal + taxAmount - discount

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900">Récapitulatif</h3>

      <div className="space-y-2.5">

        {/* Sous-total HT */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-500">Sous-total HT</span>
          <span className="text-sm font-medium text-zinc-800">
            {formatCFA(subtotal)}
          </span>
        </div>

        {/* TVA */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-500">TVA (18%)</span>
          <span className="text-sm font-medium text-zinc-800">
            {formatCFA(taxAmount)}
          </span>
        </div>

        {/* Remise toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={onToggleDiscount}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            <div className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
              hasDiscount
                ? "border-zinc-900 bg-zinc-900"
                : "border-zinc-300 bg-white"
            }`}>
              {hasDiscount && (
                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            Ajouter une remise
          </button>
        </div>

        {/* Champ remise */}
        {hasDiscount && (
          <div className="flex items-center gap-3 rounded-lg bg-zinc-50 px-3 py-2">
            <span className="text-xs text-zinc-500">Montant remise (FCFA)</span>
            <input
              type="number"
              min={0}
              value={discount}
              onChange={(e) => onDiscountChange(Number(e.target.value))}
              className="ml-auto w-32 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-right text-sm text-zinc-800 outline-none focus:border-zinc-400"
            />
          </div>
        )}

        {hasDiscount && discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Remise</span>
            <span className="text-sm font-medium text-red-500">
              - {formatCFA(discount)}
            </span>
          </div>
        )}

        {/* Séparateur */}
        <div className="border-t border-zinc-100 pt-2.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-900">Total TTC</span>
            <span className="text-lg font-semibold text-zinc-900">
              {formatCFA(Math.max(0, total))}
            </span>
          </div>
        </div>

      </div>

      {/* Note paiement en retard */}
      <p className="mt-4 text-[11px] text-zinc-400">
        Note : Les paiements en retard entraînent une pénalité annuelle de 10%, calculée quotidiennement.
      </p>
    </div>
  )
}