import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/stylish-storage/**',
        search: '',
      },
    ],
    minimumCacheTTL: 2678400,
    deviceSizes: [480, 640],
    formats: ['image/webp'],
  },
};

export default nextConfig;
