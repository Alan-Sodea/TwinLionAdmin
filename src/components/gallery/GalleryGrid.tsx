import React, { useState } from 'react';
import { GalleryImage } from '../../types/gallery';
import { GalleryModal } from './GalleryModal';

interface GalleryGridProps {
  images: GalleryImage[];
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className="relative group overflow-hidden rounded-lg aspect-square"
          >
            <img
              src={image.url}
              alt={image.title}
              className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {selectedImage && (
        <GalleryModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};