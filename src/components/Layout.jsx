import React from 'react';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-secondary transition-colors duration-200">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-secondary/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img
            src="https://twin-lions.com/Logo.jpg"
            alt="Twin Lions Enterprise"
            className="h-12"
          />
          <ThemeToggle />
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};