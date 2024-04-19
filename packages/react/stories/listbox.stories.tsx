import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import type { Selection } from 'react-aria-components';
import { Collection } from 'react-aria-components';
import { Divider } from '../src/divider';
import { ListBox, ListBoxItem, ListBoxProps, ListBoxSection } from '../src/listbox';

const meta: Meta<typeof ListBox> = {
  title: 'Components/ListBox',
  component: ListBox,
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
type Story = StoryObj<typeof ListBox>;

const defaultProps: ListBoxProps<object> = {
  'aria-label': 'Actions',
  className:
    'max-w-[260px] border px-1 py-2 rounded-small border-default-200 dark:border-default-100',
};

const Template = (args: ListBoxProps<object>) => {
  return (
    <ListBox {...args}>
      <ListBoxItem id="new" textValue="new">
        New file
      </ListBoxItem>
      <ListBoxItem id="copy" textValue="copy">
        Copy link
      </ListBoxItem>
      <ListBoxItem id="edit" textValue="edit">
        Edit file
      </ListBoxItem>
      <ListBoxItem id="delete" textValue="delete" className="text-danger" color="danger">
        Delete file
      </ListBoxItem>
    </ListBox>
  );
};

const WithDescriptionTemplate = (args: ListBoxProps<object>) => {
  return (
    <ListBox {...args}>
      <ListBoxItem id="new" description="Create a new file">
        New file
      </ListBoxItem>
      <ListBoxItem id="copy" description="Copy the file link">
        Copy link
      </ListBoxItem>
      <ListBoxItem id="edit" description="Allows you to edit the file">
        Edit file
      </ListBoxItem>
      <ListBoxItem
        id="delete"
        description="Permanently delete the file"
        className="text-danger"
        color="danger"
      >
        Delete file
      </ListBoxItem>
    </ListBox>
  );
};

const SelectionTemplate = (args: ListBoxProps<object>) => {
  const [selected, setSelected] = React.useState<Selection>(new Set(['center']));

  return (
    <ListBox
      {...args}
      disallowEmptySelection
      selectedKeys={selected}
      onSelectionChange={setSelected}
    >
      <ListBoxItem id="left" textValue="left">
        Left
      </ListBoxItem>
      <ListBoxItem id="center" textValue="center">
        Center
      </ListBoxItem>
      <ListBoxItem id="right" textValue="right">
        Right
      </ListBoxItem>
    </ListBox>
  );
};

const WithSectionsTemplate = (args: ListBoxProps<object>) => (
  <ListBox {...args}>
    <ListBoxSection title="Actions">
      <ListBoxItem id="new" description="Create a new file">
        New file
      </ListBoxItem>
      <ListBoxItem id="copy" description="Copy the file link">
        Copy link
      </ListBoxItem>
      <ListBoxItem id="edit" description="Allows you to edit the file">
        Edit file
      </ListBoxItem>
    </ListBoxSection>
    <Divider className="mb-2" />
    <ListBoxSection title="Danger zone">
      <ListBoxItem
        id="delete"
        description="Permanently delete the file"
        className="text-danger"
        color="danger"
      >
        Delete file
      </ListBoxItem>
    </ListBoxSection>
  </ListBox>
);

const DynamicTemplate = (args: ListBoxProps<object>) => {
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
    <ListBox
      {...args}
      items={openWindows}
      selectionMode="multiple"
      selectedKeys={selected}
      onSelectionChange={setSelected}
    >
      {(section) => (
        <ListBoxSection title={section.name}>
          <Collection items={section.children}>
            {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
          </Collection>
        </ListBoxSection>
      )}
    </ListBox>
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
    disabledKeys: ['edit', 'delete'],
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
    <ListBox {...args}>
      <ListBoxItem href="https://adobe.com/" target="_blank">
        Adobe
      </ListBoxItem>
      <ListBoxItem href="https://apple.com/" target="_blank">
        Apple
      </ListBoxItem>
      <ListBoxItem href="https://google.com/" target="_blank">
        Google
      </ListBoxItem>
      <ListBoxItem href="https://microsoft.com/" target="_blank">
        Microsoft
      </ListBoxItem>
    </ListBox>
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
    selectionMode: 'single',
  },
};
