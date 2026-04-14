import Link from "next/link";

/**
 * Brand logo — 3-blade swirl with dual blue crescents (light + dark).
 * Uses a single blade definition rotated 120° for perfect symmetry.
 * Faithful reproduction of the official logo.
 */
export function FanIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/*
        Each blade = 2 crescents:
        - Light blue (outer): wider, more swept
        - Dark blue (inner): tighter curve, partially behind
        White gap between them created by spacing the paths.

        Blade points UP from center, then rotated 0°, 120°, 240°.
      */}

      {/* === BLADE 1 (top-right, 0° rotation) === */}
      <g transform="rotate(-30)">
        {/* Light blue crescent — outer sweep */}
        <path
          d="M-2,-4 C-8,-20 -6,-38 8,-48 C12,-50 14,-46 10,-40 C2,-28 -2,-16 -2,-4Z"
          fill="#7CC4EA"
        />
        {/* Dark blue crescent — inner sweep */}
        <path
          d="M2,-4 C10,-18 22,-32 36,-40 C42,-42 42,-36 36,-30 C24,-18 12,-8 2,-4Z"
          fill="#1660A7"
        />
      </g>

      {/* === BLADE 2 (bottom-left, 120° rotation) === */}
      <g transform="rotate(90)">
        {/* Light blue crescent */}
        <path
          d="M-2,-4 C-8,-20 -6,-38 8,-48 C12,-50 14,-46 10,-40 C2,-28 -2,-16 -2,-4Z"
          fill="#7CC4EA"
        />
        {/* Dark blue crescent */}
        <path
          d="M2,-4 C10,-18 22,-32 36,-40 C42,-42 42,-36 36,-30 C24,-18 12,-8 2,-4Z"
          fill="#1660A7"
        />
      </g>

      {/* === BLADE 3 (bottom-right, 240° rotation) === */}
      <g transform="rotate(210)">
        {/* Light blue crescent */}
        <path
          d="M-2,-4 C-8,-20 -6,-38 8,-48 C12,-50 14,-46 10,-40 C2,-28 -2,-16 -2,-4Z"
          fill="#7CC4EA"
        />
        {/* Dark blue crescent */}
        <path
          d="M2,-4 C10,-18 22,-32 36,-40 C42,-42 42,-36 36,-30 C24,-18 12,-8 2,-4Z"
          fill="#1660A7"
        />
      </g>
    </svg>
  );
}

/**
 * Full brand logo: swirl icon + "Installe ta Clim" wordmark
 */
export default function Logo({ showTagline = true }: { showTagline?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
        <FanIcon size={40} />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-extrabold text-dark leading-tight tracking-tight uppercase">
          Installe ta Clim
        </span>
        {showTagline && (
          <span className="text-[10px] text-gray-400 leading-tight hidden sm:block tracking-widest uppercase">
            La clim, simplement
          </span>
        )}
      </div>
    </Link>
  );
}
