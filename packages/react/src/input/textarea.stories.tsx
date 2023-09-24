import { Meta, StoryObj } from '@storybook/react';

import { input } from '@alice-ui/theme';
import { TextArea, TextAreaProps } from '.';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['flat', 'faded', 'bordered', 'underlined'],
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
type Story = StoryObj<typeof TextArea>;

const defaultProps: TextAreaProps = {
  ...input.defaultVariants,
  placeholder: 'Enter your description',
};

const Template = (args: TextAreaProps) => (
  <div className="w-full max-w-[240px]">
    <TextArea {...args} />
  </div>
);

export const Default: Story = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const Disabled = {
  render: Template,

  args: {
    ...defaultProps,
    defaultValue: 'input@example.com',
    variant: 'faded',
    disabled: true,
  },
};
