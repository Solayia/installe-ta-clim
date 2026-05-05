import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
          Prêt à passer au frais ?
        </h2>
        <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
          Visualisez la clim chez vous en réalité augmentée, obtenez votre devis en 2 minutes. Gratuit et sans engagement.
        </p>

        {/* Dual CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/devis"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-primary font-bold text-base rounded-2xl hover:bg-cream shadow-lg shadow-dark/10 transition-all duration-300 hover:-translate-y-0.5 btn-glow"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
            </svg>
            Obtenir mon devis gratuit
          </Link>
          <Link
            href="/devis"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white font-bold text-base rounded-2xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Nous contacter
          </Link>
        </div>

        {/* Micro reassurance */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
          {[
            "Sans engagement",
            "Réponse sous 24h",
            "Réalité augmentée",
            "100% gratuit",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
