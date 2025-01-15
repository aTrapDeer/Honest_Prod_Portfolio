import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Honest Productions',
  description: 'Professional Music Video Production Company',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#9AA8FF] font-agrandir min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
