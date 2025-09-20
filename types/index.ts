export type BookingStatus = 'pending' | 'contacted' | 'scheduled' | 'completed';

export interface BookingSubmission {
  id: string;
  status: BookingStatus;
  name: string;
  email: string;
  project_type: string;
  preferred_date: string;
  budget: string;
  message?: string;
  created_at: string;
  phone?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  materials?: string;
  project_type: string;
  client_story?: string;
  created_at: string;
  featured?: boolean;
}

export type ContactStatus = 'new' | 'read' | 'responded';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  status: ContactStatus;
}
