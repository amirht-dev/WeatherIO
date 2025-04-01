import { breakpoints } from '@/constants';
import { useEffect, useState } from 'react';
import type { Entries } from 'type-fest';

function getBreakpoint() {
  return (Object.entries(breakpoints) as Entries<typeof breakpoints>).reduce(
    (acc, [bpName, bpValue]) => {
      return bpValue < innerWidth ? bpName : acc;
    },
    'initial' as keyof typeof breakpoints
  );
}

function useBreakpoint() {
  const [current, setCurrent] = useState(getBreakpoint);

  useEffect(() => {
    const listener = () => {
      setCurrent(getBreakpoint);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  return [current, current === 'initial' ? 0 : breakpoints[current]] as const;
}

export default useBreakpoint;
