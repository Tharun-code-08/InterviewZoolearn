// Deterministic, fully self-contained illustrations (no external images at all).
// Every "photo" in this clone is generated from the subject's name/category so
// nothing is ever hotlinked from a third party.

const PALETTES = [
  ['#4338ca', '#6366f1'],
  ['#0f766e', '#2dd4bf'],
  ['#b45309', '#f59e0b'],
  ['#9d174d', '#f472b6'],
  ['#5b21b6', '#a78bfa'],
  ['#9a3412', '#fb923c'],
  ['#155e75', '#22d3ee'],
  ['#3f6212', '#a3e635'],
  ['#9f1239', '#fb7185'],
  ['#1e40af', '#60a5fa'],
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function paletteFor(seed) {
  const h = hashString(String(seed));
  return PALETTES[h % PALETTES.length];
}

function initialsFor(label) {
  const words = String(label).trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * Build a data: URI for a self-contained SVG "photo" placeholder: a soft
 * gradient card with the subject's initials as a monogram and a few organic
 * decorative shapes. Deterministic per `seed` so the same subject always
 * renders the same art (no flicker on re-render).
 */
export function generatedArt(seed, label = '', opts = {}) {
  const { width = 400, height = 400 } = opts;
  const [c1, c2] = paletteFor(seed);
  const h = hashString(String(seed) + '::deco');
  const monogram = initialsFor(label || seed);
  const r1x = 20 + (h % 40);
  const r1y = 15 + ((h >> 3) % 40);
  const r2x = 60 + ((h >> 5) % 30);
  const r2y = 65 + ((h >> 7) % 25);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="100%" stop-color="${c2}"/>
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#g)"/>
      <circle cx="${r1x}" cy="${r1y}" r="22" fill="#ffffff22"/>
      <circle cx="${r2x}" cy="${r2y}" r="16" fill="#00000022"/>
      <text x="50" y="58" font-family="system-ui,sans-serif" font-size="30" font-weight="700"
            fill="#ffffff" text-anchor="middle" opacity="0.95">${monogram}</text>
    </svg>
  `;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export function generatedArtFor(entity) {
  if (!entity) return generatedArt('unknown', '?');
  const seed = entity.slug || entity.id || entity.name || 'x';
  const label = entity.name || entity.scientificName || '';
  return generatedArt(seed, label);
}
