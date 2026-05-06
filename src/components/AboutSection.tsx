import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="qui-sommes-nous" className="py-16 lg:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary-light text-primary text-sm font-semibold rounded-full mb-4">
            À propos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">
            Qui sommes-nous ?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — Texte */}
          <div>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong className="text-dark">Installe ta Clim</strong> est une entreprise toulousaine spécialisée dans la vente et l&apos;installation de climatisation pour les particuliers.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Notre mission : rendre la climatisation <strong className="text-dark">accessible, simple et transparente</strong>. Pas de jargon, pas de devis obscur, pas d&apos;intermédiaires inutiles.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Que vous souhaitiez installer votre clim vous-même avec nos packs prêt à poser, ou confier l&apos;installation à nos professionnels qualifiés — on vous accompagne de A à Z.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-hover transition-colors"
            >
              Nous contacter
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Right — Points clés */}
          <div className="space-y-4">
            {[
              {
                icon: "map",
                title: "Entreprise toulousaine",
                desc: "Basée à Toulouse, nous intervenons sur toute la région Occitanie (31, 32, 65, 81, 82) et livrons dans toute la France.",
              },
              {
                icon: "shield",
                title: "Professionnels habilités",
                desc: "Nos installateurs disposent des habilitations nécessaires : manipulation des fluides frigorigènes, assurance décennale.",
              },
              {
                icon: "star",
                title: "Qualité garantie",
                desc: "Des marques reconnues, une garantie de 5 à 7 ans pièces et main d'œuvre, et un service après-vente réactif.",
              },
              {
                icon: "heart",
                title: "Accompagnement humain",
                desc: "Un conseiller dédié vous guide à chaque étape. Le soir après le boulot, ça marche aussi.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl bg-cream border border-gray-100">
                <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.icon === "map" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  )}
                  {item.icon === "shield" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )}
                  {item.icon === "star" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  )}
                  {item.icon === "heart" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-dark text-sm">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
