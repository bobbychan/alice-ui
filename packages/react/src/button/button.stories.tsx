import { CheckCircleIcon, ExclamationCircleFilledIcon, InfoIcon } from '@alice-ui/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';

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

export const Colors: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button
        {...args}
        style={({ isPressed }) => (isPressed ? { color: 'red' } : { color: 'green' })}
        onPress={() => console.log('clicked')}
      >
        Default
      </Button>
      <Button {...args} color="primary" spinnerPlacement="end" spinnerProps={{ variant: 'bars' }}>
        Primary
      </Button>
      <Button
        {...args}
        color="secondary"
        leftIcon={<CheckCircleIcon className="h-5 w-5 shrink-0" />}
      >
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

export const Variants: Story = {
  args: {
    color: 'primary',
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} variant="solid">
        Solid
      </Button>
      <Button {...args} variant="faded">
        Faded
      </Button>
      <Button {...args} variant="bordered">
        Bordered
      </Button>
      <Button {...args} variant="light">
        Light
      </Button>
      <Button {...args} variant="flat">
        Flat
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="shadow">
        Shadow
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button radius="full">Full</Button>
      <Button radius="lg">Large</Button>
      <Button radius="md">Medium</Button>
      <Button radius="sm">Small</Button>
      <Button radius="none">None</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button {...args}>Default</Button>
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
        Error
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    color: 'primary',
    isLoading: true,
  },
  render: (args) => (
    <>
      <div className="flex items-center gap-4">
        <Button {...args} size="lg">
          loading
        </Button>
        <Button {...args} size="md">
          loading
        </Button>
        <Button {...args} size="sm">
          loading
        </Button>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <Button {...args} color="primary">
          loading
        </Button>
        <Button {...args} color="secondary">
          loading
        </Button>
        <Button {...args} color="success">
          loading
        </Button>
        <Button {...args} color="warning">
          loading
        </Button>
        <Button {...args} color="danger">
          loading
        </Button>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <Button {...args} variant="solid">
          loading
        </Button>
        <Button {...args} variant="faded">
          loading
        </Button>
        <Button {...args} variant="bordered">
          loading
        </Button>
        <Button {...args} variant="light">
          loading
        </Button>
        <Button {...args} variant="flat">
          loading
        </Button>
        <Button {...args} variant="ghost">
          loading
        </Button>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <Button
          {...args}
          spinnerPlacement="end"
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }}
        >
          Promise loading
        </Button>
      </div>
    </>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button color="primary" leftIcon={<CheckCircleIcon className="h-5 w-5" />}>
        Like
      </Button>
      <Button color="danger" variant="bordered" leftIcon={<CheckCircleIcon className="h-5 w-5" />}>
        Send
      </Button>
      <Button size="sm" leftIcon={<InfoIcon className="h-4 w-4" />}>
        Add
      </Button>
      <Button rightIcon={<InfoIcon className="h-5 w-5" />}>Like</Button>
      <Button isIconOnly color="danger" aria-label="Like">
        <ExclamationCircleFilledIcon className="h-5 w-5" />
      </Button>
      <Button isIconOnly color="secondary" variant="faded" aria-label="Play music">
        <ExclamationCircleFilledIcon className="h-5 w-5" />
      </Button>
    </div>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
      >
        Button
      </Button>
    </div>
  ),
};

// export const Group: Story = {
//   render: (args) => (
//     <div className="flex flex-col items-start gap-4">
//       <ButtonGroup>
//         <Button>One</Button>
//         <Button>Two</Button>
//         <Button>Three</Button>
//       </ButtonGroup>
//       <ButtonGroup isDisabled>
//         <Button>One</Button>
//         <Button>Two</Button>
//         <Button>Three</Button>
//       </ButtonGroup>
//     </div>
//   ),
// };
