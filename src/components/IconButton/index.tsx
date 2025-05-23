import { twMerge } from '@/lib/tailwind-merge';
import { PropsWithAsChild } from '@/types/utils';
import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Merge } from 'type-fest';

type IconButtonProps = Merge<
  PropsWithAsChild<ComponentPropsWithoutRef<'button'>>,
  {
    color?: 'primary' | 'ghost';
  }
>;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ asChild, color = 'ghost', className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        {...props}
        ref={ref}
        className={twMerge(
          'aspect-square not-disabled:ripple size-10 grid place-items-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
          color === 'ghost' ? 'bg-white/8' : 'bg-primary text-primary-fg',
          className
        )}
      >
        <Slot className="size-[60%]">{children}</Slot>
      </Comp>
    );
  }
);

export default IconButton;
