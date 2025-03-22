import Hero from "@/components/hero"
import About from "@/components/about"
import Events from "@/components/events"
import Artists from "@/components/artists"
import Registration from "@/components/registration"
import Gallery from "@/components/gallery"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <About />
      <Events />
      <Artists />
      <Registration />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}

