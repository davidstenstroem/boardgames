/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'cf.geekdo-images.com',
        protocol: 'https',
        port: '',
        pathname: '**/*',
      },
    ],
  },
};

module.exports = nextConfig;
