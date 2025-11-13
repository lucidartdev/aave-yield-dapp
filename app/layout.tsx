import './globals.css'
import type { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Aave Yield DApp',
  description: 'Deposit into Aave and earn yield with ease',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-dark text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
