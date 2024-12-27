import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Testimonial } from '../types/supabase';

export const Testimonials = ({ testimonials }) => {
  return (
    <section className="py-20 bg-white dark:bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-secondary dark:text-primary text-center mb-16">
          Témoignages
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, index }) => {
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
      className="bg-gray-50 dark:bg-secondary-light rounded-lg p-6 shadow-lg"
    >
      <div className="flex items-center mb-4">
        <img
          src={testimonial.image}
          alt="Client"
          className="w-12 h-12 rounded-full object-cover mr-4"
          loading="lazy"
        />
      </div>
      <p className="text-gray-600 dark:text-gray-300 italic">
        "{testimonial.temoignage}"
      </p>
    </motion.div>
  );
};