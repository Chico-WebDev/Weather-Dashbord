// Prévisions quotidiennes
import React from 'react';
import { DailyForecast } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import { Droplets } from 'lucide-react';

interface WeeklyForecastProps {
  forecasts: DailyForecast[];
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ forecasts }) => {
  const maxTemp = Math.max(...forecasts.map(f => f.high));
  const minTemp = Math.min(...forecasts.map(f => f.low));
  const tempRange = maxTemp - minTemp;

  return (
    <div className="space-y-3">
      {forecasts.map((forecast, index) => {
        const highPosition = ((forecast.high - minTemp) / tempRange) * 100;
        const lowPosition = ((forecast.low - minTemp) / tempRange) * 100;
        
        return (
          <div
            key={index}
            className="flex items-center justify-between py-4 px-2 rounded-xl hover:bg-sky-50 transition-all duration-300 cursor-pointer group"
          >
            {/* Day */}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800 group-hover:text-sky-700 transition-colors">
                {forecast.day}
              </div>
              <div className="text-sm text-gray-500">{forecast.date}</div>
            </div>

            {/* Weather Icon */}
            <div className="flex-shrink-0 mx-4">
              <WeatherIcon icon={forecast.icon} size="md" />
            </div>

            {/* Precipitation */}
            <div className="flex items-center text-sm text-gray-600 mx-4 min-w-[60px]">
              <Droplets className="w-4 h-4 text-blue-500 mr-1" />
              <span>{forecast.precipitation}%</span>
            </div>

            {/* Temperature Range Visualization */}
            <div className="flex-1 max-w-[200px] mx-4">
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                {/* Temperature range bar */}
                <div
                  className="absolute h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full transition-all duration-500"
                  style={{
                    left: `${lowPosition}%`,
                    width: `${highPosition - lowPosition}%`
                  }}
                />
              </div>
            </div>

            {/* Temperature Values */}
            <div className="flex items-center space-x-4 text-sm font-semibold min-w-[80px] justify-end">
              <span className="text-gray-500">{forecast.low}°</span>
              <span className="text-gray-800">{forecast.high}°</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyForecast;

