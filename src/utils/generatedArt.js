// Deterministic, fully self-contained illustrations (no external images at
// all) — a "marble avatar" style generative mark: layered soft-edged blobs,
// a mesh gradient, and a monogram, all seeded from the subject's identity so
// the same subject always renders the same art.

const PALETTES = [
  ['#4338ca', '#6366f1', '#a5b4fc'],
  ['#0f766e', '#14b8a6', '#5eead4'],
  ['#b45309', '#f59e0b', '#fcd34d'],
  ['#9d174d', '#ec4899', '#f9a8d4'],
  ['#5b21b6', '#8b5cf6', '#c4b5fd'],
  ['#9a3412', '#f97316', '#fdba74'],
  ['#155e75', '#06b6d4', '#67e8f9'],
  ['#3f6212', '#84cc16', '#bef264'],
  ['#9f1239', '#fb7185', '#fda4af'],
  ['#1e40af', '#3b82f6', '#93c5fd'],
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function initialsFor(label) {
  const words = String(label).trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * Build a data: URI for a self-contained generative "marble avatar": a soft
 * mesh-gradient card with a few translucent organic blobs and a monogram.
 * Deterministic per `seed` so the same subject always renders identically.
 */
export function generatedArt(seed, label = '', opts = {}) {
  const { width = 400, height = 400 } = opts;
  const baseHash = hashString(String(seed));
  const [c1, c2, c3] = PALETTES[baseHash % PALETTES.length];
  const rand = mulberry32(baseHash);
  const monogram = initialsFor(label || seed);

  const blobs = [];
  const blobCount = 3;
  for (let i = 0; i < blobCount; i++) {
    const cx = 15 + rand() * 70;
    const cy = 15 + rand() * 70;
    const r = 26 + rand() * 30;
    const rot = rand() * 360;
    const sx = 0.7 + rand() * 0.6;
    const opacity = 0.16 + rand() * 0.14;
    blobs.push({ cx, cy, r, rot, sx, opacity });
  }

  const blobSvg = blobs
    .map(
      (b, i) => `
      <g transform="rotate(${b.rot.toFixed(1)} ${b.cx.toFixed(1)} ${b.cy.toFixed(1)})">
        <ellipse cx="${b.cx.toFixed(1)}" cy="${b.cy.toFixed(1)}" rx="${b.r.toFixed(1)}" ry="${(b.r * b.sx).toFixed(1)}"
          fill="${i % 2 === 0 ? '#ffffff' : c3}" opacity="${b.opacity.toFixed(2)}" />
      </g>`
    )
    .join('');

  const gx1 = (rand() * 100).toFixed(0);
  const gy1 = (rand() * 100).toFixed(0);
  const gx2 = (100 - gx1).toFixed(0);
  const gy2 = (100 - gy1).toFixed(0);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="g" x1="${gx1}%" y1="${gy1}%" x2="${gx2}%" y2="${gy2}%">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="55%" stop-color="${c2}"/>
          <stop offset="100%" stop-color="${c1}"/>
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.2"/>
        </filter>
        <clipPath id="clip"><rect width="100" height="100" rx="10"/></clipPath>
      </defs>
      <g clip-path="url(#clip)">
        <rect width="100" height="100" fill="url(#g)"/>
        <g filter="url(#soft)">${blobSvg}</g>
        <rect width="100" height="100" fill="url(#g)" opacity="0.08"/>
      </g>
      <rect width="100" height="100" rx="10" fill="none" stroke="#ffffff2e" stroke-width="1"/>
      <text x="50" y="59" font-family="Georgia, 'Times New Roman', serif" font-size="28" font-weight="600"
            fill="#ffffff" text-anchor="middle" opacity="0.97" style="letter-spacing:1px">${monogram}</text>
    </svg>
  `;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg.replace(/\s+/g, ' '));
}

export function generatedArtFor(entity) {
  if (!entity) return generatedArt('unknown', '?');
  const seed = entity.slug || entity.id || entity.name || 'x';
  const label = entity.name || entity.scientificName || '';
  return generatedArt(seed, label);
}
