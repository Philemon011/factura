import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./globals.css"
import { Toaster } from "sonner"


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Factura Africa",
  description: "Gestion de facturation pour entrepreneurs africains",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-poppins antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                fontFamily: "var(--font-poppins)",
                fontSize: "13px",
                borderRadius: "10px",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}