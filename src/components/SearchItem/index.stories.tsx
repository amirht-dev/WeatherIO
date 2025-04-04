import type { Meta, StoryObj } from '@storybook/react';
import SearchItem from '.';

const meta = {
  component: SearchItem,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchItem>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Tehran = {
  args: {
    location: {
      id: 1261532,
      name: 'Tehran',
      region: 'Tehran',
      country: 'Iran',
      lat: 35.73,
      lon: 51.33,
      url: 'tehran-tehran-iran',
    },
  },
} satisfies Story;
