export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16 flex items-center px-12">
        <div className="max-w-5xl w-full mx-auto flex items-center justify-between">
          <a href="#" className="text-base font-semibold text-gray-800 tracking-tight">
            FamilyOffice AI
          </a>
          <span className="text-xs font-medium text-teal border border-teal rounded px-2.5 py-1 uppercase tracking-wider">
            Day 1 Prototype · The Unbreakables
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight leading-tight mb-6">
            Your family's wealth, coordinated in real time.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
            Multi-generational families face a unique challenge: managing complex
            wealth across generations, jurisdictions, and advisors — with no single
            source of truth. FamilyOffice AI brings every asset, obligation, and
            decision into one coordinated, AI-powered view.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-2">
              Capabilities
            </p>
            <p className="text-gray-600">Built for the complexity of family wealth.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📄",
                title: "Document Analysis",
                desc: "Instantly parse trust deeds, fund prospectuses, and legal documents into structured data.",
              },
              {
                icon: "📊",
                title: "Live Monitoring",
                desc: "Track portfolios, cash flows, and exposures across custodians in real time.",
              },
              {
                icon: "⚠️",
                title: "Risk Profiling",
                desc: "Model portfolio risk against family objectives, generating alerts before problems escalate.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white border border-gray-200 rounded p-8 hover:border-teal transition-colors duration-200"
              >
                <div className="w-11 h-11 border border-gray-200 rounded flex items-center justify-center text-xl mb-5">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Human-in-the-Loop */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto border border-gray-200 rounded p-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal mb-4 block">
            Human-in-the-Loop
          </span>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">AI drafts. The advisor approves.</h2>
          <p className="text-gray-600 leading-relaxed">
            FamilyOffice AI generates recommendations, flags anomalies, and surfaces
            opportunities — but{" "}
            <strong className="text-gray-800 font-semibold">
              every decision remains with your human advisor
            </strong>
            . We build the intelligence layer; the judgment layer stays human.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6 text-center">
        <p className="text-sm text-gray-400 leading-relaxed">
          <span className="font-medium text-gray-600">Raphael · Melusi · Rodrigo</span>
          <br />
          AI Native Enterprise · 2026
        </p>
      </footer>
    </main>
  );
}