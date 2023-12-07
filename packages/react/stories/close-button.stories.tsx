import { MinusIcon, PlusIcon } from '@alice-ui/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { CloseButton } from '../src/button';

const meta: Meta<typeof CloseButton> = {
  title: 'Components/CloseButton',
  component: CloseButton,
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
  },
};

export default meta;
type Story = StoryObj<typeof CloseButton>;

export const Default = {
  args: {},
};

export const Colors: Story = {
  args: {
    radius: 'full',
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <CloseButton {...args} />
      <CloseButton {...args} color="primary" />
      <CloseButton {...args} color="secondary" />
      <CloseButton {...args} color="success">
        <MinusIcon />
      </CloseButton>
      <CloseButton {...args} color="warning">
        <PlusIcon />
      </CloseButton>
      <CloseButton {...args} color="danger">
        <PlusIcon />
      </CloseButton>
    </div>
  ),
};

export const Variants: Story = {
  args: {},
  render: (args) => (
    <div className="flex items-center gap-4">
      <CloseButton variant="solid" {...args} />
      <CloseButton variant="faded" {...args} />
      <CloseButton variant="bordered" {...args} />
      <CloseButton variant="light" {...args} />
      <CloseButton variant="flat" {...args} />
      <CloseButton variant="ghost" {...args} />
      <CloseButton variant="shadow" {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    radius: 'full',
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <CloseButton size="xs" {...args} />
      <CloseButton size="sm" {...args} />
      <CloseButton size="md" {...args} color="primary" />
      <CloseButton size="lg" {...args} color="secondary" />
    </div>
  ),
};
