import twMerge from '@/lib/tailwind-merge';
import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithoutRef } from 'react';

const IconButton = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      {...props}
      className={twMerge(
        'aspect-square bg-white/8 ripple size-14 grid place-items-center rounded-full',
        className
      )}
    >
      <Slot className="size-[60%]">{children}</Slot>
    </button>
  );
};

export default IconButton;
