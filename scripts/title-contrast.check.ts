// Checks the primary share of the item-title color-mix (src/assets/index.css .text-title) against
// every configured daisyUI theme: contrast on the base-100 card >= 4.5 (WCAG).
// Run: node scripts/title-contrast.check.ts [pct]
// Relies on daisyUI internal paths (daisyui/src/theming/...) and the hoisted culori; may break on a daisyUI upgrade.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import CONFIG from '../gitprofile.config.ts';

const require = createRequire(import.meta.url);
const daisyThemes = require('daisyui/src/theming/themes.js');
const daisyFns = require('daisyui/src/theming/functions.js');
const {
  parse,
  interpolate,
  wcagContrast,
  clampRgb,
} = require('culori/require');

type Vars = Record<string, string>;
type Color = ReturnType<typeof parse>;

const themes: Record<string, Vars> = {};
for (const name of CONFIG.themeConfig.themes) {
  themes[name] = daisyFns.convertColorFormat(daisyThemes[name]);
}
themes.procyon = daisyFns.convertColorFormat(CONFIG.themeConfig.customTheme);

const ok = (v: string): Color => parse(`oklch(${v})`);
// Same as CSS color-mix(in oklab, p pct%, bc), then gamut clip; oklab keeps the primary hue (oklch drifts toward the bc hue, e.g. emerald went teal).
const mix = (p: Color, bc: Color, pct: number): Color =>
  clampRgb(interpolate([bc, p], 'oklab')(pct / 100));

const rows = Object.entries(themes).map(([name, v]) => ({
  name,
  p: ok(v['--p']),
  bc: ok(v['--bc']),
  card: ok(v['--b1']),
  b2: ok(v['--b2']),
}));
assert.equal(rows.length, 19, 'expected 19 themes');

const worst = (pct: number) =>
  Math.min(...rows.map((r) => wcagContrast(mix(r.p, r.bc, pct), r.card)));
let best = 0;
for (let p = 100; p >= 0; p--) {
  if (worst(p) >= 4.5) {
    best = p;
    break;
  }
}

const pct = Number(process.argv[2] ?? 45);
console.log(`max primary% passing all themes (>=4.5): ${best}`);
console.log(`theme       item@${pct}%  bc-only`);
for (const r of rows) {
  console.log(
    `${r.name.padEnd(10)}  ${wcagContrast(mix(r.p, r.bc, pct), r.card)
      .toFixed(2)
      .padStart(8)}  ${wcagContrast(r.bc, r.card).toFixed(2).padStart(7)}`,
  );
}
assert.ok(worst(pct) >= 4.5, `item titles fail at ${pct}%`);

// Avatar-card badge (badge-ghost: base-200 bg, base-content text at BADGE_OPACITY %, 12px small text): >= 4.5.
const BADGE_OPACITY = 80;
const badgeContrast = (r: (typeof rows)[number], a: number) =>
  wcagContrast(clampRgb(interpolate([r.b2, r.bc], 'rgb')(a / 100)), r.b2);
let minBadge = { name: '', c: Infinity };
for (const r of rows) {
  const c = badgeContrast(r, BADGE_OPACITY);
  if (c < minBadge.c) minBadge = { name: r.name, c };
}
console.log(
  `badge@${BADGE_OPACITY}% min ${minBadge.c.toFixed(2)} (${minBadge.name})`,
);
assert.ok(minBadge.c >= 4.5, `badge text fails at ${BADGE_OPACITY}%`);
console.log('ok');
