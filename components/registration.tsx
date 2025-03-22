"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import axios from "axios"
import { ReloadIcon } from "@radix-ui/react-icons" // Import a loading spinner

// Form schemas for validation
const generalFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  college: z.string().min(2, { message: "College name is required." }),
  rollNumber: z.string().min(1, { message: "College roll number is required." }),
  year: z.string().min(1, { message: "Year of study is required." }),
  course: z.string().min(1, { message: "Course is required." }),
  phone: z.string().min(10, { message: "Valid phone number is required." }),
  email: z.string().email({ message: "Valid email is required." }),
})

const eventFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  college: z.string().min(2, { message: "College name is required." }),
  rollNumber: z.string().min(1, { message: "College roll number is required." }),
  event: z.string().min(1, { message: "Event selection is required." }),
  phone: z.string().min(10, { message: "Valid phone number is required." }),
  email: z.string().email({ message: "Valid email is required." }),
  teamMembers: z.string().optional(),
})

export default function Registration() {
  const [activeTab, setActiveTab] = useState("general")

  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      name: "",
      college: "",
      rollNumber: "",
      year: "",
      course: "",
      phone: "",
      email: "",
    },
  })

  const eventForm = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      college: "",
      rollNumber: "",
      event: "",
      phone: "",
      email: "",
      teamMembers: "",
    },
  })

  async function onGeneralSubmit(values: z.infer<typeof generalFormSchema>) {
    try {
      // Fetch all normal registrations (optional validation)
      const { data: allRegistrations } = await axios.get("/api/normal-registration")
      console.log("All Normal Registrations:", allRegistrations)

      // Check if the user already submitted before
      const alreadySubmitted = allRegistrations.some(
        (registration: any) => registration.email === values.email
      )
      if (alreadySubmitted) {
        toast({
          title: "Registration Failed",
          description: "You have already registered with this email.",
          variant: "destructive",
        })
        return
      }

      // Send form data to backend
      const { data } = await axios.post("/api/normal-registration", values)
      console.log("Response from server:", data)

      toast({
        title: "Registration Successful!",
        description: "You have successfully registered for TRYST 2025.",
      })
      generalForm.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Registration Failed",
        description: "An error occurred while submitting the form. Please try again.",
        variant: "destructive",
      })
    }
  }

  async function onEventSubmit(values: z.infer<typeof eventFormSchema>) {
    try {
      // Fetch all event registrations (optional validation)
      const { data: allEventRegistrations } = await axios.get("/api/event-registration")
      console.log("All Event Registrations:", allEventRegistrations)

      // Check if the user already submitted before
      const alreadySubmitted = allEventRegistrations.some(
        (registration: any) => registration.email === values.email
      )
      if (alreadySubmitted) {
        toast({
          title: "Registration Failed",
          description: "You have already registered for an event with this email.",
          variant: "destructive",
        })
        return
      }

      // Send form data to backend
      const { data } = await axios.post("/api/event-registration", values)
      console.log("Response from server:", data)

      toast({
        title: "Event Registration Successful!",
        description: `You have successfully registered for ${values.event}.`,
      })
      eventForm.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Registration Failed",
        description: "An error occurred while submitting the form. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <section id="registration" className="py-20 bg-[#130520] relative z-20">
      <div className="absolute h-full w-full inset-0 bg-[url('/fest_bg.jpg')] bg-cover bg-center opacity-25 -z-10 bg-fixed"></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            <span className="text-[#ffcc00]">Registration</span>
          </h2>
          <div className="w-24 h-1 bg-[#ffcc00] mx-auto mb-8"></div>
          <p className="text-white max-w-3xl mx-auto text-base sm:text-lg px-2">
            Register for TRYST 2025 to participate in exciting events and competitions. Fill out the form below to
            secure your spot.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-8 bg-[#3a0066] text-sm sm:text-base">
              <TabsTrigger
                value="general"
                className="data-[state=active]:bg-[#ffcc00] data-[state=active]:text-[#1a0033]"
              >
                General Registration
              </TabsTrigger>
              <TabsTrigger
                value="event"
                className="data-[state=active]:bg-[#ffcc00] data-[state=active]:text-[#1a0033]"
              >
                Event Registration
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card className="bg-[#3a0066] border-none text-white">
                <CardHeader className="p-3 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl text-[#ffcc00]">General Registration</CardTitle>
                  <CardDescription className="text-gray-300">
                    Register for TRYST 2025 to attend all open events and activities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-6">
                  <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          className="bg-[#1a0033] border-[#660033] text-white"
                          {...generalForm.register("name")}
                        />
                        {generalForm.formState.errors.name && (
                          <p className="text-red-400 text-sm">{generalForm.formState.errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="college">College/University</Label>
                        <Input
                          id="college"
                          placeholder="Enter your college name"
                          className="bg-[#1a0033] border-[#660033] text-white"
                          {...generalForm.register("college")}
                        />
                        {generalForm.formState.errors.college && (
                          <p className="text-red-400 text-sm">{generalForm.formState.errors.college.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rollNumber">College Roll Number</Label>
                        <Input
                          id="rollNumber"
                          placeholder="Enter your roll number"
                          className="bg-[#1a0033] border-[#660033] text-white"
                          {...generalForm.register("rollNumber")}
                        />
                        {generalForm.formState.errors.rollNumber && (
                          <p className="text-red-400 text-sm">{generalForm.formState.errors.rollNumber.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="year">Year of Study</Label>
                        <Select onValueChange={(value) => generalForm.setValue("year", value)}>
                          <SelectTrigger className="bg-[#1a0033] border-[#660033] text-white">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#3a0066] text-white border-[#660033]">
                            <SelectItem value="1">First Year</SelectItem>
                            <SelectItem value="2">Second Year</SelectItem>
                            <SelectItem value="3">Third Year</SelectItem>
                            <SelectItem value="4">Fourth Year</SelectItem>
                            <SelectItem value="5">Fifth Year</SelectItem>
                          </SelectContent>
                        </Select>
                        {generalForm.formState.errors.year && (
                          <p className="text-red-400 text-sm">{generalForm.formState.errors.year.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Input
                          id="course"
                          placeholder="Enter your course"
                          className="bg-[#1a0033] border-[#660033] text-white"
                          {...generalForm.register("course")}
                        />
                        {generalForm.formState.errors.course && (
                          <p className="text-red-400 text-sm">{generalForm.formState.errors.course.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="Enter your phone number"
                          className="bg-[#1a0033] border-[#660033] text-white"
                          {...generalForm.register("phone")}
                        />
                        {generalForm.formState.errors.phone && (
                          <p className="text-red-400 text-sm">{generalForm.formState.errors.phone.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="bg-[#1a0033] border-[#660033] text-white"
                          {...generalForm.register("email")}
                        />
                        {generalForm.formState.errors.email && (
                          <p className="text-red-400 text-sm">{generalForm.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#ffcc00] text-[#1a0033] hover:bg-[#ffcc00]/80"
                      disabled={generalForm.formState.isSubmitting}
                    >
                      {generalForm.formState.isSubmitting ? (
                        <div className="flex items-center">
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          Registering...
                        </div>
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="event">
              <Card className="bg-[#3a0066] border-none text-white">
                <CardHeader className="p-3 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl text-[#ffcc00]">Event Registration</CardTitle>
                  <CardDescription className="text-gray-300">
                    Register for specific competitions and events at TRYST 2025.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-6">
                  <form onSubmit={eventForm.handleSubmit(onEventSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="event-name">Full Name</Label>
                        <Input
                          id="event-name"
                          placeholder="Enter your full name"
                          className="bg-[#1a0033] border-[#660033] text-white"
                          {...eventForm.register("name")}
                        />
                        {eventForm.formState.errors.name && (
                          <p className="text-red-400 text-sm">{eventForm.formState.errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="event-college">College/University</Label>
                        <Input
                          id="event-college"
                          placeholder="Enter your college name"
                          className="bg-[#1a0033] border-[#660033] text-white"
                          {...eventForm.register("college")}
                        />
                        {eventForm.formState.errors.college && (
                          <p className="text-red-400 text-sm">{eventForm.formState.errors.college.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="event-rollNumber">College Roll Number</Label>
                        <Input
                          id="event-rollNumber"
                          placeholder="Enter your roll number"
                          className="bg-[#1a0033] border-[#660033] text-white"
                          {...eventForm.register("rollNumber")}
                        />
                        {eventForm.formState.errors.rollNumber && (
                          <p className="text-red-400 text-sm">{eventForm.formState.errors.rollNumber.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="event-selection">Select Event</Label>
                        <Select onValueChange={(value) => eventForm.setValue("event", value)}>
                          <SelectTrigger className="bg-[#1a0033] border-[#660033] text-white">
                            <SelectValue placeholder="Select event" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#3a0066] text-white border-[#660033]">
                            <SelectItem value="hackathon">Hackathon</SelectItem>
                            <SelectItem value="dance">Dance Competition</SelectItem>
                            <SelectItem value="battle-of-bands">Battle of Bands</SelectItem>
                            <SelectItem value="fashion-show">Fashion Show</SelectItem>
                            <SelectItem value="treasure-hunt">Treasure Hunt</SelectItem>
                            <SelectItem value="debate">Debate Competition</SelectItem>
                          </SelectContent>
                        </Select>
                        {eventForm.formState.errors.event && (
                          <p className="text-red-400 text-sm">{eventForm.formState.errors.event.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="event-phone">Phone Number</Label>
                        <Input
                          id="event-phone"
                          placeholder="Enter your phone number"
                          className="bg-[#1a0033] border-[#660033] text-white"
                          {...eventForm.register("phone")}
                        />
                        {eventForm.formState.errors.phone && (
                          <p className="text-red-400 text-sm">{eventForm.formState.errors.phone.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="event-email">Email</Label>
                        <Input
                          id="event-email"
                          type="email"
                          placeholder="Enter your email"
                          className="bg-[#1a0033] border-[#660033] text-white"
                          {...eventForm.register("email")}
                        />
                        {eventForm.formState.errors.email && (
                          <p className="text-red-400 text-sm">{eventForm.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teamMembers">Team Members (if applicable)</Label>
                      <Textarea
                        id="teamMembers"
                        placeholder="Enter names of team members, one per line"
                        className="bg-[#1a0033] border-[#660033] text-white min-h-[80px] sm:min-h-[100px]"
                        {...eventForm.register("teamMembers")}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#ffcc00] text-[#1a0033] hover:bg-[#ffcc00]/80"
                      disabled={eventForm.formState.isSubmitting}
                    >
                      {eventForm.formState.isSubmitting ? (
                        <div className="flex items-center">
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          Registering...
                        </div>
                      ) : (
                        "Register for Event"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}