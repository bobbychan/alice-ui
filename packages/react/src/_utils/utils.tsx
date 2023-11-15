import { useLayoutEffect } from '@react-aria/utils';
import { AriaLabelingProps, DOMProps as SharedDOMProps } from '@react-types/shared';
import React, {
  CSSProperties,
  ForwardedRef,
  ReactNode,
  Ref,
  RefCallback,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIsSSR } from 'react-aria';
import ReactDOM from 'react-dom';

// Override forwardRef types so generics work.
declare function forwardRef<T, P = object>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
): (props: P & React.RefAttributes<T>) => React.ReactElement | null;

export type forwardRefType = typeof forwardRef;

export interface StyleProps {
  /** The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. */
  className?: string;
  /** The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. */
  style?: CSSProperties;
}

export interface DOMProps extends StyleProps {
  /** The children of the component. */
  children?: ReactNode;
}

export interface StyleRenderProps<T> {
  /** The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. */
  className?: string | ((values: T) => string);
  /** The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. */
  style?: CSSProperties | ((values: T) => CSSProperties);
}

export interface RenderProps<T> extends StyleRenderProps<T> {
  /** The children of the component. A function may be provided to alter the children based on component state. */
  children?: ReactNode | ((values: T) => ReactNode);
}

interface RenderPropsHookOptions<T> extends RenderProps<T>, SharedDOMProps, AriaLabelingProps {
  values: T;
  defaultChildren?: ReactNode;
  defaultClassName?: string;
}

export function useRenderProps<T>(props: RenderPropsHookOptions<T>) {
  let { className, style, children, defaultClassName, defaultChildren, values } = props;

  return useMemo(() => {
    let computedClassName: string | undefined;
    let computedStyle: React.CSSProperties | undefined;
    let computedChildren: React.ReactNode | undefined;

    if (typeof className === 'function') {
      computedClassName = className(values);
    } else {
      computedClassName = className;
    }

    if (typeof style === 'function') {
      computedStyle = style(values);
    } else {
      computedStyle = style;
    }

    if (typeof children === 'function') {
      computedChildren = children(values);
    } else if (children == null) {
      computedChildren = defaultChildren;
    } else {
      computedChildren = children;
    }

    return {
      className: computedClassName ?? defaultClassName,
      style: computedStyle,
      children: computedChildren,
      'data-rac': '',
    };
  }, [className, style, children, defaultClassName, defaultChildren, values]);
}

export type WithRef<T, E> = T & { ref?: ForwardedRef<E> };

export function useSlot(): [RefCallback<Element>, boolean] {
  // Assume we do have the slot in the initial render.
  let [hasSlot, setHasSlot] = useState(true);
  let hasRun = useRef(false);

  // A callback ref which will run when the slotted element mounts.
  // This should happen before the useLayoutEffect below.
  let ref = useCallback((el: any) => {
    hasRun.current = true;
    setHasSlot(!!el);
  }, []);

  // If the callback hasn't been called, then reset to false.
  useLayoutEffect(() => {
    if (!hasRun.current) {
      setHasSlot(false);
    }
  }, []);

  return [ref, hasSlot];
}

export function useEnterAnimation(ref: RefObject<HTMLElement>, isReady: boolean = true) {
  let [isEntering, setEntering] = useState(true);
  useAnimation(
    ref,
    isEntering && isReady,
    useCallback(() => setEntering(false), []),
  );
  return isEntering && isReady;
}

export function useExitAnimation(ref: RefObject<HTMLElement>, isOpen: boolean) {
  // State to trigger a re-render after animation is complete, which causes the element to be removed from the DOM.
  // Ref to track the state we're in, so we don't immediately reset isExiting to true after the animation.
  let [isExiting, setExiting] = useState(false);
  let [exitState, setExitState] = useState('idle');

  // If isOpen becomes false, set isExiting to true.
  if (!isOpen && ref.current && exitState === 'idle') {
    isExiting = true;
    setExiting(true);
    setExitState('exiting');
  }

  // If we exited, and the element has been removed, reset exit state to idle.
  if (!ref.current && exitState === 'exited') {
    setExitState('idle');
  }

  useAnimation(
    ref,
    isExiting,
    useCallback(() => {
      setExitState('exited');
      setExiting(false);
    }, []),
  );

  return isExiting;
}

