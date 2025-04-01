/* eslint-disable react-hooks/rules-of-hooks */
import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ChevronRight, Search } from 'lucide-react';
import { ChangeEventHandler, ReactNode } from 'react';
import { Input, InputElement } from '.';

type Props = {
  value: string;
  onChange: ChangeEventHandler;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
};

const meta = {
  subcomponents: { Input, InputElement },
  args: {
    value: '',
    onChange: fn(),
  },
  render(args) {
    const [{ value }, updateArgs] = useArgs<Props>();
    return (
      <Input>
        {args.prefixIcon}
        <InputElement
          value={value}
          onChange={(e) => {
            args.onChange?.(e);
            updateArgs({ value: e.target.value });
          }}
        />
        {args.suffixIcon}
      </Input>
    );
  },
} satisfies Meta<Props>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Default = {} satisfies Story;

export const PrefixIcon = {
  args: {
    prefixIcon: <Search />,
  },
} satisfies Story;

export const SuffixIcon = {
  args: {
    suffixIcon: <ChevronRight />,
  },
} satisfies Story;
