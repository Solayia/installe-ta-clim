import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background image — modern living room */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e1f]/85 via-[#1a2e1f]/65 to-[#1a2e1f]/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 text-sm font-medium text-white mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
            Devis en 2 minutes, sans engagement
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-white leading-[1.1] tracking-tight">
            La clim, en toute{" "}
            <span className="text-primary relative inline-block">
              simplicité
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C40 2 80 2 100 6C120 10 160 4 198 6" stroke="#88a78b" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl">
            Choisissez votre modèle, faites-vous livrer, installez vous-même ou faites-vous accompagner de A à Z.{" "}
            <strong className="text-white font-semibold">
              Un parcours clair, des modèles sélectionnés, une estimation rapide — sans perdre des semaines.
            </strong>
          </p>

          {/* Two paths CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="#parcours"
              className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-primary text-white font-bold text-base rounded-2xl hover:bg-primary-hover shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary-hover/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3h18v18H3zM12 8v8M8 12h8" />
              </svg>
              Choisir ma clim
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="#devis"
              className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-white/15 backdrop-blur-sm text-white font-bold text-base rounded-2xl border border-white/25 hover:bg-white/25 shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Demander mon estimation
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            {[
              { icon: "star", text: "4.8/5 - 200+ avis" },
              { icon: "shield", text: "Certifié RGE" },
              { icon: "clock", text: "Devis en 2 min" },
              { icon: "home", text: "Sans déplacement" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-white/70">
                {item.icon === "star" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                )}
                {item.icon === "shield" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#88a78b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                )}
                {item.icon === "clock" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#88a78b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                )}
                {item.icon === "home" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#88a78b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                )}
                {item.text}
              </div>
            ))}
          </div>

          {/* Mini stats floating card */}
          <div className="mt-10 inline-flex bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 px-6 py-4 gap-8">
            {[
              { value: "24-72h", label: "Livraison" },
              { value: "-40%", label: "vs devis classique" },
              { value: "5 ans", label: "Garantie" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
