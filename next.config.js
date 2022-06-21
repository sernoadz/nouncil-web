/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/gov',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
