import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "@/components/session-provider"

// Use Inter font globally
const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "DOKI - AI-Powered Healthcare Platform",
  description:
    "Empowering Health with AI - Medical diagnostics, counterfeit medicine detection, and health education for Kenya",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen w-full h-full flex flex-col bg-background"}>
        <SessionProvider>
          <SidebarProvider>
            {children}
            <Toaster />
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
