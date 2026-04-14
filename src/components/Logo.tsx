import Link from "next/link";

/**
 * Fan/turbine icon matching the new brand logo — 3 blades with dual blue gradient.
 */
export function FanIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  const id = `fan-grad-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6BB8E0" />
          <stop offset="100%" stopColor="#1B5DA8" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6BB8E0" />
          <stop offset="100%" stopColor="#1B5DA8" />
        </linearGradient>
      </defs>
      {/* Center hub */}
      <circle cx="20" cy="20" r="3.5" fill={`url(#${id}-a)`} />
      {/* Blade 1 - top */}
      <path d="M20 16.5c-1.5 0-2.8-1-3.2-2.5C15.5 9.5 16.5 4 20 2c3.5 2 4.5 7.5 3.2 12-.4 1.5-1.7 2.5-3.2 2.5z" fill={`url(#${id}-a)`} />
      {/* Blade 2 - bottom-left */}
      <path d="M17 22c.7 1.3.4 2.8-.6 3.8C13.3 29 8.2 29.3 5.5 27c.5-3.8 4.3-6.8 8.5-6.8 1.3 0 2.4.6 3 1.8z" fill={`url(#${id}-b)`} />
      {/* Blade 3 - bottom-right */}
      <path d="M23 22c-.7 1.3-.4 2.8.6 3.8 3.1 3.2 8.2 3.3 10.9 1-.5-3.8-4.3-6.8-8.5-6.8-1.3 0-2.4.6-3 1.8z" fill={`url(#${id}-a)`} />
    </svg>
  );
}

/**
 * Full brand logo: fan icon + "Installe ta Clim" wordmark
 */
export default function Logo({ showTagline = true }: { showTagline?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="w-10 h-10 bg-gradient-to-br from-[#1B5DA8] to-[#6BB8E0] rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-md shadow-[#1B5DA8]/20">
        <FanIcon size={22} />
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
