const dev = process.env.NODE_ENV === 'development';

const nextConfig = {
  output: "standalone",
  images: {
    domains: ['localhost','escapavelo.fr'],
    unoptimized: true
  },
  i18n: {
    locales: ['fr', 'en'],   // langues disponibles
    defaultLocale: 'fr',     // langue par défaut
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

export default nextConfig;
