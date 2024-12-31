<<<<<<< HEAD
import { saveGallery, saveGlobalStore } from '../../../stores/actionsStore';
=======
import { saveGlobalStore } from '../../../stores/actionsStore';
>>>>>>> c143956da62df84ebaf8b2c3f86b0f83528dba1f
import toast from 'react-hot-toast';

export const Header = () => {

  return (
    <header className="bg-secondary-light border-b border-gray-700">
      <div className="h-16 px-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">
          Administration
        </h1>

        <button
          className="p-2 px-4 font-bold hover:shadow-white shadow-sm rounded-md bg-green-500 text-black"
          aria-label="Toggle theme"
          onClick={async () => {

            try {
              await saveGlobalStore();
<<<<<<< HEAD
              await saveGallery();
=======
>>>>>>> c143956da62df84ebaf8b2c3f86b0f83528dba1f
              toast.success("Données sauvegardées.");
            } catch (error) {
              toast.error("Erreur lors de la sauvegarde des données.")
            }

          }}
        >
          Sauvegarder
        </button>
      </div>
    </header>
  );
};