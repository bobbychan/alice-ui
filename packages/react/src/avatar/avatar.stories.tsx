import { CheckCircleFilledIcon, InfoFilledIcon } from '@alice-ui/icons';
import { avatar } from '@alice-ui/theme';
import { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '.';

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

export const WithText = {
  args: {
    ...defaultProps,
    name: 'APPLE',
    color: 'danger',
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
    classNames: {
      base: 'w-32 h-32 text-base',
    },
  },
};

export const CustomSizeImg = {
  args: {
    ...defaultProps,
    src: 'https://i.pravatar.cc/300?u=a042581f4e29026705d',
    name: 'Junior',
    classNames: {
      base: 'w-32 h-32 text-base',
    },
  },
};

export const DefaultIcon = {
  args: {
    ...defaultProps,
    classNames: {
      icon: 'text-default-400',
    },
  },
};

export const IconFallback = {
  args: {
    ...defaultProps,
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    showFallback: true,
  },
};

export const InitialsFallback = {
  args: {
    ...defaultProps,
    src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c61',
    name: 'Junior',
    showFallback: true,
  },
};

export const CustomFallback = {
  args: {
    ...defaultProps,
    src: 'https://images.unsplash.com/broken',
    showFallback: true,
    fallback: (
      <InfoFilledIcon className="text-default-500 h-6 w-6 animate-pulse" fill="currentColor" />
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
