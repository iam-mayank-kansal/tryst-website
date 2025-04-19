"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled down at all
      setScrolled(window.scrollY > 10)

      // Check if we're past the hero section
      const heroSection = document.getElementById("home")
      const heroHeight = heroSection?.offsetHeight || 0
      setPastHero(window.scrollY > heroHeight - 100)
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check on mount
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Artists", href: "#artists" },
    { name: "Registration", href: "#registration" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled || pastHero
          ? "bg-[#1a0033]/90 backdrop-blur-md shadow-md"
          : "bg-gradient-to-b from-[#1a0033]/70 to-transparent backdrop-blur-sm",
      )}
    >
      <div className="container mx-auto px-2 sm:px-4 flex justify-between items-center h-16 sm:h-20 relative ">
        <Link href="#home" className="text-2xl font-bold text-white z-50">
          <Image
            src="/tryst_logo.png"
            alt="TRYST logo"
            width={200}
            height={200}
            className="w-auto h-16 sm:h-20 object-cover"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-white hover:text-[#ffcc00] transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="lg:hidden text-white z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed  inset-0 bg-[#1a0033] z-40 lg:hidden transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-2 sm:space-y-4 pt-24">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white hover:text-[#ffcc00] py-2 sm:py-3 text-lg sm:text-xl border-b border-[#3a0066]"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
