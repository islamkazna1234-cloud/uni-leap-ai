import { University } from "@/data/universities";

// Renders a deterministic, brand-colored SVG card art for a university.
// Eliminates photo-mismatch risk while looking polished.
const UniversityArt = ({ u, className }: { u: University; className?: string }) => {
  const [c1, c2] = u.brand;
  const initials = u.name
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 3)
    .map((w) => w[0])
    .join("");

  const id = `g-${u.id}`;
  return (
    <svg viewBox="0 0 800 500" className={className} preserveAspectRatio="xMidYMid slice" aria-label={`${u.name} brand art`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <pattern id={`p-${u.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40 L40 0" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill={`url(#${id})`} />
      <rect width="800" height="500" fill={`url(#p-${u.id})`} />
      {/* Stylized campus skyline */}
      <g fill="rgba(255,255,255,0.10)">
        <rect x="80" y="320" width="80" height="160" />
        <rect x="180" y="280" width="60" height="200" />
        <rect x="260" y="300" width="100" height="180" />
        <polygon points="310,260 360,300 260,300" />
        <rect x="380" y="340" width="70" height="140" />
        <rect x="470" y="300" width="120" height="180" />
        <polygon points="530,260 590,300 470,300" />
        <rect x="610" y="320" width="110" height="160" />
      </g>
      <text x="40" y="90" fill="rgba(255,255,255,0.95)" fontSize="56" fontWeight="800" fontFamily="Inter, sans-serif" letterSpacing="-2">
        {initials || u.name.slice(0, 3).toUpperCase()}
      </text>
      <text x="40" y="130" fill="rgba(255,255,255,0.75)" fontSize="18" fontWeight="500" fontFamily="Inter, sans-serif">
        {u.country}
      </text>
    </svg>
  );
};

export default UniversityArt;
