import type { Metadata } from "next";
import Link from "next/link";

const articles: Record<string, { title: string; excerpt: string; category: string; readTime: string; date: string; content: string[] }> = {
  "guide-complet-climatisation-2026": {
    title: "Climatisation en 2026 : le guide complet pour bien choisir",
    excerpt: "Mono-split, multi-split, réversible, prêt à poser... On vous explique tout, en langage simple.",
    category: "Guides d'achat",
    readTime: "8 min",
    date: "2 avril 2026",
    content: [
      "Choisir sa climatisation en 2026, c'est plus simple qu'on ne le pense. Le marché s'est considérablement simplifié ces dernières années, et les technologies sont devenues plus accessibles que jamais.",
      "Le mono-split est la solution la plus courante : une unité intérieure reliée à une unité extérieure. Idéal pour climatiser une seule pièce (chambre, salon, bureau). C'est le choix le plus économique, avec des prix démarrant à 699 EUR en prêt à poser.",
      "Le multi-split permet de climatiser plusieurs pièces avec une seule unité extérieure. Plus coûteux à l'achat, mais plus esthétique et souvent plus efficace si vous avez plusieurs pièces à équiper.",
      "La clim réversible, c'est le 2-en-1 : elle rafraîchit en été et chauffe en hiver. En mode chauffage, elle est jusqu'à 3 fois plus efficace qu'un radiateur électrique classique. C'est l'option que nous recommandons le plus souvent.",
      "Le prêt à poser, c'est notre spécialité : vous recevez tout le matériel nécessaire, avec des guides d'installation clairs. Vous pouvez installer vous-même en un week-end, ou faire appel à nos installateurs certifiés RGE.",
      "Pour choisir la bonne puissance, c'est simple : comptez environ 100W par m². Une pièce de 20 m² nécessite une clim de 2 kW, une pièce de 35 m² une clim de 3,5 kW. Nos 3 modèles couvrent toutes les surfaces courantes.",
      "En termes de budget, comptez entre 699 EUR et 1 499 EUR pour un pack prêt à poser, et entre 1 499 EUR et 2 399 EUR fourni et installé. C'est en moyenne 30 à 40% moins cher qu'un devis artisan classique.",
      "Notre conseil : ne sur-dimensionnez pas. Une clim trop puissante pour votre pièce va cycler trop souvent (s'allumer et s'éteindre), ce qui use le compresseur et augmente la consommation. Mieux vaut choisir la bonne taille dès le départ.",
    ],
  },
  "installer-clim-soi-meme": {
    title: "Installer une clim soi-même : est-ce vraiment possible ?",
    excerpt: "On démystifie l'installation DIY. Spoiler : oui, c'est faisable.",
    category: "Installation",
    readTime: "5 min",
    date: "28 mars 2026",
    content: [
      "L'installation d'une climatisation soi-même fait peur à beaucoup de monde. Et pourtant, avec les bons outils et un bon guide, c'est tout à fait faisable pour un bricoleur moyen.",
      "Les packs prêt à poser sont conçus exactement pour ça. Le raccordement frigorifique est pré-chargé, les liaisons sont prêtes, et vous n'avez pas besoin de manipuler le fluide frigorigène.",
      "Les étapes principales : fixer le support de l'unité intérieure, percer le mur pour le passage des liaisons, installer l'unité extérieure, raccorder les liaisons, et brancher électriquement. Comptez une demi-journée à deux personnes.",
      "L'outil le plus important ? Un niveau à bulle et une perceuse. Pour le percement du mur, une scie cloche de 65 mm suffit dans la plupart des cas.",
      "Notre hotline technique est gratuite et disponible 7j/7 pendant votre installation. Si vous bloquez, un technicien vous guide par téléphone ou en visio.",
      "Et si finalement vous préférez ne pas le faire vous-même ? Pas de problème. Vous pouvez toujours demander une installation par un de nos pros certifiés après votre achat.",
    ],
  },
  "cout-climatisation-2026": {
    title: "Combien coûte une climatisation en 2026 ?",
    excerpt: "Prix d'achat, coût d'installation, consommation électrique... Le vrai budget à prévoir.",
    category: "Guides d'achat",
    readTime: "6 min",
    date: "25 mars 2026",
    content: [
      "Le prix d'une climatisation dépend de trois facteurs : le modèle choisi, le type d'installation (DIY ou par un pro), et la consommation à l'usage.",
      "En achat seul (prêt à poser), comptez entre 699 EUR pour un modèle entrée de gamme et 1 499 EUR pour un modèle haut de gamme. C'est le prix du matériel complet, livré chez vous.",
      "Pour une installation par un professionnel certifié, ajoutez entre 800 et 900 EUR. Nos tarifs fourni + installé vont de 1 499 EUR à 2 399 EUR selon le modèle.",
      "Côté consommation, une climatisation moderne consomme entre 15 et 20 EUR par mois en été, pour un usage normal (6 à 8h par jour). En mode chauffage l'hiver, c'est souvent plus économique qu'un radiateur électrique.",
      "Les aides financières peuvent réduire significativement la facture : MaPrimeRénov', les CEE (Certificats d'Économie d'Énergie), et la TVA à taux réduit pour les installations par un professionnel RGE.",
      "Sur 10 ans, une clim réversible peut vous faire économiser plusieurs milliers d'euros par rapport à un chauffage électrique classique, tout en vous offrant la fraîcheur en été.",
    ],
  },
  "erreurs-achat-climatisation": {
    title: "5 erreurs à éviter quand on achète sa clim",
    excerpt: "Trop puissante, mal placée, pas adaptée... Les erreurs courantes et comment les éviter.",
    category: "Guides d'achat",
    readTime: "4 min",
    date: "20 mars 2026",
    content: [
      "Erreur n°1 : Choisir une clim trop puissante. Plus gros ne veut pas dire mieux. Une clim sur-dimensionnée va cycler en permanence, s'user plus vite, et consommer davantage. Choisissez la puissance adaptée à votre surface.",
      "Erreur n°2 : Ignorer le niveau sonore. Une clim bruyante dans une chambre, c'est l'enfer. Vérifiez toujours le niveau en dB(A) : en dessous de 24 dB(A), c'est quasi inaudible.",
      "Erreur n°3 : Mal positionner l'unité intérieure. Évitez de la placer au-dessus du lit ou du canapé (courant d'air direct). Privilégiez un mur latéral, à environ 2,20 m de hauteur.",
      "Erreur n°4 : Négliger la classe énergétique. La différence entre un A+ et un A+++ représente jusqu'à 30% d'économie sur votre facture électrique. Sur 10 ans, ça chiffre.",
      "Erreur n°5 : Ne pas anticiper l'entretien. Un filtre encrassé réduit l'efficacité de 20 à 30%. Nettoyez vos filtres tous les 15 jours en période d'utilisation intensive. C'est simple et ça prend 5 minutes.",
    ],
  },
};

