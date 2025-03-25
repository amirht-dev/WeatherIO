import type { Meta, StoryObj } from '@storybook/react';
import Logo, { LogoProps } from '.';

const meta = {
  component: Logo,
} satisfies Meta<LogoProps>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Default = {} satisfies Story;

export const CustomSize = {
  args: {
    size: 100,
  },
  argTypes: {
    size: {
      control: {
        type: 'range',
        min: 50,
        max: 500,
        step: 10,
      },
    },
  },
  render({ style, size, ...args }) {
    return <Logo {...args} style={{ ...style, width: `${size}px` }} />;
  },
} satisfies Story<LogoProps & { size?: number }>;
