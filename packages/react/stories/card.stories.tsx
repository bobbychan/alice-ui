import { card } from '@alice-ui/theme';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/button';
import { Card, CardBody, CardFooter, CardHeader, CardProps } from '../src/card';
import { Image } from '../src/image';
import { Link } from '../src/link';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    shadow: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
    },
    radius: {
      control: {
        type: 'select',
      },
      options: ['none', 'sm', 'md', 'lg'],
    },
    fullWidth: {
      control: {
        type: 'boolean',
      },
    },
    isFooterBlurred: {
      control: {
        type: 'boolean',
      },
    },
    isHoverable: {
      control: {
        type: 'boolean',
      },
    },
    isPressable: {
      control: {
        type: 'boolean',
      },
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
    disableAnimation: {
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

const defaultProps = {
  ...card.defaultVariants,
};

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="max-w-md">
      <CardBody>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
      </CardBody>
    </Card>
  ),
  args: {
    ...defaultProps,
  },
};

export const WithDivider: Story = {
  render: (args) => (
    <Card {...args} className="max-w-md">
      <CardHeader className="border-divider dark:border-divider-dark border-b">
        <strong>Description</strong>
      </CardHeader>
      <CardBody className="py-8">
        <p>The Object constructor creates an object wrapper for the given value.</p>
      </CardBody>
      <CardFooter className="border-divider dark:border-divider-dark border-t">
        <p>When called in a non-constructor context</p>
      </CardFooter>
    </Card>
  ),
  args: {
    ...defaultProps,
  },
};

export const WithFooter: Story = {
  render: (args) => (
    <Card {...args} className="max-w-md p-4">
      <CardHeader className="flex gap-3">
        <Image
          alt="aliceui logo"
          height={34}
          radius="lg"
          src="https://avatars.githubusercontent.com/u/5329193?s=100&v=4"
          width={34}
        />
        <div className="flex flex-col">
          <b className="text-lg">AliceUI</b>
          <p className="text-default-500">https://github.com/bobbychan/alice-ui</p>
        </div>
      </CardHeader>
      <CardBody className="py-2">
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <CardFooter>
        <Link>
          <a href="https://github.com/bobbychan/alice-ui">Visit source code on GitHub.</a>
        </Link>
      </CardFooter>
    </Card>
  ),
  args: {
    ...defaultProps,
  },
};

export const WithAbsImageHeader: Story = {
  render: (args) => (
    <Card {...args} className="max-w-[330px]">
      <CardHeader className="absolute top-2 z-20">
        <div className="flex flex-col">
          <p className="text-xs font-bold text-white/60 uppercase">What to watch</p>
          <p className="text-2xl text-white">Stream the Apple event</p>
        </div>
      </CardHeader>
      <Image
        alt="Card background"
        className="h-[440px] w-full object-cover"
        height={440}
        src="https://images.unsplash.com/photo-1529310399831-ed472b81d589"
        width={330}
      />
    </Card>
  ),
  args: {
    ...defaultProps,
  },
};

