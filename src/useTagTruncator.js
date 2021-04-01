// @flow

import { useRef, useLayoutEffect, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

/**
 * was based on https://github.com/maladr0it/react-truncate-list/blob/master/src/index.tsx
 * @param deps
 * @return {[{current: unknown}, (boolean|*), boolean, (function(*=): void)]}
 */
export default function useTagTruncator(deps: $ReadOnlyArray = []) {
  const mounted = useRef();
  const ref = useRef<HTMLElement>(null);
  const [ isExtended, setExtend ] = useState(false);
  const [hiddenCount, setHiddenCount] = useState(undefined);

  const truncate = () => {
    if (!ref.current) return;

    ref.current.style.overflow = "hidden";
    const childNodes: HTMLElement[] = Array.from(ref.current.children);
    const childCount = childNodes.length;

    for (let node of childNodes) {
      node.hidden = true;
    }

    if (childCount === 0 && !mounted.current) return;

    let index: number;
    for (index = 0; index < childCount; index += 2) {
      const item = childNodes[ index ];
      const nextItem = childNodes[ index + 1 ];

      item.hidden = false;
      nextItem.hidden = false;
      const nextItemRect = nextItem.getBoundingClientRect();
      const containerRect = ref.current.getBoundingClientRect();

      nextItem.hidden = !isExtended;

      if (nextItemRect.bottom > containerRect.bottom
        || nextItemRect.right > containerRect.right
      ) {
        item.hidden = true;
        if (index > 0) {
          childNodes[ index - 1 ].hidden = false;
        }
        break;
      }
    }

    if (index === childCount) {
      childNodes[ childNodes.length - 1 ].hidden = false;
    }

    setHiddenCount(childNodes.filter(o => o.hidden).length);
  };

  useLayoutEffect(() => {
    mounted.current = true;

    truncate();

    const resizeObserver = new ResizeObserver((entries => {
      for (let _ of entries) {
        truncate();
      }
    }));

    const copyRef = ref.current;

    if (copyRef) resizeObserver.observe(copyRef);

    return () => {
      mounted.current = false;
      if (copyRef) resizeObserver.unobserve(copyRef);
    };
  }, [ ...deps, hiddenCount, isExtended ]);

  return [
    ref,
    isExtended,
    () => setExtend(!isExtended),
    hiddenCount,
    mounted.current,
  ];
};
