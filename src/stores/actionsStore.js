import { supabase } from "../lib/supabase";
import { globalStore } from "./adminStore"
import { useHookstate } from "@hookstate/core";


export const saveGlobalStore = async (filename = 'global-store.json') => {

    const jsonString = JSON.stringify(JSON.parse(JSON.stringify(globalStore.value))) // Récupérer le state actuel
    const blob = new Blob([jsonString], { type: 'application/json' });
    console.log('Début de la sauvegarde du state...');

    // Sauvegarder dans la table `global_states`
    const { data, error } = await supabase.storage
        .from('state')
        .upload(filename, blob, { contentType: 'application/json', upsert: true });

    if (error) {
        console.error('Erreur lors de la sauvegarde :', error.message);
        return false;
    }

    console.log('GlobalStore sauvegardé avec succès :', data);
    return true;
};


export const loadGlobalStore = async (filename = 'global-store.json') => {

    try {
        console.log('Début de la sauvegarde du state...');
        // Charger le dernier state sauvegardé (par exemple, le plus récent)
        // Télécharger le fichier JSON depuis le bucket 'state'
        const { data: file, error } = await supabase.storage
            .from('state')
            .download(filename);

        if (error) {
            console.error('Erreur lors du chargement :', error.message);
            return false;
        }

        if (file instanceof Blob) {
            // Lire le contenu du Blob en texte
            const text = await file.text();

            // Analyser le texte comme du JSON
            const loadedStore = JSON.parse(text);

            // Mettre à jour le globalStore avec les données téléchargées
            globalStore.set(loadedStore);

            console.log('GlobalStore chargé avec succès :', loadedStore);
            return true;
        } else {
            console.error('Le fichier téléchargé n\'est pas un Blob');
            return false;
        }

    } catch (error) {
        console.error('Erreur :', error);
        return false;
    }
};

