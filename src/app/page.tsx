export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-float" />
        <div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "-3s" }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full glass-card text-sm font-medium tracking-widest uppercase text-cyan-400">
            AI Native Enterprise Lab — Team 31
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="text-gradient">AI-NATIVE</span>
            <br />
            <span className="text-white">ENTERPRISE WEEK</span>
          </h1>

          <p className="text-2xl md:text-3xl text-slate-300 mb-4 font-light">
            Day 1 / 4
          </p>

          <p className="text-4xl md:text-5xl font-bold text-white mb-12">
            From AI Hype to Business Architecture
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#content"
              className="px-8 py-4 rounded-xl font-semibold text-lg glass-card text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105 animate-pulse-glow"
            >
              Explore the Challenge
            </a>
            <a
              href="#oxygen-test"
              className="px-8 py-4 rounded-xl font-semibold text-lg glass-card text-purple-400 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105"
            >
              The Oxygen Test
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
        </div>
      </section>

      {/* Main Content */}
      <section id="content" className="px-6 py-20 max-w-7xl mx-auto">
        {/* The Big Question */}
        <div className="glass-card rounded-3xl p-10 md:p-16 mb-16 glow-cyan">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            The Uncomfortable Question
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
            What happens when a company is designed from the beginning around{" "}
            <span className="text-cyan-400 font-semibold">AI agents</span>,{" "}
            <span className="text-cyan-400 font-semibold">workflows</span>,{" "}
            <span className="text-cyan-400 font-semibold">data</span>,{" "}
            <span className="text-cyan-400 font-semibold">human judgment</span>,
            and{" "}
            <span className="text-cyan-400 font-semibold">governance</span>?
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <div className="text-3xl mb-3">⚡</div>
              <p className="text-slate-300">
                Not AI as a <span className="text-white font-semibold">feature</span>
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <div className="text-3xl mb-3">💬</div>
              <p className="text-slate-300">
                Not AI as a{" "}
                <span className="text-white font-semibold">chatbot added</span> to
                an existing process
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <div className="text-3xl mb-3">🏗️</div>
              <p className="text-slate-300">
                But AI as part of the{" "}
                <span className="text-white font-semibold">operating model</span>
              </p>
            </div>
          </div>
        </div>

        {/* AI-Enabled vs AI-Native */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
            The Critical Distinction
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* AI-Enabled */}
            <div className="glass-card rounded-3xl p-10 border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center text-2xl">
                  🔧
                </div>
                <h3 className="text-2xl font-bold text-cyan-400">
                  AI-Enabled
                </h3>
              </div>
              <p className="text-lg text-slate-300 mb-6">
                A{" "}
                <span className="text-white font-semibold">
                  traditional business
                </span>{" "}
                that uses AI to become faster, cheaper, or more personalized.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <p className="text-slate-400">
                    AI enhances existing processes
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <p className="text-slate-400">
                    Business survives without AI
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <p className="text-slate-400">
                    AI is an add-on, not foundational
                  </p>
                </div>
              </div>
            </div>

            {/* AI-Native */}
            <div className="glass-card rounded-3xl p-10 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 glow-purple">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl">
                  🌱
                </div>
                <h3 className="text-2xl font-bold text-purple-400">
                  AI-Native
                </h3>
              </div>
              <p className="text-lg text-slate-300 mb-6">
                A business that would{" "}
                <span className="text-white font-semibold">
                  not work, or would collapse
                </span>{" "}
                if AI were removed.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▸</span>
                  <p className="text-slate-400">
                    AI is the core operating model
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▸</span>
                  <p className="text-slate-400">
                    Removing AI breaks the business
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▸</span>
                  <p className="text-slate-400">
                    Business architecture IS AI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Oxygen Test */}
        <div
          id="oxygen-test"
          className="glass-card rounded-3xl p-10 md:p-16 mb-16 border-pink-500/30"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-pink-500/20 flex items-center justify-center text-3xl">
              🫧
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                The Oxygen Test
              </h2>
              <p className="text-pink-400 text-lg font-medium">
                The defining question for AI-native businesses
              </p>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-8 md:p-12 border border-slate-700 mb-8">
            <p className="text-2xl md:text-3xl text-center text-white font-medium leading-relaxed">
              If we{" "}
              <span className="text-pink-400 font-bold">remove AI tomorrow</span>,
              <br />
              does the company still{" "}
              <span className="text-pink-400 font-bold">breathe</span>?
            </p>
          </div>

          <p className="text-lg text-slate-300 text-center">
            AI-native companies are not just{" "}
            <span className="text-white font-semibold">interfaces</span>. They are{" "}
            <span className="text-white font-semibold">architectures</span> — built
            from data, workflows, agents, human oversight, partnerships,
            regulation, trust, and governance.
          </p>
        </div>

        {/* MEDVi Case */}
        <div className="glass-card rounded-3xl p-10 md:p-16 mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl">
              🔬
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                MEDVi as Anchor Case
              </h2>
              <p className="text-amber-400 text-lg font-medium">
                Investigating the operating model
              </p>
            </div>
          </div>

          <div className="bg-slate-900/30 rounded-2xl p-8 border border-slate-700 mb-8">
            <p className="text-lg text-slate-300 mb-6">
              Students are using the MEDVi case to explore the tension between
              AI-enabled and AI-native. At first sight, it looks like a very lean
              AI-powered company.
            </p>
            <p className="text-lg text-white font-medium mb-4">
              But once you decompose the operating model, the question becomes
              more interesting:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "What is really automated?",
              "What is outsourced?",
              "What is hidden?",
              "Where does human judgment still matter?",
              "Where are the risks?",
              "What breaks without AI?",
            ].map((q, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-slate-800/40 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
              >
                <span className="text-cyan-400 mr-2">▸</span>
                <span className="text-slate-200">{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Day 1 Focus Areas */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
            Day 1 Focus
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "MEDVi as Anchor Case",
                desc: "Explore the tension between AI-enabled and AI-native",
                color: "cyan",
              },
              {
                num: "02",
                title: "AI-Enabled vs AI-Native",
                desc: "Understand the fundamental difference",
                color: "purple",
              },
              {
                num: "03",
                title: "The Oxygen Test",
                desc: "Would the business survive without AI?",
                color: "pink",
              },
              {
                num: "04",
                title: "Hidden Architecture",
                desc: "Decompose the real operating model",
                color: "cyan",
              },
              {
                num: "05",
                title: "From Interface to Operating Model",
                desc: "See beyond the surface",
                color: "purple",
              },
            ].map((item) => (
              <div
                key={item.num}
                className={`glass-card rounded-2xl p-6 border-${
                  item.color === "cyan" ? "cyan" : item.color === "purple" ? "purple" : "pink"
                }-500/20 hover:border-${
                  item.color === "cyan" ? "cyan" : item.color === "purple" ? "purple" : "pink"
                }-500/50 transition-all duration-300 group`}
              >
                <div className={`text-4xl font-black text-${
                  item.color === "cyan" ? "cyan" : item.color === "purple" ? "purple" : "pink"
                }-400 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {item.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insight */}
        <div className="glass-card rounded-3xl p-10 md:p-16 border-amber-500/30">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            The Real Learning Objective
          </h2>

          <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 md:p-12 border border-slate-700">
            <p className="text-xl md:text-2xl text-center text-white font-medium leading-relaxed">
              Move from{" "}
              <span className="text-cyan-400 font-bold">
                &ldquo;AI is impressive&rdquo;
              </span>{" "}
              <br className="hidden md:block" />
              to{" "}
              <span className="text-purple-400 font-bold">
                &ldquo;what business architecture makes this possible?&rdquo;
              </span>
            </p>
          </div>

          <p className="text-lg text-slate-300 mt-8 text-center">
            The goal of Day 1 is not to celebrate AI hype. The goal is to help
            students see that AI-native companies are not just interfaces.
          </p>
        </div>
      </section>

      {/* Hashtags */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-slate-400 mb-6 text-sm tracking-widest uppercase">
            Join the Conversation
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "#AINativeEnterprise",
              "#AIInBusiness",
              "#BusinessEducation",
              "#DigitalTransformation",
              "#ArtificialIntelligence",
              "#FutureOfWork",
              "#BusinessArchitecture",
              "#AIEducation",
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full glass-card text-sm text-cyan-400 hover:text-white hover:bg-cyan-500/20 transition-all duration-300 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            AI Native Enterprise Week — Team 31
          </p>
          <p className="text-slate-600 text-xs">
            DigitalCoa AI Native Enterprise Lab
          </p>
        </div>
      </footer>
    </main>
  );
}