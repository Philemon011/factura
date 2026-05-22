"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, X } from "lucide-react"

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmLabel?: string
  danger?: boolean
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirmer",
  danger = false,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            {/* Bouton fermer */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors dark:hover:bg-zinc-800"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Icône */}
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full ${
                danger ? "bg-red-50" : "bg-zinc-100"
              }`}
            >
              <AlertTriangle
                className={`h-5 w-5 ${danger ? "text-red-500" : "text-zinc-500"}`}
              />
            </div>

            {/* Texte */}
            <h3 className="mb-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </h3>
            <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
              {description}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  onConfirm()
                  onClose()
                }}
                className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${
                  danger
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-zinc-900 hover:bg-zinc-700"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}