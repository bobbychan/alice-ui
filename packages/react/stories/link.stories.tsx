import { VariantProps, tv } from '@alice-ui/theme';
import { Meta, StoryObj } from '@storybook/react';

import { Link, LinkProps } from '../src/link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
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
      options: ['sm', 'md', 'lg'],
    },
    underline: {
      control: {
        type: 'select',
      },
      options: ['none', 'hover', 'always', 'active', 'focus'],
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

const children = `"First solve the problem. Then, write the code." - Jon Johnson.`;

const defaultProps = {
  isDisabled: false,
  showAnchorIcon: true,
  children,
};

const Template = (args: LinkProps) => (
  <div className="flex items-center gap-4">
    <Link {...args} color="foreground">
      <a href="#top">Default link</a>
    </Link>
    <Link {...args} color="primary">
      <a href="#top">Primary</a>
    </Link>
    <Link {...args} color="secondary">
      <a href="#top">Secondary</a>
    </Link>
    <Link {...args} color="success">
      Success
    </Link>
    <Link {...args} color="warning">
      Warning
    </Link>
    <Link {...args} color="danger">
      Danger
    </Link>
  </div>
);

export const Colors: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Link
        {...args}
        color="foreground"
        style={({ isPressed }) => (isPressed ? { color: 'red' } : { color: 'green' })}
      >
        <a href="#top">Default link</a>
      </Link>
      <Link {...args} color="primary">
        <a href="#top">Primary</a>
      </Link>
      <Link {...args} color="secondary">
        <a href="#top">Secondary</a>
      </Link>
      <Link {...args} color="success">
        Success
      </Link>
      <Link {...args} color="warning">
        Warning
      </Link>
      <Link {...args} color="danger">
        Danger
      </Link>
    </div>
  ),
  args: {
    ...defaultProps,
    isDisabled: false,
    color: 'foreground',
    size: 'md',
  },
};

export const Underline: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Link {...args} underline="none">
        <a href="#top">Default link</a>
      </Link>
      <Link {...args} underline="hover">
        <a href="#top">Primary</a>
      </Link>
      <Link {...args} underline="always">
        <a href="#top">Secondary</a>
      </Link>
      <Link {...args} underline="active">
        Success
      </Link>
      <Link {...args} underline="focus">
        Warning
      </Link>
    </div>
  ),
  args: {
    ...defaultProps,
    isDisabled: false,
    color: 'primary',
    size: 'md',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    ...defaultProps,
    isDisabled: true,
    size: 'md',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Link {...args} size="sm">
        <a href="#top">Small</a>
      </Link>
      <Link {...args} size="md">
        <a href="#top">Medium</a>
      </Link>
      <Link {...args} size="lg">
        <a href="#top">Large</a>
      </Link>
    </div>
  ),
  args: {
    ...defaultProps,
    isDisabled: false,
    color: 'primary',
    size: 'md',
  },
};

export const BlockLink: Story = {
  render: Template,
  args: {
    isBlock: true,
    isDisabled: false,
    size: 'md',
  },
};

const customLink = tv({
  variants: {
    color: {
      teal: 'text-teal-600',
    },
    isLink: {
      true: "before:content-['👉'] before:mr-1",
    },
  },
});

type MyLinkVariantProps = VariantProps<typeof customLink>;

type MyLinkProps = MyLinkVariantProps & Omit<LinkProps, 'color'>;

const MyLink = (props: MyLinkProps) => {
  const { isLink, color, ...otherProps } = props;

  return <Link className={customLink({ color, isLink })} {...otherProps} />;
};

export const CustomVariant = () => {
  return (
    <MyLink isLink color="teal">
      Visit out new Store
    </MyLink>
  );
};
