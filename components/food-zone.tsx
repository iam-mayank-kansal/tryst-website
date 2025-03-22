"use client"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function FoodZone() {
  const [selectedStall, setSelectedStall] = useState<FoodStall | null>(null)

  interface FoodStall {
    id: number
    name: string
    cuisine: string
    image: string
    description: string
    specialties: string[]
  }

  const foodStalls: FoodStall[] = [
    {
      id: 1,
      name: "Spice Route",
      cuisine: "Indian",
      image: "/placeholder.svg?height=400&width=400",
      description: "Authentic Indian cuisine featuring a variety of regional specialties from across the country.",
      specialties: ["Butter Chicken", "Biryani", "Paneer Tikka", "Masala Dosa"],
    },
    {
      id: 2,
      name: "Pasta Paradise",
      cuisine: "Italian",
      image: "/placeholder.svg?height=400&width=400",
      description: "Handcrafted Italian pasta and pizza made with traditional recipes and fresh ingredients.",
      specialties: ["Margherita Pizza", "Fettuccine Alfredo", "Lasagna", "Tiramisu"],
    },
    {
      id: 3,
      name: "Wok This Way",
      cuisine: "Asian",
      image: "/placeholder.svg?height=400&width=400",
      description: "Pan-Asian delicacies cooked fresh in woks right before your eyes.",
      specialties: ["Pad Thai", "Hakka Noodles", "Dim Sum", "Sushi Rolls"],
    },
    {
      id: 4,
      name: "Sweet Tooth",
      cuisine: "Desserts",
      image: "/placeholder.svg?height=400&width=400",
      description: "Indulge your sweet cravings with a variety of desserts from around the world.",
      specialties: ["Belgian Waffles", "Churros", "Ice Cream Sundaes", "Chocolate Fondue"],
    },
    {
      id: 5,
      name: "Street Bites",
      cuisine: "Street Food",
      image: "/placeholder.svg?height=400&width=400",
      description: "Popular street food items from India and beyond, with a gourmet twist.",
      specialties: ["Pav Bhaji", "Chaat", "Kathi Rolls", "Vada Pav"],
    },
    {
      id: 6,
      name: "Brew Haven",
      cuisine: "Beverages",
      image: "/placeholder.svg?height=400&width=400",
      description: "Specialty coffee, tea, and refreshing mocktails to keep you hydrated.",
      specialties: ["Cold Brew", "Bubble Tea", "Fresh Fruit Smoothies", "Artisanal Lemonades"],
    },
  ]

  return (
    <section id="food-zone" className="py-20 bg-[#660033]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            Food <span className="text-[#ffcc00]">Zone</span>
          </h2>
          <div className="w-24 h-1 bg-[#ffcc00] mx-auto mb-8"></div>
          <p className="text-white max-w-3xl mx-auto text-base sm:text-lg px-2">
            Satisfy your hunger with delicious offerings from our diverse food stalls, featuring cuisines from around
            the world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {foodStalls.map((stall) => (
            <Card
              key={stall.id}
              className="bg-transparent border-none overflow-hidden group cursor-pointer"
              onClick={() => setSelectedStall(stall)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={stall.image || "/placeholder.svg"}
                  alt={stall.name}
                  width={400}
                  height={400}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#660033] to-transparent opacity-70"></div>
                <CardContent className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{stall.name}</h3>
                  <p className="text-[#ffcc00]">{stall.cuisine}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedStall} onOpenChange={(open) => !open && setSelectedStall(null)}>
          {selectedStall && (
            <DialogContent className="bg-[#3a0066] text-white border-[#ffcc00] max-w-[95vw] md:max-w-3xl p-3 sm:p-6">
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl text-[#ffcc00]">{selectedStall.name}</DialogTitle>
                <DialogDescription className="text-gray-300">{selectedStall.cuisine}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                <Image
                  src={selectedStall.image || "/placeholder.svg"}
                  alt={selectedStall.name}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover w-full md:w-1/3 h-40 sm:h-48 md:h-auto"
                />
                <div className="md:w-2/3">
                  <p className="text-white">{selectedStall.description}</p>
                  <h4 className="text-[#ffcc00] mt-4 mb-2">Specialties:</h4>
                  <ul className="list-disc pl-5 text-white">
                    {selectedStall.specialties.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  )
}
