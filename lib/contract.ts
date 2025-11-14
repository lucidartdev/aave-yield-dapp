import { ethers } from 'ethers'
import LendingPoolABI from '@/abi/LendingPool.json'
import ERC20ABI from '@/abi/ERC20.json'
import { AAVE_ADDRESSES } from './constants'

export const getProvider = () => {
  if (!window.ethereum) throw new Error('MetaMask not found')
  return new ethers.BrowserProvider(window.ethereum)
}

export const getLendingPool = async () => {
  const provider = await getProvider()
  const signer = await provider.getSigner()
  return new ethers.Contract(
    AAVE_ADDRESSES.LENDING_POOL,
    LendingPoolABI,
    signer
  )
}

export const getERC20 = async (tokenAddress: string) => {
  const provider = await getProvider()
  const signer = await provider.getSigner()
  return new ethers.Contract(tokenAddress, ERC20ABI, signer)
}
