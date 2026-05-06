"use client";

import { useState, useEffect } from "react";

type Step = 0 | 1 | 2 | 3 | 4;

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
  distanceTableau: number;
  installation: "diy" | "pro";
  nom: string;
  telephone: string;
  email: string;
  ville: string;
  message: string;
}

const initialData: FormData = {
  logement: "",
  nbPieces: 1,
  rooms: [{ type: "", surface: "" }],
  distanceTableau: 0,
  installation: "diy",
  nom: "",
  telephone: "",
  email: "",
  ville: "",
  message: "",
};

function getEstimation(data: FormData): { model: string; priceDiy: string; priceInstalled: string; efficiency: string } {
  if (data.nbPieces > 1) {
    return { model: "Multi-split sur-mesure", priceDiy: "Sur devis", priceInstalled: "Sur devis", efficiency: "A+++" };
  }
  const s = parseInt(data.rooms[0]?.surface || "0");
  if (isNaN(s) || s > 50) {
    return { model: "Sur-mesure", priceDiy: "Sur devis", priceInstalled: "Sur devis", efficiency: "A+++" };
  }
  if (s <= 20) {
    return { model: "Essentiel", priceDiy: "699 €", priceInstalled: "1 499 €", efficiency: "A+" };
  }
  if (s <= 35) {
    return { model: "Confort+", priceDiy: "999 €", priceInstalled: "1 899 €", efficiency: "A++" };
  }
  return { model: "Premium", priceDiy: "1 499 €", priceInstalled: "2 399 €", efficiency: "A+++" };
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

  /* REC-001: Listen for #pro / #diy hash to pre-select installation mode */
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#pro" || hash === "#diy") {
      const mode = hash === "#pro" ? "pro" : "diy";
      setData((prev) => ({ ...prev, installation: mode }));
      // Clean the hash
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

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

  /* REC-008: All fields required before moving to the next step */
  const canNext = (): boolean => {
    switch (step) {
      case 0: return !!data.nom && !!data.telephone && !!data.email && !!data.ville;
      case 1: return !!data.logement && data.nbPieces >= 1;
      case 2: return data.rooms.every((r) => !!r.type && !!r.surface) && data.distanceTableau >= 1;
      case 3: return !!data.installation;
      default: return false;
    }
  };

  const next = () => { if (canNext() && step < 4) setStep((step + 1) as Step); };
  const prev = () => { if (step > 0) setStep((step - 1) as Step); };
  const submit = () => { setSubmitted(true); setStep(4); };

  const estimation = getEstimation(data);
  const progress = (step / 4) * 100;

  return (
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

        {/* Progress bar — REC-009: 4 steps instead of 5 (Plan 2D removed) */}
        {!submitted && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[0, 1, 2, 3].map((s) => (
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
              <span>Contact</span>
              <span>Bien</span>
              <span>Pièces</span>
              <span>Installation</span>
            </div>
          </div>
        )}

        {/* Form card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">

          {/* ============ STEP 0 — Coordonnées (capture lead en premier) ============ */}
          {step === 0 && (
            <div className="p-5 sm:p-8 lg:p-10">
              <h3 className="text-base sm:text-lg font-bold text-dark mb-1">Commençons par vous connaître</h3>
              <p className="text-sm text-gray-400 mb-6">Pour vous recontacter avec votre estimation personnalisée</p>
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
                    <label className="text-sm font-medium text-gray-600 mb-1.5 block">Ville / Code postal *</label>
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

          {/* ============ STEP 2 — Détail de chaque pièce + Distance tableau élec ============ */}
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

              {/* REC-008: Distance au tableau électrique — obligatoire */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <label className="text-sm font-semibold text-dark mb-1 block">
                  Distance au tableau électrique *
                </label>
                <p className="text-xs text-gray-400 mb-4">
                  Distance approximative entre l&apos;emplacement de la clim et votre tableau électrique
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => update("distanceTableau", Math.max(1, data.distanceTableau - 1))}
                    className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 font-bold text-lg hover:bg-gray-200 transition-colors"
                  >
                    −
                  </button>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={data.distanceTableau || 1}
                      onChange={(e) => update("distanceTableau", Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <button
                    onClick={() => update("distanceTableau", Math.min(30, data.distanceTableau + 1))}
                    className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 font-bold text-lg hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                  <span className="text-lg font-bold text-primary min-w-[55px] text-center">
                    {data.distanceTableau > 0 ? `${data.distanceTableau} m` : "—"}
                  </span>
                </div>
                {data.distanceTableau > 15 && (
                  <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <span className="text-xs text-amber-700">Distance importante : un câblage supplémentaire peut être nécessaire. Notre installateur vérifiera la faisabilité.</span>
                  </div>
                )}
                {data.distanceTableau === 0 && (
                  <p className="text-xs text-red-400 mt-2">* Veuillez indiquer la distance (déplacez le curseur)</p>
                )}
              </div>
            </div>
          )}

          {/* ============ STEP 3 — Type d'installation ============ */}
          {step === 3 && (
            <div className="p-5 sm:p-8 lg:p-10">
              <h3 className="text-base sm:text-lg font-bold text-dark mb-1">Comment souhaitez-vous l&apos;installer ?</h3>
              <p className="text-sm text-gray-400 mb-6">Choisissez la formule qui vous convient</p>
              <div className="space-y-4">
                {/* DIY — en premier, poussé */}
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
                      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${data.installation === "diy" ? "text-primary" : "text-dark"}`}>
                        J&apos;installe moi-même
                      </span>
                      <span className="px-2 py-0.5 bg-secondary text-white text-[10px] font-bold rounded-full">Populaire</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Pack prêt à poser livré chez vous. Tutos vidéo + hotline technique gratuite.</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Livraison rapide", "Tutos vidéo", "Hotline gratuite", "Retour 30 jours"].map((t) => (
                        <span key={t} className="text-[11px] font-medium bg-white px-2.5 py-1 rounded-lg text-gray-500 border border-gray-200">{t}</span>
                      ))}
                    </div>
                    <div className="mt-3 text-lg font-extrabold text-primary">
                      {estimation.priceDiy}
                    </div>
                  </div>
                </button>

                {/* Pro — en second, sur devis */}
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
                    <span className={`font-bold ${data.installation === "pro" ? "text-primary" : "text-dark"}`}>
                      Installation par un professionnel
                    </span>
                    <p className="text-sm text-gray-500 mt-1">On s&apos;occupe de tout. Installateur qualifié, pose soignée et garantie.</p>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      Toulouse et alentours uniquement
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Pro qualifié", "Pose soignée", "Garantie 5 ans"].map((t) => (
                        <span key={t} className="text-[11px] font-medium bg-white px-2.5 py-1 rounded-lg text-gray-500 border border-gray-200">{t}</span>
                      ))}
                    </div>
                    <div className="mt-3 text-lg font-extrabold text-primary">Sur devis</div>
                  </div>
                </button>
              </div>

              {/* Recap complet */}
              <div className="mt-6 bg-cream rounded-2xl p-5 border border-gray-200">
                <h4 className="text-sm font-bold text-dark mb-3">Récapitulatif de votre projet</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-gray-400">Contact</span>
                  <span className="text-dark font-medium">{data.nom}</span>
                  <span className="text-gray-400">Téléphone</span>
                  <span className="text-dark font-medium">{data.telephone}</span>
                  <span className="text-gray-400">Email</span>
                  <span className="text-dark font-medium">{data.email}</span>
                  <span className="text-gray-400">Ville</span>
                  <span className="text-dark font-medium">{data.ville}</span>
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
                  <span className="text-gray-400">Distance tableau élec.</span>
                  <span className="text-dark font-medium">{data.distanceTableau} m</span>
                  <span className="text-gray-400">Formule</span>
                  <span className="text-dark font-medium">{data.installation === "pro" ? "Avec installation pro" : "Pack prêt à poser"}</span>
                  <span className="text-gray-400">Modèle estimé</span>
                  <span className="text-primary font-bold">{estimation.model} — {estimation.efficiency}</span>
                  <span className="text-gray-400">Budget</span>
                  <span className="text-primary font-bold">{data.installation === "diy" ? estimation.priceDiy : "Sur devis"}</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-400 leading-relaxed">
                En soumettant ce formulaire, vous acceptez d&apos;être recontacté par un conseiller Installe ta Clim.
                Vos données sont protégées et ne seront jamais revendues.
                <a href="/mentions-legales" className="underline hover:text-primary ml-1">Politique de confidentialité</a>
              </p>
            </div>
          )}


          {/* ============ STEP 4 — Confirmation DIY (paiement) ou Pro (visio) ============ */}
          {step === 4 && submitted && (
            <div className="p-5 sm:p-8 lg:p-12">
              {data.installation === "diy" ? (
                /* ---- DIY : Paiement Stripe ---- */
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-extrabold text-dark">Votre commande est prête !</h3>
                  <p className="text-gray-500 mt-3 max-w-md mx-auto">
                    Merci <strong className="text-dark">{data.nom}</strong>. Finalisez votre paiement pour recevoir votre pack <strong className="text-primary">{estimation.model}</strong>.
                  </p>

                  {/* Résumé commande */}
                  <div className="mt-6 bg-cream rounded-2xl p-6 border border-gray-200 max-w-sm mx-auto">
                    <div className="text-xs text-gray-400 uppercase font-medium mb-2">Votre commande</div>
                    <div className="text-3xl font-extrabold text-primary">{estimation.priceDiy}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Pack prêt à poser — Modèle {estimation.model}
                    </div>
                    {data.nbPieces > 1 && (
                      <div className="text-xs text-gray-400 mt-1">{data.nbPieces} pièces à climatiser</div>
                    )}
                  </div>

                  {/* Bouton paiement Stripe */}
                  <button
                    className="mt-6 inline-flex items-center gap-3 px-8 py-4 bg-[#635BFF] text-white font-bold text-base rounded-xl hover:bg-[#5249E6] shadow-lg shadow-[#635BFF]/25 hover:-translate-y-0.5 transition-all duration-200"
                    onClick={() => {/* Stripe Checkout sera intégré ici */}}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                    Payer par carte — {estimation.priceDiy}
                  </button>
                  <p className="mt-3 text-xs text-gray-400">Paiement sécurisé par Stripe — Livraison sous 5 jours ouvrés</p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                    {["Paiement sécurisé", "Retour 30 jours", "Hotline gratuite"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Option basculer vers pro / visio */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-3">Si vous préférez, on s&apos;occupe de tout</p>
                    <button
                      onClick={() => update("installation", "pro")}
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold text-sm rounded-xl hover:bg-primary-light transition-all"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                      </svg>
                      Demander un rendez-vous visio
                    </button>
                    <p className="mt-2 text-xs text-gray-400">Installation pro — Toulouse et alentours</p>
                  </div>
                </div>
              ) : (
                /* ---- PRO : Rendez-vous visio ---- */
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-extrabold text-dark">Demande de rendez-vous envoyée !</h3>
                  <p className="text-gray-500 mt-3 max-w-md mx-auto">
                    Merci <strong className="text-dark">{data.nom}</strong>. Un conseiller vous recontacte sous <strong className="text-primary">48h</strong> pour planifier votre rendez-vous visio et établir votre devis personnalisé.
                  </p>

                  <div className="mt-6 bg-cream rounded-2xl p-6 border border-gray-200 max-w-sm mx-auto">
                    <div className="text-xs text-gray-400 uppercase font-medium mb-2">Installation professionnelle</div>
                    <div className="text-2xl font-extrabold text-primary">Sur devis</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Modèle {estimation.model} — Fourni + installé
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-amber-600 font-medium">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      Toulouse et alentours
                    </div>
                  </div>

                  <div className="mt-6 bg-gray-50 rounded-2xl p-5 border border-gray-200 max-w-sm mx-auto">
                    <div className="text-sm font-semibold text-dark mb-2">Prochaine étape</div>
                    <div className="flex items-start gap-3 text-left">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Un conseiller vous appelle pour un <strong className="text-dark">rendez-vous visio</strong> afin d&apos;évaluer votre installation et vous proposer le meilleur devis.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                    {["Sans engagement", "Devis gratuit", "Réponse sous 48h"].map((item) => (
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
            </div>
          )}

          {/* Navigation buttons */}
          {!submitted && (
            <div className="px-5 sm:px-8 lg:px-10 pb-5 sm:pb-8 lg:pb-10 flex items-center justify-between gap-4">
              {step > 0 ? (
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

              {step < 3 ? (
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
                  {data.installation === "diy" ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                      </svg>
                      Commander — {estimation.priceDiy}
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                      </svg>
                      Prendre rendez-vous visio
                    </>
                  )}
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
  );
}
