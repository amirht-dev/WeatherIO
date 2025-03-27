import type { Meta, StoryObj } from '@storybook/react';
import { LocateFixed } from 'lucide-react';
import Button from '.';

const meta = {
  component: Button,
  argTypes: {
    prefixIcon: {
      control: 'boolean',
      mapping: {
        true: <LocateFixed />,
      },
    },
    suffixIcon: {
      control: 'boolean',
      mapping: {
        true: <LocateFixed />,
      },
    },
  },
  args: {
    children: 'button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Default = {} satisfies Story;

export const PrefixIcon = {
  args: {
    prefixIcon: true,
  },
} satisfies Story;

export const SuffixIcon = {
  args: {
    suffixIcon: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;
