import axios from 'axios';

const API_KEY = '468bde4f35c04e6cb70162009250104';

const weatherAxios = axios.create({
  baseURL: 'http://api.weatherapi.com/v1',
  params: {
    key: API_KEY,
  },
});

export type SearchLocation = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
};

export type CurrentWeatherResponse = {
  location: CurrentWeatherLocation;
  current: CurrentWeatherData;
};

export type CurrentWeatherData = {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
  air_quality: AirQuality;
};

export type WeatherCondition = {
  text: string;
  icon: string;
  code: number;
};

export type AirQuality = {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  'us-epa-index': number;
  'gb-defra-index': number;
};

export type CurrentWeatherLocation = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
};

export async function getLocations(name: string, signal?: AbortSignal) {
  const res = await weatherAxios.get<SearchLocation[]>('/search.json', {
    params: {
      q: name,
    },
    signal,
  });

  return res.data;
}

export async function getCurrentWeather(query: string, signal?: AbortSignal) {
  const res = await weatherAxios.get<CurrentWeatherResponse>('/current.json', {
    params: {
      q: query,
    },
    signal,
  });

  return res.data;
}
