import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Prompt Wars - AI-Powered Prompt Engineering Challenge",
  description: "Join the Prompt Wars event at P.E.S College of Engineering, Mandya on 8th May 2025",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
