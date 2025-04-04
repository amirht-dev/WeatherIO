import SearchProvider from '@/contexts/search';
import useLocationSearchParam from '@/hooks/useLocationSearchParam';
import { getCurrentPosition } from '@/utils';
import { LocateFixedIcon } from 'lucide-react';
import Button from '../Button';
import IconButton from '../IconButton';
import Logo from '../Logo';
import SearchBox from '../SearchBox';
import SearchView from '../SearchView';

const Header = () => {
  const [, setLocation] = useLocationSearchParam();

  const handleSetCurrentPosition = async () => {
    const {
      coords: { latitude, longitude },
    } = await getCurrentPosition();

    setLocation(`${latitude},${longitude}`);
  };

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
              onClick={handleSetCurrentPosition}
            >
              <LocateFixedIcon />
            </IconButton>

            <Button
              prefixIcon={<LocateFixedIcon />}
              className="max-tablet:hidden"
              onClick={handleSetCurrentPosition}
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
