'use client'

import Link from 'next/link'
import WalletConnectButton from './WalletConnectButton'

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800 sticky top-0 z-50 bg-dark/80 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/" className="text-xl font-semibold text-primary">
          AaveYield
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/deposit" className="hover:text-primary">
            Deposit
          </Link>
          <Link href="/withdraw" className="hover:text-primary">
            Withdraw
          </Link>
          <Link href="/portfolio" className="hover:text-primary">
            Portfolio
          </Link>
          <WalletConnectButton />
        </div>
      </div>
    </nav>
  )
}
