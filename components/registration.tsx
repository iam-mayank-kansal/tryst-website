"use client"
import { Button } from "@/components/ui/button"
import { Toaster } from "react-hot-toast"

export default function Registration() {
  return (
    <section id="registration" className="py-20 bg-[#130520] relative z-20">
      <div className="absolute h-full w-full inset-0 bg-[url('/fest_bg.jpg')] bg-cover bg-center opacity-25 -z-10 bg-fixed"></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            <span className="text-[#ffcc00]">Register for TRYST 2025</span>
          </h2>
          <div className="w-24 h-1 bg-[#ffcc00] mx-auto mb-8"></div>
          <p className="text-white max-w-3xl mx-auto text-base sm:text-lg px-2">
            Secure your spot at the most exciting college fest of the year! Click below to register via our official form.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-[#3a0066] rounded-lg p-8 text-center border border-[#660033] shadow-lg">
            <h3 className="text-xl font-bold text-[#ffcc00] mb-4">Registration Form</h3>
            <p className="text-gray-300 mb-6">
              Fill out our quick registration form to participate in TRYST 2025 events and activities.
            </p>
            
            <div className="space-y-4">
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdcQpJRwcbpyPj9eftndAhOk8wnRxnIDhxmKU0H4Q3cUKxkgw/viewform?usp=header" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-[#ffcc00] hover:bg-[#ffcc00]/90 text-[#1a0033] text-lg py-6 rounded-full font-bold transition-all transform hover:scale-105">
                  Register Now
                </Button>
              </a>
              
              <p className="text-gray-400 text-sm">
                You'll be redirected to our secure Google Form
              </p>
            </div>
          </div>

          <div className="mt-12 text-center text-white">
            <h4 className="text-lg font-semibold mb-4">Need help with registration?</h4>
            <p className="text-gray-300">
              Contact us at <a href="mailto:info@tryst2025.com" className="text-[#ffcc00] hover:underline">contact@theyoungtechies.com</a>
            </p>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </section>
  )
}