import { useImage as useImageBase } from '@alice-ui/hooks';
import { clsx, dataAttr } from '@alice-ui/shared-utils';
import type { ImageSlots, ImageVariantProps, SlotsToClasses } from '@alice-ui/theme';
import { filterVariantProps, image } from '@alice-ui/theme';
import { filterDOMProps } from '@react-aria/utils';
import { ForwardedRef, ImgHTMLAttributes, forwardRef, useMemo } from 'react';

type NativeImageProps = ImgHTMLAttributes<HTMLImageElement>;

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement>, ImageVariantProps {
  as?: React.ElementType;
  /**
   * Controlled loading state.
   */
  isLoading?: boolean;
  /**
   * A fallback image.
   */
  fallbackSrc?: React.ReactNode;
  /**
   * Whether to disable the loading skeleton.
   * @default false
   */
  disableSkeleton?: boolean;
  /**
   * A callback for when the image `src` has been loaded
   */
  onLoad?: NativeImageProps['onLoad'];
  /**
   * Function called when image failed to load
   */
  onError?: () => void;
  /**
   * A loading strategy to use for the image.
   */
  loading?: NativeImageProps['loading'];
  /**
   * Whether to remove the wrapper element. This will cause the image to be rendered as a direct child of the parent element.
   * If you set this prop as `true` neither the skeleton nor the zoom effect will work.
   * @default false
   */
  removeWrapper?: boolean;
  /**
   * Classes object to style the image.
   */
  classNames?: SlotsToClasses<ImageSlots>;
}

function Image(props: ImageProps, ref: ForwardedRef<HTMLDivElement>) {
  const variantProps = filterVariantProps(props, image.variantKeys);

  const {
    as,
    src,
    srcSet,
    sizes,
    crossOrigin,
    className,
    classNames,
    isLoading: isLoadingProp,
    fallbackSrc,
    disableSkeleton = !!fallbackSrc,
    loading,
    removeWrapper,
    onLoad,
    onError,
    ...otherProps
  } = props;

  const Component = as || 'img';

  const imageStatus = useImageBase({
    src,
    srcSet,
    sizes,
    crossOrigin,
    loading,
    onLoad,
    onError,
    ignoreFallback: false,
  });

  const isImgLoaded = imageStatus === 'loaded' && !isLoadingProp;
  const isLoading = imageStatus === 'loading' || isLoadingProp;
  const isZoomed = props.isZoomed;
  const showFallback = (!src || !isImgLoaded) && !!fallbackSrc;
  const showSkeleton = isLoading && !disableSkeleton;

  const { w } = useMemo(() => {
    return {
      w: props.width
        ? typeof props.width === 'number'
          ? `${props.width}px`
          : props.width
        : 'fit-content',
    };
  }, [props?.width]);

  const slots = useMemo(
    () =>
      image({
        ...variantProps,
        showSkeleton,
      }),
    [showSkeleton, variantProps],
  );

  const imgStyles = clsx(className, classNames?.img);

  const img = (
    <Component
      ref={ref}
      className={slots.img({ class: imgStyles })}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      crossOrigin={crossOrigin}
      data-loaded={dataAttr(isImgLoaded)}
      {...filterDOMProps(otherProps)}
    />
  );

  if (removeWrapper) {
    return img;
  }

  const zoomed = (
    <div className={slots.zoomedWrapper({ class: classNames?.zoomedWrapper })}>{img}</div>
  );

  // when zoomed or showSkeleton, we need to wrap the image
  if (isZoomed || !disableSkeleton || fallbackSrc) {
    return (
      <div
        className={slots.wrapper({ class: classNames?.wrapper })}
        style={{
          maxWidth: w,
          backgroundImage: showFallback ? `url(${fallbackSrc})` : undefined,
        }}
      >
        {isZoomed ? zoomed : img}
      </div>
    );
  }

  return img;
}

const _Image = forwardRef(Image);

export { _Image as Image };
