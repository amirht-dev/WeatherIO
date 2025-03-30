import { twMerge } from '@/lib/tailwind-merge';
import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ReactNode,
} from 'react';
import { Merge } from 'type-fest';
import Loading from '../Loading';

export type SearchBoxProps = Merge<
  ComponentPropsWithoutRef<'input'>,
  {
    icon?: ReactNode;
    loading?: boolean;
    wrapperProps?: ComponentPropsWithRef<'div'>;
  }
>;

const SearchBox = ({
  icon,
  loading = false,
  wrapperProps,
  ...props
}: SearchBoxProps) => {
  return (
    <div
      {...wrapperProps}
      className={twMerge(
        'flex items-center gap-2 border-b px-3 border-outline py-2',
        wrapperProps?.className
      )}
    >
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
