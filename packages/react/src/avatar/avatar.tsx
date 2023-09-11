import { useImage } from '@alice-ui/hooks';
import { clsx, dataAttr } from '@alice-ui/shared-utils';
import { AvatarSlots, AvatarVariantProps, SlotsToClasses, avatar } from '@alice-ui/theme';
import {
  ElementType,
  ForwardedRef,
  HTMLAttributes,
  createContext,
  forwardRef,
  useMemo,
} from 'react';
import { mergeProps, useFocusRing, useHover } from 'react-aria';
import { ContextValue, useContextProps } from '../_util/utils';
import { AvatarContextValue } from './avatar-group';
import { AvatarIcon } from './avatar-icon';

const safeText = (text: string): string => {
  if (text?.length <= 3) return text;

  return text?.slice(0, 2);
};

export interface AvatarProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
    Omit<AvatarVariantProps, 'isInGroup' | 'isInGridGroup'> {
  elementType?: string;
  /**
   * The name of the person in the avatar. -
   * if **src** has loaded, the name will be used as the **alt** attribute of the **img**
   * - If **src** is not loaded, the name will be used to create the initials
   */
  name?: string;
  /**
   * Image source.
   */
  src?: string;
  /**
   * Image alt text.
   */
  alt?: string;
  /*
   * Avatar icon.
   */
  icon?: React.ReactNode;
  /**
   * If `true`, the fallback logic will be skipped.
   * @default false
   */
  ignoreFallback?: boolean;
  /**
   * If `false`, the avatar will show the background color while loading.
   */
  showFallback?: boolean;
  /**
   * Function to get the initials to display
   */
  getInitials?: (name: string) => string;
  /**
   * Custom fallback component.
   */
  fallback?: React.ReactElement;
  /**
   * Function called when image failed to load
   */
  onError?: () => void;
  /**
   * The component used to render the image.
   * @default "img"
   */
  ImgComponent?: React.ElementType;
  /**
   * Props to pass to the image component.
   */
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  /**
   * Classname or List of classes to change the classNames of the avatar.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Avatar classNames={{
   *    base:"base-classes",
   *    img: "image-classes",
   *    name: "name-classes",
   *    icon: "icon-classes",
   *    fallback: "fallback-classes"
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<AvatarSlots>;
}

export const AvatarContext = createContext<ContextValue<AvatarProps, HTMLSpanElement>>({});

function Avatar(props: AvatarProps, ref: ForwardedRef<HTMLSpanElement>) {
  [props, ref] = useContextProps(props, ref, AvatarContext);
  const ctx = props as AvatarContextValue;

  const {
    elementType,
    src,
    name,
    icon = <AvatarIcon />,
    className,
    classNames,
    fallback: fallbackComponent,
    alt = name || 'avatar',
    color = 'danger',
    radius = 'full',
    size = 'md',
    isBordered = false,
    isDisabled = false,
    ignoreFallback = false,
    showFallback: showFallbackProp = false,
    getInitials = safeText,
    ImgComponent = 'img',
    imgProps,
    onError,
    ...avatarProps
  } = props;
  const Component = (elementType || 'span') as ElementType;

  const { isFocusVisible, isFocused, focusProps } = useFocusRing();
  const { isHovered, hoverProps } = useHover({ isDisabled });

  const imageStatus = useImage({ src, onError, ignoreFallback });
  const isImgLoaded = imageStatus === 'loaded';
  const showFallback = (!src || !isImgLoaded) && showFallbackProp;

  const slots = useMemo(
    () =>
      avatar({
        color,
        radius,
        size,
        isBordered,
        isDisabled,
        isInGroup: ctx?.isInGroup,
        isInGridGroup: ctx?.isGrid ?? false,
      }),
    [color, radius, size, isBordered, isDisabled],
  );
  const baseStyles = clsx(classNames?.base, className);

  const fallback = useMemo(() => {
    if (!showFallback && src) return null;

    if (fallbackComponent) {
      return (
        <div
          aria-label={alt}
          className={slots.fallback({ class: classNames?.fallback })}
          role="img"
        >
          {fallbackComponent}
        </div>
      );
    }

    return name ? (
      <span aria-label={alt} className={slots.name({ class: classNames?.name })} role="img">
        {getInitials(name)}
      </span>
    ) : (
      <span aria-label={alt} className={slots.icon({ class: classNames?.icon })} role="img">
        {icon}
      </span>
    );
  }, [showFallback, src, fallbackComponent, classNames, name]);

  return (
    <Component
      {...mergeProps(avatarProps, focusProps, hoverProps)}
      ref={ref}
      data-hovered={dataAttr(isHovered)}
      data-focused={dataAttr(isFocused)}
      data-focus-visible={dataAttr(isFocusVisible)}
      className={slots.base({ class: baseStyles })}
    >
      {src && (
        <ImgComponent
          src={src}
          alt={alt}
          data-loaded={dataAttr(isImgLoaded)}
          className={slots.img({ class: classNames?.img })}
          {...imgProps}
        />
      )}
      {fallback}
    </Component>
  );
}

const _Avatar = forwardRef(Avatar);
export { _Avatar as Avatar };
