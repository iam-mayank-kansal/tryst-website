"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, type Variants, useAnimation } from "framer-motion"
import { Calendar, Clock, MapPin, Music, Mic, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function FeaturedArtist() {
  const [showBio, setShowBio] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    if (isImageLoaded) {
      controls.start("visible")
    }
  }, [isImageLoaded, controls])

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: 0.2,
      },
    },
  }

  const pulseVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.05, 1],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 3,
      },
    },
  }

  // Artist data
  const artist = {
    name: "Aman Raj Gill",
    genre: "Indie Folk / Pop",
    image: "/amanrajgill.png",
    shortBio:
      "Aman Raj Gill is a rising star in the indie music scene, known for his soulful vocals and heartfelt lyrics that blend traditional folk elements with contemporary pop sensibilities.",
    fullBio:
      "Aman Raj Gill is a rising star in the indie music scene, known for his soulful vocals and heartfelt lyrics that blend traditional folk elements with contemporary pop sensibilities. Born and raised in Delhi, Aman discovered his passion for music at an early age, teaching himself guitar and writing his first songs as a teenager.\n\nAfter graduating from Delhi University, he began performing at local venues and quickly gained a following for his authentic sound and captivating stage presence. His debut EP 'Echoes of Home' received critical acclaim, with the lead single 'Midnight Rain' amassing over a million streams across platforms.\n\nAman's music draws inspiration from his personal experiences and observations of life in urban India, creating a unique sound that resonates with listeners across generations. His performances are known for creating intimate connections with the audience, regardless of venue size.",
    performance: {
      date: "April 22, 2025",
      time: "5:00 PM",
      venue: "Main Stage",
    },
    achievements: [
      "Over 1 million streams on debut EP",
      "Featured on Rolling Stone India's 'Artists to Watch'",
      "Performed at major music festivals across India",
    ],
  }

  return (
    <section id="featured-artist" className="py-24 bg-gradient-to-b from-[#1a0033] to-[#130025] relative">
      <div className="absolute h-full w-full inset-0 bg-[url('/fest_bg.jpg')] bg-cover bg-center opacity-15 -z-10 bg-fixed"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#ffcc00]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#ffcc00]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span
            className="inline-block px-4 py-1 rounded-full bg-[#ffcc00]/10 text-[#ffcc00] text-sm font-medium mb-4"
            variants={itemVariants}
          >
            Headliner
          </motion.span>
          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" variants={itemVariants}>
            Featured <span className="text-[#ffcc00]">Artist</span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#ffcc00]/50 via-[#ffcc00] to-[#ffcc00]/50 mx-auto mb-8"
            variants={itemVariants}
          ></motion.div>
          <motion.p
            className="text-white/80 max-w-3xl mx-auto text-base sm:text-lg px-2 leading-relaxed"
            variants={itemVariants}
          >
            Experience the magic of our headlining performer who will light up the stage at TRYST 2025.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Artist Image */}
          <motion.div className="lg:w-1/2 relative" variants={imageVariants}>
            <div className="relative overflow-hidden rounded-2xl group">
              <div className="aspect-[4/5] sm:aspect-[4/3] md:aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={artist.image || "/placeholder.svg"}
                  alt={artist.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  onLoad={() => setIsImageLoaded(true)}
                  priority
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0033] via-[#1a0033]/50 to-transparent opacity-70"></div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 border-t-2 border-l-2 border-[#ffcc00]/30 rounded-tl-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b-2 border-r-2 border-[#ffcc00]/30 rounded-br-3xl"></div>

              {/* Artist name overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">{artist.name}</h3>
                <p className="text-[#ffcc00] text-lg">{artist.genre}</p>
              </div>

              {/* Animated pulse effect */}
              <motion.div
                className="absolute top-6 right-6 w-20 h-20 rounded-full"
                variants={pulseVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 rounded-full bg-[#ffcc00]/20"></div>
                  <div className="absolute inset-2 rounded-full bg-[#ffcc00]/30"></div>
                  <div className="absolute inset-4 rounded-full bg-[#ffcc00]/40"></div>
                  <div className="absolute inset-6 rounded-full bg-[#ffcc00] flex items-center justify-center text-[#1a0033]">
                    <Mic className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Artist Info */}
          <motion.div className="lg:w-1/2 text-white" variants={containerVariants}>
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-2xl -translate-y-5 p-6 sm:p-8 border border-white/10 mb-8"
              variants={itemVariants}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xl font-semibold mb-4 text-[#ffcc00] flex items-center">
                <Star className="h-5 w-5 mr-2" />
                About the Artist
              </h4>
              <p className="text-white/90 leading-relaxed mb-6">{artist.shortBio}</p>

              <div className="flex flex-wrap gap-3">
                {artist.achievements.map((achievement, index) => (
                  <div key={index} className="bg-white/10 rounded-full px-4 py-1 text-sm text-white/80">
                    {achievement}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-[#3a0066] to-[#4a0066] -translate-y-5 rounded-2xl p-6 sm:p-8 border border-white/10 mb-8"
              variants={itemVariants}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xl font-semibold mb-6 text-[#ffcc00] flex items-center">
                <Music className="h-5 w-5 mr-2" />
                Performance Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center text-center">
                  <Calendar className="text-[#ffcc00] w-8 h-8 mb-3" />
                  <span className="text-white/60 text-sm mb-1">Date</span>
                  <span className="text-lg font-medium">{artist.performance.date}</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center text-center">
                  <Clock className="text-[#ffcc00] w-8 h-8 mb-3" />
                  <span className="text-white/60 text-sm mb-1">Time</span>
                  <span className="text-lg font-medium">{artist.performance.time}</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center text-center">
                  <MapPin className="text-[#ffcc00] w-8 h-8 mb-3" />
                  <span className="text-white/60 text-sm mb-1">Venue</span>
                  <span className="text-lg font-medium">{artist.performance.venue}</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
              <Button
                className="bg-[#ffcc00] text-[#1a0033] hover:bg-[#ffcc00]/90 rounded-full px-6 py-6 text-base"
                onClick={() => setShowBio(true)}
              
              >
                Read Full Bio
              </Button>
              <Button
                variant="outline"
                className="border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00]/10 rounded-full px-6 py-6 text-base"
                asChild
               
              >
                <a href="#registration">Register to Attend</a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bio Dialog */}
        <Dialog open={showBio} onOpenChange={setShowBio}>
          <DialogContent className="bg-gradient-to-br from-[#3a0066] to-[#4a0066] text-white border-[#ffcc00]/30 max-w-[95vw] md:max-w-3xl rounded-2xl p-6 sm:p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl sm:text-3xl text-[#ffcc00] font-bold">{artist.name}</DialogTitle>
              <DialogDescription className="text-white/80 text-lg">{artist.genre}</DialogDescription>
            </DialogHeader>
            <div className="mt-6 space-y-4">
              {artist.fullBio.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-white/90 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-[#ffcc00]/20">
              <h4 className="text-xl font-semibold mb-4 text-[#ffcc00]">Performance Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffcc00]/20 flex items-center justify-center text-[#ffcc00]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-white/60 text-sm block">Date</span>
                    <span>{artist.performance.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffcc00]/20 flex items-center justify-center text-[#ffcc00]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-white/60 text-sm block">Time</span>
                    <span>{artist.performance.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffcc00]/20 flex items-center justify-center text-[#ffcc00]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-white/60 text-sm block">Venue</span>
                    <span>{artist.performance.venue}</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
