"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import { motion, type Variants, AnimatePresence } from "framer-motion"
import { ArrowDown, Calendar, Clock, MapPin } from "lucide-react"

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Add state to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  // Ref for the scroll indicator
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mark component as mounted (client-side only)
    setIsMounted(true)

    // Set the date for TRYST 2025
    const festDate = new Date("2025-04-21T00:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = festDate - now

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    // Hide scroll indicator when user scrolls
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearInterval(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Animation variants
  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  }

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const slideUp: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  }

  const countdownVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  }

  const buttonsVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 1.2,
      },
    },
  }

  const scrollIndicatorVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2,
        duration: 0.5,
      },
    },
    bounce: {
      y: [0, -10, 0],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 1.5,
      },
    },
  }

  // Generate particle positions - but only on the client side
  const particlePositions = isMounted
    ? Array(30)
        .fill(0)
        .map(() => ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: Math.random() * 3 + 1,
          animationDelay: Math.random() * 5,
          animationDuration: 3 + Math.random() * 7,
        }))
    : []

  const CountdownItem = ({ value, label, index }: { value: number; label: string; index: number }) => (
    <motion.div className="flex flex-col items-center" variants={countdownVariants} custom={index}>
      <motion.div
        className="bg-gradient-to-br from-[#3a0066] to-[#4a0066] text-white text-xl sm:text-2xl md:text-4xl font-bold w-16 sm:w-20 md:w-28 h-16 sm:h-20 md:h-28 rounded-xl flex items-center justify-center border border-white/10 shadow-lg"
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        {value < 10 ? `0${value}` : value}
      </motion.div>
      <span className="text-white text-xs sm:text-sm md:text-base mt-2 sm:mt-3">{label}</span>
    </motion.div>
  )

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a0033] to-[#130025] overflow-hidden"
    >
      <Navbar />

      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#23003d] to-[#660033] opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2 }}
      ></motion.div>

      <motion.div
        className="absolute inset-0 bg-[url('/fest_bg_2.jpg')] bg-cover bg-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2.5 }}
      ></motion.div>

      {/* Animated Particles - Only rendered client-side */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particlePositions.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#ffcc00]"
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: particle.animationDuration,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: particle.animationDelay,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 z-10 text-center py-20 sm:py-32">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div
            className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6"
            variants={fadeIn}
          >
            <span className="text-[#ffcc00] mr-2">21-22 April, 2025</span> • Delhi, India
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6"
            variants={slideUp}
          >
            <motion.span
              className="text-[#ffcc00]"
              animate={{
                textShadow: ["0px 0px 0px #ffcc00", "0px 0px 20px #ffcc00", "0px 0px 0px #ffcc00"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              TRYST
            </motion.span>{" "}
            2025
          </motion.h1>

          <motion.h2 className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-6 sm:mb-10" variants={slideUp}>
            Annual Cultural Fest of Keshav Mahavidyalaya
          </motion.h2>

          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
              <Calendar className="h-4 w-4 mr-2 text-[#ffcc00]" />
              <span>April 21-22, 2025</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
              <Clock className="h-4 w-4 mr-2 text-[#ffcc00]" />
              <span>9:00 AM - 9:00 PM</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
              <MapPin className="h-4 w-4 mr-2 text-[#ffcc00]" />
              <span>Keshav Mahavidyalaya, Delhi</span>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            className="flex justify-center gap-3 sm:gap-6 mb-10 sm:mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <CountdownItem value={timeLeft.days} label="Days" index={0} />
            <CountdownItem value={timeLeft.hours} label="Hours" index={1} />
            <CountdownItem value={timeLeft.minutes} label="Minutes" index={2} />
            <CountdownItem value={timeLeft.seconds} label="Seconds" index={3} />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4 sm:px-0"
            variants={buttonsVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-[#ffcc00] text-[#1a0033] hover:bg-[#ffcc00]/90 text-base sm:text-lg w-full sm:w-auto py-6 px-8 rounded-full shadow-lg shadow-[#ffcc00]/20"
              >
                <a href="#registration" className="flex items-center gap-2">
                  Register Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-base sm:text-lg w-full sm:w-auto py-6 px-8 rounded-full"
              >
                <a href="#about" className="flex items-center gap-2">
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            ref={scrollIndicatorRef}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={scrollToAbout}
            variants={scrollIndicatorVariants}
            initial="hidden"
            animate={["visible", "bounce"]}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-white/70 text-sm mb-2">Scroll Down</span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <ArrowDown className="h-4 w-4 text-white" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
