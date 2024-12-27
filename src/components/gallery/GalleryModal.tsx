import React from 'react';
import { X } from 'lucide-react';
import { GalleryImage } from '../../types/gallery';

interface GalleryModalProps {
  image: GalleryImage;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="relative max-w-4xl w-full bg-white dark:bg-secondary-light rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-6">
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-auto rounded-lg"
          />
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {image.title}
            </h3>
            {image.description && (
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {image.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};