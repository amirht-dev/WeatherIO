import type { Meta, StoryObj } from '@storybook/react';
import { Search } from 'lucide-react';
import IconButton from '.';

const meta = {
  component: IconButton,
  args: {
    children: <Search />,
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Default = {} satisfies Story;

export const Ghost = {
  args: {
    color: 'ghost',
  },
} satisfies Story;

export const Primary = {
  args: {
    color: 'primary',
  },
} satisfies Story;
