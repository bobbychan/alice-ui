import { CheckCircleFilledIcon } from '@alice-ui/icons';
import { chip } from '@alice-ui/theme';
import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../avatar';

import { Chip } from '.';
import { ChipProps } from './chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'dot'],
    },
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
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

const defaultProps = {
  ...chip.defaultVariants,
  children: 'Chip',
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const StartContent = {
  args: {
    ...defaultProps,
    startContent: (
      <span aria-label="celebration" className="ml-1" role="img">
        🎉
      </span>
    ),
  },
};

export const EndContent = {
  args: {
    ...defaultProps,
    endContent: (
      <span aria-label="rocket" className="mr-1" role="img">
        🚀
      </span>
    ),
  },
};

export const Closeable = {
  args: {
    ...defaultProps,
    // eslint-disable-next-line
    onClose: () => console.log('Close'),
  },
};

export const CustomCloseIcon = {
  args: {
    ...defaultProps,
    endContent: <CheckCircleFilledIcon />,
    // eslint-disable-next-line
    onClose: () => console.log('Close'),
  },
};

export const WithAvatar = {
  args: {
    ...defaultProps,
    variant: 'flat',
    color: 'secondary',
    avatar: <Avatar name="JW" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />,
  },
};

const HiddenOverflowTemplate = (args: ChipProps) => (
  <div className="border-danger-500 w-20 border-2">
    <Chip {...args} />
  </div>
);

export const HiddenOverflow = {
  render: HiddenOverflowTemplate,
  args: {
    ...defaultProps,
    children: 'Hello World!',
  },
};
