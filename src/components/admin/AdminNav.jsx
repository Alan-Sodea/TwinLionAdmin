import React from 'react';
import { supabase } from '../../lib/supabase';
import { toast } from 'react-hot-toast';

export const AdminNav = () => {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.rpc('revoke_admin_access');
      if (error) throw error;
      window.location.href = '/admin/login';
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return (
    <nav className="bg-white dark:bg-secondary-light shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="https://twin-lions.com/Logo.jpg"
                alt="Twin Lions"
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <span className="border-primary text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Administration
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};