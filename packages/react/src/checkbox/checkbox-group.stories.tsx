import { Meta, StoryObj } from '@storybook/react';

import { checkbox } from '@alice-ui/theme';
import React from 'react';
import { Checkbox, CheckboxGroup, CheckboxGroupProps } from '.';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    orientation: {
      control: {
        type: 'select',
      },
      options: ['vertical', 'horizontal'],
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
type Story = StoryObj<typeof CheckboxGroup>;

const defaultProps: CheckboxGroupProps = {
  ...checkbox.defaultVariants,
};

const Template = (args: CheckboxGroupProps) => (
  <CheckboxGroup {...args}>
    <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
    <Checkbox value="sydney">Sydney</Checkbox>
    <Checkbox value="san-francisco">San Francisco</Checkbox>
    <Checkbox value="london">London</Checkbox>
    <Checkbox value="tokyo">Tokyo</Checkbox>
  </CheckboxGroup>
);

const InvalidTemplate = (args: CheckboxGroupProps) => {
  const [isInvalid, setIsInvalid] = React.useState(true);

  return (
    <>
      <CheckboxGroup
        {...args}
        isRequired
        description="Select the cities you want to visit"
        isInvalid={isInvalid}
        label="Select cities"
        onChange={(value) => {
          setIsInvalid(value.length < 1);
        }}
      >
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="san-francisco">San Francisco</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </CheckboxGroup>
    </>
  );
};

export const Default: Story = {
  args: {
    ...defaultProps,
    label: 'Select cities',
  },
  render: Template,
};

export const DefaultValue = {
  render: Template,

  args: {
    ...defaultProps,
    label: 'Select cities',
    defaultValue: ['buenos-aires', 'london'],
  },
};

export const Horizontal = {
  render: Template,

  args: {
    label: 'Select cities',
    orientation: 'horizontal',
  },
};

export const IsDisabled = {
  render: Template,

  args: {
    label: 'Select cities',
    isDisabled: true,
  },
};

export const LineThrough = {
  render: Template,

  args: {
    label: 'Select cities',
    lineThrough: true,
  },
};

export const WithDescription = {
  render: Template,

  args: {
    ...defaultProps,
    description: 'Select the cities you want to visit',
  },
};

export const IsInvalid = {
  render: InvalidTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    errorMessage: 'The selected cities cannot be visited at the same time',
  },
};
