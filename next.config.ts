import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cryptologos.cc', 'assets.aave.com'],
  },
}

export default nextConfig
