import type { Meta, StoryObj } from '@storybook/react';
import SearchItem from '.';

const meta = {
  component: SearchItem,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'London',
    subtitle: 'State of London, GB',
  },
} satisfies Meta<typeof SearchItem>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Default = {} satisfies Story;
