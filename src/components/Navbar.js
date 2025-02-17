import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Mental Health Platform</Link>
        <div className="flex space-x-4">
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          {user?.role === "admin" && (
            <Link to="/admin-panel" className="hover:text-gray-300">Admin</Link>
          )}
          {user ? (
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
