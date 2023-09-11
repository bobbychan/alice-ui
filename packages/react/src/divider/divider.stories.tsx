import { divider } from '@alice-ui/theme';
import { Meta, StoryObj } from '@storybook/react';

import { Divider, DividerProps } from '.';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    orientation: {
      control: {
        type: 'select',
      },
      options: ['horizontal', 'vertical'],
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
type Story = StoryObj<typeof Divider>;

const defaultProps = {
  ...divider.defaultVariants,
};

const Template = (args: DividerProps) => (
  <div className="max-w-md">
    <div className="space-y-1">
      <h4 className="text-base font-medium">AliceUI Components</h4>
      <p className="text-default-400 text-sm">Beautiful, fast and modern React UI library.</p>
    </div>
    <Divider className="my-4 h-px" />
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Divider {...args} orientation="vertical" />
      <div>Docs</div>
      <Divider {...args} orientation="vertical" />
      <div>Source</div>
    </div>
  </div>
);

export const Default: Story = {
  render: Template,

  args: {
    ...defaultProps,
  },
};
