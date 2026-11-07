import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/use-in-view';
import { countAt } from '../../utils/count-up';

const DURATION_MS = 800;

const canAnimate = () =>
  typeof requestAnimationFrame === 'function' &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Counts from 0 to `value` once (800 ms ease-out). `whenVisible` waits until
 * it scrolls into view. Reduced motion or no rAF shows the final value.
 * The moving number is aria-hidden; screen readers get the final value.
 */
const CountUp = ({
  value,
  whenVisible = false,
}: {
  value: number;
  whenVisible?: boolean;
}) => {
  const [ref, inView] = useInView<HTMLSpanElement>(whenVisible);
  const start = whenVisible ? inView : true;
  const [shown, setShown] = useState(() => (canAnimate() ? 0 : value));

  useEffect(() => {
    if (!start) {
      return;
    }
    if (!canAnimate()) {
      setShown(value);
      return;
    }
    let frame = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      setShown(countAt(value, elapsed, DURATION_MS));
      if (elapsed < DURATION_MS) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, value]);

  return (
    <span ref={ref}>
      <span aria-hidden="true" className="tabular-nums">
        {shown}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
};

export default CountUp;
