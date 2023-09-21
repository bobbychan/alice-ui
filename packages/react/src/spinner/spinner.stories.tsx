import { Meta, StoryObj } from '@storybook/react';

import { Spinner, SpinnerProps } from '.';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['spin', 'ring', 'bars', 'dots'],
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

const defaultProps: SpinnerProps = {
  size: 'md',
};

export const Default: Story = {
  args: {
    ...defaultProps,
    className: '',
  },
};

export const Variants: Story = {
  args: {
    color: 'primary',
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Spinner {...args} variant="spin" />
      <Spinner {...args} variant="ring" />
      <Spinner {...args} variant="bars" />
      <Spinner {...args} variant="dots" />
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    color: 'primary',
    variant: 'spin',
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Spinner {...args} size="xs" />
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
      <Spinner {...args} size="xl" />
    </div>
  ),
};
