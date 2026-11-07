import { useEffect, useRef, useState } from 'react';

/**
 * True once the element first enters the viewport (then stops watching).
 * Without IntersectionObserver it is true right away. `enabled` false skips watching.
 */
export const useInView = <T extends Element>(enabled = true) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled]);

  return [ref, inView] as const;
};
