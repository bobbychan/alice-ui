'use client';

import { ChevronDownIcon } from '@alice-ui/icons';
import { clsx } from '@alice-ui/shared-utils';
import { SelectSlots, SelectVariantProps, SlotsToClasses, select } from '@alice-ui/theme';
import { ReactElement, ReactNode, cloneElement, useMemo } from 'react';
import type { Placement } from 'react-aria';
import type { SelectProps as AriaSelectProps, PopoverProps } from 'react-aria-components';
import {
  Select as AriaSelect,
  Button,
  Label,
  Popover,
  SelectValue,
  Text,
} from 'react-aria-components';
import { ListBox, ListBoxProps } from '../listbox';
import { Spinner, SpinnerProps } from '../spinner';

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, 'children'>,
    SelectVariantProps {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  placement?: Placement;
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
  /**
   * The icon that represents the select open state. Usually a chevron icon.
   */
  selectorIcon?: ReactNode;
  /**
   * Element to be rendered in the left side of the select.
   */
  startContent?: React.ReactNode;
  /**
   * Element to be rendered in the right side of the select.
   */
  endContent?: ReactNode;
  isLoading?: boolean;
  /**
   * Props to be passed to the spinner component.
   *
   * @default { size: "sm" , color: "current" }
   */
  spinnerProps?: Partial<SpinnerProps>;
  /**
   * Props to be passed to the popover component.
   *
   * @default { placement: "bottom", triggerScaleOnOpen: false, offset: 5 }
   */
  popoverProps?: Partial<PopoverProps>;
  /**
   * Props to be passed to the listbox component.
   *
   * @default { disableAnimation: false }
   */
  listBoxProps?: Partial<ListBoxProps<T>>;
  /**
   * Classes object to style the select and its children.
   */
  classNames?: SlotsToClasses<SelectSlots>;
}

export function Select<T extends object>(props: SelectProps<T>) {
  const {
    children,
    className,
    classNames,
    label,
    description,
    errorMessage,
    items,
    placement = 'bottom',
    isLoading = false,
    selectorIcon = <ChevronDownIcon />,
    variant,
    color,
    radius,
    size,
    spinnerProps,
    popoverProps,
    listBoxProps,
    ...otherProps
  } = props;

  const slots = useMemo(
    () => select({ variant, color, radius, size }),
    [color, radius, size, variant],
  );

  const baseStyles = clsx(classNames?.base, className);

  const clonedIcon = cloneElement(selectorIcon as ReactElement, {
    'aria-hidden': true,
    className: slots.selectorIcon({ class: classNames?.selectorIcon }),
  });

  const renderIndicator = useMemo(() => {
    if (isLoading) {
      return (
        <Spinner
          aria-hidden
          color="current"
          size="sm"
          {...spinnerProps}
          className={slots.spinner({ class: classNames?.spinner })}
        />
      );
    }

    return clonedIcon;
  }, [isLoading, clonedIcon, spinnerProps, slots, classNames?.spinner]);

  return (
    <AriaSelect className={slots.base({ class: baseStyles })} {...otherProps}>
      {label && <Label className={slots.label({ class: classNames?.label })}>{label}</Label>}
      <div className={slots.mainWrapper({ class: classNames?.mainWrapper })}>
        <Button className={slots.trigger({ class: classNames?.trigger })}>
          <SelectValue className={slots.value({ class: classNames?.value })} />
          {renderIndicator}
        </Button>

        {errorMessage ? (
          <Text
            slot="errorMessage"
            elementType="div"
            className={slots.errorMessage({ class: classNames?.errorMessage })}
          >
            {errorMessage}
          </Text>
        ) : description ? (
          <Text
            slot="description"
            elementType="div"
            className={slots.description({ class: classNames?.description })}
          >
            {description}
          </Text>
        ) : null}
      </div>
      <Popover
        placement={placement}
        className={slots.popover({ class: classNames?.popover })}
        {...popoverProps}
      >
        <ListBox {...listBoxProps} items={items}>
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
