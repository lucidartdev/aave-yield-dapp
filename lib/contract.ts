import { ethers } from 'ethers'
import LendingPoolABI from '@/abi/LendingPool.json'
import ERC20ABI from '@/abi/ERC20.json'
import { AAVE_ADDRESSES } from './constants'

/**
 * Gets the Ethers.js BrowserProvider instance.
 * @returns {ethers.BrowserProvider} The provider instance.
 * @throws {Error} if window.ethereum is not found.
 */
export const getBrowserProvider = (): ethers.BrowserProvider => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask or EIP-1193 provider not found')
  }
  // Use BrowserProvider to wrap the window.ethereum object
  return new ethers.BrowserProvider(window.ethereum)
}

/**
 * Gets the current active signer from the provider.
 * @returns {Promise<ethers.Signer>} The active signer.
 */
export const getSigner = async (): Promise<ethers.Signer> => {
  const provider = getBrowserProvider()
  // Requesting accounts ensures the provider is connected and authorized
  await provider.send('eth_requestAccounts', []) 
  return provider.getSigner()
}

/**
 * Gets the Lending Pool Contract instance with the active signer.
 * @returns {Promise<ethers.Contract>} The Lending Pool Contract instance.
 */
export const getLendingPoolContract = async (): Promise<ethers.Contract> => {
  const signer = await getSigner()
  return new ethers.Contract(
    AAVE_ADDRESSES.LENDING_POOL,
    LendingPoolABI,
    signer
  )
}

/**
 * Gets an ERC20 Token Contract instance with the active signer.
 * @param {string} tokenAddress - The address of the ERC20 token.
 * @returns {Promise<ethers.Contract>} The ERC20 Contract instance.
 */
export const getERC20Contract = async (tokenAddress: string): Promise<ethers.Contract> => {
  const signer = await getSigner()
  return new ethers.Contract(tokenAddress, ERC20ABI, signer)
}

export const getProvider = getBrowserProvider
export const getLendingPool = getLendingPoolContract
export const getERC20 = getERC20Contract