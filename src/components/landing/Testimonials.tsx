"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Aminata Diallo",
    role: "Freelance Designer",
    company: "Dakar",
    country: "Sénégal",
    countryCode: "sn",
    avatar: "AD",
    avatarBg: "bg-blue-100 dark:bg-blue-950",
    avatarColor: "text-blue-600 dark:text-blue-400",
    content:
      "Factura Africa a complètement transformé ma façon de gérer mes clients. Avant je faisais mes factures sur Word, maintenant en 2 minutes c'est envoyé. Mes clients me trouvent plus professionnel.",
    rating: 5,
  },
  {
    name: "Kofi Mensah",
    role: "Développeur Web",
    company: "Accra",
    country: "Bénin",
    countryCode: "bj",
    avatar: "KM",
    avatarBg: "bg-green-100 dark:bg-green-950",
    avatarColor: "text-green-600 dark:text-green-400",
    content:
      "Le calcul automatique de la TVA et les montants en FCFA, c'est exactement ce dont j'avais besoin. Plus d'erreurs de calcul, plus de stress en fin de mois. Je recommande à tous les freelances.",
    rating: 5,
  },
  {
    name: "Fatou Traoré",
    role: "Gérante PME",
    company: "Abidjan",
    country: "Côte d'Ivoire",
    countryCode: "ci",
    avatar: "FT",
    avatarBg: "bg-orange-100 dark:bg-orange-950",
    avatarColor: "text-orange-600 dark:text-orange-400",
    content:
      "Notre PME gère maintenant plus de 50 factures par mois sans effort. Le suivi des paiements en temps réel nous permet de relancer rapidement les clients en retard. Excellent outil.",
    rating: 5,
  },
]

function Flag({ code, country }: { code: string; country: string }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      width={20}
      height={15}
      alt={country}
      className="rounded-sm object-cover"
    />
  )
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-zinc-50 py-20 dark:bg-zinc-900 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
            Ils nous font confiance
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Ce que disent nos utilisateurs
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500 dark:text-zinc-400">
            Des entrepreneurs africains comme vous utilisent Factura Africa
            au quotidien pour gérer leur activité.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
            >
              {/* Quote + étoiles */}
              <div className="mb-4 flex items-start justify-between">
                <StarRating count={t.rating} />
                <Quote className="h-5 w-5 text-zinc-200 dark:text-zinc-800" />
              </div>

              {/* Contenu */}
              <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                "{t.content}"
              </p>

              {/* Auteur */}
              <div className="flex items-center gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                {/* Avatar avec drapeau */}
                <div className="relative flex-shrink-0">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${t.avatarBg} ${t.avatarColor}`}>
                    {t.avatar}
                  </div>
                  {/* Drapeau en badge */}
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border-2 border-white dark:border-zinc-950">
                    <Flag code={t.countryCode} country={t.country} />
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {t.name}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                      {t.role}
                    </p>
                    <span className="text-zinc-300 dark:text-zinc-700">·</span>
                    <div className="flex items-center gap-1">
                      <Flag code={t.countryCode} country={t.country} />
                      <p className="text-xs text-zinc-400 dark:text-zinc-500">
                        {t.company}, {t.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-16 grid grid-cols-2 gap-6 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 md:grid-cols-4"
        >
          {[
            { value: "500+", label: "Entrepreneurs actifs" },
            { value: "12 000+", label: "Factures créées" },
            { value: "98%", label: "Satisfaction client" },
            { value: "5 pays", label: "Afrique de l'Ouest" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}