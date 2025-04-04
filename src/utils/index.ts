import { type Context, createContext, useContext } from 'react';

type CreateCXTOptions = {
  throw?: boolean;
};

type CreateCTXReturn<TContext, THookReturn> = {
  context: Context<TContext>;
  hook: (options?: CreateCXTOptions) => THookReturn;
};

export function createCTX<TContext>(
  name: string,
  baseOptions: { throw: false }
): CreateCTXReturn<TContext, TContext | null>;
export function createCTX<TContext>(
  name: string,
  baseOptions?: { throw?: true }
): CreateCTXReturn<TContext, TContext>;
export function createCTX<TContext>(
  name: string,
  baseOptions: CreateCXTOptions = { throw: true }
) {
  let hasToThrow = baseOptions.throw;

  const context = createContext<TContext | null>(null);

  function hook(options?: CreateCXTOptions) {
    if (options?.throw != undefined) hasToThrow = options.throw;
    // eslint-disable-next-line
    const ctx = useContext(context);
    if (ctx === null && hasToThrow)
      throw new Error(
        `use use${name}Context hook inside ${name}Context Provider`
      );
    return ctx;
  }

  return {
    context,
    hook,
  };
}

export function formatDateToParts(date: Date | number) {
  const parts = Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
  }).formatToParts(date);

  return {
    weekDayName: parts[0].value,
    day: parts[4].value,
    monthName: parts[2].value,
  };
}

export function getCurrentPosition() {
  return new Promise<GeolocationPosition>((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}
