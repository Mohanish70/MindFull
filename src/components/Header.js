import React from 'react';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { user, logout } = useAppContext();

  return (
    <header className="fixed top-0 w-full z-50 bg-indigo-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">MindWell</h1>
        
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">{user.email}</span>
            <button 
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;