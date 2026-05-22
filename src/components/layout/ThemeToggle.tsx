"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return (
    <div className="h-5 w-9 rounded-full bg-zinc-200" />
  )

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${
        isDark ? "bg-zinc-700" : "bg-zinc-200"
      }`}
    >
      <span
        className={`absolute top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 ${
          isDark ? "translate-x-4" : "translate-x-0.5"
        }`}
      >
        {isDark ? (
          <Moon className="h-2.5 w-2.5 text-zinc-600" />
        ) : (
          <Sun className="h-2.5 w-2.5 text-zinc-400" />
        )}
      </span>
    </button>
  )
}