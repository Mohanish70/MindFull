// src/components/DarkModeToggle.js
import React, { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext'; // Ensure this path is correct

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext); // DarkModeContext should be set up properly

  return (
    <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
