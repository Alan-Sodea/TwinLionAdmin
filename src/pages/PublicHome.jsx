import React from 'react';
import { Hero } from '../components/home/Hero';
import { Services } from '../components/home/Services';
import { Projects } from '../components/home/Projects';
import { Testimonials } from '../components/home/Testimonials';
import { Layout } from '../components/layout/Layout';
import { useHomeData } from '../hooks/useHomeData';

export const PublicHome = () => {
  const { services, projects, testimonials, loading, error } = useHomeData();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Une erreur est survenue</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Hero services={services} />
      <Services services={services} />
      <Projects projects={projects} />
      <Testimonials testimonials={testimonials} />
    </Layout>
  );
};