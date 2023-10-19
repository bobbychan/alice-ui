import { popover } from '@alice-ui/theme';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../src/button';
import { Popover, PopoverProps, PopoverTrigger } from '../src/popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'foreground', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    radius: {
      control: {
        type: 'select',
      },
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    placement: {
      control: {
        type: 'select',
      },
      options: ['top', 'bottom', 'right', 'left'],
    },
    offset: {
      control: {
        type: 'number',
      },
    },
    isOpen: {
      control: {
        type: 'boolean',
      },
    },
    showArrow: {
      control: {
        type: 'boolean',
      },
    },
    defaultOpen: {
      control: {
        type: 'boolean',
      },
    },
    children: {
      control: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Popover>;

const defaultProps: PopoverProps = {
  ...popover.defaultVariants,
};

const Template = (args: PopoverProps) => (
  <PopoverTrigger>
    <Button color="primary">Button</Button>
    <Popover {...args}>This is an example popover.</Popover>
  </PopoverTrigger>
);

export const Default: Story = {
  render: Template,

  args: {
    ...defaultProps,
  },
};
