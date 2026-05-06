"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  catalogProducts,
  getMatchingVariant,
  getRecommendedGammeId,
  getUniqueBrands,
  formatPrice,
  surfaceFilterOptions,
  budgetFilterOptions,
  type CatalogProduct,
  type PowerVariant,
} from "@/data/products";

/* ─── Product Card ─── */

function ProductCard({
  product,
  selectedVariantIndex,
  onVariantChange,
  isRecommended,
  isFiltered,
}: {
  product: CatalogProduct;
  selectedVariantIndex: number;
  onVariantChange: (index: number) => void;
  isRecommended: boolean;
  isFiltered: boolean;
}) {
  const variant = product.variants[selectedVariantIndex] || product.variants[0];

  return (
    <div
      className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-300 ${
        isRecommended
          ? "border-2 border-primary shadow-xl shadow-primary/10 ring-2 ring-primary/20"
          : "border border-gray-200"
      } ${isFiltered ? "opacity-40 pointer-events-none" : "card-lift"}`}
    >
      {/* Badge */}
      {product.badge && (
        <div className="bg-primary text-white text-center py-2.5 px-4">
          <span className="text-sm font-bold flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {product.badge}
          </span>
        </div>
      )}

      {/* Recommended badge (quand filtre surface actif) */}
      {isRecommended && !product.badge && (
        <div className="bg-secondary text-white text-center py-2 px-4">
          <span className="text-xs font-bold">✓ Recommandé pour votre surface</span>
        </div>
      )}

      <div className="p-5 sm:p-7">
        {/* Tier */}
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          {product.tier}
        </span>

        {/* Nom + Marque */}
        <div className="flex items-baseline gap-2 mt-1.5">
          <h3 className="text-2xl font-extrabold text-dark">{product.name}</h3>
          <span className="text-sm font-semibold text-primary">{product.brand}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{product.tagline}</p>

        {/* Illustration AC unit */}
        <div className={`my-5 rounded-2xl overflow-hidden p-6 flex items-center justify-center ${
          isRecommended ? "bg-gradient-to-br from-primary/5 via-primary-light to-cream" : "bg-gradient-to-br from-gray-50 via-primary-light/30 to-cream"
        }`}>
          <ACUnitSVG highlight={isRecommended || product.highlight} />
        </div>

        {/* ⚡ Puissance + m² sur même ligne (REC-079) */}
        <div className="flex items-center gap-2 bg-primary-light rounded-xl px-3.5 py-3 mb-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span className="font-bold text-primary">{variant.puissance}</span>
          <span className="text-gray-400">—</span>
          <span className="text-sm font-medium text-dark">
            {variant.surfaceLabel.startsWith(">") || variant.surfaceLabel.startsWith("<")
              ? variant.surfaceLabel
              : `jusqu'à ${variant.surfaceMax} m²`}
          </span>
        </div>

        {/* Sélecteur de variant (REC-078 + 079) */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1.5 block">
            Votre surface
          </label>
          <div className="relative">
            <select
              value={selectedVariantIndex}
              onChange={(e) => onVariantChange(Number(e.target.value))}
              className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary cursor-pointer"
            >
              {product.variants.map((v, i) => (
                <option key={i} value={i}>
                  {v.puissance} — {v.surfaceLabel}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Specs row */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1.5" title="Niveau sonore">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 010 7.07" />
            </svg>
            {product.noise}
          </div>
          <div className="flex items-center gap-1.5" title="Classe énergétique">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            {product.efficiency}
          </div>
          <div className="flex items-center gap-1.5" title="Consommation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
            {product.consumption}
          </div>
        </div>

        {/* Benefits */}
        <ul className="space-y-2 mb-5">
          {product.benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {b}
            </li>
          ))}
        </ul>

        {/* Prix DIY */}
        <div className="bg-cream rounded-2xl p-4 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide block">
                Pack prêt à poser
              </span>
              <span className="text-[11px] text-gray-300">à partir de</span>
            </div>
            <span className="text-2xl font-extrabold text-primary">
              {formatPrice(product.priceDiy)}
            </span>
          </div>
        </div>

        {/* CTA Commander */}
        <Link
          href={`/devis?product=${product.id}#diy`}
          className="block w-full text-center px-5 py-3.5 font-bold rounded-xl bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5"
        >
          Commander ce pack
        </Link>

        {/* Mention pro */}
        <Link
          href="/devis#pro"
          className="block text-center text-xs text-gray-400 hover:text-primary mt-3 transition-colors"
        >
          Installation pro disponible →
        </Link>
      </div>

      {/* Filtered overlay */}
      {isFiltered && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-3xl">
          <span className="text-sm font-medium text-gray-400 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
            Non adapté pour cette surface
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── AC Unit SVG ─── */

function ACUnitSVG({ highlight }: { highlight: boolean }) {
  const bodyColor = highlight ? "#1B5DA8" : "#9CA3AF";
  const ventColor = highlight ? "#6BB8E0" : "#D1D5DB";
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
      <rect x="10" y="10" width="100" height="55" rx="8" fill="white" stroke={bodyColor} strokeWidth="2" />
      <rect x="10" y="10" width="100" height="14" rx="8" fill={bodyColor} opacity="0.1" />
      <circle cx="100" cy="17" r="3" fill={bodyColor} opacity="0.5" />
      <line x1="20" y1="42" x2="100" y2="42" stroke={ventColor} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="48" x2="100" y2="48" stroke={ventColor} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="54" x2="100" y2="54" stroke={ventColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 65 Q45 75, 50 65" stroke={ventColor} strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M55 65 Q60 75, 65 65" stroke={ventColor} strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M70 65 Q75 75, 80 65" stroke={ventColor} strokeWidth="1.5" fill="none" opacity="0.5" />
    </svg>
  );
}

/* ─── Main Catalogue Component ─── */

export default function Catalogue() {
  const [surfaceFilter, setSurfaceFilter] = useState<number | null>(null);
  const [marqueFilter, setMarqueFilter] = useState<string | null>(null);
  const [budgetMax, setBudgetMax] = useState<number | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({
    essentiel: 0,
    confort: 0,
    premium: 0,
  });

  const brands = getUniqueBrands();
  const hasActiveFilter = surfaceFilter !== null || marqueFilter !== null || budgetMax !== null;

  // Quand le filtre surface change, auto-sélectionner le bon variant
  useEffect(() => {
    if (surfaceFilter === null) return;
    const newVariants: Record<string, number> = {};
    for (const p of catalogProducts) {
      const match = getMatchingVariant(p, surfaceFilter);
      if (match) {
        const idx = p.variants.indexOf(match);
        newVariants[p.id] = idx >= 0 ? idx : 0;
      } else {
        newVariants[p.id] = selectedVariants[p.id] || 0;
      }
    }
    setSelectedVariants(newVariants);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surfaceFilter]);

  // Lire ?surface=XX depuis l'URL au chargement
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("surface");
    if (s) {
      const num = parseInt(s);
      if (!isNaN(num) && num > 0) setSurfaceFilter(num);
    }
  }, []);

  // Déterminer quel produit est "filtered out"
  function isProductFiltered(product: CatalogProduct): boolean {
    if (marqueFilter && product.brand !== marqueFilter) return true;
    if (budgetMax && product.priceDiy > budgetMax) return true;
    if (surfaceFilter) {
      const match = getMatchingVariant(product, surfaceFilter);
      if (!match) return true;
    }
    return false;
  }

  // Déterminer quel produit est recommandé
  function isProductRecommended(product: CatalogProduct): boolean {
    if (!surfaceFilter) return product.highlight;
    return product.id === getRecommendedGammeId(surfaceFilter);
  }

  function resetFilters() {
    setSurfaceFilter(null);
    setMarqueFilter(null);
    setBudgetMax(null);
  }

  function handleVariantChange(productId: string, index: number) {
    setSelectedVariants((prev) => ({ ...prev, [productId]: index }));
  }

  return (
    <div className="min-h-screen bg-warm">
      {/* Header mini */}
      <div className="bg-gradient-to-br from-cream via-warm to-white pt-10 pb-8 lg:pt-14 lg:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary-light text-primary text-sm font-semibold rounded-full mb-4">
            Catalogue prêt à poser
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark">
            Nos climatisations DIY
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            3 gammes sélectionnées, livrées chez vous partout en France.
            Choisissez la puissance adaptée à votre surface.
          </p>
        </div>
      </div>

      {/* Barre de filtres (sticky) */}
      <div className="sticky top-16 lg:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 py-3.5">
            {/* Filtre Surface (principal) */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide hidden sm:block">
                Surface
              </label>
              <div className="relative">
                <select
                  value={surfaceFilter ?? ""}
                  onChange={(e) => setSurfaceFilter(e.target.value ? Number(e.target.value) : null)}
                  className={`appearance-none border rounded-lg px-3 py-2 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 pr-8 ${
                    surfaceFilter !== null
                      ? "border-primary bg-primary-light text-primary"
                      : "border-gray-200 bg-white text-dark"
                  }`}
                >
                  <option value="">Surface (m²)</option>
                  {surfaceFilterOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filtre Marque */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide hidden sm:block">
                Marque
              </label>
              <div className="relative">
                <select
                  value={marqueFilter ?? ""}
                  onChange={(e) => setMarqueFilter(e.target.value || null)}
                  className={`appearance-none border rounded-lg px-3 py-2 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 pr-8 ${
                    marqueFilter !== null
                      ? "border-primary bg-primary-light text-primary"
                      : "border-gray-200 bg-white text-dark"
                  }`}
                >
                  <option value="">Marque</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filtre Budget */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide hidden sm:block">
                Budget
              </label>
              <div className="relative">
                <select
                  value={budgetMax ?? ""}
                  onChange={(e) => setBudgetMax(e.target.value ? Number(e.target.value) : null)}
                  className={`appearance-none border rounded-lg px-3 py-2 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 pr-8 ${
                    budgetMax !== null
                      ? "border-primary bg-primary-light text-primary"
                      : "border-gray-200 bg-white text-dark"
                  }`}
                >
                  <option value="">Budget max</option>
                  {budgetFilterOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Réinitialiser */}
            {hasActiveFilter && (
              <button
                onClick={resetFilters}
                className="text-xs font-medium text-primary hover:text-primary-hover transition-colors flex items-center gap-1 ml-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Réinitialiser
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hint filtre */}
      {surfaceFilter && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="inline-flex items-center gap-2 bg-primary-light text-primary text-sm font-medium rounded-full px-4 py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Résultat pour {surfaceFilter} m² — gamme recommandée mise en avant
          </div>
        </div>
      )}

      {/* Grille produits */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-5 items-start">
          {catalogProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectedVariantIndex={selectedVariants[product.id] || 0}
              onVariantChange={(i) => handleVariantChange(product.id, i)}
              isRecommended={isProductRecommended(product)}
              isFiltered={isProductFiltered(product)}
            />
          ))}
        </div>
      </div>

      {/* Mention installation pro */}
      <div className="text-center pb-14">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <p className="text-sm text-gray-500 mb-3">
            Vous préférez qu&apos;on s&apos;occupe de tout ?
          </p>
          <Link
            href="/devis#pro"
            className="inline-flex items-center gap-2 px-6 py-3 bg-dark text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
            Installation pro — clé en main
          </Link>
          <p className="text-[11px] text-gray-400 mt-2">
            Toulouse et alentours uniquement
          </p>
        </div>
      </div>
    </div>
  );
}
