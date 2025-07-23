import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle dark mode and persist in localStorage
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', newMode);
  };

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.body.classList.toggle('dark', savedMode);
  }, []);

  // Navigation items
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/profile', label: 'Profile' },
    { path: '/help', label: 'Help' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/privacy', label: 'Privacy' },
    { path: '/terms', label: 'Terms' },
  ];

  // Admin-only items
  const adminItems = user?.role === 'admin' 
    ? [{ path: '/admin-panel', label: 'Admin' }] 
    : [];

  return React.createElement(
    'nav',
    {
      className: `p-4 shadow-md transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-blue-600 text-white'
      }`
    },
    React.createElement(
      'div',
      { className: 'container mx-auto flex justify-between items-center' },
      // Logo
      React.createElement(
        Link,
        { to: '/', className: 'text-xl font-bold hover:text-gray-300' },
        'MindWell'
      ),
      
      // Mobile menu button
      React.createElement(
        'button',
        {
          className: 'md:hidden p-2 focus:outline-none',
          onClick: () => setMobileMenuOpen(!mobileMenuOpen)
        },
        mobileMenuOpen ? '✕' : '☰'
      ),
      
      // Navigation links (desktop)
      React.createElement(
        'div',
        { className: 'hidden md:flex items-center space-x-4' },
        ...navItems.map(item => 
          React.createElement(
            Link,
            {
              key: item.path,
              to: item.path,
              className: 'hover:text-gray-300 px-2 py-1 rounded transition'
            },
            item.label
          )
        ),
        ...adminItems.map(item =>
          React.createElement(
            Link,
            {
              key: item.path,
              to: item.path,
              className: 'hover:text-gray-300 px-2 py-1 rounded transition'
            },
            item.label
          )
        ),
        // Dark mode toggle
        React.createElement(
          'button',
          {
            onClick: toggleDarkMode,
            className: 'hover:text-gray-300 px-2 py-1 rounded transition',
            'aria-label': darkMode ? 'Switch to light mode' : 'Switch to dark mode'
          },
          darkMode ? '☀️ Light' : '🌙 Dark'
        ),
        // User section
        user 
          ? [
              React.createElement(
                'span',
                { 
                  key: 'user-email',
                  className: 'text-gray-300 px-2 py-1',
                  title: user.email
                },
                user.email.split('@')[0] // Show only username part
              ),
              React.createElement(
                'button',
                {
                  key: 'logout',
                  onClick: logout,
                  className: 'bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition',
                },
                'Logout'
              )
            ]
          : React.createElement(
              Link,
              {
                key: 'login',
                to: '/login',
                className: 'hover:text-gray-300 px-4 py-2 rounded transition'
              },
              'Login'
            )
      ),
      
      // Mobile menu
      mobileMenuOpen && React.createElement(
        'div',
        { className: 'md:hidden absolute top-16 left-0 right-0 bg-gray-800 z-50 p-4' },
        ...navItems.map(item =>
          React.createElement(
            Link,
            {
              key: `mobile-${item.path}`,
              to: item.path,
              className: 'block py-2 px-4 hover:bg-gray-700 rounded',
              onClick: () => setMobileMenuOpen(false)
            },
            item.label
          )
        ),
        ...adminItems.map(item =>
          React.createElement(
            Link,
            {
              key: `mobile-admin-${item.path}`,
              to: item.path,
              className: 'block py-2 px-4 hover:bg-gray-700 rounded',
              onClick: () => setMobileMenuOpen(false)
            },
            item.label
          )
        ),
        React.createElement(
          'button',
          {
            onClick: toggleDarkMode,
            className: 'block w-full text-left py-2 px-4 hover:bg-gray-700 rounded'
          },
          darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'
        ),
        user
          ? React.createElement(
              'button',
              {
                onClick: logout,
                className: 'block w-full text-left py-2 px-4 hover:bg-gray-700 rounded text-red-400'
              },
              'Logout'
            )
          : React.createElement(
              Link,
              {
                to: '/login',
                className: 'block py-2 px-4 hover:bg-gray-700 rounded',
                onClick: () => setMobileMenuOpen(false)
              },
              'Login'
            )
      )
    )
  );
};

export default Navbar;