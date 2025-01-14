import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Honest Productions',
  description: 'Visionary music video production company',
  icons: {
    icon: [
      {
        url: '/H.ico',
        sizes: 'any',
      },
      {
        url: '/H.svg',
        type: 'image/svg+xml',
      }
    ],
    shortcut: '/H.ico',
    apple: '/H.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
