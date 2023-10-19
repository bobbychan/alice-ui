import { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../src/skeleton/skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['shimmer', 'pulse'],
    },
    isLoaded: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

const defaultProps = {
  isLoaded: false,
  children: <div className="bg-secondary h-24 w-full rounded-lg"></div>,
};

export const Default: Story = {
  args: {
    ...defaultProps,
    className: 'rounded-xl',
  },
};
