"use client";

import { motion } from "framer-motion";

type AuroraProps = {
  className?: string;
};

export function Aurora({ className = "" }: AuroraProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-0 h-[120vh] w-[120vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,_rgba(117,127,250,0.25),_transparent_55%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[-20vh] h-[140vh] w-[160vw] -translate-x-1/2 rounded-full bg-[conic-gradient(from_120deg_at_50%_30%,_rgba(200,169,89,0.2),_transparent_65%)] blur-3xl"
        initial={{ rotate: -12, opacity: 0.3 }}
        animate={{ rotate: 12, opacity: 0.6 }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-[15%] top-[35%] h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(210,193,244,0.35),_transparent_60%)] blur-2xl"
        animate={{ y: [0, -20, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[8%] top-[20%] h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(247,199,219,0.32),_transparent_60%)] blur-2xl"
        animate={{ y: [0, 30, 0], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
    </div>
  );
}
