import { twMerge } from '@/lib/tailwind-merge';
import { PropsWithAsChild } from '@/types/utils';
import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Merge } from 'type-fest';

export type BadgeProps = PropsWithAsChild<
  Merge<
    ComponentPropsWithoutRef<'div'>,
    {
      severity: number;
    }
  >
>;

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ asChild, severity, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';

    return (
      <Comp
        {...props}
        ref={ref}
        className={twMerge(
          'py-0.5 px-3 rounded-full font-semiBold cursor-help text-label-1',
          props.className
        )}
        style={{
          color: `var(--color-aqi-${severity}-fg)`,
          backgroundColor: `var(--color-aqi-${severity})`,
        }}
      />
    );
  }
);
Badge.displayName = 'Badge';

export default Badge;
