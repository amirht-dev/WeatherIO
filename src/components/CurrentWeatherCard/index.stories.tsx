import type { Meta, StoryObj } from '@storybook/react';
import CurrentWeatherCard from '.';

const meta = {
  component: CurrentWeatherCard,
  tags: ['!autodocs'],
} satisfies Meta<typeof CurrentWeatherCard>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Default = {
  name: 'CurrentWeatherCard',
} satisfies Story;
