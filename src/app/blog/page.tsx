import type { Metadata } from "next";
import Link from "next/link";
import { BlogPageSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Blog | Installe ta Clim - Guides et conseils climatisation",
  description:
    "Retrouvez tous nos guides, conseils et astuces pour bien choisir, installer et entretenir votre climatisation. Articles rédigés par nos experts.",
};

const categories = [
  { label: "Tous les articles", slug: "all", count: 15 },
  { label: "Choisir sa clim", slug: "choisir", count: 4 },
  { label: "Installation", slug: "installation", count: 3 },
  { label: "Entretien", slug: "entretien", count: 2 },
  { label: "Économies d'énergie", slug: "economies", count: 2 },
  { label: "Comparatifs", slug: "comparatifs", count: 1 },
  { label: "Conseils maison", slug: "conseils", count: 2 },
  { label: "Toulouse et région", slug: "toulouse", count: 1 },
];

const featuredArticle = {
  title: "Climatisation en 2026 : le guide complet pour bien choisir",
  excerpt:
    "Mono-split, multi-split, réversible, prêt à poser... On vous explique tout, en langage simple, pour que vous fassiez le bon choix sans prise de tête.",
  category: "Guides d'achat",
  readTime: "8 min",
  date: "2 avril 2026",
  slug: "guide-complet-climatisation-2026",
};

const articles = [
  {
    title: "Installer une clim soi-même : est-ce vraiment possible ?",
    excerpt:
      "On démystifie l'installation DIY. Spoiler : oui, c'est faisable, et non, vous n'avez pas besoin d'être plombier.",
    category: "Installation",
    readTime: "5 min",
    date: "28 mars 2026",
    slug: "installer-clim-soi-meme",
  },
  {
    title: "Combien coûte une climatisation en 2026 ?",
    excerpt:
      "Prix d'achat, coût d'installation, consommation électrique... On fait le point sur le vrai budget à prévoir.",
    category: "Guides d'achat",
    readTime: "6 min",
    date: "25 mars 2026",
    slug: "cout-climatisation-2026",
  },
  {
    title: "5 erreurs à éviter quand on achète sa clim",
    excerpt:
      "Trop puissante, mal placée, pas adaptée... Voici les erreurs les plus courantes et comment les éviter.",
    category: "Guides d'achat",
    readTime: "4 min",
    date: "20 mars 2026",
    slug: "erreurs-achat-climatisation",
  },
  {
    title: "Clim réversible : chauffage + climatisation en un seul appareil",
    excerpt:
      "Une clim qui chauffe aussi ? Oui, et c'est même plus économique qu'un radiateur électrique. On vous explique.",
    category: "Guides d'achat",
    readTime: "5 min",
    date: "15 mars 2026",
    slug: "clim-reversible-guide",
  },
  {
    title: "Entretenir sa clim : le guide simple en 4 étapes",
    excerpt:
      "Un entretien régulier = une clim qui dure plus longtemps et qui consomme moins. Voici comment faire, simplement.",
    category: "Entretien",
    readTime: "4 min",
    date: "10 mars 2026",
    slug: "entretenir-climatisation-guide",
  },
  {
    title: "Aides financières 2026 : ce à quoi vous avez droit",
    excerpt:
      "MaPrimeRénov', CEE, TVA réduite... On fait le point sur les aides disponibles pour votre projet climatisation.",
    category: "Économies",
    readTime: "6 min",
    date: "5 mars 2026",
    slug: "aides-financieres-climatisation-2026",
  },
  {
    title: "Quelle puissance de clim pour quelle surface ?",
    excerpt:
      "20 m², 35 m², 50 m²... On vous donne la règle simple pour ne jamais vous tromper de puissance.",
    category: "Guides d'achat",
    readTime: "3 min",
    date: "1 mars 2026",
    slug: "puissance-clim-surface",
  },
  {
    title: "Clim et consommation électrique : combien ça coûte vraiment ?",
    excerpt:
      "15 EUR par mois ? 50 EUR ? On a fait le calcul pour 3 scénarios concrets avec les tarifs 2026.",
    category: "Économies",
    readTime: "5 min",
    date: "25 février 2026",
    slug: "consommation-electrique-climatisation",
  },
  {
    title: "Faut-il une clim monosplit ou multisplit ?",
    excerpt:
      "Une seule pièce ou toute la maison ? On vous explique la différence en termes simples, et laquelle choisir selon votre situation.",
    category: "Comparatifs",
    readTime: "5 min",
    date: "20 février 2026",
    slug: "monosplit-vs-multisplit",
  },
  {
    title: "Comment préparer son projet clim sans visite physique",
    excerpt:
      "Photos, visio, formulaire en ligne : voici comment on arrive à vous proposer une estimation précise sans vous faire poser une journée.",
    category: "Conseils maison",
    readTime: "4 min",
    date: "15 février 2026",
    slug: "preparer-projet-clim-sans-visite",
  },
  {
    title: "Climatisation réversible : est-ce vraiment rentable ?",
    excerpt:
      "Chauffer et rafraîchir avec un seul appareil, ça semble trop beau. On a fait les calculs pour vous.",
    category: "Économies d'énergie",
    readTime: "6 min",
    date: "10 février 2026",
    slug: "clim-reversible-rentabilite",
  },
  {
    title: "Quelle clim choisir à Toulouse et ses alentours ?",
    excerpt:
      "Climat, réglementation locale, artisans de confiance : tout ce qu'il faut savoir pour climatiser votre logement dans la région toulousaine.",
    category: "Toulouse et région",
    readTime: "5 min",
    date: "5 février 2026",
    slug: "climatisation-toulouse-region",
  },
  {
    title: "Bien positionner son unité intérieure : le guide pratique",
    excerpt:
      "Hauteur, orientation, distance du lit... Où placer votre split pour un confort optimal sans courant d'air.",
    category: "Conseils maison",
    readTime: "4 min",
    date: "1 février 2026",
    slug: "bien-positionner-unite-interieure",
  },
  {
    title: "Les filtres de clim : à quoi ça sert et quand les changer ?",
    excerpt:
      "Ils sont petits, on les oublie souvent, mais ils font une vraie différence sur la qualité de l'air et la durée de vie de votre clim.",
    category: "Entretien",
    readTime: "3 min",
    date: "25 janvier 2026",
    slug: "filtres-climatisation-guide",
  },
  {
    title: "Climatisation et allergies : ce qu'il faut savoir",
    excerpt:
      "Bonne nouvelle : une clim bien entretenue peut même améliorer la qualité de l'air chez vous. On vous dit tout.",
    category: "Conseils maison",
    readTime: "4 min",
    date: "20 janvier 2026",
    slug: "climatisation-allergies",
  },
];

