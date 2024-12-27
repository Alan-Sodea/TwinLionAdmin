import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Service, Project, Testimonial } from '../../types/supabase';
import { toast } from 'react-hot-toast';
import { AdminItemEditor } from './AdminItemEditor';

interface AdminSectionEditorProps {
  sectionId: string;
  onUpdate: () => void;
}

export const AdminSectionEditor: React.FC<AdminSectionEditorProps> = ({
  sectionId,
  onUpdate,
}) => {
  const [items, setItems] = useState<(Service | Project | Testimonial)[]>([]);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState<any>(null);

  useEffect(() => {
    fetchSection();
  }, [sectionId]);

  const fetchSection = async () => {
    try {
      setLoading(true);
      const { data: sectionData, error: sectionError } = await supabase
        .from('sections')
        .select('*')
        .eq('id', sectionId)
        .single();

      if (sectionError) throw sectionError;
      if (sectionData) {
        setSection(sectionData);
        const { data: itemsData, error: itemsError } = await supabase
          .from(sectionData.type)
          .select('*')
          .order('sort_order');

        if (itemsError) throw itemsError;
        if (itemsData) setItems(itemsData);
      }
    } catch (error) {
      console.error('Error fetching section:', error);
      toast.error('Erreur lors du chargement de la section');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrder = async (newOrder: (Service | Project | Testimonial)[]) => {
    try {
      const updates = newOrder.map((item, index) => ({
        id: item.id,
        sort_order: index,
      }));

      const { error } = await supabase
        .from(section.type)
        .upsert(updates);

      if (error) throw error;
      
      setItems(newOrder);
      toast.success('Ordre mis à jour');
      onUpdate();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Erreur lors de la mise à jour de l\'ordre');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {section?.title}
        </h2>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <AdminItemEditor
            key={item.id}
            item={item}
            type={section.type}
            onUpdate={fetchSection}
          />
        ))}
      </div>
    </div>
  );
};