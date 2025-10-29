"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const anticipationDelay = 450;

const sampleQuestions = [
  "What path leads to the breakthrough?",
  "How do I harmonize love and ambition?",
  "Where should I place my courage next?"
];

type QuestionBoxProps = {
  onReveal: (question: string, reversed: boolean) => Promise<void> | void;
  isLoading: boolean;
};

export function QuestionBox({ onReveal, isLoading }: QuestionBoxProps) {
  const [question, setQuestion] = useState("");
  const [isReversed, setIsReversed] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  const placeholder = useMemo(() => sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)], []);

  useEffect(() => {
    const timer = setTimeout(() => setHintVisible(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim()) return;
    await new Promise((resolve) => setTimeout(resolve, anticipationDelay));
    await onReveal(question, isReversed);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-black/30 p-8 shadow-[0_25px_60px_-25px_rgba(11,16,38,0.65)] backdrop-blur"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="pointer-events-none absolute -inset-[1px] rounded-[2rem] bg-[linear-gradient(130deg,rgba(200,169,89,0.4),rgba(210,193,244,0.3),rgba(117,127,250,0.35))] opacity-40" />
      <div className="pointer-events-none absolute -left-24 top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.2),_transparent_70%)] blur-3xl" />
      <div className="relative flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Spellbound prompt</p>
            <h2 className="font-display text-2xl md:text-3xl">What mystery shall we solve today?</h2>
          </div>
          <motion.span
            aria-hidden
            className="hidden rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/60 md:inline-flex"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Ask &amp; tap
          </motion.span>
        </div>
        <p className="text-sm text-white/65">Ask about decisions, timing, relationships, career, or change.</p>
        <textarea
          id="tarot-question"
          required
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={placeholder}
          className="min-h-[140px] rounded-2xl border border-white/25 bg-black/40 p-4 text-base text-white placeholder:text-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))]"
        />
        <div className="flex flex-wrap items-center gap-4">
          <fieldset className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 p-1">
            <legend className="sr-only">Card orientation</legend>
            <button
              type="button"
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))] ${
                !isReversed ? "bg-[rgb(var(--theme-accent))] text-[rgb(var(--theme-background))] shadow-[0_0_30px_rgba(200,169,89,0.45)]" : "text-white/70"
              }`}
              onClick={() => setIsReversed(false)}
              aria-pressed={!isReversed}
            >
              Upright
            </button>
            <button
              type="button"
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--theme-accent))] ${
                isReversed ? "bg-[rgb(var(--theme-accent))] text-[rgb(var(--theme-background))] shadow-[0_0_30px_rgba(200,169,89,0.45)]" : "text-white/70"
              }`}
              onClick={() => setIsReversed(true)}
              aria-pressed={isReversed}
            >
              Reversed
            </button>
          </fieldset>
          <motion.button
            whileHover={{ scale: 1.03, rotate: -0.5 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
            className="relative overflow-hidden rounded-full bg-[rgb(var(--theme-accent))] px-7 py-3 font-semibold text-[rgb(var(--theme-background))] shadow-[0_0_30px_rgba(200,169,89,0.55)] transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reveal my reading
            <span className="pointer-events-none absolute inset-0 animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </motion.button>
        </div>
        {hintVisible && !question && (
          <p className="text-xs text-white/55">Hint: be specific—include names, timelines, or desired outcomes.</p>
        )}
      </div>
    </motion.form>
  );
}