export const WithAbsImgHeaderFooter: Story = {
  render: () => (
    <div className="flex space-x-4">
      <Card isFooterBlurred className="col-span-12 h-[300px] w-full sm:col-span-5">
        <CardHeader className="absolute top-1 z-10 flex-col items-start">
          <p className="text-tiny font-bold text-white/60 uppercase">New</p>
          <h4 className="text-2xl font-medium text-black">Acme camera</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 h-full w-full -translate-y-6 scale-125 object-cover"
          src="https://images.unsplash.com/photo-1580428180098-24b353d7e9d9"
        />
        <CardFooter className="absolute bottom-0 z-10 justify-between border-t-1 border-zinc-100/50 bg-white/30">
          <div>
            <p className="text-tiny text-black">Available soon.</p>
            <p className="text-tiny text-black">Get notified.</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Notify Me
          </Button>
        </CardFooter>
      </Card>
      <Card isFooterBlurred className="col-span-12 h-[300px] w-full sm:col-span-7">
        <CardHeader className="absolute top-1 z-10 flex-col items-start">
          <p className="text-tiny font-bold text-white/60 uppercase">Pro anywhere</p>
          <h4 className="text-xl font-medium text-white/90">it’s our most portable pro laptop</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2"
        />
        <CardFooter className="border-default-600 dark:border-default-100 absolute bottom-0 z-10 border-t-1 bg-black/40">
          <div className="flex flex-grow items-center gap-2">
            <Image
              alt="Breathing app icon"
              className="h-10 w-10 rounded-full bg-black"
              src="https://avatars.githubusercontent.com/u/5329193?s=100&v=4"
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">MacBook Pro</p>
              <p className="text-tiny text-white/60">Apple M2 chip</p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Buy
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
  args: {
    ...defaultProps,
  },
};

export const CoverImg: Story = {
  render: (args) => (
    <div className="grid max-w-[900px] grid-cols-12 grid-rows-2 gap-2 px-8">
      <Card {...args} className="col-span-12 sm:col-span-4">
        <CardHeader className="absolute top-1 z-10 flex-col !items-start">
          <p className="text-xs font-bold text-white/60 uppercase">What to watch</p>
          <h4 className="text-lg font-medium text-white">Stream the Acme event</h4>
        </CardHeader>
        <img
          alt="Card background"
          className="h-full w-full object-cover"
          src="https://nextui.org/images/card-example-4.jpeg"
        />
      </Card>
      <Card {...args} className="col-span-12 sm:col-span-4">
        <CardHeader className="absolute top-1 z-10 flex-col !items-start">
          <p className="text-xs font-bold text-white/60 uppercase">Plant a tree</p>
          <h4 className="text-lg font-medium text-white">Contribute to the planet</h4>
        </CardHeader>
        <img
          alt="Card background"
          className="h-full w-full object-cover"
          src="https://nextui.org/images/card-example-3.jpeg"
        />
      </Card>
      <Card {...args} className="col-span-12 sm:col-span-4">
        <CardHeader className="absolute top-1 z-10 flex-col !items-start">
          <p className="text-xs font-bold text-white/60 uppercase">Supercharged</p>
          <h4 className="text-lg font-medium text-white">Creates beauty like a beast</h4>
        </CardHeader>
        <img
          alt="Card background"
          className="h-full w-full object-cover"
          src="https://nextui.org/images/card-example-2.jpeg"
        />
      </Card>
      <Card {...args} isFooterBlurred className="col-span-12 h-[400px] w-full sm:col-span-5">
        <CardHeader className="absolute top-1 z-10 flex-col items-start">
          <p className="text-xs font-bold text-white/60 uppercase">New</p>
          <h4 className="text-2xl font-medium text-black">Acme camera</h4>
        </CardHeader>
        <img
          alt="Card example background"
          className="h-full w-full -translate-y-10 scale-125 object-cover"
          src="https://nextui.org/images/card-example-6.jpeg"
        />
        <CardFooter className="absolute bottom-0 z-10 justify-between border-t border-slate-300 bg-white/30">
          <div>
            <p className="text-xs text-black">Available soon.</p>
            <p className="text-xs text-black">Get notified.</p>
          </div>
          <Button color="secondary" radius="full" size="sm" variant="flat">
            Notify Me
          </Button>
        </CardFooter>
      </Card>
      <Card {...args} isFooterBlurred className="col-span-12 h-[400px] w-full sm:col-span-7">
        <CardHeader className="absolute top-1 z-10 flex-col items-start">
          <p className="text-xs font-bold text-white/60 uppercase">Your day your way</p>
          <h4 className="text-2xl font-medium text-white/90">Your checklist for better sleep</h4>
        </CardHeader>
        <img
          alt="Relaxing app background"
          className="h-full w-full object-cover"
          src="https://nextui.org/images/card-example-5.jpeg"
        />
        <CardFooter className="border-default-600 dark:border-default-100 absolute bottom-0 z-10 border-t bg-black/40">
          <div className="flex flex-grow items-center gap-2">
            <img
              alt="Breathing app icon"
              className="h-11 w-10 rounded-full bg-black"
              src="https://avatars.githubusercontent.com/u/5329193?s=100&v=4"
            />
            <div className="flex flex-col">
              <p className="text-xs text-white/60">Breathing App</p>
              <p className="text-xs text-white/60">Get a good night&apos;s sleep.</p>
            </div>
          </div>
          <Button radius="full">Get App</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  args: {
    ...defaultProps,
  },
};

export const CenterImg: Story = {
  render: (args) => (
    <Card {...args} className="max-w-fit px-0 py-4">
      <CardHeader className="flex-col !items-start px-4 pt-2 pb-0">
        <p className="text-xs font-bold uppercase">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="text-lg font-bold">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f"
          width={300}
        />
      </CardBody>
    </Card>
  ),
  args: {
    ...defaultProps,
  },
};

const PrimaryActionTemplate = (args: CardProps) => {
  const list = [
    {
      title: 'Orange',
      img: 'https://images.unsplash.com/photo-1557800636-894a64c1696f',
      price: '$5.50',
    },
    {
      title: 'Cherry',
      img: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b',
      price: '$3.00',
    },
    {
      title: 'Orange2',
      img: 'https://images.unsplash.com/photo-1552010099-5dc86fcfaa38',
      price: '$10.00',
    },
    {
      title: 'Banana',
      img: 'https://images.unsplash.com/photo-1528825871115-3581a5387919',
      price: '$5.30',
    },
    {
      title: 'Avocado',
      img: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578',
      price: '$15.70',
    },
    {
      title: 'Strawberry',
      img: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2',
      price: '$8.00',
    },
    {
      title: 'Apple',
      img: 'https://images.unsplash.com/photo-1590005354167-6da97870c757',
      price: '$7.50',
    },
    {
      title: 'Watermelon',
      img: 'https://plus.unsplash.com/premium_photo-1663855531381-f9c100b3c48f',
      price: '$12.20',
    },
  ];

  type ListItem = (typeof list)[number];

  const handlePress = (item: ListItem) => {
    // eslint-disable-next-line no-console
    console.log('item pressed', item);
  };

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {list.map((item, index) => (
        // eslint-disable-next-line no-console
        <Card {...args} key={index} isPressable onPress={() => handlePress(item)}>
          <CardBody className="p-0">
            <img alt={item.title} className="h-[140px] w-full object-cover" src={item.img} />
          </CardBody>
          <CardFooter className="justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export const PrimaryAction = {
  render: PrimaryActionTemplate,

  args: {
    ...defaultProps,
  },
};

const CenterImgWithHeaderTemplate = (args: CardProps) => {
  const list = [
    {
      title: 'Instagram',
      img: 'https://images.unsplash.com/photo-1611262588024-d12430b98920',
    },
    {
      title: 'Youtube',
      img: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868',
    },
    {
      title: 'Ticktok',
      img: 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea',
    },
    {
      title: 'Twitter',
      img: 'https://images.unsplash.com/photo-1611605698335-8b1569810432',
    },
    {
      title: 'Netflix',
      img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
    },
    {
      title: 'Spotify',
      img: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {list.map((item, index) => (
        <div key={index}>
          <Card {...args} isPressable className="h-[200px] w-[200px]">
            <CardHeader className="p-0">
              <h5 className="pt-3 pl-6">{item.title}</h5>
            </CardHeader>
            <CardBody className="h-full justify-center">
              <img alt={item.title} className="w-[180px]" src={item.img} />
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const CenterImgWithHeader = {
  render: CenterImgWithHeaderTemplate,

  args: {
    ...defaultProps,
  },
};
