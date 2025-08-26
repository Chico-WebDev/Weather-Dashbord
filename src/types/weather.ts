// Typages des données météo
export interface WeatherData {
  id: string;
  location: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  feelsLike: number;
  icon: string;
}

// Typages des Prévisions horaires
export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
}

// Typages des Prévisions quotidiennes
export interface DailyForecast {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  precipitation: number;
}