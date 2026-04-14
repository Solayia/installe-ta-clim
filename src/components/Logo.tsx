import Link from "next/link";

/**
 * Brand logo — 3-blade swirl with dual blue crescents.
 * Each blade = light blue crescent (outer) + dark blue crescent (inner), separated by white gap.
 * Blades are rotated 120° apart.
 */
export function FanIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* ===== BLADE 1 — pointing up-right ===== */}
      {/* Light blue crescent (outer/left side) */}
      <path
        d="M96 96 C82 62, 78 28, 100 8 C108 0, 112 4, 108 14 C100 36, 96 60, 96 80Z"
        fill="#7CC4EA"
      />
      {/* Dark blue crescent (inner/right side) */}
      <path
        d="M100 94 C104 60, 116 30, 138 14 C148 6, 152 12, 144 22 C128 42, 112 66, 104 86Z"
        fill="#1B5DA8"
      />

      {/* ===== BLADE 2 — pointing bottom-left ===== */}
      {/* Light blue crescent (outer) */}
      <path
        d="M96 104 C62 108, 30 118, 10 98 C2 90, 6 86, 16 92 C36 104, 58 108, 78 106Z"
        fill="#7CC4EA"
      />
      {/* Dark blue crescent (inner) */}
      <path
        d="M94 100 C64 92, 34 76, 20 54 C14 42, 20 40, 28 48 C44 66, 64 82, 84 94Z"
        fill="#1B5DA8"
      />

      {/* ===== BLADE 3 — pointing bottom-right ===== */}
      {/* Light blue crescent (outer) */}
      <path
        d="M108 108 C120 140, 122 170, 104 188 C96 196, 92 192, 96 182 C102 162, 106 140, 106 120Z"
        fill="#7CC4EA"
      />
      {/* Dark blue crescent (inner) */}
      <path
        d="M104 106 C96 136, 82 164, 60 178 C50 186, 46 180, 54 172 C70 156, 84 136, 96 116Z"
        fill="#1B5DA8"
      />
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
