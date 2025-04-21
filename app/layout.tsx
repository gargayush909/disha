import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })

// Dynamically import client components with no SSR
const KeyboardShortcuts = dynamic(() => import('./components/KeyboardShortcuts'), { ssr: false })
const PageTransition = dynamic(() => import('./components/PageTransition'), { ssr: false })

export const metadata: Metadata = {
  title: 'Disha - JEE & NEET Mentorship',
  description: 'Get Personal Mentorship for JEE & NEET from verified IITians and NEET Top Rankers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <KeyboardShortcuts />
        <PageTransition />
        {children}
      </body>
    </html>
  )
}
