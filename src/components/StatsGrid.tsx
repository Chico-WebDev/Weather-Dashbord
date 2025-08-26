// Grid des stats et icons
import React from 'react';
import { WeatherData } from '../types/weather';
import { Eye, Gauge, Thermometer, Activity } from 'lucide-react';

interface StatsGridProps {
  weather: WeatherData;
}

const StatsGrid: React.FC<StatsGridProps> = ({ weather }) => {
  const stats = [
    {
      icon: <Eye className="w-6 h-6" />,
      label: 'Visibility',
      value: `${weather.visibility} km`,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      label: 'Pressure',
      value: `${weather.pressure} hPa`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      label: 'Feels Like',
      value: `${weather.feelsLike}°C`,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      icon: <Activity className="w-6 h-6" />,
      label: 'Air Quality',
      value: 'Good',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
        >
          <div className={`inline-flex p-2 rounded-lg ${stat.bgColor} mb-3`}>
            <div className={stat.color}>
              {stat.icon}
            </div>
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {stat.label}
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;