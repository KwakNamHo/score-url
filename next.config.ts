import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false, // lightningcss 완전 비활성화
  },

  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      lightningcss: false, // lightningcss 모듈 import 차단
    }

    return config
  },
}

export default nextConfig
