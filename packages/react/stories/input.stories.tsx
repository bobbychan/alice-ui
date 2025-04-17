import { MoonFilledIcon } from '@alice-ui/icons';
import { input } from '@alice-ui/theme';
import { Meta, StoryObj } from '@storybook/react';
import { Input, InputProps } from '../src/input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
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
type Story = StoryObj<typeof Input>;

const defaultProps: InputProps = {
  ...input.defaultVariants,
  placeholder: 'Placeholder',
};

const Template = (args: InputProps) => (
  <div className="w-full max-w-[240px]">
    <Input {...args} />
  </div>
);

const StartContentTemplate = (args: InputProps) => (
  <div className="flex w-full max-w-xl flex-row items-end gap-4">
    <Input
      {...args}
      placeholder="Sleep Time"
      startContent={
        <MoonFilledIcon className="text-default-400 pointer-events-none shrink-0 text-2xl" />
      }
    />
    <Input
      {...args}
      placeholder="0.00"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">$</span>
        </div>
      }
      type="number"
    />
    <Input
      {...args}
      placeholder="example.com"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">https://</span>
        </div>
      }
      type="url"
    />
  </div>
);

const EndContentTemplate = (args: InputProps) => (
  <div className="flex w-full max-w-xl flex-row items-end gap-4">
    <Input
      {...args}
      endContent={
        <MoonFilledIcon className="text-default-400 pointer-events-none shrink-0 text-2xl" />
      }
      placeholder="Sleep Time"
    />
    <Input
      {...args}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">$</span>
        </div>
      }
      placeholder="0.00"
      type="number"
    />
    <Input
      {...args}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">.com</span>
        </div>
      }
      placeholder="example"
      type="url"
    />
  </div>
);

const StartAndEndContentTemplate = (args: InputProps) => (
  <div className="flex w-full max-w-xs flex-col items-end gap-4">
    <Input
      {...args}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">@gmail.com</span>
        </div>
      }
      startContent={
        <MoonFilledIcon className="text-default-400 pointer-events-none shrink-0 text-xl" />
      }
    />
    <Input
      {...args}
      endContent={
        <div className="flex items-center">
          <label className="sr-only" htmlFor="currency">
            Currency
          </label>
          <select
            className="text-default-400 border-0 bg-transparent text-sm outline-hidden"
            id="currency"
            name="currency"
          >
            <option>USD</option>
            <option>ARS</option>
            <option>EUR</option>
          </select>
        </div>
      }
      placeholder="0.00"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">$</span>
        </div>
      }
      type="number"
    />
    <Input
      {...args}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">.org</span>
        </div>
      }
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">https://</span>
        </div>
      }
      type="url"
    />
  </div>
);

const InputTypesTemplate = (args: InputProps) => (
  <div className="grid grid-cols-3 gap-4">
    <Input {...args} placeholder="Enter your text" />
    <Input {...args} placeholder="Enter your number" type="number" />
    <Input {...args} placeholder="Enter your password" type="password" />
    <Input {...args} placeholder="Enter your email" type="email" />
    <Input {...args} placeholder="Enter your url" type="url" />
    <Input {...args} placeholder="Enter your search" type="search" />
    <Input {...args} placeholder="Enter your phone" type="tel" />
    <Input {...args} placeholder="Enter your date" type="date" />
    <Input {...args} placeholder="Enter your time" type="time" />
    <Input {...args} placeholder="Enter your month" type="month" />
    <Input {...args} placeholder="Enter your week" type="week" />
    <Input {...args} placeholder="Enter your range" type="range" />
  </div>
);

export const Default: Story = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Input {...args} size="xs" />
      <Input {...args} size="sm" />
      <Input {...args} size="md" />
      <Input {...args} size="lg" />
    </div>
  ),
  args: {
    ...defaultProps,
    radius: 'full',
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

export const StartContent = {
  render: StartContentTemplate,

  args: {
    ...defaultProps,
  },
};

export const EndContent = {
  render: EndContentTemplate,

  args: {
    ...defaultProps,
    variant: 'bordered',
  },
};

export const StartAndEndContent = {
  render: StartAndEndContentTemplate,

  args: {
    ...defaultProps,
    variant: 'bordered',
  },
};

export const InputTypes = {
  render: InputTypesTemplate,

  args: {
    ...defaultProps,
  },
};
