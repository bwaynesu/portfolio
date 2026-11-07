export const TYPE_CHAR_MS = 30;
export const TYPE_MAX_MS = 2500;

/** Ms per character: `perChar`, shortened so the whole text takes at most `maxTotal`. */
export const typeStep = (
  count: number,
  perChar = TYPE_CHAR_MS,
  maxTotal = TYPE_MAX_MS,
): number => (count > 0 ? Math.min(perChar, maxTotal / count) : 0);

/** Characters typed after `elapsed` ms, clamped to [0, count]. */
export const typedCount = (
  count: number,
  elapsed: number,
  perChar = TYPE_CHAR_MS,
  maxTotal = TYPE_MAX_MS,
): number => {
  const step = typeStep(count, perChar, maxTotal);
  if (step <= 0) {
    return count;
  }
  return Math.min(count, Math.max(0, Math.floor(elapsed / step)));
};
