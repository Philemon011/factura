"use client"

import { Trash2 } from "lucide-react"
import { LineItem } from "@/types"
import { formatCFA } from "@/lib/utils/formatters"

interface LineItemRowProps {
  item: LineItem
  index: number
  onChange: (id: string, field: keyof LineItem, value: string | number) => void
  onDelete: (id: string) => void
  canDelete: boolean
}

export default function LineItemRow({
  item,
  index,
  onChange,
  onDelete,
  canDelete,
}: LineItemRowProps) {
  const amount = item.quantity * item.unitPrice

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
          Article {index + 1}
        </span>
        {canDelete && (
          <button
            onClick={() => onDelete(item.id)}
            className="rounded p-1 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:text-zinc-600 dark:hover:bg-red-950 dark:hover:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Nom */}
      <div className="mb-3">
        <label className="mb-1 block text-xs text-zinc-500 dark:text-zinc-400">
          Nom de l'article / service
        </label>
        <input
          type="text"
          value={item.name}
          onChange={(e) => onChange(item.id, "name", e.target.value)}
          placeholder="ex: Développement site web"
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 outline-none transition-colors placeholder:text-zinc-300 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:border-zinc-500"
        />
      </div>

      {/* Quantité, Prix, TVA */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1 block text-xs text-zinc-500 dark:text-zinc-400">
            Quantité
          </label>
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => onChange(item.id, "quantity", Number(e.target.value))}
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:focus:border-zinc-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-zinc-500 dark:text-zinc-400">
            Prix unitaire (FCFA)
          </label>
          <input
            type="number"
            min={0}
            value={item.unitPrice}
            onChange={(e) => onChange(item.id, "unitPrice", Number(e.target.value))}
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:focus:border-zinc-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-zinc-500 dark:text-zinc-400">
            TVA (%)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={item.taxRate}
            onChange={(e) => onChange(item.id, "taxRate", Number(e.target.value))}
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:focus:border-zinc-500"
          />
        </div>
      </div>

      {/* Montant */}
      <div className="mt-3 flex justify-end">
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          Sous-total HT :{" "}
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            {formatCFA(amount)}
          </span>
        </span>
      </div>
    </div>
  )
}