export default function TrustSection() {
  const reasons = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      title: "Expertise terrain",
      text: "Des années d'expérience dans l'installation de climatisation. On connaît les problèmes avant qu'ils arrivent.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: "Certifications reconnues",
      text: "RGE QualiPAC, assurance décennale, habilitation fluides frigorigènes. Tout est en règle, tout est vérifiable.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        </svg>
      ),
      title: "Modèles sélectionnés avec soin",
      text: "On ne vend pas 200 références. On a choisi 3 modèles fiables, testés et approuvés, pour que vous ne puissiez pas vous tromper.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
        </svg>
      ),
      title: "Pédagogie avant tout",
      text: "On vous explique tout en langage clair. Pas de jargon, pas de termes techniques inutiles. Vous comprenez ce que vous achetez.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
      title: "Transparence totale",
      text: "Prix affichés, devis détaillés, pas de frais cachés. Ce qu'on vous dit, c'est ce que vous payez. Point.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      title: "Réactivité réelle",
      text: "Estimation sous 48h, réponse le jour même, disponibilité le soir. On s'adapte à votre vie, pas l'inverse.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 bg-primary-light text-primary text-sm font-semibold rounded-full mb-4">
            Pourquoi nous faire confiance
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">
            On ne vous demande pas de nous croire sur parole.
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Voici concrètement pourquoi des centaines de clients nous choisissent pour leur projet clim.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {reason.icon}
              </div>
              <h3 className="text-base font-bold text-dark mb-2">{reason.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{reason.text}</p>
            </div>
          ))}
        </div>

        {/* Certifications band */}
        <div className="mt-14 bg-white rounded-2xl p-6 border border-gray-200 max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { label: "RGE QualiPAC", sub: "Certification" },
              { label: "Assurance décennale", sub: "Protection" },
              { label: "Fluides frigorigènes", sub: "Habilitation" },
              { label: "Garantie 5-7 ans", sub: "Couverture" },
            ].map((cert) => (
              <div key={cert.label} className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-dark">{cert.label}</div>
                  <div className="text-xs text-gray-400">{cert.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
