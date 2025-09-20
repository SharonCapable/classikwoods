/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lmqkuvyyhtmdqjdkzomb.supabase.co',
      'images.unsplash.com',
      'via.placeholder.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  }
}

module.exports = nextConfig