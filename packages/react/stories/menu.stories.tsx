import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import type { Selection } from 'react-aria-components';
import { Collection, MenuTrigger } from 'react-aria-components';
import { Button } from '../src/button';
import { Divider } from '../src/divider';
import { Menu, MenuItem, MenuProps, MenuSection } from '../src/menu';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['solid', 'bordered', 'flat', 'faded'],
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
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
type Story = StoryObj<typeof Menu>;

const defaultProps: MenuProps<object> = {};

const Template = (args: MenuProps<object>) => {
  return (
    <MenuTrigger>
      <Button color="primary" aria-label="Menu">
        Menu
      </Button>
      <Menu {...args}>
        <MenuItem id="new">New…</MenuItem>
        <MenuItem id="open">Open…</MenuItem>
        <Divider className="my-1" />
        <MenuItem id="save" shortcut="⌘⇧S">
          Save
        </MenuItem>
        <MenuItem id="save-as" className="text-danger" color="danger" shortcut="⌘⇧D">
          Save as…
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
};

const WithDescriptionTemplate = (args: MenuProps<object>) => {
  return (
    <MenuTrigger>
      <Button color="primary" aria-label="Menu">
        Menu
      </Button>
      <Menu {...args}>
        <MenuItem id="new" description="Create a new file" shortcut="⌘N">
          New file
        </MenuItem>
        <MenuItem id="copy" description="Copy the file link" shortcut="⌘C">
          Copy link
        </MenuItem>
        <MenuItem id="edit" description="Allows you to edit the file" shortcut="⌘⇧E">
          Edit file
        </MenuItem>
        <MenuItem
          id="delete"
          description="Permanently delete the file"
          shortcut="⌘⇧D"
          className="text-danger"
          color="danger"
        >
          Delete file
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
};

const SelectionTemplate = (args: MenuProps<object>) => {
  const [selected, setSelected] = React.useState<Selection>(new Set(['center']));

  const selectedValue = React.useMemo(
    () =>
      Array.from(selected)
        .map((key) => key.toString())
        .join(', '),
    [selected],
  );

  return (
    <MenuTrigger>
      <Button color="primary" aria-label="Menu">
        {selectedValue}
      </Button>
      <Menu
        {...args}
        disallowEmptySelection
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <MenuItem id="left">Left</MenuItem>
        <MenuItem id="center">Center</MenuItem>
        <MenuItem id="right">Right</MenuItem>
      </Menu>
    </MenuTrigger>
  );
};

const WithSectionsTemplate = (args: MenuProps<object>) => (
  <MenuTrigger>
    <Button color="primary" aria-label="Menu">
      Menu
    </Button>
    <Menu {...args}>
      <MenuSection title="Actions">
        <MenuItem id="new" description="Create a new file" shortcut="⌘N">
          New file
        </MenuItem>
        <MenuItem id="copy" description="Copy the file link" shortcut="⌘C">
          Copy link
        </MenuItem>
        <MenuItem id="edit" description="Allows you to edit the file" shortcut="⌘⇧E">
          Edit file
        </MenuItem>
      </MenuSection>
      <Divider className="mb-2" />
      <MenuSection title="Danger zone">
        <MenuItem
          id="delete"
          description="Permanently delete the file"
          shortcut="⌘⇧D"
          className="text-danger"
          color="danger"
        >
          Delete file
        </MenuItem>
      </MenuSection>
    </Menu>
  </MenuTrigger>
);

const DynamicTemplate = (args: MenuProps<object>) => {
  let [selected, setSelected] = React.useState<Selection>(new Set([1, 3]));

  let openWindows = [
    {
      name: 'Left Panel',
      id: 'left',
      children: [{ id: 1, name: 'Final Copy (1)' }],
    },
    {
      name: 'Right Panel',
      id: 'right',
      children: [
        { id: 2, name: 'index.ts' },
        { id: 3, name: 'package.json' },
        { id: 4, name: 'license.txt' },
      ],
    },
  ];

  return (
    <MenuTrigger>
      <Button color="primary" aria-label="Menu">
        Menu
      </Button>
      <Menu
        {...args}
        items={openWindows}
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        {(section) => (
          <MenuSection title={section.name}>
            <Collection items={section.children}>
              {(item) => <MenuItem>{item.name}</MenuItem>}
            </Collection>
          </MenuSection>
        )}
      </Menu>
    </MenuTrigger>
  );
};

export const Static: Story = {
  render: Template,

  args: {
    ...defaultProps,
    onAction: alert,
  },
};

export const Dynamic: Story = {
  render: DynamicTemplate,

  args: {
    ...defaultProps,
  },
};

export const DisabledItems: Story = {
  render: Template,

  args: {
    ...defaultProps,
    disabledKeys: ['save', 'save-as'],
    onAction: alert,
  },
};

export const WithDescription: Story = {
  render: WithDescriptionTemplate,

  args: {
    ...defaultProps,
    variant: 'flat',
    color: 'secondary',
  },
};

export const SingleSelection: Story = {
  render: SelectionTemplate,

  args: {
    ...defaultProps,
    selectionMode: 'single',
  },
};

export const MultipleSelection: Story = {
  render: SelectionTemplate,

  args: {
    ...defaultProps,
    selectionMode: 'multiple',
  },
};

export const Links: Story = {
  render: (args) => (
    <MenuTrigger>
      <Button color="primary" aria-label="Menu">
        Links
      </Button>
      <Menu {...args}>
        <MenuItem href="https://adobe.com/" target="_blank">
          Adobe
        </MenuItem>
        <MenuItem href="https://apple.com/" target="_blank">
          Apple
        </MenuItem>
        <MenuItem href="https://google.com/" target="_blank">
          Google
        </MenuItem>
        <MenuItem href="https://microsoft.com/" target="_blank">
          Microsoft
        </MenuItem>
      </Menu>
    </MenuTrigger>
  ),

  args: {
    ...defaultProps,
    variant: 'faded',
    color: 'primary',
  },
};

export const WithSections: Story = {
  render: WithSectionsTemplate,

  args: {
    ...defaultProps,
    variant: 'flat',
    color: 'primary',
  },
};
