"use client";

import { useState, useEffect } from "react";

type Step = 0 | 1 | 2 | 3 | 4;

/* ------------------------------------------------------------------ */
/*  Data & constants                                                   */
/* ------------------------------------------------------------------ */

const statutOptions = [
  { value: "proprietaire", label: "Propriétaire" },
  { value: "locataire", label: "Locataire" },
];

const logementTypes = [
  { value: "appartement", label: "Appartement", icon: "building" },
  { value: "maison", label: "Maison", icon: "home" },
  { value: "commerce", label: "Local commercial", icon: "shop" },
];

const etageOptions = [
  { value: "rdc", label: "RDC" },
  { value: "1", label: "1er" },
  { value: "2", label: "2ème" },
  { value: "3", label: "3ème" },
  { value: "4", label: "4ème" },
  { value: "5+", label: "5ème +" },
];

const hauteurPlafondOptions = [
  { value: "standard", label: "Standard (≤ 2,50 m)" },
  { value: "haute", label: "Haute (2,50 – 3 m)" },
  { value: "tres-haute", label: "Très haute (> 3 m)" },
];

const niveauxOptions = [
  { value: "plain-pied", label: "Plain-pied" },
  { value: "etage", label: "Avec étage(s)" },
];

const nbEtagesOptions = [
  { value: "1", label: "R+1" },
  { value: "2", label: "R+2" },
  { value: "3", label: "R+3 ou +" },
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

const distanceTableauOptions = [
  { value: "moins5", label: "< 5 m" },
  { value: "5-10", label: "5 – 10 m" },
  { value: "10-15", label: "10 – 15 m" },
  { value: "plus15", label: "> 15 m" },
];

const derriereMurOptions = [
  { value: "exterieur", label: "Extérieur" },
  { value: "piece-voisine", label: "Pièce voisine" },
  { value: "couloir", label: "Couloir / Communs" },
  { value: "ne-sais-pas", label: "Je ne sais pas" },
];

interface RoomConfig {
  type: string;
  surface: string;
  distanceTableau: string;
  derriereMur: string;
}

interface FormData {
  logement: string;
  statut: string;
  /* Appartement — REC-035 */
  etage: string;
  ascenseur: string;
  /* Maison / Local — REC-036 */
  hauteurPlafond: string;
  niveaux: string;
  nbEtages: string;
  nbPieces: number;
  rooms: RoomConfig[];
  installation: "diy" | "pro";
  nom: string;
  telephone: string;
  email: string;
  ville: string;
  message: string;
}

const initialData: FormData = {
  logement: "",
  statut: "",
  etage: "",
  ascenseur: "",
  hauteurPlafond: "",
  niveaux: "",
  nbEtages: "",
  nbPieces: 1,
  rooms: [{ type: "", surface: "", distanceTableau: "", derriereMur: "" }],
  installation: "diy",
  nom: "",
  telephone: "",
  email: "",
  ville: "",
  message: "",
};

/* Prix DIY par pièce selon sa surface */
function getRoomDiyPrice(surface: string): number {
  const s = parseInt(surface || "0");
  if (isNaN(s) || s === 0) return 0;
  if (s <= 20) return 699;
  if (s <= 35) return 999;
  return 1499;
}

function formatPrice(n: number): string {
  const str = n.toString();
  if (str.length > 3) {
    return str.slice(0, -3) + " " + str.slice(-3) + " €";
  }
  return str + " €";
}

function getEstimation(data: FormData): { model: string; priceDiy: string; priceInstalled: string; efficiency: string } {
  if (data.nbPieces > 1) {
    /* Plusieurs pièces : somme du prix de chaque pièce selon sa surface */
    const total = data.rooms.reduce((sum, room) => sum + getRoomDiyPrice(room.surface), 0);
    return {
      model: "Configuration sur-mesure",
      priceDiy: total > 0 ? formatPrice(total) : "—",
      priceInstalled: "Sur devis",
      efficiency: "A+++",
    };
  }
  const s = parseInt(data.rooms[0]?.surface || "0");
  if (isNaN(s) || s > 50) {
    return { model: "Sur-mesure", priceDiy: "1 499 €", priceInstalled: "Sur devis", efficiency: "A+++" };
  }
  if (s <= 20) {
    return { model: "Essentiel", priceDiy: "699 €", priceInstalled: "Sur devis", efficiency: "A+" };
  }
  if (s <= 35) {
    return { model: "Confort+", priceDiy: "999 €", priceInstalled: "Sur devis", efficiency: "A++" };
  }
  return { model: "Premium", priceDiy: "1 499 €", priceInstalled: "Sur devis", efficiency: "A+++" };
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
/*  Small reusable sub-components                                      */
/* ------------------------------------------------------------------ */

function OptionGrid({ options, value, onChange, cols = 3 }: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  cols?: number;
}) {
  const colClass = cols === 2 ? "grid-cols-2" : cols === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3";
  return (
    <div className={`grid ${colClass} gap-2`}>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          type="button"
          className={`py-2.5 px-2 rounded-xl border-2 text-xs sm:text-sm font-medium transition-all ${
            value === o.value
              ? "border-primary bg-primary-light text-primary"
              : "border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
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

  /* When logement type changes, reset conditional sub-fields */
  const handleLogementChange = (value: string) => {
    setData((prev) => ({
      ...prev,
      logement: value,
      etage: "",
      ascenseur: "",
      hauteurPlafond: "",
      niveaux: "",
      nbEtages: "",
    }));
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
    while (rooms.length < clamped) rooms.push({ type: "", surface: "", distanceTableau: "", derriereMur: "" });
    while (rooms.length > clamped) rooms.pop();
    setData((prev) => ({ ...prev, nbPieces: clamped, rooms }));
  };

  /* Validation — all required fields before moving to the next step */
  const canNext = (): boolean => {
    switch (step) {
      case 0:
        return !!data.nom && !!data.telephone && !!data.email && !!data.ville;
      case 1: {
        let valid = !!data.statut && !!data.logement && data.nbPieces >= 1;
        if (data.logement === "appartement") {
          valid = valid && !!data.etage && !!data.ascenseur;
        } else if (data.logement === "maison" || data.logement === "commerce") {
          valid = valid && !!data.hauteurPlafond && !!data.niveaux;
          if (data.niveaux === "etage") {
            valid = valid && !!data.nbEtages;
          }
        }
        return valid;
      }
      case 2:
        return data.rooms.every((r) => !!r.type && !!r.surface && !!r.distanceTableau && !!r.derriereMur);
      case 3:
        return !!data.installation;
      default:
        return false;
    }
  };

  const next = () => { if (canNext() && step < 4) setStep((step + 1) as Step); };
  const prev = () => { if (step > 0) setStep((step - 1) as Step); };
  const submit = () => { setSubmitted(true); setStep(4); };

  const estimation = getEstimation(data);
  const progress = (step / 4) * 100;

  /* Helper labels */
  const logementLabel = logementTypes.find((l) => l.value === data.logement)?.label ?? "";
  const hasLongDistance = data.rooms.some((r) => r.distanceTableau === "plus15");

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

        {/* Progress bar */}
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
              <span>Logement</span>
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

          {/* ============ STEP 1 — Votre logement (REC-034 / 035 / 036 / 037) ============ */}
          {step === 1 && (
            <div className="p-5 sm:p-8 lg:p-10">
              {/* REC-037: wording orienté utilisateur */}
              <h3 className="text-base sm:text-lg font-bold text-dark mb-1">Décrivez votre logement</h3>
              <p className="text-sm text-gray-400 mb-6">Ces informations nous aident à dimensionner votre climatisation</p>

              {/* REC-034: Propriétaire ou locataire — obligatoire */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-dark mb-3 block">Vous êtes *</label>
                <div className="grid grid-cols-2 gap-3">
                  {statutOptions.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => update("statut", s.value)}
                      className={`flex items-center justify-center gap-2.5 p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                        data.statut === s.value
                          ? "border-primary bg-primary-light text-primary"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {s.value === "proprietaire" ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                      )}
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type de logement — REC-037: wording amélioré */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-dark mb-3 block">Quel type de logement ? *</label>
                <div className="grid grid-cols-3 gap-3">
                  {logementTypes.map((l) => (
                    <button
                      key={l.value}
                      type="button"
                      onClick={() => handleLogementChange(l.value)}
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

              {/* REC-035: Sous-questions Appartement (conditionnelles) */}
              {data.logement === "appartement" && (
                <div className="mb-6 bg-blue-50/50 rounded-2xl p-4 sm:p-5 border border-blue-100 space-y-5">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-primary"><TypeIcon type="building" /></div>
                    <span className="text-sm font-semibold text-dark">Détails de l&apos;appartement</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-2 block">À quel étage se situe votre logement ? *</label>
                    <OptionGrid options={etageOptions} value={data.etage} onChange={(v) => update("etage", v)} cols={3} />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-2 block">Y a-t-il un ascenseur ? *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "oui", label: "Oui" },
                        { value: "non", label: "Non" },
                      ].map((o) => (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => update("ascenseur", o.value)}
                          className={`py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                            data.ascenseur === o.value
                              ? "border-primary bg-primary-light text-primary"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* REC-036: Sous-questions Maison / Local commercial (conditionnelles) */}
              {(data.logement === "maison" || data.logement === "commerce") && (
                <div className="mb-6 bg-green-50/50 rounded-2xl p-4 sm:p-5 border border-green-100 space-y-5">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-primary"><TypeIcon type={data.logement === "maison" ? "home" : "shop"} /></div>
                    <span className="text-sm font-semibold text-dark">
                      Détails {data.logement === "maison" ? "de la maison" : "du local"}
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-2 block">Hauteur sous plafond *</label>
                    <OptionGrid options={hauteurPlafondOptions} value={data.hauteurPlafond} onChange={(v) => update("hauteurPlafond", v)} cols={3} />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-2 block">Configuration du logement *</label>
                    <OptionGrid options={niveauxOptions} value={data.niveaux} onChange={(v) => update("niveaux", v)} cols={2} />
                  </div>

                  {data.niveaux === "etage" && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 mb-2 block">Combien d&apos;étages ? *</label>
                      <OptionGrid options={nbEtagesOptions} value={data.nbEtages} onChange={(v) => update("nbEtages", v)} cols={3} />
                    </div>
                  )}
                </div>
              )}

              {/* Nombre de pièces — REC-037: wording amélioré */}
              <div>
                <label className="text-sm font-semibold text-dark mb-3 block">Combien de pièces souhaitez-vous climatiser ? *</label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
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
                    type="button"
                    onClick={() => setNbPieces(data.nbPieces + 1)}
                    className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 font-bold text-lg hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
                {data.nbPieces > 1 && (
                  <p className="text-xs text-gray-400 text-center mt-2">
                    {data.nbPieces >= 3 ? "Une unité par pièce sera recommandée" : "Vous pourrez détailler chaque pièce à l'étape suivante"}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ============ STEP 2 — Détail de chaque pièce (REC-038 / 039) ============ */}
          {step === 2 && (
            <div className="p-5 sm:p-8 lg:p-10">
              {/* REC-039: wording explicite */}
              <h3 className="text-base sm:text-lg font-bold text-dark mb-1">
                {data.nbPieces === 1 ? "Configurez votre pièce" : `Configurez vos ${data.nbPieces} pièces`}
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Pour chaque pièce, précisez le type, la surface, la distance au tableau électrique et ce qu&apos;il y a derrière le mur
              </p>

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

                    {/* Type de pièce — REC-039 */}
                    <label className="text-xs font-semibold text-gray-500 mb-2 block">Quelle pièce ? *</label>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {pieceTypes.map((p) => (
                        <button
                          key={p.value}
                          type="button"
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

                    {/* Surface — REC-039 */}
                    <label className="text-xs font-semibold text-gray-500 mb-2 block">Quelle surface ? *</label>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {surfaceOptions.map((s) => (
                        <button
                          key={s.value}
                          type="button"
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

                    {/* REC-038: Distance au tableau électrique (par pièce) */}
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">
                      Distance au tableau électrique *
                    </label>
                    <p className="text-[11px] text-gray-400 mb-2">
                      Entre l&apos;emplacement prévu de la clim et votre tableau électrique
                    </p>
                    <OptionGrid
                      options={distanceTableauOptions}
                      value={room.distanceTableau}
                      onChange={(v) => updateRoom(i, "distanceTableau", v)}
                      cols={4}
                    />
                    {room.distanceTableau === "plus15" && (
                      <div className="mt-2 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-2.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <span className="text-[11px] text-amber-700">Distance importante : un câblage supplémentaire peut être nécessaire.</span>
                      </div>
                    )}

                    {/* REC-038: Ce qu'il y a derrière le mur (par pièce) */}
                    <label className="text-xs font-semibold text-gray-500 mb-1 block mt-4">
                      Que se trouve-t-il derrière le mur ? *
                    </label>
                    <p className="text-[11px] text-gray-400 mb-2">
                      Le mur où sera posée l&apos;unité intérieure — cela détermine le passage des liaisons frigorifiques
                    </p>
                    <OptionGrid
                      options={derriereMurOptions}
                      value={room.derriereMur}
                      onChange={(v) => updateRoom(i, "derriereMur", v)}
                      cols={2}
                    />
                  </div>
                ))}
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
                  type="button"
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
                    <p className="text-sm text-gray-500 mt-1">Pack prêt à poser livré chez vous. Guide d&apos;installation + hotline technique gratuite.</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Livraison rapide", "Guide inclus", "Hotline gratuite", "Retour 30 jours"].map((t) => (
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
                  type="button"
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

                  {/* REC-034: Statut */}
                  <span className="text-gray-400">Statut</span>
                  <span className="text-dark font-medium">{statutOptions.find((s) => s.value === data.statut)?.label}</span>

                  <span className="text-gray-400">Type de logement</span>
                  <span className="text-dark font-medium">{logementLabel}</span>

                  {/* REC-035: Détails appartement */}
                  {data.logement === "appartement" && (
                    <>
                      <span className="text-gray-400">Étage</span>
                      <span className="text-dark font-medium">{etageOptions.find((e) => e.value === data.etage)?.label}</span>
                      <span className="text-gray-400">Ascenseur</span>
                      <span className="text-dark font-medium">{data.ascenseur === "oui" ? "Oui" : "Non"}</span>
                    </>
                  )}

                  {/* REC-036: Détails maison/local */}
                  {(data.logement === "maison" || data.logement === "commerce") && (
                    <>
                      <span className="text-gray-400">Hauteur plafond</span>
                      <span className="text-dark font-medium">{hauteurPlafondOptions.find((h) => h.value === data.hauteurPlafond)?.label}</span>
                      <span className="text-gray-400">Configuration</span>
                      <span className="text-dark font-medium">
                        {data.niveaux === "plain-pied" ? "Plain-pied" : `Avec étage(s) — ${nbEtagesOptions.find((e) => e.value === data.nbEtages)?.label ?? ""}`}
                      </span>
                    </>
                  )}

                  <span className="text-gray-400">Pièces à climatiser</span>
                  <span className="text-dark font-medium">{data.nbPieces} pièce{data.nbPieces > 1 ? "s" : ""}</span>

                  {/* REC-038: Détails par pièce */}
                  {data.rooms.map((room, i) => (
                    <span key={i} className="contents">
                      <span className="text-gray-400">{data.nbPieces > 1 ? `Pièce ${i + 1}` : "Pièce"}</span>
                      <span className="text-dark font-medium">
                        {pieceTypes.find((p) => p.value === room.type)?.label} — {surfaceOptions.find((s) => s.value === room.surface)?.label}
                      </span>
                      <span className="text-gray-400 text-xs pl-2">↳ Tableau élec.</span>
                      <span className="text-dark font-medium text-xs">{distanceTableauOptions.find((d) => d.value === room.distanceTableau)?.label}</span>
                      <span className="text-gray-400 text-xs pl-2">↳ Derrière le mur</span>
                      <span className="text-dark font-medium text-xs">{derriereMurOptions.find((d) => d.value === room.derriereMur)?.label}</span>
                    </span>
                  ))}

                  <span className="text-gray-400">Formule</span>
                  <span className="text-dark font-medium">{data.installation === "pro" ? "Avec installation pro" : "Pack prêt à poser"}</span>
                  <span className="text-gray-400">Modèle estimé</span>
                  <span className="text-primary font-bold">{estimation.model} — {estimation.efficiency}</span>
                  <span className="text-gray-400">Budget</span>
                  <span className="text-primary font-bold">{data.installation === "diy" ? estimation.priceDiy : "Sur devis"}</span>
                </div>

                {/* Avertissement distance longue */}
                {hasLongDistance && (
                  <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <span className="text-xs text-amber-700">Une ou plusieurs pièces ont une distance importante au tableau électrique. Un câblage supplémentaire pourrait être nécessaire — notre installateur vérifiera la faisabilité.</span>
                  </div>
                )}
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
                      type="button"
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
                  type="button"
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
                  type="button"
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
                  type="button"
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
