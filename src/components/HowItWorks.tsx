"use client";

import { useState } from "react";
import Link from "next/link";

const paths = {
  diy: {
    title: "J'installe moi-même",
    subtitle: "Pack livré chez vous — Partout en France",
    description: "La solution la plus économique. Choisissez votre modèle, recevez tout le matériel chez vous, et installez à votre rythme.",
    steps: [
      { num: "1", title: "Je choisis mon modèle", desc: "3 gammes sélectionnées — on vous aide à trouver la bonne en 2 minutes." },
      { num: "2", title: "Je commande en ligne", desc: "Paiement sécurisé, CB ou 3x sans frais." },
      { num: "3", title: "Je reçois tout chez moi", desc: "Livraison rapide avec tout le matériel et les accessoires." },
      { num: "4", title: "J'installe à mon rythme", desc: "Hotline technique gratuite si vous avez la moindre question." },
    ],
    cta: "J'installe moi-même",
    ctaHref: "/catalogue",
    benefits: [
      "Jusqu'à 40% d'économie",
      "Hotline technique gratuite",
      "Retour sous 30 jours",
      "Livraison rapide",
    ],
  },
  installed: {
    title: "On s'occupe de tout",
    subtitle: "Clé en main — Toulouse et alentours",
    description: "Vous n'avez rien à faire. Décrivez votre projet, recevez une estimation, validez en visio, et on planifie l'installation chez vous.",
    steps: [
      { num: "1", title: "Je décris mon projet", desc: "Formulaire en 2 minutes : surface, type de logement, préférences." },
      { num: "2", title: "Je reçois une estimation", desc: "Proposition claire et détaillée sous 48h, sans jargon." },
      { num: "3", title: "Je valide en visio", desc: "15 min pour confirmer les détails techniques, le soir si besoin." },
      { num: "4", title: "Je confirme et je verse l'acompte", desc: "Paiement sécurisé. On bloque votre créneau." },
      { num: "5", title: "L'installation est planifiée", desc: "Un installateur qualifié intervient à la date choisie." },
    ],
    cta: "On s'occupe de tout",
    ctaHref: "/devis#pro",
    benefits: [
      "Estimation sous 48h",
      "Installateur qualifié",
      "Garantie 5 ans",
      "Pose soignée",
    ],
  },
};

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"diy" | "installed">("installed");
  const current = paths[activeTab];

  return (
    <section id="comment-ca-marche" className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className={`flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === "diy"
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
              </svg>
              <span className="hidden sm:inline">J&apos;installe moi-même</span>
              <span className="sm:hidden">DIY</span>
            </button>
            <button
              onClick={() => setActiveTab("installed")}
              className={`flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
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
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left: Steps — takes 3/5 */}
          <div className="lg:col-span-3 bg-cream rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200">
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

          {/* Right: Benefits only — takes 2/5, épuré */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200">
              <h4 className="font-bold text-dark mb-5 text-lg">Ce que vous y gagnez</h4>
              <div className="space-y-3">
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
          </div>
        </div>
      </div>
    </section>
  );
}
