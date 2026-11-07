import { getLanguageColor } from '../../utils';
import { makeCodeLines } from './thumbnail-seed';
import { useInView } from '../../hooks/use-in-view';

const EXTENSIONS: Record<string, string> = {
  'C#': 'cs',
  TypeScript: 'ts',
  JavaScript: 'js',
  Python: 'py',
  Rust: 'rs',
  'C++': 'cpp',
  C: 'c',
  ShaderLab: 'shader',
  HLSL: 'hlsl',
  Shell: 'sh',
  Java: 'java',
  Go: 'go',
};

// About 28 monospace chars fit in the title bar at font size 7.
const MAX_FILE_NAME = 28;

// Literal class names so Tailwind keeps them in the build.
const TONES = [
  'fill-base-content/30',
  'fill-base-content/20',
  'fill-base-content/10',
];

const WIDTH = 160;
const BAR_HEIGHT = 16;
const LINE_START_X = 16;
const LINE_STEP = 10;
const INDENT_STEP = 10;

/**
 * Generated code-window thumbnail for repos without an image.
 * Lines come from a seed of the repo name, so each repo always looks the same.
 */
const CodeThumbnail = ({
  name,
  language,
}: {
  name: string;
  language: string | null;
}) => {
  const extension = (language && EXTENSIONS[language]) || 'md';
  const fullName = `${name}.${extension}`;
  const fileName =
    fullName.length > MAX_FILE_NAME
      ? `${fullName.slice(0, MAX_FILE_NAME - 1)}…`
      : fullName;
  const lines = makeCodeLines(name);
  const free = WIDTH - LINE_START_X - 12;
  const [ref, inView] = useInView<SVGSVGElement>();
  // Typing needs IO; without it lines render complete. CSS skips it under reduced motion.
  const typing = typeof IntersectionObserver !== 'undefined';
  const last = lines[lines.length - 1];
  const lastX = LINE_START_X + last.indent * INDENT_STEP;
  const lastWidth = (free - last.indent * INDENT_STEP) * last.width;

  return (
    <svg
      ref={ref}
      viewBox="0 0 160 90"
      className={`w-full aspect-video block ${typing ? 'code-thumb-typing' : ''} ${inView ? 'is-in-view' : ''}`}
      style={{ '--line-count': lines.length } as React.CSSProperties}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="160" height="90" className="fill-base-200" />
      <rect width="160" height={BAR_HEIGHT} className="fill-base-300" />
      {[8, 15, 22].map((cx) => (
        <circle
          key={cx}
          cx={cx}
          cy={BAR_HEIGHT / 2}
          r="2.2"
          className="fill-base-content/20"
        />
      ))}
      <text
        x="30"
        y={BAR_HEIGHT / 2 + 2.5}
        fontSize="7"
        className="fill-base-content/60 font-mono"
      >
        {fileName}
      </text>
      <rect
        x="0"
        y={BAR_HEIGHT}
        width="3"
        height={90 - BAR_HEIGHT}
        style={{ fill: getLanguageColor(language ?? '') }}
      />
      {lines.map((line, i) => {
        const x = LINE_START_X + line.indent * INDENT_STEP;
        return (
          <rect
            key={i}
            x={x}
            y={BAR_HEIGHT + 9 + i * LINE_STEP}
            width={(free - line.indent * INDENT_STEP) * line.width}
            height="4"
            rx="2"
            className={`code-line ${TONES[line.tone]}`}
            style={{ '--i': i } as React.CSSProperties}
          />
        );
      })}
      <rect
        x={lastX + lastWidth + 2}
        y={BAR_HEIGHT + 8 + (lines.length - 1) * LINE_STEP}
        width="1.5"
        height="6"
        className="code-cursor fill-base-content/50"
      />
    </svg>
  );
};

export default CodeThumbnail;
