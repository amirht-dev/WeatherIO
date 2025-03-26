import { twMerge } from '@/lib/tailwind-merge';
import { PropsWithAsChild } from '@/types/utils';
import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

const IconButton = forwardRef<
  HTMLButtonElement,
  PropsWithAsChild<ComponentPropsWithoutRef<'button'>>
>(({ asChild, className, children, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      {...props}
      ref={ref}
      className={twMerge(
        'aspect-square bg-white/8 ripple size-14 grid place-items-center rounded-full',
        className
      )}
    >
      <Slot className="size-[60%]">{children}</Slot>
    </Comp>
  );
});

export default IconButton;
