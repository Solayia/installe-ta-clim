const testimonials = [
  {
    name: "Sophie M.",
    location: "Lyon",
    rating: 5,
    text: "J'avais peur que ce soit complique. En fait, j'ai eu mon devis en 1 heure et l'installation etait faite 5 jours apres. Bravo.",
    type: "Installation complete",
    date: "Mars 2026",
  },
  {
    name: "Thomas R.",
    location: "Bordeaux",
    rating: 5,
    text: "Pack pret a poser commande un lundi, recu le mercredi. J'ai installe avec ma femme en un week-end. Les tutos sont super clairs.",
    type: "Pack pret a poser",
    date: "Fevrier 2026",
  },
  {
    name: "Isabelle L.",
    location: "Marseille",
    rating: 5,
    text: "Ce qui m'a convaincue c'est la visio. Pas de visite a domicile, pas de demi-journee posee. Tout s'est fait apres 19h.",
    type: "Installation complete",
    date: "Janvier 2026",
  },
  {
    name: "Marc D.",
    location: "Paris",
    rating: 4,
    text: "Prix plus bas que les 3 devis artisans que j'avais eus. Et le service client repond vite. Je recommande.",
    type: "Installation complete",
    date: "Mars 2026",
  },
  {
    name: "Julie P.",
    location: "Toulouse",
    rating: 5,
    text: "Mon mari est bricoleur, il a adore le pack. Tout etait bien emballe, avec des etiquettes pour savoir quoi brancher ou. Malin.",
    type: "Pack pret a poser",
    date: "Fevrier 2026",
  },
  {
    name: "Karim A.",
    location: "Nantes",
    rating: 5,
    text: "J'y connaissais rien. Le conseiller m'a tout explique en 10 minutes sans me prendre de haut. Ca change.",
    type: "Installation complete",
    date: "Mars 2026",
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

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 bg-cream text-dark text-sm font-semibold rounded-full mb-4 border border-gray-200">
            Avis clients
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">
            Ils l&apos;ont fait. Ils en parlent.
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            +200 clients nous font confiance. Voici ce qu&apos;ils disent de leur experience.
          </p>
          {/* Global rating */}
          <div className="mt-6 inline-flex items-center gap-3 bg-cream rounded-2xl px-6 py-3 border border-gray-200">
            <div className="flex items-center gap-1">
              <Stars count={5} />
            </div>
            <span className="text-sm font-bold text-dark">4.8/5</span>
            <span className="text-sm text-gray-400">sur 200+ avis Google</span>
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
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-dark">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.location}</div>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  t.type === "Pack pret a poser"
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
