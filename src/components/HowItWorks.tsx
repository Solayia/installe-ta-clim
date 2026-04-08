"use client";

import { useState } from "react";
import Link from "next/link";

const paths = {
  diy: {
    title: "Je veux acheter ma clim",
    subtitle: "Choix simplifié + livraison + installation par vous-même",
    description: "La solution la plus économique. On vous guide pour choisir le bon modèle, on vous livre tout le nécessaire, et vous installez à votre rythme avec nos tutoriels.",
    steps: [
      { num: "1", title: "Je choisis mon modèle", desc: "3 modèles, un recommandeur simple : on vous aide à trouver le bon en 2 minutes." },
      { num: "2", title: "Je commande en ligne", desc: "Paiement sécurisé, CB ou 3x sans frais. Pas de mauvaise surprise." },
      { num: "3", title: "Je suis livré chez moi", desc: "Livraison en 24 à 72h avec tout le matériel, les accessoires et les guides." },
      { num: "4", title: "J'installe à mon rythme", desc: "Tutoriels vidéo pas à pas + hotline technique gratuite si vous bloquez." },
    ],
    cta: "Voir les clims disponibles",
    ctaHref: "#nos-clims",
    benefits: [
      "Jusqu'à 40% d'économie",
      "Tutoriels vidéo inclus",
      "Support technique gratuit",
      "Retour sous 30 jours",
    ],
  },
  installed: {
    title: "Je veux qu'on s'occupe de tout",
    subtitle: "Estimation + coordination + installation par un pro certifié",
    description: "Vous n'avez rien à faire. Décrivez votre projet, recevez une estimation, validez en visio, et on planifie l'installation chez vous.",
    steps: [
      { num: "1", title: "Je remplis mon projet", desc: "Formulaire en 2 minutes : surface, type de logement, préférences. C'est tout." },
      { num: "2", title: "Je reçois une estimation sous 48h", desc: "Proposition claire, détaillée, sans jargon. Vous savez exactement ce que vous payez." },
      { num: "3", title: "Je fais une visio de validation", desc: "Un appel de 15 min pour confirmer les détails techniques, depuis votre canapé, le soir si besoin." },
      { num: "4", title: "Je confirme et je verse l'acompte", desc: "Paiement sécurisé. On bloque votre créneau d'installation." },
      { num: "5", title: "L'installation est planifiée", desc: "Un installateur certifié RGE intervient à la date choisie. Vous n'avez rien à faire." },
    ],
    cta: "Obtenir mon estimation gratuite",
    ctaHref: "#devis",
    benefits: [
      "Estimation sous 48h",
      "Installateur certifié RGE",
      "Garantie 5 ans",
      "Éligible aides de l'État",
    ],
  },
};

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"diy" | "installed">("installed");
  const current = paths[activeTab];

  return (
    <section id="comment-ca-marche" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary-light text-primary text-sm font-semibold rounded-full mb-4">
            La solution Installe ta Clim
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">
            Deux façons d&apos;avoir votre clim.
            <br />
            <span className="text-primary">À vous de choisir.</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Dans les deux cas, c&apos;est simple, rapide et sans mauvaise surprise.
          </p>
        </div>

        {/* Tab switcher */}
        <div id="parcours" className="flex justify-center mb-12">
          <div className="inline-flex bg-cream rounded-2xl p-1.5 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab("diy")}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === "diy"
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
              </svg>
              J&apos;achète + j&apos;installe
            </button>
            <button
              onClick={() => setActiveTab("installed")}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === "installed"
                  ? "bg-secondary text-white shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
              On s&apos;occupe de tout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Steps */}
          <div className="bg-cream rounded-3xl p-8 lg:p-10 border border-gray-200">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-dark">{current.title}</h3>
              <p className="text-sm text-gray-400 mt-1 font-medium">{current.subtitle}</p>
              <p className="text-gray-500 mt-3 leading-relaxed">{current.description}</p>
            </div>

            <div className="space-y-0">
              {current.steps.map((step, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      activeTab === "diy" ? "bg-primary" : "bg-secondary"
                    }`}>
                      {step.num}
                    </div>
                    {i < current.steps.length - 1 && (
                      <div className={`w-0.5 flex-1 min-h-[24px] mt-1 rounded-full ${
                        activeTab === "diy" ? "bg-primary/20" : "bg-secondary/20"
                      }`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <h4 className="font-bold text-dark">{step.title}</h4>
                    <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Link
                href={current.ctaHref}
                className={`inline-flex items-center gap-2 px-7 py-3.5 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${
                  activeTab === "diy"
                    ? "bg-primary hover:bg-primary-hover shadow-primary/20"
                    : "bg-secondary hover:bg-secondary/90 shadow-secondary/20"
                }`}
              >
                {current.cta}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: Benefits + question card + stat */}
          <div className="space-y-6">
            {/* Benefits */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
              <h4 className="font-bold text-dark mb-5 text-lg">Ce que vous y gagnez</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activeTab === "diy" ? "bg-primary-light text-primary" : "bg-secondary-light text-secondary"
                    }`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-dark">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reassurance */}
            <div className={`rounded-3xl p-8 ${
              activeTab === "diy" ? "bg-primary-light" : "bg-secondary-light"
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activeTab === "diy" ? "bg-primary text-white" : "bg-secondary text-white"
                }`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-dark">Pas sûr de votre choix ?</h4>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    Pas de stress. Appelez-nous ou remplissez le formulaire : un conseiller vous aide à choisir la bonne option en 5 minutes. Le soir après le boulot, ça marche aussi.
                  </p>
                  <Link href="tel:+33100000000" className={`inline-flex items-center gap-1 text-sm font-semibold mt-3 ${
                    activeTab === "diy" ? "text-primary" : "text-secondary"
                  }`}>
                    Parler à un conseiller
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick stat */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 flex items-center gap-6">
              <div className="text-center flex-shrink-0">
                <div className="text-4xl font-extrabold text-primary">93%</div>
                <div className="text-xs text-gray-400 mt-1">de nos clients</div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 leading-relaxed">
                  recommanderaient Installe ta Clim à un proche. Notre secret ? On explique tout clairement et on fait ce qu&apos;on dit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
