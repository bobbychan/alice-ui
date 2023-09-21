import { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { Checkbox, CheckboxGroup, CheckboxGroupProps } from '.';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
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
type Story = StoryObj<typeof CheckboxGroup>;

const defaultProps: CheckboxGroupProps = {
  isDisabled: false,
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <CheckboxGroup {...args} label="Favorite sports" orientation="horizontal">
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="san-francisco">San Francisco</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </CheckboxGroup>
    </div>
  ),
};

const InvalidTemplate = (args: CheckboxGroupProps) => {
  const [isInvalid, setIsInvalid] = React.useState(true);

  return (
    <>
      <CheckboxGroup
        {...args}
        isRequired
        description="Select your pets."
        errorMessage="Select only dogs and dragons."
        isInvalid={isInvalid}
        label="Select cities"
        onChange={(value) => {
          setIsInvalid(value.length < 1);
        }}
      >
        <Checkbox value="dogs">Dogs</Checkbox>
        <Checkbox value="cats">Cats</Checkbox>
        <Checkbox value="dragons">Dragons</Checkbox>
      </CheckboxGroup>
    </>
  );
};

export const IsInvalid = {
  render: InvalidTemplate,

  args: {
    ...defaultProps,
  },
};
