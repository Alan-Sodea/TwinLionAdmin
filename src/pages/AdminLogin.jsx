import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isConnected, ThePassword } from '../stores/adminStore';
import { useHookstate } from '@hookstate/core';
import toast from 'react-hot-toast';

export const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const connected = useHookstate(isConnected)
  const thePassword = useHookstate(ThePassword)


  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-24 w-auto"
            src="https://twin-lions.com/Logo.jpg"
            alt="Twin Lions"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            Administration Twin Lions
          </h2>
        </div>


        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                onChange={(evt) => { evt.preventDefault(); setPassword(evt.target.value) }}
                id="email"
                name="email"
                type="text"
                value={password}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-secondary-light focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                if (password == thePassword.get()) {
                  connected.set(true);
                  navigate("/admin");
                }
                else {
                  toast.error("Invalid password")
                }
              }}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Connectez-Vous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
