"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  FileText,
  PiggyBank,
  BarChart2,
  HelpCircle,
  Settings,
  Moon,
  Users,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { mockCompany } from "@/lib/mock-data"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Factures", href: "/invoices", icon: FileText },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Rapports", href: "/reports", icon: BarChart2 },
]

const bottomItems = [
  { label: "Aide & Support", href: "/support", icon: HelpCircle },
  { label: "Paramètres", href: "/settings", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-[220px] flex-shrink-0 flex-col border-r border-zinc-200 bg-white px-3 py-4">

      {/* Logo */}
      <div className="mb-6 flex items-center gap-2 px-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900">
          <span className="text-xs font-bold text-white">F</span>
        </div>
        <span className="text-sm font-semibold text-zinc-900">factura</span>
      </div>

      {/* Recherche */}
      <div className="mb-4 flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2">
        <Search className="h-3.5 w-3.5 text-zinc-400" />
        <span className="text-xs text-zinc-400">Rechercher</span>
        <span className="ml-auto text-[10px] text-zinc-300">⌘F</span>
      </div>

      {/* Navigation principale */}
      <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
        Menu
      </p>
      <nav className="flex flex-col gap-0.5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors",
                isActive
                  ? "bg-zinc-100 font-medium text-zinc-900"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Espace flexible */}
      <div className="flex-1" />

      {/* Navigation bas */}
      <div className="flex flex-col gap-0.5">
        {bottomItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-700"
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            {label}
          </Link>
        ))}

        {/* Dark mode toggle */}
        <div className="flex items-center gap-2.5 rounded-md px-2 py-2">
          <Moon className="h-4 w-4 text-zinc-500" />
          <span className="text-sm text-zinc-500">Mode sombre</span>
          <div className="ml-auto h-5 w-9 rounded-full bg-zinc-200" />
        </div>
      </div>

      {/* Profil utilisateur */}
      <div className="mt-3 flex items-center gap-2.5 rounded-md border border-zinc-200 px-2 py-2">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium text-white">
          {mockCompany.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-zinc-800">
            {mockCompany.name}
          </p>
          <p className="truncate text-[10px] text-zinc-400">
            {mockCompany.email}
          </p>
        </div>
      </div>
    </aside>
  )
}