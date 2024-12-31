import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary dark:bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">
              Twin Lions Enterprise
            </h3>
            <p className="text-gray-300">
              Excellence et innovation dans la construction et l'architecture
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">Contact</h3>
            <div className="space-y-2">
              <a
                href="mailto:contact@twin-lions.com"
                className="flex items-center text-gray-300 hover:text-primary"
              >
                <Mail className="w-5 h-5 mr-2" />
                contact@twin-lions.com
              </a>
              <a
                href="tel:+237000000000"
                className="flex items-center text-gray-300 hover:text-primary"
              >
                <Phone className="w-5 h-5 mr-2" />
                +237 000 000 000
              </a>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-2" />
                Yaoundé, Cameroun
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">
              Horaires d'ouverture
            </h3>
            <p className="text-gray-300">
              Lundi - Vendredi: 8h00 - 18h00
              <br />
              Samedi: 9h00 - 13h00
              <br />
              Dimanche: Fermé
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Twin Lions Enterprise. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};