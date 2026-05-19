"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, XCircle, Loader2, User, Newspaper, TrendingUp, ArrowRight } from "lucide-react";

interface NewsCard {
  id: number;
  title: string;
  summary: string;
  category: string;
  relevance: "relevant" | "not_relevant" | null;
}

const REASONING_STEPS = [
  "Analyzing LinkedIn profile structure...",
  "Extracting skills and experience keywords...",
  "Mapping profile to industry sectors...",
  "Matching your career trajectory to tech trends...",
  "Scanning top news for alignment...",
  "Ranking by career impact relevance...",
  "Curating personalized feed...",
];

const SIMULATED_NEWS = [
  {
    id: 1,
    title: "AI Agents Rewrite Enterprise Software Strategy",
    summary: "Autonomous AI agents are moving from prototype to production, forcing companies to rebuild core workflows around agent-native architectures.",
    category: "Technology",
    careerImpact: "Your engineering background positions you to lead AI integration initiatives — a high-demand skill as organizations shift from demo projects to full deployment.",
  },
  {
    id: 2,
    title: "Remote-First Hiring Patterns Reshape Leadership Pipelines",
    summary: "Fortune 500 companies are scrapping traditional promotion ladders in favor of distributed leadership models that reward output over presence.",
    category: "Future of Work",
    careerImpact: "With your remote collaboration experience, you're well-placed for roles that require managing globally distributed teams — an increasingly competitive advantage.",
  },
  {
    id: 3,
    title: "Green Tech Infrastructure Billions Flow to Mid-Market",
    summary: "Sustainability-linked bonds and green CAPEX cycles are creating a talent squeeze in cleantech engineering and project management roles.",
    category: "Sustainability",
    careerImpact: "Cross-functional leaders who bridge technical and business strategy are in short supply — your profile aligns with emerging executive opportunities in this sector.",
  },
];

export default function PersonalizedNewsFeed() {
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [newsCards, setNewsCards] = useState<NewsCard[]>([]);

  const handleCurate = async () => {
    if (!linkedInUrl.trim()) return;

    setIsLoading(true);
    setCurrentStep(0);
    setShowResults(false);

    // Simulate AI reasoning steps
    for (let i = 0; i < REASONING_STEPS.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));
      setCurrentStep(i + 1);
    }

    // Initialize news cards
    setNewsCards(
      SIMULATED_NEWS.map((news) => ({
        ...news,
        relevance: null,
      }))
    );

    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);
    setShowResults(true);
  };

  const handleRelevanceToggle = (cardId: number, relevance: "relevant" | "not_relevant") => {
    setNewsCards((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? { ...card, relevance: card.relevance === relevance ? null : relevance }
          : card
      )
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technology: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      "Future of Work": "bg-purple-500/20 text-purple-300 border-purple-500/30",
      Sustainability: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    };
    return colors[category] || "bg-slate-500/20 text-slate-300 border-slate-500/30";
  };

  return (
    <section className="relative py-24 px-4">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-gold/5 to-transparent opacity-60" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold font-medium">AI-Powered Career Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">Personalized News Feed</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Drop your LinkedIn URL below and let our AI analyze your professional profile to surface the news that actually moves your career forward.
          </p>
        </motion.div>

        {/* Input section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-8 mb-8 glow-gold"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="url"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                placeholder="https://www.linkedin.com/in/your-profile"
                className="w-full pl-12 pr-4 py-4 bg-slate-900/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all outline-none"
              />
            </div>
            <motion.button
              onClick={handleCurate}
              disabled={!linkedInUrl.trim() || isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-navy-900 font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Curate My News</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* AI Reasoning Animation */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card rounded-2xl p-8 mb-8 overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-gold animate-spin" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI is analyzing your profile</h3>
                  <p className="text-slate-400 text-sm">This takes just a moment</p>
                </div>
              </div>

              <div className="space-y-3">
                {REASONING_STEPS.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: index <= currentStep ? 1 : 0.3,
                      x: 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center">
                      {index < currentStep ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : index === currentStep ? (
                        <Loader2 className="w-5 h-5 text-gold animate-spin" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-600" />
                      )}
                    </div>
                    <span className={index <= currentStep ? "text-slate-200" : "text-slate-500"}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / REASONING_STEPS.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-gold to-gold-light"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Newspaper className="w-6 h-6 text-gold" />
                <h3 className="text-2xl font-bold text-white">Your Personalized Feed</h3>
              </div>

              <div className="grid gap-6">
                {newsCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="glass-card rounded-2xl p-6 intel-card group"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Main content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(card.category)}`}>
                            {card.category}
                          </span>
                          <span className="text-slate-500 text-sm">#{card.id}</span>
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-gold transition-colors">
                          {card.title}
                        </h4>
                        <p className="text-slate-400 mb-4 leading-relaxed">
                          {card.summary}
                        </p>
                        <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-700/30">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-gold" />
                            <span className="text-gold font-medium text-sm">Why this matters for your career</span>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {card.careerImpact}
                          </p>
                        </div>
                      </div>

                      {/* Feedback buttons */}
                      <div className="flex lg:flex-col gap-3 items-start lg:items-end">
                        <span className="text-slate-500 text-sm font-medium mb-1">Help us improve</span>
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => handleRelevanceToggle(card.id, "relevant")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                              card.relevance === "relevant"
                                ? "bg-emerald-500/20 text-emerald-300 border-2 border-emerald-500/50"
                                : "bg-slate-800/60 text-slate-400 border border-slate-700 hover:border-emerald-500/30"
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Relevant</span>
                          </motion.button>
                          <motion.button
                            onClick={() => handleRelevanceToggle(card.id, "not_relevant")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                              card.relevance === "not_relevant"
                                ? "bg-red-500/20 text-red-300 border-2 border-red-500/50"
                                : "bg-slate-800/60 text-slate-400 border border-slate-700 hover:border-red-500/30"
                            }`}
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Not Relevant</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <p className="text-slate-400 text-sm mb-4">
                  We use your feedback to improve future recommendations
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowResults(false);
                    setLinkedInUrl("");
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-slate-300 hover:text-white hover:border-slate-600 transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Try Another Profile</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}