// A self-contained SVG placeholder (no network dependency) used whenever a real
// image fails to load, so the UI never shows a broken-image icon.
const FALLBACK_SRC =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#e8f3ec"/>
      <g fill="none" stroke="#8fbfa0" stroke-width="2">
        <rect x="60" y="70" width="280" height="160" rx="8"/>
        <circle cx="130" cy="120" r="18"/>
        <path d="M60 210 L160 140 L220 180 L270 130 L340 200" />
      </g>
      <text x="200" y="255" font-family="sans-serif" font-size="14" fill="#5c8a6d" text-anchor="middle">
        Image unavailable
      </text>
    </svg>
  `);

export function installImageFallback() {
  document.addEventListener(
    'error',
    (e) => {
      const el = e.target;
      if (el && el.tagName === 'IMG' && el.src !== FALLBACK_SRC) {
        el.src = FALLBACK_SRC;
        el.classList.add('img-fallback');
      }
    },
    true
  );
}
