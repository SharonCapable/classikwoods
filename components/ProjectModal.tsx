'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Project } from '@/types'

interface Props {
  project: Project | null
  onClose: () => void
  onBook: () => void
}

export default function ProjectModal({ project, onClose, onBook }: Props) {
  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75"
        onClick={onClose}
      >
        <div className="min-h-screen px-4 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl overflow-hidden max-w-4xl w-full shadow-2xl"
          >
            {/* Image Section */}
            <div className="relative aspect-video">
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/75 rounded-full text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-6">{project.description}</p>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900">Project Type</h4>
                  <p className="text-gray-600">{project.project_type}</p>
                </div>
                {project.materials && (
                  <div>
                    <h4 className="font-medium text-gray-900">Materials Used</h4>
                    <p className="text-gray-600">{project.materials}</p>
                  </div>
                )}
              </div>

              {project.client_story && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Client Story</h4>
                  <p className="text-gray-600">{project.client_story}</p>
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={onBook}
                  className="px-4 py-2 bg-wood-600 text-white rounded-lg hover:bg-wood-700"
                >
                  Book Similar Project
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
