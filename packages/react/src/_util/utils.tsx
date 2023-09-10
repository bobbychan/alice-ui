import { mergeProps, mergeRefs, useLayoutEffect, useObjectRef } from '@react-aria/utils';
import { AriaLabelingProps, DOMProps as SharedDOMProps } from '@react-types/shared';
import React, {
  CSSProperties,
  Context,
  ForwardedRef,
  ReactNode,
  RefCallback,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIsSSR } from 'react-aria';
import ReactDOM from 'react-dom';

// Override forwardRef types so generics work.
declare function forwardRef<T, P = Record<string, never>>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
): (props: P & React.RefAttributes<T>) => React.ReactElement | null;

export type forwardRefType = typeof forwardRef;

export const slotCallbackSymbol = Symbol('callback');
export const defaultSlot = Symbol('default');

interface SlottedValue<T> {
  slots?: Record<string | symbol, T>;
  [slotCallbackSymbol]?: (value: T) => void;
}

export type ContextValue<T extends SlotProps, E extends Element> =
  | SlottedValue<WithRef<T, E>>
  | WithRef<T, E>
  | null
  | undefined;

type ProviderValue<T> = [Context<T>, T];
type ProviderValues<A, B, C, D, E, F, G, H> =
  | [ProviderValue<A>]
  | [ProviderValue<A>, ProviderValue<B>]
  | [ProviderValue<A>, ProviderValue<B>, ProviderValue<C>]
  | [ProviderValue<A>, ProviderValue<B>, ProviderValue<C>, ProviderValue<D>]
  | [ProviderValue<A>, ProviderValue<B>, ProviderValue<C>, ProviderValue<D>, ProviderValue<E>]
  | [
      ProviderValue<A>,
      ProviderValue<B>,
      ProviderValue<C>,
      ProviderValue<D>,
      ProviderValue<E>,
      ProviderValue<F>,
    ]
  | [
      ProviderValue<A>,
      ProviderValue<B>,
      ProviderValue<C>,
      ProviderValue<D>,
      ProviderValue<E>,
      ProviderValue<F>,
      ProviderValue<G>,
    ]
  | [
      ProviderValue<A>,
      ProviderValue<B>,
      ProviderValue<C>,
      ProviderValue<D>,
      ProviderValue<E>,
      ProviderValue<F>,
      ProviderValue<G>,
      ProviderValue<H>,
    ];

interface ProviderProps<A, B, C, D, E, F, G, H> {
  values: ProviderValues<A, B, C, D, E, F, G, H>;
  children: ReactNode;
}

export function Provider<A, B, C, D, E, F, G, H>({
  values,
  children,
}: ProviderProps<A, B, C, D, E, F, G, H>): JSX.Element {
  for (let [Context, value] of values) {
    // @ts-ignore
    children = <Context.Provider value={value}>{children}</Context.Provider>;
  }

  return children as JSX.Element;
}

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
export interface SlotProps {
  /** A slot name for the component. Slots allow the component to receive props from a parent component. */
  slot?: string;
}

export function useSlottedContext<U extends SlotProps, E extends Element>(
  context: Context<ContextValue<U, E>>,
  slot?: string,
): WithRef<U, E> | null | undefined {
  let ctx = useContext(context);
  if (ctx && 'slots' in ctx && ctx.slots) {
    if (!slot && !ctx.slots[defaultSlot]) {
      throw new Error('A slot prop is required');
    }
    let slotKey = slot || defaultSlot;
    if (!ctx.slots[slotKey]) {
      // @ts-ignore
      throw new Error(
        `Invalid slot "${slot}". Valid slot names are ` +
          new Intl.ListFormat().format(Object.keys(ctx.slots).map((p) => `"${p}"`)) +
          '.',
      );
    }
    return ctx.slots[slotKey];
  }
  // @ts-ignore
  return ctx;
}

export function useContextProps<T, U extends SlotProps, E extends Element>(
  props: T & SlotProps,
  ref: ForwardedRef<E>,
  context: Context<ContextValue<U, E>>,
): [T, RefObject<E>] {
  let ctx = useSlottedContext(context, props.slot) || {};
  // @ts-ignore - TS says "Type 'unique symbol' cannot be used as an index type." but not sure why.
  let { ref: contextRef, [slotCallbackSymbol]: callback, ...contextProps } = ctx;
  let mergedRef = useObjectRef(useMemo(() => mergeRefs(ref, contextRef), [ref, contextRef]));
  let mergedProps = mergeProps(contextProps, props) as unknown as T;

  // A parent component might need the props from a child, so call slot callback if needed.
  useEffect(() => {
    if (callback) {
      callback(props);
    }
  }, [callback, props]);

  return [mergedProps, mergedRef];
}

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
export function createHideableComponent<T, P = Record<string, never>>(
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

type Booleanish = boolean | 'true' | 'false';

export const dataAttr = (condition: boolean | undefined) =>
  (condition ? 'true' : undefined) as Booleanish;
