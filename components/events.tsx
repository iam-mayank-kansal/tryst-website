"use client"
import { useState, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ExternalLink, MapPin, ChevronDown, Calendar, Users } from 'lucide-react'
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Button } from "./ui/button"
import { events } from "@/utils/data"

export default function Events() {
  const [activeDay, setActiveDay] = useState("day1")
  const [visibleCount, setVisibleCount] = useState({
    day1: 3,
    day2: 3
  })
  const tabsRef = useRef<HTMLDivElement>(null)

  const loadMore = (day: string) => {
    setVisibleCount(prev => ({
      ...prev,
      [day]: prev[day as keyof typeof prev] + 3
    }))
  }

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

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
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  return (
    <section id="events" className="py-24 bg-[#130520] relative z-20">
      <div className="absolute h-full w-full inset-0 bg-[url('/fest_bg.jpg')] bg-cover bg-center opacity-20 -z-10 bg-fixed"></div>
      <div className="container mx-auto px-4 sm:px-6 z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span 
            className="inline-block px-4 py-1 rounded-full bg-[#ffcc00]/10 text-[#ffcc00] text-sm font-medium mb-4"
            variants={itemVariants}
          >
            Schedule
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            Event <span className="text-[#ffcc00]">Schedule</span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#ffcc00]/50 via-[#ffcc00] to-[#ffcc00]/50 mx-auto mb-8"
            variants={itemVariants}
          ></motion.div>
          <motion.p
            className="text-white/80 max-w-3xl mx-auto text-base sm:text-lg px-2 leading-relaxed"
            variants={itemVariants}
          >
            Explore our exciting lineup of events spread across two days of non-stop entertainment, competition, and
            creativity.
          </motion.p>
        </motion.div>

        <div ref={tabsRef}>
          <Tabs 
            defaultValue="day1" 
            className="w-full" 
            onValueChange={(value) => {
              setActiveDay(value);
              // Scroll to tabs if not in view
              if (tabsRef.current) {
                const rect = tabsRef.current.getBoundingClientRect();
                if (rect.top < 0) {
                  tabsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
          >
            <div className="flex justify-center mb-8">
              <TabsList className= "h-full grid w-full max-w-md grid-cols-2 bg-[#3a0066]/70 backdrop-blur-sm text-base rounded-full p-1">
                <TabsTrigger 
                  value="day1" 
                  className="data-[state=active]:bg-[#ffcc00] data-[state=active]:text-[#1a0033] rounded-full transition-all duration-300 py-3"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Day 1
                </TabsTrigger>
                <TabsTrigger 
                  value="day2" 
                  className="data-[state=active]:bg-[#ffcc00] data-[state=active]:text-[#1a0033] rounded-full transition-all duration-300 py-3"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Day 2
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.keys(events).map((day) => (
              <TabsContent key={day} value={day} className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
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
                          variants={cardVariants}
                          whileHover="hover"
                          layout
                          className="flex flex-col"
                        >
                          <Card className="bg-gradient-to-br from-[#3a0066] to-[#4a0066] h-full border-[1px] border-white/10 shadow-lg text-white hover:border-[#ffcc00]/30 transition-all duration-300 flex flex-col rounded-xl overflow-hidden">
                            <div className="bg-[#ffcc00]/10 px-4 py-2 flex items-center justify-between">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-[#ffcc00]" />
                                <CardDescription className="text-white/80 font-medium">{event.time}</CardDescription>
                              </div>
                             
                            </div>
                            
                            <CardHeader className="p-4 sm:p-6 pb-2">
                              <CardTitle className="text-xl sm:text-2xl text-[#ffcc00] font-bold">{event.title}</CardTitle>
                              <div className="flex items-center mt-2">
                                <MapPin className="h-4 w-4 mr-2 text-white/60" />
                                <CardDescription className="text-white/80">{event.venue}</CardDescription>
                              </div>
                            </CardHeader>
                            
                            <CardContent className="p-4 sm:p-6 pt-2 flex flex-col flex-grow">
                              <div className="flex-grow">
                                <p className="text-white/90 mb-6 leading-relaxed">{event.description}</p>
                              </div>
                              
                              <div className="mt-auto pt-4 border-t border-white/10">
                                {event.registrationLink ? (
                                  <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="w-full block">
                                    <Button 
                                      variant="outline" 
                                      className="w-full border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00]/10 flex items-center justify-center gap-2 py-5 rounded-lg"
                                    >
                                      Register Now
                                      <ExternalLink className="h-4 w-4" />
                                    </Button>
                                  </a>
                                ) : (
                                  <div className="h-10 flex items-center justify-center">
                                    <span className="text-white/60 text-sm">Registration opening soon</span>
                                  </div>
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
                    className="mt-10 flex justify-center"
                  >
                    <Button 
                      onClick={() => loadMore(day)}
                      variant="outline" 
                      size="lg"
                      className="border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00]/10 group relative overflow-hidden rounded-full px-8"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Show More Events
                        <motion.div
                          animate={{ y: [0, 3, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-[#ffcc00]/0 via-[#ffcc00]/10 to-[#ffcc00]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-0"></span>
                    </Button>
                  </motion.div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
