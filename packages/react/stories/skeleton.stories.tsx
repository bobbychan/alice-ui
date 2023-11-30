import { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../src/skeleton/skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['wave', 'pulse'],
    },
    disableAnimation: {
      control: {
        type: 'boolean',
      },
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
  children: <div className="bg-secondary h-24 w-full"></div>,
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Skeleton {...args} variant="wave" />
      <Skeleton {...args} variant="pulse" />
    </div>
  ),
  args: {
    ...defaultProps,
    variant: 'wave',
    className: 'rounded-lg',
  },
};

export const Standalone: Story = {
  render: (args) => (
    <div className="flex w-full max-w-[300px] items-center gap-3">
      <div>
        <Skeleton className="flex h-12 w-12 rounded-full" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" {...args} />
        <Skeleton className="h-3 w-4/5 rounded-lg" {...args} />
      </div>
    </div>
  ),

  args: {
    ...defaultProps,
  },
};
