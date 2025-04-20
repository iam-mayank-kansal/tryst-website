"use client";

import { motion, type Variants } from "framer-motion";
import { Calendar, MapPin, Music, Users, Award, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { infoCards } from "@/utils/data"; // Import dummy data
import { useRef } from "react";

export default function About() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      } 
    },
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      } 
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
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
      case "Users":
        return <Users className="h-8 w-8 text-[#ffcc00]" />;
      case "Award":
        return <Award className="h-8 w-8 text-[#ffcc00]" />;
      default:
        return <Star className="h-8 w-8 text-[#ffcc00]" />;
    }
  };

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#1a0033] to-[#130025] relative">
      <div className="absolute h-full w-full inset-0 bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Animated Heading Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span 
            className="inline-block px-4 py-1 rounded-full bg-[#ffcc00]/10 text-[#ffcc00] text-sm font-medium mb-4"
            variants={fadeIn}
          >
            Discover
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" 
            variants={fadeInUp}
          >
            About <span className="text-[#ffcc00]">TRYST</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-[#ffcc00]/50 via-[#ffcc00] to-[#ffcc00]/50 mx-auto mb-8" 
            variants={fadeIn}
          ></motion.div>
        </motion.div>

        {/* Animated Content Section */}
        <motion.div
          className="flex flex-col lg:flex-row mb-16 gap-8 lg:gap-12 px-2 sm:px-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Left Side: Text Content */}
          <motion.div className="lg:w-1/2 space-y-6" variants={fadeInUp}>
            <motion.p 
              className="text-white/90 text-lg leading-relaxed" 
              variants={fadeInUp}
            >
              TRYST is the annual cultural extravaganza of Keshav Mahavidyalaya, Delhi University. It brings together
              students from across the country to showcase their talents in music, dance, art, technology, and more.
              With a legacy of excellence, TRYST 2025 promises to be bigger and better than ever before.
            </motion.p>
            <motion.p
              className="text-white/90 text-lg leading-relaxed mb-8"
              variants={fadeInUp}
            >
              Tryst isn't just a fest—it's an experience. Whether you're a performer, artist, or just looking to enjoy
              an incredible lineup of events, we have something for everyone!
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl text-[#ffcc00] font-bold mb-6 flex items-center">
                <Award className="mr-3 h-6 w-6" />
                Festival Highlights
              </h3>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                variants={containerVariants}
              >
                {[
                  "50+ Events & Competitions",
                  "Star-Studded Performances",
                  "Workshops & Exhibitions",
                  "Food & Fun Stalls",
                  "Networking Opportunities",
                  "Unforgettable College Memories"
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3 bg-white/5 p-3 rounded-lg backdrop-blur-sm border border-white/10"
                    variants={fadeInUp}
                    whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ffcc00]/20 flex items-center justify-center text-[#ffcc00]">
                      <Star className="h-4 w-4" />
                    </div>
                    <p className="text-white/90">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side: Video */}
          <motion.div 
            className="lg:w-1/2" 
            variants={fadeIn}
          >
            <motion.div 
              className="relative w-full overflow-hidden rounded-2xl shadow-2xl border border-white/10"
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-video w-full">
                <video 
                  ref={videoRef}
                  src="/fest_video.mp4" 
                  autoPlay 
                  controls 
                  muted 
                  loop 
                  className="w-full h-full object-cover" 
                  poster="/placeholder.svg?height=720&width=1280"
                />
              </div>
              
              {/* Video overlay with play button */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0033]/70 via-transparent to-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-[#ffcc00]/20 flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (videoRef.current?.paused) {
                      videoRef.current?.play();
                    } else {
                      videoRef.current?.pause();
                    }
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#ffcc00]/30 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#ffcc00] flex items-center justify-center text-[#1a0033]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated Info Cards Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {infoCards.map((card, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover="hover"
            >
              <Card className="bg-gradient-to-br from-[#3a0066] to-[#4a0066] border-white/10 text-white h-full rounded-xl overflow-hidden">
                <CardHeader className="flex flex-col items-center p-6">
                  <div className="w-16 h-16 rounded-full bg-[#ffcc00]/20 flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#ffcc00]/30 flex items-center justify-center">
                      {renderIcon(card.icon)}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-center">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-6 pt-0">
                  <CardDescription className="text-white/80 text-base leading-relaxed">{card.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
