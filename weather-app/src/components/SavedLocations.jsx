// src/components/SavedLocations.jsx
import React from 'react';
import { Bookmark, MapPin, Trash2 } from 'lucide-react';

const SavedLocations = ({ locations, onLocationClick, onDelete }) => {
  return (
    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-6 rounded-3xl shadow-lg transition-colors duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Bookmark size={20} className="text-accent" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Saved Locations</h3>
      </div>

      {!locations || locations.length === 0 ? (
        <div className="text-center text-slate-500 py-4 text-sm">No saved locations yet.</div>
      ) : (
        <div className="space-y-3 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent pr-2">
          {locations.map((location) => (
            <div
              key={location}
              onClick={() => onLocationClick(location)}
              className="group flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                  <MapPin size={16} className="text-accent" />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{location}</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(location); }}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                title="Delete location"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedLocations;
