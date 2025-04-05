import { twMerge } from '@/lib/tailwind-merge';
import { PropsWithAsChild } from '@/types/utils';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
};

const Button = forwardRef<HTMLButtonElement, PropsWithAsChild<ButtonProps>>(
  ({ asChild, prefixIcon, suffixIcon, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        {...props}
        ref={ref}
        className={twMerge(
          'bg-primary text-primary-fg h-10 px-4 rounded-full disabled:bg-outline disabled:text-surface-variant-fg cursor-pointer disabled:cursor-not-allowed not-disabled:ripple',
          (!!prefixIcon || !!suffixIcon) && 'flex items-center gap-3',
          className
        )}
      >
        <Slot className="size-6">{prefixIcon}</Slot>
        <Slottable>
          <span className="font-semiBold">{children}</span>
        </Slottable>
        <Slot className="size-6">{suffixIcon}</Slot>
      </Comp>
    );
  }
);

export default Button;
