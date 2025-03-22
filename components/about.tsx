"use client"; // Mark this component as a Client Component

import { motion, type Variants } from "framer-motion";
import { Calendar, MapPin, Music } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { infoCards } from "@/utils/data"; // Import dummy data

export default function About() {
  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger animations for children
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  // Dynamically render icons based on the icon name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "MapPin":
        return <MapPin className="h-8 w-8 text-[#ffcc00]" />;
      case "Calendar":
        return <Calendar className="h-8 w-8 text-[#ffcc00]" />;
      case "Music":
        return <Music className="h-8 w-8 text-[#ffcc00]" />;
      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-20 bg-[#1a0033] relative">
      <div className="absolute h-full w-full inset-0 bg-cover bg-center opacity-5"></div>
      <div className="container mx-auto px-4">
        {/* Animated Heading Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4" variants={fadeInUp}>
            About <span className="text-[#ffcc00]">TRYST</span>
          </motion.h2>
          <motion.div className="w-24 h-1 bg-[#ffcc00] mx-auto mb-8" variants={fadeIn}></motion.div>
        </motion.div>

        {/* Animated Content Section */}
        <motion.div
          className="flex flex-col md:flex-row mb-6 sm:mb-10 gap-4 sm:gap-8 px-2 sm:px-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Left Side: Text Content */}
          <motion.div className="flex-1" variants={fadeInUp}>
            <motion.p className="text-white max-w-3xl text-base sm:text-lg" variants={fadeInUp}>
              TRYST is the annual cultural extravaganza of Keshav Mahavidyalaya, Delhi University. It brings together
              students from across the country to showcase their talents in music, dance, art, technology, and more.
              With a legacy of excellence, TRYST 2025 promises to be bigger and better than ever before.
            </motion.p>
            <motion.p
              className="text-white max-w-2xl text-base sm:text-lg my-2 sm:my-4 mb-4 sm:mb-6"
              variants={fadeInUp}
            >
              Tryst isn’t just a fest—it’s an experience. Whether you're a performer, artist, or just looking to enjoy
              an incredible lineup of events, we have something for everyone!
            </motion.p>
            <motion.h3 className="text-xl sm:text-2xl text-[#ffcc00] font-semibold mb-3 sm:mb-5" variants={fadeInUp}>
              PERKS
            </motion.h3>
            <motion.ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base" variants={fadeInUp}>
              <li>✔ &nbsp; 50+ Events & Competitions.</li>
              <li>✔ &nbsp; Star-Studded Performances.</li>
              <li>✔ &nbsp; Workshops & Exhibitions.</li>
              <li>✔ &nbsp; Food & Fun Stall.</li>
              <li>✔ &nbsp; Unforgettable College Memories.</li>
            </motion.ul>
          </motion.div>

          {/* Right Side: Video */}
          <motion.div className="md:w-1/2 p-4 pt-0" variants={fadeIn}>
            <div className="relative w-full h-48 sm:h-64 md:h-96 overflow-hidden border-black rounded-lg shadow-lg">
              <video src={"/fest_video.mp4"} autoPlay controls muted loop className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </motion.div>

        {/* Animated Info Cards Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {infoCards.map((card, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="bg-[#3a0066] border-none text-white hover:shadow-lg hover:shadow-[#ffcc00]/20 transition-all duration-300 h-full">
                <CardHeader className="flex flex-col items-center p-3 sm:p-6">
                  {renderIcon(card.icon)}
                  <CardTitle className="mt-4 text-xl">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-3 sm:p-6 pt-0 sm:pt-0">
                  <CardDescription className="text-gray-300 text-base">{card.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}