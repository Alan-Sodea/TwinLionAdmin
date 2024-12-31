import { Layout } from '../components/layout/Layout';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { useGalleryImages } from '../hooks/useGalleryImages';

export const Gallery = () => {
  const { images, loading } = useGalleryImages();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-secondary dark:text-primary mb-12 text-center">
          Galerie de nos réalisations
        </h1>
        <GalleryGrid images={images} />
      </div>
    </Layout>
  );
};