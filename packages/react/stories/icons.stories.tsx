import * as Icons from '@alice-ui/icons';
import { Meta, StoryObj } from '@storybook/react';
import React, { SVGProps } from 'react';

const meta: Meta<SVGProps<SVGSVGElement>> = {
  title: 'Components/Icons',
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<SVGProps<SVGSVGElement>>;

export const Default: Story = {
  render: () => {
    const iconNames = Object.keys(Icons);

    const iconElements = iconNames.map((iconName, index) => {
      // @ts-ignore
      const Icon = Icons[iconName];
      return (
        <div key={index}>
          <div className="flex h-[8.5rem] items-center justify-center rounded-md border">
            <Icon className="h-10 w-10" />
          </div>
          <div className="mt-3 truncate text-center text-xs">{iconName}</div>
        </div>
      );
    });

    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-4">
        {iconElements}
      </div>
    );
  },
  args: {},
};
