import { input } from '@alice-ui/theme';
import { Meta, StoryObj } from '@storybook/react';
import { TextArea, TextAreaProps } from '../src/input';

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
    disableAutosize: {
      control: {
        type: 'boolean',
      },
    },
  },
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

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <TextArea {...args} size="sm" />
      <TextArea {...args} size="md" />
      <TextArea {...args} size="lg" />
    </div>
  ),
  args: {
    placeholder: 'Enter your description',
    className: 'max-w-[240px]',
  },
};
