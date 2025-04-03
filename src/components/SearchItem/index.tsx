import { Location } from '@/services/api';
import { MapPin } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Merge } from 'type-fest';

type SearchItemProps = Merge<
  ComponentPropsWithoutRef<'li'>,
  {
    location: Location;
  }
>;

const SearchItem = ({ location, ...props }: SearchItemProps) => {
  const { name, region, country } = location;
  return (
    <li {...props} className={twMerge('list-none', props.className)}>
      <button className="flex items-center gap-4 px-4 py-2 ripple w-full">
        <MapPin className="size-6 text-surface-variant-fg" />
        <div className="flex flex-col items-start">
          <p>{name}</p>
          <p className="text-surface-variant-fg">{`${region}, ${country}`}</p>
        </div>
      </button>
    </li>
  );
};

export default SearchItem;
