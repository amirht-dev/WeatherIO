import { validateLocationQuery } from '@/utils/validators';
import useSearchParams from './useSearchParams';

const LOCATION_QUERY_PARAM_NAME = 'q';

function useLocationParams(errorCb?: (err: string) => void) {
  const [searchParams, setSearchParams] = useSearchParams();

  const locationQuery = searchParams.get(LOCATION_QUERY_PARAM_NAME);

  if (locationQuery != null) {
    const locationValidateResult = validateLocationQuery(locationQuery);

    if (!locationValidateResult.success)
      errorCb?.(locationValidateResult.error);

    if (!locationValidateResult.success)
      errorCb?.(locationValidateResult.error);
  }

  const set = (location: string) => {
    const locationValidateResult = validateLocationQuery(location);

    if (!locationValidateResult.success)
      return errorCb?.(locationValidateResult.error);

    const newParams = new URLSearchParams(searchParams);
    newParams.set(LOCATION_QUERY_PARAM_NAME, locationValidateResult.data);

    setSearchParams(newParams);
  };

  return [locationQuery, set] as const;
}

export default useLocationParams;
