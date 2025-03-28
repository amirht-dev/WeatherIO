import { twMerge } from '@/lib/tailwind-merge';
import { PropsWithAsChild } from '@/types/utils';
import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Merge } from 'type-fest';

export type BadgeProps = PropsWithAsChild<
  Merge<
    ComponentPropsWithoutRef<'div'>,
    {
      severity?: '1' | '2' | '3' | '4' | '5';
    }
  >
>;

const severityClassNameMap: Record<
  NonNullable<BadgeProps['severity']>,
  string
> = {
  '1': 'bg-bg-aqi-1 text-bg-aqi-1-fg',
  '2': 'bg-bg-aqi-2 text-bg-aqi-2-fg',
  '3': 'bg-bg-aqi-3 text-bg-aqi-3-fg',
  '4': 'bg-bg-aqi-4 text-bg-aqi-4-fg',
  '5': 'bg-bg-aqi-5 text-bg-aqi-5-fg',
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ asChild, severity = '1', ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';

    return (
      <Comp
        {...props}
        ref={ref}
        className={twMerge(
          'py-0.5 px-3 rounded-full font-semiBold cursor-help text-label-1',
          severityClassNameMap[severity],
          props.className
        )}
      />
    );
  }
);
Badge.displayName = 'Badge';

export default Badge;
