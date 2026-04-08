export default function ProblemSection() {
  const painPoints = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      title: "Des artisans introuvables",
      text: "Vous appelez, vous laissez des messages... et personne ne rappelle. Trouver un installateur fiable, c'est le parcours du combattant.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "Des semaines d'attente",
      text: "Entre le premier contact et l'installation, il se passe souvent 4 a 8 semaines. En pleine canicule, c'est trop long.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
      title: "Des devis incomprehensibles",
      text: "Termes techniques, options floues, prix qui varient du simple au triple. Impossible de comparer sereinement.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      title: "Des visites obligatoires",
      text: "Poser une demi-journee pour qu'un technicien passe chez vous... avant meme d'avoir un devis ? C'est penible.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M16 16s-1.5-2-4-2-4 2-4 2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      title: "Un manque de visibilite total",
      text: "On ne sait jamais ou on en est, combien ca va couter au final, ni quand ca sera installe.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
        </svg>
      ),
      title: "Pas le temps de gerer ca",
      text: "Entre le boulot et les enfants, qui a le temps de gerer 3 devis, 2 relances et une prise de rendez-vous ?",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 bg-secondary-light text-secondary text-sm font-semibold rounded-full mb-4">
            Le probleme aujourd&apos;hui
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">
            Installer une clim, c&apos;est cense etre simple.
            <br />
            <span className="text-gray-400">Mais en vrai...</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Si vous avez deja essaye de faire installer une clim, vous savez que le parcours peut vite devenir un casse-tete.
          </p>
        </div>

        {/* Pain points grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((point, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-secondary/30 hover:shadow-lg hover:shadow-secondary/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-secondary-light rounded-xl flex items-center justify-center text-secondary mb-4 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                {point.icon}
              </div>
              <h3 className="text-base font-bold text-dark mb-2">{point.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{point.text}</p>
            </div>
          ))}
        </div>

        {/* Transition to solution */}
        <div className="text-center mt-14">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary-light rounded-2xl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#88a78b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <span className="text-primary font-semibold">On a cree Installe ta Clim pour regler tout ca.</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#88a78b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
