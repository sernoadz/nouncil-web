/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
