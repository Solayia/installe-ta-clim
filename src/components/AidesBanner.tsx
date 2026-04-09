export default function AidesBanner() {
  return (
    <section id="aides" className="bg-gradient-to-r from-primary-light via-white to-primary-light py-8 sm:py-10 border-y border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          {/* Left: headline */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-dark">
              Jusqu&apos;à <span className="text-primary">6 000 EUR d&apos;aides</span> pour votre clim
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              MaPrimeRénov&apos;, CEE, TVA réduite, Éco-PTZ — on gère les démarches pour vous.
            </p>
          </div>

          {/* Right: 4 aids compact */}
          <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            {[
              { name: "MaPrimeRénov'", amount: "5 000 €" },
              { name: "Prime CEE", amount: "900 €" },
              { name: "TVA réduite", amount: "10%" },
              { name: "Éco-PTZ", amount: "15 000 €" },
            ].map((aide) => (
              <div key={aide.name} className="bg-white rounded-xl px-3 py-2 border border-gray-200 text-center">
                <div className="text-xs text-gray-400">{aide.name}</div>
                <div className="text-sm font-bold text-primary">{aide.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
