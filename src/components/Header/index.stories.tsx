import type { Meta, StoryObj } from '@storybook/react';
import Header from '.';

const meta = {
  component: Header,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Default = {
  name: 'Header',
} satisfies Story;
