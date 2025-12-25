import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HIMANIA FIA UI\'s Financial Dashboard',
  description: 'Open, transparent, and real-time financial dashboard for HIMANIA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
