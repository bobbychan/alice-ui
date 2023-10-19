import { CheckCircleFilledIcon, InfoFilledIcon } from '@alice-ui/icons';
import { avatar } from '@alice-ui/theme';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Avatar } from '../src/avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    radius: {
      control: {
        type: 'select',
      },
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const defaultProps = {
  ...avatar.defaultVariants,
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const WithText: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Avatar {...args} />
      <Avatar
        {...args}
        getInitials={(name) => name.slice(0, 1)}
        className="text-2xl"
        color="warning"
      />
      <Avatar
        {...args}
        getInitials={(name) => name.slice(0, 2)}
        size="lg"
        className="text-2xl"
        color="success"
      />
    </div>
  ),
  args: {
    ...defaultProps,
    name: 'APPLE',
    color: 'primary',
  },
};

export const IsDisabled = {
  args: {
    ...defaultProps,
    src: 'https://i.pravatar.cc/300?u=a042581f4e29026709d',
    color: 'secondary',
    isBordered: true,
    isDisabled: true,
  },
};

export const WithImage = {
  args: {
    ...defaultProps,
    src: 'https://i.pravatar.cc/300?u=a042581f4e29026705d',
  },
};

export const isBordered = {
  args: {
    ...defaultProps,
    src: 'https://i.pravatar.cc/300?u=a042581f4e29026709d',
    color: 'secondary',
    isBordered: true,
  },
};

export const WithIcon = {
  args: {
    ...defaultProps,
    size: 'lg',
  },
};

export const Custom = {
  args: {
    ...defaultProps,
    icon: <CheckCircleFilledIcon className="h-5 w-5" />,
    radius: 'xl',
    classNames: {
      base: 'shadow-lg bg-cyan-200 dark:bg-cyan-800',
    },
  },
};

export const CustomSize = {
  args: {
    ...defaultProps,
    src: 'https://i.pravatar.cc/300?u=a042581f4e29026705d',
    name: 'Junior',
    classNames: {
      base: 'w-32 h-32 text-base',
    },
  },
};

export const IconFallback: Story = {
  args: {
    ...defaultProps,
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    showFallback: true,
    size: 'lg',
    fallback: <div>Andy</div>,
  },
};

export const InitialsFallback = {
  args: {
    ...defaultProps,
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    name: 'Junior',
    showFallback: true,
    size: 'lg',
  },
};

export const CustomFallback = {
  args: {
    ...defaultProps,
    src: 'https://images.unsplash.com/broken',
    showFallback: true,
    fallback: (
      <InfoFilledIcon className="text-danger-500 h-6 w-6 animate-pulse" fill="currentColor" />
    ),
  },
};

export const BrokenImage = {
  args: {
    ...defaultProps,
    src: 'https://images.unsplash.com/broken-image',
    name: 'Junior',
    showFallback: true,
  },
};
