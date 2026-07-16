// A decorative, self-contained stand-in for a scannable QR code (this is a
// clone with no real donation flow, so no real code is needed).
export default function QrPlaceholder({ className = '', size = 120 }) {
  const cells = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return (seed >>> 8) % 100;
  };
  const n = 9;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const corner = (x < 3 && y < 3) || (x > n - 4 && y < 3) || (x < 3 && y > n - 4);
      if (corner) continue;
      if (rand() > 55) cells.push([x, y]);
    }
  }
  const cell = 100 / n;

  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#eef2ff" rx="6" />
      {[
        [2, 2],
        [n - 5, 2],
        [2, n - 5],
      ].map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx * cell},${cy * cell})`}>
          <rect width={cell * 3} height={cell * 3} fill="#4338ca" rx="2" />
          <rect x={cell * 0.6} y={cell * 0.6} width={cell * 1.8} height={cell * 1.8} fill="#eef2ff" rx="1" />
          <rect x={cell * 1.1} y={cell * 1.1} width={cell * 0.8} height={cell * 0.8} fill="#4338ca" />
        </g>
      ))}
      {cells.map(([x, y], i) => (
        <rect key={i} x={x * cell} y={y * cell} width={cell * 0.9} height={cell * 0.9} fill="#6366f1" />
      ))}
    </svg>
  );
}
