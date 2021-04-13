// @flow

import { useRef, useLayoutEffect, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

/**
 * was based on https://github.com/maladr0it/react-truncate-list/blob/master/src/index.tsx
 * @param deps
 * @return {[{current: unknown}, (boolean|*), boolean, (function(*=): void)]}
 */
export const useTagTruncator = (deps = []) => {
  const ref = useRef(null);
  const [ isExtended, setExtend ] = useState(false);
  const [ hiddenCount, setHiddenCount ] = useState(undefined);

  const truncate = () => {
    if (!ref.current) return;

    ref.current.style.overflow = "hidden";
    const childNodes: HTMLElement[] = Array.from(ref.current.children);

    for (let node of childNodes) {
      node.hidden = true;
    }

    if (childNodes.length === 0) return;

    let index: number;
    for (index = 0; index < childNodes.length; index++) {
      const item = childNodes[ index ];
      const nextItem = childNodes[ index + 1 ];

      if (nextItem) {
        item.hidden = false;
        nextItem.hidden = false;
        const nextItemRect = nextItem.getBoundingClientRect();
        const containerRect = ref.current.getBoundingClientRect();
        nextItem.hidden = true;

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
    }

    const hiddenItems = childNodes.filter(h => h.hidden).length - 1;

    if (isExtended || childNodes.length > hiddenItems && hiddenItems) {
      childNodes[ childNodes.length - 1 ].hidden = false;
    }

    setHiddenCount(hiddenItems);
  };

  useLayoutEffect(() => {
    truncate();

    const resizeObserver = new ResizeObserver((entries => {
      for (let _ of entries) {
        truncate();
      }
    }));

    const copyRef = ref.current;

    if (copyRef) resizeObserver.observe(copyRef);

    return () => {
      if (copyRef) resizeObserver.unobserve(copyRef);
    };
  }, [ ...deps, hiddenCount, isExtended ]);

  return [
    ref,
    isExtended,
    () => setExtend(!isExtended),
    hiddenCount,
  ];
};
