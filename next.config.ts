/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cloudflare-ipfs.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
