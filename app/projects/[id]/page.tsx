import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

async function getProject(id: string) {
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()
  
  if (!project) notFound()
  return project
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id)

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Nav */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="font-black text-2xl tracking-tight">CLASSIC WOODS</div>
        <nav className="flex-1 flex justify-center gap-8 text-lg font-semibold">
          <Link href="/" className="text-black">Home</Link>
          <Link href="/about" className="text-gray-400 hover:text-black">About</Link>
          <Link href="/contact" className="text-gray-400 hover:text-black">Contact</Link>
        </nav>
        <div className="text-gray-400 text-xl font-semibold">Interior Furniture Design</div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="text-4xl font-black mb-4">{project.title}</h1>
            <div className="mb-6">
              <span className="text-gray-400 text-lg">{project.project_type}</span>
            </div>
            <p className="text-lg text-gray-600 whitespace-pre-wrap">
              {project.description}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
