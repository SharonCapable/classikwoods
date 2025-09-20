import Link from 'next/link'
import { Hammer, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-wood-800 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Hammer className="h-8 w-8 text-wood-300" />
              <span className="text-2xl font-serif font-bold text-white">
                Classik Woods
              </span>
            </Link>
            <p className="text-wood-200 mb-4 max-w-md">
              Crafting exceptional woodwork with traditional techniques and modern precision. 
              Every piece tells a story of quality, dedication, and timeless craftsmanship.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-wood-200">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-wood-200">
                <Mail className="h-4 w-4" />
                <span>info@classikwoods.com</span>
              </div>
              <div className="flex items-center space-x-2 text-wood-200">
                <MapPin className="h-4 w-4" />
                <span>Your City, State</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-wood-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-wood-200 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-wood-200 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-wood-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-wood-200">
              <li>Custom Furniture</li>
              <li>Kitchen Cabinets</li>
              <li>Built-in Storage</li>
              <li>Restoration</li>
              <li>Trim & Molding</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-wood-700 mt-8 pt-8 text-center text-wood-300">
          <p>&copy; 2024 Classik Woods. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
