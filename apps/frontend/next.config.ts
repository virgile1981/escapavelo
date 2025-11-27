import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const dev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ['localhost','escapavelo.fr'],
    unoptimized: true
  },
  
  reactStrictMode: true,
 async rewrites() {
    if (dev) {
      return [
        {
          source: '/images/:path*',
          destination: 'http://localhost:3000/images/:path*', // proxy vers backend local
        }
      ];
    }
    return [];
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

