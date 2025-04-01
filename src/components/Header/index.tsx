import SearchProvider from '@/contexts/search';
import { LocateFixedIcon } from 'lucide-react';
import Button from '../Button';
import IconButton from '../IconButton';
import Logo from '../Logo';
import SearchBox from '../SearchBox';
import SearchView from '../SearchView';

const Header = () => {
  return (
    <SearchProvider>
      <header className="py-4 laptop:py-6 sticky top-0 z-10 backdrop-blur-3xl">
        <div className="container flex items-center justify-between">
          <Logo className="w-[150px] laptop:w-[200px]" />

          <SearchBox />

          <div className="flex items-center gap-4">
            <SearchView />

            <IconButton color="primary" className="tablet:hidden">
              <LocateFixedIcon />
            </IconButton>

            <Button
              prefixIcon={<LocateFixedIcon />}
              className="max-tablet:hidden"
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
