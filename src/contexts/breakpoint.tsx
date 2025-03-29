import useBreakpoint from '@/hooks/useBreakpoint';
import { createCTX } from '@/utils';

type BreakpointContextType = ReturnType<typeof useBreakpoint>;

const { context: BreakpointContext, hook: useBreakpointContext } =
  createCTX<BreakpointContextType>('Breakpoint');

import { PropsWithChildren } from 'react';

const BreakpointProvider = ({ children }: PropsWithChildren) => {
  const breakpoint = useBreakpoint();
  return (
    <BreakpointContext.Provider value={breakpoint}>
      {children}
    </BreakpointContext.Provider>
  );
};

export { useBreakpointContext };

export default BreakpointProvider;
