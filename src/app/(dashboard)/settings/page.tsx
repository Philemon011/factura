"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, Mail, Phone, MapPin, FileText, Upload, Save, Check } from "lucide-react"
import { mockCompany } from "@/lib/mock-data"

export default function SettingsPage() {
  const [form, setForm] = useState({ ...mockCompany })
  const [saved, setSaved] = useState(false)

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const inputClass = "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:focus:border-zinc-500"
  const labelClass = "mb-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400"

  return (
    <div className="min-h-full p-4 pt-16 dark:bg-zinc-950 sm:p-6 sm:pt-6 lg:p-8">

      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl">
          Paramètres
        </h1>
        <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
          Configurez les informations de votre entreprise
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {/* Colonne principale */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.25 }}
          className="space-y-5 lg:col-span-2"
        >
          {/* Informations générales */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Informations de l'entreprise
            </h2>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>
                  <Building2 className="h-3.5 w-3.5" />
                  Nom de l'entreprise
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <Mail className="h-3.5 w-3.5" />
                  Email professionnel
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <Phone className="h-3.5 w-3.5" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <MapPin className="h-3.5 w-3.5" />
                  Adresse
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={2}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <FileText className="h-3.5 w-3.5" />
                  Numéro fiscal / IFU
                </label>
                <input
                  type="text"
                  value={form.taxId}
                  onChange={(e) => handleChange("taxId", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Bouton sauvegarder */}
          <div className="flex items-center justify-between">
            <AnimatePresence>
              {saved && (
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400"
                >
                  <Check className="h-3.5 w-3.5" />
                  Modifications enregistrées
                </motion.p>
              )}
            </AnimatePresence>
            <div className="ml-auto">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                <Save className="h-4 w-4" />
                Enregistrer
              </button>
            </div>
          </div>
        </motion.div>

        {/* Colonne droite */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.25 }}
          className="space-y-5"
        >
          {/* Logo */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Logo de l'entreprise
            </h2>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 py-10 text-center transition-colors hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <Upload className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
              </div>
              <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Glisser-déposer votre logo
              </p>
              <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-600">
                PNG, JPG jusqu'à 2MB
              </p>
              <button className="mt-4 rounded-lg border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Parcourir
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-zinc-400 dark:text-zinc-600">
              Le logo apparaîtra sur vos factures
            </p>
          </div>

          {/* Aperçu */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Aperçu
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                {form.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {form.name}
                </p>
                <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">
                  {form.email}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-1.5 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{form.phone}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{form.address}</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">IFU : {form.taxId}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}