import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Service, Project, Testimonial } from '../../types/supabase';
import { toast } from 'react-hot-toast';

interface AdminItemEditorProps {
  item: Service | Project | Testimonial;
  type: 'services' | 'projects' | 'testimonials';
  onUpdate: () => void;
}

export const AdminItemEditor: React.FC<AdminItemEditorProps> = ({
  item,
  type,
  onUpdate,
}) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(item);

  const handleUpdate = async () => {
    try {
      const { error } = await supabase
        .from(type)
        .update(formData)
        .eq('id', item.id);

      if (error) throw error;
      
      toast.success('Mise à jour réussie');
      setEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="bg-white dark:bg-secondary-light rounded-lg shadow p-6">
      {editing ? (
        <div className="space-y-4">
          {'title' in formData && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Titre
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          )}
          
          {'description' in formData && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          )}

          {'temoignage' in formData && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Témoignage
              </label>
              <textarea
                value={formData.temoignage}
                onChange={(e) =>
                  setFormData({ ...formData, temoignage: e.target.value })
                }
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Image URL
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
            >
              Enregistrer
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {'title' in item && (
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {item.title}
            </h3>
          )}
          
          {'description' in item && (
            <p className="text-gray-500 dark:text-gray-300">{item.description}</p>
          )}

          {'temoignage' in item && (
            <p className="text-gray-500 dark:text-gray-300">{item.temoignage}</p>
          )}

          <img
            src={item.image}
            alt=""
            className="h-48 w-full object-cover rounded-md"
          />

          <div className="flex justify-end">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
            >
              Modifier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};