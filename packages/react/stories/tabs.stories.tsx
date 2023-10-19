import { MoonFilledIcon, SunFilledIcon } from '@alice-ui/icons';
import { tabs } from '@alice-ui/theme';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Collection } from 'react-aria-components';
import { Tab, TabList, TabPanel, Tabs, TabsProps } from '../src/tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['solid', 'underlined', 'bordered', 'light'],
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
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const defaultProps: TabsProps = {
  ...tabs.defaultVariants,
};

const StaticTemplate = (args: TabsProps) => (
  <Tabs {...args}>
    <TabList aria-label="History of Ancient Rome">
      <Tab id="FoR">Founding of Rome</Tab>
      <Tab id="MaR">Monarchy and Republic</Tab>
      <Tab id="Emp">Empire</Tab>
    </TabList>
    <TabPanel id="FoR">Arma virumque cano, Troiae qui primus ab oris.</TabPanel>
    <TabPanel id="MaR">Senatus Populusque Romanus.</TabPanel>
    <TabPanel id="Emp">Alea jacta est.</TabPanel>
  </Tabs>
);

type Item = {
  id: string;
  label: string;
  content?: React.ReactNode;
};

const DynamicTemplate = (args: TabsProps) => {
  let tabs: Item[] = [
    {
      id: 'world',
      label: 'World',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 'ny',
      label: 'N.Y.',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non diam id libero rutrum aliquam. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. ',
    },
    {
      id: 'business',
      label: 'Business',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non diam id libero rutrum aliquam. Sed eget nunc vitae nisl aliquam aliquet.',
    },
    {
      id: 'arts',
      label: 'Arts',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non diam id libero rutrum aliquam. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. ',
    },
    {
      id: 'science',
      label: 'Science',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non diam id libero rutrum aliquam. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. ',
    },
  ];

  return (
    <Tabs {...args}>
      <TabList aria-label="Dynamic tabs" items={tabs}>
        {(item) => <Tab>{item.label}</Tab>}
      </TabList>
      <Collection items={tabs}>{(item) => <TabPanel>{item.content}</TabPanel>}</Collection>
    </Tabs>
  );
};

const WithIconsTemplate = (args: TabsProps) => (
  <Tabs {...args}>
    <TabList aria-label="History of Ancient Rome">
      <Tab id="sun">
        <div className="flex items-center space-x-2">
          <SunFilledIcon />
          <span>Sunshine</span>
        </div>
      </Tab>
      <Tab id="moon">
        <div className="flex items-center space-x-2">
          <MoonFilledIcon />
          <span>Moonlight</span>
        </div>
      </Tab>
    </TabList>
    <TabPanel id="sun">
      Sunshine refers to the natural light emitted by the sun that reaches the Earth&apos;s surface.
      It plays a vital role in our daily lives, providing both light and warmth. Sunshine supports
      plant growth and has a positive impact on our mood and well-being.
    </TabPanel>
    <TabPanel id="moon">
      Moonlight refers to the light that is reflected from the Moon and reaches the Earth&apos;s
      surface during the night when the Moon is visible. It is a softer and dimmer light compared to
      sunlight.
    </TabPanel>
  </Tabs>
);

export const Static: Story = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    classNames: {
      panel: 'p-6 border border-foreground mt-4',
    },
  },
};

export const Dynamic: Story = {
  render: DynamicTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithIcon: Story = {
  render: WithIconsTemplate,

  args: {
    ...defaultProps,
    fullWidth: true,
    variant: 'bordered',
    color: 'secondary',
  },
};
