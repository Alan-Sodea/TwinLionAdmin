import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { GalleryImage } from '../types/gallery';

export const useGalleryImages = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('sort_order');

        if (error) throw error;
        if (data) setImages(data);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { images, loading };
};