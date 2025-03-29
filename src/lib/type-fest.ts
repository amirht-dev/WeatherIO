import { OmitIndexSignature, PickIndexSignature } from 'type-fest';
import { SimpleMerge } from 'type-fest/source/merge';

export type MergeWithoutSimplify<Destination, Source> = SimpleMerge<
  PickIndexSignature<Destination>,
  PickIndexSignature<Source>
> &
  SimpleMerge<OmitIndexSignature<Destination>, OmitIndexSignature<Source>>;
