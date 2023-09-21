import type { LinkVariantProps } from '@alice-ui/theme';
import { link } from '@alice-ui/theme';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import type { LinkProps as AriaLinkProps } from 'react-aria-components';
import { Link as AriaLink } from 'react-aria-components';

export interface LinkProps extends AriaLinkProps, LinkVariantProps {}

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
        className: typeof className === 'function' ? '' : className,
      }),
    [className, color, isBlock, isDisabled, size, underline],
  );

  return <AriaLink className={styles} {...otherProps} ref={ref} />;
}

const _Link = forwardRef(Link);
export { _Link as Link };
