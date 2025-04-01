/* eslint-disable react-refresh/only-export-components */
import { createCTX } from '@/utils';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { PropsWithChildren, useState } from 'react';

function wait(ms = 1000) {
  return new Promise((res) => setTimeout(res, ms));
}

export type SearchContextType = {
  query: UseQueryResult<
    {
      id: number;
      label: string;
    }[],
    Error
  >;
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  isDebouncing: boolean;
  debouncedTerm: string;
};

export const { context: SearchContext, hook: useSearchContext } =
  createCTX<SearchContextType>('Search');

const SearchProvider = (props: PropsWithChildren) => {
  const [term, setTerm] = useState('');

  const debouncedTerm = useDebounce(term, 500);

  const isDebouncing = term !== debouncedTerm;

  const query = useQuery({
    queryKey: ['search', debouncedTerm],
    queryFn: async () => {
      await wait();
      return Array.from({ length: 10 }, (_, idx) => ({
        id: idx,
        label: `Label ${idx}`,
      }));
    },
    enabled: !!debouncedTerm || !isDebouncing,
  });

  return (
    <SearchContext.Provider
      {...props}
      value={{ query, term, setTerm, isDebouncing, debouncedTerm }}
    />
  );
};

export default SearchProvider;
