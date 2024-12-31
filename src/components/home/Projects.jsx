import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Project } from '../../types/supabase';


export const Projects= ({ projects }) => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-secondary-light">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-secondary dark:text-primary text-center mb-16">
          Nos Projets
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard= ({ project, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-secondary rounded-lg shadow-lg overflow-hidden"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-secondary dark:text-primary mb-4">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};