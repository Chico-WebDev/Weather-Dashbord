import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import HourlyForecast from "./components/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast";
import SearchBar from "./components/SearchBar";
import StatsGrid from "./components/StatsGrid";
import { fetchCurrentWeather, fetchHourlyForecast, fetchWeeklyForecast } from "./data/mockData";
import { WeatherData, HourlyForecast as HourlyType, DailyForecast } from "./types/weather";
import { MapPin, Clock, Calendar } from "lucide-react";                                                                                                      

function App() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyType[]>([]);
  const [weeklyForecast, setWeeklyForecast] = useState<DailyForecast[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("Paris, France");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Charger météo (ville ou coords)
  const loadWeather = async (city?: string, lat?: number, lon?: number) => {
  try {
    setLoading(true);
    setError(null);

    const [current, hourly, weekly] = await Promise.all([
      fetchCurrentWeather(city, lat, lon),
      fetchHourlyForecast(city, lat, lon),
      fetchWeeklyForecast(city, lat, lon),
    ]);

    setCurrentWeather(current);
    setHourlyForecast(hourly);
    setWeeklyForecast(weekly);
    setSelectedLocation(`${current.location}, ${current.country}`);
  } catch (err) {
    console.error(err);
    setError("Impossible de charger la météo 😢");
  } finally {
    setLoading(false);
  }
};




  // Localisation appareil au démarrage
 useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      loadWeather(undefined, pos.coords.latitude, pos.coords.longitude);
    },
    () => {
      loadWeather("Paris"); // fallback si refus
    }
  );
}, []);


  // Loader stylé
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-300 to-sky-500 text-white">
        <div className="text-center animate-bounce">
          <div className="text-6xl mb-4">☀️⛅🌙</div>
          <p className="text-xl font-semibold">Chargement de la météo...</p>
        </div>
      </div>
    );
  }

  // Erreur stylée
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-200 to-sky-400 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-2xl font-bold mb-2">{error}</p>
          <button
            onClick={() => loadWeather("Paris")}
            className="px-6 py-3 bg-white text-sky-600 rounded-xl shadow-lg hover:bg-sky-50 transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">Weather Dashboard</h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{selectedLocation}</span>
              </div>
            </div>
            <SearchBar onLocationSelect={(loc) => loadWeather(loc)} />
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weather card */}
          {currentWeather && (
            <div className="lg:col-span-1">
              <WeatherCard weather={currentWeather} />
            </div>
          )}

          {/* Forecast + Stats */}
          <div className="lg:col-span-2 space-y-8">
            {currentWeather && <StatsGrid weather={currentWeather} />}

            {/* Prévisions horaires */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <Clock className="w-5 h-5 text-sky-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Prévisions horaires - 24H</h3>
              </div>
              <HourlyForecast forecasts={hourlyForecast} />
            </div>
          </div>
        </div>

        {/* Previsions quotidiennes */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Calendar className="w-5 h-5 text-sky-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">7-Day Forecast</h3>
          </div>
          <WeeklyForecast forecasts={weeklyForecast} />
        </div>
      </div>
    </div>
  );
}

export default App;
