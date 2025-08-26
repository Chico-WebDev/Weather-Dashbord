// data/mockData.ts
import axios from "axios";
import { WeatherData, HourlyForecast, DailyForecast } from "../types/weather";

//API de météo sur openweathermap.com mode gratuit
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// --------- MÉTÉO ACTUELLE ---------
export const fetchCurrentWeather = async (city?: string, lat?: number, lon?: number): Promise<WeatherData> => {
  const params: any = {
    appid: API_KEY,
    units: "metric",
    lang: "fr"
  };

  if (city) {
    params.q = city;
  } else if (lat && lon) {
    params.lat = lat;
    params.lon = lon;
  }

  const response = await axios.get(`${BASE_URL}/weather`, { params });

  const data = response.data;


  return {
    id: data.id.toString(),
    location: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    visibility: data.visibility / 1000, // km
    uvIndex: 0, // ⚠️ pas dispo dans l’API gratuite
    condition: data.weather[0].description,
    icon: data.weather[0].icon
  };
};

// --------- PRÉVISIONS HORAIRES ---------
export const fetchHourlyForecast = async (city?: string, lat?: number, lon?: number): Promise<HourlyForecast[]> => {
  const params: any = {
    appid: API_KEY,
    units: "metric",
    lang: "fr"
  };

  if (city) {
    params.q = city;
  } else if (lat && lon) {
    params.lat = lat;
    params.lon = lon;
  }

  const response = await axios.get(`${BASE_URL}/forecast`, { params });

  const list = response.data.list;

  return list.slice(0, 8).map((item: any) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    temperature: item.main.temp,
    condition: item.weather?.[0]?.description || "Inconnu",
    icon: item.weather?.[0]?.icon || "01d"
  }));
};

// --------- PRÉVISIONS QUOTIDIENNES ---------
export const fetchWeeklyForecast = async (
  city?: string,
  lat?: number,
  lon?: number
): Promise<DailyForecast[]> => {
  const params: any = {
    appid: API_KEY,
    units: "metric",
    lang: "fr",
  };

  if (city) {
    params.q = city;
  } else if (lat && lon) {
    params.lat = lat;
    params.lon = lon;
  }

  const response = await axios.get(`${BASE_URL}/forecast`, { params });
  const list = response.data.list;

  const dailyMap: { [date: string]: any } = {};

  list.forEach((item: any) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString("fr-FR");

    // On garde juste le PREMIER item du jour
    if (!dailyMap[dayKey]) {
      dailyMap[dayKey] = item;
    }
  });

  const daily: DailyForecast[] = Object.values(dailyMap).map((item: any) => {
    const date = new Date(item.dt * 1000);
    return {
      day: date.toLocaleDateString("fr-FR", { weekday: "long" }),
      date: date.toLocaleDateString("fr-FR", {
        month: "short",
        day: "numeric",
      }),
      high: item.main.temp_max,
      low: item.main.temp_min,
      condition: item.weather[0].description,
      icon: item.weather[0].icon,
      precipitation: item.pop ? Math.round(item.pop * 100) : 0,
    };
  });

  console.log(daily);
  return daily.slice(0, 7); // 7 jours max
};
