import type { Meta, StoryObj } from '@storybook/react';
import FiveDayForecastCard from '.';

const meta = {
  component: FiveDayForecastCard,
  tags: ['!autodocs'],
} satisfies Meta<typeof FiveDayForecastCard>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Default = {
  name: 'FiveDayForecastCard',
} satisfies Story;
