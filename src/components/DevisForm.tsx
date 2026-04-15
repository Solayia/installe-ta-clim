"use client";

import { useState } from "react";
import RoomPlanner from "./RoomPlanner";

type Step = 0 | 1 | 2 | 3 | 4 | 5;

/* ------------------------------------------------------------------ */
/*  Data & constants                                                   */
/* ------------------------------------------------------------------ */

const logementTypes = [
  { value: "appartement", label: "Appartement", icon: "building" },
  { value: "maison", label: "Maison", icon: "home" },
  { value: "commerce", label: "Local commercial", icon: "shop" },
];

const pieceTypes = [
  { value: "chambre", label: "Chambre", icon: "bed" },
  { value: "bureau", label: "Bureau", icon: "desk" },
  { value: "salon", label: "Salon / Séjour", icon: "sofa" },
  { value: "cuisine", label: "Cuisine", icon: "kitchen" },
  { value: "openspace", label: "Grand espace", icon: "home" },
  { value: "autre", label: "Autre", icon: "grid" },
];

const surfaceOptions = [
  { value: "10", label: "< 10 m²" },
  { value: "15", label: "10-15 m²" },
  { value: "20", label: "15-20 m²" },
  { value: "25", label: "20-25 m²" },
  { value: "30", label: "25-30 m²" },
  { value: "35", label: "30-35 m²" },
  { value: "40", label: "35-40 m²" },
  { value: "50", label: "40-50 m²" },
  { value: "50+", label: "> 50 m²" },
];

interface RoomConfig {
  type: string;
  surface: string;
}

interface FormData {
  logement: string;
  nbPieces: number;
  rooms: RoomConfig[];
  installation: "diy" | "pro";
  nom: string;
  telephone: string;
  email: string;
  ville: string;
  message: string;
  planPhoto: string | null;
}

const initialData: FormData = {
  logement: "",
  nbPieces: 1,
  rooms: [{ type: "", surface: "" }],
  installation: "pro",
  nom: "",
  telephone: "",
  email: "",
  ville: "",
  message: "",
  planPhoto: null,
};

