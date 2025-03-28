import type { Meta, StoryObj } from '@storybook/react';
import HourlyForecast from '.';

const meta = {
  component: HourlyForecast,
  tags: ['!autodocs'],
} satisfies Meta<typeof HourlyForecast>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Default = {
  name: 'HourlyForecast',
} satisfies Story;