function useAnimation(ref: RefObject<HTMLElement>, isActive: boolean, onEnd: () => void) {
  let prevAnimation = useRef<string | null>(null);
  if (isActive && ref.current) {
    // This is ok because we only read it in the layout effect below, immediately after the commit phase.
    // We could move this to another effect that runs every render, but this would be unnecessarily slow.
    // We only need the computed style right before the animation becomes active.
    prevAnimation.current = window.getComputedStyle(ref.current).animation;
  }

  useLayoutEffect(() => {
    if (isActive && ref.current) {
      // Make sure there's actually an animation, and it wasn't there before we triggered the update.
      let computedStyle = window.getComputedStyle(ref.current);
      if (
        computedStyle.animationName !== 'none' &&
        computedStyle.animation !== prevAnimation.current
      ) {
        let onAnimationEnd = (e: AnimationEvent) => {
          if (e.target === ref.current) {
            element.removeEventListener('animationend', onAnimationEnd);
            ReactDOM.flushSync(() => {
              onEnd();
            });
          }
        };

        let element = ref.current;
        element.addEventListener('animationend', onAnimationEnd);
        return () => {
          element.removeEventListener('animationend', onAnimationEnd);
        };
      } else {
        onEnd();
      }
    }
  }, [ref, isActive, onEnd]);
}

// React doesn't understand the <template> element, which doesn't have children like a normal element.
// It will throw an error during hydration when it expects the firstChild to contain content rendered
// on the server, when in reality, the browser will have placed this inside the `content` document fragment.
// This monkey patches the firstChild property for our special hidden template elements to work around this error.
// See https://github.com/facebook/react/issues/19932
if (typeof HTMLTemplateElement !== 'undefined') {
  const getFirstChild = Object.getOwnPropertyDescriptor(Node.prototype, 'firstChild')!.get!;
  Object.defineProperty(HTMLTemplateElement.prototype, 'firstChild', {
    configurable: true,
    enumerable: true,
    get: function () {
      if (this.dataset.reactAriaHidden) {
        return this.content.firstChild;
      } else {
        return getFirstChild.call(this);
      }
    },
  });
}

export const HiddenContext = createContext<boolean>(false);

// Portal to nowhere
const hiddenFragment = typeof DocumentFragment !== 'undefined' ? new DocumentFragment() : null;

export function Hidden(props: { children: ReactNode }) {
  let isHidden = useContext(HiddenContext);
  let isSSR = useIsSSR();
  if (isHidden) {
    // Don't hide again if we are already hidden.
    return <>{props.children}</>;
  }

  let children = <HiddenContext.Provider value>{props.children}</HiddenContext.Provider>;

  // In SSR, portals are not supported by React. Instead, render into a <template>
  // element, which the browser will never display to the user. In addition, the
  // content is not part of the DOM tree, so it won't affect ids or other accessibility attributes.
  return isSSR ? (
    <template data-react-aria-hidden>{children}</template>
  ) : (
    ReactDOM.createPortal(children, hiddenFragment!)
  );
}

// Creates a component that forwards its ref and returns null if it is in a <Hidden> subtree.
// Note: this function is handled specially in the documentation generator. If you change it, you'll need to update DocsTransformer as well.
export function createHideableComponent<T, P = object>(
  fn: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
): (props: P & React.RefAttributes<T>) => React.ReactElement | null {
  let Wrapper = (props: P, ref: React.Ref<T>) => {
    let isHidden = useContext(HiddenContext);
    if (isHidden) {
      return null;
    }

    return fn(props, ref);
  };
  // @ts-ignore - for react dev tools
  Wrapper.displayName = fn.displayName || fn.name;
  return (React.forwardRef as forwardRefType)(Wrapper);
}

/**
 * Filters out `data-*` attributes to keep them from being passed down and duplicated.
 * @param props
 */
export function removeDataAttributes<T>(props: T): T {
  const prefix = /^(data-.*)$/;
  let filteredProps = {} as T;

  for (const prop in props) {
    if (!prefix.test(prop)) {
      filteredProps[prop] = props[prop];
    }
  }

  return filteredProps;
}

export function useDOMRef<T extends HTMLElement = HTMLElement>(
  ref?: RefObject<T | null> | Ref<T | null>,
) {
  const domRef = useRef<T>(null);

  useImperativeHandle(ref, () => domRef.current);

  return domRef;
}

// Override base type to change the default.
export interface RACValidation {
  /**
   * Whether to use native HTML form validation to prevent form submission
   * when the value is missing or invalid, or mark the field as required
   * or invalid via ARIA.
   * @default 'native'
   */
  validationBehavior?: 'native' | 'aria';
}
