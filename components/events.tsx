"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin } from 'lucide-react'
import { motion, Variants } from "framer-motion"
import { events } from "@/utils/data" // Import updated dummy data

export default function Events() {
  const [activeDay, setActiveDay] = useState("day1")

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger animations for children
      },
    },
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  }

  return (
    <section id="events" className="py-20 bg-[#130520] relative z-20">
      <div className="absolute h-full w-full inset-0 bg-[url('/fest_bg.jpg')] bg-cover bg-center opacity-25 -z-10 bg-fixed"></div>
      <div className="container mx-auto px-4 z-10">
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
            Event <span className="text-[#ffcc00]">Schedule</span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-[#ffcc00] mx-auto mb-8"
            variants={fadeIn}
          ></motion.div>
          <motion.p
            className="text-white max-w-3xl mx-auto text-base sm:text-lg px-2"
            variants={fadeInUp}
          >
            Explore our exciting lineup of events spread across three days of non-stop entertainment, competition, and
            creativity.
          </motion.p>
        </motion.div>

        <Tabs defaultValue="day1" className="w-full" onValueChange={setActiveDay}>
          <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-8 bg-[#3a0066] text-sm sm:text-base">
            <TabsTrigger value="day1" className="data-[state=active]:bg-[#ffcc00] data-[state=active]:text-[#1a0033]">
              Day 1
            </TabsTrigger>
            <TabsTrigger value="day2" className="data-[state=active]:bg-[#ffcc00] data-[state=active]:text-[#1a0033]">
              Day 2
            </TabsTrigger>
          </TabsList>

          {Object.keys(events).map((day) => (
            <TabsContent key={day} value={day} className="mt-0">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                {events[day as keyof typeof events].map((event, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card
                      className="bg-[#3a0066] h-full border-[1px] border-gray-600 shadow-md text-white hover:shadow-lg hover:shadow-[#ffcc00]/20 transition-all duration-300"
                    >
                      <CardHeader className="p-3 sm:p-6">
                        <CardTitle className="text-lg sm:text-xl text-[#ffcc00]">{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
                        <div className="flex items-center mb-2">
                          <Clock className="h-4 w-4 mr-2 text-gray-300" />
                          <CardDescription className="text-gray-300">{event.time}</CardDescription>
                        </div>
                        <div className="flex items-center mb-4">
                          <MapPin className="h-4 w-4 mr-2 text-gray-300" />
                          <CardDescription className="text-gray-300">{event.venue}</CardDescription>
                        </div>
                        <p className="text-white">{event.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}