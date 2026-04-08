"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Comment savoir quelle clim choisir ?",
    answer: "C'est simple : on vous propose 3 modeles, en fonction de la surface de votre piece. Jusqu'a 20 m2, le modele Essentiel suffit. Jusqu'a 35 m2, on recommande le Confort+ (c'est le plus choisi). Au-dela, le Premium est fait pour ca. Et si vous hesitez, un conseiller vous aide en 5 minutes.",
  },
  {
    question: "Est-ce que je peux demander une estimation sans visite ?",
    answer: "Oui, c'est meme notre fonctionnement normal. Vous remplissez un formulaire en 2 minutes avec les infos de votre logement, et on vous envoie une estimation sous 48h. La validation se fait ensuite en visio de 15 min, depuis votre canape, le soir si besoin.",
  },
  {
    question: "En combien de temps j'ai un devis ?",
    answer: "Sous 48h. Vous remplissez le formulaire, on analyse votre projet, et vous recevez une proposition claire et detaillee. Pas de jargon technique, pas de ligne obscure. Et si vous avez des questions, un conseiller vous rappelle pour tout expliquer.",
  },
  {
    question: "Est-ce que je peux installer moi-meme ?",
    answer: "Oui ! Nos packs pret a poser sont concus pour ca. Vous recevez tout le materiel, un guide d'installation pas a pas, des tutoriels video, et notre hotline technique est gratuite si vous bloquez. La plupart de nos clients installent leur clim en un week-end.",
  },
  {
    question: "Intervenez-vous dans ma zone ?",
    answer: "Aujourd'hui, nos installateurs couvrent la region de Toulouse et ses alentours (departements 31, 81, 82, 65). On etend progressivement notre couverture. Pour les packs pret a poser, la livraison se fait partout en France en 24 a 72h.",
  },
  {
    question: "Quelle difference entre les 3 modeles ?",
    answer: "L'Essentiel est parfait pour les petites pieces (chambre, bureau) — c'est le plus economique. Le Confort+ est le meilleur rapport qualite-prix pour les salons et pieces de vie, avec WiFi et filtration integres. Le Premium est fait pour les grands espaces, avec le meilleur niveau sonore et un purificateur d'air. Tous sont de marques reconnues et garantis 5 a 7 ans.",
  },
  {
    question: "Vos prix sont-ils vraiment moins chers ?",
    answer: "Oui, en moyenne 30 a 40% moins chers qu'un devis artisan classique. Comment ? En simplifiant le parcours, en reduisant les intermediaires, et en selectionnant des modeles directement aupres des fabricants. On affiche nos prix clairement, pas de mauvaise surprise.",
  },
  {
    question: "Est-ce que les produits sont fiables ?",
    answer: "Absolument. On ne travaille qu'avec des marques reconnues et nos installateurs sont certifies RGE QualiPAC. Chaque installation est garantie minimum 5 ans. On ne sacrifie jamais la qualite pour le prix — c'est pour ca qu'on ne propose que 3 modeles : les meilleurs dans chaque gamme.",
  },
];

function FAQItem({ faq, isOpen, toggle }: { faq: typeof faqs[0]; isOpen: boolean; toggle: () => void }) {
  return (
    <div className={`border rounded-2xl transition-all duration-300 ${
      isOpen ? "border-primary bg-primary-light/50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"
    }`}>
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className={`text-base font-semibold leading-snug ${isOpen ? "text-primary" : "text-dark"}`}>
          {faq.question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-primary text-white rotate-180" : "bg-gray-100 text-gray-500"
        }`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-warm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary-light text-primary text-sm font-semibold rounded-full mb-4">
            Questions frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">
            Vous hesitez encore ? C&apos;est normal.
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Voici les reponses aux questions qu&apos;on nous pose le plus souvent.
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Vous avez une autre question ?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+33100000000"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-dark font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Appelez-nous
            </a>
            <a
              href="#devis"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              Ecrivez-nous
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
