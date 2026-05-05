"use client";

import { useState } from "react";

export default function ContactPage() {
  const [data, setData] = useState({
    nom: "",
    email: "",
    telephone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const canSubmit = !!data.nom && !!data.email && !!data.message;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) setSubmitted(true);
  };

  return (
    <section className="py-16 lg:py-24 bg-cream min-h-[80vh]">
      <div className="max-w-xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary-light text-primary text-sm font-semibold rounded-full mb-4">
            Contact
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-dark">
            {submitted ? "Message envoyé !" : "Une question ? Écrivez-nous"}
          </h1>
          {!submitted && (
            <p className="mt-3 text-gray-500">
              Réponse sous 24h — Sans engagement
            </p>
          )}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-black/5 overflow-hidden">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10 space-y-5">

              {/* Nom */}
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

              {/* Email */}
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

              {/* Téléphone */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1.5 block">Téléphone (optionnel)</label>
                <input
                  type="tel"
                  value={data.telephone}
                  onChange={(e) => update("telephone", e.target.value)}
                  placeholder="06 12 34 56 78"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1.5 block">Message *</label>
                <textarea
                  value={data.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Décrivez votre question ou votre projet..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full flex items-center justify-center gap-2 px-7 py-3.5 font-bold text-sm rounded-xl transition-all duration-200 ${
                  canSubmit
                    ? "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25 hover:-translate-y-0.5"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
                </svg>
                Envoyer mon message
              </button>

              <p className="text-xs text-gray-400 text-center leading-relaxed">
                Vos données sont protégées et ne seront jamais revendues.
                <a href="/mentions-legales" className="underline hover:text-primary ml-1">Politique de confidentialité</a>
              </p>
            </form>
          ) : (
            <div className="p-6 sm:p-8 lg:p-12 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-dark">Merci {data.nom} !</h2>
              <p className="text-gray-500 mt-3 max-w-sm mx-auto">
                Votre message a bien été envoyé. Un conseiller vous répondra sous <strong className="text-primary">24h</strong>.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-hover transition-all"
              >
                Retour à l&apos;accueil
              </a>
            </div>
          )}
        </div>

        {/* Trust */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
          {["Réponse sous 24h", "Sans engagement", "Données protégées"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B5DA8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
