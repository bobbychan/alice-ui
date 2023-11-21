import { numberInput } from '@alice-ui/theme';
import { Meta, StoryObj } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Button } from '../src/button';
import { NumberInput, NumberInputProps } from '../src/number-input';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

const defaultProps: NumberInputProps = {
  ...numberInput.defaultVariants,
};

const FormTemplate = (args: NumberInputProps) => (
  <>
    <Form>
      <NumberInput
        isRequired
        label="Width"
        inputProps={{ color: 'secondary' }}
        buttonProps={{ radius: 'full', size: 'sm' }}
        {...args}
      />
      <Button type="submit" className="mt-6">
        Submit
      </Button>
    </Form>
  </>
);

export const Default: Story = {
  render: () => (
    <NumberInput
      label="Width"
      minValue={0}
      defaultValue={2}
      inputProps={{ color: 'secondary' }}
      classNames={{ input: 'w-20' }}
      description="Enter a width in centimeters"
    />
  ),

  args: {
    ...defaultProps,
  },
};

export const Compact: Story = {
  render: () => (
    <NumberInput
      isCompact
      label="Width"
      placeholder="Enter a width"
      inputProps={{ color: 'primary' }}
      classNames={{ input: 'w-32 [&_input]:text-center' }}
    />
  ),

  args: {
    ...defaultProps,
  },
};

export const WithError: Story = {
  render: FormTemplate,
  args: {
    ...defaultProps,
  },
};
