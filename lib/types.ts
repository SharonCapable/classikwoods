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
}

export type { AuthState, Project }
