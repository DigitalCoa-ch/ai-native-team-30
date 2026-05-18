import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Team 31 — International Relations",
  description:
    "We are an app dedicated to international relations. A project to facilitate your life is coming soon.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] animate-float" />
        <div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "-3s" }}
        />

        {/* Decorative globe ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] border border-white/5 rounded-full animate-spin-slow" />
          <div
            className="absolute w-[800px] h-[800px] border border-white/5 rounded-full"
            style={{ animation: "spin-slow 60s linear infinite reverse" }}
          />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="inline-block mb-8 px-5 py-2 rounded-full glass-card text-sm font-medium tracking-widest uppercase text-gold">
            🌐 Welcome
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-gradient-gold">Hello.</span>
            <br />
            <span className="text-white">We are an app for</span>
          </h1>

          <h2 className="text-5xl md:text-7xl font-black mb-12 leading-tight">
            <span className="text-white">International</span>{" "}
            <span className="text-gradient-gold">Relations</span>
          </h2>

          <div className="glass-card rounded-2xl p-8 md:p-10 max-w-2xl mx-auto glow-gold">
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
              We are working on a project that will{" "}
              <span className="text-gold font-semibold">facilitate your life</span>
              {" "}and simplify how you engage with the world.
            </p>
            <p className="text-lg text-gold/80 mt-4 font-medium">
              Coming soon.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-10 md:p-16 mb-16 glow-gold">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center text-3xl">
              🌍
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our Mission
              </h2>
              <p className="text-gold text-lg font-medium">
                Bridging nations, empowering people
              </p>
            </div>
          </div>

          <p className="text-xl text-slate-300 leading-relaxed">
            We believe that{" "}
            <span className="text-white font-semibold">
              international relations
            </span>{" "}
            should be accessible, transparent, and empowering for everyone.
            Our project is being built to help you navigate the complexity of
            global engagement — from diplomacy to trade, from culture to
            policy.
          </p>
        </div>

        {/* What We&apos;re Building */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
            What We&apos;re Building
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "Research & Analysis",
                desc: "Deep insights into global affairs, treaties, and geopolitical trends that matter to you.",
              },
              {
                icon: "🤝",
                title: "Connect & Collaborate",
                desc: "Bridge the gap between communities, organizations, and governments worldwide.",
              },
              {
                icon: "📊",
                title: "Data & Reporting",
                desc: "Real-time data and reporting tools to track international developments with ease.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-card rounded-2xl p-8 text-center hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Banner */}
        <div className="glass-card rounded-3xl p-10 md:p-16 border-gold/30 text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Something Big is Coming
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Our team is working around the clock to bring you a tool that will
            transform how you interact with international relations. Stay
            tuned — the future is almost here.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card text-gold">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-sm font-medium tracking-widest uppercase">
              Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌐</span>
            <p className="text-slate-500 text-sm">
              Team 31 — International Relations
            </p>
          </div>
          <p className="text-slate-600 text-xs">
            DigitalCoa AI Native Enterprise Lab
          </p>
        </div>
      </footer>
    </main>
  );
}