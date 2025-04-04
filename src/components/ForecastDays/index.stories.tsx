import type { Meta, StoryObj } from '@storybook/react';
import FiveDayForecast from '.';

const meta = {
  component: FiveDayForecast,
  tags: ['!autodocs'],
} satisfies Meta<typeof FiveDayForecast>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Default = {
  name: 'FiveDayForecast',
} satisfies Story;
