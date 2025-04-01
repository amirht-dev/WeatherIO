import { twMerge } from '@/lib/tailwind-merge';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

const SearchList = forwardRef<HTMLUListElement, ComponentPropsWithoutRef<'ul'>>(
  (props, ref) => {
    return (
      <ul
        {...props}
        ref={ref}
        className={twMerge('pt-2 pb-4', props.className)}
      />
    );
  }
);
SearchList.displayName = 'SearchList';

export default SearchList;
