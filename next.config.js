const { withFaust } = require('@faustwp/core');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization for WordPress media
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'beacon-hill-staging.local',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.beaconhillfe.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },

  // Trailing slashes to match WordPress permalinks
  trailingSlash: true,

  // Experimental features (serverActions now enabled by default in Next.js 14+)
};

module.exports = withFaust(nextConfig);

