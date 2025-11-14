'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { ethers } from 'ethers'
import { getERC20, getLendingPool } from '@/lib/contract'

export function useDeposit() {
  const [loading, setLoading] = useState(false)

  const deposit = async (tokenAddress: string, amount: string) => {
    try {
      setLoading(true)
      const erc20 = await getERC20(tokenAddress)
      const pool = await getLendingPool()
      const parsedAmount = ethers.parseUnits(amount, 18)

      // Approve Aave pool to spend tokens
      toast('Approving token...')
      const approveTx = await erc20.approve(
        await pool.getAddress(),
        parsedAmount
      )
      await approveTx.wait()

      // Deposit into Aave
      toast('Depositing to Aave...')
      const depositTx = await pool.supply(
        tokenAddress,
        parsedAmount,
        await pool.signer.getAddress(),
        0
      )
      await depositTx.wait()

      toast.success('Deposit successful ✅')
    } catch (err) {
      console.error(err)
      toast.error('Transaction failed')
    } finally {
      setLoading(false)
    }
  }

  return { deposit, loading }
}
