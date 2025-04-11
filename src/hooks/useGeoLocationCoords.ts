import { useCallback, useState } from 'react';

type UseGeoLocationOptions = {
  /**
   * get geo location when component mount
   * @default true
   * @description status will be start at `pending`
   */
  getOnMount?: boolean;
};

type UseGeoLocationReturn = {
  getGeoLocation: () => void;
} & (
  | {
      status: 'error';
      error: GeolocationPositionError;
      coords: null;
    }
  | {
      status: 'idle' | 'pending';
      error: null;
      coords: null;
    }
  | {
      status: 'success';
      error: null;
      coords: GeolocationCoordinates;
    }
);

type GeoLocationStatus = UseGeoLocationReturn['status'];

function useGeoLocationCoords({
  getOnMount = true,
}: UseGeoLocationOptions = {}) {
  const [status, setStatus] = useState<GeoLocationStatus>(() =>
    getOnMount ? 'pending' : 'idle'
  );

  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);

  const [error, setError] = useState<GeolocationPositionError | null>(null);

  const getGeoLocation = useCallback(() => {
    setStatus('pending');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords(position.coords);
        setStatus('success');
      },
      (error) => {
        setError(error);
        setStatus('error');
      }
    );
  }, []);

  return {
    status,
    getGeoLocation,
    error,
    coords,
  } as UseGeoLocationReturn;
}

export default useGeoLocationCoords;
