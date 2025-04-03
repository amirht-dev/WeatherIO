import { useSearchContext } from '@/contexts/search';
import { ArrowLeft, Search } from 'lucide-react';
import IconButton from '../IconButton';
import { Input, InputElement } from '../Input';
import Loading from '../Loading';
import SearchItem from '../SearchItem';
import SearchList from '../SearchList';
import { View, ViewClose, ViewContent, ViewTrigger } from '../View';

const SearchView = () => {
  const { term, setTerm, debouncedTerm, query } = useSearchContext();

  const { isLoading, data } = query;

  return (
    <View className="laptop:hidden">
      <ViewTrigger asChild>
        <IconButton>
          <Search />
        </IconButton>
      </ViewTrigger>

      <ViewContent>
        <Input className="border-b border-outline">
          <ViewClose asChild>
            <IconButton className="bg-transparent">
              <ArrowLeft />
            </IconButton>
          </ViewClose>
          <InputElement
            placeholder="search city..."
            autoComplete="off"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </Input>
        {!!debouncedTerm &&
          (isLoading ? (
            <div className="flex items-center justify-center h-[100px]">
              <Loading />
            </div>
          ) : data ? (
            data.length ? (
              <SearchList>
                {data.map((item) => (
                  <ViewClose key={item.id}>
                    <SearchItem location={item} />
                  </ViewClose>
                ))}
              </SearchList>
            ) : (
              <div className="flex items-center justify-center h-[100px] text-surface-variant-fg italic">
                city not exists
              </div>
            )
          ) : null)}
      </ViewContent>
    </View>
  );
};

export default SearchView;
