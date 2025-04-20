"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"
import axios from "axios"
import { ReloadIcon } from "@radix-ui/react-icons" // Import loading spinner
import toast, { Toaster } from "react-hot-toast" // Import react-hot-toast

// Zod schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Valid email is required." }),
  college: z.string().min(2, { message: "College name is required." }),
  course: z.string().min(1, { message: "Course is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export default function Contact() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      college: "",
      course: "",
      message: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    try {
      // Send form data to backend
      const { data } = await axios.post("/api/contact", values)
      console.log("Response from server:", data)

      toast.success("Message sent! We'll get back to you as soon as possible.")
      form.reset() // Reset form after successful submission
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message. Please try again.")
    }
  }

  return (
    <section id="contact" className="py-20 bg-[#130520] relative z-20">
      <div className="absolute h-full w-full inset-0 bg-[url('/fest_bg.jpg')] bg-cover bg-center opacity-25 -z-10 bg-fixed"></div>
      <div>
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            Contact <span className="text-[#ffcc00]">Us</span>
          </h2>
          <div className="w-24 h-1 bg-[#ffcc00] mx-auto mb-8"></div>
          <p className="text-white max-w-3xl mx-auto text-base sm:text-lg px-2">
            Have questions about TRYST 2025? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
          <Card className="bg-[#3a0066] border-none text-white">
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-[#ffcc00]">Send us a message</CardTitle>
              <CardDescription className="text-gray-300">
                Fill out the form below and we'll respond to your query soon.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      className="bg-[#1a0033] border-[#660033] text-white"
                      {...form.register("name")}
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-400 text-sm">{form.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="bg-[#1a0033] border-[#660033] text-white"
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm">{form.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="college">College/University</Label>
                    <Input
                      id="college"
                      placeholder="Enter your college name"
                      className="bg-[#1a0033] border-[#660033] text-white"
                      {...form.register("college")}
                    />
                    {form.formState.errors.college && (
                      <p className="text-red-400 text-sm">{form.formState.errors.college.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Input
                      id="course"
                      placeholder="Enter your course"
                      className="bg-[#1a0033] border-[#660033] text-white"
                      {...form.register("course")}
                    />
                    {form.formState.errors.course && (
                      <p className="text-red-400 text-sm">{form.formState.errors.course.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here"
                    className="bg-[#1a0033] border-[#660033] text-white min-h-[100px] sm:min-h-[150px]"
                    {...form.register("message")}
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-400 text-sm">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#ffcc00] text-[#1a0033] hover:bg-[#ffcc00]/80"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <div className="flex items-center">
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex flex-col justify-center">
            <div className="bg-[#3a0066] p-4 sm:p-6 md:p-8 rounded-lg mb-4 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-[#ffcc00] mb-3 sm:mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-[#ffcc00] mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <p className="text-gray-300">contact@theyoungtechies.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-[#ffcc00] mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Phone</h4>
                    <p className="text-gray-300">+91 9310256281 (General Inquiries)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#3a0066] p-4 sm:p-6 md:p-8 rounded-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-[#ffcc00] mb-3 sm:mb-6">Visit Us</h3>
              <p className="text-white mb-4">
                Keshav Mahavidyalaya
                <br />
                University of Delhi
                <br />
                H-4-5 Zone, Pitampura
                <br />
                Delhi - 110034
              </p>
              <div className="rounded-lg overflow-hidden h-[150px] sm:h-[200px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.0627263514284!2d77.11767277550284!3d28.6877701756346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03c34fb126e3%3A0xb857945e72aca18!2sKeshav%20Mahavidyalaya!5e0!3m2!1sen!2sin!4v1742197025674!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: "0px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" /> {/* Add Toaster for toast notifications */}
    </section>
  )
}