import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Merge } from 'type-fest';
import Loading from '../Loading';

export type SearchBoxProps = Merge<
  ComponentPropsWithoutRef<'input'>,
  {
    icon?: ReactNode;
    loading?: boolean;
  }
>;

const SearchBox = ({ icon, loading = false, ...props }: SearchBoxProps) => {
  return (
    <div className="flex items-center gap-2 border-b border-outline py-2">
      {icon}
      <input
        {...props}
        type="search"
        className="placeholder:text-surface-variant-2-fg border-none outline-none w-full"
        placeholder="search city..."
        autoComplete="off"
      />
      {loading && <Loading />}
    </div>
  );
};

export default SearchBox;
