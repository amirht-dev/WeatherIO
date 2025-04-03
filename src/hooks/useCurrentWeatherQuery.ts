import { getCurrentWeather } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import useLocationParams from './useLocationSearchParam';

function useCurrentWeatherQuery() {
  const [location] = useLocationParams();

  const query = useQuery({
    queryKey: ['weather', 'current', location],
    queryFn: () => {
      if (location) return getCurrentWeather(location);
    },
    enabled: !!location,
  });

  return query;
}

export default useCurrentWeatherQuery;
