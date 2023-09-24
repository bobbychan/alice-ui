import { Meta, StoryObj } from '@storybook/react';

import { popover } from '@alice-ui/theme';
import { DialogTrigger } from 'react-aria-components';
import { Popover, PopoverProps } from '.';
import { Button } from '../button';

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
  <DialogTrigger>
    <Button>Open popover</Button>
    <Popover {...args}>This is an example popover.</Popover>
  </DialogTrigger>
);

export const Default: Story = {
  render: Template,

  args: {
    ...defaultProps,
  },
};
