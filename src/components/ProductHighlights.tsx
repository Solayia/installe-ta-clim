import Link from "next/link";

const products = [
  {
    tier: "Entrée de gamme",
    badge: null,
    name: "Essentiel",
    brand: "Marque fiable",
    tagline: "L'air frais sans se ruiner",
    priceFrom: "699",
    priceInstalledFrom: "1 499",
    surface: "Jusqu'à 20 m²",
    noise: "24 dB(A)",
    efficiency: "A+",
    consumption: "~15 €/mois en été",
    savings: "Économique à l'achat et à l'usage",
    image: "",
    benefits: [
      "Idéal pour une chambre ou un bureau",
      "Silencieuse en mode nuit",
      "Télécommande incluse",
      "Garantie 5 ans",
    ],
    highlight: false,
  },
  {
    tier: "Notre recommandation",
    badge: "Le plus choisi",
    name: "Confort+",
    brand: "Marque premium",
    tagline: "Le meilleur rapport qualité-prix",
    priceFrom: "999",
    priceInstalledFrom: "1 899",
    surface: "Jusqu'à 35 m²",
    noise: "21 dB(A)",
    efficiency: "A++",
    consumption: "~18 €/mois en été",
    savings: "Jusqu'à 50% vs chauffage électrique en hiver",
    image: "",
    benefits: [
      "Parfait pour un salon ou pièce de vie",
      "Ultra-silencieuse, même en journée",
      "WiFi intégré + appli smartphone",
      "Filtre anti-bactérien & déshumidification",
    ],
    highlight: true,
  },
  {
    tier: "Haut de gamme",
    badge: null,
    name: "Premium",
    brand: "Marque leader",
    tagline: "La performance sans compromis",
    priceFrom: "1 499",
    priceInstalledFrom: "2 399",
    surface: "Jusqu'à 50 m²",
    noise: "19 dB(A)",
    efficiency: "A+++",
    consumption: "~20 €/mois en été",
    savings: "La plus économe au m² sur le long terme",
    image: "",
    benefits: [
      "Grandes pièces et espaces ouverts",
      "La plus silencieuse du marché",
      "Purificateur d'air intégré",
      "Garantie étendue 7 ans",
    ],
    highlight: false,
  },
];

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className={`relative bg-white rounded-3xl overflow-hidden card-lift ${
      product.highlight
        ? "border-2 border-primary shadow-xl shadow-primary/10 scale-[1.02] lg:scale-105"
        : "border border-gray-200"
    }`}>
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-2.5 text-sm font-bold tracking-wide flex items-center justify-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          {product.badge}
        </div>
      )}

      <div className={`p-5 sm:p-8 ${product.badge ? "pt-12 sm:pt-14" : ""}`}>
        {/* Tier */}
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{product.tier}</span>

        {/* Name + tagline */}
        <h3 className="text-2xl font-extrabold text-dark mt-2">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.tagline}</p>

        {/* Product visual */}
        <div className={`my-6 rounded-2xl overflow-hidden ${
          product.highlight ? "ring-2 ring-primary/20" : ""
        }`}>
          <div className={`w-full h-44 flex flex-col items-center justify-center relative ${
            product.highlight
              ? "bg-gradient-to-br from-primary/5 via-primary-light to-cream"
              : "bg-gradient-to-br from-gray-50 via-primary-light/30 to-cream"
          }`}>
            {/* Wall line */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-100/80 to-transparent" />
            {/* AC unit illustration */}
            <svg width="160" height="80" viewBox="0 0 160 80" fill="none" className="mt-2">
              {/* Wall mount bracket */}
              <rect x="30" y="8" width="100" height="4" rx="2" fill="#d1d5db" />
              {/* Main unit body */}
              <rect x="20" y="12" width="120" height="40" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
              {/* Top accent line */}
              <rect x="20" y="12" width="120" height="8" rx="6" fill={product.highlight ? "#88a78b" : "#e8efe9"} />
              <rect x="20" y="18" width="120" height="4" fill={product.highlight ? "#88a78b" : "#e8efe9"} />
              {/* Display/LED */}
              <circle cx="130" cy="28" r="2" fill={product.highlight ? "#88a78b" : "#d1d5db"} />
              {/* Vent lines */}
              <line x1="32" y1="44" x2="128" y2="44" stroke="#f3f4f6" strokeWidth="1.5" />
              <line x1="32" y1="47" x2="128" y2="47" stroke="#f3f4f6" strokeWidth="1.5" />
              {/* Bottom flap */}
              <path d="M25 52 Q80 58 135 52" stroke="#e5e7eb" strokeWidth="1.5" fill="white" />
              {/* Air flow */}
              <path d="M50 58 C50 64 54 66 54 72" stroke="#88a78b" strokeWidth="1" strokeLinecap="round" opacity="0.3" strokeDasharray="2 2" />
              <path d="M80 60 C80 66 84 68 84 74" stroke="#88a78b" strokeWidth="1" strokeLinecap="round" opacity="0.3" strokeDasharray="2 2" />
              <path d="M110 58 C110 64 114 66 114 72" stroke="#88a78b" strokeWidth="1" strokeLinecap="round" opacity="0.3" strokeDasharray="2 2" />
            </svg>
            <span className="text-xs font-bold text-primary/70 mt-1 tracking-wide uppercase">{product.name}</span>
            <span className="text-[10px] text-gray-400">{product.surface}</span>
          </div>
        </div>

        {/* Specs row */}
        <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1.5" title="Surface recommandée">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#88a78b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <span className="text-gray-600">{product.surface}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Niveau sonore">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#88a78b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            </svg>
            <span className="text-gray-600">{product.noise}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Classe énergétique">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#88a78b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span className="font-semibold text-primary">{product.efficiency}</span>
          </div>
        </div>

        {/* Consumption & savings */}
        <div className="flex items-center gap-2 mb-1 text-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#88a78b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span className="text-gray-600">Conso : <strong className="text-dark">{product.consumption}</strong></span>
        </div>
        <div className="flex items-center gap-2 mb-5 text-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#88a78b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
          <span className="text-gray-500 text-xs">{product.savings}</span>
        </div>

        {/* Benefits */}
        <ul className="space-y-2 mb-6">
          {product.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#88a78b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {b}
            </li>
          ))}
        </ul>

        {/* Prices — "a partir de" */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <span className="text-[10px] font-medium text-gray-400 uppercase block">Pack prêt à poser</span>
              <span className="text-[10px] text-gray-300">à partir de</span>
            </div>
            <span className="text-xl font-extrabold text-dark">{product.priceFrom} <span className="text-sm font-medium text-gray-400">EUR</span></span>
          </div>
          <div className="border-t border-gray-100 pt-2.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-medium text-gray-400 uppercase block">Fourni + installé</span>
              <span className="text-[10px] text-gray-300">à partir de</span>
            </div>
            <span className="text-xl font-extrabold text-primary">{product.priceInstalledFrom} <span className="text-sm font-medium text-gray-400">EUR</span></span>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-2">
          <Link
            href="#devis"
            className={`block w-full text-center px-5 py-3.5 font-bold rounded-xl transition-all duration-200 ${
              product.highlight
                ? "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20"
                : "bg-primary text-white hover:bg-primary-hover"
            }`}
          >
            Choisir cette clim
          </Link>
          <Link
            href="#devis"
            className="block w-full text-center px-5 py-3 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
          >
            Demander une estimation installée
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProductHighlights() {
  return (
    <section id="nos-clims" className="py-16 lg:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 bg-primary-light text-primary text-sm font-semibold rounded-full mb-4">
            Nos 3 climatisations recommandées
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">
            On a simplifié le choix pour vous.
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Pas 50 modèles. Juste 3 clims soigneusement sélectionnées pour couvrir tous les besoins. Choisissez en fonction de votre surface et de votre budget.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-4 items-start max-w-5xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12 max-w-xl mx-auto">
          <div className="inline-flex items-start gap-3 bg-white rounded-2xl p-5 border border-gray-200 text-left">
            <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#88a78b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-dark">Multi-split ou config sur-mesure ?</p>
              <p className="text-xs text-gray-400 mt-1">Contactez-nous pour un devis personnalisé. On s&apos;adapte à tous les projets, toutes les surfaces.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
