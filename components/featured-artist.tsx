"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function FeaturedArtist() {
  const [showBio, setShowBio] = useState(false)

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  }

  // Artist data
  const artist = {
    name: "Aman Raj Gill",
    genre: "Indie Folk / Pop",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqcI9jPM5zv0OkltVh9vdehktL-f6ZJnIOnQ&s", // Replace with actual image
    shortBio:
      "Aman Raj Gill is a rising star in the indie music scene, known for his soulful vocals and heartfelt lyrics that blend traditional folk elements with contemporary pop sensibilities.",
    fullBio:
      "Aman Raj Gill is a rising star in the indie music scene, known for his soulful vocals and heartfelt lyrics that blend traditional folk elements with contemporary pop sensibilities. Born and raised in Delhi, Aman discovered his passion for music at an early age, teaching himself guitar and writing his first songs as a teenager.\n\nAfter graduating from Delhi University, he began performing at local venues and quickly gained a following for his authentic sound and captivating stage presence. His debut EP 'Echoes of Home' received critical acclaim, with the lead single 'Midnight Rain' amassing over a million streams across platforms.\n\nAman's music draws inspiration from his personal experiences and observations of life in urban India, creating a unique sound that resonates with listeners across generations. His performances are known for creating intimate connections with the audience, regardless of venue size.",
    performance: {
      date: "April 22, 2025",
      time: "7:00 PM",
      venue: "Main Stage",
      socialLinks: {
        instagram: "https://instagram.com",
        spotify: "https://spotify.com",
        youtube: "https://youtube.com",
      },
    },
  }

  return (
    <section id="featured-artist" className="py-20 bg-[#1a0033] relative">
      <div className="absolute h-full w-full inset-0 bg-[url('/fest_bg.jpg')] bg-cover bg-center opacity-15 -z-10 bg-fixed"></div>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4"
            variants={itemVariants}
          >
            Featured <span className="text-[#ffcc00]">Artist</span>
          </motion.h2>
          <motion.div className="w-24 h-1 bg-[#ffcc00] mx-auto mb-8" variants={itemVariants}></motion.div>
          <motion.p className="text-white max-w-3xl mx-auto text-base sm:text-lg px-2" variants={itemVariants}>
            Experience the magic of our headlining performer who will light up the stage at TRYST 2025.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col lg:flex-row gap-8 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Artist Image */}
          <motion.div className="lg:w-1/2 relative" variants={imageVariants}>
            <div className="relative overflow-hidden rounded-xl shadow-2xl shadow-[#ffcc00]/10 group max-h-[600px]">
              <Image
                src={artist.image || "/placeholder.svg"}
                alt={artist.name}
                width={600}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0033] to-transparent opacity-60"></div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 border-t-2 border-l-2 border-[#ffcc00]/30 rounded-tl-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b-2 border-r-2 border-[#ffcc00]/30 rounded-br-3xl"></div>

              {/* Animated pulse effect */}
              <motion.div
                className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-[#ffcc00]/20 flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <div className="w-12 h-12 rounded-full bg-[#ffcc00]/40 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#ffcc00] flex items-center justify-center text-[#1a0033]">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Artist Info */}
          <motion.div className="lg:w-1/2 text-white" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ffcc00] mb-2">{artist.name}</h3>
              <p className="text-lg text-white/80 mb-6">{artist.genre}</p>
            </motion.div>

            <motion.p className="text-base sm:text-lg mb-6" variants={itemVariants}>
              {artist.shortBio}
            </motion.p>

            <motion.div className="bg-[#3a0066] rounded-xl p-6 mb-6 shadow-lg" variants={itemVariants}>
              <h4 className="text-xl font-semibold mb-4 text-[#ffcc00]">Performance Details</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="text-[#ffcc00] w-5 h-5" />
                  <span>{artist.performance.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-[#ffcc00] w-5 h-5" />
                  <span>{artist.performance.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#ffcc00] w-5 h-5" />
                  <span>{artist.performance.venue}</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="flex flex-wrap gap-4 mb-6" variants={itemVariants}>
              <Button className="bg-[#ffcc00] text-[#1a0033] hover:bg-[#ffcc00]/80" onClick={() => setShowBio(true)}>
                Read Full Bio
              </Button>
              <Button variant="outline" className="border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00]/10" asChild>
                <a href="#registration">Register to Attend</a>
              </Button>
            </motion.div>

            <motion.div className="flex gap-4" variants={itemVariants}>
              <a
                href={artist.performance.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3a0066] flex items-center justify-center hover:bg-[#ffcc00] hover:text-[#1a0033] transition-colors duration-300"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href={artist.performance.socialLinks.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3a0066] flex items-center justify-center hover:bg-[#ffcc00] hover:text-[#1a0033] transition-colors duration-300"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href={artist.performance.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3a0066] flex items-center justify-center hover:bg-[#ffcc00] hover:text-[#1a0033] transition-colors duration-300"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bio Dialog */}
        <Dialog open={showBio} onOpenChange={setShowBio}>
          <DialogContent className="bg-[#3a0066] text-white border-[#ffcc00] max-w-[95vw] md:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl text-[#ffcc00]">{artist.name}</DialogTitle>
              <DialogDescription className="text-gray-300">{artist.genre}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              {artist.fullBio.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#ffcc00]/30">
              <h4 className="text-lg font-semibold mb-2 text-[#ffcc00]">Performance Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="text-[#ffcc00] w-4 h-4" />
                  <span>{artist.performance.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-[#ffcc00] w-4 h-4" />
                  <span>{artist.performance.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-[#ffcc00] w-4 h-4" />
                  <span>{artist.performance.venue}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
