import { useEffect, useMemo, useState } from 'react';
import { typedCount, typeStep } from '../../utils/type-text';

const canAnimate = () =>
  typeof setTimeout === 'function' &&
  typeof window !== 'undefined' &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Types `text` once (30 ms per character, 2.5 s at most), then a cursor blinks
 * 4 times and hides. Untyped characters stay in the flow as invisible text, so
 * the box has its final size from the first frame. Reduced motion
 * (or no timers) shows the full text with no cursor. Screen readers get the full text.
 */
const TypeText = ({ text }: { text: string }) => {
  // Array.from splits by code point, so emoji and CJK are never cut in half.
  const chars = useMemo(() => Array.from(text), [text]);
  const [animate] = useState(canAnimate);
  const [shown, setShown] = useState(animate ? 0 : chars.length);

  useEffect(() => {
    if (!animate) {
      setShown(chars.length);
      return;
    }
    setShown(0);
    // setTimeout, not rAF: rAF stops in hidden or non-rendering tabs and would leave the bio blank.
    let timer = 0;
    const startTime = performance.now();
    const step = typeStep(chars.length);
    const tick = () => {
      const count = typedCount(chars.length, performance.now() - startTime);
      setShown(count);
      if (count < chars.length) {
        timer = window.setTimeout(tick, step);
      }
    };
    timer = window.setTimeout(tick, step);
    return () => window.clearTimeout(timer);
  }, [animate, chars]);

  return (
    <>
      <span aria-hidden="true">
        {chars.slice(0, shown).join('')}
        {animate && shown >= chars.length && (
          // Zero net width so the cursor never rewraps the text.
          <span className="type-cursor inline-block w-[2px] -mr-[2px] h-[1em] align-text-bottom bg-current" />
        )}
        <span className="invisible">{chars.slice(shown).join('')}</span>
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
};

export default TypeText;
