import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from '.';

const meta = {
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Square = {
  args: {
    className: 'size-[200px] rounded-lg',
  },
} satisfies Story;

export const Circle = {
  args: {
    className: 'size-[200px] rounded-full',
  },
} satisfies Story;

export const Rectangle = {
  args: {
    className: 'w-[200px] h-[50px]',
  },
} satisfies Story;
