import { twMerge } from '@/lib/tailwind-merge';
import { Slot } from '@radix-ui/react-slot';
import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  forwardRef,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { Merge } from 'type-fest';

export type SearchBoxProps = Merge<
  ComponentPropsWithoutRef<'input'>,
  {
    icon?: ReactNode;
    loading?: boolean;
    wrapperProps?: ComponentPropsWithRef<'div'>;
  }
>;

const Input = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={twMerge(
          'flex items-center gap-2 px-3 py-2 laptop:px-4 laptop:py-3',
          props.className
        )}
      />
    );
  }
);
Input.displayName = 'Input';

const InputElement = forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'>
>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={twMerge(
        'placeholder:text-surface-variant-2-fg border-none outline-none w-full',
        props.className
      )}
    />
  );
});
InputElement.displayName = 'InputElement';

const InputIcon = ({ children }: PropsWithChildren) => {
  return <Slot className="shrink-0">{children}</Slot>;
};

export { Input, InputElement, InputIcon };
