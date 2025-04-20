import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming the useAuth hook is set up in context to manage user authentication

const Navbar = () => {
  const { user, logout } = useAuth();  // Accessing user and logout from AuthContext
  const [darkMode, setDarkMode] = useState(false);  // State to toggle dark mode

  // Toggle function for dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode); // Toggle dark class to the body tag
  };

  return (
    <nav className={`p-4 shadow-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-600 text-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Mental Health Platform</Link>  {/* Logo or platform name */}
        
        <div className="flex items-center space-x-4">
          {/* Navigation Links */}
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
              {/* Displaying user details */}
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

              {/* Logout button */}
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
