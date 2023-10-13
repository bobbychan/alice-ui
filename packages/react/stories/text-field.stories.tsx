import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Label, Text } from 'react-aria-components';
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
  <TextField {...args}>
    <Label>First name</Label>
    <Input />
    <Text slot="description">description</Text>
    <Text slot="errorMessage">errorMessage</Text>
  </TextField>
);

const TextAreaTemplate = (args: TextFieldProps) => (
  <TextField {...args}>
    <Label>First name</Label>
    <TextArea />
  </TextField>
);

const ControlledTemplate = (args: TextFieldProps) => {
  const [value, setValue] = React.useState('');

  return (
    <div className="flex w-full max-w-[240px] flex-col gap-2">
      <TextField {...args} value={value} onValueChange={setValue}>
        <Label>Email</Label>
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

export const Controlled = {
  render: ControlledTemplate,

  args: {},
};
