"use client";

import { useState } from "react";
import ARViewer from "./ARViewer";

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const pieceTypes = [
  { value: "chambre", label: "Chambre", icon: "bed", m2: "10-15 m²" },
  { value: "bureau", label: "Bureau", icon: "desk", m2: "10-20 m²" },
  { value: "salon", label: "Salon / Séjour", icon: "sofa", m2: "20-35 m²" },
  { value: "openspace", label: "Grand espace", icon: "home", m2: "35-50 m²" },
  { value: "multi", label: "Plusieurs pièces", icon: "grid", m2: "50+ m²" },
];

const logementTypes = [
  { value: "appartement", label: "Appartement" },
  { value: "maison", label: "Maison" },
  { value: "commerce", label: "Local commercial" },
];

const surfaces = [
  { value: "15", label: "Moins de 15 m²" },
  { value: "25", label: "15 à 25 m²" },
  { value: "35", label: "25 à 35 m²" },
  { value: "50", label: "35 à 50 m²" },
  { value: "50+", label: "Plus de 50 m²" },
];

function getEstimation(data: FormData): { model: string; priceDiy: string; priceInstalled: string; aides: string; efficiency: string } {
  const s = parseInt(data.surface);
  if (isNaN(s) || s > 50 || data.piece === "multi") {
    return { model: "Sur-mesure (multi-split)", priceDiy: "Sur devis", priceInstalled: "Sur devis", aides: "Jusqu'à 5 000 €", efficiency: "A+++" };
  }
  if (s <= 20) {
    return { model: "Essentiel", priceDiy: "699 €", priceInstalled: "1 499 €", aides: "~1 200 €", efficiency: "A+" };
  }
  if (s <= 35) {
    return { model: "Confort+", priceDiy: "999 €", priceInstalled: "1 899 €", aides: "~1 500 €", efficiency: "A++" };
  }
  return { model: "Premium", priceDiy: "1 499 €", priceInstalled: "2 399 €", aides: "~2 000 €", efficiency: "A+++" };
}

interface FormData {
  piece: string;
  logement: string;
  surface: string;
  installation: "diy" | "pro";
  nom: string;
  telephone: string;
  email: string;
  ville: string;
  message: string;
  arPhoto: string | null;
}

const initialData: FormData = {
  piece: "",
  logement: "",
  surface: "",
  installation: "pro",
  nom: "",
  telephone: "",
  email: "",
  ville: "",
  message: "",
  arPhoto: null,
};

