import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Service } from '../types/supabase';



export const Services= ({ services }) => {
  return (
    <section className="py-20 bg-white dark:bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-secondary dark:text-primary text-center mb-16">
          Nos Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard= ({ service, index }) => {
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
      className="bg-white dark:bg-secondary-light rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={service.image}
          alt={service.title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-secondary dark:text-primary mb-4">
          {service.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};