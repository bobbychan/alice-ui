import { Meta, StoryObj } from '@storybook/react';

import { popover } from '@alice-ui/theme';
import React from 'react';
import { Tooltip, TooltipProps, TooltipTrigger } from '.';
import { Button } from '../button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
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
type Story = StoryObj<typeof Tooltip>;

const defaultProps: TooltipProps = {
  ...popover.defaultVariants,
};

const Template = (args: TooltipProps) => (
  <TooltipTrigger>
    <Button>Hover me</Button>
    <Tooltip {...args}>This is an example tooltip</Tooltip>
  </TooltipTrigger>
);

const ControlledTemplate = (args: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      <TooltipTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button>{isOpen ? 'Close' : 'Open'}</Button>
        <Tooltip {...args}>This is an example tooltip</Tooltip>
      </TooltipTrigger>
    </div>
  );
};

export const Default: Story = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const Controlled: Story = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
    showArrow: true,
  },
};
