import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com', // Replace with your actual hostname
        pathname: '/images/**', // Allow all images under /images/
      },
    ],
  },
};

export default nextConfig;