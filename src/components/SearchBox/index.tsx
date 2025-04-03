import { useSearchContext } from '@/contexts/search';
import { Search } from 'lucide-react';
import { useState } from 'react';
import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from '../Autocomplete';
import { Input, InputElement } from '../Input';
import Loading from '../Loading';
import SearchItem from '../SearchItem';
import SearchList from '../SearchList';

const SearchBox = () => {
  const { term, setTerm, query, isDebouncing } = useSearchContext();

  const [open, setOpen] = useState(!!term);

  const { isLoading, data } = query;

  const handleSearchItemClick = () => {
    setOpen(false);
    setTerm('');
  };

  return (
    <Autocomplete
      open={!!term && !isDebouncing && open}
      term={term}
      setTerm={setTerm}
      onOpenChange={setOpen}
    >
      <AutocompleteInput>
        {({ term, setTerm }) => (
          <Input className="w-[400px] border-none bg-surface rounded-xl max-laptop:hidden data-[state=open]:rounded-b-none">
            <Search className="shrink-0" />
            <InputElement
              autoComplete="off"
              placeholder="search city..."
              onFocusCapture={(e) => {
                if (e.target.value) setOpen(true);
              }}
              value={term}
              onChange={(e) => {
                setTerm(e.target.value);
                setOpen(true);
              }}
            />
          </Input>
        )}
      </AutocompleteInput>

      <AutocompleteList asChild>
        {isLoading ? (
          <div className="flex items-center justify-center h-[100px]">
            <Loading />
          </div>
        ) : data?.length ? (
          <SearchList>
            {data?.map((item) => (
              <AutocompleteItem
                asChild
                key={item.id}
                onClick={handleSearchItemClick}
              >
                <SearchItem location={item} />
              </AutocompleteItem>
            ))}
          </SearchList>
        ) : (
          <div className="flex items-center justify-center h-[100px] text-surface-variant-fg italic">
            city not exists
          </div>
        )}
      </AutocompleteList>
    </Autocomplete>
  );
};

export default SearchBox;
