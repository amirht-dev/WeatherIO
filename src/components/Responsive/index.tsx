import { useBreakpointContext } from '@/contexts/breakpoint';
import { MergeWithoutSimplify } from '@/lib/type-fest';
import fromPairs from 'lodash/fromPairs';
import sortBy from 'lodash/sortBy';
import toPairs from 'lodash/toPairs';
import { ComponentType } from 'react';
import { Entries } from 'type-fest';
import { Breakpoint, breakpoints } from '../constants';

type PropsResponsive<P> = {
  [K in keyof P]: Partial<Record<keyof typeof breakpoints, P[K]>>;
};

type ResponsiveProps<P> = MergeWithoutSimplify<
  PropsResponsive<P>,
  { Component: ComponentType<P> }
>;

function Responsive<P>({ Component, ...props }: ResponsiveProps<P>) {
  const [currentBPName] = useBreakpointContext();

  const resolvedProps = (
    Object.entries(props) as Entries<PropsResponsive<Record<string, unknown>>>
  ).reduce((resultProps, [propName, responsiveObjPropValue]) => {
    const sortedResponsiveObjPropValue = fromPairs(
      sortBy(
        toPairs(responsiveObjPropValue) as Entries<
          typeof responsiveObjPropValue
        >,
        ([bpName]) => breakpoints[bpName]
      )
    );

    let val: unknown = undefined;

    for (const bpName in sortedResponsiveObjPropValue) {
      if (breakpoints[bpName as Breakpoint] <= breakpoints[currentBPName]) {
        val = responsiveObjPropValue[bpName as Breakpoint];
      } else {
        break;
      }
      continue;
    }

    return {
      ...resultProps,
      [propName]: val,
    };
  }, {} as Record<string, unknown>);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Component {...(resolvedProps as any)} />;
}

export default Responsive;
