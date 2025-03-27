import type { Meta, StoryObj } from '@storybook/react';
import { ArrowLeft } from 'lucide-react';
import SearchBox from '.';
import IconButton from '../IconButton';

const meta = {
  component: SearchBox,
  argTypes: {
    icon: {
      control: 'boolean',
      mapping: {
        true: (
          <IconButton className="bg-transparent">
            <ArrowLeft />
          </IconButton>
        ),
      },
    },
    loading: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof SearchBox>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Default = {} satisfies Story;

export const Icon = {
  args: {
    icon: true,
  },
} satisfies Story;

export const Loading = {
  args: {
    loading: true,
  },
} satisfies Story;
