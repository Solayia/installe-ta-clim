export default function TrustBar() {
  const items = [
    { label: "Certifié RGE QualiPAC", sub: "Installateurs qualifiés" },
    { label: "Garantie 5 à 7 ans", sub: "Pièces et main d'oeuvre" },
    { label: "Paiement sécurisé", sub: "CB, virement, 3x sans frais" },
    { label: "Satisfait ou remboursé", sub: "Retour sous 30 jours" },
  ];

  return (
    <section className="bg-white border-y border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-dark leading-tight">{item.label}</div>
                <div className="text-[11px] text-gray-400">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
