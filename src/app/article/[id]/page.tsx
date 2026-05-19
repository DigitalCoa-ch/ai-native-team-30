"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { INTELLIGENCE_DB } from "../../../data/intelligence";
import type { IntelligenceItem } from "../../../data/intelligence-types";
import {
  ArrowLeft, Clock, AlertTriangle, Minus, CheckCircle2,
  ExternalLink, Calendar, Tag, Globe, X, ChevronRight, Shield,
} from "lucide-react";

const IMPACT_CONFIG: Record<string, { label: string; className: string; icon: any }> = {
  critical: { label: "Critical", className: "impact-critical", icon: AlertTriangle },
  high:     { label: "High",     className: "impact-high",     icon: Minus     },
  medium:   { label: "Medium",   className: "impact-medium",   icon: CheckCircle2 },
  low:      { label: "Low",      className: "impact-low",      icon: CheckCircle2 },
};

const SOURCE_COLORS: Record<string, string> = {
  reuters:    "#FF6600",
  bloomberg:  "#FFFFFF",
  ft:         "#FFA500",
  ap:         "#FF4500",
  politico:   "#304F8C",
  aljazeera:  "#FFFFFF",
  cnbc:       "#304F8C",
  economist:  "#E3120B",
};

function SourceBadge({ source }: { source: IntelligenceItem["sources"][0] }) {
  const color = SOURCE_COLORS[source.logo] || "#94a3b8";
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-200 group"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
        style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40`, color }}
      >
        {source.name.slice(0, 3).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white group-hover:text-gold transition-colors">{source.name}</p>
        <p className="text-xs text-slate-500 truncate">{source.author ? `${source.author} · ` : ""}{source.date}</p>
      </div>
      <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-gold transition-colors shrink-0" />
    </a>
  );
}

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<IntelligenceItem | null>(null);
  const [tab, setTab] = useState<"report"|"context"|"implications"|"timeline">("report");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const found = INTELLIGENCE_DB.find((i) => i.id === params.id);
    setItem(found as IntelligenceItem || null);
    setTimeout(() => setVisible(true), 50);
  }, [params.id]);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#050d18] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Intelligence Report Not Found</h2>
          <p className="text-slate-400 mb-6">This report may have been archived or moved.</p>
          <button onClick={() => router.back()} className="px-6 py-3 rounded-xl bg-gold/20 border border-gold/30 text-gold font-semibold hover:bg-gold/30 transition-colors">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const impact = IMPACT_CONFIG[item.impact] || IMPACT_CONFIG.medium;
  const ImpactIcon = impact.icon;

  const tabs = [
    { key: "report",       label: "Full Report" },
    { key: "context",      label: "Geopolitical Context" },
    { key: "implications", label: "Strategic Implications" },
    { key: "timeline",      label: "Timeline" },
  ] as const;

  return (
    <div className="min-h-screen bg-[#050d18]">
      {/* Top bar */}
      <div className="sticky top-0 z-50 glass-card border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Intelligence Feed
          </button>
          <div className="flex items-center gap-2 text-slate-600 text-xs">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span>Live Feed</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <AnimatePresence>
          {visible && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
                <span>Intelligence</span>
                <ChevronRight className="w-3 h-3" />
                <span>{item.sector}</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-gold/60">{item.category}</span>
              </div>

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-gold/70 uppercase px-3 py-1 rounded-full bg-gold/10 border border-gold/20">
                    {item.category}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${impact.className}`}>
                    <ImpactIcon className="w-3 h-3" />
                    {impact.label} Impact
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <Globe className="w-3 h-3" />
                    {item.region}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">
                  {item.headline}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span>Updated {item.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span>{item.sector}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-400">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Summary teaser */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-gold/8 to-transparent border border-gold/15 mb-8">
                  <p className="text-lg text-slate-300 leading-relaxed">{item.summary}</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 mb-8 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      tab === t.key
                        ? "bg-gold/20 text-gold border border-gold/30"
                        : "text-slate-500 hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {tab === "report" && (
                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl glass-card border border-white/[0.08]">
                        <p className="text-base text-slate-300 leading-relaxed whitespace-pre-line">{item.fullReport}</p>
                      </div>
                    </div>
                  )}

                  {tab === "context" && (
                    <div className="p-6 rounded-2xl glass-card border border-gold/20 bg-gradient-to-br from-gold/5 to-transparent">
                      <h3 className="text-lg font-bold text-gold mb-4">Geopolitical Context</h3>
                      <p className="text-base text-slate-300 leading-relaxed">{item.context}</p>
                    </div>
                  )}

                  {tab === "implications" && (
                    <div className="space-y-3">
                      {item.implications.map((impl, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl glass-card border border-white/[0.06]">
                          <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-gold" />
                          </div>
                          <p className="text-sm text-slate-300 leading-relaxed">{impl}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {tab === "timeline" && (
                    <div className="relative pl-8">
                      <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />
                      {item.timeline.map((event, i) => (
                        <div key={i} className="relative mb-6 last:mb-0">
                          <div className="absolute left-[-21px] top-1.5 w-3 h-3 rounded-full bg-gold/30 border-2 border-gold flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                          </div>
                          <p className="text-xs font-mono text-gold/70 mb-1">{event.time}</p>
                          <p className="text-sm text-slate-300">{event.event}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Sources */}
              <div className="mt-12 pt-8 border-t border-white/[0.06]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                  <h3 className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">Sources & References</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/[0.08] via-transparent to-transparent" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {item.sources.map((source, i) => (
                    <SourceBadge key={i} source={source} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
