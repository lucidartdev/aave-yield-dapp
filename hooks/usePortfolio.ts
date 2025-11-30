'use client'

import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { getERC20Contract, getLendingPoolContract, getSigner } from '@/lib/contract' // Updated imports
import { TOKENS } from '@/lib/constants'

// Define the interface for stronger typing
interface Token {
  symbol: string
  address: string
  decimals: number
}

interface PortfolioItem {
  token: string
  supplied: number
  walletBalance: number
  yield: number
}

export function usePortfolio() {
  const [loading, setLoading] = useState(true)
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const pool = await getLendingPoolContract() // Renamed helper
        const signer = await getSigner() // Use unified signer fetcher
        const userAddress = await signer.getAddress()

        const results: PortfolioItem[] = []

        for (const token of TOKENS) {
          const erc20 = await getERC20Contract(token.address) // Renamed helper
          
          // Fetch balances and reserve data concurrently for efficiency
          const [walletBalance, reserveData] = await Promise.all([
            erc20.balanceOf(userAddress),
            pool.getUserReserveData(token.address, userAddress)
          ]);

          const normalizedBalance = Number(
            ethers.formatUnits(walletBalance, token.decimals)
          )

          const supplied = Number(
            ethers.formatUnits(reserveData.currentATokenBalance, token.decimals)
          )
          
          
          const principalDebt = Number(
            ethers.formatUnits(reserveData.principalStableDebt, token.decimals)
          )
          
          const yieldEarned =
            supplied - principalDebt > 0
              ? supplied - principalDebt
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
        console.error("Failed to load portfolio:", err)
      } finally {
        setLoading(false)
      }
    }

    // Ensure we only try to load portfolio if window.ethereum is available
    if (typeof window !== 'undefined' && window.ethereum) {
        loadPortfolio()
    } else {
        setLoading(false); // Do not block if wallet isn't available
    }
  }, [])

  return { portfolio, loading }
}