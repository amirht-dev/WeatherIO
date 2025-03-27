import { MapPin } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';
import { Merge } from 'type-fest';

type SearchItemProps = Merge<
  ComponentPropsWithoutRef<'li'>,
  {
    title: string;
    subtitle: string;
  }
>;

const SearchItem = ({ title, subtitle }: SearchItemProps) => {
  return (
    <li className="list-none">
      <a href="#" className="flex items-center gap-4 px-6 py-2 ripple">
        <MapPin className="size-6 text-surface-variant-fg" />
        <div className="flex flex-col">
          <p>{title}</p>
          <p className="text-surface-variant-fg">{subtitle}</p>
        </div>
      </a>
    </li>
  );
};

export default SearchItem;
