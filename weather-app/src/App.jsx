import React, { useState, useEffect } from 'react';
import { getCoordinates, getWeather } from './services/weatherService';
import Header from './components/Header';
import CurrentLocation from './components/CurrentLocation';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import Overview from './components/Overview';
import SavedLocations from './components/SavedLocations';
import { ThemeProvider } from './context/ThemeContext';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentLocation, setRecentLocation] = useLocalStorage('recentLocation', 'London');
  const [savedLocations, setSavedLocations] = useLocalStorage('savedLocations', []);

  const fetchData = async (location) => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Geocoding
      const coords = await getCoordinates(location);
      const { name, latitude, longitude, country, admin1 } = coords;

      // Step 2: Weather Data
      const weather = await getWeather(latitude, longitude);

      // Enrich data with location info
      const enrichedWeather = {
        ...weather,
        location: {
          name,
          region: admin1 || '',
          country,
          localtime: new Date().toISOString(), // Open-Meteo sends iso timestamps
        }
      };

      setWeatherData(enrichedWeather);
      setHourlyData(weather.forecast.hourly);
      setDailyData(weather.forecast.daily);
      setRecentLocation(name); // Persist recent search
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.message || 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLocation = () => {
    if (weatherData && weatherData.location) {
      const locationName = weatherData.location.name;
      if (!savedLocations.includes(locationName)) {
        setSavedLocations([...savedLocations, locationName]);
      }
    }
  };

  const handleDeleteLocation = (locationName) => {
    setSavedLocations(savedLocations.filter(loc => loc !== locationName));
  };

  useEffect(() => {
    fetchData(recentLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-4 font-sans selection:bg-accent selection:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header onSearch={fetchData} onSaveLocation={handleSaveLocation} />

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-600 dark:text-red-400 p-4 rounded-lg text-center backdrop-blur-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="flex items-center justify-center h-64 bg-white/50 dark:bg-slate-800/50 rounded-3xl backdrop-blur-sm animate-pulse shadow-lg">
                <div className="text-accent text-xl font-medium">Loading weather data...</div>
              </div>
            ) : (
              <>
                <CurrentLocation data={weatherData} />
                <HourlyForecast data={hourlyData} />
                <Overview data={weatherData} />
              </>
            )}
          </div>

          <div className="space-y-6">
            <SavedLocations
              locations={savedLocations}
              onLocationClick={fetchData}
              onDelete={handleDeleteLocation}
            />
            <DailyForecast data={dailyData} />
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <WeatherDashboard />
    </ThemeProvider>
  );
};

export default App;
