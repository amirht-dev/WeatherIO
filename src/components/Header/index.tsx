import SearchProvider from '@/contexts/search';
import useGeoLocationCoords from '@/hooks/useGeoLocationCoords';
import useLocationSearchParam from '@/hooks/useLocationSearchParam';
import { LocateFixedIcon } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Button from '../Button';
import IconButton from '../IconButton';
import Loading from '../Loading';
import Logo from '../Logo';
import SearchBox from '../SearchBox';
import SearchView from '../SearchView';

const Header = () => {
  const [location, setLocation] = useLocationSearchParam();

  const { status, coords, error, getGeoLocation } = useGeoLocationCoords({
    getOnMount: false,
  });

  useEffect(() => {
    if (status === 'error') {
      toast.error(error.message);
    }
  }, [status, error, coords]);

  useEffect(() => {
    if (status === 'success' && !location) {
      setLocation(`${coords.latitude},${coords.longitude}`);
    }
  }, [status, setLocation, location, coords]);

  const Icon =
    status === 'pending' ? (
      <Loading className="border-primary-fg" />
    ) : (
      <LocateFixedIcon />
    );

  return (
    <SearchProvider>
      <header className="py-4 laptop:py-6 sticky top-0 z-10 backdrop-blur-3xl">
        <div className="container flex items-center justify-between">
          <Logo className="w-[150px] laptop:w-[200px]" />

          <SearchBox />

          <div className="flex items-center gap-4">
            <SearchView />

            <IconButton
              color="primary"
              className="tablet:hidden"
              onClick={getGeoLocation}
            >
              {Icon}
            </IconButton>

            <Button
              prefixIcon={Icon}
              className="max-tablet:hidden"
              onClick={getGeoLocation}
            >
              Current Location
            </Button>
          </div>
        </div>
      </header>
    </SearchProvider>
  );
};

export default Header;
