export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center">
      {/* REC-014: Background image — interior with wall-mounted AC on the right (Pexels #7060814, libre de droit) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/7060814/pexels-photo-7060814.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80')",
        }}
      />
      {/* Overlay gradient — lighter on right to show the AC unit in the photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f3d]/90 via-[#0a1f3d]/70 to-[#0a1f3d]/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="max-w-2xl">
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

        </div>
      </div>
    </section>
  );
}
