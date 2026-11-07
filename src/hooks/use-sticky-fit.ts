import { useEffect, useRef } from 'react';

const GAP_PX = 40; // Matches the lg:p-10 page padding.
const MIN_WIDTH_PX = 1024; // Tailwind lg.

/**
 * Keeps the desktop left column sticky. A column that fits sticks 40 px from
 * the top; a taller one gets a negative top, so it scrolls until its bottom
 * is 40 px above the window edge and then stays (bottom-aligned sticky).
 */
export const useStickyFit = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof ResizeObserver === 'undefined') {
      return;
    }

    const update = () => {
      if (window.innerWidth >= MIN_WIDTH_PX) {
        const top = Math.min(
          GAP_PX,
          window.innerHeight - element.offsetHeight - GAP_PX,
        );
        element.classList.add('sticky-sidebar');
        element.style.top = `${top}px`;
      } else {
        element.classList.remove('sticky-sidebar');
        element.style.top = '';
      }
    };

    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener('resize', update);
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
      element.classList.remove('sticky-sidebar');
      element.style.top = '';
    };
  }, []);

  return ref;
};
