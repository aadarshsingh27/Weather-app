import React from 'react';
import { Clock } from 'lucide-react';

const HourlyForecast = ({ data }) => {
  if (!data || !data.length) return null;

  return (
    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-6 rounded-3xl shadow-lg transition-colors duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={20} className="text-accent" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Hourly Forecast</h3>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {data.map((hour, index) => (
          <div key={index} className="min-w-[100px] bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 flex flex-col items-center gap-2 flex-shrink-0">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {hour.condition.icon && (
              <img src={hour.condition.icon} alt={hour.condition.text} className="w-10 h-10 object-contain" />
            )}
            <span className="font-bold text-slate-900 dark:text-white">{Math.round(hour.temp_c)}°</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 text-center truncate w-full">{hour.condition.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
