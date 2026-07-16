// Original mark for this clone (a leaf-winged bird motif), replacing the
// source site's hotlinked logo image with inline, self-contained artwork.
export default function Logo({ size = 40, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="zl-logo-grad" x1="4" y1="6" x2="44" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4338ca" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <path
        d="M24 4C13 10 6 18 6 27c0 8 7 15 15 17-3-6-3-12 0-18 4 7 11 10 17 8-1-13-6-24-14-30z"
        fill="url(#zl-logo-grad)"
      />
      <path d="M24 4c8 6 13 17 14 30-6-2-9-6-11-11" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