// Fallback for articles not yet written
const defaultArticle = {
  title: "Article à venir",
  excerpt: "Cet article est en cours de rédaction.",
  category: "Blog",
  readTime: "5 min",
  date: "2026",
  content: [
    "Cet article est actuellement en cours de rédaction par notre équipe d'experts en climatisation.",
    "En attendant, n'hésitez pas à consulter nos autres articles ou à nous contacter directement pour toute question sur votre projet de climatisation.",
    "Vous pouvez également demander un devis gratuit en 2 minutes depuis notre page d'accueil.",
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug] || defaultArticle;
  return {
    title: `${article.title} | Installe ta Clim`,
    description: article.excerpt,
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug] || defaultArticle;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-cream via-warm to-white py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors mb-8">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour au blog
          </Link>
          <span className="inline-block px-3 py-1 bg-primary-light text-primary text-xs font-semibold rounded-full mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 mt-6 text-sm text-gray-400">
            <span>{article.date}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>{article.readTime} de lecture</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {article.content.map((paragraph, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-6 text-base">
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-primary rounded-3xl p-8 lg:p-10 text-center">
            <h3 className="text-2xl font-extrabold text-white">
              Prêt à passer au frais ?
            </h3>
            <p className="mt-3 text-white/80 max-w-md mx-auto">
              Obtenez votre devis en 2 minutes. Gratuit et sans engagement.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/#nos-clims"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-xl hover:bg-cream transition-colors"
              >
                Voir nos clims
              </Link>
              <Link
                href="/devis"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/15 text-white font-bold rounded-xl border border-white/30 hover:bg-white/25 transition-colors"
              >
                Demander un devis
              </Link>
            </div>
          </div>

          {/* Back to blog */}
          <div className="mt-10 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Voir tous les articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
