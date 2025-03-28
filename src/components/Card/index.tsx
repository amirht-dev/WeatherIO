import { twMerge } from '@/lib/tailwind-merge';
import { PropsWithAsChild } from '@/types/utils';
import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Merge } from 'type-fest';

type CardProps = PropsWithAsChild<
  Merge<
    ComponentPropsWithoutRef<'div'>,
    {
      size?: 'lg' | 'xl';
    }
  >
>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ asChild, size = 'lg', ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        {...props}
        ref={ref}
        className={twMerge(
          'bg-surface text-surface-fg',
          size === 'lg' ? 'p-4 rounded-lg' : 'p-5 rounded-xl',
          props.className
        )}
      />
    );
  }
);
Card.displayName = 'Card';

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  PropsWithAsChild<React.ComponentPropsWithoutRef<'h2'>>
>(({ asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'h2';

  return (
    <Comp
      {...props}
      ref={ref}
      className={twMerge('text-title-2', props.className)}
    />
  );
});
CardTitle.displayName = 'CardTitle';
