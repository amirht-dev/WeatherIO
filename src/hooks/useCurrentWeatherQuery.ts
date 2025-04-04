import { CurrentWeatherOptions, getCurrentWeather } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import useLocationParams from './useLocationSearchParam';

function useCurrentWeatherQuery<TAqi extends boolean = true>({
  aqi,
}: Omit<CurrentWeatherOptions<TAqi>, 'signal'> = {}) {
  const [location] = useLocationParams();

  const _aqi = aqi ?? true;

  const query = useQuery({
    queryKey: ['weather', 'current', { location, aqi: _aqi }],
    queryFn: () => {
      if (location)
        return getCurrentWeather(location, {
          aqi: _aqi,
        });
    },
    enabled: !!location,
  });

  return query;
}

export default useCurrentWeatherQuery;
