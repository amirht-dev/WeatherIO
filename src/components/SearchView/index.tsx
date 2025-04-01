import { useSearchContext } from '@/contexts/search';
import { ArrowLeft, Search } from 'lucide-react';
import IconButton from '../IconButton';
import { Input, InputElement } from '../Input';
import Loading from '../Loading';
import SearchItem from '../SearchItem';
import SearchList from '../SearchList';
import { View, ViewClose, ViewContent, ViewTrigger } from '../View';

const SearchView = () => {
  const { term, setTerm, query } = useSearchContext();

  const { isLoading, data } = query;

  return (
    <View className="laptop:hidden">
      <ViewTrigger asChild>
        <IconButton>
          <Search />
        </IconButton>
      </ViewTrigger>

      <ViewContent>
        <Input>
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
        {isLoading ? (
          <div className="flex items-center justify-center h-[100px]">
            <Loading />
          </div>
        ) : data?.length ? (
          <SearchList>
            {data.map((item) => (
              <SearchItem
                key={item.id}
                title={item.label}
                subtitle={`subtitle of ${item.label}`}
              />
            ))}
          </SearchList>
        ) : (
          <div className="flex items-center justify-center h-[100px] text-surface-variant-fg italic">
            city not exists
          </div>
        )}
      </ViewContent>
    </View>
  );
};

export default SearchView;
