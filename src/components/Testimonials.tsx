const testimonials = [
  {
    name: "Sophie Martinez",
    location: "Toulouse (31)",
    rating: 5,
    text: "J'avais peur que ce soit compliqué. En fait, j'ai eu mon devis en 1 heure et l'installation était faite 5 jours après. L'installateur était ponctuel et pro. Bravo !",
    type: "Installation complète",
    date: "Mars 2026",
    detail: "Confort+ — Salon 30 m²",
  },
  {
    name: "Thomas Rougier",
    location: "Albi (81)",
    rating: 5,
    text: "Pack prêt à poser commandé un lundi, reçu le mercredi. J'ai installé avec ma femme en un week-end. Les tutos vidéo sont super clairs, même pour un débutant.",
    type: "Pack prêt à poser",
    date: "Février 2026",
    detail: "Essentiel — Chambre 18 m²",
  },
  {
    name: "Isabelle Lacroix",
    location: "Muret (31)",
    rating: 5,
    text: "Ce qui m'a convaincue c'est la visio. Pas de visite à domicile, pas de demi-journée posée. Tout s'est fait après 19h, parfait quand on travaille.",
    type: "Installation complète",
    date: "Janvier 2026",
    detail: "Confort+ — Séjour 35 m²",
  },
  {
    name: "Marc Dupont",
    location: "Auch (32)",
    rating: 4,
    text: "Prix 35% moins cher que les 3 devis artisans que j'avais eus. Et le service client répond vite, même le samedi matin. Je recommande à 100%.",
    type: "Installation complète",
    date: "Mars 2026",
    detail: "Premium — Open-space 45 m²",
  },
  {
    name: "Julie Peyret",
    location: "Toulouse (31)",
    rating: 5,
    text: "Mon mari est bricoleur, il a adoré le pack. Tout était bien emballé, avec des étiquettes numérotées pour savoir quoi brancher où. Très malin.",
    type: "Pack prêt à poser",
    date: "Février 2026",
    detail: "Essentiel — Bureau 15 m²",
  },
  {
    name: "Karim Abdelkader",
    location: "Montauban (82)",
    rating: 5,
    text: "J'y connaissais rien en clim. Le conseiller m'a tout expliqué en 10 minutes au téléphone, sans me prendre de haut. Ça change des autres boîtes.",
    type: "Installation complète",
    date: "Mars 2026",
    detail: "Confort+ — Salon 28 m²",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? "#FBBF24" : "#E2E8E4"} stroke={i < count ? "#FBBF24" : "#E2E8E4"} strokeWidth="1">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("");
}

// Deterministic color from name
function getAvatarColor(name: string) {
  const colors = [
    "bg-primary text-white",
    "bg-secondary text-white",
    "bg-dark text-white",
    "bg-primary-dark text-white",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 bg-cream text-dark text-sm font-semibold rounded-full mb-4 border border-gray-200">
            Avis clients vérifiés
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">
            Ils l&apos;ont fait. Ils en parlent.
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            +200 clients dans la région nous font confiance. Voici ce qu&apos;ils disent.
          </p>
          {/* Global rating */}
          <div className="mt-6 inline-flex items-center gap-3 bg-cream rounded-2xl px-6 py-3 border border-gray-200">
            <div className="flex items-center gap-1">
              <Stars count={5} />
            </div>
            <span className="text-sm font-bold text-dark">4.8/5</span>
            <span className="text-sm text-gray-400">basé sur 200+ avis</span>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-cream rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:shadow-dark/5 transition-all duration-300"
            >
              <Stars count={t.rating} />
              <p className="mt-4 text-sm text-gray-600 leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Project detail */}
              <div className="mt-3 text-xs text-gray-400 flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                {t.detail}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${getAvatarColor(t.name)}`}>
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-dark">{t.name}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      {t.location} — {t.date}
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  t.type === "Pack prêt à poser"
                    ? "bg-primary-light text-primary"
                    : "bg-secondary-light text-secondary"
                }`}>
                  {t.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
