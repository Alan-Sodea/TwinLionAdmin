// Generated types from Supabase
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  temoignage: string;
  image: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Section {
  id: string;
  title: string;
  type: 'services' | 'projects' | 'testimonials';
  sort_order: number;
  created_at: string;
  updated_at: string;
}