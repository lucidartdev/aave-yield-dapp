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
      // get signer from browser provider to obtain user's address
      const ethProvider = (window as Window & typeof globalThis).ethereum
      if (!ethProvider) {
        throw new Error('No Ethereum provider found in window.ethereum')
      }
      const browserProvider = new ethers.BrowserProvider(ethProvider as unknown as ethers.Eip1193Provider)
      const signer = await browserProvider.getSigner()
      const userAddress = await signer.getAddress()
      const depositTx = await pool.supply(
        tokenAddress,
        parsedAmount,
        userAddress,
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
