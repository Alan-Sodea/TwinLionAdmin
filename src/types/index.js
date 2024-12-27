export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

export interface Testimonial {
  id: string;
  temoignage: string;
  image: string;
  order: number;
}

export interface Section {
  id: string;
  title: string;
  type: 'services' | 'projects' | 'testimonials';
  items: (Service | Project | Testimonial)[];
  order: number;
}