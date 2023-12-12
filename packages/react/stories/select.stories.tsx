import { button, select } from '@alice-ui/theme';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Collection } from 'react-aria-components';
import { Select, SelectItem, SelectProps, SelectSection } from '../src/select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['flat', 'faded', 'bordered', 'underlined'],
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
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

const defaultProps: SelectProps<object> = {
  ...select.defaultVariants,
  children: null,
};

type Item = {
  label: string;
  value?: string;
  description?: string;
};

const itemsData: Item[] = [
  { label: 'Cat', value: 'cat', description: 'The second most popular pet in the world' },
  { label: 'Dog', value: 'dog', description: 'The most popular pet in the world' },
  { label: 'Elephant', value: 'elephant', description: 'The largest land animal' },
  { label: 'Lion', value: 'lion', description: 'The king of the jungle' },
  { label: 'Tiger', value: 'tiger', description: 'The largest cat species' },
  { label: 'Giraffe', value: 'giraffe', description: 'The tallest land animal' },
  {
    label: 'Dolphin',
    value: 'dolphin',
    description: 'A widely distributed and diverse group of aquatic mammals',
  },
  { label: 'Penguin', value: 'penguin', description: 'A group of aquatic flightless birds' },
  { label: 'Zebra', value: 'zebra', description: 'A several species of African equids' },
  {
    label: 'Shark',
    value: 'shark',
    description: 'A group of elasmobranch fish characterized by a cartilaginous skeleton',
  },
  {
    label: 'Whale',
    value: 'whale',
    description: 'Diverse group of fully aquatic placental marine mammals',
  },
  { label: 'Otter', value: 'otter', description: 'A carnivorous mammal in the subfamily Lutrinae' },
  { label: 'Crocodile', value: 'crocodile', description: 'A large semiaquatic reptile' },
];

const items = itemsData.map((item) => (
  <SelectItem key={item.value} id={item.value}>
    {item.label}
  </SelectItem>
));

type SectionItem = {
  name: string;
  id: string;
  children: Item[];
};

const sectionItems: SectionItem[] = [
  {
    name: 'Fruit',
    id: 'fruit',
    children: [
      { label: 'Apple' },
      { label: 'Banana' },
      { label: 'Orange' },
      { label: 'Honeydew' },
      { label: 'Grapes' },
    ],
  },
  {
    id: 'vegetable',
    name: 'Vegetable',
    children: [
      { label: 'Cabbage' },
      { label: 'Broccoli' },
      { label: 'Carrots' },
      { label: 'Lettuce' },
      { label: 'Spinach' },
      { label: 'Bok Choy' },
    ],
  },
];

const Template = (args: SelectProps<object>) => (
  <Select label="Favorite Animal" className="max-w-xs" {...args}>
    <SelectItem id="aardvark">Aardvark</SelectItem>
    <SelectItem id="cat">Cat</SelectItem>
    <SelectItem id="dog">Dog</SelectItem>
    <SelectItem id="kangaroo">Kangaroo</SelectItem>
    <SelectItem id="panda">Panda</SelectItem>
    <SelectItem id="whale">Whale</SelectItem>
    <SelectItem id="shark">Shark</SelectItem>
    <SelectItem id="zebra">Zebra</SelectItem>
  </Select>
);

const DynamicTemplate = (args: SelectProps<SectionItem>) => {
  return (
    <Select
      label="Preferred fruit or vegetable"
      className="max-w-xs"
      items={sectionItems}
      {...args}
    >
      {(section) => (
        <SelectSection id={section.id} title={section.name}>
          <Collection items={section.children}>
            {(item) => <SelectItem id={item.label}>{item.label}</SelectItem>}
          </Collection>
        </SelectSection>
      )}
    </Select>
  );
};

const RequiredTemplate = (args: SelectProps<object>) => {
  return (
    <form
      className="flex w-full max-w-xs flex-col items-end gap-4"
      onSubmit={(e) => {
        alert(`Submitted value: ${(e.target as HTMLFormElement)['favorite-animal'].value}`);
        e.preventDefault();
      }}
    >
      <Select label="Favorite Animal" name="favorite-animal" {...args}>
        {items}
      </Select>
      <button className={button({ className: 'max-w-fit' })} type="submit">
        Submit
      </button>
    </form>
  );
};

export const Static: Story = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const Dynamic = {
  render: DynamicTemplate,

  args: {
    ...defaultProps,
  },
};

export const Disabled: Story = {
  render: Template,

  args: {
    ...defaultProps,
    selectedKey: 'panda',
    variant: 'faded',
    isDisabled: true,
  },
};

export const DisabledOptions: Story = {
  render: Template,

  args: {
    ...defaultProps,
    disabledKeys: ['cat', 'dog'],
  },
};

export const Required: Story = {
  render: RequiredTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const IsInvalid: Story = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    variant: 'bordered',
    defaultSelectedKey: 'panda',
    errorMessage: 'Please select a valid animal',
  },
};

export const WithDescription: Story = {
  render: Template,

  args: {
    ...defaultProps,
    description: 'Select your favorite animal',
  },
};

export const IsLoading: Story = {
  render: Template,

  args: {
    ...defaultProps,
    isLoading: true,
    spinnerProps: {
      color: 'primary',
    },
  },
};
