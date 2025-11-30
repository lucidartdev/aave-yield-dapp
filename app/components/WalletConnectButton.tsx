'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface Eip1193Provider {
  on: (event: string, callback: (accounts: string[]) => void) => void
  request: (args: { method: string; params?: unknown[] }) => Promise<string[]>
}

export default function WalletConnectButton() {
  const [account, setAccount] = useState<string | null>(null)
  const isEthereumAvailable = typeof window !== 'undefined' && window.ethereum

  useEffect(() => {
    // Check if provider is available before subscribing to events
    if (isEthereumAvailable) {
      const provider = window.ethereum as unknown as Eip1193Provider
      
      const handleAccountsChanged = (accounts: string[]) => {
        setAccount(accounts[0] || null)
      }

      // Subscribe to account changes
      provider.on('accountsChanged', handleAccountsChanged)

      provider.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch(console.error)

      return () => {
        
      }
    }
  }, [isEthereumAvailable])

  const connectWallet = async () => {
    try {
      if (!isEthereumAvailable) {
        toast.error('MetaMask or equivalent EIP-1193 wallet not detected')
        return
      }
      const accounts = await (window.ethereum as unknown as Eip1193Provider).request({ method: 'eth_requestAccounts' })
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