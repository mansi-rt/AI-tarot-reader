"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const anticipationDelay = 450;

type QuestionBoxProps = {
  onReveal: (question: string, reversed: boolean) => Promise<void> | void;
  isLoading: boolean;
};

export function QuestionBox({ onReveal, isLoading }: QuestionBoxProps) {
  const [question, setQuestion] = useState("");
  const [isReversed, setIsReversed] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHintVisible(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!question.trim()) return;
    await new Promise((resolve) => setTimeout(resolve, anticipationDelay));
    await onReveal(question, isReversed);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl rounded-3xl border border-white/15 bg-white/5 p-6 shadow-glass backdrop-blur"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="tarot-question" className="font-display text-2xl md:text-3xl">
          What mystery shall we solve today?
        </label>
        <p className="text-sm text-white/60">Ask about decisions, timing, relationships, career, or change.</p>
        <textarea
          id="tarot-question"
          required
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Type your question…"
          className="min-h-[120px] rounded-2xl border border-white/20 bg-black/20 p-4 text-base text-white placeholder:text-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))]"
        />
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <fieldset className="flex items-center gap-3">
            <legend className="sr-only">Card orientation</legend>
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))] ${
                !isReversed ? "bg-[rgb(var(--theme-accent))] text-[rgb(var(--theme-background))]" : "bg-white/10 text-white"
              }`}
              onClick={() => setIsReversed(false)}
              aria-pressed={!isReversed}
            >
              Upright
            </button>
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))] ${
                isReversed ? "bg-[rgb(var(--theme-accent))] text-[rgb(var(--theme-background))]" : "bg-white/10 text-white"
              }`}
              onClick={() => setIsReversed(true)}
              aria-pressed={isReversed}
            >
              Reversed
            </button>
          </fieldset>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="sparkle relative overflow-hidden rounded-full bg-[rgb(var(--theme-accent))] px-6 py-3 font-semibold text-[rgb(var(--theme-background))] shadow-glow transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reveal my reading
            <span className="pointer-events-none absolute inset-0 animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </motion.button>
        </div>
        {hintVisible && !question && (
          <p className="text-xs text-white/50">Hint: be specific—include names, timelines, or desired outcomes.</p>
        )}
      </div>
    </motion.form>
  );
}
