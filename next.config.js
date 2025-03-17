/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: '',
  async rewrites() {
    return [
      {
        source: '/json/:path*',
        destination: '/public/json/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
