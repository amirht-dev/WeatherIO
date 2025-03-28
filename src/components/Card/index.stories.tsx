import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardTitle } from '.';

const meta = {
  subcomponents: { Card, CardTitle },
  argTypes: {
    size: {
      control: 'inline-radio',
      table: {
        type: {
          summary: 'lg | xl',
        },
      },
    },
  },
  render(args) {
    return (
      <Card {...args}>
        <CardTitle>title</CardTitle>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ipsam
        possimus nihil aliquid qui aut numquam corrupti quas recusandae eius
        dolorum, commodi assumenda consectetur nostrum necessitatibus? Sunt
        blanditiis dignissimos natus.
      </Card>
    );
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Default = {} satisfies Story;

export const Large = {
  args: {
    size: 'lg',
  },
} satisfies Story<typeof Card>;

export const XLarge = {
  args: {
    size: 'xl',
  },
} satisfies Story<typeof Card>;
