"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Client } from "@/types"

interface ClientModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Omit<Client, "id" | "createdAt">) => void
  client?: Client | null
}

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
}

export default function ClientModal({
  isOpen,
  onClose,
  onSave,
  client,
}: ClientModalProps) {
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (client) {
      setForm({
        name: client.name,
        email: client.email,
        phone: client.phone,
        address: client.address,
      })
    } else {
      setForm(emptyForm)
    }
  }, [client, isOpen])

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (!form.name) {
      alert("Le nom du client est obligatoire")
      return
    }
    onSave(form)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal — slide up sur mobile, scale sur desktop */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative z-10 w-full rounded-t-2xl border border-zinc-200 bg-white p-5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:max-w-md sm:rounded-xl sm:p-6"
          >
            {/* Poignée mobile */}
            <div className="mb-4 flex justify-center sm:hidden">
              <div className="h-1 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            </div>

            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {client ? "Modifier le client" : "Nouveau client"}
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Formulaire */}
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Nom *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="ex: Agence Cansaas"
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="ex: contact@agence.bj"
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="ex: +229 97 00 00 00"
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Adresse
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="ex: Cotonou, Rue des Palmiers"
                  rows={2}
                  className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:border-zinc-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                {client ? "Enregistrer" : "Ajouter"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}