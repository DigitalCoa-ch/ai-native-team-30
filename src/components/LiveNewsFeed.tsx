"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Clock, ExternalLink, Globe, ChevronRight, Loader2, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import type { NewsArticle, FeedResponse } from "../data/news-types";

const CATEGORY_COLORS: Record<string, string> = {
  General:      "bg-slate-500/20 text-slate-300 border-slate-500/30",
  Politics:     "bg-red-500/20 text-red-300 border-red-500/30",
  Economy:      "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  World:        "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Technology:   "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Energy:       "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Sports:       "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Health:       "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

function formatTimeAgo(dateStr: string): string {
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (mins > 0) return `${mins}m ago`;
    return "Just now";
  } catch {
    return "";
  }
}

function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const categoryClass = CATEGORY_COLORS[article.category] || CATEGORY_COLORS.General;

  return (
    <motion.a
      ref={ref}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.4, 0, 0.2, 1] }}
      className="intel-card group relative rounded-2xl p-6 glass-card cursor-pointer overflow-hidden block"
    >
      <div className="intel-glow absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 transition-opacity duration-300 rounded-2xl" />

      {/* Source badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold"
            style={{
              backgroundColor: `${article.source.color}20`,
              border: `1px solid ${article.source.color}40`,
              color: article.source.color,
            }}
          >
            {article.source.name.slice(0, 3).toUpperCase()}
          </div>
          <span className="text-xs font-semibold text-slate-400">{article.source.name}</span>
        </div>
        <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-gold transition-colors" />
      </div>

      {/* Category */}
      <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-medium border mb-3 ${categoryClass}`}>
        {article.category}
      </span>

      {/* Title */}
      <h3 className="text-base font-bold text-white mb-3 leading-snug group-hover:text-gold transition-colors duration-300 line-clamp-3">
        {article.title}
      </h3>

      {/* Summary */}
      <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
        {article.summary}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Clock className="w-3 h-3" />
          <span className="text-xs">{formatTimeAgo(article.publishedAt)}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500 group-hover:text-gold transition-colors">
          Read full article
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </motion.a>
  );
}

function SkeletonCard({ index }: { index: number }) {
  return (
    <div
      className="rounded-2xl p-6 glass-card animate-pulse"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-700/50" />
          <div className="w-16 h-3 bg-slate-700/50 rounded" />
        </div>
      </div>
      <div className="w-20 h-4 bg-slate-700/50 rounded mb-3" />
      <div className="w-full h-5 bg-slate-700/50 rounded mb-2" />
      <div className="w-3/4 h-5 bg-slate-700/50 rounded mb-4" />
      <div className="w-full h-3 bg-slate-700/50 rounded mb-2" />
      <div className="w-2/3 h-3 bg-slate-700/50 rounded mb-4" />
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
        <div className="w-16 h-3 bg-slate-700/50 rounded" />
        <div className="w-20 h-3 bg-slate-700/50 rounded" />
      </div>
    </div>
  );
}

interface LiveNewsFeedProps {
  onRefresh?: () => void;
}

export default function LiveNewsFeed({ onRefresh }: LiveNewsFeedProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);

  const fetchNews = async () => {
    try {
      setError(null);
      const res = await fetch('/api/news', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: FeedResponse = await res.json();
      setArticles(data.articles);
      setLastFetched(data.fetchedAt);
      setSources(data.sources);
    } catch (err) {
      setError("Failed to load news. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    await fetchNews();
    onRefresh?.();
  };

  return (
    <section className="relative py-24 px-4 bg-[linear-gradient(180deg,transparent_0%,rgba(11,25,41,0.5)_50%,transparent_100%)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">📡 Live RSS Feeds</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-white tracking-tight"
            >
              Global Intelligence — <span className="text-gradient-gold">24h Global Brief</span>
            </motion.h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Source indicators */}
            {sources.length > 0 && (
              <div className="hidden sm:flex items-center gap-2">
                {sources.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    ✓ {s}
                  </span>
                ))}
              </div>
            )}
            <motion.button
              onClick={handleRefresh}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-sm text-slate-400 hover:text-white border border-white/[0.08] hover:border-gold/30 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 p-6 rounded-2xl glass-card border border-red-500/20 mb-8"
          >
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-300 font-medium">{error}</span>
            <button onClick={handleRefresh} className="ml-4 text-xs text-red-400 underline hover:text-red-300">
              Retry
            </button>
          </motion.div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </div>
        )}

        {/* News grid */}
        {!loading && articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            <AnimatePresence>
              {articles.map((article, i) => (
                <NewsCard key={article.id} article={article} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state */}
        {!loading && articles.length === 0 && !error && (
          <div className="text-center py-16">
            <Globe className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg mb-2">No news available right now</p>
            <p className="text-slate-500 text-sm">Check back in a few minutes</p>
          </div>
        )}

        {/* Last updated */}
        {lastFetched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-10 text-xs text-slate-600"
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Live data from Reuters, BBC, AP News, CNN</span>
            <span className="text-slate-700">·</span>
            <span>Updated {formatTimeAgo(lastFetched)}</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}