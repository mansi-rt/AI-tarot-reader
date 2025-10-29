"use client";

import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

const themes = [
  { id: "indigo", label: "Indigo + Gold" },
  { id: "pastel", label: "Pastel Dawn" },
  { id: "luxe", label: "Monochrome Luxe" }
] as const;

type ThemeId = (typeof themes)[number]["id"];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur">
      <span className="text-xs uppercase tracking-[0.3em] text-white/70">Theme</span>
      <div className="flex gap-1">
        {themes.map(({ id, label }) => {
          const isActive = theme === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setTheme(id as ThemeId)}
              className={`relative rounded-full px-3 py-1 text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))] ${
                isActive ? "bg-[rgb(var(--theme-accent))] text-[rgb(var(--theme-background))]" : "bg-white/10 text-white/80"
              }`}
            >
              {label}
              {isActive && (
                <motion.span
                  layout
                  className="absolute inset-0 -z-10 rounded-full bg-[rgb(var(--theme-accent))]/30"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
