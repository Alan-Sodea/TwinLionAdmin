import { Plus, ArrowUp, ArrowDown, Pen, Trash } from 'lucide-react';
import { globalStore, actualSection } from '../../../stores/adminStore';
import { none, useHookstate } from '@hookstate/core';
import { useEffect, useState } from 'react';
import { saveGlobalStore } from '../../../stores/actionsStore';

export const Sidebar = () => {

  const store = useHookstate(globalStore);


  const [action, setAction] = useState("none");

  const [showDialog, setShowDialog] = useState(false);

  const [isInput, setIsInput] = useState(true);

  const [theInput, setTheInput] = useState("");

  const current = useHookstate(actualSection);

  /* FUNCTIONS */

  const addSidebarItem1 = () => {

    store[store.length].set(
      {
        section: "Section " + (store.length + 1),
        layout: -1,
        records: [
          // {
          //   title: "",
          //   text: "",
          //   image: "",
          // }
        ]
      }
    )
  }

  const modifySidebarItem1 = async (section, title) => {

    const elementIndex = store.findIndex(el => el.section.get() === section);
    // console.log('qsd');

    if (elementIndex !== -1) {
      store[elementIndex].section.set(title);
    } else {
      return ({ error: `Element with section "${section}" not found.` });
    }

    await saveGlobalStore();
  }


  const deleteSidebarItem1 = (section) => {
    const elementIndex = store.findIndex(el => el.section.get() === section);

    if (elementIndex === -1) {
      console.log({ error: `Element with section "${section}" not found.` });
      return;
    }

    // Supprimer l'élément en utilisant splice
    store[elementIndex].set(none)
    saveGlobalStore();
  }

  const goUpSidebarItem = (section) => {
    // Trouver l'index de l'élément avec la section donnée
    const elementIndex = store.findIndex(el => el.section.get() === section);

    if (elementIndex === -1) {
      console.warn(`Element with section "${section}" not found.`);
      return;
    }

    // Déterminer l'index avec lequel permuter
    const swapIndex = elementIndex === 0 ? store.length - 1 : elementIndex - 1;

    // Effectuer l'échange des valeurs de section
    const tempSection = store[swapIndex].section.get();
    store[swapIndex].section.set(store[elementIndex].section.get());
    store[elementIndex].section.set(tempSection);

    const templayout = store[swapIndex].layout.get();
    store[swapIndex].layout.set(store[elementIndex].layout.get());
    store[elementIndex].layout.set(templayout);

    const temprecords = [];
    let title = "";
    let text = "";
    let image = "";

    for (let i = 0; i < store[swapIndex].records.get().length; i++) {
      title = store[swapIndex].records[i].title.get()
      text = store[swapIndex].records[i].text.get()
      image = store[swapIndex].records[i].image.get()
      temprecords.push({title, text, image});
    }


    const move1 = [];
    for (let i = 0; i < store[elementIndex].records.get().length; i++) {
      title = store[elementIndex].records[i].title.get()
      text = store[elementIndex].records[i].text.get()
      image = store[elementIndex].records[i].image.get()
      move1.push({title, text, image});
    }
    store[swapIndex].records.set(move1);
    
    store[elementIndex].records.set(temprecords);
    
    saveGlobalStore();

  }

  const goDownSidebarItem = (section) => {
    const elementIndex = store.findIndex(el => el.section.get() === section);

    if (elementIndex === -1) {
      console.warn(`Element with section "${section}" not found.`);
      return;
    }

    // Déterminer l'index avec lequel permuter
    const swapIndex = elementIndex === store.length - 1 ? 0 : elementIndex + 1;

    // Effectuer l'échange des valeurs de section
    const tempSection = store[swapIndex].section.get();
    store[swapIndex].section.set(store[elementIndex].section.get());
    store[elementIndex].section.set(tempSection);

    const templayout = store[swapIndex].layout.get();
    store[swapIndex].layout.set(store[elementIndex].layout.get());
    store[elementIndex].layout.set(templayout);

    const temprecords = [];
    let title = "";
    let text = "";
    let image = "";

    for (let i = 0; i < store[swapIndex].records.get().length; i++) {
      title = store[swapIndex].records[i].title.get()
      text = store[swapIndex].records[i].text.get()
      image = store[swapIndex].records[i].image.get()
      temprecords.push({title, text, image});
    }


    const move1 = [];
    for (let i = 0; i < store[elementIndex].records.get().length; i++) {
      title = store[elementIndex].records[i].title.get()
      text = store[elementIndex].records[i].text.get()
      image = store[elementIndex].records[i].image.get()
      move1.push({title, text, image});
    }
    store[swapIndex].records.set(move1);
    
    store[elementIndex].records.set(temprecords);

    saveGlobalStore();

  }

  return (
    <div className="w-72 bg-secondary-light h-screen p-4 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-white">Navigation</h2>
        <button
          onClick={() => addSidebarItem1()}
          className="p-1.5 text-primary hover:bg-secondary rounded-full"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div onClick={() => { current.set("gallery"); }} className={"flex justify-between items-center p-3 my-1 rounded-lg cursor-pointer transition-colors hover:bg-primary/10 " + String(("gallery" == current.get()) ? "bg-primary/20" : "bg-secondary")}>
        <span className="text-gray-200">
          Gallery
        </span> 
      </div>
      {store.map((item, index) => (
        <div onClick={() => { current.set(item.section.get()); }} key={index} className={"flex justify-between items-center p-3 my-1 rounded-lg cursor-pointer transition-colors hover:bg-primary/10 " + String((item.section.get() == current.get()) ? "bg-primary/20" : "bg-secondary")}>

          <span className="text-gray-200">
            {item.section.get()}
          </span>

          <div className='flex justify-center gap-0.5'>
            <button
              onClick={() => goUpSidebarItem(item.section.get())}
              className="p-1.5 text-primary hover:bg-secondary rounded-full"
            >
              <ArrowUp className="w-5 h-5" />
            </button>

            <button
              onClick={() => goDownSidebarItem(item.section.get())}
              className="p-1.5 text-primary hover:bg-secondary rounded-full"
            >
              <ArrowDown className="w-5 h-5" />
            </button>

            <button
              onClick={() => { setAction("change name-" + item.section.get()); setIsInput(true); setShowDialog(true) }}
              className="p-1.5 text-primary hover:bg-secondary rounded-full"
            >
              <Pen className="w-5 h-5" />
            </button>

            <button
              onClick={() => deleteSidebarItem1(item.section.get())}
              className="p-1.5 text-primary hover:bg-secondary rounded-full"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))
      }

      <div className={'flex justify-center items-center absolute w-screen h-screen top-0 left-0 ' + String(!showDialog && " hidden")} style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <div className='bg-gray-300 gap-3 w-80 py-4 rounded-md  px-4 flex items-center flex-col'>
          <div className='text-xl font-serif'>{"Enter the new section's title"}</div>
          <input type='text' className={'h-9 w-full px-2 ' + + String(!(showDialog && isInput) && " hidden")} onChange={(evt) => { evt.preventDefault(); setTheInput(evt.target.value); }} value={theInput}></input>
          <div className='flex w-full justify-between gap-4'>
            <button type='button' className='h-9 w-full bg-red-600 hover:bg-red-900 font-bold font-sans text-white rounded-md' onClick={() => { setAction(""); setTheInput(""); setShowDialog(false) }}>No</button>
            <button type='button' className='h-9 w-full bg-green-600 hover:bg-green-900 font-bold font-sans text-white rounded-md' onClick={() => { if (action.split("-")[0] == "change name") { if (theInput != "") { modifySidebarItem1(action.split("-")[1], theInput); setAction(""); setTheInput(""); setShowDialog(false); } } }}>Yes</button>
          </div>
        </div>
      </div>

    </div >
  );
};
