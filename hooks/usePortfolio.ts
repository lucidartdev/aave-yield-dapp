'use client'

import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { getERC20, getLendingPool } from '@/lib/contract'
import { TOKENS } from '@/lib/constants'

export function usePortfolio() {
  const [loading, setLoading] = useState(true)
  const [portfolio, setPortfolio] = useState([])

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const pool = await getLendingPool()
        const signer = await pool.signer
        const userAddress = await signer.getAddress()

        const results = []

        for (const token of TOKENS) {
          const erc20 = await getERC20(token.address)

          const walletBalance = await erc20.balanceOf(userAddress)
          const normalizedBalance = Number(
            ethers.formatUnits(walletBalance, token.decimals)
          )

          const reserveData = await pool.getUserReserveData(
            token.address,
            userAddress
          )
          const supplied = Number(
            ethers.formatUnits(reserveData.currentATokenBalance, token.decimals)
          )
          const yieldEarned =
            supplied - reserveData.principalStableDebt > 0
              ? supplied - reserveData.principalStableDebt
              : 0

          results.push({
            token: token.symbol,
            walletBalance: normalizedBalance,
            supplied,
            yield: yieldEarned,
          })
        }

        setPortfolio(results)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadPortfolio()
  }, [])

  return { portfolio, loading }
}
