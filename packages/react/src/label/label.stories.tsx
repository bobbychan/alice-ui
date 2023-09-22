import { Meta, StoryObj } from '@storybook/react';

import { Label, LabelProps } from '.';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
      options: ['foreground', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

const defaultProps: LabelProps = {
  children: 'Default Label',
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};
