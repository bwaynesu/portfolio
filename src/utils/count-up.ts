/** Ease-out cubic on t in [0, 1]. */
export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/** Count-up value after `elapsed` ms of a `duration` ms run; reaches `target` exactly. */
export const countAt = (
  target: number,
  elapsed: number,
  duration: number,
): number => {
  const t = duration <= 0 ? 1 : Math.min(1, Math.max(0, elapsed / duration));
  return Math.round(target * easeOutCubic(t));
};
