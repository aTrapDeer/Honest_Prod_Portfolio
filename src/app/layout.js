import { Inter } from 'next/font/google';
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Honest Productions',
  description: 'Professional Video Production Company',
  icons: {
    icon: '/H.ico',
    shortcut: '/H.ico',
    apple: '/H.png',
  },
  openGraph: {
    title: 'Honest Productions',
    description: 'Professional Video Production Company',
    url: 'https://honestproductions.com', // Replace with your actual URL
    siteName: 'Honest Productions',
    images: [
      {
        url: '/H.png', // This will be the image shown when shared
        width: 1200,
        height: 630,
        alt: 'Honest Productions Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Honest Productions',
    description: 'Professional Video Production Company',
    images: ['/H.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/H.ico" sizes="any" />
      </head>
      <body className={`${inter.className} bg-[#9AA8FF] font-agrandir min-h-screen flex flex-col`}>
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
