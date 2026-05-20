"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Globe, Shield, Zap, TrendingUp, Eye, Cpu, BarChart3,
  ChevronDown, ArrowRight, Mail, Send, Star, Network, Atom, CheckCircle2,
} from "lucide-react";
import PersonalizedNewsFeed from "../components/PersonalizedNewsFeed";
import LiveNewsFeed from "../components/LiveNewsFeed";

const SECTORS = [
  { icon: Globe,      title: "Geopolitics",           desc: "Power dynamics, state relations, territorial shifts, and the forces shaping global order.",          color: "#3b82f6" },
  { icon: Shield,     title: "Security",              desc: "Armed conflicts, peacekeeping operations, defense postures, and regional stability.",                color: "#ef4444" },
  { icon: TrendingUp, title: "Global Economy",         desc: "Trade wars, monetary policy, sanctions, supply chains, and economic power shifts.",                   color: "#22c55e" },
  { icon: Zap,        title: "Energy",                desc: "Oil, gas, renewables, energy transitions, and the geopolitical logic of resource flows.",               color: "#f59e0b" },
  { icon: Network,    title: "Diplomacy",              desc: "Alliances, summits, treaties, and the diplomatic architecture of international relations.",            color: "#8b5cf6" },
  { icon: Atom,       title: "Technology & AI",        desc: "AI governance, cyber operations, semiconductor competition, and digital power.",                     color: "#06b6d4" },
  { icon: BarChart3,  title: "International Markets", desc: "Currency movements, equity trends, commodity prices, and capital flow dynamics.",                     color: "#ec4899" },
];

const WORKFLOW_STEPS = [
  { label: "Input",           desc: "Real-time global data streams",            icon: Eye     },
  { label: "Analysis",        desc: "AI-powered pattern recognition",           icon: Cpu     },
  { label: "Categorization",  desc: "Sector tagging and prioritization",        icon: Network },
  { label: "Key Insights",    desc: "Actionable briefings delivered",            icon: Star    },
];

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative px-6 py-24 md:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-6"
    >
      <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
      <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">{children}</span>
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-black text-white mb-16 tracking-tight text-center"
    >
      {children}
    </motion.h2>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(rgba(200,169,81,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,81,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(60deg) translateY(-20px)",
          animation: "grid-move 18s linear infinite",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_40%,#050d18_100%)]" />
      <div className="absolute top-[8%] left-[12%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[160px] animate-glow-pulse" />
      <div className="absolute bottom-[12%] right-[8%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[130px] animate-glow-pulse" style={{ animationDelay: "-2s" }} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] border border-white/[0.04] rounded-full animate-spin-slow" />
        <div className="absolute w-[700px] h-[700px] border border-white/[0.03] rounded-full animate-spin-slower" />
        <div className="absolute w-[900px] h-[900px] border border-white/[0.02] rounded-full animate-spin-slow" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-10 px-5 py-2 rounded-full glass-card text-sm font-medium tracking-widest uppercase text-gold"
        >
          <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
          Live Intelligence Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.95]"
        >
          <span className="text-white">The Digital</span>
          <br />
          <span className="text-gradient-gold">NewsRoom</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xl md:text-2xl text-slate-400 leading-relaxed mb-12 max-w-3xl mx-auto"
        >
          A centralized hub for real-time global media. Beyond the 24h Media Loop, the platform differentiates through a personalized intelligence feed, distilling vast information streams into high-velocity, tailored insights to identify emerging narratives with precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#intelligence" className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-gold/90 to-gold text-[#050d18] font-bold text-lg transition-all duration-300 hover:from-gold hover:to-gold-light hover:shadow-[0_0_50px_rgba(200,169,81,0.45)]">
            View Today&apos;s Briefing
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#sectors" className="flex items-center gap-3 px-8 py-4 rounded-xl glass-card text-slate-300 font-medium text-lg transition-all duration-300 hover:border-gold/30 hover:text-white">
            Explore Sectors
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}

function IntelligenceSection() {
  return <LiveNewsFeed />;
}

function SectorCard({ sector, index }: { sector: typeof SECTORS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = sector.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="sector-card group relative rounded-2xl p-7 glass-card cursor-default"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${sector.color}12 0%, transparent 60%)` }}
      />
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${sector.color}20`, border: `1px solid ${sector.color}40` }}
        >
          <Icon className="w-6 h-6" style={{ color: sector.color }} />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{sector.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{sector.desc}</p>
      </div>
    </motion.div>
  );
}

