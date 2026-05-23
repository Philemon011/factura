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
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Récapitulatif
      </h3>

      <div className="space-y-2.5">

        {/* Sous-total */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">Sous-total HT</span>
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {formatCFA(subtotal)}
          </span>
        </div>

        {/* TVA */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">TVA (18%)</span>
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {formatCFA(taxAmount)}
          </span>
        </div>

        {/* Toggle remise */}
        <div className="flex items-center justify-between">
          <button
            onClick={onToggleDiscount}
            className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <div className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
              hasDiscount
                ? "border-zinc-900 bg-zinc-900 dark:border-zinc-100 dark:bg-zinc-100"
                : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-800"
            }`}>
              {hasDiscount && (
                <svg className="h-2.5 w-2.5 text-white dark:text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            Ajouter une remise
          </button>
        </div>

        {/* Champ remise */}
        {hasDiscount && (
          <div className="flex items-center gap-3 rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Montant remise (FCFA)
            </span>
            <input
              type="number"
              min={0}
              value={discount}
              onChange={(e) => onDiscountChange(Number(e.target.value))}
              className="ml-auto w-32 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-right text-sm text-zinc-800 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-700 dark:text-zinc-200"
            />
          </div>
        )}

        {hasDiscount && discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Remise</span>
            <span className="text-sm font-medium text-red-500">
              - {formatCFA(discount)}
            </span>
          </div>
        )}

        {/* Total */}
        <div className="border-t border-zinc-100 pt-2.5 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Total TTC
            </span>
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {formatCFA(Math.max(0, total))}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-zinc-400 dark:text-zinc-600">
        Note : Les paiements en retard entraînent une pénalité annuelle de 10%, calculée quotidiennement.
      </p>
    </div>
  )
}