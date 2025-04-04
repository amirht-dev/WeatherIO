import type { Meta, StoryObj } from '@storybook/react';
import SearchList from '.';
import SearchItem from '../SearchItem';
import * as SearchItemStories from '../SearchItem/index.stories';

const meta = {
  component: SearchList,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: (
      <>
        {Array.from({ length: 10 }, (_, idx) => (
          <SearchItem key={idx} {...SearchItemStories.Tehran.args} />
        ))}
      </>
    ),
  },
} satisfies Meta<typeof SearchList>;

export default meta;

type Story<T = typeof meta> = StoryObj<T>;

export const Default = {} satisfies Story;
