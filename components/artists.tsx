"use client"; // Mark this component as a Client Component

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion"; // Import Framer Motion

export default function Artists() {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  interface Artist {
    id: number;
    name: string;
    genre: string;
    image: string;
    bio: string;
  }

  const artists: Artist[] = [
    {
      id: 1,
      name: "B PRAAK",
      genre: "Pop",
      image: "/artist/BPRAAK.png",
      bio: "B PRAAK is a celebrated playback singer and music composer in Bollywood, known for his soulful voice and hit songs like 'Mann Bharryaa' and 'Filhall'. He is extremely popular among the youth.",
    },
    {
      id: 2,
      name: "Jassie Gill",
      genre: "Punjabi",
      image: "/artist/jassie_gill.jpg",
      bio: "Jassie Gill is a popular Punjabi singer and actor, famous for his melodious voice and energetic performances in both music and films. His songs like 'Patiala Peg' and 'Leke Pehla Pehla Pyaar' are youth favorites.",
    },
    {
      id: 3,
      name: "Milind Gaba",
      genre: "Pop",
      image: "/artist/milind_gaba.webp",
      bio: "Milind Gaba is a well-known Indian singer and music composer, recognized for his catchy tunes and vibrant stage presence. His songs like 'She Don't Know' and 'High Rated Gabru' are widely loved by young audiences.",
    },
    {
      id: 4,
      name: "IKKA",
      genre: "Hip Hop",
      image: "/artist/Ikka.jpg",
      bio: "IKKA is a renowned Indian rapper and lyricist known for his impactful verses and contributions to the Indian hip-hop scene. His collaborations with artists like Badshah and Divine make him a favorite among the youth.",
    },
    {
      id: 5,
      name: "NIKK",
      genre: "Pop",
      image: "/artist/nikk.jpg",
      bio: "NIKK is a rising star in the music industry, known for her versatile voice and captivating performances. Her recent hits have made her a popular choice among young listeners.",
    },
    {
      id: 6,
      name: "Antariksi",
      genre: "Electronic",
      image: "/artist/Antariksh.jpg",
      bio: "Antariksi is known for blending electronic beats with classical Indian music, creating a unique fusion experience that has captivated audiences worldwide. Her experimental sound appeals to the younger generation.",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animations for children
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <section id="artists" className="py-20 bg-[#1a0033]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            Featured <span className="text-[#ffcc00]">Artists</span>
          </h2>
          <div className="w-24 h-1 bg-[#ffcc00] mx-auto mb-8"></div>
          <p className="text-white max-w-3xl mx-auto text-base sm:text-lg px-2">
            Experience electrifying performances from these talented artists who will be lighting up the stage at TRYST
            2025.
          </p>
        </div>

        {/* Animated Artist Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {artists.map((artist) => (
            <motion.div key={artist.id} variants={cardVariants}>
              <Card
                className="bg-transparent border-none overflow-hidden group cursor-pointer"
                onClick={() => setSelectedArtist(artist)}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name}
                    width={400}
                    height={400}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0033] to-transparent opacity-70"></div>
                  <CardContent className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{artist.name}</h3>
                    <p className="text-[#ffcc00]">{artist.genre}</p>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Dialog */}
        <Dialog open={!!selectedArtist} onOpenChange={(open) => !open && setSelectedArtist(null)}>
          {selectedArtist && (
            <DialogContent className="bg-[#3a0066] text-white border-[#ffcc00] max-w-[95vw] md:max-w-3xl p-3 sm:p-6">
              <motion.div
                variants={dialogVariants}
                initial="hidden"
                animate="visible"
              >
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl text-[#ffcc00]">{selectedArtist.name}</DialogTitle>
                  <DialogDescription className="text-gray-300">{selectedArtist.genre}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  <Image
                    src={selectedArtist.image || "/placeholder.svg"}
                    alt={selectedArtist.name}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover w-full md:w-1/3 h-40 sm:h-48 md:h-auto"
                  />
                  <div className="md:w-2/3">
                    <p className="text-white">{selectedArtist.bio}</p>
                    <p className="mt-4 text-[#ffcc00]">Don't miss their performance at TRYST 2025!</p>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
}
