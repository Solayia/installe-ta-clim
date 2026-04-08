import Link from "next/link";

export default function CTABanner() {
  return (
    <section id="devis" className="py-20 lg:py-28 bg-primary relative overflow-hidden">
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
          Obtenez votre devis en 2 minutes. C&apos;est gratuit, sans engagement, et vous pouvez le faire ce soir depuis votre canapé.
        </p>

        {/* Dual CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-primary font-bold text-base rounded-2xl hover:bg-cream shadow-lg shadow-dark/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Obtenir mon devis gratuit
          </Link>
          <Link
            href="tel:+33100000000"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white font-bold text-base rounded-2xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            Parler à un conseiller
          </Link>
        </div>

        {/* Micro reassurance */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
          {[
            "Sans engagement",
            "Réponse sous 24h",
            "Disponible le soir",
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