function PieceIcon({ type }: { type: string }) {
  switch (type) {
    case "bed":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4v16"/><path d="M2 8h18a2 2 0 012 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>
        </svg>
      );
    case "desk":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="3" rx="1"/><path d="M4 10v7"/><path d="M20 10v7"/><path d="M12 10v7"/>
        </svg>
      );
    case "sofa":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v3"/><path d="M2 11v5a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-4 0v2H6v-2a2 2 0 00-4 0z"/><path d="M4 18v2"/><path d="M20 18v2"/>
        </svg>
      );
    case "home":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        </svg>
      );
    case "grid":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function DevisForm() {
  const [step, setStep] = useState<Step>(0);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [arFullscreen, setArFullscreen] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const canNext = (): boolean => {
    switch (step) {
      case 0: return true; // AR is optional
      case 1: return !!data.piece;
      case 2: return !!data.logement && !!data.surface;
      case 3: return !!data.installation;
      case 4: return !!data.nom && !!data.telephone && !!data.email;
      default: return false;
    }
  };

  const next = () => {
    if (canNext() && step < 5) setStep((step + 1) as Step);
  };

  const prev = () => {
    if (step > 0) setStep((step - 1) as Step);
  };

  const submit = () => {
    // In production: send data to API / email / CRM
    setSubmitted(true);
    setStep(5);
  };

  const estimation = getEstimation(data);
  const progress = (step / 5) * 100;

  return (
    <>
    {/* Fullscreen AR overlay */}
    {arFullscreen && (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-sm z-10">
          <button
            onClick={() => setArFullscreen(false)}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            Fermer
          </button>
          <span className="text-white/50 text-xs font-medium">Visualiseur AR</span>
        </div>
        {/* AR Viewer fullscreen */}
        <div className="flex-1 flex flex-col p-2 pb-4 overflow-auto">
          <ARViewer
            onCapture={(imageData) => {
              setData((prev) => ({ ...prev, arPhoto: imageData }));
              setArFullscreen(false);
              setStep(1);
            }}
            onSkip={() => {
              setArFullscreen(false);
              setStep(1);
            }}
            fullscreen
          />
        </div>
      </div>
    )}

    <section id="devis" className="py-16 lg:py-20 bg-dark relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-semibold rounded-full mb-4">
            Devis gratuit en 2 minutes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {submitted ? "Merci !" : "Votre estimation personnalisée"}
          </h2>
          {!submitted && (
            <p className="mt-3 text-white/50">
              Sans engagement — Réponse sous 48h
            </p>
          )}
        </div>

        {/* Progress bar */}
        {!submitted && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[0, 1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold transition-all duration-500 ${
                    s < step
                      ? "bg-primary text-white"
                      : s === step
                      ? "bg-white text-dark ring-4 ring-primary/30"
                      : "bg-white/10 text-white/30"
                  }`}
                >
                  {s < step ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    s === 0 ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
                      </svg>
                    ) : s
                  )}
                </div>
              ))}
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-white/30 font-medium uppercase tracking-wider">
              <span>Visualiser</span>
              <span>Pièce</span>
              <span>Logement</span>
              <span>Installation</span>
              <span>Contact</span>
            </div>
          </div>
        )}

        {/* Form card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
          {/* Step 0 — AR intro (the actual AR is fullscreen) */}
          {step === 0 && !arFullscreen && (
            <div className="p-5 sm:p-8 lg:p-10 text-center">
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-dark mb-2">Visualisez la clim chez vous</h3>
              <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
                Ouvrez votre caméra et placez un modèle de clim sur votre mur. Prenez une photo — elle sera jointe à votre devis.
              </p>
              <div className="flex flex-col gap-3 items-center">
                <button
                  onClick={() => setArFullscreen(true)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
                  </svg>
                  Ouvrir la caméra
                </button>
                <button onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-gray-600 transition-colors py-2">
                  Passer cette étape
                </button>
              </div>
            </div>
          )}

          {/* Step 1 — Pièce */}
          {step === 1 && (
            <div className="p-5 sm:p-8 lg:p-10">
              <h3 className="text-base sm:text-lg font-bold text-dark mb-1">Quelle pièce voulez-vous climatiser ?</h3>
              <p className="text-sm text-gray-400 mb-6">Choisissez le type de pièce principal</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {pieceTypes.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => update("piece", p.value)}
                    className={`flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 ${
                      data.piece === p.value
                        ? "border-primary bg-primary-light shadow-sm"
                        : "border-gray-200 hover:border-gray-300 bg-gray-50"
                    }`}
                  >
                    <div className={`${data.piece === p.value ? "text-primary" : "text-gray-400"}`}>
                      <PieceIcon type={p.icon} />
                    </div>
                    <span className={`text-sm font-semibold ${data.piece === p.value ? "text-primary" : "text-dark"}`}>
                      {p.label}
                    </span>
                    <span className="text-[11px] text-gray-400">{p.m2}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Logement + Surface */}
          {step === 2 && (
            <div className="p-5 sm:p-8 lg:p-10">
              <h3 className="text-base sm:text-lg font-bold text-dark mb-1">Parlez-nous de votre logement</h3>
              <p className="text-sm text-gray-400 mb-6">Pour adapter notre recommandation</p>

              <div className="mb-6">
                <label className="text-sm font-semibold text-dark mb-3 block">Type de logement</label>
                <div className="grid grid-cols-3 gap-3">
                  {logementTypes.map((l) => (
                    <button
                      key={l.value}
                      onClick={() => update("logement", l.value)}
                      className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                        data.logement === l.value
                          ? "border-primary bg-primary-light text-primary"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-dark mb-3 block">Surface de la pièce</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {surfaces.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => update("surface", s.value)}
                      className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                        data.surface === s.value
                          ? "border-primary bg-primary-light text-primary"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Type d'installation */}
          {step === 3 && (
            <div className="p-5 sm:p-8 lg:p-10">
              <h3 className="text-base sm:text-lg font-bold text-dark mb-1">Comment souhaitez-vous l&apos;installer ?</h3>
              <p className="text-sm text-gray-400 mb-6">Vous pouvez changer d&apos;avis plus tard</p>
              <div className="space-y-4">
                <button
                  onClick={() => update("installation", "pro")}
                  className={`w-full flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 text-left transition-all ${
                    data.installation === "pro"
                      ? "border-primary bg-primary-light"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    data.installation === "pro" ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${data.installation === "pro" ? "text-primary" : "text-dark"}`}>
                        Installation par un professionnel
                      </span>
                      <span className="px-2 py-0.5 bg-secondary text-white text-[10px] font-bold rounded-full">Recommandé</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">On s&apos;occupe de tout. Installateur certifié RGE, éligible aux aides de l&apos;État.</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Certifié RGE", "Éligible aides", "Garantie 5 ans"].map((t) => (
                        <span key={t} className="text-[11px] font-medium bg-white px-2.5 py-1 rounded-lg text-gray-500 border border-gray-200">{t}</span>
                      ))}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => update("installation", "diy")}
                  className={`w-full flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 text-left transition-all ${
                    data.installation === "diy"
                      ? "border-primary bg-primary-light"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    data.installation === "diy" ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className={`font-bold ${data.installation === "diy" ? "text-primary" : "text-dark"}`}>
                      J&apos;installe moi-même
                    </span>
                    <p className="text-sm text-gray-500 mt-1">Pack prêt à poser livré chez vous. Tutos vidéo + hotline technique gratuite.</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Tutos vidéo", "Hotline gratuite", "Retour 30 jours"].map((t) => (
                        <span key={t} className="text-[11px] font-medium bg-white px-2.5 py-1 rounded-lg text-gray-500 border border-gray-200">{t}</span>
                      ))}
                    </div>
                  </div>
                </button>
              </div>

              {/* Mini estimation preview */}
              {data.surface && (
                <div className="mt-6 bg-gray-50 rounded-2xl p-5 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 uppercase font-medium">Estimation préliminaire</span>
                      <div className="text-sm font-semibold text-dark mt-0.5">Modèle {estimation.model} — Classe {estimation.efficiency}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-primary">
                        {data.installation === "diy" ? estimation.priceDiy : estimation.priceInstalled}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {data.installation === "diy" ? "prêt à poser" : "fourni + installé"}
                      </div>
                    </div>
                  </div>
                  {data.installation === "pro" && (
                    <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-sm text-green-600 font-medium">Aides estimées : {estimation.aides}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 4 — Coordonnées */}
          {step === 4 && (
            <div className="p-5 sm:p-8 lg:p-10">
              <h3 className="text-base sm:text-lg font-bold text-dark mb-1">Vos coordonnées</h3>
              <p className="text-sm text-gray-400 mb-6">Pour recevoir votre devis détaillé sous 48h</p>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1.5 block">Nom complet *</label>
                    <input
                      type="text"
                      value={data.nom}
                      onChange={(e) => update("nom", e.target.value)}
                      placeholder="Jean Dupont"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1.5 block">Téléphone *</label>
                    <input
                      type="tel"
                      value={data.telephone}
                      onChange={(e) => update("telephone", e.target.value)}
                      placeholder="06 12 34 56 78"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1.5 block">Email *</label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="jean@exemple.fr"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1.5 block">Ville / Code postal</label>
                    <input
                      type="text"
                      value={data.ville}
                      onChange={(e) => update("ville", e.target.value)}
                      placeholder="31000 Toulouse"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Message (optionnel)</label>
                  <textarea
                    value={data.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Précisions sur votre projet, contraintes particulières..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Recap */}
              <div className="mt-6 bg-cream rounded-2xl p-5 border border-gray-200">
                <h4 className="text-sm font-bold text-dark mb-3">Récapitulatif de votre projet</h4>
                {data.arPhoto && (
                  <div className="mb-3">
                    <span className="text-xs text-gray-400 block mb-1.5">Photo de votre pièce</span>
                    <img src={data.arPhoto} alt="Visualisation clim" className="w-full h-32 object-cover rounded-xl border border-gray-200" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-gray-400">Pièce</span>
                  <span className="text-dark font-medium">{pieceTypes.find((p) => p.value === data.piece)?.label}</span>
                  <span className="text-gray-400">Logement</span>
                  <span className="text-dark font-medium">{logementTypes.find((l) => l.value === data.logement)?.label}</span>
                  <span className="text-gray-400">Surface</span>
                  <span className="text-dark font-medium">{surfaces.find((s) => s.value === data.surface)?.label}</span>
                  <span className="text-gray-400">Installation</span>
                  <span className="text-dark font-medium">{data.installation === "pro" ? "Par un professionnel" : "Prêt à poser (DIY)"}</span>
                  <span className="text-gray-400">Modèle estimé</span>
                  <span className="text-primary font-bold">{estimation.model}</span>
                  <span className="text-gray-400">Budget estimé</span>
                  <span className="text-primary font-bold">{data.installation === "diy" ? estimation.priceDiy : estimation.priceInstalled}</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-400 leading-relaxed">
                En soumettant ce formulaire, vous acceptez d&apos;être recontacté par un conseiller Installe ta Clim.
                Vos données sont protégées et ne seront jamais revendues.
                <a href="/mentions-legales" className="underline hover:text-primary ml-1">Politique de confidentialité</a>
              </p>
            </div>
          )}

          {/* Step 5 — Confirmation */}
          {step === 5 && submitted && (
            <div className="p-5 sm:p-8 lg:p-12 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-dark">Demande envoyée !</h3>
              <p className="text-gray-500 mt-3 max-w-md mx-auto">
                Merci <strong className="text-dark">{data.nom}</strong>. Un conseiller vous recontacte sous <strong className="text-primary">48h</strong> avec votre devis détaillé personnalisé.
              </p>

              {/* AR Photo */}
              {data.arPhoto && (
                <div className="mt-6 max-w-sm mx-auto">
                  <img src={data.arPhoto} alt="Votre visualisation" className="w-full h-40 object-cover rounded-2xl border border-gray-200 shadow-sm" />
                  <p className="text-xs text-gray-400 mt-2">Photo jointe à votre demande de devis</p>
                </div>
              )}

              {/* Estimation card */}
              <div className="mt-6 bg-cream rounded-2xl p-6 border border-gray-200 max-w-sm mx-auto">
                <div className="text-xs text-gray-400 uppercase font-medium mb-2">Votre estimation</div>
                <div className="text-3xl font-extrabold text-primary">
                  {data.installation === "diy" ? estimation.priceDiy : estimation.priceInstalled}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Modèle {estimation.model} — {data.installation === "pro" ? "Fourni + installé" : "Pack prêt à poser"}
                </div>
                {data.installation === "pro" && (
                  <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-green-600 font-medium">
                    Aides estimées : {estimation.aides}
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                {["Sans engagement", "Réponse sous 48h", "100% gratuit"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          {!submitted && step > 0 && (
            <div className="px-5 sm:px-8 lg:px-10 pb-5 sm:pb-8 lg:pb-10 flex items-center justify-between gap-4">
              {step > 1 && step !== 0 ? (
                <button
                  onClick={prev}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-gray-500 hover:text-dark transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Retour
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  onClick={next}
                  disabled={!canNext()}
                  className={`flex items-center gap-2 px-7 py-3.5 font-bold text-sm rounded-xl transition-all duration-200 ${
                    canNext()
                      ? "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25 hover:-translate-y-0.5"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Continuer
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={!canNext()}
                  className={`flex items-center gap-2 px-7 py-3.5 font-bold text-sm rounded-xl transition-all duration-200 ${
                    canNext()
                      ? "bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25 hover:-translate-y-0.5"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
                  </svg>
                  Recevoir mon devis gratuit
                </button>
              )}
            </div>
          )}
        </div>

        {/* Trust */}
        {!submitted && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
            {["Sans engagement", "Réponse sous 48h", "Données protégées", "100% gratuit"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  );
}
