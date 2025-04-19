"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ExternalLink, MapPin, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { events } from "@/utils/data"


export default function Events() {
  const [activeDay, setActiveDay] = useState("day1")
  const [visibleCount, setVisibleCount] = useState({
    day1: 3,
    day2: 3
  })

  const loadMore = (day: string) => {
    setVisibleCount(prev => ({
      ...prev,
      [day]: prev[day as keyof typeof prev] + 2
    }))
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="events" className="py-20 bg-[#130520] relative z-20">
      <div className="absolute h-full w-full inset-0 bg-[url('/fest_bg.jpg')] bg-cover bg-center opacity-25 -z-10 bg-fixed"></div>
      <div className="container mx-auto px-4 z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4"
            variants={itemVariants}
          >
            Event <span className="text-[#ffcc00]">Schedule</span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-[#ffcc00] mx-auto mb-8"
            variants={itemVariants}
          ></motion.div>
          <motion.p
            className="text-white max-w-3xl mx-auto text-base sm:text-lg px-2"
            variants={itemVariants}
          >
            Explore our exciting lineup of events spread across two days of non-stop entertainment, competition, and
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
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {events[day as keyof typeof events]
                    .slice(0, visibleCount[day as keyof typeof visibleCount])
                    .map((event, index) => (
                      <motion.div
                        key={`${day}-${index}`}
                        variants={itemVariants}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col"
                      >
                        <Card className="bg-[#3a0066] h-full border-[1px] border-gray-600 shadow-md text-white hover:shadow-lg hover:shadow-[#ffcc00]/20 transition-all duration-300 flex flex-col">
                          <CardHeader className="p-3 sm:p-6 pb-0">
                            <CardTitle className="text-lg sm:text-xl text-[#ffcc00]">{event.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-3 sm:p-6 flex flex-col flex-grow">
                            <div className="flex-grow">
                              <div className="flex items-center mb-2">
                                <Clock className="h-4 w-4 mr-2 text-gray-300" />
                                <CardDescription className="text-gray-300">{event.time}</CardDescription>
                              </div>
                              <div className="flex items-center mb-4">
                                <MapPin className="h-4 w-4 mr-2 text-gray-300" />
                                <CardDescription className="text-gray-300">{event.venue}</CardDescription>
                              </div>
                              <p className="text-white mb-4">{event.description}</p>
                            </div>
                            
                            <div className="mt-auto pt-4">
                              {event.registrationLink ? (
                                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="w-full block">
                                  <Button variant="outline" className="w-full border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00]/10 flex items-center">
                                    Register Now
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                  </Button>
                                </a>
                              ) : (
                                <div className="h-10"></div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </motion.div>

              {events[day as keyof typeof events].length > visibleCount[day as keyof typeof visibleCount] && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 flex justify-center"
                >
                  <Button 
                    onClick={() => loadMore(day)}
                    variant="outline" 
                    className="border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00]/10"
                  >
                    Show More
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}