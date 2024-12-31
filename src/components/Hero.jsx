import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Service } from '../types/supabase';

export const Hero = ({ services }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-secondary-light to-secondary dark:from-secondary dark:to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-32 flex flex-col items-center justify-center min-h-screen">
        <motion.img
          src="https://twin-lions.com/Logo.jpg"
          alt="Twin Lions Enterprise"
          className="w-48 h-48 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />
        
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-primary text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Twin Lions Enterprise
        </motion.h1>
        
        <motion.p
          className="text-xl text-white text-center mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Excellence et innovation dans la construction et l'architecture
        </motion.p>

        <div ref={ref} className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <div className="overflow-hidden h-32">
            <motion.div
              animate={{
                y: inView ? [-320, 0] : 0,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="space-y-4"
            >
              {[...services, ...services].map((service, index) => (
                <div key={index} className="p-4 border-b border-primary/20 last:border-0">
                  <h3 className="text-primary font-semibold">{service.title}</h3>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};