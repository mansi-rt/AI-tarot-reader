"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { TarotCard } from "@/data/cards";

const prompts = [
  "What small step shifts this in 24 hours?",
  "What am I avoiding that matters most?",
  "What would progress look like this week?"
];

type ReadingPanelProps = {
  card: TarotCard;
  reading: string | null;
  isLoading: boolean;
  orientation: "upright" | "reversed";
};

export function ReadingPanel({ card, reading, isLoading, orientation }: ReadingPanelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const journalPrompts = useMemo(() => prompts, []);

  const handleCopy = useCallback(async () => {
    if (!reading) return;
    try {
      await navigator.clipboard.writeText(reading);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error(error);
    }
  }, [reading]);

  const handleShare = useCallback(async () => {
    if (!reading) return;
    setShareError(null);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${card.name} tarot insight`,
          text: reading
        });
      } catch (error) {
        if ((error as DOMException).name !== "AbortError") {
          setShareError("Sharing was interrupted.");
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(reading);
        setShareError("Share unavailable. Reading copied instead.");
      } catch (error) {
        setShareError("Unable to copy reading for sharing.");
      }
    }
  }, [card.name, reading]);

  const handleDownload = useCallback(async () => {
    if (!reading || !containerRef.current) return;
    const element = containerRef.current;
    const { toPng } = await import("html-to-image");
    const dataUrl = await toPng(element, {
      cacheBust: true,
      backgroundColor: "rgba(11, 16, 38, 0.96)",
      pixelRatio: 2
    });
    const link = document.createElement("a");
    link.download = `${card.slug}-reading.png`;
    link.href = dataUrl;
    link.click();
  }, [card.slug, reading]);

  return (
    <section className="w-full max-w-2xl">
      <motion.div
        ref={containerRef}
        className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-6 shadow-glass backdrop-blur"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        aria-live="polite"
      >
        <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/50">
          <span>{card.name}</span>
          <span>{orientation === "upright" ? "UPRIGHT" : "REVERSED"}</span>
        </div>
        <motion.p
          key={reading ?? "placeholder"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="min-h-[120px] rounded-2xl bg-black/30 p-5 text-lg leading-relaxed text-white/90"
        >
          {reading ? reading : isLoading ? "Shuffling stardust…" : "Your guidance will appear here."}
        </motion.p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!reading}
            className="rounded-full border border-white/20 px-4 py-2 transition hover:border-[rgb(var(--theme-accent))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))] disabled:opacity-50"
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={handleShare}
            disabled={!reading}
            className="rounded-full border border-white/20 px-4 py-2 transition hover:border-[rgb(var(--theme-accent))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))] disabled:opacity-50"
          >
            Share
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!reading}
            className="rounded-full border border-white/20 px-4 py-2 transition hover:border-[rgb(var(--theme-accent))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))] disabled:opacity-50"
          >
            Download
          </button>
          <div className="ml-auto flex flex-col gap-1 text-white/70">
            <span className="text-xs uppercase tracking-[0.35em] text-white/40">Reflect further</span>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {journalPrompts.map((prompt) => (
                <li key={prompt}>{prompt}</li>
              ))}
            </ul>
          </div>
        </div>
        {shareError && <p className="mt-3 text-xs text-rose-200/80">{shareError}</p>}
      </motion.div>
    </section>
  );
}

