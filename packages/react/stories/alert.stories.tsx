import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertIcon, AlertProps } from '../src/alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['flat', 'solid', 'bordered'],
      table: {
        defaultValue: { summary: 'flat' },
      },
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    radius: {
      control: {
        type: 'select',
      },
      options: ['none', 'sm', 'md', 'lg', 'full'],
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

const Template = (args: AlertProps) => (
  <div className="flex flex-col items-center gap-4">
    <Alert {...args}>
      <AlertIcon />
      New software update available.
    </Alert>
    <Alert {...args} color="primary">
      <AlertIcon type="info" filled />
      New software update available.
    </Alert>
    <Alert {...args} color="secondary">
      <AlertIcon type="info" filled />
      New software update available.
    </Alert>
    <Alert {...args} color="success">
      <AlertIcon type="success" filled />
      Your purchase has been confirmed!
    </Alert>
    <Alert {...args} color="warning">
      <AlertIcon type="warning" />
      Warning: Invalid email address!
    </Alert>
    <Alert {...args} color="danger">
      <AlertIcon type="error" />
      Error! Task failed successfully.
    </Alert>
  </div>
);

export const Default: Story = {
  args: {
    children: <div className="[mask-image: `${}`]">A simple default alert — check it out!</div>,
  },
};

export const Flat: Story = {
  args: {
    variant: 'flat',
  },
  render: Template,
};

export const Solid: Story = {
  args: {
    variant: 'solid',
  },
  render: Template,
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
  },
  render: Template,
};
