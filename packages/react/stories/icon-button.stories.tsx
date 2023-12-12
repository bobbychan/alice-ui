import { CheckCircleIcon, ExclamationCircleFilledIcon, InfoIcon } from '@alice-ui/icons';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { IconButton } from '../src/button';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'ghost'],
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
      options: ['xs', 'sm', 'md', 'lg'],
    },
    radius: {
      control: {
        type: 'select',
      },
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
    disableAnimation: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Colors: Story = {
  args: {
    'aria-label': 'Button',
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconButton
        {...args}
        style={({ isPressed }) => (isPressed ? { color: 'red' } : { color: 'green' })}
        onPress={() => console.log('clicked')}
      >
        <CheckCircleIcon width={24} height={24} />
      </IconButton>
      <IconButton {...args} color="primary">
        <CheckCircleIcon />
      </IconButton>
      <IconButton {...args} color="secondary">
        <ExclamationCircleFilledIcon />
      </IconButton>
      <IconButton {...args} color="success">
        <InfoIcon />
      </IconButton>
      <IconButton {...args} color="warning">
        <CheckCircleIcon />
      </IconButton>
      <IconButton {...args} color="danger">
        <CheckCircleIcon />
      </IconButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconButton {...args} size="xs">
        <CheckCircleIcon />
      </IconButton>
      <IconButton {...args} size="sm">
        <CheckCircleIcon />
      </IconButton>
      <IconButton {...args} size="md">
        <CheckCircleIcon />
      </IconButton>
      <IconButton {...args} size="lg">
        <CheckCircleIcon />
      </IconButton>
    </div>
  ),
  args: {
    'aria-label': 'Button',
  },
};
