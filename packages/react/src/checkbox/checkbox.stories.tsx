import { CheckCircleIcon, InfoIcon } from '@alice-ui/icons';
import { Meta, StoryObj } from '@storybook/react';

import { Checkbox, CheckboxProps } from '.';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
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
    lineThrough: {
      control: {
        type: 'boolean',
      },
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const defaultProps: CheckboxProps = {
  size: 'md',
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Checkbox {...args}>{({ isSelected }) => (isSelected ? 'Checked' : 'Unchecked')}</Checkbox>
      <Checkbox
        {...args}
        icon={({ isSelected, className }) =>
          isSelected ? (
            <CheckCircleIcon className={className} />
          ) : (
            <InfoIcon className={className} />
          )
        }
      />
    </div>
  ),
};
