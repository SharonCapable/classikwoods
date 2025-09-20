'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, DollarSign, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { BookingSubmission, BookingStatus } from '@/types';

type BookingFormData = Omit<BookingSubmission, 'id' | 'status' | 'created_at'>;

interface Props {
  defaultProjectType?: string;
}

export default function BookingForm({ defaultProjectType }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      project_type: defaultProjectType || '',
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const newBooking = {
        ...data,
        id: crypto.randomUUID(),
        status: 'pending' as BookingStatus,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('bookings')
        .insert([newBooking]);

      if (error) throw error;

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-semibold text-stone-900 mb-6">Book Your Project</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700">
            Name *
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
            className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700">
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-stone-700">
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="project_type" className="block text-sm font-medium text-stone-700">
            Project Type *
          </label>
          <select
            id="project_type"
            {...register('project_type', { required: 'Project type is required' })}
            className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
            disabled={isSubmitting}
          >
            <option value="">Select a project type</option>
            <option value="Custom Furniture">Custom Furniture</option>
            <option value="Kitchen Cabinetry">Kitchen Cabinetry</option>
            <option value="Wood Restoration">Wood Restoration</option>
            <option value="Built-in Storage">Built-in Storage</option>
            <option value="Other">Other</option>
          </select>
          {errors.project_type && (
            <p className="mt-1 text-sm text-red-600">{errors.project_type.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="preferred_date" className="block text-sm font-medium text-stone-700">
              Preferred Start Date *
            </label>
            <div className="mt-1 relative">
              <input
                type="date"
                id="preferred_date"
                {...register('preferred_date', { required: 'Start date is required' })}
                className="block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
                disabled={isSubmitting}
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-stone-400" />
            </div>
            {errors.preferred_date && (
              <p className="mt-1 text-sm text-red-600">{errors.preferred_date.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-stone-700">
              Budget Range *
            </label>
            <div className="mt-1 relative">
              <select
                id="budget"
                {...register('budget', { required: 'Budget range is required' })}
                className="block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
                disabled={isSubmitting}
              >
                <option value="">Select budget range</option>
                <option value="Under $1,000">Under $1,000</option>
                <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000+">$10,000+</option>
              </select>
              <DollarSign className="absolute right-3 top-2.5 h-5 w-5 text-stone-400" />
            </div>
            {errors.budget && (
              <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-stone-700">
            Project Details *
          </label>
          <textarea
            id="message"
            {...register('message', {
              required: 'Project details are required',
              minLength: {
                value: 50,
                message: 'Please provide at least 50 characters',
              },
            })}
            rows={4}
            className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
            placeholder="Please describe your project in detail..."
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center gap-2 rounded-md bg-stone-800 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            'Submitting...'
          ) : (
            <>
              <Send className="h-5 w-5" />
              Submit Booking Request
            </>
          )}
        </button>
      </div>

      {submitStatus === 'success' && (
        <div className="mt-4 p-4 rounded-md bg-green-50 text-green-800">
          Your booking request has been submitted successfully. We'll contact you soon!
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mt-4 p-4 rounded-md bg-red-50 text-red-800">
          There was an error submitting your request. Please try again.
        </div>
      )}
    </form>
  );
}
