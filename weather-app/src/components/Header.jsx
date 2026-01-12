// src/components/Header.jsx
import React, { useState } from 'react';
import { Search, Save, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = ({ onSearch, onSaveLocation }) => {
  const [location, setLocation] = useState('');
  const { theme, toggleTheme } = useTheme();

  const handleSearch = () => {
    if (location.trim()) {
      onSearch(location);
      setLocation('');
    }
  };

  const handleSaveLocation = () => {
    if (onSaveLocation) {
      onSaveLocation();
    }
  };

  return (
    <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-4 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg sticky top-4 z-50 transition-colors duration-300">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-md">
          <span className="text-white dark:text-slate-900 font-bold">S</span>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-400 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">SkyCast</h1>
      </div>

      <div className="flex w-full md:w-auto gap-2">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search city..."
          className="flex-1 md:w-64 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-accent hover:bg-sky-500 text-white dark:text-slate-900 font-semibold px-4 py-2 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <Search size={20} />
        </button>
        <button
          onClick={handleSaveLocation}
          className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-white px-4 py-2 rounded-xl transition-colors duration-200 shadow-sm"
          title="Save current location"
        >
          <Save size={20} />
        </button>
        <button
          onClick={toggleTheme}
          className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-white p-2 rounded-xl transition-colors duration-200 shadow-sm"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
