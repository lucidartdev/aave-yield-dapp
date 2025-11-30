'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { ethers } from 'ethers'
import { getLendingPoolContract, getSigner } from '@/lib/contract' // Updated imports

export function useWithdraw() {
  const [loading, setLoading] = useState(false)

  const withdraw = async (tokenAddress: string, amount: string) => {
    try {
      setLoading(true)
      toast('Processing withdrawal...')

      const pool = await getLendingPoolContract() // Renamed helper
      const signer = await getSigner() // Use unified signer fetcher
      const userAddress = await signer.getAddress() // Get address from unified signer

      const parsedAmount = ethers.parseUnits(amount, 18)

      const tx = await pool.withdraw(tokenAddress, parsedAmount, userAddress)

      await tx.wait()
      toast.success('Withdrawal completed!')
    } catch (err) {
      console.error(err)
      toast.error('Withdrawal failed')
    } finally {
      setLoading(false)
    }
  }

  return { withdraw, loading }
}