const dev = process.env.NODE_ENV === 'development';

const nextConfig = {
  images: {
    domains: ['localhost','escapavelo.fr'],
    unoptimized: true
},
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

export default nextConfig;
