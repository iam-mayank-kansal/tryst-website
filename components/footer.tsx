"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { motion, type Variants } from "framer-motion"

export default function Footer() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const socialIconVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    hover: {
      scale: 1.2,
      color: "#ffcc00",
      transition: {
        duration: 0.3,
      },
    },
  }

  const linkVariants: Variants = {
    hover: {
      color: "#ffcc00",
      x: 5,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <footer className="bg-gradient-to-b from-[#1a0033] to-[#0a0015] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-[#ffcc00]">TRYST 2025</h3>
            <p className="text-gray-300 mb-4">
              The annual cultural festival of Keshav Mahavidyalaya, Delhi University. Join us for three days of music,
              dance, art, and more!
            </p>
            <div className="flex space-x-4">
              <motion.div variants={socialIconVariants} whileHover="hover">
                <Link href="#" className="text-white hover:text-[#ffcc00] transition-colors">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </motion.div>
              <motion.div variants={socialIconVariants} whileHover="hover">
                <Link href="#" className="text-white hover:text-[#ffcc00] transition-colors">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </motion.div>
              <motion.div variants={socialIconVariants} whileHover="hover">
                <Link href="#" className="text-white hover:text-[#ffcc00] transition-colors">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </motion.div>
              <motion.div variants={socialIconVariants} whileHover="hover">
                <Link href="#" className="text-white hover:text-[#ffcc00] transition-colors">
                  <Youtube className="h-6 w-6" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-[#ffcc00]">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Events", "Artists", "Registration"].map((item, index) => (
                <motion.li key={index} variants={linkVariants} whileHover="hover">
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-[#ffcc00] transition-colors flex items-center"
                  >
                    <span className="ml-2">{item}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-[#ffcc00]">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <span className="block">Email:</span>
                <motion.a
                  href="mailto:tryst2025@keshav.du.ac.in"
                  className="hover:text-[#ffcc00] transition-colors"
                  whileHover={{ color: "#ffcc00", x: 5 }}
                >
                  tryst2025@keshav.du.ac.in
                </motion.a>
              </li>
              <li className="text-gray-300">
                <span className="block">Phone:</span>
                <motion.a
                  href="tel:+919876543210"
                  className="hover:text-[#ffcc00] transition-colors"
                  whileHover={{ color: "#ffcc00", x: 5 }}
                >
                  +91 98765 43210
                </motion.a>
              </li>
              <li className="text-gray-300">
                <span className="block">Address:</span>
                Keshav Mahavidyalaya, Delhi University
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-[#ffcc00]">Subscribe</h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter to get updates about TRYST 2025.</p>
            <div className="flex">
              <motion.input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-[#3a0066] border border-[#660033] rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#ffcc00] text-white w-full"
                whileFocus={{ borderColor: "#ffcc00" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
              <motion.button
                className="bg-[#ffcc00] text-[#1a0033] px-4 py-2 rounded-r-md hover:bg-[#ffcc00]/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-[#3a0066] pt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} TRYST 2025, Keshav Mahavidyalaya. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

