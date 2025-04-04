import { getAstronomy } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import useLocationSearchParam from './useLocationSearchParam';

type useAstronomyQueryOptions = {
  dt?: Date;
};

function useAstronomyQuery({ dt }: useAstronomyQueryOptions = {}) {
  const [location] = useLocationSearchParam();

  const query = useQuery({
    queryKey: ['weather', 'astronomy', location],
    queryFn: ({ signal }) => {
      if (location) return getAstronomy(location, { signal, dt });
    },
    enabled: !!location,
  });

  return query;
}

export default useAstronomyQuery;
