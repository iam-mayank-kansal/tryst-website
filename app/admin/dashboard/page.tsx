"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LogOut, Search, Users, MessageSquare, Calendar, ChevronLeft, ChevronRight, Download, Filter, BarChart3, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Updated types for our queries
interface ContactQuery {
  id: string;
  name: string;
  email: string;
  college: string;
  course: string;
  message: string;
  status?: "new" | "in-progress" | "resolved";
  createdAt: string;
}

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  rollNumber: string;
  year: string;
  course: string;
  createdAt: string;
}

interface EventRegistration {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  rollNumber: string;
  event: string;
  teamMembers?: string;
  createdAt: string;
}

// Dashboard stats type
interface DashboardStats {
  totalContacts: number;
  totalRegistrations: number;
  totalEventRegistrations: number;
  newContacts: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [contactQueries, setContactQueries] = useState<ContactQuery[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    totalRegistrations: 0,
    totalEventRegistrations: 0,
    newContacts: 0,
  });

  useEffect(() => {
    // Check if admin is authenticated
    async function checkAuth() {
      try {
        const response = await fetch("/api/admin/check-auth");
        if (!response.ok) {
          router.push("/admin");
          return;
        }

        // Fetch data
        fetchData();
      } catch (error) {
        router.push("/admin");
      }
    }

    async function fetchData() {
      try {
        // Fetch contact queries
        const contactResponse = await fetch("/api/contact");
        if (!contactResponse.ok) {
          throw new Error("Failed to fetch contact queries");
        }
        const contactData = await contactResponse.json();

        // Fetch normal registrations
        const registrationResponse = await fetch("/api/normal-registration");
        if (!registrationResponse.ok) {
          throw new Error("Failed to fetch normal registrations");
        }
        const registrationData = await registrationResponse.json();

        // Fetch event registrations
        const eventRegistrationResponse = await fetch("/api/event-registration");
        if (!eventRegistrationResponse.ok) {
          throw new Error("Failed to fetch event registrations");
        }
        const eventRegistrationData = await eventRegistrationResponse.json();

        // Validate and set contact data
        const validatedContactData = contactData.map((contact: any) => ({
          ...contact,
          status: contact.status === "new" || contact.status === "in-progress" || contact.status === "resolved"
            ? contact.status
            : undefined,
        })) as ContactQuery[];

        setContactQueries(validatedContactData);
        setRegistrations(registrationData);
        setEventRegistrations(eventRegistrationData);

        // Set dashboard stats
        setStats({
          totalContacts: contactData.length,
          totalRegistrations: registrationData.length,
          totalEventRegistrations: eventRegistrationData.length,
          newContacts: contactData.filter((c: any) => c.status === "new").length,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Filter function for search
  const filterData = (data: any[], term: string) => {
    if (!term) return data;
    return data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-slate-600 dark:text-slate-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline font-medium">Admin</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 dark:text-red-400">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Contacts</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.totalContacts}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                <span className="text-emerald-500 dark:text-emerald-400">+{stats.newContacts} new</span> since last login
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Registrations</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.totalRegistrations}</h3>
                </div>
                <div className="bg-violet-100 dark:bg-violet-900/30 p-3 rounded-full">
                  <Users className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                <span className="text-emerald-500 dark:text-emerald-400">+2 new</span> since last login
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Event Registrations</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.totalEventRegistrations}</h3>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                <span className="text-emerald-500 dark:text-emerald-400">+1 new</span> since last login
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary to-primary-foreground/90 text-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">Total Users</p>
                  <h3 className="text-3xl font-bold mt-1">
                    {stats.totalRegistrations + stats.totalEventRegistrations}
                  </h3>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-xs text-white/70 mt-4">
                <span className="text-white font-medium">+3 new</span> since last login
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, email, college..."
              className="pl-10 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 border-slate-200 dark:border-slate-700">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 border-slate-200 dark:border-slate-700">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-slate-100 dark:bg-slate-800 p-1">
            <TabsTrigger value="contact" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
              Contact Queries
            </TabsTrigger>
            <TabsTrigger value="registration" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
              Registrations
            </TabsTrigger>
            <TabsTrigger value="event" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
              Event Registrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact">
            <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle>Contact Queries</CardTitle>
                <CardDescription>
                  View and manage all contact form submissions from users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-6">
                  <table className="w-full border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-700/50 border-y border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Name</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Email</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">College</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Course</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Message</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Status</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterData(contactQueries, searchTerm).map((query, index) => (
                        <tr key={query.id || index} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                          <td className="py-3 px-6 font-medium">{query.name}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{query.email}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{query.college}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{query.course}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400 max-w-xs truncate">{query.message}</td>
                          <td className="py-3 px-6">
                            {query.status === "new" && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                                New
                              </Badge>
                            )}
                            {query.status === "in-progress" && (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">
                                In Progress
                              </Badge>
                            )}
                            {query.status === "resolved" && (
                              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800">
                                Resolved
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{formatDate(query.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{contactQueries.length}</span> of <span className="font-medium">{contactQueries.length}</span> results
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled className="border-slate-200 dark:border-slate-700">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled className="border-slate-200 dark:border-slate-700">
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registration">
            <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle>User Registrations</CardTitle>
                <CardDescription>
                  View and manage all user registration information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-6">
                  <table className="w-full border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-700/50 border-y border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Name</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Email</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Phone</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">College</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Roll Number</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Year</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Course</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterData(registrations, searchTerm).map((reg,index) => (
                        <tr key={reg.id || index} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                          <td className="py-3 px-6 font-medium">{reg.name}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{reg.email}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{reg.phone}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{reg.college}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{reg.rollNumber}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{reg.year}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{reg.course}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{formatDate(reg.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{registrations.length}</span> of <span className="font-medium">{registrations.length}</span> results
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled className="border-slate-200 dark:border-slate-700">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled className="border-slate-200 dark:border-slate-700">
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="event">
            <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle>Event Registrations</CardTitle>
                <CardDescription>
                  View and manage all event registration information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-6">
                  <table className="w-full border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-700/50 border-y border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Name</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Email</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Phone</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">College</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Roll Number</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Event</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Team Members</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-500 dark:text-slate-400">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterData(eventRegistrations, searchTerm).map((reg,index) => (
                        <tr key={reg.id || index} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                          <td className="py-3 px-6 font-medium">{reg.name}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{reg.email}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{reg.phone}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{reg.college}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{reg.rollNumber}</td>
                          <td className="py-3 px-6">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:border-primary/30">
                              {reg.event}
                            </Badge>
                          </td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{reg.teamMembers}</td>
                          <td className="py-3 px-6 text-slate-600 dark:text-slate-400">{formatDate(reg.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{eventRegistrations.length}</span> of <span className="font-medium">{eventRegistrations.length}</span> results
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled className="border-slate-200 dark:border-slate-700">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled className="border-slate-200 dark:border-slate-700">
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}