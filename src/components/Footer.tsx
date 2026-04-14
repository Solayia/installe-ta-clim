import Link from "next/link";
import { FanIcon } from "./Logo";

const footerSections = [
  {
    title: "Nos services",
    links: [
      { label: "Nos climatisations", href: "/#nos-clims" },
      { label: "Installation complète", href: "/#comment-ca-marche" },
      { label: "Devis gratuit", href: "/devis" },
      { label: "Prêt à poser", href: "/#nos-clims" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Comment ça marche", href: "/#comment-ca-marche" },
      { label: "FAQ", href: "/#faq" },
      { label: "Guide climatisation", href: "/blog" },
    ],
  },
  {
    title: "À propos",
    links: [
      { label: "Notre démarche", href: "/#comment-ca-marche" },
      { label: "Certifié RGE QualiPAC", href: "/#faq" },
      { label: "Avis clients", href: "/#faq" },
      { label: "Contact", href: "/devis" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "CGV", href: "/mentions-legales" },
      { label: "Politique de confidentialité", href: "/mentions-legales" },
      { label: "Cookies", href: "/mentions-legales" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 flex items-center justify-center">
                <FanIcon size={32} />
              </div>
              <span className="text-base font-extrabold uppercase tracking-tight">Installe ta Clim</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              La climatisation simplifiée. Achetez, installez ou faites installer en toute confiance.
            </p>
            <div className="text-xs text-gray-500 mb-3">Zone d&apos;intervention installation :</div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["Toulouse (31)", "Gers (32)", "Tarn (81)", "T-et-G (82)", "Htes-Pyr (65)"].map((z) => (
                <span key={z} className="text-xs bg-white/5 text-gray-400 px-2 py-1 rounded-lg">{z}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              01 00 00 00 00
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-8">
            {["RGE QualiPAC", "Garantie 5 ans", "Paiement sécurisé", "Satisfait ou remboursé"].map((cert) => (
              <div key={cert} className="flex items-center gap-2 text-sm text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6BB8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                {cert}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Installe ta Clim. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Site sécurisé — SSL
          </div>
        </div>
      </div>
    </footer>
  );
}
