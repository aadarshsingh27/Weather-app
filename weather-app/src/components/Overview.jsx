import React from 'react';
import { Sun, Eye, Sunrise, Sunset, Gauge } from 'lucide-react';

const Overview = ({ data }) => {
  if (!data) return null;

  const { current, forecast } = data;
  const today = forecast.daily[0];

  return (
    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-6 rounded-3xl shadow-lg transition-colors duration-300">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Today's Highlights</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Sunrise & Sunset */}
        <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 col-span-2">
          <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider mb-2">Sunrise & Sunset</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Sunrise size={24} className="text-amber-500" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Sunrise</p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {new Date(today.day.sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Sunset size={24} className="text-orange-500" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Sunset</p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {new Date(today.day.sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* UV Index */}
        <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50">
          <div className="flex justify-between items-start mb-2">
            <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">UV Index</p>
            <Sun size={20} className="text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{today.day.uv}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {today.day.uv <= 2 ? 'Low' : today.day.uv <= 5 ? 'Moderate' : today.day.uv <= 7 ? 'High' : 'Very High'}
          </p>
        </div>

        {/* Visibility */}
        <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50">
          <div className="flex justify-between items-start mb-2">
            <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Visibility</p>
            <Eye size={20} className="text-teal-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{current.vis_km} <span className="text-sm font-normal">km</span></p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {current.vis_km >= 10 ? 'Excellent' : current.vis_km >= 5 ? 'Good' : 'Poor'}
          </p>
        </div>

        {/* Pressure */}
        <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 col-span-2">
          <div className="flex justify-between items-start mb-2">
            <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Pressure</p>
            <Gauge size={20} className="text-blue-400" />
          </div>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{current.pressure_mb}</p>
            <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">hPa</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;
