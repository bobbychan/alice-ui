import { divider } from '@alice-ui/theme';
import { useMemo } from 'react';
import { Separator, SeparatorProps } from 'react-aria-components';

export interface DividerProps extends SeparatorProps {}

function Divider(props: DividerProps) {
  let { className, orientation, ...otherProps } = props;

  const styles = useMemo(
    () =>
      divider({
        orientation,
        className,
      }),
    [orientation, className],
  );

  return <Separator className={styles} data-orientation={orientation} {...otherProps} />;
}
export { Divider };
