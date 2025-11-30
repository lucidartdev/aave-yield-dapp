'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { ethers } from 'ethers'
import { getERC20Contract, getLendingPoolContract, getSigner } from '@/lib/contract' // Updated imports

export function useDeposit() {
  const [loading, setLoading] = useState(false)

  const deposit = async (tokenAddress: string, amount: string) => {
    try {
      setLoading(true)
      
      const erc20 = await getERC20Contract(tokenAddress) // Renamed helper
      const pool = await getLendingPoolContract() // Renamed helper
      const signer = await getSigner() // Use unified signer fetcher
      const userAddress = await signer.getAddress() // Get address from unified signer

      const parsedAmount = ethers.parseUnits(amount, 18)

      // 1. Approve Aave pool to spend tokens
      toast('Approving token...', { id: 'deposit-toast' })
      const approveTx = await erc20.approve(
        await pool.getAddress(),
        parsedAmount
      )
      await approveTx.wait()
      toast.success('Approval successful!', { id: 'deposit-toast' })


      // 2. Deposit into Aave
      toast('Depositing to Aave...', { id: 'deposit-toast' })
      
      const depositTx = await pool.supply(
        tokenAddress,
        parsedAmount,
        userAddress,
        0
      )
      await depositTx.wait()

      toast.success('Deposit successful ✅', { id: 'deposit-toast' })
    } catch (err) {
      console.error(err)
      toast.error('Transaction failed')
    } finally {
      setLoading(false)
    }
  }

  return { deposit, loading }
}