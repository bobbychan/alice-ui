import type { LinkVariantProps } from '@alice-ui/theme';
import { link } from '@alice-ui/theme';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import type { BaseLinkProps } from './base-link';
import { BaseLink } from './base-link';

export interface LinkProps extends BaseLinkProps, LinkVariantProps {}

function Link(props: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) {
  const { className, size, color, underline, isBlock, isDisabled, ...otherProps } = props;

  const styles = useMemo(
    () =>
      link({
        size,
        color,
        underline,
        isBlock,
        isDisabled,
        className,
      }),
    [className, color, isBlock, isDisabled, size, underline],
  );

  return <BaseLink className={styles} {...otherProps} ref={ref} />;
}

const _Link = /*#__PURE__*/ forwardRef(Link);
export { _Link as Link };
