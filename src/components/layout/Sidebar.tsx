"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart2,
  HelpCircle,
  Settings,
  Moon,
  Search,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { mockCompany } from "@/lib/mock-data"
import ThemeToggle from "@/components/layout/ThemeToggle"

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

function NavLink({
  href,
  icon: Icon,
  label,
  isActive,
  onClick,
}: {
  href: string
  icon: React.ElementType
  label: string
  isActive: boolean
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-200",
        isActive
          ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200"
      )}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span>{label}</span>
      {isActive && (
        <motion.div
          layoutId="active-indicator"
          className="ml-auto h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100"
        />
      )}
    </Link>
  )
}

function SidebarContent({
  pathname,
  onClose,
}: {
  pathname: string
  onClose?: () => void
}) {
  return (
    <div className="flex h-full flex-col px-3 py-4">

      {/* Logo */}
      <div className="mb-6 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100">
            <span className="text-xs font-bold text-white dark:text-zinc-900">F</span>
          </div>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            factura
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Recherche */}
      <div className="mb-5 flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
        <Search className="h-3.5 w-3.5 text-zinc-400" />
        <span className="text-xs text-zinc-400">Rechercher...</span>
        <span className="ml-auto text-[10px] text-zinc-300 dark:text-zinc-700">⌘F</span>
      </div>

      {/* Navigation */}
      <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
        Menu
      </p>
      <nav className="flex flex-col gap-0.5">
        {navItems.map(({ label, href, icon }) => (
          <NavLink
            key={href}
            href={href}
            icon={icon}
            label={label}
            isActive={pathname === href || pathname.startsWith(href + "/")}
            onClick={onClose}
          />
        ))}
      </nav>

      <div className="flex-1" />

      {/* Bas de sidebar */}
      <div className="flex flex-col gap-0.5">
        {bottomItems.map(({ label, href, icon }) => (
          <NavLink
            key={href}
            href={href}
            icon={icon}
            label={label}
            isActive={pathname === href}
            onClick={onClose}
          />
        ))}

        {/* Dark mode */}
        <div className="flex items-center gap-2.5 rounded-lg px-3 py-2">
          <Moon className="h-4 w-4 text-zinc-400" />
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Mode sombre
          </span>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Profil */}
      <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-semibold text-white dark:bg-zinc-700">
          {mockCompany.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            {mockCompany.name}
          </p>
          <p className="truncate text-[10px] text-zinc-400">
            {mockCompany.email}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Bouton hamburger mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:hidden"
      >
        <Menu className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
      </button>

      {/* Sidebar desktop */}
      <aside className="hidden h-screen w-[220px] flex-shrink-0 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:flex md:flex-col">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Sidebar mobile — drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 w-[260px] border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:hidden"
            >
              <SidebarContent
                pathname={pathname}
                onClose={() => setMobileOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}