"use client"

import { useState } from "react"
import { Building2, Mail, Phone, MapPin, FileText, Upload, Save } from "lucide-react"
import { mockCompany } from "@/lib/mock-data"

export default function SettingsPage() {
  const [form, setForm] = useState({ ...mockCompany })
  const [saved, setSaved] = useState(false)

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    // Phase 3 : on connectera Supabase ici
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="p-8">

      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-zinc-900">Paramètres</h1>
        <p className="mt-0.5 text-sm text-zinc-500">
          Configurez les informations de votre entreprise
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* Colonne principale */}
        <div className="col-span-2 space-y-5">

          {/* Informations générales */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="mb-5 text-sm font-semibold text-zinc-900">
              Informations de l'entreprise
            </h2>

            <div className="space-y-4">

              {/* Nom */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                  <Building2 className="h-3.5 w-3.5" />
                  Nom de l'entreprise
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-zinc-400 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                  <Mail className="h-3.5 w-3.5" />
                  Email professionnel
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-zinc-400 transition-colors"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                  <Phone className="h-3.5 w-3.5" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-zinc-400 transition-colors"
                />
              </div>

              {/* Adresse */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                  <MapPin className="h-3.5 w-3.5" />
                  Adresse
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={2}
                  className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-zinc-400 transition-colors"
                />
              </div>

              {/* Numéro fiscal */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                  <FileText className="h-3.5 w-3.5" />
                  Numéro fiscal / IFU
                </label>
                <input
                  type="text"
                  value={form.taxId}
                  onChange={(e) => handleChange("taxId", e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-zinc-400 transition-colors"
                />
              </div>

            </div>
          </div>

          {/* Bouton sauvegarder */}
          <div className="flex items-center justify-between">
            {saved && (
              <p className="text-xs font-medium text-green-600">
                ✓ Modifications enregistrées
              </p>
            )}
            <div className="ml-auto">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                Enregistrer
              </button>
            </div>
          </div>

        </div>

        {/* Colonne droite — Logo */}
        <div className="space-y-5">
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="mb-5 text-sm font-semibold text-zinc-900">
              Logo de l'entreprise
            </h2>

            {/* Zone upload */}
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 py-10 text-center hover:border-zinc-300 transition-colors">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
                <Upload className="h-5 w-5 text-zinc-400" />
              </div>
              <p className="text-xs font-medium text-zinc-600">
                Glisser-déposer votre logo
              </p>
              <p className="mt-1 text-xs text-zinc-400">PNG, JPG jusqu'à 2MB</p>
              <button className="mt-4 rounded-lg border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                Parcourir
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-zinc-400">
              Le logo apparaîtra sur vos factures
            </p>
          </div>

          {/* Aperçu carte entreprise */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold text-zinc-900">
              Aperçu
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
                {form.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-900">
                  {form.name}
                </p>
                <p className="truncate text-xs text-zinc-400">{form.email}</p>
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <p className="text-xs text-zinc-500">{form.phone}</p>
              <p className="text-xs text-zinc-500">{form.address}</p>
              <p className="text-xs text-zinc-400">IFU : {form.taxId}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}