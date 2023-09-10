import { Meta, StoryObj } from '@storybook/react';

import { Spinner, SpinnerProps } from './spinner';

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
