import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TRYST 2025 - Annual Cultural Fest of Keshav Mahavidyalaya",
  description:
    "TRYST 2025 is the annual cultural festival of Keshav Mahavidyalaya, Delhi University. Join us for three days of music, dance, art, and more!",
  icons: {
    icon: "/tryst_logo.png",   },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}