export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center">
      {/* Background image — modern living room */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1631545806609-53e4efa5a8e5?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f3d]/90 via-[#0a1f3d]/75 to-[#0a1f3d]/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="flex items-center gap-8 lg:gap-16">
          {/* Left: text content */}
          <div className="max-w-2xl flex-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 text-sm font-medium text-white mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
              Estimation gratuite, sans engagement
            </div>

            {/* REC-013: Wording englobant les 2 offres */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-white leading-[1.1] tracking-tight">
              Votre climatisation,{" "}
              <span className="text-primary relative inline-block">
                à votre façon
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C40 2 80 2 100 6C120 10 160 4 198 6" stroke="#1B5DA8" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
              .
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-white/80 leading-relaxed max-w-xl">
              Choisissez votre clim parmi nos modèles sélectionnés.{" "}
              <strong className="text-white font-semibold">
                Pack prêt à poser ou installation complète par un pro — c&apos;est vous qui décidez.
              </strong>
            </p>

            {/* Two paths CTA — REC-001 */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="/devis#pro"
                className="group inline-flex flex-col items-center justify-center px-7 py-4 bg-primary text-white font-bold text-base rounded-2xl hover:bg-primary-hover shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary-hover/30 transition-all duration-300 hover:-translate-y-0.5 btn-glow"
              >
                <span className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  Je fais installer
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="text-xs font-normal text-white/70 mt-1">Toulouse et alentours</span>
              </a>
              <a
                href="/devis#diy"
                className="group inline-flex flex-col items-center justify-center px-7 py-4 bg-white/15 backdrop-blur-sm text-white font-bold text-base rounded-2xl border border-white/25 hover:bg-white/25 shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                  </svg>
                  J&apos;installe moi-même
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="text-xs font-normal text-white/70 mt-1">Partout en France</span>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              {[
                { icon: "clock", text: "Estimation en 2 min" },
                { icon: "home", text: "Sans déplacement" },
                { icon: "check", text: "Sans engagement" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-white/70">
                  {item.icon === "clock" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                  )}
                  {item.icon === "home" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                  )}
                  {item.icon === "check" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {item.text}
                </div>
              ))}
            </div>

            {/* Zone info */}
            <div className="mt-8 sm:mt-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/15 px-4 py-2.5 sm:px-5 sm:py-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-xs sm:text-sm text-white/80 font-medium">
                  Installation : Toulouse &amp; alentours <span className="text-white/40">(31, 32, 65, 81, 82)</span> — Livraison : toute la France
                </span>
              </div>
            </div>
          </div>

          {/* REC-014: Right — AC unit visual, visible on lg+ */}
          <div className="hidden lg:flex flex-col items-center flex-shrink-0">
            <div className="relative">
              {/* Glow effect behind the AC */}
              <div className="absolute -inset-8 bg-primary/20 rounded-full blur-3xl" />
              {/* Wall-mounted split AC illustration */}
              <svg width="340" height="200" viewBox="0 0 340 200" fill="none" className="relative drop-shadow-2xl">
                {/* Wall texture */}
                <rect x="20" y="0" width="300" height="200" rx="12" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.12" strokeWidth="1" />

                {/* Wall mount bracket */}
                <rect x="70" y="38" width="200" height="6" rx="3" fill="#94a3b8" fillOpacity="0.6" />

                {/* Main AC unit body */}
                <rect x="50" y="44" width="240" height="80" rx="12" fill="white" />
                <rect x="50" y="44" width="240" height="80" rx="12" stroke="#e2e8f0" strokeWidth="1.5" />

                {/* Top accent bar — brand color */}
                <rect x="50" y="44" width="240" height="16" rx="12" fill="#1B5DA8" />
                <rect x="50" y="56" width="240" height="6" fill="#1B5DA8" />

                {/* LED indicator */}
                <circle cx="270" cy="72" r="3" fill="#1B5DA8" />
                <circle cx="270" cy="72" r="6" fill="#1B5DA8" fillOpacity="0.2" />

                {/* Brand name on unit */}
                <text x="170" y="82" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="system-ui" fontWeight="600" letterSpacing="2">HEIWA</text>

                {/* Vent lines */}
                <line x1="70" y1="96" x2="270" y2="96" stroke="#f1f5f9" strokeWidth="1.5" />
                <line x1="70" y1="100" x2="270" y2="100" stroke="#f1f5f9" strokeWidth="1.5" />
                <line x1="70" y1="104" x2="270" y2="104" stroke="#f1f5f9" strokeWidth="1.5" />

                {/* Bottom flap (air direction) */}
                <path d="M60 124 Q170 134 280 124" stroke="#e2e8f0" strokeWidth="2" fill="white" />

                {/* Air flow particles */}
                <g opacity="0.4">
                  <path d="M100 134 C100 148 106 154 106 168" stroke="#1B5DA8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4" />
                  <path d="M140 136 C140 150 146 156 146 172" stroke="#1B5DA8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4" />
                  <path d="M170 138 C170 152 176 158 176 174" stroke="#1B5DA8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4" />
                  <path d="M200 136 C200 150 206 156 206 172" stroke="#1B5DA8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4" />
                  <path d="M240 134 C240 148 246 154 246 168" stroke="#1B5DA8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4" />
                </g>

                {/* Temperature display badge */}
                <rect x="125" y="148" width="90" height="36" rx="18" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
                <text x="155" y="171" fill="white" fontSize="16" fontFamily="system-ui" fontWeight="800">22°C</text>
                <circle cx="190" cy="163" r="6" fill="#22c55e" fillOpacity="0.8" />
                <path d="M187 163l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Floating badges around AC */}
              <div className="absolute -top-4 -right-4 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20 px-3 py-1.5 text-xs font-semibold text-white">
                Classe A+
              </div>
              <div className="absolute -bottom-2 -left-4 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20 px-3 py-1.5 text-xs font-semibold text-white">
                24 dB — Silencieuse
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
