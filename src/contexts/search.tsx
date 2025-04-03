/* eslint-disable react-refresh/only-export-components */
import { getLocations, SearchLocation } from '@/services/api';
import { createCTX } from '@/utils';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { PropsWithChildren, useState } from 'react';

export type SearchContextType = {
  query: UseQueryResult<SearchLocation[], Error>;
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  isDebouncing: boolean;
  debouncedTerm: string;
};

export const { context: SearchContext, hook: useSearchContext } =
  createCTX<SearchContextType>('Search');

const SearchProvider = (props: PropsWithChildren) => {
  const [term, setTerm] = useState('');

  const debouncedTerm = useDebounce(term, 1000);

  const isDebouncing = term !== debouncedTerm;

  const query = useQuery({
    queryKey: ['search', debouncedTerm],
    queryFn: ({ signal }) => getLocations(term, signal),
    enabled: !!debouncedTerm && !isDebouncing,
  });

  return (
    <SearchContext.Provider
      {...props}
      value={{ query, term, setTerm, isDebouncing, debouncedTerm }}
    />
  );
};

export default SearchProvider;
