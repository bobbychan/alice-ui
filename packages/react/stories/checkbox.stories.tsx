import { CloseIcon } from '@alice-ui/icons';
import { Meta, StoryObj } from '@storybook/react';

import { checkbox } from '@alice-ui/theme';
import React from 'react';
import { Checkbox, CheckboxIconProps, CheckboxProps } from '../src/checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
  ...checkbox.defaultVariants,
  children: 'Option',
};

const ControlledTemplate = (args: CheckboxProps) => {
  const [selected, setSelected] = React.useState<boolean>(true);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Checkbox ', selected);
  }, [selected]);

  return (
    <div className="flex flex-col gap-2">
      <Checkbox isSelected={selected} onChange={setSelected} {...args}>
        Subscribe (controlled)
      </Checkbox>
      <p className="text-default-500">Selected: {selected ? 'true' : 'false'}</p>
    </div>
  );
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Checkbox {...args}>{({ isSelected }) => (isSelected ? 'Checked' : 'Unchecked')}</Checkbox>
    </div>
  ),
};

export const IsDisabled: Story = {
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const DefaultSelected: Story = {
  args: {
    ...defaultProps,
    defaultSelected: true,
  },
};

export const CustomIconNode: Story = {
  args: {
    ...defaultProps,
    icon: <CloseIcon />,
  },
};

export const CustomIconFunction: Story = {
  args: {
    ...defaultProps,
    icon: (props: CheckboxIconProps) => <CloseIcon {...props} />,
  },
};

export const AlwaysSelected: Story = {
  args: {
    ...defaultProps,
    isSelected: true,
  },
};

export const IsIndeterminate: Story = {
  args: {
    ...defaultProps,
    isIndeterminate: true,
  },
};

export const LineThrough: Story = {
  args: {
    ...defaultProps,
    lineThrough: true,
  },
};

export const Controlled: Story = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};
