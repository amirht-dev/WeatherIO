import axios from 'axios';
import { Merge, MergeDeep } from 'type-fest';

const API_KEY = '468bde4f35c04e6cb70162009250104';

const weatherAxios = axios.create({
  baseURL: 'http://api.weatherapi.com/v1',
  params: {
    key: API_KEY,
  },
});

export type WithAirQuality<T> = Merge<
  T,
  {
    air_quality: WeatherAirQuality;
  }
>;

type BaseLocation = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
};

export type SearchLocation = Merge<
  BaseLocation,
  {
    id: number;
    url: string;
  }
>;

export type WeatherLocation = Merge<
  BaseLocation,
  {
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  }
>;

export type CurrentWeather = {
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
};

export type CurrentWeatherWithAirQuality = WithAirQuality<CurrentWeather>;

export type WeatherCondition = {
  text: string;
  icon: string;
  code: number;
};

export type WeatherAirQuality = {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  'us-epa-index': number;
  'gb-defra-index': number;
};

export type Forecast = {
  forecastday: ForecastDay[];
};

export type ForecastDay = {
  date: Date;
  date_epoch: number;
  day: WeatherDay;
  astro: WeatherAstro;
  hour: WeatherHour[];
};

export type ForecastDayWithAirQuality = MergeDeep<
  ForecastDay,
  {
    day: WeatherDayWithAirQuality;
    hour: WeatherHourWithAirQuality[];
  }
>;

export type WeatherAstro = {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
  is_moon_up: number;
  is_sun_up: number;
};

export type WeatherDay = {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: WeatherCondition;
  uv: number;
};

export type WeatherDayWithAirQuality = WithAirQuality<WeatherDay>;

export type WeatherHour = {
  time_epoch: number;
  time: string;
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
  snow_cm: number;
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
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
};

export type WeatherHourWithAirQuality = WithAirQuality<WeatherHour>;

export type CurrentResponse = {
  location: WeatherLocation;
  current: CurrentWeather;
};

export type CurrentWithAirQualityResponse = {
  location: WeatherLocation;
  current: CurrentWeatherWithAirQuality;
};

export type ForecastResponse = {
  location: WeatherLocation;
  current: CurrentWeather;
  forecast: Forecast;
};

export type ForecastWithAirQualityResponse = MergeDeep<
  {
    location: WeatherLocation;
    current: CurrentWeather;
    forecast: Forecast;
  },
  {
    current: CurrentWeatherWithAirQuality;
    forecast: {
      forecastday: ForecastDayWithAirQuality[];
    };
  }
>;

export type SearchResponse = SearchLocation[];

export type AstronomyResponse = {
  location: WeatherLocation;
  astronomy: {
    astro: WeatherAstro;
  };
};

type BaseWeatherOptions<TAqi extends boolean> = {
  aqi?: TAqi;
  signal?: AbortSignal;
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

export type CurrentWeatherOptions<TAqi extends boolean> =
  BaseWeatherOptions<TAqi>;

export async function getCurrentWeather<TAqi extends boolean = true>(
  query: string,
  options?: CurrentWeatherOptions<TAqi>
) {
  const res = await weatherAxios.get<
    CurrentResponse | CurrentWeatherWithAirQuality
  >('/current.json', {
    params: {
      q: query,
      aqi: options?.aqi != null ? (options.aqi ? 'yes' : 'no') : 'yes',
    },
    signal: options?.signal,
  });

  return res.data as TAqi extends true
    ? CurrentWithAirQualityResponse
    : CurrentResponse;
}

export type ForecastWeatherOptions<TAqi extends boolean> = Merge<
  BaseWeatherOptions<TAqi>,
  {
    days: number;
  }
>;

export async function getForecastWeather<TAqi extends boolean = false>(
  query: string,
  options?: ForecastWeatherOptions<TAqi>
) {
  const res = await weatherAxios.get<
    ForecastResponse | ForecastWithAirQualityResponse
  >('/forecast.json', {
    params: {
      q: query,
      aqi: options?.aqi ?? false,
      days: options?.days ? options.days + 1 : undefined,
    },
    signal: options?.signal,
  });

  res.data.forecast.forecastday = res.data.forecast.forecastday.slice(1);

  return res.data as TAqi extends true
    ? ForecastWithAirQualityResponse
    : ForecastResponse;
}

export type AstronomyOptions = {
  signal?: AbortSignal;
  dt?: Date;
};

export async function getAstronomy(query: string, options?: AstronomyOptions) {
  const date = options?.dt ?? new Date();
  const res = await weatherAxios.get<AstronomyResponse>('/astronomy.json', {
    params: {
      q: query,
      dt: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    },
    signal: options?.signal,
  });

  return res.data;
}
