import { ForecastWeatherOptions, getForecastWeather } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import useLocationSearchParam from './useLocationSearchParam';

function useForecastQuery<TAqi extends boolean>({
  days,
  aqi,
}: Omit<ForecastWeatherOptions<TAqi>, 'signal'>) {
  const [location] = useLocationSearchParam();

  const query = useQuery({
    queryKey: ['weather', 'forecast', { days, location }],
    queryFn: ({ signal }) => {
      if (location)
        return getForecastWeather(location, {
          days,
          aqi,
          signal,
        });
    },
    enabled: !!location,
  });

  return query;
}

export default useForecastQuery;
