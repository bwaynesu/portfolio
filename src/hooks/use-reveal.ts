import { useEffect, useRef } from 'react';

/**
 * Fades a block in (and up 8 px) the first time it scrolls into view.
 * Visible by default: hides only when IntersectionObserver exists, reduced
 * motion is off, and the block starts below the fold.
 * Pass `ready` once the page has its final layout (data loaded), so the
 * "already on screen" check measures the real position.
 */
export const useReveal = <T extends HTMLElement = HTMLDivElement>(
  ready: boolean,
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (
      !ready ||
      !element ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    // On screen or above it (e.g. restored scroll position): keep visible.
    if (element.getBoundingClientRect().top < window.innerHeight) {
      return;
    }

    element.classList.add('reveal', 'reveal-hidden');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.remove('reveal-hidden');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      element.classList.remove('reveal', 'reveal-hidden');
    };
  }, [ready]);

  return ref;
};
