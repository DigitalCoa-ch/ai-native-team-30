"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setIsDark(false);
      document.documentElement.classList.add("light-mode");
    } else {
      setIsDark(true);
      document.documentElement.classList.remove("light-mode");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed top-5 right-5 z-50 flex items-center justify-center w-12 h-12 rounded-xl glass-card border border-white/[0.1] hover:border-gold/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(200,169,81,0.2)] group"
      style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-gold group-hover:text-yellow-300 transition-colors" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
      )}
    </button>
  );
}
