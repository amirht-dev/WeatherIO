import { twMerge } from '@/lib/tailwind-merge';
import { ComponentPropsWithoutRef } from 'react';

const SearchList = (props: ComponentPropsWithoutRef<'ul'>) => {
  return <ul {...props} className={twMerge('pt-2 pb-4', props.className)} />;
};

export default SearchList;
