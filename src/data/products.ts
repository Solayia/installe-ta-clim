// Données produits centralisées — source unique pour Catalogue, ProductHighlights, DevisForm

export interface PowerVariant {
  surfaceLabel: string;   // "15-20 m²"
  surfaceMin: number;     // 15
  surfaceMax: number;     // 20
  puissance: string;      // "3.5 kW"
  puissanceKw: number;    // 3.5
}

export interface CatalogProduct {
  id: string;
  name: string;
  brand: string;
  tier: string;
  badge: string | null;
  tagline: string;
  priceDiy: number;
  priceInstalled: number;
  surfaceMax: string;
  noise: string;
  efficiency: string;
  consumption: string;
  savings: string;
  features: string[];       // 2-3 caractéristiques différenciantes (REC-080)
  benefits: string[];
  highlight: boolean;
  image?: string;            // URL photo fournisseur (REC-083) — undefined = SVG par défaut
  variants: PowerVariant[];
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    brand: "Heiwa",
    tier: "Notre recommandation",
    badge: "Le plus choisi",
    tagline: "L'air frais sans se ruiner",
    priceDiy: 699,
    priceInstalled: 1499,
    surfaceMax: "Jusqu'à 20 m²",
    noise: "24 dB(A)",
    efficiency: "A+",
    consumption: "~15 €/mois en été",
    savings: "Économique à l'achat et à l'usage",
    features: ["Froid seul", "Télécommande infrarouge", "Installation simplifiée"],
    benefits: [
      "Idéal pour une chambre ou un bureau",
      "Silencieuse en mode nuit",
      "Télécommande incluse",
      "Garantie 5 ans",
    ],
    highlight: true,
    variants: [
      { surfaceLabel: "< 10 m²", surfaceMin: 0, surfaceMax: 10, puissance: "2.5 kW", puissanceKw: 2.5 },
      { surfaceLabel: "10–15 m²", surfaceMin: 10, surfaceMax: 15, puissance: "2.5 kW", puissanceKw: 2.5 },
      { surfaceLabel: "15–20 m²", surfaceMin: 15, surfaceMax: 20, puissance: "3.5 kW", puissanceKw: 3.5 },
    ],
  },
  {
    id: "confort",
    name: "Confort+",
    brand: "Marque premium",
    tier: "Polyvalent",
    badge: null,
    tagline: "Le meilleur rapport qualité-prix",
    priceDiy: 999,
    priceInstalled: 1899,
    surfaceMax: "Jusqu'à 35 m²",
    noise: "21 dB(A)",
    efficiency: "A++",
    consumption: "~18 €/mois en été",
    savings: "Jusqu'à 50% vs chauffage électrique en hiver",
    features: ["Réversible chaud/froid", "WiFi + appli smartphone", "Filtre anti-bactérien"],
    benefits: [
      "Parfait pour un salon ou pièce de vie",
      "Ultra-silencieuse, même en journée",
      "WiFi intégré + appli smartphone",
      "Filtre anti-bactérien & déshumidification",
    ],
    highlight: false,
    variants: [
      { surfaceLabel: "15–20 m²", surfaceMin: 15, surfaceMax: 20, puissance: "3.5 kW", puissanceKw: 3.5 },
      { surfaceLabel: "20–25 m²", surfaceMin: 20, surfaceMax: 25, puissance: "3.5 kW", puissanceKw: 3.5 },
      { surfaceLabel: "25–30 m²", surfaceMin: 25, surfaceMax: 30, puissance: "5 kW", puissanceKw: 5 },
      { surfaceLabel: "30–35 m²", surfaceMin: 30, surfaceMax: 35, puissance: "5 kW", puissanceKw: 5 },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    brand: "Marque leader",
    tier: "Haut de gamme",
    badge: null,
    tagline: "La performance sans compromis",
    priceDiy: 1499,
    priceInstalled: 2399,
    surfaceMax: "Jusqu'à 50 m²",
    noise: "19 dB(A)",
    efficiency: "A+++",
    consumption: "~20 €/mois en été",
    savings: "La plus économe au m² sur le long terme",
    features: ["Réversible chaud/froid", "Purificateur d'air intégré", "Connectivité domotique"],
    benefits: [
      "Grandes pièces et espaces ouverts",
      "La plus silencieuse du marché",
      "Purificateur d'air intégré",
      "Garantie étendue 7 ans",
    ],
    highlight: false,
    variants: [
      { surfaceLabel: "30–35 m²", surfaceMin: 30, surfaceMax: 35, puissance: "5 kW", puissanceKw: 5 },
      { surfaceLabel: "35–40 m²", surfaceMin: 35, surfaceMax: 40, puissance: "6 kW", puissanceKw: 6 },
      { surfaceLabel: "40–50 m²", surfaceMin: 40, surfaceMax: 50, puissance: "7 kW", puissanceKw: 7 },
      { surfaceLabel: "> 50 m²", surfaceMin: 50, surfaceMax: 999, puissance: "8 kW+", puissanceKw: 8 },
    ],
  },
];

/** Trouve le variant le plus adapté pour une surface donnée */
export function getMatchingVariant(product: CatalogProduct, surfaceM2: number): PowerVariant | null {
  // Cherche le variant dont la plage couvre la surface
  for (const v of product.variants) {
    if (surfaceM2 > v.surfaceMin && surfaceM2 <= v.surfaceMax) return v;
  }
  // Si la surface est <= au min du premier variant
  if (surfaceM2 <= product.variants[0].surfaceMax) return product.variants[0];
  return null;
}

/** Trouve la gamme recommandée pour une surface donnée */
export function getRecommendedGammeId(surfaceM2: number): string {
  if (surfaceM2 <= 20) return "essentiel";
  if (surfaceM2 <= 35) return "confort";
  return "premium";
}

/** Liste des marques uniques */
export function getUniqueBrands(): string[] {
  return [...new Set(catalogProducts.map((p) => p.brand))];
}

/** Formater un prix (699 → "699 €") */
export function formatPrice(price: number): string {
  return price.toLocaleString("fr-FR") + " €";
}

/** Options de surface pour le filtre */
export const surfaceFilterOptions = [
  { value: 10, label: "10 m²" },
  { value: 15, label: "15 m²" },
  { value: 20, label: "20 m²" },
  { value: 25, label: "25 m²" },
  { value: 30, label: "30 m²" },
  { value: 35, label: "35 m²" },
  { value: 40, label: "40 m²" },
  { value: 50, label: "50 m²" },
];

/** Options de budget pour le filtre */
export const budgetFilterOptions = [
  { value: 800, label: "< 800 €" },
  { value: 1100, label: "< 1 100 €" },
  { value: 1600, label: "< 1 600 €" },
];
