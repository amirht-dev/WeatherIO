import { ArrowLeft, LocateFixedIcon, Search } from 'lucide-react';
import Button from '../Button';
import IconButton from '../IconButton';
import Logo from '../Logo';
import SearchBox from '../SearchBox';
import SearchItem from '../SearchItem';
import SearchList from '../SearchList';
import { View, ViewClose, ViewContent, ViewTrigger } from '../View';

const Header = () => {
  return (
    <header className="py-4 laptop:py-6 sticky top-0 z-10 backdrop-blur-3xl">
      <div className="container flex items-center justify-between">
        <Logo className="w-[150px] laptop:w-[200px]" />

        <SearchBox
          wrapperProps={{
            className:
              'w-[400px] max-laptop:hidden bg-surface border-none rounded-xl',
          }}
          icon={<Search />}
        />

        <div className="flex items-center gap-4">
          <View className="laptop:hidden">
            <ViewTrigger asChild>
              <IconButton>
                <Search />
              </IconButton>
            </ViewTrigger>

            <ViewContent>
              <SearchBox
                icon={
                  <ViewClose asChild>
                    <IconButton className="bg-transparent">
                      <ArrowLeft />
                    </IconButton>
                  </ViewClose>
                }
              />
              <SearchList>
                <SearchItem title="London" subtitle="State of London, GB" />
                <SearchItem title="London" subtitle="State of London, GB" />
                <SearchItem title="London" subtitle="State of London, GB" />
              </SearchList>
            </ViewContent>
          </View>

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
  );
};

export default Header;
