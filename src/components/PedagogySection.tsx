export default function PedagogySection() {
  const cards = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
      title: "Une clim, ca fait quoi exactement ?",
      text: "Ca prend l'air chaud de votre piece et le rejette dehors. Resultat : il fait frais chez vous. La plupart des modeles font aussi chauffage en hiver. Deux en un.",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="15" rx="2" /><polyline points="17 2 12 7 7 2" />
        </svg>
      ),
      title: "Ca se compose de quoi ?",
      text: "Deux boitiers. Un a l'interieur (le split, qui souffle l'air frais) et un a l'exterieur (le compresseur, qui evacue la chaleur). Relies par des tuyaux, c'est tout.",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      title: "Ca consomme beaucoup ?",
      text: "Moins que vous ne pensez. Un modele recent classe A++ consomme environ 15 EUR par mois en ete. C'est moins qu'un radiateur electrique en hiver.",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 010 7.07" />
        </svg>
      ),
      title: "C'est bruyant ?",
      text: "Les modeles qu'on propose descendent a 19 dB. Pour vous donner une idee, c'est moins bruyant qu'un chuchotement. Vous ne l'entendrez meme pas la nuit.",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      title: "L'installation, ca prend combien de temps ?",
      text: "Avec un pro : une demi-journee en general. En mode pret a poser : un week-end tranquille. Dans les deux cas, pas besoin de gros travaux.",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Et si ca tombe en panne ?",
      text: "Garantie 5 a 7 ans selon le modele. Et notre SAV est la : diagnostic a distance, intervention rapide si besoin. On ne vous laisse pas tomber.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 bg-cream text-dark text-sm font-semibold rounded-full mb-4 border border-gray-200">
            La clim expliquee simplement
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">
            Vous n&apos;y connaissez rien ?<br />
            <span className="text-primary">C&apos;est fait expres.</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            On a concu ce site pour les gens normaux, pas pour les techniciens. Voici tout ce qu&apos;il faut savoir, en langage humain.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-cream rounded-2xl p-6 border border-gray-200 hover:bg-primary-light hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {card.icon}
              </div>
              <h3 className="text-base font-bold text-dark mb-2">{card.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
