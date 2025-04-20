"use client"
import { Mail, Phone } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-[#130520] relative z-20">
      <div className="absolute h-full w-full inset-0 bg-[url('/fest_bg.jpg')] bg-cover bg-center opacity-25 -z-10 bg-fixed"></div>
      <div>
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            Contact <span className="text-[#ffcc00]">Us</span>
          </h2>
          <div className="w-24 h-1 bg-[#ffcc00] mx-auto mb-8"></div>
          <p className="text-white max-w-3xl mx-auto text-base sm:text-lg px-2">
            Have questions about TRYST 2025? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col justify-center">
            <div className="bg-[#3a0066] p-4 sm:p-6 md:p-8 rounded-lg mb-4 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-[#ffcc00] mb-3 sm:mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-[#ffcc00] mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <p className="text-gray-300">contact@theyoungtechies.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-[#ffcc00] mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Phone</h4>
                    <p className="text-gray-300">+91 93102 56281 (Tech Related Inquiries)</p>
                    <p className="text-gray-300">+91 93504 53034 (General Inquiries)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#3a0066] p-4 sm:p-6 md:p-8 rounded-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-[#ffcc00] mb-3 sm:mb-6">Visit Us</h3>
              <p className="text-white mb-4">
                Keshav Mahavidyalaya
                <br />
                University of Delhi
                <br />
                H-4-5 Zone, Pitampura
                <br />
                Delhi - 110034
              </p>
              <div className="rounded-lg overflow-hidden h-[150px] sm:h-[200px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.0627263514284!2d77.11767277550284!3d28.6877701756346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03c34fb126e3%3A0xb857945e72aca18!2sKeshav%20Mahavidyalaya!5e0!3m2!1sen!2sin!4v1742197025674!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: "0px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}