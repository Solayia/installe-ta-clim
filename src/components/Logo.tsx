import Link from "next/link";

/**
 * Brand logo icon — 3-blade swirl/triskelion matching the official logo.
 * Each blade has a light blue and dark blue crescent shape.
 */
export function FanIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  const id = `logo-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-light`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8DCBEA" />
          <stop offset="100%" stopColor="#6BB8E0" />
        </linearGradient>
        <linearGradient id={`${id}-dark`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B6FC0" />
          <stop offset="100%" stopColor="#154A8A" />
        </linearGradient>
      </defs>

      {/* Blade 1 — top, going right */}
      {/* Light part */}
      <path
        d="M50 50 C46 38, 48 22, 58 12 C62 8, 66 10, 64 16 C60 26, 54 38, 50 50Z"
        fill={`url(#${id}-light)`}
      />
      {/* Dark part */}
      <path
        d="M50 50 C56 36, 64 24, 72 18 C78 14, 80 18, 76 24 C70 32, 60 42, 50 50Z"
        fill={`url(#${id}-dark)`}
      />

      {/* Blade 2 — bottom-left */}
      {/* Light part */}
      <path
        d="M50 50 C38 54, 22 52, 12 42 C8 38, 10 34, 16 36 C26 40, 38 46, 50 50Z"
        fill={`url(#${id}-light)`}
      />
      {/* Dark part */}
      <path
        d="M50 50 C36 44, 24 36, 18 28 C14 22, 18 20, 24 24 C32 30, 42 40, 50 50Z"
        fill={`url(#${id}-dark)`}
      />

      {/* Blade 3 — bottom-right */}
      {/* Light part */}
      <path
        d="M50 50 C54 62, 52 78, 42 88 C38 92, 34 90, 36 84 C40 74, 46 62, 50 50Z"
        fill={`url(#${id}-light)`}
      />
      {/* Dark part */}
      <path
        d="M50 50 C44 64, 36 76, 28 82 C22 86, 20 82, 24 76 C30 68, 40 58, 50 50Z"
        fill={`url(#${id}-dark)`}
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
        <FanIcon size={38} />
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
