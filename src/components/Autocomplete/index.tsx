import { twMerge } from '@/lib/tailwind-merge';
import { PropsWithAsChild } from '@/types/utils';
import { createCTX } from '@/utils';
import { Slot } from '@radix-ui/react-slot';
import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  forwardRef,
  ReactNode,
  useState,
} from 'react';
import { Merge } from 'type-fest';
import { Popover, PopoverAnchor, PopoverContent } from '../Popover';

type AutocompleteContextType = {
  term: string;
  setTerm: (term: string) => void;
  isOpen: boolean;
};

const { context: AutocompleteContext, hook: useAutocompleteContext } =
  createCTX<AutocompleteContextType>('Autocomplete');

type AutocompleteRootProps = Merge<
  ComponentPropsWithoutRef<typeof Popover>,
  {
    term?: string;
    setTerm?: (term: string) => void;
  }
>;

const AutocompleteRoot = (props: AutocompleteRootProps) => {
  const [term, setTerm] = useState('');

  const [open, setOpen] = useState(false);

  const isOpen = props.open ?? (open && (!!props.term || !!term));

  return (
    <AutocompleteContext.Provider
      value={{
        term: props.term ?? term,
        setTerm: props.setTerm ?? setTerm,
        isOpen,
      }}
    >
      <Popover open={isOpen} onOpenChange={setOpen} {...props} />
    </AutocompleteContext.Provider>
  );
};

type AutocompleteInputProps = Merge<
  React.ComponentPropsWithoutRef<'input'>,
  {
    popoverAnchorProps?: ComponentPropsWithRef<typeof PopoverAnchor>;
    children?: (ctx: AutocompleteContextType) => ReactNode;
  }
>;

const AutocompleteInput = forwardRef<HTMLInputElement, AutocompleteInputProps>(
  ({ popoverAnchorProps, children, ...props }, ref) => {
    const ctx = useAutocompleteContext();
    return (
      <PopoverAnchor
        {...popoverAnchorProps}
        data-state={ctx.isOpen ? 'open' : 'closed'}
        asChild
      >
        {children?.(ctx) ?? (
          <input
            {...props}
            ref={ref}
            value={ctx.term}
            onChange={(e) => ctx.setTerm(e.target.value)}
          />
        )}
      </PopoverAnchor>
    );
  }
);
AutocompleteInput.displayName = 'AutocompleteInput';

type AutocompleteListProps = PropsWithAsChild<
  Merge<
    ComponentPropsWithoutRef<'ul'>,
    { popoverContentProps?: ComponentPropsWithRef<typeof PopoverContent> }
  >
>;

const AutocompleteList = ({
  asChild,
  popoverContentProps,
  ...props
}: AutocompleteListProps) => {
  const Comp = asChild ? Slot : 'ul';

  return (
    <PopoverContent
      onOpenAutoFocus={(e) => e.preventDefault()}
      onFocusOutside={(e) => e.preventDefault()}
      sideOffset={0}
      {...popoverContentProps}
      className={twMerge(
        'w-(--radix-popover-trigger-width) max-h-[250px] overflow-auto bg-surface rounded-b-xl p-0',
        popoverContentProps?.className
      )}
    >
      <Comp {...props} />
    </PopoverContent>
  );
};

type AutocompleteItemProps = PropsWithAsChild<ComponentPropsWithoutRef<'li'>>;

const AutocompleteItem = forwardRef<HTMLLIElement, AutocompleteItemProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'li';

    return <Comp {...props} ref={ref} />;
  }
);
AutocompleteItem.displayName = 'AutocompleteItem';

// type AutocompleteAsyncListProps<TOption> = Merge<
//   AutocompleteListProps,
//   {
//     optionsFetcher: () => Promise<TOption>;
//     renderOption: (option: TOption) => ReactNode;
//   }
// >;

// const AutocompleteAsyncList = <TOption extends { label: string }>({
//   optionsFetcher,
//   renderOption,
//   ...props
// }: AutocompleteAsyncListProps<TOption>) => {
//   const {} = useQuery({
//     queryKey: ['']
//   })

//   return <AutocompleteList {...props} />;
// };

export {
  AutocompleteRoot as Autocomplete,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
};
