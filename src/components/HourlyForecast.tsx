// Prévisions Horaires
import React from 'react';
import { HourlyForecast as HourlyForecastType } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface HourlyForecastProps {
  forecasts: HourlyForecastType[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecasts }) => {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex space-x-4 min-w-max">
        {forecasts.map((forecast, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-gradient-to-b from-sky-50 to-sky-100 rounded-xl p-4 min-w-[100px] text-center transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer"
          >
            <div className="text-sm font-medium text-gray-600 mb-2">
              {forecast.time}
            </div>
            <div className="mb-3 flex justify-center">
              <WeatherIcon icon={forecast.icon} size="md" />
            </div>
            <div className="text-lg font-semibold text-gray-800">
              {forecast.temperature}°
            </div>
            <div className="text-xs text-gray-500 mt-1 truncate">
              {forecast.condition}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;