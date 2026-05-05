"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/* REC-012: Single floating CTA "Choisir ma clim" → #comment-ca-marche */
export default function FloatingCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (dismissed || !visible) return null;

  // Build the href: anchor on homepage, full path on other pages
  const href = pathname === "/" ? "#comment-ca-marche" : "/#comment-ca-marche";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden animate-slide-up">
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <a
            href={href}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/25"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Choisir ma clim
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="p-2 text-gray-400 hover:text-gray-600"
            aria-label="Fermer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
