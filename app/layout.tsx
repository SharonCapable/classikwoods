import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Classik Woods - Master Carpenter & Woodworker',
  description: 'Handcrafted woodwork and custom carpentry services. Quality craftsmanship for your home and business.',
  keywords: 'carpenter, woodworker, custom furniture, handcrafted, woodwork, carpentry services',
  authors: [{ name: 'Classik Woods' }],
  openGraph: {
    title: 'Classik Woods - Master Carpenter & Woodworker',
    description: 'Handcrafted woodwork and custom carpentry services. Quality craftsmanship for your home and business.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
