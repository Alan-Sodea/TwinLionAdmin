import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';

export const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-secondary/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img
              src="https://twin-lions.com/Logo.jpg"
              alt="Twin Lions"
              className="h-10 w-auto"
            />
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 dark:text-gray-200 hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : ''
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/gallery"
              className={`text-gray-700 dark:text-gray-200 hover:text-primary ${
                location.pathname === '/gallery' ? 'text-primary' : ''
              }`}
            >
              Galerie
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};