import { twMerge } from '@/lib/tailwind-merge';
import { ComponentPropsWithoutRef } from 'react';
import { Merge } from 'type-fest';

type SkeletonProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  {
    loading?: boolean;
  }
>;

function Skeleton({ className, children, loading, ...props }: SkeletonProps) {
  if (loading || loading === undefined)
    return (
      <div
        className={twMerge(
          'animate-pulse h-[calc(var(--font-size,1em)*var(--tw-leading,var(--line-height,1.5)))] bg-surface-variant-fg/25 rounded-[7px]',
          className
        )}
        {...props}
      />
    );

  return children;
}

export default Skeleton;
