import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Create a function to handle image uploads
export async function uploadImage(file: File) {
  try {
    // Create a unique file name
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    
    // Upload the file to the 'projects' bucket
    const { data, error } = await supabase.storage
      .from('projects')
      .upload(fileName, file)
    
    if (error) throw error
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('projects')
      .getPublicUrl(fileName)
    
    return publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

// Types for our database tables
export interface Project {
  id: string
  title: string
  description: string
  image_url: string
  materials?: string
  project_type: string
  client_story?: string
  created_at: string
  featured?: boolean
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  created_at: string
}

export interface BookingSubmission {
  id: string
  name: string
  email: string
  project_type: string
  preferred_date: string
  budget: string
  message?: string
  created_at: string
  status: 'pending' | 'contacted' | 'scheduled' | 'completed'
}
