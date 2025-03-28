import type { Meta, StoryObj } from '@storybook/react';
import Footer from '.';

const meta = {
  component: Footer,
  tags: ['!autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Default = {
  name: 'Footer',
} satisfies Story;
