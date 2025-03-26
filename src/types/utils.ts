import { PropsWithChildren } from 'react';
import { Merge } from 'type-fest';

export type PropsWithAsChild<T> = Merge<
  T,
  PropsWithChildren<{ asChild?: boolean }>
>;
