'use client'

import { useState } from 'react'
import { TOKENS } from '@/lib/constants'
import { useWithdraw } from '@/hooks/useWithdraw'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function WithdrawPage() {
  const [selectedToken, setSelectedToken] = useState(TOKENS[0])
  const [amount, setAmount] = useState('')
  const { withdraw, loading } = useWithdraw()

const handleWithdraw = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!amount || Number(amount) <= 0) return
    await withdraw(selectedToken.address, amount)
}

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg">
      <motion.h1
        className="text-2xl font-bold mb-6 text-center text-secondary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Withdraw From Aave
      </motion.h1>

      <form onSubmit={handleWithdraw} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Select Token
          </label>
          <select
            value={selectedToken.symbol}
            onChange={(e) =>
              setSelectedToken(TOKENS.find((t) => t.symbol === e.target.value)!)
            }
            className="w-full bg-gray-800 text-white p-3 rounded-xl focus:ring-2 focus:ring-secondary outline-none"
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
            className="w-full bg-gray-800 text-white p-3 rounded-xl focus:ring-2 focus:ring-secondary outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-secondary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Processing...
            </>
          ) : (
            'Withdraw'
          )}
        </button>
      </form>
    </div>
  )
}
