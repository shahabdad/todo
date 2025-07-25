import React from 'react';
import { useTheme } from './context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current Theme: {theme}</p>
      <button 
        className='bg-black text-white px-4 py-2 rounded' 
        onClick={toggleTheme}
      >
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </div>
  );
};

export default ThemeToggle;
