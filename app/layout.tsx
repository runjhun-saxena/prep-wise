import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PrepWise - Practice Job Interviews with AI",
  description: "Master your interview skills with AI-powered mock interviews",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 min-h-screen`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20">{children}</div>
      </body>
    </html>
  )
}
