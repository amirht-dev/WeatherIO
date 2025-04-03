import axios from 'axios';

const API_KEY = '468bde4f35c04e6cb70162009250104';

const weatherAxios = axios.create({
  baseURL: 'http://api.weatherapi.com/v1',
  params: {
    key: API_KEY,
  },
});

export type Location = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
};

export async function getLocations(name: string, signal?: AbortSignal) {
  const res = await weatherAxios.get<Location[]>('/search.json', {
    params: {
      q: name,
    },
    signal,
  });

  return res.data;
}
