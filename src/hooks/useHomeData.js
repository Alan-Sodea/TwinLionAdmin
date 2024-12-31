import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Service, Project, Testimonial } from '../types/supabase';

export const useHomeData = () => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: servicesData, error: servicesError },
          { data: projectsData, error: projectsError },
          { data: testimonialsData, error: testimonialsError }
        ] = await Promise.all([
          supabase.from('services').select('*').order('sort_order'),
          supabase.from('projects').select('*').order('sort_order'),
          supabase.from('testimonials').select('*').order('sort_order')
        ]);

        if (servicesError) throw servicesError;
        if (projectsError) throw projectsError;
        if (testimonialsError) throw testimonialsError;

        setServices(servicesData || []);
        setProjects(projectsData || []);
        setTestimonials(testimonialsData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { services, projects, testimonials, loading, error };
};