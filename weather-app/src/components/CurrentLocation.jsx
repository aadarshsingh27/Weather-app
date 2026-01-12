import React from 'react';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

const CurrentLocation = ({ data }) => {
  if (!data) return null;

  const { location, current } = data;

  if (!location || !current) return null;

  return (
    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-6 rounded-3xl shadow-xl transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{location.name}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{location.region}, {location.country}</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{new Date(location.localtime).toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-slate-500 dark:from-white dark:to-slate-400">{current.temp_c}°</p>
            <p className="text-accent font-medium">{current.condition.text}</p>
          </div>
          {current.condition.icon && (
            <img src={current.condition.icon} alt={current.condition.text} className="w-16 h-16 object-contain" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
          <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-xl text-accent">
            <Droplets size={20} />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Humidity</p>
            <p className="font-semibold text-slate-900 dark:text-white">{current.humidity}%</p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
          <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-xl text-accent">
            <Wind size={20} />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Wind</p>
            <p className="font-semibold text-slate-900 dark:text-white">{current.wind_kph} km/h</p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
          <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-xl text-accent">
            <Thermometer size={20} />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Feels Like</p>
            <p className="font-semibold text-slate-900 dark:text-white">{current.feelslike_c}°</p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
          <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-xl text-accent">
            <Cloud size={20} />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Cloud</p>
            <p className="font-semibold text-slate-900 dark:text-white">{current.cloud}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentLocation;
