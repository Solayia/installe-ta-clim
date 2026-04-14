export default function AidesSection() {
  const aides = [
    {
      name: "MaPrimeRénov'",
      amount: "Jusqu'à 5 000 EUR",
      desc: "Aide de l'État pour l'installation d'une PAC air-air par un professionnel RGE. Montant selon revenus du foyer.",
      eligible: "Installation par un pro RGE",
      color: "primary",
    },
    {
      name: "Prime CEE",
      amount: "300 à 900 EUR",
      desc: "Certificats d'Économie d'Énergie : prime versée par les fournisseurs d'énergie, cumulable avec MaPrimeRénov'.",
      eligible: "Logement de + de 2 ans",
      color: "secondary",
    },
    {
      name: "TVA réduite 10%",
      amount: "-10% sur la facture",
      desc: "TVA à taux réduit automatiquement appliquée quand l'installation est réalisée par un artisan qualifié RGE.",
      eligible: "Installation pro uniquement",
      color: "primary",
    },
    {
      name: "Éco-PTZ",
      amount: "Jusqu'à 15 000 EUR",
      desc: "Prêt à taux zéro pour financer les travaux de rénovation énergétique, remboursable sur 20 ans maximum.",
      eligible: "Résidence principale",
      color: "secondary",
    },
  ];

  return (
    <section id="aides" className="py-20 lg:py-28 bg-gradient-to-br from-primary-light via-white to-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 bg-primary-light text-primary text-sm font-semibold rounded-full mb-4">
            Aides financières 2026
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">
            Jusqu&apos;à <span className="text-primary">6 000 EUR d&apos;aides</span> pour votre clim.
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            L&apos;État encourage l&apos;installation de climatisations réversibles performantes. Profitez-en — on s&apos;occupe même des démarches.
          </p>
        </div>

        {/* Aides grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-12">
          {aides.map((aide) => (
            <div
              key={aide.name}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 card-lift"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                aide.color === "primary" ? "bg-primary-light" : "bg-secondary-light"
              }`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={aide.color === "primary" ? "#1B5DA8" : "#6BB8E0"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>

              {/* Content */}
              <h3 className="font-bold text-dark text-sm sm:text-base">{aide.name}</h3>
              <div className={`text-lg sm:text-2xl font-extrabold mt-1 ${
                aide.color === "primary" ? "text-primary" : "text-secondary"
              }`}>
                {aide.amount}
              </div>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">{aide.desc}</p>

              {/* Eligibility */}
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {aide.eligible}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 lg:p-10 max-w-3xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-6 text-center lg:text-left">
            <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-dark">On gère les démarches pour vous</h3>
              <p className="text-sm text-gray-500 mt-1">Nos installateurs certifiés RGE vous accompagnent dans le montage de vos dossiers d&apos;aides. Vous n&apos;avez rien à faire — on maximise vos économies.</p>
            </div>
            <a
              href="/devis"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors flex-shrink-0"
            >
              Simuler mes aides
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
