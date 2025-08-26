// Icon de météo
import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Zap, Wind } from 'lucide-react';

interface WeatherIconProps {
  icon: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ icon, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const iconClasses = `${sizeClasses[size]} ${className} transition-all duration-300`;

  const renderIcon = () => {
    switch (icon) {
      case 'sunny':
        return (
          <Sun className={`${iconClasses} text-yellow-500 drop-shadow-sm animate-pulse`} />
        );
      case 'partly-cloudy':
        return (
          <div className="relative inline-block">
            <Sun className={`${iconClasses} text-yellow-500 drop-shadow-sm`} />
            <Cloud className={`${iconClasses} text-gray-400 absolute -top-1 -right-1 scale-75 drop-shadow-sm`} />
          </div>
        );
      case 'cloudy':
        return <Cloud className={`${iconClasses} text-gray-500 drop-shadow-sm`} />;
      case 'rainy':
        return <CloudRain className={`${iconClasses} text-blue-500 drop-shadow-sm`} />;
      case 'snowy':
        return <CloudSnow className={`${iconClasses} text-blue-200 drop-shadow-sm`} />;
      case 'stormy':
        return <Zap className={`${iconClasses} text-purple-500 drop-shadow-sm animate-pulse`} />;
      case 'windy':
        return <Wind className={`${iconClasses} text-gray-600 drop-shadow-sm`} />;
      default:
        return <Sun className={`${iconClasses} text-yellow-500 drop-shadow-sm`} />;
    }
  };

  return (
    <div className="flex items-center justify-center">
      {renderIcon()}
    </div>
  );
};

export default WeatherIcon;