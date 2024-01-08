import { drawer } from '@alice-ui/theme';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../src/button';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerProps,
} from '../src/drawer';

const TemplateContent = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
      hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
    </p>
  </>
);

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    placement: {
      control: {
        type: 'select',
      },
      options: ['top', 'right', 'bottom', 'left'],
    },
    backdrop: {
      control: {
        type: 'select',
      },
      options: ['transparent', 'blur', 'opaque'],
    },
    isDismissable: {
      control: {
        type: 'boolean',
      },
    },
    isKeyboardDismissDisabled: {
      control: {
        type: 'boolean',
      },
    },
    children: {
      control: {
        disable: true,
      },
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
type Story = StoryObj<typeof Drawer>;

const defaultProps: DrawerProps = {
  ...drawer.defaultVariants,
};

const Template = (args: DrawerProps) => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open drawer</Button>
      <Drawer {...args} isDismissable isOpen={isOpen} onOpenChange={setOpen}>
        <DrawerContent>
          {({ close }) => (
            <>
              <DrawerCloseButton />
              <DrawerHeader>Drawer Title</DrawerHeader>
              <DrawerBody>
                <TemplateContent />
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={close}>
                  Close
                </Button>
                <Button color="primary" onPress={close}>
                  Action
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const Left: Story = {
  render: Template,

  args: {
    ...defaultProps,
    backdrop: 'blur',
    placement: 'left',
    className: 'w-[360px]',
  },
};

export const Right: Story = {
  render: Template,

  args: {
    ...defaultProps,
    backdrop: 'opaque',
    placement: 'right',
    className: 'w-[360px]',
  },
};

export const Top: Story = {
  render: Template,

  args: {
    ...defaultProps,
    backdrop: 'blur',
    placement: 'top',
    className: 'h-[300px]',
  },
};

export const Bottom: Story = {
  render: Template,

  args: {
    ...defaultProps,
    backdrop: 'blur',
    placement: 'bottom',
    className: 'h-[300px]',
  },
};
