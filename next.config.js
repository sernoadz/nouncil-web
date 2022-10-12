/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  target: "serverless",
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
