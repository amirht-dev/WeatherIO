import { validateLocationQuery } from '@/utils/validators';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router';

const LOCATION_QUERY_PARAM_NAME = 'q';

function useLocationSearchParam(errorCb?: () => void) {
  const [searchParams, setSearchParams] = useSearchParams();

  let locationQuery = searchParams.get(LOCATION_QUERY_PARAM_NAME);

  if (locationQuery != null) {
    const locationValidateResult = validateLocationQuery(locationQuery);

    if (!locationValidateResult.success) {
      toast.error(locationValidateResult.error);
      errorCb?.();
      locationQuery = null;
    }
  }

  const set = (location: string) => {
    const locationValidateResult = validateLocationQuery(location);

    if (!locationValidateResult.success) {
      toast.error(locationValidateResult.error);
      errorCb?.();
      return;
    }

    const newParams = new URLSearchParams(searchParams);
    newParams.set(LOCATION_QUERY_PARAM_NAME, locationValidateResult.data);

    setSearchParams(newParams);
  };

  return [locationQuery, set] as const;
}

export default useLocationSearchParam;
