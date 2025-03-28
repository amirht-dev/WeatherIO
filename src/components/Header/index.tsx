import { ArrowLeft, LocateFixedIcon, Search } from 'lucide-react';
import IconButton from '../IconButton';
import Logo from '../Logo';
import SearchBox from '../SearchBox';
import SearchItem from '../SearchItem';
import SearchList from '../SearchList';
import { View, ViewClose, ViewContent, ViewTrigger } from '../View';

const Header = () => {
  return (
    <header className="py-4 sticky top-0 backdrop-blur-3xl">
      <div className="container flex items-center justify-between">
        <Logo className="w-[150px]" />

        <div className="flex items-center gap-4">
          <View>
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

          <IconButton color="primary">
            <LocateFixedIcon />
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
