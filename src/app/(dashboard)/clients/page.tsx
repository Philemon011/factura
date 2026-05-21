"use client"

import { useState } from "react"
import { Plus, Search, Mail, Phone, MapPin, Users } from "lucide-react"
import { mockClients } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils/formatters"

export default function ClientsPage() {
  const [search, setSearch] = useState("")

  const filtered = mockClients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8">

      {/* En-tête */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900">Clients</h1>
          <p className="mt-0.5 text-sm text-zinc-500">
            {mockClients.length} clients enregistrés
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors">
          <Plus className="h-4 w-4" />
          Nouveau client
        </button>
      </div>

      {/* Recherche */}
      <div className="mb-6 flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 w-80">
        <Search className="h-3.5 w-3.5 text-zinc-400" />
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-xs text-zinc-700 outline-none placeholder:text-zinc-400 w-full"
        />
      </div>

      {/* Grille clients */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Users className="mb-3 h-8 w-8 text-zinc-300" />
          <p className="text-sm font-medium text-zinc-500">Aucun client trouvé</p>
          <p className="mt-1 text-xs text-zinc-400">
            Essaie un autre terme de recherche
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((client) => (
            <div
              key={client.id}
              className="rounded-xl border border-zinc-200 bg-white p-5 hover:border-zinc-300 hover:shadow-sm transition-all"
            >
              {/* Avatar + nom */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
                  {client.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-900">
                    {client.name}
                  </p>
                  <p className="text-xs text-zinc-400">
                    Client depuis {formatDate(client.createdAt)}
                  </p>
                </div>
              </div>

              {/* Infos contact */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 flex-shrink-0 text-zinc-400" />
                  <span className="truncate text-xs text-zinc-500">
                    {client.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0 text-zinc-400" />
                  <span className="text-xs text-zinc-500">{client.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-zinc-400" />
                  <span className="truncate text-xs text-zinc-500">
                    {client.address}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-2 border-t border-zinc-100 pt-4">
                <button className="flex-1 rounded-lg border border-zinc-200 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                  Voir les factures
                </button>
                <button className="flex-1 rounded-lg border border-zinc-200 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                  Modifier
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}