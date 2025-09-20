export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  project_type: string;
  category?: string;
  client_name?: string;
  completion_date?: string;
  additional_images?: string[];
}

export type ProjectWithoutDates = Omit<Project, 'created_at' | 'updated_at'>;

export interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}
