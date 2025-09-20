'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import ProjectModal from '@/components/ProjectModal';
import { supabase } from '@/lib/supabase';
import type { Project } from '@/types';

async function getProjects() {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return projects || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleBookProject = () => {
    if (selectedProject) {
      router.push(`/about?project_type=${encodeURIComponent(selectedProject.project_type)}`);
    }
  };

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects()
      setProjects(data)
      setLoading(false)
    }
    loadProjects()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wood-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Intro Section */}
      <section className="px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-black mb-4">Olayiwola</h1>
          <p className="text-xl text-gray-600">
            Crafting bespoke interior furniture that combines traditional woodworking techniques with modern design aesthetics.
          </p>
        </div>
      </section>

      {/* Featured Project */}
      {projects[0] && (
        <section className="px-8 mb-16">
          <div 
            className="relative aspect-[16/9] max-w-6xl mx-auto overflow-hidden rounded-xl cursor-pointer group"
            onClick={() => setSelectedProject(projects[0])}
          >
            <Image
              src={projects[0].image_url || '/placeholder-project.jpg'}
              alt={projects[0].title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/800x450?text=Project+Image';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h3 className="font-black text-2xl mb-1">{projects[0].title}</h3>
              <p className="text-white/80">{projects[0].description}</p>
              <span className="mt-2 inline-block text-wood-300">Click to view details →</span>
            </div>
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section className="px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.slice(1).map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div className="relative rounded-xl overflow-hidden shadow-sm bg-gray-50">
                <Image
                  src={project.image_url || 'https://via.placeholder.com/600x400?text=Project+Image'}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/600x400?text=Project+Image';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                  <p className="text-white/80 text-sm">{project.project_type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onBook={handleBookProject}
      />
    </div>
  )
}
