import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { Image, ImageProps } from '../src/image';

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    radius: {
      control: {
        type: 'select',
      },
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    shadow: {
      control: {
        type: 'select',
      },
      options: ['none', 'sm', 'md', 'lg'],
    },
    isZoomed: {
      control: {
        type: 'boolean',
      },
    },
    showSkeleton: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

const defaultProps: ImageProps = {
  src: 'https://images.unsplash.com/photo-1600199922986-ca7cc53bc4fd',
  alt: 'hero image',
};

const LoadingTemplate = (args: ImageProps) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const time = 2500;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, [args.disableSkeleton]);

  return <Image {...args} alt="" isLoading={isLoading} />;
};

export const Default: Story = {
  args: {
    ...defaultProps,
    width: 300,
    height: 200,
  },
  render: (args) => (
    <Image
      {...args}
      src="https://app.requestly.io/delay/3000/https://images.unsplash.com/photo-1691246806224-a6e9dde3678d"
    />
  ),
};

export const Zoomed: Story = {
  args: {
    ...defaultProps,
    width: 300,
    radius: 'lg',
    isZoomed: true,
    src: 'https://images.unsplash.com/photo-1691246806224-a6e9dde3678d',
  },
};

export const AnimatedLoad = {
  args: {
    ...defaultProps,
    disableSkeleton: false,
    width: 200,
    height: 300,
    radius: 'lg',
    src: 'https://app.requestly.io/delay/3000/https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
  },
};

export const Fallback = {
  render: LoadingTemplate,

  args: {
    ...defaultProps,
    width: 200,
    height: 300,
    radius: 'lg',
    src: 'https://app.requestly.io/delay/3000/https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    fallbackSrc: 'https://via.placeholder.com/200x300',
  },
};

export const Skeleton = {
  render: LoadingTemplate,

  args: {
    ...defaultProps,
    width: 300,
    height: 450,
    radius: 'lg',
    src: 'https://app.requestly.io/delay/3000/https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    disableSkeleton: false,
  },
};

// export const WithNextImage = {
//   args: {
//     ...defaultProps,
//     disableSkeleton: false,
//     width: 300,
//     height: 200,
//     radius: 'lg',
//     as: NextImage,
//     src: 'https://app.requestly.io/delay/3000/https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
//   },
// };
