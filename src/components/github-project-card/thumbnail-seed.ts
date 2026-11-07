/** djb2 string hash, unsigned 32-bit. Same name always gives the same seed. */
export const djb2 = (text: string): number => {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) + hash + text.charCodeAt(i)) >>> 0;
  }
  return hash;
};

/** mulberry32 seeded PRNG; returns floats in [0, 1). */
export const mulberry32 = (seed: number): (() => number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export interface CodeLine {
  indent: number;
  width: number;
  tone: number;
}

/**
 * Fake code lines for a repo thumbnail: 5–7 lines, indent 0–2 levels,
 * width 25–100 % of the free space, tone 0–2 (picks an opacity).
 */
export const makeCodeLines = (name: string): CodeLine[] => {
  const random = mulberry32(djb2(name));
  const count = 5 + Math.floor(random() * 3);
  const lines: CodeLine[] = [];
  let indent = 0;
  for (let i = 0; i < count; i++) {
    // Indent drifts by at most one level per line, like real code.
    indent = Math.max(0, Math.min(2, indent + Math.floor(random() * 3) - 1));
    lines.push({
      indent,
      width: 0.25 + random() * 0.75,
      tone: Math.floor(random() * 3),
    });
  }
  return lines;
};