function ArticleCard({ article }: { article: typeof articles[0] }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:shadow-dark/5 hover:-translate-y-1 transition-all duration-300">
        {/* Image placeholder */}
        <div className="bg-gradient-to-br from-primary-light to-cream h-48 flex items-center justify-center relative overflow-hidden">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20 group-hover:opacity-30 transition-opacity">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-primary text-xs font-semibold rounded-full backdrop-blur-sm">
            {article.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
            <span>{article.date}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>{article.readTime} de lecture</span>
          </div>
          <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors leading-snug">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
            Lire l&apos;article
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  return (
    <>
      <BlogPageSchema />
      {/* Hero */}
      <section className="bg-gradient-to-br from-cream via-warm to-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary-light text-primary text-sm font-semibold rounded-full mb-4">
              Blog
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-dark">
              La clim, expliquée <span className="text-primary">simplement</span>.
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Guides, conseils et astuces pour bien choisir, installer et entretenir votre climatisation. Zero jargon, que du concret.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-gray-200 sticky top-16 lg:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none">
            {categories.map((cat, i) => (
              <button
                key={cat.slug}
                className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  i === 0
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
                <span className={`ml-1.5 text-xs ${i === 0 ? "text-white/70" : "text-gray-400"}`}>
                  ({cat.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured article */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/blog/${featuredArticle.slug}`} className="group block">
            <article className="bg-cream rounded-3xl overflow-hidden border border-gray-200 hover:shadow-xl hover:shadow-dark/5 transition-all duration-300">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="bg-gradient-to-br from-primary-light to-primary/10 h-64 lg:h-auto flex items-center justify-center relative">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-15">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    <circle cx="12" cy="12" r="5" />
                  </svg>
                  <span className="absolute top-6 left-6 px-4 py-1.5 bg-secondary text-white text-sm font-bold rounded-full">
                    Article vedette
                  </span>
                </div>
                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-sm font-medium text-primary mb-2">{featuredArticle.category}</span>
                  <h2 className="text-2xl lg:text-3xl font-extrabold text-dark group-hover:text-primary transition-colors leading-snug">
                    {featuredArticle.title}
                  </h2>
                  <p className="mt-3 text-gray-500 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-xl group-hover:bg-primary-hover transition-colors text-sm">
                      Lire le guide complet
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="text-xs text-gray-400">{featuredArticle.readTime} de lecture</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </div>
      </section>

      {/* Article grid */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-dark">Tous les articles</h2>
            <span className="text-sm text-gray-400">{articles.length} articles</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {/* Load more */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white border border-gray-200 text-dark font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all">
              Charger plus d&apos;articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Recevez nos guides gratuits
          </h2>
          <p className="mt-3 text-white/70">
            Un email par mois avec nos meilleurs conseils pour votre confort. Pas de spam, promis.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email..."
              className="flex-1 px-5 py-3 rounded-xl text-dark text-sm bg-white border-0 focus:ring-2 focus:ring-white/50 outline-none"
            />
            <button className="px-6 py-3 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/25">
              S&apos;inscrire
            </button>
          </div>
          <p className="mt-3 text-xs text-white/50">Désabonnement en 1 clic. On respecte votre boîte mail.</p>
        </div>
      </section>
    </>
  );
}
