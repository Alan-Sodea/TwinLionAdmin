import React, { useEffect } from 'react';
import { Trash2, Upload } from 'lucide-react';
import { actualSection, globalStore } from '../../../stores/adminStore';
import { supabase } from '../../../lib/supabase';
import { toast } from 'react-hot-toast';
import { none, useHookstate } from '@hookstate/core';
import { saveGlobalStore } from '../../../stores/actionsStore';

export const RecordList = () => {

  const store = useHookstate(globalStore);
  const current = useHookstate(actualSection);

  useEffect(() => {
    // cosnt
    console.log({ elt2: store[0].records[0].image.get() })
  }, [])


  const deleteRecord = (recordIndex) => {
    const elementIndex = store.findIndex(el => el.section.get() === current.get());

    if (elementIndex === -1) {
      console.log({ error: `Element with section "${current.get()}" not found.` });
      return;
    }
    // Vérifier si l'index du record est valide
    const records = store[elementIndex].records;

    console.log({ elt: records.get() })

    if (recordIndex < 0 || recordIndex >= records.length) {
      console.log({ error: `Record index "${recordIndex}" is out of bounds.` });
      return;
    }

    records[recordIndex].set(none);

    // Supprimer l'objet du tableau records
    // records.splice(recordIndex, 1);
    saveGlobalStore();

  }

  const addRecord = () => {
    const elementIndex = store.findIndex(el => el.section.get() === current.get());

    if (elementIndex === -1) {
      console.log({ error: `Element with section "${current.get()}" not found.` });
      return;
    }
    // Vérifier si l'index du record est valide
    const records = store[elementIndex].records;

    records[records.length].set({
      title: "",
      image: "",
      text: "",
    });

    // Supprimer l'objet du tableau records
    // records.splice(recordIndex, 1);
    saveGlobalStore();
  }

  const uploadImage = async (file: File): Promise<string> => {
    try {

      // Générer un nom unique pour l'image
      const fileName = `${Date.now()}_${file.name}`;

      // Uploader l'image dans le bucket Supabase
      const { data, error } = await supabase.storage
        .from('images') // Remplacez par le nom de votre bucket
        .upload(fileName, file);

      if (error) {
        console.error('Erreur lors de l\'upload :', error.message);
        toast.error('Erreur lors de l\'upload');
        return 'error';
      }

      const elt = await supabase.storage
        .from('images') // Remplacez par le nom de votre bucket
        .getPublicUrl(data.path);
      toast.success('Image uploadée avec succès !');

      return elt.data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
      throw error;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, recordId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      store[store.findIndex(el => el.section.get() === current.get())].records[recordId].image.set(imageUrl);
      console.log({ image: store[store.findIndex(el => el.section.get() === current.get())].records[recordId].image.get() })
      saveGlobalStore();
      return imageUrl;
    } catch (error) {
      console.error('Error handling image upload:', error);
      toast.error('Failed to upload image');
    }

  };

  useEffect(() => {

    console.log({ elt: store[store.findIndex(el => el.section.get() === current.get())].records })
  })

  return (
    <div className="bg-secondary-light rounded-lg shadow">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Records</h3>
        <button
          onClick={() => addRecord()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Add Record
        </button>
      </div>

      <div className="divide-gray-700">
        {store[store.findIndex(el => el.section.get() === current.get())].records &&
          store[store.findIndex(el => el.section.get() === current.get())].records.map((record, index) => (
            <div key={index} className="p-4 flex items-center space-x-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <img
                  src={record.image.get()}
                  className="w-full h-full object-cover rounded-lg"
                />
                <label className="absolute bottom-0 right-0 p-1 bg-secondary rounded-full shadow cursor-pointer">
                  <Upload className="w-4 h-4 text-primary" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                  />
                </label>
              </div>

              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={record.title.get()}
                  onChange={(e) => { e.preventDefault(); record.title.set(e.target.value) }}
                  className="w-full bg-transparent border-0 focus:ring-0 p-0 text-white placeholder-gray-500"
                  placeholder="Title..."
                />
                <input
                  type="text"
                  value={record.text.get()}
                  onChange={(e) => { e.preventDefault(); record.text.set(e.target.value) }}
                  className="w-full bg-transparent border-0 focus:ring-0 p-0 text-white placeholder-gray-500"
                  placeholder="Enter text..."
                />
              </div>

              <div className="flex items-center space-x-2">

                <button
                  onClick={() => deleteRecord(index)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};