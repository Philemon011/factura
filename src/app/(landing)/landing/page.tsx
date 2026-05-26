import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import HowItWorks from "@/components/landing/HowItWorks"
import Pricing from "@/components/landing/Pricing"
import Testimonials from "@/components/landing/Testimonials"
import Footer from "@/components/landing/Footer"

export default function LandingPage() {
  return (
    <main className="bg-white dark:bg-zinc-950">
      <Navbar />
      <Hero />
       <HowItWorks />
        <Pricing />
        <Testimonials />
        <Footer />
    </main>
  )
}