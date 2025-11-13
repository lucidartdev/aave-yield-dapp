export const NETWORK = {
  chainId: 84532, // Base Sepolia
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
}

// Common ERC20 tokens supported (example)
export const TOKENS = [
  {
    symbol: 'DAI',
    address: '0x59470a5cd0d97bbf50fc32f476cbbed7c04074a3',
    decimals: 18,
  },
  {
    symbol: 'USDC',
    address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    decimals: 6,
  },
  {
    symbol: 'WETH',
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
  },
]

// Aave Pool contract addresses (Base Sepolia or mainnet)
export const AAVE_ADDRESSES = {
  POOL_ADDRESS_PROVIDER: '0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e',
  LENDING_POOL: '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2',
}
