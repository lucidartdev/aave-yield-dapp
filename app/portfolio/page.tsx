'use client'

import { motion } from 'framer-motion'
import { usePortfolio } from '@/hooks/usePortfolio'
import { Loader2 } from 'lucide-react'

interface PortfolioItem {
  token: string
  supplied: string
  walletBalance: string
  yield: number
}

export default function PortfolioPage() {
  const { portfolio, loading } = usePortfolio()

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    )

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-2xl shadow-xl">
      <motion.h1 animate={{ opacity: 1 }} className="text-2xl font-bold">
        Your Portfolio
      </motion.h1>

      <div className="space-y-4">
        {portfolio.map((item: PortfolioItem) => (
          <div
            key={item.token}
            className="bg-gray-800 p-4 rounded-xl flex justify-between"
          >
            <div>
              <p className="text-lg font-semibold">{item.token}</p>
              <p className="text-gray-400 text-sm">Supplied: {item.supplied}</p>
            </div>

            <div className="text-right">
              <p className="text-gray-400 text-sm">
                Wallet: {item.walletBalance}
              </p>
              <p className="text-green-400 font-bold">
                Yield: {item.yield.toFixed(6)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