function SectorsSection() {
  return (
    <Section id="sectors">
      <SectionLabel>🗺️ Coverage Areas</SectionLabel>
      <SectionTitle>Sectors</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {SECTORS.map((s, i) => <SectorCard key={s.title} sector={s} index={i} />)}
      </div>
    </Section>
  );
}

function WorkflowStep({ step, index }: { step: typeof WORKFLOW_STEPS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative flex flex-col items-center text-center"
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center border-gold/20">
          <Icon className="w-8 h-8 text-gold" />
        </div>
        {index < WORKFLOW_STEPS.length - 1 && (
          <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-gold/40 to-transparent" />
        )}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{step.label}</h3>
      <p className="text-sm text-slate-400">{step.desc}</p>
    </motion.div>
  );
}

function HowItWorksSection() {
  return (
    <Section id="how-it-works" className="bg-[linear-gradient(180deg,transparent_0%,rgba(11,25,41,0.4)_50%,transparent_100%)]">
      <SectionLabel>⚙️ The Process</SectionLabel>
      <SectionTitle>How It Works</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {WORKFLOW_STEPS.map((step, i) => <WorkflowStep key={step.label} step={step} index={i} />)}
      </div>
    </Section>
  );
}

const WHY_IT_MATTERS = [
  { title: "Understand World Events Faster", desc: "Cut through the noise of a 24/7 news cycle. Get synthesized, actionable briefings that highlight what genuinely moves the needle — not what just generates clicks." },
  { title: "Identify Global Shifts Early", desc: "Spot emerging trends in geopolitics, trade, and security before they become mainstream headlines. Early awareness is a strategic advantage." },
  { title: "Support Smarter Decision-Making", desc: "Whether you are a policymaker, executive, researcher, or analyst — our platform gives you the contextual intelligence to make better-informed decisions." },
  { title: "Stay Informed, Efficiently", desc: "A single daily briefing replaces hours of scanning disparate sources. Intelligence curated and delivered in minutes, not hours." },
];

function WhyItMattersCard({ item, index }: { item: typeof WHY_IT_MATTERS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-5 items-start"
    >
      <div className="shrink-0 w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mt-1">
        <div className="w-3 h-3 rounded-full bg-gold" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

function WhyItMattersSection() {
  return (
    <Section id="why-it-matters">
      <SectionLabel>🎯 Strategic Value</SectionLabel>
      <SectionTitle>Why It Matters</SectionTitle>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {WHY_IT_MATTERS.map((item, i) => <WhyItMattersCard key={item.title} item={item} index={i} />)}
      </div>
    </Section>
  );
}

function ContactSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Section id="contact" className="bg-[linear-gradient(180deg,transparent_0%,rgba(11,25,41,0.5)_50%,transparent_100%)]">
      <div className="max-w-2xl mx-auto text-center">
        <SectionLabel>📬 Stay Updated</SectionLabel>
        <SectionTitle>Coming Soon</SectionTitle>
        <p className="text-lg text-slate-400 leading-relaxed mb-10">
          GlobeIntel is evolving rapidly. If you want early access, feature updates,
          or want to join the intelligence conversation — leave your email below.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 p-6 rounded-2xl glass-card text-gold"
          >
            <CheckCircle2 className="w-6 h-6" />
            <span className="text-lg font-semibold">You&apos;re on the list. We&apos;ll be in touch.</span>
          </motion.div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-slate-500 focus:outline-none focus:border-gold/40 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-gold/90 to-gold text-[#050d18] font-bold transition-all duration-300 hover:from-gold hover:to-gold-light hover:shadow-[0_0_40px_rgba(200,169,81,0.35)]"
            >
              <Send className="w-5 h-5" />
              Notify Me
            </button>
          </form>
        )}

        <div className="mt-16 pt-10 border-t border-white/[0.06]">
          <p className="text-sm text-slate-600">
            GlobeIntel is an AI-powered geopolitical intelligence platform developed within the DigitalCoa AI Native Enterprise Lab.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-gold" />
          <p className="text-slate-500 text-sm">GlobeIntel — AI-Powered Global Intelligence</p>
        </div>
        <p className="text-slate-600 text-xs">
          DigitalCoa AI Native Enterprise Lab — Team 30
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <IntelligenceSection />
      <SectorsSection />
      <PersonalizedNewsFeed />
      <HowItWorksSection />
      <WhyItMattersSection />
      <ContactSection />
      <Footer />
    </main>
  );
}