import { PressResponder } from '@react-aria/interactions';
import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import { ForwardedRef, ReactNode, forwardRef } from 'react';
import { Input } from '../input';

export interface FileTriggerProps {
  /**
   * Specifies what mime type of files are allowed.
   */
  acceptedFileTypes?: Array<string>;
  /**
   * Whether multiple files can be selected.
   */
  allowsMultiple?: boolean;
  /**
   * Specifies the use of a media capture mechanism to capture the media on the spot.
   */
  defaultCamera?: 'user' | 'environment';
  /**
   * Handler when a user selects a file.
   */
  onSelect?: (files: FileList | null) => void;
  /**
   * The children of the component.
   */
  children?: ReactNode;
}

function FileTrigger(props: FileTriggerProps, ref: ForwardedRef<HTMLInputElement>) {
  let { onSelect, acceptedFileTypes, allowsMultiple, defaultCamera, children, ...rest } = props;
  let inputRef = useObjectRef(ref);
  let domProps = filterDOMProps(rest);

  return (
    <>
      <PressResponder
        onPress={() => {
          if (inputRef.current.value) {
            inputRef.current.value = '';
          }
          inputRef.current?.click();
        }}
      >
        {children}
      </PressResponder>
      <Input
        {...domProps}
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        accept={acceptedFileTypes?.toString()}
        onChange={(e) => onSelect?.(e.target.files)}
        capture={defaultCamera}
        multiple={allowsMultiple}
      />
    </>
  );
}

/**
 * A FileTrigger allows a user to access the file system with any pressable React Aria or React Spectrum component, or custom components built with usePress.
 */
const _FileTrigger = forwardRef(FileTrigger);
export { _FileTrigger as FileTrigger };
