// Contenu ou card de la météo
import React from 'react';
import { WeatherData } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import { Droplets, Wind, MapPin } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 rounded-2xl shadow-xl p-8 text-white transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      
      {/* Location Header */}
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div>
          <div className="flex items-center mb-2">
            <MapPin className="w-5 h-5 mr-2 text-white/80" />
            <h2 className="text-2xl font-bold">{weather.location}</h2>
          </div>
          <p className="text-white/80">{weather.country}</p>
        </div>
        <div className="text-right">
          <WeatherIcon icon={weather.icon} size="xl" className="text-white drop-shadow-lg" />
        </div>
      </div>

      {/* Temperature */}
      <div className="mb-8 relative z-10">
        <div className="flex items-baseline mb-2">
          <span className="text-6xl font-light">{weather.temperature}</span>
          <span className="text-3xl ml-2">°C</span>
        </div>
        <p className="text-xl text-white/90 mb-1">{weather.condition}</p>
        <p className="text-white/70">Feels like {weather.feelsLike}°C</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-6 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <p className="text-white/70 text-sm">Humidity</p>
            <p className="text-lg font-semibold">{weather.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <p className="text-white/70 text-sm">Wind</p>
            <p className="text-lg font-semibold">{weather.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;