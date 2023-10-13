import { MoonFilledIcon, SunFilledIcon } from '@alice-ui/icons';
import { clsx } from '@alice-ui/shared-utils';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Switch, SwitchProps } from '../src/switch';
import { SwitchThumbIconProps } from '../src/switch/switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
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
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

const defaultProps: SwitchProps = {
  size: 'md',
  color: 'primary',
};

const ControlledTemplate = (args: SwitchProps) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2">
      <Switch {...args} isSelected={isSelected} onChange={setIsSelected} />
      <p className="text-default-500">Selected: {isSelected ? 'true' : 'false'}</p>
    </div>
  );
};

const CustomWithClassNamesTemplate = (args: SwitchProps) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2">
      <Switch
        classNames={{
          base: clsx(
            'inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
            {
              'border-primary': isSelected,
            },
          ),
        }}
        isSelected={isSelected}
        size="lg"
        onChange={setIsSelected}
        {...args}
      >
        <div className="flex flex-col gap-1">
          <p className="text-base">Enable early access</p>
          <p className="text-default-400 text-xs">
            Get access to new features before they are released.
          </p>
        </div>
      </Switch>
      <p className="text-default-500">Selected: {isSelected ? 'true' : 'false'}</p>
    </div>
  );
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Switch {...args}>{({ isSelected }) => (isSelected ? 'Checked' : 'Unchecked')}</Switch>
    </div>
  ),
};

export const IsReadOnly = {
  args: {
    ...defaultProps,
    isReadOnly: true,
    defaultSelected: true,
  },
};

export const WithLabel = {
  args: {
    ...defaultProps,
    children: 'Bluetooth',
  },
};

export const WiththumbIcon: Story = {
  args: {
    ...defaultProps,
    size: 'lg',
    thumbIcon: (props: SwitchThumbIconProps) =>
      props.isSelected ? (
        <SunFilledIcon className={props.className} />
      ) : (
        <MoonFilledIcon className={props.className} />
      ),
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithClassNames = {
  render: CustomWithClassNamesTemplate,

  args: {
    ...defaultProps,
  },
};
