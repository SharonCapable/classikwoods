interface AuthState {
  id: string | null
  email: string | null
  role: string | null
}

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  project_type: string
  created_at: string
  materials?: string
  client_story?: string
}

type BookingStatus = 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled'

interface BookingSubmission {
  id: string
  name: string
  email: string
  phone?: string
  project_type: string
  preferred_date: string
  scheduled_date?: string
  budget: string
  message: string
  status: BookingStatus
  created_at: string
  updated_at?: string
}

export type { AuthState, Project, BookingSubmission, BookingStatus }
