"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, type Variants } from "framer-motion"
import { Calendar, Users, Award, ArrowRight } from "lucide-react"

export default function Registration() {
  const [isHovered, setIsHovered] = useState(false)

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: 0.4,
      },
    },
  }

  const benefitItems = [
    { icon: <Calendar className="h-5 w-5" />, text: "Two days of non-stop entertainment" },
    { icon: <Users className="h-5 w-5" />, text: "Network with students from across universities" },
    { icon: <Award className="h-5 w-5" />, text: "Participate in 50+ competitions with prizes" },
  ]

  return (
    <section id="registration" className="py-24 bg-[#130520] relative z-20">
      <div className="absolute h-full w-full inset-0 bg-[url('/fest_bg.jpg')] bg-cover bg-center opacity-20 -z-10 bg-fixed"></div>
      <div className="container mx-auto px-4 sm:px-6">
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
            Join Us
          </motion.span>
          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" variants={itemVariants}>
            <span className="text-[#ffcc00]">Register</span> for TRYST 2025
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#ffcc00]/50 via-[#ffcc00] to-[#ffcc00]/50 mx-auto mb-8"
            variants={itemVariants}
          ></motion.div>
          <motion.p
            className="text-white/80 max-w-3xl mx-auto text-base sm:text-lg px-2 leading-relaxed"
            variants={itemVariants}
          >
            Secure your spot at the most exciting college fest of the year! Register now to participate in events,
            workshops, and performances.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8 items-center">
          <motion.div
            className="md:col-span-2 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            <motion.h3 className="text-2xl font-bold text-[#ffcc00]" variants={itemVariants}>
              Why Register?
            </motion.h3>

            <motion.div className="space-y-4" variants={containerVariants}>
              {benefitItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-white/90 bg-white/5 p-3 rounded-lg backdrop-blur-sm border border-white/10"
                  variants={itemVariants}
                  whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#ffcc00]/20 flex items-center justify-center text-[#ffcc00]">
                    {item.icon}
                  </div>
                  <p>{item.text}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p className="text-white/70 text-sm italic" variants={itemVariants}>
              * Limited spots available. Register early to avoid disappointment.
            </motion.p>
          </motion.div>

          <motion.div
            className="md:col-span-3"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-gradient-to-br from-[#3a0066] to-[#660066] rounded-2xl p-8 text-center border border-[#ffcc00]/20 shadow-xl relative overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(255, 204, 0, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#ffcc00]/10 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#ffcc00]/10 blur-3xl"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-[#ffcc00]/20 flex items-center justify-center mx-auto mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#ffcc00]/30 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#ffcc00] flex items-center justify-center text-[#1a0033]">
                      <Users className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#ffcc00] mb-4">Registration Form</h3>
                <p className="text-white/80 mb-8 max-w-md mx-auto">
                  Fill out our quick registration form to participate in TRYST 2025 events and activities.
                </p>

                <div className="space-y-6">
                  <motion.div
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdcQpJRwcbpyPj9eftndAhOk8wnRxnIDhxmKU0H4Q3cUKxkgw/viewform?usp=header"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full bg-[#ffcc00] hover:bg-[#ffcc00]/90 text-[#1a0033] text-lg py-7 rounded-xl font-bold transition-all">
                        Register Now
                        <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }} className="ml-2">
                          <ArrowRight className="h-5 w-5" />
                        </motion.div>
                      </Button>
                    </a>
                  </motion.div>

                  <p className="text-white/60 text-sm">You'll be redirected to our secure Google Form</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="mt-8 text-center text-white" variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-3">Need help with registration?</h4>
              <p className="text-white/80">
                Contact us at{" "}
                <a href="mailto:info@tryst2025.com" className="text-[#ffcc00] hover:underline transition-colors">
                  contact@theyoungtechies.com
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>   
    </section>
  )
}
