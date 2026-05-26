"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"

// ── Icônes SVG inline ──────────────────────────────────────────────
const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

// ── Données ────────────────────────────────────────────────────────
const footerLinks = {
  produit: [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Comment ça marche", href: "#how-it-works" },
    { label: "Témoignages", href: "#testimonials" },
  ],
  legal: [
    { label: "Conditions d'utilisation", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
    { label: "Mentions légales", href: "#" },
    { label: "Cookies", href: "#" },
  ],
  support: [
    { label: "Centre d'aide", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Statut", href: "#" },
  ],
}

const socials = [
  { icon: TwitterXIcon, label: "Twitter" , href: "#" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: FacebookIcon, label: "Facebook", href: "#" },
]

const contacts = [
  { icon: Mail, label: "contact@factura.africa" },
  { icon: Phone, label: "+229 97 00 00 00" },
  { icon: MapPin, label: "Cotonou, Bénin" },
]

// ── Composant ──────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section principale */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand — 2 colonnes */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100">
                <span className="text-base font-bold text-white dark:text-zinc-900">F</span>
              </div>
              <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                factura
              </span>
            </Link>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              L'outil de facturation pensé pour les freelances et PME
              d'Afrique de l'Ouest. Simple, rapide et en FCFA.
            </p>

            {/* Contact */}
            <div className="space-y-2.5">
              {contacts.map((contact) => (
                <div key={contact.label} className="flex items-center gap-2.5">
                  <contact.icon className="h-4 w-4 flex-shrink-0 text-zinc-400 dark:text-zinc-600" />
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {contact.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <div className="mt-6 flex items-center gap-2">
              {socials.map((social) => (
                
                 <a key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition-colors hover:border-zinc-300 hover:text-zinc-600 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:text-zinc-300"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Liens Produit */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
              Produit
            </h3>
            <ul className="space-y-3">
              {footerLinks.produit.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Liens Support */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Liens Légal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
              Légal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-zinc-900 px-8 py-6 dark:bg-zinc-100 sm:flex-row"
        >
          <div>
            <p className="text-sm font-semibold text-white dark:text-zinc-900">
              Prêt à simplifier votre facturation ?
            </p>
            <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-600">
              Rejoignez 500+ entrepreneurs qui font confiance à Factura Africa.
            </p>
          </div>
          <Link
            href="/register"
            className="flex-shrink-0 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            Commencer gratuitement →
          </Link>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-zinc-100 py-6 dark:border-zinc-800 sm:flex-row">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            © {new Date().getFullYear()} Factura Africa. Tous droits réservés.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-zinc-400 dark:text-zinc-600">Fait avec</span>
            <span className="text-red-400">♥</span>
            <span className="text-xs text-zinc-400 dark:text-zinc-600">par Philémon Etounde</span>
          </div>
        </div>
      </div>
    </footer>
  )
}