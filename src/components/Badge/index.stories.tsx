import type { Meta, StoryObj } from '@storybook/react';
import Badge from '.';

const meta = {
  component: Badge,
  argTypes: {
    severity: {
      control: 'inline-radio',
      options: [1, 2, 3, 4, 5, 6],
      table: {
        type: {
          summary: [1, 2, 3, 4, 5, 6].join(' | '),
        },
      },
    },
  },
  args: {
    children: 'badge',
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Severity_1 = {
  args: {
    severity: 1,
  },
} satisfies Story;

export const Severity_2 = {
  args: {
    severity: 2,
  },
} satisfies Story;

export const Severity_3 = {
  args: {
    severity: 3,
  },
} satisfies Story;

export const Severity_4 = {
  args: {
    severity: 4,
  },
} satisfies Story;

export const Severity_5 = {
  args: {
    severity: 5,
  },
} satisfies Story;

export const Severity_6 = {
  args: {
    severity: 6,
  },
} satisfies Story;
