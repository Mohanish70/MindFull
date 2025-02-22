import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', darkMode); // Toggling dark mode
  };

  return (
    <nav className={`p-4 shadow-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-600 text-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Mental Health Platform</Link>
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          <Link to="/help" className="hover:text-gray-300">Help</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          <Link to="/privacy" className="hover:text-gray-300">Privacy</Link>
          <Link to="/terms" className="hover:text-gray-300">Terms</Link>
          
          {/* Admin panel link only visible for admin users */}
          {user?.role === 'admin' && (
            <Link to="/admin-panel" className="hover:text-gray-300">Admin</Link>
          )}
          
          {/* Dark mode toggle */}
          <button onClick={toggleDarkMode} className="hover:text-gray-300">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>

          {/* User actions: logout or login */}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{user.email}</span>
              <span className="text-gray-300">{user.role}</span>
              <span className="text-gray-300">{user.name}</span>
              <span className="text-gray-300">{user.phone}</span>
              <span className="text-gray-300">{user.address}</span>
              <span className="text-gray-300">{user.city}</span>
              <span className="text-gray-300">{user.state}</span>
              <span className="text-gray-300">{user.zip}</span>
              <span className="text-gray-300">{user.country}</span>
              <span className="text-gray-300">{user.dob}</span>
              <span className="text-gray-300">{user.gender}</span>
              <span className="text-gray-300">{user.marital}</span>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
