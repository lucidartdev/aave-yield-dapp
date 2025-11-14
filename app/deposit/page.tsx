'use client'

import { useState } from 'react'
import { TOKENS } from '@/lib/constants'
import { useDeposit } from '@/hooks/useDeposit'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function DepositPage() {
  const [selectedToken, setSelectedToken] = useState(TOKENS[0])
  const [amount, setAmount] = useState('')
  const { deposit, loading } = useDeposit()

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || Number(amount) <= 0) return
    await deposit(selectedToken.address, amount)
  }

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg">
      <motion.h1
        className="text-2xl font-bold mb-6 text-center text-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Deposit to Aave
      </motion.h1>

      <form onSubmit={handleDeposit} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Select Token
          </label>
          <select
            value={selectedToken.symbol}
            onChange={(e) =>
              setSelectedToken(TOKENS.find((t) => t.symbol === e.target.value)!)
            }
            className="w-full bg-gray-800 text-white p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none"
          >
            {TOKENS.map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full bg-gray-800 text-white p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Processing...
            </>
          ) : (
            'Deposit'
          )}
        </button>
      </form>
    </div>
  )
}
