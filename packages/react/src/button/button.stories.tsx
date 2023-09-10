import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from '.';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'ghost'],
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
    },
    spinnerPlacement: {
      control: {
        type: 'select',
      },
      options: ['start', 'end'],
    },
    fullWidth: {
      control: {
        type: 'boolean',
      },
    },
    radius: {
      control: {
        type: 'select',
      },
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      },
    },
    disableAnimation: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const defaultProps: ButtonProps = {
  children: 'Button',
  loaderPlacement: 'start',
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button
        {...args}
        style={({ isPressed }) => (isPressed ? { color: 'red' } : { color: 'green' })}
        onPress={() => console.log('clicked')}
      >
        {({ isPressed }) => (
          <>
            {isPressed && <span>Press</span>}
            me
          </>
        )}
      </Button>
      <Button {...args} color="primary">
        Primary
      </Button>
      <Button {...args} color="secondary">
        Secondary
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
      <Button {...args} color="danger">
        Danger
      </Button>
    </div>
  ),
};
