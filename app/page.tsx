import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

async function getProjects() {
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  return projects || [];
}

export default async function HomePage() {
  const projects = await getProjects();
  const featuredProject = projects[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Nav */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="font-black text-2xl tracking-tight">CLASSIK WOODS</div>
        <nav className="flex-1 flex justify-center gap-8 text-lg font-semibold">
          <a href="/" className="text-black">Home</a>
          <a href="/about" className="text-gray-400 hover:text-black">About</a>
          <a href="/contact" className="text-gray-400 hover:text-black">Contact</a>
        </nav>
        <div className="text-gray-400 text-xl font-semibold">Interior Furniture Design</div>
      </header>

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
      {featuredProject && (
        <section className="px-8 mb-16">
          <div className="relative aspect-[16/9] max-w-6xl mx-auto overflow-hidden rounded-xl">
            <Image
              src={featuredProject.image_url}
              alt={featuredProject.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded-lg px-4 py-2 flex items-center justify-between shadow">
              <span className="font-black text-lg text-gray-900">{featuredProject.title}</span>
              <span className="text-gray-400 text-base font-medium">{featuredProject.project_type}</span>
            </div>
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section className="px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.slice(1).map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <div className="relative rounded-xl overflow-hidden shadow-sm bg-gray-50">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-64"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded-lg px-4 py-2 flex items-center justify-between shadow">
                  <span className="font-black text-lg text-gray-900">{project.title}</span>
                  <span className="text-gray-400 text-base font-medium">{project.project_type}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
