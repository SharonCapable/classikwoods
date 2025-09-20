/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lmqkuvyyhtmdqjdkzomb.supabase.co'],
  },
  // Remove any experimental or deprecated options
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig