'use client'

import { CheckCircle } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BookingForm from '@/components/BookingForm'

interface Props {
  searchParams: {
    project_type?: string;
  };
}

export default function AboutPage({ searchParams }: Props) {
  const { project_type } = searchParams;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="px-8 py-16 bg-gradient-to-br from-wood-50 to-sage-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-black mb-6 text-wood-800">
            About Classik Woods
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Crafting exceptional woodwork with traditional techniques and modern precision. 
            Every piece tells a story of quality, dedication, and timeless craftsmanship.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-wood-800">
                Master Craftsman with 15+ Years Experience
              </h2>
              <p className="text-gray-600 mb-6">
                I'm Olayiwola, a passionate woodworker dedicated to creating bespoke furniture 
                and custom woodwork that combines traditional craftsmanship with contemporary design. 
                My journey began over 15 years ago, and I've since honed my skills to deliver 
                exceptional quality in every project.
              </p>
              <p className="text-gray-600 mb-8">
                From custom kitchen cabinets to handcrafted furniture pieces, I approach each 
                project with meticulous attention to detail and a commitment to exceeding 
                client expectations.
              </p>
            </div>
            <div className="bg-wood-100 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-wood-800">Why Choose Classik Woods?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-sage-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Premium quality materials and finishes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-sage-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Custom designs tailored to your space</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-sage-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Traditional joinery techniques</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-sage-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Timely project completion</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-sage-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Comprehensive warranty on all work</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-8 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-wood-800">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-wood-800">Custom Furniture</h3>
              <p className="text-gray-600">
                Handcrafted tables, chairs, cabinets, and storage solutions designed specifically for your space and needs.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-wood-800">Kitchen Cabinetry</h3>
              <p className="text-gray-600">
                Custom kitchen cabinets, islands, and storage solutions that maximize both functionality and aesthetic appeal.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-wood-800">Built-in Storage</h3>
              <p className="text-gray-600">
                Custom built-in shelving, closets, and storage solutions that seamlessly integrate with your home's architecture.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-wood-800">Wood Restoration</h3>
              <p className="text-gray-600">
                Expert restoration and refinishing of antique furniture and woodwork to bring new life to cherished pieces.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-wood-800">Trim & Molding</h3>
              <p className="text-gray-600">
                Custom trim work, crown molding, and architectural details that add character and elegance to any space.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-wood-800">Consultation</h3>
              <p className="text-gray-600">
                Design consultation and project planning to help you make informed decisions about your woodworking projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-wood-800">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600">
              Get a free consultation and quote for your custom woodworking project.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <BookingForm defaultProjectType={project_type} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}