function getEstimation(data: FormData): { model: string; priceDiy: string; priceInstalled: string; aides: string; efficiency: string } {
  if (data.nbPieces > 1) {
    return { model: "Multi-split sur-mesure", priceDiy: "Sur devis", priceInstalled: "Sur devis", aides: "Jusqu'à 5 000 €", efficiency: "A+++" };
  }
  const s = parseInt(data.rooms[0]?.surface || "0");
  if (isNaN(s) || s > 50) {
    return { model: "Sur-mesure", priceDiy: "Sur devis", priceInstalled: "Sur devis", aides: "Jusqu'à 5 000 €", efficiency: "A+++" };
  }
  if (s <= 20) {
    return { model: "Essentiel", priceDiy: "699 €", priceInstalled: "1 499 €", aides: "~1 200 €", efficiency: "A+" };
  }
  if (s <= 35) {
    return { model: "Confort+", priceDiy: "999 €", priceInstalled: "1 899 €", aides: "~1 500 €", efficiency: "A++" };
  }
  return { model: "Premium", priceDiy: "1 499 €", priceInstalled: "2 399 €", aides: "~2 000 €", efficiency: "A+++" };
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function TypeIcon({ type }: { type: string }) {
  const props = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "building":
      return <svg {...props}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/></svg>;
    case "home":
      return <svg {...props}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>;
    case "shop":
      return <svg {...props}><path d="M3 9l1-4h16l1 4"/><path d="M3 9v11a1 1 0 001 1h16a1 1 0 001-1V9"/><path d="M9 21V12h6v9"/></svg>;
    case "bed":
      return <svg {...props}><path d="M2 4v16"/><path d="M2 8h18a2 2 0 012 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>;
    case "desk":
      return <svg {...props}><rect x="2" y="7" width="20" height="3" rx="1"/><path d="M4 10v7M20 10v7M12 10v7"/></svg>;
    case "sofa":
      return <svg {...props}><path d="M20 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v3"/><path d="M2 11v5a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-4 0v2H6v-2a2 2 0 00-4 0z"/></svg>;
    case "kitchen":
      return <svg {...props}><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><circle cx="8" cy="7" r="1"/><circle cx="16" cy="7" r="1"/></svg>;
    case "grid":
      return <svg {...props}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Main form component                                                */
/* ------------------------------------------------------------------ */

export default function DevisForm() {
  const [step, setStep] = useState<Step>(0);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [showPlanner, setShowPlanner] = useState(false);

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateRoom = (index: number, field: keyof RoomConfig, value: string) => {
    setData((prev) => {
      const rooms = [...prev.rooms];
      rooms[index] = { ...rooms[index], [field]: value };
      return { ...prev, rooms };
    });
  };

  const setNbPieces = (n: number) => {
    const clamped = Math.max(1, Math.min(6, n));
    const rooms = [...data.rooms];
    while (rooms.length < clamped) rooms.push({ type: "", surface: "" });
    while (rooms.length > clamped) rooms.pop();
    setData((prev) => ({ ...prev, nbPieces: clamped, rooms }));
  };

  const canNext = (): boolean => {
    switch (step) {
      case 0: return true;
      case 1: return !!data.logement && data.nbPieces >= 1;
      case 2: return data.rooms.every((r) => !!r.type && !!r.surface);
      case 3: return !!data.installation;
      case 4: return !!data.nom && !!data.telephone && !!data.email;
      default: return false;
    }
  };

  const next = () => { if (canNext() && step < 5) setStep((step + 1) as Step); };
  const prev = () => { if (step > 0) setStep((step - 1) as Step); };
  const submit = () => { setSubmitted(true); setStep(5); };

  const estimation = getEstimation(data);
  const progress = (step / 5) * 100;

  return (
    <>
    {/* (Plan 2D is now inline in Step 0) */}

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
                    s + 1
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
              <span>Plan 2D</span>
              <span>Bien</span>
              <span>Pièces</span>
              <span>Installation</span>
              <span>Contact</span>
            </div>
          </div>
        )}

        {/* Form card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">

          {/* ============ STEP 0 — Plan 2D ============ */}
          {step === 0 && !showPlanner && (
            <div className="p-5 sm:p-8 lg:p-10 text-center">
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="12" y1="3" x2="12" y2="21" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-dark mb-2">Dessinez le plan de votre pièce</h3>
              <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
                Créez un plan 2D de votre pièce, placez portes et fenêtres, et positionnez la clim sur le mur de votre choix. Le plan sera joint à votre devis.
              </p>
              <div className="flex flex-col gap-3 items-center">
                <button
                  onClick={() => setShowPlanner(true)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
                  </svg>
                  Créer mon plan
                </button>
                <button onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-gray-600 transition-colors py-2">
                  Passer cette étape
                </button>
              </div>
            </div>
          )}

          {step === 0 && showPlanner && (
            <div className="p-4 sm:p-6">
              <h3 className="text-base font-bold text-dark mb-3 text-center">Plan de votre pièce</h3>
              <RoomPlanner
                onCapture={(imageData) => {
                  setData((prev) => ({ ...prev, planPhoto: imageData }));
                  setShowPlanner(false);
                  setStep(1);
                }}
                onSkip={() => {
                  setShowPlanner(false);
                  setStep(1);
                }}
              />
            </div>
          )}

          {/* ============ STEP 1 — Type de bien + Nombre de pièces ============ */}
          {step === 1 && (
            <div className="p-5 sm:p-8 lg:p-10">
              <h3 className="text-base sm:text-lg font-bold text-dark mb-1">Parlez-nous de votre bien</h3>
              <p className="text-sm text-gray-400 mb-6">Pour adapter notre recommandation</p>

              {/* Type de logement */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-dark mb-3 block">Type de bien</label>
                <div className="grid grid-cols-3 gap-3">
                  {logementTypes.map((l) => (
                    <button
                      key={l.value}
                      onClick={() => update("logement", l.value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                        data.logement === l.value
                          ? "border-primary bg-primary-light text-primary"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <div className={data.logement === l.value ? "text-primary" : "text-gray-400"}>
                        <TypeIcon type={l.icon} />
                      </div>
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nombre de pièces */}
              <div>
                <label className="text-sm font-semibold text-dark mb-3 block">Combien de pièces à climatiser ?</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setNbPieces(data.nbPieces - 1)}
                    className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 font-bold text-lg hover:bg-gray-200 transition-colors"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-extrabold text-primary">{data.nbPieces}</span>
                    <span className="text-sm text-gray-400 ml-2">pièce{data.nbPieces > 1 ? "s" : ""}</span>
                  </div>
                  <button
                    onClick={() => setNbPieces(data.nbPieces + 1)}
                    className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 font-bold text-lg hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
                {data.nbPieces > 1 && (
                  <p className="text-xs text-gray-400 text-center mt-2">
                    {data.nbPieces >= 3 ? "Un système multi-split sera recommandé" : "Vous pourrez détailler chaque pièce à l'étape suivante"}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ============ STEP 2 — Détail de chaque pièce ============ */}
          {step === 2 && (
            <div className="p-5 sm:p-8 lg:p-10">
              <h3 className="text-base sm:text-lg font-bold text-dark mb-1">
                {data.nbPieces === 1 ? "Décrivez votre pièce" : `Décrivez vos ${data.nbPieces} pièces`}
              </h3>
              <p className="text-sm text-gray-400 mb-6">Pour chaque pièce, indiquez le type et la surface</p>

              <div className="space-y-6">
                {data.rooms.map((room, i) => (
                  <div key={i} className={`${data.nbPieces > 1 ? "bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-100" : ""}`}>
                    {data.nbPieces > 1 && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </div>
                        <span className="text-sm font-semibold text-dark">Pièce {i + 1}</span>
                      </div>
                    )}

                    {/* Type de pièce */}
                    <label className="text-xs font-semibold text-gray-500 mb-2 block">Type de pièce</label>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {pieceTypes.map((p) => (
                        <button
                          key={p.value}
                          onClick={() => updateRoom(i, "type", p.value)}
                          className={`flex flex-col items-center gap-1 p-2.5 sm:p-3 rounded-xl border-2 transition-all ${
                            room.type === p.value
                              ? "border-primary bg-primary-light text-primary"
                              : "border-gray-200 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          <div className={`${room.type === p.value ? "text-primary" : "text-gray-400"}`}>
                            <TypeIcon type={p.icon} />
                          </div>
                          <span className="text-xs font-semibold">{p.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Surface */}
                    <label className="text-xs font-semibold text-gray-500 mb-2 block">Surface</label>
                    <div className="grid grid-cols-3 gap-2">
                      {surfaceOptions.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => updateRoom(i, "surface", s.value)}
                          className={`py-2.5 rounded-xl border-2 text-xs font-medium transition-all ${
                            room.surface === s.value
                              ? "border-primary bg-primary-light text-primary"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============ STEP 3 — Type d'installation ============ */}
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
            </div>
          )}

          {/* ============ STEP 4 — Coordonnées ============ */}
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
                {data.planPhoto && (
                  <div className="mb-3">
                    <span className="text-xs text-gray-400 block mb-1.5">Plan de votre pièce</span>
                    <img src={data.planPhoto} alt="Plan 2D de la pièce" className="w-full h-32 object-cover rounded-xl border border-gray-200" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-gray-400">Type de bien</span>
                  <span className="text-dark font-medium">{logementTypes.find((l) => l.value === data.logement)?.label}</span>
                  <span className="text-gray-400">Pièces à climatiser</span>
                  <span className="text-dark font-medium">{data.nbPieces} pièce{data.nbPieces > 1 ? "s" : ""}</span>
                  {data.rooms.map((room, i) => (
                    <span key={i} className="contents">
                      <span className="text-gray-400">{data.nbPieces > 1 ? `Pièce ${i + 1}` : "Pièce"}</span>
                      <span className="text-dark font-medium">
                        {pieceTypes.find((p) => p.value === room.type)?.label} — {surfaceOptions.find((s) => s.value === room.surface)?.label}
                      </span>
                    </span>
                  ))}
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

          {/* ============ STEP 5 — Confirmation ============ */}
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

              {data.planPhoto && (
                <div className="mt-6 max-w-sm mx-auto">
                  <img src={data.planPhoto} alt="Plan de votre pièce" className="w-full h-40 object-cover rounded-2xl border border-gray-200 shadow-sm" />
                  <p className="text-xs text-gray-400 mt-2">Plan 2D joint à votre demande de devis</p>
                </div>
              )}

              <div className="mt-6 bg-cream rounded-2xl p-6 border border-gray-200 max-w-sm mx-auto">
                <div className="text-xs text-gray-400 uppercase font-medium mb-2">Votre estimation</div>
                <div className="text-3xl font-extrabold text-primary">
                  {data.installation === "diy" ? estimation.priceDiy : estimation.priceInstalled}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Modèle {estimation.model} — {data.installation === "pro" ? "Fourni + installé" : "Pack prêt à poser"}
                </div>
                {data.nbPieces > 1 && (
                  <div className="text-xs text-gray-400 mt-1">{data.nbPieces} pièces à climatiser</div>
                )}
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
              <button
                onClick={prev}
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-gray-500 hover:text-dark transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Retour
              </button>

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
