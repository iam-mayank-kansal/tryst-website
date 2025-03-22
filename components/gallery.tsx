"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, Variants } from "framer-motion";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = {
    "2024": [
      "/gallery/gallery_2024_2.jpg",
      "/gallery/gallery_2024_9.jpg",
      "/gallery/gallery_2024_8.jpg",
      "/gallery/gallery_2024_3.jpg",
      "/gallery/gallery_2024_4.jpg",
      "/gallery/gallery_2024_7.jpg",
      "/gallery/gallery_2024_5.jpg",
      "/gallery/gallery_2024_6.jpg",
      "/gallery/gallery_2024_1.jpg",
    ],
    "2023": [
      "/gallery/gallery_2024_8.jpg",
      "/gallery/gallery_2024_3.jpg",
      "/gallery/gallery_2024_9.jpg",
      "/gallery/gallery_2024_5.jpg",
      "/gallery/gallery_2024_7.jpg",
      "/gallery/gallery_2024_1.jpg",
      "/gallery/gallery_2024_4.jpg",
      "/gallery/gallery_2024_6.jpg",
      "/gallery/gallery_2024_2.jpg",
    ],
    "2022": [
      "/gallery/gallery_2024_2.jpg",
      "/gallery/gallery_2024_3.jpg",
      "/gallery/gallery_2024_7.jpg",
      "/gallery/gallery_2024_9.jpg",
      "/gallery/gallery_2024_8.jpg",
      "/gallery/gallery_2024_4.jpg",
      "/gallery/gallery_2024_5.jpg",
      "/gallery/gallery_2024_6.jpg",
      "/gallery/gallery_2024_1.jpg",
    ],
  };

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animations for children
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
            Relive the memories from previous editions of TRYST through our gallery.
          </motion.p>
        </motion.div>

        {/* Tabs Section */}
        <Tabs defaultValue="2024" className="w-full">
          <TabsList className="grid w-full max-w-xs sm:max-w-md mx-auto grid-cols-3 mb-4 sm:mb-8 bg-[#3a0066]">
            <TabsTrigger
              value="2024"
              className="data-[state=active]:bg-[#ffcc00] data-[state=active]:text-[#1a0033]"
            >
              2024
            </TabsTrigger>
            <TabsTrigger
              value="2023"
              className="data-[state=active]:bg-[#ffcc00] data-[state=active]:text-[#1a0033]"
            >
              2023
            </TabsTrigger>
            <TabsTrigger
              value="2022"
              className="data-[state=active]:bg-[#ffcc00] data-[state=active]:text-[#1a0033]"
            >
              2022
            </TabsTrigger>
          </TabsList>

          {/* Gallery Images Grid */}
          {Object.entries(galleryImages).map(([year, images]) => (
            <TabsContent key={year} value={year} className="mt-0">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    className="overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage(image)}
                    variants={fadeInUp}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`TRYST ${year} - Image ${index + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Image Dialog */}
        <Dialog
          open={!!selectedImage}
          onOpenChange={(open) => !open && setSelectedImage(null)}
        >
          {selectedImage && (
            <DialogContent className="max-w-[95vw] md:max-w-4xl bg-[#1a0033]/95 border-[#ffcc00] p-2 sm:p-6">
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
