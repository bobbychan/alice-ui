import { modal } from '@alice-ui/theme';
import { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { Button } from '../src/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps } from '../src/modal';

const TemplateContent = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
      hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
      hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
    </p>
    <p>
      Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing.
      Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem
      aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur esse laborum
      eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
    </p>
  </>
);

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', 'full'],
    },
    radius: {
      control: {
        type: 'select',
      },
      options: ['none', 'sm', 'md', 'lg'],
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
type Story = StoryObj<typeof Modal>;

const defaultProps: ModalProps = {
  ...modal.defaultVariants,
};

const Template = (args: ModalProps) => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open dialog</Button>
      <Modal {...args} isDismissable isOpen={isOpen} onOpenChange={setOpen}>
        <ModalContent>
          {({ close }) => (
            <>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalBody>
                <TemplateContent />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={close}>
                  Close
                </Button>
                <Button color="primary" onPress={close}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: Template,

  args: {
    ...defaultProps,
    backdrop: 'blur',
  },
};
