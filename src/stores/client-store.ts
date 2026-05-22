import { create } from "zustand"
import { Client } from "@/types"
import { mockClients } from "@/lib/mock-data"

interface ClientStore {
  clients: Client[]

  // Actions
  addClient: (data: Omit<Client, "id" | "createdAt">) => Client
  updateClient: (id: string, data: Partial<Client>) => void
  deleteClient: (id: string) => void
  getClient: (id: string) => Client | undefined
}

export const useClientStore = create<ClientStore>((set, get) => ({
  clients: mockClients,

  addClient: (data) => {
    const newClient: Client = {
      ...data,
      id: Math.random().toString(36).slice(2, 9),
      createdAt: new Date().toISOString().split("T")[0],
    }
    set((state) => ({ clients: [newClient, ...state.clients] }))
    return newClient
  },

  updateClient: (id, data) => {
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id ? { ...client, ...data } : client
      ),
    }))
  },

  deleteClient: (id) => {
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
    }))
  },

  getClient: (id) => {
    return get().clients.find((client) => client.id === id)
  },
}))