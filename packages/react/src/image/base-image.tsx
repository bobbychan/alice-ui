'use client';

import { FallbackStrategy, shouldShowFallbackImage, useImage } from '@alice-ui/hooks';
import { dataAttr } from '@alice-ui/shared-utils';
import { ForwardedRef, ImgHTMLAttributes, forwardRef } from 'react';

export interface BaseImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Fallback image `src` to show if image is loading or image fails.
   */
  fallbackSrc?: string;
  /**
   * Fallback element to show if image is loading or image fails.
   * @type React.ReactElement
   */
  fallback?: React.ReactElement;
  /**
   * Defines loading strategy
   */
  loading?: 'eager' | 'lazy';
  /**
   * If `true`, opt out of the `fallbackSrc` logic and use as `img`
   *
   * @default false
   */
  ignoreFallback?: boolean;
  /**
   * - beforeLoadOrError(default): loads the fallbackImage while loading the src
   * - onError: loads the fallbackImage only if there is an error fetching the src
   *
   * @default "beforeLoadOrError"
   * @see Issue https://github.com/chakra-ui/chakra-ui/issues/5581
   */
  fallbackStrategy?: FallbackStrategy;
  /**
   * Defining which referrer is sent when fetching the resource.
   * @type React.HTMLAttributeReferrerPolicy
   */
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  as?: React.ElementType;
}

function BaseImage(props: BaseImageProps, ref: ForwardedRef<HTMLImageElement>) {
  const {
    as,
    src,
    srcSet,
    crossOrigin,
    fallbackSrc,
    fallback,
    loading,
    ignoreFallback,
    fallbackStrategy = 'beforeLoadOrError',
    referrerPolicy,
    ...otherProps
  } = props;

  const Component = as || 'img';

  const providedFallback = fallbackSrc !== undefined || fallback !== undefined;

  const shouldIgnoreFallbackImage =
    loading != null ||
    // use can opt out of fallback image
    ignoreFallback ||
    // if the user doesn't provide any kind of fallback we should ignore it
    !providedFallback;

  /**
   * returns `loaded` if fallback is ignored
   */
  const status = useImage({
    ...props,
    crossOrigin,
    ignoreFallback: shouldIgnoreFallbackImage,
  });

  const showFallbackImage = shouldShowFallbackImage(status, fallbackStrategy);

  if (showFallbackImage) {
    /**
     * If user passed a custom fallback component,
     * let's render it here.
     */
    if (fallback) return fallback;

    return <Component ref={ref} src={fallbackSrc} crossOrigin={crossOrigin} {...otherProps} />;
  }

  return (
    <Component
      ref={ref}
      src={src}
      srcSet={srcSet}
      crossOrigin={crossOrigin}
      loading={loading}
      referrerPolicy={referrerPolicy}
      data-loaded={dataAttr(status === 'loaded')}
      {...otherProps}
    />
  );
}

const _BaseImage = forwardRef(BaseImage);

export { _BaseImage as BaseImage };
