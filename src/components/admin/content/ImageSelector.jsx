import { useEffect } from 'react';
import { saveGlobalStore } from '../../../stores/actionsStore';
import { globalStore, presetLayouts, actualSection } from '../../../stores/adminStore';
import { useHookstate } from '@hookstate/core';

export const ImageSelector = () => {
  const store = useHookstate(globalStore);
  const current = useHookstate(actualSection);

  const selectImage = (index: number) => {
    const elementIndex = store.findIndex(el => el.section.get() === current.get());

    const elt = store[elementIndex];
    elt.layout.set(index);

    saveGlobalStore();

  }

  // useEffect(() => {
  //   console.log({ elt: store[store.findIndex(el => el.section.get() === current.get())].layout })
  //   console.log({ elt2: current.get() })
  // }, []);

  return (
    <div className="grid grid-cols-3 gap-8 mb-12">
      {store[store.findIndex(el => el.section.get() === current.get())].layout && presetLayouts.map((image, index) => (
        <button
          key={index}
          onClick={() => selectImage(index)}
          className={`relative aspect-square rounded-lg transition-all overflow-hidden border-2 ${store[store.findIndex(el => el.section.get() === current.get())].layout.get() === index
            ? 'border-primary scale-75'
            : 'border-white hover:border-primary/50'
            }`}
        >
          <img
            src={image}
            alt={"Layout"}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
};