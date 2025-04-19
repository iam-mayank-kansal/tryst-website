"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import { motion, Variants, AnimationProps } from "framer-motion"

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  
  // Add state to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false)

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
        setTimeLeft({ days:0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Animation variants
  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  }

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const slideUp: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  }

  const countdownVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 }
    }
  }

  const buttonsVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        delay: 1.2
      }
    }
  }

  // Generate particle positions - but only on the client side
  const particlePositions = isMounted ? Array(20).fill(0).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: Math.random() * 5,
    animationDuration: 3 + Math.random() * 5,
  })) : [];

  const CountdownItem = ({ value, label, index }: { value: number; label: string; index: number }) => (
    <motion.div 
      className="flex flex-col items-center"
      variants={countdownVariants}
      custom={index}
    >
      <motion.div 
        className="bg-[#3a0066] text-white text-xl sm:text-2xl md:text-4xl font-bold w-14 sm:w-16 md:w-24 h-14 sm:h-16 md:h-24 rounded-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {value}
      </motion.div>
      <span className="text-white text-xs sm:text-sm md:text-base mt-1 sm:mt-2">{label}</span>
    </motion.div>
  )

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-[#1a0033] overflow-hidden">
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
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2.5 }}
      ></motion.div>

      {/* Animated Particles - Only rendered client-side */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#ffcc00]"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: particle.animationDuration,
                repeat: Infinity,
                repeatType: "reverse",
                delay: particle.animationDelay,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-4"
            variants={slideUp}
          >
            <motion.span 
              className="text-[#ffcc00]"
              animate={{
                textShadow: ["0px 0px 0px #ffcc00", "0px 0px 10px #ffcc00", "0px 0px 0px #ffcc00"]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              TRYST
            </motion.span> 2025
          </motion.h1>
          
          <motion.h2 
            className="text-lg sm:text-xl md:text-2xl text-white mb-4 sm:mb-8"
            variants={slideUp}
          >
            Annual Cultural Fest of Keshav Mahavidyalaya
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-12"
            variants={slideUp}
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            April 21-22, 2025 | Delhi, India
          </motion.p>

          {/* Countdown Timer */}
          <motion.div 
            className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-12"
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
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0"
            variants={buttonsVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-[#ffcc00] text-[#1a0033] hover:bg-[#ffcc00]/80 text-base sm:text-lg w-full sm:w-auto" >
              <a href="#registration">Register Now</a>
                
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-base sm:text-lg w-full sm:w-auto mt-2 sm:mt-0">
                <a href="#about">Learn More</a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
