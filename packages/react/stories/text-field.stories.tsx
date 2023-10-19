import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Input, TextArea } from '../src';
import { TextField, TextFieldProps } from '../src/text-field';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    orientation: {
      control: {
        type: 'select',
      },
      options: ['vertical', 'horizontal'],
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
type Story = StoryObj<typeof TextField>;

const InputTemplate = (args: TextFieldProps) => (
  <TextField {...args} label="First name">
    <Input />
  </TextField>
);

const TextAreaTemplate = (args: TextFieldProps) => (
  <TextField {...args} label="First name">
    <TextArea />
  </TextField>
);

const ControlledTemplate = (args: TextFieldProps) => {
  const [value, setValue] = React.useState('');

  return (
    <div className="flex w-full max-w-[240px] flex-col gap-2">
      <TextField {...args} label="Email" value={value} onValueChange={setValue}>
        <Input placeholder="Enter your email" />
      </TextField>
      <p className="text-default-500 text-sm">Input value: {value}</p>
    </div>
  );
};

export const WithInput: Story = {
  render: InputTemplate,

  args: {
    isRequired: true,
    label: 'hello',
    // eslint-disable-next-line no-console
    onClear: () => console.log('input cleared'),
  },
};

export const WithTextArea: Story = {
  render: TextAreaTemplate,

  args: {
    // eslint-disable-next-line no-console
    onClear: () => console.log('input cleared'),
  },
};

export const WithDescription: Story = {
  render: InputTemplate,

  args: {
    description: 'some description',
  },
};

export const WithErrorMessage: Story = {
  render: InputTemplate,

  args: {
    errorMessage: 'some error message',
  },
};

export const Orientation: Story = {
  render: (args) => (
    <div className="flex items-start space-x-8">
      <TextField orientation="horizontal" {...args}>
        <Input placeholder="horizontal" />
      </TextField>
      <TextField orientation="vertical" {...args}>
        <Input placeholder="vertical" />
      </TextField>
    </div>
  ),

  args: {
    isRequired: true,
    label: 'First name',
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {},
};
