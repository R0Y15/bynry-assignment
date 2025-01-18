import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['cloudflare-ipfs.com', 'loremflickr.com'],
  },
  typescript: {
    // Uncomment the following line if you want to ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Uncomment the following line if you want to ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
