import { getValidChildren } from '@alice-ui/react-utils';
import { clsx, compact } from '@alice-ui/shared-utils';
import { avatarGroup } from '@alice-ui/theme';
import {
  ElementType,
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
  cloneElement,
  forwardRef,
  useMemo,
} from 'react';
import { Avatar, AvatarContext, AvatarProps } from './avatar';

export interface AvatarGroupProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
    Partial<Pick<AvatarProps, 'size' | 'color' | 'radius' | 'isDisabled' | 'isBordered'>> {
  elementType?: string;
  /**
   * Whether the avatars should be displayed in a grid
   */
  isGrid?: boolean;
  /**
   * The maximum number of visible avatars
   * @default 5
   */
  max?: number;
  /**
   * Control the number of avatar not visible
   */
  total?: number;
  /**
   * This allows you to render a custom count component.
   */
  renderCount?: (count: number) => ReactNode;
}

export type AvatarContextValue = {
  isInGroup?: boolean;
  size?: AvatarProps['size'];
  color?: AvatarProps['color'];
  radius?: AvatarProps['radius'];
  isGrid?: boolean;
  isBordered?: AvatarProps['isBordered'];
  isDisabled?: AvatarProps['isDisabled'];
};

function AvatarGroup(props: AvatarGroupProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    elementType,
    max = 5,
    total,
    size,
    color,
    radius,
    isBordered,
    isDisabled,
    isGrid,
    renderCount = (count) => <Avatar className="hover:-translate-x-0" name={`+${count}`} />,
    className,
    children,
    ...otherProps
  } = props;

  const Component = (elementType || 'span') as ElementType;

  const context = useMemo<AvatarContextValue>(
    () => ({
      isInGroup: true,
      size,
      color,
      radius,
      isGrid,
      isBordered,
      isDisabled,
    }),
    [size, color, radius, isGrid, isBordered, isDisabled],
  );
  const classNames = useMemo(() => avatarGroup({ className, isGrid }), [className, isGrid]);

  const validChildren = getValidChildren(children);
  const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren;

  const remainingCount = total ? total : max != null ? validChildren.length - max : -1;

  const clones = childrenWithinMax.map((child, index) => {
    const isFirstAvatar = index === 0;
    const isLastAvatar = index === childrenWithinMax.length - 1;

    const childProps = {
      className: clsx(
        isFirstAvatar ? 'ml-0' : !isGrid ? '-ml-2' : '',
        isLastAvatar && remainingCount < 1 ? 'hover:-translate-x-0' : '',
      ),
    };

    return cloneElement(child, compact(childProps));
  });

  return (
    <Component ref={ref} className={classNames} role="group" {...otherProps}>
      <AvatarContext.Provider value={context}>
        {clones}
        {remainingCount > 0 && renderCount(remainingCount)}
      </AvatarContext.Provider>
    </Component>
  );
}

const _AvatarGroup = forwardRef(AvatarGroup);
export { _AvatarGroup as AvatarGroup };
