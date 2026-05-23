"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Mail, Phone, MapPin, Users, Pencil, Trash2 } from "lucide-react"
import { addClient, updateClient, deleteClient } from "@/actions/clients"
import { formatDate } from "@/lib/utils/formatters"
import ClientModal from "@/components/clients/ClientModal"
import ConfirmModal from "@/components/ui/ConfirmModal"
import { Client } from "@/types"

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.25,
      ease: "easeOut" as const,
    },
  }),
}

export default function ClientsClient({
  initialClients,
}: {
  initialClients: Client[]
}) {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [search, setSearch] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [targetId, setTargetId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const filtered = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = async (data: Omit<Client, "id" | "createdAt">) => {
    setLoading(true)
    try {
      if (editingClient) {
        await updateClient(editingClient.id, data)
        setClients((prev) =>
          prev.map((c) =>
            c.id === editingClient.id ? { ...c, ...data } : c
          )
        )
      } else {
        const newClient = await addClient(data)
        setClients((prev) => [newClient, ...prev])
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      setEditingClient(null)
    }
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (id: string) => {
    setTargetId(id)
    setConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!targetId) return
    setLoading(true)
    try {
      await deleteClient(targetId)
      setClients((prev) => prev.filter((c) => c.id !== targetId))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      setTargetId(null)
    }
  }

  const handleOpenModal = () => {
    setEditingClient(null)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-full p-4 pt-16 dark:bg-zinc-950 sm:p-6 sm:pt-6 lg:p-8">

      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-6 flex items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl">
            Clients
          </h1>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            {clients.length} clients enregistrés
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          disabled={loading}
          className="flex flex-shrink-0 items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 sm:px-4 sm:text-sm"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nouveau client</span>
          <span className="sm:hidden">Nouveau</span>
        </button>
      </motion.div>

      {/* Recherche */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.25 }}
        className="mb-6 flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800 sm:w-80"
      >
        <Search className="h-3.5 w-3.5 flex-shrink-0 text-zinc-400" />
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs text-zinc-700 outline-none placeholder:text-zinc-400 dark:bg-zinc-800 dark:text-zinc-200"
        />
      </motion.div>

      {/* Grille */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16"
        >
          <Users className="mb-3 h-8 w-8 text-zinc-300 dark:text-zinc-700" />
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Aucun client trouvé
          </p>
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-600">
            Essaie un autre terme de recherche
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((client, i) => (
            <motion.div
              key={client.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                  {client.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {client.name}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Client depuis {formatDate(client.createdAt)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 flex-shrink-0 text-zinc-400 dark:text-zinc-500" />
                  <span className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {client.email || "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0 text-zinc-400 dark:text-zinc-500" />
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {client.phone || "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-zinc-400 dark:text-zinc-500" />
                  <span className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {client.address || "—"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <button
                  onClick={() => handleEdit(client)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                >
                  <Pencil className="h-3 w-3" />
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteClick(client.id)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-100 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                >
                  <Trash2 className="h-3 w-3" />
                  Supprimer
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ClientModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingClient(null)
        }}
        onSave={handleSave}
        client={editingClient}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer le client ?"
        description="Cette action est irréversible. Le client sera définitivement supprimé."
        confirmLabel="Supprimer"
        danger
      />
    </div>
  )
}