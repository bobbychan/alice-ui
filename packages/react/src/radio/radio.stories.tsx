import { CheckCircleIcon, InfoIcon } from '@alice-ui/icons';
import { Meta, StoryObj } from '@storybook/react';

import { clsx } from '@alice-ui/shared-utils';
import { button, radio } from '@alice-ui/theme';
import React, { useContext } from 'react';
import { RadioGroupStateContext } from 'react-aria-components';
import { Radio, RadioGroup, RadioGroupProps, RadioProps } from '.';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: {
        type: 'select',
      },
      options: ['vertical', 'horizontal'],
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const defaultProps = {
  ...radio.defaultVariants,
  label: 'Options',
};

const Template = (args: RadioGroupProps) => {
  const radioProps = args.description
    ? {
        a: {
          description: 'Description for Option A',
        },
        b: {
          description: 'Description for Option B',
        },
        c: {
          description: 'Description for Option C',
        },
        d: {
          description: 'Description for Option D',
        },
      }
    : {
        a: {},
        b: {},
        c: {},
        d: {},
      };

  const items = (
    <>
      <Radio value="A" {...radioProps.a}>
        Option A
      </Radio>
      <Radio value="B" {...radioProps.b}>
        Option B
      </Radio>
      <Radio value="C" {...radioProps.c}>
        Option C
      </Radio>
      <Radio value="D" {...radioProps.d}>
        Option D
      </Radio>
    </>
  );
  return args.isRequired ? (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Submitted!');
      }}
    >
      <RadioGroup {...args} aria-label="test">
        {items}
      </RadioGroup>
      <button className={button({ color: 'primary' })} type="submit">
        Submit
      </button>
    </form>
  ) : (
    <RadioGroup {...args} aria-label="test">
      {items}
    </RadioGroup>
  );
};

const InvalidTemplate = (args: RadioGroupProps) => {
  const [isInvalid, setIsInvalid] = React.useState<boolean>(true);

  const radioProps = args.description
    ? {
        a: {
          description: 'Description for Option A',
        },
        b: {
          description: 'Description for Option B',
        },
        c: {
          description: 'Description for Option C',
        },
        d: {
          description: 'Description for Option D',
        },
      }
    : {
        a: {},
        b: {},
        c: {},
        d: {},
      };

  const items = (
    <>
      <Radio value="A" {...radioProps.a}>
        Option A
      </Radio>
      <Radio value="B" {...radioProps.b}>
        Option B
      </Radio>
      <Radio value="C" {...radioProps.c}>
        Option C
      </Radio>
      <Radio value="D" {...radioProps.d}>
        Option D
      </Radio>
    </>
  );

  const validOptions = ['C', 'B'];

  return args.isRequired ? (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Submitted!');
      }}
    >
      <RadioGroup
        {...args}
        isInvalid={isInvalid}
        onChange={(value) => setIsInvalid(!validOptions.includes(value))}
      >
        {items}
      </RadioGroup>
      <button className={button({ color: 'primary' })} type="submit">
        Submit
      </button>
    </form>
  ) : (
    <RadioGroup {...args}>{items}</RadioGroup>
  );
};

const ControlledTemplate = (args: RadioGroupProps) => {
  const [selectedItem, setSelectedItem] = React.useState<string>('london');

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('isSelected:', selectedItem);
  }, [selectedItem]);

  return (
    <div className="flex flex-col gap-2">
      <RadioGroup label="Select city" value={selectedItem} onChange={setSelectedItem} {...args}>
        <Radio value="buenos-aires">Buenos Aires</Radio>
        <Radio value="sydney">Sydney</Radio>
        <Radio value="london">London</Radio>
        <Radio value="tokyo">Tokyo</Radio>
      </RadioGroup>
      <p className="text-default-500">Selected: {selectedItem}</p>
    </div>
  );
};

export const Default: Story = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const IsDisabled = {
  render: Template,

  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const DefaultChecked = {
  render: Template,

  args: {
    ...defaultProps,
    defaultValue: 'C',
  },
};

export const IsRequired = {
  render: Template,

  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const IsInvalid = {
  render: InvalidTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
    description: 'Please select an option',
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    isRequired: true,
    validationState: 'invalid',
    errorMessage: 'The selected option is invalid',
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

const CustomRadio = (props: RadioProps) => {
  const { children, ...otherProps } = props;

  const groupState = useContext(RadioGroupStateContext);

  const isSelected = groupState.selectedValue === otherProps.value;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: clsx(
          'group m-0 inline-flex items-center justify-between hover:bg-content2 flex-row-reverse max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4',
          {
            'border-primary': isSelected,
          },
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export const CustomWithClassNames = () => {
  return (
    <RadioGroup label="Plans">
      <CustomRadio
        value="free"
        control={({ isSelected }) =>
          isSelected ? <CheckCircleIcon className="h-6 w-6" /> : <InfoIcon className="h-6 w-6" />
        }
      >
        Free
      </CustomRadio>
      <CustomRadio value="pro">Pro</CustomRadio>
      <CustomRadio value="enterprise">Enterprise</CustomRadio>
    </RadioGroup>
  );
};
