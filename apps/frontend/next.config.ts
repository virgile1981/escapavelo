import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:3000/uploads/:path*', // proxy
      },
    ];
  },
};

export default nextConfig;
