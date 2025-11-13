'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowDownToLine } from 'lucide-react'

export default function HomePage() {
  const [hover, setHover] = useState(false)

  return (
    <section className="text-center py-20">
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Deposit to <span className="text-primary">Aave</span> and Earn
        Effortless Yield
      </motion.h1>

      <p className="text-gray-400 max-w-2xl mx-auto mb-10">
        Connect your wallet, choose an asset, and start earning yield instantly
        with the trusted Aave Protocol.
      </p>

      <motion.a
        href="/deposit"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-lg font-medium hover:opacity-90 transition-all"
        whileTap={{ scale: 0.95 }}
      >
        <ArrowDownToLine
          className={`transition-transform ${hover ? 'rotate-180' : ''}`}
        />
        Get Started
      </motion.a>
    </section>
  )
}
