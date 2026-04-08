import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales | Installe ta Clim",
  description: "Mentions légales, conditions générales de vente et politique de confidentialité du site Installe ta Clim.",
};

export default function MentionsLegales() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-cream via-warm to-white py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors mb-8">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour à l&apos;accueil
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-dark">
            Mentions légales
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Dernière mise à jour : avril 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Editeur */}
          <div>
            <h2 className="text-2xl font-bold text-dark mb-4">Éditeur du site</h2>
            <div className="bg-cream rounded-2xl p-6 border border-gray-200 space-y-2 text-gray-600">
              <p><strong className="text-dark">Installe ta Clim</strong></p>
              <p>Siège social : Région Toulouse (31)</p>
              <p>Email : contact@installetaclim.fr</p>
              <p>Téléphone : 01 00 00 00 00</p>
              <p>SIRET : En cours d&apos;immatriculation</p>
            </div>
          </div>

          {/* Hebergeur */}
          <div>
            <h2 className="text-2xl font-bold text-dark mb-4">Hébergement</h2>
            <p className="text-gray-600 leading-relaxed">
              Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis. Site web : vercel.com.
            </p>
          </div>

          {/* Propriete intellectuelle */}
          <div>
            <h2 className="text-2xl font-bold text-dark mb-4">Propriété intellectuelle</h2>
            <p className="text-gray-600 leading-relaxed">
              L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes) est la propriété exclusive d&apos;Installe ta Clim ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans autorisation préalable.
            </p>
          </div>

          {/* Protection des donnees */}
          <div>
            <h2 className="text-2xl font-bold text-dark mb-4">Protection des données personnelles</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données personnelles.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Les données collectées via nos formulaires (nom, email, téléphone, informations sur votre projet) sont utilisées uniquement pour traiter votre demande de devis et vous fournir un service personnalisé. Elles ne sont jamais revendues à des tiers.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Pour exercer vos droits, contactez-nous à l&apos;adresse : contact@installetaclim.fr
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-2xl font-bold text-dark mb-4">Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ou de tracking tiers n&apos;est utilisé. En naviguant sur ce site, vous acceptez l&apos;utilisation de ces cookies essentiels.
            </p>
          </div>

          {/* CGV */}
          <div>
            <h2 className="text-2xl font-bold text-dark mb-4">Conditions générales de vente</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Les présentes conditions générales de vente régissent les relations contractuelles entre Installe ta Clim et ses clients. Toute commande implique l&apos;acceptation sans réserve de ces conditions.
            </p>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-dark">Prix</h3>
                <p className="leading-relaxed">Les prix affichés sur le site sont en euros TTC. Ils sont susceptibles d&apos;évoluer et sont valables au moment de la commande.</p>
              </div>
              <div>
                <h3 className="font-semibold text-dark">Livraison</h3>
                <p className="leading-relaxed">La livraison est effectuée en France métropolitaine sous 24 à 72h ouvrées après validation de la commande.</p>
              </div>
              <div>
                <h3 className="font-semibold text-dark">Garantie</h3>
                <p className="leading-relaxed">Tous nos produits bénéficient de la garantie légale de conformité (2 ans) et de la garantie constructeur (5 à 7 ans selon le modèle).</p>
              </div>
              <div>
                <h3 className="font-semibold text-dark">Droit de rétractation</h3>
                <p className="leading-relaxed">Conformément à la loi, vous disposez d&apos;un délai de 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-cream rounded-2xl p-8 border border-gray-200 text-center">
            <p className="text-gray-600 mb-4">Une question ? Contactez-nous.</p>
            <Link
              href="/#devis"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors"
            >
              Nous contacter
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
