/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true
  },
  // Force rebuild
  generateBuildId: async () => 'v3-' + Date.now()
}

module.exports = nextConfig// Force rebuild 1774339032
