import React from 'react';
import { Calendar } from 'lucide-react';

const DailyForecast = ({ data }) => {
  if (!data || !data.length) return null;

  return (
    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-6 rounded-3xl shadow-lg transition-colors duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={20} className="text-accent" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">7-Day Forecast</h3>
      </div>

      <div className="space-y-3">
        {data.map((day, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/30 transition-colors cursor-default group">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 w-24">
              {new Date(day.date).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>

            <div className="flex items-center gap-2 flex-1 justify-center">
              {day.day.condition.icon && (
                <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-8 h-8 object-contain" />
              )}
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">{day.day.condition.text}</span>
            </div>

            <div className="flex items-center gap-4 w-24 justify-end">
              <span className="text-slate-900 dark:text-white font-bold">{Math.round(day.day.maxtemp_c)}°</span>
              <span className="text-slate-500 dark:text-slate-500 text-sm">{Math.round(day.day.mintemp_c)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
