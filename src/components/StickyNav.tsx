"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "comment-ca-marche", label: "Comment ça marche" },
  { id: "nos-clims", label: "Nos clims" },
  { id: "aides", label: "Aides" },
  { id: "avis", label: "Avis" },
  { id: "faq", label: "FAQ" },
  { id: "devis", label: "Devis gratuit", href: "/devis" },
];

export default function StickyNav() {
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);

      // Find active section
      const offsets = sections.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: Infinity };
        return { id: s.id, top: el.getBoundingClientRect().top };
      });

      const current = offsets
        .filter((o) => o.top <= 150)
        .sort((a, b) => b.top - a.top)[0];

      if (current) setActive(current.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <nav className="fixed top-16 lg:top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm animate-slide-down">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto scrollbar-none py-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={"href" in s && s.href ? s.href : `#${s.id}`}
              className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                active === s.id
                  ? "bg-primary text-white"
                  : s.id === "devis"
                  ? "bg-secondary/10 text-secondary hover:bg-secondary/20 font-semibold"
                  : "text-gray-500 hover:text-dark hover:bg-gray-100"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
