import { twMerge } from '@/lib/tailwind-merge';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

const Loading = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
  (props, ref) => {
    return (
      <span
        {...props}
        ref={ref}
        className={twMerge(
          'size-6 aspect-square inline-block rounded-full border-2 border-surface-fg animate-spin',
          props.className,
          'border-t-transparent'
        )}
        style={{ animationDuration: '600ms', ...props.style }}
      />
    );
  }
);
Loading.displayName = 'Loading';
export default Loading;
