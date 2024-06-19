import {
  MutableRefObject,
  Ref,
  RefObject,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';

export function canUseDOM(): boolean {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export const isBrowser = canUseDOM();

export function getUserAgentBrowser(navigator: Navigator) {
  const { userAgent: ua, vendor } = navigator;
  const android = /(android)/i.test(ua);

  switch (true) {
    case /CriOS/.test(ua):
      return 'Chrome for iOS';
    case /Edg\//.test(ua):
      return 'Edge';
    case android && /Silk\//.test(ua):
      return 'Silk';
    case /Chrome/.test(ua) && /Google Inc/.test(vendor):
      return 'Chrome';
    case /Firefox\/\d+\.\d+$/.test(ua):
      return 'Firefox';
    case android:
      return 'AOSP';
    case /MSIE|Trident/.test(ua):
      return 'IE';
    case /Safari/.test(navigator.userAgent) && /Apple Computer/.test(ua):
      return 'Safari';
    case /AppleWebKit/.test(ua):
      return 'WebKit';
    default:
      return null;
  }
}

export type UserAgentBrowser = NonNullable<ReturnType<typeof getUserAgentBrowser>>;

export function getUserAgentOS(navigator: Navigator) {
  const { userAgent: ua, platform } = navigator;

  switch (true) {
    case /Android/.test(ua):
      return 'Android';
    case /iPhone|iPad|iPod/.test(platform):
      return 'iOS';
    case /Win/.test(platform):
      return 'Windows';
    case /Mac/.test(platform):
      return 'Mac';
    case /CrOS/.test(ua):
      return 'Chrome OS';
    case /Firefox/.test(ua):
      return 'Firefox OS';
    default:
      return null;
  }
}

export type UserAgentOS = NonNullable<ReturnType<typeof getUserAgentOS>>;

export function detectDeviceType(navigator: Navigator) {
  const { userAgent: ua } = navigator;

  if (/(tablet)|(iPad)|(Nexus 9)/i.test(ua)) return 'tablet';
  if (/(mobi)/i.test(ua)) return 'phone';

  return 'desktop';
}

export type UserAgentDeviceType = NonNullable<ReturnType<typeof detectDeviceType>>;

export function detectOS(os: UserAgentOS) {
  if (!isBrowser) return false;

  return getUserAgentOS(window.navigator) === os;
}

export function detectBrowser(browser: UserAgentBrowser) {
  if (!isBrowser) return false;

  return getUserAgentBrowser(window.navigator) === browser;
}

export function detectTouch() {
  if (!isBrowser) return false;

  return window.ontouchstart === null && window.ontouchmove === null && window.ontouchend === null;
}

export function useDOMRef<T extends HTMLElement = HTMLElement>(
  ref?: RefObject<T | null> | Ref<T | null>,
) {
  const domRef = useRef<T>(null);

  useImperativeHandle(ref, () => domRef.current);

  return domRef;
}

export interface ContextValue<T> {
  ref?: MutableRefObject<T>;
}

// Syncs ref from context with ref passed to hook
export function useSyncRef<T>(context: ContextValue<T | null>, ref: RefObject<T>) {
  useLayoutEffect(() => {
    if (context && context.ref && ref && ref.current) {
      context.ref.current = ref.current;

      return () => {
        if (context.ref?.current) {
          context.ref.current = null;
        }
      };
    }
  }, [context, ref]);
}

/**
 * Checks if two DOMRect objects intersect each other.
 *
 * @param rect1 - The first DOMRect object.
 * @param rect2 - The second DOMRect object.
 * @returns A boolean indicating whether the two DOMRect objects intersect.
 */
export function areRectsIntersecting(rect1: DOMRect, rect2: DOMRect) {
  return (
    rect1 &&
    rect2 &&
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}
