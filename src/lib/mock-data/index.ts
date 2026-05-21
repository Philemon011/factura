import { Client, Invoice, Company, DashboardStats } from "@/types"

export const mockCompany: Company = {
  name: "MonEntreprise SARL",
  email: "contact@monentreprise.bj",
  phone: "+229 97 00 00 00",
  address: "Cotonou, Bénin",
  logoUrl: null,
  taxId: "BJ-2024-001234",
}

export const mockClients: Client[] = [
  {
    id: "c1",
    name: "Agence Cansaas",
    email: "contact@cansaas.bj",
    phone: "+229 96 11 22 33",
    address: "Cotonou, Rue des Palmiers",
    createdAt: "2024-01-10",
  },
  {
    id: "c2",
    name: "TechBénin SARL",
    email: "info@techbenin.bj",
    phone: "+229 97 44 55 66",
    address: "Porto-Novo, Avenue de France",
    createdAt: "2024-02-05",
  },
  {
    id: "c3",
    name: "Dakar Invest",
    email: "contact@dakarinvest.sn",
    phone: "+221 77 123 45 67",
    address: "Dakar, Plateau",
    createdAt: "2024-02-20",
  },
  {
    id: "c4",
    name: "Abidjan Digital",
    email: "hello@abidjandigital.ci",
    phone: "+225 07 08 09 10",
    address: "Abidjan, Cocody",
    createdAt: "2024-03-01",
  },
  {
    id: "c5",
    name: "Lomé Services",
    email: "info@lomeservices.tg",
    phone: "+228 90 12 34 56",
    address: "Lomé, Boulevard du 13 Janvier",
    createdAt: "2024-03-15",
  },
]

export const mockInvoices: Invoice[] = [
  {
    id: "inv1",
    number: "FAC-2024-001",
    status: "paid",
    clientId: "c1",
    clientName: "Agence Cansaas",
    issueDate: "2024-01-15",
    dueDate: "2024-02-15",
    items: [
      { id: "i1", name: "Charte graphique", quantity: 1, unitPrice: 250000, taxRate: 18, amount: 250000 },
      { id: "i2", name: "Logo & identité visuelle", quantity: 1, unitPrice: 150000, taxRate: 18, amount: 150000 },
    ],
    subtotal: 400000,
    taxAmount: 72000,
    discount: 0,
    total: 472000,
    notes: "Merci pour votre confiance.",
    createdAt: "2024-01-15",
  },
  {
    id: "inv2",
    number: "FAC-2024-002",
    status: "sent",
    clientId: "c2",
    clientName: "TechBénin SARL",
    issueDate: "2024-02-10",
    dueDate: "2024-03-10",
    items: [
      { id: "i3", name: "Développement site web", quantity: 1, unitPrice: 500000, taxRate: 18, amount: 500000 },
      { id: "i4", name: "Formation équipe", quantity: 3, unitPrice: 75000, taxRate: 18, amount: 225000 },
    ],
    subtotal: 725000,
    taxAmount: 130500,
    discount: 50000,
    total: 805500,
    notes: "Paiement sous 30 jours.",
    createdAt: "2024-02-10",
  },
  {
    id: "inv3",
    number: "FAC-2024-003",
    status: "overdue",
    clientId: "c3",
    clientName: "Dakar Invest",
    issueDate: "2024-01-20",
    dueDate: "2024-02-20",
    items: [
      { id: "i5", name: "Conseil en stratégie digitale", quantity: 5, unitPrice: 80000, taxRate: 18, amount: 400000 },
    ],
    subtotal: 400000,
    taxAmount: 72000,
    discount: 0,
    total: 472000,
    notes: "",
    createdAt: "2024-01-20",
  },
  {
    id: "inv4",
    number: "FAC-2024-004",
    status: "draft",
    clientId: "c4",
    clientName: "Abidjan Digital",
    issueDate: "2024-03-01",
    dueDate: "2024-04-01",
    items: [
      { id: "i6", name: "Campagne réseaux sociaux", quantity: 1, unitPrice: 300000, taxRate: 18, amount: 300000 },
      { id: "i7", name: "Création de contenu", quantity: 10, unitPrice: 25000, taxRate: 18, amount: 250000 },
    ],
    subtotal: 550000,
    taxAmount: 99000,
    discount: 0,
    total: 649000,
    notes: "Brouillon — à finaliser.",
    createdAt: "2024-03-01",
  },
  {
    id: "inv5",
    number: "FAC-2024-005",
    status: "paid",
    clientId: "c5",
    clientName: "Lomé Services",
    issueDate: "2024-03-10",
    dueDate: "2024-04-10",
    items: [
      { id: "i8", name: "Audit informatique", quantity: 1, unitPrice: 180000, taxRate: 18, amount: 180000 },
    ],
    subtotal: 180000,
    taxAmount: 32400,
    discount: 0,
    total: 212400,
    notes: "",
    createdAt: "2024-03-10",
  },
]

export const mockStats: DashboardStats = {
  totalInvoices: mockInvoices.length,
  totalBilled: mockInvoices.reduce((sum, inv) => sum + inv.total, 0),
  totalPaid: mockInvoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.total, 0),
  totalPending: mockInvoices
    .filter((inv) => inv.status === "sent" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0),
}