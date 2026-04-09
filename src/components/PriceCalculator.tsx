"use client";

import { useState } from "react";
import Link from "next/link";

const surfaces = [
  { label: "Chambre / Bureau", value: "small", m2: "10-20 m²", model: "Essentiel", priceDiy: 699, priceInstalled: 1499, efficiency: "A+" },
  { label: "Salon / Séjour", value: "medium", m2: "20-35 m²", model: "Confort+", priceDiy: 999, priceInstalled: 1899, efficiency: "A++", recommended: true },
  { label: "Grand espace / Open-space", value: "large", m2: "35-50 m²", model: "Premium", priceDiy: 1499, priceInstalled: 2399, efficiency: "A+++" },
  { label: "Multi-pièces", value: "multi", m2: "50+ m²", model: "Sur-mesure", priceDiy: null, priceInstalled: null, efficiency: "A+++" },
];

const installations = [
  { label: "Je l'installe moi-même", value: "diy", icon: "wrench" },
  { label: "Installation par un pro", value: "pro", icon: "users" },
];

export default function PriceCalculator() {
  const [surface, setSurface] = useState("medium");
  const [installation, setInstallation] = useState("pro");

  const selected = surfaces.find((s) => s.value === surface)!;
  const price = installation === "diy" ? selected.priceDiy : selected.priceInstalled;
  const aides = installation === "pro" ? 1500 : 0;

  return (
    <section id="simulateur" className="py-20 lg:py-28 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary-light text-primary text-sm font-semibold rounded-full mb-4">
            Estimation rapide
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">
            Combien ça coûte <span className="text-primary">chez vous</span> ?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            En 2 clics, obtenez une estimation réaliste. Sans surprise.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-8 lg:p-10">
            {/* Step 1: Surface */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-dark uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                Quelle pièce à climatiser ?
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {surfaces.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSurface(s.value)}
                    className={`relative p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                      surface === s.value
                        ? "border-primary bg-primary-light shadow-sm"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    {s.recommended && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full">
                        Populaire
                      </span>
                    )}
                    <div className={`text-sm font-semibold ${surface === s.value ? "text-primary" : "text-dark"}`}>
                      {s.label}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.m2}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Installation type */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-dark uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                Comment vous voulez l&apos;installer ?
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {installations.map((inst) => (
                  <button
                    key={inst.value}
                    onClick={() => setInstallation(inst.value)}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 border-2 ${
                      installation === inst.value
                        ? "border-primary bg-primary-light shadow-sm"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      installation === inst.value ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                    }`}>
                      {inst.icon === "wrench" ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                        </svg>
                      )}
                    </div>
                    <div className="text-left">
                      <div className={`text-sm font-semibold ${installation === inst.value ? "text-primary" : "text-dark"}`}>
                        {inst.label}
                      </div>
                      <div className="text-xs text-gray-400">
                        {inst.value === "diy" ? "Le plus économique" : "Tout inclus + éligible aides"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="bg-dark p-8 lg:p-10">
            {selected.value === "multi" ? (
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">Projet multi-pièces = devis sur-mesure</h3>
                <p className="text-white/60 mt-2">Chaque configuration est unique. Décrivez votre projet et on vous répond sous 48h.</p>
                <Link
                  href="#devis"
                  className="inline-flex items-center gap-2 mt-6 px-7 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors"
                >
                  Demander mon devis sur-mesure
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <div className="text-sm text-white/50 uppercase tracking-wider font-medium">Estimation pour votre projet</div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl lg:text-5xl font-extrabold text-white">{price?.toLocaleString("fr-FR")}</span>
                    <span className="text-lg text-white/50">EUR</span>
                  </div>
                  <div className="text-sm text-white/40 mt-1">
                    Modèle {selected.model} — Classe {selected.efficiency}
                    {installation === "diy" ? " — Pack prêt à poser" : " — Fourni + installé"}
                  </div>
                  {installation === "pro" && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 text-sm font-semibold rounded-lg">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Éligible à ~{aides.toLocaleString("fr-FR")} EUR d&apos;aides
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    href="#devis"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors"
                  >
                    Obtenir mon devis précis
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <span className="text-xs text-white/30 text-center">Gratuit, sans engagement, sous 48h</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
