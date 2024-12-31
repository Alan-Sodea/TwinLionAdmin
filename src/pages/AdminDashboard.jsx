import { useEffect } from 'react';
import { Header } from '../components/admin/layout/Header';
import { Sidebar } from '../components/admin/layout/Sidebar';
import { ImageSelector } from '../components/admin/content/ImageSelector';
import { RecordList } from '../components/admin/content/RecordList';
import { ImageList } from '../components/admin/content/ImageList';
import { useHookstate } from '@hookstate/core';
import { actualSection, globalStore, isConnected } from '../stores/adminStore';
import { loadGallery, loadGlobalStore } from '../stores/actionsStore';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {

  const store = useHookstate(globalStore);
  const current = useHookstate(actualSection);
  const connected = useHookstate(isConnected)
  const navigate = useNavigate();

  useEffect(() => {

    if (!connected.get()) navigate("/login")

    loadGlobalStore();
    loadGallery();
  }, [])

  return (
    <>
      {<div className="h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-secondary p-6">
            <div className="max-w-4xl mx-auto space-y-6">

              {
                ((current.get() != "") && (store.length > 0))
                  ? <>
                    {
                      ((current.get() != "gallery") ?
                      <>
                        < ImageSelector /> 
                        <RecordList />
                      </>
                      
                      : 
                      <>
                        <ImageList/>
                      </>
                      )
                      
                    }
                  </>
                  : <></>
              }
            </div>
          </main>
        </div>
      </div>}
    </>
  );
};