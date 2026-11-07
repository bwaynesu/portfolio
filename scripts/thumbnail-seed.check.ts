// Self-check for the repo thumbnail seed, CountUp and bio typing math. Run: node scripts/thumbnail-seed.check.ts
import assert from 'node:assert/strict';
import {
  djb2,
  makeCodeLines,
  mulberry32,
} from '../src/components/github-project-card/thumbnail-seed.ts';
import { countAt, easeOutCubic } from '../src/utils/count-up.ts';
import { typedCount, typeStep } from '../src/utils/type-text.ts';

const names = [
  'BShortcut',
  'Gist-Catalog',
  'BSoundMute',
  'BSelection',
  'OdinEnumArrayTitle',
  'AnyStruct',
  'Steam-Achievement-csv2vdf',
  'agentic-ebs',
];

// Known djb2 value: guards against accidental changes to the hash.
assert.equal(djb2(''), 5381);
assert.equal(djb2('a'), 177670);

for (const name of names) {
  assert.deepEqual(makeCodeLines(name), makeCodeLines(name), name);
  const lines = makeCodeLines(name);
  assert.ok(lines.length >= 5 && lines.length <= 7, `${name} count`);
  for (const line of lines) {
    assert.ok(line.indent >= 0 && line.indent <= 2);
    assert.ok(line.width >= 0.25 && line.width < 1);
    assert.ok([0, 1, 2].includes(line.tone));
  }
}

const random = mulberry32(42);
for (let i = 0; i < 1000; i++) {
  const value = random();
  assert.ok(value >= 0 && value < 1);
}

const distinct = new Set(names.map((n) => JSON.stringify(makeCodeLines(n))));
assert.equal(distinct.size, names.length, 'every sample repo looks different');

console.log(`thumbnail-seed: OK (${names.length} names, all distinct)`);

// CountUp math.
assert.equal(easeOutCubic(0), 0);
assert.equal(easeOutCubic(1), 1);
assert.ok(easeOutCubic(0.5) > 0.5, 'ease-out is ahead of linear');
assert.equal(countAt(15, 0, 800), 0);
assert.equal(countAt(15, 800, 800), 15);
assert.equal(countAt(15, 5000, 800), 15, 'clamps after the end');
assert.equal(countAt(15, -10, 800), 0, 'clamps before the start');
assert.equal(countAt(7, 100, 0), 7, 'zero duration jumps to the end');
let previous = 0;
for (let ms = 0; ms <= 800; ms += 16) {
  const value = countAt(15, ms, 800);
  assert.ok(value >= previous, 'never counts down');
  previous = value;
}
console.log('count-up: OK');

// Bio typing: 30 ms per character, whole text capped at 2.5 s.
assert.equal(typedCount(10, 0), 0);
assert.equal(typedCount(10, 29), 0);
assert.equal(typedCount(10, 30), 1);
assert.equal(typedCount(10, 150), 5, 'midway');
assert.equal(typedCount(10, 300), 10, 'done at 10 x 30 ms');
assert.equal(typedCount(10, 9999), 10, 'clamps after the end');
assert.equal(typedCount(10, -5), 0, 'clamps before the start');
assert.equal(typeStep(10), 30);
assert.equal(typeStep(200), 12.5, '200 chars shortened to fit 2.5 s');
assert.equal(typedCount(200, 2500), 200, 'long text ends at the cap');
assert.equal(typedCount(200, 1250), 100, 'long text half at half the cap');
assert.equal(typedCount(0, 0), 0, 'empty text');
assert.equal('Hi 👋 你好'.length, 8, 'emoji is 2 UTF-16 units');
assert.equal(
  Array.from('Hi 👋 你好').length,
  7,
  'Array.from splits by code point',
);
console.log('type-text: OK');
