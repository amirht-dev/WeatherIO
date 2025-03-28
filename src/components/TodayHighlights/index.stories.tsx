import type { Meta, StoryObj } from '@storybook/react';
import TodayHighlights from '.';

const meta = {
  component: TodayHighlights,
  tags: ['!autodocs'],
} satisfies Meta<typeof TodayHighlights>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Default = {
  name: 'TodayHighlights',
} satisfies Story;
