'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

declare global {
  interface Window {
    ethereum?: {
      on: (event: string, callback: (accounts: string[]) => void) => void
      request: (args: { method: string; params?: unknown[] }) => Promise<string[]>
    }
  }
}

export default function WalletConnectButton() {
  const [account, setAccount] = useState<string | null>(null)

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null)
      })
    }
  }, [])

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast.error('MetaMask not detected')
        return
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accounts[0])
      toast.success('Wallet connected!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to connect wallet')
    }
  }

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 rounded-xl bg-primary text-white hover:opacity-90 transition-all"
    >
      {account
        ? `${account.slice(0, 6)}...${account.slice(-4)}`
        : 'Connect Wallet'}
    </button>
  )
}
