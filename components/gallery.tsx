"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { galleryImages } from "@/utils/data";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <section id="gallery" className="py-20 bg-[#1a0033]">
      <div className="container mx-auto px-4">
        {/* Animated Heading Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4"
            variants={fadeInUp}
          >
            <span className="text-[#ffcc00]">Gallery</span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-[#ffcc00] mx-auto mb-8"
            variants={fadeIn}
          ></motion.div>
          <motion.p
            className="text-white max-w-3xl mx-auto text-base sm:text-lg px-2"
            variants={fadeInUp}
          >
            Relive the memories from TRYST 2025 through our gallery.
          </motion.p>
        </motion.div>

        {/* Gallery Images Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {galleryImages["2025"].map((image, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setSelectedImage(image)}
              variants={fadeInUp}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`TRYST 2025 - Image ${index + 1}`}
                width={800}
                height={600}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Image Dialog */}
        <Dialog
          open={!!selectedImage}
          onOpenChange={(open) => !open && setSelectedImage(null)}
        >
          {selectedImage && (
            <DialogContent  
             className="max-w-[95vw] md:max-w-4xl bg-[#1a0033]/95 border-[#ffcc00] p-2 sm:p-6">
              <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh]">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Gallery image"
                  fill
                  className="object-contain"
                />
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
}