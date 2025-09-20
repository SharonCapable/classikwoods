'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, DollarSign, Send, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

interface BookingFormData {
  name: string
  email: string
  phone?: string
  project_type: string
  preferred_date: string
  budget: string
  timeline: string
  project_description: string
  materials_preference?: string
  location: string
}

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<BookingFormData>()

  const selectedProjectType = watch('project_type')

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Submit to Supabase
      const { error } = await supabase
        .from('booking_submissions')
        .insert([{
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          project_type: data.project_type,
          preferred_date: data.preferred_date,
          budget: data.budget,
          message: `Timeline: ${data.timeline}\n\nProject Description: ${data.project_description}\n\nMaterials Preference: ${data.materials_preference || 'Not specified'}\n\nLocation: ${data.location}`,
          status: 'pending'
        }])

      if (error) throw error

      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Error submitting booking form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const projectTypes = [
    { value: 'custom-furniture', label: 'Custom Furniture', description: 'Tables, chairs, cabinets, and unique pieces' },
    { value: 'kitchen-cabinets', label: 'Kitchen Cabinets', description: 'Complete kitchen cabinetry solutions' },
    { value: 'built-in-storage', label: 'Built-in Storage', description: 'Closets, shelving, and storage solutions' },
    { value: 'restoration', label: 'Furniture Restoration', description: 'Repair and refinish existing pieces' },
    { value: 'trim-molding', label: 'Trim & Molding', description: 'Crown molding, baseboards, and trim work' },
    { value: 'other', label: 'Other', description: 'Custom project or consultation' }
  ]

  const budgetRanges = [
    { value: 'under-1000', label: 'Under $1,000' },
    { value: '1000-5000', label: '$1,000 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000-25000', label: '$10,000 - $25,000' },
    { value: 'over-25000', label: 'Over $25,000' },
    { value: 'consultation', label: 'Need consultation to determine' }
  ]

  const timelineOptions = [
    { value: 'flexible', label: 'Flexible timeline' },
    { value: '1-2-weeks', label: '1-2 weeks' },
    { value: '1-month', label: '1 month' },
    { value: '2-3-months', label: '2-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: 'over-6-months', label: 'Over 6 months' }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-wood-50 to-sage-50 section-padding">
        <div className="container-max">
          <Link href="/" className="inline-flex items-center text-wood-600 hover:text-wood-700 mb-8">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-wood-800 mb-6">
              Book a Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your custom woodworking project? Fill out the form below and we'll 
              schedule a consultation to discuss your vision and provide a detailed quote.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="bg-wood-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-wood-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-wood-800 mb-2">Submit Request</h3>
                <p className="text-gray-600">Tell us about your project and preferences</p>
              </div>
              <div className="text-center">
                <div className="bg-wood-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-wood-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-wood-800 mb-2">Consultation</h3>
                <p className="text-gray-600">We'll schedule a meeting to discuss details</p>
              </div>
              <div className="text-center">
                <div className="bg-wood-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-wood-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-wood-800 mb-2">Create Together</h3>
                <p className="text-gray-600">Begin crafting your custom piece</p>
              </div>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">Booking Request Submitted!</h3>
                    <p className="text-green-700">
                      Thank you for your booking request. We'll review your project details and contact you within 24 hours to schedule your consultation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-800">
                  There was an error submitting your booking request. Please try again or contact us directly at (555) 123-4567.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-2xl font-serif font-bold text-wood-800 mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Please enter a valid email address'
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      {...register('location', { required: 'Location is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                      placeholder="City, State or Address"
                    />
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-2xl font-serif font-bold text-wood-800 mb-6">Project Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Project Type *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projectTypes.map((type) => (
                        <label key={type.value} className="relative">
                          <input
                            type="radio"
                            value={type.value}
                            {...register('project_type', { required: 'Please select a project type' })}
                            className="sr-only"
                          />
                          <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            selectedProjectType === type.value
                              ? 'border-wood-500 bg-wood-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <h4 className="font-semibold text-gray-900">{type.label}</h4>
                            <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.project_type && (
                      <p className="mt-1 text-sm text-red-600">{errors.project_type.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range *
                      </label>
                      <select
                        id="budget"
                        {...register('budget', { required: 'Please select a budget range' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                      {errors.budget && (
                        <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Timeline *
                      </label>
                      <select
                        id="timeline"
                        {...register('timeline', { required: 'Please select a timeline' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.timeline && (
                        <p className="mt-1 text-sm text-red-600">{errors.timeline.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Consultation Date *
                    </label>
                    <input
                      type="date"
                      id="preferred_date"
                      {...register('preferred_date', { required: 'Please select a preferred date' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.preferred_date && (
                      <p className="mt-1 text-sm text-red-600">{errors.preferred_date.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="project_description" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="project_description"
                      rows={4}
                      {...register('project_description', { required: 'Please describe your project' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                      placeholder="Describe your project in detail. Include dimensions, style preferences, functionality requirements, and any specific features you want..."
                    />
                    {errors.project_description && (
                      <p className="mt-1 text-sm text-red-600">{errors.project_description.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="materials_preference" className="block text-sm font-medium text-gray-700 mb-2">
                      Materials Preference
                    </label>
                    <input
                      type="text"
                      id="materials_preference"
                      {...register('materials_preference')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                      placeholder="e.g., Oak, Walnut, Cherry, Reclaimed wood, etc."
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary inline-flex items-center justify-center text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Submitting Request...
                  </>
                ) : (
                  <>
                    Submit Booking Request
                    <Send className="ml-3 h-6 w-6" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
